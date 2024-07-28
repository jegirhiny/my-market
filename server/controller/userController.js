const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { name, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { name: name },
  });

  if (!user) {
    return res.status(500).json({ message: "Username or Password is incorrect." });
  } else {
    const savedPassword = user.password;
    const isValid = await bcrypt.compare(password, savedPassword);

    if (isValid) {
      const token = jwt.sign({ id: user.id, name: user.name }, "myMarket", {
        expiresIn: "1hr",
      });

      return res
        .status(200)
        .json({ message: "User logged in successfully.", token });
    } else {
      return res.status(400).json({ message: "Username or Password is incorrect." });
    }
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const nameExists = await prisma.user.findUnique({
      where: { name: name },
    });

    const emailExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (nameExists || emailExists) {
      return res.status(409).json({ message: "User already exists." });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: { name, email, password: hashPassword },
      });

      return res.status(201).json({ message: "User created successfully." });
    }
  } catch (e) {
    return res.status(500).json({ message: "Error creating user." });
  }
};

exports.login = login;
exports.signup = signup;
