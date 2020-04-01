db.getCollection('Restaurants').find({})
db.getCollection('Restaurants').find({"cuisine":{ $eq: "Japanese"}})//query
db.getCollection('Restaurants').find({"cuisine":{ $eq: "Japanese"}},{"_id":1,"cuisine":1,"name":1,"city":1,"restaurant_id":1}).sort( { "restaurant_id": 1 } )
