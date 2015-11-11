var previousTicker = { high: 0, last: 0, bid: 0, volume: 0, low: 0, ask: 0 };

setInterval(function () {

  $.ajax({

    url: 'http://query.yahooapis.com/v1/public/yql',
    jsonp: 'callback',
    dataType: 'jsonp',

    data: {
      q: 'select * from html where url = "https://www.bitstamp.net/api/ticker/"',
      format: 'json'
    },

    success: function(response) {

      // parse response from YQL
      var ticker = $.parseJSON(response.query.results.body);

      // loop through all the ticker's attributes
      for (key in ticker) {

        // update HTML table
        $('#' + key).text(ticker[key]);

        // update text color
        if (ticker[key] > previousTicker[key]) {
          $('#' + key).css('color', 'green');
        }
        else if (ticker[key] < previousTicker[key]) {
          $('#' + key).css('color', 'red');
        }
        else {
          $('#' + key).css('color', 'black');
        }
      }

      previousTicker = ticker;
    }
  });
}, 1000);
