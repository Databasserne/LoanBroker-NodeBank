var receive = require('./receive.js');
var send = require('./send');

var R = 3.14;

receive.receive(function(msg) {
    var replyTo = msg.properties.replyTo;
    var data = JSON.parse(msg.content);

    var r = R/100.0;
    var interest = data.loanAmount * r * data.loanDuration;

    send.replyTo(msg, interest);

});
//send.send();
