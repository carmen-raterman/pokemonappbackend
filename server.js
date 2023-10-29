const express = require("express");
const app = express();
const axios = require("axios");

//need these 2 lines to enable cors to take requests from any domain
const cors = require("cors");
app.use(cors());

//this is our server (kitchen), has to listen to requests from a client
//server is basically just an event listener

//this is our first express route
//CRUD
//Create- POST
//Read- GET
//Update- PUT/PATCH
//Delte- DELETE
//req stand for request, res stands for response
app.get("/", async (req, res) => {
    //axios is basically fetch but with different and better syntax
    //axios is a library
    // https://pokeapi.co/api/v2/pokemon
    //axios requests are async, need to await
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');

        // console.log(response.data);
        const pokemon = response.data.results;
        //people don't normally do this
        // res.send(`
        // <ul>
        //     ${pokemon.map(
        //         pokemon => `<li>${pokemon.name} </li>`).join("")}
        // </ul>
        // `); 
        res.send(pokemon);
    } catch (error) {
       console.log(error, "this is the error"); 
    }

});

//this is a parameterized route, the parameter is :id
app.get("/:name", async (req, res) => {
    const name = req.params.name;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log(req.params);

    const pokemon = response.data;
    res.send(pokemon);
});

app.get("/:abilities/:name", async (req, res) => {
    const name = req.params.name;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.send(response.data.abilities);
});

app.listen(3000);