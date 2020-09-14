"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const structjson = require("./structjson.js");

// const projectID = "reactpageagent-jcvpik";
const projectID = "testagent-akfnil";
const credentials = {
  client_email:
    // "dialogflow-client@reactpageagent-jcvpik.iam.gserviceaccount.com",
    "dialogflowclient@testagent-akfnil.iam.gserviceaccount.com",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDZNNYv4NOMQz7T\n0H0yfjctHB4NmWeJHtYnCHylYX0yGanEQM9wjIpDh6M/+cEK3rrWUzH4NpsOjDxx\nnJvNS366yy9FwzJkOje0pfkJ3CqVS4JKkm0EpUsTQxlcipzt1EC1tDcR83udlJ41\nTl4AE7HFlUsP10F/IW1AiIP4vWxlJCwZ98aHaE6Vb6de4CoM/0E1mBOlJa0TrD6U\n1srUz9emxx8RFYB0jNnmEpwuHmXDLzFI9G1Wvzmk1CMwTkCd7g8VWDD7+bV9/0eU\njKBrZYNBCooQ6Y5vakjwBJILpRemhCbSGoBYaydL/zKhCO/bj4M00nf43Rb4H1DN\nSSU66NW/AgMBAAECggEAOpncPa+hM6MC5N/Hn2NZHJUM8KtWOTL2ITLTekUao3U0\nDcxUiy+HsB98pmqKMBYWf3OTtD17SQoB1r8jc9ht+RSPjPlUc6EXXWg4D/Z0ELJ+\nFQN7YTj9T9WXFpYZL7tHuB5Gi1PPIp0xr/0UNF4b5MxaI4x2Ucfhc3tBa88jWwfP\nlnLUmujVBQ12N2+Pyc+7I4HulumBxjJuro5qBFyio9D39WLG00tnVG0VEPJI8fXW\n92VgnCp5CdjNRp3NiL0aR+g/v2YiaWpRTVwCdLnnQCLTCYsIEj6BKQeSpWxp1CLL\nFBtCSOdjbxcfomYLGyH9xkyww1zybNNQOzP3Ju7vyQKBgQDsl3gDvqnz4YR5xZyT\nMKs82ys2DNvtXqg/8N8mrvpMCKiHtps5NrEkZaXftPWxFz3iaHqJl9oRtftl5bBi\nhMRcgZEnciyGQAgQHnIEdxhK2CYU2/LIBVJAe+dbNSEL2z8n2i4Nlu/7NaIY9WxP\nTTvBqSw3v7C5TFTtA2gppngyBwKBgQDrBkSseC3rMReOyzIu2X9Uc5oo739UrCi4\njtPVxL86FUwFPyVwYYl2a/QcBeuWMsLtdnP3xqPP3QpeoCWQdQxSEj73iEEHbtWQ\nz/H4kbwTGwTqegg/tAxqXQKsOMIYzVpGsE77j1cDxcTOTXwwL70CF+FsWHNr+Mas\n3j1oYvVwiQKBgQDg0b5VsKRG/5GnNUToCWNu3MVfAzEpir1OpVEnrTZjcgbTj45I\n+9Owxnas8YRW18MSlj166jVqhwdxeKX3uDnvvZ91YGU23TnMN2IZJCKNXIAzah52\nO7hBVnwui3nvjlOhRw5kE33PtNNn7C8T3ExgZqWCBEGmkwZQguBEU8/7mQKBgQDi\nk1dvYij6nYhVjEVj7yCW/R+4qTN7IMHdMyy74IJub4urXzYrwoxwUyCyR27YjTVp\nEpI4ZBMW2MUfdorgWkc3dAmqP3xZuxs/EYn4Fh9X1+uEVYNQTrbNb7+c4tcUbBzF\nG0H5uTWtGGNkdETue4de1kDnX9peVCbNDy/qS8TM6QKBgQCHh8kU3egNUFlmDCWP\nHQ9O8owdllz21VQvPvFGpaWwN9cZXpBqxA4YuILlUrOs+oi8MFehETQ/CFejb6/e\nLZ/CGJ6DAuYYyZzR9LsL2dmLfBSDK+f1z+IjLRQXWPZGdnFnf3ZQ55GEBfAejlwF\n2X/rMtLgnELjd8PRj20kyx9Pfg==\n-----END PRIVATE KEY-----\n",
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(
  "testagent-akfnil",
  "react_bot_session"
);
module.exports = {
  textQuery: async function (text, parameters = {}) {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text,
          // The language used by the client (en-US)
          languageCode: "fr-FR",
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    //console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function (event, parameters = {}) {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
          // The language used by the client (en-US)
          languageCode: "fr-FR",
        },
      },
    };

    // console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function (responses) {
    return responses;
  },
};
