var previousTicker = { ask: 0, bid: 0, high: 0, last: 0, low: 0, volume: 0 }

setInterval(getTicker, 1000)

function getTicker() {
    fetch('https://www.bitstamp.net/api/ticker/')
        .then(response => {
            if (!response.ok) throw new Error(response.status)
            return response.json()
        })
        .then(ticker => {

            for (key in ticker) {

                var element = document.getElementById(key)
                if (element == null) {
                    continue
                }

                // update HTML table
                const value = parseFloat(ticker[key]).toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                element.textContent = (key === 'volume' ? '₿ ' : '$ ') + value

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
