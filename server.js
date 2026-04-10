const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT = 3000;
const app = express();

app.use(cors());

const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

app.get('/promotions', (req, res) => {
  res.json(data);
});

app.get('/promotion/:id', (req, res) => {
  const id = req.params.id;
  const promotion = data.promotions.find(p => p.id === id);

  if (!promotion) {
    return res.status(404).json({ message: "nie ma takiej promocji" });
  }

  res.json(promotion);
});


app.get("/product/:id", (req, res) => {
  const id = req.params.id;

  const product = data.products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "nie ma takiego produktu" });
  }

  res.json(product);
});



app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});