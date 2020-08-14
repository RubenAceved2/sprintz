const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const router = require("./src/modules/private/router/router");

app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => console.log(`Sprintz initiated at ${PORT}`));
