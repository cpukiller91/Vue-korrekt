var url = "https://korrekt.com.ua";
module.exports = {
  async setTranslate(ctx){
    const knex = strapi.connections.default;
    let catList = JSON.parse(JSON.stringify(ctx.request.body));

    for (const [key, Product] of Object.entries(catList)) {
      var id = Product.id
      delete Product.id
      Product.translate = 1
      await knex('products').where({id:id}).update(Product)
      console.log("--",Product)
    }

    return catList
  },
  async getTranslate(ctx){
    var RES = []
    let catList = ctx.query;
    const knex = strapi.connections.default;
    console.log(catList)
    const productList = JSON.parse(JSON.stringify(
      await knex(catList.model)
        //.where({translate:false})
        .whereNot('translate', true)
        .andWhere('parentlist', 'like','%:3:%')
        //.whereNull('translate')
        // .select("products.title as pname","products.id as pid")
        // .select("categories.title as cname")
        // .select("option_links.value as ovalue")
        // .join('categories','categories.id','products.parent_id')
        // .join('option_links','products.id','option_links.product_id')
        .limit(2)

    ));
    return productList

  }
}
