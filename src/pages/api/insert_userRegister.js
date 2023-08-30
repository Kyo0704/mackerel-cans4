import mysql from 'mysql2'
import db_setting from '../../../db/db';;

export default async function handler(req, res) {
  const connection = mysql.createConnection(db_setting)
  try {
    // POSTリクエストのボディからデータを取得
    const { data } = req.body;
    
    // データを挿入するためのクエリを作成
    const query = `INSERT INTO User VALUES ('${data.userId}','${data.displayName}')`;
    
    // データベースにデータを挿入
    connection.query(query, async (error, results, fields) => {
      if (error) {
        console.error(error);
        await res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
      } else {
        await res.status(200).json({ data: results });
      }
    });
  } catch (error) {
    await res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
  } finally {
    connection.end()
  }
}
