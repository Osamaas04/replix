// pages/api/webhook.js
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing for webhook to handle raw body
  },
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Verification request (GET)
    handleVerification(req, res);
  } else if (req.method === 'POST') {
    // Event notification (POST)
    handleEvent(req, res);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

function handleVerification(req, res) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Check if the mode and token are correct
  if (mode && token && token === process.env.VERIFY_TOKEN) {
    // Respond with challenge value
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403); // Forbidden
  }
}

function handleEvent(req, res) {
  const buf = [];

  req.on('data', chunk => {
    buf.push(chunk);
  });

  req.on('end', () => {
    const body = Buffer.concat(buf).toString();

    // Validate signature (ensure it's from Meta)
    if (!verifyRequestSignature(req, body)) {
      res.sendStatus(403); // Invalid signature
      return;
    }

    try {
      const json = JSON.parse(body);
      console.log('Webhook Event:', json);  // Log event data for debugging
      // Here, you can process the event (e.g., respond to messages)
      res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.sendStatus(400); // Bad Request
    }
  });
}

function verifyRequestSignature(req, body) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) {
    return false;
  }

  const elements = signature.split('=');
  const signatureHash = elements[1];
  const expectedHash = crypto
    .createHmac('sha256', process.env.FACEBOOK_APP_SECRET)
    .update(body)
    .digest('hex');

  return signatureHash === expectedHash;
}

