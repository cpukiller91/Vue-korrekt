module.exports = {
  async getCategoryBySlug(){
    const prod =
      {
        page: 1,
        limit: 1,
        sort: 'default',
        total: 1,
        pages: 1,
        from: 1,
        to: 1,
        items: [],
        filters: []

      }

    return prod
  }
}
