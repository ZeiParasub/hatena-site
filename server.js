const express = require('express');
const path = require('path');
const cors = require('cors'); // CORS対応追加
const app = express();
const port = process.env.PORT || 3000; // 環境変数PORTを優先する

// JSONボディを解析するためのミドルウェア
app.use(express.json());
app.use(cors()); // CORS設定追加

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 画像取得API
app.get('/image/officialstudio', (req, res) => {
  const imagePath = path.join(__dirname, 'image', 'officialstudio.jpeg');
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(err.status || 500).end();
    }
  });
});

app.use('/register', express.static(path.join(__dirname, 'register')));
app.use('/login', express.static(path.join(__dirname, 'login')));
app.use('/menu', express.static(path.join(__dirname, 'menu')));
app.use('/scratch-auth', express.static(path.join(__dirname, 'scratch-auth')));
app.use('/connect-scratch', express.static(path.join(__dirnMe, 'connect-scratch')));

// GETリクエストの処理
app.get('/api/test', (req, res) => {
  res.json({ message: 'GETリクエストを受け取りました！' });
});

// POSTリクエストの処理
app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  res.json({ message: 'POSTリクエストを受け取りました！', data: receivedData });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーは http://localhost:${port} で動作中です`);
});
