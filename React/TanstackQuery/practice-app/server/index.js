const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// 샘플 데이터
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// API 엔드포인트
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});