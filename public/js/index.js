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
        messages: [],
        isSendingLocation: false
    },
    mounted() {
        var self = this;
        socket.on('newMessage', function (message) {
            message.createdAtFormatted = moment(message.createdAt).format('h:mm a');
            self.messages.push(message);
        });

        socket.on('newLocationMessage', function(message) {
            message.createdAtFormatted = moment(message.createdAt).format('h:mm a');
            self.messages.push(message);
            self.isSendingLocation = false;
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
        },

        sendLocation() {            
            this.isSendingLocation = true;
            navigator.geolocation.getCurrentPosition(function (location) {
                socket.emit('createLocationMessage', {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
            }, function () {
                alert('Unable to fetch location');
            });
        }
    }
});