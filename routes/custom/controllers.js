import CurrencyService from "../../services/currency.js"
import LanguageService from "../../services/language.js"
import TerritoryService from "../../services/territory.js"

async function getCustomAll(req, res) {
  const currency = await CurrencyService.getAll()
  const language = await LanguageService.getAll()
  const territory = await TerritoryService.getAll()

  let obj = {}
  if (
    currency.message == "success" &&
    language.message == "success" &&
    territory.message == "success"
  ) {
    obj = {
      status_code: 1,
      message: "Success",
      data: {
        currency: currency.data,
        language: language.data,
        territory: territory.data,
      },
    }
  } else {
    obj = {
      status_code: 0,
      message: "Failed",
      data: {
        currency: currency.data,
        language: language.data,
        territory: territory.data,
      },
    }
  }

  obj.status_code == 1 ? res.status(200).json(obj) : res.status(401).json(obj)
}

export default {
  getCustomAll,
}
