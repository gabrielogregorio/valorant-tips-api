
class DataSuggestion {
  Build(suggestion) {
    return {
      description: suggestion.description,
      email: suggestion.email,
      id: suggestion._id.toString()
    }
  }
}

module.exports = new DataSuggestion()
