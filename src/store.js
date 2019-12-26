const uuid = require('uuid/v4');

const bookmarks = [
    {
        id: uuid(),
        title: 'google', 
        url: 'https://www.google.com', 
        description: 'test description 1', 
        rating: 5
    },
    {
        id: uuid(),
        title: 'Thinkful', 
        url: 'https://www.thinkful.com', 
        description: 'test description 2', 
        rating: 4
    },
    {
        id: uuid(),
        title: 'espn', 
        url: 'https://espn.go.com', 
        description: 'test description 3', 
        rating: 4
    },
    {
        id: uuid(),
        title: 'freecodecamp', 
        url: 'https://freecodecamp.com', 
        desccription: 'test description 4', 
        rating: 5
    },
];

module.exports = {bookmarks}