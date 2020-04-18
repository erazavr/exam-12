const mongoose = require('mongoose');
const nanoid = require('nanoid');

const config = require('./config');

const User = require('./models /User');
const Photo = require('./models /Photo');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name)
    }
    const [user1, user2, user3] = await User.create({
        username: "user1",
        password: "123",
        token: nanoid(),
    }, {
        username: "user2",
        password: "123",
        token: nanoid(),
    },{
        username: "user3",
        password: "123",
        token: nanoid(),
    });
    await Photo.create({
       user: user1._id,
       title: 'Лайка',
       image: 'dog1.jpg'
    },{
        user: user1._id,
        title: 'Овчарка',
        image: 'dog2.jpg'
    },{
        user: user2._id,
        title: 'Мейн-кун',
        image: 'mainkun.jpg'
    },{
        user: user2._id,
        title: 'Манчкин',
        image: 'manchkin.jpg'
    },{
        user: user3._id,
        title: 'Мерседес',
        image: 'mers.jpeg'
    },{
        user: user3._id,
        title: 'Субару',
        image: 'subaru .jpeg'
    });
    mongoose.connection.close();
};


run().catch(error => {
    throw error
});