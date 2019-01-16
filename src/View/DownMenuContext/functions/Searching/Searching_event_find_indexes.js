function findIndexes(elemanlar,searching) {
    let found_indexes = [];
    for (let i = 0; i < elemanlar.length; i++) // FIND OUT WHERE OUR PATTERNS ARE
    {
        if (elemanlar[i].childNodes[0].nodeValue.toLowerCase().indexOf(searching.toLowerCase()) != -1) {
            found_indexes.push(i);
        }
    }
    return found_indexes;
}

export default findIndexes;