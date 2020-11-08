import React from 'react';

const Hero = (props) => {
    return (
        <div class="main-hero-badge">
            <img class="mh-image" src={props.main_hero_link}></img>
            <div class="main-hero-health-wraper">
                <img class="hearth-img" src="https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/static%2Fheart.svg?alt=media&token=bd2036c0-c972-4ecc-9f0c-d2ae0984a22e"></img>
                <p>{props.health}</p>
            </div>
        </div>
    )
}

export default Hero;