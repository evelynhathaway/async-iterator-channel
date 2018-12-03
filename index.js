class Subscriber {
	constructor(channel) {
		this._queue = [];
		this.channel = channel;
		this.channel.subscribers.push(this);
	}
	destroy() {
		this.channel.subscribers = this.channel.subscribers.filter((subscriber) => subscriber !== this);
		if (this._promise) {
			this._promise.resolve({value: null, done: true});
			delete this._promise;
		}
	}
	next() {
		return this._queue.length ?
			Promise.resolve(this._queue.shift()) :
			new Promise((resolve, reject) => {
				this._promise = {resolve, reject};
			});
	}
	[Symbol.asyncIterator]() {
		return this;
	}
}


class Channel {
	constructor() {
		this.subscribers = [];
	}
	write(value, done = false) {
		const data = {value, done};
		for (let subscriber of this.subscribers) {
			if (subscriber._promise) {
				subscriber._promise.resolve(data);
				delete subscriber._promise;
			} else {
				subscriber._queue.push(data);
			}
			if (done) {
				subscriber.destroy();
			}
		}
	}
	stop() {
		this.write(null, true);
	}
	subscribe() {
		return new Subscriber(this);
	}
}


// Export
Object.defineProperty(module.exports, "__esModule", {value: true});
module.exports = {Subscriber, Channel};
module.exports.default = Channel;
