import LanguageService from "../../services/language.js";
import responseSchema from "../../utils/responseSchema.js";

const getAllLanguages = async (req, res) => {
  const languagesData = await LanguageService.getAll();

  if (languagesData) {
    const response = responseSchema.responseSchema(languagesData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getLanguageById = async (req, res) => {
  const languageData = await LanguageService.getById(req.params.id);
  if (languagesData) {
    const response = responseSchema.responseSchema(languageData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const postLanguage = async (req, res) => {
  const addResponse = await LanguageService.add(req.body);
  if (addResponse) {
    const response = responseSchema.responseSchema(addResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const patchLanguageById = async (req, res) => {
  req.body.id = req.params.id;

  const updateResponse = await LanguageService.update(req.body);

  if (updateResponse) {
    const response = responseSchema.responseSchema(updateResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const deleteLanguageById = async (req, res) => {
  const deleteResponse = await LanguageService.removeById(req.params.id);

  if (deleteResponse) {
    const response = responseSchema.responseSchema(deleteResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

export default {
  getAllLanguages,
  getLanguageById,
  postLanguage,
  patchLanguageById,
  deleteLanguageById,
};
