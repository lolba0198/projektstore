const express = require('express');
const cors = require('cors');
const fs = require('fs');
const fsPromises = require('fs').promises;

const PORT = 3000;
const app = express();
const usersFilePath = './data/users.json';

// konfiguracja cors
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // middleware do json w postcie

// funkcja pomocnicza do czytania ciastek z nagłówka
const getCookie = (cookieString, name) => {
  if (!cookieString) return null;
  const value = `; ${cookieString}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// ładowanie danych produktów i promocji
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

// rejestracja

app.post("/createUser", async (req, res) => {
  try {
    const newUser = req.body; // dane z reigsterview

    // dane z json
    let usersData = [];
    try {
      const fileContent = await fsPromises.readFile(usersFilePath, 'utf8');
      usersData = JSON.parse(fileContent);
    } catch (err) {
      usersData = [];
    }

    const userExists = usersData.find(u => u.email === newUser.email);

    if (userExists) {
      return res.json({ status: "exists" });
    }

    usersData.push(newUser);

    // lista do pliku string
    await fsPromises.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

    res.json({ status: "registered" });

  } catch (error) {
    console.error("Błąd serwera:", error);
    res.status(500).json({ status: "error", message: "Błąd zapisu danych" });
  }
});

// logowanie usera

app.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // pobranie userów z pliku
    const fileContent = await fsPromises.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(fileContent);

    // sprawdzenie czy dane usera są w pliku json
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // ustawienie cookie jeśli dane poprawne
      res.setHeader('Set-Cookie', `email=${user.email}; Max-Age=3600; HttpOnly; Path=/`);
      res.json({ status: "authorized", email: user.email });
    } else {
      res.json({ status: "notlogged" });
    }
  } catch (err) {
    res.json({ status: "notlogged" });
  }
});

app.get("/getCurrentUser", (req, res) => {
  // pobranie emaila z ciastka z nagłówków
  const rawCookies = req.headers.cookie;
  const email = getCookie(rawCookies, 'email');

  if (email) {
    res.json({ status: "authorized", email: email });
  } else {
    res.json({ status: "notauthorized" });
  }
});

// wylogowanie usera

app.post("/logoutUser", (req, res) => {
  res.setHeader('Set-Cookie', 'email=; Max-Age=0; HttpOnly; Path=/'); //del cookie

  res.json({ status: "logout" });
});

app.listen(PORT, function () {
  console.log("Serwer działa na porcie " + PORT);
});
