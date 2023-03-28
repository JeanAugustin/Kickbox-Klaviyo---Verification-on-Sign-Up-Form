const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const Kickbox = require('kickbox').client;
const kickbox = new Kickbox(process.env.KICKBOX_API_KEY).kickbox();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors()); // Enables CORS for all routes 

let kickBoxResults = {};
 
app.post('/', (req, res) => {

  const email = req.body.email;


  kickbox.verify(email, function (err, response) {

    if (err) {
      console.log(err)

    } else {
      kickboxLookup = response.body

      kickBoxResults = {
        "Email": email,
        "Result": kickboxLookup["result"],
        "Sendex": kickboxLookup["sendex"],
        "Reason": kickboxLookup["reason"],
        "Disposable": kickboxLookup["disposable"]
      }
    }
      console.log(kickBoxResults)
      res.send(kickBoxResults)
  })
})

app.get('/', (req, res) => {
  res.send("Server's Running!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})