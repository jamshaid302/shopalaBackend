import TerritoryService from "../../services/territory.js";
import responseSchema from "../../utils/responseSchema.js";

const getAllTerritories = async (req, res) => {
  const territoriesData = await TerritoryService.getAll();
  if (territoriesData) {
    const response = responseSchema.responseSchema(territoriesData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getTerritoryById = async (req, res) => {
  const territoryData = await TerritoryService.getById(req.params.id);

  if (territoryData) {
    const response = responseSchema.responseSchema(territoryData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const postTerritory = async (req, res) => {
  const addResponse = await TerritoryService.add(req.body);

  if (addResponse) {
    const response = responseSchema.responseSchema(addResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const patchTerritoryById = async (req, res) => {
  req.body.id = req.params.id;
  const updateResponse = await TerritoryService.update(req.body);

  if (updateResponse) {
    const response = responseSchema.responseSchema(updateResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const deleteTerritoryById = async (req, res) => {
  const deleteResponse = await TerritoryService.removeById(req.params.id);

  if (deleteResponse) {
    const response = responseSchema.responseSchema(deleteResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

export default {
  getAllTerritories,
  getTerritoryById,
  postTerritory,
  patchTerritoryById,
  deleteTerritoryById,
};
