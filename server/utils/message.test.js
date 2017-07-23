const expect = require('chai').expect;
const Message = require('./message');
const LocationMessage = require('./location-message');

describe('Message', () => {
    it('should generate the correct message object', () => {
        const res = {
            from: 'Pesho Goshev',
            text: 'Kak sme Goshka'
        };
        const message = new Message(res.from, res.text);

        expect(message.from).to.equal(res.from);
        expect(message.text).to.equal(res.text);
        expect(message.createdAt).to.be.a('number');
    })
});

describe('LocationMessage', () => {
    it('should generate the correct location message object', () => {
        const res = {
            from: 'Pesho',
            latitude: 13.2453,
            longitude: 12.24235
        };
        const message = new LocationMessage(res.from, res.latitude, res.longitude);

        expect(message.from).to.equal(res.from);
        expect(message.latitude).to.equal(res.latitude);
        expect(message.longitude).to.equal(res.longitude);
        expect(message.url).to.be.a('string');
        expect(message.createdAt).to.be.a('number');
    });
});