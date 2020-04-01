db.getCollection('Restaurants').find({$or:[{"name":/Thai$/},{"address.street":/Street$/},{"address.zipcode":{$eq:"17988"}}]})
db.getCollection('Restaurants').find({$or:[{"name":/Thai$/},{"address.street":/Street$/},{"address.zipcode":{$eq:"17988"}}]},{"address.street":1,"name":1,"city":1,"restaurant_id":1}).sort({"restaurant_id":-1})
