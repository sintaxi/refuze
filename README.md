# refuze

> A natural language job queue for doing things later. Built on Redis.

# Example

```js
var refuze  = require("refuze")({})
var fuze    = refuze.createClient("namespace")

// set actions.

fuze.on("sendWelcomeEmail", function(email){
  // its that easy.
})

fuze.on("sendEmailVerificationReminder", function(email){
  // send email verification reminder.
})


// set differed actions...

fuze.do("in 4 hours", "sendWelcomeEmail", ["fred@sintaxi.com"])
fuze.do("in 3 days", "sendEmailVerificationReminder", ["fred@sintaxi.com"])
```

## Getting started

To run the project locally, you’ll need to have a recent version of [Node.js](https://nodejs.org) and [Redis](http://redis.io/topics/quickstart) installed. Next, clone the project:

```sh
# Clone the project
git clone https://github.com/sintaxi/refuze
cd refuze

# Install dependencies
npm install
```

You’ll also want to use the included config when you start Redis:

```sh
redis-server ./config/redis.conf
```

Now, you can run the tests:

```
npm test
```
