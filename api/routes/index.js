import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4443",
  database: "users",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const q = "INSERT INTO users(`userid`, `password`) VALUES (?)";

  const values = [
    req.body.userid,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/users/:userid", (req, res) => {
  const userId = req.params.userid;
  const q = " DELETE FROM users WHERE userid = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.userid;
  const q = "UPDATE users SET `userid`= ?, `password`= ?  WHERE id = ?";

  const values = [
    req.body.userid,
    req.body.password,
  ];

  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(3306, () => {
  console.log("Connected to backend.");
});