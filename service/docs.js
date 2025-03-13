const multer = require("multer");

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
    const dates = range.split(',');
    return cards.filter((card) => new Date(card.date).getFullYear() <= Number(dates[1]) && new Date(card.date).getFullYear() >= Number(dates[0]))
}

function filter(cards, query) {
    const exclude = query.exclude;
    const daterange = query.daterange;
    const sortby = query.sortby;
    var filtered = [...cards];
    if (exclude) {
        filtered = filterAuthors(filtered, exclude);
    }
    if (daterange) {
        filtered = filterDates(filtered, daterange);
    }
    filtered = sortCards(filtered, sortby)
    return filtered;
}

function sortTitle(cards) {
    var sorted = [...cards];
    return sorted.sort((a,b) => a.title.localeCompare(b.title))
}

function sortAuthors(cards) {
    var sorted = [...cards];
    return sorted.sort((a,b) => a.author.localeCompare(b.author))
}

function sortDates(cards) {
    var sorted = [...cards];
    return sorted.sort((a,b) => new Date(a.date) - new Date(b.date))
}

function sortCards(cards, sortby) {
    switch(sortby) {
        case 'author':
            return sortAuthors(cards);
        case 'date':
            return sortDates(cards);
    }
    return sortTitle(cards);
}

const uploadFile = multer({
    storage: multer.diskStorage({
      destination: 'public/pdfs/',
      filename: (req, file, cb) => {
        const filetype = file.originalname.split('.').pop();
        const id = Math.round(Math.random() * 1e9);
        const filename = `${id}.${filetype}`;
        cb(null, filename);
      },
    }),
  });


module.exports = {
    filter,
    createFilter,
    uploadFile
}