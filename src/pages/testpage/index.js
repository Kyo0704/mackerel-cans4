import { useEffect, useState } from "react"

export default function Home() {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [liffToken, setLiffToken] = useState(null);

  const [userData, setUserData] = useState()
  let result
  let token

  useEffect(() => {
    // to avoid `window is not defined` error
    (async () => {
      const liff = (await import("@line/liff")).default;
      liff
        .init({ liffId: "2000097840-5YWOex9P" })
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
  }, [])

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

  const DisplayUser = () => {
    if (userData) {
      return (
        <>
          <div>userData : {userData.message}</div>
          <div>userId : {userData.userId}</div>
          <div>userName : {userData.displayName}</div>
        </>
      )
    } else {
      return (
        <div>userDataを取得ができませんでした。</div>
      )
    }
  }

  const DisplayLiff = () => {
    if (liffObject) {
      return (
        <div>
          LIFFがあります。
        </div>
      )
    } else {
      return (
        <div>
          LIFFがありません。
        </div>
      )
    }
  }

  return (
    <div>
      <div><DisplayLiff /></div>
      <div>liffError : {liffError}</div>
      <div>accessToken : {liffToken}</div>
      <div><DisplayUser /></div>
    </div>
  )
}