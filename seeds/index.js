const mongoose = require("mongoose")
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require("../models/campground");


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

campimgs = [
  {
    url: 'https://res.cloudinary.com/dotw5npsb/image/upload/v1680080728/YelpCamp/jljfkc3ysaulkkra7oq0.jpg',
    filename: 'YelpCamp/jljfkc3ysaulkkra7oq0',
  },
  {
    url: 'https://res.cloudinary.com/dotw5npsb/image/upload/v1680080729/YelpCamp/jdzmk53vu9cachgumle2.jpg',
    filename: 'YelpCamp/jdzmk53vu9cachgumle2',
  },
  {
    url: 'https://res.cloudinary.com/dotw5npsb/image/upload/v1680080729/YelpCamp/mkrifibdbkbc49boiuqh.jpg',
    filename: 'YelpCamp/mkrifibdbkbc49boiuqh',
  },
  {
    url: 'https://res.cloudinary.com/dotw5npsb/image/upload/v1680080730/YelpCamp/svl2fzkf8khzg8r1sgkq.jpg',
    filename: 'YelpCamp/svl2fzkf8khzg8r1sgkq',
  }

]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 600; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '641dc4de1c1fcc51cbbb4c74',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum reprehenderit atque magni accusamus odio voluptatum voluptate quos error tempora sed harum velit consequuntur veritatis in, est quo enim illo mollitia?',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images : campimgs[(random1000%4)]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});