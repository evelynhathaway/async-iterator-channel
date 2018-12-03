# asynciteratorchannel

An experiment I made to learn async iterators added in Node.js `v10.0.0`. It allows an implementer to create a channel consumers can subscribe to (like observables or events) and use `for await` syntax instead of callbacks.

Given that there are existing mature APIs and libraries that fit this use case, don't use this in your codebase. Instead, take a look at:
- [ES observables](https://github.com/tc39/proposal-observable)
- [RxJS observables](https://rxjs-dev.firebaseapp.com)
- [Node.js streams](https://nodejs.org/api/stream.html) which will soon have [stable support for async iterators](https://github.com/nodejs/readable-stream/issues/333)
- [Node.js EventEmmiters](https://nodejs.org/api/events.html)
- Or just use callbacks 😜
