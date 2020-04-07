const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb://aditiSharma85:Green%40pple2020@cluster0-shard-00-00-qmzao.azure.mongodb.net:27017,cluster0-shard-00-01-qmzao.azure.mongodb.net:27017,cluster0-shard-00-02-qmzao.azure.mongodb.net:27017/AditiDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connect;
