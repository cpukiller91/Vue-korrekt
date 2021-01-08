'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async mod(ctx){
    const brands = await strapi.query('brands').find();
    var DataIMG = {};
    for (const [key, brItem] of Object.entries(brands)) {
      DataIMG[key] = {
        slug:brItem.slug,
        name:brItem.name,
        image:"https://strapi.api.hosteam.pro"+brItem.image[0].url
      }
      console.log(brItem.image);

    }

    return DataIMG;
    // return [{
    //       slug: 'brandix',
    //       name: 'Brandix',
    //       image: '/images/logos/logo-1.png'
    //   }]

  }
};
