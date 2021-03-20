var url = "https://de.korrekt.com.ua";
module.exports = {
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
  async getImage(product= 1,urls){
    var GalList = []
    const knex = strapi.connections.default;
    //console.log("Join",string);
    var products = JSON.parse(JSON.stringify(await knex('upload_file_morph')
        .join('upload_file', 'upload_file_morph.upload_file_id', 'upload_file.id')
        .where('related_id', product)
        .select('upload_file.url')
      // .limit(10)
    ));
    for (const [key_g, Gallery] of Object.entries(products)) {
      GalList[key_g] = url+Gallery.url
    }
    return GalList
    //console.log(products,urls)
  },
  async getDiscountedProducts (ctx) {
    var GalList = []
    var items = []
    var productsList = []
    //const products = await strapi.query("products").find({_limit: 10,Discounted:1});
    const knex = strapi.connections.default;
    //console.log("Join",string);
    var products = JSON.parse(JSON.stringify(await knex('products')
      .where('Discounted', 1)
      .limit(10)));

    //return products
    //console.log(await this.getImage(1,url))

    for (const [key, Product] of Object.entries(products)) {
      GalList = await this.getImage(Product.id,url)
      // const productsList = await this.getProductAtributes(Product.id)
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
    return items
  }
}
