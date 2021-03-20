
var url = "https://de.korrekt.com.ua";
module.exports = {
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
  async getSuggestions(ctx){
    var data = ctx.query
    var query,category

    if(typeof data.query != 'undefined'){
      query = data.query
      delete data.query
    }
    if(typeof data.category != 'undefined'){
      category = data.category;
      delete data.category
    }
    //console.log(ctx.query)
    var items = []
    var GalList = []

    var cId = await this.getCatIdBySlug(category)
    const knex = strapi.connections.default;
    //console.log("___--",cId)
    const products = JSON.parse(JSON.stringify(
      await knex('products')
        .limit(10)
        //.count("id",{as: 'total'})
        .where('title', 'like','%'+query+'%')
        .andWhere('parentlist', 'like','%::'+cId+'::%')
        .orWhere('sku', 'like','%'+query+'%')
        .orWhere('alias', 'like','%'+query+'%')

      //.whereIn("parent_id",cId)
    ));
    var curentIds = []
    for (const [key, galReq] of Object.entries(products)) {
      curentIds.push(galReq.id)
    }
    GalList = await this.getImage(curentIds,url)
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
        attributes: [],
      }
    }

    return items
  }
}
