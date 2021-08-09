request = new XMLHttpRequest();
request.open('GET', 'https://simplescraper.io/api/95K5Xug8MDIO1E8ltnYX?apikey=B8jOpLf5MWrV0Hh40kFppbpf7u9AwEAE&limit=100', true);

request.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Begin accessing JSON data here
        var parsed = JSON.parse(request.responseText)
        var data = parsed.data
        cols = ["Items", "Unit","LatestPeriod","LatestData","PercentageChangeLatest","PreviousData","PercentageChangePrevious"]
        colnames = ["Items", "Unit","Latest Period","Latest Data","% Change in latest period","Previous Data","% Change in previous period "]
        table = document.getElementById("GeneralTable")
        
        //add header
        row = document.createElement("tr")
        row.className = "header"
        for (let i=0;i<colnames.length;i++){
            col = document.createElement("th")
            col.innerHTML = colnames[i]
            row.appendChild(col)
        }
        table.appendChild(row)
        

        for (let i=0;i<data.length;i++){
            // ignore this row
            if (data[i]["Items"]=="Items"){
                continue;
            }
            row = document.createElement("tr")
            for (let j=0;j<cols.length;j++){
                col = document.createElement("td")
                col.innerHTML = data[i][cols[j]]
                row.appendChild(col)
            }
            table.appendChild(row)
        }
    } else {
        console.log("error")
    }
}

request.onerror = function() {
    console.log("error")
    // There was a connection error of some sort
  };
  
request.send();