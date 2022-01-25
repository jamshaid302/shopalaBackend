import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export default async function swaggerLoader({ app }) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Shopala documentation",
        version: "0.1.0",
        description:
          "This is a shopala application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Venrup",
          url: "https://venrup.com",
          email: "contact@venrup.com",
        },
      },
      servers: [
        {
          url: "https://shopala-backend.herokuapp.com/",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            in: "header",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./api/*.js"],
  };

  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

  return app;
}
