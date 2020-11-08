const mongoose = require('mongoose');
const HeroSchema = require('./Hero').HeroSchema;
const CardSchema = require('./Card').CardSchema;

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profiles: {
        type: [ {
            name: String,
            hero: HeroSchema,
            cards: [ CardSchema ],
        } ],
        default: [],
    },
});

const Player = new mongoose.model('Player', PlayerSchema);

const PlayerCards = [
    {
        "name": "Fin",
        "type": "CREATURE",
        "health": 2,
        "damage": 1,
        "manaCost": 1,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/fin.png?alt=media&token=6bec115f-b7e7-48f0-93e8-9ce7ccb47525"
    },
    {
        "name": "Fin",
        "type": "CREATURE",
        "health": 2,
        "damage": 1,
        "manaCost": 1,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/fin.png?alt=media&token=6bec115f-b7e7-48f0-93e8-9ce7ccb47525"
    },
    {
        "name": "Jake",
        "type": "CREATURE",
        "health": 1,
        "damage": 2,
        "manaCost": 1,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/jake.png?alt=media&token=1f137568-894b-4266-8063-e25050670f55"
    },
    {
        "name": "Jake",
        "type": "CREATURE",
        "health": 1,
        "damage": 2,
        "manaCost": 1,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/jake.png?alt=media&token=1f137568-894b-4266-8063-e25050670f55"
    },
    {
        "name": "Rayman",
        "type": "CREATURE",
        "health": 3,
        "damage": 2,
        "manaCost": 2,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/rayman.png?alt=media&token=045f6806-769e-4a9f-946d-03e6625d621f"
    },
    {
        "name": "Rayman",
        "type": "CREATURE",
        "health": 3,
        "damage": 2,
        "manaCost": 2,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/rayman.png?alt=media&token=045f6806-769e-4a9f-946d-03e6625d621f"
    },
    {
        "name": "Hellboy",
        "type": "CREATURE",
        "health": 2,
        "damage": 4,
        "manaCost": 3,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/hellboy.jpg?alt=media&token=0f964243-7261-4179-924e-61139c9a654f"
    },
    {
        "name": "Hellboy",
        "type": "CREATURE",
        "health": 2,
        "damage": 4,
        "manaCost": 3,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/hellboy.jpg?alt=media&token=0f964243-7261-4179-924e-61139c9a654f"
    },
    {
        "name": "Xull",
        "type": "CREATURE",
        "health": 6,
        "damage": 1,
        "manaCost": 4,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/xull.png?alt=media&token=df3f777e-7c32-4b71-8f37-88c06c29d394"
    },
    {
        "name": "Xull",
        "type": "CREATURE",
        "health": 6,
        "damage": 1,
        "manaCost": 4,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/xull.png?alt=media&token=df3f777e-7c32-4b71-8f37-88c06c29d394"
    },
    {
        "name": "Yumiko",
        "type": "CREATURE",
        "health": 5,
        "damage": 4,
        "manaCost": 4,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/yumiko.png?alt=media&token=b2a14be7-148d-49b5-a3a5-4157b12427c5"
    },
    {
        "name": "Yumiko",
        "type": "CREATURE",
        "health": 5,
        "damage": 4,
        "manaCost": 4,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/yumiko.png?alt=media&token=b2a14be7-148d-49b5-a3a5-4157b12427c5"
    },
    {
        "name": "WuShang",
        "type": "CREATURE",
        "health": 4,
        "damage": 6,
        "manaCost": 5,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/WuShang.png?alt=media&token=c885423c-ba40-4e75-a445-b43dba897a5d"
    },
    {
        "name": "WuShang",
        "type": "CREATURE",
        "health": 4,
        "damage": 6,
        "manaCost": 5,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/WuShang.png?alt=media&token=c885423c-ba40-4e75-a445-b43dba897a5d"
    },
    {
        "name": "Orion",
        "type": "CREATURE",
        "health": 7,
        "damage": 6,
        "manaCost": 7,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/orion.png?alt=media&token=a42707c2-b87a-41a3-921f-771e61a8bc2e"
    },
    {
        "name": "Orion",
        "type": "CREATURE",
        "health": 7,
        "damage": 6,
        "manaCost": 7,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/orion.png?alt=media&token=a42707c2-b87a-41a3-921f-771e61a8bc2e"
    },
    {
        "name": "barraza",
        "type": "CREATURE",
        "health": 7,
        "damage": 7,
        "manaCost": 9,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/barraza.png?alt=media&token=239de3f3-54fa-4d9b-add1-8bd48398cca0"
    },
    {
        "name": "barraza",
        "type": "CREATURE",
        "health": 7,
        "damage": 7,
        "manaCost": 9,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/barraza.png?alt=media&token=239de3f3-54fa-4d9b-add1-8bd48398cca0"
    },
    {
        "name": "brynn",
        "type": "CREATURE",
        "health": 7,
        "damage": 7,
        "manaCost": 9,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/brynn.png?alt=media&token=590402d7-17e2-41b6-bd4d-96b3e1e84895"
    },
    {
        "name": "brynn",
        "type": "CREATURE",
        "health": 7,
        "damage": 7,
        "manaCost": 9,
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/brynn.png?alt=media&token=590402d7-17e2-41b6-bd4d-96b3e1e84895"
    }
]

const PlayerProfiles = [
    {
        "name": "Swift Strike",
        "hero": {
            "ability": {
                "name": "Anger",
                "description": "Add two attack points to an ally.",
                "cost": 2
            },
            "name": "Sushi Slayer",
            "picture": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fshushi_slayer.png?alt=media&token=1ac29a52-c3d2-4982-9e5e-5eb14c1664ae",
            "health": 30
        },
        "cards": PlayerCards
    },
    {
        
        "name": "Spadasin",
        "hero": {
            "name": "Diana",
            "ability": {
                "name": "Blur",
                "description": "Give an ally a 50/50 chance to dodge a non-lethal attack.",
                "cost": 2
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fdiana.png?alt=media&token=6efc3810-0b19-443a-87e8-226aa4a2a0ec",
            "health": 30
        },
        "cards": PlayerCards
    },
    {
        "name": "Barron",
        "hero": {
            "name": "Spike Spiegel",
            "ability": {
                "name": "Point Blank",
                "description": "Deal two damage to an enemy.",
                "cost": 2
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fspike_spiegel.jpg?alt=media&token=4abc19de-68b9-4d25-bc6f-324b8cffa60f",
            "health": 30
        },
        "cards": PlayerCards
    },
    {
        "name": "Zapper",
        "hero": {
            "name": "Faye Valentine",
            "ability": {
                "name": "Tactical",
                "description": "Raise your maximum MP by 2 for the next round.",
                "cost": 2
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Ffaye_valentine.jpg?alt=media&token=d45ccf85-b4c6-41ea-b952-b805193d07c2",
            "health": 30
        },
        "cards": PlayerCards
    }
]

// Trebuie dat drop la game dupa ce se creaza for some reason...
Player.countDocuments().then((count) => {
    if (count === 0) {
        Player.insertMany([
            {
                username: 'user1',
                password: '$2b$10$dVEfvkeChNWIpnKrnCRWUuwtHlyVyR.slxbB3DUIVD83Nb41TUAim',
                profiles: PlayerProfiles
            },
            {
                username: 'user2',
                password: '$2b$10$dVEfvkeChNWIpnKrnCRWUuwtHlyVyR.slxbB3DUIVD83Nb41TUAim',
                profiles: PlayerProfiles
            },
        ]);
    }
});

module.exports = { Player, PlayerSchema };