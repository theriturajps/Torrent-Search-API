const path = require("path")
const fs = require("fs")

let ignored = ["torrents.js", "COMBO.js"]

function getTorrents() {
    const torrentFiles = fs.readdirSync(__dirname).filter((v) => !ignored.includes(v))
    const torrents = {}
    for (let torrentFile of torrentFiles) {
        let torrent = require(`./${torrentFile}`)

        let torrentName = (torrent?.customName ?? torrentFile.split(".").shift()).toLowerCase(); // Use the set name or use the file name
        torrents[torrentName] = torrent
    }
    return torrents
}

module.exports = getTorrents