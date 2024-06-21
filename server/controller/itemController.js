const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getItem = async (req, res) => {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      images: true,
    },
  });

  if (item === null) {
    return res
      .status(404)
      .json({ message: "Items not found.", item: undefined });
  }

  return res.status(200).json({ message: "Items returned.", item: item });
};

async function getRangeOfItems(req, res) {
  const items = await prisma.item.findMany({
    where: {
      name: { contains: req.query.searchTerm, mode: "insensitive" },
    },
    skip: parseInt(req.query.skip),
    take: parseInt(req.query.take),
    include: {
      images: true,
    },
  });

  return res.status(200).json({ message: "Items returned.", items: items });
}

const getItems = async (req, res) => {
  const userId = req.query.token.id;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      selling: {
        include: {
          images: true,
        },
      },
    },
  });

  return res
    .status(200)
    .json({ message: "Items returned.", selling: user.selling });
};

const getCartItems = async (req, res) => {
  const userId = req.query.token.id;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      buying: true,
    },
  });

  return res
    .status(200)
    .json({ message: "Items returned.", buying: user.buying });
};

const createItem = async (req, res) => {
  const { name, price, stock, description, userId } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: { selling: true },
  });

  const item = await prisma.item.create({
    data: {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      userId: user.id,
    },
  });

  item.images = await Promise.all(
    req.files.map(async (image) => {
      return await prisma.image.create({
        data: {
          name: image.originalname,
          path: image.path,
          itemId: item.id,
        },
      });
    })
  );

  await prisma.user.update({
    where: { id: user.id },
    data: {
      selling: {
        connect: { id: item.id },
      },
    },
  });

  return res.status(201).json({ message: "Listing created." });
};

const deleteItem = async (req, res) => {
  await prisma.image.deleteMany({ where: { itemId: parseInt(req.params.id) } });
  await prisma.item.delete({ where: { id: parseInt(req.params.id) } });

  return res.status(204).json({ message: "Listing deleted." });
};

const addCartItem = async (req, res) => {
  const { itemId, userId } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: { buying: true },
  });

  const itemIndex = user.buying.findIndex((item) => item.itemId === itemId);

  if (itemIndex !== -1) {
    await prisma.cartItem.update({
      where: { id: user.buying[itemIndex].id },
      data: { quantity: user.buying[itemIndex].quantity + 1 },
    });

    return res.status(201).json({
      message: "Cart item updated.",
    });
  } else {
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        userId: userId,
        itemId: itemId,
      },
    });

    return res.status(200).json({
      message: "Cart item created.",
    });
  }
};

const getCartItemCount = async (req, res) => {
  const userId = req.query.token.id;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      buying: true,
    },
  });

  return res
    .status(200)
    .json({ message: "Count returned.", count: user.buying.length });
};

const incrementCartItemCount = async (req, res) => {
  const { cartItemId, value } = req.body;

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: cartItem.quantity + parseInt(value) },
  });

  return res
    .status(200)
    .json({ message: "Count updated.", count: cartItem.quantity });
};

const removeCartItem = async (req, res) => {
  await prisma.cartItem.delete({
    where: { id: parseInt(req.params.id) },
  });

  return res.status(204).json({ message: "Cart item removed." });
};

exports.getItem = getItem;
exports.getRangeOfItems = getRangeOfItems;
exports.getItems = getItems;
exports.getCartItems = getCartItems;
exports.createItem = createItem;
exports.deleteItem = deleteItem;
exports.addCartItem = addCartItem;
exports.getCartItemCount = getCartItemCount;
exports.incrementCartItemCount = incrementCartItemCount;
exports.removeCartItem = removeCartItem;
