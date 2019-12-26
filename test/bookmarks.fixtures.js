function makeBookmarksArray() {
    return [
        {
            id: 1,
            title: 'google', 
            url: 'https://www.google.com', 
            description: 'test description 1', 
            rating: 5
        },
        {
            id: 2,
            title: 'Thinkful', 
            url: 'https://www.thinkful.com', 
            description: 'test description 2', 
            rating: 4
        },
        {
            id: 3,
            title: 'espn', 
            url: 'https://espn.go.com', 
            description: 'test description 3', 
            rating: 4
        },
        {
            id: 4,
            title: 'freecodecamp', 
            url: 'https://freecodecamp.com', 
            description: 'test description 4', 
            rating: 5
        },
    ]
}

module.exports = {
    makeBookmarksArray,
}