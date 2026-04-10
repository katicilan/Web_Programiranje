const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;

// EJS setup
app.set("view engine", "ejs");

// static files (public folder)
app.use(express.static("public"));

// početna stranica
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// galerija
app.get("/slike", (req, res) => {
  const folderPath = path.join(__dirname, "public", "images");
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file =>
      file.endsWith(".jpg") ||
      file.endsWith(".png") ||
      file.endsWith(".jpeg")
    )
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `img${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  res.render("slike", { images });
});

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});