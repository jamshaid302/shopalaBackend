import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";
import swaggerLoader from "./swagger.js";

export default {
  expressLoader,
  mongooseLoader,
  swaggerLoader,
  init: async ({ expressApp }) => {
    await mongooseLoader();
    await expressLoader({ app: expressApp });
    await swaggerLoader({ app: expressApp });
  },
};
