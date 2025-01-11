const fs = require('fs');
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

async function authorize() {
  let client;

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    client = google.auth.fromJSON(token);
    console.log('Token loaded from file.');
  } else {
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    const token = client.credentials;
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
    console.log('Token saved to', TOKEN_PATH);
  }

  console.log('Authorization successful.');
  return client;
}

authorize().catch(console.error);
