class Ability {
    constructor(name, description, cost) {
        this.name = name;
        this.description = description;
        this.cost = cost;
    }
}

class Card {
    constructor(name, type, health, damage, manaCost, imageUrl) {
        this.name = name;
        this.type = type;
        this.health = health;
        this.manaCost = manaCost;
        this.damage = damage;
        this.imageUrl = imageUrl;
    }
}

export const heroes = [
    {
        name: 'Sushi Slayer',
        ability: new Ability('Anger', 'Add two attack points to an ally.', 2),
        picture: 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fshushi_slayer.png?alt=media&token=1ac29a52-c3d2-4982-9e5e-5eb14c1664ae',
        health: 30,
    }, {
        name: 'Diana',
        ability: new Ability('Blur', 'Give an ally a 50/50 chance to dodge a non-lethal attack.', 2),
        picture: 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fdiana.png?alt=media&token=6efc3810-0b19-443a-87e8-226aa4a2a0ec',
        health: 30,
    }, {
        name: 'Spike Spiegel',
        ability: new Ability('Point Blank', 'Deal two damage to an enemy.', 2),
        picture: 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fspike_spiegel.jpg?alt=media&token=4abc19de-68b9-4d25-bc6f-324b8cffa60f',
        health: 30,
    }, {
        name: 'Faye Valentine',
        ability: new Ability('Tactical', 'Raise your maximum MP by 2 for the next round.', 2),
        picture: 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Ffaye_valentine.jpg?alt=media&token=d45ccf85-b4c6-41ea-b952-b805193d07c2',
        health: 30,
    },
];

export const cards = [
    new Card('Fin', 'CREATURE', 2, 1, 1, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/fin.png?alt=media&token=6bec115f-b7e7-48f0-93e8-9ce7ccb47525'),
    new Card('Jake', 'CREATURE', 1, 2, 1, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/jake.png?alt=media&token=1f137568-894b-4266-8063-e25050670f55'),
    new Card('Rayman', 'CREATURE', 3, 2, 2, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/rayman.png?alt=media&token=045f6806-769e-4a9f-946d-03e6625d621f'),
    new Card('Hellboy', 'CREATURE', 2, 4, 3, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/hellboy.jpg?alt=media&token=0f964243-7261-4179-924e-61139c9a654f'),
    new Card('Xull', 'CREATURE', 6, 1, 4, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/xull.png?alt=media&token=df3f777e-7c32-4b71-8f37-88c06c29d394'),
    new Card('Yumiko', 'CREATURE', 5, 4, 4, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/yumiko.png?alt=media&token=b2a14be7-148d-49b5-a3a5-4157b12427c5'),
    new Card('WuShang', 'CREATURE', 4, 6, 5, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/WuShang.png?alt=media&token=c885423c-ba40-4e75-a445-b43dba897a5d'),
    new Card('Nimue', 'CREATURE', 5, 5, 5, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/nimue.png?alt=media&token=65c4c4d3-86b6-465a-bfa0-76352c305537'),
    new Card('Lobster', 'CREATURE', 5, 6, 6, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/lobster.png?alt=media&token=e9c87844-3c2f-41d4-aa81-5ad3df0bdb72'),
    new Card('Orion', 'CREATURE', 7, 6, 7, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/orion.png?alt=media&token=a42707c2-b87a-41a3-921f-771e61a8bc2e'),
    new Card('barraza', 'CREATURE', 4, 8, 8, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/barraza.png?alt=media&token=239de3f3-54fa-4d9b-add1-8bd48398cca0'),
    new Card('brynn', 'CREATURE', 7, 7, 9, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/brynn.png?alt=media&token=590402d7-17e2-41b6-bd4d-96b3e1e84895'),
    new Card('Teros', 'CREATURE', 8, 9, 10, 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/teros.png?alt=media&token=16539974-fd69-47b2-880d-2850186755b5'),
];