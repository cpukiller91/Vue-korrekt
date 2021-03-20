'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
  async mode(ctx) {
    let catList = ctx.request.body;
    return await strapi.query('task-list').findOne();
  }
};
