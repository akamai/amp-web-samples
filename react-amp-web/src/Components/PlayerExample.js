import React, { useEffect } from 'react';
import  AMP  from  'adaptive-media-player'
import './PlayerExample.css'

function PlayerExample(props) {
    useEffect(() => {
        const config = {
            autoplay: true,
            media: {
                title: `${props.name} Sample`,
                src: "//cph-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
                type: "application/x-mpegURL"
            }
        }

        AMP.create("snap.trial", "#player", config)
    });

    return (
        <div className="PlayerExample-container">
            <div id="player"></div>
        </div>
    );
}

export default PlayerExample;