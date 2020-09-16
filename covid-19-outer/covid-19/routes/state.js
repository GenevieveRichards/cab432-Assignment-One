const express = require('express');
const router = express.Router();
const axios = require("axios");
const { json } = require('express');
const googleTrends = require('google-trends-api');
const googleTrendsApiMin = require('google-trends-api');

/* GET users listing. */
router.get('/:code', function (req, res, next) {
  const { code } = req.params;
  const url_state_time = 'https://api.covidtracking.com/v1/states/' + code + "/daily.json";
  const geo = "US-" + code
  const startDate = new Date('2020-03-04')
  const labels_cov = []
  const data_cov = []
  const date_trends = []
  const value_trends = []
  // const trends_send = []
  // const cov_send = []

  axios
    .get(url_state_time)
    .then((response) => {
      const { data } = response;
      for (let i = (data.length - 1); i > 0; i--) {
        labels_cov.push(data[i].date)
        data_cov.push(Math.abs(data[i].positiveIncrease))
        // cov_send.push({ labels: data[i].date, data: data[i].positiveIncrease })
      }

      const mindate = data[(data.length - 1)].date.toString()
      const reformatmindate = mindate.slice(0, 4) + "-" + mindate.slice(4, 6) + "-" + mindate.slice(6, 8)

      googleTrends.interestOverTime({ keyword: 'covid', startTime: new Date(reformatmindate), geo: geo })
        .then(function (results) {
          var newdata = results.toString()
          newdata = JSON.parse(newdata)
          console.log(newdata)
          const trends = newdata.default.timelineData

          for (let j = 0; j < trends.length; j++) {
            date_trends.push(trends[j].formattedAxisTime)
            value_trends.push(trends[j].value)
            // trends_send.push({ label: trends[j].formattedAxisTime, data: trends[j].value})

          }
          res.render("info", {
            code: code, data_cov: data_cov, labels_cov: labels_cov,
            data_trends: date_trends, value_trends: value_trends
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }).catch((error) => console.log(error));

})
module.exports = router;
