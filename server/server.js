const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());
app.use("/mnt/data/images", express.static(path.join("/opt/render/project/src", "/mnt/data/images")));

app.use("/user", require("./routes/userRoute"));
app.use("/item", require("./routes/itemRoute"));

app.listen(5000, () => console.log("Server started on port 5000."));
