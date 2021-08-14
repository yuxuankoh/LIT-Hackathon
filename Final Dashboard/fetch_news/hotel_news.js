//generate url from filters
keywords = ["Tourism", "Hotels" ,"Staycations","Quarantine", "Hospitality"]

start_of_url = "https://newsapi.org/v2/everything?"   
end_of_url = "&apiKey=ad78940518af41fe97d6be1036fd18ed"
joined_keywords = keywords.join(" OR ")
criteria = "covid AND singapore AND (" +joined_keywords +")"
middle_criteria = "q=" + encodeURI(criteria)
url = start_of_url + middle_criteria+ end_of_url

fetch(url)
.then(response => response.text())
.then(function(text){
        createArticles(text)
    }
)
function createArticles(data) {
    const newsData = JSON.parse(data)
    blog_articles = document.getElementById("news_panel")
    
    if (newsData.articles != null){
        for (var i=0;i<newsData.articles.length;i++){
            if (i==5){
                break
            }
            list_el = document.createElement("li")
            a_el = document.createElement("a")
            a_el.href  =newsData.articles[i].url || ""
            a_el.rel  = "bookmark"
            a_el.innerHTML = newsData.articles[i].title
            list_el.appendChild(a_el)
            blog_articles.appendChild(list_el)
        }
    }
    
}




