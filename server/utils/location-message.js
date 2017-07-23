const moment = require('moment');

class LocationMessage {
    constructor(from, latitude, longitude) {
        this.from = from;
        this.url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = moment().valueOf();
    }
}

module.exports = LocationMessage;