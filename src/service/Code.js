require('dotenv/config')
const Code = require('../models/Code')
const { v4: uuidv4 } = require('uuid');

class CodeService {
  async Create() {
    let newCode = new Code({
      code: `${uuidv4()}${Math.random()}${uuidv4()}${Math.random()}`,
      available: true,
    })
    await newCode.save()
    return newCode
  }

  async FindCode(code) {
    let codeAccess = await Code.findOne({code, available: true})
    return codeAccess
  }

  async UseCode(code) {
    let codeAccess = await Code.findOneAndUpdate({code, available: true}, {$set: {available: false}}, {new: true})
    return codeAccess
  }

}

module.exports = new CodeService()
