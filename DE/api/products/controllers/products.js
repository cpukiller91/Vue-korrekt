'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const TextCleaner = require('text-cleaner');
const fs = require('fs');
const request = require('request');
var DataIMG = {};
var PPOB = {};
var buffer2 = Buffer.alloc(1000);
module.exports = {
  groupBy (xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  async filterResID (query) {
    if(query.color){
      return [1,3,5]
    }
    return []
  },
  async getProductBySlug (ctx) {
    var data = ctx.query
    const products = await strapi.query("products").findOne({alias: data.slug});
    var GalList = [];

    //console.log(products)

    for (const [key_g, Gallery] of Object.entries(products.gallery)) {
      GalList[key_g] = "https://de.korrekt.com.ua"+Gallery.url
    }

    return {
      attributes: [
        {
          featured: true,
          name: "Speed",
          slug: "speed",
          values: [{name: "750 RPM", slug: "750-rpm"}]
        }],
      availability: "in-stock",
      badges: ["new"],
      brand: {name: "Brandix", slug: "brandix", image: "assets/images/logos/logo-1.png"},
      categories: [],
      compareAtPrice: null,
      customFields: {},
      id: products.id,
      images: GalList,
      name: products.title,
      price: products.price,
      rating: products.rating,
      reviews: products.reviews,
      sku: products.sku,
      slug: products.alias
    }
  },
  async filterConstructor (ctx) {
    const sql = "SELECT \n" +
      "option_links.option_id,\n" +
      "options.title,\n" +
      "options.key,\n" +
      "option_links.value,\n" +
      "COUNT(option_links.value) as total\n" +

      "FROM `option_links`\n" +
      "LEFT JOIN options\n" +
      "ON option_links.option_id=options.id\n" +
      "LEFT JOIN products\n" +
      "ON option_links.product_id=products.id\n" +
      "LEFT JOIN categories\n" +
      "ON categories.id=products.parent_id\n" +

      "WHERE option_links.option_id NOT IN  (7,6,5) \n" +
      "AND categories.alias IN ('movento-kupplungsteil')\n" +

      "GROUP BY \n" +
      "option_links.value,\n" +
      "options.key,\n" +
      "option_links.option_id,\n" +
      "options.title \n" +
      "ORDER BY option_links.option_id  ASC"

    const knex = strapi.connections.default;
    const result = await knex('option_links')
      .join('options', 'option_links.option_id', 'options.id')
      .join('products', 'option_links.product_id', 'products.id')
      .join('categories', 'categories.id', 'products.parent_id')

      .select('option_links.option_id')
      .select('options.title')
      .select('options.key')
      .select('option_links.value')
      .count('option_links.value', {as: 'total'})

      .groupBy('option_links.option_id')
      .groupBy('options.title')
      .groupBy('options.key')
      .groupBy('option_links.value')

      .whereNotIn('option_links.option_id', [7,6,5])
      .whereIn('categories.alias', ['movento-kupplungsteil'])

      .orderBy('option_links.option_id','ASC')
    var string = JSON.stringify(result)
    //console.log("Join",string);
    var json =  JSON.parse(string);
    var filt = []
    var filtItem = []
    for (const [key, filterFild] of Object.entries(json)) {
      filtItem[filterFild.key] = [{name: filterFild.value, slug: filterFild.value, "count": filterFild.total}]
      filt[filterFild.key] = {
        items: filtItem[filterFild.key],
        name: filterFild.title,
        slug: filterFild.key,
        type: "check",
        value: []
      }
      // attributes[key] = {
      //   featured: true,
      //   name: productID.name_option,
      //   slug: productID.key,
      //   values: [{name: productID.value, slug: productID.key}]
      // }

    }
    var index = 0
    var filtFin = []
    filtFin[index] = {
      items: [
        {id: 1,
        items: 272,
        name: "Instruments",
        parent: null,
        slug: "instruments",
        type: "shop"
        },{id: 2,
          items: 273,
          name: "Instruments2",
          parent: null,
          slug: "instruments2",
          type: "shop"
        }],
      name: "Категорії",
      slug: "category",
      value: []
    }

    for (const [key, rebildFit] of Object.entries(filt)) {
      index++;
      filtFin[index] = rebildFit

    }
    //console.log('>> json: ', json);
    //console.log(">>>",filtFin)
    return filtFin
    //console.log(this.groupBy(json, 'key'));
    return [
    //   {
    //   max: 900,
    //   min: 740,
    //   name: "Ціна",
    //   slug: "price",
    //   type: "range",
    //   value: [740,900]
    // },{
    //   items: [{"slug": "brandix", "name": "Brandix", "count": 1}],
    //   name: "Бренд",
    //   slug: "brand",
    //   type: "check",
    //   value: []
    // },
      {
      items: [{name: "Yellow", slug: "yellow", "count": 1}],
      name: "Color",
      slug: "color",
      type: "check",
      value: []
    }]

  },

  async getProductAtributes (product_id) {

    const knex = strapi.connections.default;
    const result = await knex('option_links')
      .where('option_links.product_id', product_id)
      //.whereNot('cities.published_at', null)
      .join('options', 'option_links.option_id', 'options.id')
      //.join('products', 'option_links.product_id', 'products.id')
      //.select('products.id')
      // .select('products.title as name')
      // .select('products.badges')
      // .select('products.price')
      // .select('products.rating')
      // .select('products.reviews')
      // .select('products.sku')
      // .select('products.alias')
      .select('option_links.option_id')
      .select('options.title as name_option')
      .select('option_links.product_id as id')
      .select('option_links.value')
      .select('options.key')
      .orderBy("options.key","ASC")
      //.limit(6)
      //.offset(6)
    //.select('chef.name as chef')
    var string = JSON.stringify(result)
    //console.log("Join",string);
    var json =  JSON.parse(string);
    //console.log('>> json: ', json);

    var attributes = []

    for (const [key, productID] of Object.entries(json)) {

      attributes[key] = {
        featured: true,
        name: productID.name_option,
        slug: productID.key,
        values: [{name: productID.value, slug: productID.key}]
      }

    }
    return attributes;

  },

  async list (ctx) {

    //typeof ctx.query.limit
    var limit = 6;
    var sort;
    var data = ctx.query
    var page = 1;
    var category;

    if(typeof ctx.query.limit != "undefined"){
      limit = parseInt(ctx.query.limit);
      delete data.limit
    }
    if(typeof ctx.query.sort != "undefined"){
      sort = parseInt(ctx.query.sort);
      delete data.sort
    }
    if(typeof ctx.query.page != 'undefined'){
      page = parseInt(ctx.query.page);
      delete data.page
    }
    if(typeof ctx.query.category != 'undefined'){
      category = parseInt(ctx.query.category);
      delete data.category
    }
    console.log('query',data)
    //const id_in = []
    //var id_ina = [1,2,3,4,5,6,7]
    var id_ina = await this.filterResID(data)
    var id_in

    if(id_ina.length > 0){
      id_in = {id_in: id_ina }
    }else{
      id_in = {}
    }

    const total = await strapi.query("products").count(id_in);


    var start = 0;
    if(page != 1){
      start = (page-1)*limit
    }

    if(id_ina.length > 0){
      id_in = {id_in: id_ina,_start:start,_limit: limit,_sort: 'id:asc'}
    }else{
      id_in = {_start:start,_limit: limit,_sort: 'id:asc'}
    }

    const products = await strapi.query("products").find(id_in);

    var GalList = [];
    var items = [];
    for (const [key, Product] of Object.entries(products)) {
      for (const [key_g, Gallery] of Object.entries(Product.gallery)) {
        GalList[key_g] = "https://de.korrekt.com.ua"+Gallery.url
      }
      var productsList = await this.getProductAtributes(Product.id)
       items[key] = {
         id: Product.id,
         name: Product.title,
         availability: Product.availability,
         badges: [Product.badges],
         brand: {name: "Brandix", slug: "brandix", image: "assets/images/logos/logo-1.png"},
         categories: [],
         compareAtPrice: null,
         customFields: {},
         images: GalList,
         price: Product.price,
         rating: Product.rating,
         reviews: Product.reviews,
         sku: Product.sku,
         slug: Product.alias,
         attributes: productsList,
       }
      GalList = []
    }

    //console.log(items)
    const from = (page - 1) * limit + 1
    const to = Math.max(Math.min(page * limit, total), from)
    const prod =
      {
        page: page,
        limit: limit,
        sort: 'default',
        total: total,
        pages: Math.ceil(total / limit),
        from: from,
        to: to,
        items: items,
        filters: await this.filterConstructor()

      }

    return prod
  },

  merge_options(obj1,obj2){
    // console.log( obj1, obj2,obj1.length+obj2.length);
    // console.log(obj1.length,obj2.length,obj1.length+obj2.length);
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  },
  de_to_latin(str) {

    const ru = new Map([
      ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'e'],
      ['є', 'e'], ['ё', 'e'], ['ж', 'j'], ['з', 'z'], ['и', 'i'], ['ї', 'yi'], ['й', 'i'],
      ['к', 'k'], ['л', 'l'], ['м', 'm'], ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'],
      ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'], ['х', 'h'], ['ц', 'c'], ['ч', 'ch'],
      ['ш', 'sh'], ['щ', 'shch'], ['ы', 'y'], ['э', 'e'], ['ю', 'u'], ['я', 'ya'],
    ]);

    const de = new Map([
      ['Š' , 'S'],[ 'š' , 's'],[ 'Ð' , 'Dj'],[ 'Ž' , 'Z'],[ 'ž' , 'z'],[ 'À' , 'A'],[ 'Á' , 'A'],[ 'Â' , 'A'],
      [ 'Ã' , 'A'],[ 'Ä' , 'A'],['Å' , 'A'],[ 'Æ' , 'A'],[ 'Ç' , 'C'],[ 'È' , 'E'],[ 'É' , 'E'],[ 'Ê' , 'E'],
      [ 'Ë' , 'E'],[ 'Ì' , 'I'],[ 'Í' , 'I'],[ 'Î' , 'I'],['Ï' , 'I'],[ 'Ñ' , 'N'],[ 'Ń' , 'N'],[ 'Ò' , 'O'],
      ['Ó' , 'O'],[ 'Ô' , 'O'],[ 'Õ' , 'O'],[ 'Ö' , 'O'],[ 'Ø' , 'O'],[ 'Ù' , 'U'],[ 'Ú' , 'U'],['Û' , 'U'],
      [ 'Ü' , 'U'],[ 'Ý' , 'Y'],[ 'Þ' , 'B'],[ 'ß' , 'Ss'],[ 'à' , 'a'],[ 'á' , 'a'],[ 'â' , 'a'],[ 'ã' , 'a'],
      [ 'ä' , 'a'],['å' , 'a'],[ 'æ' , 'a'],[ 'ç' , 'c'],[ 'è' , 'e'],[ 'é' , 'e'],[ 'ê' , 'e'],[ 'ë' , 'e'],
      [ 'ì' , 'i'],[ 'í' , 'i'],[ 'î' , 'i'],['ï' , 'i'],[ 'ð' , 'o'],[ 'ñ' , 'n'],[ 'ń' , 'n'],[ 'ò' , 'o'],
      [ 'ó' , 'o'],[ 'ô' , 'o'],[ 'õ' , 'o'],[ 'ö' , 'o'],[ 'ø' , 'o'],[ 'ù' , 'u'],[ '=' , ''],[ '~' , ''],
      ['ú' , 'u'],[ 'û' , 'u'],[ 'ü' , 'u'],[ 'ý' , 'y'],[ 'ý' , 'y'],[ 'þ' , 'b'],[ 'ÿ' , 'y'],[ 'ƒ' , 'f'],
      ['ă' , 'a'],[ 'î' , 'i'],[ 'â' , 'a'],[ 'ș' , 's'],[ 'ț' , 't'],[ 'Ă' , 'A'],[ 'Î' , 'I'],[ 'Â' , 'A'],
      [ 'Ș' , 'S'],[ 'Ț' , 'T'],[ '=' , ''],['%',""],[':',""],['.',""],['(',""],[')',""],[' ',"-"],['/',""]
    ]);

    str = str.replace(/[ъь]+/g, '');

    return Array.from(str)
      .reduce((s, l) =>
        s + (
          de.get(l)
          || de.get(l.toLowerCase()) === undefined && l
          || de.get(l.toLowerCase()).toUpperCase()
        )
        , '');
  },
  async createOrUpdate(data, model,find) {
    if(!find){
      find = data;
    }
    //let model = "products";
    let results = await strapi.query(model).findOne(find);
    //const entity = _.first(results) || null;

    if (!results) {
      results = await strapi.query(model).create(data);
    } else {
      results = await strapi.query(model).update({ id: results.id }, data);
    }

    return results;
  },
  async option (prop,product_id) {
    for (const [key, propList] of Object.entries(prop)) {
      let url = propList.title.toString().toLowerCase();
      let alias = this.de_to_latin(url);
      //alias = alias.toString();
      //console.log( alias.Promise,typeof "Schrauben-mm");
      //alias = alias.toLowerCase();
      var option = {
        "key":alias,
        "title":propList.title,
        //"value":value.val,
        //'product_id': catalog.id
      };
      //console.log(option);
      this.createOrUpdate(option,"option").then((value) => {
        this.createOrUpdate({"value":propList.val,"option_id":value.id,"product_id":product_id},"option-link");
        //console.log(value);
      });

    };
  },
  async downloadImg (idx,IMG,file_id) {

    const download = (url, path, callback) => {
      request.head(url, (err, res, body) => {
        //console.log(res);
        request(url)
          .pipe(fs.createWriteStream(path))
          .on('close', callback)
      })
    }

    for (const [key, imageItem] of Object.entries(IMG)) {
      var filename = idx+"_"+imageItem.substring(imageItem.lastIndexOf('/') + 1);
      const pathName = '/home/korrekt/my-sql/public/uploads/tmp' + filename;

      download(imageItem, pathName, () => {
        console.log('✅ Done!');

        var req = request({
          uri: "https://de.korrekt.com.ua/products/"+idx,
          method: 'PUT',
        }, function (err, resp, body) {
          // fs.unlink(pathName, function (err) {
          //   if (err) throw err;
          //   // if no error, file has been deleted successfully
          //   console.log('File deleted!');
          // });

        });

        var form = req.form();
        form.append('data', JSON.stringify({}));
        form.append(file_id, fs.createReadStream(pathName));


      })
      // await request.get('https://de.korrekt.com.ua/upload/files?name='+filename,(err, res, body) => {
      //   let fileFind = JSON.parse(body);
      //
      //   if (fileFind.length == 0) {
      //
      //
      //
      //   };
      //
      // });
    }

  },
   async category(parent,isx){

      var results = await strapi.query("category").findOne({'alias': this.de_to_latin(parent.title).toLowerCase()});

     if (!results) {
       results = await strapi.query("category").create(parent);
     } else {
       results = await strapi.query("category").update({ id: results.id }, parent);
     }

    //console.log(parentDB);
    return results;
  },
  tree(cID,key){

    strapi.query("category").findOne({'alias': this.de_to_latin(cID.title).toLowerCase()}).then((ok) => {
      console.log(ok);
    });
    //

  },
  objectFlip(obj) {
    return Object.keys(obj).reduce((ret, key) => {
      ret[obj[key]] = key;
      return ret;
    }, {});
  },

  async detail (ctx) {

    let catList = ctx.request.body;

    let find_key = catList.key_url;
    let price = catList.price;
    let content = TextCleaner(catList.desc).stripHtml().condense().valueOf();
    let IMG = JSON.parse(catList.IMG);
    let Prop = JSON.parse(catList.prop);
    let parent = JSON.parse(catList.parent);
    let propATR = TextCleaner(catList.propATR).stripHtml().condense().valueOf();
    var StartParent = 0;
    let upParent = false;

    //parent = this.objectFlip(Object.entries(parent));
    //console.log( typeof parent,_.size(parent));

    for (var [key, parentList] of Object.entries(parent)) {
      //
      var title = TextCleaner(parentList.title).stripHtml().condense().valueOf();

      let data = {
        "title": title,
        "uri": parentList.href,
        'alias': this.de_to_latin(title).toLowerCase(),
        "category": StartParent,
      }

      const rrr = await this.category(data);
      StartParent = rrr.id;
      //console.log( rrr);
    }

    //console.log( StartParent);
    let productsAr = await this.KNquery('products',{
      field:'url',
      val:find_key,
    },1)
    let products = productsAr[0]
    this.downloadImg (products.id,IMG,'files.gallery');

    var re = / /;
    var nameList = propATR.split(re);

    var data = new Object({
      0:{
        "title": nameList[0],
        "val": nameList[1],
      },
      1:{
        "title": nameList[2],
        "val": nameList[3]+nameList[4]+nameList[5]+nameList[6],
      },
      2:{
        "title": nameList[7],
        "val": nameList[8],

      },
    });
    //console.log(nameList[1])
    this.option(Prop,products.id);
    this.option(data,products.id);
    var newstr = price.replace(',', '.');
    var Product = {
      alias:nameList[1],
      "content": content,
      "price": parseFloat(newstr),
      "parent_id": StartParent,
      rating: 0,
      reviews: 0,
      sku: nameList[3]+nameList[4]+nameList[5]+nameList[6],
      availability: "in-stock",
      "parser_status": 1,
    };
    //console.log(Product)
    const knex = strapi.connections.default;
    await knex('products').where('id', products.id).update(Product)

    return this.getactive()
    return Product

  },
  async KNquery(model,where,limit= 0){
    const knex = strapi.connections.default;
    const resultKN =  knex(model).where(where.field,where.val)
    if(limit!=0){
      resultKN.limit(limit)
    }
    var string = JSON.stringify(await resultKN)
    //console.log("Join",string);
    return JSON.parse(string);
  },
  async getactive (ctx) {
    let product = await this.KNquery('products',{
      field:'parser_status',
      val:false,
    },1)
    //console.log("Up",product[0])
    return product[0]
  },
  async add (ctx) {
    let productList = ctx.request.body;
    for (const [key, Product] of Object.entries(productList)) {
      this.createOrUpdate(Product,"products");

    }
    //await strapi.query("products").find({"parser_status":null});
    return "ok";
  },

};
