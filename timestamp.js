//
// { "unix": 1450137600, "natural": "December 15, 2015" }
exports.getTimestamp = function(userInput) {
  // The user-input must be either a valid unix timestamp or a valid
  // natural language date.

  var d = Date.parse(userInput)
  // console.log("Parse Result: " + d + " " + typeof(d))
  var dt = new Date(d)
  if (typeof(d) === "number" && dt.toDateString() !== "Invalid Date") {
    d = new Date(d)
    // console.log(d.toString())
    return {"unix": d.getTime(), "natural": d.toDateString()}
  }
  return {"unix": null, "natural": null}
}

module.exports = exports
