import CurrencyService from "../../services/currency.js";
import responseSchema from "../../utils/responseSchema.js";

const getAllCurrencies = async (req, res) => {
  const currenciesData = await CurrencyService.getAll();
  if (currenciesData) {
    const response = responseSchema.responseSchema(currenciesData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getCurrencyById = async (req, res) => {
  const currencyData = await CurrencyService.getById(req.params.id);
  if (currencyData) {
    const response = responseSchema.responseSchema(currencyData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const postCurrency = async (req, res) => {
  const addResponse = await CurrencyService.add(req.body);

  if (addResponse) {
    const response = responseSchema.responseSchema(addResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const patchCurrencyById = async (req, res) => {
  req.body.id = req.params.id;

  const updateResponse = await CurrencyService.update(req.body);
  if (updateResponse) {
    const response = responseSchema.responseSchema(updateResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const deleteCurrencyById = async (req, res) => {
  const deleteResponse = await CurrencyService.removeById(req.params.id);

  if (deleteResponse) {
    const response = responseSchema.responseSchema(deleteResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

export default {
  getAllCurrencies,
  getCurrencyById,
  postCurrency,
  patchCurrencyById,
  deleteCurrencyById,
};
