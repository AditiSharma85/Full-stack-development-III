db.getCollection('Restaurants').find({"cuisine":{$in:["Bakery","Chicken","Hamburgers","American"]}})
db.getCollection('Restaurants').find({ $and: [{"cuisine":{$in:["Bakery","Chicken","Hamburgers","American"]}},{"city":{ $ne: "Brooklyn"}}]})//query
db.getCollection('Restaurants').find({ $and: [{"cuisine":{$in:["Bakery","Chicken","Hamburgers","American"]}},{"city":{ $ne: "Brooklyn"}},{"restaurant_id":{ $gt:"4000000"}}]})
db.getCollection('Restaurants').find({ $and: [{"cuisine":{$in:["Bakery","Chicken","Hamburgers","American"]}},{"city":{ $ne: "Brooklyn"}},{"restaurant_id":{ $gt:"4000000"}}]},{"cuisine":1,"name":1,"city":1,"restaurant_id":1,"_id":0})
db.getCollection('Restaurants').find({ $and: [{"cuisine":{$in:["Bakery","Chicken","Hamburgers","American"]}},{"city":{ $ne: "Brooklyn"}},{"restaurant_id":{ $gt:"4000000"}}]},{"cuisine":1,"name":1,"city":1,"restaurant_id":1,"_id":0}).sort({"restaurant_id":-1})//query






