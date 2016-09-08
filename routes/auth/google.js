var rp = require('request-promise');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT);
var scopes = [
  'https://www.googleapis.com/auth/calendar'
];

function googleUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
  });
}

function googleTokens(code) {
  oauth2Client.getToken(code, function(err, tokens) {
    if(err) {
      console.log(err);
    }
    oauth2Client.setCredentials({
      access_token: tokens.access_token
    });

    rp('https://www.googleapis.com/calendar/v3/calendars/o51kkc22ckvrf14e8n3d495heg@group.calendar.google.com?access_token=' + tokens.access_token)
      .then((data)=>{
        console.log(data);
      });
  });
}

module.exports = {
  googleUrl: googleUrl,
  googleTokens: googleTokens
}
