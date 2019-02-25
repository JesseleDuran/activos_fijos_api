var options = (env = "development") => {
  return {
    swaggerDefinition: {
      info: {
        title: "API del Sistema de Activos Fijos de Maderas del Orinoco",
        description: "Endpoints para la API del Sistema de Activos Fijos de Maderas del Orinoco.",
        version: "1.0"
      },
      schemes: env == "production" ? ["https"] : ["http", "https"],
      basePath: "/api",
      produces: ["application/json"],
      security: [
        {
          basicAuth: []
        }
      ]
    },
    apis: ["./docs/*.yaml", "./routes/*.js", "./models/*.js"]
  };
};

module.exports = options;
