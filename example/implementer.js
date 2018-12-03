const {Channel} = require("../index");

// Create a new channel
const timeChannel = new Channel();

// Send the time every 1s
const intervalId = setInterval(() => {
	timeChannel.write(new Date());
}, 1000);

// Stop after 10s
setTimeout(() => {
	clearInterval(intervalId);
	timeChannel.stop();
}, 10000);

// Exportting the channel
module.exports = {timeChannel};
