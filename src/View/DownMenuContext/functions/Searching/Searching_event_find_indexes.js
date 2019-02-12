function findIndexes(books,searching) {
    let found_indexes = [];
    for (let i = 0; i < books.length; i++) // FIND OUT WHERE OUR PATTERNS ARE
    {
        if (books[i].parameter1.toLowerCase().indexOf(searching.toLowerCase()) != -1 || books[i].definition.toLowerCase().indexOf(searching.toLowerCase()) != -1) {
            found_indexes.push(i);
        }
    }
    return found_indexes;
}

export default findIndexes;