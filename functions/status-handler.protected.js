const assets = Runtime.getAssets();

const {Data} = require(assets["/data.js"].path);

exports.handler = async function (context,event,callback) {

    const data = new Data(context);
    const client = context.getTwilioClient();
    switch(event.StatusCallbackEvent){

        case "participant-leave":

            const code = event.FriendlyName;
            const talk = data.getTalkByCode(code);
            console.log(`sending text about ${talk.title}`)
            const call = await client.calls(event.callSid).fetch();
            const attendeeNumber = call.direction === "outbound-api" ? call.to : call.from
            const message = await client.messages.create({
                //TODO: BUY A NUMBER IN TWILIO FOR POLL SURVEY MESSAGING SERVICE(SO THAT WE CAN HAVE FROM NUMBER BELOW)
                to:attendeeNumber,
                from:"",
                body:`Thanks for attending ${talk.title}, On a scale of
                 1 to 10, how likely are you to recommend TwilTalk to your friends`,

            })

            break;
        default:
            console.log(`unhandled event ${event.StatusCallbackEvent}`);
            break;

    }


};