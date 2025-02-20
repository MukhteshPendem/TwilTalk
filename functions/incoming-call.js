
const assets = Runtime.getAssets();

const {Data} = require(assets["/data.js"].path);

exports.handler = function (context,event,callback){


    const twiml = new Twilio.twiml.VoiceResponse();

    //TODO: THIS SHOULD BE THE NAME OF THE CURRENT TALK

    const data = new Data(context);

    const talk = data.getCurrentTalk();

    if (talk !== undefined){

        twiml.dial().conference({muted:false},talk.code);
    }

    else{
        twiml.say("There is no talk currently. Send us a text for a schedule of upcoming talks")
    }


    console.log(`TWIML is ${twiml}`)
    return callback(null, twiml);

}