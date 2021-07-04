
export default function getNews() {
    if (localStorage.getItem("allData")) {
        return JSON.parse(localStorage.getItem("allData"));
    }
    return [];
}

export function getNewsInOneArray() {
    let db = getNews(); 
    return db["rssFeed"].concat(db["drucksachen"]);
}

export function setNews(db) {
    localStorage.setItem("allData", JSON.stringify(db));
}

export function getNewsOnlyWithGeoLocation(db) {
    var news = getNews()[db];
    var filteredNews = [];
    for (var article of news) {
        if (article.GeoLAT !== null && article.GeoLAT !== "Undefined") {
            filteredNews.push(article);
        }
    }
    return filteredNews;
}

export function getNewsByDistrict(db, district) {
    var news = getNews()[db];
    var filteredNews = [];

    for (var article of news) {
        var allDistricts = article.District.split(',');
        for (var districtInData of allDistricts) {
            if (districtInData === district) {
                filteredNews.push(article);
                break;
            }
        }
    }
    return filteredNews;
}

export function getNewsByDistricts(db, districtArray) {
    var news = getNews()[db];
    var filteredNews = [];

    for (var article of news) {
        var allDistricts = article.District.split(',');
        for (var districtInData of allDistricts) {
            if (districtArray.includes(districtInData)) {
                filteredNews.push(article);
                break;
            }
        }
    }
    return filteredNews;
}

export function getNewsByDate(db, date) {
    var news = getNews()[db];
    var filteredNews = []
    var dateCheck = date.getDate();
    var monthCheck = date.getMonth();
    var yearCheck = date.getFullYear();

    //var displayDate = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + " Uhr";

    for (var article of news) {
        var articleDate = new Date(article.pubDate);
        if (dateCheck === articleDate.getDate() && monthCheck === articleDate.getMonth() && yearCheck === articleDate.getFullYear()) {
            filteredNews.push(article);
        }
    }
    return filteredNews;
}

export function getNewsByDatePeriod(db, dateStart, dateEnd) {
    var currentDate = new Date(dateStart);
    var allArticles = [];
    for (; currentDate <= dateEnd; currentDate.setDate(currentDate.getDate() + 1)) {
        allArticles = allArticles.concat(getNewsByDate(db, currentDate));
    }
    return allArticles;
}

export function getAllNewsSortByDate() {
    var allNews = getNewsInOneArray();
    allNews.sort(function (a, b) {
        if (!a.pubDate && !b.pubDate) {
            return 0;
        } else if (!a.pubDate) {
            return 1;
        } else if (!b.pubDate) {
            return -1;
        }

        var dateA = new Date(a.pubDate);
        var dateB = new Date(b.pubDate);
        return dateB - dateA;
    });
    return allNews;
}

export function createCorrectDate(dateOfArticle) {
    //nicht mehr notwendig
    var dateArticle = new Date(dateOfArticle);
    if (dateOfArticle != "") {
        var spDate = dateOfArticle.split(".");
        if (spDate.length === 3) {
            if (!isNaN(spDate[0]) && !isNaN(parseFloat(spDate[0])) &&
                !isNaN(spDate[1]) && !isNaN(parseFloat(spDate[1])) &&
                !isNaN(spDate[2]) && !isNaN(parseFloat(spDate[2]))) {
                dateArticle = new Date(dateOfArticle.split(".").reverse().join("-"));
                var date = dateArticle;
            }
        }
    }
    return dateArticle;
}

export function formatNewsDate(allNews) {
    for (var index in allNews) {
        let newsDB = allNews[index]
        for (var article of newsDB) {
            let newCorrectDate = null;
            //var dateArticle = new Date(article.pubDate);

            if (article.pubDate === "") {
                newCorrectDate = null;
            } else if (article.pubDate.search(".") === 0) {
                var spDate = article.pubDate.split(".");
                if (spDate.length === 3) {
                    if (!isNaN(spDate[0]) && !isNaN(parseFloat(spDate[0])) &&
                        !isNaN(spDate[1]) && !isNaN(parseFloat(spDate[1])) &&
                        !isNaN(spDate[2]) && !isNaN(parseFloat(spDate[2]))) {
                        newCorrectDate = new Date(spDate.reverse().join("-"));
                    }
                }
            } else {
                newCorrectDate = new Date(article.pubDate);
            }

            article.pubDate = newCorrectDate;
        }
    }
    return allNews;
}

export function setSortedNews(sortedNews) {
    localStorage.setItem("allNewsSorted", JSON.stringify(sortedNews));
}

export function getSortedNews() {
    if (localStorage.getItem("allNewsSorted")) {
        return JSON.parse(localStorage.getItem("allNewsSorted"));
    }
    return [];
}

