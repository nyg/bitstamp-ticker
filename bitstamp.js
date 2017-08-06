var previousTicker = { ask: 0, bid: 0, high: 0, last: 0, low: 0, volume: 0 }

setInterval(getTicker, 1000)

function getTicker() {
    nygFetch
        .fetchJSON('https://www.bitstamp.net/api/ticker/', true)
        .then(ticker => {

            for (key in ticker) {

                var element = document.getElementById(key)
                if (element == null) {
                    continue
                }

                // update HTML table
                element.textContent = ticker[key]

                // update text color
                if (ticker[key] > previousTicker[key]) {
                    element.style.color = 'green'
                }
                else if (ticker[key] < previousTicker[key]) {
                    element.style.color = 'red'
                }
                else {
                    element.style.color = 'black'
                }
            }

            previousTicker = ticker
        })
}
