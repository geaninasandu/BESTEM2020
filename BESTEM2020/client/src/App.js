import React, { useState } from 'react'
import LandingPage from './components/landingPage.js'
import Card from './components/Card.js'
import Backcard from "./components/Backcard.js" 
import Enemy from "./components/Enemy.js"
import Hero from "./components/Hero.js"

function App() {
    let myCards = [
        {
            image_url: "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/fin.png?alt=media&token=6bec115f-b7e7-48f0-93e8-9ce7ccb47525",
            hero_name: "Fin",
            power: "2",
            health: "1",
            mana: "1"
        },
        {
            image_url: "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/jake.png?alt=media&token=1f137568-894b-4266-8063-e25050670f55",
            hero_name: "Jake",
            power: "1",
            health: "2",
            mana: "1"
        },
        {
            image_url: "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/rayman.png?alt=media&token=045f6806-769e-4a9f-946d-03e6625d621f",
            hero_name: "Rayman",
            power: "3",
            health: "2",
            mana: "2"
        },
    ]
    let myCards2 = [
        {
            image_url: "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/fin.png?alt=media&token=6bec115f-b7e7-48f0-93e8-9ce7ccb47525",
            hero_name: "Fin",
            power: "2",
            health: "1",
            mana: "1"
        },
        {
            image_url: "https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/jake.png?alt=media&token=1f137568-894b-4266-8063-e25050670f55",
            hero_name: "Jake",
            power: "1",
            health: "2",
            mana: "1"
        },
    ]

    const userOne = "5fa7692095a23b60688fefdb"
    const userTwo = "5fa7692095a23b60688ff034"
    const gameId = "5fa7b7f536a4622c34ae94b8"

    const [myCards3, setMyCards] = useState(myCards)

    fetch("http://localhost:5000/api/game/5fa7b7f536a4622c34ae94b8/").then(res => res.json()).then({
        setMyCards()
    })

    function f() {
        console.log('hello')
    }

    return (
        <>
        <div id="enemy_hand" class="row">
            <div class="row_wraper">
                <Backcard/>
                <Backcard/>
                <Backcard/>
                <Backcard/>
            </div>
        </div>

        <div id="enemy_board" class="row">
            <div class="row_wraper">
                {
                    myCards.map(element => {
                        return <Card onClick={f}
                            image_url={element.image_url}
                            hero_name={element.hero_name}
                            power={element.power}
                            health={element.health}
                            mana={element.mana} />
                    })
                }
            </div>
        </div>

        <div id="my_board" class="row">
            <div class="row_wraper">
                {
                    myCards2.map(element => {
                        return <Card onClick={f}
                            image_url={element.image_url}
                            hero_name={element.hero_name}
                            power={element.power}
                            health={element.health}
                            mana={element.mana} />
                    })
                }
            </div>
        </div>

        <div id="my_hand" class="row">
            <div class="row_wraper">
                    {
                        myCards.map(element => {
                            return <Card onClick={f}
                                image_url={element.image_url}
                                hero_name={element.hero_name}
                                power={element.power}
                                health={element.health}
                                mana={element.mana} />
                        })
                    }
            </div>
        </div>

        <Enemy main_hero_link={"https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fshushi_slayer.png?alt=media&token=1ac29a52-c3d2-4982-9e5e-5eb14c1664ae"}
            health = {30}/>

        <Hero main_hero_link={"https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/heroes%2Fdiana.png?alt=media&token=00e811b4-c27c-4f58-9913-0489a1660404"}
            health = {30}/>
        </>
    );
}

export default App;
