import connection from '../../../db/db';

export default async function handler(req, res) {
  // POSTリクエストのボディからデータを取得
  const { data } = req.body;

  const response = await fetch('https://api.line.me/v2/profile', {
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });
  const profile = await response.json();
  

  // データを挿入するためのクエリを作成
  const query = `INSERT INTO User VALUES ('${profile.userId}','${profile.displayName}')`;

  // データベースにデータを挿入
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
    } else {
      res.status(200).json({data : results});
    }

    // データベース接続を閉じる
    connection.end();
  });
}
