
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const cron = require("node-cron");

const app = express();

const Mensa = require('./models/mensa');
const User = require('./models/user');

app.use(cors());
app.use(bodyParser.json());


// //safe Push-Subscriptions
// const pushDB = []
// let body = []
// //body of notification
// let gerichte = ""
// //boolean for running notifications
// let run = false;

// const webpush = require('web-push');

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.privateKey, vapidKeys.publicKey)
// // webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY);
// webpush.setVapidDetails(
//     "mailto:s0568771@htw-berlin.de",
//     vapidKeys.publicKey,
//     vapidKeys.privateKey
// )
// const testData = {
//     title: "Testing",
//     body: "It's a success!"
//     // icon: "/path/to/an/icon.png"
// }

// let subscription
// let pushIntervalID

// app.post("/register", (req, res, next) => {
//     subscription = req.body
//     console.log(subscription)
//     res.sendStatus(201)
//     pushIntervalID = setInterval(() => {
//         // sendNotification can only take a string as it's second parameter
//         webpush.sendNotification(subscription, testData)
//             .catch(() => clearInterval(pushIntervalID))
//     }, 30000)
// })
//
// app.delete("/unregister", (req, res, next) => {
//     subscription = null
//     clearInterval(pushIntervalID)
//     res.sendStatus(200)
// })

// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//     endpoint: '.....',
//     keys: {
//         auth: '.....',
//         p256dh: '.....'
//     }
// };

// webpush.sendNotification(pushSubscription, 'Your Push Payload Text');

//add subscription to array
// app.post('/subscription', (req, res) => {
//     const subscription = req.body
//     pushDB.push(subscription)
//     res.send("ok!")
// })

//cron-job for push notifications. For demo every 3 min.
// Change to 9am daily for prod. mode
// cron.schedule('53 11 * * *', () => {
//     console.log(run)
//     if (run) {
//         const notificationPayload = {
//             notification: {
//                 title: 'Deine heutigen Mensamahlzeiten!',
//                 body: ['TEST']
//                 // icon: 'assets/icons/icon-512x512.png',
//             },
//         }
//         const promises = []
//         pushDB.forEach(subscription => {
//             promises.push(
//                 webpush.sendNotification(
//                     subscription,
//                     JSON.stringify(notificationPayload)
//                 )
//             )
//         })
//     }
// });

//Connect with MongoDB
const mongo = mongoose.connect('mongodb://localhost:27017/canteens3', {useUnifiedTopology: true, useNewUrlParser: true});
mongo.then(() => {
    console.log('mongo connected');
}).catch((err) => {
    console.log('err', err);
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// simple route
app.get("/mensen1", (req, res) => {
    res.json({ message: "Welcome to Appeteria application." });

});

// find all Mensen
app.get('/mensen', (req,res)=>{
    Mensa.Mensa.find((err, mensen) => {
        if (err) {
            console.log(err)
        } else {
            res.json(mensen);
        }
    });
});

// find one Mensa with ID
app.get('/mensa/:id', (req,res)=>{
    Mensa.Mensa.find( { id: req.params.id }, (err, mensa) => {
        if (err)
            console.log(err)
        else
            res.json(mensa);
    });
});

// post / update mensen (which includes the id)
app.post('/mensen', (req,res)=>{
    let newList = new Mensa.Mensa(
        req.body // new Bodytext
    );

    newList.save().then((listDoc) =>{
        //returned (with id)
        res.send(listDoc);
    });
});


// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});




