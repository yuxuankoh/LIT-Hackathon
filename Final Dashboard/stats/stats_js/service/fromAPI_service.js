fetch('https://simplescraper.io/api/RqiTmXoNOvleqKm3n9Ec?apikey=B8jOpLf5MWrV0Hh40kFppbpf7u9AwEAE&limit=100')
.then(response => response.text())
.then(function(text){
    generateTable(text);
    }
)
function generateTable(text){
    var parsed = JSON.parse(text)
    var data = parsed.data
    cols = ["Items", "LatestPeriod","LatestData","PercentageChangeLatest","PreviousData","PercentageChangePrevious"]
    colnames = ["Items", "Latest Period","Latest Data","% Change in latest period","Previous Data","% Change in previous period "]
    table = document.getElementById("ServiceTable")
    table.className="StatTables"
    
    //add header
    row = document.createElement("tr")
    row.className = "header"
    for (let i=1;i<colnames.length;i++){
        col = document.createElement("th")
        col.innerHTML = colnames[i]
        row.appendChild(col)
    }
    table.appendChild(row)
    

    for (let i=0;i<data.length;i++){
        row = document.createElement("tr")
        for (let j=0;j<cols.length;j++){
            col = document.createElement("td")
            col.innerHTML = data[i][cols[j]]
            row.appendChild(col)
        }
        table.appendChild(row)
    }
}

