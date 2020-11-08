import React from 'react';

const Enemy = (props) => {
    return (
        <div class="enemy-main-hero-badge">
            <img class="enemy-mh-image" src={props.main_hero_link}></img>
            <div class="enemy-main-hero-health-wraper">
                <img class="enemy-hearth-img" src="https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/static%2Fheart.svg?alt=media&token=bd2036c0-c972-4ecc-9f0c-d2ae0984a22e"></img>
                <p>{props.health}</p>
            </div>
        </div>
    )
}

export default Enemy;