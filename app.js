const express = require('express');
const combo = require("./torrent/COMBO")
const path = require('path');

let torrents = require("./torrent/torrents")()

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/:website/:query/:page?', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let website = (req.params.website).toLowerCase();
    let query = req.params.query;
    let page = req.params.page;

    if (website == "all") {
        combo(query, page).then(v => {
            console.log(v)
            res.json(v)
        })
    } else if (torrents[website]) {
        torrents[website](query, page).then((v) => {
            console.log(v)
            res.json(v)
        })
    } else {
        res.json({
            error: `Please select "${Object.keys(torrents).join(" | ")}"`
        })
    }
});

app.get("/api/torrents", (req, res) => {
    res.json(Object.keys(torrents))
})

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
console.log('Listening on PORT : ', PORT);
app.listen(PORT);
