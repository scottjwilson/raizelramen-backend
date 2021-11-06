module.exports = ({ env }) => ({
  graphql: {
    endpoint: "/graphql",
    shadowCRUD: true,
    playgroundAlways: true,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
  },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("PROVIDER_CLOUD_NAME"),
      api_key: env("PROVIDER_API_KEY"),
      api_secret: env("PROVIDER_API_SECRET"),
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
});
