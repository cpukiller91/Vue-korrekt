'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async sendEmail(ctx) {
    const knex = strapi.connections.default;
    if (ctx.request.body.emailc && ctx.request.body.name && ctx.request.body.subject && ctx.request.body.message) {

      const datains = {

        sender: ctx.request.body.emailc,
        name: ctx.request.body.name,
        subject: ctx.request.body.subject,
        message: ctx.request.body.message,
        typemail: "contacts"

      }
      //console.log(ctx.request.body)
      const dataSave = await knex.insert(datains, ['id']).into('emailcontrollers')
      //const dataSave = await strapi.query('emailcontrollers').create(datains)
      await strapi.plugins['email'].services.email.send({

        to: 'cpukiller1991@gmail.com',
        from: "root@korrekt.com.ua",
        subject: ctx.request.body.subject,
        text: ctx.request.body.message,

      });
      return dataSave
  }
  }
};
