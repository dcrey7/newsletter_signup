const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})


app.post("/", function(req, res) {

  const firstname = req.body.fname
  const lastname = req.body.lname
  const email = req.body.email
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merged_fields: {
        FNAME: firstname,
        LNAME: lastname

      }
    }]
  }
  const jsondata = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/31d994d48e";
  const options = {
    method: "POST",
    auth: "abhi:f32cdd7855229171c1b058a1a720339c-us20"
  }


  const request = https.request(url, options, function(response) {
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })

  })

  request.write(jsondata);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT, function() {
  console.log("server in running on port 3000");
})

//api
//6bcf744d189665104fdb4a44b37ae546-us20
//f32cdd7855229171c1b058a1a720339c-us20

//listid
//31d994d48e
