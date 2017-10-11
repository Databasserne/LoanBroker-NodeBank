var amqp = require('amqplib/callback_api');
    
module.exports = {
    send: function() {
        amqp.connect("amqp://datdb.cphbusiness.dk", function(err, conn) {
            console.log("Error", err);
            console.log(conn);
            conn.createChannel(function(err, ch) {
                var out = "Databasserne_BankRabbitMQ";
        
                ch.assertQueue(out, {durable: false});
                ch.sendToQueue(out, new Buffer("Hello world"));
            });
            setTimeout(function() {
                conn.close();
                process.exit(0);
            }, 500);
        });
    }
}

module.exports = {
    replyTo: function(msg, interest, replyChannel) {
        amqp.connect("amqp://datdb.cphbusiness.dk", function(err, conn) {
            conn.createChannel(function(err, ch) {
                
				var data = JSON.stringify({"SSN": msg.SSN, "interest": interest });
				console.log(data.toString());
                ch.sendToQueue(replyChannel,
                    new Buffer(data.toString()));
            });
        });
    }
}