'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async theme(ctx){
      const knex = strapi.connections.default;
      const themes = await knex('themes')
      var string = JSON.parse(JSON.stringify(themes))
      //const themes = await strapi.query('themes').find();
      //console.log( string[0]  )
        return {
            name: string[0].name,
            fullName: string[0].fullName,
            url: string[0].url,
            author: {
                name: string[0].AuthorName,
                profile_url: string[0].profileUrl
            },
            contacts: {
                address: string[0].ContactsAddress,
                email: string[0].ContactsEmail,
                phone: string[0].ContactsPhone
            }
        }
    }
};
