const express = require('express');
const router = express.Router();
const axios = require("axios");
const states = require('../public/javascripts/data')
const { json } = require('express');

const fs = require('fs');

router.get('/', async (req, res, next) => {
  try {
    const url_geojson = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json'
    const url_covid_state = 'https://api.covidtracking.com/v1/states/current.json'
    const geoData = await axios.get(url_geojson)
    const stateCovid = await axios.get(url_covid_state)
    const geoJSONFile = geoData.data.features;

    for (let i = 0; i < geoJSONFile.length; i++) {
      const statesCurrentCovid = stateCovid.data.find(item => item.state === states[geoJSONFile[i].properties.name]);
      geoJSONFile[i].properties.code = states[geoJSONFile[i].properties.name]
      geoJSONFile[i].properties.deaths = statesCurrentCovid.death;
      geoJSONFile[i].properties.hospitalized = statesCurrentCovid.hospitalizedCumulative
      geoJSONFile[i].properties.density = statesCurrentCovid.positive;
    }
    res.render("index", { countries: geoJSONFile });
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    console.log(e.toJSON());
    next(e)
  }
})

module.exports = router;

