import mysql from 'mysql2'

export default async function handler(req, res) {
  const db_setting = (await import("../../../db/db")).default;
  const connection = mysql.createConnection(db_setting)
  try {
    // POSTリクエストのボディからデータを取得
    const { data } = req.body;

    // データを挿入するためのクエリを作成
    const query = `SELECT r.sid, s.sname from Registered_stores as r join Store as s on r.sid = s.sid where r.uid = '${data.userId}'`;
    // データベースにデータを挿入
    connection.query(query, async (error, results, fields) => {
      if (error) {
        console.error(error);
        await res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
      } else {
        res.status(200).json({ data: results });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
  } finally {
    connection.end();
  }
}