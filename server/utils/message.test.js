const expect = require('chai').expect;
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const res = {
            from: 'Pesho Goshev',
            text: 'Kak sme Goshka'
        };

        const message = generateMessage(res.from, res.text);
        expect(message.from).to.equal(res.from);
        expect(message.text).to.equal(res.text);
        expect(message.createdAt).to.be.a('number');
    })
});