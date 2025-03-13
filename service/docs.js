
function getDateEnds(dates) {
    const converted = dates.map(date => new Date(date).getFullYear())
    return [Math.min(...converted), Math.max(...converted)]
}

function createFilter(cards) {
    var authors = [];
    var dates = [];
    for (const card of cards) {
        if (!authors.includes(card.author)) {
        authors.push(card.author);
        }
        dates.push(card.date)
    }
    return {authors: authors,
            dates: getDateEnds(dates)};
}

function filterAuthors(cards, excludeString) {
    const exclude = excludeString.split(',');
    return cards.filter((card) => !exclude.includes(card.author));
}

function filterDates(cards, range) {
    dates = range.split(',');
    return cards.filter((card) => new Date(card.date).getFullYear() <= Number(dates[1]) && new Date(card.date).getFullYear() >= Number(dates[0]))
}

function filter(cards, query) {
    const exclude = query.exclude;
    const daterange = query.daterange;
    var filtered = cards;
    if (exclude) {
        filtered = filterAuthors(filtered, exclude);
    }
    console.log(filtered);
    if (daterange) {
        filtered = filterDates(filtered, daterange);
    }
    console.log(filtered);
    return filtered;
}

module.exports = {
    filter
}