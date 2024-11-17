export default {
  port: process.env.PORT || 3000,
  app: {
    name: "flacker",
    apiURL: process.env.BASE_API_URL,
    clientURL: process.env.CLIENT_URL
  }
};
