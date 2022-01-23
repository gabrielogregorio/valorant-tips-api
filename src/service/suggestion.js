const Suggestion = require('../models/Sugestion')

class SuggestionService {
  async Create({post_id, email, description}) {
    let newSuggestion = new Suggestion({
      post_id,
      email,
      description
    })
    await newSuggestion.save()
    return newSuggestion
  }

  async FindAll() {
    let suggestions = await Suggestion.find()
    return suggestions
  }

  async UpdateById(_id, status) {
    let suggestionNew = await Suggestion.findOneAndUpdate({_id}, {$set: {status}}, {new: true})
    return suggestionNew
  }

  async DeleteById(_id) {
    let deletedPost = await Suggestion.findOneAndDelete({_id})
    return deletedPost
  }
}

module.exports = new SuggestionService()
