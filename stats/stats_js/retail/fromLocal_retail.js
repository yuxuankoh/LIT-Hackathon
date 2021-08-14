urls = ['./stats/cache/covid.json', './stats/cache/retail.json']

Promise.all(urls.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.text()))
).then(texts => {
    generateTableCovid((texts[0]));
    generateTable((texts[1]));
})

function generateTable(text){
    var parsed = JSON.parse(text)
    var data = parsed.data
    cols = ["Months", "Retail"]
    table = document.getElementById("RetailTable")
    table.className="StatTables"
    
    var d = new Date();
    var n = d.getMonth();

    
    first_row = document.createElement("tr")
    second_row = document.createElement("tr")
    third_row = document.createElement("tr")

    //rownames
    first_row_col = document.createElement("th")
    second_row_col = document.createElement("td")
    third_row_col = document.createElement("td")
    first_row_col.innerHTML = ""
    first_row.appendChild(first_row_col)
    second_row_col.innerHTML="Formation of business entities (2021)"
    second_row.appendChild(second_row_col)
    third_row_col.innerHTML="Cessation of business entities (2021)"
    third_row.appendChild(third_row_col)

    //first row - formation
    for (let i=0;i<n;i++){
        header_col = document.createElement("th")
        header_col.innerHTML = data[i][cols[0]]
        first_row.appendChild(header_col)
        normal_col = document.createElement("td")
        normal_col.innerHTML = data[i][cols[1]]
        second_row.appendChild(normal_col)
    }
    //seond row - cessation
    for (let i=data.length/2;i<data.length/2+n;i++){
        normal_col = document.createElement("td")
        normal_col.innerHTML = data[i][cols[1]]
        third_row.appendChild(normal_col)
    }

    table.appendChild(first_row)
    table.appendChild(second_row)
    table.appendChild(third_row)
        
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