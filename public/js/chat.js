var socket = io();

socket.on('connect', function () {
    let params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// Vue.use(vChatScroll);
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

        socket.on('newLocationMessage', function (message) {
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

new Vue({
    el: '#users',
    data: {
        users: []
    },
    mounted: function() {
        var self = this;
        socket.on('updateUserList', function (users) {
            self.users = users;
            console.log(users);
        });
        
    }
})