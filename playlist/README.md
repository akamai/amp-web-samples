# Playlist

This tutorial contains: 1. Quick Reference 2. Enabling the playlist plugin 3. Configuring the playlist plugin 4. Providing a playlist

## 1. Quick Reference

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

## 2. Enabling the playlist plugin

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

## 3. Configuring the playlist plugin

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



## 4. Providing a playlist

Finally, a playlist with multiple videos/streams can be provided by passing an array of `media` objects as part of the configuration object or using the player’s `media` attribute.