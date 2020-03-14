"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const structjson = require("./structjson.js");

const projectID = config.googleProjectId;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(
  config.googleProjectId,
  config.dialogFlowSessionID
);
module.exports = {
  textQuery: async function(text, parameters = {}) {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowLanguageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    //console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, parameters = {}) {
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
          languageCode: config.dialogFlowLanguageCode
        }
      }
    };

    // console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses) {
    return responses;
  }
};
