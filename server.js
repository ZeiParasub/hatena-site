const express = require('express');
const app = express();
const port = 3000;

// JSONボディを解析するためのミドルウェア
app.use(express.json());

// GETリクエストの処理
app.get('/api/data', (req, res) => {
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
