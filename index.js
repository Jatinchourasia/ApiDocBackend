const express = require("express");
const app = express();

//swagger ui express

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let = [
  {
    id: "1",
    name: "none peicearuto",
    price: 23,
  },
  {
    id: "2",
    name: "naruto",
    price: 23,
  },
  {
    id: "3",
    name: "bleach",
    price: 23,
  },
];

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/api/v1/anime", (req, res) => {
  res.send("hey nerd");
});

app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
