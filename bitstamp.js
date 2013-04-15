var previousTicker = { high: 0, last: 0, bid: 0, volume: 0, low: 0, ask: 0 },
    api_url = 'https://www.bitstamp.net/api/ticker/'
    yql_url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D"' + api_url + '"&format=json&callback=?';

setInterval(function () {
  
  $.getJSON(yql_url, function (jsonp) {
    
    // parse response from YQL
    var ticker = $.parseJSON(jsonp.query.results.body.p);
    
    // loop through all object's attribute
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
  });
  
}, 2542);
