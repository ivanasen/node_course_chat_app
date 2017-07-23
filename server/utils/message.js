const moment = require('moment');

class Message {
    constructor(from, text) {
        this.from = from;
        this.text = text;
        this.createdAt = moment().valueOf();
    }
}

module.exports = Message;