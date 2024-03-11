import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Your API description",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
