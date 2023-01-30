const express = require("express");
const app = express();

//swagger ui express

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//usign this we don't have to add body parser
app.use(express.json());
app.use(fileUpload());
let content = [
  {
    id: 1,
    name: "one peice",
    price: 23,
  },
  {
    id: 2,
    name: "naruto",
    price: 23,
  },
  {
    id: 3,
    name: "bleach",
    price: 23,
  },
];

const PORT = 4000;

app.get("/", (req, res) => {
  res.send('<a href="/api-docs">API Docs</a>');
});

app.get("/api/v1/anime", (req, res) => {
  res.send("hey nerd");
});

app.get("/api/v1/animeObject", (req, res) => {
  res.send({ id: 2343, name: "shonen collection", price: 123 });
});
app.get("/api/v1/content", (req, res) => {
  res.send(content);
});
app.get("/api/v1/content/:animeId", (req, res) => {
  const anime = content.find((ani) => ani.id == req.params.animeId);
  res.send(anime);
});
app.get("/api/v1/contentquery", (req, res) => {
  let genera = req.query.genera;
  let season = req.query.season;
  console.log(req.query);
  res.send({ genera, season });
});

//post
app.post("/api/v1/addContent", (req, res) => {
  console.log(req.body);
  content.push(req.body);
  res.send(true);
});

app.post("/api/v1/contentUpload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send(true);
  });
});
app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
