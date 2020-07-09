'use strict';

/** Config variables
 * */
const config = require("./config/config");

/** Import packages to deploy an Express Server
 *  */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * Import the Dialogflow module and response creation 
 * dependencies from the Actions on Google client library.
 * */
const {
  dialogflow,
  BasicCard,
  Permission,
  Suggestions,
  Carousel,
  Image,
} = require('actions-on-google');

/** Utilities
   * */
const logger = require("./config/log");
const util = require("./util/util");


/** Intent Classes
 * */
const welcome_intent = require("./intents/welcome.intent");
const permission_intent = require("./intents/permissions.intent");
const fallback_intent = require("./intents/fallback.intent");
const exit_intent = require("./intents/exit.intent");


// Create an dialogflow app instance
const app = dialogflow();


// Dialogflow intent Function Mapping
app.intent('Default Welcome Intent', welcome_intent.welcome);
app.intent('Default Fallback Intent', fallback_intent.fallback);
app.intent('actions_intent_PERMISSION', permission_intent.usernamePermission);
app.intent('Exit', exit_intent.exit);


/**
 *  Deploying in Express Server. All Action on Google Code goes over this.
 */

const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillment', app);
expressApp.listen(5000);