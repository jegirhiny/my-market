const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", require("./routes/userRoute"));
app.use("/item", require("./routes/itemRoute"));

app.listen(5000, () => console.log("Server started on port 5000."));
