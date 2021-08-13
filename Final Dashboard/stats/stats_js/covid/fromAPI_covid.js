fetch('https://simplescraper.io/api/KaFXh2m6qFENtkxyRC2l?apikey=B8jOpLf5MWrV0Hh40kFppbpf7u9AwEAE&limit=100')
.then(response => response.text())
.then(function(text){
    generateTable(text);
    }
)
function generateTable(text) {
    var parsed = JSON.parse(text)
    var data = parsed.data
    cols = ["cases", "vaccination"]
    table = document.getElementById("CovidTable")
    
    row = document.createElement("tr")
    cases_label = document.createElement("th")
    cases_label.innerHTML = "Total new cases (past 7 days)"
    row.appendChild(cases_label)
    cases_data = document.createElement("td")
    stats = data[0][cols[0]].split(" ")
    cases_data.innerHTML = stats[stats.length-1]
    row.appendChild(cases_data)

    vac_label = document.createElement("th")
    vac_label.innerHTML = "Completed Full Vaccination Regimen"
    row.appendChild(vac_label)
    vac_data = document.createElement("td")
    vac_data.innerHTML = data[0][cols[1]]
    row.appendChild(vac_data)

    table.appendChild(row)
    
}
