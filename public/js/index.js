var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

new Vue({
    el: '#chat',
    data: {
        messageInput: '',
        messages: []
    },
    mounted() {
        var self = this;
        socket.on('newMessage', function (message) {
            self.messages.push(message);
            console.log(self.messages);
        });
    },
    methods: {
        sendMessage() {
            if (this.messageInput.length === 0) {
                return;
            }
            
            socket.emit('createMessage', {
                from: 'Frank',
                text: this.messageInput
            }, function (message) {
                console.log(message);
            });
            this.messageInput = '';
        }
    }
});