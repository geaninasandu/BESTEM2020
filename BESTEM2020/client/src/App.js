import React from 'react'
import LandingPage from './components/landingPage.js'
import Card from './components/Card.js'
import Backcard from "./components/Backcard.js" 

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
        </>
    );
}

export default App;


// {
//     myCards.map(element => {
//         return <Card onClick={f}
//             image_url={element.image_url}
//             hero_name={element.hero_name}
//             power={element.power}
//             health={element.health}
//             mana={element.mana} />
//     })
// }