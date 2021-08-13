fetch('../../cache/general.json')
.then(response => response.text())
.then(function(text){
    generateTable(text);
    }
)
function generateTable(text) {
    var parsed = JSON.parse(text)
    var data = parsed.data
    cols = ["Items", "Unit","LatestPeriod","LatestData","PercentageChangeLatest","PreviousData","PercentageChangePrevious"]
    colnames = ["Items", "Unit","Latest Period","Latest Data","% Change in latest period","Previous Data","% Change in previous period "]
    table = document.getElementById("GeneralTable")
    table.className="StatTables"
    
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
}
