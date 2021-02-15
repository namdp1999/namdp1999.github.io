! function() {
  "use strict";
  var s = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
    t = "undefined" != typeof module && module.exports,
    n = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
    i = function() {
      for (var t, e = [
          ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
          ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
          ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
          ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
          ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
        ], n = 0, i = e.length, o = {}; n < i; n++)
        if ((t = e[n]) && t[1] in s) {
          for (n = 0; n < t.length; n++) o[e[0][n]] = t[n];
          return o
        } return !1
    }(),
    o = {
      change: i.fullscreenchange,
      error: i.fullscreenerror
    },
    e = {
      request: function(t) {
        var e = i.requestFullscreen;
        t = t || s.documentElement, / Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent) ? t[e]() : t[e](n ? Element.ALLOW_KEYBOARD_INPUT : {})
      },
      exit: function() {
        s[i.exitFullscreen]()
      },
      toggle: function(t) {
        this.isFullscreen ? this.exit() : this.request(t)
      },
      onchange: function(t) {
        this.on("change", t)
      },
      onerror: function(t) {
        this.on("error", t)
      },
      on: function(t, e) {
        var n = o[t];
        n && s.addEventListener(n, e, !1)
      },
      off: function(t, e) {
        var n = o[t];
        n && s.removeEventListener(n, e, !1)
      },
      raw: i
    };
  i ? (Object.defineProperties(e, {
    isFullscreen: {
      get: function() {
        return Boolean(s[i.fullscreenElement])
      }
    },
    element: {
      enumerable: !0,
      get: function() {
        return s[i.fullscreenElement]
      }
    },
    enabled: {
      enumerable: !0,
      get: function() {
        return Boolean(s[i.fullscreenEnabled])
      }
    }
  }), t ? module.exports = e : window.screenfull = e) : t ? module.exports = !1 : window.screenfull = !1
}(),
function(y) {
  "use strict";
  y.attrFn = y.attrFn || {};
  var t = "ontouchstart" in window,
    w = {
      tap_pixel_range: 5,
      swipe_h_threshold: 50,
      swipe_v_threshold: 50,
      taphold_threshold: 750,
      doubletap_int: 500,
      touch_capable: t,
      orientation_support: "orientation" in window && "onorientationchange" in window,
      startevent: t ? "touchstart" : "mousedown",
      endevent: t ? "touchend" : "mouseup",
      moveevent: t ? "touchmove" : "mousemove",
      tapevent: t ? "tap" : "click",
      scrollevent: t ? "touchmove" : "scroll",
      hold_timer: null,
      tap_timer: null
    };
  y.isTouchCapable = function() {
    return w.touch_capable
  }, y.getStartEvent = function() {
    return w.startevent
  }, y.getEndEvent = function() {
    return w.endevent
  }, y.getMoveEvent = function() {
    return w.moveevent
  }, y.getTapEvent = function() {
    return w.tapevent
  }, y.getScrollEvent = function() {
    return w.scrollevent
  }, y.each(["tapstart", "tapend", "tapmove", "tap", "tap2", "tap3", "tap4", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(t, e) {
    y.fn[e] = function(t) {
      return t ? this.on(e, t) : this.trigger(e)
    }, y.attrFn[e] = !0
  }), y.event.special.tapstart = {
    setup: function() {
      var o = this,
        s = y(o);
      s.on(w.startevent, function t(e) {
        if (s.data("callee", t), e.which && 1 !== e.which) return !1;
        var n = e.originalEvent,
          i = {
            position: {
              x: w.touch_capable ? n.touches[0].screenX : e.screenX,
              y: w.touch_capable ? n.touches[0].screenY : e.screenY
            },
            offset: {
              x: w.touch_capable ? Math.round(n.changedTouches[0].pageX - (s.offset() ? s.offset().left : 0)) : Math.round(e.pageX - (s.offset() ? s.offset().left : 0)),
              y: w.touch_capable ? Math.round(n.changedTouches[0].pageY - (s.offset() ? s.offset().top : 0)) : Math.round(e.pageY - (s.offset() ? s.offset().top : 0))
            },
            time: Date.now(),
            target: e.target
          };
        return x(o, "tapstart", e, i), !0
      })
    },
    remove: function() {
      y(this).off(w.startevent, y(this).data.callee)
    }
  }, y.event.special.tapmove = {
    setup: function() {
      var o = this,
        s = y(o);
      s.on(w.moveevent, function t(e) {
        s.data("callee", t);
        var n = e.originalEvent,
          i = {
            position: {
              x: w.touch_capable ? n.touches[0].screenX : e.screenX,
              y: w.touch_capable ? n.touches[0].screenY : e.screenY
            },
            offset: {
              x: w.touch_capable ? Math.round(n.changedTouches[0].pageX - (s.offset() ? s.offset().left : 0)) : Math.round(e.pageX - (s.offset() ? s.offset().left : 0)),
              y: w.touch_capable ? Math.round(n.changedTouches[0].pageY - (s.offset() ? s.offset().top : 0)) : Math.round(e.pageY - (s.offset() ? s.offset().top : 0))
            },
            time: Date.now(),
            target: e.target
          };
        return x(o, "tapmove", e, i), !0
      })
    },
    remove: function() {
      y(this).off(w.moveevent, y(this).data.callee)
    }
  }, y.event.special.tapend = {
    setup: function() {
      var o = this,
        s = y(o);
      s.on(w.endevent, function t(e) {
        s.data("callee", t);
        var n = e.originalEvent,
          i = {
            position: {
              x: w.touch_capable ? n.changedTouches[0].screenX : e.screenX,
              y: w.touch_capable ? n.changedTouches[0].screenY : e.screenY
            },
            offset: {
              x: w.touch_capable ? Math.round(n.changedTouches[0].pageX - (s.offset() ? s.offset().left : 0)) : Math.round(e.pageX - (s.offset() ? s.offset().left : 0)),
              y: w.touch_capable ? Math.round(n.changedTouches[0].pageY - (s.offset() ? s.offset().top : 0)) : Math.round(e.pageY - (s.offset() ? s.offset().top : 0))
            },
            time: Date.now(),
            target: e.target
          };
        return x(o, "tapend", e, i), !0
      })
    },
    remove: function() {
      y(this).off(w.endevent, y(this).data.callee)
    }
  }, y.event.special.taphold = {
    setup: function() {
      var f, d = this,
        p = y(d),
        g = {
          x: 0,
          y: 0
        },
        v = 0,
        m = 0;
      p.on(w.startevent, function a(r) {
        if (r.which && 1 !== r.which) return !1;
        p.data("tapheld", !1), f = r.target;
        var h = r.originalEvent,
          l = Date.now(),
          c = {
            x: w.touch_capable ? h.touches[0].screenX : r.screenX,
            y: w.touch_capable ? h.touches[0].screenY : r.screenY
          },
          u = {
            x: w.touch_capable ? h.touches[0].pageX - h.touches[0].target.offsetLeft : r.offsetX,
            y: w.touch_capable ? h.touches[0].pageY - h.touches[0].target.offsetTop : r.offsetY
          };
        g.x = r.originalEvent.targetTouches ? r.originalEvent.targetTouches[0].pageX : r.pageX, g.y = r.originalEvent.targetTouches ? r.originalEvent.targetTouches[0].pageY : r.pageY, v = g.x, m = g.y;
        var t = p.parent().data("threshold") ? p.parent().data("threshold") : p.data("threshold"),
          e = void 0 !== t && !1 !== t && parseInt(t) ? parseInt(t) : w.taphold_threshold;
        return w.hold_timer = window.setTimeout(function() {
          var t = g.x - v,
            e = g.y - m;
          if (r.target == f && (g.x == v && g.y == m || t >= -w.tap_pixel_range && t <= w.tap_pixel_range && e >= -w.tap_pixel_range && e <= w.tap_pixel_range)) {
            p.data("tapheld", !0);
            var n = Date.now(),
              i = {
                x: w.touch_capable ? h.touches[0].screenX : r.screenX,
                y: w.touch_capable ? h.touches[0].screenY : r.screenY
              },
              o = {
                x: w.touch_capable ? Math.round(h.changedTouches[0].pageX - (p.offset() ? p.offset().left : 0)) : Math.round(r.pageX - (p.offset() ? p.offset().left : 0)),
                y: w.touch_capable ? Math.round(h.changedTouches[0].pageY - (p.offset() ? p.offset().top : 0)) : Math.round(r.pageY - (p.offset() ? p.offset().top : 0))
              },
              s = {
                startTime: l,
                endTime: n,
                startPosition: c,
                startOffset: u,
                endPosition: i,
                endOffset: o,
                duration: n - l,
                target: r.target
              };
            p.data("callee1", a), x(d, "taphold", r, s)
          }
        }, e), !0
      }).on(w.endevent, function t() {
        p.data("callee2", t), p.data("tapheld", !1), window.clearTimeout(w.hold_timer)
      }).on(w.moveevent, function t(e) {
        p.data("callee3", t), v = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, m = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY
      })
    },
    remove: function() {
      y(this).off(w.startevent, y(this).data.callee1).off(w.endevent, y(this).data.callee2).off(w.moveevent, y(this).data.callee3)
    }
  }, y.event.special.doubletap = {
    setup: function() {
      var a, r, h = this,
        l = y(h),
        c = null,
        u = !1;
      l.on(w.startevent, function t(e) {
        return (!e.which || 1 === e.which) && (l.data("doubletapped", !1), e.target, l.data("callee1", t), r = e.originalEvent, c || (c = {
          position: {
            x: w.touch_capable ? r.touches[0].screenX : e.screenX,
            y: w.touch_capable ? r.touches[0].screenY : e.screenY
          },
          offset: {
            x: w.touch_capable ? Math.round(r.changedTouches[0].pageX - (l.offset() ? l.offset().left : 0)) : Math.round(e.pageX - (l.offset() ? l.offset().left : 0)),
            y: w.touch_capable ? Math.round(r.changedTouches[0].pageY - (l.offset() ? l.offset().top : 0)) : Math.round(e.pageY - (l.offset() ? l.offset().top : 0))
          },
          time: Date.now(),
          target: e.target,
          element: e.originalEvent.srcElement,
          index: y(e.target).index()
        }), !0)
      }).on(w.endevent, function t(e) {
        var n = Date.now(),
          i = n - (l.data("lastTouch") || n + 1);
        if (window.clearTimeout(a), l.data("callee2", t), i < w.doubletap_int && y(e.target).index() == c.index && 100 < i) {
          l.data("doubletapped", !0), window.clearTimeout(w.tap_timer);
          var o = {
              position: {
                x: w.touch_capable ? e.originalEvent.changedTouches[0].screenX : e.screenX,
                y: w.touch_capable ? e.originalEvent.changedTouches[0].screenY : e.screenY
              },
              offset: {
                x: w.touch_capable ? Math.round(r.changedTouches[0].pageX - (l.offset() ? l.offset().left : 0)) : Math.round(e.pageX - (l.offset() ? l.offset().left : 0)),
                y: w.touch_capable ? Math.round(r.changedTouches[0].pageY - (l.offset() ? l.offset().top : 0)) : Math.round(e.pageY - (l.offset() ? l.offset().top : 0))
              },
              time: Date.now(),
              target: e.target,
              element: e.originalEvent.srcElement,
              index: y(e.target).index()
            },
            s = {
              firstTap: c,
              secondTap: o,
              interval: o.time - c.time
            };
          u || (x(h, "doubletap", e, s), c = null), u = !0, window.setTimeout(function() {
            u = !1
          }, w.doubletap_int)
        } else l.data("lastTouch", n), a = window.setTimeout(function() {
          c = null, window.clearTimeout(a)
        }, w.doubletap_int, [e]);
        l.data("lastTouch", n)
      })
    },
    remove: function() {
      y(this).off(w.startevent, y(this).data.callee1).off(w.endevent, y(this).data.callee2)
    }
  }, y.event.special.singletap = {
    setup: function() {
      var r = this,
        h = y(r),
        n = null,
        l = null,
        c = {
          x: 0,
          y: 0
        };
      h.on(w.startevent, function t(e) {
        return (!e.which || 1 === e.which) && (l = Date.now(), n = e.target, h.data("callee1", t), c.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, c.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, !0)
      }).on(w.endevent, function t(o) {
        if (h.data("callee2", t), o.target == n) {
          var s = o.originalEvent.changedTouches ? o.originalEvent.changedTouches[0].pageX : o.pageX,
            a = o.originalEvent.changedTouches ? o.originalEvent.changedTouches[0].pageY : o.pageY;
          w.tap_timer = window.setTimeout(function() {
            var t = c.x - s,
              e = c.y - a;
            if (!h.data("doubletapped") && !h.data("tapheld") && (c.x == s && c.y == a || t >= -w.tap_pixel_range && t <= w.tap_pixel_range && e >= -w.tap_pixel_range && e <= w.tap_pixel_range)) {
              var n = o.originalEvent,
                i = {
                  position: {
                    x: w.touch_capable ? n.changedTouches[0].screenX : o.screenX,
                    y: w.touch_capable ? n.changedTouches[0].screenY : o.screenY
                  },
                  offset: {
                    x: w.touch_capable ? Math.round(n.changedTouches[0].pageX - (h.offset() ? h.offset().left : 0)) : Math.round(o.pageX - (h.offset() ? h.offset().left : 0)),
                    y: w.touch_capable ? Math.round(n.changedTouches[0].pageY - (h.offset() ? h.offset().top : 0)) : Math.round(o.pageY - (h.offset() ? h.offset().top : 0))
                  },
                  time: Date.now(),
                  target: o.target
                };
              i.time - l < w.taphold_threshold && x(r, "singletap", o, i)
            }
          }, w.doubletap_int)
        }
      })
    },
    remove: function() {
      y(this).off(w.startevent, y(this).data.callee1).off(w.endevent, y(this).data.callee2)
    }
  }, y.event.special.tap = {
    setup: function() {
      var c, u, f = this,
        d = y(f),
        p = !1,
        g = null,
        v = {
          x: 0,
          y: 0
        };
      d.on(w.startevent, function t(e) {
        return d.data("callee1", t), (!e.which || 1 === e.which) && (p = !0, v.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, v.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, c = Date.now(), g = e.target, u = e.originalEvent.targetTouches ? e.originalEvent.targetTouches : [e], !0)
      }).on(w.endevent, function t(e) {
        d.data("callee2", t);
        var n = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX,
          i = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY,
          o = v.x - n,
          s = v.y - i;
        if (g == e.target && p && Date.now() - c < w.taphold_threshold && (v.x == n && v.y == i || o >= -w.tap_pixel_range && o <= w.tap_pixel_range && s >= -w.tap_pixel_range && s <= w.tap_pixel_range)) {
          for (var a = e.originalEvent, r = [], h = 0; h < u.length; h++) {
            var l = {
              position: {
                x: w.touch_capable ? a.changedTouches[h].screenX : e.screenX,
                y: w.touch_capable ? a.changedTouches[h].screenY : e.screenY
              },
              offset: {
                x: w.touch_capable ? Math.round(a.changedTouches[h].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
                y: w.touch_capable ? Math.round(a.changedTouches[h].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: e.target
            };
            r.push(l)
          }
          x(f, "tap", e, r)
        }
      })
    },
    remove: function() {
      y(this).off(w.startevent, y(this).data.callee1).off(w.endevent, y(this).data.callee2)
    }
  }, y.event.special.swipe = {
    setup: function() {
      var f, d = y(this),
        p = !1,
        g = !1,
        v = {
          x: 0,
          y: 0
        },
        m = {
          x: 0,
          y: 0
        };
      d.on(w.startevent, function t(e) {
        (d = y(e.currentTarget)).data("callee1", t), v.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, v.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, m.x = v.x, m.y = v.y, p = !0;
        var n = e.originalEvent;
        f = {
          position: {
            x: w.touch_capable ? n.touches[0].screenX : e.screenX,
            y: w.touch_capable ? n.touches[0].screenY : e.screenY
          },
          offset: {
            x: w.touch_capable ? Math.round(n.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
            y: w.touch_capable ? Math.round(n.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
          },
          time: Date.now(),
          target: e.target
        }
      }), d.on(w.moveevent, function t(e) {
        var n;
        (d = y(e.currentTarget)).data("callee2", t), m.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, m.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY;
        var i = d.parent().data("xthreshold") ? d.parent().data("xthreshold") : d.data("xthreshold"),
          o = d.parent().data("ythreshold") ? d.parent().data("ythreshold") : d.data("ythreshold"),
          s = void 0 !== i && !1 !== i && parseInt(i) ? parseInt(i) : w.swipe_h_threshold,
          a = void 0 !== o && !1 !== o && parseInt(o) ? parseInt(o) : w.swipe_v_threshold;
        if (v.y > m.y && v.y - m.y > a && (n = "swipeup"), v.x < m.x && m.x - v.x > s && (n = "swiperight"), v.y < m.y && m.y - v.y > a && (n = "swipedown"), v.x > m.x && v.x - m.x > s && (n = "swipeleft"), null != n && p) {
          v.x = 0, v.y = 0, m.x = 0, m.y = 0, p = !1;
          var r = e.originalEvent,
            h = {
              position: {
                x: w.touch_capable ? r.touches[0].screenX : e.screenX,
                y: w.touch_capable ? r.touches[0].screenY : e.screenY
              },
              offset: {
                x: w.touch_capable ? Math.round(r.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
                y: w.touch_capable ? Math.round(r.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: e.target
            },
            l = Math.abs(f.position.x - h.position.x),
            c = Math.abs(f.position.y - h.position.y),
            u = {
              startEvnt: f,
              endEvnt: h,
              direction: n.replace("swipe", ""),
              xAmount: l,
              yAmount: c,
              duration: h.time - f.time
            };
          g = !0, d.trigger("swipe", u).trigger(n, u)
        }
      }), d.on(w.endevent, function t(e) {
        var n = "";
        if ((d = y(e.currentTarget)).data("callee3", t), g) {
          var i = d.data("xthreshold"),
            o = d.data("ythreshold"),
            s = void 0 !== i && !1 !== i && parseInt(i) ? parseInt(i) : w.swipe_h_threshold,
            a = void 0 !== o && !1 !== o && parseInt(o) ? parseInt(o) : w.swipe_v_threshold,
            r = e.originalEvent,
            h = {
              position: {
                x: w.touch_capable ? r.changedTouches[0].screenX : e.screenX,
                y: w.touch_capable ? r.changedTouches[0].screenY : e.screenY
              },
              offset: {
                x: w.touch_capable ? Math.round(r.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
                y: w.touch_capable ? Math.round(r.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: e.target
            };
          f.position.y > h.position.y && f.position.y - h.position.y > a && (n = "swipeup"), f.position.x < h.position.x && h.position.x - f.position.x > s && (n = "swiperight"), f.position.y < h.position.y && h.position.y - f.position.y > a && (n = "swipedown"), f.position.x > h.position.x && f.position.x - h.position.x > s && (n = "swipeleft");
          var l = Math.abs(f.position.x - h.position.x),
            c = Math.abs(f.position.y - h.position.y),
            u = {
              startEvnt: f,
              endEvnt: h,
              direction: n.replace("swipe", ""),
              xAmount: l,
              yAmount: c,
              duration: h.time - f.time
            };
          d.trigger("swipeend", u)
        }
        g = p = !1
      })
    },
    remove: function() {
      y(this).off(w.startevent, y(this).data.callee1).off(w.moveevent, y(this).data.callee2).off(w.endevent, y(this).data.callee3)
    }
  }, y.event.special.scrollstart = {
    setup: function() {
      var n, i, o = this,
        s = y(o);

      function a(t, e) {
        x(o, (n = e) ? "scrollstart" : "scrollend", t)
      }
      s.on(w.scrollevent, function t(e) {
        s.data("callee", t), n || a(e, !0), clearTimeout(i), i = setTimeout(function() {
          a(e, !1)
        }, 50)
      })
    },
    remove: function() {
      y(this).off(w.scrollevent, y(this).data.callee)
    }
  };
  var n, e, i, o, s = y(window),
    a = {
      0: !0,
      180: !0
    };
  if (w.orientation_support) {
    var r = window.innerWidth || s.width(),
      h = window.innerHeight || s.height();
    i = h < r && 50 < r - h, o = a[window.orientation], (i && o || !i && !o) && (a = {
      "-90": !0,
      90: !0
    })
  }

  function l() {
    var t = n();
    t !== e && (e = t, s.trigger("orientationchange"))
  }
  y.event.special.orientationchange = {
    setup: function() {
      return !w.orientation_support && (e = n(), s.on("throttledresize", l), !0)
    },
    teardown: function() {
      return !w.orientation_support && (s.off("throttledresize", l), !0)
    },
    add: function(t) {
      var e = t.handler;
      t.handler = function(t) {
        return t.orientation = n(), e.apply(this, arguments)
      }
    }
  }, y.event.special.orientationchange.orientation = n = function() {
    var t = document.documentElement;
    return (w.orientation_support ? a[window.orientation] : t && t.clientWidth / t.clientHeight < 1.1) ? "portrait" : "landscape"
  }, y.event.special.throttledresize = {
    setup: function() {
      y(this).on("resize", d)
    },
    teardown: function() {
      y(this).off("resize", d)
    }
  };
  var c, u, f, d = function() {
      u = Date.now(), 250 <= (f = u - p) ? (p = u, y(this).trigger("throttledresize")) : (c && window.clearTimeout(c), c = window.setTimeout(l, 250 - f))
    },
    p = 0;

  function x(t, e, n, i) {
    var o = n.type;
    n.type = e, y.event.dispatch.call(t, n, i), n.type = o
  }
  y.each({
    scrollend: "scrollstart",
    swipeup: "swipe",
    swiperight: "swipe",
    swipedown: "swipe",
    swipeleft: "swipe",
    swipeend: "swipe",
    tap2: "tap"
  }, function(t, e) {
    y.event.special[t] = {
      setup: function() {
        y(this).on(e, y.noop)
      }
    }
  })
}(jQuery),
function(a) {
  function e(t, e, n, i) {
    var o = t.text().split(e),
      s = "";
    o.length && (a(o).each(function(t, e) {
      s += '<span class="' + n + (t + 1) + '">' + e + "</span>" + i
    }), t.empty().append(s))
  }
  var n = {
    init: function() {
      return this.each(function() {
        e(a(this), "", "char", "")
      })
    },
    words: function() {
      return this.each(function() {
        e(a(this), " ", "word", " ")
      })
    },
    lines: function() {
      return this.each(function() {
        var t = "eefec303079ad17405c889e092e105b0";
        e(a(this).children("br").replaceWith(t).end(), t, "line", "")
      })
    }
  };
  a.fn.lettering = function(t) {
    return t && n[t] ? n[t].apply(this, [].slice.call(arguments, 1)) : "letters" !== t && t ? (a.error("Method " + t + " does not exist on jQuery.lettering"), this) : n.init.apply(this, [].slice.call(arguments, 0))
  }
}(jQuery),
function(s) {
  s.easing.jswing = s.easing.swing, s.extend(s.easing, {
    def: "easeOutQuad",
    swing: function(t, e, n, i, o) {
      return s.easing[s.easing.def](t, e, n, i, o)
    },
    easeInQuad: function(t, e, n, i, o) {
      return i * (e /= o) * e + n
    },
    easeOutQuad: function(t, e, n, i, o) {
      return -i * (e /= o) * (e - 2) + n
    },
    easeInOutQuad: function(t, e, n, i, o) {
      return (e /= o / 2) < 1 ? i / 2 * e * e + n : -i / 2 * (--e * (e - 2) - 1) + n
    },
    easeInCubic: function(t, e, n, i, o) {
      return i * (e /= o) * e * e + n
    },
    easeOutCubic: function(t, e, n, i, o) {
      return i * ((e = e / o - 1) * e * e + 1) + n
    },
    easeInOutCubic: function(t, e, n, i, o) {
      return (e /= o / 2) < 1 ? i / 2 * e * e * e + n : i / 2 * ((e -= 2) * e * e + 2) + n
    },
    easeInQuart: function(t, e, n, i, o) {
      return i * (e /= o) * e * e * e + n
    },
    easeOutQuart: function(t, e, n, i, o) {
      return -i * ((e = e / o - 1) * e * e * e - 1) + n
    },
    easeInOutQuart: function(t, e, n, i, o) {
      return (e /= o / 2) < 1 ? i / 2 * e * e * e * e + n : -i / 2 * ((e -= 2) * e * e * e - 2) + n
    },
    easeInQuint: function(t, e, n, i, o) {
      return i * (e /= o) * e * e * e * e + n
    },
    easeOutQuint: function(t, e, n, i, o) {
      return i * ((e = e / o - 1) * e * e * e * e + 1) + n
    },
    easeInOutQuint: function(t, e, n, i, o) {
      return (e /= o / 2) < 1 ? i / 2 * e * e * e * e * e + n : i / 2 * ((e -= 2) * e * e * e * e + 2) + n
    },
    easeInSine: function(t, e, n, i, o) {
      return -i * Math.cos(e / o * (Math.PI / 2)) + i + n
    },
    easeOutSine: function(t, e, n, i, o) {
      return i * Math.sin(e / o * (Math.PI / 2)) + n
    },
    easeInOutSine: function(t, e, n, i, o) {
      return -i / 2 * (Math.cos(Math.PI * e / o) - 1) + n
    },
    easeInExpo: function(t, e, n, i, o) {
      return 0 == e ? n : i * Math.pow(2, 10 * (e / o - 1)) + n
    },
    easeOutExpo: function(t, e, n, i, o) {
      return e == o ? n + i : i * (1 - Math.pow(2, -10 * e / o)) + n
    },
    easeInOutExpo: function(t, e, n, i, o) {
      return 0 == e ? n : e == o ? n + i : (e /= o / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n : i / 2 * (2 - Math.pow(2, -10 * --e)) + n
    },
    easeInCirc: function(t, e, n, i, o) {
      return -i * (Math.sqrt(1 - (e /= o) * e) - 1) + n
    },
    easeOutCirc: function(t, e, n, i, o) {
      return i * Math.sqrt(1 - (e = e / o - 1) * e) + n
    },
    easeInOutCirc: function(t, e, n, i, o) {
      return (e /= o / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + n : i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + n
    },
    easeInElastic: function(t, e, n, i, o) {
      var s = 1.70158,
        a = 0,
        r = i;
      if (0 == e) return n;
      if (1 == (e /= o)) return n + i;
      if (a || (a = .3 * o), r < Math.abs(i)) {
        r = i;
        s = a / 4
      } else s = a / (2 * Math.PI) * Math.asin(i / r);
      return -r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / a) + n
    },
    easeOutElastic: function(t, e, n, i, o) {
      var s = 1.70158,
        a = 0,
        r = i;
      if (0 == e) return n;
      if (1 == (e /= o)) return n + i;
      if (a || (a = .3 * o), r < Math.abs(i)) {
        r = i;
        s = a / 4
      } else s = a / (2 * Math.PI) * Math.asin(i / r);
      return r * Math.pow(2, -10 * e) * Math.sin((e * o - s) * (2 * Math.PI) / a) + i + n
    },
    easeInOutElastic: function(t, e, n, i, o) {
      var s = 1.70158,
        a = 0,
        r = i;
      if (0 == e) return n;
      if (2 == (e /= o / 2)) return n + i;
      if (a || (a = o * (.3 * 1.5)), r < Math.abs(i)) {
        r = i;
        s = a / 4
      } else s = a / (2 * Math.PI) * Math.asin(i / r);
      return e < 1 ? r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / a) * -.5 + n : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / a) * .5 + i + n
    },
    easeInBack: function(t, e, n, i, o, s) {
      return null == s && (s = 1.70158), i * (e /= o) * e * ((s + 1) * e - s) + n
    },
    easeOutBack: function(t, e, n, i, o, s) {
      return null == s && (s = 1.70158), i * ((e = e / o - 1) * e * ((s + 1) * e + s) + 1) + n
    },
    easeInOutBack: function(t, e, n, i, o, s) {
      return null == s && (s = 1.70158), (e /= o / 2) < 1 ? i / 2 * (e * e * ((1 + (s *= 1.525)) * e - s)) + n : i / 2 * ((e -= 2) * e * ((1 + (s *= 1.525)) * e + s) + 2) + n
    },
    easeInBounce: function(t, e, n, i, o) {
      return i - s.easing.easeOutBounce(t, o - e, 0, i, o) + n
    },
    easeOutBounce: function(t, e, n, i, o) {
      return (e /= o) < 1 / 2.75 ? i * (7.5625 * e * e) + n : e < 2 / 2.75 ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n : e < 2.5 / 2.75 ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n
    },
    easeInOutBounce: function(t, e, n, i, o) {
      return e < o / 2 ? .5 * s.easing.easeInBounce(t, 2 * e, 0, i, o) + n : .5 * s.easing.easeOutBounce(t, 2 * e - o, 0, i, o) + .5 * i + n
    }
  })
}(jQuery),
function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function(l) {
  var c, u, t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    e = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    f = Array.prototype.slice;
  if (l.event.fixHooks)
    for (var n = t.length; n;) l.event.fixHooks[t[--n]] = l.event.mouseHooks;
  var i = l.event.special.mousewheel = {
    version: "3.1.9",
    setup: function() {
      if (this.addEventListener)
        for (var t = e.length; t;) this.addEventListener(e[--t], o, !1);
      else this.onmousewheel = o;
      l.data(this, "mousewheel-line-height", i.getLineHeight(this)), l.data(this, "mousewheel-page-height", i.getPageHeight(this))
    },
    teardown: function() {
      if (this.removeEventListener)
        for (var t = e.length; t;) this.removeEventListener(e[--t], o, !1);
      else this.onmousewheel = null
    },
    getLineHeight: function(t) {
      return parseInt(l(t)["offsetParent" in l.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
    },
    getPageHeight: function(t) {
      return l(t).height()
    },
    settings: {
      adjustOldDeltas: !0
    }
  };

  function o(t) {
    var e, n = t || window.event,
      i = f.call(arguments, 1),
      o = 0,
      s = 0,
      a = 0;
    if ((t = l.event.fix(n)).type = "mousewheel", "detail" in n && (a = -1 * n.detail), "wheelDelta" in n && (a = n.wheelDelta), "wheelDeltaY" in n && (a = n.wheelDeltaY), "wheelDeltaX" in n && (s = -1 * n.wheelDeltaX), "axis" in n && n.axis === n.HORIZONTAL_AXIS && (s = -1 * a, a = 0), o = 0 === a ? s : a, "deltaY" in n && (o = a = -1 * n.deltaY), "deltaX" in n && (s = n.deltaX, 0 === a && (o = -1 * s)), 0 !== a || 0 !== s) {
      if (1 === n.deltaMode) {
        var r = l.data(this, "mousewheel-line-height");
        o *= r, a *= r, s *= r
      } else if (2 === n.deltaMode) {
        var h = l.data(this, "mousewheel-page-height");
        o *= h, a *= h, s *= h
      }
      return e = Math.max(Math.abs(a), Math.abs(s)), (!u || e < u) && p(n, u = e) && (u /= 40), p(n, e) && (o /= 40, s /= 40, a /= 40), o = Math[1 <= o ? "floor" : "ceil"](o / u), s = Math[1 <= s ? "floor" : "ceil"](s / u), a = Math[1 <= a ? "floor" : "ceil"](a / u), t.deltaX = s, t.deltaY = a, t.deltaFactor = u, t.deltaMode = 0, i.unshift(t, o, s, a), c && clearTimeout(c), c = setTimeout(d, 200), (l.event.dispatch || l.event.handle).apply(this, i)
    }
  }

  function d() {
    u = null
  }

  function p(t, e) {
    return i.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
  }
  l.fn.extend({
    mousewheel: function(t) {
      return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
    },
    unmousewheel: function(t) {
      return this.unbind("mousewheel", t)
    }
  })
}),
function(h) {
  "use strict";
  var t = "draptouch-active";
  window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
    window.setTimeout(t, 1e3 / 60)
  }), h.support = h.support || {}, h.extend(h.support, {
    touch: "ontouchend" in document
  });
  var n = function() {
      return !1
    },
    s = function(t, e) {
      return this.settings = e, this.el = t, this.$el = h(t), this._initElements(), this
    };
  s.DATA_KEY = "draptouch", s.DEFAULTS = {
    cursor: "",
    decelerate: !0,
    triggerHardware: !1,
    threshold: 0,
    y: !0,
    x: !0,
    slowdown: .9,
    maxvelocity: 40,
    throttleFPS: 60,
    movingClass: {
      up: "draptouch-moving-up",
      down: "draptouch-moving-down",
      left: "draptouch-moving-left",
      right: "draptouch-moving-right"
    },
    deceleratingClass: {
      up: "draptouch-decelerating-up",
      down: "draptouch-decelerating-down",
      left: "draptouch-decelerating-left",
      right: "draptouch-decelerating-right"
    }
  }, s.prototype.start = function(t) {
    this.settings = h.extend(this.settings, t), this.velocity = t.velocity || this.velocity, this.velocityY = t.velocityY || this.velocityY, this.settings.decelerate = !1, this._move()
  }, s.prototype.end = function() {
    this.settings.decelerate = !0
  }, s.prototype.stop = function() {
    this.velocity = 0, this.velocityY = 0, this.settings.decelerate = !0, h.isFunction(this.settings.stopped) && this.settings.stopped.call(this)
  }, s.prototype.detach = function() {
    this._detachListeners(), this.$el.removeClass(t).css("cursor", "")
  }, s.prototype.attach = function() {
    this.$el.hasClass(t) || (this._attachListeners(this.$el), this.$el.addClass(t).css("cursor", this.settings.cursor))
  }, s.prototype._initElements = function() {
    this.$el.addClass(t), h.extend(this, {
      xpos: null,
      prevXPos: !1,
      ypos: null,
      prevYPos: !1,
      mouseDown: !1,
      throttleTimeout: 1e3 / this.settings.throttleFPS,
      lastMove: null,
      elementFocused: null
    }), this.velocity = 0, this.velocityY = 0, h(document).mouseup(h.proxy(this._resetMouse, this)).click(h.proxy(this._resetMouse, this)), this._initEvents(), this.$el.css("cursor", this.settings.cursor), this.settings.triggerHardware && this.$el.css({
      "-webkit-transform": "translate3d(0,0,0)",
      "-webkit-perspective": "1000",
      "-webkit-backface-visibility": "hidden"
    })
  }, s.prototype._initEvents = function() {
    var n = this;
    this.settings.events = {
      touchStart: function(t) {
        var e;
        n._useTarget(t.target, t) && (e = t.originalEvent.touches[0], n.threshold = n._threshold(t.target, t), n._start(e.clientX, e.clientY), t.stopPropagation())
      },
      touchMove: function(t) {
        var e;
        n.mouseDown && (e = t.originalEvent.touches[0], n._inputmove(e.clientX, e.clientY), t.preventDefault && t.preventDefault())
      },
      inputDown: function(t) {
        n._useTarget(t.target, t) && (n.threshold = n._threshold(t.target, t), n._start(t.clientX, t.clientY), n.elementFocused = t.target, "IMG" === t.target.nodeName && t.preventDefault(), t.stopPropagation())
      },
      inputEnd: function(t) {
        n._useTarget(t.target, t) && (n._end(), n.elementFocused = null, t.preventDefault && t.preventDefault())
      },
      inputMove: function(t) {
        n.mouseDown && (n._inputmove(t.clientX, t.clientY), t.preventDefault && t.preventDefault())
      },
      scroll: function(t) {
        h.isFunction(n.settings.moved) && n.settings.moved.call(n, n.settings), t.preventDefault && t.preventDefault()
      },
      inputClick: function(t) {
        if (0 < Math.abs(n.velocity)) return t.preventDefault(), !1
      },
      dragStart: function(t) {
        if (n._useTarget(t.target, t) && n.elementFocused) return !1
      }
    }, this._attachListeners(this.$el, this.settings)
  }, s.prototype._inputmove = function(t, e) {
    var n = this.$el;
    this.el;
    if ((!this.lastMove || new Date > new Date(this.lastMove.getTime() + this.throttleTimeout)) && (this.lastMove = new Date, this.mouseDown && (this.xpos || this.ypos))) {
      var i = t - this.xpos,
        o = e - this.ypos;
      if (0 < this.threshold) {
        var s = Math.sqrt(i * i + o * o);
        if (this.threshold > s) return;
        this.threshold = 0
      }
      this.elementFocused && (h(this.elementFocused).blur(), this.elementFocused = null, n.focus()), this.settings.decelerate = !1, this.velocity = this.velocityY = 0;
      var a = this.scrollLeft(),
        r = this.scrollTop();
      this.scrollLeft(this.settings.x ? a - i : a), this.scrollTop(this.settings.y ? r - o : r), this.prevXPos = this.xpos, this.prevYPos = this.ypos, this.xpos = t, this.ypos = e, this._calculateVelocities(), this._setMoveClasses(this.settings.movingClass), h.isFunction(this.settings.moved) && this.settings.moved.call(this, this.settings)
    }
  }, s.prototype._calculateVelocities = function() {
    this.velocity = this._capVelocity(this.prevXPos - this.xpos, this.settings.maxvelocity), this.velocityY = this._capVelocity(this.prevYPos - this.ypos, this.settings.maxvelocity)
  }, s.prototype._end = function() {
    this.xpos && this.prevXPos && !1 === this.settings.decelerate && (this.settings.decelerate = !0, this._calculateVelocities(), this.xpos = this.prevXPos = this.mouseDown = !1, this._move())
  }, s.prototype._useTarget = function(t, e) {
    return !h.isFunction(this.settings.filterTarget) || !1 !== this.settings.filterTarget.call(this, t, e)
  }, s.prototype._threshold = function(t, e) {
    return h.isFunction(this.settings.threshold) ? this.settings.threshold.call(this, t, e) : this.settings.threshold
  }, s.prototype._start = function(t, e) {
    this.mouseDown = !0, this.velocity = this.prevXPos = 0, this.velocityY = this.prevYPos = 0, this.xpos = t, this.ypos = e
  }, s.prototype._resetMouse = function() {
    this.xpos = !1, this.ypos = !1, this.mouseDown = !1
  }, s.prototype._decelerateVelocity = function(t, e) {
    return 0 === Math.floor(Math.abs(t)) ? 0 : t * e
  }, s.prototype._capVelocity = function(t, e) {
    var n = t;
    return 0 < t ? e < t && (n = e) : t < 0 - e && (n = 0 - e), n
  }, s.prototype._setMoveClasses = function(t) {
    var e = this.settings,
      n = this.$el;
    n.removeClass(e.movingClass.up).removeClass(e.movingClass.down).removeClass(e.movingClass.left).removeClass(e.movingClass.right).removeClass(e.deceleratingClass.up).removeClass(e.deceleratingClass.down).removeClass(e.deceleratingClass.left).removeClass(e.deceleratingClass.right), 0 < this.velocity && n.addClass(t.right), this.velocity < 0 && n.addClass(t.left), 0 < this.velocityY && n.addClass(t.down), this.velocityY < 0 && n.addClass(t.up)
  }, s.prototype._move = function() {
    this.$el;
    var t = this.el,
      e = this,
      n = e.settings;
    n.x && 0 < t.scrollWidth ? (this.scrollLeft(this.scrollLeft() + this.velocity), 0 < Math.abs(this.velocity) && (this.velocity = n.decelerate ? e._decelerateVelocity(this.velocity, n.slowdown) : this.velocity)) : this.velocity = 0, n.y && 0 < t.scrollHeight ? (this.scrollTop(this.scrollTop() + this.velocityY), 0 < Math.abs(this.velocityY) && (this.velocityY = n.decelerate ? e._decelerateVelocity(this.velocityY, n.slowdown) : this.velocityY)) : this.velocityY = 0, e._setMoveClasses(n.deceleratingClass), h.isFunction(n.moved) && n.moved.call(this, n), 0 < Math.abs(this.velocity) || 0 < Math.abs(this.velocityY) ? this.moving || (this.moving = !0, window.requestAnimationFrame(function() {
      e.moving = !1, e._move()
    })) : e.stop()
  }, s.prototype._getScroller = function() {
    var t = this.$el;
    return (this.$el.is("body") || this.$el.is("html")) && (t = h(window)), t
  }, s.prototype.scrollLeft = function(t) {
    var e = this._getScroller();
    if ("number" != typeof t) return e.scrollLeft();
    e.scrollLeft(t), this.settings.scrollLeft = t
  }, s.prototype.scrollTop = function(t) {
    var e = this._getScroller();
    if ("number" != typeof t) return e.scrollTop();
    e.scrollTop(t), this.settings.scrollTop = t
  }, s.prototype._attachListeners = function() {
    var t = this.$el,
      e = this.settings;
    h.support.touch && t.bind("touchstart", e.events.touchStart).bind("touchend", e.events.inputEnd).bind("touchmove", e.events.touchMove), t.mousedown(e.events.inputDown).mouseup(e.events.inputEnd).mousemove(e.events.inputMove), t.click(e.events.inputClick).scroll(e.events.scroll).bind("selectstart", n).bind("dragstart", e.events.dragStart)
  }, s.prototype._detachListeners = function() {
    var t = this.$el,
      e = this.settings;
    h.support.touch && t.unbind("touchstart", e.events.touchStart).unbind("touchend", e.events.inputEnd).unbind("touchmove", e.events.touchMove), t.unbind("mousedown", e.events.inputDown).unbind("mouseup", e.events.inputEnd).unbind("mousemove", e.events.inputMove), t.unbind("click", e.events.inputClick).unbind("scroll", e.events.scroll).unbind("selectstart", n).unbind("dragstart", e.events.dragStart)
  }, h.DrapTouch = s, h.fn.draptouch = function(i, o) {
    return this.each(function() {
      var t = h(this),
        e = t.data(s.DATA_KEY),
        n = h.extend({}, s.DEFAULTS, t.data(), "object" == typeof i && i);
      e || t.data(s.DATA_KEY, e = new s(this, n)), "string" == typeof i && e[i](o)
    })
  }
}(window.jQuery || window.Zepto),
function(t, e) {
  if ("function" == typeof define && define.amd) define(["exports"], e);
  else if ("undefined" != typeof exports) e(exports);
  else {
    var n = {};
    e(n), t.PinchZoom = n
  }
}(this, function(t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
    value: function(t, e) {
      if (null == t) throw new TypeError("Cannot convert undefined or null to object");
      for (var n = Object(t), i = 1; i < arguments.length; i++) {
        var o = arguments[i];
        if (null != o)
          for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (n[s] = o[s])
      }
      return n
    },
    writable: !0,
    configurable: !0
  }), "function" != typeof Array.from && (Array.from = function(t) {
    return [].slice.call(t)
  });
  var s = function(t, e) {
      var n = document.createEvent("HTMLEvents");
      n.initEvent(e, !0, !1), t.dispatchEvent(n)
    },
    e = function() {
      var t = function(t, e) {
          this.el = t, this.zoomFactor = 1, this.lastScale = 1, this.offset = {
            x: 0,
            y: 0
          }, this.initialOffset = {
            x: 0,
            y: 0
          }, this.options = Object.assign({}, this.defaults, e), this.setupMarkup(), this.bindEvents(), this.update(), this.isImageLoaded(this.el) && (this.updateAspectRatio(), this.setupInitialOffset()), this.enable()
        },
        e = function(t, e) {
          return t + e
        };
      t.prototype = {
        defaults: {
          tapZoomFactor: 2,
          zoomOutFactor: 1.3,
          animationDuration: 300,
          maxZoom: 6,
          minZoom: .5,
          draggableUnzoomed: !0,
          lockDragAxis: !1,
          use2d: !0,
          zoomStartEventName: "pz_zoomstart",
          zoomUpdateEventName: "pz_zoomupdate",
          zoomEndEventName: "pz_zoomend",
          dragStartEventName: "pz_dragstart",
          dragUpdateEventName: "pz_dragupdate",
          dragEndEventName: "pz_dragend",
          doubleTapEventName: "pz_doubletap",
          verticalPadding: 0,
          horizontalPadding: 0
        },
        handleDragStart: function(t) {
          s(this.el, this.options.dragStartEventName), this.stopAnimation(), this.lastDragPosition = !1, this.hasInteraction = !0, this.handleDrag(t)
        },
        handleDrag: function(t) {
          var e = this.getTouches(t)[0];
          this.drag(e, this.lastDragPosition), this.offset = this.sanitizeOffset(this.offset), this.lastDragPosition = e
        },
        handleDragEnd: function() {
          s(this.el, this.options.dragEndEventName), this.end()
        },
        handleZoomStart: function(t) {
          s(this.el, this.options.zoomStartEventName), this.stopAnimation(), this.lastScale = 1, this.nthZoom = 0, this.lastZoomCenter = !1, this.hasInteraction = !0
        },
        handleZoom: function(t, e) {
          var n = this.getTouchCenter(this.getTouches(t)),
            i = e / this.lastScale;
          this.lastScale = e, this.nthZoom += 1, 3 < this.nthZoom && (this.scale(i, n), this.drag(n, this.lastZoomCenter)), this.lastZoomCenter = n
        },
        handleZoomEnd: function() {
          s(this.el, this.options.zoomEndEventName), this.end()
        },
        handleDoubleTap: function(t) {
          var e = this.getTouches(t)[0],
            n = 1 < this.zoomFactor ? 1 : this.options.tapZoomFactor,
            i = this.zoomFactor,
            o = function(t) {
              this.scaleTo(i + t * (n - i), e)
            }.bind(this);
          this.hasInteraction || (this.isDoubleTap = !0, n < i && (e = this.getCurrentZoomCenter()), this.animate(this.options.animationDuration, o, this.swing), s(this.el, this.options.doubleTapEventName))
        },
        computeInitialOffset: function() {
          this.initialOffset = {
            x: -Math.abs(this.el.offsetWidth * this.getInitialZoomFactor() - this.container.offsetWidth) / 2,
            y: -Math.abs(this.el.offsetHeight * this.getInitialZoomFactor() - this.container.offsetHeight) / 2
          }
        },
        isImageLoaded: function(t) {
          return "IMG" === t.nodeName ? t.complete && 0 !== t.naturalHeight : Array.from(t.querySelectorAll("img")).every(this.isImageLoaded)
        },
        setupInitialOffset: function() {
          this._initialOffsetSetup || (this._initialOffsetSetup = !0, this.computeInitialOffset(), this.offset.x = this.initialOffset.x, this.offset.y = this.initialOffset.y)
        },
        sanitizeOffset: function(t) {
          var e = this.el.offsetWidth * this.getInitialZoomFactor() * this.zoomFactor,
            n = this.el.offsetHeight * this.getInitialZoomFactor() * this.zoomFactor,
            i = e - this.getContainerX() + this.options.horizontalPadding,
            o = n - this.getContainerY() + this.options.verticalPadding,
            s = Math.max(i, 0),
            a = Math.max(o, 0),
            r = Math.min(i, 0) - this.options.horizontalPadding,
            h = Math.min(o, 0) - this.options.verticalPadding;
          return {
            x: Math.min(Math.max(t.x, r), s),
            y: Math.min(Math.max(t.y, h), a)
          }
        },
        scaleTo: function(t, e) {
          this.scale(t / this.zoomFactor, e)
        },
        scale: function(t, e) {
          t = this.scaleZoomFactor(t), this.addOffset({
            x: (t - 1) * (e.x + this.offset.x),
            y: (t - 1) * (e.y + this.offset.y)
          }), s(this.el, this.options.zoomUpdateEventName)
        },
        scaleZoomFactor: function(t) {
          var e = this.zoomFactor;
          return this.zoomFactor *= t, this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom)), this.zoomFactor / e
        },
        canDrag: function() {
          return this.options.draggableUnzoomed || (t = this.zoomFactor, !((e = 1) - .01 < t && t < e + .01));
          var t, e
        },
        drag: function(t, e) {
          e && (this.options.lockDragAxis ? Math.abs(t.x - e.x) > Math.abs(t.y - e.y) ? this.addOffset({
            x: -(t.x - e.x),
            y: 0
          }) : this.addOffset({
            y: -(t.y - e.y),
            x: 0
          }) : this.addOffset({
            y: -(t.y - e.y),
            x: -(t.x - e.x)
          }), s(this.el, this.options.dragUpdateEventName))
        },
        getTouchCenter: function(t) {
          return this.getVectorAvg(t)
        },
        getVectorAvg: function(t) {
          return {
            x: t.map(function(t) {
              return t.x
            }).reduce(e) / t.length,
            y: t.map(function(t) {
              return t.y
            }).reduce(e) / t.length
          }
        },
        addOffset: function(t) {
          this.offset = {
            x: this.offset.x + t.x,
            y: this.offset.y + t.y
          }
        },
        sanitize: function() {
          this.zoomFactor < this.options.zoomOutFactor ? this.zoomOutAnimation() : this.isInsaneOffset(this.offset) && this.sanitizeOffsetAnimation()
        },
        isInsaneOffset: function(t) {
          var e = this.sanitizeOffset(t);
          return e.x !== t.x || e.y !== t.y
        },
        sanitizeOffsetAnimation: function() {
          var e = this.sanitizeOffset(this.offset),
            n = this.offset.x,
            i = this.offset.y,
            t = function(t) {
              this.offset.x = n + t * (e.x - n), this.offset.y = i + t * (e.y - i), this.update()
            }.bind(this);
          this.animate(this.options.animationDuration, t, this.swing)
        },
        zoomOutAnimation: function() {
          if (1 !== this.zoomFactor) {
            var e = this.zoomFactor,
              n = this.getCurrentZoomCenter(),
              t = function(t) {
                this.scaleTo(e + t * (1 - e), n)
              }.bind(this);
            this.animate(this.options.animationDuration, t, this.swing)
          }
        },
        updateAspectRatio: function() {
          this.setContainerY(this.container.parentElement.offsetHeight)
        },
        getInitialZoomFactor: function() {
          var t = this.container.offsetWidth / this.el.offsetWidth,
            e = this.container.offsetHeight / this.el.offsetHeight;
          return Math.min(t, e)
        },
        getAspectRatio: function() {
          return this.el.offsetWidth / this.el.offsetHeight
        },
        getCurrentZoomCenter: function() {
          var t = this.offset.x - this.initialOffset.x,
            e = -1 * this.offset.x - t / (1 / this.zoomFactor - 1),
            n = this.offset.y - this.initialOffset.y;
          return {
            x: e,
            y: -1 * this.offset.y - n / (1 / this.zoomFactor - 1)
          }
        },
        getTouches: function(t) {
          var e = this.container.getBoundingClientRect(),
            n = document.documentElement.scrollTop || document.body.scrollTop,
            i = document.documentElement.scrollLeft || document.body.scrollLeft,
            o = e.top + n,
            s = e.left + i;
          return Array.prototype.slice.call(t.touches).map(function(t) {
            return {
              x: t.pageX - s,
              y: t.pageY - o
            }
          })
        },
        animate: function(n, i, o, s) {
          var a = (new Date).getTime(),
            r = function() {
              if (this.inAnimation) {
                var t = (new Date).getTime() - a,
                  e = t / n;
                n <= t ? (i(1), s && s(), this.update(), this.stopAnimation(), this.update()) : (o && (e = o(e)), i(e), this.update(), requestAnimationFrame(r))
              }
            }.bind(this);
          this.inAnimation = !0, requestAnimationFrame(r)
        },
        stopAnimation: function() {
          this.inAnimation = !1
        },
        swing: function(t) {
          return -Math.cos(t * Math.PI) / 2 + .5
        },
        getContainerX: function() {
          return this.container.offsetWidth
        },
        getContainerY: function() {
          return this.container.offsetHeight
        },
        setContainerY: function(t) {
          return this.container.style.height = t + "px"
        },
        setupMarkup: function() {
          var t, e;
          this.container = (t = '<div class="pinch-zoom-container"></div>', (e = document.implementation.createHTMLDocument("")).body.innerHTML = t, Array.from(e.body.children)[0]), this.el.parentNode.insertBefore(this.container, this.el), this.container.appendChild(this.el), this.container.style.overflow = "hidden", this.container.style.position = "relative", this.el.style.webkitTransformOrigin = "0% 0%", this.el.style.mozTransformOrigin = "0% 0%", this.el.style.msTransformOrigin = "0% 0%", this.el.style.oTransformOrigin = "0% 0%", this.el.style.transformOrigin = "0% 0%", this.el.style.position = "absolute"
        },
        end: function() {
          this.hasInteraction = !1, this.sanitize(), this.update()
        },
        bindEvents: function() {
          var e = this;
          n(this.container, this), window.addEventListener("resize", this.update.bind(this)), Array.from(this.el.querySelectorAll("img")).forEach(function(t) {
            t.addEventListener("load", e.update.bind(e))
          }), "IMG" === this.el.nodeName && this.el.addEventListener("load", this.update.bind(this))
        },
        update: function(a) {
          this.updatePlaned || (this.updatePlaned = !0, window.setTimeout(function() {
            this.updatePlaned = !1, this.updateAspectRatio(), a && "resize" === a.type && this.computeInitialOffset(), a && "load" === a.type && this.setupInitialOffset();
            var t = this.getInitialZoomFactor() * this.zoomFactor,
              e = -this.offset.x / t,
              n = -this.offset.y / t,
              i = "scale3d(" + t + ", " + t + ",1) translate3d(" + e + "px," + n + "px,0px)",
              o = "scale(" + t + ", " + t + ") translate(" + e + "px," + n + "px)",
              s = function() {
                this.clone && (this.clone.parentNode.removeChild(this.clone), delete this.clone)
              }.bind(this);
            !this.options.use2d || this.hasInteraction || this.inAnimation ? (this.is3d = !0, s(), this.el.style.webkitTransform = i, this.el.style.mozTransform = o, this.el.style.msTransform = o, this.el.style.oTransform = o, this.el.style.transform = i) : (this.is3d && (this.clone = this.el.cloneNode(!0), this.clone.style.pointerEvents = "none", this.container.appendChild(this.clone), window.setTimeout(s, 200)), this.el.style.webkitTransform = o, this.el.style.mozTransform = o, this.el.style.msTransform = o, this.el.style.oTransform = o, this.el.style.transform = o, this.is3d = !1)
          }.bind(this), 0))
        },
        enable: function() {
          this.enabled = !0
        },
        disable: function() {
          this.enabled = !1
        }
      };
      var n = function(t, o) {
        var s = null,
          n = 0,
          i = null,
          a = null,
          e = function(t, e) {
            if (s !== t) {
              if (s && !t) switch (s) {
                case "zoom":
                  o.handleZoomEnd(e);
                  break;
                case "drag":
                  o.handleDragEnd(e)
              }
              switch (t) {
                case "zoom":
                  o.handleZoomStart(e);
                  break;
                case "drag":
                  o.handleDragStart(e)
              }
            }
            s = t
          },
          r = function(t) {
            2 === n ? e("zoom") : 1 === n && o.canDrag() ? e("drag", t) : e(null, t)
          },
          h = function(t) {
            return Array.from(t).map(function(t) {
              return {
                x: t.pageX,
                y: t.pageY
              }
            })
          },
          l = function(t, e) {
            var n, i;
            return n = t.x - e.x, i = t.y - e.y, Math.sqrt(n * n + i * i)
          },
          c = function(t) {
            t.stopPropagation(), t.preventDefault()
          },
          u = !0;
        t.addEventListener("touchstart", function(t) {
          o.enabled && (u = !0, n = t.touches.length, function(t) {
            var e = (new Date).getTime();
            if (1 < n && (i = null), e - i < 300) switch (c(t), o.handleDoubleTap(t), s) {
              case "zoom":
                o.handleZoomEnd(t);
                break;
              case "drag":
                o.handleDragEnd(t)
            } else o.isDoubleTap = !1;
            1 === n && (i = e)
          }(t))
        }), t.addEventListener("touchmove", function(t) {
          if (o.enabled && !o.isDoubleTap) {
            if (u) r(t), s && c(t), a = h(t.touches);
            else {
              switch (s) {
                case "zoom":
                  o.handleZoom(t, (e = a, n = h(t.touches), i = l(e[0], e[1]), l(n[0], n[1]) / i));
                  break;
                case "drag":
                  o.handleDrag(t)
              }
              s && (c(t), o.update())
            }
            u = !1
          }
          var e, n, i
        }), t.addEventListener("touchend", function(t) {
          o.enabled && (n = t.touches.length, r(t))
        })
      };
      return t
    }();
  t.default = e
}),
function(t, e) {
  "function" == typeof define && define.amd ? define(e) : "undefined" != typeof exports ? module.exports = e() : t.canvallax = e()
}(this, function() {
  "use strict";
  var n = window,
    i = document,
    t = (i.documentElement, i.body),
    e = Array.prototype,
    a = n.canvallax = n.canvallax || {},
    o = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.msRequestAnimationFrame || function(t) {
      n.setTimeout(t, 20)
    };
  if (!n.CanvasRenderingContext2D) return !1;
  n.clx = a;
  var s = Math.PI / 180,
    f = 2 * Math.PI,
    r = function() {},
    h = function(t) {
      return "function" == typeof t
    };

  function l() {
    var t, e = arguments,
      n = e[0] || {},
      i = e.length,
      o = 1;
    for (1 === i && (n = this, o = 0); o < i; o++)
      if (e[o])
        for (t in e[o]) e[o].hasOwnProperty(t) && (n[t] = e[o][t]);
    return n
  }

  function c(t, e, n) {
    (arguments.length <= 1 || "boolean" == typeof e) && (n = e, e = t, t = this);
    var i = l({}, t, e),
      o = i.length,
      s = 0;
    if (o && n)
      for (i.children = [], i.length = 0; s < o; s++) i[s] && i[s].clone && (i.children[s] = i[s].clone(), delete i[s]);
    return new t.constructor(i)
  }

  function u() {
    function s(t) {
      var e, n = this,
        i = arguments.length,
        o = 0;
      if (n instanceof s) return 1 === i && l(n, t), n.fn = s.fn, n.init && n.init.apply(n, arguments), n.playing && n.play && n.play(), n;
      for (e = new Array(i); o < i; o++) e[o] = arguments[o];
      return function(t, e) {
        function n() {
          return t.apply(this, e)
        }
        return n.prototype = t.prototype, new n
      }(s, e)
    }
    for (var t, e = arguments.length, n = 0, i = {
        init: r,
        extend: l,
        clone: c
      }; n < e; n++)
      for (var o in (t = arguments[n]).prototype && (t = t.prototype), t) t.hasOwnProperty(o) && (i[o] = t[o]);
    return (i.constructor = s).fn = s.prototype = i, s
  }
  a.extend = l, a.clone = c, a.createClass = u;
  var d = {
      length: 0,
      splice: e.splice,
      indexOf: e.indexOf,
      push: e.push,
      sort: e.sort,
      unshift: e.unshift,
      add: function(t) {
        for (var e = t && -1 < t.length && Array.isArray(t) ? t : arguments, n = e.length, i = 0; i < n; i++) e[i] && this.push(e[i]);
        return this
      },
      each: function(t, e) {
        for (var n, i = this.length, o = 0; o < i && (n = e || this[o], !1 !== t.call(n, this[o], o)); o++);
        return this
      },
      remove: function(t) {
        for (var e, n = t && -1 < t.length && Array.isArray(t) ? t : arguments, i = n.length; i--;) - 1 < (e = this.indexOf(n[i])) && this.splice(e, 1);
        return this
      }
    },
    p = ["width", "height"],
    g = {
      x: 0,
      y: 0,
      z: 1,
      opacity: 1,
      scale: 1,
      rotation: 0,
      addTo: function(t) {
        for (var e = t && -1 < t.length && Array.isArray(t) ? t : arguments, n = e.length, i = 0; i < n; i++) e[i] && e[i].add && e[i].add(this);
        return this
      },
      extend: l,
      set: l,
      render: function(t, e) {
        if (t) {
          var n, i = this,
            o = i.length,
            s = 0;
          if (e = e || i.parent, t.save(), i.clearFrames && i.clear && i.clear(t, e), 0 < (n = t.globalAlpha * i.opacity) && (i.clip && i._clip(t, e), t.globalAlpha = n, i.blend && (t.globalCompositeOperation = i.blend), (i.fixed || e && e.transform(t, i.z)) && i.transform(t))) {
            for (i.preRender && i.preRender(t, e), i._render && i._render(t, e); s < o; s++) i[s].render(t, i);
            i.postRender && i.postRender(t, e)
          }
          return t.restore(), i
        }
      },
      getCanvas: function() {
        return this.canvas || !!this.parent && this.parent.getCanvas()
      },
      transformOrigin: "center center",
      calcTransformPoint: function() {
        for (var t, e, n = [0, 0], i = this.transformOrigin.split(" "), o = 0; o < 2; o++)(e = "center" === (t = i[o]) ? .5 : "right" === t || "bottom" === t ? 1 : t.indexOf("%") ? parseFloat(t) / 100 : 0) && (n[o] = this[p[o]] * e);
        return n
      },
      getTransformPoint: function(t) {
        var e = this,
          n = e._transformPoint,
          i = e.transformOrigin,
          o = Array.isArray(i);
        return o || e.width || e.height || !e.length || !e.parent ? (!t && n && e._transformOrigin === i || (n = o ? i : e.calcTransformPoint(), e._transformOrigin = e.transformOrigin, e._transformPoint = n), n) : e.parent.getTransformPoint()
      },
      getCoords: function(t) {
        var e = this.x,
          n = this.y,
          i = this.offset,
          o = this.parent,
          s = !(this.fixed || !o || !o.getCoords) && o.getCoords(t);
        return i && (e += i.x || 0, n += i.y || 0), s && (e += s[0], n += s[1]), o || void 0 === t || (e *= t, n *= t), [e, n]
      },
      transform: function(t, e) {
        var n, i, o = void 0 !== e ? e : this.scale;
        return !(o <= 0) && (1 === o && this.rotation % 360 == 0 || (n = this.getCoords(e), i = this.getTransformPoint(), n[0] += i[0], n[1] += i[1], t.translate(n[0], n[1]), this.rotation && t.rotate(this.rotation * s), t.scale(o, o), t.translate(-n[0], -n[1])), this)
      },
      _clip: function(t, e) {
        var n = this;
        t.beginPath(), n.clip.render ? (n.clip.parent = e || n, n.clip.render(t, e)) : n.clip.call(n, t, e), t.clip()
      }
    },
    v = l({}, d, {
      animate: function() {
        var t, e = v.length;
        if (v.playing && 0 !== e)
          for (v.frame = o(v.animate); e--;)(t = v[e]) && t.playing && t.render && !t.render() && t.stop();
        else v.stop()
      },
      play: function() {
        v.frame = v.frame || o(v.animate), v.playing = !0
      },
      stop: function() {
        v.playing = !1, v.frame = null
      },
      kill: function() {
        return v.stop(), v.splice(0)
      }
    });
  a.animations = v;
  var m = {
    play: function() {
      return this.playing = !0, -1 == v.indexOf(this) && v[this.animateLast ? "unshift" : "push"](this), v.play(), this
    },
    stop: function() {
      this.playing = !1;
      var t = v.indexOf(this);
      return -1 < t && v.splice(t, 1), this
    }
  };

  function y(t, e, n, i) {
    if (!(this instanceof y)) return new y(t, e, n, i);
    var o, s = this;
    if (l(s, i), s.target = t, s.to = n, !s.from)
      for (o in s.from = {}, n) s.from[o] = t[o];
    return s.duration(e), s.ease = a.ease[s.ease] || s.ease, s.restart(), s
  }

  function w(t, e) {
    return (t.zIndex === e.zIndex ? 0 : t.zIndex < e.zIndex ? -1 : 1) || (t.z === e.z ? 0 : t.z < e.z ? -1 : 1)
  }
  a.ease = {
    linear: function(t) {
      return t
    },
    inQuad: function(t) {
      return t * t
    },
    outQuad: function(t) {
      return t * (2 - t)
    },
    inOutQuad: function(t) {
      return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
    },
    inCubic: function(t) {
      return t * t * t
    },
    outCubic: function(t) {
      return --t * t * t + 1
    },
    inOutCubic: function(t) {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    inQuart: function(t) {
      return t * t * t * t
    },
    outQuart: function(t) {
      return 1 - --t * t * t * t
    },
    inOutQuart: function(t) {
      return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
    }
  }, y.fn = y.prototype = l({}, m, {
    repeat: 0,
    ease: a.ease.inOutQuad,
    duration: function(t) {
      if (!t) return this._d / 1e3;
      this._d = 1e3 * t
    },
    restart: function(t) {
      var e = t ? this.repeatDelay : this.delay;
      this._s = Date.now() + (e ? 1e3 * e : 0), this._p = 0, this.onStart && this.onStart(), this.play()
    },
    pause: function() {
      this._p = this._p || Date.now(), this.playing = !1
    },
    reverse: function() {
      this.reversed = !this.reversed, this.restart()
    },
    render: function() {
      var t, e, n, i = this,
        o = Date.now();
      if (i.playing) {
        if (i._p && (i._s += o - i._p, i._p = 0), o < i._s) return !0;
        for (n in 1 < (t = (o - i._s) / i._d) && (t = 1), e = i.ease(i.reversed ? 1 - t : t), i.to) i.target[n] = i.from[n] + (i.to[n] - i.from[n]) * e;
        if (i.onUpdate && !1 === i.onUpdate()) return !1;
        if (1 === t) {
          if (i.onComplete && i.onComplete(), i.yoyo && (i.reversed = !i.reversed), 0 === i.repeat) return !1;
          0 < i.repeat && i.repeat--, i.restart(!0)
        }
        return !0
      }
    }
  }), (a.Animate = y).from = function(t, e, n, i) {
    var o = {};
    for (var s in n) o[s] = t[s];
    return (i = i || {}).from = n, new y(t, e, o, i)
  }, y.fromTo = function(t, e, n, i, o) {
    return (o = o || {}).from = n, new y(t, e, i, o)
  }, g.to = g.animate = function(t, e, n) {
    return new y(this, t, e, n)
  }, g.from = function(t, e, n) {
    return new y.from(this, t, e, n)
  }, g.fromTo = function(t, e, n, i) {
    return new y.fromTo(this, t, e, n, i)
  }, a.Group = u(g, d, {
    type: "group",
    add: function(t) {
      for (var e = t && -1 < t.length && Array.isArray(t) ? t : arguments, n = e.length, i = 0; i < n; i++) e[i] && (e[i].parent = this).push(e[i]);
      return this.sort(w)
    },
    init: function(t) {
      t && t.children && this.add(t.children)
    }
  });
  var x = "";
  a.Scene = u(a.Group, m, {
    type: "scene",
    parentElement: t,
    className: "",
    fullscreen: !0,
    includeStyles: !0,
    playing: !0,
    animateLast: !0,
    clearFrames: !0,
    clear: function(t) {
      var e = this.fill;
      return e && (t.fillStyle = e), t[this.fill ? "fillRect" : "clearRect"](0, 0, this.width, this.height), this
    },
    resize: function(t, e) {
      return this.width = this.canvas.width = t || this.width, this.height = this.canvas.height = e || this.height, this
    },
    resizeFullscreen: function() {
      return this.resize(n.innerWidth, n.innerHeight), this
    },
    init: function(t) {
      var e = this;
      e.canvas || (e.canvas = i.createElement("canvas"), e.parentElement.insertBefore(e.canvas, e.parentElement.firstChild)), e.ctx = e.canvas.getContext("2d"), e.className += "", e.fullscreen ? (e.resizeFullscreen(), n.addEventListener("resize", e.resizeFullscreen.bind(e)), x && e.includeStyles && (i.head.insertAdjacentHTML("afterbegin", x), x = null)) : e.resize(e.width || e.canvas.width, e.height || e.canvas.height), e.canvas.className += e.className, t && t.children && e.add(t.children), e.render = e.render.bind(e, e.ctx, e)
    }
  }), a.Element = u(g, {
    type: "element",
    lineWidth: 1,
    _render: function(t, e) {
      var n = this;
      n.draw && (t.beginPath(), n.draw(t, n.getCoords(n.z), e)), n.fill && (h(n.fill) ? n.fill(t, e) : (t.fillStyle = n.fill, t.fill())), n.stroke && (n.lineWidth && (t.lineWidth = n.lineWidth), h(n.stroke) ? n.stroke(t, e) : (t.strokeStyle = n.stroke, t.stroke()))
    }
  });
  var b = a.createElement = u.bind(null, a.Element),
    _ = function(t, e) {
      t.ellipse(e[0] + this.width / 2, e[1] + this.height / 2, this.width / 2, this.height / 2, 0, 0, f)
    };
  "function" == typeof document.createElement("canvas").getContext("2d").ellipse || (_ = function(t, e) {
    var n = this.width,
      i = this.height,
      o = e[0],
      s = e[1];
    if (n === i) t.arc(o + n / 2, e[1] + n / 2, n / 2, 0, f);
    else {
      var a = n / 2 * .5522848,
        r = i / 2 * .5522848,
        h = o + n,
        l = s + i,
        c = o + n / 2,
        u = s + i / 2;
      t.moveTo(o, u), t.bezierCurveTo(o, u - r, c - a, s, c, s), t.bezierCurveTo(c + a, s, h, u - r, h, u), t.bezierCurveTo(h, u + r, c + a, l, c, l), t.bezierCurveTo(c - a, l, o, u + r, o, u)
    }
  }), a.Ellipse = b({
    type: "ellipse",
    draw: _
  }), a.Rectangle = b({
    type: "rectangle",
    draw: function(t, e) {
      t.rect(e[0], e[1], this.width, this.height)
    }
  }), a.Image = b({
    type: "image",
    onload: function(t) {
      t.width = t.width ? t.width : t.image.width, t.height = t.height ? t.height : t.image.height
    },
    onerror: function() {
      this.removeAttribute("src")
    },
    init: function(t) {
      var e = this.image;
      (e = e && 1 === e.nodeType ? e : t && 1 === t.nodeType ? t : new Image) instanceof HTMLCanvasElement || (e = e.cloneNode()), this.image = e, this.onload(this), e.onload = this.onload.bind(null, this), e.onerror = this.onerror, e.src = e.src || t.src || t
    },
    draw: function(t, e) {
      this.image && t.drawImage(this.image, e[0], e[1], this.width, this.height)
    }
  }), a.Polygon = b({
    type: "polygon",
    points: 6,
    draw: function(t, e) {
      var n, i, o, s, a = this.points,
        r = a.length,
        h = 0;
      if (r)
        for (; h < r; h++) "close" === a[h] ? t.closePath() : t[0 === h ? "moveTo" : "lineTo"](e[0] + a[h][0], e[1] + a[h][1]);
      else {
        for (n = this.width / 2, i = this.height / 2, o = e[0] + n, s = e[1] + i, t.moveTo(o + n, s); h < a; h++) t.lineTo(o + n * Math.cos(h * f / a), s + i * Math.sin(h * f / a));
        t.closePath()
      }
    }
  }), a.Tracker = u(d, m, {
    ease: 0,
    scale: 1,
    property: "offset",
    individual: !1,
    playing: !0,
    applyTracking: function(t, e) {
      var n = this,
        i = t[n.property] || {},
        o = {};
      if (!(e = e || n._render(t))) return !1;
      for (var s in e) o[s] = n.scale * (!0 === n.invert || n.invert === "invert" + s ? e[s] : -e[s]) + (n.offset && !isNaN(n.offset[s]) ? n.offset[s] : isNaN(n.offset) ? 0 : n.offset), i[s] || (i[s] = 0), i[s] = n.ease <= 0 ? o[s] : i[s] + (o[s] - i[s]) / (n.ease + 1);
      return t[n.property] = i, this
    },
    render: function() {
      for (var t = this.length, e = 0, n = this.individual ? null : this._render(); e < t; e++) this.applyTracking(this[e], n);
      return this
    }
  });
  var T = a.createTracker = u.bind(null, a.Tracker),
    E = 0,
    M = 0,
    Y = !1,
    z = function() {
      E = n.pageXOffset, M = n.pageYOffset
    };
  a.TrackScroll = T({
    init: function() {
      Y || (Y = !0, z(), i.addEventListener("scroll", z))
    },
    _render: function() {
      var t = this.element;
      return {
        x: t ? t.scrollLeft : E,
        y: t ? t.scrollTop : M
      }
    }
  });
  var O = n.innerHeight,
    F = n.innerWidth,
    C = function() {
      O = n.innerHeight, F = n.innerWidth
    },
    D = F / 2,
    X = O / 2,
    I = !1,
    A = function(t) {
      D = t.touches ? t.touches[0].clientX : t.clientX, X = t.touches ? t.touches[0].clientY : t.clientY
    };
  a.TrackPointer = a.createTracker({
    range: !1,
    init: function() {
      I || (I = !0, i.addEventListener("mousemove", A), i.addEventListener("touchmove", A), i.addEventListener("touchstart", A)), C(), n.addEventListener("resize", C)
    },
    _render: function() {
      var t = -D,
        e = -X,
        n = this.range;
      return (n || 0 === n) && (t = (D / F - .5) * -(n.x || n), e = (X / O - .5) * -(n.y || n)), {
        x: t,
        y: e
      }
    }
  }), a.TrackElement = a.createTracker({
    init: function(t) {
      var e = t && t.element || t;
      this.element = "string" == typeof e ? document.querySelector(e) : e
    },
    _render: function() {
      var t = this.element.getBoundingClientRect();
      return {
        x: -t.left,
        y: -t.top
      }
    }
  });
  for (var P = r, S = n._clx || [], k = S.length, L = 0; L < k; L++) S[L](a);
  return P.push = function(t) {
    t(a)
  }, n._clx = P, a
});
! function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
  "use strict";
  var E = !1,
    M = !1,
    L = 0,
    C = 2e3,
    N = 0,
    P = e,
    R = document,
    _ = window,
    I = P(_),
    O = [];
  var Y = _.requestAnimationFrame || _.webkitRequestAnimationFrame || _.mozRequestAnimationFrame || !1,
    H = _.cancelAnimationFrame || _.webkitCancelAnimationFrame || _.mozCancelAnimationFrame || !1;
  if (Y) _.cancelAnimationFrame || (H = function(e) {});
  else {
    var s = 0;
    Y = function(e, o) {
      var t = (new Date).getTime(),
        r = Math.max(0, 16 - (t - s)),
        i = _.setTimeout(function() {
          e(t + r)
        }, r);
      return s = t + r, i
    }, H = function(e) {
      _.clearTimeout(e)
    }
  }
  var o, t, r, B = _.MutationObserver || _.WebKitMutationObserver || !1,
    X = Date.now || function() {
      return (new Date).getTime()
    },
    D = {
      zindex: "auto",
      cursoropacitymin: .5,
      cursoropacitymax: 1,
      cursorcolor: "#517aaa",
      cursorwidth: "5px",
      cursorborder: "none",
      cursorborderradius: "5px",
      scrollspeed: 90,
      mousescrollstep: 80,
      touchbehavior: !1,
      emulatetouch: !1,
      hwacceleration: !0,
      usetransition: !0,
      boxzoom: !1,
      dblclickzoom: !0,
      gesturezoom: !0,
      grabcursorenabled: !0,
      autohidemode: !0,
      background: "rgba(0,0,0,0)",
      iframeautoresize: !0,
      cursorminheight: 60,
      preservenativescrolling: !0,
      railoffset: !1,
      railhoffset: !1,
      bouncescroll: !0,
      spacebarenabled: !0,
      railpadding: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      disableoutline: !0,
      horizrailenabled: !0,
      railalign: "right",
      railvalign: "bottom",
      enabletranslate3d: !0,
      enablemousewheel: !0,
      enablekeyboard: !0,
      smoothscroll: !0,
      sensitiverail: !0,
      enablemouselockapi: !0,
      cursorfixedheight: !1,
      directionlockdeadzone: 6,
      hidecursordelay: 400,
      nativeparentscrolling: !0,
      enablescrollonselection: !0,
      overflowx: !0,
      overflowy: !0,
      cursordragspeed: .3,
      rtlmode: "auto",
      cursordragontouch: !1,
      oneaxismousemode: "auto",
      scriptpath: (t = R.currentScript || !!(o = R.getElementsByTagName("script")).length && o[o.length - 1], r = t ? t.src.split("?")[0] : "", 0 < r.split("/").length ? r.split("/").slice(0, -1).join("/") + "/" : ""),
      preventmultitouchscrolling: !0,
      disablemutationobserver: !1,
      enableobserver: !0,
      scrollbarid: !1
    },
    A = !1,
    l = function(e, o) {
      var b = this;
      this.version = "3.7.6", this.name = "nicescroll", this.me = o;
      var y = P("body"),
        x = this.opt = {
          doc: y,
          win: !1
        };
      if (P.extend(x, D), x.snapbackspeed = 80, e)
        for (var t in x) void 0 !== e[t] && (x[t] = e[t]);
      if (x.disablemutationobserver && (B = !1), this.doc = x.doc, this.iddoc = this.doc && this.doc[0] && this.doc[0].id || "", this.ispage = /^BODY|HTML/.test(x.win ? x.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== x.win, this.win = x.win || (this.ispage ? I : this.doc), this.docscroll = this.ispage && !this.haswrapper ? I : this.win, this.body = y, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != x.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
          x: 0,
          y: 0
        }, this.scrollratio = {
          x: 0,
          y: 0
        }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == x.rtlmode) {
        var r = this.win[0] == _ ? this.body : this.win,
          i = r.css("writing-mode") || r.css("-webkit-writing-mode") || r.css("-ms-writing-mode") || r.css("-moz-writing-mode");
        "horizontal-tb" == i || "lr-tb" == i || "" === i ? (this.isrtlmode = "rtl" == r.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == i || "tb" == i || "tb-rl" == i || "rl-tb" == i, this.isvertical = "vertical-rl" == i || "tb" == i || "tb-rl" == i)
      } else this.isrtlmode = !0 === x.rtlmode, this.isvertical = !1;
      if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, (this.observerbody = !1) !== x.scrollbarid) this.id = x.scrollbarid;
      else
        for (; this.id = "ascrail" + C++, R.getElementById(this.id););
      this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = x.overflowx, this.overflowy = x.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = function() {
        if (A) return A;
        var e = R.createElement("DIV"),
          s = e.style,
          o = navigator.userAgent,
          t = navigator.platform,
          n = {};
        return n.haspointerlock = "pointerLockElement" in R || "webkitPointerLockElement" in R || "mozPointerLockElement" in R, n.isopera = "opera" in _, n.isopera12 = n.isopera && "getUserMedia" in navigator, n.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(_.operamini), n.isie = "all" in R && "attachEvent" in e && !n.isopera, n.isieold = n.isie && !("msInterpolationMode" in s), n.isie7 = n.isie && !n.isieold && (!("documentMode" in R) || 7 === R.documentMode), n.isie8 = n.isie && "documentMode" in R && 8 === R.documentMode, n.isie9 = n.isie && "performance" in _ && 9 === R.documentMode, n.isie10 = n.isie && "performance" in _ && 10 === R.documentMode, n.isie11 = "msRequestFullscreen" in e && 11 <= R.documentMode, n.ismsedge = "msCredentials" in _, n.ismozilla = "MozAppearance" in s, n.iswebkit = !n.ismsedge && "WebkitAppearance" in s, n.ischrome = n.iswebkit && "chrome" in _, n.ischrome38 = n.ischrome && "touchAction" in s, n.ischrome22 = !n.ischrome38 && n.ischrome && n.haspointerlock, n.ischrome26 = !n.ischrome38 && n.ischrome && "transition" in s, n.cantouch = "ontouchstart" in R.documentElement || "ontouchstart" in _, n.hasw3ctouch = !!_.PointerEvent && (0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints), n.hasmstouch = !n.hasw3ctouch && (_.MSPointerEvent || !1), n.ismac = /^mac$/i.test(t), n.isios = n.cantouch && /iphone|ipad|ipod/i.test(t), n.isios4 = n.isios && !("seal" in Object), n.isios7 = n.isios && "webkitHidden" in R, n.isios8 = n.isios && "hidden" in R, n.isios10 = n.isios && _.Proxy, n.isandroid = /android/i.test(o), n.haseventlistener = "addEventListener" in e, n.trstyle = !1, n.hastransform = !1, n.hastranslate3d = !1, n.transitionstyle = !1, n.hastransition = !1, n.transitionend = !1, n.trstyle = "transform", n.hastransform = "transform" in s || function() {
          for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], o = 0, t = e.length; o < t; o++)
            if (void 0 !== s[e[o]]) {
              n.trstyle = e[o];
              break
            } n.hastransform = !!n.trstyle
        }(), n.hastransform && (s[n.trstyle] = "translate3d(1px,2px,3px)", n.hastranslate3d = /translate3d/.test(s[n.trstyle])), n.transitionstyle = "transition", n.prefixstyle = "", n.transitionend = "transitionend", n.hastransition = "transition" in s || function() {
          n.transitionend = !1;
          for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], o = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], t = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], r = 0, i = e.length; r < i; r++)
            if (e[r] in s) {
              n.transitionstyle = e[r], n.prefixstyle = o[r], n.transitionend = t[r];
              break
            } n.ischrome26 && (n.prefixstyle = o[1]), n.hastransition = n.transitionstyle
        }(), n.cursorgrabvalue = function() {
          var e = ["grab", "-webkit-grab", "-moz-grab"];
          (n.ischrome && !n.ischrome38 || n.isie) && (e = []);
          for (var o = 0, t = e.length; o < t; o++) {
            var r = e[o];
            if (s.cursor = r, s.cursor == r) return r
          }
          return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"
        }(), n.hasmousecapture = "setCapture" in e, n.hasMutationObserver = !1 !== B, e = null, A = n
      }();
      var S = P.extend({}, this.detected);
      this.canhwscroll = S.hastransform && x.hwacceleration, this.ishwscroll = this.canhwscroll && b.haswrapper, this.isrtlmode ? this.isvertical ? this.hasreversehr = !(S.iswebkit || S.isie || S.isie11) : this.hasreversehr = !(S.iswebkit || S.isie && !S.isie10 && !S.isie11) : this.hasreversehr = !1, this.istouchcapable = !1, (S.cantouch || !S.hasw3ctouch && !S.hasmstouch) && (!S.cantouch || S.isios || S.isandroid || !S.iswebkit && !S.ismozilla) || (this.istouchcapable = !0), x.enablemouselockapi || (S.hasmousecapture = !1, S.haspointerlock = !1), this.debounced = function(e, o, t) {
        b && (b.delaylist[e] || !1 || (b.delaylist[e] = {
          h: Y(function() {
            b.delaylist[e].fn.call(b), b.delaylist[e] = !1
          }, t)
        }, o.call(b)), b.delaylist[e].fn = o)
      }, this.synched = function(e, o) {
        b.synclist[e] ? b.synclist[e] = o : (b.synclist[e] = o, Y(function() {
          b && (b.synclist[e] && b.synclist[e].call(b), b.synclist[e] = null)
        }))
      }, this.unsynched = function(e) {
        b.synclist[e] && (b.synclist[e] = !1)
      }, this.css = function(e, o) {
        for (var t in o) b.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
      }, this.scrollTop = function(e) {
        return void 0 === e ? b.getScrollTop() : b.setScrollTop(e)
      }, this.scrollLeft = function(e) {
        return void 0 === e ? b.getScrollLeft() : b.setScrollLeft(e)
      };
      var d = function(e, o, t, r, i, s, n) {
        this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = s || 0, this.p4 = n || 1, this.ts = X(), this.df = o - e
      };

      function s() {
        var e = b.doc.css(S.trstyle);
        return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/)
      }
      if (d.prototype = {
          B2: function(e) {
            return 3 * (1 - e) * (1 - e) * e
          },
          B3: function(e) {
            return 3 * (1 - e) * e * e
          },
          B4: function(e) {
            return e * e * e
          },
          getPos: function() {
            return (X() - this.ts) / this.spd
          },
          getNow: function() {
            var e = (X() - this.ts) / this.spd,
              o = this.B2(e) + this.B3(e) + this.B4(e);
            return 1 <= e ? this.ed : this.st + this.df * o | 0
          },
          update: function(e, o) {
            return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = X(), this.df = this.ed - this.st, this
          }
        }, this.ishwscroll) {
        this.doc.translate = {
          x: 0,
          y: 0,
          tx: "0px",
          ty: "0px"
        }, S.hastranslate3d && S.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function(e) {
          if (!e) {
            var o = s();
            if (o) return 16 == o.length ? -o[13] : -o[5];
            if (b.timerscroll && b.timerscroll.bz) return b.timerscroll.bz.getNow()
          }
          return b.doc.translate.y
        }, this.getScrollLeft = function(e) {
          if (!e) {
            var o = s();
            if (o) return 16 == o.length ? -o[12] : -o[4];
            if (b.timerscroll && b.timerscroll.bh) return b.timerscroll.bh.getNow()
          }
          return b.doc.translate.x
        }, this.notifyScrollEvent = function(e) {
          var o = R.createEvent("UIEvents");
          o.initUIEvent("scroll", !1, !1, _, 1), o.niceevent = !0, e.dispatchEvent(o)
        };
        var n = this.isrtlmode ? 1 : -1;
        S.hastranslate3d && x.enabletranslate3d ? (this.setScrollTop = function(e, o) {
          b.doc.translate.y = e, b.doc.translate.ty = -1 * e + "px", b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0)"), o || b.notifyScrollEvent(b.win[0])
        }, this.setScrollLeft = function(e, o) {
          b.doc.translate.x = e, b.doc.translate.tx = e * n + "px", b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0)"), o || b.notifyScrollEvent(b.win[0])
        }) : (this.setScrollTop = function(e, o) {
          b.doc.translate.y = e, b.doc.translate.ty = -1 * e + "px", b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")"), o || b.notifyScrollEvent(b.win[0])
        }, this.setScrollLeft = function(e, o) {
          b.doc.translate.x = e, b.doc.translate.tx = e * n + "px", b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")"), o || b.notifyScrollEvent(b.win[0])
        })
      } else this.getScrollTop = function() {
        return b.docscroll.scrollTop()
      }, this.setScrollTop = function(e) {
        b.docscroll.scrollTop(e)
      }, this.getScrollLeft = function() {
        return b.hasreversehr ? b.detected.ismozilla ? b.page.maxw - Math.abs(b.docscroll.scrollLeft()) : b.page.maxw - b.docscroll.scrollLeft() : b.docscroll.scrollLeft()
      }, this.setScrollLeft = function(e) {
        return setTimeout(function() {
          if (b) return b.hasreversehr && (e = b.detected.ismozilla ? -(b.page.maxw - e) : b.page.maxw - e), b.docscroll.scrollLeft(e)
        }, 1)
      };
      this.getTarget = function(e) {
        return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
      }, this.hasParent = function(e, o) {
        if (!e) return !1;
        for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
        return !1 !== t
      };
      var l = {
        thin: 1,
        medium: 3,
        thick: 5
      };

      function a(e, o, t) {
        var r = e.css(o),
          i = parseFloat(r);
        if (isNaN(i)) {
          var s = 3 == (i = l[r] || 0) ? t ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1;
          return b.isie8 && i && (i += 1), s ? i : 0
        }
        return i
      }
      this.getDocumentScrollOffset = function() {
        return {
          top: _.pageYOffset || R.documentElement.scrollTop,
          left: _.pageXOffset || R.documentElement.scrollLeft
        }
      }, this.getOffset = function() {
        if (b.isfixed) {
          var e = b.win.offset(),
            o = b.getDocumentScrollOffset();
          return e.top -= o.top, e.left -= o.left, e
        }
        var t = b.win.offset();
        if (!b.viewport) return t;
        var r = b.viewport.offset();
        return {
          top: t.top - r.top,
          left: t.left - r.left
        }
      }, this.updateScrollBar = function(e) {
        var o, t;
        if (b.ishwscroll) b.rail.css({
          height: b.win.innerHeight() - (x.railpadding.top + x.railpadding.bottom)
        }), b.railh && b.railh.css({
          width: b.win.innerWidth() - (x.railpadding.left + x.railpadding.right)
        });
        else {
          var r = b.getOffset();
          if ((o = {
              top: r.top,
              left: r.left - (x.railpadding.left + x.railpadding.right)
            }).top += a(b.win, "border-top-width", !0), o.left += b.rail.align ? b.win.outerWidth() - a(b.win, "border-right-width") - b.rail.width : a(b.win, "border-left-width"), (t = x.railoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left)), b.railslocked || b.rail.css({
              top: o.top,
              left: o.left,
              height: (e ? e.h : b.win.innerHeight()) - (x.railpadding.top + x.railpadding.bottom)
            }), b.zoom && b.zoom.css({
              top: o.top + 1,
              left: 1 == b.rail.align ? o.left - 20 : o.left + b.rail.width + 4
            }), b.railh && !b.railslocked) {
            o = {
              top: r.top,
              left: r.left
            }, (t = x.railhoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left));
            var i = b.railh.align ? o.top + a(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : o.top + a(b.win, "border-top-width", !0),
              s = o.left + a(b.win, "border-left-width");
            b.railh.css({
              top: i - (x.railpadding.top + x.railpadding.bottom),
              left: s,
              width: b.railh.width
            })
          }
        }
      }, this.doRailClick = function(e, o, t) {
        var r, i, s, n;
        b.railslocked || (b.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + R.documentElement.scrollLeft, e.pageY = e.clientY + R.documentElement.scrollTop), o ? (r = t ? b.doScrollLeft : b.doScrollTop, s = t ? (e.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (e.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, b.unsynched("relativexy"), r(0 | s)) : (r = t ? b.doScrollLeftBy : b.doScrollBy, s = t ? b.scroll.x : b.scroll.y, n = t ? e.pageX - b.railh.offset().left : e.pageY - b.rail.offset().top, i = t ? b.view.w : b.view.h, r(n <= s ? i : -i)))
      }, b.newscrolly = b.newscrollx = 0, b.hasanimationframe = "requestAnimationFrame" in _, b.hascancelanimationframe = "cancelAnimationFrame" in _, b.hasborderbox = !1, this.init = function() {
        if (b.saved.css = [], S.isoperamini) return !0;
        if (S.isandroid && !("hidden" in R)) return !0;
        x.emulatetouch = x.emulatetouch || x.touchbehavior, b.hasborderbox = _.getComputedStyle && "border-box" === _.getComputedStyle(R.body)["box-sizing"];
        var t = {
          "overflow-y": "hidden"
        };
        if ((S.isie11 || S.isie10) && (t["-ms-overflow-style"] = "none"), b.ishwscroll && (this.doc.css(S.transitionstyle, S.prefixstyle + "transform 0ms ease-out"), S.transitionend && b.bind(b.doc, S.transitionend, b.onScrollTransitionEnd, !1)), b.zindex = "auto", b.ispage || "auto" != x.zindex ? b.zindex = x.zindex : b.zindex = function() {
            var e = b.win;
            if ("zIndex" in e) return e.zIndex();
            for (; 0 < e.length;) {
              if (9 == e[0].nodeType) return !1;
              var o = e.css("zIndex");
              if (!isNaN(o) && 0 !== o) return parseInt(o);
              e = e.parent()
            }
            return !1
          }() || "auto", !b.ispage && "auto" != b.zindex && b.zindex > N && (N = b.zindex), b.isie && 0 === b.zindex && "auto" == x.zindex && (b.zindex = "auto"), !b.ispage || !S.isieold) {
          var e = b.docscroll;
          b.ispage && (e = b.haswrapper ? b.win : b.doc), b.css(e, t), b.ispage && (S.isie11 || S.isie) && b.css(P("html"), t), !S.isios || b.ispage || b.haswrapper || b.css(y, {
            "-webkit-overflow-scrolling": "touch"
          });
          var o = P(R.createElement("div"));
          o.css({
            position: "relative",
            top: 0,
            float: "right",
            width: x.cursorwidth,
            height: 0,
            "background-color": x.cursorcolor,
            border: x.cursorborder,
            "background-clip": "padding-box",
            "-webkit-border-radius": x.cursorborderradius,
            "-moz-border-radius": x.cursorborderradius,
            "border-radius": x.cursorborderradius
          }), o.addClass("nicescroll-cursors"), b.cursor = o;
          var r = P(R.createElement("div"));
          r.attr("id", b.id), r.addClass("nicescroll-rails nicescroll-rails-vr");
          var i, s, n = ["left", "right", "top", "bottom"];
          for (var l in n) s = n[l], (i = x.railpadding[s] || 0) && r.css("padding-" + s, i + "px");
          r.append(o), r.width = Math.max(parseFloat(x.cursorwidth), o.outerWidth()), r.css({
            width: r.width + "px",
            zIndex: b.zindex,
            background: x.background,
            cursor: "default"
          }), r.visibility = !0, r.scrollable = !0, r.align = "left" == x.railalign ? 0 : 1, b.rail = r;
          var a, c = b.rail.drag = !1;
          if (!x.boxzoom || b.ispage || S.isieold || (c = R.createElement("div"), b.bind(c, "click", b.doZoom), b.bind(c, "mouseenter", function() {
              b.zoom.css("opacity", x.cursoropacitymax)
            }), b.bind(c, "mouseleave", function() {
              b.zoom.css("opacity", x.cursoropacitymin)
            }), b.zoom = P(c), b.zoom.css({
              cursor: "pointer",
              zIndex: b.zindex,
              backgroundImage: "url(" + x.scriptpath + "zoomico.png)",
              height: 18,
              width: 18,
              backgroundPosition: "0 0"
            }), x.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), S.cantouch && x.gesturezoom && (b.ongesturezoom = function(e) {
              return 1.5 < e.scale && b.doZoomIn(e), e.scale < .8 && b.doZoomOut(e), b.cancelEvent(e)
            }, b.bind(b.win, "gestureend", b.ongesturezoom))), b.railh = !1, x.horizrailenabled && (b.css(e, {
              overflowX: "hidden"
            }), (o = P(R.createElement("div"))).css({
              position: "absolute",
              top: 0,
              height: x.cursorwidth,
              width: 0,
              backgroundColor: x.cursorcolor,
              border: x.cursorborder,
              backgroundClip: "padding-box",
              "-webkit-border-radius": x.cursorborderradius,
              "-moz-border-radius": x.cursorborderradius,
              "border-radius": x.cursorborderradius
            }), S.isieold && o.css("overflow", "hidden"), o.addClass("nicescroll-cursors"), b.cursorh = o, (a = P(R.createElement("div"))).attr("id", b.id + "-hr"), a.addClass("nicescroll-rails nicescroll-rails-hr"), a.height = Math.max(parseFloat(x.cursorwidth), o.outerHeight()), a.css({
              height: a.height + "px",
              zIndex: b.zindex,
              background: x.background
            }), a.append(o), a.visibility = !0, a.scrollable = !0, a.align = "top" == x.railvalign ? 0 : 1, b.railh = a, b.railh.drag = !1), b.ispage) r.css({
            position: "fixed",
            top: 0,
            height: "100%"
          }), r.css(r.align ? {
            right: 0
          } : {
            left: 0
          }), b.body.append(r), b.railh && (a.css({
            position: "fixed",
            left: 0,
            width: "100%"
          }), a.css(a.align ? {
            bottom: 0
          } : {
            top: 0
          }), b.body.append(a));
          else {
            if (b.ishwscroll) {
              "static" == b.win.css("position") && b.css(b.win, {
                position: "relative"
              });
              var d = "HTML" == b.win[0].nodeName ? b.body : b.win;
              P(d).scrollTop(0).scrollLeft(0), b.zoom && (b.zoom.css({
                position: "absolute",
                top: 1,
                right: 0,
                "margin-right": r.width + 4
              }), d.append(b.zoom)), r.css({
                position: "absolute",
                top: 0
              }), r.css(r.align ? {
                right: 0
              } : {
                left: 0
              }), d.append(r), a && (a.css({
                position: "absolute",
                left: 0,
                bottom: 0
              }), a.css(a.align ? {
                bottom: 0
              } : {
                top: 0
              }), d.append(a))
            } else {
              b.isfixed = "fixed" == b.win.css("position");
              var u = b.isfixed ? "fixed" : "absolute";
              b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, /fixed|absolute/.test(b.viewport.css("position")) || b.css(b.viewport, {
                position: "relative"
              })), r.css({
                position: u
              }), b.zoom && b.zoom.css({
                position: u
              }), b.updateScrollBar(), b.body.append(r), b.zoom && b.body.append(b.zoom), b.railh && (a.css({
                position: u
              }), b.body.append(a))
            }
            S.isios && b.css(b.win, {
              "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
              "-webkit-touch-callout": "none"
            }), x.disableoutline && (S.isie && b.win.attr("hideFocus", "true"), S.iswebkit && b.win.css("outline", "none"))
          }
          if (!1 === x.autohidemode ? (b.autohidedom = !1, b.rail.css({
              opacity: x.cursoropacitymax
            }), b.railh && b.railh.css({
              opacity: x.cursoropacitymax
            })) : !0 === x.autohidemode || "leave" === x.autohidemode ? (b.autohidedom = P().add(b.rail), S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), b.railh && S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == x.autohidemode ? (b.autohidedom = P().add(b.rail), b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == x.autohidemode ? (b.autohidedom = P().add(b.cursor), b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == x.autohidemode && (b.autohidedom = !1, b.hide(), b.railslocked = !1), S.cantouch || b.istouchcapable || x.emulatetouch || S.hasmstouch) {
            b.scrollmom = new q(b);
            b.ontouchstart = function(e) {
              if (b.locked) return !1;
              if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
              if (b.hasmoving = !1, b.scrollmom.timer && (b.triggerScrollEnd(), b.scrollmom.stop()), !b.railslocked) {
                var o = b.getTarget(e);
                if (o)
                  if (/INPUT/i.test(o.nodeName) && /range/i.test(o.type)) return b.stopPropagation(e);
                var t = "mousedown" === e.type;
                if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), b.forcescreen) {
                  var r = e;
                  (e = {
                    original: e.original ? e.original : e
                  }).clientX = r.screenX, e.clientY = r.screenY
                }
                if (b.rail.drag = {
                    x: e.clientX,
                    y: e.clientY,
                    sx: b.scroll.x,
                    sy: b.scroll.y,
                    st: b.getScrollTop(),
                    sl: b.getScrollLeft(),
                    pt: 2,
                    dl: !1,
                    tg: o
                  }, b.ispage || !x.directionlockdeadzone) b.rail.drag.dl = "f";
                else {
                  var i = I.width(),
                    s = I.height(),
                    n = b.getContentSize(),
                    l = n.h - s,
                    a = n.w - i;
                  b.rail.scrollable && !b.railh.scrollable ? b.rail.drag.ck = 0 < l && "v" : !b.rail.scrollable && b.railh.scrollable ? b.rail.drag.ck = 0 < a && "h" : b.rail.drag.ck = !1
                }
                if (x.emulatetouch && b.isiframe && S.isie) {
                  var c = b.win.position();
                  b.rail.drag.x += c.left, b.rail.drag.y += c.top
                }
                if (b.hasmoving = !1, b.lastmouseup = !1, b.scrollmom.reset(e.clientX, e.clientY), o && t) {
                  if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName)) return S.hasmousecapture && o.setCapture(), x.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function(e) {
                    if (b.hasmoving) return !1;
                    o._onclick.call(this, e)
                  }), b.cancelEvent(e)) : b.stopPropagation(e);
                  /SUBMIT|CANCEL|BUTTON/i.test(P(o).attr("type")) && (b.preventclick = {
                    tg: o,
                    click: !1
                  })
                }
              }
            }, b.ontouchend = function(e) {
              if (!b.rail.drag) return !0;
              if (2 == b.rail.drag.pt) {
                if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                b.rail.drag = !1;
                var o = "mouseup" === e.type;
                if (b.hasmoving && (b.scrollmom.doMomentum(), b.lastmouseup = !0, b.hideCursor(), S.hasmousecapture && R.releaseCapture(), o)) return b.cancelEvent(e)
              } else if (1 == b.rail.drag.pt) return b.onmouseup(e)
            };
            var m = x.emulatetouch && b.isiframe && !S.hasmousecapture,
              f = .3 * x.directionlockdeadzone | 0;
            b.ontouchmove = function(e, o) {
              if (!b.rail.drag) return !0;
              if (e.targetTouches && x.preventmultitouchscrolling && 1 < e.targetTouches.length) return !0;
              if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !0;
              if (2 != b.rail.drag.pt) return 1 == b.rail.drag.pt ? b.onmousemove(e) : void 0;
              var t, r;
              if ("changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), r = t = 0, m && !o) {
                var i = b.win.position();
                r = -i.left, t = -i.top
              }
              var s = e.clientY + t,
                n = s - b.rail.drag.y,
                l = e.clientX + r,
                a = l - b.rail.drag.x,
                c = b.rail.drag.st - n;
              if (b.ishwscroll && x.bouncescroll) c < 0 ? c = Math.round(c / 2) : c > b.page.maxh && (c = b.page.maxh + Math.round((c - b.page.maxh) / 2));
              else if (c < 0 ? s = c = 0 : c > b.page.maxh && (c = b.page.maxh, s = 0), 0 === s && !b.hasmoving) return b.ispage || (b.rail.drag = !1), !0;
              var d = b.getScrollLeft();
              if (b.railh && b.railh.scrollable && (d = b.isrtlmode ? a - b.rail.drag.sl : b.rail.drag.sl - a, b.ishwscroll && x.bouncescroll ? d < 0 ? d = Math.round(d / 2) : d > b.page.maxw && (d = b.page.maxw + Math.round((d - b.page.maxw) / 2)) : (d < 0 && (l = d = 0), d > b.page.maxw && (d = b.page.maxw, l = 0))), !b.hasmoving) {
                if (b.rail.drag.y === e.clientY && b.rail.drag.x === e.clientX) return b.cancelEvent(e);
                var u = Math.abs(n),
                  h = Math.abs(a),
                  p = x.directionlockdeadzone;
                if (b.rail.drag.ck ? "v" == b.rail.drag.ck ? p < h && u <= f ? b.rail.drag = !1 : p < u && (b.rail.drag.dl = "v") : "h" == b.rail.drag.ck && (p < u && h <= f ? b.rail.drag = !1 : p < h && (b.rail.drag.dl = "h")) : p < u && p < h ? b.rail.drag.dl = "f" : p < u ? b.rail.drag.dl = f < h ? "f" : "v" : p < h && (b.rail.drag.dl = f < u ? "f" : "h"), !b.rail.drag.dl) return b.cancelEvent(e);
                b.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), b.hasmoving = !0
              }
              return b.preventclick && !b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick || !1, b.preventclick.tg.onclick = b.onpreventclick), b.rail.drag.dl && ("v" == b.rail.drag.dl ? d = b.rail.drag.sl : "h" == b.rail.drag.dl && (c = b.rail.drag.st)), b.synched("touchmove", function() {
                b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.resetTransition(), b.rail.scrollable && b.setScrollTop(c), b.scrollmom.update(l, s), b.railh && b.railh.scrollable ? (b.setScrollLeft(d), b.showCursor(c, d)) : b.showCursor(c), S.isie10 && R.selection.clear())
              }), b.cancelEvent(e)
            }, b.ontouchstartCursor = function(e, o) {
              if (!b.rail.drag || 3 == b.rail.drag.pt) {
                if (b.locked) return b.cancelEvent(e);
                b.cancelScroll(), b.rail.drag = {
                  x: e.touches[0].clientX,
                  y: e.touches[0].clientY,
                  sx: b.scroll.x,
                  sy: b.scroll.y,
                  pt: 3,
                  hr: !!o
                };
                var t = b.getTarget(e);
                return !b.ispage && S.hasmousecapture && t.setCapture(), b.isiframe && !S.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, {
                  "pointer-events": "none"
                })), b.cancelEvent(e)
              }
            }, b.ontouchendCursor = function(e) {
              if (b.rail.drag) {
                if (S.hasmousecapture && R.releaseCapture(), b.isiframe && !S.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), 3 != b.rail.drag.pt) return;
                return b.rail.drag = !1, b.cancelEvent(e)
              }
            }, b.ontouchmoveCursor = function(e) {
              if (b.rail.drag) {
                if (3 != b.rail.drag.pt) return;
                if (b.cursorfreezed = !0, b.rail.drag.hr) {
                  b.scroll.x = b.rail.drag.sx + (e.touches[0].clientX - b.rail.drag.x), b.scroll.x < 0 && (b.scroll.x = 0);
                  var o = b.scrollvaluemaxw;
                  b.scroll.x > o && (b.scroll.x = o)
                } else {
                  b.scroll.y = b.rail.drag.sy + (e.touches[0].clientY - b.rail.drag.y), b.scroll.y < 0 && (b.scroll.y = 0);
                  var t = b.scrollvaluemax;
                  b.scroll.y > t && (b.scroll.y = t)
                }
                return b.synched("touchmove", function() {
                  b.rail.drag && 3 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.doScrollLeft(Math.round(b.scroll.x * b.scrollratio.x), x.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), x.cursordragspeed))
                }), b.cancelEvent(e)
              }
            }
          }
          if (b.onmousedown = function(e, o) {
              if (!b.rail.drag || 1 == b.rail.drag.pt) {
                if (b.railslocked) return b.cancelEvent(e);
                b.cancelScroll(), b.rail.drag = {
                  x: e.clientX,
                  y: e.clientY,
                  sx: b.scroll.x,
                  sy: b.scroll.y,
                  pt: 1,
                  hr: o || !1
                };
                var t = b.getTarget(e);
                return S.hasmousecapture && t.setCapture(), b.isiframe && !S.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, {
                  "pointer-events": "none"
                })), b.hasmoving = !1, b.cancelEvent(e)
              }
            }, b.onmouseup = function(e) {
              if (b.rail.drag) return 1 != b.rail.drag.pt || (S.hasmousecapture && R.releaseCapture(), b.isiframe && !S.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), b.rail.drag = !1, b.cursorfreezed = !1, b.hasmoving && b.triggerScrollEnd(), b.cancelEvent(e))
            }, b.onmousemove = function(e) {
              if (b.rail.drag) {
                if (1 !== b.rail.drag.pt) return;
                if (S.ischrome && 0 === e.which) return b.onmouseup(e);
                if (b.cursorfreezed = !0, b.hasmoving || b.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), b.hasmoving = !0, b.rail.drag.hr) {
                  b.scroll.x = b.rail.drag.sx + (e.clientX - b.rail.drag.x), b.scroll.x < 0 && (b.scroll.x = 0);
                  var o = b.scrollvaluemaxw;
                  b.scroll.x > o && (b.scroll.x = o)
                } else {
                  b.scroll.y = b.rail.drag.sy + (e.clientY - b.rail.drag.y), b.scroll.y < 0 && (b.scroll.y = 0);
                  var t = b.scrollvaluemax;
                  b.scroll.y > t && (b.scroll.y = t)
                }
                return b.synched("mousemove", function() {
                  b.cursorfreezed && (b.showCursor(), b.rail.drag.hr ? b.scrollLeft(Math.round(b.scroll.x * b.scrollratio.x)) : b.scrollTop(Math.round(b.scroll.y * b.scrollratio.y)))
                }), b.cancelEvent(e)
              }
              b.checkarea = 0
            }, S.cantouch || x.emulatetouch) b.onpreventclick = function(e) {
            if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = !1, b.cancelEvent(e)
          }, b.onclick = !S.isios && function(e) {
            return !b.lastmouseup || (b.lastmouseup = !1, b.cancelEvent(e))
          }, x.grabcursorenabled && S.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, {
            cursor: S.cursorgrabvalue
          }), b.css(b.rail, {
            cursor: S.cursorgrabvalue
          }));
          else {
            var h = function(e) {
              if (b.selectiondrag) {
                if (e) {
                  var o = b.win.outerHeight(),
                    t = e.pageY - b.selectiondrag.top;
                  0 < t && t < o && (t = 0), o <= t && (t -= o), b.selectiondrag.df = t
                }
                if (0 !== b.selectiondrag.df) {
                  var r = -2 * b.selectiondrag.df / 6 | 0;
                  b.doScrollBy(r), b.debounced("doselectionscroll", function() {
                    h()
                  }, 50)
                }
              }
            };
            b.hasTextSelected = "getSelection" in R ? function() {
              return 0 < R.getSelection().rangeCount
            } : "selection" in R ? function() {
              return "None" != R.selection.type
            } : function() {
              return !1
            }, b.onselectionstart = function(e) {
              b.ispage || (b.selectiondrag = b.win.offset())
            }, b.onselectionend = function(e) {
              b.selectiondrag = !1
            }, b.onselectiondrag = function(e) {
              b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function() {
                h(e)
              }, 250)
            }
          }
          if (S.hasw3ctouch ? (b.css(b.ispage ? P("html") : b.win, {
              "touch-action": "none"
            }), b.css(b.rail, {
              "touch-action": "none"
            }), b.css(b.cursor, {
              "touch-action": "none"
            }), b.bind(b.win, "pointerdown", b.ontouchstart), b.bind(R, "pointerup", b.ontouchend), b.delegate(R, "pointermove", b.ontouchmove)) : S.hasmstouch ? (b.css(b.ispage ? P("html") : b.win, {
              "-ms-touch-action": "none"
            }), b.css(b.rail, {
              "-ms-touch-action": "none"
            }), b.css(b.cursor, {
              "-ms-touch-action": "none"
            }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(R, "MSPointerUp", b.ontouchend), b.delegate(R, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(e) {
              e.preventDefault()
            }), b.bind(b.cursor, "contextmenu", function(e) {
              e.preventDefault()
            })) : S.cantouch && (b.bind(b.win, "touchstart", b.ontouchstart, !1, !0), b.bind(R, "touchend", b.ontouchend, !1, !0), b.bind(R, "touchcancel", b.ontouchend, !1, !0), b.delegate(R, "touchmove", b.ontouchmove, !1, !0)), x.emulatetouch && (b.bind(b.win, "mousedown", b.ontouchstart, !1, !0), b.bind(R, "mouseup", b.ontouchend, !1, !0), b.bind(R, "mousemove", b.ontouchmove, !1, !0)), (x.cursordragontouch || !S.cantouch && !x.emulatetouch) && (b.rail.css({
              cursor: "default"
            }), b.railh && b.railh.css({
              cursor: "default"
            }), b.jqbind(b.rail, "mouseenter", function() {
              if (!b.ispage && !b.win.is(":visible")) return !1;
              b.canshowonmouseevent && b.showCursor(), b.rail.active = !0
            }), b.jqbind(b.rail, "mouseleave", function() {
              b.rail.active = !1, b.rail.drag || b.hideCursor()
            }), x.sensitiverail && (b.bind(b.rail, "click", function(e) {
              b.doRailClick(e, !1, !1)
            }), b.bind(b.rail, "dblclick", function(e) {
              b.doRailClick(e, !0, !1)
            }), b.bind(b.cursor, "click", function(e) {
              b.cancelEvent(e)
            }), b.bind(b.cursor, "dblclick", function(e) {
              b.cancelEvent(e)
            })), b.railh && (b.jqbind(b.railh, "mouseenter", function() {
              if (!b.ispage && !b.win.is(":visible")) return !1;
              b.canshowonmouseevent && b.showCursor(), b.rail.active = !0
            }), b.jqbind(b.railh, "mouseleave", function() {
              b.rail.active = !1, b.rail.drag || b.hideCursor()
            }), x.sensitiverail && (b.bind(b.railh, "click", function(e) {
              b.doRailClick(e, !1, !0)
            }), b.bind(b.railh, "dblclick", function(e) {
              b.doRailClick(e, !0, !0)
            }), b.bind(b.cursorh, "click", function(e) {
              b.cancelEvent(e)
            }), b.bind(b.cursorh, "dblclick", function(e) {
              b.cancelEvent(e)
            })))), x.cursordragontouch && (this.istouchcapable || S.cantouch) && (b.bind(b.cursor, "touchstart", b.ontouchstartCursor), b.bind(b.cursor, "touchmove", b.ontouchmoveCursor), b.bind(b.cursor, "touchend", b.ontouchendCursor), b.cursorh && b.bind(b.cursorh, "touchstart", function(e) {
              b.ontouchstartCursor(e, !0)
            }), b.cursorh && b.bind(b.cursorh, "touchmove", b.ontouchmoveCursor), b.cursorh && b.bind(b.cursorh, "touchend", b.ontouchendCursor)), x.emulatetouch || S.isandroid || S.isios ? (b.bind(S.hasmousecapture ? b.win : R, "mouseup", b.ontouchend), b.onclick && b.bind(R, "click", b.onclick), x.cursordragontouch ? (b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mouseup", b.onmouseup), b.cursorh && b.bind(b.cursorh, "mousedown", function(e) {
              b.onmousedown(e, !0)
            }), b.cursorh && b.bind(b.cursorh, "mouseup", b.onmouseup)) : (b.bind(b.rail, "mousedown", function(e) {
              e.preventDefault()
            }), b.railh && b.bind(b.railh, "mousedown", function(e) {
              e.preventDefault()
            }))) : (b.bind(S.hasmousecapture ? b.win : R, "mouseup", b.onmouseup), b.bind(R, "mousemove", b.onmousemove), b.onclick && b.bind(R, "click", b.onclick), b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mouseup", b.onmouseup), b.railh && (b.bind(b.cursorh, "mousedown", function(e) {
              b.onmousedown(e, !0)
            }), b.bind(b.cursorh, "mouseup", b.onmouseup)), !b.ispage && x.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), b.bind(R, "mouseup", b.onselectionend), b.bind(b.cursor, "mouseup", b.onselectionend), b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(R, "mousemove", b.onselectiondrag)), b.zoom && (b.jqbind(b.zoom, "mouseenter", function() {
              b.canshowonmouseevent && b.showCursor(), b.rail.active = !0
            }), b.jqbind(b.zoom, "mouseleave", function() {
              b.rail.active = !1, b.rail.drag || b.hideCursor()
            }))), x.enablemousewheel && (b.isiframe || b.mousewheel(S.isie && b.ispage ? R : b.win, b.onmousewheel), b.mousewheel(b.rail, b.onmousewheel), b.railh && b.mousewheel(b.railh, b.onmousewheelhr)), b.ispage || S.cantouch || /HTML|^BODY/.test(b.win[0].nodeName) || (b.win.attr("tabindex") || b.win.attr({
              tabindex: ++L
            }), b.bind(b.win, "focus", function(e) {
              E = b.getTarget(e).id || b.getTarget(e) || !1, b.hasfocus = !0, b.canshowonmouseevent && b.noticeCursor()
            }), b.bind(b.win, "blur", function(e) {
              E = !1, b.hasfocus = !1
            }), b.bind(b.win, "mouseenter", function(e) {
              M = b.getTarget(e).id || b.getTarget(e) || !1, b.hasmousefocus = !0, b.canshowonmouseevent && b.noticeCursor()
            }), b.bind(b.win, "mouseleave", function(e) {
              M = !1, b.hasmousefocus = !1, b.rail.drag || b.hideCursor()
            })), b.onkeypress = function(e) {
              if (b.railslocked && 0 === b.page.maxh) return !0;
              e = e || _.event;
              var o = b.getTarget(e);
              if (o && /INPUT|TEXTAREA|SELECT|OPTION/.test(o.nodeName) && (!(o.getAttribute("type") || o.type || !1) || !/submit|button|cancel/i.tp)) return !0;
              if (P(o).attr("contenteditable")) return !0;
              if (b.hasfocus || b.hasmousefocus && !E || b.ispage && !E && !M) {
                var t = e.keyCode;
                if (b.railslocked && 27 != t) return b.cancelEvent(e);
                var r = e.ctrlKey || !1,
                  i = e.shiftKey || !1,
                  s = !1;
                switch (t) {
                  case 38:
                  case 63233:
                    b.doScrollBy(72), s = !0;
                    break;
                  case 40:
                  case 63235:
                    b.doScrollBy(-72), s = !0;
                    break;
                  case 37:
                  case 63232:
                    b.railh && (r ? b.doScrollLeft(0) : b.doScrollLeftBy(72), s = !0);
                    break;
                  case 39:
                  case 63234:
                    b.railh && (r ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72), s = !0);
                    break;
                  case 33:
                  case 63276:
                    b.doScrollBy(b.view.h), s = !0;
                    break;
                  case 34:
                  case 63277:
                    b.doScrollBy(-b.view.h), s = !0;
                    break;
                  case 36:
                  case 63273:
                    b.railh && r ? b.doScrollPos(0, 0) : b.doScrollTo(0), s = !0;
                    break;
                  case 35:
                  case 63275:
                    b.railh && r ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh), s = !0;
                    break;
                  case 32:
                    x.spacebarenabled && (i ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h), s = !0);
                    break;
                  case 27:
                    b.zoomactive && (b.doZoom(), s = !0)
                }
                if (s) return b.cancelEvent(e)
              }
            }, x.enablekeyboard && b.bind(R, S.isopera && !S.isopera12 ? "keypress" : "keydown", b.onkeypress), b.bind(R, "keydown", function(e) {
              (e.ctrlKey || !1) && (b.wheelprevented = !0)
            }), b.bind(R, "keyup", function(e) {
              e.ctrlKey || !1 || (b.wheelprevented = !1)
            }), b.bind(_, "blur", function(e) {
              b.wheelprevented = !1
            }), b.bind(_, "resize", b.onscreenresize), b.bind(_, "orientationchange", b.onscreenresize), b.bind(_, "load", b.lazyResize), S.ischrome && !b.ispage && !b.haswrapper) {
            var p = b.win.attr("style"),
              g = parseFloat(b.win.css("width")) + 1;
            b.win.css("width", g), b.synched("chromefix", function() {
              b.win.attr("style", p)
            })
          }
          if (b.onAttributeChange = function(e) {
              b.lazyResize(b.isieold ? 250 : 30)
            }, x.enableobserver && (b.isie11 || !1 === B || (b.observerbody = new B(function(e) {
              if (e.forEach(function(e) {
                  if ("attributes" == e.type) return y.hasClass("modal-open") && y.hasClass("modal-dialog") && !P.contains(P(".modal-dialog")[0], b.doc[0]) ? b.hide() : b.show()
                }), b.me.clientWidth != b.page.width || b.me.clientHeight != b.page.height) return b.lazyResize(30)
            }), b.observerbody.observe(R.body, {
              childList: !0,
              subtree: !0,
              characterData: !1,
              attributes: !0,
              attributeFilter: ["class"]
            })), !b.ispage && !b.haswrapper)) {
            var v = b.win[0];
            !1 !== B ? (b.observer = new B(function(e) {
              e.forEach(b.onAttributeChange)
            }), b.observer.observe(v, {
              childList: !0,
              characterData: !1,
              attributes: !0,
              subtree: !1
            }), b.observerremover = new B(function(e) {
              e.forEach(function(e) {
                if (0 < e.removedNodes.length)
                  for (var o in e.removedNodes)
                    if (b && e.removedNodes[o] === v) return b.remove()
              })
            }), b.observerremover.observe(v.parentNode, {
              childList: !0,
              characterData: !1,
              attributes: !1,
              subtree: !1
            })) : (b.bind(v, S.isie && !S.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), S.isie9 && v.attachEvent("onpropertychange", b.onAttributeChange), b.bind(v, "DOMNodeRemoved", function(e) {
              e.target === v && b.remove()
            }))
          }!b.ispage && x.boxzoom && b.bind(_, "resize", b.resizeZoom), b.istextarea && (b.bind(b.win, "keydown", b.lazyResize), b.bind(b.win, "mouseup", b.lazyResize)), b.lazyResize(30)
        }
        if ("IFRAME" == this.doc[0].nodeName) {
          var w = function() {
            var o;
            b.iframexd = !1;
            try {
              (o = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain
            } catch (e) {
              o = !(b.iframexd = !0)
            }
            if (b.iframexd) return "console" in _ && console.log("NiceScroll error: policy restriced iframe"), !0;
            if (b.forcescreen = !0, b.isiframe && (b.iframe = {
                doc: P(o),
                html: b.doc.contents().find("html")[0],
                body: b.doc.contents().find("body")[0]
              }, b.getContentSize = function() {
                return {
                  w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
                  h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight)
                }
              }, b.docscroll = P(b.iframe.body)), !S.isios && x.iframeautoresize && !b.isiframe) {
              b.win.scrollTop(0), b.doc.height("");
              var e = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
              b.doc.height(e)
            }
            b.lazyResize(30), b.css(P(b.iframe.body), t), S.isios && b.haswrapper && b.css(P(o.body), {
              "-webkit-transform": "translate3d(0,0,0)"
            }), "contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(o, "scroll", b.onscroll), x.enablemousewheel && b.mousewheel(o, b.onmousewheel), x.enablekeyboard && b.bind(o, S.isopera ? "keypress" : "keydown", b.onkeypress), S.cantouch ? (b.bind(o, "touchstart", b.ontouchstart), b.bind(o, "touchmove", b.ontouchmove)) : x.emulatetouch && (b.bind(o, "mousedown", b.ontouchstart), b.bind(o, "mousemove", function(e) {
              return b.ontouchmove(e, !0)
            }), x.grabcursorenabled && S.cursorgrabvalue && b.css(P(o.body), {
              cursor: S.cursorgrabvalue
            })), b.bind(o, "mouseup", b.ontouchend), b.zoom && (x.dblclickzoom && b.bind(o, "dblclick", b.doZoom), b.ongesturezoom && b.bind(o, "gestureend", b.ongesturezoom))
          };
          this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function() {
            w.call(b.doc[0], !1)
          }, 100), b.bind(this.doc, "load", w)
        }
      }, this.showCursor = function(e, o) {
        if (b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0), b.rail) {
          if (b.autohidedom && (b.autohidedom.stop().css({
              opacity: x.cursoropacitymax
            }), b.cursoractive = !0), b.rail.drag && 1 == b.rail.drag.pt || (void 0 !== e && !1 !== e && (b.scroll.y = e / b.scrollratio.y | 0), void 0 !== o && (b.scroll.x = o / b.scrollratio.x | 0)), b.cursor.css({
              height: b.cursorheight,
              top: b.scroll.y
            }), b.cursorh) {
            var t = b.hasreversehr ? b.scrollvaluemaxw - b.scroll.x : b.scroll.x;
            b.cursorh.css({
              width: b.cursorwidth,
              left: !b.rail.align && b.rail.visibility ? t + b.rail.width : t
            }), b.cursoractive = !0
          }
          b.zoom && b.zoom.stop().css({
            opacity: x.cursoropacitymax
          })
        }
      }, this.hideCursor = function(e) {
        b.cursortimeout || b.rail && b.autohidedom && (b.hasmousefocus && "leave" === x.autohidemode || (b.cursortimeout = setTimeout(function() {
          b.rail.active && b.showonmouseevent || (b.autohidedom.stop().animate({
            opacity: x.cursoropacitymin
          }), b.zoom && b.zoom.stop().animate({
            opacity: x.cursoropacitymin
          }), b.cursoractive = !1), b.cursortimeout = 0
        }, e || x.hidecursordelay)))
      }, this.noticeCursor = function(e, o, t) {
        b.showCursor(o, t), b.rail.active || b.hideCursor(e)
      }, this.getContentSize = b.ispage ? function() {
        return {
          w: Math.max(R.body.scrollWidth, R.documentElement.scrollWidth),
          h: Math.max(R.body.scrollHeight, R.documentElement.scrollHeight)
        }
      } : b.haswrapper ? function() {
        return {
          w: b.doc[0].offsetWidth,
          h: b.doc[0].offsetHeight
        }
      } : function() {
        return {
          w: b.docscroll[0].scrollWidth,
          h: b.docscroll[0].scrollHeight
        }
      }, this.onResize = function(e, o) {
        if (!b || !b.win) return !1;
        var t = b.page.maxh,
          r = b.page.maxw,
          i = b.view.h,
          s = b.view.w;
        if (b.view = {
            w: b.ispage ? b.win.width() : b.win[0].clientWidth,
            h: b.ispage ? b.win.height() : b.win[0].clientHeight
          }, b.page = o || b.getContentSize(), b.page.maxh = Math.max(0, b.page.h - b.view.h), b.page.maxw = Math.max(0, b.page.w - b.view.w), b.page.maxh == t && b.page.maxw == r && b.view.w == s && b.view.h == i) {
          if (b.ispage) return b;
          var n = b.win.offset();
          if (b.lastposition) {
            var l = b.lastposition;
            if (l.top == n.top && l.left == n.left) return b
          }
          b.lastposition = n
        }
        return 0 === b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, b.cursorheight = 0, b.setScrollTop(0), b.rail && (b.rail.scrollable = !1)) : (b.page.maxh -= x.railpadding.top + x.railpadding.bottom, b.rail.scrollable = !0), 0 === b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, b.cursorwidth = 0, b.setScrollLeft(0), b.railh && (b.railh.scrollable = !1)) : (b.page.maxw -= x.railpadding.left + x.railpadding.right, b.railh && (b.railh.scrollable = x.horizrailenabled)), b.railslocked = b.locked || 0 === b.page.maxh && 0 === b.page.maxw, b.railslocked ? (b.ispage || b.updateScrollBar(b.view), !1) : (b.hidden || (b.rail.visibility || b.showRail(), b.railh && !b.railh.visibility && b.showRailHr()), b.istextarea && b.win.css("resize") && "none" != b.win.css("resize") && (b.view.h -= 20), b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h))), b.cursorheight = x.cursorfixedheight ? x.cursorfixedheight : Math.max(x.cursorminheight, b.cursorheight), b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w * (b.view.w / b.page.w))), b.cursorwidth = x.cursorfixedheight ? x.cursorfixedheight : Math.max(x.cursorminheight, b.cursorwidth), b.scrollvaluemax = b.view.h - b.cursorheight - (x.railpadding.top + x.railpadding.bottom), b.hasborderbox || (b.scrollvaluemax -= b.cursor[0].offsetHeight - b.cursor[0].clientHeight), b.railh && (b.railh.width = 0 < b.page.maxh ? b.rail.width : b.view.w, b.scrollvaluemaxw = b.railh.width - b.cursorwidth - (x.railpadding.left + x.railpadding.right)), b.ispage || b.updateScrollBar(b.view), b.scrollratio = {
          x: b.page.maxw / b.scrollvaluemaxw,
          y: b.page.maxh / b.scrollvaluemax
        }, b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = b.getScrollTop() / b.scrollratio.y | 0, b.scroll.x = b.getScrollLeft() / b.scrollratio.x | 0, b.cursoractive && b.noticeCursor()), b.scroll.y && 0 === b.getScrollTop() && b.doScrollTo(b.scroll.y * b.scrollratio.y | 0), b)
      }, this.resize = b.onResize;
      var c = 0;

      function u(t, r, i, e) {
        b._bind(t, r, function(e) {
          var o = {
            original: e = e || _.event,
            target: e.target || e.srcElement,
            type: "wheel",
            deltaMode: "MozMousePixelScroll" == e.type ? 0 : 1,
            deltaX: 0,
            deltaZ: 0,
            preventDefault: function() {
              return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            },
            stopImmediatePropagation: function() {
              e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.cancelBubble = !0
            }
          };
          return "mousewheel" == r ? (e.wheelDeltaX && (o.deltaX = -.025 * e.wheelDeltaX), e.wheelDeltaY && (o.deltaY = -.025 * e.wheelDeltaY), !o.deltaY && !o.deltaX && (o.deltaY = -.025 * e.wheelDelta)) : o.deltaY = e.detail, i.call(t, o)
        }, e)
      }
      this.onscreenresize = function(e) {
        clearTimeout(c);
        var o = !b.ispage && !b.haswrapper;
        o && b.hideRails(), c = setTimeout(function() {
          b && (o && b.showRails(), b.resize()), c = 0
        }, 100)
      }, this.lazyResize = function(e) {
        return clearTimeout(c), e = isNaN(e) ? 240 : e, c = setTimeout(function() {
          b && b.resize(), c = 0
        }, e), b
      }, this.jqbind = function(e, o, t) {
        b.events.push({
          e: e,
          n: o,
          f: t,
          q: !0
        }), P(e).on(o, t)
      };
      var h = !(this.mousewheel = function(e, o, t) {
        var r = "jquery" in e ? e[0] : e;
        if ("onwheel" in R.createElement("div")) b._bind(r, "wheel", o, t || !1);
        else {
          var i = void 0 !== R.onmousewheel ? "mousewheel" : "DOMMouseScroll";
          u(r, i, o, t || !1), "DOMMouseScroll" == i && u(r, "MozMousePixelScroll", o, t || !1)
        }
      });
      if (S.haseventlistener) {
        try {
          var p = Object.defineProperty({}, "passive", {
            get: function() {
              h = !0
            }
          });
          _.addEventListener("test", null, p)
        } catch (e) {}
        this.stopPropagation = function(e) {
          return e && (e = e.original ? e.original : e).stopPropagation(), !1
        }, this.cancelEvent = function(e) {
          return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1
        }
      } else Event.prototype.preventDefault = function() {
        this.returnValue = !1
      }, Event.prototype.stopPropagation = function() {
        this.cancelBubble = !0
      }, _.constructor.prototype.addEventListener = R.constructor.prototype.addEventListener = Element.prototype.addEventListener = function(e, o, t) {
        this.attachEvent("on" + e, o)
      }, _.constructor.prototype.removeEventListener = R.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function(e, o, t) {
        this.detachEvent("on" + e, o)
      }, this.cancelEvent = function(e) {
        return (e = e || _.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1
      }, this.stopPropagation = function(e) {
        return (e = e || _.event) && (e.cancelBubble = !0), !1
      };
      this.delegate = function(e, o, t, r, i) {
        var s = O[o] || !1;
        s || (s = {
          a: [],
          l: [],
          f: function(e) {
            for (var o = s.l, t = !1, r = o.length - 1; 0 <= r; r--)
              if (!1 === (t = o[r].call(e.target, e))) return !1;
            return t
          }
        }, b.bind(e, o, s.f, r, i), O[o] = s), b.ispage ? (s.a = [b.id].concat(s.a), s.l = [t].concat(s.l)) : (s.a.push(b.id), s.l.push(t))
      }, this.undelegate = function(e, o, t, r, i) {
        var s = O[o] || !1;
        if (s && s.l)
          for (var n = 0, l = s.l.length; n < l; n++) s.a[n] === b.id && (s.a.splice(n), s.l.splice(n), 0 === s.a.length && (b._unbind(e, o, s.l.f), O[o] = null))
      }, this.bind = function(e, o, t, r, i) {
        var s = "jquery" in e ? e[0] : e;
        b._bind(s, o, t, r || !1, i || !1)
      }, this._bind = function(e, o, t, r, i) {
        b.events.push({
          e: e,
          n: o,
          f: t,
          b: r,
          q: !1
        }), h && i ? e.addEventListener(o, t, {
          passive: !1,
          capture: r
        }) : e.addEventListener(o, t, r || !1)
      }, this._unbind = function(e, o, t, r) {
        O[o] ? b.undelegate(e, o, t, r) : e.removeEventListener(o, t, r)
      }, this.unbindAll = function() {
        for (var e = 0; e < b.events.length; e++) {
          var o = b.events[e];
          o.q ? o.e.unbind(o.n, o.f) : b._unbind(o.e, o.n, o.f, o.b)
        }
      }, this.showRails = function() {
        return b.showRail().showRailHr()
      }, this.showRail = function() {
        return 0 === b.page.maxh || !b.ispage && "none" == b.win.css("display") || (b.rail.visibility = !0, b.rail.css("display", "block")), b
      }, this.showRailHr = function() {
        return b.railh && (0 === b.page.maxw || !b.ispage && "none" == b.win.css("display") || (b.railh.visibility = !0, b.railh.css("display", "block"))), b
      }, this.hideRails = function() {
        return b.hideRail().hideRailHr()
      }, this.hideRail = function() {
        return b.rail.visibility = !1, b.rail.css("display", "none"), b
      }, this.hideRailHr = function() {
        return b.railh && (b.railh.visibility = !1, b.railh.css("display", "none")), b
      }, this.show = function() {
        return b.hidden = !1, b.railslocked = !1, b.showRails()
      }, this.hide = function() {
        return b.hidden = !0, b.railslocked = !0, b.hideRails()
      }, this.toggle = function() {
        return b.hidden ? b.show() : b.hide()
      }, this.remove = function() {
        for (var e in b.stop(), b.cursortimeout && clearTimeout(b.cursortimeout), b.delaylist) b.delaylist[e] && H(b.delaylist[e].h);
        b.doZoomOut(), b.unbindAll(), S.isie9 && b.win[0].detachEvent("onpropertychange", b.onAttributeChange), !1 !== b.observer && b.observer.disconnect(), !1 !== b.observerremover && b.observerremover.disconnect(), !1 !== b.observerbody && b.observerbody.disconnect(), b.events = null, b.cursor && b.cursor.remove(), b.cursorh && b.cursorh.remove(), b.rail && b.rail.remove(), b.railh && b.railh.remove(), b.zoom && b.zoom.remove();
        for (var o = 0; o < b.saved.css.length; o++) {
          var t = b.saved.css[o];
          t[0].css(t[1], void 0 === t[2] ? "" : t[2])
        }
        b.saved = !1, b.me.data("__nicescroll", "");
        var r = P.nicescroll;
        for (var i in r.each(function(e) {
            if (this && this.id === b.id) {
              delete r[e];
              for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
              r.length--, r.length && delete r[r.length]
            }
          }), b) b[i] = null, delete b[i];
        b = null
      }, this.scrollstart = function(e) {
        return this.onscrollstart = e, b
      }, this.scrollend = function(e) {
        return this.onscrollend = e, b
      }, this.scrollcancel = function(e) {
        return this.onscrollcancel = e, b
      }, this.zoomin = function(e) {
        return this.onzoomin = e, b
      }, this.zoomout = function(e) {
        return this.onzoomout = e, b
      }, this.isScrollable = function(e) {
        var o = e.target ? e.target : e;
        if ("OPTION" == o.nodeName) return !0;
        for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName);) {
          var t = P(o),
            r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
          if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
          o = !!o.parentNode && o.parentNode
        }
        return !1
      }, this.getViewport = function(e) {
        for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
          var t = P(o);
          if (/fixed|absolute/.test(t.css("position"))) return t;
          var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
          if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
          if (0 < t.getNiceScroll().length) return t;
          o = !!o.parentNode && o.parentNode
        }
        return !1
      }, this.triggerScrollStart = function(e, o, t, r, i) {
        if (b.onscrollstart) {
          var s = {
            type: "scrollstart",
            current: {
              x: e,
              y: o
            },
            request: {
              x: t,
              y: r
            },
            end: {
              x: b.newscrollx,
              y: b.newscrolly
            },
            speed: i
          };
          b.onscrollstart.call(b, s)
        }
      }, this.triggerScrollEnd = function() {
        if (b.onscrollend) {
          var e = b.getScrollLeft(),
            o = b.getScrollTop(),
            t = {
              type: "scrollend",
              current: {
                x: e,
                y: o
              },
              end: {
                x: e,
                y: o
              }
            };
          b.onscrollend.call(b, t)
        }
      };
      var m = 0,
        f = 0,
        g = 0,
        v = 1;

      function w(e, o, t, r) {
        b.scrollrunning || (b.newscrolly = b.getScrollTop(), b.newscrollx = b.getScrollLeft(), g = X());
        var i = X() - g;
        if (g = X(), 350 < i ? v = 1 : v += (2 - v) / 10, o = o * v | 0, e = e * v | 0) {
          if (r)
            if (e < 0) {
              if (b.getScrollLeft() >= b.page.maxw) return !0
            } else if (b.getScrollLeft() <= 0) return !0;
          var s = 0 < e ? 1 : -1;
          f !== s && (b.scrollmom && b.scrollmom.stop(), b.newscrollx = b.getScrollLeft(), f = s), b.lastdeltax -= e
        }
        if (o) {
          if (function() {
              var e = b.getScrollTop();
              if (o < 0) {
                if (e >= b.page.maxh) return !0
              } else if (e <= 0) return !0
            }()) {
            if (x.nativeparentscrolling && t && !b.ispage && !b.zoomactive) return !0;
            var n = b.view.h >> 1;
            o = b.newscrolly < -n ? (b.newscrolly = -n, -1) : b.newscrolly > b.page.maxh + n ? (b.newscrolly = b.page.maxh + n, 1) : 0
          }
          var l = 0 < o ? 1 : -1;
          m !== l && (b.scrollmom && b.scrollmom.stop(), b.newscrolly = b.getScrollTop(), m = l), b.lastdeltay -= o
        }(o || e) && b.synched("relativexy", function() {
          var e = b.lastdeltay + b.newscrolly;
          b.lastdeltay = 0;
          var o = b.lastdeltax + b.newscrollx;
          b.lastdeltax = 0, b.rail.drag || b.doScrollPos(o, e)
        })
      }
      var z = !1;

      function k(e, o, t) {
        var r, i;
        if (!t && z) return !0;
        (0 === e.deltaMode ? (r = -e.deltaX * (x.mousescrollstep / 54) | 0, i = -e.deltaY * (x.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * x.mousescrollstep * 50 / 80 | 0, i = -e.deltaY * x.mousescrollstep * 50 / 80 | 0), o && x.oneaxismousemode && 0 === r && i) && (r = i, i = 0, t && (r < 0 ? b.getScrollLeft() >= b.page.maxw : b.getScrollLeft() <= 0) && (i = r, r = 0));
        b.isrtlmode && (r = -r), w(r, i, t, !0) ? t && (z = !0) : (z = !1, e.stopImmediatePropagation())
      }
      if (this.onmousewheel = function(e) {
          if (b.wheelprevented || b.locked) return !1;
          if (b.railslocked) return b.debounced("checkunlock", b.resize, 250), !1;
          if (b.rail.drag) return b.cancelEvent(e);
          if ("auto" === x.oneaxismousemode && 0 !== e.deltaX && (x.oneaxismousemode = !1), x.oneaxismousemode && 0 === e.deltaX && !b.rail.scrollable) return !b.railh || !b.railh.scrollable || b.onmousewheelhr(e);
          var o = X(),
            t = !1;
          if (x.preservenativescrolling && b.checkarea + 600 < o && (b.nativescrollingarea = b.isScrollable(e), t = !0), b.checkarea = o, b.nativescrollingarea) return !0;
          var r = k(e, !1, t);
          return r && (b.checkarea = 0), r
        }, this.onmousewheelhr = function(e) {
          if (!b.wheelprevented) {
            if (b.railslocked || !b.railh.scrollable) return !0;
            if (b.rail.drag) return b.cancelEvent(e);
            var o = X(),
              t = !1;
            return x.preservenativescrolling && b.checkarea + 600 < o && (b.nativescrollingarea = b.isScrollable(e), t = !0), b.checkarea = o, !!b.nativescrollingarea || (b.railslocked ? b.cancelEvent(e) : k(e, !0, t))
          }
        }, this.stop = function() {
          return b.cancelScroll(), b.scrollmon && b.scrollmon.stop(), b.cursorfreezed = !1, b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.noticeCursor(), b
        }, this.getTransitionSpeed = function(e) {
          return 80 + e / 72 * x.scrollspeed | 0
        }, x.smoothscroll)
        if (b.ishwscroll && S.hastransition && x.usetransition && x.smoothscroll) {
          var T = "";
          this.resetTransition = function() {
            T = "", b.doc.css(S.prefixstyle + "transition-duration", "0ms")
          }, this.prepareTransition = function(e, o) {
            var t = o ? e : b.getTransitionSpeed(e),
              r = t + "ms";
            return T !== r && (T = r, b.doc.css(S.prefixstyle + "transition-duration", r)), t
          }, this.doScrollLeft = function(e, o) {
            var t = b.scrollrunning ? b.newscrolly : b.getScrollTop();
            b.doScrollPos(e, t, o)
          }, this.doScrollTop = function(e, o) {
            var t = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
            b.doScrollPos(t, e, o)
          }, this.cursorupdate = {
            running: !1,
            start: function() {
              var e = this;
              if (!e.running) {
                e.running = !0;
                var o = function() {
                  e.running && Y(o), b.showCursor(b.getScrollTop(), b.getScrollLeft()), b.notifyScrollEvent(b.win[0])
                };
                Y(o)
              }
            },
            stop: function() {
              this.running = !1
            }
          }, this.doScrollPos = function(e, o, t) {
            var r = b.getScrollTop(),
              i = b.getScrollLeft();
            if (((b.newscrolly - r) * (o - r) < 0 || (b.newscrollx - i) * (e - i) < 0) && b.cancelScroll(), x.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > b.page.maxh && (o = b.page.maxh + (o - b.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > b.page.maxw && (e = b.page.maxw + (e - b.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > b.page.maxh && (o = b.page.maxh), e < 0 ? e = 0 : e > b.page.maxw && (e = b.page.maxw)), b.scrollrunning && e == b.newscrollx && o == b.newscrolly) return !1;
            b.newscrolly = o, b.newscrollx = e;
            var s = b.getScrollTop(),
              n = b.getScrollLeft(),
              l = {};
            l.x = e - n, l.y = o - s;
            var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
              c = b.prepareTransition(a);
            b.scrollrunning || (b.scrollrunning = !0, b.triggerScrollStart(n, s, e, o, c), b.cursorupdate.start()), b.scrollendtrapped = !0, S.transitionend || (b.scrollendtrapped && clearTimeout(b.scrollendtrapped), b.scrollendtrapped = setTimeout(b.onScrollTransitionEnd, c)), b.setScrollTop(b.newscrolly), b.setScrollLeft(b.newscrollx)
          }, this.cancelScroll = function() {
            if (!b.scrollendtrapped) return !0;
            var e = b.getScrollTop(),
              o = b.getScrollLeft();
            return b.scrollrunning = !1, S.transitionend || clearTimeout(S.transitionend), b.scrollendtrapped = !1, b.resetTransition(), b.setScrollTop(e), b.railh && b.setScrollLeft(o), b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm), b.timerscroll = !1, b.cursorfreezed = !1, b.cursorupdate.stop(), b.showCursor(e, o), b
          }, this.onScrollTransitionEnd = function() {
            if (b.scrollendtrapped) {
              var e = b.getScrollTop(),
                o = b.getScrollLeft();
              if (e < 0 ? e = 0 : e > b.page.maxh && (e = b.page.maxh), o < 0 ? o = 0 : o > b.page.maxw && (o = b.page.maxw), e != b.newscrolly || o != b.newscrollx) return b.doScrollPos(o, e, x.snapbackspeed);
              b.scrollrunning && b.triggerScrollEnd(), b.scrollrunning = !1, b.scrollendtrapped = !1, b.resetTransition(), b.timerscroll = !1, b.setScrollTop(e), b.railh && b.setScrollLeft(o), b.cursorupdate.stop(), b.noticeCursor(!1, e, o), b.cursorfreezed = !1
            }
          }
        } else this.doScrollLeft = function(e, o) {
          var t = b.scrollrunning ? b.newscrolly : b.getScrollTop();
          b.doScrollPos(e, t, o)
        }, this.doScrollTop = function(e, o) {
          var t = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
          b.doScrollPos(t, e, o)
        }, this.doScrollPos = function(e, o, t) {
          var r = b.getScrollTop(),
            i = b.getScrollLeft();
          ((b.newscrolly - r) * (o - r) < 0 || (b.newscrollx - i) * (e - i) < 0) && b.cancelScroll();
          var s = !1;
          if (b.bouncescroll && b.rail.visibility || (o < 0 ? s = !(o = 0) : o > b.page.maxh && (o = b.page.maxh, s = !0)), b.bouncescroll && b.railh.visibility || (e < 0 ? s = !(e = 0) : e > b.page.maxw && (e = b.page.maxw, s = !0)), b.scrollrunning && b.newscrolly === o && b.newscrollx === e) return !0;
          b.newscrolly = o, b.newscrollx = e, b.dst = {}, b.dst.x = e - i, b.dst.y = o - r, b.dst.px = i, b.dst.py = r;
          var n = 0 | Math.sqrt(b.dst.x * b.dst.x + b.dst.y * b.dst.y),
            l = b.getTransitionSpeed(n);
          b.bzscroll = {};
          var a = s ? 1 : .58;
          b.bzscroll.x = new d(i, b.newscrollx, l, 0, 0, a, 1), b.bzscroll.y = new d(r, b.newscrolly, l, 0, 0, a, 1);
          X();
          var c = function() {
            if (b.scrollrunning) {
              var e = b.bzscroll.y.getPos();
              b.setScrollLeft(b.bzscroll.x.getNow()), b.setScrollTop(b.bzscroll.y.getNow()), e <= 1 ? b.timer = Y(c) : (b.scrollrunning = !1, b.timer = 0, b.triggerScrollEnd())
            }
          };
          b.scrollrunning || (b.triggerScrollStart(i, r, e, o, l), b.scrollrunning = !0, b.timer = Y(c))
        }, this.cancelScroll = function() {
          return b.timer && H(b.timer), b.timer = 0, b.bzscroll = !1, b.scrollrunning = !1, b
        };
      else this.doScrollLeft = function(e, o) {
        var t = b.getScrollTop();
        b.doScrollPos(e, t, o)
      }, this.doScrollTop = function(e, o) {
        var t = b.getScrollLeft();
        b.doScrollPos(t, e, o)
      }, this.doScrollPos = function(e, o, t) {
        var r = e > b.page.maxw ? b.page.maxw : e;
        r < 0 && (r = 0);
        var i = o > b.page.maxh ? b.page.maxh : o;
        i < 0 && (i = 0), b.synched("scroll", function() {
          b.setScrollTop(i), b.setScrollLeft(r)
        })
      }, this.cancelScroll = function() {};
      this.doScrollBy = function(e, o) {
        w(0, e)
      }, this.doScrollLeftBy = function(e, o) {
        w(e, 0)
      }, this.doScrollTo = function(e, o) {
        var t = o ? Math.round(e * b.scrollratio.y) : e;
        t < 0 ? t = 0 : t > b.page.maxh && (t = b.page.maxh), b.cursorfreezed = !1, b.doScrollTop(e)
      }, this.checkContentSize = function() {
        var e = b.getContentSize();
        e.h == b.page.h && e.w == b.page.w || b.resize(!1, e)
      }, b.onscroll = function(e) {
        b.rail.drag || b.cursorfreezed || b.synched("scroll", function() {
          b.scroll.y = Math.round(b.getScrollTop() / b.scrollratio.y), b.railh && (b.scroll.x = Math.round(b.getScrollLeft() / b.scrollratio.x)), b.noticeCursor()
        })
      }, b.bind(b.docscroll, "scroll", b.onscroll), this.doZoomIn = function(e) {
        if (!b.zoomactive) {
          b.zoomactive = !0, b.zoomrestore = {
            style: {}
          };
          var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
            t = b.win[0].style;
          for (var r in o) {
            var i = o[r];
            b.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : ""
          }
          b.zoomrestore.style.width = b.win.css("width"), b.zoomrestore.style.height = b.win.css("height"), b.zoomrestore.padding = {
            w: b.win.outerWidth() - b.win.width(),
            h: b.win.outerHeight() - b.win.height()
          }, S.isios4 && (b.zoomrestore.scrollTop = I.scrollTop(), I.scrollTop(0)), b.win.css({
            position: S.isios4 ? "absolute" : "fixed",
            top: 0,
            left: 0,
            zIndex: N + 100,
            margin: 0
          });
          var s = b.win.css("backgroundColor");
          return ("" === s || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(s)) && b.win.css("backgroundColor", "#fff"), b.rail.css({
            zIndex: N + 101
          }), b.zoom.css({
            zIndex: N + 102
          }), b.zoom.css("backgroundPosition", "0 -18px"), b.resizeZoom(), b.onzoomin && b.onzoomin.call(b), b.cancelEvent(e)
        }
      }, this.doZoomOut = function(e) {
        if (b.zoomactive) return b.zoomactive = !1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), S.isios4 && I.scrollTop(b.zoomrestore.scrollTop), b.rail.css({
          "z-index": b.zindex
        }), b.zoom.css({
          "z-index": b.zindex
        }), b.zoomrestore = !1, b.zoom.css("backgroundPosition", "0 0"), b.onResize(), b.onzoomout && b.onzoomout.call(b), b.cancelEvent(e)
      }, this.doZoom = function(e) {
        return b.zoomactive ? b.doZoomOut(e) : b.doZoomIn(e)
      }, this.resizeZoom = function() {
        if (b.zoomactive) {
          var e = b.getScrollTop();
          b.win.css({
            width: I.width() - b.zoomrestore.padding.w + "px",
            height: I.height() - b.zoomrestore.padding.h + "px"
          }), b.onResize(), b.setScrollTop(Math.min(b.page.maxh, e))
        }
      }, this.init(), P.nicescroll.push(this)
    },
    q = function(e) {
      var f = this;
      this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.reset = function(e, o) {
        f.stop(), f.steptime = 0, f.lasttime = X(), f.speedx = 0, f.speedy = 0, f.lastx = e, f.lasty = o, f.lastscrollx = -1, f.lastscrolly = -1
      }, this.update = function(e, o) {
        var t = X();
        f.steptime = t - f.lasttime, f.lasttime = t;
        var r = o - f.lasty,
          i = e - f.lastx,
          s = f.nc.getScrollTop() + r,
          n = f.nc.getScrollLeft() + i;
        f.snapx = n < 0 || n > f.nc.page.maxw, f.snapy = s < 0 || s > f.nc.page.maxh, f.speedx = i, f.speedy = r, f.lastx = e, f.lasty = o
      }, this.stop = function() {
        f.nc.unsynched("domomentum2d"), f.timer && clearTimeout(f.timer), f.timer = 0, f.lastscrollx = -1, f.lastscrolly = -1
      }, this.doSnapy = function(e, o) {
        var t = !1;
        o < 0 ? t = !(o = 0) : o > f.nc.page.maxh && (o = f.nc.page.maxh, t = !0), e < 0 ? t = !(e = 0) : e > f.nc.page.maxw && (e = f.nc.page.maxw, t = !0), t ? f.nc.doScrollPos(e, o, f.nc.opt.snapbackspeed) : f.nc.triggerScrollEnd()
      }, this.doMomentum = function(e) {
        var o = X(),
          t = e ? o + e : f.lasttime,
          r = f.nc.getScrollLeft(),
          i = f.nc.getScrollTop(),
          s = f.nc.page.maxh,
          n = f.nc.page.maxw;
        f.speedx = 0 < n ? Math.min(60, f.speedx) : 0, f.speedy = 0 < s ? Math.min(60, f.speedy) : 0;
        var l = t && o - t <= 60;
        (i < 0 || s < i || r < 0 || n < r) && (l = !1);
        var a = !(!f.speedy || !l) && f.speedy,
          c = !(!f.speedx || !l) && f.speedx;
        if (a || c) {
          var d = Math.max(16, f.steptime);
          if (50 < d) {
            var u = d / 50;
            f.speedx *= u, f.speedy *= u, d = 50
          }
          f.demulxy = 0, f.lastscrollx = f.nc.getScrollLeft(), f.chkx = f.lastscrollx, f.lastscrolly = f.nc.getScrollTop(), f.chky = f.lastscrolly;
          var h = f.lastscrollx,
            p = f.lastscrolly,
            m = function() {
              var e = 600 < X() - o ? .04 : .02;
              f.speedx && (h = Math.floor(f.lastscrollx - f.speedx * (1 - f.demulxy)), ((f.lastscrollx = h) < 0 || n < h) && (e = .1)), f.speedy && (p = Math.floor(f.lastscrolly - f.speedy * (1 - f.demulxy)), ((f.lastscrolly = p) < 0 || s < p) && (e = .1)), f.demulxy = Math.min(1, f.demulxy + e), f.nc.synched("domomentum2d", function() {
                if (f.speedx) {
                  f.nc.getScrollLeft();
                  f.chkx = h, f.nc.setScrollLeft(h)
                }
                if (f.speedy) {
                  f.nc.getScrollTop();
                  f.chky = p, f.nc.setScrollTop(p)
                }
                f.timer || (f.nc.hideCursor(), f.doSnapy(h, p))
              }), f.demulxy < 1 ? f.timer = setTimeout(m, d) : (f.stop(), f.nc.hideCursor(), f.doSnapy(h, p))
            };
          m()
        } else f.doSnapy(f.nc.getScrollLeft(), f.nc.getScrollTop())
      }
    },
    i = e.fn.scrollTop;
  e.cssHooks.pageYOffset = {
    get: function(e, o, t) {
      var r = P.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollTop() : i.call(e)
    },
    set: function(e, o) {
      var t = P.data(e, "__nicescroll") || !1;
      return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : i.call(e, o), this
    }
  }, e.fn.scrollTop = function(o) {
    if (void 0 !== o) return this.each(function() {
      var e = P.data(this, "__nicescroll") || !1;
      e && e.ishwscroll ? e.setScrollTop(parseInt(o)) : i.call(P(this), o)
    });
    var e = this[0] && P.data(this[0], "__nicescroll") || !1;
    return e && e.ishwscroll ? e.getScrollTop() : i.call(this)
  };
  var n = e.fn.scrollLeft;
  P.cssHooks.pageXOffset = {
    get: function(e, o, t) {
      var r = P.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollLeft() : n.call(e)
    },
    set: function(e, o) {
      var t = P.data(e, "__nicescroll") || !1;
      return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : n.call(e, o), this
    }
  }, e.fn.scrollLeft = function(o) {
    if (void 0 !== o) return this.each(function() {
      var e = P.data(this, "__nicescroll") || !1;
      e && e.ishwscroll ? e.setScrollLeft(parseInt(o)) : n.call(P(this), o)
    });
    var e = this[0] && P.data(this[0], "__nicescroll") || !1;
    return e && e.ishwscroll ? e.getScrollLeft() : n.call(this)
  };
  var a = function(e) {
    var o = this;
    if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) {
        return P.each(o, e), o
      }, this.push = function(e) {
        o[o.length] = e, o.length++
      }, this.eq = function(e) {
        return o[e]
      }, e)
      for (var t = 0; t < e.length; t++) {
        var r = P.data(e[t], "__nicescroll") || !1;
        r && (this[this.length] = r, this.length++)
      }
    return this
  };
  ! function(e, o, t) {
    for (var r = 0, i = o.length; r < i; r++) t(e, o[r])
  }(a.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function(e, o) {
    e[o] = function() {
      var e = arguments;
      return this.each(function() {
        this[o].apply(this, e)
      })
    }
  }), e.fn.getNiceScroll = function(e) {
    return void 0 === e ? new a(this) : this[e] && P.data(this[e], "__nicescroll") || !1
  }, (e.expr.pseudos || e.expr[":"]).nicescroll = function(e) {
    return void 0 !== P.data(e, "__nicescroll")
  }, P.fn.niceScroll = function(i, s) {
    void 0 !== s || "object" != typeof i || "jquery" in i || (s = i, i = !1);
    var n = new a;
    return this.each(function() {
      var e = P(this),
        o = P.extend({}, s);
      if (i) {
        var t = P(i);
        o.doc = 1 < t.length ? P(i, e) : t, o.win = e
      }!("doc" in o) || "win" in o || (o.win = e);
      var r = e.data("__nicescroll") || !1;
      r || (o.doc = o.doc || e, r = new l(o, e), e.data("__nicescroll", r)), n.push(r)
    }), 1 === n.length ? n[0] : n
  }, _.NiceScroll = {
    getjQuery: function() {
      return e
    }
  }, P.nicescroll || (P.nicescroll = new a, P.nicescroll.options = D)
});
! function(h, i, n, o) {
  function l(t, e) {
    this.settings = null, this.options = h.extend({}, l.Defaults, e), this.$element = h(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, h.each(["onResize", "onThrottledResize"], h.proxy(function(t, e) {
      this._handlers[e] = h.proxy(this[e], this)
    }, this)), h.each(l.Plugins, h.proxy(function(t, e) {
      this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
    }, this)), h.each(l.Workers, h.proxy(function(t, e) {
      this._pipe.push({
        filter: e.filter,
        run: h.proxy(e.run, this)
      })
    }, this)), this.setup(), this.initialize()
  }
  l.Defaults = {
    items: 5,
    loop: !1,
    center: !1,
    pagi: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: i,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "slide-refresh",
    loadedClass: "slide-slidebox",
    loadingClass: "slide-loading",
    rtlClass: "slide-rtl",
    responsiveClass: "slide-responsive",
    dragClass: "slide-drag",
    itemClass: "slide-item",
    stageClass: "slide-wrapper",
    stageOuterClass: "slide-wrapper-outer"
  }, l.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, l.Type = {
    Event: "event",
    State: "state"
  }, l.Plugins = {}, l.Workers = [{
    filter: ["width", "settings"],
    run: function() {
      this._width = this.$element.width()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(t) {
      t.current = this._items && this._items[this.relative(this._current)]
    }
  }, {
    filter: ["items", "settings"],
    run: function() {
      this.$stage.children(".cloned").remove()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(t) {
      var e = this.settings.margin || "",
        i = !this.settings.autoWidth,
        s = this.settings.rtl,
        n = {
          width: "auto",
          "margin-left": s ? e : "",
          "margin-right": s ? "" : e
        };
      !i && this.$stage.children().css(n), t.css = n
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(t) {
      var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        i = null,
        s = this._items.length,
        n = !this.settings.autoWidth,
        o = [];
      for (t.items = {
          merge: !1,
          width: e
        }; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = 1 < i || t.items.merge, o[s] = n ? e * i : this._items[s].width();
      this._widths = o
    }
  }, {
    filter: ["items", "settings"],
    run: function() {
      var t = [],
        e = this._items,
        i = this.settings,
        s = Math.max(2 * i.items, 4),
        n = 2 * Math.ceil(e.length / 2),
        o = i.loop && e.length ? i.rewind ? s : Math.max(s, n) : 0,
        r = "",
        a = "";
      for (o /= 2; o--;) t.push(this.normalize(t.length / 2, !0)), r += e[t[t.length - 1]][0].outerHTML, t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), a = e[t[t.length - 1]][0].outerHTML + a;
      this._clones = t, h(r).addClass("cloned").appendTo(this.$stage), h(a).addClass("cloned").prependTo(this.$stage)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function() {
      for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e;) s = o[i - 1] || 0, n = this._widths[this.relative(i)] + this.settings.margin, o.push(s + n * t);
      this._coordinates = o
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function() {
      var t = this.settings.stagePadding,
        e = this._coordinates,
        i = {
          width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
          "padding-left": t || "",
          "padding-right": t || ""
        };
      this.$stage.css(i)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(t) {
      var e = this._coordinates.length,
        i = !this.settings.autoWidth,
        s = this.$stage.children();
      if (i && t.items.merge)
        for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
      else i && (t.css.width = t.items.width, s.css(t.css))
    }
  }, {
    filter: ["items"],
    run: function() {
      this._coordinates.length < 1 && this.$stage.removeAttr("style")
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(t) {
      t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
    }
  }, {
    filter: ["position"],
    run: function() {
      this.animate(this.coordinates(this._current))
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function() {
      var t, e, i, s, n = this.settings.rtl ? 1 : -1,
        o = 2 * this.settings.stagePadding,
        r = this.coordinates(this.current()) + o,
        a = r + this.width() * n,
        h = [];
      for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && h.push(i);
      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center")), this.settings.pagi && (this.$stage.children(".pagi").removeClass("pagi"), this.$stage.children().eq(this.current()).addClass("pagi"))
    }
  }], l.prototype.initialize = function() {
    var t, e, i;
    (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : o, i = this.$element.children(e).width(), t.length && i <= 0 && this.preloadAutoWidthImages(t));
    this.$element.addClass(this.options.loadingClass), this.$stage = h("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
  }, l.prototype.setup = function() {
    var e = this.viewport(),
      t = this.options.responsive,
      i = -1,
      s = null;
    t ? (h.each(t, function(t) {
      t <= e && i < t && (i = Number(t))
    }), delete(s = h.extend({}, this.options, t[i])).responsive, s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : s = h.extend({}, this.options), null !== this.settings && this._breakpoint === i || (this.trigger("change", {
      property: {
        name: "settings",
        value: s
      }
    }), this._breakpoint = i, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    }))
  }, l.prototype.optionsLogic = function() {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, l.prototype.prepare = function(t) {
    var e = this.trigger("prepare", {
      content: t
    });
    return e.data || (e.data = h("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {
      content: e.data
    }), e.data
  }, l.prototype.update = function() {
    for (var t = 0, e = this._pipe.length, i = h.proxy(function(t) {
        return this[t]
      }, this._invalidated), s = {}; t < e;)(this._invalidated.all || 0 < h.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(s), t++;
    this._invalidated = {}, !this.is("valid") && this.enter("valid")
  }, l.prototype.width = function(t) {
    switch (t = t || l.Width.Default) {
      case l.Width.Inner:
      case l.Width.Outer:
        return this._width;
      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin
    }
  }, l.prototype.refresh = function() {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
  }, l.prototype.onThrottledResize = function() {
    i.clearTimeout(this.resizeTimer), this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
  }, l.prototype.onResize = function() {
    return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
  }, l.prototype.registerEventHandlers = function() {
    h.support.transition && this.$stage.on(h.support.transition.end + ".btq.core", h.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.btq.core", h.proxy(this.onDragStart, this)), this.$stage.on("dragstart.btq.core selectstart.btq.core", function() {
      return !1
    })), this.settings.touchDrag && (this.$stage.on("touchstart.btq.core", h.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.btq.core", h.proxy(this.onDragEnd, this)))
  }, l.prototype.onDragStart = function(t) {
    var e = null;
    3 !== t.which && (e = h.support.transform ? {
      x: (e = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === e.length ? 12 : 4],
      y: e[16 === e.length ? 13 : 5]
    } : (e = this.$stage.position(), {
      x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
      y: e.top
    }), this.is("animating") && (h.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = h(t.target), this._drag.stage.start = e, this._drag.stage.current = e, this._drag.pointer = this.pointer(t), h(n).on("mouseup.btq.core touchend.btq.core", h.proxy(this.onDragEnd, this)), h(n).one("mousemove.btq.core touchmove.btq.core", h.proxy(function(t) {
      t.preventDefault();
      var e = this.difference(this._drag.pointer, this.pointer(t));
      h(n).on("mousemove.btq.core touchmove.btq.core", h.proxy(this.onDragMove, this)), Math.abs(e.x) < Math.abs(e.y) && this.is("valid") || (this.enter("dragging"), this.trigger("drag"))
    }, this)))
  }, l.prototype.onDragMove = function(t) {
    var e = null,
      i = null,
      s = null,
      n = this.difference(this._drag.pointer, this.pointer(t)),
      o = this.difference(this._drag.stage.start, n);
    this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), s = this.settings.pullDrag ? -1 * n.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + s), i + s)), this._drag.stage.current = o, this.animate(o.x))
  }, l.prototype.onDragEnd = function(t) {
    var e = this.difference(this._drag.pointer, this.pointer(t)),
      i = this._drag.stage.current,
      s = 0 < e.x ^ this.settings.rtl ? "left" : "right";
    h(n).off(".btq.core"), (0 !== e.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(i.x, 0 !== e.x ? s : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = s, (3 < Math.abs(e.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.btq.core", function() {
      return !1
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
  }, l.prototype.closest = function(i, s) {
    var n = -1,
      o = this.width(),
      r = this.coordinates();
    return this.settings.freeDrag || h.each(r, h.proxy(function(t, e) {
      return "left" === s && e - 30 < i && i < e + 30 ? n = t : "right" === s && e - o - 30 < i && i < e - o + 30 ? n = t + 1 : this.op(i, "<", e) && this.op(i, ">", r[t + 1] || e - o) && (n = "left" === s ? t + 1 : t), -1 === n
    }, this)), this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? n = i = this.minimum() : this.op(i, "<", r[this.maximum()]) && (n = i = this.maximum())), n
  }, l.prototype.animate = function(t) {
    var e = 0 < this.speed();
    this.is("animating") && this.onTransitionEnd(), e && (this.enter("animating"), this.trigger("translate")), h.support.transform3d && h.support.transition ? this.$stage.css({
      transform: "translate3d(" + t + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s"
    }) : e ? this.$stage.animate({
      left: t + "px"
    }, this.speed(), this.settings.fallbackEasing, h.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: t + "px"
    })
  }, l.prototype.is = function(t) {
    return this._states.current[t] && 0 < this._states.current[t]
  }, l.prototype.current = function(t) {
    if (t === o) return this._current;
    if (0 === this._items.length) return o;
    if (t = this.normalize(t), this._current !== t) {
      var e = this.trigger("change", {
        property: {
          name: "position",
          value: t
        }
      });
      e.data !== o && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      })
    }
    return this._current
  }, l.prototype.invalidate = function(t) {
    return "string" === h.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), h.map(this._invalidated, function(t, e) {
      return e
    })
  }, l.prototype.reset = function(t) {
    (t = this.normalize(t)) !== o && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
  }, l.prototype.normalize = function(t, e) {
    var i = this._items.length,
      s = e ? 0 : this._clones.length;
    return !this.isNumeric(t) || i < 1 ? t = o : (t < 0 || i + s <= t) && (t = ((t - s / 2) % i + i) % i + s / 2), t
  }, l.prototype.relative = function(t) {
    return t -= this._clones.length / 2, this.normalize(t, !0)
  }, l.prototype.maximum = function(t) {
    var e, i = this.settings,
      s = this._coordinates.length,
      n = Math.abs(this._coordinates[s - 1]) - this._width,
      o = -1;
    if (i.loop) s = this._clones.length / 2 + this._items.length - 1;
    else if (i.autoWidth || i.merge)
      for (; 1 < s - o;) Math.abs(this._coordinates[e = s + o >> 1]) < n ? o = e : s = e;
    else s = i.center ? this._items.length - 1 : this._items.length - i.items;
    return t && (s -= this._clones.length / 2), Math.max(s, 0)
  }, l.prototype.minimum = function(t) {
    return t ? 0 : this._clones.length / 2
  }, l.prototype.items = function(t) {
    return t === o ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
  }, l.prototype.mergers = function(t) {
    return t === o ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
  }, l.prototype.clones = function(i) {
    var e = this._clones.length / 2,
      s = e + this._items.length,
      n = function(t) {
        return t % 2 == 0 ? s + t / 2 : e - (t + 1) / 2
      };
    return i === o ? h.map(this._clones, function(t, e) {
      return n(e)
    }) : h.map(this._clones, function(t, e) {
      return t === i ? n(e) : null
    })
  }, l.prototype.speed = function(t) {
    return t !== o && (this._speed = t), this._speed
  }, l.prototype.coordinates = function(t) {
    var e, i = 1,
      s = t - 1;
    return t === o ? h.map(this._coordinates, h.proxy(function(t, e) {
      return this.coordinates(e)
    }, this)) : (this.settings.center ? (this.settings.rtl && (i = -1, s = t + 1), e = this._coordinates[t], e += (this.width() - e + (this._coordinates[s] || 0)) / 2 * i) : e = this._coordinates[s] || 0, e = Math.ceil(e))
  }, l.prototype.duration = function(t, e, i) {
    return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
  }, l.prototype.to = function(t, e) {
    var i = this.current(),
      s = null,
      n = t - this.relative(i),
      o = (0 < n) - (n < 0),
      r = this._items.length,
      a = this.minimum(),
      h = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), (s = (((t = i + n) - a) % r + r) % r + a) !== t && s - n <= h && 0 < s - n && (i = s - n, t = s, this.reset(i))) : t = this.settings.rewind ? (t % (h += 1) + h) % h : Math.max(a, Math.min(h, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
  }, l.prototype.next = function(t) {
    t = t || !1, this.to(this.relative(this.current()) + 1, t)
  }, l.prototype.prev = function(t) {
    t = t || !1, this.to(this.relative(this.current()) - 1, t)
  }, l.prototype.onTransitionEnd = function(t) {
    if (t !== o && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated")
  }, l.prototype.viewport = function() {
    var t;
    if (this.options.responsiveBaseElement !== i) t = h(this.options.responsiveBaseElement).width();
    else if (i.innerWidth) t = i.innerWidth;
    else {
      if (!n.documentElement || !n.documentElement.clientWidth) throw "Can not detect viewport width.";
      t = n.documentElement.clientWidth
    }
    return t
  }, l.prototype.replace = function(t) {
    this.$stage.empty(), this._items = [], t && (t = t instanceof jQuery ? t : h(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function() {
      return 1 === this.nodeType
    }).each(h.proxy(function(t, e) {
      e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").attr("data-merge") || 1)
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, l.prototype.add = function(t, e) {
    var i = this.relative(this._current);
    e = e === o ? this._items.length : this.normalize(e, !0), t = t instanceof jQuery ? t : h(t), this.trigger("add", {
      content: t,
      position: e
    }), t = this.prepare(t), 0 === this._items.length || e === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[e - 1].after(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").attr("data-merge") || 1)), this._items[i] && this.reset(this._items[i].index()), this.invalidate("items"), this.trigger("added", {
      content: t,
      position: e
    })
  }, l.prototype.remove = function(t) {
    (t = this.normalize(t, !0)) !== o && (this.trigger("remove", {
      content: this._items[t],
      position: t
    }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: t
    }))
  }, l.prototype.preloadAutoWidthImages = function(t) {
    t.each(h.proxy(function(t, e) {
      this.enter("pre-loading"), e = h(e), h(new Image).one("load", h.proxy(function(t) {
        e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
      }, this)).attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"))
    }, this))
  }, l.prototype.destroy = function() {
    for (var t in this.$element.off(".btq.core"), this.$stage.off(".btq.core"), h(n).off(".btq.core"), !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[t].destroy();
    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("btq.slidebox")
  }, l.prototype.op = function(t, e, i) {
    var s = this.settings.rtl;
    switch (e) {
      case "<":
        return s ? i < t : t < i;
      case ">":
        return s ? t < i : i < t;
      case ">=":
        return s ? t <= i : i <= t;
      case "<=":
        return s ? i <= t : t <= i
    }
  }, l.prototype.on = function(t, e, i, s) {
    t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
  }, l.prototype.off = function(t, e, i, s) {
    t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
  }, l.prototype.trigger = function(t, e, i, s, n) {
    var o = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
      r = h.camelCase(h.grep(["on", t, i], function(t) {
        return t
      }).join("-").toLowerCase()),
      a = h.Event([t, "btq", i || "slidebox"].join(".").toLowerCase(), h.extend({
        relatedTarget: this
      }, o, e));
    return this._supress[t] || (h.each(this._plugins, function(t, e) {
      e.onTrigger && e.onTrigger(a)
    }), this.register({
      type: l.Type.Event,
      name: t
    }), this.$element.trigger(a), this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)), a
  }, l.prototype.enter = function(t) {
    h.each([t].concat(this._states.tags[t] || []), h.proxy(function(t, e) {
      this._states.current[e] === o && (this._states.current[e] = 0), this._states.current[e]++
    }, this))
  }, l.prototype.leave = function(t) {
    h.each([t].concat(this._states.tags[t] || []), h.proxy(function(t, e) {
      this._states.current[e]--
    }, this))
  }, l.prototype.register = function(i) {
    if (i.type === l.Type.Event) {
      if (h.event.special[i.name] || (h.event.special[i.name] = {}), !h.event.special[i.name].btq) {
        var e = h.event.special[i.name]._default;
        h.event.special[i.name]._default = function(t) {
          return !e || !e.apply || t.namespace && -1 !== t.namespace.indexOf("btq") ? t.namespace && -1 < t.namespace.indexOf("btq") : e.apply(this, arguments)
        }, h.event.special[i.name].btq = !0
      }
    } else i.type === l.Type.State && (this._states.tags[i.name] ? this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags) : this._states.tags[i.name] = i.tags, this._states.tags[i.name] = h.grep(this._states.tags[i.name], h.proxy(function(t, e) {
      return h.inArray(t, this._states.tags[i.name]) === e
    }, this)))
  }, l.prototype.suppress = function(t) {
    h.each(t, h.proxy(function(t, e) {
      this._supress[e] = !0
    }, this))
  }, l.prototype.release = function(t) {
    h.each(t, h.proxy(function(t, e) {
      delete this._supress[e]
    }, this))
  }, l.prototype.pointer = function(t) {
    var e = {
      x: null,
      y: null
    };
    return (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
  }, l.prototype.isNumeric = function(t) {
    return !isNaN(parseFloat(t))
  }, l.prototype.difference = function(t, e) {
    return {
      x: t.x - e.x,
      y: t.y - e.y
    }
  }, h.fn.BTQSlider = function(e) {
    var s = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var t = h(this),
        i = t.data("btq.slidebox");
      i || (i = new l(this, "object" == typeof e && e), t.data("btq.slidebox", i), h.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(t, e) {
        i.register({
          type: l.Type.Event,
          name: e
        }), i.$element.on(e + ".btq.slidebox.core", h.proxy(function(t) {
          t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]))
        }, i))
      })), "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, s)
    })
  }, h.fn.BTQSlider.Constructor = l
}(window.Zepto || window.jQuery, window, document),
function(e, i, t, s) {
  var n = function(t) {
    this._core = t, this._interval = null, this._visible = null, this._handlers = {
      "initialized.btq.slidebox": e.proxy(function(t) {
        t.namespace && this._core.settings.autoRefresh && this.watch()
      }, this)
    }, this._core.options = e.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  n.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, n.prototype.watch = function() {
    this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
  }, n.prototype.refresh = function() {
    this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("slide-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
  }, n.prototype.destroy = function() {
    var t, e;
    for (t in i.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, e.fn.BTQSlider.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document),
function(a, o, t, e) {
  var i = function(t) {
    this._core = t, this._loaded = [], this._handlers = {
      "initialized.btq.slidebox change.btq.slidebox resized.btq.slidebox": a.proxy(function(t) {
        if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type)) {
          var e = this._core.settings,
            i = e.center && Math.ceil(e.items / 2) || e.items,
            s = e.center && -1 * i || 0,
            n = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + s,
            o = this._core.clones().length,
            r = a.proxy(function(t, e) {
              this.load(e)
            }, this);
          for (0 < e.lazyLoadEager && (i += e.lazyLoadEager, e.loop && (n -= e.lazyLoadEager, i++)); s++ < i;) this.load(o / 2 + this._core.relative(n)), o && a.each(this._core.clones(this._core.relative(n)), r), n++
        }
      }, this)
    }, this._core.options = a.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  i.Defaults = {
    lazyLoad: !1,
    lazyLoadEager: 0
  }, i.prototype.load = function(t) {
    var e = this._core.$stage.children().children(),
      i = this._core.$stage.children().eq(t),
      s = i && i.find(".lazyload");
    !s || -1 < a.inArray(i.get(0), this._loaded) || (s && e.each(function(t, e) {
      a(e).parent().addClass("loading")
    }), s.each(a.proxy(function(t, e) {
      var i, s = a(e),
        n = 1 < o.devicePixelRatio && s.attr("data-src-retina") || s.attr("data-src") || s.attr("data-srcset");
      this._core.trigger("load", {
        element: s,
        url: n
      }, "lazy"), s.is("img") ? (s.one("load.btq.lazy", a.proxy(function() {
        s.css("opacity", 1), this._core.trigger("loaded", {
          element: s,
          url: n
        }, "lazy")
      }, this)).attr("src", n), s.parent().parent().addClass("done")) : s.is("source") ? (s.one("load.btq.lazy", a.proxy(function() {
        this._core.trigger("loaded", {
          element: s,
          url: n
        }, "lazy")
      }, this)).attr("srcset", n), s.parent().parent().addClass("done")) : ((i = new Image).onload = a.proxy(function() {
        s.css({
          "background-image": 'url("' + n + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: s,
          url: n
        }, "lazy")
      }, this), i.src = n, s.parent().addClass("done"))
    }, this)), this._loaded.push(i.get(0)))
  }, i.prototype.destroy = function() {
    var t, e;
    for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, a.fn.BTQSlider.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(r, i, t, e) {
  var s = function(t) {
    this._core = t, this._previousHeight = null, this._handlers = {
      "initialized.btq.slidebox refreshed.btq.slidebox": r.proxy(function(t) {
        t.namespace && this._core.settings.autoHeight && this.update()
      }, this),
      "changed.btq.slidebox": r.proxy(function(t) {
        t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
      }, this),
      "loaded.btq.lazy": r.proxy(function(t) {
        t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
      }, this)
    }, this._core.options = r.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
    var e = this;
    r(i).on("load", function() {
      e._core.settings.autoHeight && e.update()
    }), r(i).resize(function() {
      e._core.settings.autoHeight && (null != e._intervalId && clearTimeout(e._intervalId), e._intervalId = setTimeout(function() {
        e.update()
      }, 250))
    })
  };
  s.Defaults = {
    autoHeight: !1,
    autoHeightClass: "autoheight"
  }, s.prototype.update = function() {
    var t = this._core._current,
      e = t + this._core.settings.items,
      i = this._core.settings.lazyLoad,
      s = this._core.$stage.children().toArray().slice(t, e),
      n = [],
      o = 0;
    r.each(s, function(t, e) {
      n.push(r(e).height())
    }), (o = Math.max.apply(null, n)) <= 1 && i && this._previousHeight && (o = this._previousHeight), this._previousHeight = o, this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
  }, s.prototype.destroy = function() {
    var t, e;
    for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, r.fn.BTQSlider.Constructor.Plugins.AutoHeight = s
}(window.Zepto || window.jQuery, window, document),
function(c, t, e, i) {
  var s = function(t) {
    this._core = t, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.btq.slidebox": c.proxy(function(t) {
        t.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        })
      }, this),
      "resize.btq.slidebox": c.proxy(function(t) {
        t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
      }, this),
      "refreshed.btq.slidebox": c.proxy(function(t) {
        t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .slide-video-frame").remove()
      }, this),
      "changed.btq.slidebox": c.proxy(function(t) {
        t.namespace && "position" === t.property.name && this._playing && this.stop()
      }, this),
      "prepared.btq.slidebox": c.proxy(function(t) {
        if (t.namespace) {
          var e = c(t.content).find(".slide-video");
          e.length && (e.css("display", "none"), this.fetch(e, c(t.content)))
        }
      }, this)
    }, this._core.options = c.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.btq.video", ".slide-video-play-icon", c.proxy(function(t) {
      this.play(t)
    }, this))
  };
  s.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, s.prototype.fetch = function(t, e) {
    var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
      s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
      n = t.attr("data-width") || this._core.settings.videoWidth,
      o = t.attr("data-height") || this._core.settings.videoHeight,
      r = t.attr("href");
    if (!r) throw new Error("Missing video URL.");
    if (-1 < (s = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube";
    else if (-1 < s[3].indexOf("vimeo")) i = "vimeo";
    else {
      if (!(-1 < s[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
      i = "vzaar"
    }
    s = s[6], this._videos[r] = {
      type: i,
      id: s,
      width: n,
      height: o
    }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
  }, s.prototype.thumbnail = function(e, t) {
    var i, s, n = t.width && t.height ? 'style="width:' + t.width + "px;height:" + t.height + 'px;"' : "",
      o = e.find("img"),
      r = "src",
      a = "",
      h = this._core.settings,
      l = function(t) {
        '<div class="slide-video-play-icon"></div>',
        i = h.lazyLoad ? '<div class="slide-video-tn ' + a + '" ' + r + '="' + t + '"></div>' : '<div class="slide-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
        e.after(i),
        e.after('<div class="slide-video-play-icon"></div>')
      };
    if (e.wrap('<div class="slide-video-wrapper"' + n + "></div>"), this._core.settings.lazyLoad && (r = "data-src", a = "lazyload"), o.length) return l(o.attr(r)), o.remove(), !1;
    "youtube" === t.type ? (s = "//img.youtube.com/vi/" + t.id + "/sddefault.jpg", l(s)) : "vimeo" === t.type ? c.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + t.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(t) {
        s = t[0].thumbnail_large, l(s)
      }
    }) : "vzaar" === t.type && c.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + t.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(t) {
        s = t.framegrab_url, l(s)
      }
    })
  }, s.prototype.stop = function() {
    this._core.trigger("stop", null, "video"), this._playing.find(".slide-video-frame").remove(), this._playing.removeClass("slide-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
  }, s.prototype.play = function(t) {
    var e, i = c(t.target).closest("." + this._core.settings.itemClass),
      s = this._videos[i.attr("data-video")];
    s.width, s.height || this._core.$stage.height();
    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), i = this._core.items(this._core.relative(i.index())), this._core.reset(i.index()), "youtube" === s.type ? e = '<iframe id="VYT" width="100%" height="100%" src="//www.youtube.com/embed/' + s.id + '?autoplay=1&enablejsapi=1&controls=1&loop=0&playsinline=1&color=white&rel=0" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type ? e = '<iframe src="//player.vimeo.com/video/' + s.id + '?autoplay=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === s.type && (e = '<iframe frameborder="0"height="100%"width="100%" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + s.id + '/player?autoplay=true"></iframe>'), c('<div class="slide-video-frame">' + e + "</div>").insertAfter(i.find(".slide-video")), this._playing = i.addClass("slide-video-playing"))
  }, s.prototype.isInFullScreen = function() {
    var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
    return t && c(t).parent().hasClass("slide-video-frame")
  }, s.prototype.destroy = function() {
    var t, e;
    for (t in this._core.$element.off("click.btq.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, c.fn.BTQSlider.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document),
function(r, t, e, i) {
  var s = function(t) {
    this.core = t, this.core.options = r.extend({}, s.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
      "change.btq.slidebox": r.proxy(function(t) {
        t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
      }, this),
      "drag.btq.slidebox dragged.btq.slidebox translated.btq.slidebox": r.proxy(function(t) {
        t.namespace && (this.swapping = "translated" == t.type)
      }, this),
      "translate.btq.slidebox": r.proxy(function(t) {
        t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
      }, this)
    }, this.core.$element.on(this.handlers)
  };
  s.Defaults = {
    animateOut: !1,
    animateIn: !1
  }, s.prototype.swap = function() {
    if (1 === this.core.settings.items && r.support.animation && r.support.transition) {
      this.core.speed(0);
      var t, e = r.proxy(this.clear, this),
        i = this.core.$stage.children().eq(this.previous),
        s = this.core.$stage.children().eq(this.next),
        n = this.core.settings.animateIn,
        o = this.core.settings.animateOut;
      this.core.current() !== this.previous && (o && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(r.support.animation.end, e).css({
        left: t + "px"
      }).addClass("animated animated-out").addClass(o)), n && s.one(r.support.animation.end, e).addClass("animated animated-in").addClass(n))
    }
  }, s.prototype.clear = function(t) {
    r(t.target).css({
      left: ""
    }).removeClass("animated animated-out animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
  }, s.prototype.destroy = function() {
    var t, e;
    for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, r.fn.BTQSlider.Constructor.Plugins.Animate = s
}(window.Zepto || window.jQuery, window, document),
function(i, s, n, t) {
  var e = function(t) {
    this._core = t, this._timeout = null, this._paused = !1, this._handlers = {
      "changed.btq.slidebox": i.proxy(function(t) {
        t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
      }, this),
      "initialized.btq.slidebox": i.proxy(function(t) {
        t.namespace && this._core.settings.autoplay && this.play()
      }, this),
      "play.btq.autoplay": i.proxy(function(t, e, i) {
        t.namespace && this.play(e, i)
      }, this),
      "stop.btq.autoplay": i.proxy(function(t) {
        t.namespace && this.stop()
      }, this),
      "mouseover.btq.autoplay": i.proxy(function() {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "mouseleave.btq.autoplay": i.proxy(function() {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
      }, this),
      "touchstart.btq.core": i.proxy(function() {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "touchend.btq.core": i.proxy(function() {
        this._core.settings.autoplayHoverPause && this.play()
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = i.extend({}, e.Defaults, this._core.options)
  };
  e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, e.prototype.play = function(t, e) {
    this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
  }, e.prototype._getNextTimeout = function(t, e) {
    return this._timeout && s.clearTimeout(this._timeout), s.setTimeout(i.proxy(function() {
      this._paused || this._core.is("busy") || this._core.is("interacting") || n.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
    }, this), t || this._core.settings.autoplayTimeout)
  }, e.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout()
  }, e.prototype.stop = function() {
    this._core.is("rotating") && (s.clearTimeout(this._timeout), this._core.leave("rotating"))
  }, e.prototype.pause = function() {
    this._core.is("rotating") && (this._paused = !0)
  }, e.prototype.destroy = function() {
    var t, e;
    for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, i.fn.BTQSlider.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(o, t, e, i) {
  "use strict";
  var s = function(t) {
    this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.btq.slidebox": o.proxy(function(t) {
        t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + o(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
      }, this),
      "added.btq.slidebox": o.proxy(function(t) {
        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
      }, this),
      "remove.btq.slidebox": o.proxy(function(t) {
        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
      }, this),
      "changed.btq.slidebox": o.proxy(function(t) {
        t.namespace && "position" == t.property.name && this.draw()
      }, this),
      "initialized.btq.slidebox": o.proxy(function(t) {
        t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
      }, this),
      "refreshed.btq.slidebox": o.proxy(function(t) {
        t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
      }, this)
    }, this._core.options = o.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  s.Defaults = {
    nav: !1,
    navText: ["", ""],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "slide-buttons",
    navClass: ["slide-prev", "slide-next"],
    slideBy: 1,
    dotClass: "slide-page",
    dotsClass: "slide-pagination",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1,
    dotNum: !1,
    dotSvg: !1
  }, s.prototype.initialize = function() {
    var t, i = this._core.settings;
    for (t in this._controls.$relative = (i.navContainer ? o(i.navContainer) : o("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = o("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", o.proxy(function(t) {
        this.prev(i.navSpeed)
      }, this)), this._controls.$next = o("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", o.proxy(function(t) {
        this.next(i.navSpeed)
      }, this)), i.dotsData || (this._templates = [o("<div>").addClass(i.dotClass).append(o("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? o(i.dotsContainer) : o("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", o.proxy(function(t) {
        var e = o(t.target).parent().is(this._controls.$absolute) ? o(t.target).index() : o(t.target).parent().index();
        t.preventDefault(), this.to(e, i.dotsSpeed)
      }, this)), this._overrides) this._core[t] = o.proxy(this[t], this)
  }, s.prototype.destroy = function() {
    var t, e, i, s;
    for (t in this._handlers) this.$element.off(t, this._handlers[t]);
    for (e in this._controls) this._controls[e].remove();
    for (s in this.overides) this._core[s] = this._overrides[s];
    for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
  }, s.prototype.update = function() {
    var t, e, i = this._core.clones().length / 2,
      s = i + this._core.items().length,
      n = this._core.maximum(!0),
      o = this._core.settings,
      r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
    if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
      for (this._pages = [], t = i, e = 0; t < s; t++) {
        if (r <= e || 0 === e) {
          if (this._pages.push({
              start: Math.min(n, t - i),
              end: t - i + r - 1
            }), Math.min(n, t - i) === n) break;
          e = 0, 0
        }
        e += this._core.mergers(this._core.relative(t))
      }
  }, s.prototype.draw = function() {
    var t, e = this._core.settings,
      i = this._core.items().length <= e.items,
      s = this._core.relative(this._core.current()),
      n = e.loop || e.rewind;
    this._controls.$relative.toggleClass("disabled", !e.nav || i), e.nav && (this._controls.$previous.toggleClass("disabled", !n && s <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !n && s >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !e.dots || i), e.dots && (t = this._pages.length - this._controls.$absolute.children().length, e.dotsData && 0 !== t ? this._controls.$absolute.html(this._templates.join("")) : 0 < t ? this._controls.$absolute.append(new Array(t + 1).join(this._templates[0])) : t < 0 && this._controls.$absolute.children().slice(t).remove(), 1 == e.dotNum && 0 !== t && this._controls.$absolute.children().each(function(t, e) {
      o(e).children().addClass("dot-number"), o(this).children().text(t + 1)
    }), e.dotSvg && 0 !== t && this._controls.$absolute.children().each(function(t, e) {
      o(e).children().append('<svg><circle class="circle-outer" cx="15" cy="15" r="12"/></svg>')
    }), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(o.inArray(this.current(), this._pages)).addClass("active"))
  }, s.prototype.onTrigger = function(t) {
    var e = this._core.settings;
    t.page = {
      index: o.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items)
    }
  }, s.prototype.current = function() {
    var i = this._core.relative(this._core.current());
    return o.grep(this._pages, o.proxy(function(t, e) {
      return t.start <= i && t.end >= i
    }, this)).pop()
  }, s.prototype.getPosition = function(t) {
    var e, i, s = this._core.settings;
    return "page" == s.slideBy ? (e = o.inArray(this.current(), this._pages), i = this._pages.length, t ? ++e : --e, e = this._pages[(e % i + i) % i].start) : (e = this._core.relative(this._core.current()), i = this._core.items().length, t ? e += s.slideBy : e -= s.slideBy), e
  }, s.prototype.next = function(t) {
    o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
  }, s.prototype.prev = function(t) {
    o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
  }, s.prototype.to = function(t, e, i) {
    var s;
    !i && this._pages.length ? (s = this._pages.length, o.proxy(this._overrides.to, this._core)(this._pages[(t % s + s) % s].start, e)) : o.proxy(this._overrides.to, this._core)(t, e)
  }, o.fn.BTQSlider.Constructor.Plugins.Navigation = s
}(window.Zepto || window.jQuery, window, document),
function(s, n, t, e) {
  "use strict";
  var i = function(t) {
    this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.btq.slidebox": s.proxy(function(t) {
        t.namespace && "URLHash" === this._core.settings.startPosition && s(n).trigger("hashchange.btq.navigation")
      }, this),
      "prepared.btq.slidebox": s.proxy(function(t) {
        if (t.namespace) {
          var e = s(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!e) return;
          this._hashes[e] = t.content
        }
      }, this),
      "changed.btq.slidebox": s.proxy(function(t) {
        if (t.namespace && "position" === t.property.name) {
          var i = this._core.items(this._core.relative(this._core.current())),
            e = s.map(this._hashes, function(t, e) {
              return t === i ? e : null
            }).join();
          if (!e || n.location.hash.slice(1) === e) return;
          n.location.hash = e
        }
      }, this)
    }, this._core.options = s.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), s(n).on("hashchange.btq.navigation", s.proxy(function(t) {
      var e = n.location.hash.substring(1),
        i = this._core.$stage.children(),
        s = this._hashes[e] && i.index(this._hashes[e]);
      void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0)
    }, this))
  };
  i.Defaults = {
    URLhashListener: !1
  }, i.prototype.destroy = function() {
    var t, e;
    for (t in s(n).off("hashchange.btq.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, s.fn.BTQSlider.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document),
function(n, t, e, o) {
  var r = n("<support>").get(0).style,
    a = "Webkit Moz O ms".split(" "),
    i = {
      transition: {
        end: {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
        }
      },
      animation: {
        end: {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
        }
      }
    },
    s = function() {
      return !!c("transform")
    },
    h = function() {
      return !!c("perspective")
    },
    l = function() {
      return !!c("animation")
    };

  function c(t, i) {
    var s = !1,
      e = t.charAt(0).toUpperCase() + t.slice(1);
    return n.each((t + " " + a.join(e + " ") + e).split(" "), function(t, e) {
      if (r[e] !== o) return s = !i || e, !1
    }), s
  }

  function d(t) {
    return c(t, !0)
  }(function() {
    return !!c("transition")
  })() && (n.support.transition = new String(d("transition")), n.support.transition.end = i.transition.end[n.support.transition]), l() && (n.support.animation = new String(d("animation")), n.support.animation.end = i.animation.end[n.support.animation]), s() && (n.support.transform = new String(d("transform")), n.support.transform3d = h())
}(window.Zepto || window.jQuery, window, document);
var ios, android, blackBerry, UCBrowser, Operamini, firefox, windows, smartphone, tablet, touchscreen, all, ua = navigator.userAgent,
  match = ua.match("MSIE (.)"),
  versions = match && 1 < match.length ? match[1] : "unknown",
  isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 0 < navigator.msMaxTouchPoints || 0 < navigator.maxTouchPoints,
  isDesktop = 0 <= $(window).width() && !isTouchDevice,
  IEMobile = ua.match(/IEMobile/i),
  isIE9 = /MSIE 9/i.test(ua),
  isIE10 = /MSIE 10/i.test(ua),
  isIE11 = !(!/rv:11.0/i.test(ua) || IEMobile),
  isEge = /Edge\/12./i.test(navigator.userAgent),
  isOpera = !!window.opr && !!opr.addons || !!window.opera || 0 <= ua.indexOf(" OPR/"),
  isFirefox = "undefined" != typeof InstallTrigger,
  isIE = !!document.documentMode,
  isEdge = !isIE && !!window.StyleMedia && !isIE11,
  isChrome = !!window.chrome && !!window.chrome.webstore,
  isBlink = (isChrome || isOpera) && !!window.CSS,
  isSafari = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || !isChrome && !isOpera && void 0 !== window.webkitAudioContext,
  AndroidVersion = parseFloat(ua.slice(ua.indexOf("Android") + 8)),
  Version = ua.match(/Android\s([0-9\.]*)/i),
  isMobile = {
    ios: ua.match(/iPhone|iPad|iPod/i),
    android: ua.match(/Android/i),
    blackBerry: ua.match(/BB10|Tablet|Mobile/i),
    UCBrowser: ua.match(/UCBrowser/i),
    Operamini: ua.match(/Opera Mini/i),
    windows: ua.match(/IEMobile/i),
    smartphone: ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 440 && window.innerHeight <= 740,
    tablet: ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 1366 && window.innerHeight <= 800,
    all: ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
  };
if (isTouchDevice ? $("html").addClass("touch") : $("html").addClass("no-touch"), isTouchDevice && null !== isMobile.all) var TouchLenght = !0;
else if (isMobile.tablet && isFirefox || isMobile.smartphone && isFirefox) TouchLenght = !0;
else TouchLenght = !1;
isMobile.Operamini && alert("Please disable Data Savings Mode");
var iOS = isMobile.ios,
  Hidden = !1,
  Loadx = 0;

function RanDom(e, t) {
  return Math.max(Math.random() * (.1 + t - e) + e)
}

function changeUrl(e, t, o, a, i, n, s) {
  void 0 !== window.history.pushState && (document.URL != e && "" != e && window.history.pushState({
    path: e,
    dataName: i,
    title: t,
    keyword: a,
    description: o,
    titleog: n,
    descriptionog: s
  }, "", e));
  "" != t && ($("#hdtitle").html(t), $('meta[property="og:description"]').remove(), $("#hdtitle").after('<meta property="og:description" content="' + s + '">'), $('meta[property="og:title"]').remove(), $("#hdtitle").after('<meta property="og:title" content="' + n + '">'), $('meta[property="og:url"]').remove(), $("#hdtitle").after('<meta property="og:url" content="' + e + '">'), $("meta[name=keywords]").remove(), $("#hdtitle").after('<meta name="keywords" content="' + a + '">'), $("meta[name=description]").remove(), $("#hdtitle").after('<meta name="description" content="' + o + '">')), $("#changlanguage_redirect").val(e)
}

function ResizeWindows() {
  $(window).height(), $(window).width(), $(window).height(), $(window).width();
  var e = $(window).width();
  $(window).height();
  $("#home-page").length && $(".content-center").each(function(e, t) {
    $(this).find(".box-project-home").length <= 1 && $(t).addClass("only-one")
  }), e <= 1100 ? ($(".banner-inner, .logo-section").css({
    transform: "translate3d(0,0,0)"
  }), $(".scrollA, .scrollB").length && $(".scrollA, .scrollB").getNiceScroll().remove(), $(".news-text img, .item-pic img, .load-details img, .details-text img, .project-masterplan img, .pic-destination img").addClass("zoom-pic")) : 1100 < e && $(".news-text img, .item-pic img, .load-details img, .details-text img, .project-masterplan img, .pic-destination img").removeClass("zoom-pic")
}

function DrawLoad() {
  var e = $(".load-present");
  Paths = $(e).find("path"), $(Paths).each(function(e, t) {
    var o = this.getTotalLength();
    (isIE10 || isIE11) && ($(this).css({
      "stroke-dasharray": o + " " + o
    }), $(this).css({
      "stroke-dashoffset": o,
      "stroke-dasharray": o + " " + o
    }), $(this).stop().animate({
      "stroke-dashoffset": 0
    }, 1500, "linear", function() {
      $(this).stop().animate({
        "stroke-dashoffset": o
      }, 1500, "linear")
    })), setTimeout(function() {
      $(".loadicon").addClass("show")
    }, 900)
  })
}

function Done() {
  ResizeWindows(), $(".box-img img").length && $(".box-img img").clipPath(), $(".go-top").removeClass("show"), $("#project-details-page, #search-page").length || $(".title-page > h1").lettering("words").children("span").lettering().children("span").lettering(), $(".open-click, .close-click small, .title-main h2, .title-pic h3").lettering(), 1100 < $(window).width() && $("#home-page, #about-page, #business-page, #sustainable-page, #library-page, #contact-page, #project-page").length && BoxSlide(), $(".container").stop().animate({
    opacity: 1
  }, 300, "linear", function() {
    SlidePicture(), $(".loadicon").addClass("blur"), HideMask(), $(".loadicon").stop().animate({
      opacity: 0
    }, 500, "linear", function() {
      ContentLoad(), $(".loadicon").remove()
    })
  }), $(".grid-item-bg").length && 1100 < $(window).width() && BgEffect(), Loadpic()
}

function Loadpic() {
  $(".pic-img").each(function(e, t) {
    var o = $(t).find("img").attr("src");
    if (o) {
      var a = o.replace(/(^url\()|(\)$|[\"\'])/g, "");
      $(t).css({
        "background-image": "url(" + a + ")"
      })
    }
  })
}

function ScrollNiceA() {
  1100 < $(window).width() && $("html").hasClass("no-touch") ? ($(".show-text .value-slide").length && ($(".active .scrollA").getNiceScroll().show(), $(".active .scrollA").niceScroll({
    touchbehavior: !0,
    horizrailenabled: !1,
    cursordragontouch: !0,
    grabcursorenabled: !1,
    cursorfixedheight: 150,
    zindex: 10
  }), $(".active .scrollA").scrollTop(0)), $(".show-text .text-intro").length ? (console.log("abv"), $(".text-intro .scrollA").getNiceScroll().show(), $(".text-intro .scrollA").niceScroll({
    touchbehavior: !1,
    horizrailenabled: !1,
    cursordragontouch: !1,
    grabcursorenabled: !1,
    cursorfixedheight: 150,
    zindex: 10
  }), $(".text-intro .scrollA").scrollTop(0)) : ($(".scrollA").getNiceScroll().show(), $(".scrollA").niceScroll({
    touchbehavior: !0,
    horizrailenabled: !1,
    cursordragontouch: !0,
    grabcursorenabled: !1,
    cursorfixedheight: 150,
    zindex: 10
  }), $(".scrollA").scrollTop(0))) : $(".scrollA").getNiceScroll().remove()
}

function ScrollNiceB() {
  1100 < $(window).width() && $("html").hasClass("no-touch") ? ($(".scrollB").getNiceScroll().show(), $(".scrollB").niceScroll({
    touchbehavior: !0,
    horizrailenabled: !1,
    cursordragontouch: !0,
    grabcursorenabled: !1,
    cursorfixedheight: 150,
    zindex: 10
  }), $(".scrollB").scrollTop(0)) : $(".scrollB").getNiceScroll().remove()
}

function ScrollBody() {
  $("body").hasClass("no-scroll") ? $("body").getNiceScroll().remove() : 1100 < $(window).width() && $("html").hasClass("no-touch") ? ($("body").addClass("smooth"), $("body").getNiceScroll().show(), $("body").getNiceScroll().resize(), $("body").niceScroll({
    touchbehavior: !1,
    horizrailenabled: !1,
    cursordragontouch: !1,
    grabcursorenabled: !1,
    background: "rgba(0,0,0,0.2)",
    zindex: 5
  })) : $("body").hasClass("smooth") && ($("body").removeClass("smooth"), $("body").getNiceScroll().remove())
}

function ScrollDetails() {
  1100 < $(window).width() && $("html").hasClass("no-touch") ? ($(".details-content").getNiceScroll().show(), $(".details-content").getNiceScroll().resize(), $(".details-content").niceScroll({
    touchbehavior: !1,
    horizrailenabled: !1,
    cursordragontouch: !1,
    grabcursorenabled: !1,
    background: "rgba(0,0,0,0.2)",
    zindex: 99999
  }), $(".details-content").scrollTop(0)) : $(".nicescroll-rails").length && $(".details-content").getNiceScroll().remove()
}

function ScrollNiceHide() {
  $(".scrollA").length && $(".scrollA").getNiceScroll().remove(), $(".scrollB").length && $(".scrollB").getNiceScroll().remove()
}

function HideMask() {
  var e = $(".shape-svg path").attr("pathdata"),
    t = new TimelineLite({
      paused: !1
    });
  t.to($(".shape-svg path"), RanDom(.1, .5), {
    attr: {
      d: e
    },
    repeat: -1,
    yoyo: !0,
    ease: Power4.easeInOut
  }), TweenLite.to($(".mask"), 1.2, {
    y: "-100%",
    ease: Quad.easeOut,
    onComplete: function() {
      t.pause()
    }
  })
}

function initialize() {
  $(".httpserver").text();
  var e = $(".httptemplate").text();
  $(".infobox-text-email").text(), $(".infobox-text-tel").text(), $(".infobox-text-fax").text(), $(".infobox-text-website").text(), $(".infobox-text-address").text();
  infoboxaddress_distribution = $(".infobox-address").text(), infoboxlocationlat_distribution = $(".infobox-location-lat").text(), infoboxlocationlng_distribution = $(".infobox-location-lng").text(), infoboximage_distribution = $(".infobox-image").text(), infoboximageicon_distribution = $(".infobox-image-icon").text(), infoboxgooglemap_distribution = $(".infobox-googlemap").text(), infoboxtitle_distribution = $(".infobox-name").text(), infoboxphone_distribution = $(".infobox-phone").text(), infoboxfax_distribution = $(".infobox-fax").text(), infoboxphonetel_distribution = $(".infobox-phone-tel").text(), infoboxemail_distribution = $(".infobox-email").text(), infoboxwebsite_distribution = $(".infobox-website").text();
  var t, o = new google.maps.LatLng(infoboxlocationlat_distribution, infoboxlocationlng_distribution),
    a = [],
    i = new google.maps.StyledMapType([{
      stylers: [{
        hue: "#929292"
      }, {
        saturation: -100
      }]
    }, {
      featureType: "road",
      elementType: "geometry",
      stylers: [{
        lightness: -5
      }, {
        visibility: "simplified"
      }]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [{
        visibility: "on"
      }]
    }], {
      name: "Styled Map"
    }),
    n = {
      center: o,
      zoom: 14,
      disableDefaultUI: !0,
      clickableIcons: !1,
      scrollwheel: !1,
      draggable: !1,
      fullscreenControl: !0,
      gestureHandling: "cooperative",
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"],
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    },
    s = new google.maps.Map(document.getElementById("map-canvas"), n);
  s.mapTypes.set("map_style", i), s.setMapTypeId("map_style"), google.maps.event.addDomListener(window, "resize", function() {
    window.innerWidth <= 1100 && s.setOptions({
      scrollwheel: !1
    }), google.maps.event.trigger(s, "resize"), s.setCenter(o), s.setZoom(14)
  });
  var r = "";
  "" != infoboxaddress_distribution && (r = r + "<p><strong>A</strong> " + infoboxaddress_distribution + "</p>"), "" != infoboxphone_distribution && (r = r + "<p><strong>T</strong> " + infoboxphone_distribution + "</p>"), "" != infoboxemail_distribution && (r = r + "<p><strong>E</strong> " + infoboxemail_distribution + "</p>");
  var l = "<h3>" + infoboxtitle_distribution + "</h3>" + r,
    c = (infoboxtitle_distribution, e + "default/images/marker.svg"),
    d = new google.maps.InfoWindow,
    h = "<div class='infobox'><div class='infobox-inner'>" + l + "</div><span class='close-box-map'></span></div>";

  function u(e) {
    t = new google.maps.Marker({
      map: s,
      animation: google.maps.Animation.DROP,
      position: e,
      icon: c,
      info: h,
      draggable: !1
    }), a.push(t), google.maps.event.addListener(t, "click", function() {
      var e;
      d.setContent(this.info), d.open(s, this), s.setCenter(t.getPosition()), s.setZoom(18), null !== t.getAnimation() ? t.setAnimation(null) : t.setAnimation(google.maps.Animation.BOUNCE), e = s, $("#map-canvas").on("click", ".close-box-map", function() {
        d.close(e, this), t.setAnimation(null)
      })
    })
  }

  function p(e) {
    for (var t = 0; t < a.length; t++) a[t].setMap(e)
  }

  function m() {
    p(null), a = []
  }
  u(o), $(".put-show").on("click", function() {
    u(o), $(".content-map-box").removeClass("empty")
  }), $(".put-hide").on("click", function() {
    m(), $(".content-map-box").addClass("empty")
  }), $(".full-map").on("click", function() {
    $(".map-box").hasClass("show") ? ($("body").removeClass("fullscreen"), $("html, body").removeClass("no-scroll"), $(".header, .footer, .go-top, .wheel, .box-nav, .title-page").removeClass("headermap"), $(".container, .content-main").removeClass("mapshow"), $(".map-box").removeClass("show"), $(".cursor-modern").removeClass("level-index-in"), setTimeout(function() {
      $(".group-central").addClass("show-text"), $(".box-contact-main").removeClass("headermap")
    }, 800), s.setOptions({
      scrollwheel: !1,
      draggable: !1
    }), s.setCenter(o), s.setZoom(11)) : ($("body").addClass("fullscreen"), $("html, body").addClass("no-scroll"), $(".header, .footer, .go-top, .wheel, .box-nav, .title-page, .box-contact-main").addClass("headermap"), $(".container, .content-main").addClass("mapshow"), $(".group-central").removeClass("show-text"), $(".map-box").addClass("show"), $(".cursor-modern").addClass("level-index-in"), s.setOptions({
      scrollwheel: !0,
      draggable: !0
    }))
  }), screenfull.enabled && screenfull.on("change", function() {
    screenfull.isFullscreen ? ($(".map-box").addClass("full-screen"), s.setOptions({
      scrollwheel: !0,
      draggable: !0
    })) : ($(".map-box").removeClass("full-screen"), s.setOptions({
      scrollwheel: !1,
      draggable: !1
    }), s.setCenter(o))
  }), ZoomControl(s)
}

function ZoomControl(t) {
  $(".zoom-control a").on("click", function() {
    var e = t.getZoom();
    switch ($(this).attr("id")) {
      case "zoom-in":
        t.setZoom(++e);
        break;
      case "zoom-out":
        t.setZoom(--e)
    }
    return !1
  })
}! function(h) {
  h.fn.clipPath = function() {
    return this.filter("[data-mask]").each(function(e) {
      var t = h(this).attr("data-mask"),
        o = h(this).attr("data-path"),
        a = h(this).attr("data-path2"),
        i = h(this).attr("src"),
        n = h(this).attr("data-width"),
        s = h(this).attr("data-height"),
        r = parseFloat(n, 10),
        l = parseFloat(s, 10),
        c = e;
      if (o || a) var d = h('<svg xmlns="http://www.w3.org/2000/svg" class="svgMask" x="0px" y="0px" width="' + n + '" height="' + s + '" viewBox="0 0 ' + r + " " + l + '"><defs><clipPath id="maskID' + c + '"><path d="' + t + '" pathdata="' + o + '" pathdata2="' + a + '"/></clipPath></defs><image clip-path="url(#maskID' + c + ')" width="' + n + '" height="' + s + '" xlink:href="' + i + '" /></svg>');
      else d = h('<svg xmlns="http://www.w3.org/2000/svg" class="svgMask" x="0px" y="0px" width="' + n + '" height="' + s + '" viewBox="0 0 ' + r + " " + l + '"><defs><clipPath id="maskID' + c + '"><path d="' + t + '"/></clipPath></defs><image clip-path="url(#maskID' + c + ')" width="' + n + '" height="' + s + '" xlink:href="' + i + '"/></svg>');
      h(this).replaceWith(d), delete t
    }), this
  }
}(jQuery), $(document).ready(function() {
  if (ResizeWindows(), $(".loadicon").hasClass("loading") || ($(".loadicon").addClass("loading"), DrawLoad()), $("#home-page, #about-page, #business-page, #sustainable-page, #library-page, #project-page, #contact-page").length || ($("body").addClass("auto"), 1100 < $(window).width() && $("html").hasClass("no-touch") && ScrollBody()), $(".box-nav li").length <= 1 && ($(".box-nav").css({
      display: "none"
    }), $(".box-slider").addClass("single")), 1100 < $(window).width() && $(".bg-menu").length && LoadCanvas(), isIE10 || isIE11 ? $("body").addClass("is-IE") : isEdge ? $("body").addClass("is-Edge") : iOS ? $("body").addClass("is-IOS") : isSafari ? $("body").addClass("is-Safari") : isChrome && $("body").addClass("is-Chrome"), $(".outer-nav").length) {
    e = $(".outer-nav").clone(), $(".header").append(e), $(e).addClass("second"), $(e).find(".sub-nav").removeClass("ani-item")
  }
  var e
});
var BgEffect = function() {
    var a = document.querySelectorAll(".show-text canvas"),
      e = document.querySelectorAll(".grid-item-bg");
    $(e).each(function(e, t) {
      var o = Array.from(t.querySelectorAll("img"));
      a.length ? $(".enter-button").trigger("click") : new hoverEffect({
        parent: t,
        intensity: .3,
        speedIn: 1.2,
        speedOut: 0,
        easing: t.dataset.easing,
        hover: !1,
        image1: o[0].getAttribute("src"),
        image2: o[1].getAttribute("src"),
        displacementImage: t.dataset.displacement
      })
    })
  },
  WEBGL = {
    isWebGLAvailable: function() {
      try {
        var e = document.createElement("canvas");
        return !(!window.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
      } catch (e) {
        return !1
      }
    },
    isWebGL2Available: function() {
      try {
        var e = document.createElement("canvas");
        return !(!window.WebGL2RenderingContext || !e.getContext("webgl2"))
      } catch (e) {
        return !1
      }
    }
  },
  hoverEffect = function(e) {
    function t() {
      for (var e = 0; e < arguments.length; e++)
        if (void 0 !== arguments[e]) return arguments[e]
    }
    var o = e.parent,
      a = e.displacementImage,
      i = e.image1,
      n = e.image2,
      s = t(e.intensity1, e.intensity, 1),
      r = t(e.intensity2, e.intensity, 1),
      l = t(e.angle, Math.PI / 4),
      c = t(e.angle1, l),
      d = t(e.angle2, 3 * -l),
      h = t(e.speedIn, e.speed, 1.6),
      u = t(e.speedOut, e.speed, 1.2),
      p = t(e.hover, !0),
      m = t(e.easing, Expo.easeOut);
    if (o)
      if (i && n && a) {
        var g = new THREE.Scene,
          v = new THREE.OrthographicCamera(o.offsetWidth / -2, o.offsetWidth / 2, o.offsetHeight / 2, o.offsetHeight / -2, 1, 1e3);
        v.position.z = 1;
        var f = new THREE.WebGLRenderer({
          antialias: !1,
          alpha: !0
        });
        f.setPixelRatio(window.devicePixelRatio), f.setClearColor(16777215, 0), f.setSize(o.offsetWidth, o.offsetHeight), o.appendChild(f.domElement);
        var w = function() {
            f.render(g, v)
          },
          b = new THREE.TextureLoader;
        b.crossOrigin = "";
        var x = b.load(a, w);
        x.wrapS = x.wrapT = THREE.RepeatWrapping;
        var y = b.load(i, w),
          C = b.load(n, w);
        y.magFilter = C.magFilter = THREE.LinearFilter, y.minFilter = C.minFilter = THREE.LinearFilter;
        var k = new THREE.ShaderMaterial({
            uniforms: {
              intensity1: {
                type: "f",
                value: s
              },
              intensity2: {
                type: "f",
                value: r
              },
              dispFactor: {
                type: "f",
                value: 0
              },
              angle1: {
                type: "f",
                value: c
              },
              angle2: {
                type: "f",
                value: d
              },
              texture1: {
                type: "t",
                value: y
              },
              texture2: {
                type: "t",
                value: C
              },
              disp: {
                type: "t",
                value: x
              }
            },
            vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",
            fragmentShader: "\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n",
            transparent: !0,
            opacity: 1
          }),
          T = new THREE.PlaneBufferGeometry(o.offsetWidth, o.offsetHeight, 1),
          E = new THREE.Mesh(T, k);
        g.add(E);
        p && (o.addEventListener("mouseenter", function(e) {
          TweenMax.to(k.uniforms.dispFactor, h, {
            value: 1,
            ease: m
          })
        }), o.addEventListener("mouseleave", function(e) {
          TweenMax.to(k.uniforms.dispFactor, u, {
            value: 0,
            ease: m
          })
        })), this.next = function() {
          TweenMax.to(k.uniforms.dispFactor, h, {
            value: 1,
            ease: m
          })
        }, this.previous = function() {
          TweenMax.to(k.uniforms.dispFactor, u, {
            value: 0,
            ease: m
          })
        }, $(".enter-button").on("click", function() {
          TweenMax.to(k.uniforms.dispFactor, u, {
            value: 0
          }), setTimeout(function() {
            $(".show-text canvas").addClass("show"), TweenMax.to(k.uniforms.dispFactor, h, {
              value: 1
            })
          }, 150)
        }), window.addEventListener("resize", function(e) {
          f.setSize(o.offsetWidth, o.offsetHeight)
        });
        WEBGL.isWebGLAvailable() && (o.classList.add("three"), function e() {
          w(), requestAnimationFrame(e)
        }())
      } else console.warn("One or more images are missing");
    else console.warn("Parent missing")
  };

function NavAni() {
  $(".nav-click").addClass("show"), new TimelineLite({
    delay: .5,
    onComplete: function() {
      $(".nav-click").addClass("show-line")
    }
  }).staggerTo($(".open-click span"), .4, {
    opacity: 1,
    ease: Power0.easeOut
  }, -.1, .15)
}
var Expand = function() {
    $(".youtube-video iframe").length && $(".pause-button").trigger("click"), $("html, body").addClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), $(".navigation").scrollTop(0), $(".overlay-menu, .navigation").addClass("show"), $(".logo").addClass("active"), $(".play-svg").trigger("click"), $(".header").addClass("more-light");
    var e = new TimelineLite;
    TweenLite.set($(".nav li a span"), {
      opacity: 0
    }), $(".nav li a span").each(function(e, t) {
      TweenLite.to($(t), .6, {
        opacity: 1,
        delay: RanDom(.75, 1),
        ease: Power0.easeOut,
        onComplete: function() {
          $(".nav-click").addClass("toclick"), $(".nav-click").removeClass("show-line")
        }
      })
    }), e.staggerTo($(".open-click span"), .3, {
      opacity: 0,
      ease: Power0.easeOut
    }, -.1, .15), e.staggerTo($(".close-click small span"), .4, {
      opacity: 1,
      ease: Power0.easeOut
    }, -.1, .15), e.call(function() {
      $(".nav-click").addClass("active"), $(".show-text .circle-morph, .show-text .wave-ani").length && $(".stop-wave").trigger("click"), 1100 < $(window).width() && $(".play-canvas").trigger("click"), $(".cursor-modern").addClass("level-index-in")
    }, null, null, .6)
  },
  Collapse = function() {
    1100 < $(window).width() && $(".stop-canvas").trigger("click"), $(".stop-svg").trigger("click"), $(".navigation").scrollTop(0), $(".navigation").removeClass("show"), $(".header").removeClass("more-light");
    var e = new TimelineLite;
    e.staggerTo($(".open-click span"), .4, {
      opacity: 1,
      delay: .4,
      ease: Power0.easeOut
    }, -.1, .15), e.staggerTo($(".close-click small span"), .3, {
      opacity: 0,
      ease: Power0.easeOut
    }, -.1, .15), e.call(function() {
      $(".nav-click").removeClass("active toclick").addClass("show-line"), $(".cursor-modern").removeClass("level-index-in")
    }, null, null, .4), TweenLite.to($(".nav li a span"), .4, {
      opacity: 0,
      delay: 0,
      ease: Power0.easeOut,
      onComplete: function() {
        $("html, body").removeClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), $(".logo").removeClass("active"), $(".overlay-menu").removeClass("show"), $(".show-text .circle-morph, .show-text .wave-ani").length && $(".play-wave").trigger("click"), $(".youtube-video iframe").length && $('.group-central[data-name="video-home"]').hasClass("show-text") && $(".play-button").trigger("click")
      }
    })
  };

function LoadCanvas() {
  function e(e, t) {
    return Math.random() * (t - e) + e
  }
  var t = $(window).width(),
    o = $(window).height(),
    a = t / o,
    i = o,
    n = i * a;
  t < n && (i = (n = t) / a);
  var s, r, l, c, d = [],
    h = [];
  if (d.width = n, d.height = i, h.width = n, t < (h.height = i)) var u = 11 * Math.floor(i / n);
  else u = 11 * Math.floor(n / i);

  function p(e, t) {
    this.y -= this.speed, this.y < -window.innerHeight / this.z && (this.y = window.innerHeight / 1.1 / this.z)
  }
  if (canvallax.createGradient = (l = document.createElement("canvas").getContext("2d"), c = {
      x0: 200,
      y0: 0,
      x1: 200,
      y1: 0,
      x2: 200,
      y2: 0,
      x3: 200,
      y3: 0,
      size: 200,
      angle: 0,
      colors: ["#ccc", "#fff", "#ccc", "#fff"]
    }, function(e) {
      for (var t = canvallax.extend({}, c, e), o = l.createLinearGradient(t.x0, t.y0, t.x1, t.y1, t.x2, t.y2, t.x3, t.y3), a = t.colors || [], i = a.length, n = 1 / i, s = 0; s < i; s++) o.addColorStop(s * n, a[s]);
      return o
    }), $(".bg-menu").length)
    for (var m = canvallax.Scene({
        className: "bg-menu",
        parentElement: document.getElementById("canvas-menu"),
        fullscreen: !0,
        width: t,
        height: o
      }), g = 0; g < u; g++) r = e(.1, 1.5), s = canvallax.Polygon({
      points: 100,
      width: 40,
      height: 40,
      x: g * (n / u) / r,
      y: e(-300, i),
      z: r,
      zIndex: 3 + 10 * r,
      opacity: e(.1, .3),
      fill: canvallax.createGradient({
        x0: 0,
        y0: 220,
        x1: 220,
        y1: 0,
        x2: 0,
        y2: 220,
        colors: ["#fff"]
      }),
      speed: e(3, 6),
      postRender: p
    }), h.push(s);
  window.requestAnimationFrame(function() {
    $(".bg-menu").length && (m.add(h), $(".bg-menu").addClass("ani-canvas"), 1 < $(".bg-menu canvas").length && $(".bg-menu canvas").last().remove())
  }), $(".play-canvas").on("click", function(e) {
    e.preventDefault(), m.play(d), $(".bg-menu").stop().fadeIn(600, "linear")
  }), $(".stop-canvas").on("click", function(e) {
    e.preventDefault(), m.stop(d), $(".bg-menu").stop().fadeOut(300, "linear")
  }), window.addEventListener("resize", function() {
    var e = $(window).width(),
      t = $(window).height(),
      o = e / t,
      a = t,
      i = a * o;
    e < i && (a = (i = e) / o), $(".bg-menu").length && (h.width = i, h.height = a)
  }), $(".nav-click").hasClass("active") ? $(".play-canvas").trigger("click") : $(".stop-canvas").trigger("click")
}
if ($(".animation").length) {
  function MenuWave() {
    var a = new TimelineLite({
      paused: !1
    });
    Paths = $(".animation path"), $(Paths).each(function(e, t) {
      var o = $(t).attr("pathdata");
      a.to($(t), 2, {
        attr: {
          d: o
        },
        ease: Power1.easeInOut,
        repeat: -1,
        yoyo: !0
      })
    }), $(".play-svg").on("click", function(e) {
      e.preventDefault(), a.play()
    }), $(".stop-svg").on("click", function(e) {
      e.preventDefault(), a.pause()
    })
  }
  MenuWave(), setTimeout(function() {
    $(".stop-svg").trigger("click")
  }, 4e3)
}
if ($(".circle-morph").length) {
  function MorphWave() {
    var a = new TimelineLite({
      paused: !1
    });
    Paths = $(".circle-morph path"), $(Paths).each(function(e, t) {
      var o = $(t).attr("pathdata");
      a.to($(t), RanDom(3, 5), {
        attr: {
          d: o
        },
        ease: Power1.easeInOut,
        repeat: -1,
        yoyo: !0
      }), $(".play-wave").on("click", function(e) {
        e.preventDefault(), a.play();
        $(".show-text .circle-morph").attr("data-id")
      }), $(".stop-wave").on("click", function(e) {
        e.preventDefault(), a.pause()
      })
    })
  }
  MorphWave(), $(".stop-wave").trigger("click")
}
if ($(".wave-ani").length) {
  var AniBG = function(e) {
    var a = new TimelineLite({
      paused: !1
    });
    Paths = $(".in-play[data-id='" + e + "'] path"), $(Paths).each(function(e, t) {
      var o = $(t).attr("pathdata");
      a.to($(t), RanDom(2.5, 3.8), {
        attr: {
          d: o
        },
        ease: Power1.easeInOut,
        repeat: -1,
        yoyo: !0
      })
    }), $(".stop-wave").on("click", function(e) {
      e.preventDefault(), a.pause(), a.progress(0), $(".wave-ani").removeClass("in-play")
    })
  };
  $(".play-wave").on("click", function(e) {
    e.preventDefault(), $(".show-text .wave-ani").addClass("in-play");
    var t = $(".show-text .wave-ani").attr("data-id");
    requestAnimationFrame(function() {
      AniBG(t), MoveSVG(t)
    })
  })
}
if ($(".box-img").length) {
  var AniIMG = function(e) {
    var t = new TimelineMax({
      paused: !1,
      repeat: -1,
      delay: .5,
      repeatDelay: .5,
      yoyo: !0
    });
    Paths = $(".in-play clipPath[id='" + e + "'] path");
    var o = $(Paths).attr("d"),
      a = $(Paths).attr("pathdata"),
      i = $(Paths).attr("pathdata2");
    t.to($(Paths), 4, {
      attr: {
        d: a
      },
      ease: Power0.easeInOut
    }), t.to($(Paths), 6, {
      attr: {
        d: i
      },
      ease: Power1.easeInOut
    }), t.to($(Paths), 4, {
      attr: {
        d: o
      },
      ease: Power2.easeInOut
    }), $(".stop-wave").on("click", function(e) {
      e.preventDefault(), t.pause(), t.progress(0), $(".box-img").removeClass("in-play")
    })
  };
  $(".play-wave").on("click", function(e) {
    if (e.preventDefault(), $(".show-text .box-img").addClass("in-play"), $(".show-text .in-play clipPath path").attr("pathdata")) {
      var t = $(".show-text .in-play clipPath").attr("id");
      requestAnimationFrame(function() {
        AniIMG(t)
      })
    }
  })
}

function MoveSVG(h) {
  var u = function(e, t, o, a, i) {
      var n = (e - t) / (o - a);
      return n * i + (t - n * a)
    },
    p = {
      width: window.innerWidth,
      height: window.innerHeight
    },
    m = p.width / 8,
    g = p.height / 4,
    v = 45,
    f = [.8, 2],
    w = [.8, 2];
  document.addEventListener("mousemove", function(d) {
    requestAnimationFrame(function() {
      el = $(".in-play[data-id='" + h + "']");
      var e, t, o, a = (o = t = 0, (e = d) || window.event, e.pageX || e.pageY ? (t = e.pageX, o = e.pageY) : (e.clientX || e.clientY) && (t = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, o = e.clientY + document.body.scrollTop + document.documentElement.scrollTop), {
          x: t,
          y: o
        }),
        i = 2 * v / p.height * a.y - v,
        n = a.x < p.width / 2 ? u(f[0], f[1], p.width / 2, 0, a.x) : u(f[1], f[0], p.width, p.width / 2, a.x),
        s = a.y < p.height / 2 ? u(w[0], w[1], p.height / 2, 0, a.y) : u(w[1], w[0], p.height, p.height / 2, a.y),
        r = 2 * m / p.width * a.x - m,
        l = 2 * g / p.height * a.y - g;
      if ($("#business-page").length) var c = "translate3d(".concat(r, "px, ").concat(l, "px,0) scale3d(").concat(n, ",").concat(s, ",1)");
      else c = $("body").hasClass("auto") ? "translate3d(".concat(r, "px, ").concat(0, "px,0) rotate3d(0,0,1,").concat(i, "deg)") : "translate3d(".concat(r, "px, ").concat(l, "px,0) rotate3d(0,0,1,").concat(i, "deg) scale3d(").concat(n, ",").concat(s, ",1)");
      $(el).css({
        transform: c
      })
    })
  })
}

function cursorOut() {
  $("div").removeClass("hover-but hover-zoom drag-x hover-nav-next hover-nav-prev hover-open cursor-none hover-full")
}

function changeCursor() {
  $(document).on("mousemove", function(e) {
    X = e.pageX, Y = e.pageY, $(".click").css({
      top: Y + "px",
      left: X + "px"
    }), $(".first").css({
      top: Y + 0 + "px",
      left: X + 0 + "px"
    }), $(".second").css({
      top: Y + 0 + "px",
      left: X + 0 + "px"
    })
  })
}

function customCursor() {
  if (isDesktop && 1100 < $(window).width()) {
    $(".cursor-modern").length || $("body").append('<div class="cursor-modern"><span class="click"></span><span class="first"></span><span class="second"></span></div>'), $(".cursor-modern").addClass("desktop"), Hidden = !0;
    var e = $(".cursor-modern.desktop"),
      t = $("a:not(.zoom, .view-video, .full-map, .view-album), button"),
      o = $(".slide-next"),
      a = $(".slide-prev"),
      i = $(".wheel"),
      n = $(".go-top"),
      s = $(".zoom"),
      r = $(".full-map"),
      l = $(".nav-click:not(.active)"),
      c = $(".view-video,.player, .view-album");
    if (Slide = $(".member-box, .item-pic, .dark-color"), 1 == Hidden) return changeCursor(), $(t).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-but")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-but")
    }), $(o).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-nav-next")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-nav-next")
    }), $(a).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-nav-prev")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-nav-prev")
    }), $(n).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-gotop")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-gotop")
    }), $(i).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-wheel")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-wheel")
    }), $(c).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-view")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-view")
    }), $(s).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-zoom")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-zoom")
    }), $(r).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-full")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-full")
    }), $(l).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("hover-open")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("hover-open")
    }), $(Slide).mouseover(function() {
      isDesktop && 1100 < $(window).width() && $(this).addClass("cursor-none"), $(e).addClass("drag-x")
    }).mouseout(function() {
      $(this).removeClass("cursor-none"), $(e).removeClass("drag-x")
    }), !1
  } else $(".cursor-modern").length && $(".cursor-modern").remove(), Hidden = !1, $(".cursor-modern").removeClass("desktop")
}
if ($(window).on("beforeunload", function() {
    $(window).scrollTop(0)
  }), $(".ani-item").length) {
  var el = document.querySelector(".ani-item");

  function hintBrowser() {
    this.style.willChange = "transform, opacity"
  }

  function removeHint() {
    this.style.willChange = "auto"
  }
  el.addEventListener("mouseenter", hintBrowser), el.addEventListener("animationEnd", removeHint)
}
var timex, show;
! function(e) {
  var n = {
    on: e.fn.on,
    bind: e.fn.bind
  };
  e.each(n, function(t) {
    e.fn[t] = function() {
      var a, e = [].slice.call(arguments),
        o = e.pop(),
        i = e.pop();
      return e.push(function() {
        var e = this,
          t = arguments;
        clearTimeout(a), a = setTimeout(function() {
          i.apply(e, [].slice.call(t))
        }, o)
      }), n[t].apply(this, isNaN(o) ? arguments : e)
    }
  })
}(jQuery);
var News = 0,
  Details = 0,
  Videoload = 0,
  doWheel = !0,
  doTouch = !0,
  windscroll = $(document).scrollTop();

function onScroll() {
  var e = $(".ani-item, .ani-item-2");
  $(e).each(function(e, t) {
    $(t).isInViewport() && $(t).addClass("on-show")
  });
  var t = $(".text-ani-item");
  $(t).each(function(e, t) {
    $(t).isInViewport() && $(t).children().children().each(function(e) {
      var t = $(this);
      setTimeout(function() {
        $(t).addClass("move")
      }, 100 * (e + 1))
    })
  })
}

function AnimationDelay() {
  var e = $(".nav li"),
    t = $(".four-item, .box-news, .bidding-news");
  $(e).each(function(e, t) {
    var a = 100 * Math.floor(e) + 300;
    $(t).css({
      "-webkit-animation-delay": a + "ms",
      "animation-delay": a + "ms"
    })
  }), $(t).each(function(e, t) {
    var a = 100 * Math.floor(e);
    $(t).css({
      "-webkit-animation-delay": a + "ms",
      "animation-delay": a + "ms"
    })
  })
}

function NavClick() {
  $(".nav-click").bind("click", function() {
    return $(".nav-click").hasClass("active") ? Collapse() : Expand(), !1
  }), $(".nav li a, .overlay-menu").on("click", function() {
    $(".nav-click").hasClass("active") && $(".nav-click").trigger("click")
  })
}

function BoxSlide() {
  var e, a = $(".group-central").length,
    n = $(".group-central").index(),
    o = !1;

  function s() {
    setTimeout(function() {
      TweenLite.set($(".group-central").not($(".group-central")[n]), {
        y: "100%"
      }), o = !1
    }, 1e3)
  }

  function i() {
    o = !0, TweenLite.set($(".group-central"), {
      zIndex: ""
    }), $(".wheel").addClass("show"), $(".go-top").removeClass("show-g"), $(".box-nav li").removeClass("current"), $(".youtube-video iframe").length && ($(".pause-button").trigger("click"), clearInterval(timer)), 0 < e && clearInterval(e), $(".scrollA").length && ($(".scrollA").scrollTop(0), $(".scrollA").getNiceScroll().remove()), $("#home-page").length && $(".stop-mask").trigger("click"), $(".sustainable-slide").length && $(".sustainable-slide").trigger("stop.btq.autoplay"), cursorOut(), TweenLite.fromTo($(".group-central")[n], .8, {
      zIndex: 2
    }, {
      y: "0%",
      ease: Quad.easeOut,
      onComplete: function() {
        if ($(".group-central").removeClass("show-text"), $(".group-central").eq(n).addClass("show-text"), $(".box-nav li").eq(n).addClass("current"), $(".grid-item-bg canvas").removeClass("show"), $(".stop-wave").trigger("click"), $(".bg-egg, .pic-intro").length && CancelMove(), $(".show-text .bg-egg, .show-text .pic-intro").length && MoveBackground(), $(".show-text .sustainable-slide").length && $(".sustainable-slide").trigger("play.btq.autoplay"), $('.group-central[data-name="banner-home"]').hasClass("show-text") && ($(".slide-mask").trigger("next.btq.slidebox"), $(".play-mask").trigger("click")), $(".show-text .scrollA").length && setTimeout(function() {
            ScrollNiceA()
          }, 2e3), $(".group-central:last-child").hasClass("show-text") && ($(".wheel").removeClass("show"), $(".go-top").addClass("show-g")), $("#library-page").length && $(".group-central").hasClass("show-text") && AniTitle(), $(".youtube-video iframe").length && $('.group-central[data-name="video-home"]').hasClass("show-text") && (clearInterval(timer), timer = setInterval(function() {
            $(".play-button").trigger("click")
          }, 500)), $(".show-text .grid-item-bg").length && BgEffect(), $(".show-text .circle-morph, .show-text .wave-ani").length && $(".play-wave").trigger("click"), $("#about-page, #business-page, #sustainable-page, #library-page").length) {
          $(".group-central.show-text").attr("data-name");
          var e = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("href"),
            t = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-title"),
            a = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-keyword"),
            o = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-description"),
            i = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-page");
          changeUrl(e, t, o, a, i, t, o)
        }
        s()
      }
    })
  }

  function l() {
    o = !0, TweenLite.set($(".group-central"), {
      zIndex: ""
    }), $(".box-nav li").removeClass("current"), $(".wheel").addClass("show"), $(".go-top").removeClass("show-g"), $(".youtube-video iframe").length && ($(".pause-button").trigger("click"), clearInterval(timer)), 0 < timer && (clearTimeout(timer), timer = 0), $(".scrollA").length && ($(".scrollA").scrollTop(0), $(".scrollA").getNiceScroll().remove()), $("#home-page").length && $(".stop-mask").trigger("click"), $(".sustainable-slide").length && $(".sustainable-slide").trigger("stop.btq.autoplay"), cursorOut(), TweenLite.fromTo($(".group-central")[n], .8, {
      y: "-100%",
      zIndex: 2
    }, {
      y: "0%",
      ease: Quad.easeOut,
      onComplete: function() {
        if ($(".group-central").removeClass("show-text"), $(".group-central").eq(n).addClass("show-text"), $(".box-nav li").eq(n).addClass("current"), $(".grid-item-bg canvas").removeClass("show"), $(".stop-wave").trigger("click"), $(".bg-egg, .pic-intro").length && CancelMove(), $(".show-text .bg-egg, .show-text .pic-intro").length && MoveBackground(), $(".show-text .sustainable-slide").length && $(".sustainable-slide").trigger("play.btq.autoplay"), $('.group-central[data-name="banner-home"]').hasClass("show-text") && ($(".slide-mask").trigger("next.btq.slidebox"), $(".play-mask").trigger("click")), $(".group-central:last-child").hasClass("show-text") && ($(".wheel").removeClass("show"), $(".go-top").addClass("show-g")), $("#library-page").length && $(".group-central").hasClass("show-text") && AniTitle(), $(".youtube-video iframe").length && $('.group-central[data-name="video-home"]').hasClass("show-text") && (clearInterval(timer), timer = setInterval(function() {
            $(".play-button").trigger("click")
          }, 500)), $(".show-text .scrollA").length && setTimeout(function() {
            ScrollNiceA()
          }, 1e3), $(".show-text .grid-item-bg").length && BgEffect(), $(".show-text .circle-morph, .show-text .wave-ani").length && $(".play-wave").trigger("click"), $("#about-page, #business-page, #sustainable-page, #library-page").length) {
          $(".group-central.show-text").attr("data-name");
          var e = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("href"),
            t = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-title"),
            a = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-keyword"),
            o = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-description"),
            i = $(".box-nav li, .sub-nav li").eq(n).find("a").attr("data-page");
          changeUrl(e, t, o, a, i, t, o)
        }
        s()
      }
    })
  }
  TweenLite.set($(".group-central").not($(".group-central")[n]), {
    y: "100%"
  }), 1100 < $(window).width() && !$("body").hasClass("fullscreen") && ($(".box-slider:not(.single)").on("mousewheel", function(e) {
    var t;
    !1 === o && (t = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY || -e.detail))), 1100 < $(window).width() && !$("body").hasClass("fullscreen") && (null != $(".group-central")[n] && 1 === parseInt(t) ? (a - 1 <= n ? n = 0 : n++, i()) : null != $(".group-central")[n] && -1 === parseInt(t) && (n <= 0 ? n = a - 1 : n--, l()))
  }), $("html").hasClass("touch") && $(".box-slider:not(.single)").on("swipeup", function(e, t) {
    doTouch && (doTouch = !1, 1100 < $(window).width() && !$("body").hasClass("fullscreen") && ($(".box-nav li.current").next().trigger("click"), setTimeout(turnWheelTouch, 500)))
  }).on("swipedown", function(e) {
    doTouch && (doTouch = !1, 1100 < $(window).width() && !$("body").hasClass("fullscreen") && ($(".box-nav li.current").prev().trigger("click"), setTimeout(turnWheelTouch, 500)))
  })), $(".box-nav li").on("click", function() {
    var e = $(this).index();
    return o || (!o && n < e ? (n = e, i()) : !o && e < n && (n = e, l())), !1
  }), $(".group-central:first-child").addClass("show-text"), $(".box-nav li:first-child").addClass("current"), setTimeout(function() {
    $(".show-text .bg-egg, .show-text .pic-intro").length && MoveBackground(), $(".show-text .circle-morph, .show-text .wave-ani").length && $(".play-wave").trigger("click")
  }, 500), $("#library-page").length && $(".group-central").hasClass("show-text") && setTimeout(function() {
    AniTitle()
  }, 1e3), $(".show-text .grid-item-bg").length && setTimeout(function() {
    BgEffect()
  }, 1e3), $(".show-text .scrollA").length && setTimeout(function() {
    ScrollNiceA()
  }, 1e3), $(".wheel").on("click", function() {
    return $(".box-nav li.current").next().trigger("click"), !1
  })
}

function CancelMove() {
  $(".bg-egg, .pic-intro").removeClass("moving"), TweenLite.set($(".egg-1,.egg-2,.svgMask,.bg-clip, .pic-circle"), {
    x: 0,
    y: 0,
    z: 0
  })
}

function MoveBackground() {
  var t = null,
    a = {
      X: 0,
      Y: 0
    },
    e = $(window).width() / 2,
    o = $(window).height() / 2;

  function i() {
    TweenLite.to(".moving .egg-1", 1, {
      x: 0,
      y: 0,
      z: 0,
      ease: Power0.easeOut
    }), TweenLite.to(".moving .egg-2", 1, {
      x: 0,
      y: 0,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .svgMask", 1, {
      x: 0,
      y: 0,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .pic-circle", 1, {
      x: 0,
      y: 0,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .bg-clip", 1, {
      x: 0,
      y: 0,
      ease: Power1.easeOut
    })
  }

  function n() {
    DX = a.X - e, DY = a.Y - o, MoveX = DY / o, MoveY = -DX / e, Radius = Math.sqrt(Math.pow(MoveX, 2) + Math.pow(MoveY, 2)), Degree = 2 * Radius, TweenLite.to(".moving .egg-1", 1, {
      x: 40 * MoveX,
      y: 40 * MoveY,
      z: 100 * Degree,
      ease: Power0.easeOut
    }), TweenLite.to(".moving .egg-2", 1, {
      x: 50 * MoveX,
      y: 50 * MoveY,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .box-img:nth-child(1) .svgMask", 2, {
      x: 80 * MoveX,
      y: 150 * MoveY,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .box-img:nth-child(2) .svgMask", 2, {
      x: 80 * MoveX,
      y: 120 * MoveY,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .pic-circle", 2, {
      x: 80 * MoveX,
      y: 120 * MoveY,
      ease: Power1.easeOut
    }), TweenLite.to(".moving .bg-clip", 1, {
      x: 150 * MoveX,
      y: 150 * MoveY,
      ease: Power1.easeOut
    })
  }
  $(".show-text .bg-egg, .show-text .pic-intro").addClass("moving"), $(".nav-click, .hotline, .box-nav").on("mouseenter", function() {
    cancelAnimationFrame(t), i()
  }), 1100 < $(window).width() ? $(".box-slider").on("mousemove", function(e) {
    a.X = e.pageX, a.Y = e.pageY, cancelAnimationFrame(t), t = requestAnimationFrame(n)
  }) : $(".box-slider").on("mousemove", function() {
    cancelAnimationFrame(t), i()
  }), $(window).resize(function() {
    1100 < $(window).width() ? (e = $(window).width() / 2, o = $(window).height() / 2) : i()
  })
}

function execSearch() {
  var e = $("#qsearch").val(),
    t = $("#href_search").val(),
    a = $("#defaultvalue").val(),
    o = $("#errorsearch").val();
  if (hidemsg(), e == a) return !1;
  if (e.length <= 1) return $(".overlay-dark").after("<div  class='contact-success color-red'>" + o + "</div>"), setTimeout(hidemsg, 5e3), !1;
  if ("" != e) {
    var i = t + "?qsearch=" + encodeURIComponent(e);
    return window.location = i, !1
  }
}

function Search() {
  $(document).on("click", ".search-but", function(e) {
    $(this).hasClass("active") ? ($(".search-form, .search-but").removeClass("active"), 1100 < $(window).width() && $(".hotline").removeClass("active"), execSearch()) : ($(".search-form, .search-but").addClass("active"), 1100 < $(window).width() && $(".hotline").addClass("active"), document.getElementById("search").reset(), $(".nav-click").hasClass("active") && $(".nav-click").trigger("click"))
  }), $("#qsearch").keydown(function(e) {
    13 == e.keyCode && execSearch()
  })
}

function SlidePicture() {
  if ($(".slide-mask").length) {
    if ($(".slide-mask").addClass("show"), 1 < $(".slide-mask").children().length) {
      var e = $(".slide-mask").attr("data-time");
      $(".stop-mask").length || $(".slide-mask").parent().prepend('<a class="stop-mask" href="javascript:void(0)"></a><a class="play-mask" href="javascript:void(0)"></a>')
    } else e = !1;
    $(".slide-mask").BTQSlider({
      animateOut: "fade-Out",
      animateIn: "fade-In",
      mouseDrag: !1,
      touchDrag: !1,
      pullDrag: !1,
      rewind: !0,
      margin: 0,
      video: !1,
      autoplay: !0,
      autoplayTimeout: e,
      smartSpeed: 600,
      items: 1,
      nav: !1,
      dots: !0,
      dotNum: !0,
      dotSvg: !0,
      responsiveRefreshRate: 300,
      responsive: {
        0: {
          autoHeight: !0
        },
        1e3: {
          autoHeight: !0
        },
        1100: {
          autoHeight: !1
        }
      }
    }).on("initialize.btq.slidebox", function() {
      $(".slide-mask .slide-item.active").addClass("ani-text"), $(".bg-home").addClass("move"), $(".arrow").length || ($(".slide-mask .slide-next").append('<svg viewBox="0 0 60 60"><path class="arrow" fill="currentColor" d="M24.5,42 22.5,40.2 33.6,30 22.5,19.8 24.5,18 37.5,30z"></path></svg>'), $(".slide-mask .slide-prev").append('<svg viewBox="0 0 60 60"><path class="arrow" fill="currentColor" d="M35.5,42 37.5,40.2 26.4,30 37.5,19.8 35.5,18 22.5,30z"></path></svg>'));
      $(".circle-outer").css({
        "animation-duration": 8 * e + "ms"
      }), $(".bg-home.move").css({
        "animation-duration": 3 * e + "ms"
      })
    }()), $(".slide-mask").on("translate.btq.slidebox", function(e) {
      $(".slide-mask .slide-item").removeClass("ani-text")
    }), $(".slide-mask").on("translated.btq.slidebox", function(e) {
      $(".slide-mask .slide-item.active").addClass("ani-text")
    }), $(".bg-home").on("swipeleft", function(e, t) {
      doTouch && (doTouch = !1, 1 < $(".slide-mask .slide-item").children().length && $(".slide-mask").trigger("next.btq.slidebox"), setTimeout(turnWheelTouch, 500))
    }).on("swiperight", function(e) {
      doTouch && (doTouch = !1, 1 < $(".slide-mask .slide-item").children().length && $(".slide-mask").trigger("prev.btq.slidebox"), setTimeout(turnWheelTouch, 500))
    }), $(".play-mask").on("click", function() {
      return $(".slide-mask").trigger("play.btq.autoplay", [e]), $(".bg-home.move").removeClass("pause-move"), !1
    }), $(".stop-mask").on("click", function() {
      return $(".slide-mask").trigger("stop.btq.autoplay"), $(".bg-home.move").addClass("pause-move"), !1
    })
  }
  $(".slide-library").length && $(".slide-library").each(function(e, t) {
    if (1 < $(t).find(".slide-item").length) var a = !0;
    else a = !1;
    $(t).on("initialized.btq.slidebox", function() {
      AniTitle()
    }).BTQSlider({
      items: 1,
      margin: 50,
      smartSpeed: 800,
      loop: a,
      nav: !0,
      dots: !0,
      center: !0,
      dotNum: !0,
      responsiveRefreshRate: 150,
      responsive: {
        0: {
          nav: !1,
          margin: 5,
          smartSpeed: 600,
          dots: !0
        },
        600: {
          nav: !1,
          margin: 10,
          smartSpeed: 600,
          dots: !0
        },
        1e3: {
          nav: !1,
          margin: 20,
          smartSpeed: 600,
          dots: !0
        },
        1100: {
          nav: !0,
          margin: 30,
          dots: !1
        }
      }
    }), $(t).on("translate.btq.slidebox", function(e) {
      1100 < $(window).width() && (clearTimeout(timer), $(".title-pic h3 span").removeClass("move"))
    }), $(t).on("translated.btq.slidebox", function(e) {
      AniTitle()
    })
  }), $(".slide-content").length && 1100 < $(window).width() && ($(".slide-content").BTQSlider({
    mouseDrag: !1,
    touchDrag: !1,
    pullDrag: !1,
    rewind: !0,
    margin: 0,
    smartSpeed: 600,
    items: 1,
    nav: !0,
    dotNum: !1,
    dots: !1,
    responsiveRefreshRate: 150
  }), $(".slide-content").on("translate.btq.slidebox", function(e) {
    ScrollNiceHide()
  }), $(".slide-content").on("translated.btq.slidebox", function(e) {
    $(".active .scrollA").length && setTimeout(function() {
      ScrollNiceA()
    }, 500)
  }), $(".slide-content .slide-page").on("click", function() {
    var e = $(this).index();
    $(".project-slide").data("btq.slidebox").to(e, 600, !0)
  })), $(".project-slide").length && 1100 < $(window).width() && ($(".project-slide").on("initialized.btq.slidebox", function() {
    var e = $(this).find(".slide-item.active").index();
    $(".slide-content").data("btq.slidebox").to(e, 600, !0)
  }).BTQSlider({
    rewind: !0,
    margin: 0,
    smartSpeed: 600,
    items: 1,
    nav: !0,
    dots: !1,
    responsiveRefreshRate: 150
  }), $(".project-slide").on("translated.btq.slidebox", function(e) {
    var t = $(this).find(".slide-item.active").index();
    $(".slide-content").data("btq.slidebox").to(t, 600, !0)
  })), $(".sustainable-slide").length && $(".sustainable-slide").BTQSlider({
    loop: !0,
    margin: 0,
    smartSpeed: 600,
    items: 1,
    autoplayTimeout: 4e3,
    autoplayHoverPause: !0,
    responsiveRefreshRate: 150,
    responsive: {
      0: {
        nav: !1,
        dots: !0,
        autoplay: !0
      },
      1e3: {
        nav: !1,
        dots: !0,
        autoplay: !0
      },
      1100: {
        nav: !0,
        dots: !1,
        autoplay: !0
      }
    }
  }), $(".slide-member").length && $(".slide-member").BTQSlider({
    mouseDrag: !1,
    touchDrag: !1,
    pullDrag: !1,
    rewind: !0,
    margin: 10,
    smartSpeed: 600,
    items: 1,
    dotNum: !0,
    nav: !0,
    dots: !0,
    autoHeight: !0,
    responsiveRefreshRate: 150,
    responsive: {
      0: {
        nav: !1,
        margin: 0
      },
      1e3: {
        nav: !1,
        margin: 0
      },
      1100: {
        nav: !0,
        margin: 10
      }
    }
  }), $(".slide-facilities").length && $(".slide-facilities").BTQSlider({
    rewind: !0,
    margin: 20,
    smartSpeed: 600,
    items: 2,
    dotNum: !0,
    responsiveRefreshRate: 150,
    responsive: {
      0: {
        nav: !1,
        dots: !0,
        items: 1,
        margin: 5,
        autoHeight: !0
      },
      700: {
        nav: !1,
        dots: !0,
        items: 1,
        margin: 10,
        autoHeight: !0
      },
      1e3: {
        nav: !1,
        dots: !0,
        items: 2,
        margin: 10,
        autoHeight: !1
      },
      1100: {
        nav: !0,
        dots: !1,
        items: 2,
        autoHeight: !1
      }
    }
  }), $(".slide-masterplan").length && $(".slide-masterplan").BTQSlider({
    loop: !0,
    margin: 0,
    smartSpeed: 600,
    items: 1,
    nav: !0,
    autoHeight: !0,
    dotNum: !1,
    dots: !0,
    responsiveRefreshRate: 150,
    responsive: {
      0: {
        nav: !1,
        dots: !0
      },
      1e3: {
        nav: !1,
        dots: !0
      },
      1100: {
        nav: !0,
        dots: !1
      }
    }
  }), $(".slide-four").length && $(".slide-four").on("initialized.btq.slidebox", function() {
    var e = $(".slide-four").find(".slide-item").length;
    1100 <= $(window).width() ? e < 4 ? $(".slide-four").addClass("center-slidebox") : $(".slide-four").removeClass("center-slidebox") : $(window).width() < 1100 && 980 <= $(window).width() && e < 3 ? $(".slide-four").addClass("center-slidebox") : $(".slide-four").removeClass("center-slidebox")
  }).BTQSlider({
    margin: 0,
    mouseDrag: !1,
    smartSpeed: 600,
    items: 4,
    nav: !0,
    dotNum: !1,
    dots: !0,
    rewind: !0,
    responsive: {
      0: {
        items: 1,
        nav: !1
      },
      600: {
        items: 1,
        nav: !1
      },
      1e3: {
        items: 3,
        nav: !1
      },
      1100: {
        items: 4,
        nav: !0
      }
    }
  }), $(".slide-pagi").length && $(".slide-pagi").on("initialized.btq.slidebox", function() {
    var e = $(".slide-pagi").find(".slide-item").length;
    600 <= $(window).width() && e < 6 ? $(".slide-pagi").addClass("center-slidebox") : $(".slide-pagi").removeClass("center-slidebox")
  }).BTQSlider({
    items: 6,
    nav: !0,
    dots: !1,
    smartSpeed: 300,
    margin: 5,
    slideBy: 1,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 6
      }
    }
  })
}

function VideoLoad(e, a) {
  $.ajax({
    url: e,
    cache: !1,
    success: function(e) {
      function t(e) {
        $("html").hasClass("touch") && (e.target.mute(), e.target.playVideo())
      }
      $(".allvideo").append(e), $(".video-wrap").append(a), $(".loadx").fadeOut(500, "linear", function() {
        new YT.Player("VYT", {
          events: {
            onReady: t
          }
        }), $(".cursor-modern").length && $(".cursor-modern").hasClass("desktop") && (changeCursor(), $(".close-video").mouseover(function() {
          $(this).addClass("cursor-none"), $(".cursor-modern").addClass("hover-close")
        }).mouseout(function() {
          $(this).removeClass("cursor-none"), $(".cursor-modern").removeClass("hover-close")
        })), $(".loadx").remove()
      }), $(".close-video").on("click", function() {
        $(".allvideo").fadeOut(500, "linear", function() {
          if ($(".overlay-dark").removeClass("show"), $("html, body").removeClass("no-scroll"), $(".cursor-modern").removeClass("hover-close"), $(".allvideo .video-list").remove(), $(".to-scrollV").length) {
            var e = $(".to-scrollV").offset().top;
            $(window).width() < 1100 && $("html, body").scrollTop(e), $(".to-scrollV").removeClass("to-scrollV")
          }
          $("body").hasClass("auto") && ScrollBody()
        })
      })
    }
  })
}

function AlbumLoad(e, t) {
  $.ajax({
    url: e,
    cache: !1,
    success: function(e) {
      function t() {
        clearTimeout(timex), $(".pic-name").removeClass("move"), $(".pic-name h3").children().children().removeClass("move"), $(".selected").find(".pic-name").addClass("move"), $(".move h3").children().children().each(function(e) {
          var t = $(this);
          setTimeout(function() {
            $(t).addClass("move")
          }, 100 * (e + 1))
        })
      }
      $(".all-album").append(e), 1 < $(".all-album .album-load").length && $(".all-album .album-load").last().remove(), $(".pic-name > h3").lettering("words").children("span").lettering().children("span").lettering(), $(".album-center").on("initialized.btq.slidebox", function() {
        $(".container-zoom").each(function(e, t) {
          new PinchZoom.default(t, {
            draggableUnzoomed: !1
          })
        }), $(".album-center").find(".slide-item.active").addClass("selected"), t()
      }).BTQSlider({
        items: 1,
        margin: 0,
        smartSpeed: 600,
        loop: !1,
        dots: !1,
        nav: !0,
        responsiveRefreshRate: 200
      }).on("changed.btq.slidebox", function(e) {
        $(".thumbs").length && function(e) {
          var t = e.item.Count - 1,
            a = e.item.index;
          a < 0 && (a = t);
          t < a && (a = 0);
          $(".thumbs").find(".slide-item").removeClass("current").eq(a).addClass("current");
          var o = $(".thumbs").find(".slide-item.active").length - 1,
            i = $(".thumbs").find(".slide-item.active").first().index(),
            n = $(".thumbs").find(".slide-item.active").last().index();
          n - 1 <= a && $(".thumbs").data("btq.slidebox").to(a, 300, !0);
          a <= i && $(".thumbs").data("btq.slidebox").to(a - o, 300, !0)
        }(e)
      }).on("translate.btq.slidebox", function(e) {
        $(".album-center").find(".slide-item").removeClass("selected")
      }).on("translated.btq.slidebox", function(e) {
        $(".album-center").find(".slide-item.active").addClass("selected"), t()
      }), $(".thumbs").on("initialized.btq.slidebox", function() {
        var e = $(".thumbs").find(".slide-item").length;
        600 <= $(window).width() ? e <= 6 ? $(".thumbs").addClass("center-slidebox") : $(".thumbs").removeClass("center-slidebox") : e <= 3 ? $(".thumbs").addClass("center-slidebox") : $(".thumbs").removeClass("center-slidebox"), $(".thumbs").find(".slide-item").eq(0).addClass("current")
      }).BTQSlider({
        margin: 5,
        smartSpeed: 300,
        dots: !1,
        nav: !1,
        responsiveRefreshRate: 100,
        responsive: {
          0: {
            items: 3,
            slideBy: 3
          },
          600: {
            items: 6,
            slideBy: 6
          }
        }
      }), $(".thumbs").on("click", ".slide-item", function(e) {
        e.preventDefault();
        var t = $(this).index();
        $(".album-center").data("btq.slidebox").to(t, 1e3, !0)
      }), $(".all-album").on("mousewheel", ".album-center", function(e) {
        if (0 < e.deltaY) {
          if (!doWheel) return;
          doWheel = !1, $(".album-center").trigger("prev.btq.slidebox"), setTimeout(turnWheelTouch, 500)
        } else {
          if (!doWheel) return;
          doWheel = !1, $(".album-center").trigger("next.btq.slidebox"), setTimeout(turnWheelTouch, 500)
        }
        e.preventDefault()
      }), $(".album-load").animate({
        opacity: 1
      }, 100, "linear", function() {
        $(".cursor-modern").length && $(".cursor-modern").hasClass("desktop") && (changeCursor(), $(".cursor-modern").addClass("level-index-in"), $(".close-album").mouseover(function() {
          $(this).addClass("cursor-none"), $(".cursor-modern").addClass("hover-close")
        }).mouseout(function() {
          $(this).removeClass("cursor-none"), $(".cursor-modern").removeClass("hover-close")
        }), $(".slide-prev").mouseover(function() {
          $(this).toggleClass("cursor-none"), $(".cursor-modern").toggleClass("hover-nav-prev")
        }).mouseout(function() {
          $(this).removeClass("cursor-none"), $(".cursor-modern").removeClass("hover-nav-prev")
        }), $(".slide-next").mouseover(function() {
          $(this).toggleClass("cursor-none"), $(".cursor-modern").toggleClass("hover-nav-next")
        }).mouseout(function() {
          $(this).removeClass("cursor-none"), $(".cursor-modern").removeClass("hover-nav-next")
        })), $(".loadx").fadeOut(400, "linear", function() {
          $(".loadx").remove()
        })
      }), $(".close-album").on("click", function() {
        return $(".all-album").fadeOut(500, "linear", function() {
          $(".cursor-modern").removeClass("hover-close level-index-in hover-nav"), $(".overlay-dark").removeClass("show"), $(".album-load").remove()
        }), $("html, body").removeClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), !1
      })
    }
  })
}

function NewsList(e) {
  0 < $(".load-news-list").children().length && $(".load-news-list").children().remove(), $.ajax({
    url: e,
    cache: !1,
    success: function(e) {
      $(".load-news-list").append(e), LinkPage(), Loadpic(), $(".load-news-list").stop().animate({
        opacity: 1
      }, 300, "linear", function() {
        Details = 1, $(".list-pagination, .load-news-list").addClass("show")
      }), setTimeout(function() {
        onScroll()
      }, 600), $(".loadx").fadeOut(400, "linear", function() {
        $("body").hasClass("auto") && $("body").getNiceScroll().resize(), $(".loadx").remove()
      });
      var t = $(".slide-pagi a.current").parent().parent().index();
      0 < t && setTimeout(function() {
        $(".slide-pagi").data("btq.slidebox").to(t, 300, !0)
      }, 500)
    }
  })
}

function NewsLoad(e) {
  $.ajax({
    url: e,
    cache: !1,
    success: function(e) {
      $(".load-details").remove(), $(".load-data").prepend(e), PrintShare(), $(".load-text a, .load-text p a").click(function(e) {
        e.preventDefault();
        var t = $(this).attr("href");
        return window.open(t, "_blank"), !1
      }), $(window).width() <= 1024 && $(".load-details img").addClass("zoom-pic"), ZoomPic(), $(".loadx").fadeOut(400, "linear", function() {
        $(".news-list").removeClass("no-link"), $(".loadx").remove()
      }), $(".load-data").animate({
        opacity: 1
      }, 500, "linear", function() {
        $(".load-data").addClass("show"), Details = 1, $(".load-content").addClass("show"), $("body").hasClass("auto") && $("body").getNiceScroll().resize(), detectBut(), onScroll()
      })
    }
  })
}

function popupLoad(e, t, a) {
  $.ajax({
    url: e,
    cache: !1,
    success: function(e) {
      $(".details-content").remove(), $("body").append(e), $("form").length && FocusText(), $(window).width() <= 1024 && $(".details-text img").addClass("zoom-pic"), ZoomPic(), a && $(".details-center h2").text(a), $(".download-but").length && $(".download-but").each(function(e, t) {
        "" == $(t).find("a").attr("href") && $(t).addClass("display-none")
      }), $(".details-content").stop().animate({
        opacity: 1
      }, 600, "linear", function() {
        var e = $(".details-content").innerHeight();
        $(".loadx").fadeOut(400, "linear", function() {
          e > $(window).height() && $(".details-content").addClass("no-after"), $(".details-content").scrollTop(0), $(".details-center").addClass("fadein"), ScrollBody(), ScrollDetails(), $(".loadx").remove()
        })
      }), $(".cursor-modern").length && $(".cursor-modern").hasClass("desktop") && (changeCursor(), $(".close-popup, .details-content span").mouseover(function() {
        $(this).addClass("cursor-none"), $(".cursor-modern").addClass("hover-close")
      }).mouseout(function() {
        $(this).removeClass("cursor-none"), $(".cursor-modern").removeClass("hover-close")
      })), $(".close-popup, .details-content span").on("click", function() {
        if ($("#recruitment-page, #news-page").length) {
          var e = $(".sub-nav li.current").find("a").attr("href"),
            t = $(".sub-nav li.current").find("a").attr("data-title"),
            a = $(".sub-nav li.current").find("a").attr("data-keyword"),
            o = $(".sub-nav li.current").find("a").attr("data-description"),
            i = $(".sub-nav li.current").find("a").attr("data-name");
          changeUrl(e, t, o, a, i, t, o)
        }
        return $(".details-content").animate({
          opacity: 0
        }, 500, "linear", function() {
          $(".overlay-dark").removeClass("show"), $("html, body").removeClass("no-scroll"), $(".cursor-modern").removeClass("hover-close"), $(".details-content").remove(), $("body").hasClass("auto") && ScrollBody()
        }), !1
      })
    }
  })
}

function rotateSlider() {
  var o = $(".rotate-container"),
    i = $(".rotate-item"),
    e = $(".arrow"),
    n = $(i).length;
  n <= 1 && $(e).addClass("disabled");

  function a(a) {
    $(o).find(".current-item").removeClass("current-item"), $(o).find(".next").removeClass("next"), $(o).find(".prev").removeClass("prev"), $(o).find(".last").removeClass("last"), a == n - 1 && $(i).eq(0).addClass("next"), 0 == a && $(i).eq(n - 1).addClass("prev"), $(i).each(function(e, t) {
      e == a && $(i).eq(e).addClass("current-item"), e == a + 1 && $(i).eq(e).addClass("next"), e == a - 1 && $(i).eq(e).addClass("prev"), e == a + 2 && $(i).eq(e).addClass("last"), $(i).last().hasClass("next") && $(i).eq(0).addClass("last"), $(i).last().hasClass("current-item") && $(i).eq(1).addClass("last")
    })
  }
  a(0), $(e).on("click", function() {
    $(".stop-wave").trigger("click");
    var e = $(this).data("action"),
      t = $(i).index($(o).find(".current-item"));
    "next" == e ? a(t == n - 1 ? 0 : t + 1) : "prev" == e && a(0 == t ? n - 1 : t - 1)
  }), $(".rotate-container").on("swipeleft", function(e, t) {
    doTouch && (doTouch = !1, 1 < $(".rotate-container").children().length && $(".go-prev").trigger("click"), setTimeout(turnWheelTouch, 500))
  }).on("swiperight", function(e) {
    doTouch && (doTouch = !1, 1 < $(".rotate-container").children().length && $(".go-next").trigger("click"), setTimeout(turnWheelTouch, 500))
  })
}

function AniText() {
  $(".title-page").hasClass("on-show") || ($(".title-page").addClass("on-show"), $(".title-page h1").children().children().each(function(e) {
    var t = $(this);
    setTimeout(function() {
      $(t).addClass("move")
    }, 100 * (e + 1))
  }))
}

function AniTitle() {
  var e = new TimelineLite;
  $(".center .title-pic h3 span").length && (1100 < $(window).width() ? (e.set($(".title-pic h3 span"), {
    opacity: 0
  }), $(".center .title-pic h3 span").each(function(e, t) {
    TweenLite.to($(t), .6, {
      opacity: 1,
      delay: RanDom(.3, .6),
      ease: Power0.easeOut
    })
  })) : e.set($(".title-pic h3 span"), {
    opacity: 1
  }))
}

function FocusText() {
  $("input, textarea").focus(function(e) {
    $(this).attr("data-holder") == $(this).val() && $(this).val("")
  }).focusout(function(e) {
    "" == $(this).val() && ($(this).prev().removeClass("hide"), $(this).val($(this).attr("data-holder")))
  })
}

function subNav() {
  $(".sub-nav:not(.release) li").on("click", function(e) {
    e.preventDefault();
    var t = $(this).find("a").attr("data-name");
    if (doWheel) {
      if (doWheel = !1, $("#recruitment-page, #project-details-page").length) {
        var a = $(this).find("a").attr("href"),
          o = $(this).find("a").attr("data-title"),
          i = $(this).find("a").attr("data-keyword"),
          n = $(this).find("a").attr("data-description"),
          s = $(this).find("a").attr("data-name");
        changeUrl(a, o, n, i, s, o, n)
      }
      $(".sub-nav:not(.release) li").removeClass("current"), $(".sub-nav:not(.release) li").removeClass("current"), $('.sub-nav:not(.release) li a[data-name="' + t + '"]').parent().addClass("current");
      var l = $(".set-post[data-post='" + t + "']").offset().top - 100;
      return $("html, body").stop().animate({
        scrollTop: l
      }, 2e3, "easeInOutExpo", function() {
        detectBut(), setTimeout(turnWheelTouch, 100)
      }), !1
    }
  }), $(".sub-nav:not(.release) li.current").length ? setTimeout(function() {
    $(".sub-nav:not(.release) li.current a").trigger("click")
  }, 500) : $(".sub-nav:not(.release) li:first-child").addClass("current")
}

function onChange(e) {
  $(".file-name").html(e.files[0].name)
}

function PrintShare() {
  var e = $(".save-but");
  $(e).on("click", function() {
    return window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(document.title, window.location.href, "") : window.external && "AddFavorite" in window.external ? window.external.AddFavorite(location.href, document.title) : alert("Nhấn " + (-1 != navigator.userAgent.toLowerCase().indexOf("mac") ? "Command/Cmd" : "CTRL") + " + D để tạo bookmark cho trang này."), !1
  }), $(".print-but").on("click", function() {
    window.print()
  }), $(".share-but").on("mouseenter", function() {
    $(this).addClass("active")
  }), $(".save-but, .print-but").on("mouseenter", function() {
    $(".share-but").removeClass("active")
  }), $(".print-box").on("mouseleave", function() {
    $(".share-but").removeClass("active")
  })
}

function LinkPage() {
  $(".link-load, .link-home, .go-page,  .view-more,  .view-detail, .item-news a, .release li a").on("click", function(e) {
    e.preventDefault();
    var t = $(this).attr("href");
    $(".mask").removeClass("show finish").addClass("show-page");
    var a = $(".shape-svg path").attr("pathdata");
    return new TimelineLite({
      paused: !1
    }).to($(".shape-svg path"), RanDom(.3, .6), {
      attr: {
        d: a
      },
      repeat: -1,
      yoyo: !0,
      ease: Power4.easeInOut
    }), TweenLite.to($(".mask"), 1, {
      y: "0%",
      ease: Quad.easeOut,
      onComplete: function() {
        window.location = t
      }
    }), !1
  }), $(".link-blank").on("click", function(e) {
    e.preventDefault();
    var t = $(this).attr("href");
    return window.open(t, "_blank"), !1
  })
}

function ContentLoad() {
  ResizeWindows(), LinkPage(), FocusText(), Search(), NavClick(), Option(), ZoomPic(), AnimationDelay();
  $(".container").attr("id"), $(".title-page").attr("data-page");
  if ($("#project-details-page, #news-details-page").length && ($(".nav li.current").addClass("active-color").removeClass("current"), $("#news-details-page").length && $(".sub-nav li.current").addClass("active-color").removeClass("current")), $("#home-page").length || ($(".logo").css({
      cursor: "pointer"
    }), $(".logo").on("click", function() {
      $(".link-home").trigger("click")
    })), $(".header, .footer").addClass("show"), setTimeout(function() {
      AniText()
    }, 500), setTimeout(function() {
      $(".box-nav").addClass("show")
    }, 800), setTimeout(function() {
      $(".mask").addClass("finish")
    }, 1e3), $(".player").length) {
    var e = document.createElement("script");
    e.src = "https://www.youtube.com/player_api";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
  }
  if ((!$(".box-slider").hasClass("single") && $(".box-slider").length || !$("#news-page, #news-details-page, #recruitment-page, #search-page, #contact-page").length) && $(".wheel").addClass("show"), $(".youtube-video").length && $(".pause-button").trigger("click"), $(".open-click").length && NavAni(), $("#home-page").length && ($(".item-recruitment").on("click", function(e) {
      return e.preventDefault(), $(this).find("a").trigger("click"), !1
    }), $(".item-video, .item-album").on("click", function(e) {
      return e.preventDefault(), $(this).find("a").trigger("click"), !1
    }), $(".home-popup").length && setTimeout(function() {
      $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>');
      var e = $(".home-popup").attr("data-href");
      return $("html, body").addClass("no-scroll"), $(".overlay-dark").addClass("show"), popupLoad(e), !1
    }, 500)), $("#about-page").length && ".rotate-container".length && rotateSlider(), $("#business-page").length, $("#project-details-page").length && ($(".scrollB").length && ScrollNiceB(), $(".pic-destination").length || $(".location-project").addClass("hide-ground"), $(".facilities-project .slide-member").length || $(".facilities-project").addClass("hide-ground"), $(".library-pro-pic, .item-project-pic, .pic-sample").on("click", function() {
      $(this).find("a").trigger("click")
    })), $("#news-page").length && ($(".slide-pagi .slide-item").length <= 1 && $(".slide-pagi").css({
      display: "none"
    }), $(".slide-pagi a").on("click", function(e) {
      e.preventDefault(), $(".load-news-list").removeClass("show"), $(".list-pagination").removeClass("show on-show"), $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), $(".slide-pagi a").removeClass("current"), $(this).addClass("current");
      $(this).attr("data-number");
      var t = $(this).attr("href"),
        a = $(this).attr("data-title"),
        o = $(this).attr("data-keyword"),
        i = $(this).attr("data-description"),
        n = $(this).attr("data-number");
      changeUrl(t, a, i, o, n, a, i);
      var s = $(this).attr("href");
      if ($(".load-news-list").children().animate({
          opacity: 0
        }, 500, "linear"), 1 == Details) {
        var l = $(".load-news-list").offset().top - 120;
        $("html, body").stop().animate({
          scrollTop: l
        }, 1e3, "easeInOutExpo", function() {
          $(".load-news-list").stop().animate({
            opacity: 1
          }, 500, "linear", function() {
            NewsList(s)
          })
        })
      } else $(".load-news-list").stop().animate({
        opacity: 1
      }, 500, "linear", function() {
        NewsList(s)
      });
      return !1
    }), $(".slide-pagi li.current a").length ? $(".slide-pagi  li.current a").trigger("click") : $(".slide-pagi").length && $(".slide-pagi .slide-item:first").find("a").trigger("click")), $("#news-details-page").length && ($(".news-item").on("click", function(e) {
      e.preventDefault(), $(".load-content, .load-data").removeClass("show"), $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), $(".news-item").removeClass("current"), $(this).addClass("current");
      $(this).find("a").attr("data-details");
      var t = $(this).find("a").attr("href"),
        a = $(this).find("a").attr("data-title"),
        o = $(this).find("a").attr("data-keyword"),
        i = $(this).find("a").attr("data-description"),
        n = $(this).find("a").attr("data-details");
      changeUrl(t, a, i, o, n, a, i);
      var s = $(this).find("a").attr("href");
      if (1 == Details) {
        var l = $(".load-content").offset().top - 120;
        $("html, body").stop().animate({
          scrollTop: l
        }, 1e3, "easeInOutExpo", function() {
          $(".load-data").stop().animate({
            opacity: 0
          }, 500, "linear", function() {
            NewsLoad(s)
          })
        })
      } else $(".load-data").stop().animate({
        opacity: 0
      }, 500, "linear", function() {
        NewsLoad(s)
      });
      return !1
    }), $(".news-item.current").length ? $(".news-item.current").trigger("click") : $(".news-list").find(".news-item").first().trigger("click")), $("#sustainable-page").length && $(".member-box.current").length) {
    var a = $(".member-box.current").parent().index();
    $(".slide-member").data("btq.slidebox").to(a, !0)
  }
  if ($("#recruitment-page").length && ($(".policy").length && 1100 < $(window).width() && ($(".full-width").addClass("show-text"), $(".play-wave").trigger("click")), $(".table-recruitment tr").on("click", function() {
      $(this).find("a").trigger("click")
    })), $("#contact-page").length && ($(".map-box").addClass("showup"), $("#map-canvas").length && (initialize(), $(".put-hide").trigger("click")), setTimeout(function() {
      $(".put-show").trigger("click")
    }, 2e3)), $("#about-page, #business-page, #sustainable-page, #library-page").length)
    if (1100 < $(window).width()) $(".box-nav li.current").length && setTimeout(function() {
      $(".box-nav li.current a").trigger("click")
    }, 1500);
    else if ($(".group-central.current").length) {
    var o = $(".group-central.current").offset().top - 60;
    setTimeout(function() {
      $("html, body").stop().animate({
        scrollTop: o
      }, 1500, "easeInOutExpo")
    }, 1500)
  }
  $(".link-popup").length && ($(".link-popup").on("click", function(e) {
    e.preventDefault();
    var t = $(this).attr("data-name"),
      a = $(this).attr("href"),
      o = $(this).attr("data-number"),
      i = $(this).find("h3").text();
    if (void 0 !== t) {
      var n = $(this).attr("href"),
        s = $(this).attr("data-title"),
        l = $(this).attr("data-keyword"),
        r = $(this).attr("data-description"),
        c = $(this).attr("data-name");
      changeUrl(n, s, r, l, c, s, r)
    }
    return $("body").hasClass("auto") && 0 == Details && ($(this).parent().addClass("to-scrollZ"), Details = 1), $("html, body").addClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), popupLoad(a, o, i), $(".overlay-dark").addClass("show index-low"), !1
  }), $(".link-popup.current").length && setTimeout(function() {
    $(".link-popup.current").trigger("click")
  }, 1e3)), subNav(), onScroll()
}

function ZoomPic() {
  $("img").on("click", function() {
    if ($(this).hasClass("zoom-pic") && $(window).width() <= 1024) {
      $("html, body").addClass("no-scroll"), $(this).parent().addClass("to-scrollZ"), $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), $(".all-pics").addClass("show"), $(".all-pics").append('<div class="full"  style="display:block"></div>'), $(".details-content").length ? $(".overlay-dark").addClass("level-index-in") : $(".overlay-dark").addClass("show");
      var e = $(this).attr("src");
      $(".all-pics").find(".full").append('<img src ="' + e + '" alt="pic" />'), $(".all-pics").find(".full").append("<span></span>"), $("body").append('<a class="close-pics" href="javascript:void(0);"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M50,54 27.2,76.8 23.2,72.8 46,50 23.2,27.2 27.2,23.2 50,46 72.8,23.2 76.8,27.2 54,50 76.8,72.8 72.8,76.8z"></path></svg></a>'), $(".all-pics").append('<div class="close-pics-small"></div>'), $(".all-pics img").on("load", function() {
        $(".all-pics").addClass("show"), $("html").hasClass("no-touch") ? ($(".full").addClass("dragscroll"), $(".dragscroll").draptouch()) : ($(".full").addClass("pinch-zoom"), $(".pinch-zoom").each(function(e, t) {
          new PinchZoom.default(t, {
            draggableUnzoomed: !1
          })
        })), 1 < $(".full img").length && $(".full img").last().remove(), $(".loadx").fadeOut(400, "linear", function() {
          $("html").hasClass("no-touch") && detectMargin(), $(".full img").addClass("fadein"), $(".loadx").remove()
        })
      }), 1100 < $(window).width() && $(".full span").on("click", function() {
        $(".close-pics").trigger("click")
      }), $(".close-pics-small, .close-pics").on("click", function() {
        $(".loadx").remove(), $(".full").fadeOut(300, "linear", function() {
          if ($(".all-pics .full,  .all-pics .pinch-zoom-container").remove(), $(".close-pics-small, .close-pics").remove(), $(".all-pics").removeClass("show"), $(".details-content").length) $(".overlay-dark").removeClass("level-index-in");
          else {
            if ($("html, body").removeClass("no-scroll"), $(".overlay-dark").removeClass("show"), $(".to-scrollZ").length) {
              var e = $(".to-scrollZ").offset().top;
              $(".to-scrollZ").removeClass("to-scrollZ"), $(window).width() < 1100 && $("html, body").scrollTop(e - 60)
            }
            $("body").hasClass("auto") && ScrollBody()
          }
        })
      })
    }
    return !1
  })
}

function Option() {
  if ($(".view-video").length) {
    var e = document.createElement("script");
    e.src = "https://www.youtube.com/player_api";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
  }
  $(".pdf-download").on("click", function(e) {
    e.preventDefault();
    var t = $(this).attr("href");
    return window.open(t, "_blank"), !1
  }), $(".view-video, .player").on("click", function(e) {
    e.preventDefault(), $(this).parent().addClass("to-scrollV");
    var t, a = $(this).attr("data-href") || $(this).attr("href"),
      o = $(this).attr("data-embed").match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/),
      i = '<iframe id="VYT" src="https://www.youtube.com/embed/' + (t = o && 11 == o[2].length ? o[2] : "no video found") + "?autoplay=1&enablejsapi=1&controls=1&loop=0&playsinline=1&color=white&rel=0&cc_load_policy=1&playlist=" + t + '" frameborder="0"  allow="autoplay" allowfullscreen></iframe>';
    return $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), $("html, body").addClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), $(".overlay-dark").addClass("show"), $(".allvideo").fadeIn(300, "linear", function() {
      VideoLoad(a, i)
    }), !1
  }), $(".view-album").on("click", function(e) {
    e.preventDefault();
    var t = $(this).attr("data-href") || $(this).attr("href");
    return $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), $("html, body").addClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), $(".overlay-dark").addClass("show"), $(".all-album").fadeIn(300, "linear", function() {
      AlbumLoad(t, 0)
    }), !1
  }), $(".zoom, .see-pic").on("click", function() {
    $("html, body").addClass("no-scroll"), $("body").hasClass("auto") && ScrollBody(), $(".loadx").length || $("body").append('<div class="loadx" style="display:block"></div>'), $(".all-pics").addClass("show"), $(".all-pics").append('<div class="full"  style="display:block"></div>'), $(".overlay-dark").addClass("show");
    var e = $(this).parent().find("img").attr("data-src") || $(this).parent().find("img").attr("src") || $(this).attr("data-src");
    if ($(this).attr("data-src")) var t = $(this).attr("data-src");
    else t = e;
    return $(".all-pics").find(".full").append('<img src ="' + t + '" alt="pic" />'), $(".all-pics").find(".full").append("<span></span>"), $("body").append('<a class="close-pics" href="javascript:void(0);"></a>'), $(".all-pics img").on("load", function() {
      $(".all-pics").addClass("show"), $("html").hasClass("no-touch") ? ($(".full").addClass("dragscroll"), $(".dragscroll").draptouch()) : ($(".full img").addClass("pinch-zoom"), $(".pinch-zoom").each(function(e, t) {
        new PinchZoom.default(t, {
          draggableUnzoomed: !1
        })
      })), $(".cursor-modern").length && $(".cursor-modern").hasClass("desktop") && (changeCursor(), $(".close-pics").mouseover(function() {
        $(this).addClass("cursor-none"), $(".cursor-modern").addClass("hover-close")
      }).mouseout(function() {
        $(this).removeClass("cursor-none"), $(".cursor-modern").removeClass("hover-close")
      })), 1 < $(".full img").length && $(".full img").last().remove(), $(".loadx").fadeOut(400, "linear", function() {
        $("html").hasClass("no-touch") && detectMargin(), $(".full img").addClass("fadein"), $(".loadx").remove()
      })
    }), 1100 < $(window).width() && $(".full span").on("click", function() {
      $(".close-pics").trigger("click")
    }), $(".close-pics, .close-pics-small").on("click", function() {
      $(".loadx").remove(), $(".full").fadeOut(300, "linear", function() {
        $(".overlay-dark").removeClass("show"), $(".all-pics").removeClass("show"), $("html, body").removeClass("no-scroll"), $(".cursor-modern").removeClass("hover-close"), $(".all-pics .full, .all-pics .text-length, .all-pics .pinch-zoom-container").remove(), $(".close-pics, .close-pics-small").remove(), $("body").hasClass("auto") && ScrollBody()
      })
    }), !1
  })
}

function turnWheelTouch() {
  doTouch = doWheel = !0
}

function detectBut() {
  if ($(window).width() <= 1100 && $(".sub-nav li.current").length) {
    var e = $(".sub-nav ul").offset().left,
      t = $(".sub-nav li.current").offset().left,
      a = $(window).width() / 2 - $(".sub-nav li.current").width() / 2;
    $(".sub-nav").stop().animate({
      scrollLeft: t - a - e
    }, "slow")
  }
}

function detectMargin() {
  var e = $(".full img").width(),
    t = $(".full  img").height(),
    a = $(window).height(),
    o = $(window).width();
  e < o ? $(".full img").css({
    "margin-left": o / 2 - e / 2
  }) : $(".full img").css({
    "margin-left": 0
  }), t < a ? $(".full img").css({
    "margin-top": a / 2 - t / 2
  }) : $(".full img").css({
    "margin-top": 0
  })
}

function LocationHash() {
  var e = window.location.hash.slice(1),
    t = e.split("/");
  if (0 == t) var a = e;
  else {
    a = t[0];
    if ($(".slide-member").length) {
      var o = t[1] - 1;
      $(".slide-member").data("btq.slidebox").to(o, !0)
    }
  }
  $(".box-nav li a[data-page='" + a + "']").trigger("click"), $(".news-item a[data-details='" + a + "']").trigger("click"), $(".link-popup[data-name='" + a + "']").trigger("click"), $(".slide-pagi a[data-number='" + a + "']").trigger("click")
}
if ($.fn.isInViewport = function() {
    var e = $(this).offset().top,
      t = e + $(this).outerHeight(),
      a = $(window).scrollTop(),
      o = a + $(window).height();
    return a < t && e < o
  }, $(document).ready(function() {
    $(document).bind("scroll", function() {
      var a = $(document).scrollTop(),
        e = $(window).scrollTop(),
        o = $(".banner-inner").innerHeight();
      o / 2 <= windscroll ? $("body").hasClass("auto") && $(".header").addClass("hide") : $("body").hasClass("auto") && $(".header").removeClass("hide"), a > $(window).height() / 2 ? $(".go-top").addClass("show") : $(".go-top").removeClass("show"), 70 < a ? $("#project-details-page").length && $(".wheel").removeClass("show") : $("#project-details-page").length && $(".wheel").addClass("show"), $(".outer-nav").length && (o - 70 <= a ? $(".outer-nav").addClass("fixed") : $(".outer-nav").removeClass("fixed")), $(".set-post").each(function() {
        var e = $(this).offset().top - o,
          t = $(this).outerHeight();
        t < $(window).height() && (t = $(window).height()), e <= a && a <= e + t && ($(".set-post").removeClass("active"), $(this).addClass("active"), 1 == doWheel && ($(".sub-nav:not(.release) li").removeClass("current"), $('.sub-nav:not(.release) li a[data-name="' + $(this).attr("data-post") + '"]').parent().addClass("current")), detectBut())
      }), window.requestAnimationFrame(function() {
        1100 < $(window).width() && ($(".banner-inner").css({
          transform: "translate3d(0," + .3 * e + "px, 0)"
        }), $(".logo-section").css({
          transform: "translate3d(0," + .3 * e + "px, 0)"
        })), onScroll()
      }), windscroll = a
    }), document.addEventListener("keydown", function(e) {
      var t = e.keyCode || e.which;
      38 === t && $(".box-nav li.current").prev().trigger("click"), 40 === t && $(".box-nav li.current").next().trigger("click"), 27 === t && $(".full img").length && $(".close-pics").trigger("click")
    }), $(".go-top").on("click", function() {
      1100 < $(window).width() && $(".box-nav").length ? $(".box-nav li:first-child").trigger("click") : $("html, body").animate({
        scrollTop: 0
      }, "slow")
    }), $(".container").on("click", function() {
      $(".search-but").hasClass("active") && $(".search-form, .search-but, .hotline").removeClass("active")
    }), $("#home-page").length ? setTimeout(function() {
      0 == Loadx && (Loadx = 1, Done())
    }, 1500) : setTimeout(function() {
      0 == Loadx && (Loadx = 1, Done())
    }, 1e3)
  }), window.onorientationchange = ResizeWindows, $(window).on("orientationchange", function() {
    $(window).width() <= 1100 && $(".colum-box-news").hasClass("show") && detectBut()
  }), $(window).resize(function() {
    1100 < $(window).width() && $(".news-text img").hasClass("zoom-pic") && $(".close-pics-small").trigger("click"), ResizeWindows(), ScrollNiceHide()
  }), $(window).on("resize", function() {
    if (ResizeWindows(), detectMargin(), $(".bg-egg, .pic-intro").hasClass("moving") && ($(".bg-egg, .pic-intro").removeClass("moving"), CancelMove()), $(".wave-ani").hasClass("in-play") && ($("#business-page").length ? $(".in-play").css({
        transform: "matrix(1, 0, 0, 1, 0, 0) scale3d(1, 1, 1)"
      }) : $(".in-play").css({
        transform: "matrix(1, 0, 0, 1, 0, 0) scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg)"
      })), 1100 < $(window).width()) {
      $(".bg-menu").length && ($(".bg-menu").hasClass("ani-canvas") || $(".bg-menu").each(function(e, t) {
        var a = $(t).attr("id");
        LoadCanvas(a)
      })), $(".grid-item-bg").length && !$(".grid-item-bg").hasClass("three") && BgEffect(), $("#news-page, #project-details-page, #recruitment-page, #bidding-page, #search-page").length || $(".group-central").hasClass("show-text") || BoxSlide(), $("#project-page").length && $(".project-slide").length && ($(".project-slide").hasClass("slide-slidebox") || SlidePicture()), $("#about-page").length && $(".slide-content").length && ($(".slide-content").hasClass("slide-slidebox") || SlidePicture()), $(".dragscroll").length && (detectMargin(), $(".dragscroll").draptouch()), $(".bg-egg, .pic-intro").hasClass("moving") || MoveBackground(), $("#library-page").length && $(".slide-item").hasClass("center") && AniTitle(), $("#about-page, #business-page, #sustainable-page, #library-page").length && ($(".box-nav li").hasClass("current") ? setTimeout(function() {
        $(".box-nav li.current").trigger("click")
      }, 1e3) : $(".box-nav li:first-child ").trigger("click")), $(".policy").length && ($(".full-width").hasClass("show-text") || ($(".full-width").addClass("show-text"), $(".play-wave").trigger("click"))), $(".scrollA, .scrollB").length && setTimeout(function() {
        ScrollNiceA(), ScrollNiceB()
      }, 250), !$("body").hasClass("smooth") && $("body").hasClass("auto") && ScrollBody()
    } else {
      $(".go-top").hasClass("show-g") && $(".go-top").removeClass("show-g");
      $(".bg-menu").length && $(".bg-menu").hasClass("ani-canvas") && ($(".bg-menu").removeClass("ani-canvas"), $(".bg-menu").each(function(e, t) {
        $(t).find("canvas").remove()
      })), $(".bg-egg, .pic-intro").hasClass("moving") && ($(".bg-egg, .pic-intro").removeClass("moving"), CancelMove()), $(".project-slide").length && $(".project-slide").hasClass("slide-slidebox") && $(".project-slide").data("btq.slidebox").destroy(), $(".slide-content").length && $(".slide-content").hasClass("slide-slidebox") && $(".slide-content").data("btq.slidebox").destroy(), $(".policy").length && $(".full-width").hasClass("show-text") && ($(".full-width").removeClass("show-text"), $(".stop-wave").trigger("click"))
    }
  }, 250), $(window).bind("popstate", function(e) {
    1100 < $(window).width() && (e.preventDefault(), LinkPage());
    var t = $(".httpserver").text();
    if (1100 < $(window).width())
      if (null !== e.originalEvent.state) {
        var a = e.originalEvent.state.path,
          o = e.originalEvent.state.dataName,
          i = e.originalEvent.state.title,
          n = document.URL;
        changeUrl(a, i, "", "", o, "", "");
        a.replace(t, "").split("/");
        $("#about-page, #business-page, #sustainable-page, #library-page").length && ($(".close-video").length && $(".close-video").trigger("click"), $(".close-album").length && $(".close-album").trigger("click"), $(".close-pics").length && $(".close-pics").trigger("click"), $(".close-map").length && $(".close-map").trigger("click"), $(".nav li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".sub-news li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".member-box").each(function(e, t) {
          $(t).attr("data-href") == a && window.history.back()
        }), $(".box-nav li a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        }), $(".select-box li a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        })), $("#recruitment-page").length && ($(".close-popup").length ? $(".close-popup").trigger("click") : ($(".navigation li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        }), $(".table-recruitment td a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        }))), $("#news-details-page").length && ($(".nav li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".news-item a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        })), $("#news-page").length && ($(".close-popup").length ? $(".close-popup").trigger("click") : ($(".nav li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".slide-pagi a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        }), $(".link-popup").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        }))), $("#project-details-page").length && ($(".load-content-news").length ? $(".close-news").trigger("click") : $(".close-popup").length ? $(".close-popup").trigger("click") : ($(".close-video").length && $(".close-video").trigger("click"), $(".close-pics").length && $(".close-pics").trigger("click"), $(".close-album").length && $(".close-album").trigger("click"), $(".nav li a").each(function(e, t) {
          $(t).attr("href") == a && window.history.back()
        }), $(".project-href a").attr("href") == a && window.history.back(), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == a && $(t).trigger("click")
        })))
      } else {
        (n = document.URL).replace(t, "").split("/");
        $("#about-page, #business-page, #sustainable-page, #library-page").length && ($(".close-video").length && $(".close-video").trigger("click"), $(".close-album").length && $(".close-album").trigger("click"), $(".close-pics").length && $(".close-pics").trigger("click"), $(".close-map").length && $(".close-map").trigger("click"), $(".nav li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".sub-news li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".box-nav li a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        }), $(".member-box").each(function(e, t) {
          $(t).attr("data-href") == n && window.history.back()
        }), $(".select-box li a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        })), $("#recruitment-page").length && ($(".close-popup").length ? $(".close-popup").trigger("click") : ($(".navigation li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        }), $(".table-recruitment td a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        }))), $("#news-details-page").length && ($(".nav li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".news-item a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        })), $("#news-page").length && ($(".close-popup").length ? $(".close-popup").trigger("click") : ($(".nav li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".slide-pagi a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        }), $(".link-popup").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        }))), $("#project-details-page").length && ($(".load-content-news").length ? $(".close-news").trigger("click") : $(".close-popup").length ? $(".close-popup").trigger("click") : ($(".close-video").length && $(".close-video").trigger("click"), $(".close-pics").length && $(".close-pics").trigger("click"), $(".close-album").length && $(".close-album").trigger("click"), $(".nav li a").each(function(e, t) {
          $(t).attr("href") == n && window.history.back()
        }), $(".project-href a").attr("href") == n && window.history.back(), $(".sub-nav li a").each(function(e, t) {
          $(t).attr("href") == n && $(t).trigger("click")
        })))
      }
    else {
      if (null !== e.originalEvent.state) a = e.originalEvent.state.path;
      else a = document.URL;
      a.replace(t, "").split("/");
      $("#recruitment-page").length && ($(".close-popup").length ? $(".close-popup").trigger("click") : ($(".navigation li a").each(function(e, t) {
        $(t).attr("href") == a && window.history.back()
      }), $(".sub-nav li a").each(function(e, t) {
        $(t).attr("href") == a && $(t).trigger("click")
      }), $(".table-recruitment td a").each(function(e, t) {
        $(t).attr("href") == a && $(t).trigger("click")
      }))), $("#news-page").length && ($(".close-popup").length ? $(".close-popup").trigger("click") : ($(".nav li a").each(function(e, t) {
        $(t).attr("href") == a && window.history.back()
      }), $(".sub-nav li a").each(function(e, t) {
        $(t).attr("href") == a && window.history.back()
      }), $(".slide-pagi a").each(function(e, t) {
        $(t).attr("href") == a && $(t).trigger("click")
      }), $(".link-popup").each(function(e, t) {
        $(t).attr("href") == a && $(t).trigger("click")
      }))), $("#news-details-page").length && ($(".nav li a").each(function(e, t) {
        $(t).attr("href") == a && window.history.back()
      }), $(".sub-nav li a").each(function(e, t) {
        $(t).attr("href") == a && window.history.back()
      }), $(".news-item a").each(function(e, t) {
        $(t).attr("href") == a && $(t).trigger("click")
      })), $("#project-details-page").length && ($(".load-content-news").length ? $(".close-news").trigger("click") : $(".close-popup").length ? $(".close-popup").trigger("click") : ($(".close-video").length && $(".close-video").trigger("click"), $(".close-pics").length && $(".close-pics").trigger("click"), $(".close-album").length && $(".close-album").trigger("click"), $(".nav li a").each(function(e, t) {
        $(t).attr("href") == a && window.history.back()
      }), $(".project-href a").attr("href") == a && window.history.back(), $(".sub-nav li a").each(function(e, t) {
        $(t).attr("href") == a && $(t).trigger("click")
      })))
    }
  }), (iOS || isFirefox) && $(window).bind("pageshow", function(e) {
    e.originalEvent.persisted && window.location.reload()
  }), $(".youtube-video").length) {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var youTubeId, youTubeUrl = $(".youtube-video").attr("data-embed"),
    regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
    match = youTubeUrl.match(regExp);
  youTubeId = match && 11 == match[2].length ? match[2] : "no video found";
  var player, youTube = $(".youtube-video"),
    Source = "https://img.youtube.com/vi/" + youTubeId + "/sddefault.jpg";
  if (iOS) var SRC = '<iframe id="VYT" src="https://www.youtube.com/embed/' + youTubeId + "?autoplay=1&enablejsapi=1&controls=1&loop=0&playsinline=1&color=white&rel=0&cc_load_policy=1&playlist=" + youTubeId + '" frameborder="0"  allow="autoplay" allowfullscreen></iframe>';
  else SRC = '<iframe id="VYT" src="https://www.youtube.com/embed/' + youTubeId + "?autoplay=1&enablejsapi=1&controls=0&loop=0&playsinline=1&color=white&rel=0&cc_load_policy=1&playlist=" + youTubeId + '" frameborder="0"  allow="autoplay" allowfullscreen></iframe>';
  $(youTube).append(SRC);
  var timer, time_update = 0;

  function onYouTubePlayerAPIReady() {
    player = new YT.Player("VYT", {
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    })
  }

  function onPlayerStateChange(e) {
    switch (e.data) {
      case YT.PlayerState.PLAYING:
        $("html").hasClass("no-touch") && $(".control").removeClass("show"), $(".bg-video").addClass("hide"), $(".play-button").removeClass("show"), $("#playpause").attr("data-state", "pause");
        break;
      case YT.PlayerState.PAUSED:
        $("html").hasClass("no-touch") && $(".control").addClass("show"), $(".bg-video").removeClass("hide"), $(".play-button").addClass("show"), $("#playpause").attr("data-state", "play");
        break;
      case YT.PlayerState.ENDED:
    }
    var t = e.target;
    $(t.getIframe()).bind("InView", {
      Player: t
    }, function(e, t) {
      1 == t && $(".play-button").hasClass("open-video") ? e.data.Player.playVideo() : e.data.Player.pauseVideo()
    })
  }

  function cleanTime() {
    return Math.round(player.getCurrentTime())
  }

  function onPlayerReady(e) {
    e.target.mute(), $("#mutetoggle").attr("data-state", "unmute"), updateTimerDisplay(), updateProgressBar(), player.pauseVideo(), $(".play-button").addClass("show"), $("#playpause").attr("data-state", "pause")
  }

  function updateTimerDisplay() {
    $("#current-time").text(formatTime(player.getCurrentTime())), $("#duration").text(formatTime(player.getDuration()))
  }

  function formatTime(e) {
    e = Math.round(e);
    var t = Math.floor(e / 60),
      a = e - 60 * t;
    return t + ":" + (a = a < 10 ? "0" + a : a)
  }

  function updateProgressBar() {
    $("#progress-bar").val(player.getCurrentTime() / player.getDuration() * 100)
  }
  $("#progress-bar").on("mouseup touchend", function(e) {
    var t = player.getDuration() * (e.target.value / 100);
    player.seekTo(t), $(".bg-video").hasClass("hide") || $(".bg-video").addClass("hide")
  }), $("#playpause").bind("click", function() {
    "play" == $(this).attr("data-state") ? (player.playVideo(), $(this).attr("data-state", "pause"), $(".bg-video").addClass("hide"), $(".play-button").removeClass("show")) : (player.pauseVideo(), $(this).attr("data-state", "play"), $(".play-button").addClass("show"), $(".bg-video").removeClass("hide"))
  }), $("#mutetoggle").bind("click", function() {
    "unmute" == $(this).attr("data-state") ? (player.unMute(), $(this).attr("data-state", "mute")) : (player.mute(), $(this).attr("data-state", "unmute"))
  }), $("#fullscreen").bind("click", function() {
    "go-fullscreen" == $(this).attr("data-state") ? ($(this).attr("data-state", "cancel-fullscreen"), $(".video-youtube-full").addClass("full-frame"), $("html, body").addClass("no-scroll fullscreen"), $("body").hasClass("auto") && ScrollBody(), iOS ? ($('.group-central[data-name="video-home"]').addClass("fullmode"), $(".header, .go-top, .footer").addClass("level-index-out")) : screenfull.request($(".video-youtube-full")[0])) : ($(this).attr("data-state", "go-fullscreen"), $(".video-youtube-full").removeClass("full-frame"), $("html, body").removeClass("no-scroll fullscreen"), $("body").hasClass("auto") && ScrollBody(), iOS ? ($('.group-central[data-name="video-home"]').removeClass("fullmode"), $(".header, .go-top, .footer").removeClass("level-index-out")) : screenfull.exit())
  }), $(".play-button").on("click", function(e) {
    e.preventDefault(), player.playVideo(), $(this).removeClass("show"), $("#playpause").attr("data-state", "pause"), $(".bg-video").addClass("hide"), $(".control").addClass("show"), $(".video-youtube-full").addClass("playing"), $(".play-button").addClass("open-video"), clearInterval(time_update), time_update = setInterval(function() {
      updateTimerDisplay(), updateProgressBar()
    }, 500), clearInterval(timer), timer = setInterval(function() {
      $("html").hasClass("no-touch") && $(".control").removeClass("show")
    }, 5e3)
  }), $(".pause-button").on("click", function(e) {
    e.preventDefault(), $(".play-button").addClass("show"), $("#playpause").attr("data-state", "play"), $(".bg-video, .slogan").removeClass("hide"), clearInterval(timer), $("html").hasClass("no-touch") && $(".control").addClass("show"), player.pauseVideo()
  }), $(".youtube-video").on("click", function(e) {
    e.preventDefault(), $("#playpause").trigger("click")
  }), $(".youtube-video, .control").on("mouseenter mousemove", function(e) {
    e.preventDefault(), $("html").hasClass("no-touch") && ($(".control").hasClass("show") || $(".control").addClass("show"))
  })
}! function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(d) {
  var u, $, o, h = [],
    g = document,
    p = window,
    m = g.documentElement;

  function t() {
    if (h.length) {
      var e, t, a, o = 0,
        i = d.map(h, function(e) {
          var t = e.data.selector,
            a = e.$element;
          return t ? a.find(t) : a
        });
      for (u = u || ((a = {
          height: p.innerHeight,
          width: p.innerWidth
        }).height || !(e = g.compatMode) && d.support.boxModel || (a = {
          height: (t = "CSS1Compat" === e ? m : g.body).clientHeight,
          width: t.clientWidth
        }), a), $ = $ || {
          top: p.pageYOffset || m.scrollTop || g.body.scrollTop,
          left: p.pageXOffset || m.scrollLeft || g.body.scrollLeft
        }; o < h.length; o++)
        if (d.contains(m, i[o][0])) {
          var n = d(i[o]),
            s = n[0].offsetHeight,
            l = n[0].offsetWidth,
            r = n.offset(),
            c = n.data("InView");
          if (!$ || !u) return;
          r.top + s > $.top && r.top < $.top + u.height && r.left + l > $.left && r.left < $.left + u.width ? c || n.data("InView", !0).trigger("InView", [!0]) : c && n.data("InView", !1).trigger("InView", [!1])
        }
    }
  }
  d.event.special.InView = {
    add: function(e) {
      h.push({
        data: e,
        $element: d(this),
        element: this
      }), !o && h.length && (o = setInterval(t, 250))
    },
    remove: function(e) {
      for (var t = 0; t < h.length; t++) {
        var a = h[t];
        if (a.element === this && a.data.guid === e.guid) {
          h.splice(t, 1);
          break
        }
      }
      h.length || (clearInterval(o), o = null)
    }
  }, d(p).on("scroll resize scrollstop", function() {
    u = $ = null
  }), !m.addEventListener && m.attachEvent && m.attachEvent("onfocusin", function() {
    $ = null
  })
});
