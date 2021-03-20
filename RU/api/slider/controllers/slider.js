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
    var url = "https://de.korrekt.com.ua";
      DataIMG[key] = {
        title: slidersItem.title,
        text: slidersItem.text,
        imageClassic: {
          ltr: url+slidersItem.imageClassic[0].url,
          rtl: url+slidersItem.imageClassic[0].url
        },
        imageFull: {
          ltr: url+slidersItem.imageFull[0].url,
          rtl: url+slidersItem.imageFull[0].url
        },
        imageMobile: {
          ltr: url+slidersItem.imageMobile[0].url,
          rtl: url+slidersItem.imageMobile[0].url
        }

      }
        //console.log(slidersItem);

    }


    return DataIMG

  }
};
