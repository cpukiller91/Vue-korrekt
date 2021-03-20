'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async category(parent,isx){
/*
    var results = await strapi.query("category").findOne({'alias': this.de_to_latin(parent.title).toLowerCase()});

    if (!results) {
      results = await strapi.query("category").create(parent);
    } else {
      results = await strapi.query("category").update({ id: results.id }, parent);
    }
    */
    var results = []
    // var parent = await strapi.query("category").find();
    // for (var [key, parentList] of Object.entries(parent)) {
    //   results[key] = {"name":parentList.title}
    // }
    //console.log(parentDB);
    var results = [
      {
        name: 'Инструмент',
        slug: 'instruments',
        items: 272,
        children: [
          {
            name: 'потужнийтол Tools',
            slug: 'power-tools',
            image: 'assets/images/categories/category-1.jpg',
            items: 370,
            children: [
              {
                name: 'Drills & Mixers',
                slug: 'drills-mixers',
                items: 57
              },
              {
                name: 'Cordless Screwdrivers',
                slug: 'cordless-screwdrivers',
                items: 15
              },
              {
                name: 'Screwdrivers',
                slug: 'screwdrivers',
                items: 126
              },
              {
                name: 'Wrenches',
                slug: 'wrenches',
                items: 12
              },
              {
                name: 'Grinding Machines',
                slug: 'grinding-machines',
                items: 25
              },
              {
                name: 'Milling Cutters',
                slug: 'milling-cutters',
                items: 78
              },
              {
                name: 'Electric Spray Guns',
                slug: 'electric-spray-guns',
                items: 3
              }
            ]
          },
          {
            name: 'Hand Tools',
            slug: 'hand-tools',
            image: 'assets/images/categories/category-2.jpg',
            items: 134,
            children: [
              {
                name: 'Tool Kits',
                slug: 'tool-kits',
                items: 57
              },
              {
                name: 'Hammers',
                slug: 'hammers',
                items: 15
              },
              {
                name: 'Spanners',
                slug: 'spanners',
                items: 5
              },
              {
                name: 'Handsaws',
                slug: 'handsaws',
                items: 54
              },
              {
                name: 'Paint Tools',
                slug: 'paint-tools',
                items: 13
              }
            ]
          },
          {
            name: 'Machine Tools',
            slug: 'machine-tools',
            image: 'assets/images/categories/category-3.jpg',
            items: 302,
            children: [
              {
                name: 'Lathes',
                slug: 'lathes',
                items: 104
              },
              {
                name: 'Milling Machines',
                slug: 'milling-machines',
                items: 12
              },
              {
                name: 'Grinding Machines',
                slug: 'grinding-machines',
                items: 67
              },
              {
                name: 'CNC Machines',
                slug: 'cnc-machines',
                items: 5
              },
              {
                name: 'Sharpening Machines',
                slug: 'sharpening-machines',
                items: 88
              }
            ]
          },
          {
            name: 'Power Machinery',
            slug: 'power-machinery',
            image: 'assets/images/categories/category-4.jpg',
            items: 79,
            children: [
              {
                name: 'Generators',
                slug: 'generators',
                items: 23
              },
              {
                name: 'Compressors',
                slug: 'compressors',
                items: 76
              },
              {
                name: 'Winches',
                slug: 'winches',
                items: 43
              },
              {
                name: 'Plasma Cutting',
                slug: 'plasma-cutting',
                items: 128
              },
              {
                name: 'Electric Motors',
                slug: 'electric-motors',
                items: 76
              }
            ]
          },
          {
            name: 'Measurement',
            slug: 'measurement',
            image: 'assets/images/categories/category-5.jpg',
            items: 366,
            children: [
              {
                name: 'Tape Measure',
                slug: 'tape-measure',
                items: 57
              },
              {
                name: 'Theodolites',
                slug: 'theodolites',
                items: 5
              },
              {
                name: 'Thermal Imagers',
                slug: 'thermal-imagers',
                items: 3
              },
              {
                name: 'Calipers',
                slug: 'calipers',
                items: 37
              },
              {
                name: 'Levels',
                slug: 'levels',
                items: 14
              }
            ]
          },
          {
            name: 'Clothes and PPE',
            slug: 'clothes-and-ppe',
            image: 'assets/images/categories/category-6.jpg',
            items: 82,
            children: [
              {
                name: 'Winter Workwear',
                slug: 'winter-workwear',
                items: 24
              },
              {
                name: 'Summer Workwear',
                slug: 'summer-workwear',
                items: 87
              },
              {
                name: 'Helmets',
                slug: 'helmets',
                items: 9
              },
              {
                name: 'Belts and Bags',
                slug: 'belts-and-bags',
                items: 1
              },
              {
                name: 'Work Shoes',
                slug: 'work-shoes',
                items: 0
              }
            ]
          }
        ]
      },
      {
        name: 'Electronics',
        slug: 'electronics',
        items: 54
      },
      {
        name: 'Computers',
        slug: 'computers',
        items: 421
      },
      {
        name: 'Automotive',
        slug: 'automotive',
        items: 182
      },
      {
        name: 'Furniture & Appliances',
        slug: 'furniture-appliances',
        items: 15
      },
      {
        name: 'Music & Books',
        slug: 'music-books',
        items: 89
      },
      {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        items: 201
      }
    ]
    return results;
  }
};
