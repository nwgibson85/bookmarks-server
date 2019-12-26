const BookmarkService = {
    getAllBookmarks(knex) {
        return knex.select('*').from('bookmarks_database')
    },
    getById(knex, id) {
        return knex.from('bookmarks_database').select('*').where('id', id).first()
    },
    insertBookmark(knex, newBookmark) {
        return knex
            .insert(newBookmark)
            .into('bookmarks_database')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteBookmark(knex, id) {
      return knex('bookmarks_database')
        .where({ id })
        .delete()
    },
    updateBookmark(knex, id, newBookmarkFields) {
      return knex('bookmarks_database')
        .where({ id })
        .update(newBookmarkFields)
    },
}

module.exports = BookmarkService