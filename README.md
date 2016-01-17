# refuze

> A natural language job queue for doing things later. Built on Redis.

# Example

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

