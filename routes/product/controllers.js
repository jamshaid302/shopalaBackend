import productDAL from "../../services/product.js";
import responseSchema from "../../utils/responseSchema.js";

const getAllProducts = async (req, res) => {
  const products = await productDAL.getAll(req.user.user._id);
  if (products) {
    const response = responseSchema.responseSchema(products);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getProductById = async (req, res) => {
  const userId = req.user.user._id;
  const body = {
    id: req.params.id,
    user_id: userId,
  };
  const product = await productDAL.getById(body);
  if (product) {
    const response = responseSchema.responseSchema(product);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getProductsByUserId = async (req, res) => {
  const product = await productDAL.getByUserId(req.params.user_id);
  if (product) {
    const response = responseSchema.responseSchema(product);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const postProduct = async (req, res) => {
  req.body.user_id = req.user.user._id;
  if (req.files.brand_logo && req.files.image) {
    req.body.brand_logo = req.files.brand_logo[0].location;
    req.body.image = req.files.image[0].location;
  }

  const addResponse = await productDAL.add(req.body);
  if (addResponse) {
    const response = responseSchema.responseSchema(addResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const updateProductById = async (req, res) => {
  if (req.files.brand_logo) {
    req.body.brand_logo = req.files.brand_logo[0].location;
  }
  if (req.files.image) {
    req.body.image = req.files.image[0].location;
  }
  req.body.id = req.params.id;
  const updateResponse = await productDAL.update(req.body);
  if (updateResponse) {
    const response = responseSchema.responseSchema(updateResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const deleteProductById = async (req, res) => {
  const removeResponse = await productDAL.removeById(req.params.id);
  if (removeResponse) {
    const response = responseSchema.responseSchema(removeResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

export default {
  getAllProducts,
  getProductById,
  getProductsByUserId,
  postProduct,
  updateProductById,
  deleteProductById,
};
