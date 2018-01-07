const request=require('request');
var admin = require("firebase-admin");
var serviceAccount = require("../service-account.json");
let sess;

module.exports = function(app) {
    app.get('/firebase', function (req ,res) {
        sess = req.session;
        res.render('firebase-clientview', {session:sess});
        //console.log(tokenToServer);
    });
    app.post('/send-token-to-server',function (req, res) {
        var currentToken = req.param('currentToken');
        console.log(currentToken);
        sess = req.session;
        res.render('firebase-clientview',{session:sess});

    });

    app.get('/call-notification', function (req, res) {
        if (admin.apps.length == 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://ecrm-fh-kiel.firebaseio.com"
            });
        }
// This registration token comes from the client FCM SDKs.

        var registrationToken = "csDfzjm0re8:APA91bFZ_bXG41mdLVIfLeImwQboQ3oFyXTKFshwBaGueCNXuBOO4SXHhe-kjq4K1oqPXLX3yGAHRnkinsKIJZqTr8M8pgJEMDKjygIxPJZAFP5GqjzF13o2-zVS6jw2UNXZTuENbI0b";

// See the "Defining the message payload" section below for details
// on how to define a message payload.
        var payload = {
            notification: {
                title: "Urgent action needed!",
                body: "Urgent action is needed to prevent your account from being disabled! ESAM is happy",
                icon: "images/logo.png"
            }
        };
// Send a message to the device corresponding to the provided
// registration token.

        admin.messaging().sendToDevice(registrationToken, payload)
            .then(function (res) {
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log("Successfully sent message:", res);
            })
    });

    //get access token
    /*function getAccessToken() {
        return new Promise(function(resolve, reject) {
            var key = require('./service-account.json');
            var jwtClient = new google.auth.JWT(
                key.client_email,
                null,
                key.private_key,
                SCOPES,
                null
            );
            jwtClient.authorize(function(err, tokens) {
                if (er
                r) {
                    reject(err);
                    return;
                }
                resolve(tokens.access_token);
            });
        });
    }
//http request
    var json = {
        "message":{
            "token" : "e7nfxKa0fck:APA91bEawrneFWSn7G6y75tjNz2LuasdyyDOs7mcctfc_qH75n-rQvw9m6NHO4kgVL_blIB1Wpqkj7Xib_zDyvvjw2YlqdmomKlP2nJhkXCnZ00Hc_iirhFt0LNZko8TeQjg-wIBiS4K",
            "notification" : {
                "body" : "This is an FCM notification message! ESAM",
                "title" : "FCM Message",
            }
        }
    };

    var options = {
        url: 'https://fcm.googleapis.com/v1/projects/ecrm-fh-kiel/messages:send HTTP/1.1',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization:': 'Bearer AAAAKiLc4Xo:APA91bHKImUbo3yOw-HaRwbZCK_1VC03uJsLppHi4K2GIADRI5sC74hjxb826ggjPGwGEFJHeQhwV3Mh2KyRGwlLV66AJHSda2OjRXbncWS-OoBJuestsfIK7Nd-Oz4GcHfeczofy7jh'
        },
        json: json
    };

    request(options, function(err, res, body) {
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            console.log(body);
        }
    });
*/
};