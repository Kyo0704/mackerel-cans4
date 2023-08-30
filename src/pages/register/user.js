import { useState, useEffect } from "react";
import styles from "../../../styles/registerUser.module.scss"

export default function Home() {
  const [liffObject, setLiffObject] = useState("");
  const [liffError, setLiffError] = useState("");
  const [liffToken, setLiffToken] = useState("");
  const [userData, setUserData] = useState("");
  const [insertError, setInsertError] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  let result
  let token

  useEffect(() => {
    /************************************************************** */
    // テスト用に仮データを挿入　本番はすべてコードを消す
    // setLiffObject("kamikami");
    // token = "fake token"
    // result = {
    //   "userId": "U0085669a8271dedff6046bcc45bfe915",
    //   "displayName": "リョウマ",
    //   "pictureUrl": "https://profile.line-scdn.net/abcdefghijklmn",
    //   "statusMessage": "Hello, LINE!"
    // };
    // setUserData(result);
    /************************************************************** */

    (async () => {
      const liff = (await import("@line/liff")).default;
      liff
        .init({ liffId: "2000068932-M9Y3z0D8" })
        .then(() => {
          token = liff.getAccessToken();
          console.log("LIFF init succeeded.");
          setLiffToken(token)
          setLiffObject(liff);
          getUserData()
        })
        .catch((error) => {
          console.log("LIFF init failed.");
          setLiffError(error.toString());
        });
    })()
  }, []);

  // ユーザーデータの取得
  const getUserData = async () => {
    const data = { token: token }
    const response = await fetch('/api/getUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    result = await response.json()
    setUserData(result)
  }

  const insertData = async () => {
    try {
      const data = { userId: userData.userId, displayName: userData.displayName }
      const response = await fetch('/api/insert_userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
      } else {
        console.error('データの挿入中にエラーが発生しました。');
        setInsertError(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  function buttonClick() {
    setIsSelected(true);
    insertData()
  }

  function buttonClick_back() {
    setIsSelected(false)
  }

  const Display_select = () => {
    if (!isSelected) {
      return (
        <div className={styles.title}>
          LINEのユーザー情報を使用して<br></br>アラトクのアカウントを作ります。<br></br>よろしいですか。<br></br>
          <button className={styles.Button} variant="contained" id='checkButton' onClick={buttonClick}>登録</button>
        </div>
      )
    } else if (insertError == true) {
      return (
        <div className={styles.title}>データベースに登録できませんでした。</div>
      )
    } else {
      return (
        <div className={styles.title}>ユーザーを登録しました。</div>
      )
    }
  }

  const Display_BackButton = () => {
    if (isSelected == true) {
      return (
        <div className={styles.title}>
          <button className={styles.Button} id='checkButton' onClick={buttonClick_back}>戻る</button>
        </div>
      )
    }
  }

  if (liffObject && liffToken) {
    return (
      <div className={styles.title}>
        <Display_select />
        <Display_BackButton />
      </div>
    )
  } else if (!liffObject) {
    return (
      <div className={styles.title}>
        <p>エラーが発生しました。</p>
        <p>{liffError}</p>
      </div>
    )
  } else if (!liffToken) {
    return (
      <div className={styles.title}>
        ユーザー情報を取得できませんでした。
      </div>
    )
  }
}