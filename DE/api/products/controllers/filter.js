'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


module.exports = {
  treeList(arr) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }


    for (var id in mappedArr) {

      if (Object.prototype.hasOwnProperty.call(mappedArr, id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentid) {
          mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  },
  async filter (ctx) {
    var data = [];
    var index = 0;
    const knex = strapi.connections.default;
    const result = await knex('option_links')
      .join('options', 'option_links.option_id', 'options.id')
      .select('options.title as title')
      .select('options.key as key')
      .select('option_links.value as value')
      // .select('options.id as id')
      // .select('option_links.option_id as parentid')
      .orderBy('options.key')
      //.groupBy('count(options.key)');

    // for (const [key, propList] of Object.entries(result)) {
    //   data[propList.title] = Object.push(propList);
    //
    //
    // }
      // .where('cities', 'berlin')
      // .whereNot('cities.published_at', null)
      //
      // .select('restaurants.name as restaurant')
      //


    return result;
    //this.treeList([result]);
  }


};
