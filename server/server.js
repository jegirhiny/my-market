const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const fs = require('fs');
const files = fs.readdirSync('/uploads');

console.log(files);

app.use(express.json());

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", require("./routes/userRoute"));
app.use("/item", require("./routes/itemRoute"));

app.listen(5000, () => console.log("Server started on port 5000."));
