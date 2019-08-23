import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send({ error: "No files uploaded" });
  }

  let file = req.files.file;

  console.log(file.name);

  file.mv(`${__dirname}/uploads/${file.name}`, error => {
    if (error) {
      return res.status(500).send({ error });
    }

    return res
      .status(200)
      .send({ message: "File uploaded", name: file.name, size: file.size });
  });
});

app.listen(4000);
