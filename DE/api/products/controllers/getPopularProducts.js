
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
  async getPopularProducts (ctx) {
    var GalList = []
    var items = []
    const products = await strapi.query("products").find({_limit: 10,Popular:1});
    //return products
    //console.log(products)

    for (const [key, Product] of Object.entries(products)) {
      for (const [key_g, Gallery] of Object.entries(Product.gallery)) {
        GalList[key_g] = "https://de.korrekt.com.ua"+Gallery.url
      }
      const productsList = await this.getProductAtributes(Product.id)
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
