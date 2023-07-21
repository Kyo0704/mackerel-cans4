export default async function handler(req, res) {
  try {
    const { data } = req.body;

    const response = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    });
    const profile = await response.json();
    res.status(200).json(profile)
  }catch(err){
    res.status(500).json({error:err})
  }
}
