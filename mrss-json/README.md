# MRSS with JSON Feed using the plugin

Media RSS feed utility plugin for Akamai Adaptive Media Player (http://www.rssboard.org/media-rss).

## Using MRSS feeds with AMP

The MRSS plugin allows the player to be seeded with content using a Media RSS feed (http://www.rssboard.org/media-rss). The feed can be in the standard XML format, or a JSON equivalent. The feed can be applied to the player in the following ways:

- Using the media object's `src` property:

```js
var config = {
  plugins: {
    mrss: {}
  },
  media: {
    src: "https://domain.com/vod-feed.xml"
  }
};
akamai.amp.AMP.create("amp", config);
```

1. Via the MRSS config properties `url` or `data`:

```js
var config = {
  plugins: {
    mrss: {
      url: "https://domain.com/vod-feed.xml"
    }
  }
};
var amp = akamai.amp.AMP.create("amp", config);
```

or

```js
var config = {
  plugins: {
    mrss: {
      data: {
        "channel" : {
          "item" : {
            "guid" : "4255636",
            "media-group" : {
              "media-content" : [{
                "@attributes" : {
                  "url" : "https://domain.com/master.m3u8?start=0&end=108",
                  "duration" : "108",
                  "medium" : "video",
                  "type" : "application/x-mpegURL"
                }
              }, {
                "@attributes" : {
                  "url" : "https://domain.com/VfE.mp4",
                  "duration" : "108",
                  "medium" : "video",
                  "type" : "video/mp4"
                }
              }],
              "media-title" : "VOD - HD World",
              "media-description" : "View world's beauty in HD",
              "media-scenes": {
                "media-scene": [
                  {
                    "sceneTitle": "Scene 1",
                    "sceneDescription": "Scene 1 - Description",
                    "sceneStartTime": "00:00:00",
                    "sceneEndTime": "00:00:30"
                  }, {
                    "sceneTitle": "Scene 2",
                    "sceneDescription": "Scene 2 - Description",
                    "sceneStartTime": "00:00:30",
                    "sceneEndTime": "00:01:00"
                  }
                ]
              },
              "media-embed" : {
                "@attributes" : {
                  "url" : "http://player.js",
                  "width" : "604",
                  "height" : "341"
                },
                "media-param" : {
                  "@attributes" : {
                    "name" : "type"
                  },
                  "#text" : "text/javascript"
                }
              },
              "media-subTitle": {
                "@attributes": {
                  "type": "application/ttml+xml",
                  "lang": "en",
                  "href": "captioning.xml"
                }
              },
              "media-thumbnail" : {
                "@attributes" : {
                  "url" : "../resources/images/hd_world.jpg",
                  "width" : "604",
                  "height" : "341"
                }
              }
            }
          }
        }
      }
    }
  }
};
akamai.amp.AMP.create("amp", config);
```

- Using the runtime API:

```js
var config = {
  plugins: {
    mrss: {}
  }
};
akamai.amp.AMP.create("amp", config, function (event) {
  var amp = event.player;
  amp.mrss.url = "https://domain.com/vod-feed.xml"
  // or
  // amp.mrss.data = {...}
});
```