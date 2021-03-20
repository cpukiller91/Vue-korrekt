var url = "https://de.korrekt.com.ua";
module.exports = {
  async getProductBySlug (ctx) {
    var data = ctx.query
    const products = await strapi.query("products").findOne({alias: data.slug});
    var GalList = [];

    //console.log(products)

    for (const [key_g, Gallery] of Object.entries(products.gallery)) {
      GalList[key_g] = url+Gallery.url
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
  }
}
