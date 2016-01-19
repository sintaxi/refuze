
var refuze  = require("../")
var should = require("should")

describe("basic", function(){

  var sub, pub
  before(function(done){
    sub = refuze.subscribe({})
    pub = refuze.scheduler({})
    done()
  })

  it("should alert in 2 seconds", function(done){
    sub.on("sendReminderEmail", function(email, name){
      email.should.eql("brock@sintaxi.com")
      name.should.eql("brock")
      done()
    })
    pub.schedule(2, "sendReminderEmail", ["brock@sintaxi.com", "brock"])
  })

  it("should alert in 7 is seconds", function(done){
    sub.on("removeProject", function(domain){
      domain.should.eql("sintaxi.com")
      done()
    })
    pub.schedule(7, "removeProject", ["sintaxi.com"])
  })

})
