import UserService from "../../services/user.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";
import responseSchema from "../../utils/responseSchema.js";
import { registrationEmail } from "../../utils/emailer.js";

const getAllUsers = async (req, res) => {
  const usersData = await UserService.getAll();

  if (usersData) {
    const response = responseSchema.responseSchema(usersData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const usersData = await UserService.userProfile(req);

    if (usersData) {
      const response = responseSchema.responseSchema(usersData);
      response.status_code == 1
        ? res.status(200).json(response)
        : res.status(401).json(response);
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (req, res) => {
  const userData = await UserService.getById(req.params.id);

  if (userData) {
    const response = responseSchema.responseSchema(userData);

    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const getUserByEmail = async (req, res) => {
  const userData = await UserService.getByEmail(req.params.id);

  if (userData) {
    const response = responseSchema.responseSchema(userData);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const postRegisterUser = async (req, res) => {
  req.body.image = req.file.location;

  const hashedPassword = passwordHash.generate(req.body.password);
  req.body.password = hashedPassword;

  const addResponse = await UserService.add(req.body);
  if (addResponse.message == "success") {
    registrationEmail(addResponse.data);
    const response = responseSchema.responseSchema(addResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }else if(addResponse.message =="failed"){
      const response = responseSchema.responseSchema(addResponse);
      res.status(401).json(response);
  }
};

const patchUserById = async (req, res) => {
  req.body.id = req.params.id;

  const updateResponse = await UserService.update(req.body);

  if (updateResponse) {
    const response = responseSchema.responseSchema(updateResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

const deleteUserById = async (req, res) => {
  const deleteResponse = await UserService.removeById(req.params.id);

  if (deleteResponse) {
    const response = responseSchema.responseSchema(deleteResponse);
    response.status_code === 1
      ? res.status(200).json(response)
      : res.status(401).json(response);
  }
};

// Login User
const postLoginUser = async (req, res) => {
  const data = await UserService.getByEmail(req.body.email);

  if (data.message == "error" || data.data.length < 1) {
    const response = responseSchema.responseSchema({
      message: "failed",
      data: "Email is wrong",
    });
    return res.status(401).json(response);
  }

  const isVerified = passwordHash.verify(
    req.body.password,
    data.data[0].password
  );

  if (!isVerified) {
    const response = responseSchema.responseSchema({
      message: "failed",
      data: "Password is wrong",
    });
    return res.status(401).json(response);
  }

  delete data.data[0].password;

  return jwt.sign({ user: data.data[0] }, "secretkey", (err, token) => {
    const response = responseSchema.responseSchema({
      message: "success",
      data: { token: token },
    });
    res.status(200).json(response);
  });
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  postLoginUser,
  postRegisterUser,
  patchUserById,
  deleteUserById,
  getUserProfile
};
