"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const { Carousel } = require("actions-on-google");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

// URLs for images used in card rich responses
const imageUrl =
  "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png";
const imageUrl2 =
  "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw";
const linkUrl = "https://assistant.google.com/";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function googleAssistantOther(agent) {
      let conv = agent.conv(); // Get Actions on Google library conversation object
      conv.ask("Please choose an item:"); // Use Actions on Google library to add responses
      conv.ask(
        new Carousel({
          title: "Google Assistant",
          items: {
            WorksWithGoogleAssistantItemKey: {
              title: "Works With the Google Assistant",
              description:
                "If you see this logo, you know it will work with the Google Assistant.",
              image: {
                url: imageUrl,
                accessibilityText: "Works With the Google Assistant logo"
              }
            },
            GoogleHomeItemKey: {
              title: "Google Home",
              description:
                "Google Home is a powerful speaker and voice Assistant.",
              image: {
                url: imageUrl2,
                accessibilityText: "Google Home"
              }
            }
          }
        })
      );
      // Add Actions on Google library responses to your agent's response
      agent.add(conv);
    }

    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    function other(agent) {
      agent.add(
        `This message is from Dialogflow's Cloud Functions for Firebase editor!`
      );
      agent.add(
        new Card({
          title: `Title: this is a card title`,
          imageUrl: imageUrl,
          text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
          buttonText: "This is a button",
          buttonUrl: linkUrl
        })
      );
      agent.add(new Suggestion(`Quick Reply`));
      agent.add(new Suggestion(`Suggestion`));
      agent.setContext({
        name: "weather",
        lifespan: 2,
        parameters: { city: "Rome" }
      });
    }

    // Run the proper handler based on the matched Dialogflow intent
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    // if requests for intents other than the default welcome and default fallback
    // is from the Google Assistant use the `googleAssistantOther` function
    // otherwise use the `other` function
    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
      intentMap.set(null, googleAssistantOther);
    } else {
      intentMap.set(null, other);
    }
    agent.handleRequest(intentMap);
  }
);
