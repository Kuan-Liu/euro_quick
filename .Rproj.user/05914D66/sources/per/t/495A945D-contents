library(tidyverse)
library(rvest)

#Scraping data;
italy_url <- "https://www.eloratings.net/Italy"
turkey_url <- "https://www.eloratings.net/Turkey"

italy_page<- read_html(italy_url)
italy_team<- italy_page %>% html_nodes(".r1") %>% html_text()
italy_goal<- italy_page %>% html_nodes(".r2") %>% html_text()
italy_rating<- italy_page %>% html_nodes(".r5") %>% html_text()

italy_date<- italy_page %>% html_nodes(".r0") %>% html_text()

# use system2 to invoke phantomjs via it's executable
# Testing for a single country;
system2("D:/GitHub/euro_quick/phantomjs-2.1.1-windows/bin/phantomjs.exe",
        #provide the path to the scraping script and the country url as argument
        args = c(file.path("scrape_ELO.js"), italy_url))


page <- read_html("elopage.html")

# scrape with rvest as normal
country_name <- page %>%
  html_nodes("#mainheader") %>%
  html_text() %>%
  gsub("Elo Ratings: ", "", .)

country_name

opposing <- page %>%
  html_nodes(".r1 a") %>%
  html_text()

opposing

teams <- page %>%
  html_nodes(".r1")

teams


### Not Working HOLD ###  
scrape_nation <- function(country) {
  # download the page
  url <- paste0("https://eloratings.net/", country)
  system2("D:/GitHub/euro_quick/phantomjs-2.1.1-windows/bin/phantomjs.exe", 
          args = c(file.path("scrape_ELO.js"), url))
  
  # read in downloaded page
  page <- read_html("elopage.html")
  
  # recover information
  country_name <- page %>%
    html_nodes("#mainheader") %>%
    html_text() %>%
    gsub("Elo Ratings: ", "", .)
  
  opposing <- page %>%
    html_nodes(".r1 a") %>%
    html_text()
  
  teams <- page %>%
    html_nodes(".r1")
  
  fixtures <- map2_df(teams, opposing, split_teams)
  
  ratings <- page %>%
    html_nodes(".r4") %>%
    html_text() %>%
    map_df(., split_ratings)
  
  rankings <- page %>%
    html_nodes(".r6") %>%
    map_df(., split_rankings)
  
  dates <- page %>%
    html_nodes(".r0") %>%
    html_text() %>%
    map_df(., convert_date)
  
  # bind into a data frame
  df <- fixtures %>%
    cbind(., ratings) %>%
    cbind(., rankings) %>%
    cbind(., dates) %>%
    mutate(table_country = country_name)
}

elO_data <- map_df(italy_url, scrape_nation)




