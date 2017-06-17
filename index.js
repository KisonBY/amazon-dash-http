const dashButton = require("node-dash-button");
const fs = require("fs");
const http = require("http");
const url = require("url");

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));

config["dash-buttons"].forEach(function(button) {
    dashButton(button.mac, null, null, "all").on("detected", processDashButtonClick(button));
}, this);

function processDashButtonClick(button)
{
    return function(dashId)
    {
        console.log(`Dash button '${button.name}' (${dashId}) clicked`);
        console.log(`Calling URL '${button.url}'...`)
        http.get(url.parse(button.url), (res) =>
        {
            console.log(`Response received, status code: ${res.statusCode}`);
        }).on("error", (err) =>
        {
            console.error(`ERROR: ${err.message}`);
        });
    }
}