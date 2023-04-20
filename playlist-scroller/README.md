# Playlist with scroll list <!-- omit from toc -->

This tutorial contains:

- [Quick Reference](#quick-reference)
- [Enabling the playlist plugin](#enabling-the-playlist-plugin)
- [Configuring the playlist plugin](#configuring-the-playlist-plugin)
- [Providing a playlist](#providing-a-playlist)
- [Event `mediachange`](#event-mediachange)
- [Select the video from the queue](#select-the-video-from-the-queue)


## Quick Reference

The plugin can be used by providing a `playlist` object along an array of media objects in the player config.

```javascript
var config = {
  plugins: {
    playlist: {
      resources: [
        { src: "${paths.plugins}amp-playlist/Playlist.min.js", debug: "${paths.plugins}amp-playlist/Playlist.js", type: "text/javascript" },
        { src: "${paths.plugins}amp-playlist/Playlist.min.css", debug: "${paths.plugins}amp-playlist/Playlist.css", type: "text/css" }
      ],
      autoadvance: {
        enabled: true,
        interval: 10
      }
    }
  },
  autoplay: true,
  media: [
    { src: "//mdtp-a.akamaihd.net/Video1.mp4", type: "video/mp4" },
    { src: "//mdtp-a.akamaihd.net/Video2.mp4", type: "video/mp4" },
    { src: "//mdtp-a.akamaihd.net/Video3.mp4", type: "video/mp4" }
  ]
}
akamai.amp.AMP.create("amp", config);
```

## Enabling the playlist plugin

In order to enable the playlist plugin is needed to add a `playlist` configuration object to the player configuration and provide the required resources.

```javascript
var config = {
  plugins: {
    playlist: {
      resources: [
        { src: "${paths.plugins}amp-playlist/Playlist.min.js", debug: "${paths.plugins}amp-playlist/Playlist.js", type: "text/javascript" },
        { src: "${paths.plugins}amp-playlist/Playlist.min.css", debug: "${paths.plugins}amp-playlist/Playlist.css", type: "text/css" }
      ]
    }
  },
}
```

## Configuring the playlist plugin

The amount of time between videos can be configured by providing an `interval` as part of the autoadvance configuration.

```javascript
var config = {
  plugins: {
    playlist: {
      resources: [
        { src: "${paths.plugins}amp-playlist/Playlist.min.js", debug: "${paths.plugins}amp-playlist/Playlist.js", type: "text/javascript" },
        { src: "${paths.plugins}amp-playlist/Playlist.min.css", debug: "${paths.plugins}amp-playlist/Playlist.css", type: "text/css" }
      ],
      autoadvance: {
        enabled: true,
        interval: 10 // Wait time in seconds before the next video
      }
    }
  }
}
```

## Providing a playlist

Finally, a playlist with multiple videos/streams can be provided by passing an array of `media` objects as part of the configuration object or using the player’s `media` attribute.

## Event `mediachange`

The `mediachange` event is fired when the playlist item changes. The event object contains the `player` object and the `playlist` object.

```javascript
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
```

## Select the video from the queue

The playlist can be controlled by using the `playlist` object.

```javascript
const media = amp.playlist.queue[4]

if (media) {
    amp.playlist.index = 0
    amp.setMedia(media)
}
```
