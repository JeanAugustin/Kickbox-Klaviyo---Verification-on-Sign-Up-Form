const express = require('express');
const app = express();
const port = 3000;
const Kickbox = require('kickbox').client;
const kickbox = new Kickbox('live_ab5b57be0f5e867f4483bcc3d1dae66cb2b607a7b591a62c97173130d6f93e97').kickbox();
const bodyParser = require('body-parser');
const cors = require('cors'); 

app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors()); // Enables CORS for all routes 

let kickboxLookup = {}
 
app.get('/', (req, res) => {
  res.send('My Express Server');
});

app.post('/data', (req, res) => {

  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  console.log("Email:", email)

  kickbox.verify(email, function (err, response) {

    if (err) {
      console.log(err)

    } else {
      kickboxLookup = response.body
        if (kickboxLookup.result === 'undeliverable') {
            console.log('Result:', kickboxLookup.result)
            console.log('Sendex Score:', kickboxLookup.sendex)
            console.log('Reason:',kickboxLookup.reason)
            console.log('Disposable:', kickboxLookup.disposable)
            console.log('----------------------------')

// Reject Email
// Send Info Back to the front-end
// Display message to end-users requesting valid email

            } else {
            console.log('Result:', kickboxLookup.result)
            console.log('Sendex Score:', kickboxLookup.sendex)
            console.log('Reason:',kickboxLookup.reason)
            console.log('Disposable:', kickboxLookup.disposable)
            console.log('----------------------------')

// Subscribe Email for Marketing
            }
      }
      return kickboxLookup
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = kickboxLookup;
