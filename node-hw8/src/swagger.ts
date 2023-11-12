import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Swagger News API Project",
    description: "Implementation of Swagger with TypeScript",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  definitions: {
    User: {
      username: "kenan",
      email: "kenan@gmail.com",
      password: "12345",
    },
    NewsPost: {
      title: "kasjakjslkajskajslasjlas",
      text: "kasjakjslkajskajslasjlas",
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
