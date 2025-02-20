
const assets = Runtime.getAssets();

const {Data} = require(assets["/data.js"].path);

exports.handler = function (context,event,callback){


    const twiml = new Twilio.twiml.MessagingResponse();

    const data = new Data(context);

    const action = data.parseInput(event.Body);

    switch (action.command){

        case "join":

            const talk = data.getTalkByCode(action.code);

            if (talk !== undefined){
                data.addRegistration(action.code, event.From);
                twiml.message(`You are now registered for ${talk.title}. Don't call us !!`)
            }
            else{
                twiml.message(`Unable to find the upcoming code ${action.code}.`)
            }
            break ;

        default:
            twiml.message(`i Don't Know what do you mean by "${event.Body}"`)
            break;
    }



    return callback(null, twiml);

}