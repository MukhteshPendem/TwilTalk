
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
                code : 'Developers',
                startTime:"2025-02-20T14:00:00.220Z",
                speakers:["+916304894373"],
            },
            {
                title: 'Ted talks every tuesday',
                code : 'TEDTalk',
                startTime:"2025-02-20T14:00:00.220Z",
                speakers:["+916304894373"],
            }
        ];

    }

}





module.exports = {

    Data

};