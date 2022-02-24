module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST", "smtp.gmail.com"),
      port: env("SMTP_PORT", 465),

      auth: {
        user: env("SMTP_USERNAME"),
        pass: env("SMTP_PASSWORD"),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: "hola@bionicosjuicesrios.com",
      defaultReplyTo: "hola@bionicosjuicesrios.com",
    },
  },
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
