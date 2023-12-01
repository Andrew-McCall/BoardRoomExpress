console.log("Hello World!")
const cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
app.use(express.json());

const phonetic = ["Alpha", "Bravo","Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo","Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo","Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu"]

function CreateNewUser(){
    let name = ""
    name += phonetic[Math.floor(Math.random() * phonetic.length)]
    if (Math.random() > .5) name += phonetic[Math.floor(Math.random() * phonetic.length)]
    if (Math.random() > .5) name += phonetic[Math.floor(Math.random() * phonetic.length)]

    if (users.includes(name)){
        return CreateNewUser()
    }else{
        return name
    }
}

const messages = []
const users = []

app.get('/hello', (req, res) => {
    res.status(200).send("Hello LBG!")
});

app.get('/help', (req, res) => {
    res.status(200).send("GET, No Body - /getMessages\nPOST, No Body - /createAccount\nPOST, {user, message}/sendMessage")
});

app.get('/getMessages', (req, res) => {
    res.json(messages)
});

app.post('/createAccount', (req, res) => { 
    let user = req.body.user;
    let name;
    if (user){
        name = user;
    }else{
        name = CreateNewUser();
    }
    if (!users.includes(name)) users.push(name);
    res.json({user: name}) 
});

app.post('/sendMessage', (req, res) => { 
    let user = req.body.user;
    if (users.includes(user)){
        let message = req.body.message;
        if (message && message.length > 1){
            const last = messages.at(messages.length - 1)
            if (last && last.user == user && last.message == message){
                res.json({status: "Duplicate message\n{user: <username>, message: <message>}"})
            }else{
                messages.push({user: user, message: message, time: Date.now()})
                console.log("New message from " + user + ": '" + message + "'")
                res.json({status: "OK"})
            }
        }else{
            res.json({status: "Missing message\n{user: <username>, message: <message>}"})
        }
    }else{
        res.json({status: "Missing valid user\n{user: <username>, message: <message>}"})
    }
});


app.listen(2514);


