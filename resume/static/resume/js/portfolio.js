var elements = document.getElementsByClassName("ticker");
var parameter = ""
var tickers = []
for (var i = 0; i < elements.length; i++) {
    tickers.push(elements[i].innerHTML)
    parameter += `${elements[i].innerHTML},`
}

parameter = parameter.slice(0, -1)

var response
var request = $.get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${parameter}&apikey=WVEAY1B51PH9WKZU`, function(data) {
        response = data;
        for (var n = 0; n < prices.length; n++) {
        prices[n].innerHTML = parseFloat(response["Stock Quotes"][n]["2. price"]).toFixed(2);
        }
    })

var prices = document.getElementsByClassName("price")

/*var url = `http://finance.yahoo.com/quote/${tickers[0]}?p=${tickers[0]}`

$.get(url, function (data) {
            var p = document.createElement("P");
            p.innerHTML = data;
            num = p.getElementsByClassName("Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")[0]
            console.log(num.innerHTML)
            prices[0].innerHTML = num.innerText;
        })

var prices = document.getElementsByClassName("price")*/