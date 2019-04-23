const {timeChannel} = require("./implementer");

// Subscribe to the class
const timeSubscriber = timeChannel.subscribe();

(async () => {
	for await (const time of timeSubscriber) {
		console.log(`The time at broadcast was: ${time}`);

		const someCondition = false;
		if (someCondition) {
			// End early if you wanna
			timeSubscriber.destroy();
		}
	}

	console.log("Time channel finished broadcasting.");
})();
