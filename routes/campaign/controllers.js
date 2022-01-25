import campaignDAL from "../../services/campaign.js";
import responseSchema from "../../utils/responseSchema.js";
import { campaignEmail } from "../../utils/emailer.js";

const getAllCampaigns = async (req, res) => {
  const userId = req.user.user._id;
  const campaignsData = await campaignDAL.getAll(userId);
  if (campaignsData) {
    const response = responseSchema.responseSchema(campaignsData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getCampaignById = async (req, res) => {
  const userId = req.user.user._id;
  const body = {
    id: req.params.id,
    user_id: userId,
  };
  const campaignData = await campaignDAL.getById(body);

  if (campaignData) {
    const response = responseSchema.responseSchema(campaignData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getCampaignByUserId = async (req, res) => {
  const campaignData = await campaignDAL.getByUserId(req.body);

  if (campaignData) {
    const response = responseSchema.responseSchema(campaignData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const postCampaign = async (req, res) => {
  if (!req.body.user_id) {
    req.body.user_id = req.user.user._id;
  }
  if (req.files.image) {
    req.body.image = req.files.image[0].location;
  }

  const addResponse = await campaignDAL.add(req.body);
  if (addResponse) {
    campaignEmail(req.user.user);
    const response = responseSchema.responseSchema(addResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const patchCampaignById = async (req, res) => {
  if (req.files.image) {
    req.body.image = req.files.image[0].location;
  }

  req.body.id = req.params.id;
  const patchResponse = await campaignDAL.update(req.body);

  if (patchResponse) {
    const response = responseSchema.responseSchema(patchResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const deleteCampaignById = async (req, res) => {
  const deleteResponse = await campaignDAL.removeById(req.params.id);
  if (deleteResponse) {
    const response = responseSchema.responseSchema(deleteResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

export default {
  getAllCampaigns,
  getCampaignById,
  getCampaignByUserId,
  postCampaign,
  patchCampaignById,
  deleteCampaignById,
};
