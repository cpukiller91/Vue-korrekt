module.exports = ({ env }) => ({
  host: env('HOST', '95.217.212.248'),
  port: env.int('PORT', 1339),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '481464b4069566f3175951bc59aa2aa3'),
    },
  },
});
