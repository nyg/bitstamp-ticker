var previousTicker = { high: 0, last: 0, bid: 0, volume: 0, low: 0, ask: 0 };

setInterval(function () {
  
  $.getJSON('https://www.bitstamp.net/api/ticker', function (ticker) {
    
    // loop through all object's attribute
    for (key in ticker) {
      
      // update HTML table
      $('#' + key).text(ticker[key]);
      
      // update color
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
