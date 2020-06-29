const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const server = app.listen(port, function() {
    console.log('server running on port 5000')
});
const io = require('socket.io')(server)
const axios = require('axios')

const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: "Uniweathervue",
    charset : 'utf8mb4'
})

let last_entry_id 

//establish connection
conn.connect(async function(error) {
    if (error) 
        console.log(error);
    else
        console.log("Connected!");

    conn.query("DELETE FROM feeds", function (error, result) {
        if (error) 
            console.log(error);
        else
            console.log("Number of records deleted: " + result.affectedRows);
    });

    conn.query("DELETE FROM channel", function (error, result) {
        if (error) 
            console.log(error);
        else
            console.log("Number of records deleted: " + result.affectedRows);
    });

    let weatherInfo = await fetchData()
    
    //Insert feeds into database
    let feeds = weatherInfo.feeds
    let attributes = Object.keys(feeds[0]).reduce((sum, value) => sum + ", " + value)
    let values = feeds.map(feed => Object.values(feed))

    conn.query("INSERT INTO feeds (" + attributes + ") VALUES ?", [values], function (error, result) {
        if (error) 
            console.log(error);
        else
            console.log("Number of records inserted: " + result.affectedRows);
    });

    //Insert channel into database
    let channel = weatherInfo.channel
    attributes = Object.keys(channel).reduce((sum, value) => sum + ", " + value)
    values = [Object.values(channel)]

    conn.query("INSERT INTO channel (" + attributes + ") VALUES ?", [values], function (error, result) {
        if (error) 
            console.log(error);
        else
            console.log("Number of records inserted: " + result.affectedRows);
    });

    last_entry_id = weatherInfo.channel.last_entry_id
});

// fetch Weather Information
async function fetchData() {
    const url = 'https://thingspeak.com/channels/769689/feed.json'
    const response = await axios.get(url)
    return response.data
}

//Send Data to Client
async function sendData(socket) {
    conn.query("SELECT * FROM channel", function (error, channel) {
        if (error) 
            console.log(error);
        
        conn.query("SELECT * FROM feeds", function (error, feeds) {
            if (error) 
                console.log(error);
            
            let weatherInfo = {}
            weatherInfo.feeds = JSON.parse(JSON.stringify(feeds))
            weatherInfo.channel = JSON.parse(JSON.stringify(channel))[0]
            socket.emit('receiveData', weatherInfo)
        });
    });
}

//Check
async function isDataUpdated() {
    let weatherInfo = await fetchData()
    if (last_entry_id >= weatherInfo.channel.last_entry_id) 
        return false
    
    //Insert feeds into database
    let feeds = weatherInfo.feeds.slice(last_entry_id - weatherInfo.feeds[0].entry_id + 1)
    let attributes = Object.keys(feeds[0]).reduce((sum, value) => sum + ", " + value)
    let values = feeds.map(feed => Object.values(feed))

    conn.query("INSERT INTO feeds (" + attributes + ") VALUES ?", [values], function (error, result) {
        if (error) 
            console.log(error);
        else
            console.log("Number of records inserted: " + result.affectedRows);
    });

    last_entry_id = weatherInfo.channel.last_entry_id
    return true
}

//get request from new client
io.on('connection', function(socket) {
    console.log("new connection")
    socket.on('start', async function(isFetched) {
        if (!isFetched) {        
            await sendData(socket)
        }
    });
});

// sendData every 10 seconds
setInterval(async () => {
    isDataUpdated()
    .then(async result => {
        if (result) 
            await sendData(io)
    })
    .catch(error => {
        console.log(error);
    });
}, 10000);
