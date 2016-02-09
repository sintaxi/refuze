
var refuze  = require("../")
var should = require("should")

describe("basic", function(){

  var sub, pub
  before(function(done){
    sub = refuze.subscribe({})
    pub = refuze.scheduler({})
    done()
  })

  it("should alert in 1 seconds", function(done){
    sub.on("sendReminderEmail", function(email, name){
      email.should.eql("brock@sintaxi.com")
      name.should.eql("brock")
      done()
    })
    pub.schedule(1, "sendReminderEmail", ["brock@sintaxi.com", "brock"])
  })

  it("should alert in 3 seconds", function(done){
    sub.on("removeProject", function(domain){
      domain.should.eql("sintaxi.com")
      done()
    })
    pub.schedule(3, "removeProject", ["sintaxi.com"])
  })

  it("should alert in 8 seconds", function(done){
    sub.on("removeProject", function(domain){
      domain.should.eql("bart.com")
      done()
    })

    // here we continually reset the fuse by including a namespace.
    pub.schedule(3, "removeProject", "namespace", ["foo.com"])
    pub.schedule(4, "removeProject", "namespace", ["bar.com"])
    pub.schedule(5, "removeProject", "namespace", ["baz.com"])
    pub.schedule(6, "removeProject", "namespace", ["bart.com"])
  })

  it("should log unfound job", function(done){
    pub.schedule(1, "drip", ["sintaxi.com"])
    setTimeout(done, 3000)
  })

})
