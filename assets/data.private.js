
class Data {
    constructor(context) {

        this.context = context;
    }

    getCurrentTalk(){

        return this.getUpcomingTalks()[0];
    }

    getUpcomingTalks(){

        return [
            {
                title: 'Programmers at Work',
                code : 'developers',
                startTime:"2025-02-20T14:00:00.220Z",
                speakers:[{

                    name:'Mukhtesh',
                    phoneNumber: "+916304894373"

                }],
            },
            {
                title: 'Ted talks every tuesday',
                code : 'tedtalk',
                startTime:"2025-02-20T14:00:00.220Z",
                speakers:[{

                    name:'Mukhtesh',
                    phoneNumber: "+916304894373"

                }],
            }
        ];

    }

    getTalkByCode(code){

        const talks = this.getUpcomingTalks();

        return talks.find((t) => t.code === code);

    }

    addRegistration(code, phoneNumber){

        return true;

    }

    async getRegistrants (talk){

        //TODO: THIS NEEDS TO COME FROM AN EXTERNAL SOURCE NOT FROM LOGS

        const client = this.context.getTwilioClient();

        const messages = await client.messages.list({
            to: this.context.TWILIO_PHONE_NUMBER
        })

        return messages.filter((message) => {

            const action = this.parseInput(message.body);

            return action.command === "join" && action.code === talk.code;
        }).map((message) => {
            return {phoneNumber: message.from}
        })
    }

    parseInput(input){

        // join code

        const action = {
            input
        };

        const normalized = input.trim().toLowerCase();

        const parts = normalized.split(/\s+/);

        if (parts.length === 2) {

            action.command = parts[0];
            action.code = parts[1];
        }

        return action;

    }


}





module.exports = {

    Data

};