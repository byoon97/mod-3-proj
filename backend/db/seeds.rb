# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts "Destroying Users"
User.delete_all
puts "Destroying Items"
Item.delete_all

puts "Creating Users"
5.times do
    User.create(name: Faker::Artist.name, rating: rand(1..5))
end

puts "Creating Items"
Item.create(name: "Iphone 11", description: "Used Iphone 11 Located in Queens", quantity: 1, price: 500, img_url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-green-select-2019?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1566956144838", user_id: User.all.sample.id)
Item.create(name: "Nintendo Switch", description: "Brand new Nintendo Switch comes with Super Smash Ultimate", quantity: 3, price: 400, img_url: "https://cdn.pocket-lint.com/r/s/1200x630/assets/images/140007-games-review-nintendo-switch-review-image1-lp6zy9awm0.jpg", user_id: User.all.sample.id)
Item.create(name: "BenQ 144 HZ Monitor", description: "Brand new gaming monitors", quantity: 6, price: 150, img_url: "https://www.benq.com/content/dam/b2c/en-us/products/monitors/g-series/gw2280/gw2280-front.png", user_id: User.all.sample.id)
Item.create(name: "A5 Wagyu Steak", description: "Delicous A5 Steak from Japan", quantity: 20, price: 150, img_url: "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1237573-847&recipeName=680", user_id: User.all.sample.id)
Item.create(name: "Paint Set Up", description: "Painting Supplies", quantity: 2, price: 20, img_url: "https://images-na.ssl-images-amazon.com/images/I/51RmgDK80HL.__AC_SY300_QL70_ML2_.jpg", user_id: User.all.sample.id)
Item.create(name: "Lexus RFC", description: "20000 Miles Free Car Fax Lexus RFC", quantity: 1, price: 35000, img_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-lexus-rc-f-track-edition-ll-108-1570486358.jpg?crop=0.596xw:0.730xh;0.0929xw,0.270xh&resize=640:*", user_id: User.all.sample.id)
Item.create(name: "Off White AF1 MCA Blues", description: "Brand new size 11", quantity: 1, price: 1500, img_url: "https://stockx.imgix.net/Nike-Air-Force-1-Low-Off-White-MCA-University-Blue-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1560954943", user_id: User.all.sample.id)
Item.create(name: "Razer Black Widow RGB Keyboard", description: "Used keyboard Refurbished", quantity: 1, price: 35, img_url: "https://i.ytimg.com/vi/zujjicJ-qTo/maxresdefault.jpg", user_id: User.all.sample.id)
Item.create(name: "Canada Goose Jacket", description: "Worn once Canada Goose Parka size M", quantity: 1, price: 900, img_url: "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1545160821/product-image/4660MA_11.jpg", user_id: User.all.sample.id)
Item.create(name: "Nike SB Baby Bears", description: "VNDS Size 9", quantity: 1, price: 600, img_url: "https://sneakernews.com/wp-content/uploads/2009/06/nike-dunk-low-pro-sb-baby-bear-3-three-bears-light-umber-grasshopper-3.jpg", user_id: User.all.sample.id)
