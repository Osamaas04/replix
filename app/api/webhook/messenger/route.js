// pages/api/webhook.js
export default function handler(req, res) {
  console.log(0)
  if (req.method === 'GET') {
    const VERIFY_TOKEN = '332004';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log(1)

    if (mode && token) {
      if (token === VERIFY_TOKEN) {
        console.log(2)
        return res.status(200).send(challenge);
      } else {
        console.log(3)
        return res.status(403).send('Error, invalid token');
      }
    }
    console.log(4)
    return res.status(400).send('Missing hub.mode or hub.verify_token');
    
  } else if (req.method === 'POST') {
    console.log(5)
    const data = req.body;
    console.log(6)
    return res.status(200).send('Event received');
  }
}
