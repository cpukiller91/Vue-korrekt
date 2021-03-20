'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const TextCleaner = require('text-cleaner');
const fs = require('fs');
var FormData = require('form-data');
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

      //.whereNotIn('option_links.option_id', [7,6,5])
      //.whereIn('categories.alias', ['movento-kupplungsteil'])

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
    const knex = strapi.connections.default;
    const totC = JSON.parse(JSON.stringify(await knex('products').count("id",{as: 'total'})));
    let total = totC[0].total
    //console.log(totC[0].total)
    //const total = knex('products').count()
    //await knex('products').where('id', products.id).update(Product)
    //const total = await strapi.query("products").count(id_in);


    var start = 0;
    if(page != 1){
      start = (page-1)*limit
    }

    if(id_ina.length > 0){
      id_in = {id_in: id_ina,_start:start,_limit: limit,_sort: 'id:asc'}
      const products = knex('products').limit(limit).offset(start)
    }else{
      id_in = {_start:start,_limit: limit,_sort: 'id:asc'}

    }

    //var q = JSON.stringify(await knex('products').limit(limit).offset(start))
    //console.log("Join",string);
    const products = JSON.parse(JSON.stringify(
      await knex('products').limit(limit).offset(start)));

    //console.log(products)
    //const products = await strapi.query("products").find(id_in);
    var productsList = await this.getProductAtributes(1)
    var GalList = [];
    var items = [];
    var productsList = [];
    for (const [key, Product] of Object.entries(products)) {
      // for (const [key_g, Gallery] of Object.entries(Product.gallery)) {
      //   GalList[key_g] = "https://de.korrekt.com.ua"+Gallery.url
      // }

      //
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
        filters: []
        //await this.filterConstructor()

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
      [ 'Ș' , 'S'],[ 'Ț' , 'T'],[ '=' , ''],['%',""],[':',""],['.',""],['(',""],[')',""],[' ',"-"],['/',"-"]
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
    const knex = strapi.connections.default;
    //console.log("Log", prop);
    for (const [key, propList] of Object.entries(prop)) {
      if (typeof propList.title == "string"){
        let url = propList.title.toString().toLowerCase();
        let alias = this.de_to_latin(url);

        //alias = alias.toString();

        //alias = alias.toLowerCase();
        var option = [{
          key: alias,
          title: propList.title,
          //"value":value.val,
          //'product_id': catalog.id
        }];
        console.log( "Log==F", typeof propList.title,option);
        let findNameOption = await this.KNquery('options', option[0], 1)
        let IDO = 0;
        //çconsole.log(typeof findNameOption,findNameOption.length)
        if (findNameOption.length > 0) {
          // const c = await knex('options')
          //   .where(option[0])
          //   .update(option[0])
          IDO = findNameOption[0].id
          //console.log("up",c)
          //console.log("findNameOption",findNameOption.length,optionLink)
        } else {

          IDO = await knex.insert(option, ['id']).into('options')

        }

        //console.log("OptionID",IDO)

        let optionLink = [{"value": propList.val, "option_id": IDO, "product_id": product_id}]
        let findNameOptionLinfs = await this.KNquery('option_links', optionLink[0], 1)

        if (findNameOptionLinfs.length > 0) {
          // const c = await knex('option_links')
          //   .where(optionLink[0])
          //   .update(optionLink[0])
          //console.log("upOptionL",c)
        } else {
          const c = await knex.insert(optionLink, ['id']).into('option_links')
          //console.log("insOptionL",c)
        }
        // //console.log(option);
        // this.createOrUpdate(option,"option").then((value) => {
        //   this.createOrUpdate({"value":propList.val,"option_id":value.id,"product_id":product_id},"option-link");
        //   //console.log(value);
        // });

      };
    }
  },
  async download(url, dest) {

    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    return await new Promise((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: url,
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          console.log(`The file is finished downloading.`);
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    })
      .catch((error) => {
        console.log(`Something happened: ${error}`);
      });
  },
  async downloadImg (idx,IMG,file_id) {
    console.log(IMG)
    const knex = strapi.connections.default;

    for (const [key, imageItem] of Object.entries(IMG)) {

      var filename = idx+"_"+imageItem.substring(imageItem.lastIndexOf('/') + 1);
      const pathName = '/mnt/HC_Volume_9711391/korrekt/DE/public/uploads/tmp' + filename;
      var name = 'tmp'+filename;
      var fileExists = []
      fileExists = JSON.parse(JSON.stringify(await knex('upload_file')
          //.join('upload_file', 'upload_file_morph.upload_file_id', 'upload_file.id')
          .where('upload_file.name', name)
        //.select('upload_file.url')
        // .limit(10)
      ));


      //IDO =
      if(fileExists.length == 0) {
        const data = await this.download(imageItem, pathName);
        console.log(imageItem);

        //console.log("file",fs.createReadStream(path))
        var form = new FormData();
        form.append('data', JSON.stringify({}));
        form.append("files", fs.createReadStream(pathName));
        //console.log("file",form)
        form.getLength(function (err, length) {
          if (err) {
            this.requestCallback(err);
          }

          var r = request.post("https://ua.korrekt.com.ua/upload", async (err, res, body) => {

            var file = JSON.parse(body)
            file = file[0]

            //const knex = strapi.connections.default;

            const upload_file_morph = JSON.parse(JSON.stringify(await knex('upload_file_morph')
              //.join('upload_file', 'upload_file_morph.upload_file_id', 'upload_file.id')
              .where('upload_file_morph.related_id', idx)
              .where('upload_file_morph.upload_file_id', file.id)
            ));
            if (upload_file_morph.length == 0) {
              //console.log("upload_file_morph",upload_file_morph,fileExists[0].id,idx)
              await knex.insert([{
                "related_id": idx,
                "upload_file_id": file.id,
                "related_type": "products",
                "field": "gallery"
              }], ['id']).into('upload_file_morph')

            }
            console.log('✅ upload_file_morph! -> ', idx, file.id);
          });
          r._form = form;
          //r.setHeader('content-length', length);
          //console.log("--->",r);
        });


      }

      //return fileExists
    }


  },
  async category(parent,isx){
    const knex = strapi.connections.default;
    var uid = this.de_to_latin(parent.uri).toLowerCase()
    var rr = uid.replace("-cat-de-at-products-", '')
    console.log("--",rr)
    //var alliass = this.de_to_latin(parent.alias).toLowerCase()
    let findNameCat = await this.KNquery('categories',{'uid':rr },1)
    let IDO = 0;
    parent.uid = rr
    parent.alias = rr
    //console.log(findNameCat)
    //çconsole.log(typeof findNameOption,findNameOption.length)
    if(findNameCat.length > 0 ){
      const c = await knex('categories')
        .where({'uid':rr})
        .update(parent)
      IDO = findNameCat[0].id
      //
      //console.log("findNameOption",findNameOption.length,optionLink)
      //return findNameCat[0]
    }else{

      IDO = await knex.insert(parent, ['id']).into('categories')

    }
    //console.log("parent->>",parent)
    return IDO;
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
    var parentListStr = [];
    let upParent = false;

    //parent = this.objectFlip(Object.entries(parent));
    //console.log( typeof parent,_.size(parent));
    //console.log("--",parent)
    for (var [key, parentList] of Object.entries(parent)) {

      var title = TextCleaner(parentList.title).stripHtml().condense().valueOf();

      let data = {
        "title": title,
        "uri": parentList.href,
        'alias': this.de_to_latin(title).toLowerCase(),
        "category": StartParent,
      }

      const rrr = await this.category(data);
      StartParent = rrr;
      parentListStr.push(rrr);
      //console.log( typeof rrr);
      //
    }
    var ppList = '::'+parentListStr.join('::')+"::";
    parentListStr = []
    console.log("-->",ppList);
    // return this.getactive()
    //console.log( StartParent);
    let productsAr = await this.KNquery('products',{
      url:find_key,
    },1)
    let products = productsAr[0]

    //const d = await this.downloadImg (products.id,IMG,'files.gallery');
    var img = await this.downloadImg (products.id,IMG,'files.gallery');

    var re = / /;
    var nameList = propATR.split(re);
    var verp = nameList[8]
    if(typeof verp == "undefined"){
      verp=10
    }


    var data = []
    if(typeof nameList[0] == "string"){
      data.push({
        "title": nameList[0],
        "val": nameList[1],
      })

    }
    var sku = ''
    // console.log("-0-",nameList[0],nameList[1])
    // console.log("-0-",nameList[2],nameList[3])
    // console.log("-0-",nameList[4],nameList[5])
    // console.log("-0-",nameList[6],nameList[7])
    console.log("-0-",nameList)
    if(typeof nameList[2] == "string"){

      if(nameList[2] == "EAN:"){
        sku = nameList[3]+nameList[4]+nameList[5]+nameList[6]

        if(nameList[7] == "Verpackungsgröße:") {
          data.push({
            "title": nameList[7],
            "val": nameList[8],
          })
        }
      }

      if(nameList[2] != "Verpackungsgröße:"){
        sku = nameList[3]+nameList[4]+nameList[5]+nameList[6]
        data.push({
          "title": nameList[2],
          "val": sku,
        })
      }else{

        data.push({
          "title": nameList[2],
          "val": nameList[3],
        })
      }

    }
    console.log("<-->",data)
    this.option(Prop,products.id);
    this.option(data,products.id);

    var newstr = price.replace(',', '.');
    console.log(typeof newstr)
    if( newstr == ""){
      newstr = 1
    }
    var Product = {
      alias:nameList[1],
      "content": content,
      "price": parseFloat(newstr),
      "parent_id": StartParent,
      rating: 0,
      reviews: 0,
      sku: sku,
      availability: "in-stock",
      "parser_status": 1,
      "parentlist": ppList
    };

    //console.log(Product)
    const knex = strapi.connections.default;
    await knex('products').where('id', products.id).update(Product)

    return this.getactive()

  },
  async KNquery(model,where,limit= 0){
    const knex = strapi.connections.default;
    const resultKN =  knex(model).where(where)
    if(limit!=0){
      resultKN.limit(limit)
    }
    var string = JSON.stringify(await resultKN)
    //console.log("Join",string);
    return JSON.parse(string);
  },
  async getactive (ctx) {
    let product = await this.KNquery('products',{
      parser_status:false,
    },1)
    //console.log("Up",product[0])
    return product[0]
  },
  async add (ctx) {
    const knex = strapi.connections.default;

    let productList = ctx.request.body;
    for (const [key, Product] of Object.entries(productList)) {
      let findNameOption = await this.KNquery('products',{url:Product.url},1)
      //çconsole.log(typeof findNameOption,findNameOption.length)
      Product.parser_status = 0
      Product.translate = 0
      if(findNameOption.length > 0 ){
        const c = await knex('products')
          .where({url:Product.url})
          .update(Product)
        //console.log("up",c,Product,findNameOption)
        //console.log("findNameOption",findNameOption.length,optionLink)
      }else{
        const c = await knex.insert(Product, ['id']).into('products')
        console.log("createOption",c)
      }
      //this.createOrUpdate(Product,"products");

    }
    //await strapi.query("products").find({"parser_status":null});
    return "ok";
  },

};
