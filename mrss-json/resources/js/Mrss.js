this.akamai = this.akamai || {};
this.akamai.amp = this.akamai.amp || {};
this.akamai.amp.mrss = (function (exports) {
  'use strict';

  var MRSSEvents = {
    CHANGED: "changed",
    ERROR: "error",
    REQUEST: "request",
    LOADED: "loaded"
  };

  var MRSSError = /*#__PURE__*/function (_akamai$amp$AMPError) {
    babelHelpers.inherits(MRSSError, _akamai$amp$AMPError);
    function MRSSError(message, code, metadata) {
      babelHelpers.classCallCheck(this, MRSSError);
      return _akamai$amp$AMPError.call(this, message, code, metadta) || this;
    }
    babelHelpers.createClass(MRSSError, null, [{
      key: "create",
      value: function create(message, code, metadta) {
        return new MRSSError(message, code);
      }
    }]);
    return MRSSError;
  }(akamai.amp.AMPError);

  var Media = akamai.amp.Media;
  var Utils = akamai.amp.Utils;
  var FeedVO = /*#__PURE__*/babelHelpers.createClass(function FeedVO() {
    babelHelpers.classCallCheck(this, FeedVO);
    this.item = [];
    this.metadata = {};
    this.title = null;
    this.link = null;
    this.description = null;
    this.category = null;
    this.pubDate = null;
    this.language = null;
    this.ttl = null;
  });
  var MRSSHelper = /*#__PURE__*/function () {
    /**
     * @constructor
     * @private
     */
    function MRSSHelper(logger) {
      babelHelpers.classCallCheck(this, MRSSHelper);
      this.logger = logger;
    }

    /** */
    babelHelpers.createClass(MRSSHelper, [{
      key: "getFeed",
      value: function getFeed(url) {
        return Utils.request(url).then(function (xhr) {
          if (xhr.responseType === "document" || /^</.test(xhr.responseText)) {
            return Utils.xmlToJson(xhr.responseXML);
          } else {
            return JSON.parse(xhr.responseText);
          }
        });
      }

      /** */
    }, {
      key: "getMediaNode",
      value: function getMediaNode(item, name) {
        var checkItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var mediaName = "media-".concat(name);
        var base = item['media-group'] || item;
        var mediaContent = base['media-content'];
        var node;
        if (mediaContent && mediaContent[mediaName] != null) {
          // check media-content node's children first
          node = mediaContent[mediaName];
        } else if (base[mediaName] != null) {
          // check media-group or item node's children next
          node = base[mediaName];
        } else if (item[mediaName] != null) {
          // check item node directly just in case there the node is outside of the media:group
          node = item[mediaName];
        } else if (item[name] != null && checkItem) {
          // last but not least, check the item node's children for a non-media equivalent
          // i.e. If there is no media:title, use the item's title
          node = item[name];
        }
        return node;
      }
    }, {
      key: "createEmbed",
      value: function createEmbed(item) {
        try {
          var embed = this.getMediaNode(item, "embed");
          if (embed == null) {
            return;
          }
          var embedVO = {
            url: embed["@attributes"].url,
            width: embed["@attributes"].width,
            height: embed["@attributes"].height,
            params: {}
          };
          var params = embed["media-param"] instanceof Array ? embed["media-param"] : [embed["media-param"]];
          params.forEach(function (param) {
            if (!param || !param["@attributes"] || !param["@attributes"].name) return;
            embedVO.params[param["@attributes"].name] = param["#text"];
          });
          return embedVO;
        } catch (error) {
          this.logger.error("[AMP Feed Parse Error] embed parse error: ".concat(error.message), error);
        }
      }

      /** */
    }, {
      key: "createFeed",
      value: function createFeed(json) {
        var _this = this;
        try {
          var channel = json.channel;
          var feedVO = new FeedVO();
          if (channel != null) {
            feedVO.title = channel.title;
            feedVO.description = channel.description;
            feedVO.language = channel.language;
            feedVO.category = channel.category;
            feedVO.pubDate = new Date(Date.parse(channel.pubDate));
            feedVO.ttl = channel.ttl;

            // parse media items
            var items = channel.item instanceof Array ? channel.item : [channel.item];
            items.forEach(function (item) {
              var mediaVO = _this.createMedia(item);
              feedVO.item.push(mediaVO);
            });

            // everything else goes in metadata
            for (var key in channel) {
              if (!(key in feedVO)) {
                feedVO.metadata[key] = channel[key];
              }
            }
          }
          return feedVO;
        } catch (error) {
          this.logger.error("[AMP Feed Parse Error] feed parse error: ".concat(error.message), error);
        }
      }

      /** */
    }, {
      key: "createMedia",
      value: function createMedia(item) {
        try {
          var mediaVO = new Media();
          var mediaContent = this.getMediaNode(item, 'content');
          //parse the media content
          if (mediaContent instanceof Array) {
            mediaVO.source = [];
            mediaContent.forEach(function (content) {
              var source = {
                src: content['@attributes'].url,
                type: content['@attributes'].type
              };
              //check for hints
              var category = content["media-category"];
              if (category != null) {
                var atts = category["@attributes"];
                if (atts.schema === "http://mrss.akamai.com/user_agent_hint") {
                  var label = atts.label || category["#text"];
                  if (!!label) {
                    if (source.rules == null) {
                      source.rules = [];
                    }
                    source.rules.push(label);
                  }
                }
              }
              mediaVO.source.push(source);
              mediaVO.medium = content['@attributes'].medium;
              mediaVO.duration = parseFloat(content['@attributes'].duration);
            });
          } else {
            mediaVO.type = mediaContent['@attributes'].type;
            mediaVO.src = mediaContent['@attributes'].url;
            mediaVO.medium = mediaContent['@attributes'].medium;
            mediaVO.duration = parseFloat(mediaContent['@attributes'].duration);
          }

          // parse the media
          mediaVO.guid = item.guid;
          mediaVO.title = this.getMediaNode(item, "title");
          mediaVO.link = item.link;
          mediaVO.description = this.getMediaNode(item, "description");
          mediaVO.pubDate = new Date(Date.parse(item.pubDate));
          var ref, ref1;
          mediaVO.thumbnail = mediaVO.poster = (ref = this.getMediaNode(item, 'thumbnail')) != null ? (ref1 = ref['@attributes']) != null ? ref1.url : void 0 : void 0;
          mediaVO.embed = this.createEmbed(item);
          var scenes = this.getMediaNode(item, "scenes") || {};
          mediaVO.scenes = scenes['media-scene'];

          // // parse status
          var node = this.getMediaNode(item, "status", false);
          if (node != null) {
            mediaVO.status = {
              state: node['@attributes'].state,
              reason: node['@attributes'].reason
            };
          }

          // parse restriction
          node = this.getMediaNode(item, "restriction", false);
          if (node != null) {
            if (!(node instanceof Array)) {
              node = [node];
            }
            mediaVO.restriction = [];
            node.forEach(function (restriction) {
              mediaVO.restriction.push({
                relationship: restriction["@attributes"].relationship,
                type: restriction["@attributes"].type,
                value: restriction["#text"].split(" ")
              });
            });
          }

          // parse categories
          mediaVO.category = item.category;
          if (!(mediaVO.category instanceof Array)) {
            mediaVO.category = [mediaVO.category];
          }
          node = this.getMediaNode(item, "category", false);
          if (node != null) {
            if (!(node instanceof Array)) {
              node = [node];
            }
            node.forEach(function (category) {
              if (!!category["#text"]) {
                mediaVO.category.push(category["#text"]);
              }
            });
          }
          if (mediaVO.category != null) {
            mediaVO.category.sort(function (a, b) {
              a = a.toLowerCase();
              b = b.toLowerCase();
              if (a > b) {
                return 1;
              } else if (a < b) {
                return -1;
              } else {
                return 0;
              }
            });
          }

          // parse sub title
          node = this.getMediaNode(item, "subTitle");
          if (node != null) {
            if (mediaVO.track == null) {
              mediaVO.track = [];
            }
            if (!(node instanceof Array)) {
              node = [node];
            }
            node.forEach(function (track) {
              if (track["@attributes"] == null) return;
              mediaVO.track.push({
                src: track["@attributes"].href,
                type: track["@attributes"].type,
                kind: "captions",
                srclang: track["@attributes"].lang || "en"
              });
            });
          }

          // live
          var category = item.category;
          if (!(category instanceof Array)) {
            category = [category];
          }
          mediaVO.isLive = item.temporalType === "live" || category != null && category.join(",").indexOf("live_stream") !== -1;
          mediaVO.temporalType = mediaVO.isLive ? "live" : item.temporalType || "vod";

          // everything else goes in metadata
          for (var key in item) {
            if (key in mediaVO) continue;
            mediaVO.metadata[key] = item[key];
          }
          return mediaVO;
        } catch (error) {
          this.logger.error("[AMP Feed Parse Error] media parse error: ".concat(error.message), error);
        }
      }
    }]);
    return MRSSHelper;
  }();

  var MRSS = /*#__PURE__*/function (_akamai$amp$Plugin) {
    babelHelpers.inherits(MRSS, _akamai$amp$Plugin);
    function MRSS(player, config) {
      var _this;
      babelHelpers.classCallCheck(this, MRSS);
      _this = _akamai$amp$Plugin.call(this, player, config) || this;
      _this.feature = "feed";
      _this.helper = new MRSSHelper(_this.logger);
      _this.mediaTransform = _this.mediaTransform.bind(babelHelpers.assertThisInitialized(_this));
      return _this;
    }
    babelHelpers.createClass(MRSS, [{
      key: "data",
      get: function get() {
        return this._data;
      },
      set: function set(value) {
        this.player.media = this._setData(value);
      }
    }, {
      key: "url",
      get: function get() {
        return this._url;
      },
      set: function set(value) {
        var _this2 = this;
        this._setUrl(value).then(function (feed) {
          return _this2.data = feed;
        });
      }
    }, {
      key: "_setUrl",
      value: function _setUrl(value) {
        var _this3 = this;
        this._url = this.player.evaluatePaths(value);
        this.dispatch(MRSSEvents.REQUEST, this._url);
        return this.helper.getFeed(this._url).then(function (feed) {
          _this3.dispatch(MRSSEvents.LOADED, feed);
          return feed;
        })["catch"](function (error) {
          _this3.dispatch(MRSSEvents.ERROR, {
            error: error,
            url: value
          });
          _this3.logger.error("[AMP Feed Load Error]", _this3._url, error);
        });
      }
    }, {
      key: "_setData",
      value: function _setData(value) {
        this._data = value;
        this.feed = this.helper.createFeed(value);
        this.dispatch(MRSSEvents.CHANGED, this.feed);
        return this.feed.item[0];
      }
    }, {
      key: "mediaTransform",
      value: function mediaTransform(media) {
        var _this4 = this;
        var Utils = akamai.amp.Utils;
        var mimeTypes = Utils.mimeTypes;
        var type = media.type || Utils.getMimeType(media.src);
        if (type != mimeTypes.xml && type != mimeTypes.json && type != undefined) return media;
        return Promise.resolve(media.src).then(function (feed) {
          return typeof feed == "string" ? _this4._setUrl(feed) : feed;
        }).then(function (feed) {
          return _this4._setData(feed);
        });
      }
    }, {
      key: "onready",
      value: function onready() {
        var _this5 = this;
        var url = this.config.url;
        var data = this.config.data;
        var func = null;
        var transform = this.config.transform;

        // duplicate media items cause issues that are very hard to debug.
        if ((url || data) && this.player.config.media != null) {
          throw MRSSError.create("Duplicate media items in player config");
        }

        // if no config items were explicitly set, default to transform=true
        if (!url && !data && !transform) {
          transform = true;
        }
        if (transform) {
          this.player.addTransform(akamai.amp.TransformType.MEDIA, this.mediaTransform);
          return;
        }
        if (url != null && url != "") func = function func() {
          return _this5.url = url;
        };else if (data != null) func = function func() {
          return _this5.data = data;
        };
        if (typeof func == "function") this.player.timers.setTimeout(func, 1);
      }
    }]);
    return MRSS;
  }(akamai.amp.Plugin);

  akamai.amp.AMP.registerPlugin("mrss", akamai.amp.Plugin.createFactory(MRSS));

  exports.MRSS = MRSS;
  exports.MRSSEvents = MRSSEvents;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
