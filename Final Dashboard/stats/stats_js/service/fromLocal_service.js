urls = ['./stats/cache/covid.json', './stats/cache/service.json']

Promise.all(urls.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.text()))
).then(texts => {
    generateTableCovid((texts[0]));
    generateTable((texts[1]));
})

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
    for (let i=0;i<colnames.length;i++){
        col = document.createElement("th")
        col.innerHTML = colnames[i]
        row.appendChild(col)
    }
    table.appendChild(row)
    

    for (let i=1;i<data.length;i++){
        row = document.createElement("tr")
        for (let j=0;j<cols.length;j++){
            col = document.createElement("td")
            col.innerHTML = data[i][cols[j]]
            row.appendChild(col)
        }
        table.appendChild(row)
    }
}

function generateTableCovid(text) {
    var parsed = JSON.parse(text)
    var data = parsed.data
    cols = ["cases", "vaccination"]
    row = document.getElementById("CovidTable")
    

    cases_el = document.createElement("span")
    stats = data[0][cols[0]].split(" ")
    cases_el.innerHTML = "Total new cases (past 7 days): " + stats[stats.length-1].toString()
    row.appendChild(cases_el)

    vac_el = document.createElement("span")
    vac_el.innerHTML = "Completed Full Vaccination Regimen: " + data[0][cols[1]].toString()
    row.appendChild(vac_el)

}

