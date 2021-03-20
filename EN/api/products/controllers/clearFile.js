const fs = require('fs');
module.exports = {
  async getListUploadFile(product = []){
    const knex = strapi.connections.default;
    //console.log("Join",string);
    var products = JSON.parse(JSON.stringify(await knex('upload_file_morph')
        .column( {upid:"upload_file.id"},{id:"upload_file_morph.related_id"},'upload_file.name','products.title')
        //.whereIn('related_id', product)
        .whereNull("alternativeText")
        .join('upload_file', 'upload_file_morph.upload_file_id', 'upload_file.id')
        .join('products', 'upload_file_morph.related_id', 'products.id')
        .limit(10000)
      //.where('related_id', product)


      // .limit(10)
    ));
    return products
  },
  async clear(){
    const knex = strapi.connections.default;
    const FileList = await this.getListUploadFile();

    for (const [key, File] of Object.entries(FileList)) {
      var pathName = '/home/korrekt/DE/public/uploads/' + File.name;

        if (fs.existsSync(pathName)) {
          fs.unlink(pathName, function (err) {
              //if (err) throw err;
              // if no error, file has been deleted successfully
              //console.log('File deleted!');
          });
          const uplinck = await knex('upload_file').where('id', File.upid).update({alternativeText:File.title})
          //file exists
          //console.log(pathName)
        }else{
          const uplinck = await knex('upload_file').where('id', File.upid).update({alternativeText:File.title})
          //console.log("clear->",uplinck)
        }


    }
    return FileList
  }
}
