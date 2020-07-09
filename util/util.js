const { Carousel, Image, BrowseCarouselItem, BasicCard, Button, Permission } = require('actions-on-google');
const { Random } = require('random-js');
const random = new Random();
const interpolate = require('interpolate');

const AGENT_TYPE = {
    UNSPECIFIED: 'PLATFORM_UNSPECIFIED',
    FACEBOOK: 'FACEBOOK',
    SLACK: 'SLACK',
    TELEGRAM: 'TELEGRAM',
    KIK: 'KIK',
    SKYPE: 'SKYPE',
    LINE: 'LINE',
    VIBER: 'VIBER',
    ACTIONS_ON_GOOGLE: 'ACTIONS_ON_GOOGLE',
    GOOGLE_TELEPHONY: 'GOOGLE_TELEPHONY'
};

/*
  @desc: Checks whether the Object is empty or not
  @val: The Object to check
  @return: True if empty
*/
const isEmpty = (val) => {
    if (val === '' ||
        val === undefined || val === 'undefined' ||
        val === null ||
        (Object.keys(val).length === 0 && val.constructor === Object) ||
        (Array.isArray(val) && val.length === 0)) {
        return true;
    }
    return false;
};

const getMonthName = (month) => {
    var month_Names = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    return month_Names[month];
};

/*
  @desc: Checks whether the device has a display screen or not
  @conv: The conv object of the Action-on-Google
  @return: True if it has display screen
*/
const hasScreenOutput = (conv) => {
    return conv.screen;
};

/*
  @desc: A simple interpolate function
  @message: The templated message to be interpolated
  @param: Parameters to replace the templated fields
*/
const interpolateMessage = (message, param) => {
    return interpolate(message, param);
};


module.exports = {
    getMonthName: getMonthName,

    /*
      @desc: Returns a random message from a list of messages
      @arr: An array containing messages
      @return: A random message
    */
    getRandomMessage: (arr, param) => {
        let result;
        if (arr.length === 1) {
            result = arr[0];
        }
        result = arr[random.integer(0, arr.length - 1)];
        return interpolateMessage(result, param);
    },

    interpolateMessage: interpolateMessage,

    isEmpty: isEmpty,

    hasScreenOutput: hasScreenOutput,

    /*
      @desc: Builds a simplified Dialogflow response for Google Home/Assistant
      @conv: The Conversation object 
      @richConvList: An array consisting of rich responses supported by Google Assistant (Carousel, Card, Suggestions, etc)
      @convList: An array consisting of simple responses supported by Google Home
      @endConv: Boolean value, if true it ends a conversation
    */
    buildResponse: (conv, richConvList, convList, endConv) => {

        // If the device is Audio-Visual capable
        if (hasScreenOutput(conv)) {
            if (!isEmpty(conv) && !isEmpty(richConvList)) {
                for (let i in richConvList) {
                    if (endConv && i === richConvList.length - 1)
                        conv.close(richConvList[i]);
                    else
                        conv.ask(richConvList[i]);
                }
            }
        }
        //If the device is only Audio capable
        else {
            for (let i in convList) {
                conv.add(convList[i]);
            }
        }
    },

    getUsername: (conv) => {
        return conv.user.storage.userName;
    },

    setUsername: (conv, username) => {
        conv.user.storage.userName = username;
    },

    sortByDateAsc: (arr, date_attr) => {
        arr.sort(function (date1, date2) {
            return new Date(date1[date_attr]).getTime() - new Date(date2[date_attr]).getTime();
        });
        return arr;
    },

    buildCarouselItem: (obj, key, title, desc, image) => {
        obj[key] = {
            title: title,
            description: desc,
            image: new Image({
                url: image,
                alt: `${key} - ${title}`
            })
        };
        return obj;
    },

    buildBrowserCarouselItem: (title, desc, image, url, footer) => {
        return new BrowseCarouselItem({
            title: title,
            url: url,
            description: desc,
            image: new Image({
                url: image,
                alt: title,
            }),
            footer: footer,
        });
    },

    buildCardItem: (title, subtitle, desc, button_title, button_url, image) => {
        return new BasicCard({
            title: title,
            subtitle: subtitle,
            text: desc,
            buttons: new Button({
                title: button_title,
                url: button_url,
            }),
            image: new Image({
                url: image,
                alt: title,
            }),
            display: 'CROPPED',
        });
    },

    fetchSessionID: (request) => {
        //request.body.session: projects/small-talk-48f2f/agent/sessions/82fb4463-40c8-f2b3-e3c1-fb773e958bba
        if (!isEmpty(request.body.session)) {
            let arr = request.body.session.split('/');
            return arr[arr.length - 1];
        }
    }
};