var amp,
    videos = [{
        title: "Welcome",
        source: [{
            src: "https://welcomevideo.akamaized.net/delivery/1f/07/1f0756a1-f54b-4e22-adbc-8c68680532ea/tom-intro-for-new-customers-v26b238090-d41d-336d-4347-3dac7fc07f0e.m3u8",
            type: "application/x-mpegURL"
        }],
        poster: "https://mdtp-a.akamaihd.net/amp-samples-assets/img/space_alone.jpg"
    },
    {
        title: "Big Buck Bunny",
        source: [{
            src: "https://mdtp-a.akamaihd.net/customers/akamai/video/VfE.mp4",
            type: "video/mp4"
        }],
        poster: "https://mdtp-a.akamaihd.net/amp-samples-assets/img/bunny.jpg"
    },
    {
        title: "OTT Frontline",
        source: [{
            src: "https://akamtrans-a.akamaihd.net/delivery/20/35/2035ef57-5cac-4d23-ab88-6366e9c24e6a/value-of-cmaf-in-the-drive-towards-ott-interoperability3d81e38c-2cad-336d-e2ee-4131c52ad3d4.m3u8",
            type: "application/x-mpegURL"
        }],
        poster: "https://mdtp-a.akamaihd.net/amp-samples-assets/img/hd_world.jpg"
    },
    {
        title: "AMD HLS",
        source: [{
            src: "https://akamtrans-a.akamaihd.net/delivery/94/88/9488592c-0671-49ba-b1c1-d908418a629a/experience-the-edge3d81e38c-2cad-336d-e2ee-4131c52ad3d4.m3u8",
            type: "application/x-mpegURL"
        }],
        poster: "https://mdtp-a.akamaihd.net/amp-samples-assets/img/elephant-dreams.jpg"
    },
    {
        title: "BBB HLS",
        source: [{
            src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            type: "application/x-mpegURL"
        }],
        poster: "https://mdtp-a.akamaihd.net/amp-samples-assets/img/bunny.jpg"
    }
    ];

function loadHandler(event) {
    var config = {
        plugins: {
            playlist: {
                resources: [
                    { src: "https://mdtp-a.akamaihd.net/amp-samples-assets/js/Playlist.js", debug: "https://mdtp-a.akamaihd.net/amp-samples-assets/js/Playlist.js", type: "text/javascript" },
                    { src: "https://mdtp-a.akamaihd.net/amp-samples-assets/css/Playlist.css", debug: "https://mdtp-a.akamaihd.net/amp-samples-assets/css/Playlist.css", type: "text/css" }],
                autoadvance: {
                    enabled: true,
                    interval: 10
                }
            }
        },
        autoplay: true,
        media: videos
    };

    akamai.amp.AMP.create("#akamai-media-player", config, function (event) {
        amp = event.player;
        amp.addEventListener("mediachange", function (event) {
            var playlist = event.player.playlist;
            console.log("playlistItemChange", playlist.index);
            switch (playlist.index) {
                case 0:
                    location.hash = "#welcome";
                    break;
                case 1:
                    location.hash = "#bigbuckbunny";
                    break;
                case 2:
                    location.hash = "#ottfrontline";
                    break;
                case 3:
                    location.hash = "#amdhls";
                    break;
                case 4:
                    location.hash = "#bbbhls";
                    break;
            }
        });
    });

    // Add event listeners for the playlist items

    document.getElementById("welcome").addEventListener("click", function (event) {
        const media = amp.playlist.queue[4]

        if (media) {
            amp.playlist.index = 0
            amp.setMedia(media)
        }

    });

    document.getElementById("bigbuckbunny").addEventListener("click", function (event) {
        const media = amp.playlist.queue[4]

        if (media) {
            amp.playlist.index = 1
            amp.setMedia(media)
        }
    });

    document.getElementById("ottfrontline").addEventListener("click", function (event) {
        const media = amp.playlist.queue[4]

        if (media) {
            amp.playlist.index = 2
            amp.setMedia(media)
        }
    });

    document.getElementById("amdhls").addEventListener("click", function (event) {
        const media = amp.playlist.queue[4]

        if (media) {
            amp.playlist.index = 3
            amp.setMedia(media)
        }
    });

    document.getElementById("bbbhls").addEventListener("click", function (event) {
        const media = amp.playlist.queue[4]

        if (media) {
            amp.playlist.index = 4
            amp.setMedia(media)
        }
    });
}
