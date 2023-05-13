const functions = require("firebase-functions");
const express = require("express");
const cors=require("cors");
const { query } = require("express");
const stripe=require("stripe")('sk_test_51JF428SEixEbQ6LLDvXbrseoKxYxoR1w3wk2MUrIYRryuaZirguuMIqFXzvGJnkAyNRNoiee0wKNip2Jqg6qLNty00HUjDENOG')
 // API

 // App config
const app=express();

// MiddleWares
app.use(cors({origin: true}));
app.use(express.json());      // This allows us to send data in json format


// Api routes
app.get("/",(request,response) => response.status(200).send("Hello World"));
app.post("/payments/create",async (request,response) => {
    const total=request.query.total      // We can do this even by request.params
    console.log("Payment Request Received...", total);

    const paymentIntent=await stripe.paymentIntents.create({
        amount: total,  // subunits of currency
        currency: "inr"
    });
    //OK -created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
 

// listen command
exports.api=functions.https.onRequest(app);






















// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
