export default async function handler(req, res) {
  try {
    const { data } = req.body;
    console.log({ data })

    const response = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    });
    const profile = await response.json();
    res.status(200).json(profile)
    console.log(profile)
  }catch(err){
    res.status(500).json({error:err})
  }
}
