this.akamai = this.akamai || {};
this.akamai.amp = this.akamai.amp || {};
this.akamai.amp.playlist = (function (exports) {
    'use strict';

    var Events = {
      ADVANCE: "advance",
      TIME_UPDATE: "timeupdate",
      ABORT: "abort"
    };

    var AutoAdvance = /*#__PURE__*/function () {
      function AutoAdvance(player, config, plugin) {
        babelHelpers.classCallCheck(this, AutoAdvance);
        this.player = player;
        this.config = config;
        this.interval = config.interval || 15;
        this.currentTime = 0;
        this.timeout = null;
        this.item = null;
        plugin.addEventListener(Events.ABORT, this.notificationHandler.bind(this));
        plugin.addEventListener(Events.ADVANCE, this.notificationHandler.bind(this));
        plugin.addEventListener(Events.TIME_UPDATE, this.notificationHandler.bind(this));
      }
      babelHelpers.createClass(AutoAdvance, [{
        key: "start",
        value: function start() {
          var media = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          if (!this.item) {
            this.render(media);
          } else {
            this.item.setState({
              media: media
            });
          }
          this.currentTime = this.interval;
          this.timeout = this.player.timers.setInterval(this.updateTime.bind(this), 1000);
          this.dispatchEvent(Events.TIME_UPDATE, this.currentTime);
        }
      }, {
        key: "stop",
        value: function stop() {
          this.player.timers.clearInterval(this.timeout);
        }
      }, {
        key: "updateTime",
        value: function updateTime() {
          this.currentTime--;
          this.dispatchEvent(Events.TIME_UPDATE, this.currentTime);
          if (this.currentTime <= 0) {
            this.stop();
            this.dispatchEvent(Events.ADVANCE, {});
          }
        }
      }, {
        key: "notificationHandler",
        value: function notificationHandler(event) {
          if (this.player == null || this.player.react == null) return;
          switch (event.type) {
            case Events.ABORT:
            case Events.ADVANCE:
              this.stop();
              this.player.react.container.classList.remove('amp-autoadvance');
              this.player.react.container.forceUpdate();
              break;
            case Events.TIME_UPDATE:
              this.player.react.container.classList.add('amp-autoadvance');
              this.player.react.container.forceUpdate();
              break;
          }
        }
      }, {
        key: "render",
        value: function render(media) {
          var _this3 = this;
          var player = this.player;
          if (!player.react) return;
          var _this = this;
          var AutoAdvanceUI = /*#__PURE__*/function (_React$Component) {
            babelHelpers.inherits(AutoAdvanceUI, _React$Component);
            function AutoAdvanceUI(props, context) {
              var _this2;
              babelHelpers.classCallCheck(this, AutoAdvanceUI);
              _this2 = _React$Component.call(this, props, context) || this;
              _this2.state = {
                currentTime: _this.currentTime,
                media: media
              };
              return _this2;
            }
            babelHelpers.createClass(AutoAdvanceUI, [{
              key: "componentDidMount",
              value: function componentDidMount() {
                this.setState({
                  currentTime: _this.currentTime,
                  active: false
                });
              }
            }, {
              key: "render",
              value: function render() {
                return /*#__PURE__*/React.createElement("div", {
                  "class": "amp-autoadvance-card ".concat(this.state.active ? 'active' : 'none')
                }, /*#__PURE__*/React.createElement("div", {
                  "class": "amp-card-left"
                }, /*#__PURE__*/React.createElement("img", {
                  className: "amp-autoadvance-poster",
                  "alt-text": this.state.media.title || 'Media Thumbnail',
                  src: this.state.media.poster
                })), /*#__PURE__*/React.createElement("div", {
                  "class": "amp-card-right"
                }, /*#__PURE__*/React.createElement("p", {
                  className: "amp-autoadvance-title"
                }, this.state.media.title), /*#__PURE__*/React.createElement("button", {
                  type: "button",
                  className: "amp-button amp-next",
                  onClick: function onClick() {
                    return _this.dispatchEvent(Events.ADVANCE, {});
                  },
                  "aria-label": "Play Now",
                  tabIndex: "0"
                }, "Play Now (", this.state.currentTime, ")"), /*#__PURE__*/React.createElement("button", {
                  type: "button",
                  className: "amp-button amp-cancel",
                  onClick: function onClick() {
                    return _this.dispatchEvent(Events.ABORT, {});
                  },
                  "aria-label": "Cancel",
                  tabIndex: "0"
                }, "Cancel")));
              }
            }]);
            return AutoAdvanceUI;
          }(React.Component);
          var component = React.createElement("div", {
            className: "amp-autoadvance amp-overlay",
            id: "autoadvance-overlay",
            key: "autoadvance-overlay"
          });
          player.react.container.addComponent(component);
          this.component = component;
          this.item = ReactDOM.render( /*#__PURE__*/React.createElement(AutoAdvanceUI, null), document.getElementById('autoadvance-overlay'));
          player.playlist.addEventListener(Events.TIME_UPDATE, function () {
            _this3.item.setState({
              'active': true
            });
            _this3.item.setState({
              'currentTime': _this3.currentTime
            });
          });
          player.playlist.addEventListener(Events.ADVANCE, function () {
            _this3.item.setState({
              'active': false
            });
          });
          player.playlist.addEventListener(Events.ABORT, function () {
            _this3.item.setState({
              'active': false
            });
          });
        }
      }, {
        key: "dispatchEvent",
        value: function dispatchEvent(type) {
          var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          this.player.playlist.dispatchEvent({
            type: type,
            data: data
          });
        }
      }]);
      return AutoAdvance;
    }();

    var Suggestions = /*#__PURE__*/function () {
      function Suggestions(player, config, handler) {
        babelHelpers.classCallCheck(this, Suggestions);
        this.player = player;
        this.config = config;
        this.onSelect = handler;
      }
      babelHelpers.createClass(Suggestions, [{
        key: "render",
        value: function render(items, index) {
          if (this.item) {
            this.item.setState({
              items: items,
              index: index,
              active: true
            });
            return;
          }
          var player = this.player;
          if (!player.react) return;
          var _this = this;
          var Grid = /*#__PURE__*/function (_React$Component) {
            babelHelpers.inherits(Grid, _React$Component);
            function Grid(props, context) {
              var _this2;
              babelHelpers.classCallCheck(this, Grid);
              _this2 = _React$Component.call(this, props, context) || this;
              _this2.maxItems = 4;
              _this2.state = {
                items: items,
                active: true,
                index: index
              };
              return _this2;
            }
            babelHelpers.createClass(Grid, [{
              key: "componentDidMount",
              value: function componentDidMount() {
                this.setState({
                  items: items,
                  active: true,
                  index: index
                });
              }
            }, {
              key: "render",
              value: function render() {
                var _this3 = this;
                return /*#__PURE__*/React.createElement("div", {
                  "class": "amp-suggestions-cards ".concat(this.state.active ? 'active' : 'none')
                }, [].concat(babelHelpers.toConsumableArray(this.state.items.slice(this.state.index, this.state.index + this.maxItems)), babelHelpers.toConsumableArray(Array(this.maxItems).fill())).slice(0, this.maxItems).map(function (item, idx) {
                  return /*#__PURE__*/React.createElement("div", {
                    key: idx,
                    "aria-label": "Video ".concat(item.title || idx),
                    tabIndex: "0",
                    className: "amp-card card ".concat(item == null && 'empty'),
                    onClick: function onClick() {
                      if (item == null) return;
                      _this3.setState({
                        active: false
                      });
                      _this.onSelect(idx + _this3.state.index);
                    }
                  }, /*#__PURE__*/React.createElement("div", {
                    className: "amp-card-content"
                  }, /*#__PURE__*/React.createElement("p", null, item && item.title), item && /*#__PURE__*/React.createElement("img", {
                    src: item.poster
                  })));
                }));
              }
            }]);
            return Grid;
          }(React.Component);
          var component = React.createElement("div", {
            className: "amp-suggestions amp-overlay",
            id: "suggestions-overlay",
            key: "suggestions-overlay"
          });
          player.react.container.addComponent(component);
          this.item = ReactDOM.render( /*#__PURE__*/React.createElement(Grid, null), document.getElementById('suggestions-overlay'));
        }
      }]);
      return Suggestions;
    }();

    var Playlist = /*#__PURE__*/function (_akamai$amp$Plugin) {
      babelHelpers.inherits(Playlist, _akamai$amp$Plugin);
      function Playlist(player, config) {
        var _this;
        babelHelpers.classCallCheck(this, Playlist);
        _this = _akamai$amp$Plugin.call(this, player, config) || this;
        _this.player = player;
        _this.config = config;
        _this.queue = [];
        _this.index = 0;
        if (config.autoadvance && config.autoadvance.enabled !== false) {
          _this.autoAdvance = new AutoAdvance(player, config.autoadvance, babelHelpers.assertThisInitialized(_this));
          _this.suggestions = new Suggestions(player, config.autoadvance, _this.selectHandler.bind(babelHelpers.assertThisInitialized(_this)));
        }
        return _this;
      }
      babelHelpers.createClass(Playlist, [{
        key: "onready",
        value: function onready() {
          var _this2 = this;
          var player = this.player;
          var playlist = player.config.media;
          if (Array.isArray(playlist)) {
            playlist.filter(function (item) {
              if (item.hasOwnProperty('src') || item.hasOwnProperty('source')) _this2.queue.push(item);
            });
          }
          player.addTransform(akamai.amp.TransformType.MEDIA, {
            transform: function transform(media) {
              _this2.queue.forEach(function (element, index) {
                if (index !== _this2.index) return;
                if (element.hasOwnProperty('source')) {
                  var source = akamai.amp.Utils.selectSource(element, function (media) {
                    return Playlist.SUPPORTED_TYPES.includes(media.type) ? "maybe" : "";
                  });
                  if (source == null) return;
                  media = Object.assign({}, media, source);
                } else {
                  media.src = element.src;
                }
              });
              return media;
            },
            priority: 101
          });
          if (this.autoAdvance) {
            player.playlist.addEventListener(Events.ABORT, this.abortHandler);
            player.playlist.addEventListener(Events.ADVANCE, this.advanceHandler);
          }
        }
      }, {
        key: "abortHandler",
        value: function abortHandler() {
          this.suggestions.render(this.queue, this.index);
        }
      }, {
        key: "advanceHandler",
        value: function advanceHandler() {
          this.player.media = this.queue[this.index];
        }
      }, {
        key: "selectHandler",
        value: function selectHandler(index) {
          if (index == null) return;
          this.index = index;
          this.player.media = this.queue[this.index];
        }
      }, {
        key: "onmediasequenceended",
        value: function onmediasequenceended() {
          this.index++;
          if (this.queue[this.index]) {
            this.player.react.container.classList.add('amp-playlist');
            if (this.autoAdvance) {
              this.autoAdvance.start(this.queue[this.index]);
            } else {
              this.advanceHandler();
            }
          }
        }
      }, {
        key: "addToQueue",
        value: function addToQueue(media) {
          if (babelHelpers["typeof"](media) !== 'object' || !(media.hasOwnProperty('src') || media.hasOwnProperty('source'))) {
            this.logger.log("[AMP Playlist Error] ", "Cannot add element to queue, mising src");
            return;
          }
          this.queue.push(media);
        }
      }], [{
        key: "SUPPORTED_TYPES",
        get: function get() {
          return [akamai.amp.Utils.mimeTypes.m3u8, akamai.amp.Utils.mimeTypes.mp4, akamai.amp.Utils.mimeTypes.mpd, akamai.amp.Utils.mimeTypes.webm, akamai.amp.Utils.mimeTypes.mp3];
        }
      }]);
      return Playlist;
    }(akamai.amp.Plugin);

    akamai.amp.AMP.registerPlugin("playlist", akamai.amp.Plugin.createFactory(Playlist));

    exports.Events = Events;
    exports.Playlist = Playlist;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
