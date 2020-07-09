const util = require('../util/util');
const { Permission, Carousel, Image, Suggestions } = require('actions-on-google');

module.exports = {
    welcome: (conv, buildResponse, resolve) => {
        let richConvList = [], convList = [];

        // var welcome_arr = [
        //     `Hello There!`
        // ];

        // let msg = util.getRandomMessage(welcome_arr);

        const username = util.getUsername(conv);

        let msg = `
        <speak>
        <par>
        <media xml:id="obi" soundLevel="10dB">
            <audio src="https://www.myinstants.com/media/sounds/obi-wan-hello-there.mp3">
            </audio>
          </media>
          <media xml:id="intromusic" soundLevel="5dB" fadeOutDur="3.0s">
            <audio src="https://www.myinstants.com/media/sounds/cantina-band.mp3" clipEnd="5.0s">
            </audio>
          </media>
          <media xml:id="intro" begin="intromusic.end-2.0s">
          <speak> Welcome to the Holocron. I am K-2S0. 
            <break time="200ms"></break>
            I am a reprogrammed Imperial Droid assigned to you as you embark on your journey as a Fulcrum agent.
          </speak>
          </media>
        </par>
      </speak>`;

        richConvList.push(msg);

        // if (!username) {
        //     // Asks the user's permission to know their name, for personalization.
        //     richConvList.push(new Permission({
        //         context: 'Hi there, to get to know you better',
        //         permissions: 'NAME',
        //     }));
        // } else {
        //     richConvList.push(msg);
        //     //richConvList.push(`Hi again, ${username}. What's your favorite color?`);
        // }

        buildResponse(conv, richConvList, convList);
        resolve();
    }
};