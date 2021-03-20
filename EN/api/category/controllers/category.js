'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  unflatten(arr) {
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
      if (mappedArr.hasOwnProperty(id)) {
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
  async getInfoTree(parent = [2]){
    const knex = strapi.connections.default;
    var res =[]
    var List =  JSON.parse(JSON.stringify(await knex('categories')
      .select( "categories.category as parentid","title as name","id","alias as slug")
      .whereIn('category', parent)));

    List.push({id:2,parentid:0,name:"Категорії",slug:"catalog"})
    return List
  },

  async getIds(res = []){
    var childItem = []

    for (const [key, child1] of Object.entries(res)) {
      childItem.push(child1.id)
    }
    return childItem
  },

  async recursive(start){
    //console.log(start)
    if(start.level < start.depth){
      const res1 = await this.getInfoTree(start.param)
      start.res.push(res1)
      const ids1 = await this.getIds(res1)
      start.param = ids1
      //console.log(ids1,ids1.length)
      start.level++
      return await this.recursive(start)
    }
    return start

  },
  async category(parent,isx){
    var p = 2
    if(parent.query.parent){
      p = parent.query.parent
    }
    var start = {level:0, param:[2],depth:2,res:[]}
    var array3 = []
    var recRess = await this.recursive(start)
    for (const [key, lev] of Object.entries(recRess.res)) {
      array3 = array3.concat(lev);
    }

    return this.unflatten(array3)


  },

};
