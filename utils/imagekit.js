// SDK initialization

const ImageKit = require("imagekit");

exports.initImageKit = function(){

    let imagekit = new ImageKit({
        publicKey : process.env.PUBLIC_KEY_IMAGEkIT,
        privateKey : process.env.PRIVATE_KEY_IMAGEkIT,
        urlEndpoint : process.env.URL_ENDPOINT_IMAGEKIT
    });
    
    return imagekit
}
