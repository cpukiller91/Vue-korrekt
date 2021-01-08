'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async mod(ctx){
    const sliders = await strapi.query('slider').find();
    var DataIMG = {};
    for (const [key, slidersItem] of Object.entries(sliders)) {
      var type = slidersItem.type_image;
      DataIMG[key] = {
        title: slidersItem.title,
        text: slidersItem.text,
        imageClassic: {
          ltr: "https://strapi.api.hosteam.pro"+slidersItem.imageClassic[0].url,
          rtl: "https://strapi.api.hosteam.pro"+slidersItem.imageClassic[0].url
        },
        imageFull: {
          ltr: "https://strapi.api.hosteam.pro"+slidersItem.imageFull[0].url,
          rtl: "https://strapi.api.hosteam.pro"+slidersItem.imageFull[0].url
        },
        imageMobile: {
          ltr: "https://strapi.api.hosteam.pro"+slidersItem.imageMobile[0].url,
          rtl: "https://strapi.api.hosteam.pro"+slidersItem.imageMobile[0].url
        }

      }
        console.log(slidersItem);

    }


    return DataIMG

  }
};
