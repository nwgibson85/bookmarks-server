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

function makeMaliciousBookmark() {
    const maliciousBookmark = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      url: 'https://www.hackers.com',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      rating: 1,
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousBookmark,
      expectedBookmark,
    }
  }

module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark,
}