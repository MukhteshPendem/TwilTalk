const assets = Runtime.getAssets();

const {Data} = require(assets["/data.js"].path);

exports.handler = async function (context,event,callback) {

    const data = new Data(context);
    const client = context.getTwilioClient();
    const code = event.TalkCode;
    const talk = data.getTalkByCode(code);
    const speakerCallSids = [];
    console.log("Calling Speakers.....");
    for (const speaker of talk.speakers) {

        const participant = await client
            .conferences(talk.code)
            .participants.create({
                to: speaker.phoneNumber,
                from: context.TWILIO_PHONE_NUMBER,
                label:speaker.name,
                beep:true,
                startConferenceOnEnter:true

            });

        speakerCallSids.push(participant.callSid);

    }

    const registrants = await data.getRegistrants(talk);
    console.log("Calling registrants.....")

    let registrantPhoneNumbers = registrants.map(registrant => registrant.phoneNumber);

    const registrantPhoneNumbersSet = new Set(registrantPhoneNumbers);

    registrantPhoneNumbers = [...registrantPhoneNumbersSet];

    const promises = registrantPhoneNumbers.map( async (registrantPhoneNumber)  => {

        const participant = await client
        .conferences(talk.code)
        .participants.create({
                to: registrantPhoneNumber,
                from: context.TWILIO_PHONE_NUMBER,
                beep:false,
                startConferenceOnEnter:false,
                muted:true

            });

        return participant.callSid;

    });

    const results = await Promise.allSettled(promises);

    const registrantCallSids = results
        .filter((result) => result.status === "fullfiled")
        .map((result) => result.value);

    results.filter(result => result.status === "rejected")
    .forEach((result) => console.error(result.reason));

    console.log(`
    Code: ${event.TalkCode}
    Speakers: ${speakerCallSids.length}
    Registrants: ${registrantCallSids.length}
    Failed registrant attempts: ${registrantPhoneNumbers.length-registrantCallSids.length}
    `);

     callback(null, {
        talkCode:event.talkCode,
        speakerCallSids,
        registrantCallSids,
    });



};
