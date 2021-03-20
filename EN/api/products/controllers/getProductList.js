var url = "https://de.korrekt.com.ua";
module.exports = {
  async getInfoTree(parent= 2){
    const knex = strapi.connections.default;
    var res =[]
    var par
    //var List = [{id:2,parentid:0,name:"Категорії",slug:"catalog"}]
    var List = JSON.parse(JSON.stringify(await knex('categories')
      .select( "categories.category as parentid","title as name","id","alias as slug")
      .where('category', parent)
      //.whereIn('id', parent)
    ));
    var one = JSON.parse(JSON.stringify(await knex('categories')
        .select( "categories.category as parentid","title as name","id","alias as slug")
        .where('id', parent)
    ));

    for (const [key, galReq] of Object.entries(List)) {
      galReq.type = "shop"
      galReq.parent = null,
        res.push(galReq)
    }

    if(parent != 2){
       const p = JSON.parse(JSON.stringify(await knex('categories')
        .select( "categories.category as parentid","title as name","id","alias as slug")
        .where('id', one[0].parentid)
      ));
      p[0].type = "shop"
      par = p[0]

      return [{
        id: one[0].id,
        image: "assets/images/categories/category-1.jpg",
        items: one[0].id,
        name: one[0].name,
        slug: one[0].slug,
        children:res,
        parent: par,
        type: "shop"
      }]
    }else {
      return res
    }


  },
  async getCatIdBySlug(slug){
    const knex = strapi.connections.default;
    var res =[]
    //var List = [{id:2,parentid:0,name:"Категорії",slug:"catalog"}]
    const List = JSON.parse(JSON.stringify(await knex('categories')
      .select( "id")
      .where('alias', slug)));
      if(List.length>0){
        return List[0].id;
      }else{
        return 2
      }


  },
  async catItemBuilder(cList){
    const catliast = await this.getInfoTree(cList)

    return{
      items: catliast,
      name: "Категорії",
      slug: "category",
      type: "category",
      value: []
    }
  },

  async filterBuilder(category){
    //console.log('filterBuilder',category)
    var itamsCat = await this.catItemBuilder(category)
      //var price = await this.priceBuilder()

    var res = [
      itamsCat,

      // {
      //   items: [{"slug": "brandix", "name": "Brandix", "count": 1}],
      //   name: "Бренд",
      //   slug: "brand",
      //   type: "check",
      //   value: []
      // }
    ]
    return res

  },
  //-----------------------------------Filter End ---------------------------------
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
  async getImage(product= [1,2,3],urls){
    var GalList = []
    const knex = strapi.connections.default;
    //console.log("Join",string);
    var products = JSON.parse(JSON.stringify(await knex('upload_file_morph')
        .column( {id:"upload_file_morph.related_id"},'upload_file.url')
        .whereIn('related_id', product)
        .join('upload_file', 'upload_file_morph.upload_file_id', 'upload_file.id')
        //.where('related_id', product)


      // .limit(10)
    ));
    var curentIds = [];

    for (const [key, galReq] of Object.entries(products)) {
      curentIds[galReq.id] = []
      for (const [key, rgr] of Object.entries(products)) {
        if(galReq.id == rgr.id){
          curentIds[galReq.id].push(url+rgr.url)
        }

        //curentIds[galReq.id] = []
      }

    }
    return curentIds
    //console.log(products,urls)
  },
  async getProductAtributes (product_id = []) {

    const knex = strapi.connections.default;
    const result = await knex('option_links')
      .whereIn('option_links.product_id', product_id)
      //.whereNot('cities.published_at', null)
      .join('options', 'option_links.option_id', 'options.id')

      .select('option_links.option_id as optionid')
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
    var curentIds = []
    for (const [key, galReq] of Object.entries(json)) {
      curentIds[galReq.id] = []
      for (const [key, rgr] of Object.entries(json)) {
        if(galReq.id == rgr.id){
          curentIds[galReq.id].push({
            featured: true,
            name: rgr.name_option,
            slug: rgr.key,
            values: [{name: rgr.value, slug: rgr.key}]
          })
        }

        //curentIds[galReq.id] = []
      }

    }
    //console.log(curentIds)
    return curentIds;

  },
  async getProductList (ctx) {

    //typeof ctx.query.limit
    var limit = 48;
    var sort;
    var data = ctx.query
    var page = 1;
    var category, price;
    var products = []

    if (typeof ctx.query.price != "undefined") {
      price = ctx.query.price;
      var pRange = price.split("-")

      delete data.price
    }
    if (typeof ctx.query.limit != "undefined") {
      limit = parseInt(ctx.query.limit);
      delete data.limit
    }
    if (typeof ctx.query.sort != "undefined") {
      sort = parseInt(ctx.query.sort);
      delete data.sort
    }
    if (typeof ctx.query.page != 'undefined') {
      page = parseInt(ctx.query.page);
      delete data.page
    }
    if (typeof ctx.query.category != 'undefined') {
      category = ctx.query.category;
      delete data.category
    }

    var filter_state = false
    if (Object.keys(data).length > 0) {
      filter_state = true

      console.log(typeof data, Object.keys(data).length)
      var RESquery = ''
      for (var keyObj in data) {
        const elem = data[keyObj].split(',')

        RESquery += "--"+keyObj+"::"+data[keyObj]
        // этот код будет вызван для каждого свойства объекта
        // ..и выведет имя свойства и его значение
        //console.log(typeof key, key + " : " + data[key], typeof data[key],data[key].split(','))

      }

    }

    var cId
    if (typeof category != 'undefined') {
      cId = await this.getCatIdBySlug(category)
    } else {
      cId = 2
    }

//console.log(cId)
    const knex = strapi.connections.default;
    const totC = JSON.parse(JSON.stringify(
      await knex('products')
        .count("id", {as: 'total'})
        .where('parentlist', 'like', '%::' + cId + '::%')
        .andWhere((builder) => {
          if (typeof pRange != 'undefined')
            builder.where('price', '>', pRange[0])
              .where('price', '<', pRange[1])


        })
    ));
    //----------------------------end counter------------------------------------------//
    let total = totC[0].total
    //console.log(totC)
    var start = 0;
    if (page != 1) {
      start = (page - 1) * limit
    }

    //--------------------------SQL--------------------------------------------------//
    //  SELECT
    //    products.id,title,alias,url,parent_id,content,price,rating,reviews,
    //    sku,availability,badges,Featured,TopRated,Discounted,Popular
    //  FROM
    //    `products`
    //  LEFT JOIN
    //    option_links
    //  ON
    //    `products`.id = option_links.product_id
    //  WHERE
    //    `parentlist` LIKE '%:3:%'
    //  GROUP BY
    //    products.id,title,alias,url,parent_id,content,price,rating,reviews,
    //    sku,availability,badges,Featured,TopRated,Discounted,Popular
    //  LIMIT 48

    var propFilter = [
      {keyp:'lange-mm',value:" 1050"},
      {keyp:'lange-mm',value:" 1055"},
      {keyp:'lange-mm',value:" 1000"}
    ]

    const qb = (query) => {
      const field = RESquery.split("--")
        for (const [key, F] of Object.entries(field)) {
          if(F != ""){
            const f1 = F.split("::")
            const f2 = f1[1].split(",")
            for (const [key, f3] of Object.entries(f2)) {
              query.orWhere('value','like', f3)
                .andWhere('key','like', f1[0])
            }
            console.log(typeof F,F.split("::"))
          }

        }
      //delete field[0]

      for (const [key, galReq] of Object.entries(propFilter)) {

        //.andWhere('key',galReq.keyp)
      }

    }

    if (filter_state == true ){

        products = JSON.parse(JSON.stringify(
        await knex('products')
          .select('products.id').select('products.title').select('alias').select('url').select('parent_id')
          .select('content').select('price').select('rating').select('reviews').select('reviews')
          .select('sku').select('availability').select('badges').select('Featured').select('TopRated')
          .select('Discounted').select('Popular').select('options.key')

          .join('option_links', 'option_links.product_id', 'products.id')
          .join('options', 'option_links.option_id', 'options.id')

          .where('parentlist', 'like', '%::' + cId + '::%')
          .where(qb)
          .where((builder) => {

            if (typeof pRange != 'undefined')
              builder.where('price', '>', pRange[0])
                .where('price', '<', pRange[1])

          })
          .orderBy('products.id').orderBy('title').orderBy('alias')
          .orderBy('url').orderBy('parent_id')
          .orderBy('content').orderBy('price').orderBy('rating')
          .orderBy('reviews').orderBy('reviews')
          .orderBy('sku').orderBy('availability')
          .orderBy('badges').orderBy('Featured').orderBy('TopRated')
          .orderBy('Discounted').orderBy('Popular').orderBy('options.key')

          .limit(limit)
          .offset(start)
      ));
      total = products.length
  }else{
        products = JSON.parse(JSON.stringify(
        await knex('products')
          //.join('option_links', 'option_links.product_id', 'products.id')
          .where('parentlist', 'like', '%::' + cId + '::%')
          .where((builder) => {

            if (typeof pRange != 'undefined')
              builder.where('price', '>', pRange[0])
                .where('price', '<', pRange[1])

          })
          .limit(limit)
          .offset(start)
      ));
    }
    const priceRequest = JSON.parse(JSON.stringify(
      await knex('products')
        .where('parentlist', 'like','%::'+cId+'::%')
        // .where((builder) => {
        //   if (typeof pRange != 'undefined')
        //     builder.where('price', '>', pRange[0])
        //       .where('price', '<', pRange[1])
        //
        //
        // })
        .min('price', {as: 'min'})
        .max('price', {as: 'max'})
      //.whereIn("parent_id",cId)
    ));

    const priceSelector = {
      max: Math.round(priceRequest[0].max),
      min: Math.round(priceRequest[0].min),
      name: "Ціна",
      slug: "price",
      type: "range",
      value: [Math.round(priceRequest[0].min),Math.round(priceRequest[0].max)]
    }

    //---------------------------SQL-----------------------------------------
    // SELECT
    // options.title,
    //   option_links.value,
    //   options.id, COUNT(option_links.value) as cou
    // FROM `option_links`
    // LEFT JOIN options
    // ON options.id = option_links.option_id
    // LEFT JOIN products
    // ON products.id = option_links.product_id
    // WHERE `option_id` NOT IN (2,4) and `parentlist` LIKE '%:10:%'
    // GROUP BY option_links.value,options.id,options.title
    // ORDER BY options.id
    const attribFilter = JSON.parse(JSON.stringify(
      await knex('option_links')
      //.whereIn('option_links.product_id', [1,2,3])
      .whereNotIn('options.id', [2,4,78])
      .where('parentlist', 'like','%::'+cId+'::%')
      .join('options', 'option_links.option_id', 'options.id')
      .join('products', 'option_links.product_id', 'products.id')
      .select('options.id')
      .select('option_links.value')
      .select('options.title')
      .select('options.key')
      // .select('option_links.product_id as id')
      // .select('option_links.value')
      // .select('options.key')
      .count('key', {as: 'count'})
      .where((builder) => {
        if (typeof pRange != 'undefined')
          builder.where('price', '>', pRange[0])
            .where('price', '<', pRange[1])

      })
      .groupBy('options.id').groupBy('options.title')
      .groupBy('options.key').groupBy('options.key')
      .groupBy('option_links.value')
      .orderBy("options.id","ASC")
    ))
    if(attribFilter.length<600){

      //console.log(attribFilter)
      var arr2 = attribFilter.reduce( (a,b) => {
        var i = a.findIndex( x => x.id === b.id);
        return i === -1 ? a.push({
          id : b.id,
          value: [],
          type: "check",
          slug: b.key,
          name: b.title,
          items : []
        }) : a[i].items.push({name: b.value, slug: b.value,count:b.count}), a;
      }, []);

      //console.log(arr2)

    }

    var GalList = [];
    var items = [];
    var attribList = [];
    var glreb = []
    var curentIds = []
    for (const [key, galReq] of Object.entries(products)) {
      curentIds.push(galReq.id)
    }
    //console.log(galIds)
    attribList = await this.getProductAtributes(curentIds)

    GalList = await this.getImage(curentIds,url)
    //console.log(GalList)
    for (const [key, Product] of Object.entries(products)) {

      items[key] = {
        id: Product.id,
        name: Product.title,
        availability: Product.availability,
        badges: [Product.badges],
        brand: {name: "Brandix", slug: "brandix", image: "assets/images/logos/logo-1.png"},
        categories: [],
        compareAtPrice: null,
        customFields: {},
        images: GalList[Product.id],
        price: Product.price,
        rating: Product.rating,
        reviews: Product.reviews,
        sku: Product.sku,
        slug: Product.alias,
        attributes: attribList[Product.id],
      }



    }
    var filters = []

    var itamsCat = await this.catItemBuilder(cId)
    filters.push(priceSelector)
    filters.push(itamsCat)

    if(typeof arr2 !="undefined"){
      for (const [key, propList] of Object.entries(arr2)) {
        if(propList.items.length > 0){
          //console.log( propList.items.length)
          filters.push(propList)
        }


      }
    }

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
        filters: filters

      }

    return prod
  },
}
