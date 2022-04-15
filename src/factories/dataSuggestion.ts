/* eslint-disable no-underscore-dangle */
export class DataSuggestion {
  static Build(suggestion) {
    return {
      description: suggestion.description,
      email: suggestion.email,
      id: suggestion._id.toString(),
    };
  }
}
