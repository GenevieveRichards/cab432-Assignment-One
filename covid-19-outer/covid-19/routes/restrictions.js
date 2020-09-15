const express = require('express');
const router = express.Router();
const axios = require("axios");
const fs = require('fs');

router.get('/summary/:code', function (req, res) {
    const { code } = req.params;
    const url_restrictions = "https://localcoviddata.com/covid19/v1/high-level-policy?country=USA&state=" + code;
    axios
        .get(url_restrictions)
        .then((response) => {
            const { data } = response;
            const regulations = data.Community_regulations
            console.log(regulations)
            res.json({ regulations })
        })
        .catch((error) => console.log(error));
});

module.exports = router;

