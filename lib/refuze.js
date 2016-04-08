
var redis = require("redis")
var debug = require("debug")("refuze")

exports.subscribe = function(config, redisClient){
  var sub    = redisClient || redis.createClient(config["redis"] || {})
  var client = redisClient || redis.createClient(config["redis"] || {})
  var fns = {}

  sub.psubscribe('__key*__:expired', function(){
    debug("listening for expiring keys")
  })

  sub.on("pmessage", function(pattern, event, message){
    var arr = message.split(":")

    if (arr.length && arr[0] == "refuze" && arr[arr.length -1] !== "args") {
      var key   = [message, "args"].join(":")
      var fn    = arr[1]
      var transaction = client.multi()
      transaction.get(key)
      transaction.del(key)
      transaction.exec(function(err, replies){
        var args = JSON.parse(replies[0])
        if (!err) {
          if (fns.hasOwnProperty(fn)) {
            fns[fn].forEach(function(fn){
              fn.apply(undefined, args)
            })(fn)
          } else if(fns["noSuchJob"]) {
            fns["noSuchJob"].forEach(function(fn){
              fns["noSuchJob"].apply(undefined, fn, args)
            })(fn)
          } else {
            console.log("noSuchJob:", fn, args)
          }

        }
      })
    }
  })

  return {
    on: function(fnName, fn){
      fns[fnName] = fns[fnName] || []
      fns[fnName].push(fn)
    }
  }
}


exports.scheduler = function(config, redisClient){
  var client = redisClient || redis.createClient(config["redis"] || {})

  return {
    schedule: function(time, fnName, namespace, args){
      if (!args) {
        args = namespace
        namespace = new Date().toJSON()
      }

      var key   = ["refuze", fnName, namespace].join(":")
      var val   = [key, "args"].join(":")
      var args  = JSON.stringify(args)
      var transaction = client.multi()
      transaction.set(key, val)
      transaction.expire(key, time)
      transaction.set(val, args)
      transaction.expire(val, time + 2)
      transaction.exec(function(err, replies){
        debug("SCHEDULED", fnName, args)
      })
    }
  }
}
