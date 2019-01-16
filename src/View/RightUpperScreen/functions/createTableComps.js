

export default function bringArraysOfTags(books)
{
    var titles = [];
    var authors = [];
    var years = [];
    var prices = [];
    for(let i = 0;i<books.length;i++)
    {
        /* FIND ALL TAGS EVEN IF INCLUDES MORE THAN ONE SAME ELEMENT INSIDE */
        titles.push(""); authors.push("");  years.push(""); prices.push("");
        var currentTitles = books[i].getElementsByTagName("title");
        var currentAuthors = books[i].getElementsByTagName("author");
        var currentYears = books[i].getElementsByTagName("year");
        var currentPrices = books[i].getElementsByTagName("price");
        for(let j =0;j<currentTitles.length;j++)
        {
            if(j>0)
                titles[i] += " - - ";
            titles[i] += currentTitles[j].childNodes[0].nodeValue;

        }
        for(let j =0;j<currentAuthors.length;j++)
        {
            if(j>0)
                authors[i] += " - - ";
            authors[i] += currentAuthors[j].childNodes[0].nodeValue;

        }
        for(let j =0;j<currentYears.length;j++)
        {
            if(j>0)
                years[i] += " - - ";
            years[i] += currentYears[j].childNodes[0].nodeValue;

        }
        for(let j =0;j<currentPrices.length;j++)
        {
            if(j>0)
                prices[i] += " - - ";
            prices[i] += currentPrices[j].childNodes[0].nodeValue;

        }
    }
    return [titles,authors,years,prices];
}