exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  console.log(`Password: ${context.PASSWORD}`)
  twiml.say(`Hello ${event.FirstName} !`);
  callback(null, twiml);
};
