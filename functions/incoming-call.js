exports.handler = function (context,event,callback){


    const twiml = new Twilio.twiml.VoiceResponse();

    //TODO: THIS SHOULD BE THE NAME OF THE CURRENT TALK
    twiml.dial().conference("sample-conference-name");
    console.log(`TWIML is ${twiml}`)
    return callback(null, twiml);

}