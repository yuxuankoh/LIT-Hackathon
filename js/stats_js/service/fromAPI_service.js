//only use this at the end
// // Create a request variable and assign a new XMLHttpRequest object to it.
// var request = new XMLHttpRequest()

// //Open a new connection, using the GET request on the URL endpoint
// request.open('GET', "https://simplescraper.io/api/RqiTmXoNOvleqKm3n9Ec?apikey=B8jOpLf5MWrV0Hh40kFppbpf7u9AwEAE&limit=100", true)

// request.onload = function () {
//     //Begin accessing JSON data here
//     var parsed = JSON.parse(request.responseText)
//     var data = parsed.data
//     cols = ["Items", "LatestPeriod","LatestData","PercentageChangeLatest","PreviousData","PercentageChangePrevious"]
//     colnames = ["Items", "Latest Period","Latest Data","% Change in latest period","Previous Data","% Change in previous period "]
//     table = document.getElementById("ServiceTable")

//     //add header
//     row = document.createElement("tr")
//     row.className = "header"
//     for (let i=0;i<colnames.length;i++){
//         col = document.createElement("th")
//         col.innerHTML = colnames[i]
//         row.appendChild(col)
//     }
//     table.appendChild(row)

//     for (let i=0;i<data.length;i++){
//         row = document.createElement("tr")
//         for (let j=0;j<cols.length;j++){
//             col = document.createElement("td")
//             col.innerHTML = data[i][cols[j]]
//             row.appendChild(col)
//         }
//         table.appendChild(row)
//     }
// }

// //Send request
// request.send()

