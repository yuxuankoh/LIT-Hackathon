//log in csv file and then make the elements from events
fetch('./timeline/timeline_csvs/timeline_data_general.csv')
.then(response => response.text())
.then(function(text){
    array_of_events = CSVToArray(text);
    generateEvents(array_of_events);
    }
)

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}

//function to generate events in the timeline
function generateEvents(array_of_events){
    //add to this element the events in sequential order
    var timeline_el = document.getElementById("timeline");
    //for each row in csv, create a container left/right
    for (let i=0;i<array_of_events.length;i++){
        //check that it is not an empty entry
        if (array_of_events[i]==""){
            continue;
        }
        //This is the template:
        // <div class="container">
        //   <div class="circle"></div>
        //   <div class="content">
        //   <div>
        //     <h2>2017</h2> <button><i></i></button>
        //   </div>
        //   <p>Lorem ipsum..</p>
        //   </div>
        // </div>
        var container_div = document.createElement("div");
        container_div.className = "timeline_container"
        var circle_div = document.createElement("div");
        circle_div.className = "timeline_circle"

        var content_div = document.createElement("div");
        content_div.className = "timeline_content"

        var header_button_div = document.createElement("div");
        header_button_div.className = "headerButton"
        var h2_el = document.createElement("H2");
        h2_el.className ="timeline_date"
        h2_el.innerHTML = array_of_events[i][0] //date
        header_button_div.appendChild(h2_el)

        var add_el = document.createElement("button");
        var i_el = document.createElement("i");
        i_el.className ="fa fa-calendar-plus-o"
        add_el.appendChild(i_el)
        add_el.className = "add_button"
        add_el.onclick = function (){
            date = new Date(array_of_events[i][0])
            formated_date = formatDate(date)
            text = encodeURI('Covid-19 Event')
            details = encodeURI(array_of_events[i][1])
            details = details.replace("&", "%26")
            link = "https://calendar.google.com/calendar/r/eventedit?"+
                    "&text="+text+
                    "&details="+details+
                    "&dates="+formated_date+
                    "&ctz=Singapore"
            window.open(link,'_blank')//open google calendar in new window
        }
        header_button_div.append(add_el)

        var p_el = document.createElement("p");
        p_el.className ="timeline_details"
        //clean up text of event
        array_of_events[i][1] = array_of_events[i][1].replace(/[\u{0080}-\u{FFFF}]/gu,"") 
        p_el.innerHTML = array_of_events[i][1] //event

        content_div.appendChild(header_button_div)
        content_div.appendChild(p_el)

        container_div.appendChild(circle_div)
        container_div.appendChild(content_div)
        timeline_el.appendChild(container_div)
    }      

}
//turn to this format 20200222T000000/20200223T000000
function formatDate(date){
    year = date.getFullYear().toString()
    month = padDayOrMonth((date.getMonth()+1).toString())
    day = padDayOrMonth((date.getDate()).toString())
    time = "T000000"
    start = year+month+day+time
    day = padDayOrMonth((date.getDate()+1).toString())
    end = year+month+day+time
    return start+"/"+end
}
function padDayOrMonth(str){
    if (str.length === 2) return str;
    return ('0' + str);
}