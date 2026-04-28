var previousTicker = { ask: 0, bid: 0, high: 0, last: 0, low: 0, volume: 0 }

setInterval(getTicker, 1000)

function getTicker() {
    fetch('https://www.bitstamp.net/api/ticker/')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(ticker => {
            for (key in ticker) {
                const element = document.getElementById(key)
                if (element == null) {
                    continue
                }

                // update HTML table
                const amount = parseFloat(ticker[key])
                const currency = key === 'volume' ? 'BTC'
                element.textContent = new Intl.NumberFormat(navigator.language, { style: 'currency', currency, currencyDisplay: 'narrowSymbol' })
                    .format(amount)
                    .replace('BTC', '₿')
                
                // update text color
                if (ticker[key] > previousTicker[key]) {
                    element.style.color = 'green'
                } else if (ticker[key] < previousTicker[key]) {
                    element.style.color = 'red'
                } else {
                    element.style.color = 'black'
                }
            }

            previousTicker = ticker
        })
}
