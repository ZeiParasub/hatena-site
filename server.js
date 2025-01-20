const express = require('express');
const path = require('path');
const cors = require('cors'); // CORS対応追加
const app = express();
const port = process.env.PORT || 3000; // 環境変数PORTを優先する

// JSONボディを解析するためのミドルウェア
app.use(express.json());
app.use(cors()); // CORS設定追加

app.get('/', (req, res) => {
  res.send(`
          <!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>はてなscratch式会社</title>
  <style>
    img {
        max-width: 100%;
        height: auto;
    }
   body {
    margin: 0;
    font-family: Arial, sans-serif;
   }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px;
    background-color: #5de3f5; /* ヘッダーの背景色 */
    color: #ffffff; /* ヘッダー内の文字色 */
    font-size: 50px; /* 文字サイズを調整 */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 下に影をつける */
    z-index: 1000; /* 他の要素の上に表示 */
  }
  
  .container {
    display: flex;
    margin-top: 70px; /* ヘッダーの高さ分下げる */
  }
  
  .content {
    flex: 3; /* メインコンテンツの幅を調整 */
    padding: 20px;
    margin-right: 200px; /* サイドバーの幅分を確保 */
    background-color: #f4f4f4; /* 背景色を調整 */
  }
  
  .rightbar {
    position: fixed; /* サイドバーを固定 */
    right: 0; /* 右端に固定 */
    margin-top: 10px;
    width: 200px; /* サイドバーの幅 */
    height: calc(100vh - 70px);  /* ヘッダーを除いた高さを指定 */
    padding: 20px
    background-color: #e0e0e0; /* サイドバーの背景色を調整 */
    box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.1); /* 左側に影をつける */
  }
  .loginerror{
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #ff4444;
    background-color: #ffdddd
    z-index: 9999;
    text-align: center;
  }
  </style>
</head>
<body>
<div class="header">はてなscratch式会社</div>
<div class="container">
  <main class="content">内容</main>
  <aside class="rightbar">
    <a href="https://scratch.mit.edu/projects/1050793789/">
      <img id="sidebar1" src="" alt="sidebar1">
    </a>
  </aside>
</div>
<div class="loginerror" id="loginerror">既にログインしています</div>
<script>
const element = document.getElementById('loginerror');
const { error } = req.query;
if (error = login) {
  element.style.display = 'block';
} else{
  element.style.display = 'none';
}
const sidebar1 = 'https://hatena-scratch.f5.si/image/officialstudio';
document.getElementById('sidebar1').src = sidebar1;
</script>
</body>
</html>
    `);
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

app.get('/login', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログインページ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
    }
    .login-container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 300px;
    }
    .login-container h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .login-container label {
      display: block;
      margin-bottom: 5px;
    }
    .login-container input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    .login-container button {
      width: 100%;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .login-container button:hover {
      background-color: #45a049;
    }
    .login-container button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .error-message {
      color: red;
      text-align: center;
      display: none;
    }
  </style>
</head>
<body>

  <div class="login-container">
    <h2>ログイン</h2>
    <form id="login-form">
      <label for="username">ユーザー名:</label>
      <input type="text" id="username" name="username" required>
      
      <label for="password">パスワード:</label>
      <input type="password" id="password" name="password" required>
      <br>登録がまだなら<a href="https://hatena-scratch.f5.si/register">こちら</a>へ
      
      <button type="submit" id="submit-button">ログイン</button>
    </form>
    <div id="error-message" class="error-message">ユーザー名またはパスワードが間違っています</div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await fetch('https://api.hatena-scratch.f5.si/auth/check', {
            method: 'GET',
            headers: {
              'Authorization': \`Bearer \${token}\`,
            },
          });

          if (response.ok) {
            const data = { error: 'login' };
            const queryParams = new URLSearchParams(data).toString();
            window.location.href = '/?\${queryParams}';
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('エラー:', error);
        }
      }
    });

    document.getElementById('login-form').addEventListener('submit', async function(event) {
      event.preventDefault();

      const submitButton = document.getElementById('submit-button');
      submitButton.disabled = true;

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const loginUrl = 'https://api.hatena-scratch.f5.si/login';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };

      try {
        const response = await fetch(loginUrl, options);

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('authToken', data.token);
          alert('ログイン成功！');
          window.location.href = '/';
        } else {
          document.getElementById('error-message').style.display = 'block';
        }
      } catch (error) {
        console.error('エラーが発生しました:', error);
        document.getElementById('error-message').style.display = 'block';
      } finally {
        submitButton.disabled = false;
      }
    });
  </script>

</body>
</html>
  `);
});

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
