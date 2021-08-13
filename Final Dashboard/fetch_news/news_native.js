fetch('https://newsapi.org/v2/top-headlines?country=sg&q=Covid&from=2021-08-09&sortBy=popularity&apiKey=ad78940518af41fe97d6be1036fd18ed')
.then(response => response.text())
.then(function(text){
        createArticles(text)
    }
)
function createArticles(data) {
    const newsData = JSON.parse(data)
    blog_articles = document.getElementById("grid_bloggrid")
    
    for (let i=0;i<2;i++){
        if (i%2==0){
            row = document.createElement("tr")
            blog_articles.appendChild(row)
        } else {
            row = blog_articles.lastChild
        }
        
        console.log(newsData.articles[i])
        col = document.createElement("td")
        article = document.createElement("article")

        // <article>
        //     <header class="entry-header">
        //         <h2 class="entry-title">
        //              <a href="blog.html" rel="bookmark">[31 July] Review COVID-19 Laws early August</a>
        //          </h2>
        //         <div class="entry-meta">
        //             <span class="posted-on">
        //                 <time class="entry-date published">
        //                      April 12, 2016
        //                  </time>
        //              </span>						
        //         </div>
        //         <div class="entry-thumbnail">						
        //             <img src="assets/images/3.png" alt="">
        //         </div>
        //     </header>
        //         <div class="entry-summary">
        //             <p>
        //                 S'pore to review Covid-19 rules in early August, ease measures for vaccinated people if situation under control
        //             </p>
        //         </div>
        // </article>

        header = document.createElement("header");
        header.className="entry-header"
        h2_el = document.createElement("h2");
        h2_el.className="entry-title"
        
        a_el = document.createElement("a")
        a_el.href=newsData.articles[i].url || ""
        a_el.rel="bookmark"
        a_el.innerHTML=newsData.articles[i].title 

        h2_el.appendChild(a_el)
        header.appendChild(h2_el)

        entry_meta_el = document.createElement("div")
        entry_meta_el.className="entry-meta"
        span_el = document.createElement("span")
        span_el.className="posted-on"
        time_el = document.createElement("time")
        time_el.className="entry-date published"
        time_el.innerHTML=newsData.articles[i].publishedAt || ""

        span_el.appendChild(time_el)
        entry_meta_el.appendChild(span_el)
        header.appendChild(entry_meta_el)

        entry_thumbnail_el = document.createElement("div")
        entry_thumbnail_el.className = "entry-thumbnail"
        img_el = document.createElement("img")
        img_el.src=newsData.articles[i].urlToImage || ""

        entry_thumbnail_el.appendChild(img_el)
        header.appendChild(entry_thumbnail_el)
        article.appendChild(header)

        entry_summary_el = document.createElement("div")
        entry_summary_el.className ="entry-summary"
        p_el = document.createElement("p")
        description = newsData.articles[i].description || ""
        p_el.innerHTML = description.slice(0, 100)+"..." || ""

        entry_summary_el.appendChild(p_el)
        article.appendChild(entry_summary_el)

        col.appendChild(article)
        row.appendChild(col)
        
        
    }
}




