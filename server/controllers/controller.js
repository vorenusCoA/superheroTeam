const fetch = require('node-fetch');
const apiKey = process.env.API_KEY;
const URL = "https://superheroapi.com";

exports.findByName = async (req, res) => {
    await fetch(URL + "/api/" + apiKey + "/search/" + req.params.name)
        .then(response => response.json())
        .then(json => res.send(json.results));
}

exports.getSuperheroById = async (req, res) => {
    await fetch(URL + "/api/" + apiKey + "/" + req.params.id)
        .then(response => response.json())
        .then(json => res.send(json));
}