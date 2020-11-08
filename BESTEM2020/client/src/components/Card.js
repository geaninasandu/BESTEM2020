import React from 'react';

const Card = (props) => {
    return (
        <div onClick={props.onClick} class="card">
            <div class="mana-holder"><span id="mana-text">{props.mana}</span></div>
            <img class="hero-img" src={props.image_url}></img>

            <div class="banner">
                <p>{props.hero_name}</p>
            </div>

            <div class="bottom-banner">
                <div class="health-holder">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/static%2Fheart.svg?alt=media&token=bd2036c0-c972-4ecc-9f0c-d2ae0984a22e"></img>
                    <p>{props.health}</p>
                </div>

                <div class="power-holder">
                    <p>{props.power}</p>
                    <img src="https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/static%2Fbattle.svg?alt=media&token=e88c5bed-149c-4867-a459-3cfa66e44eae"></img>
                </div>
            </div>
        </div>
    )
}

export default Card;