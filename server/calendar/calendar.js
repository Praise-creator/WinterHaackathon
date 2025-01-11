const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load the token stored in 'auth.js'
const TOKEN_PATH = path.join(__dirname, '../token.json');

// Load the token from file
const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

// Set up the OAuth2 client
const oAuth2Client = new google.auth.OAuth2();
oAuth2Client.setCredentials(token);

// Initialize the Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// Function to fetch events
async function getExistingCalendarEvents() {
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return events.data.items;
}

// Function to create events
async function createEvent(eventData) {
  for (let event of eventData) {
    try {
      await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      console.log('Event created:', event.summary);
    } catch (err) {
      console.log('Error creating event:', err);
    }
  }
}

module.exports = {
  getExistingCalendarEvents,
  createEvent
};
