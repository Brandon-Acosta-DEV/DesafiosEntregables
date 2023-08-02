import express, { urlencoded } from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";

const app = express();
const PORT = 4040;

app.use(express.json());
app.use(urlencoded({ extended: true }));

//Estructura de codigo Handlebars
app.engine("handlebars", engine());
app.set("views engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

//Archivos estaticos
app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Backend | Handlebars",
    admin: true,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor por puerto ${PORT}`);
});
