class APIFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  // Search
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {}

    this.query = this.query.find({ ...keyword })
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach((el) => delete queryCopy[el])

    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = (currentPage - 1) * resPerPage

    this.query = this.query.skip(skip).limit(resPerPage)

    return this
  }
}

module.exports = APIFeatures
