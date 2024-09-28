/*!
 * CreateJS
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */ var createjs = createjs || {};
(createjs.stageTransformable = !0),
  (createjs.extend = function (t, e) {
    "use strict";
    function i() {
      this.constructor = t;
    }
    return (i.prototype = e.prototype), (t.prototype = new i());
  }),
  (createjs.promote = function (t, e) {
    "use strict";
    var i = t.prototype,
      s = (Object.getPrototypeOf && Object.getPrototypeOf(i)) || i.__proto__;
    if (s)
      for (var r in ((i[(e += "_") + "constructor"] = s.constructor), s))
        i.hasOwnProperty(r) && "function" == typeof s[r] && (i[e + r] = s[r]);
    return t;
  }),
  (createjs.indexOf = function (t, e) {
    "use strict";
    for (var i = 0, s = t.length; i < s; i++) if (e === t[i]) return i;
    return -1;
  }),
  (function () {
    "use strict";
    function t() {
      throw "UID cannot be instantiated";
    }
    (t._nextID = 0),
      (t.get = function () {
        return t._nextID++;
      }),
      (createjs.UID = t);
  })(),
  (createjs.deprecate = function (e, i) {
    "use strict";
    return function () {
      var t = "Deprecated property or method '" + i + "'. See docs for info.";
      return (
        console && (console.warn ? console.warn(t) : console.log(t)),
        e && e.apply(this, arguments)
      );
    };
  }),
  (function () {
    "use strict";
    function t(t, e, i) {
      (this.type = t),
        (this.target = null),
        (this.currentTarget = null),
        (this.eventPhase = 0),
        (this.bubbles = !!e),
        (this.cancelable = !!i),
        (this.timeStamp = new Date().getTime()),
        (this.defaultPrevented = !1),
        (this.propagationStopped = !1),
        (this.immediatePropagationStopped = !1),
        (this.removed = !1);
    }
    var e = t.prototype;
    (e.preventDefault = function () {
      this.defaultPrevented = this.cancelable && !0;
    }),
      (e.stopPropagation = function () {
        this.propagationStopped = !0;
      }),
      (e.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0;
      }),
      (e.remove = function () {
        this.removed = !0;
      }),
      (e.clone = function () {
        return new t(this.type, this.bubbles, this.cancelable);
      }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.toString = function () {
        return "[Event (type=" + this.type + ")]";
      }),
      (createjs.Event = t);
  })(),
  (function () {
    "use strict";
    function t() {
      (this._listeners = null), (this._captureListeners = null);
    }
    var e = t.prototype;
    (t.initialize = function (t) {
      (t.addEventListener = e.addEventListener),
        (t.on = e.on),
        (t.removeEventListener = t.off = e.removeEventListener),
        (t.removeAllEventListeners = e.removeAllEventListeners),
        (t.hasEventListener = e.hasEventListener),
        (t.dispatchEvent = e.dispatchEvent),
        (t._dispatchEvent = e._dispatchEvent),
        (t.willTrigger = e.willTrigger);
    }),
      (e.addEventListener = function (t, e, i) {
        var s = i
            ? (this._captureListeners = this._captureListeners || {})
            : (this._listeners = this._listeners || {}),
          r = s[t];
        return (
          r && this.removeEventListener(t, e, i),
          (r = s[t]) ? r.push(e) : (s[t] = [e]),
          e
        );
      }),
      (e.on = function (t, e, i, s, r, n) {
        return (
          e.handleEvent && ((i = i || e), (e = e.handleEvent)),
          (i = i || this),
          this.addEventListener(
            t,
            function (t) {
              e.call(i, t, r), s && t.remove();
            },
            n
          )
        );
      }),
      (e.removeEventListener = function (t, e, i) {
        var s = i ? this._captureListeners : this._listeners;
        if (s) {
          var r = s[t];
          if (r)
            for (var n = 0, a = r.length; n < a; n++)
              if (r[n] == e) {
                1 == a ? delete s[t] : r.splice(n, 1);
                break;
              }
        }
      }),
      (e.off = e.removeEventListener),
      (e.removeAllEventListeners = function (t) {
        t
          ? (this._listeners && delete this._listeners[t],
            this._captureListeners && delete this._captureListeners[t])
          : (this._listeners = this._captureListeners = null);
      }),
      (e.dispatchEvent = function (t, e, i) {
        if ("string" == typeof t) {
          var s = this._listeners;
          if (!(e || (s && s[t]))) return !0;
          t = new createjs.Event(t, e, i);
        } else t.target && t.clone && (t = t.clone());
        try {
          t.target = this;
        } catch (t) {}
        if (t.bubbles && this.parent) {
          for (var r = this, n = [r]; r.parent; ) n.push((r = r.parent));
          for (
            var a = n.length, o = a - 1;
            0 <= o && !t.propagationStopped;
            o--
          )
            n[o]._dispatchEvent(t, 1 + (0 == o));
          for (o = 1; o < a && !t.propagationStopped; o++)
            n[o]._dispatchEvent(t, 3);
        } else this._dispatchEvent(t, 2);
        return !t.defaultPrevented;
      }),
      (e.hasEventListener = function (t) {
        var e = this._listeners,
          i = this._captureListeners;
        return !!((e && e[t]) || (i && i[t]));
      }),
      (e.willTrigger = function (t) {
        for (var e = this; e; ) {
          if (e.hasEventListener(t)) return !0;
          e = e.parent;
        }
        return !1;
      }),
      (e.toString = function () {
        return "[EventDispatcher]";
      }),
      (e._dispatchEvent = function (t, e) {
        var i,
          s,
          r = e <= 2 ? this._captureListeners : this._listeners;
        if (t && r && (s = r[t.type]) && (i = s.length)) {
          try {
            t.currentTarget = this;
          } catch (t) {}
          try {
            t.eventPhase = 0 | e;
          } catch (t) {}
          (t.removed = !1), (s = s.slice());
          for (var n = 0; n < i && !t.immediatePropagationStopped; n++) {
            var a = s[n];
            a.handleEvent ? a.handleEvent(t) : a(t),
              t.removed && (this.off(t.type, a, 1 == e), (t.removed = !1));
          }
        }
        2 === e && this._dispatchEvent(t, 2.1);
      }),
      (createjs.EventDispatcher = t);
  })(),
  (function () {
    "use strict";
    function n() {
      throw "Ticker cannot be instantiated.";
    }
    (n.RAF_SYNCHED = "synched"),
      (n.RAF = "raf"),
      (n.TIMEOUT = "timeout"),
      (n.timingMode = null),
      (n.maxDelta = 0),
      (n.paused = !1),
      (n.removeEventListener = null),
      (n.removeAllEventListeners = null),
      (n.dispatchEvent = null),
      (n.hasEventListener = null),
      (n._listeners = null),
      createjs.EventDispatcher.initialize(n),
      (n._addEventListener = n.addEventListener),
      (n.addEventListener = function () {
        return n._inited || n.init(), n._addEventListener.apply(n, arguments);
      }),
      (n._inited = !1),
      (n._startTime = 0),
      (n._pausedTime = 0),
      (n._ticks = 0),
      (n._pausedTicks = 0),
      (n._interval = 50),
      (n._lastTime = 0),
      (n._times = null),
      (n._tickTimes = null),
      (n._timerId = null),
      (n._raf = !0),
      (n._setInterval = function (t) {
        (n._interval = t), n._inited && n._setupTick();
      }),
      (n.setInterval = createjs.deprecate(
        n._setInterval,
        "Ticker.setInterval"
      )),
      (n._getInterval = function () {
        return n._interval;
      }),
      (n.getInterval = createjs.deprecate(
        n._getInterval,
        "Ticker.getInterval"
      )),
      (n._setFPS = function (t) {
        n._setInterval(1e3 / t);
      }),
      (n.setFPS = createjs.deprecate(n._setFPS, "Ticker.setFPS")),
      (n._getFPS = function () {
        return 1e3 / n._interval;
      }),
      (n.getFPS = createjs.deprecate(n._getFPS, "Ticker.getFPS"));
    try {
      Object.defineProperties(n, {
        interval: { get: n._getInterval, set: n._setInterval },
        framerate: { get: n._getFPS, set: n._setFPS },
      });
    } catch (t) {
      console.log(t);
    }
    (n.init = function () {
      n._inited ||
        ((n._inited = !0),
        (n._times = []),
        (n._tickTimes = []),
        (n._startTime = n._getTime()),
        n._times.push((n._lastTime = 0)),
        (n.interval = n._interval));
    }),
      (n.reset = function () {
        var t;
        n._raf
          ? (t =
              window.cancelAnimationFrame ||
              window.webkitCancelAnimationFrame ||
              window.mozCancelAnimationFrame ||
              window.oCancelAnimationFrame ||
              window.msCancelAnimationFrame) && t(n._timerId)
          : clearTimeout(n._timerId),
          n.removeAllEventListeners("tick"),
          (n._timerId = n._times = n._tickTimes = null),
          (n._startTime = n._lastTime = n._ticks = n._pausedTime = 0),
          (n._inited = !1);
      }),
      (n.getMeasuredTickTime = function (t) {
        var e = 0,
          i = n._tickTimes;
        if (!i || i.length < 1) return -1;
        t = Math.min(i.length, t || 0 | n._getFPS());
        for (var s = 0; s < t; s++) e += i[s];
        return e / t;
      }),
      (n.getMeasuredFPS = function (t) {
        var e = n._times;
        return !e || e.length < 2
          ? -1
          : ((t = Math.min(e.length - 1, t || 0 | n._getFPS())),
            1e3 / ((e[0] - e[t]) / t));
      }),
      (n.getTime = function (t) {
        return n._startTime ? n._getTime() - (t ? n._pausedTime : 0) : -1;
      }),
      (n.getEventTime = function (t) {
        return n._startTime
          ? (n._lastTime || n._startTime) - (t ? n._pausedTime : 0)
          : -1;
      }),
      (n.getTicks = function (t) {
        return n._ticks - (t ? n._pausedTicks : 0);
      }),
      (n._handleSynch = function () {
        (n._timerId = null),
          n._setupTick(),
          n._getTime() - n._lastTime >= 0.97 * (n._interval - 1) && n._tick();
      }),
      (n._handleRAF = function () {
        (n._timerId = null), n._setupTick(), n._tick();
      }),
      (n._handleTimeout = function () {
        (n._timerId = null), n._setupTick(), n._tick();
      }),
      (n._setupTick = function () {
        if (null == n._timerId) {
          var t = n.timingMode;
          if (t == n.RAF_SYNCHED || t == n.RAF) {
            var e =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame;
            if (e)
              return (
                (n._timerId = e(t == n.RAF ? n._handleRAF : n._handleSynch)),
                void (n._raf = !0)
              );
          }
          (n._raf = !1),
            (n._timerId = setTimeout(n._handleTimeout, n._interval));
        }
      }),
      (n._tick = function () {
        var t,
          e,
          i = n.paused,
          s = n._getTime(),
          r = s - n._lastTime;
        for (
          n._lastTime = s,
            n._ticks++,
            i && (n._pausedTicks++, (n._pausedTime += r)),
            n.hasEventListener("tick") &&
              ((t = new createjs.Event("tick")),
              (e = n.maxDelta),
              (t.delta = e && e < r ? e : r),
              (t.paused = i),
              (t.time = s),
              (t.runTime = s - n._pausedTime),
              n.dispatchEvent(t)),
            n._tickTimes.unshift(n._getTime() - s);
          100 < n._tickTimes.length;

        )
          n._tickTimes.pop();
        for (n._times.unshift(s); 100 < n._times.length; ) n._times.pop();
      });
    var t = window,
      e =
        t.performance.now ||
        t.performance.mozNow ||
        t.performance.msNow ||
        t.performance.oNow ||
        t.performance.webkitNow;
    (n._getTime = function () {
      return (
        ((e && e.call(t.performance)) || new Date().getTime()) - n._startTime
      );
    }),
      (createjs.Ticker = n);
  })(),
  (function () {
    "use strict";
    function t(t) {
      (this.readyState = t.readyState),
        (this._video = t),
        (this._canvas = null),
        (this._lastTime = -1),
        this.readyState < 2 &&
          t.addEventListener("canplaythrough", this._videoReady.bind(this));
    }
    var e = t.prototype;
    (e.getImage = function () {
      if (!(this.readyState < 2)) {
        var t,
          e = this._canvas,
          i = this._video;
        return (
          e ||
            (((e = this._canvas =
              createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas")).width = i.videoWidth),
            (e.height = i.videoHeight)),
          2 <= i.readyState &&
            i.currentTime !== this._lastTime &&
            ((t = e.getContext("2d", { willReadFrequently: true })).clearRect(
              0,
              0,
              e.width,
              e.height
            ),
            t.drawImage(i, 0, 0, e.width, e.height),
            (this._lastTime = i.currentTime)),
          e
        );
      }
    }),
      (e._videoReady = function () {
        this.readyState = 2;
      }),
      (createjs.VideoBuffer = t);
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s, r, n, a, o, h, c, u) {
      this.Event_constructor(t, e, i),
        (this.stageX = s),
        (this.stageY = r),
        (this.rawX = null == h ? s : h),
        (this.rawY = null == c ? r : c),
        (this.nativeEvent = n),
        (this.pointerID = a),
        (this.primary = !!o),
        (this.relatedTarget = u);
    }
    var e = createjs.extend(t, createjs.Event);
    (e._get_localX = function () {
      return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
    }),
      (e._get_localY = function () {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
      }),
      (e._get_isTouch = function () {
        return -1 !== this.pointerID;
      });
    try {
      Object.defineProperties(e, {
        localX: { get: e._get_localX },
        localY: { get: e._get_localY },
        isTouch: { get: e._get_isTouch },
      });
    } catch (t) {}
    (e.clone = function () {
      return new t(
        this.type,
        this.bubbles,
        this.cancelable,
        this.stageX,
        this.stageY,
        this.nativeEvent,
        this.pointerID,
        this.primary,
        this.rawX,
        this.rawY
      );
    }),
      (e.toString = function () {
        return (
          "[MouseEvent (type=" +
          this.type +
          " stageX=" +
          this.stageX +
          " stageY=" +
          this.stageY +
          ")]"
        );
      }),
      (createjs.MouseEvent = createjs.promote(t, "Event"));
  })(),
  (function () {
    "use strict";
    function d(t, e, i, s, r, n) {
      this.setValues(t, e, i, s, r, n);
    }
    var t = d.prototype;
    (d.DEG_TO_RAD = Math.PI / 180),
      (d.identity = null),
      (t.setValues = function (t, e, i, s, r, n) {
        return (
          (this.a = null == t ? 1 : t),
          (this.b = e || 0),
          (this.c = i || 0),
          (this.d = null == s ? 1 : s),
          (this.tx = r || 0),
          (this.ty = n || 0),
          this
        );
      }),
      (t.append = function (t, e, i, s, r, n) {
        var a = this.a,
          o = this.b,
          h = this.c,
          c = this.d;
        return (
          (1 == t && 0 == e && 0 == i && 1 == s) ||
            ((this.a = a * t + h * e),
            (this.b = o * t + c * e),
            (this.c = a * i + h * s),
            (this.d = o * i + c * s)),
          (this.tx = a * r + h * n + this.tx),
          (this.ty = o * r + c * n + this.ty),
          this
        );
      }),
      (t.prepend = function (t, e, i, s, r, n) {
        var a = this.a,
          o = this.c,
          h = this.tx;
        return (
          (this.a = t * a + i * this.b),
          (this.b = e * a + s * this.b),
          (this.c = t * o + i * this.d),
          (this.d = e * o + s * this.d),
          (this.tx = t * h + i * this.ty + r),
          (this.ty = e * h + s * this.ty + n),
          this
        );
      }),
      (t.appendMatrix = function (t) {
        return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (t.prependMatrix = function (t) {
        return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (t.appendTransform = function (t, e, i, s, r, n, a, o, h) {
        var c,
          u,
          l =
            r % 360
              ? ((c = r * d.DEG_TO_RAD), (u = Math.cos(c)), Math.sin(c))
              : ((u = 1), 0);
        return (
          n || a
            ? ((n *= d.DEG_TO_RAD),
              (a *= d.DEG_TO_RAD),
              this.append(
                Math.cos(a),
                Math.sin(a),
                -Math.sin(n),
                Math.cos(n),
                t,
                e
              ),
              this.append(u * i, l * i, -l * s, u * s, 0, 0))
            : this.append(u * i, l * i, -l * s, u * s, t, e),
          (o || h) &&
            ((this.tx -= o * this.a + h * this.c),
            (this.ty -= o * this.b + h * this.d)),
          this
        );
      }),
      (t.prependTransform = function (t, e, i, s, r, n, a, o, h) {
        var c,
          u,
          l =
            r % 360
              ? ((c = r * d.DEG_TO_RAD), (u = Math.cos(c)), Math.sin(c))
              : ((u = 1), 0);
        return (
          (o || h) && ((this.tx -= o), (this.ty -= h)),
          n || a
            ? ((n *= d.DEG_TO_RAD),
              (a *= d.DEG_TO_RAD),
              this.prepend(u * i, l * i, -l * s, u * s, 0, 0),
              this.prepend(
                Math.cos(a),
                Math.sin(a),
                -Math.sin(n),
                Math.cos(n),
                t,
                e
              ))
            : this.prepend(u * i, l * i, -l * s, u * s, t, e),
          this
        );
      }),
      (t.rotate = function (t) {
        t *= d.DEG_TO_RAD;
        var e = Math.cos(t),
          i = Math.sin(t),
          s = this.a,
          r = this.b;
        return (
          (this.a = s * e + this.c * i),
          (this.b = r * e + this.d * i),
          (this.c = -s * i + this.c * e),
          (this.d = -r * i + this.d * e),
          this
        );
      }),
      (t.skew = function (t, e) {
        return (
          (t *= d.DEG_TO_RAD),
          (e *= d.DEG_TO_RAD),
          this.append(
            Math.cos(e),
            Math.sin(e),
            -Math.sin(t),
            Math.cos(t),
            0,
            0
          ),
          this
        );
      }),
      (t.scale = function (t, e) {
        return (this.a *= t), (this.b *= t), (this.c *= e), (this.d *= e), this;
      }),
      (t.translate = function (t, e) {
        return (
          (this.tx += this.a * t + this.c * e),
          (this.ty += this.b * t + this.d * e),
          this
        );
      }),
      (t.identity = function () {
        return (
          (this.a = this.d = 1), (this.b = this.c = this.tx = this.ty = 0), this
        );
      }),
      (t.invert = function () {
        var t = this.a,
          e = this.b,
          i = this.c,
          s = this.d,
          r = this.tx,
          n = t * s - e * i;
        return (
          (this.a = s / n),
          (this.b = -e / n),
          (this.c = -i / n),
          (this.d = t / n),
          (this.tx = (i * this.ty - s * r) / n),
          (this.ty = -(t * this.ty - e * r) / n),
          this
        );
      }),
      (t.isIdentity = function () {
        return (
          0 === this.tx &&
          0 === this.ty &&
          1 === this.a &&
          0 === this.b &&
          0 === this.c &&
          1 === this.d
        );
      }),
      (t.equals = function (t) {
        return (
          this.tx === t.tx &&
          this.ty === t.ty &&
          this.a === t.a &&
          this.b === t.b &&
          this.c === t.c &&
          this.d === t.d
        );
      }),
      (t.transformPoint = function (t, e, i) {
        return (
          ((i = i || {}).x = t * this.a + e * this.c + this.tx),
          (i.y = t * this.b + e * this.d + this.ty),
          i
        );
      }),
      (t.decompose = function (t) {
        null == t && (t = {}),
          (t.x = this.tx),
          (t.y = this.ty),
          (t.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)),
          (t.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
        var e = Math.atan2(-this.c, this.d),
          i = Math.atan2(this.b, this.a);
        return (
          Math.abs(1 - e / i) < 1e-5
            ? ((t.rotation = i / d.DEG_TO_RAD),
              this.a < 0 &&
                0 <= this.d &&
                (t.rotation += t.rotation <= 0 ? 180 : -180),
              (t.skewX = t.skewY = 0))
            : ((t.skewX = e / d.DEG_TO_RAD), (t.skewY = i / d.DEG_TO_RAD)),
          t
        );
      }),
      (t.copy = function (t) {
        return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (t.clone = function () {
        return new d(this.a, this.b, this.c, this.d, this.tx, this.ty);
      }),
      (t.toString = function () {
        return (
          "[Matrix2D (a=" +
          this.a +
          " b=" +
          this.b +
          " c=" +
          this.c +
          " d=" +
          this.d +
          " tx=" +
          this.tx +
          " ty=" +
          this.ty +
          ")]"
        );
      }),
      (d.identity = new d()),
      (createjs.Matrix2D = d);
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s, r) {
      this.setValues(t, e, i, s, r);
    }
    var e = t.prototype;
    (e.setValues = function (t, e, i, s, r) {
      return (
        (this.visible = null == t || !!t),
        (this.alpha = null == e ? 1 : e),
        (this.shadow = i),
        (this.compositeOperation = s),
        (this.matrix =
          r ||
          (this.matrix && this.matrix.identity()) ||
          new createjs.Matrix2D()),
        this
      );
    }),
      (e.append = function (t, e, i, s, r) {
        return (
          (this.alpha *= e),
          (this.shadow = i || this.shadow),
          (this.compositeOperation = s || this.compositeOperation),
          (this.visible = this.visible && t),
          r && this.matrix.appendMatrix(r),
          this
        );
      }),
      (e.prepend = function (t, e, i, s, r) {
        return (
          (this.alpha *= e),
          (this.shadow = this.shadow || i),
          (this.compositeOperation = this.compositeOperation || s),
          (this.visible = this.visible && t),
          r && this.matrix.prependMatrix(r),
          this
        );
      }),
      (e.identity = function () {
        return (
          (this.visible = !0),
          (this.alpha = 1),
          (this.shadow = this.compositeOperation = null),
          this.matrix.identity(),
          this
        );
      }),
      (e.clone = function () {
        return new t(
          this.alpha,
          this.shadow,
          this.compositeOperation,
          this.visible,
          this.matrix.clone()
        );
      }),
      (createjs.DisplayProps = t);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.setValues(t, e);
    }
    var e = t.prototype;
    (e.setValues = function (t, e) {
      return (this.x = t || 0), (this.y = e || 0), this;
    }),
      (e.copy = function (t) {
        return (this.x = t.x), (this.y = t.y), this;
      }),
      (e.clone = function () {
        return new t(this.x, this.y);
      }),
      (e.toString = function () {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
      }),
      (createjs.Point = t);
  })(),
  (function () {
    "use strict";
    function n(t, e, i, s) {
      this.setValues(t, e, i, s);
    }
    var t = n.prototype;
    (t.setValues = function (t, e, i, s) {
      return (
        (this.x = t || 0),
        (this.y = e || 0),
        (this.width = i || 0),
        (this.height = s || 0),
        this
      );
    }),
      (t.extend = function (t, e, i, s) {
        return (
          (s = s || 0),
          t + (i = i || 0) > this.x + this.width &&
            (this.width = t + i - this.x),
          e + s > this.y + this.height && (this.height = e + s - this.y),
          t < this.x && ((this.width += this.x - t), (this.x = t)),
          e < this.y && ((this.height += this.y - e), (this.y = e)),
          this
        );
      }),
      (t.pad = function (t, e, i, s) {
        return (
          (this.x -= e),
          (this.y -= t),
          (this.width += e + s),
          (this.height += t + i),
          this
        );
      }),
      (t.copy = function (t) {
        return this.setValues(t.x, t.y, t.width, t.height);
      }),
      (t.contains = function (t, e, i, s) {
        return (
          (i = i || 0),
          (s = s || 0),
          t >= this.x &&
            t + i <= this.x + this.width &&
            e >= this.y &&
            e + s <= this.y + this.height
        );
      }),
      (t.union = function (t) {
        return this.clone().extend(t.x, t.y, t.width, t.height);
      }),
      (t.intersection = function (t) {
        var e = t.x,
          i = t.y,
          s = e + t.width,
          r = i + t.height;
        return (
          this.x > e && (e = this.x),
          this.y > i && (i = this.y),
          this.x + this.width < s && (s = this.x + this.width),
          this.y + this.height < r && (r = this.y + this.height),
          s <= e || r <= i ? null : new n(e, i, s - e, r - i)
        );
      }),
      (t.intersects = function (t) {
        return (
          t.x <= this.x + this.width &&
          this.x <= t.x + t.width &&
          t.y <= this.y + this.height &&
          this.y <= t.y + t.height
        );
      }),
      (t.isEmpty = function () {
        return this.width <= 0 || this.height <= 0;
      }),
      (t.clone = function () {
        return new n(this.x, this.y, this.width, this.height);
      }),
      (t.toString = function () {
        return (
          "[Rectangle (x=" +
          this.x +
          " y=" +
          this.y +
          " width=" +
          this.width +
          " height=" +
          this.height +
          ")]"
        );
      }),
      (createjs.Rectangle = n);
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s, r, n, a) {
      t.addEventListener &&
        ((this.target = t),
        (this.overLabel = null == i ? "over" : i),
        (this.outLabel = null == e ? "out" : e),
        (this.downLabel = null == s ? "down" : s),
        (this.play = r),
        (this._isPressed = !1),
        (this._isOver = !1),
        (this._enabled = !1),
        (t.mouseChildren = !1),
        (this.enabled = !0),
        this.handleEvent({}),
        n &&
          (a && ((n.actionsEnabled = !1), n.gotoAndStop && n.gotoAndStop(a)),
          (t.hitArea = n)));
    }
    var e = t.prototype;
    (e._setEnabled = function (t) {
      var e;
      t != this._enabled &&
        ((e = this.target),
        (this._enabled = t)
          ? ((e.cursor = "pointer"),
            e.addEventListener("rollover", this),
            e.addEventListener("rollout", this),
            e.addEventListener("mousedown", this),
            e.addEventListener("pressup", this),
            e._reset && ((e.__reset = e._reset), (e._reset = this._reset)))
          : ((e.cursor = null),
            e.removeEventListener("rollover", this),
            e.removeEventListener("rollout", this),
            e.removeEventListener("mousedown", this),
            e.removeEventListener("pressup", this),
            e.__reset && ((e._reset = e.__reset), delete e.__reset)));
    }),
      (e.setEnabled = createjs.deprecate(
        e._setEnabled,
        "ButtonHelper.setEnabled"
      )),
      (e._getEnabled = function () {
        return this._enabled;
      }),
      (e.getEnabled = createjs.deprecate(
        e._getEnabled,
        "ButtonHelper.getEnabled"
      ));
    try {
      Object.defineProperties(e, {
        enabled: { get: e._getEnabled, set: e._setEnabled },
      });
    } catch (t) {}
    (e.toString = function () {
      return "[ButtonHelper]";
    }),
      (e.handleEvent = function (t) {
        var e = this.target,
          i = t.type,
          s =
            "mousedown" == i
              ? ((this._isPressed = !0), this.downLabel)
              : "pressup" == i
              ? ((this._isPressed = !1),
                this._isOver ? this.overLabel : this.outLabel)
              : "rollover" == i
              ? ((this._isOver = !0),
                this._isPressed ? this.downLabel : this.overLabel)
              : ((this._isOver = !1),
                this._isPressed ? this.overLabel : this.outLabel);
        this.play
          ? e.gotoAndPlay && e.gotoAndPlay(s)
          : e.gotoAndStop && e.gotoAndStop(s);
      }),
      (e._reset = function () {
        var t = this.paused;
        this.__reset(), (this.paused = t);
      }),
      (createjs.ButtonHelper = t);
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      (this.color = t || "black"),
        (this.offsetX = e || 0),
        (this.offsetY = i || 0),
        (this.blur = s || 0);
    }
    var e = t.prototype;
    (t.identity = new t("transparent", 0, 0, 0)),
      (e.toString = function () {
        return "[Shadow]";
      }),
      (e.clone = function () {
        return new t(this.color, this.offsetX, this.offsetY, this.blur);
      }),
      (createjs.Shadow = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.EventDispatcher_constructor(),
        (this.complete = !0),
        (this.framerate = 0),
        (this._animations = null),
        (this._frames = null),
        (this._images = null),
        (this._data = null),
        (this._loadCount = 0),
        (this._frameHeight = 0),
        (this._frameWidth = 0),
        (this._numFrames = 0),
        (this._regX = 0),
        (this._regY = 0),
        (this._spacing = 0),
        (this._margin = 0),
        this._parseData(t);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (e._getAnimations = function () {
      return this._animations.slice();
    }),
      (e.getAnimations = createjs.deprecate(
        e._getAnimations,
        "SpriteSheet.getAnimations"
      ));
    try {
      Object.defineProperties(e, { animations: { get: e._getAnimations } });
    } catch (t) {}
    (e.getNumFrames = function (t) {
      if (null == t)
        return this._frames ? this._frames.length : this._numFrames || 0;
      var e = this._data[t];
      return null == e ? 0 : e.frames.length;
    }),
      (e.getAnimation = function (t) {
        return this._data[t];
      }),
      (e.getFrame = function (t) {
        var e;
        return this._frames && (e = this._frames[t]) ? e : null;
      }),
      (e.getFrameBounds = function (t, e) {
        var i = this.getFrame(t);
        return i
          ? (e || new createjs.Rectangle()).setValues(
              -i.regX,
              -i.regY,
              i.rect.width,
              i.rect.height
            )
          : null;
      }),
      (e.toString = function () {
        return "[SpriteSheet]";
      }),
      (e.clone = function () {
        throw "SpriteSheet cannot be cloned.";
      }),
      (e._parseData = function (t) {
        var e, i, s, r;
        if (null != t) {
          if (
            ((this.framerate = t.framerate || 0),
            t.images && 0 < (i = t.images.length))
          )
            for (l = this._images = [], e = 0; e < i; e++) {
              var n,
                a = t.images[e];
              "string" == typeof a &&
                ((n = a), ((a = document.createElement("img")).src = n)),
                l.push(a),
                a.getContext ||
                  a.naturalWidth ||
                  (this._loadCount++,
                  (this.complete = !1),
                  (function (t, e) {
                    a.onload = function () {
                      t._handleImageLoad(e);
                    };
                  })(this, n),
                  (function (t, e) {
                    a.onerror = function () {
                      t._handleImageError(e);
                    };
                  })(this, n));
            }
          if (null != t.frames)
            if (Array.isArray(t.frames))
              for (
                this._frames = [], e = 0, i = (l = t.frames).length;
                e < i;
                e++
              ) {
                var o = l[e];
                this._frames.push({
                  image: this._images[o[4] ? o[4] : 0],
                  rect: new createjs.Rectangle(o[0], o[1], o[2], o[3]),
                  regX: o[5] || 0,
                  regY: o[6] || 0,
                });
              }
            else
              (s = t.frames),
                (this._frameWidth = s.width),
                (this._frameHeight = s.height),
                (this._regX = s.regX || 0),
                (this._regY = s.regY || 0),
                (this._spacing = s.spacing || 0),
                (this._margin = s.margin || 0),
                (this._numFrames = s.count),
                0 == this._loadCount && this._calculateFrames();
          if (((this._animations = []), null != (s = t.animations)))
            for (r in ((this._data = {}), s)) {
              var h = { name: r },
                c = s[r];
              if ("number" == typeof c) l = h.frames = [c];
              else if (Array.isArray(c))
                if (1 == c.length) h.frames = [c[0]];
                else
                  for (
                    h.speed = c[3], h.next = c[2], l = h.frames = [], e = c[0];
                    e <= c[1];
                    e++
                  )
                    l.push(e);
              else {
                (h.speed = c.speed), (h.next = c.next);
                var u = c.frames,
                  l = (h.frames = "number" == typeof u ? [u] : u.slice(0));
              }
              (!0 !== h.next && void 0 !== h.next) || (h.next = r),
                (!1 === h.next || (l.length < 2 && h.next == r)) &&
                  (h.next = null),
                h.speed || (h.speed = 1),
                this._animations.push(r),
                (this._data[r] = h);
            }
        }
      }),
      (e._handleImageLoad = function (t) {
        0 == --this._loadCount &&
          (this._calculateFrames(),
          (this.complete = !0),
          this.dispatchEvent("complete"));
      }),
      (e._handleImageError = function (t) {
        var e = new createjs.Event("error");
        (e.src = t),
          this.dispatchEvent(e),
          0 == --this._loadCount && this.dispatchEvent("complete");
      }),
      (e._calculateFrames = function () {
        if (!this._frames && 0 != this._frameWidth) {
          this._frames = [];
          var t = this._numFrames || 1e5,
            e = 0,
            i = this._frameWidth,
            s = this._frameHeight,
            r = this._spacing,
            n = this._margin;
          t: for (var a = 0, o = this._images; a < o.length; a++)
            for (
              var h = o[a],
                c = h.width || h.naturalWidth,
                u = h.height || h.naturalHeight,
                l = n;
              l <= u - n - s;

            ) {
              for (var d = n; d <= c - n - i; ) {
                if (t <= e) break t;
                e++,
                  this._frames.push({
                    image: h,
                    rect: new createjs.Rectangle(d, l, i, s),
                    regX: this._regX,
                    regY: this._regY,
                  }),
                  (d += i + r);
              }
              l += s + r;
            }
          this._numFrames = e;
        }
      }),
      (createjs.SpriteSheet = createjs.promote(t, "EventDispatcher"));
  })(),
  (function () {
    "use strict";
    function v() {
      (this.command = null),
        (this._stroke = null),
        (this._strokeStyle = null),
        (this._oldStrokeStyle = null),
        (this._strokeDash = null),
        (this._oldStrokeDash = null),
        (this._strokeIgnoreScale = !1),
        (this._fill = null),
        (this._instructions = []),
        (this._commitIndex = 0),
        (this._activeInstructions = []),
        (this._dirty = !1),
        (this._storeIndex = 0),
        this.clear();
    }
    var t = v.prototype,
      h = v;
    (v.getRGB = function (t, e, i, s) {
      return (
        null != t &&
          null == i &&
          ((s = e), (i = 255 & t), (e = (t >> 8) & 255), (t = (t >> 16) & 255)),
        null == s
          ? "rgb(" + t + "," + e + "," + i + ")"
          : "rgba(" + t + "," + e + "," + i + "," + s + ")"
      );
    }),
      (v.getHSL = function (t, e, i, s) {
        return null == s
          ? "hsl(" + (t % 360) + "," + e + "%," + i + "%)"
          : "hsla(" + (t % 360) + "," + e + "%," + i + "%," + s + ")";
      }),
      (v.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63,
      }),
      (v.STROKE_CAPS_MAP = ["butt", "round", "square"]),
      (v.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
    var e = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    e.getContext &&
      ((v._ctx = e.getContext("2d", { willReadFrequently: true })),
      (e.width = e.height = 1)),
      (t._getInstructions = function () {
        return this._updateInstructions(), this._instructions;
      }),
      (t.getInstructions = createjs.deprecate(
        t._getInstructions,
        "Graphics.getInstructions"
      ));
    try {
      Object.defineProperties(t, { instructions: { get: t._getInstructions } });
    } catch (t) {}
    (t.isEmpty = function () {
      return !(this._instructions.length || this._activeInstructions.length);
    }),
      (t.draw = function (t, e) {
        this._updateInstructions();
        for (
          var i = this._instructions, s = this._storeIndex, r = i.length;
          s < r;
          s++
        )
          i[s].exec(t, e);
      }),
      (t.drawAsPath = function (t) {
        this._updateInstructions();
        for (
          var e, i = this._instructions, s = this._storeIndex, r = i.length;
          s < r;
          s++
        )
          !1 !== (e = i[s]).path && e.exec(t);
      }),
      (t.moveTo = function (t, e) {
        return this.append(new h.MoveTo(t, e), !0);
      }),
      (t.lineTo = function (t, e) {
        return this.append(new h.LineTo(t, e));
      }),
      (t.arcTo = function (t, e, i, s, r) {
        return this.append(new h.ArcTo(t, e, i, s, r));
      }),
      (t.arc = function (t, e, i, s, r, n) {
        return this.append(new h.Arc(t, e, i, s, r, n));
      }),
      (t.quadraticCurveTo = function (t, e, i, s) {
        return this.append(new h.QuadraticCurveTo(t, e, i, s));
      }),
      (t.bezierCurveTo = function (t, e, i, s, r, n) {
        return this.append(new h.BezierCurveTo(t, e, i, s, r, n));
      }),
      (t.rect = function (t, e, i, s) {
        return this.append(new h.Rect(t, e, i, s));
      }),
      (t.closePath = function () {
        return this._activeInstructions.length
          ? this.append(new h.ClosePath())
          : this;
      }),
      (t.clear = function () {
        return (
          (this._instructions.length =
            this._activeInstructions.length =
            this._commitIndex =
              0),
          (this._strokeStyle =
            this._oldStrokeStyle =
            this._stroke =
            this._fill =
            this._strokeDash =
            this._oldStrokeDash =
              null),
          (this._dirty = this._strokeIgnoreScale = !1),
          this
        );
      }),
      (t.beginFill = function (t) {
        return this._setFill(t ? new h.Fill(t) : null);
      }),
      (t.beginLinearGradientFill = function (t, e, i, s, r, n) {
        return this._setFill(new h.Fill().linearGradient(t, e, i, s, r, n));
      }),
      (t.beginRadialGradientFill = function (t, e, i, s, r, n, a, o) {
        return this._setFill(
          new h.Fill().radialGradient(t, e, i, s, r, n, a, o)
        );
      }),
      (t.beginBitmapFill = function (t, e, i) {
        return this._setFill(new h.Fill(null, i).bitmap(t, e));
      }),
      (t.endFill = function () {
        return this.beginFill();
      }),
      (t.setStrokeStyle = function (t, e, i, s, r) {
        return (
          this._updateInstructions(!0),
          (this._strokeStyle = this.command = new h.StrokeStyle(t, e, i, s, r)),
          this._stroke && (this._stroke.ignoreScale = r),
          (this._strokeIgnoreScale = r),
          this
        );
      }),
      (t.setStrokeDash = function (t, e) {
        return (
          this._updateInstructions(!0),
          (this._strokeDash = this.command = new h.StrokeDash(t, e)),
          this
        );
      }),
      (t.beginStroke = function (t) {
        return this._setStroke(t ? new h.Stroke(t) : null);
      }),
      (t.beginLinearGradientStroke = function (t, e, i, s, r, n) {
        return this._setStroke(new h.Stroke().linearGradient(t, e, i, s, r, n));
      }),
      (t.beginRadialGradientStroke = function (t, e, i, s, r, n, a, o) {
        return this._setStroke(
          new h.Stroke().radialGradient(t, e, i, s, r, n, a, o)
        );
      }),
      (t.beginBitmapStroke = function (t, e) {
        return this._setStroke(new h.Stroke().bitmap(t, e));
      }),
      (t.endStroke = function () {
        return this.beginStroke();
      }),
      (t.curveTo = t.quadraticCurveTo),
      (t.drawRect = t.rect),
      (t.drawRoundRect = function (t, e, i, s, r) {
        return this.drawRoundRectComplex(t, e, i, s, r, r, r, r);
      }),
      (t.drawRoundRectComplex = function (t, e, i, s, r, n, a, o) {
        return this.append(new h.RoundRect(t, e, i, s, r, n, a, o));
      }),
      (t.drawCircle = function (t, e, i) {
        return this.append(new h.Circle(t, e, i));
      }),
      (t.drawEllipse = function (t, e, i, s) {
        return this.append(new h.Ellipse(t, e, i, s));
      }),
      (t.drawPolyStar = function (t, e, i, s, r, n) {
        return this.append(new h.PolyStar(t, e, i, s, r, n));
      }),
      (t.append = function (t, e) {
        return (
          this._activeInstructions.push(t),
          (this.command = t),
          e || (this._dirty = !0),
          this
        );
      }),
      (t.decodePath = function (t) {
        for (
          var e = [
              this.moveTo,
              this.lineTo,
              this.quadraticCurveTo,
              this.bezierCurveTo,
              this.closePath,
            ],
            i = [2, 2, 4, 6, 0],
            s = 0,
            r = t.length,
            n = [],
            a = 0,
            o = 0,
            h = v.BASE_64;
          s < r;

        ) {
          var c = t.charAt(s),
            u = h[c],
            l = u >> 3,
            d = e[l];
          if (!d || 3 & u) throw "bad path data (@" + s + "): " + c;
          var _ = i[l];
          l || (a = o = 0), s++;
          for (var p = 2 + ((u >> 2) & 1), f = (n.length = 0); f < _; f++) {
            var g = (m = h[t.charAt(s)]) >> 5 ? -1 : 1,
              m = ((31 & m) << 6) | h[t.charAt(s + 1)];
            3 == p && (m = (m << 6) | h[t.charAt(s + 2)]),
              (m = (g * m) / 10),
              f % 2 ? (a = m += a) : (o = m += o),
              (n[f] = m),
              (s += p);
          }
          d.apply(this, n);
        }
        return this;
      }),
      (t.store = function () {
        return (
          this._updateInstructions(!0),
          (this._storeIndex = this._instructions.length),
          this
        );
      }),
      (t.unstore = function () {
        return (this._storeIndex = 0), this;
      }),
      (t.clone = function () {
        var t = new v();
        return (
          (t.command = this.command),
          (t._stroke = this._stroke),
          (t._strokeStyle = this._strokeStyle),
          (t._strokeDash = this._strokeDash),
          (t._strokeIgnoreScale = this._strokeIgnoreScale),
          (t._fill = this._fill),
          (t._instructions = this._instructions.slice()),
          (t._commitIndex = this._commitIndex),
          (t._activeInstructions = this._activeInstructions.slice()),
          (t._dirty = this._dirty),
          (t._storeIndex = this._storeIndex),
          t
        );
      }),
      (t.toString = function () {
        return "[Graphics]";
      }),
      (t.mt = t.moveTo),
      (t.lt = t.lineTo),
      (t.at = t.arcTo),
      (t.bt = t.bezierCurveTo),
      (t.qt = t.quadraticCurveTo),
      (t.a = t.arc),
      (t.r = t.rect),
      (t.cp = t.closePath),
      (t.c = t.clear),
      (t.f = t.beginFill),
      (t.lf = t.beginLinearGradientFill),
      (t.rf = t.beginRadialGradientFill),
      (t.bf = t.beginBitmapFill),
      (t.ef = t.endFill),
      (t.ss = t.setStrokeStyle),
      (t.sd = t.setStrokeDash),
      (t.s = t.beginStroke),
      (t.ls = t.beginLinearGradientStroke),
      (t.rs = t.beginRadialGradientStroke),
      (t.bs = t.beginBitmapStroke),
      (t.es = t.endStroke),
      (t.dr = t.drawRect),
      (t.rr = t.drawRoundRect),
      (t.rc = t.drawRoundRectComplex),
      (t.dc = t.drawCircle),
      (t.de = t.drawEllipse),
      (t.dp = t.drawPolyStar),
      (t.p = t.decodePath),
      (t._updateInstructions = function (t) {
        var e = this._instructions,
          i = this._activeInstructions,
          s = this._commitIndex;
        if (this._dirty && i.length) {
          (e.length = s), e.push(v.beginCmd);
          var r = i.length,
            n = e.length;
          e.length = n + r;
          for (var a = 0; a < r; a++) e[a + n] = i[a];
          this._fill && e.push(this._fill),
            this._stroke &&
              (this._strokeDash !== this._oldStrokeDash &&
                e.push(this._strokeDash),
              this._strokeStyle !== this._oldStrokeStyle &&
                e.push(this._strokeStyle),
              t &&
                ((this._oldStrokeStyle = this._strokeStyle),
                (this._oldStrokeDash = this._strokeDash)),
              e.push(this._stroke)),
            (this._dirty = !1);
        }
        t && ((i.length = 0), (this._commitIndex = e.length));
      }),
      (t._setFill = function (t) {
        return (
          this._updateInstructions(!0), (this.command = this._fill = t), this
        );
      }),
      (t._setStroke = function (t) {
        return (
          this._updateInstructions(!0),
          (this.command = this._stroke = t) &&
            (t.ignoreScale = this._strokeIgnoreScale),
          this
        );
      }),
      ((h.LineTo = function (t, e) {
        (this.x = t), (this.y = e);
      }).prototype.exec = function (t) {
        t.lineTo(this.x, this.y);
      }),
      ((h.MoveTo = function (t, e) {
        (this.x = t), (this.y = e);
      }).prototype.exec = function (t) {
        t.moveTo(this.x, this.y);
      }),
      ((h.ArcTo = function (t, e, i, s, r) {
        (this.x1 = t),
          (this.y1 = e),
          (this.x2 = i),
          (this.y2 = s),
          (this.radius = r);
      }).prototype.exec = function (t) {
        t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
      }),
      ((h.Arc = function (t, e, i, s, r, n) {
        (this.x = t),
          (this.y = e),
          (this.radius = i),
          (this.startAngle = s),
          (this.endAngle = r),
          (this.anticlockwise = !!n);
      }).prototype.exec = function (t) {
        t.arc(
          this.x,
          this.y,
          this.radius,
          this.startAngle,
          this.endAngle,
          this.anticlockwise
        );
      }),
      ((h.QuadraticCurveTo = function (t, e, i, s) {
        (this.cpx = t), (this.cpy = e), (this.x = i), (this.y = s);
      }).prototype.exec = function (t) {
        t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
      }),
      ((h.BezierCurveTo = function (t, e, i, s, r, n) {
        (this.cp1x = t),
          (this.cp1y = e),
          (this.cp2x = i),
          (this.cp2y = s),
          (this.x = r),
          (this.y = n);
      }).prototype.exec = function (t) {
        t.bezierCurveTo(
          this.cp1x,
          this.cp1y,
          this.cp2x,
          this.cp2y,
          this.x,
          this.y
        );
      }),
      ((h.Rect = function (t, e, i, s) {
        (this.x = t), (this.y = e), (this.w = i), (this.h = s);
      }).prototype.exec = function (t) {
        t.rect(this.x, this.y, this.w, this.h);
      }),
      ((h.ClosePath = function () {}).prototype.exec = function (t) {
        t.closePath();
      }),
      ((h.BeginPath = function () {}).prototype.exec = function (t) {
        t.beginPath();
      }),
      ((t = (h.Fill = function (t, e) {
        (this.style = t), (this.matrix = e);
      }).prototype).exec = function (t) {
        var e;
        this.style &&
          ((t.fillStyle = this.style),
          (e = this.matrix) &&
            (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
          t.fill(),
          e && t.restore());
      }),
      (t.linearGradient = function (t, e, i, s, r, n) {
        for (
          var a = (this.style = v._ctx.createLinearGradient(i, s, r, n)),
            o = 0,
            h = t.length;
          o < h;
          o++
        )
          a.addColorStop(e[o], t[o]);
        return (
          (a.props = {
            colors: t,
            ratios: e,
            x0: i,
            y0: s,
            x1: r,
            y1: n,
            type: "linear",
          }),
          this
        );
      }),
      (t.radialGradient = function (t, e, i, s, r, n, a, o) {
        for (
          var h = (this.style = v._ctx.createRadialGradient(i, s, r, n, a, o)),
            c = 0,
            u = t.length;
          c < u;
          c++
        )
          h.addColorStop(e[c], t[c]);
        return (
          (h.props = {
            colors: t,
            ratios: e,
            x0: i,
            y0: s,
            r0: r,
            x1: n,
            y1: a,
            r1: o,
            type: "radial",
          }),
          this
        );
      }),
      (t.bitmap = function (t, e) {
        return (
          (t.naturalWidth || t.getContext || 2 <= t.readyState) &&
            ((this.style = v._ctx.createPattern(t, e || "")).props = {
              image: t,
              repetition: e,
              type: "bitmap",
            }),
          this
        );
      }),
      (t.path = !1),
      ((t = (h.Stroke = function (t, e) {
        (this.style = t), (this.ignoreScale = e);
      }).prototype).exec = function (t) {
        this.style &&
          ((t.strokeStyle = this.style),
          this.ignoreScale && (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)),
          t.stroke(),
          this.ignoreScale && t.restore());
      }),
      (t.linearGradient = h.Fill.prototype.linearGradient),
      (t.radialGradient = h.Fill.prototype.radialGradient),
      (t.bitmap = h.Fill.prototype.bitmap),
      (t.path = !1),
      ((t = (h.StrokeStyle = function (t, e, i, s, r) {
        (this.width = t),
          (this.caps = e),
          (this.joints = i),
          (this.miterLimit = s),
          (this.ignoreScale = r);
      }).prototype).exec = function (t) {
        (t.lineWidth = null == this.width ? "1" : this.width),
          (t.lineCap =
            null == this.caps
              ? "butt"
              : isNaN(this.caps)
              ? this.caps
              : v.STROKE_CAPS_MAP[this.caps]),
          (t.lineJoin =
            null == this.joints
              ? "miter"
              : isNaN(this.joints)
              ? this.joints
              : v.STROKE_JOINTS_MAP[this.joints]),
          (t.miterLimit = null == this.miterLimit ? "10" : this.miterLimit),
          (t.ignoreScale = null != this.ignoreScale && this.ignoreScale);
      }),
      (t.path = !1),
      ((h.StrokeDash = function (t, e) {
        (this.segments = t), (this.offset = e || 0);
      }).prototype.exec = function (t) {
        t.setLineDash &&
          (t.setLineDash(this.segments || h.StrokeDash.EMPTY_SEGMENTS),
          (t.lineDashOffset = this.offset || 0));
      }),
      (h.StrokeDash.EMPTY_SEGMENTS = []),
      ((h.RoundRect = function (t, e, i, s, r, n, a, o) {
        (this.x = t),
          (this.y = e),
          (this.w = i),
          (this.h = s),
          (this.radiusTL = r),
          (this.radiusTR = n),
          (this.radiusBR = a),
          (this.radiusBL = o);
      }).prototype.exec = function (t) {
        var e = (h < c ? h : c) / 2,
          i = 0,
          s = 0,
          r = 0,
          n = 0,
          a = this.x,
          o = this.y,
          h = this.w,
          c = this.h,
          u = this.radiusTL,
          l = this.radiusTR,
          d = this.radiusBR,
          _ = this.radiusBL;
        u < 0 && (u *= i = -1),
          e < u && (u = e),
          l < 0 && (l *= s = -1),
          e < l && (l = e),
          d < 0 && (d *= r = -1),
          e < d && (d = e),
          _ < 0 && (_ *= n = -1),
          e < _ && (_ = e),
          t.moveTo(a + h - l, o),
          t.arcTo(a + h + l * s, o - l * s, a + h, o + l, l),
          t.lineTo(a + h, o + c - d),
          t.arcTo(a + h + d * r, o + c + d * r, a + h - d, o + c, d),
          t.lineTo(a + _, o + c),
          t.arcTo(a - _ * n, o + c + _ * n, a, o + c - _, _),
          t.lineTo(a, o + u),
          t.arcTo(a - u * i, o - u * i, a + u, o, u),
          t.closePath();
      }),
      ((h.Circle = function (t, e, i) {
        (this.x = t), (this.y = e), (this.radius = i);
      }).prototype.exec = function (t) {
        t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      }),
      ((h.Ellipse = function (t, e, i, s) {
        (this.x = t), (this.y = e), (this.w = i), (this.h = s);
      }).prototype.exec = function (t) {
        var e = this.x,
          i = this.y,
          s = this.w,
          r = this.h,
          n = (s / 2) * 0.5522848,
          a = (r / 2) * 0.5522848,
          o = e + s,
          h = i + r,
          c = e + s / 2,
          u = i + r / 2;
        t.moveTo(e, u),
          t.bezierCurveTo(e, u - a, c - n, i, c, i),
          t.bezierCurveTo(c + n, i, o, u - a, o, u),
          t.bezierCurveTo(o, u + a, c + n, h, c, h),
          t.bezierCurveTo(c - n, h, e, u + a, e, u);
      }),
      ((h.PolyStar = function (t, e, i, s, r, n) {
        (this.x = t),
          (this.y = e),
          (this.radius = i),
          (this.sides = s),
          (this.pointSize = r),
          (this.angle = n);
      }).prototype.exec = function (t) {
        var e = this.x,
          i = this.y,
          s = this.radius,
          r = ((this.angle || 0) / 180) * Math.PI,
          n = this.sides,
          a = 1 - (this.pointSize || 0),
          o = Math.PI / n;
        t.moveTo(e + Math.cos(r) * s, i + Math.sin(r) * s);
        for (var h = 0; h < n; h++)
          (r += o),
            1 != a &&
              t.lineTo(e + Math.cos(r) * s * a, i + Math.sin(r) * s * a),
            (r += o),
            t.lineTo(e + Math.cos(r) * s, i + Math.sin(r) * s);
        t.closePath();
      }),
      (v.beginCmd = new h.BeginPath()),
      (createjs.Graphics = v);
  })(),
  (function () {
    "use strict";
    function a() {
      this.EventDispatcher_constructor(),
        (this.alpha = 1),
        (this.cacheCanvas = null),
        (this.bitmapCache = null),
        (this.id = createjs.UID.get()),
        (this.mouseEnabled = !0),
        (this.tickEnabled = !0),
        (this.name = null),
        (this.parent = null),
        (this.regX = 0),
        (this.regY = 0),
        (this.rotation = 0),
        (this.scaleX = 1),
        (this.scaleY = 1),
        (this.skewX = 0),
        (this.skewY = 0),
        (this.shadow = null),
        (this.visible = !0),
        (this.x = 0),
        (this.y = 0),
        (this.transformMatrix = null),
        (this.compositeOperation = null),
        (this.snapToPixel = !0),
        (this.filters = null),
        (this.mask = null),
        (this.hitArea = null),
        (this.cursor = null),
        (this._props = new createjs.DisplayProps()),
        (this._rectangle = new createjs.Rectangle()),
        (this._bounds = null),
        (this._webGLRenderStyle = a._StageGL_NONE);
    }
    var t = createjs.extend(a, createjs.EventDispatcher);
    (a._MOUSE_EVENTS = [
      "click",
      "dblclick",
      "mousedown",
      "mouseout",
      "mouseover",
      "pressmove",
      "pressup",
      "rollout",
      "rollover",
    ]),
      (a.suppressCrossDomainErrors = !1),
      (a._snapToPixelEnabled = !1),
      (a._StageGL_NONE = 0),
      (a._StageGL_SPRITE = 1),
      (a._StageGL_BITMAP = 2);
    var e = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    e.getContext &&
      ((a._hitTestCanvas = e),
      (a._hitTestContext = e.getContext("2d", { willReadFrequently: true })),
      (e.width = e.height = 1)),
      (t._getStage = function () {
        for (var t = this, e = createjs.Stage; t.parent; ) t = t.parent;
        return t instanceof e ? t : null;
      }),
      (t.getStage = createjs.deprecate(t._getStage, "DisplayObject.getStage"));
    try {
      Object.defineProperties(t, {
        stage: { get: t._getStage },
        cacheID: {
          get: function () {
            return this.bitmapCache && this.bitmapCache.cacheID;
          },
          set: function (t) {
            this.bitmapCache && (this.bitmapCache.cacheID = t);
          },
        },
        scale: {
          get: function () {
            return this.scaleX;
          },
          set: function (t) {
            this.scaleX = this.scaleY = t;
          },
        },
      });
    } catch (t) {}
    (t.isVisible = function () {
      return !!(
        this.visible &&
        0 < this.alpha &&
        0 != this.scaleX &&
        0 != this.scaleY
      );
    }),
      (t.draw = function (t, e) {
        var i = this.bitmapCache;
        return !(!i || e) && i.draw(t);
      }),
      (t.updateContext = function (t) {
        var e = this,
          i = e.mask,
          s = e._props.matrix;
        i &&
          i.graphics &&
          !i.graphics.isEmpty() &&
          (i.getMatrix(s),
          t.transform(s.a, s.b, s.c, s.d, s.tx, s.ty),
          i.graphics.drawAsPath(t),
          t.clip(),
          s.invert(),
          t.transform(s.a, s.b, s.c, s.d, s.tx, s.ty)),
          this.getMatrix(s);
        var r = s.tx,
          n = s.ty;
        a._snapToPixelEnabled &&
          e.snapToPixel &&
          ((r = (r + (r < 0 ? -0.5 : 0.5)) | 0),
          (n = (n + (n < 0 ? -0.5 : 0.5)) | 0)),
          t.transform(s.a, s.b, s.c, s.d, r, n),
          (t.globalAlpha *= e.alpha),
          e.compositeOperation &&
            (t.globalCompositeOperation = e.compositeOperation),
          e.shadow && this._applyShadow(t, e.shadow);
      }),
      (t.cache = function (t, e, i, s, r, n) {
        this.bitmapCache || (this.bitmapCache = new createjs.BitmapCache()),
          this.bitmapCache.define(this, t, e, i, s, r, n);
      }),
      (t.updateCache = function (t) {
        if (!this.bitmapCache)
          throw "cache() must be called before updateCache()";
        this.bitmapCache.update(t);
      }),
      (t.uncache = function () {
        this.bitmapCache &&
          (this.bitmapCache.release(), (this.bitmapCache = void 0));
      }),
      (t.getCacheDataURL = function () {
        return this.bitmapCache ? this.bitmapCache.getDataURL() : null;
      }),
      (t.localToGlobal = function (t, e, i) {
        var s = this.getConcatenatedMatrix(this._props.matrix).transformPoint(
          t,
          e,
          i || new createjs.Point()
        );
        return (
          this.stage &&
            createjs.stageTransformable &&
            (s = this.stage
              .getConcatenatedMatrix(this._mtx)
              .invert()
              .transformPoint(s.x, s.y)),
          s
        );
      }),
      (t.globalToLocal = function (t, e, i) {
        var s;
        return (
          this.stage &&
            createjs.stageTransformable &&
            ((t = (s = this.stage
              .getConcatenatedMatrix(this._mtx)
              .transformPoint(t, e)).x),
            (e = s.y)),
          this.getConcatenatedMatrix(this._props.matrix)
            .invert()
            .transformPoint(t, e, i || new createjs.Point())
        );
      }),
      (t.localToLocal = function (t, e, i, s) {
        return (s = this.localToGlobal(t, e, s)), i.globalToLocal(s.x, s.y, s);
      }),
      (t.setTransform = function (t, e, i, s, r, n, a, o, h) {
        return (
          (this.x = t || 0),
          (this.y = e || 0),
          (this.scaleX = null == i ? 1 : i),
          (this.scaleY = null == s ? 1 : s),
          (this.rotation = r || 0),
          (this.skewX = n || 0),
          (this.skewY = a || 0),
          (this.regX = o || 0),
          (this.regY = h || 0),
          this
        );
      }),
      (t.getMatrix = function (t) {
        var e = this,
          i = (t && t.identity()) || new createjs.Matrix2D();
        return e.transformMatrix
          ? i.copy(e.transformMatrix)
          : i.appendTransform(
              e.x,
              e.y,
              e.scaleX,
              e.scaleY,
              e.rotation,
              e.skewX,
              e.skewY,
              e.regX,
              e.regY
            );
      }),
      (t.getConcatenatedMatrix = function (t) {
        for (var e = this, i = this.getMatrix(t); (e = e.parent); )
          i.prependMatrix(e.getMatrix(e._props.matrix));
        return i;
      }),
      (t.getConcatenatedDisplayProps = function (t) {
        t = t ? t.identity() : new createjs.DisplayProps();
        for (
          var e = this, i = e.getMatrix(t.matrix);
          t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
            e != this && i.prependMatrix(e.getMatrix(e._props.matrix)),
            (e = e.parent);

        );
        return t;
      }),
      (t.hitTest = function (t, e) {
        var i = a._hitTestContext;
        i.setTransform(1, 0, 0, 1, -t, -e), this.draw(i);
        var s = this._testHit(i);
        return i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, 2, 2), s;
      }),
      (t.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (t.getBounds = function () {
        if (this._bounds) return this._rectangle.copy(this._bounds);
        var t = this.cacheCanvas;
        if (t) {
          var e = this._cacheScale;
          return this._rectangle.setValues(
            this._cacheOffsetX,
            this._cacheOffsetY,
            t.width / e,
            t.height / e
          );
        }
        return null;
      }),
      (t.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (t.setBounds = function (t, e, i, s) {
        this._bounds =
          null != t
            ? (this._bounds || new createjs.Rectangle()).setValues(t, e, i, s)
            : t;
      }),
      (t.clone = function () {
        return this._cloneProps(new a());
      }),
      (t.toString = function () {
        return "[DisplayObject (name=" + this.name + ")]";
      }),
      (t._updateState = null),
      (t._cloneProps = function (t) {
        return (
          (t.alpha = this.alpha),
          (t.mouseEnabled = this.mouseEnabled),
          (t.tickEnabled = this.tickEnabled),
          (t.name = this.name),
          (t.regX = this.regX),
          (t.regY = this.regY),
          (t.rotation = this.rotation),
          (t.scaleX = this.scaleX),
          (t.scaleY = this.scaleY),
          (t.shadow = this.shadow),
          (t.skewX = this.skewX),
          (t.skewY = this.skewY),
          (t.visible = this.visible),
          (t.x = this.x),
          (t.y = this.y),
          (t.compositeOperation = this.compositeOperation),
          (t.snapToPixel = this.snapToPixel),
          (t.filters = null == this.filters ? null : this.filters.slice(0)),
          (t.mask = this.mask),
          (t.hitArea = this.hitArea),
          (t.cursor = this.cursor),
          (t._bounds = this._bounds),
          t
        );
      }),
      (t._applyShadow = function (t, e) {
        (e = e || Shadow.identity),
          (t.shadowColor = e.color),
          (t.shadowOffsetX = e.offsetX),
          (t.shadowOffsetY = e.offsetY),
          (t.shadowBlur = e.blur);
      }),
      (t._tick = function (t) {
        var e = this._listeners;
        e &&
          e.tick &&
          ((t.target = null),
          (t.propagationStopped = t.immediatePropagationStopped = !1),
          this.dispatchEvent(t));
      }),
      (t._testHit = function (t) {
        try {
          var e = 1 < t.getImageData(0, 0, 1, 1).data[3];
        } catch (t) {
          if (!a.suppressCrossDomainErrors)
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return e;
      }),
      (t._getBounds = function (t, e) {
        return this._transformBounds(this.getBounds(), t, e);
      }),
      (t._transformBounds = function (t, e, i) {
        if (!t) return t;
        var s = t.x,
          r = t.y,
          n = t.width,
          a = t.height,
          o = this._props.matrix,
          o = i ? o.identity() : this.getMatrix(o);
        (s || r) && o.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -r),
          e && o.prependMatrix(e);
        var h = n * o.a,
          c = n * o.b,
          u = a * o.c,
          l = a * o.d,
          d = o.tx,
          _ = o.ty,
          p = d,
          f = d,
          g = _,
          m = _;
        return (
          (s = h + d) < p ? (p = s) : f < s && (f = s),
          (s = h + u + d) < p ? (p = s) : f < s && (f = s),
          (s = u + d) < p ? (p = s) : f < s && (f = s),
          (r = c + _) < g ? (g = r) : m < r && (m = r),
          (r = c + l + _) < g ? (g = r) : m < r && (m = r),
          (r = l + _) < g ? (g = r) : m < r && (m = r),
          t.setValues(p, g, f - p, m - g)
        );
      }),
      (t._hasMouseEventListener = function () {
        for (var t = a._MOUSE_EVENTS, e = 0, i = t.length; e < i; e++)
          if (this.hasEventListener(t[e])) return !0;
        return !!this.cursor;
      }),
      (createjs.DisplayObject = createjs.promote(a, "EventDispatcher"));
  })(),
  (function () {
    "use strict";
    function m() {
      this.DisplayObject_constructor(),
        (this.children = []),
        (this.mouseChildren = !0),
        (this.tickChildren = !0);
    }
    var t = createjs.extend(m, createjs.DisplayObject);
    (t._getNumChildren = function () {
      return this.children.length;
    }),
      (t.getNumChildren = createjs.deprecate(
        t._getNumChildren,
        "Container.getNumChildren"
      ));
    try {
      Object.defineProperties(t, { numChildren: { get: t._getNumChildren } });
    } catch (t) {}
    (t.initialize = m),
      (t.isVisible = function () {
        var t = this.cacheCanvas || this.children.length;
        return !!(
          this.visible &&
          0 < this.alpha &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (t.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        for (var i = this.children.slice(), s = 0, r = i.length; s < r; s++) {
          var n = i[s];
          n.isVisible() &&
            (t.save(), n.updateContext(t), n.draw(t), t.restore());
        }
        return !0;
      }),
      (t.addChild = function (t) {
        if (null == t) return t;
        var e = arguments.length;
        if (1 < e) {
          for (var i = 0; i < e; i++) this.addChild(arguments[i]);
          return arguments[e - 1];
        }
        var s = t.parent,
          r = s === this;
        return (
          s && s._removeChildAt(createjs.indexOf(s.children, t), r),
          (t.parent = this).children.push(t),
          r || t.dispatchEvent("added"),
          t
        );
      }),
      (t.addChildAt = function (t, e) {
        var i = arguments.length,
          s = arguments[i - 1];
        if (s < 0 || s > this.children.length) return arguments[i - 2];
        if (2 < i) {
          for (var r = 0; r < i - 1; r++) this.addChildAt(arguments[r], s + r);
          return arguments[i - 2];
        }
        var n = t.parent,
          a = n === this;
        return (
          n && n._removeChildAt(createjs.indexOf(n.children, t), a),
          (t.parent = this).children.splice(e, 0, t),
          a || t.dispatchEvent("added"),
          t
        );
      }),
      (t.removeChild = function (t) {
        var e = arguments.length;
        if (1 < e) {
          for (var i = !0, s = 0; s < e; s++)
            i = i && this.removeChild(arguments[s]);
          return i;
        }
        return this._removeChildAt(createjs.indexOf(this.children, t));
      }),
      (t.removeChildAt = function (t) {
        var e = arguments.length;
        if (1 < e) {
          for (var i = [], s = 0; s < e; s++) i[s] = arguments[s];
          i.sort(function (t, e) {
            return e - t;
          });
          for (var r = !0, s = 0; s < e; s++)
            r = r && this._removeChildAt(i[s]);
          return r;
        }
        return this._removeChildAt(t);
      }),
      (t.removeAllChildren = function () {
        for (var t = this.children; t.length; ) this._removeChildAt(0);
      }),
      (t.getChildAt = function (t) {
        return this.children[t];
      }),
      (t.getChildByName = function (t) {
        for (var e = this.children, i = 0, s = e.length; i < s; i++)
          if (e[i].name == t) return e[i];
        return null;
      }),
      (t.sortChildren = function (t) {
        this.children.sort(t);
      }),
      (t.getChildIndex = function (t) {
        return createjs.indexOf(this.children, t);
      }),
      (t.swapChildrenAt = function (t, e) {
        var i = this.children,
          s = i[t],
          r = i[e];
        s && r && ((i[t] = r), (i[e] = s));
      }),
      (t.swapChildren = function (t, e) {
        for (
          var i, s, r = this.children, n = 0, a = r.length;
          n < a &&
          (r[n] == t && (i = n), r[n] == e && (s = n), null == i || null == s);
          n++
        );
        n != a && ((r[i] = e), (r[s] = t));
      }),
      (t.setChildIndex = function (t, e) {
        var i = this.children,
          s = i.length;
        if (!(t.parent != this || e < 0 || s <= e)) {
          for (var r = 0; r < s && i[r] != t; r++);
          r != s && r != e && (i.splice(r, 1), i.splice(e, 0, t));
        }
      }),
      (t.contains = function (t) {
        for (; t; ) {
          if (t == this) return !0;
          t = t.parent;
        }
        return !1;
      }),
      (t.hitTest = function (t, e) {
        return null != this.getObjectUnderPoint(t, e);
      }),
      (t.getObjectsUnderPoint = function (t, e, i) {
        var s = [],
          r = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(r.x, r.y, s, 0 < i, 1 == i), s;
      }),
      (t.getObjectUnderPoint = function (t, e, i) {
        var s = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(s.x, s.y, null, 0 < i, 1 == i);
      }),
      (t.getBounds = function () {
        return this._getBounds(null, !0);
      }),
      (t.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (t.clone = function (t) {
        var e = this._cloneProps(new m());
        return t && this._cloneChildren(e), e;
      }),
      (t.toString = function () {
        return "[Container (name=" + this.name + ")]";
      }),
      (t._tick = function (t) {
        if (this.tickChildren)
          for (var e = this.children.length - 1; 0 <= e; e--) {
            var i = this.children[e];
            i.tickEnabled && i._tick && i._tick(t);
          }
        this.DisplayObject__tick(t);
      }),
      (t._cloneChildren = function (t) {
        t.children.length && t.removeAllChildren();
        for (var e = t.children, i = 0, s = this.children.length; i < s; i++) {
          var r = this.children[i].clone(!0);
          (r.parent = t), e.push(r);
        }
      }),
      (t._removeChildAt = function (t, e) {
        if (t < 0 || t > this.children.length - 1) return !1;
        var i = this.children[t];
        return (
          i && (i.parent = null),
          this.children.splice(t, 1),
          e || i.dispatchEvent("removed"),
          !0
        );
      }),
      (t._getObjectsUnderPoint = function (t, e, i, s, r, n) {
        var a, o, h;
        if (
          (this.stage &&
            createjs.stageTransformable &&
            ((a = t),
            (o = e),
            (t = (h = this.stage
              .getConcatenatedMatrix(this._mtx)
              .transformPoint(t, e)).x),
            (e = h.y)),
          !(n = n || 0) && !this._testMask(this, t, e))
        )
          return null;
        var c = createjs.DisplayObject._hitTestContext;
        r = r || (s && this._hasMouseEventListener());
        for (var u = this.children, l = u.length - 1; 0 <= l; l--) {
          var d = u[l],
            _ = d.hitArea;
          if (
            d.visible &&
            (_ || d.isVisible()) &&
            (!s || d.mouseEnabled) &&
            (_ || this._testMask(d, t, e))
          )
            if (!_ && d instanceof m) {
              var p = d._getObjectsUnderPoint(
                null != a ? a : t,
                null != o ? o : e,
                i,
                s,
                r,
                n + 1
              );
              if (!i && p) return s && !this.mouseChildren ? this : p;
            } else {
              if (s && !r && !d._hasMouseEventListener()) continue;
              var f = d.getConcatenatedDisplayProps(d._props),
                g = f.matrix;
              if (
                (_ &&
                  (g.appendMatrix(_.getMatrix(_._props.matrix)),
                  (f.alpha = _.alpha)),
                (c.globalAlpha = f.alpha),
                c.setTransform(g.a, g.b, g.c, g.d, g.tx - t, g.ty - e),
                (_ || d).draw(c),
                !this._testHit(c))
              )
                continue;
              if (
                (c.setTransform(1, 0, 0, 1, 0, 0), c.clearRect(0, 0, 2, 2), !i)
              )
                return s && !this.mouseChildren ? this : d;
              i.push(d);
            }
        }
        return null;
      }),
      (t._testMask = function (t, e, i) {
        var s = t.mask;
        if (!s || !s.graphics || s.graphics.isEmpty()) return !0;
        var r = this._props.matrix,
          n = t.parent,
          r = n ? n.getConcatenatedMatrix(r) : r.identity();
        r = s.getMatrix(s._props.matrix).prependMatrix(r);
        var a = createjs.DisplayObject._hitTestContext;
        return (
          a.setTransform(r.a, r.b, r.c, r.d, r.tx - e, r.ty - i),
          s.graphics.drawAsPath(a),
          (a.fillStyle = "#000"),
          a.fill(),
          !!this._testHit(a) &&
            (a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, 2, 2), !0)
        );
      }),
      (t._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        if (i) return this._transformBounds(i, t, e);
        var s = this._props.matrix,
          s = e ? s.identity() : this.getMatrix(s);
        t && s.prependMatrix(t);
        for (var r = this.children.length, n = null, a = 0; a < r; a++) {
          var o = this.children[a];
          o.visible &&
            (i = o._getBounds(s)) &&
            (n ? n.extend(i.x, i.y, i.width, i.height) : (n = i.clone()));
        }
        return n;
      }),
      (createjs.Container = createjs.promote(m, "DisplayObject"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.Container_constructor(),
        (this.autoClear = !0),
        (this.canvas = "string" == typeof t ? document.getElementById(t) : t),
        (this.mouseX = 0),
        (this.mouseY = 0),
        (this.drawRect = null),
        (this.snapToPixelEnabled = !1),
        (this.mouseInBounds = !1),
        (this.tickOnUpdate = !0),
        (this.mouseMoveOutside = !1),
        (this.preventSelection = !0),
        (this._pointerData = {}),
        (this._pointerCount = 0),
        (this._primaryPointerID = null),
        (this._mouseOverIntervalID = null),
        (this._nextStage = null),
        (this._prevStage = null),
        this.enableDOMEvents(!0);
    }
    var e = createjs.extend(t, createjs.Container);
    (e._get_nextStage = function () {
      return this._nextStage;
    }),
      (e._set_nextStage = function (t) {
        this._nextStage && (this._nextStage._prevStage = null),
          t && (t._prevStage = this),
          (this._nextStage = t);
      });
    try {
      Object.defineProperties(e, {
        nextStage: { get: e._get_nextStage, set: e._set_nextStage },
      });
    } catch (t) {}
    (e.update = function (t) {
      var e, i;
      this.canvas &&
        (this.tickOnUpdate && this.tick(t),
        !1 !== this.dispatchEvent("drawstart", !1, !0) &&
          ((createjs.DisplayObject._snapToPixelEnabled =
            this.snapToPixelEnabled),
          (e = this.drawRect),
          (i = this.canvas.getContext("2d", {
            willReadFrequently: true,
          })).setTransform(1, 0, 0, 1, 0, 0),
          this.autoClear &&
            (e
              ? i.clearRect(e.x, e.y, e.width, e.height)
              : i.clearRect(
                  0,
                  0,
                  this.canvas.width + 1,
                  this.canvas.height + 1
                )),
          i.save(),
          this.drawRect &&
            (i.beginPath(), i.rect(e.x, e.y, e.width, e.height), i.clip()),
          this.updateContext(i),
          this.draw(i, !1),
          i.restore(),
          this.dispatchEvent("drawend")));
    }),
      (e.tick = function (t) {
        if (
          this.tickEnabled &&
          !1 !== this.dispatchEvent("tickstart", !1, !0)
        ) {
          var e = new createjs.Event("tick");
          if (t) for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
          this._tick(e), this.dispatchEvent("tickend");
        }
      }),
      (e.handleEvent = function (t) {
        "tick" == t.type && this.update(t);
      }),
      (e.clear = function () {
        var t;
        this.canvas &&
          ((t = this.getContext("2d", {
            willReadFrequently: true,
          })).setTransform(1, 0, 0, 1, 0, 0),
          t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1));
      }),
      (e.toDataURL = function (t, e) {
        var i,
          s,
          r = this.getContext("2d", { willReadFrequently: true }),
          n = this.canvas.width,
          a = this.canvas.height;
        t &&
          ((i = r.getImageData(0, 0, n, a)),
          (s = r.globalCompositeOperation),
          (r.globalCompositeOperation = "destination-over"),
          (r.fillStyle = t),
          r.fillRect(0, 0, n, a));
        var o = this.canvas.toDataURL(e || "image/png");
        return (
          t && (r.putImageData(i, 0, 0), (r.globalCompositeOperation = s)), o
        );
      }),
      (e.enableMouseOver = function (t) {
        if (
          (this._mouseOverIntervalID &&
            (clearInterval(this._mouseOverIntervalID),
            (this._mouseOverIntervalID = null),
            0 == t && this._testMouseOver(!0)),
          null == t)
        )
          t = 20;
        else if (t <= 0) return;
        var e = this;
        this._mouseOverIntervalID = setInterval(function () {
          e._testMouseOver();
        }, 1e3 / Math.min(50, t));
      }),
      (e.enableDOMEvents = function (t) {
        null == t && (t = !0);
        var e,
          i,
          s = this._eventListeners;
        if (!t && s) {
          for (e in s) (i = s[e]).t.removeEventListener(e, i.f, !1);
          this._eventListeners = null;
        } else if (t && !s && this.canvas) {
          var r = window.addEventListener ? window : document,
            n = this,
            s = (this._eventListeners = {});
          for (e in ((s.mouseup = {
            t: r,
            f: function (t) {
              n._handleMouseUp(t);
            },
          }),
          (s.mousemove = {
            t: r,
            f: function (t) {
              n._handleMouseMove(t);
            },
          }),
          (s.dblclick = {
            t: this.canvas,
            f: function (t) {
              n._handleDoubleClick(t);
            },
          }),
          (s.mousedown = {
            t: this.canvas,
            f: function (t) {
              n._handleMouseDown(t);
            },
          }),
          s))
            (i = s[e]).t.addEventListener(e, i.f, !1);
        }
      }),
      (e.clone = function () {
        throw "Stage cannot be cloned.";
      }),
      (e.toString = function () {
        return "[Stage (name=" + this.name + ")]";
      }),
      (e._getElementRect = function (e) {
        var i;
        try {
          i = e.getBoundingClientRect();
        } catch (t) {
          i = {
            top: e.offsetTop,
            left: e.offsetLeft,
            width: e.offsetWidth,
            height: e.offsetHeight,
          };
        }
        var t =
            (window.pageXOffset || document.scrollLeft || 0) -
            (document.clientLeft || document.body.clientLeft || 0),
          s =
            (window.pageYOffset || document.scrollTop || 0) -
            (document.clientTop || document.body.clientTop || 0),
          r = window.getComputedStyle
            ? getComputedStyle(e, null)
            : e.currentStyle,
          n = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
          a = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
          o = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
          h = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
        return {
          left: i.left + t + n,
          right: i.right + t - o,
          top: i.top + s + a,
          bottom: i.bottom + s - h,
        };
      }),
      (e._getPointerData = function (t) {
        return this._pointerData[t] || (this._pointerData[t] = { x: 0, y: 0 });
      }),
      (e._handleMouseMove = function (t) {
        (t = t || window.event),
          this._handlePointerMove(-1, t, t.pageX, t.pageY);
      }),
      (e._handlePointerMove = function (t, e, i, s, r) {
        var n, a, o;
        (this._prevStage && void 0 === r) ||
          (this.canvas &&
            ((n = this._nextStage),
            (o = (a = this._getPointerData(t)).inBounds),
            this._updatePointerPosition(t, e, i, s),
            (o || a.inBounds || this.mouseMoveOutside) &&
              (-1 === t &&
                a.inBounds == !o &&
                this._dispatchMouseEvent(
                  this,
                  o ? "mouseleave" : "mouseenter",
                  !1,
                  t,
                  a,
                  e
                ),
              this._dispatchMouseEvent(this, "stagemousemove", !1, t, a, e),
              this._dispatchMouseEvent(a.target, "pressmove", !0, t, a, e)),
            n && n._handlePointerMove(t, e, i, s, null)));
      }),
      (e._updatePointerPosition = function (t, e, i, s) {
        var r = this._getElementRect(this.canvas);
        (i -= r.left), (s -= r.top);
        var n = this.canvas.width,
          a = this.canvas.height;
        (i /= (r.right - r.left) / n), (s /= (r.bottom - r.top) / a);
        var o,
          h,
          c = this._getPointerData(t);
        createjs.stageTransformable
          ? ((this._mtx = this.getConcatenatedMatrix(this._mtx).invert()),
            (c.inBounds = 0 <= i && 0 <= s && i <= n - 1 && s <= a - 1)
              ? ((c.x = i),
                (c.y = s),
                (o = this._mtx.transformPoint(c.x, c.y)),
                (c.x = o.x),
                (c.y = o.y))
              : this.mouseMoveOutside &&
                ((c.x = i < 0 ? 0 : n - 1 < i ? n - 1 : i),
                (c.y = s < 0 ? 0 : a - 1 < s ? a - 1 : s),
                (o = this._mtx.transformPoint(c.x, c.y)),
                (c.x = o.x),
                (c.y = o.y)),
            (c.rawX = i),
            (c.rawY = s),
            (h = this._mtx.transformPoint(c.rawX, c.rawY)),
            (c.rawX = h.x),
            (c.rawY = h.y))
          : ((c.inBounds = 0 <= i && 0 <= s && i <= n - 1 && s <= a - 1)
              ? ((c.x = i), (c.y = s))
              : this.mouseMoveOutside &&
                ((c.x = i < 0 ? 0 : n - 1 < i ? n - 1 : i),
                (c.y = s < 0 ? 0 : a - 1 < s ? a - 1 : s)),
            (c.rawX = i),
            (c.rawY = s)),
          (c.posEvtObj = e),
          (t !== this._primaryPointerID && -1 !== t) ||
            ((this.mouseX = c.x),
            (this.mouseY = c.y),
            (this.mouseInBounds = c.inBounds));
      }),
      (e._handleMouseUp = function (t) {
        this._handlePointerUp(-1, t, !1);
      }),
      (e._handlePointerUp = function (t, e, i, s) {
        var r,
          n,
          a = this._nextStage,
          o = this._getPointerData(t);
        (this._prevStage && void 0 === s) ||
          ((r = null),
          (n = o.target),
          s ||
            (!n && !a) ||
            (r = this._getObjectsUnderPoint(o.x, o.y, null, !0)),
          o.down &&
            (this._dispatchMouseEvent(this, "stagemouseup", !1, t, o, e, r),
            (o.down = !1)),
          r == n && this._dispatchMouseEvent(n, "click", !0, t, o, e),
          this._dispatchMouseEvent(n, "pressup", !0, t, o, e),
          i
            ? (t == this._primaryPointerID && (this._primaryPointerID = null),
              delete this._pointerData[t])
            : (o.target = null),
          a && a._handlePointerUp(t, e, i, s || (r && this)));
      }),
      (e._handleMouseDown = function (t) {
        this._handlePointerDown(-1, t, t.pageX, t.pageY);
      }),
      (e._handlePointerDown = function (t, e, i, s, r) {
        this.preventSelection && e.preventDefault(),
          (null != this._primaryPointerID && -1 !== t) ||
            (this._primaryPointerID = t),
          null != s && this._updatePointerPosition(t, e, i, s);
        var n = null,
          a = this._nextStage,
          o = this._getPointerData(t);
        r || (n = o.target = this._getObjectsUnderPoint(o.x, o.y, null, !0)),
          o.inBounds &&
            (this._dispatchMouseEvent(this, "stagemousedown", !1, t, o, e, n),
            (o.down = !0)),
          this._dispatchMouseEvent(n, "mousedown", !0, t, o, e),
          a && a._handlePointerDown(t, e, i, s, r || (n && this));
      }),
      (e._testMouseOver = function (t, e, i) {
        if (!this._prevStage || void 0 !== e) {
          var s = this._nextStage;
          if (this._mouseOverIntervalID) {
            var r = this._getPointerData(-1);
            if (
              r &&
              (t ||
                this.mouseX != this._mouseOverX ||
                this.mouseY != this._mouseOverY ||
                !this.mouseInBounds)
            ) {
              var n,
                a,
                o = r.posEvtObj,
                h = i || (o && o.target == this.canvas),
                c = null,
                u = -1,
                l = "";
              !e &&
                (t || (this.mouseInBounds && h)) &&
                ((c = this._getObjectsUnderPoint(
                  this.mouseX,
                  this.mouseY,
                  null,
                  !0
                )),
                (this._mouseOverX = this.mouseX),
                (this._mouseOverY = this.mouseY));
              for (
                var d = this._mouseOverTarget || [],
                  _ = d[d.length - 1],
                  p = (this._mouseOverTarget = []),
                  f = c;
                f;

              )
                p.unshift(f), (l = l || f.cursor), (f = f.parent);
              for (
                this.canvas.style.cursor = l,
                  !e && i && (i.canvas.style.cursor = l),
                  n = 0,
                  a = p.length;
                n < a && p[n] == d[n];
                n++
              )
                u = n;
              for (
                _ != c &&
                  this._dispatchMouseEvent(_, "mouseout", !0, -1, r, o, c),
                  n = d.length - 1;
                u < n;
                n--
              )
                this._dispatchMouseEvent(d[n], "rollout", !1, -1, r, o, c);
              for (n = p.length - 1; u < n; n--)
                this._dispatchMouseEvent(p[n], "rollover", !1, -1, r, o, _);
              _ != c &&
                this._dispatchMouseEvent(c, "mouseover", !0, -1, r, o, _),
                s && s._testMouseOver(t, e || (c && this), i || (h && this));
            }
          } else s && s._testMouseOver(t, e, i);
        }
      }),
      (e._handleDoubleClick = function (t, e) {
        var i = null,
          s = this._nextStage,
          r = this._getPointerData(-1);
        e ||
          ((i = this._getObjectsUnderPoint(r.x, r.y, null, !0)),
          this._dispatchMouseEvent(i, "dblclick", !0, -1, r, t)),
          s && s._handleDoubleClick(t, e || (i && this));
      }),
      (e._dispatchMouseEvent = function (t, e, i, s, r, n, a) {
        var o;
        t &&
          (i || t.hasEventListener(e)) &&
          ((o = new createjs.MouseEvent(
            e,
            i,
            !1,
            r.x,
            r.y,
            n,
            s,
            s === this._primaryPointerID || -1 === s,
            r.rawX,
            r.rawY,
            a
          )),
          t.dispatchEvent(o));
      }),
      (createjs.Stage = createjs.promote(t, "Container"));
  })(),
  (function () {
    "use strict";
    function P(t, e) {
      if ((this.Stage_constructor(t), void 0 !== e)) {
        if ("object" != typeof e) throw "Invalid options object";
        var i = e.premultiply,
          s = e.transparent,
          r = e.antialias,
          n = e.preserveBuffer,
          a = e.autoPurge;
      }
      (this.vocalDebug = !1),
        (this._preserveBuffer = n || !1),
        (this._antialias = r || !1),
        (this._transparent = s || !1),
        (this._premultiply = i || !1),
        (this._autoPurge = void 0),
        (this.autoPurge = a),
        (this._viewportWidth = 0),
        (this._viewportHeight = 0),
        (this._projectionMatrix = null),
        (this._webGLContext = null),
        (this._clearColor = { r: 0.5, g: 0.5, b: 0.5, a: 0 }),
        (this._maxCardsPerBatch = P.DEFAULT_MAX_BATCH_SIZE),
        (this._activeShader = null),
        (this._vertices = null),
        (this._vertexPositionBuffer = null),
        (this._uvs = null),
        (this._uvPositionBuffer = null),
        (this._indices = null),
        (this._textureIndexBuffer = null),
        (this._alphas = null),
        (this._alphaBuffer = null),
        (this._textureDictionary = []),
        (this._textureIDs = {}),
        (this._batchTextures = []),
        (this._baseTextures = []),
        (this._batchTextureCount = 8),
        (this._lastTextureInsert = -1),
        (this._batchID = 0),
        (this._drawID = 0),
        (this._slotBlacklist = []),
        (this._isDrawing = 0),
        (this._lastTrackedCanvas = 0),
        (this.isCacheControlled = !1),
        (this._cacheContainer = new createjs.Container()),
        this._initializeWebGL();
    }
    var t = createjs.extend(P, createjs.Stage);
    (P.buildUVRects = function (t, e, i) {
      if (!t || !t._frames) return null;
      void 0 === e && (e = -1), void 0 === i && (i = !1);
      for (
        var s = -1 != e && i ? e : 0,
          r = -1 != e && i ? e + 1 : t._frames.length,
          n = s;
        n < r;
        n++
      ) {
        var a,
          o = t._frames[n];
        o.uvRect ||
          o.image.width <= 0 ||
          o.image.height <= 0 ||
          ((a = o.rect),
          (o.uvRect = {
            t: a.y / o.image.height,
            l: a.x / o.image.width,
            b: (a.y + a.height) / o.image.height,
            r: (a.x + a.width) / o.image.width,
          }));
      }
      return t._frames[-1 != e ? e : 0].uvRect || { t: 0, l: 0, b: 1, r: 1 };
    }),
      (P.isWebGLActive = function (t) {
        return (
          t &&
          t instanceof WebGLRenderingContext &&
          "undefined" != typeof WebGLRenderingContext
        );
      }),
      (P.VERTEX_PROPERTY_COUNT = 6),
      (P.INDICIES_PER_CARD = 6),
      (P.DEFAULT_MAX_BATCH_SIZE = 1e4),
      (P.WEBGL_MAX_INDEX_NUM = Math.pow(2, 16)),
      (P.UV_RECT = { t: 0, l: 0, b: 1, r: 1 });
    try {
      (P.COVER_VERT = new Float32Array([
        -1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1,
      ])),
        (P.COVER_UV = new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1])),
        (P.COVER_UV_FLIP = new Float32Array([
          0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0,
        ]));
    } catch (t) {}
    (P.REGULAR_VERTEX_HEADER =
      (P.REGULAR_VARYING_HEADER =
        "precision mediump float;varying vec2 vTextureCoord;varying lowp float indexPicker;varying lowp float alphaValue;") +
      "attribute vec2 vertexPosition;attribute vec2 uvPosition;attribute lowp float textureIndex;attribute lowp float objectAlpha;uniform mat4 pMatrix;"),
      (P.REGULAR_FRAGMENT_HEADER =
        P.REGULAR_VARYING_HEADER + "uniform sampler2D uSampler[{{count}}];"),
      (P.REGULAR_VERTEX_BODY =
        "void main(void) {gl_Position = vec4((vertexPosition.x * pMatrix[0][0]) + pMatrix[3][0],(vertexPosition.y * pMatrix[1][1]) + pMatrix[3][1],pMatrix[3][2],1.0);alphaValue = objectAlpha;indexPicker = textureIndex;vTextureCoord = uvPosition;}"),
      (P.REGULAR_FRAGMENT_BODY =
        "void main(void) {vec4 color = vec4(1.0, 0.0, 0.0, 1.0);if (indexPicker <= 0.5) {color = texture2D(uSampler[0], vTextureCoord);{{alternates}}}{{fragColor}}}"),
      (P.REGULAR_FRAG_COLOR_NORMAL =
        "gl_FragColor = vec4(color.rgb, color.a * alphaValue);"),
      (P.REGULAR_FRAG_COLOR_PREMULTIPLY =
        "if(color.a > 0.0035) {gl_FragColor = vec4(color.rgb/color.a, color.a * alphaValue);} else {gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);}"),
      (P.PARTICLE_VERTEX_BODY = P.REGULAR_VERTEX_BODY),
      (P.PARTICLE_FRAGMENT_BODY = P.REGULAR_FRAGMENT_BODY),
      (P.COVER_VERTEX_HEADER =
        (P.COVER_VARYING_HEADER =
          "precision mediump float;varying highp vec2 vRenderCoord;varying highp vec2 vTextureCoord;") +
        "attribute vec2 vertexPosition;attribute vec2 uvPosition;uniform float uUpright;"),
      (P.COVER_FRAGMENT_HEADER =
        P.COVER_VARYING_HEADER + "uniform sampler2D uSampler;"),
      (P.COVER_VERTEX_BODY =
        "void main(void) {gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);vRenderCoord = uvPosition;vTextureCoord = vec2(uvPosition.x, abs(uUpright - uvPosition.y));}"),
      (P.COVER_FRAGMENT_BODY =
        "void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = color;}"),
      (t._get_isWebGL = function () {
        return !!this._webGLContext;
      }),
      (t._set_autoPurge = function (t) {
        -1 != (t = isNaN(t) ? 1200 : t) && (t = t < 10 ? 10 : t),
          (this._autoPurge = t);
      }),
      (t._get_autoPurge = function () {
        return Number(this._autoPurge);
      });
    try {
      Object.defineProperties(t, {
        isWebGL: { get: t._get_isWebGL },
        autoPurge: { get: t._get_autoPurge, set: t._set_autoPurge },
      });
    } catch (t) {}
    (t._initializeWebGL = function () {
      if (this.canvas) {
        if (!this._webGLContext || this._webGLContext.canvas !== this.canvas) {
          var t = {
              depth: !1,
              alpha: this._transparent,
              stencil: !0,
              antialias: this._antialias,
              premultipliedAlpha: this._premultiply,
              preserveDrawingBuffer: this._preserveBuffer,
            },
            e = (this._webGLContext = this._fetchWebGLContext(this.canvas, t));
          if (!e) return null;
          this.updateSimultaneousTextureCount(
            e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)
          ),
            (this._maxTextureSlots = e.getParameter(
              e.MAX_COMBINED_TEXTURE_IMAGE_UNITS
            )),
            this._createBuffers(e),
            this._initTextures(e),
            e.disable(e.DEPTH_TEST),
            e.enable(e.BLEND),
            e.blendFuncSeparate(
              e.SRC_ALPHA,
              e.ONE_MINUS_SRC_ALPHA,
              e.ONE,
              e.ONE_MINUS_SRC_ALPHA
            ),
            e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiply),
            this._webGLContext.clearColor(
              this._clearColor.r,
              this._clearColor.g,
              this._clearColor.b,
              this._clearColor.a
            ),
            this.updateViewport(
              this._viewportWidth || this.canvas.width,
              this._viewportHeight || this.canvas.height
            );
        }
      } else this._webGLContext = null;
      return this._webGLContext;
    }),
      (t.update = function (t) {
        var e;
        this.canvas &&
          (this.tickOnUpdate && this.tick(t),
          this.dispatchEvent("drawstart"),
          this.autoClear && this.clear(),
          this._webGLContext
            ? (this._batchDraw(this, this._webGLContext),
              -1 == this._autoPurge ||
                this._drawID % ((this._autoPurge / 2) | 0) ||
                this.purgeTextures(this._autoPurge))
            : ((e = this.getContext("2d", { willReadFrequently: true })).save(),
              this.updateContext(e),
              this.draw(e, !1),
              e.restore()),
          this.dispatchEvent("drawend"));
      }),
      (t.clear = function () {
        var t, e, i;
        this.canvas &&
          (P.isWebGLActive(this._webGLContext)
            ? ((t = this._webGLContext),
              (e = this._clearColor),
              (i = this._transparent ? e.a : 1),
              this._webGLContext.clearColor(e.r * i, e.g * i, e.b * i, i),
              t.clear(t.COLOR_BUFFER_BIT),
              this._webGLContext.clearColor(e.r, e.g, e.b, e.a))
            : this.Stage_clear());
      }),
      (t.draw = function (t, e) {
        if (t === this._webGLContext && P.isWebGLActive(this._webGLContext)) {
          var i = this._webGLContext;
          return this._batchDraw(this, i, e), !0;
        }
        return this.Stage_draw(t, e);
      }),
      (t.cacheDraw = function (t, e, i) {
        if (P.isWebGLActive(this._webGLContext)) {
          var s = this._webGLContext;
          return this._cacheDraw(s, t, e, i), !0;
        }
        return !1;
      }),
      (t.protectTextureSlot = function (t, e) {
        if (t > this._maxTextureSlots || t < 0)
          throw "Slot outside of acceptable range";
        this._slotBlacklist[t] = !!e;
      }),
      (t.getTargetRenderTexture = function (t, e, i) {
        var s,
          r = !1,
          n = this._webGLContext;
        if (
          (void 0 !== t.__lastRT && t.__lastRT === t.__rtA && (r = !0),
          !(s = r
            ? (void 0 === t.__rtB
                ? (t.__rtB = this.getRenderBufferTexture(e, i))
                : ((e == t.__rtB._width && i == t.__rtB._height) ||
                    this.resizeTexture(t.__rtB, e, i),
                  this.setTextureParams(n)),
              t.__rtB)
            : (void 0 === t.__rtA
                ? (t.__rtA = this.getRenderBufferTexture(e, i))
                : ((e == t.__rtA._width && i == t.__rtA._height) ||
                    this.resizeTexture(t.__rtA, e, i),
                  this.setTextureParams(n)),
              t.__rtA)))
        )
          throw "Problems creating render textures, known causes include using too much VRAM by not releasing WebGL texture instances";
        return (t.__lastRT = s);
      }),
      (t.releaseTexture = function (t) {
        var e, i;
        if (t) {
          if (t.children)
            for (e = 0, i = t.children.length; e < i; e++)
              this.releaseTexture(t.children[e]);
          t.cacheCanvas && t.uncache();
          var s = void 0;
          if (void 0 !== t._storeID) {
            if (t === this._textureDictionary[t._storeID])
              return this._killTextureObject(t), void (t._storeID = void 0);
            s = t;
          } else if (2 === t._webGLRenderStyle) s = t.image;
          else if (1 === t._webGLRenderStyle) {
            for (e = 0, i = t.spriteSheet._images.length; e < i; e++)
              this.releaseTexture(t.spriteSheet._images[e]);
            return;
          }
          void 0 !== s
            ? (this._killTextureObject(this._textureDictionary[s._storeID]),
              (s._storeID = void 0))
            : this.vocalDebug &&
              console.log("No associated texture found on release");
        }
      }),
      (t.purgeTextures = function (t) {
        null == t && (t = 100);
        for (var e = this._textureDictionary, i = e.length, s = 0; s < i; s++) {
          var r = e[s];
          r && r._drawID + t <= this._drawID && this._killTextureObject(r);
        }
      }),
      (t.updateSimultaneousTextureCount = function (t) {
        var e = this._webGLContext,
          i = !1;
        for ((t < 1 || isNaN(t)) && (t = 1), this._batchTextureCount = t; !i; )
          try {
            (this._activeShader = this._fetchShaderProgram(e)), (i = !0);
          } catch (t) {
            if (1 == this._batchTextureCount)
              throw "Cannot compile shader " + t;
            (this._batchTextureCount -= 4),
              this._batchTextureCount < 1 && (this._batchTextureCount = 1),
              this.vocalDebug &&
                console.log(
                  "Reducing desired texture count due to errors: " +
                    this._batchTextureCount
                );
          }
      }),
      (t.updateViewport = function (t, e) {
        (this._viewportWidth = 0 | t), (this._viewportHeight = 0 | e);
        var i = this._webGLContext;
        i &&
          (i.viewport(0, 0, this._viewportWidth, this._viewportHeight),
          (this._projectionMatrix = new Float32Array([
            2 / this._viewportWidth,
            0,
            0,
            0,
            0,
            -2 / this._viewportHeight,
            1,
            0,
            0,
            0,
            1,
            0,
            -1,
            1,
            0.1,
            0,
          ])),
          (this._projectionMatrixFlip = new Float32Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ])),
          this._projectionMatrixFlip.set(this._projectionMatrix),
          (this._projectionMatrixFlip[5] *= -1),
          (this._projectionMatrixFlip[13] *= -1));
      }),
      (t.getFilterShader = function (t) {
        t = t || this;
        var e = this._webGLContext,
          i = this._activeShader;
        if (t._builtShader)
          (i = t._builtShader),
            t.shaderParamSetup &&
              (e.useProgram(i), t.shaderParamSetup(e, this, i));
        else
          try {
            (i = this._fetchShaderProgram(
              e,
              "filter",
              t.VTX_SHADER_BODY,
              t.FRAG_SHADER_BODY,
              t.shaderParamSetup && t.shaderParamSetup.bind(t)
            )),
              ((t._builtShader = i)._name = t.toString());
          } catch (t) {
            console && console.log("SHADER SWITCH FAILURE", t);
          }
        return i;
      }),
      (t.getBaseTexture = function (t, e) {
        var i = Math.ceil(0 < t ? t : 1) || 1,
          s = Math.ceil(0 < e ? e : 1) || 1,
          r = this._webGLContext,
          n = r.createTexture();
        return this.resizeTexture(n, i, s), this.setTextureParams(r, !1), n;
      }),
      (t.resizeTexture = function (t, e, i) {
        var s = this._webGLContext;
        s.bindTexture(s.TEXTURE_2D, t),
          s.texImage2D(
            s.TEXTURE_2D,
            0,
            s.RGBA,
            e,
            i,
            0,
            s.RGBA,
            s.UNSIGNED_BYTE,
            null
          ),
          (t.width = e),
          (t.height = i);
      }),
      (t.getRenderBufferTexture = function (t, e) {
        var i = this._webGLContext,
          s = this.getBaseTexture(t, e);
        if (!s) return null;
        var r = i.createFramebuffer();
        return r
          ? ((s.width = t),
            (s.height = e),
            i.bindFramebuffer(i.FRAMEBUFFER, r),
            i.framebufferTexture2D(
              i.FRAMEBUFFER,
              i.COLOR_ATTACHMENT0,
              i.TEXTURE_2D,
              s,
              0
            ),
            ((r._renderTexture = s)._frameBuffer = r),
            (s._storeID = this._textureDictionary.length),
            (this._textureDictionary[s._storeID] = s),
            i.bindFramebuffer(i.FRAMEBUFFER, null),
            s)
          : null;
      }),
      (t.setTextureParams = function (t, e) {
        e && this._antialias
          ? (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR))
          : (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST)),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
      }),
      (t.setClearColor = function (t) {
        var e, i, s, r, n;
        "string" == typeof t
          ? 0 == t.indexOf("#")
            ? (4 == t.length &&
                (t =
                  "#" +
                  t.charAt(1) +
                  t.charAt(1) +
                  t.charAt(2) +
                  t.charAt(2) +
                  t.charAt(3) +
                  t.charAt(3)),
              (e = Number("0x" + t.slice(1, 3)) / 255),
              (i = Number("0x" + t.slice(3, 5)) / 255),
              (s = Number("0x" + t.slice(5, 7)) / 255),
              (r = Number("0x" + t.slice(7, 9)) / 255))
            : 0 == t.indexOf("rgba(") &&
              ((n = t.slice(5, -1).split(",")),
              (e = Number(n[0]) / 255),
              (i = Number(n[1]) / 255),
              (s = Number(n[2]) / 255),
              (r = Number(n[3])))
          : ((e = ((4278190080 & t) >>> 24) / 255),
            (i = ((16711680 & t) >>> 16) / 255),
            (s = ((65280 & t) >>> 8) / 255),
            (r = (255 & t) / 255)),
          (this._clearColor.r = e || 0),
          (this._clearColor.g = i || 0),
          (this._clearColor.b = s || 0),
          (this._clearColor.a = r || 0),
          this._webGLContext &&
            this._webGLContext.clearColor(
              this._clearColor.r,
              this._clearColor.g,
              this._clearColor.b,
              this._clearColor.a
            );
      }),
      (t.toString = function () {
        return "[StageGL (name=" + this.name + ")]";
      }),
      (t._fetchWebGLContext = function (t, e) {
        var i, s;
        try {
          i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
        } catch (t) {}
        return (
          i
            ? ((i.viewportWidth = t.width), (i.viewportHeight = t.height))
            : ((s = "Could not initialize WebGL"),
              console.error ? console.error(s) : console.log(s)),
          i
        );
      }),
      (t._fetchShaderProgram = function (t, e, i, s, r) {
        var n, a;
        switch ((t.useProgram(null), e)) {
          case "filter":
            (a = P.COVER_VERTEX_HEADER + (i || P.COVER_VERTEX_BODY)),
              (n = P.COVER_FRAGMENT_HEADER + (s || P.COVER_FRAGMENT_BODY));
            break;
          case "particle":
            (a = P.REGULAR_VERTEX_HEADER + P.PARTICLE_VERTEX_BODY),
              (n = P.REGULAR_FRAGMENT_HEADER + P.PARTICLE_FRAGMENT_BODY);
            break;
          case "override":
            (a = P.REGULAR_VERTEX_HEADER + (i || P.REGULAR_VERTEX_BODY)),
              (n = P.REGULAR_FRAGMENT_HEADER + (s || P.REGULAR_FRAGMENT_BODY));
            break;
          case "regular":
          default:
            (a = P.REGULAR_VERTEX_HEADER + P.REGULAR_VERTEX_BODY),
              (n = P.REGULAR_FRAGMENT_HEADER + P.REGULAR_FRAGMENT_BODY);
        }
        var o = this._createShader(t, t.VERTEX_SHADER, a),
          h = this._createShader(t, t.FRAGMENT_SHADER, n),
          c = t.createProgram();
        if (
          (t.attachShader(c, o),
          t.attachShader(c, h),
          t.linkProgram(c),
          (c._type = e),
          !t.getProgramParameter(c, t.LINK_STATUS))
        )
          throw (t.useProgram(this._activeShader), t.getProgramInfoLog(c));
        switch ((t.useProgram(c), e)) {
          case "filter":
            (c.vertexPositionAttribute = t.getAttribLocation(
              c,
              "vertexPosition"
            )),
              t.enableVertexAttribArray(c.vertexPositionAttribute),
              (c.uvPositionAttribute = t.getAttribLocation(c, "uvPosition")),
              t.enableVertexAttribArray(c.uvPositionAttribute),
              (c.samplerUniform = t.getUniformLocation(c, "uSampler")),
              t.uniform1i(c.samplerUniform, 0),
              (c.uprightUniform = t.getUniformLocation(c, "uUpright")),
              t.uniform1f(c.uprightUniform, 0),
              r && r(t, this, c);
            break;
          case "override":
          case "particle":
          case "regular":
          default:
            (c.vertexPositionAttribute = t.getAttribLocation(
              c,
              "vertexPosition"
            )),
              t.enableVertexAttribArray(c.vertexPositionAttribute),
              (c.uvPositionAttribute = t.getAttribLocation(c, "uvPosition")),
              t.enableVertexAttribArray(c.uvPositionAttribute),
              (c.textureIndexAttribute = t.getAttribLocation(
                c,
                "textureIndex"
              )),
              t.enableVertexAttribArray(c.textureIndexAttribute),
              (c.alphaAttribute = t.getAttribLocation(c, "objectAlpha")),
              t.enableVertexAttribArray(c.alphaAttribute);
            for (var u = [], l = 0; l < this._batchTextureCount; l++) u[l] = l;
            (c.samplerData = u),
              (c.samplerUniform = t.getUniformLocation(c, "uSampler")),
              t.uniform1iv(c.samplerUniform, u),
              (c.pMatrixUniform = t.getUniformLocation(c, "pMatrix"));
        }
        return t.useProgram(this._activeShader), c;
      }),
      (t._createShader = function (t, e, i) {
        i = i.replace(/{{count}}/g, this._batchTextureCount);
        for (var s = "", r = 1; r < this._batchTextureCount; r++)
          s +=
            "} else if (indexPicker <= " +
            r +
            ".5) { color = texture2D(uSampler[" +
            r +
            "], vTextureCoord);";
        i = (i = i.replace(/{{alternates}}/g, s)).replace(
          /{{fragColor}}/g,
          this._premultiply
            ? P.REGULAR_FRAG_COLOR_PREMULTIPLY
            : P.REGULAR_FRAG_COLOR_NORMAL
        );
        var n = t.createShader(e);
        if (
          (t.shaderSource(n, i),
          t.compileShader(n),
          !t.getShaderParameter(n, t.COMPILE_STATUS))
        )
          throw t.getShaderInfoLog(n);
        return n;
      }),
      (t._createBuffers = function (t) {
        var e,
          i = this._maxCardsPerBatch * P.INDICIES_PER_CARD,
          s = (this._vertexPositionBuffer = t.createBuffer());
        t.bindBuffer(t.ARRAY_BUFFER, s), (e = 2);
        for (
          var r = (this._vertices = new Float32Array(i * e)),
            n = 0,
            a = r.length;
          n < a;
          n += e
        )
          r[n] = r[n + 1] = 0;
        t.bufferData(t.ARRAY_BUFFER, r, t.DYNAMIC_DRAW),
          (s.itemSize = e),
          (s.numItems = i);
        var o = (this._uvPositionBuffer = t.createBuffer());
        t.bindBuffer(t.ARRAY_BUFFER, o), (e = 2);
        var h = (this._uvs = new Float32Array(i * e));
        for (n = 0, a = h.length; n < a; n += e) h[n] = h[n + 1] = 0;
        t.bufferData(t.ARRAY_BUFFER, h, t.DYNAMIC_DRAW),
          (o.itemSize = e),
          (o.numItems = i);
        var c = (this._textureIndexBuffer = t.createBuffer());
        t.bindBuffer(t.ARRAY_BUFFER, c), (e = 1);
        var u = (this._indices = new Float32Array(i * e));
        for (n = 0, a = u.length; n < a; n++) u[n] = 0;
        t.bufferData(t.ARRAY_BUFFER, u, t.DYNAMIC_DRAW),
          (c.itemSize = e),
          (c.numItems = i);
        var l = (this._alphaBuffer = t.createBuffer());
        t.bindBuffer(t.ARRAY_BUFFER, l), (e = 1);
        var d = (this._alphas = new Float32Array(i * e));
        for (n = 0, a = d.length; n < a; n++) d[n] = 1;
        t.bufferData(t.ARRAY_BUFFER, d, t.DYNAMIC_DRAW),
          (l.itemSize = e),
          (l.numItems = i);
      }),
      (t._initTextures = function () {
        (this._lastTextureInsert = -1),
          (this._textureDictionary = []),
          (this._textureIDs = {}),
          (this._baseTextures = []),
          (this._batchTextures = []);
        for (var t = 0; t < this._batchTextureCount; t++) {
          var e = this.getBaseTexture();
          if (((this._baseTextures[t] = this._batchTextures[t] = e), !e))
            throw "Problems creating basic textures, known causes include using too much VRAM by not releasing WebGL texture instances";
        }
      }),
      (t._loadTextureImage = function (t, e) {
        var i = e.src;
        i ||
          ((e._isCanvas = !0),
          (i = e.src = "canvas_" + this._lastTrackedCanvas++));
        var s = this._textureIDs[i];
        void 0 === s &&
          (s = this._textureIDs[i] = this._textureDictionary.length),
          void 0 === this._textureDictionary[s] &&
            (this._textureDictionary[s] = this.getBaseTexture());
        var r,
          n = this._textureDictionary[s];
        return (
          n
            ? ((n._batchID = this._batchID),
              (n._storeID = s),
              (n._imageData = e),
              this._insertTextureInBatch(t, n),
              (e._storeID = s),
              e.complete || e.naturalWidth || e._isCanvas
                ? this._updateTextureImageData(t, e)
                : e.addEventListener(
                    "load",
                    this._updateTextureImageData.bind(this, t, e)
                  ))
            : ((r =
                "Problem creating desired texture, known causes include using too much VRAM by not releasing WebGL texture instances"),
              (console.error && console.error(r)) || console.log(r),
              ((n = this._baseTextures[0])._batchID = this._batchID),
              (n._storeID = -1),
              (n._imageData = n),
              this._insertTextureInBatch(t, n)),
          n
        );
      }),
      (t._updateTextureImageData = function (t, e) {
        var i = e.width & (e.width - 1) || e.height & (e.height - 1),
          s = this._textureDictionary[e._storeID];
        t.activeTexture(t.TEXTURE0 + s._activeIndex),
          t.bindTexture(t.TEXTURE_2D, s),
          (s.isPOT = !i),
          this.setTextureParams(t, s.isPOT);
        try {
          t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
        } catch (t) {
          var r =
            "\nAn error has occurred. This is most likely due to security restrictions on WebGL images with local or cross-domain origins";
          console.error
            ? (console.error(r), console.error(t))
            : console && (console.log(r), console.log(t));
        }
        (e._invalid = !1),
          (s._w = e.width),
          (s._h = e.height),
          this.vocalDebug &&
            (i && console.warn("NPOT(Non Power of Two) Texture: " + e.src),
            (e.width > t.MAX_TEXTURE_SIZE || e.height > t.MAX_TEXTURE_SIZE) &&
              console &&
              console.error(
                "Oversized Texture: " +
                  e.width +
                  "x" +
                  e.height +
                  " vs " +
                  t.MAX_TEXTURE_SIZE +
                  "max"
              ));
      }),
      (t._insertTextureInBatch = function (t, e) {
        if (this._batchTextures[e._activeIndex] !== e) {
          var i = -1,
            s = (this._lastTextureInsert + 1) % this._batchTextureCount,
            r = s;
          do {
            if (
              this._batchTextures[r]._batchID != this._batchID &&
              !this._slotBlacklist[r]
            ) {
              i = r;
              break;
            }
            r = (r + 1) % this._batchTextureCount;
          } while (r !== s);
          -1 === i &&
            ((this.batchReason = "textureOverflow"),
            this._drawBuffers(t),
            (this.batchCardCount = 0),
            (i = s)),
            ((this._batchTextures[i] = e)._activeIndex = i),
            (n = e._imageData) && n._invalid && void 0 !== e._drawID
              ? this._updateTextureImageData(t, n)
              : (t.activeTexture(t.TEXTURE0 + i),
                t.bindTexture(t.TEXTURE_2D, e),
                this.setTextureParams(t)),
            (this._lastTextureInsert = i);
        } else {
          var n = e._imageData;
          null != e._storeID &&
            n &&
            n._invalid &&
            this._updateTextureImageData(t, n);
        }
        (e._drawID = this._drawID), (e._batchID = this._batchID);
      }),
      (t._killTextureObject = function (t) {
        if (t) {
          var e = this._webGLContext;
          if (void 0 !== t._storeID && 0 <= t._storeID) {
            for (var i in ((this._textureDictionary[t._storeID] = void 0),
            this._textureIDs))
              this._textureIDs[i] == t._storeID && delete this._textureIDs[i];
            t._imageData && (t._imageData._storeID = void 0),
              (t._imageData = t._storeID = void 0);
          }
          void 0 !== t._activeIndex &&
            this._batchTextures[t._activeIndex] === t &&
            (this._batchTextures[t._activeIndex] =
              this._baseTextures[t._activeIndex]);
          try {
            t._frameBuffer && e.deleteFramebuffer(t._frameBuffer),
              (t._frameBuffer = void 0);
          } catch (t) {
            this.vocalDebug && console.log(t);
          }
          try {
            e.deleteTexture(t);
          } catch (t) {
            this.vocalDebug && console.log(t);
          }
        }
      }),
      (t._backupBatchTextures = function (t, e) {
        var i = this._webGLContext;
        this._backupTextures || (this._backupTextures = []),
          void 0 === e && (e = this._backupTextures);
        for (var s = 0; s < this._batchTextureCount; s++)
          i.activeTexture(i.TEXTURE0 + s),
            t
              ? (this._batchTextures[s] = e[s])
              : ((e[s] = this._batchTextures[s]),
                (this._batchTextures[s] = this._baseTextures[s])),
            i.bindTexture(i.TEXTURE_2D, this._batchTextures[s]),
            this.setTextureParams(i, this._batchTextures[s].isPOT);
        t && e === this._backupTextures && (this._backupTextures = []);
      }),
      (t._batchDraw = function (t, e, i) {
        0 < this._isDrawing && this._drawBuffers(e),
          this._isDrawing++,
          this._drawID++,
          (this.batchCardCount = 0),
          (this.depth = 0),
          this._appendToBatchGroup(
            t,
            e,
            new createjs.Matrix2D(),
            this.alpha,
            i
          ),
          (this.batchReason = "drawFinish"),
          this._drawBuffers(e),
          this._isDrawing--;
      }),
      (t._cacheDraw = function (t, e, i, s) {
        var r,
          n = this._activeShader,
          a = this._slotBlacklist,
          o = this._maxTextureSlots - 1,
          h = this._viewportWidth,
          c = this._viewportHeight;
        this.protectTextureSlot(o, !0);
        var u = e.getMatrix();
        (u = u.clone()).scale(1 / s.scale, 1 / s.scale),
          (u = u.invert()).translate(
            (-s.offX / s.scale) * e.scaleX,
            (-s.offY / s.scale) * e.scaleY
          );
        var l = this._cacheContainer;
        (l.children = [e]),
          (l.transformMatrix = u),
          this._backupBatchTextures(!1),
          i && i.length
            ? this._drawFilters(e, i, s)
            : this.isCacheControlled
            ? (t.clear(t.COLOR_BUFFER_BIT), this._batchDraw(l, t, !0))
            : (t.activeTexture(t.TEXTURE0 + o),
              (e.cacheCanvas = this.getTargetRenderTexture(
                e,
                s._drawWidth,
                s._drawHeight
              )),
              (r = e.cacheCanvas),
              t.bindFramebuffer(t.FRAMEBUFFER, r._frameBuffer),
              this.updateViewport(s._drawWidth, s._drawHeight),
              (this._projectionMatrix = this._projectionMatrixFlip),
              t.clear(t.COLOR_BUFFER_BIT),
              this._batchDraw(l, t, !0),
              t.bindFramebuffer(t.FRAMEBUFFER, null),
              this.updateViewport(h, c)),
          this._backupBatchTextures(!0),
          this.protectTextureSlot(o, !1),
          (this._activeShader = n),
          (this._slotBlacklist = a);
      }),
      (t._drawFilters = function (t, e, i) {
        var s,
          r = this._webGLContext,
          n = this._maxTextureSlots - 1,
          a = this._viewportWidth,
          o = this._viewportHeight,
          h = this._cacheContainer,
          c = e.length;
        r.activeTexture(r.TEXTURE0 + n),
          (s = this.getTargetRenderTexture(t, i._drawWidth, i._drawHeight)),
          r.bindFramebuffer(r.FRAMEBUFFER, s._frameBuffer),
          this.updateViewport(i._drawWidth, i._drawHeight),
          r.clear(r.COLOR_BUFFER_BIT),
          this._batchDraw(h, r, !0),
          r.activeTexture(r.TEXTURE0),
          r.bindTexture(r.TEXTURE_2D, s),
          this.setTextureParams(r);
        for (
          var u = !1, l = 0, d = e[l];
          (this._activeShader = this.getFilterShader(d)),
            this._activeShader &&
              (r.activeTexture(r.TEXTURE0 + n),
              (s = this.getTargetRenderTexture(t, i._drawWidth, i._drawHeight)),
              r.bindFramebuffer(r.FRAMEBUFFER, s._frameBuffer),
              r.viewport(0, 0, i._drawWidth, i._drawHeight),
              r.clear(r.COLOR_BUFFER_BIT),
              this._drawCover(r, u),
              r.activeTexture(r.TEXTURE0),
              r.bindTexture(r.TEXTURE_2D, s),
              this.setTextureParams(r),
              (1 < c || e[0]._multiPass) && (u = !u),
              (d = null !== d._multiPass ? d._multiPass : e[++l])),
            d;

        );
        this.isCacheControlled
          ? (r.bindFramebuffer(r.FRAMEBUFFER, null),
            this.updateViewport(a, o),
            (this._activeShader = this.getFilterShader(this)),
            r.clear(r.COLOR_BUFFER_BIT),
            this._drawCover(r, u))
          : (u &&
              (r.activeTexture(r.TEXTURE0 + n),
              (s = this.getTargetRenderTexture(t, i._drawWidth, i._drawHeight)),
              r.bindFramebuffer(r.FRAMEBUFFER, s._frameBuffer),
              (this._activeShader = this.getFilterShader(this)),
              r.viewport(0, 0, i._drawWidth, i._drawHeight),
              r.clear(r.COLOR_BUFFER_BIT),
              this._drawCover(r, !u)),
            r.bindFramebuffer(r.FRAMEBUFFER, null),
            this.updateViewport(a, o),
            (t.cacheCanvas = s));
      }),
      (t._appendToBatchGroup = function (t, e, i, s, r) {
        t._glMtx || (t._glMtx = new createjs.Matrix2D());
        var n,
          a,
          o,
          h,
          c = t._glMtx;
        c.copy(i),
          t.transformMatrix
            ? c.appendMatrix(t.transformMatrix)
            : c.appendTransform(
                t.x,
                t.y,
                t.scaleX,
                t.scaleY,
                t.rotation,
                t.skewX,
                t.skewY,
                t.regX,
                t.regY
              );
        for (var u = t.children.length, l = 0; l < u; l++) {
          var d = t.children[l];
          if (d.visible && s)
            if (
              (d.cacheCanvas && !r) ||
              (d._updateState && d._updateState(), !d.children)
            ) {
              this.batchCardCount + 1 > this._maxCardsPerBatch &&
                ((this.batchReason = "vertexOverflow"),
                this._drawBuffers(e),
                (this.batchCardCount = 0)),
                d._glMtx || (d._glMtx = new createjs.Matrix2D());
              var _,
                p,
                f,
                g,
                m = d._glMtx;
              m.copy(c),
                d.transformMatrix
                  ? m.appendMatrix(d.transformMatrix)
                  : m.appendTransform(
                      d.x,
                      d.y,
                      d.scaleX,
                      d.scaleY,
                      d.rotation,
                      d.skewX,
                      d.skewY,
                      d.regX,
                      d.regY
                    );
              var v = d.cacheCanvas && !r;
              if (2 === d._webGLRenderStyle || v)
                _ = (!r && d.cacheCanvas) || d.image;
              else {
                if (1 !== d._webGLRenderStyle) continue;
                if (null === (p = d.spriteSheet.getFrame(d.currentFrame)))
                  continue;
                _ = p.image;
              }
              var T = this._uvs,
                b = this._vertices,
                E = this._indices,
                y = this._alphas;
              if (_) {
                if (void 0 === _._storeID)
                  (f = this._loadTextureImage(e, _)),
                    this._insertTextureInBatch(e, f);
                else {
                  if (!(f = this._textureDictionary[_._storeID])) {
                    this.vocalDebug &&
                      console.log(
                        "Texture should not be looked up while not being stored."
                      );
                    continue;
                  }
                  f._batchID !== this._batchID &&
                    this._insertTextureInBatch(e, f);
                }
                var S,
                  x,
                  w = f._activeIndex;
                2 === d._webGLRenderStyle || v
                  ? (h =
                      !v && d.sourceRect
                        ? (d._uvRect || (d._uvRect = {}),
                          (g = d.sourceRect),
                          ((x = d._uvRect).t = g.y / _.height),
                          (x.l = g.x / _.width),
                          (x.b = (g.y + g.height) / _.height),
                          (x.r = (g.x + g.width) / _.width),
                          (a = n = 0),
                          (o = g.width + n),
                          g.height + a)
                        : ((x = P.UV_RECT),
                          v
                            ? ((n =
                                (g = d.bitmapCache).x +
                                g._filterOffX / g.scale),
                              (a = g.y + g._filterOffY / g.scale),
                              (o = g._drawWidth / g.scale + n),
                              g._drawHeight / g.scale + a)
                            : ((a = n = 0), (o = _.width + n), _.height + a)))
                  : 1 === d._webGLRenderStyle &&
                    ((S = p.rect),
                    (x =
                      (x = p.uvRect) ||
                      P.buildUVRects(d.spriteSheet, d.currentFrame, !1)),
                    (n = -p.regX),
                    (a = -p.regY),
                    (o = S.width - p.regX),
                    (h = S.height - p.regY));
                var R = this.batchCardCount * P.INDICIES_PER_CARD,
                  A = 2 * R;
                (b[A] = n * m.a + a * m.c + m.tx),
                  (b[1 + A] = n * m.b + a * m.d + m.ty),
                  (b[2 + A] = n * m.a + h * m.c + m.tx),
                  (b[3 + A] = n * m.b + h * m.d + m.ty),
                  (b[4 + A] = o * m.a + a * m.c + m.tx),
                  (b[5 + A] = o * m.b + a * m.d + m.ty),
                  (b[6 + A] = b[2 + A]),
                  (b[7 + A] = b[3 + A]),
                  (b[8 + A] = b[4 + A]),
                  (b[9 + A] = b[5 + A]),
                  (b[10 + A] = o * m.a + h * m.c + m.tx),
                  (b[11 + A] = o * m.b + h * m.d + m.ty),
                  (T[A] = x.l),
                  (T[1 + A] = x.t),
                  (T[2 + A] = x.l),
                  (T[3 + A] = x.b),
                  (T[4 + A] = x.r),
                  (T[5 + A] = x.t),
                  (T[6 + A] = x.l),
                  (T[7 + A] = x.b),
                  (T[8 + A] = x.r),
                  (T[9 + A] = x.t),
                  (T[10 + A] = x.r),
                  (T[11 + A] = x.b),
                  (E[R] =
                    E[1 + R] =
                    E[2 + R] =
                    E[3 + R] =
                    E[4 + R] =
                    E[5 + R] =
                      w),
                  (y[R] =
                    y[1 + R] =
                    y[2 + R] =
                    y[3 + R] =
                    y[4 + R] =
                    y[5 + R] =
                      d.alpha * s),
                  this.batchCardCount++;
              }
            } else this._appendToBatchGroup(d, e, c, d.alpha * s);
        }
      }),
      (t._drawBuffers = function (t) {
        if (!(this.batchCardCount <= 0)) {
          this.vocalDebug &&
            console.log(
              "Draw[" +
                this._drawID +
                ":" +
                this._batchID +
                "] : " +
                this.batchReason
            );
          var e = this._activeShader,
            i = this._vertexPositionBuffer,
            s = this._textureIndexBuffer,
            r = this._uvPositionBuffer,
            n = this._alphaBuffer;
          t.useProgram(e),
            t.bindBuffer(t.ARRAY_BUFFER, i),
            t.vertexAttribPointer(
              e.vertexPositionAttribute,
              i.itemSize,
              t.FLOAT,
              !1,
              0,
              0
            ),
            t.bufferSubData(t.ARRAY_BUFFER, 0, this._vertices),
            t.bindBuffer(t.ARRAY_BUFFER, s),
            t.vertexAttribPointer(
              e.textureIndexAttribute,
              s.itemSize,
              t.FLOAT,
              !1,
              0,
              0
            ),
            t.bufferSubData(t.ARRAY_BUFFER, 0, this._indices),
            t.bindBuffer(t.ARRAY_BUFFER, r),
            t.vertexAttribPointer(
              e.uvPositionAttribute,
              r.itemSize,
              t.FLOAT,
              !1,
              0,
              0
            ),
            t.bufferSubData(t.ARRAY_BUFFER, 0, this._uvs),
            t.bindBuffer(t.ARRAY_BUFFER, n),
            t.vertexAttribPointer(
              e.alphaAttribute,
              n.itemSize,
              t.FLOAT,
              !1,
              0,
              0
            ),
            t.bufferSubData(t.ARRAY_BUFFER, 0, this._alphas),
            t.uniformMatrix4fv(
              e.pMatrixUniform,
              t.FALSE,
              this._projectionMatrix
            );
          for (var a = 0; a < this._batchTextureCount; a++) {
            var o = this._batchTextures[a];
            t.activeTexture(t.TEXTURE0 + a),
              t.bindTexture(t.TEXTURE_2D, o),
              this.setTextureParams(t, o.isPOT);
          }
          t.drawArrays(
            t.TRIANGLES,
            0,
            this.batchCardCount * P.INDICIES_PER_CARD
          ),
            this._batchID++;
        }
      }),
      (t._drawCover = function (t, e) {
        0 < this._isDrawing && this._drawBuffers(t),
          this.vocalDebug &&
            console.log(
              "Draw[" + this._drawID + ":" + this._batchID + "] : Cover"
            );
        var i = this._activeShader,
          s = this._vertexPositionBuffer,
          r = this._uvPositionBuffer;
        t.clear(t.COLOR_BUFFER_BIT),
          t.useProgram(i),
          t.bindBuffer(t.ARRAY_BUFFER, s),
          t.vertexAttribPointer(
            i.vertexPositionAttribute,
            s.itemSize,
            t.FLOAT,
            !1,
            0,
            0
          ),
          t.bufferSubData(t.ARRAY_BUFFER, 0, P.COVER_VERT),
          t.bindBuffer(t.ARRAY_BUFFER, r),
          t.vertexAttribPointer(
            i.uvPositionAttribute,
            r.itemSize,
            t.FLOAT,
            !1,
            0,
            0
          ),
          t.bufferSubData(t.ARRAY_BUFFER, 0, e ? P.COVER_UV_FLIP : P.COVER_UV),
          t.uniform1i(i.samplerUniform, 0),
          t.uniform1f(i.uprightUniform, e ? 0 : 1),
          t.drawArrays(t.TRIANGLES, 0, P.INDICIES_PER_CARD);
      }),
      (createjs.StageGL = createjs.promote(P, "Stage"));
  })(),
  (function () {
    function s(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t
          ? ((this.image = document.createElement("img")), (this.image.src = t))
          : (this.image = t),
        (this.sourceRect = null),
        (this._webGLRenderStyle = createjs.DisplayObject._StageGL_BITMAP);
    }
    var t = createjs.extend(s, createjs.DisplayObject);
    (t.initialize = s),
      (t.isVisible = function () {
        var t = this.image,
          e =
            this.cacheCanvas ||
            (t && (t.naturalWidth || t.getContext || 2 <= t.readyState));
        return !!(
          this.visible &&
          0 < this.alpha &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          e
        );
      }),
      (t.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        var i,
          s,
          r,
          n,
          a,
          o,
          h,
          c,
          u = this.image,
          l = this.sourceRect;
        return (
          u.getImage && (u = u.getImage()),
          u &&
            (l
              ? ((i = l.x),
                (s = l.y),
                (r = i + l.width),
                (n = s + l.height),
                i < (o = a = 0) && ((a -= i), (i = 0)),
                (h = u.width) < r && (r = h),
                s < 0 && ((o -= s), (s = 0)),
                (c = u.height) < n && (n = c),
                t.drawImage(u, i, s, r - i, n - s, a, o, r - i, n - s))
              : t.drawImage(u, 0, 0)),
          !0
        );
      }),
      (t.cache = function (t, e, i, s, r, n) {
        this.bitmapCache || (this.bitmapCache = new createjs.BitmapCache()),
          this.bitmapCache.define(this, t, e, i, s, r, n);
      }),
      (t.updateCache = function (t) {
        if (!this.bitmapCache)
          throw "cache() must be called before updateCache()";
        this.bitmapCache.update(t);
      }),
      (t.uncache = function () {
        this.bitmapCache &&
          (this.bitmapCache.release(), (this.bitmapCache = void 0));
      }),
      (t.getCacheDataURL = function () {
        return this.bitmapCache ? this.bitmapCache.getDataURL() : null;
      }),
      (t.getBounds = function () {
        var t = this.DisplayObject_getBounds();
        if (t) return t;
        var e = this.image,
          i = this.sourceRect || e;
        return e && (e.naturalWidth || e.getContext || 2 <= e.readyState)
          ? this._rectangle.setValues(0, 0, i.width, i.height)
          : null;
      }),
      (t.clone = function (t) {
        var e = this.image;
        e && t && (e = e.cloneNode());
        var i = new s(e);
        return (
          this.sourceRect && (i.sourceRect = this.sourceRect.clone()),
          this._cloneProps(i),
          i
        );
      }),
      (t.toString = function () {
        return "[Bitmap (name=" + this.name + ")]";
      }),
      (createjs.Bitmap = createjs.promote(s, "DisplayObject"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.DisplayObject_constructor(),
        (this.currentFrame = 0),
        (this.currentAnimation = null),
        (this.paused = !0),
        (this.spriteSheet = t),
        (this.currentAnimationFrame = 0),
        (this.framerate = 0),
        (this._animation = null),
        (this._currentFrame = null),
        (this._skipAdvance = !1),
        (this._webGLRenderStyle = createjs.DisplayObject._StageGL_SPRITE),
        null != e && this.gotoAndPlay(e);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.cacheCanvas || this.spriteSheet.complete;
        return !!(
          this.visible &&
          0 < this.alpha &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        this._normalizeFrame();
        var i = this.spriteSheet.getFrame(0 | this._currentFrame);
        if (!i) return !1;
        var s = i.rect;
        return (
          s.width &&
            s.height &&
            t.drawImage(
              i.image,
              s.x,
              s.y,
              s.width,
              s.height,
              -i.regX,
              -i.regY,
              s.width,
              s.height
            ),
          !0
        );
      }),
      (e.play = function () {
        this.paused = !1;
      }),
      (e.stop = function () {
        this.paused = !0;
      }),
      (e.gotoAndPlay = function (t) {
        (this.paused = !1), (this._skipAdvance = !0), this._goto(t);
      }),
      (e.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (e.advance = function (t) {
        var e = this.framerate || this.spriteSheet.framerate,
          i = e && null != t ? t / (1e3 / e) : 1;
        this._normalizeFrame(i);
      }),
      (e.getBounds = function () {
        return (
          this.DisplayObject_getBounds() ||
          this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.spriteSheet));
      }),
      (e.toString = function () {
        return "[Sprite (name=" + this.name + ")]";
      }),
      (e._cloneProps = function (t) {
        return (
          this.DisplayObject__cloneProps(t),
          (t.currentFrame = this.currentFrame),
          (t.currentAnimation = this.currentAnimation),
          (t.paused = this.paused),
          (t.currentAnimationFrame = this.currentAnimationFrame),
          (t.framerate = this.framerate),
          (t._animation = this._animation),
          (t._currentFrame = this._currentFrame),
          (t._skipAdvance = this._skipAdvance),
          t
        );
      }),
      (e._tick = function (t) {
        this.paused ||
          (this._skipAdvance || this.advance(t && t.delta),
          (this._skipAdvance = !1)),
          this.DisplayObject__tick(t);
      }),
      (e._normalizeFrame = function (t) {
        t = t || 0;
        var e = this._animation,
          i = this.paused,
          s = this._currentFrame;
        if (e) {
          var r,
            n = e.speed || 1,
            a = this.currentAnimationFrame;
          if ((r = e.frames.length) <= a + t * n) {
            var o = e.next;
            if (this._dispatchAnimationEnd(e, s, i, o, r - 1)) return;
            if (o) return this._goto(o, t - (r - a) / n);
            (this.paused = !0), (a = e.frames.length - 1);
          } else a += t * n;
          (this.currentAnimationFrame = a),
            (this._currentFrame = e.frames[0 | a]);
        } else if (
          ((s = this._currentFrame += t),
          (r = this.spriteSheet.getNumFrames()) <= s &&
            0 < r &&
            !this._dispatchAnimationEnd(e, s, i, r - 1) &&
            (this._currentFrame -= r) >= r)
        )
          return this._normalizeFrame();
        (s = 0 | this._currentFrame),
          this.currentFrame != s &&
            ((this.currentFrame = s), this.dispatchEvent("change"));
      }),
      (e._dispatchAnimationEnd = function (t, e, i, s, r) {
        var n,
          a = t ? t.name : null;
        this.hasEventListener("animationend") &&
          (((n = new createjs.Event("animationend")).name = a),
          (n.next = s),
          this.dispatchEvent(n));
        var o = this._animation != t || this._currentFrame != e;
        return (
          o ||
            i ||
            !this.paused ||
            ((this.currentAnimationFrame = r), (o = !0)),
          o
        );
      }),
      (e._goto = function (t, e) {
        var i;
        (this.currentAnimationFrame = 0),
          isNaN(t)
            ? (i = this.spriteSheet.getAnimation(t)) &&
              ((this._animation = i),
              (this.currentAnimation = t),
              this._normalizeFrame(e))
            : ((this.currentAnimation = this._animation = null),
              (this._currentFrame = t),
              this._normalizeFrame());
      }),
      (createjs.Sprite = createjs.promote(t, "DisplayObject"));
  })(),
  (function () {
    "use strict";
    function i(t) {
      this.DisplayObject_constructor(),
        (this.graphics = t || new createjs.Graphics());
    }
    var t = createjs.extend(i, createjs.DisplayObject);
    (t.isVisible = function () {
      var t = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
      return !!(
        this.visible &&
        0 < this.alpha &&
        0 != this.scaleX &&
        0 != this.scaleY &&
        t
      );
    }),
      (t.draw = function (t, e) {
        return this.DisplayObject_draw(t, e) || this.graphics.draw(t, this), !0;
      }),
      (t.clone = function (t) {
        var e = t && this.graphics ? this.graphics.clone() : this.graphics;
        return this._cloneProps(new i(e));
      }),
      (t.toString = function () {
        return "[Shape (name=" + this.name + ")]";
      }),
      (createjs.Shape = createjs.promote(i, "DisplayObject"));
  })(),
  (function () {
    "use strict";
    function g(t, e, i) {
      this.DisplayObject_constructor(),
        (this.text = t),
        (this.font = e),
        (this.color = i),
        (this.textAlign = "left"),
        (this.textBaseline = "top"),
        (this.maxWidth = null),
        (this.outline = 0),
        (this.lineHeight = 0),
        (this.lineWidth = null);
    }
    var t = createjs.extend(g, createjs.DisplayObject),
      e = createjs.createCanvas
        ? createjs.createCanvas()
        : document.createElement("canvas");
    e.getContext &&
      ((g._workingContext = e.getContext("2d", { willReadFrequently: true })),
      (e.width = e.height = 1)),
      (g.H_OFFSETS = { start: 0, left: 0, center: -0.5, end: -1, right: -1 }),
      (g.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1,
      }),
      (t.isVisible = function () {
        var t = this.cacheCanvas || (null != this.text && "" !== this.text);
        return !!(
          this.visible &&
          0 < this.alpha &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (t.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        var i = this.color || "#000";
        return (
          this.outline
            ? ((t.strokeStyle = i), (t.lineWidth = +this.outline))
            : (t.fillStyle = i),
          this._drawText(this._prepContext(t)),
          !0
        );
      }),
      (t.getMeasuredWidth = function () {
        return this._getMeasuredWidth(this.text);
      }),
      (t.getMeasuredLineHeight = function () {
        return 1.2 * this._getMeasuredWidth("M");
      }),
      (t.getMeasuredHeight = function () {
        return this._drawText(null, {}).height;
      }),
      (t.getBounds = function () {
        var t = this.DisplayObject_getBounds();
        if (t) return t;
        if (null == this.text || "" === this.text) return null;
        var e = this._drawText(null, {}),
          i =
            this.maxWidth && this.maxWidth < e.width ? this.maxWidth : e.width,
          s = i * g.H_OFFSETS[this.textAlign || "left"],
          r =
            (this.lineHeight || this.getMeasuredLineHeight()) *
            g.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.setValues(s, r, i, e.height);
      }),
      (t.getMetrics = function () {
        var t = { lines: [] };
        return (
          (t.lineHeight = this.lineHeight || this.getMeasuredLineHeight()),
          (t.vOffset = t.lineHeight * g.V_OFFSETS[this.textBaseline || "top"]),
          this._drawText(null, t, t.lines)
        );
      }),
      (t.clone = function () {
        return this._cloneProps(new g(this.text, this.font, this.color));
      }),
      (t.toString = function () {
        return (
          "[Text (text=" +
          (20 < this.text.length
            ? this.text.substr(0, 17) + "..."
            : this.text) +
          ")]"
        );
      }),
      (t._cloneProps = function (t) {
        return (
          this.DisplayObject__cloneProps(t),
          (t.textAlign = this.textAlign),
          (t.textBaseline = this.textBaseline),
          (t.maxWidth = this.maxWidth),
          (t.outline = this.outline),
          (t.lineHeight = this.lineHeight),
          (t.lineWidth = this.lineWidth),
          t
        );
      }),
      (t._prepContext = function (t) {
        return (
          (t.font = this.font || "10px sans-serif"),
          (t.textAlign = this.textAlign || "left"),
          (t.textBaseline = this.textBaseline || "top"),
          (t.lineJoin = "miter"),
          (t.miterLimit = 2.5),
          t
        );
      }),
      (t._drawText = function (t, e, i) {
        var s = !!t;
        s || ((t = g._workingContext).save(), this._prepContext(t));
        for (
          var r = this.lineHeight || this.getMeasuredLineHeight(),
            n = 0,
            a = 0,
            o = String(this.text).split(/(?:\r\n|\r|\n)/),
            h = 0,
            c = o.length;
          h < c;
          h++
        ) {
          var u = o[h],
            l = null;
          if (
            null != this.lineWidth &&
            (l = t.measureText(u).width) > this.lineWidth
          )
            for (
              var d = u.split(/(\s)/),
                u = d[0],
                l = t.measureText(u).width,
                _ = 1,
                p = d.length;
              _ < p;
              _ += 2
            ) {
              var f = t.measureText(d[_] + d[_ + 1]).width;
              l + f > this.lineWidth
                ? (s && this._drawTextLine(t, u, a * r),
                  i && i.push(u),
                  n < l && (n = l),
                  (u = d[_ + 1]),
                  (l = t.measureText(u).width),
                  a++)
                : ((u += d[_] + d[_ + 1]), (l += f));
            }
          s && this._drawTextLine(t, u, a * r),
            i && i.push(u),
            e && null == l && (l = t.measureText(u).width),
            n < l && (n = l),
            a++;
        }
        return e && ((e.width = n), (e.height = a * r)), s || t.restore(), e;
      }),
      (t._drawTextLine = function (t, e, i) {
        this.outline
          ? t.strokeText(e, 0, i, this.maxWidth || 65535)
          : t.fillText(e, 0, i, this.maxWidth || 65535);
      }),
      (t._getMeasuredWidth = function (t) {
        var e = g._workingContext;
        e.save();
        var i = this._prepContext(e).measureText(t).width;
        return e.restore(), i;
      }),
      (createjs.Text = createjs.promote(g, "DisplayObject"));
  })(),
  (function () {
    "use strict";
    function v(t, e) {
      this.Container_constructor(),
        (this.text = t || ""),
        (this.spriteSheet = e),
        (this.lineHeight = 0),
        (this.letterSpacing = 0),
        (this.spaceWidth = 0),
        (this._oldProps = {
          text: 0,
          spriteSheet: 0,
          lineHeight: 0,
          letterSpacing: 0,
          spaceWidth: 0,
        }),
        (this._oldStage = null),
        (this._drawAction = null);
    }
    var t = createjs.extend(v, createjs.Container);
    (v.maxPoolSize = 100),
      (v._spritePool = []),
      (t.draw = function (t, e) {
        this.DisplayObject_draw(t, e) ||
          (this._updateState(), this.Container_draw(t, e));
      }),
      (t.getBounds = function () {
        return this._updateText(), this.Container_getBounds();
      }),
      (t.isVisible = function () {
        var t =
          this.cacheCanvas ||
          (this.spriteSheet && this.spriteSheet.complete && this.text);
        return !!(
          this.visible &&
          0 < this.alpha &&
          0 !== this.scaleX &&
          0 !== this.scaleY &&
          t
        );
      }),
      (t.clone = function () {
        return this._cloneProps(new v(this.text, this.spriteSheet));
      }),
      (t.addChild =
        t.addChildAt =
        t.removeChild =
        t.removeChildAt =
        t.removeAllChildren =
          function () {}),
      (t._updateState = function () {
        this._updateText();
      }),
      (t._cloneProps = function (t) {
        return (
          this.Container__cloneProps(t),
          (t.lineHeight = this.lineHeight),
          (t.letterSpacing = this.letterSpacing),
          (t.spaceWidth = this.spaceWidth),
          t
        );
      }),
      (t._getFrameIndex = function (t, e) {
        var i,
          s = e.getAnimation(t);
        return (
          s ||
            (t != (i = t.toUpperCase()) ||
              t != (i = t.toLowerCase()) ||
              (i = null),
            i && (s = e.getAnimation(i))),
          s && s.frames[0]
        );
      }),
      (t._getFrame = function (t, e) {
        var i = this._getFrameIndex(t, e);
        return null == i ? i : e.getFrame(i);
      }),
      (t._getLineHeight = function (t) {
        var e =
          this._getFrame("1", t) ||
          this._getFrame("T", t) ||
          this._getFrame("L", t) ||
          t.getFrame(0);
        return e ? e.rect.height : 1;
      }),
      (t._getSpaceWidth = function (t) {
        var e =
          this._getFrame("1", t) ||
          this._getFrame("l", t) ||
          this._getFrame("e", t) ||
          this._getFrame("a", t) ||
          t.getFrame(0);
        return e ? e.rect.width : 1;
      }),
      (t._updateText = function () {
        var t,
          e = 0,
          i = 0,
          s = this._oldProps,
          r = !1,
          n = this.spaceWidth,
          a = this.lineHeight,
          o = this.spriteSheet,
          h = v._spritePool,
          c = this.children,
          u = 0,
          l = c.length;
        for (var d in s) s[d] != this[d] && ((s[d] = this[d]), (r = !0));
        if (r) {
          var _ = !!this._getFrame(" ", o);
          _ || n || (n = this._getSpaceWidth(o)),
            (a = a || this._getLineHeight(o));
          for (var p = 0, f = this.text.length; p < f; p++) {
            var g,
              m = this.text.charAt(p);
            " " != m || _
              ? "\n" != m && "\r" != m
                ? null != (g = this._getFrameIndex(m, o)) &&
                  (u < l
                    ? (t = c[u])
                    : (c.push((t = h.length ? h.pop() : new createjs.Sprite())),
                      (t.parent = this),
                      l++),
                  (t.spriteSheet = o),
                  t.gotoAndStop(g),
                  (t.x = e),
                  (t.y = i),
                  u++,
                  (e += t.getBounds().width + this.letterSpacing))
                : ("\r" == m && "\n" == this.text.charAt(p + 1) && p++,
                  (e = 0),
                  (i += a))
              : (e += n);
          }
          for (; u < l; ) h.push((t = c.pop())), (t.parent = null), l--;
          h.length > v.maxPoolSize && (h.length = v.maxPoolSize);
        }
      }),
      (createjs.BitmapText = createjs.promote(v, "Container"));
  })(),
  (function () {
    "use strict";
    function a(t) {
      var e, i, s, r;
      this.Container_constructor(),
        a.inited || a.init(),
        t instanceof String || 1 < arguments.length
          ? ((e = t),
            (i = arguments[1]),
            (r = arguments[3]),
            null == (s = arguments[2]) && (s = -1),
            (t = null))
          : t &&
            ((e = t.mode), (i = t.startPosition), (s = t.loop), (r = t.labels)),
        (t = t || { labels: r }),
        (this.mode = e || a.INDEPENDENT),
        (this.startPosition = i || 0),
        (this.loop = !0 === s ? -1 : s || 0),
        (this.currentFrame = 0),
        (this.paused = t.paused || !1),
        (this.actionsEnabled = !0),
        (this.autoReset = !0),
        (this.frameBounds = this.frameBounds || t.frameBounds),
        (this.framerate = null),
        (t.useTicks = t.paused = !0),
        (this.timeline = new createjs.Timeline(t)),
        (this._synchOffset = 0),
        (this._rawPosition = -1),
        (this._bound_resolveState = this._resolveState.bind(this)),
        (this._t = 0),
        (this._managed = {});
    }
    var t = createjs.extend(a, createjs.Container);
    (a.INDEPENDENT = "independent"),
      (a.SINGLE_FRAME = "single"),
      (a.SYNCHED = "synched"),
      (a.inited = !1),
      (a.init = function () {
        a.inited || (s.install(), (a.inited = !0));
      }),
      (t._getLabels = function () {
        return this.timeline.getLabels();
      }),
      (t.getLabels = createjs.deprecate(t._getLabels, "MovieClip.getLabels")),
      (t._getCurrentLabel = function () {
        return this.timeline.currentLabel;
      }),
      (t.getCurrentLabel = createjs.deprecate(
        t._getCurrentLabel,
        "MovieClip.getCurrentLabel"
      )),
      (t._getDuration = function () {
        return this.timeline.duration;
      }),
      (t.getDuration = createjs.deprecate(
        t._getDuration,
        "MovieClip.getDuration"
      ));
    try {
      Object.defineProperties(t, {
        labels: { get: t._getLabels },
        currentLabel: { get: t._getCurrentLabel },
        totalFrames: { get: t._getDuration },
        duration: { get: t._getDuration },
      });
    } catch (t) {}
    function s() {
      throw "MovieClipPlugin cannot be instantiated.";
    }
    (t.initialize = a),
      (t.isVisible = function () {
        return !!(
          this.visible &&
          0 < this.alpha &&
          0 != this.scaleX &&
          0 != this.scaleY
        );
      }),
      (t.draw = function (t, e) {
        return (
          this.DisplayObject_draw(t, e) ||
            (this._updateState(), this.Container_draw(t, e)),
          !0
        );
      }),
      (t.play = function () {
        this.paused = !1;
      }),
      (t.stop = function () {
        this.paused = !0;
      }),
      (t.gotoAndPlay = function (t) {
        (this.paused = !1), this._goto(t);
      }),
      (t.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (t.advance = function (t) {
        var e = a.INDEPENDENT;
        if (this.mode === e) {
          for (var i = this, s = i.framerate; (i = i.parent) && null === s; )
            i.mode === e && (s = i._framerate);
          if (((this._framerate = s), !this.paused)) {
            var r =
                null !== s && -1 !== s && null !== t
                  ? t / (1e3 / s) + this._t
                  : 1,
              n = 0 | r;
            for (this._t = r - n; n--; )
              this._updateTimeline(this._rawPosition + 1, !1);
          }
        }
      }),
      (t.clone = function () {
        throw "MovieClip cannot be cloned.";
      }),
      (t.toString = function () {
        return "[MovieClip (name=" + this.name + ")]";
      }),
      (t._updateState = function () {
        (-1 !== this._rawPosition && this.mode === a.INDEPENDENT) ||
          this._updateTimeline(-1);
      }),
      (t._tick = function (t) {
        this.advance(t && t.delta), this.Container__tick(t);
      }),
      (t._goto = function (t) {
        var e = this.timeline.resolve(t);
        null != e && ((this._t = 0), this._updateTimeline(e, !0));
      }),
      (t._reset = function () {
        (this._rawPosition = -1),
          (this._t = this.currentFrame = 0),
          (this.paused = !1);
      }),
      (t._updateTimeline = function (t, e) {
        var i = this.mode !== a.INDEPENDENT,
          s = this.timeline;
        i &&
          (t =
            this.startPosition +
            (this.mode === a.SINGLE_FRAME ? 0 : this._synchOffset)),
          t < 0 && (t = 0),
          (this._rawPosition === t && !i) ||
            ((this._rawPosition = t),
            (s.loop = this.loop),
            s.setPosition(
              t,
              i || !this.actionsEnabled,
              e,
              this._bound_resolveState
            ));
      }),
      (t._renderFirstFrame = function () {
        var t = this.timeline,
          e = t.rawPosition;
        t.setPosition(0, !0, !0, this._bound_resolveState), (t.rawPosition = e);
      }),
      (t._resolveState = function () {
        var t = this.timeline;
        for (var e in ((this.currentFrame = t.position), this._managed))
          this._managed[e] = 1;
        for (var i = t.tweens, s = 0, r = i.length; s < r; s++) {
          var n,
            a = i[s],
            o = a.target;
          o === this ||
            a.passive ||
            ((n = a._stepPosition),
            o instanceof createjs.DisplayObject
              ? this._addManagedChild(o, n)
              : this._setState(o.state, n));
        }
        for (var h = this.children, s = h.length - 1; 0 <= s; s--) {
          var c = h[s].id;
          1 === this._managed[c] &&
            (this.removeChildAt(s), delete this._managed[c]);
        }
      }),
      (t._setState = function (t, e) {
        if (t)
          for (var i = t.length - 1; 0 <= i; i--) {
            var s = t[i],
              r = s.t,
              n = s.p;
            for (var a in n) r[a] = n[a];
            this._addManagedChild(r, e);
          }
      }),
      (t._addManagedChild = function (t, e) {
        t._off ||
          (this.addChildAt(t, 0),
          t instanceof a &&
            ((t._synchOffset = e),
            t.mode === a.INDEPENDENT &&
              t.autoReset &&
              !this._managed[t.id] &&
              t._reset()),
          (this._managed[t.id] = 2));
      }),
      (t._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        return (
          i ||
            (this.frameBounds &&
              (i = this._rectangle.copy(this.frameBounds[this.currentFrame]))),
          i ? this._transformBounds(i, t, e) : this.Container__getBounds(t, e)
        );
      }),
      (createjs.MovieClip = createjs.promote(a, "Container")),
      (s.priority = 100),
      (s.ID = "MovieClip"),
      (s.install = function () {
        createjs.Tween._installPlugin(s);
      }),
      (s.init = function (t, e, i) {
        "startPosition" === e && t.target instanceof a && t._addPlugin(s);
      }),
      (s.step = function (t, e, i) {}),
      (s.change = function (t, e, i, s, r, n) {
        if ("startPosition" === i)
          return 1 === r ? e.props[i] : e.prev.props[i];
      });
  })(),
  (function () {
    "use strict";
    function S() {
      throw "SpriteSheetUtils cannot be instantiated";
    }
    var t = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    t.getContext &&
      ((S._workingCanvas = t),
      (S._workingContext = t.getContext("2d", { willReadFrequently: true })),
      (t.width = t.height = 1)),
      (S.extractFrame = function (t, e) {
        isNaN(e) && (e = t.getAnimation(e).frames[0]);
        var i = t.getFrame(e);
        if (!i) return null;
        var s = i.rect,
          r = S._workingCanvas;
        (r.width = s.width),
          (r.height = s.height),
          S._workingContext.drawImage(
            i.image,
            s.x,
            s.y,
            s.width,
            s.height,
            0,
            0,
            s.width,
            s.height
          );
        var n = document.createElement("img");
        return (n.src = r.toDataURL("image/png")), n;
      }),
      (S.addFlippedFrames = createjs.deprecate(
        null,
        "SpriteSheetUtils.addFlippedFrames"
      )),
      (S.mergeAlpha = createjs.deprecate(null, "SpriteSheetUtils.mergeAlpha")),
      (S._flip = function (t, e, i, s) {
        for (
          var r = t._images,
            n = S._workingCanvas,
            a = S._workingContext,
            o = r.length / e,
            h = 0;
          h < o;
          h++
        ) {
          var c = r[h];
          (c.__tmp = h),
            a.setTransform(1, 0, 0, 1, 0, 0),
            a.clearRect(0, 0, n.width + 1, n.height + 1),
            (n.width = c.width),
            (n.height = c.height),
            a.setTransform(
              i ? -1 : 1,
              0,
              0,
              s ? -1 : 1,
              i ? c.width : 0,
              s ? c.height : 0
            ),
            a.drawImage(c, 0, 0);
          var u = document.createElement("img");
          (u.src = n.toDataURL("image/png")),
            (u.width = c.width || c.naturalWidth),
            (u.height = c.height || c.naturalHeight),
            r.push(u);
        }
        for (var l = t._frames, d = l.length / e, h = 0; h < d; h++) {
          var _ = (c = l[h]).rect.clone(),
            p = {
              image: (u = r[c.image.__tmp + o * e]),
              rect: _,
              regX: c.regX,
              regY: c.regY,
            };
          i &&
            ((_.x = (u.width || u.naturalWidth) - _.x - _.width),
            (p.regX = _.width - c.regX)),
            s &&
              ((_.y = (u.height || u.naturalHeight) - _.y - _.height),
              (p.regY = _.height - c.regY)),
            l.push(p);
        }
        var f = "_" + (i ? "h" : "") + (s ? "v" : ""),
          g = t._animations,
          m = t._data,
          v = g.length / e;
        for (h = 0; h < v; h++) {
          var T = g[h],
            b = {
              name: T + f,
              speed: (c = m[T]).speed,
              next: c.next,
              frames: [],
            };
          c.next && (b.next += f);
          for (var E = 0, y = (l = c.frames).length; E < y; E++)
            b.frames.push(l[E] + d * e);
          (m[b.name] = b), g.push(b.name);
        }
      }),
      (createjs.SpriteSheetUtils = S);
  })(),
  (function () {
    "use strict";
    function E(t) {
      this.EventDispatcher_constructor(),
        (this.maxWidth = 2048),
        (this.maxHeight = 2048),
        (this.spriteSheet = null),
        (this.scale = 1),
        (this.padding = 1),
        (this.timeSlice = 0.3),
        (this.progress = -1),
        (this.framerate = t || 0),
        (this._frames = []),
        (this._animations = {}),
        (this._data = null),
        (this._nextFrameIndex = 0),
        (this._index = 0),
        (this._timerID = null),
        (this._scale = 1);
    }
    var t = createjs.extend(E, createjs.EventDispatcher);
    (E.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions"),
      (E.ERR_RUNNING = "a build is already running"),
      (t.addFrame = function (t, e, i, s, r) {
        if (this._data) throw E.ERR_RUNNING;
        var n = e || t.bounds || t.nominalBounds;
        return (
          !n && t.getBounds && (n = t.getBounds()),
          n
            ? ((i = i || 1),
              this._frames.push({
                source: t,
                sourceRect: n,
                scale: i,
                funct: s,
                data: r,
                index: this._frames.length,
                height: n.height * i,
              }) - 1)
            : null
        );
      }),
      (t.addAnimation = function (t, e, i, s) {
        if (this._data) throw E.ERR_RUNNING;
        this._animations[t] = { frames: e, next: i, speed: s };
      }),
      (t.addMovieClip = function (t, e, i, s, r, n) {
        if (this._data) throw E.ERR_RUNNING;
        var a = t.frameBounds,
          o = e || t.bounds || t.nominalBounds;
        if ((!o && t.getBounds && (o = t.getBounds()), o || a)) {
          for (
            var h, c = this._frames.length, u = t.timeline.duration, l = 0;
            l < u;
            l++
          ) {
            var d = a && a[l] ? a[l] : o;
            this.addFrame(t, d, i, this._setupMovieClipFrame, {
              i: l,
              f: s,
              d: r,
            });
          }
          var _ = t.timeline._labels,
            p = [];
          for (var f in _) p.push({ index: _[f], label: f });
          if (p.length)
            for (
              p.sort(function (t, e) {
                return t.index - e.index;
              }),
                l = 0,
                h = p.length;
              l < h;
              l++
            ) {
              for (
                var g = p[l].label,
                  m = c + p[l].index,
                  v = c + (l == h - 1 ? u : p[l + 1].index),
                  T = [],
                  b = m;
                b < v;
                b++
              )
                T.push(b);
              (n && !(g = n(g, t, m, v))) || this.addAnimation(g, T, !0);
            }
        }
      }),
      (t.build = function () {
        if (this._data) throw E.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); );
        return this._endBuild(), this.spriteSheet;
      }),
      (t.buildAsync = function (t) {
        if (this._data) throw E.ERR_RUNNING;
        (this.timeSlice = t), this._startBuild();
        var e = this;
        this._timerID = setTimeout(function () {
          e._run();
        }, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
      }),
      (t.stopAsync = function () {
        clearTimeout(this._timerID), (this._data = null);
      }),
      (t.clone = function () {
        throw "SpriteSheetBuilder cannot be cloned.";
      }),
      (t.toString = function () {
        return "[SpriteSheetBuilder]";
      }),
      (t._startBuild = function () {
        var t = this.padding || 0;
        (this.progress = 0),
          (this.spriteSheet = null),
          (this._index = 0),
          (this._scale = this.scale);
        var e = [];
        this._data = {
          images: [],
          frames: e,
          framerate: this.framerate,
          animations: this._animations,
        };
        var i = this._frames.slice();
        if (
          (i.sort(function (t, e) {
            return t.height <= e.height ? -1 : 1;
          }),
          i[i.length - 1].height + 2 * t > this.maxHeight)
        )
          throw E.ERR_DIMENSIONS;
        for (var s = 0, r = 0, n = 0; i.length; ) {
          var a,
            o = this._fillRow(i, s, n, e, t);
          o.w > r && (r = o.w),
            (s += o.h),
            (o.h && i.length) ||
              (((a = createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas")).width = this._getSize(
                r,
                this.maxWidth
              )),
              (a.height = this._getSize(s, this.maxHeight)),
              (this._data.images[n] = a),
              o.h || ((r = s = 0), n++));
        }
      }),
      (t._setupMovieClipFrame = function (t, e) {
        var i = t.actionsEnabled;
        (t.actionsEnabled = !1),
          t.gotoAndStop(e.i),
          (t.actionsEnabled = i),
          e.f && e.f(t, e.d, e.i);
      }),
      (t._getSize = function (t, e) {
        for (var i = 4; Math.pow(2, ++i) < t; );
        return Math.min(e, Math.pow(2, i));
      }),
      (t._fillRow = function (t, e, i, s, r) {
        for (
          var n = this.maxWidth,
            a = this.maxHeight - (e += r),
            o = r,
            h = 0,
            c = t.length - 1;
          0 <= c;
          c--
        ) {
          var u = t[c],
            l = this._scale * u.scale,
            d = u.sourceRect,
            _ = u.source,
            p = Math.floor(l * d.x - r),
            f = Math.floor(l * d.y - r),
            g = Math.ceil(l * d.height + 2 * r),
            m = Math.ceil(l * d.width + 2 * r);
          if (n < m) throw E.ERR_DIMENSIONS;
          a < g ||
            n < o + m ||
            ((u.img = i),
            (u.rect = new createjs.Rectangle(o, e, m, g)),
            (h = h || g),
            t.splice(c, 1),
            (s[u.index] = [
              o,
              e,
              m,
              g,
              i,
              Math.round(-p + l * _.regX - r),
              Math.round(-f + l * _.regY - r),
            ]),
            (o += m));
        }
        return { w: o, h: h };
      }),
      (t._endBuild = function () {
        (this.spriteSheet = new createjs.SpriteSheet(this._data)),
          (this._data = null),
          (this.progress = 1),
          this.dispatchEvent("complete");
      }),
      (t._run = function () {
        for (
          var t,
            e = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)),
            i = new Date().getTime() + e,
            s = !1;
          i > new Date().getTime();

        )
          if (!this._drawNext()) {
            s = !0;
            break;
          }
        s
          ? this._endBuild()
          : ((t = this)._timerID = setTimeout(function () {
              t._run();
            }, 50 - e));
        var r,
          n = (this.progress = this._index / this._frames.length);
        this.hasEventListener("progress") &&
          (((r = new createjs.Event("progress")).progress = n),
          this.dispatchEvent(r));
      }),
      (t._drawNext = function () {
        var t = this._frames[this._index],
          e = t.scale * this._scale,
          i = t.rect,
          s = t.sourceRect,
          r = this._data.images[t.img].getContext("2d", {
            willReadFrequently: true,
          });
        return (
          t.funct && t.funct(t.source, t.data),
          r.save(),
          r.beginPath(),
          r.rect(i.x, i.y, i.width, i.height),
          r.clip(),
          r.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)),
          r.scale(e, e),
          t.source.draw(r),
          r.restore(),
          ++this._index < this._frames.length
        );
      }),
      (createjs.SpriteSheetBuilder = createjs.promote(E, "EventDispatcher"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t && (t = document.getElementById(t)),
        (this.mouseEnabled = !1);
      var e = t.style;
      (e.position = "absolute"),
        (e.transformOrigin =
          e.WebkitTransformOrigin =
          e.msTransformOrigin =
          e.MozTransformOrigin =
          e.OTransformOrigin =
            "0% 0%"),
        (this.htmlElement = t),
        (this._oldProps = null),
        (this._oldStage = null),
        (this._drawAction = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.isVisible = function () {
      return null != this.htmlElement;
    }),
      (e.draw = function (t, e) {
        return !0;
      }),
      (e.cache = function () {}),
      (e.uncache = function () {}),
      (e.updateCache = function () {}),
      (e.hitTest = function () {}),
      (e.localToGlobal = function () {}),
      (e.globalToLocal = function () {}),
      (e.localToLocal = function () {}),
      (e.clone = function () {
        throw "DOMElement cannot be cloned.";
      }),
      (e.toString = function () {
        return "[DOMElement (name=" + this.name + ")]";
      }),
      (e._tick = function (t) {
        var e = this.stage;
        e &&
          e !== this._oldStage &&
          (this._drawAction && e.off("drawend", this._drawAction),
          (this._drawAction = e.on("drawend", this._handleDrawEnd, this)),
          (this._oldStage = e)),
          this.DisplayObject__tick(t);
      }),
      (e._handleDrawEnd = function (t) {
        var e,
          i,
          s,
          r,
          n,
          a,
          o,
          h,
          c = this.htmlElement;
        c &&
          ((e = c.style),
          (s = (i = this.getConcatenatedDisplayProps(this._props)).matrix),
          (r = i.visible ? "visible" : "hidden") != e.visibility &&
            (e.visibility = r),
          i.visible &&
            ((o = 1e4),
            ((a = (n = this._oldProps) && n.matrix) && a.equals(s)) ||
              ((h =
                "matrix(" +
                ((s.a * o) | 0) / o +
                "," +
                ((s.b * o) | 0) / o +
                "," +
                ((s.c * o) | 0) / o +
                "," +
                ((s.d * o) | 0) / o +
                "," +
                ((s.tx + 0.5) | 0)),
              (e.transform =
                e.WebkitTransform =
                e.OTransform =
                e.msTransform =
                  h + "," + ((s.ty + 0.5) | 0) + ")"),
              (e.MozTransform = h + "px," + ((s.ty + 0.5) | 0) + "px)"),
              (n =
                n ||
                (this._oldProps = new createjs.DisplayProps(
                  !0,
                  null
                ))).matrix.copy(s)),
            n.alpha != i.alpha &&
              ((e.opacity = "" + ((i.alpha * o) | 0) / o),
              (n.alpha = i.alpha))));
      }),
      (createjs.DOMElement = createjs.promote(t, "DisplayObject"));
  })(),
  (function () {
    "use strict";
    function t() {
      (this.usesContext = !1),
        (this._multiPass = null),
        (this.VTX_SHADER_BODY = null),
        (this.FRAG_SHADER_BODY = null);
    }
    var e = t.prototype;
    (e.getBounds = function (t) {
      return t;
    }),
      (e.shaderParamSetup = function (t, e, i) {}),
      (e.applyFilter = function (t, e, i, s, r, n, a, o) {
        (n = n || t), null == a && (a = e), null == o && (o = i);
        try {
          var h = t.getImageData(e, i, s, r);
        } catch (t) {
          return !1;
        }
        return !!this._applyFilter(h) && (n.putImageData(h, a, o), !0);
      }),
      (e.toString = function () {
        return "[Filter]";
      }),
      (e.clone = function () {
        return new t();
      }),
      (e._applyFilter = function (t) {
        return !0;
      }),
      (createjs.Filter = t);
  })(),
  (function () {
    "use strict";
    function s() {
      (this.width = void 0),
        (this.height = void 0),
        (this.x = void 0),
        (this.y = void 0),
        (this.scale = 1),
        (this.offX = 0),
        (this.offY = 0),
        (this.cacheID = 0),
        (this._filterOffX = 0),
        (this._filterOffY = 0),
        (this._cacheDataURLID = 0),
        (this._cacheDataURL = null),
        (this._drawWidth = 0),
        (this._drawHeight = 0);
    }
    var t = s.prototype;
    (s.getFilterBounds = function (t, e) {
      e = e || new createjs.Rectangle();
      var i = t.filters,
        s = i && i.length;
      if (!!s <= 0) return e;
      for (var r = 0; r < s; r++) {
        var n,
          a = i[r];
        a &&
          a.getBounds &&
          (n = a.getBounds()) &&
          (0 == r
            ? e.setValues(n.x, n.y, n.width, n.height)
            : e.extend(n.x, n.y, n.width, n.height));
      }
      return e;
    }),
      (t.toString = function () {
        return "[BitmapCache]";
      }),
      (t.define = function (t, e, i, s, r, n, a) {
        if (!t) throw "No symbol to cache";
        (this._options = a),
          (this.target = t),
          (this.width = 1 <= s ? s : 1),
          (this.height = 1 <= r ? r : 1),
          (this.x = e || 0),
          (this.y = i || 0),
          (this.scale = n || 1),
          this.update();
      }),
      (t.update = function (t) {
        if (!this.target) throw "define() must be called before update()";
        var e = s.getFilterBounds(this.target),
          i = this.target.cacheCanvas;
        (this._drawWidth = Math.ceil(this.width * this.scale) + e.width),
          (this._drawHeight = Math.ceil(this.height * this.scale) + e.height),
          (i && this._drawWidth == i.width && this._drawHeight == i.height) ||
            this._updateSurface(),
          (this._filterOffX = e.x),
          (this._filterOffY = e.y),
          (this.offX = this.x * this.scale + this._filterOffX),
          (this.offY = this.y * this.scale + this._filterOffY),
          this._drawToCache(t),
          (this.cacheID = this.cacheID ? this.cacheID + 1 : 1);
      }),
      (t.release = function () {
        var t;
        this._webGLCache
          ? (this._webGLCache.isCacheControlled ||
              (this.__lastRT && (this.__lastRT = void 0),
              this.__rtA && this._webGLCache._killTextureObject(this.__rtA),
              this.__rtB && this._webGLCache._killTextureObject(this.__rtB),
              this.target &&
                this.target.cacheCanvas &&
                this._webGLCache._killTextureObject(this.target.cacheCanvas)),
            (this._webGLCache = !1))
          : (t = this.target.stage) instanceof createjs.StageGL &&
            t.releaseTexture(this.target.cacheCanvas),
          (this.target = this.target.cacheCanvas = null),
          (this.cacheID = this._cacheDataURLID = this._cacheDataURL = void 0),
          (this.width =
            this.height =
            this.x =
            this.y =
            this.offX =
            this.offY =
              0),
          (this.scale = 1);
      }),
      (t.getCacheDataURL = function () {
        var t = this.target && this.target.cacheCanvas;
        return t
          ? (this.cacheID != this._cacheDataURLID &&
              ((this._cacheDataURLID = this.cacheID),
              (this._cacheDataURL = t.toDataURL ? t.toDataURL() : null)),
            this._cacheDataURL)
          : null;
      }),
      (t.draw = function (t) {
        return (
          !!this.target &&
          (t.drawImage(
            this.target.cacheCanvas,
            this.x + this._filterOffX / this.scale,
            this.y + this._filterOffY / this.scale,
            this._drawWidth / this.scale,
            this._drawHeight / this.scale
          ),
          !0)
        );
      }),
      (t._updateSurface = function () {
        if (!this._options || !this._options.useGL)
          return (
            ((e =
              (e = this.target.cacheCanvas) ||
              (this.target.cacheCanvas = createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas"))).width = this._drawWidth),
            void (e.height = this._drawHeight)
          );
        if (!this._webGLCache)
          if ("stage" === this._options.useGL) {
            if (!this.target.stage || !this.target.stage.isWebGL) {
              var t =
                "Cannot use 'stage' for cache because the object's parent stage is ";
              throw (t += this.target.stage
                ? "non WebGL."
                : "not set, please addChild to the correct stage.");
            }
            (this.target.cacheCanvas = !0),
              (this._webGLCache = this.target.stage);
          } else if ("new" === this._options.useGL)
            (this.target.cacheCanvas = document.createElement("canvas")),
              (this._webGLCache = new createjs.StageGL(
                this.target.cacheCanvas,
                { antialias: !0, transparent: !0, autoPurge: -1 }
              )),
              (this._webGLCache.isCacheControlled = !0);
          else {
            if (!(this._options.useGL instanceof createjs.StageGL))
              throw (
                "Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got " +
                this._options.useGL
              );
            (this.target.cacheCanvas = !0),
              (this._webGLCache = this._options.useGL),
              (this._webGLCache.isCacheControlled = !0);
          }
        var e = this.target.cacheCanvas,
          i = this._webGLCache;
        i.isCacheControlled &&
          ((e.width = this._drawWidth),
          (e.height = this._drawHeight),
          i.updateViewport(this._drawWidth, this._drawHeight)),
          this.target.filters
            ? (i.getTargetRenderTexture(
                this.target,
                this._drawWidth,
                this._drawHeight
              ),
              i.getTargetRenderTexture(
                this.target,
                this._drawWidth,
                this._drawHeight
              ))
            : i.isCacheControlled ||
              i.getTargetRenderTexture(
                this.target,
                this._drawWidth,
                this._drawHeight
              );
      }),
      (t._drawToCache = function (t) {
        var e,
          i = this.target.cacheCanvas,
          s = this.target,
          r = this._webGLCache;
        r
          ? (r.cacheDraw(s, s.filters, this),
            ((i = this.target.cacheCanvas).width = this._drawWidth),
            (i.height = this._drawHeight))
          : ((e = i.getContext("2d", { willReadFrequently: true })),
            t || e.clearRect(0, 0, this._drawWidth + 1, this._drawHeight + 1),
            e.save(),
            (e.globalCompositeOperation = t),
            e.setTransform(
              this.scale,
              0,
              0,
              this.scale,
              -this._filterOffX,
              -this._filterOffY
            ),
            e.translate(-this.x, -this.y),
            s.draw(e, !0),
            e.restore(),
            s.filters && s.filters.length && this._applyFilters(e)),
          (i._invalid = !0);
      }),
      (t._applyFilters = function (t) {
        for (
          var e,
            i = this.target.filters,
            s = this._drawWidth,
            r = this._drawHeight,
            n = 0,
            a = i[n];
          a.usesContext
            ? (e && (t.putImageData(e, 0, 0), (e = null)),
              a.applyFilter(t, 0, 0, s, r))
            : ((e = e || t.getImageData(0, 0, s, r)), a._applyFilter(e)),
            (a = null !== a._multiPass ? a._multiPass : i[++n]);

        );
        e && t.putImageData(e, 0, 0);
      }),
      (createjs.BitmapCache = s);
  })(),
  (function () {
    "use strict";
    function B(t, e, i) {
      this.Filter_constructor(),
        (this._blurX = t),
        (this._blurXTable = []),
        (this._lastBlurX = null),
        (this._blurY = e),
        (this._blurYTable = []),
        (this._lastBlurY = null),
        this._quality,
        (this._lastQuality = null),
        (this.FRAG_SHADER_TEMPLATE =
          "uniform float xWeight[{{blurX}}];uniform float yWeight[{{blurY}}];uniform vec2 textureOffset;void main(void) {vec4 color = vec4(0.0);float xAdj = ({{blurX}}.0-1.0)/2.0;float yAdj = ({{blurY}}.0-1.0)/2.0;vec2 sampleOffset;for(int i=0; i<{{blurX}}; i++) {for(int j=0; j<{{blurY}}; j++) {sampleOffset = vRenderCoord + (textureOffset * vec2(float(i)-xAdj, float(j)-yAdj));color += texture2D(uSampler, sampleOffset) * (xWeight[i] * yWeight[j]);}}gl_FragColor = color.rgba;}"),
        (isNaN(i) || i < 1) && (i = 1),
        this.setQuality(0 | i);
    }
    var t = createjs.extend(B, createjs.Filter);
    (t.getBlurX = function () {
      return this._blurX;
    }),
      (t.getBlurY = function () {
        return this._blurY;
      }),
      (t.setBlurX = function (t) {
        (isNaN(t) || t < 0) && (t = 0), (this._blurX = t);
      }),
      (t.setBlurY = function (t) {
        (isNaN(t) || t < 0) && (t = 0), (this._blurY = t);
      }),
      (t.getQuality = function () {
        return this._quality;
      }),
      (t.setQuality = function (t) {
        (isNaN(t) || t < 0) && (t = 0), (this._quality = 0 | t);
      }),
      (t._getShader = function () {
        var t = this._lastBlurX !== this._blurX,
          e = this._lastBlurY !== this._blurY,
          i = this._lastQuality !== this._quality;
        return t || e || i
          ? ((t || i) &&
              (this._blurXTable = this._getTable(this._blurX * this._quality)),
            (e || i) &&
              (this._blurYTable = this._getTable(this._blurY * this._quality)),
            this._updateShader(),
            (this._lastBlurX = this._blurX),
            (this._lastBlurY = this._blurY),
            void (this._lastQuality = this._quality))
          : this._compiledShader;
      }),
      (t._setShader = function () {
        this._compiledShader;
      });
    try {
      Object.defineProperties(t, {
        blurX: { get: t.getBlurX, set: t.setBlurX },
        blurY: { get: t.getBlurY, set: t.setBlurY },
        quality: { get: t.getQuality, set: t.setQuality },
        _builtShader: { get: t._getShader, set: t._setShader },
      });
    } catch (t) {
      console.log(t);
    }
    (t._getTable = function (t) {
      if (t <= 1) return [1];
      for (
        var e = [],
          i = Math.ceil(2 * t),
          s = ((i += i % 2 ? 0 : 1) / 2) | 0,
          r = -s;
        r <= s;
        r++
      ) {
        var n = (r / s) * 4.2;
        e.push(
          (1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, -Math.pow(n, 2) / 4)
        );
      }
      var a = e.reduce(function (t, e) {
        return t + e;
      });
      return e.map(function (t, e, i) {
        return t / a;
      });
    }),
      (t._updateShader = function () {
        var t;
        void 0 !== this._blurX &&
          void 0 !== this._blurY &&
          ((t = (t = (t = this.FRAG_SHADER_TEMPLATE).replace(
            /\{\{blurX\}\}/g,
            this._blurXTable.length.toFixed(0)
          )).replace(/\{\{blurY\}\}/g, this._blurYTable.length.toFixed(0))),
          (this.FRAG_SHADER_BODY = t));
      }),
      (t.shaderParamSetup = function (t, e, i) {
        t.uniform1fv(t.getUniformLocation(i, "xWeight"), this._blurXTable),
          t.uniform1fv(t.getUniformLocation(i, "yWeight"), this._blurYTable),
          t.uniform2f(
            t.getUniformLocation(i, "textureOffset"),
            2 / (e._viewportWidth * this._quality),
            2 / (e._viewportHeight * this._quality)
          );
      }),
      (B.MUL_TABLE = [
        1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265,
        497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269,
        261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369,
        361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69,
        271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446,
        55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371,
        367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317,
        157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277,
        275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491,
        61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221,
        439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202,
        401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185,
        23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341,
        339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79,
        315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295,
        147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69,
        275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130,
        259, 129, 257, 1,
      ]),
      (B.SHG_TABLE = [
        0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14,
        14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15,
        15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15,
        12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14,
        16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16,
        16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16,
        14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16,
        15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
        17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16,
        17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15,
        16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17,
        17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17,
        16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14,
        17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16,
        17, 16, 17, 9,
      ]),
      (t.getBounds = function (t) {
        var e = 0 | this.blurX,
          i = 0 | this.blurY;
        if (e <= 0 && i <= 0) return t;
        var s = Math.pow(this.quality, 0.2);
        return (t || new createjs.Rectangle()).pad(
          i * s + 1,
          e * s + 1,
          i * s + 1,
          e * s + 1
        );
      }),
      (t.clone = function () {
        return new B(this.blurX, this.blurY, this.quality);
      }),
      (t.toString = function () {
        return "[BlurFilter]";
      }),
      (t._applyFilter = function (t) {
        var e = this._blurX >> 1;
        if (isNaN(e) || e < 0) return !1;
        var i = this._blurY >> 1;
        if (isNaN(i) || i < 0) return !1;
        if (0 == e && 0 == i) return !1;
        var s = this.quality;
        (isNaN(s) || s < 1) && (s = 1),
          3 < (s |= 0) && (s = 3),
          s < 1 && (s = 1);
        for (
          var r = t.data,
            n = 0,
            a = 0,
            o = 0,
            h = 0,
            c = 0,
            u = 0,
            l = 0,
            d = 0,
            _ = 0,
            p = 0,
            f = 0,
            g = 0,
            m = 0,
            v = 0,
            T = 0,
            b = (e + e + 1) | 0,
            E = (i + i + 1) | 0,
            y = 0 | t.width,
            S = 0 | t.height,
            x = (y - 1) | 0,
            w = (S - 1) | 0,
            R = (1 + e) | 0,
            A = (1 + i) | 0,
            P = { r: 0, b: 0, g: 0, a: 0 },
            L = P,
            o = 1;
          o < b;
          o++
        )
          L = L.n = { r: 0, b: 0, g: 0, a: 0 };
        L.n = P;
        var j = { r: 0, b: 0, g: 0, a: 0 },
          C = j;
        for (o = 1; o < E; o++) C = C.n = { r: 0, b: 0, g: 0, a: 0 };
        C.n = j;
        for (
          var I = null,
            D = 0 | B.MUL_TABLE[e],
            M = 0 | B.SHG_TABLE[e],
            O = 0 | B.MUL_TABLE[i],
            F = 0 | B.SHG_TABLE[i];
          0 < s--;

        ) {
          l = u = 0;
          for (var N = D, k = M, a = S; -1 < --a; ) {
            for (
              d = R * (g = r[0 | u]),
                _ = R * (m = r[(u + 1) | 0]),
                p = R * (v = r[(u + 2) | 0]),
                f = R * (T = r[(u + 3) | 0]),
                L = P,
                o = R;
              -1 < --o;

            )
              (L.r = g), (L.g = m), (L.b = v), (L.a = T), (L = L.n);
            for (o = 1; o < R; o++)
              (h = (u + ((x < o ? x : o) << 2)) | 0),
                (d += L.r = r[h]),
                (_ += L.g = r[h + 1]),
                (p += L.b = r[h + 2]),
                (f += L.a = r[h + 3]),
                (L = L.n);
            for (I = P, n = 0; n < y; n++)
              (r[u++] = (d * N) >>> k),
                (r[u++] = (_ * N) >>> k),
                (r[u++] = (p * N) >>> k),
                (r[u++] = (f * N) >>> k),
                (h = (l + ((h = n + e + 1) < x ? h : x)) << 2),
                (d -= I.r - (I.r = r[h])),
                (_ -= I.g - (I.g = r[h + 1])),
                (p -= I.b - (I.b = r[h + 2])),
                (f -= I.a - (I.a = r[h + 3])),
                (I = I.n);
            l += y;
          }
          for (N = O, k = F, n = 0; n < y; n++) {
            for (
              d = (A * (g = r[(u = (n << 2) | 0)])) | 0,
                _ = (A * (m = r[(u + 1) | 0])) | 0,
                p = (A * (v = r[(u + 2) | 0])) | 0,
                f = (A * (T = r[(u + 3) | 0])) | 0,
                C = j,
                o = 0;
              o < A;
              o++
            )
              (C.r = g), (C.g = m), (C.b = v), (C.a = T), (C = C.n);
            for (c = y, o = 1; o <= i; o++)
              (u = (c + n) << 2),
                (d += C.r = r[u]),
                (_ += C.g = r[u + 1]),
                (p += C.b = r[u + 2]),
                (f += C.a = r[u + 3]),
                (C = C.n),
                o < w && (c += y);
            if (((u = n), (I = j), 0 < s))
              for (a = 0; a < S; a++)
                (r[(h = u << 2) + 3] = T = (f * N) >>> k),
                  0 < T
                    ? ((r[h] = (d * N) >>> k),
                      (r[h + 1] = (_ * N) >>> k),
                      (r[h + 2] = (p * N) >>> k))
                    : (r[h] = r[h + 1] = r[h + 2] = 0),
                  (h = (n + ((h = a + A) < w ? h : w) * y) << 2),
                  (d -= I.r - (I.r = r[h])),
                  (_ -= I.g - (I.g = r[h + 1])),
                  (p -= I.b - (I.b = r[h + 2])),
                  (f -= I.a - (I.a = r[h + 3])),
                  (I = I.n),
                  (u += y);
            else
              for (a = 0; a < S; a++)
                (r[(h = u << 2) + 3] = T = (f * N) >>> k),
                  0 < T
                    ? ((T = 255 / T),
                      (r[h] = ((d * N) >>> k) * T),
                      (r[h + 1] = ((_ * N) >>> k) * T),
                      (r[h + 2] = ((p * N) >>> k) * T))
                    : (r[h] = r[h + 1] = r[h + 2] = 0),
                  (h = (n + ((h = a + A) < w ? h : w) * y) << 2),
                  (d -= I.r - (I.r = r[h])),
                  (_ -= I.g - (I.g = r[h + 1])),
                  (p -= I.b - (I.b = r[h + 2])),
                  (f -= I.a - (I.a = r[h + 3])),
                  (I = I.n),
                  (u += y);
          }
        }
        return !0;
      }),
      (createjs.BlurFilter = createjs.promote(B, "Filter"));
  })(),
  (function () {
    "use strict";
    function e(t) {
      this.Filter_constructor(),
        (this.alphaMap = t),
        (this._alphaMap = null),
        (this._mapData = null),
        (this._mapTexture = null),
        (this.FRAG_SHADER_BODY =
          "uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * (alphaMap.r * ceil(alphaMap.a)));}");
    }
    var t = createjs.extend(e, createjs.Filter);
    (t.shaderParamSetup = function (t, e, i) {
      this._mapTexture || (this._mapTexture = t.createTexture()),
        t.activeTexture(t.TEXTURE1),
        t.bindTexture(t.TEXTURE_2D, this._mapTexture),
        e.setTextureParams(t),
        t.texImage2D(
          t.TEXTURE_2D,
          0,
          t.RGBA,
          t.RGBA,
          t.UNSIGNED_BYTE,
          this.alphaMap
        ),
        t.uniform1i(t.getUniformLocation(i, "uAlphaSampler"), 1);
    }),
      (t.clone = function () {
        var t = new e(this.alphaMap);
        return (t._alphaMap = this._alphaMap), (t._mapData = this._mapData), t;
      }),
      (t.toString = function () {
        return "[AlphaMapFilter]";
      }),
      (t._applyFilter = function (t) {
        if (!this.alphaMap) return !0;
        if (!this._prepAlphaMap()) return !1;
        for (
          var e = t.data, i = this._mapData, s = 0, r = e.length;
          s < r;
          s += 4
        )
          e[s + 3] = i[s] || 0;
        return !0;
      }),
      (t._prepAlphaMap = function () {
        if (!this.alphaMap) return !1;
        if (this.alphaMap == this._alphaMap && this._mapData) return !0;
        this._mapData = null;
        var t,
          e = (this._alphaMap = this.alphaMap),
          i = e;
        e instanceof HTMLCanvasElement
          ? (t = i.getContext("2d", { willReadFrequently: true }))
          : (((i = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")).width = e.width),
            (i.height = e.height),
            (t = i.getContext("2d", { willReadFrequently: true })).drawImage(
              e,
              0,
              0
            ));
        try {
          var s = t.getImageData(0, 0, e.width, e.height);
        } catch (t) {
          return !1;
        }
        return (this._mapData = s.data), !0;
      }),
      (createjs.AlphaMapFilter = createjs.promote(e, "Filter"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.Filter_constructor(),
        (this.mask = t),
        (this.usesContext = !0),
        (this.FRAG_SHADER_BODY =
          "uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * alphaMap.a);}");
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.shaderParamSetup = function (t, e, i) {
      this._mapTexture || (this._mapTexture = t.createTexture()),
        t.activeTexture(t.TEXTURE1),
        t.bindTexture(t.TEXTURE_2D, this._mapTexture),
        e.setTextureParams(t),
        t.texImage2D(
          t.TEXTURE_2D,
          0,
          t.RGBA,
          t.RGBA,
          t.UNSIGNED_BYTE,
          this.mask
        ),
        t.uniform1i(t.getUniformLocation(i, "uAlphaSampler"), 1);
    }),
      (e.applyFilter = function (t, e, i, s, r, n, a, o) {
        return (
          !this.mask ||
          (null == a && (a = e),
          null == o && (o = i),
          (n = n || t).save(),
          t == n &&
            ((n.globalCompositeOperation = "destination-in"),
            n.drawImage(this.mask, a, o),
            n.restore(),
            !0))
        );
      }),
      (e.clone = function () {
        return new t(this.mask);
      }),
      (e.toString = function () {
        return "[AlphaMaskFilter]";
      }),
      (createjs.AlphaMaskFilter = createjs.promote(t, "Filter"));
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s, r, n, a, o) {
      this.Filter_constructor(),
        (this.redMultiplier = null != t ? t : 1),
        (this.greenMultiplier = null != e ? e : 1),
        (this.blueMultiplier = null != i ? i : 1),
        (this.alphaMultiplier = null != s ? s : 1),
        (this.redOffset = r || 0),
        (this.greenOffset = n || 0),
        (this.blueOffset = a || 0),
        (this.alphaOffset = o || 0),
        (this.FRAG_SHADER_BODY =
          "uniform vec4 uColorMultiplier;uniform vec4 uColorOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = (color * uColorMultiplier) + uColorOffset;}");
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.shaderParamSetup = function (t, e, i) {
      t.uniform4f(
        t.getUniformLocation(i, "uColorMultiplier"),
        this.redMultiplier,
        this.greenMultiplier,
        this.blueMultiplier,
        this.alphaMultiplier
      ),
        t.uniform4f(
          t.getUniformLocation(i, "uColorOffset"),
          this.redOffset / 255,
          this.greenOffset / 255,
          this.blueOffset / 255,
          this.alphaOffset / 255
        );
    }),
      (e.toString = function () {
        return "[ColorFilter]";
      }),
      (e.clone = function () {
        return new t(
          this.redMultiplier,
          this.greenMultiplier,
          this.blueMultiplier,
          this.alphaMultiplier,
          this.redOffset,
          this.greenOffset,
          this.blueOffset,
          this.alphaOffset
        );
      }),
      (e._applyFilter = function (t) {
        for (var e = t.data, i = e.length, s = 0; s < i; s += 4)
          (e[s] = e[s] * this.redMultiplier + this.redOffset),
            (e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset),
            (e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset),
            (e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset);
        return !0;
      }),
      (createjs.ColorFilter = createjs.promote(t, "Filter"));
  })(),
  (function () {
    "use strict";
    function s(t, e, i, s) {
      this.setColor(t, e, i, s);
    }
    var t = s.prototype;
    (s.DELTA_INDEX = [
      0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15,
      0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32,
      0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59,
      0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95,
      0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66,
      1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87,
      3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5,
      7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
    ]),
      (s.LENGTH = (s.IDENTITY_MATRIX = [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1,
      ]).length),
      (t.setColor = function (t, e, i, s) {
        return this.reset().adjustColor(t, e, i, s);
      }),
      (t.reset = function () {
        return this.copy(s.IDENTITY_MATRIX);
      }),
      (t.adjustColor = function (t, e, i, s) {
        return (
          this.adjustHue(s),
          this.adjustContrast(e),
          this.adjustBrightness(t),
          this.adjustSaturation(i)
        );
      }),
      (t.adjustBrightness = function (t) {
        return (
          0 == t ||
            isNaN(t) ||
            ((t = this._cleanValue(t, 255)),
            this._multiplyMatrix([
              1,
              0,
              0,
              0,
              t,
              0,
              1,
              0,
              0,
              t,
              0,
              0,
              1,
              0,
              t,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ])),
          this
        );
      }),
      (t.adjustContrast = function (t) {
        return (
          0 == t ||
            isNaN(t) ||
            ((e =
              (t = this._cleanValue(t, 100)) < 0
                ? 127 + (t / 100) * 127
                : 127 *
                    (e =
                      0 == (e = t % 1)
                        ? s.DELTA_INDEX[t]
                        : s.DELTA_INDEX[t << 0] * (1 - e) +
                          s.DELTA_INDEX[1 + (t << 0)] * e) +
                  127),
            this._multiplyMatrix([
              e / 127,
              0,
              0,
              0,
              0.5 * (127 - e),
              0,
              e / 127,
              0,
              0,
              0.5 * (127 - e),
              0,
              0,
              e / 127,
              0,
              0.5 * (127 - e),
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ])),
          this
        );
        var e;
      }),
      (t.adjustSaturation = function (t) {
        if (0 == t || isNaN(t)) return this;
        var e =
          1 + (0 < (t = this._cleanValue(t, 100)) ? (3 * t) / 100 : t / 100);
        return (
          this._multiplyMatrix([
            0.3086 * (1 - e) + e,
            0.6094 * (1 - e),
            0.082 * (1 - e),
            0,
            0,
            0.3086 * (1 - e),
            0.6094 * (1 - e) + e,
            0.082 * (1 - e),
            0,
            0,
            0.3086 * (1 - e),
            0.6094 * (1 - e),
            0.082 * (1 - e) + e,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (t.adjustHue = function (t) {
        if (0 == t || isNaN(t)) return this;
        t = (this._cleanValue(t, 180) / 180) * Math.PI;
        var e = Math.cos(t),
          i = Math.sin(t),
          s = 0.213,
          r = 0.715,
          n = 0.072;
        return (
          this._multiplyMatrix([
            s + 0.787 * e + i * -s,
            r + e * -r + i * -r,
            n + e * -n + 0.928 * i,
            0,
            0,
            s + e * -s + 0.143 * i,
            r + e * (1 - r) + 0.14 * i,
            n + e * -n + -0.283 * i,
            0,
            0,
            s + e * -s + -0.787 * i,
            r + e * -r + i * r,
            n + 0.928 * e + i * n,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (t.concat = function (t) {
        return (
          (t = this._fixMatrix(t)).length != s.LENGTH ||
            this._multiplyMatrix(t),
          this
        );
      }),
      (t.clone = function () {
        return new s().copy(this);
      }),
      (t.toArray = function () {
        for (var t = [], e = 0, i = s.LENGTH; e < i; e++) t[e] = this[e];
        return t;
      }),
      (t.copy = function (t) {
        for (var e = s.LENGTH, i = 0; i < e; i++) this[i] = t[i];
        return this;
      }),
      (t.toString = function () {
        return "[ColorMatrix]";
      }),
      (t._multiplyMatrix = function (t) {
        for (var e, i = [], s = 0; s < 5; s++) {
          for (e = 0; e < 5; e++) i[e] = this[e + 5 * s];
          for (e = 0; e < 5; e++) {
            for (var r = 0, n = 0; n < 5; n++) r += t[e + 5 * n] * i[n];
            this[e + 5 * s] = r;
          }
        }
      }),
      (t._cleanValue = function (t, e) {
        return Math.min(e, Math.max(-e, t));
      }),
      (t._fixMatrix = function (t) {
        return (
          t instanceof s && (t = t.toArray()),
          t.length < s.LENGTH
            ? (t = t
                .slice(0, t.length)
                .concat(s.IDENTITY_MATRIX.slice(t.length, s.LENGTH)))
            : t.length > s.LENGTH && (t = t.slice(0, s.LENGTH)),
          t
        );
      }),
      (createjs.ColorMatrix = s);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.Filter_constructor(),
        (this.matrix = t),
        (this.FRAG_SHADER_BODY =
          "uniform mat4 uColorMatrix;uniform vec4 uColorMatrixOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);mat4 m = uColorMatrix;vec4 newColor = vec4(0,0,0,0);newColor.r = color.r*m[0][0] + color.g*m[0][1] + color.b*m[0][2] + color.a*m[0][3];newColor.g = color.r*m[1][0] + color.g*m[1][1] + color.b*m[1][2] + color.a*m[1][3];newColor.b = color.r*m[2][0] + color.g*m[2][1] + color.b*m[2][2] + color.a*m[2][3];newColor.a = color.r*m[3][0] + color.g*m[3][1] + color.b*m[3][2] + color.a*m[3][3];gl_FragColor = newColor + uColorMatrixOffset;}");
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.shaderParamSetup = function (t, e, i) {
      var s = this.matrix,
        r = new Float32Array([
          s[0],
          s[1],
          s[2],
          s[3],
          s[5],
          s[6],
          s[7],
          s[8],
          s[10],
          s[11],
          s[12],
          s[13],
          s[15],
          s[16],
          s[17],
          s[18],
        ]);
      t.uniformMatrix4fv(t.getUniformLocation(i, "uColorMatrix"), !1, r),
        t.uniform4f(
          t.getUniformLocation(i, "uColorMatrixOffset"),
          s[4] / 255,
          s[9] / 255,
          s[14] / 255,
          s[19] / 255
        );
    }),
      (e.toString = function () {
        return "[ColorMatrixFilter]";
      }),
      (e.clone = function () {
        return new t(this.matrix);
      }),
      (e._applyFilter = function (t) {
        for (
          var e,
            i,
            s,
            r,
            n = t.data,
            a = n.length,
            o = this.matrix,
            h = o[0],
            c = o[1],
            u = o[2],
            l = o[3],
            d = o[4],
            _ = o[5],
            p = o[6],
            f = o[7],
            g = o[8],
            m = o[9],
            v = o[10],
            T = o[11],
            b = o[12],
            E = o[13],
            y = o[14],
            S = o[15],
            x = o[16],
            w = o[17],
            R = o[18],
            A = o[19],
            P = 0;
          P < a;
          P += 4
        )
          (e = n[P]),
            (i = n[P + 1]),
            (s = n[P + 2]),
            (r = n[P + 3]),
            (n[P] = e * h + i * c + s * u + r * l + d),
            (n[P + 1] = e * _ + i * p + s * f + r * g + m),
            (n[P + 2] = e * v + i * T + s * b + r * E + y),
            (n[P + 3] = e * S + i * x + s * w + r * R + A);
        return !0;
      }),
      (createjs.ColorMatrixFilter = createjs.promote(t, "Filter"));
  })(),
  (function () {
    "use strict";
    function s() {
      throw "Touch cannot be instantiated";
    }
    (s.isSupported = function () {
      return !!(
        "ontouchstart" in window ||
        (window.MSPointerEvent && 0 < window.navigator.msMaxTouchPoints) ||
        (window.PointerEvent && 0 < window.navigator.maxTouchPoints)
      );
    }),
      (s.enable = function (t, e, i) {
        return (
          !!(t && t.canvas && s.isSupported()) &&
          (t.__touch ||
            ((t.__touch = {
              pointers: {},
              multitouch: !e,
              preventDefault: !i,
              count: 0,
            }),
            "ontouchstart" in window
              ? s._IOS_enable(t)
              : (window.PointerEvent || window.MSPointerEvent) &&
                s._IE_enable(t)),
          !0)
        );
      }),
      (s.disable = function (t) {
        t &&
          ("ontouchstart" in window
            ? s._IOS_disable(t)
            : (window.PointerEvent || window.MSPointerEvent) &&
              s._IE_disable(t),
          delete t.__touch);
      }),
      (s._IOS_enable = function (e) {
        var t = e.canvas,
          i = (e.__touch.f = function (t) {
            s._IOS_handleEvent(e, t);
          });
        t.addEventListener("touchstart", i, !1),
          t.addEventListener("touchmove", i, !1),
          t.addEventListener("touchend", i, !1),
          t.addEventListener("touchcancel", i, !1);
      }),
      (s._IOS_disable = function (t) {
        var e,
          i = t.canvas;
        i &&
          ((e = t.__touch.f),
          i.removeEventListener("touchstart", e, !1),
          i.removeEventListener("touchmove", e, !1),
          i.removeEventListener("touchend", e, !1),
          i.removeEventListener("touchcancel", e, !1));
      }),
      (s._IOS_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          for (
            var i = e.changedTouches, s = e.type, r = 0, n = i.length;
            r < n;
            r++
          ) {
            var a = i[r],
              o = a.identifier;
            a.target == t.canvas &&
              ("touchstart" === s
                ? this._handleStart(t, o, e, a.pageX, a.pageY)
                : "touchmove" === s
                ? this._handleMove(t, o, e, a.pageX, a.pageY)
                : ("touchend" !== s && "touchcancel" !== s) ||
                  this._handleEnd(t, o, e));
          }
        }
      }),
      (s._IE_enable = function (e) {
        var t = e.canvas,
          i = (e.__touch.f = function (t) {
            s._IE_handleEvent(e, t);
          });
        (t.style["-webkit-tap-highlight-color"] = "transparent"),
          void 0 === window.PointerEvent
            ? (t.addEventListener("MSPointerDown", i, !1),
              window.addEventListener("MSPointerMove", i, !1),
              window.addEventListener("MSPointerUp", i, !1),
              window.addEventListener("MSPointerCancel", i, !1),
              e.__touch.preventDefault && (t.style.msTouchAction = "none"))
            : (t.addEventListener("pointerdown", i, !1),
              window.addEventListener("pointermove", i, !1),
              window.addEventListener("pointerup", i, !1),
              window.addEventListener("pointercancel", i, !1),
              e.__touch.preventDefault && (t.style.touchAction = "none")),
          (e.__touch.activeIDs = {});
      }),
      (s._IE_disable = function (t) {
        var e = t.__touch.f;
        void 0 === window.PointerEvent
          ? (window.removeEventListener("MSPointerMove", e, !1),
            window.removeEventListener("MSPointerUp", e, !1),
            window.removeEventListener("MSPointerCancel", e, !1),
            t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1))
          : (window.removeEventListener("pointermove", e, !1),
            window.removeEventListener("pointerup", e, !1),
            window.removeEventListener("pointercancel", e, !1),
            t.canvas && t.canvas.removeEventListener("pointerdown", e, !1));
      }),
      (s._IE_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          var i = e.type,
            s = e.pointerId,
            r = t.__touch.activeIDs;
          if ("MSPointerDown" === i || "pointerdown" === i) {
            if (e.srcElement != t.canvas) return;
            switch (
              ((r[s] = !0),
              this._handleStart(t, s, e, e.pageX, e.pageY),
              e.pointerType)
            ) {
              case "mouse":
                t.enableDOMEvents(!0);
                break;
              case "touch":
                t.enableDOMEvents(!1);
            }
          } else
            r[s] &&
              ("MSPointerMove" === i || "pointermove" === i
                ? this._handleMove(t, s, e, e.pageX, e.pageY)
                : ("MSPointerUp" !== i &&
                    "MSPointerCancel" !== i &&
                    "pointerup" !== i &&
                    "pointercancel" !== i) ||
                  (delete r[s], this._handleEnd(t, s, e)));
        }
      }),
      (s._handleStart = function (t, e, i, s, r) {
        var n,
          a = t.__touch;
        (!a.multitouch && a.count) ||
          (n = a.pointers)[e] ||
          ((n[e] = !0), a.count++, t._handlePointerDown(e, i, s, r));
      }),
      (s._handleMove = function (t, e, i, s, r) {
        t.__touch.pointers[e] && t._handlePointerMove(e, i, s, r);
      }),
      (s._handleEnd = function (t, e, i) {
        var s = t.__touch,
          r = s.pointers;
        r[e] && (s.count--, t._handlePointerUp(e, i, !0), delete r[e]);
      }),
      (createjs.Touch = s);
  })(),
  (function () {
    "use strict";
    var t = (createjs.EaselJS = createjs.EaselJS || {});
    (t.version = "1.0.0"), (t.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT");
  })(),
  (function () {
    "use strict";
    var t = (createjs.PreloadJS = createjs.PreloadJS || {});
    (t.version = "NEXT"), (t.buildDate = "Thu, 14 Sep 2017 22:19:45 GMT");
  })(),
  (function () {
    "use strict";
    createjs.proxy = function (t, e) {
      var i = Array.prototype.slice.call(arguments, 2);
      return function () {
        return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(i));
      };
    };
  })(),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.Event_constructor("error"),
        (this.title = t),
        (this.message = e),
        (this.data = i);
    }
    (createjs.extend(t, createjs.Event).clone = function () {
      return new createjs.ErrorEvent(this.title, this.message, this.data);
    }),
      (createjs.ErrorEvent = createjs.promote(t, "Event"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.Event_constructor("progress"),
        (this.loaded = t),
        (this.total = null == e ? 1 : e),
        (this.progress = 0 == e ? 0 : this.loaded / this.total);
    }
    (createjs.extend(t, createjs.Event).clone = function () {
      return new createjs.ProgressEvent(this.loaded, this.total);
    }),
      (createjs.ProgressEvent = createjs.promote(t, "Event"));
  })(window),
  function () {
    var t,
      e,
      i,
      s,
      r = "function" == typeof define && define.amd,
      k = { function: !0, object: !0 },
      n = k[typeof exports] && exports && !exports.nodeType && exports,
      B = (k[typeof window] && window) || this,
      a =
        n &&
        k[typeof module] &&
        module &&
        !module.nodeType &&
        "object" == typeof global &&
        global;
    function U(t, h) {
      (t = t || B.Object()), (h = h || B.Object());
      var c = t.Number || B.Number,
        u = t.String || B.String,
        e = t.Object || B.Object,
        l = t.Date || B.Date,
        i = t.SyntaxError || B.SyntaxError,
        S = t.TypeError || B.TypeError,
        s = t.Math || B.Math,
        r = t.JSON || B.JSON;
      "object" == typeof r &&
        r &&
        ((h.stringify = r.stringify), (h.parse = r.parse));
      var x,
        w,
        R,
        d,
        A,
        P,
        L,
        o,
        j,
        n,
        C,
        _,
        I,
        D,
        M,
        p,
        f,
        g,
        m,
        v,
        a,
        T,
        b,
        E,
        y = e.prototype,
        O = y.toString,
        F = new l(-0xc782b5b800cec);
      try {
        F =
          -109252 == F.getUTCFullYear() &&
          0 === F.getUTCMonth() &&
          1 === F.getUTCDate() &&
          10 == F.getUTCHours() &&
          37 == F.getUTCMinutes() &&
          6 == F.getUTCSeconds() &&
          708 == F.getUTCMilliseconds();
      } catch (t) {}
      function N(t) {
        if (N[t] !== R) return N[t];
        var e;
        if ("bug-string-char-index" == t) e = "a" != "a"[0];
        else if ("json" == t) e = N("json-stringify") && N("json-parse");
        else {
          var i,
            s = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          if ("json-stringify" == t) {
            var r = h.stringify,
              n = "function" == typeof r && F;
            if (n) {
              (i = function () {
                return 1;
              }).toJSON = i;
              try {
                n =
                  "0" === r(0) &&
                  "0" === r(new c()) &&
                  '""' == r(new u()) &&
                  r(O) === R &&
                  r(R) === R &&
                  r() === R &&
                  "1" === r(i) &&
                  "[1]" == r([i]) &&
                  "[null]" == r([R]) &&
                  "null" == r(null) &&
                  "[null,null,null]" == r([R, O, null]) &&
                  r({ a: [i, !0, !1, null, "\0\b\n\f\r\t"] }) == s &&
                  "1" === r(null, i) &&
                  "[\n 1,\n 2\n]" == r([1, 2], null, 1) &&
                  '"-271821-04-20T00:00:00.000Z"' == r(new l(-864e13)) &&
                  '"+275760-09-13T00:00:00.000Z"' == r(new l(864e13)) &&
                  '"-000001-01-01T00:00:00.000Z"' == r(new l(-621987552e5)) &&
                  '"1969-12-31T23:59:59.999Z"' == r(new l(-1));
              } catch (t) {
                n = !1;
              }
            }
            e = n;
          }
          if ("json-parse" == t) {
            var a = h.parse;
            if ("function" == typeof a)
              try {
                if (0 === a("0") && !a(!1)) {
                  var o = 5 == (i = a(s)).a.length && 1 === i.a[0];
                  if (o) {
                    try {
                      o = !a('"\t"');
                    } catch (t) {}
                    if (o)
                      try {
                        o = 1 !== a("01");
                      } catch (t) {}
                    if (o)
                      try {
                        o = 1 !== a("1.");
                      } catch (t) {}
                  }
                }
              } catch (t) {
                o = !1;
              }
            e = o;
          }
        }
        return (N[t] = !!e);
      }
      return (
        N("json") ||
          ((d = "[object Function]"),
          (A = "[object Number]"),
          (P = "[object String]"),
          (L = "[object Array]"),
          (o = N("bug-string-char-index")),
          F ||
            ((j = s.floor),
            (n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]),
            (C = function (t, e) {
              return (
                n[e] +
                365 * (t - 1970) +
                j((t - 1969 + (e = +(1 < e))) / 4) -
                j((t - 1901 + e) / 100) +
                j((t - 1601 + e) / 400)
              );
            })),
          (x = y.hasOwnProperty) ||
            (x = function (t) {
              var i,
                e = { __proto__: { toString: 1 } };
              return (
                (x =
                  e.toString != O
                    ? function (t) {
                        var e = this.__proto__,
                          i = t in ((this.__proto__ = null), this);
                        return (this.__proto__ = e), i;
                      }
                    : ((i = e.constructor),
                      function (t) {
                        var e = (this.constructor || i).prototype;
                        return t in this && !(t in e && this[t] === e[t]);
                      })),
                (e = null),
                x.call(this, t)
              );
            }),
          (w = function (t, e) {
            var i,
              a,
              s,
              r = 0;
            for (s in (((i = function () {
              this.valueOf = 0;
            }).prototype.valueOf = 0),
            (a = new i())))
              x.call(a, s) && r++;
            return (
              (i = a = null),
              (w = r
                ? 2 == r
                  ? function (t, e) {
                      var i,
                        s = {},
                        r = O.call(t) == d;
                      for (i in t)
                        (r && "prototype" == i) ||
                          x.call(s, i) ||
                          !(s[i] = 1) ||
                          !x.call(t, i) ||
                          e(i);
                    }
                  : function (t, e) {
                      var i,
                        s,
                        r = O.call(t) == d;
                      for (i in t)
                        (r && "prototype" == i) ||
                          !x.call(t, i) ||
                          (s = "constructor" === i) ||
                          e(i);
                      (s || x.call(t, (i = "constructor"))) && e(i);
                    }
                : ((a = [
                    "valueOf",
                    "toString",
                    "toLocaleString",
                    "propertyIsEnumerable",
                    "isPrototypeOf",
                    "hasOwnProperty",
                    "constructor",
                  ]),
                  function (t, e) {
                    var i,
                      s,
                      r = O.call(t) == d,
                      n =
                        (!r &&
                          "function" != typeof t.constructor &&
                          k[typeof t.hasOwnProperty] &&
                          t.hasOwnProperty) ||
                        x;
                    for (i in t)
                      (r && "prototype" == i) || !n.call(t, i) || e(i);
                    for (s = a.length; (i = a[--s]); n.call(t, i) && e(i));
                  }))(t, e)
            );
          }),
          N("json-stringify") ||
            ((_ = {
              92: "\\\\",
              34: '\\"',
              8: "\\b",
              12: "\\f",
              10: "\\n",
              13: "\\r",
              9: "\\t",
            }),
            (I = function (t, e) {
              return ("000000" + (e || 0)).slice(-t);
            }),
            (D = function (t) {
              for (
                var e = '"',
                  i = 0,
                  s = t.length,
                  r = !o || 10 < s,
                  n = r && (o ? t.split("") : t);
                i < s;
                i++
              ) {
                var a = t.charCodeAt(i);
                switch (a) {
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                  case 13:
                  case 34:
                  case 92:
                    e += _[a];
                    break;
                  default:
                    if (a < 32) {
                      e += "\\u00" + I(2, a.toString(16));
                      break;
                    }
                    e += r ? n[i] : t.charAt(i);
                }
              }
              return e + '"';
            }),
            (M = function (t, e, i, s, r, n, a) {
              var o, h, c, u, l, d, _, p, f, g, m, v, T, b, E, y;
              try {
                o = e[t];
              } catch (t) {}
              if ("object" == typeof o && o)
                if ("[object Date]" != (h = O.call(o)) || x.call(o, "toJSON"))
                  "function" == typeof o.toJSON &&
                    ((h != A && h != P && h != L) || x.call(o, "toJSON")) &&
                    (o = o.toJSON(t));
                else if (-1 / 0 < o && o < 1 / 0) {
                  if (C) {
                    for (
                      l = j(o / 864e5), c = j(l / 365.2425) + 1970 - 1;
                      C(c + 1, 0) <= l;
                      c++
                    );
                    for (u = j((l - C(c, 0)) / 30.42); C(c, u + 1) <= l; u++);
                    (l = 1 + l - C(c, u)),
                      (_ = j((d = ((o % 864e5) + 864e5) % 864e5) / 36e5) % 24),
                      (p = j(d / 6e4) % 60),
                      (f = j(d / 1e3) % 60),
                      (g = d % 1e3);
                  } else
                    (c = o.getUTCFullYear()),
                      (u = o.getUTCMonth()),
                      (l = o.getUTCDate()),
                      (_ = o.getUTCHours()),
                      (p = o.getUTCMinutes()),
                      (f = o.getUTCSeconds()),
                      (g = o.getUTCMilliseconds());
                  o =
                    (c <= 0 || 1e4 <= c
                      ? (c < 0 ? "-" : "+") + I(6, c < 0 ? -c : c)
                      : I(4, c)) +
                    "-" +
                    I(2, u + 1) +
                    "-" +
                    I(2, l) +
                    "T" +
                    I(2, _) +
                    ":" +
                    I(2, p) +
                    ":" +
                    I(2, f) +
                    "." +
                    I(3, g) +
                    "Z";
                } else o = null;
              if ((i && (o = i.call(e, t, o)), null === o)) return "null";
              if ("[object Boolean]" == (h = O.call(o))) return "" + o;
              if (h == A) return -1 / 0 < o && o < 1 / 0 ? "" + o : "null";
              if (h == P) return D("" + o);
              if ("object" == typeof o) {
                for (b = a.length; b--; ) if (a[b] === o) throw S();
                if ((a.push(o), (m = []), (E = n), (n += r), h == L)) {
                  for (T = 0, b = o.length; T < b; T++)
                    (v = M(T, o, i, s, r, n, a)), m.push(v === R ? "null" : v);
                  y = m.length
                    ? r
                      ? "[\n" + n + m.join(",\n" + n) + "\n" + E + "]"
                      : "[" + m.join(",") + "]"
                    : "[]";
                } else
                  w(s || o, function (t) {
                    var e = M(t, o, i, s, r, n, a);
                    e !== R && m.push(D(t) + ":" + (r ? " " : "") + e);
                  }),
                    (y = m.length
                      ? r
                        ? "{\n" + n + m.join(",\n" + n) + "\n" + E + "}"
                        : "{" + m.join(",") + "}"
                      : "{}");
                return a.pop(), y;
              }
            }),
            (h.stringify = function (t, e, i) {
              var s, r, n, a;
              if (k[typeof e] && e)
                if ((a = O.call(e)) == d) r = e;
                else if (a == L) {
                  n = {};
                  for (
                    var o, h = 0, c = e.length;
                    h < c;
                    o = e[h++], ((a = O.call(o)) != P && a != A) || (n[o] = 1)
                  );
                }
              if (i)
                if ((a = O.call(i)) == A) {
                  if (0 < (i -= i % 1))
                    for (s = "", 10 < i && (i = 10); s.length < i; s += " ");
                } else a == P && (s = i.length <= 10 ? i : i.slice(0, 10));
              return M("", (((o = {})[""] = t), o), r, n, s, "", []);
            })),
          N("json-parse") ||
            ((p = u.fromCharCode),
            (f = {
              92: "\\",
              34: '"',
              47: "/",
              98: "\b",
              116: "\t",
              110: "\n",
              102: "\f",
              114: "\r",
            }),
            (v = function () {
              throw ((g = m = null), i());
            }),
            (a = function () {
              for (var t, e, i, s, r, n = m, a = n.length; g < a; )
                switch ((r = n.charCodeAt(g))) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    g++;
                    break;
                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    return (t = o ? n.charAt(g) : n[g]), g++, t;
                  case 34:
                    for (t = "@", g++; g < a; )
                      if ((r = n.charCodeAt(g)) < 32) v();
                      else if (92 == r)
                        switch ((r = n.charCodeAt(++g))) {
                          case 92:
                          case 34:
                          case 47:
                          case 98:
                          case 116:
                          case 110:
                          case 102:
                          case 114:
                            (t += f[r]), g++;
                            break;
                          case 117:
                            for (e = ++g, i = g + 4; g < i; g++)
                              (48 <= (r = n.charCodeAt(g)) && r <= 57) ||
                                (97 <= r && r <= 102) ||
                                (65 <= r && r <= 70) ||
                                v();
                            t += p("0x" + n.slice(e, g));
                            break;
                          default:
                            v();
                        }
                      else {
                        if (34 == r) break;
                        for (
                          r = n.charCodeAt(g), e = g;
                          32 <= r && 92 != r && 34 != r;

                        )
                          r = n.charCodeAt(++g);
                        t += n.slice(e, g);
                      }
                    if (34 == n.charCodeAt(g)) return g++, t;
                    v();
                  default:
                    if (
                      ((e = g),
                      45 == r && ((s = !0), (r = n.charCodeAt(++g))),
                      48 <= r && r <= 57)
                    ) {
                      for (
                        48 == r &&
                          48 <= (r = n.charCodeAt(g + 1)) &&
                          r <= 57 &&
                          v(),
                          s = !1;
                        g < a && 48 <= (r = n.charCodeAt(g)) && r <= 57;
                        g++
                      );
                      if (46 == n.charCodeAt(g)) {
                        for (
                          i = ++g;
                          i < a && 48 <= (r = n.charCodeAt(i)) && r <= 57;
                          i++
                        );
                        i == g && v(), (g = i);
                      }
                      if (101 == (r = n.charCodeAt(g)) || 69 == r) {
                        for (
                          (43 != (r = n.charCodeAt(++g)) && 45 != r) || g++,
                            i = g;
                          i < a && 48 <= (r = n.charCodeAt(i)) && r <= 57;
                          i++
                        );
                        i == g && v(), (g = i);
                      }
                      return +n.slice(e, g);
                    }
                    if ((s && v(), "true" == n.slice(g, g + 4)))
                      return (g += 4), !0;
                    if ("false" == n.slice(g, g + 5)) return (g += 5), !1;
                    if ("null" == n.slice(g, g + 4)) return (g += 4), null;
                    v();
                }
              return "$";
            }),
            (T = function (t) {
              var e, i;
              if (("$" == t && v(), "string" == typeof t)) {
                if ("@" == (o ? t.charAt(0) : t[0])) return t.slice(1);
                if ("[" == t) {
                  for (e = []; "]" != (t = a()); i = i || !0)
                    !i || ("," == t && "]" != (t = a())) || v(),
                      "," == t && v(),
                      e.push(T(t));
                  return e;
                }
                if ("{" == t) {
                  for (e = {}; "}" != (t = a()); i = i || !0)
                    !i || ("," == t && "}" != (t = a())) || v(),
                      ("," != t &&
                        "string" == typeof t &&
                        "@" == (o ? t.charAt(0) : t[0]) &&
                        ":" == a()) ||
                        v(),
                      (e[t.slice(1)] = T(a()));
                  return e;
                }
                v();
              }
              return t;
            }),
            (b = function (t, e, i) {
              var s = E(t, e, i);
              s === R ? delete t[e] : (t[e] = s);
            }),
            (E = function (t, e, i) {
              var s,
                r = t[e];
              if ("object" == typeof r && r)
                if (O.call(r) == L) for (s = r.length; s--; ) b(r, s, i);
                else
                  w(r, function (t) {
                    b(r, t, i);
                  });
              return i.call(t, e, r);
            }),
            (h.parse = function (t, e) {
              var i, s;
              return (
                (g = 0),
                (m = "" + t),
                (i = T(a())),
                "$" != a() && v(),
                (g = m = null),
                e && O.call(e) == d ? E((((s = {})[""] = i), s), "", e) : i
              );
            }))),
        (h.runInContext = U),
        h
      );
    }
    !a || (a.global !== a && a.window !== a && a.self !== a) || (B = a),
      n && !r
        ? U(B, n)
        : ((t = B.JSON),
          (e = B.JSON3),
          (i = !1),
          (s = U(
            B,
            (B.JSON3 = {
              noConflict: function () {
                return (
                  i || ((i = !0), (B.JSON = t), (B.JSON3 = e), (t = e = null)),
                  s
                );
              },
            })
          )),
          (B.JSON = { parse: s.parse, stringify: s.stringify })),
      r &&
        define(function () {
          return s;
        });
  }.call(this),
  (function () {
    var t = {
      a: function () {
        return t.el("a");
      },
      svg: function () {
        return t.el("svg");
      },
      object: function () {
        return t.el("object");
      },
      image: function () {
        return t.el("image");
      },
      img: function () {
        return t.el("img");
      },
      style: function () {
        return t.el("style");
      },
      link: function () {
        return t.el("link");
      },
      script: function () {
        return t.el("script");
      },
      audio: function () {
        return t.el("audio");
      },
      video: function () {
        return t.el("video");
      },
      text: function (t) {
        return document.createTextNode(t);
      },
      el: function (t) {
        return document.createElement(t);
      },
    };
    createjs.Elements = t;
  })(),
  (function () {
    var a = {
      ABSOLUTE_PATT: /^(?:\w+:)?\/{2}/i,
      RELATIVE_PATT: /^[./]*?\//i,
      EXTENSION_PATT: /\/?[^/]+\.(\w{1,5})$/i,
      parseURI: function (t) {
        var e = {
          absolute: !1,
          relative: !1,
          protocol: null,
          hostname: null,
          port: null,
          pathname: null,
          search: null,
          hash: null,
          host: null,
        };
        if (null == t) return e;
        var i = createjs.Elements.a();
        for (var s in ((i.href = t), e)) s in i && (e[s] = i[s]);
        var r,
          n = t.indexOf("?");
        return (
          -1 < n && (t = t.substr(0, n)),
          a.ABSOLUTE_PATT.test(t)
            ? (e.absolute = !0)
            : a.RELATIVE_PATT.test(t) && (e.relative = !0),
          (r = t.match(a.EXTENSION_PATT)) && (e.extension = r[1].toLowerCase()),
          e
        );
      },
      formatQueryString: function (t, e) {
        if (null == t) throw new Error("You must specify data.");
        var i = [];
        for (var s in t) i.push(s + "=" + escape(t[s]));
        return e && (i = i.concat(e)), i.join("&");
      },
      buildURI: function (t, e) {
        if (null == e) return t;
        var i,
          s = [],
          r = t.indexOf("?");
        return (
          -1 != r && ((i = t.slice(r + 1)), (s = s.concat(i.split("&")))),
          -1 != r
            ? t.slice(0, r) + "?" + this.formatQueryString(e, s)
            : t + "?" + this.formatQueryString(e, s)
        );
      },
      isCrossDomain: function (t) {
        var e = createjs.Elements.a();
        e.href = t.src;
        var i = createjs.Elements.a();
        return (
          (i.href = location.href),
          "" != e.hostname &&
            (e.port != i.port ||
              e.protocol != i.protocol ||
              e.hostname != i.hostname)
        );
      },
      isLocal: function (t) {
        var e = createjs.Elements.a();
        return (e.href = t.src), "" == e.hostname && "file:" == e.protocol;
      },
    };
    createjs.URLUtils = a;
  })(),
  (function () {
    var i = {
      container: null,
      appendToHead: function (t) {
        i.getHead().appendChild(t);
      },
      appendToBody: function (t) {
        var e;
        null == i.container &&
          ((i.container = document.createElement("div")),
          (i.container.id = "preloadjs-container"),
          ((e = i.container.style).visibility = "hidden"),
          (e.position = "absolute"),
          (e.width = i.container.style.height = "10px"),
          (e.overflow = "hidden"),
          (e.transform =
            e.msTransform =
            e.webkitTransform =
            e.oTransform =
              "translate(-10px, -10px)"),
          i.getBody().appendChild(i.container)),
          i.container.appendChild(t);
      },
      getHead: function () {
        return document.head || document.getElementsByTagName("head")[0];
      },
      getBody: function () {
        return document.body || document.getElementsByTagName("body")[0];
      },
      removeChild: function (t) {
        t.parent && t.parent.removeChild(t);
      },
      isImageTag: function (t) {
        return t instanceof HTMLImageElement;
      },
      isAudioTag: function (t) {
        return !!window.HTMLAudioElement && t instanceof HTMLAudioElement;
      },
      isVideoTag: function (t) {
        return !!window.HTMLVideoElement && t instanceof HTMLVideoElement;
      },
    };
    createjs.DomUtils = i;
  })(),
  (function () {
    var t = {
      parseXML: function (t) {
        var e = null;
        try {
          window.DOMParser &&
            (e = new DOMParser().parseFromString(t, "text/xml"));
        } catch (t) {}
        if (!e)
          try {
            ((e = new ActiveXObject("Microsoft.XMLDOM")).async = !1),
              e.loadXML(t);
          } catch (t) {
            e = null;
          }
        return e;
      },
      parseJSON: function (t) {
        if (null == t) return null;
        try {
          return JSON.parse(t);
        } catch (t) {
          throw t;
        }
      },
    };
    createjs.DataUtils = t;
  })(),
  (function () {
    var t = {
      BINARY: "binary",
      CSS: "css",
      FONT: "font",
      FONTCSS: "fontcss",
      IMAGE: "image",
      JAVASCRIPT: "javascript",
      JSON: "json",
      JSONP: "jsonp",
      MANIFEST: "manifest",
      SOUND: "sound",
      VIDEO: "video",
      SPRITESHEET: "spritesheet",
      SVG: "svg",
      TEXT: "text",
      XML: "xml",
    };
    createjs.Types = t;
  })(),
  (function () {
    var t = { POST: "POST", GET: "GET" };
    createjs.Methods = t;
  })(),
  (function () {
    "use strict";
    function i() {
      (this.src = null),
        (this.type = null),
        (this.id = null),
        (this.maintainOrder = !1),
        (this.callback = null),
        (this.data = null),
        (this.method = createjs.Methods.GET),
        (this.values = null),
        (this.headers = null),
        (this.withCredentials = !1),
        (this.mimeType = null),
        (this.crossOrigin = null),
        (this.loadTimeout = s.LOAD_TIMEOUT_DEFAULT);
    }
    var t = (i.prototype = {}),
      s = i;
    (s.LOAD_TIMEOUT_DEFAULT = 8e3),
      (s.create = function (t) {
        if ("string" == typeof t) {
          var e = new i();
          return (e.src = t), e;
        }
        if (t instanceof s) return t;
        if (t instanceof Object && t.src)
          return (
            null == t.loadTimeout && (t.loadTimeout = s.LOAD_TIMEOUT_DEFAULT), t
          );
        throw new Error("Type not recognized.");
      }),
      (t.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (createjs.LoadItem = s);
  })(),
  (function () {
    var t = {
      isBinary: function (t) {
        switch (t) {
          case createjs.Types.IMAGE:
          case createjs.Types.BINARY:
            return !0;
          default:
            return !1;
        }
      },
      isText: function (t) {
        switch (t) {
          case createjs.Types.TEXT:
          case createjs.Types.JSON:
          case createjs.Types.MANIFEST:
          case createjs.Types.XML:
          case createjs.Types.CSS:
          case createjs.Types.SVG:
          case createjs.Types.JAVASCRIPT:
          case createjs.Types.SPRITESHEET:
            return !0;
          default:
            return !1;
        }
      },
      getTypeByExtension: function (t) {
        if (null == t) return createjs.Types.TEXT;
        switch (t.toLowerCase()) {
          case "jpeg":
          case "jpg":
          case "gif":
          case "png":
          case "webp":
          case "bmp":
            return createjs.Types.IMAGE;
          case "ogg":
          case "mp3":
          case "webm":
            return createjs.Types.SOUND;
          case "mp4":
          case "webm":
          case "ts":
            return createjs.Types.VIDEO;
          case "json":
            return createjs.Types.JSON;
          case "xml":
            return createjs.Types.XML;
          case "css":
            return createjs.Types.CSS;
          case "js":
            return createjs.Types.JAVASCRIPT;
          case "svg":
            return createjs.Types.SVG;
          default:
            return createjs.Types.TEXT;
        }
      },
    };
    createjs.RequestUtils = t;
  })(),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.EventDispatcher_constructor(),
        (this.loaded = !1),
        (this.canceled = !1),
        (this.progress = 0),
        (this.type = i),
        (this.resultFormatter = null),
        (this._item = t ? createjs.LoadItem.create(t) : null),
        (this._preferXHR = e),
        (this._result = null),
        (this._rawResult = null),
        (this._loadedItems = null),
        (this._tagSrcAttribute = null),
        (this._tag = null);
    }
    var e = createjs.extend(t, createjs.EventDispatcher),
      i = t;
    try {
      Object.defineProperties(i, {
        POST: {
          get: createjs.deprecate(function () {
            return createjs.Methods.POST;
          }, "AbstractLoader.POST"),
        },
        GET: {
          get: createjs.deprecate(function () {
            return createjs.Methods.GET;
          }, "AbstractLoader.GET"),
        },
        BINARY: {
          get: createjs.deprecate(function () {
            return createjs.Types.BINARY;
          }, "AbstractLoader.BINARY"),
        },
        CSS: {
          get: createjs.deprecate(function () {
            return createjs.Types.CSS;
          }, "AbstractLoader.CSS"),
        },
        FONT: {
          get: createjs.deprecate(function () {
            return createjs.Types.FONT;
          }, "AbstractLoader.FONT"),
        },
        FONTCSS: {
          get: createjs.deprecate(function () {
            return createjs.Types.FONTCSS;
          }, "AbstractLoader.FONTCSS"),
        },
        IMAGE: {
          get: createjs.deprecate(function () {
            return createjs.Types.IMAGE;
          }, "AbstractLoader.IMAGE"),
        },
        JAVASCRIPT: {
          get: createjs.deprecate(function () {
            return createjs.Types.JAVASCRIPT;
          }, "AbstractLoader.JAVASCRIPT"),
        },
        JSON: {
          get: createjs.deprecate(function () {
            return createjs.Types.JSON;
          }, "AbstractLoader.JSON"),
        },
        JSONP: {
          get: createjs.deprecate(function () {
            return createjs.Types.JSONP;
          }, "AbstractLoader.JSONP"),
        },
        MANIFEST: {
          get: createjs.deprecate(function () {
            return createjs.Types.MANIFEST;
          }, "AbstractLoader.MANIFEST"),
        },
        SOUND: {
          get: createjs.deprecate(function () {
            return createjs.Types.SOUND;
          }, "AbstractLoader.SOUND"),
        },
        VIDEO: {
          get: createjs.deprecate(function () {
            return createjs.Types.VIDEO;
          }, "AbstractLoader.VIDEO"),
        },
        SPRITESHEET: {
          get: createjs.deprecate(function () {
            return createjs.Types.SPRITESHEET;
          }, "AbstractLoader.SPRITESHEET"),
        },
        SVG: {
          get: createjs.deprecate(function () {
            return createjs.Types.SVG;
          }, "AbstractLoader.SVG"),
        },
        TEXT: {
          get: createjs.deprecate(function () {
            return createjs.Types.TEXT;
          }, "AbstractLoader.TEXT"),
        },
        XML: {
          get: createjs.deprecate(function () {
            return createjs.Types.XML;
          }, "AbstractLoader.XML"),
        },
      });
    } catch (t) {}
    (e.getItem = function () {
      return this._item;
    }),
      (e.getResult = function (t) {
        return t ? this._rawResult : this._result;
      }),
      (e.getTag = function () {
        return this._tag;
      }),
      (e.setTag = function (t) {
        this._tag = t;
      }),
      (e.load = function () {
        this._createRequest(),
          this._request.on("complete", this, this),
          this._request.on("progress", this, this),
          this._request.on("loadStart", this, this),
          this._request.on("abort", this, this),
          this._request.on("timeout", this, this),
          this._request.on("error", this, this);
        var t = new createjs.Event("initialize");
        (t.loader = this._request), this.dispatchEvent(t), this._request.load();
      }),
      (e.cancel = function () {
        (this.canceled = !0), this.destroy();
      }),
      (e.destroy = function () {
        this._request &&
          (this._request.removeAllEventListeners(), this._request.destroy()),
          (this._request = null),
          (this._item = null),
          (this._rawResult = null),
          (this._result = null),
          (this._loadItems = null),
          this.removeAllEventListeners();
      }),
      (e.getLoadedItems = function () {
        return this._loadedItems;
      }),
      (e._createRequest = function () {
        this._preferXHR
          ? (this._request = new createjs.XHRRequest(this._item))
          : (this._request = new createjs.TagRequest(
              this._item,
              this._tag || this._createTag(),
              this._tagSrcAttribute
            ));
      }),
      (e._createTag = function (t) {
        return null;
      }),
      (e._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart");
      }),
      (e._sendProgress = function (t) {
        var e;
        this._isCanceled() ||
          ((e = null),
          "number" == typeof t
            ? ((this.progress = t),
              (e = new createjs.ProgressEvent(this.progress)))
            : ((e = t),
              (this.progress = t.loaded / t.total),
              (e.progress = this.progress),
              (!isNaN(this.progress) && this.progress != 1 / 0) ||
                (this.progress = 0)),
          this.hasEventListener("progress") && this.dispatchEvent(e));
      }),
      (e._sendComplete = function () {
        var t;
        this._isCanceled() ||
          ((this.loaded = !0),
          ((t = new createjs.Event("complete")).rawResult = this._rawResult),
          null != this._result && (t.result = this._result),
          this.dispatchEvent(t));
      }),
      (e._sendError = function (t) {
        !this._isCanceled() &&
          this.hasEventListener("error") &&
          (null == t && (t = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),
          this.dispatchEvent(t));
      }),
      (e._isCanceled = function () {
        return !(null != window.createjs && !this.canceled);
      }),
      (e.resultFormatter = null),
      (e.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            this._rawResult = t.target._response;
            var e = this.resultFormatter && this.resultFormatter(this);
            e instanceof Function
              ? e.call(
                  this,
                  createjs.proxy(this._resultFormatSuccess, this),
                  createjs.proxy(this._resultFormatFailed, this)
                )
              : ((this._result = e || this._rawResult), this._sendComplete());
            break;
          case "progress":
            this._sendProgress(t);
            break;
          case "error":
            this._sendError(t);
            break;
          case "loadstart":
            this._sendLoadStart();
            break;
          case "abort":
          case "timeout":
            this._isCanceled() ||
              this.dispatchEvent(
                new createjs.ErrorEvent(
                  "PRELOAD_" + t.type.toUpperCase() + "_ERROR"
                )
              );
        }
      }),
      (e._resultFormatSuccess = function (t) {
        (this._result = t), this._sendComplete();
      }),
      (e._resultFormatFailed = function (t) {
        this._sendError(t);
      }),
      (e.toString = function () {
        return "[PreloadJS AbstractLoader]";
      }),
      (createjs.AbstractLoader = createjs.promote(t, "EventDispatcher"));
  })(),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractLoader_constructor(t, e, i),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "src"),
        this.on("initialize", this._updateXHR, this);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (e.load = function () {
      this._tag || (this._tag = this._createTag(this._item.src)),
        (this._tag.preload = "auto"),
        this._tag.load(),
        this.AbstractLoader_load();
    }),
      (e._createTag = function () {}),
      (e._createRequest = function () {
        this._preferXHR
          ? (this._request = new createjs.XHRRequest(this._item))
          : (this._request = new createjs.MediaTagRequest(
              this._item,
              this._tag || this._createTag(),
              this._tagSrcAttribute
            ));
      }),
      (e._updateXHR = function (t) {
        t.loader.setResponseType && t.loader.setResponseType("blob");
      }),
      (e._formatResult = function (t) {
        var e, i;
        return (
          this._tag.removeEventListener &&
            this._tag.removeEventListener(
              "canplaythrough",
              this._loadedHandler
            ),
          (this._tag.onstalled = null),
          this._preferXHR &&
            ((e = window.URL || window.webkitURL),
            (i = t.getResult(!0)),
            (t.getTag().src = e.createObjectURL(i))),
          t.getTag()
        );
      }),
      (createjs.AbstractMediaLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this._item = t;
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (e.load = function () {}),
      (e.destroy = function () {}),
      (e.cancel = function () {}),
      (createjs.AbstractRequest = createjs.promote(t, "EventDispatcher"));
  })(),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractRequest_constructor(t),
        (this._tag = e),
        (this._tagSrcAttribute = i),
        (this._loadedHandler = createjs.proxy(this._handleTagComplete, this)),
        (this._addedToDOM = !1);
    }
    var e = createjs.extend(t, createjs.AbstractRequest);
    (e.load = function () {
      (this._tag.onload = createjs.proxy(this._handleTagComplete, this)),
        (this._tag.onreadystatechange = createjs.proxy(
          this._handleReadyStateChange,
          this
        )),
        (this._tag.onerror = createjs.proxy(this._handleError, this));
      var t = new createjs.Event("initialize");
      (t.loader = this._tag),
        this.dispatchEvent(t),
        (this._loadTimeout = setTimeout(
          createjs.proxy(this._handleTimeout, this),
          this._item.loadTimeout
        )),
        (this._tag[this._tagSrcAttribute] = this._item.src),
        null == this._tag.parentNode &&
          (createjs.DomUtils.appendToBody(this._tag), (this._addedToDOM = !0));
    }),
      (e.destroy = function () {
        this._clean(), (this._tag = null), this.AbstractRequest_destroy();
      }),
      (e._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var t = this._tag;
        ("loaded" != t.readyState && "complete" != t.readyState) ||
          this._handleTagComplete();
      }),
      (e._handleError = function () {
        this._clean(), this.dispatchEvent("error");
      }),
      (e._handleTagComplete = function () {
        (this._rawResult = this._tag),
          (this._result =
            (this.resultFormatter && this.resultFormatter(this)) ||
            this._rawResult),
          this._clean(),
          this.dispatchEvent("complete");
      }),
      (e._handleTimeout = function () {
        this._clean(), this.dispatchEvent(new createjs.Event("timeout"));
      }),
      (e._clean = function () {
        (this._tag.onload = null),
          (this._tag.onreadystatechange = null),
          (this._tag.onerror = null),
          this._addedToDOM &&
            null != this._tag.parentNode &&
            this._tag.parentNode.removeChild(this._tag),
          clearTimeout(this._loadTimeout);
      }),
      (e._handleStalled = function () {}),
      (createjs.TagRequest = createjs.promote(t, "AbstractRequest"));
  })(),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractRequest_constructor(t),
        (this._tag = e),
        (this._tagSrcAttribute = i),
        (this._loadedHandler = createjs.proxy(this._handleTagComplete, this));
    }
    var e = createjs.extend(t, createjs.TagRequest);
    (e.load = function () {
      var t = createjs.proxy(this._handleStalled, this);
      this._stalledCallback = t;
      var e = createjs.proxy(this._handleProgress, this);
      (this._handleProgress = e),
        this._tag.addEventListener("stalled", t),
        this._tag.addEventListener("progress", e),
        this._tag.addEventListener &&
          this._tag.addEventListener("canplaythrough", this._loadedHandler, !1),
        this.TagRequest_load();
    }),
      (e._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var t = this._tag;
        ("loaded" != t.readyState && "complete" != t.readyState) ||
          this._handleTagComplete();
      }),
      (e._handleStalled = function () {}),
      (e._handleProgress = function (t) {
        var e;
        !t ||
          (0 < t.loaded && 0 == t.total) ||
          ((e = new createjs.ProgressEvent(t.loaded, t.total)),
          this.dispatchEvent(e));
      }),
      (e._clean = function () {
        this._tag.removeEventListener &&
          this._tag.removeEventListener("canplaythrough", this._loadedHandler),
          this._tag.removeEventListener("stalled", this._stalledCallback),
          this._tag.removeEventListener("progress", this._progressCallback),
          this.TagRequest__clean();
      }),
      (createjs.MediaTagRequest = createjs.promote(t, "TagRequest"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractRequest_constructor(t),
        (this._request = null),
        (this._loadTimeout = null),
        (this._xhrLevel = 1),
        (this._response = null),
        (this._rawResponse = null),
        (this._canceled = !1),
        (this._handleLoadStartProxy = createjs.proxy(
          this._handleLoadStart,
          this
        )),
        (this._handleProgressProxy = createjs.proxy(
          this._handleProgress,
          this
        )),
        (this._handleAbortProxy = createjs.proxy(this._handleAbort, this)),
        (this._handleErrorProxy = createjs.proxy(this._handleError, this)),
        (this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this)),
        (this._handleLoadProxy = createjs.proxy(this._handleLoad, this)),
        (this._handleReadyStateChangeProxy = createjs.proxy(
          this._handleReadyStateChange,
          this
        )),
        this._createXHR(t);
    }
    var e = createjs.extend(t, createjs.AbstractRequest);
    (t.ACTIVEX_VERSIONS = [
      "Msxml2.XMLHTTP.6.0",
      "Msxml2.XMLHTTP.5.0",
      "Msxml2.XMLHTTP.4.0",
      "MSXML2.XMLHTTP.3.0",
      "MSXML2.XMLHTTP",
      "Microsoft.XMLHTTP",
    ]),
      (e.getResult = function (t) {
        return t && this._rawResponse ? this._rawResponse : this._response;
      }),
      (e.cancel = function () {
        (this.canceled = !0), this._clean(), this._request.abort();
      }),
      (e.load = function () {
        if (null != this._request) {
          null != this._request.addEventListener
            ? (this._request.addEventListener(
                "loadstart",
                this._handleLoadStartProxy,
                !1
              ),
              this._request.addEventListener(
                "progress",
                this._handleProgressProxy,
                !1
              ),
              this._request.addEventListener(
                "abort",
                this._handleAbortProxy,
                !1
              ),
              this._request.addEventListener(
                "error",
                this._handleErrorProxy,
                !1
              ),
              this._request.addEventListener(
                "timeout",
                this._handleTimeoutProxy,
                !1
              ),
              this._request.addEventListener("load", this._handleLoadProxy, !1),
              this._request.addEventListener(
                "readystatechange",
                this._handleReadyStateChangeProxy,
                !1
              ))
            : ((this._request.onloadstart = this._handleLoadStartProxy),
              (this._request.onprogress = this._handleProgressProxy),
              (this._request.onabort = this._handleAbortProxy),
              (this._request.onerror = this._handleErrorProxy),
              (this._request.ontimeout = this._handleTimeoutProxy),
              (this._request.onload = this._handleLoadProxy),
              (this._request.onreadystatechange =
                this._handleReadyStateChangeProxy)),
            1 == this._xhrLevel &&
              (this._loadTimeout = setTimeout(
                createjs.proxy(this._handleTimeout, this),
                this._item.loadTimeout
              ));
          try {
            this._item.values
              ? this._request.send(
                  createjs.URLUtils.formatQueryString(this._item.values)
                )
              : this._request.send();
          } catch (t) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, t));
          }
        } else this._handleError();
      }),
      (e.setResponseType = function (t) {
        "blob" === t &&
          ((t = window.URL ? "blob" : "arraybuffer"), (this._responseType = t)),
          (this._request.responseType = t);
      }),
      (e.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof Function
          ? this._request.getAllResponseHeaders()
          : null;
      }),
      (e.getResponseHeader = function (t) {
        return this._request.getResponseHeader instanceof Function
          ? this._request.getResponseHeader(t)
          : null;
      }),
      (e._handleProgress = function (t) {
        var e;
        !t ||
          (0 < t.loaded && 0 == t.total) ||
          ((e = new createjs.ProgressEvent(t.loaded, t.total)),
          this.dispatchEvent(e));
      }),
      (e._handleLoadStart = function (t) {
        clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart");
      }),
      (e._handleAbort = function (t) {
        this._clean(),
          this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, t));
      }),
      (e._handleError = function (t) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent(t.message));
      }),
      (e._handleReadyStateChange = function (t) {
        4 == this._request.readyState && this._handleLoad();
      }),
      (e._handleLoad = function (t) {
        if (!this.loaded) {
          this.loaded = !0;
          var e,
            i = this._checkError();
          if (i) this._handleError(i);
          else {
            if (
              ((this._response = this._getResponse()),
              "arraybuffer" === this._responseType)
            )
              try {
                this._response = new Blob([this._response]);
              } catch (t) {
                (window.BlobBuilder =
                  window.BlobBuilder ||
                  window.WebKitBlobBuilder ||
                  window.MozBlobBuilder ||
                  window.MSBlobBuilder),
                  "TypeError" === t.name &&
                    window.BlobBuilder &&
                    ((e = new BlobBuilder()).append(this._response),
                    (this._response = e.getBlob()));
              }
            this._clean(), this.dispatchEvent(new createjs.Event("complete"));
          }
        }
      }),
      (e._handleTimeout = function (t) {
        this._clean(),
          this.dispatchEvent(
            new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, t)
          );
      }),
      (e._checkError = function () {
        var t = parseInt(this._request.status);
        return 400 <= t && t <= 599
          ? new Error(t)
          : 0 == t && /^https?:/.test(location.protocol)
          ? new Error(0)
          : null;
      }),
      (e._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
          if (null != this._request.responseText)
            return this._request.responseText;
        } catch (t) {}
        try {
          if (null != this._request.responseXML)
            return this._request.responseXML;
        } catch (t) {}
        return null;
      }),
      (e._createXHR = function (t) {
        var e = createjs.URLUtils.isCrossDomain(t),
          i = {},
          r = null;
        if (window.XMLHttpRequest)
          (r = new XMLHttpRequest()),
            e &&
              void 0 === r.withCredentials &&
              window.XDomainRequest &&
              (r = new XDomainRequest());
        else {
          for (var n = 0, a = s.ACTIVEX_VERSIONS.length; n < a; n++) {
            var o = s.ACTIVEX_VERSIONS[n];
            try {
              r = new ActiveXObject(o);
              break;
            } catch (t) {}
          }
          if (null == r) return !1;
        }
        null == t.mimeType &&
          createjs.RequestUtils.isText(t.type) &&
          (t.mimeType = "text/plain; charset=utf-8"),
          t.mimeType && r.overrideMimeType && r.overrideMimeType(t.mimeType),
          (this._xhrLevel = "string" == typeof r.responseType ? 2 : 1);
        var h = null,
          h =
            t.method == createjs.Methods.GET
              ? createjs.URLUtils.buildURI(t.src, t.values)
              : t.src;
        if (
          (r.open(t.method || createjs.Methods.GET, h, !0),
          e &&
            r instanceof XMLHttpRequest &&
            1 == this._xhrLevel &&
            (i.Origin = location.origin),
          t.values &&
            t.method == createjs.Methods.POST &&
            (i["Content-Type"] = "application/x-www-form-urlencoded"),
          e ||
            i["X-Requested-With"] ||
            (i["X-Requested-With"] = "XMLHttpRequest"),
          t.headers)
        )
          for (var c in t.headers) i[c] = t.headers[c];
        for (c in i) r.setRequestHeader(c, i[c]);
        return (
          r instanceof XMLHttpRequest &&
            void 0 !== t.withCredentials &&
            (r.withCredentials = t.withCredentials),
          (this._request = r),
          !0
        );
      }),
      (e._clean = function () {
        clearTimeout(this._loadTimeout),
          null != this._request.removeEventListener
            ? (this._request.removeEventListener(
                "loadstart",
                this._handleLoadStartProxy
              ),
              this._request.removeEventListener(
                "progress",
                this._handleProgressProxy
              ),
              this._request.removeEventListener(
                "abort",
                this._handleAbortProxy
              ),
              this._request.removeEventListener(
                "error",
                this._handleErrorProxy
              ),
              this._request.removeEventListener(
                "timeout",
                this._handleTimeoutProxy
              ),
              this._request.removeEventListener("load", this._handleLoadProxy),
              this._request.removeEventListener(
                "readystatechange",
                this._handleReadyStateChangeProxy
              ))
            : ((this._request.onloadstart = null),
              (this._request.onprogress = null),
              (this._request.onabort = null),
              (this._request.onerror = null),
              (this._request.ontimeout = null),
              (this._request.onload = null),
              (this._request.onreadystatechange = null));
      }),
      (e.toString = function () {
        return "[PreloadJS XHRRequest]";
      }),
      (createjs.XHRRequest = createjs.promote(t, "AbstractRequest"));
  })(),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractLoader_constructor(),
        (this._plugins = []),
        (this._typeCallbacks = {}),
        (this._extensionCallbacks = {}),
        (this.next = null),
        (this.maintainScriptOrder = !0),
        (this.stopOnError = !1),
        (this._maxConnections = 1),
        (this._availableLoaders = [
          createjs.FontLoader,
          createjs.ImageLoader,
          createjs.JavaScriptLoader,
          createjs.CSSLoader,
          createjs.JSONLoader,
          createjs.JSONPLoader,
          createjs.SoundLoader,
          createjs.ManifestLoader,
          createjs.SpriteSheetLoader,
          createjs.XMLLoader,
          createjs.SVGLoader,
          createjs.BinaryLoader,
          createjs.VideoLoader,
          createjs.TextLoader,
        ]),
        (this._defaultLoaderLength = this._availableLoaders.length),
        this.init(t, e, i);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      h = t;
    try {
      Object.defineProperties(h, {
        POST: {
          get: createjs.deprecate(function () {
            return createjs.Methods.POST;
          }, "AbstractLoader.POST"),
        },
        GET: {
          get: createjs.deprecate(function () {
            return createjs.Methods.GET;
          }, "AbstractLoader.GET"),
        },
        BINARY: {
          get: createjs.deprecate(function () {
            return createjs.Types.BINARY;
          }, "AbstractLoader.BINARY"),
        },
        CSS: {
          get: createjs.deprecate(function () {
            return createjs.Types.CSS;
          }, "AbstractLoader.CSS"),
        },
        FONT: {
          get: createjs.deprecate(function () {
            return createjs.Types.FONT;
          }, "AbstractLoader.FONT"),
        },
        FONTCSS: {
          get: createjs.deprecate(function () {
            return createjs.Types.FONTCSS;
          }, "AbstractLoader.FONTCSS"),
        },
        IMAGE: {
          get: createjs.deprecate(function () {
            return createjs.Types.IMAGE;
          }, "AbstractLoader.IMAGE"),
        },
        JAVASCRIPT: {
          get: createjs.deprecate(function () {
            return createjs.Types.JAVASCRIPT;
          }, "AbstractLoader.JAVASCRIPT"),
        },
        JSON: {
          get: createjs.deprecate(function () {
            return createjs.Types.JSON;
          }, "AbstractLoader.JSON"),
        },
        JSONP: {
          get: createjs.deprecate(function () {
            return createjs.Types.JSONP;
          }, "AbstractLoader.JSONP"),
        },
        MANIFEST: {
          get: createjs.deprecate(function () {
            return createjs.Types.MANIFEST;
          }, "AbstractLoader.MANIFEST"),
        },
        SOUND: {
          get: createjs.deprecate(function () {
            return createjs.Types.SOUND;
          }, "AbstractLoader.SOUND"),
        },
        VIDEO: {
          get: createjs.deprecate(function () {
            return createjs.Types.VIDEO;
          }, "AbstractLoader.VIDEO"),
        },
        SPRITESHEET: {
          get: createjs.deprecate(function () {
            return createjs.Types.SPRITESHEET;
          }, "AbstractLoader.SPRITESHEET"),
        },
        SVG: {
          get: createjs.deprecate(function () {
            return createjs.Types.SVG;
          }, "AbstractLoader.SVG"),
        },
        TEXT: {
          get: createjs.deprecate(function () {
            return createjs.Types.TEXT;
          }, "AbstractLoader.TEXT"),
        },
        XML: {
          get: createjs.deprecate(function () {
            return createjs.Types.XML;
          }, "AbstractLoader.XML"),
        },
      });
    } catch (t) {}
    (e.init = function (t, e, i) {
      (this.preferXHR = !0),
        (this._preferXHR = !0),
        this.setPreferXHR(t),
        (this._paused = !1),
        (this._basePath = e),
        (this._crossOrigin = i),
        (this._loadStartWasDispatched = !1),
        (this._currentlyLoadingScript = null),
        (this._currentLoads = []),
        (this._loadQueue = []),
        (this._loadQueueBackup = []),
        (this._loadItemsById = {}),
        (this._loadItemsBySrc = {}),
        (this._loadedResults = {}),
        (this._loadedRawResults = {}),
        (this._numItems = 0),
        (this._numItemsLoaded = 0),
        (this._scriptOrder = []),
        (this._loadedScripts = []),
        (this._lastProgress = NaN);
    }),
      (e.registerLoader = function (t) {
        if (!t || !t.canLoadItem)
          throw new Error("loader is of an incorrect type.");
        if (-1 != this._availableLoaders.indexOf(t))
          throw new Error("loader already exists.");
        this._availableLoaders.unshift(t);
      }),
      (e.unregisterLoader = function (t) {
        var e = this._availableLoaders.indexOf(t);
        -1 != e &&
          e < this._defaultLoaderLength - 1 &&
          this._availableLoaders.splice(e, 1);
      }),
      (e.setPreferXHR = function (t) {
        return (
          (this.preferXHR = 0 != t && null != window.XMLHttpRequest),
          this.preferXHR
        );
      }),
      (e.removeAll = function () {
        this.remove();
      }),
      (e.remove = function (t) {
        var e = null;
        if (t && !Array.isArray(t)) e = [t];
        else if (t) e = t;
        else if (0 < arguments.length) return;
        var i = !1;
        if (e) {
          for (; e.length; ) {
            for (
              var s = e.pop(),
                r = this.getResult(s),
                n = this._loadQueue.length - 1;
              0 <= n;
              n--
            )
              if ((a = this._loadQueue[n].getItem()).id == s || a.src == s) {
                this._loadQueue.splice(n, 1)[0].cancel();
                break;
              }
            for (n = this._loadQueueBackup.length - 1; 0 <= n; n--)
              if (
                (a = this._loadQueueBackup[n].getItem()).id == s ||
                a.src == s
              ) {
                this._loadQueueBackup.splice(n, 1)[0].cancel();
                break;
              }
            if (r) this._disposeItem(this.getItem(s));
            else
              for (var n = this._currentLoads.length - 1; 0 <= n; n--) {
                var a = this._currentLoads[n].getItem();
                if (a.id == s || a.src == s) {
                  this._currentLoads.splice(n, 1)[0].cancel(), (i = !0);
                  break;
                }
              }
          }
          i && this._loadNext();
        } else {
          for (var o in (this.close(), this._loadItemsById))
            this._disposeItem(this._loadItemsById[o]);
          this.init(this.preferXHR, this._basePath);
        }
      }),
      (e.reset = function () {
        for (var t in (this.close(), this._loadItemsById))
          this._disposeItem(this._loadItemsById[t]);
        for (var e = [], i = 0, s = this._loadQueueBackup.length; i < s; i++)
          e.push(this._loadQueueBackup[i].getItem());
        this.loadManifest(e, !1);
      }),
      (e.installPlugin = function (t) {
        if (null != t && null != t.getPreloadHandlers) {
          this._plugins.push(t);
          var e = t.getPreloadHandlers();
          if (((e.scope = t), null != e.types))
            for (var i = 0, s = e.types.length; i < s; i++)
              this._typeCallbacks[e.types[i]] = e;
          if (null != e.extensions)
            for (i = 0, s = e.extensions.length; i < s; i++)
              this._extensionCallbacks[e.extensions[i]] = e;
        }
      }),
      (e.setMaxConnections = function (t) {
        (this._maxConnections = t),
          !this._paused && 0 < this._loadQueue.length && this._loadNext();
      }),
      (e.loadFile = function (t, e, i) {
        var s;
        null != t
          ? (this._addItem(t, null, i),
            !1 !== e ? this.setPaused(!1) : this.setPaused(!0))
          : ((s = new createjs.ErrorEvent("PRELOAD_NO_FILE")),
            this._sendError(s));
      }),
      (e.loadManifest = function (t, e, i) {
        var s = null,
          r = null;
        if (Array.isArray(t)) {
          if (0 == t.length) {
            var n = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
            return void this._sendError(n);
          }
          s = t;
        } else if ("string" == typeof t) s = [{ src: t, type: h.MANIFEST }];
        else {
          if ("object" != typeof t) {
            n = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
            return void this._sendError(n);
          }
          void 0 !== t.src
            ? (null == t.type
                ? (t.type = h.MANIFEST)
                : t.type != h.MANIFEST &&
                  ((n = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE")),
                  this._sendError(n)),
              (s = [t]))
            : void 0 !== t.manifest && ((s = t.manifest), (r = t.path));
        }
        for (var a = 0, o = s.length; a < o; a++) this._addItem(s[a], r, i);
        !1 !== e ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (e.load = function () {
        this.setPaused(!1);
      }),
      (e.getItem = function (t) {
        return this._loadItemsById[t] || this._loadItemsBySrc[t];
      }),
      (e.getResult = function (t, e) {
        var i = this._loadItemsById[t] || this._loadItemsBySrc[t];
        if (null == i) return null;
        var s = i.id;
        return e && this._loadedRawResults[s]
          ? this._loadedRawResults[s]
          : this._loadedResults[s];
      }),
      (e.getItems = function (t) {
        var e = [];
        for (var i in this._loadItemsById) {
          var s = this._loadItemsById[i],
            r = this.getResult(i);
          (!0 === t && null == r) ||
            e.push({ item: s, result: r, rawResult: this.getResult(i, !0) });
        }
        return e;
      }),
      (e.setPaused = function (t) {
        (this._paused = t), this._paused || this._loadNext();
      }),
      (e.close = function () {
        for (; this._currentLoads.length; ) this._currentLoads.pop().cancel();
        (this._scriptOrder.length = 0),
          (this._loadedScripts.length = 0),
          (this.loadStartWasDispatched = !1),
          (this._itemCount = 0),
          (this._lastProgress = NaN);
      }),
      (e._addItem = function (t, e, i) {
        var s,
          r = this._createLoadItem(t, e, i);
        null == r ||
          (null != (s = this._createLoader(r)) &&
            ("plugins" in s && (s.plugins = this._plugins),
            (r._loader = s),
            this._loadQueue.push(s),
            this._loadQueueBackup.push(s),
            this._numItems++,
            this._updateProgress(),
            ((this.maintainScriptOrder &&
              r.type == createjs.Types.JAVASCRIPT) ||
              !0 === r.maintainOrder) &&
              (this._scriptOrder.push(r), this._loadedScripts.push(null))));
      }),
      (e._createLoadItem = function (t, e, i) {
        var s = createjs.LoadItem.create(t);
        if (null == s) return null;
        var r = "",
          n = i || this._basePath;
        if (s.src instanceof Object) {
          if (!s.type) return null;
          e
            ? ((r = e),
              (o = createjs.URLUtils.parseURI(e)),
              null == n || o.absolute || o.relative || (r = n + r))
            : null != n && (r = n);
        } else {
          var a = createjs.URLUtils.parseURI(s.src);
          a.extension && (s.ext = a.extension),
            null == s.type &&
              (s.type = createjs.RequestUtils.getTypeByExtension(s.ext));
          var o,
            h = s.src;
          a.absolute ||
            a.relative ||
            (e
              ? ((r = e),
                (o = createjs.URLUtils.parseURI(e)),
                (h = e + h),
                null == n || o.absolute || o.relative || (r = n + r))
              : null != n && (r = n)),
            (s.src = r + s.src);
        }
        (s.path = r),
          (void 0 !== s.id && null !== s.id && "" !== s.id) || (s.id = h);
        var c = this._typeCallbacks[s.type] || this._extensionCallbacks[s.ext];
        if (c) {
          var u = c.callback.call(c.scope, s, this);
          if (!1 === u) return null;
          !0 === u || (null != u && (s._loader = u)),
            null != (a = createjs.URLUtils.parseURI(s.src)).extension &&
              (s.ext = a.extension);
        }
        return (
          (this._loadItemsById[s.id] = s),
          null == (this._loadItemsBySrc[s.src] = s).crossOrigin &&
            (s.crossOrigin = this._crossOrigin),
          s
        );
      }),
      (e._createLoader = function (t) {
        if (null != t._loader) return t._loader;
        for (
          var e = this.preferXHR, i = 0;
          i < this._availableLoaders.length;
          i++
        ) {
          var s = this._availableLoaders[i];
          if (s && s.canLoadItem(t)) return new s(t, e);
        }
        return null;
      }),
      (e._loadNext = function () {
        if (!this._paused) {
          this._loadStartWasDispatched ||
            (this._sendLoadStart(), (this._loadStartWasDispatched = !0)),
            this._numItems == this._numItemsLoaded
              ? ((this.loaded = !0),
                this._sendComplete(),
                this.next && this.next.load && this.next.load())
              : (this.loaded = !1);
          for (
            var t = 0;
            t < this._loadQueue.length &&
            !(this._currentLoads.length >= this._maxConnections);
            t++
          ) {
            var e = this._loadQueue[t];
            this._canStartLoad(e) &&
              (this._loadQueue.splice(t, 1), t--, this._loadItem(e));
          }
        }
      }),
      (e._loadItem = function (t) {
        t.on("fileload", this._handleFileLoad, this),
          t.on("progress", this._handleProgress, this),
          t.on("complete", this._handleFileComplete, this),
          t.on("error", this._handleError, this),
          t.on("fileerror", this._handleFileError, this),
          this._currentLoads.push(t),
          this._sendFileStart(t.getItem()),
          t.load();
      }),
      (e._handleFileLoad = function (t) {
        (t.target = null), this.dispatchEvent(t);
      }),
      (e._handleFileError = function (t) {
        var e = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, t.item);
        this._sendError(e);
      }),
      (e._handleError = function (t) {
        var e = t.target;
        this._numItemsLoaded++,
          this._finishOrderedItem(e, !0),
          this._updateProgress();
        var i = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, e.getItem());
        this._sendError(i),
          this.stopOnError
            ? this.setPaused(!0)
            : (this._removeLoadItem(e),
              this._cleanLoadItem(e),
              this._loadNext());
      }),
      (e._handleFileComplete = function (t) {
        var e = t.target,
          i = e.getItem(),
          s = e.getResult();
        this._loadedResults[i.id] = s;
        var r = e.getResult(!0);
        null != r && r !== s && (this._loadedRawResults[i.id] = r),
          this._saveLoadedItems(e),
          this._removeLoadItem(e),
          this._finishOrderedItem(e) || this._processFinishedLoad(i, e),
          this._cleanLoadItem(e);
      }),
      (e._saveLoadedItems = function (t) {
        var e = t.getLoadedItems();
        if (null !== e)
          for (var i = 0; i < e.length; i++) {
            var s = e[i].item;
            (this._loadItemsBySrc[s.src] = s),
              (this._loadItemsById[s.id] = s),
              (this._loadedResults[s.id] = e[i].result),
              (this._loadedRawResults[s.id] = e[i].rawResult);
          }
      }),
      (e._finishOrderedItem = function (t, e) {
        var i = t.getItem();
        if (
          (this.maintainScriptOrder && i.type == createjs.Types.JAVASCRIPT) ||
          i.maintainOrder
        ) {
          t instanceof createjs.JavaScriptLoader &&
            (this._currentlyLoadingScript = !1);
          var s = createjs.indexOf(this._scriptOrder, i);
          return -1 == s
            ? !1
            : ((this._loadedScripts[s] = !0 === e || i),
              this._checkScriptLoadOrder(),
              !0);
        }
        return !1;
      }),
      (e._checkScriptLoadOrder = function () {
        for (var t = this._loadedScripts.length, e = 0; e < t; e++) {
          var i,
            s,
            r = this._loadedScripts[e];
          if (null === r) break;
          !0 !== r &&
            ((i = this._loadedResults[r.id]),
            r.type == createjs.Types.JAVASCRIPT &&
              createjs.DomUtils.appendToHead(i),
            (s = r._loader),
            this._processFinishedLoad(r, s),
            (this._loadedScripts[e] = !0));
        }
      }),
      (e._processFinishedLoad = function (t, e) {
        var i;
        this._numItemsLoaded++,
          this.maintainScriptOrder ||
            t.type != createjs.Types.JAVASCRIPT ||
            ((i = e.getTag()), createjs.DomUtils.appendToHead(i)),
          this._updateProgress(),
          this._sendFileComplete(t, e),
          this._loadNext();
      }),
      (e._canStartLoad = function (t) {
        if (!this.maintainScriptOrder || t.preferXHR) return !0;
        var e = t.getItem();
        if (e.type != createjs.Types.JAVASCRIPT) return !0;
        if (this._currentlyLoadingScript) return !1;
        for (var i = this._scriptOrder.indexOf(e), s = 0; s < i; ) {
          if (null == this._loadedScripts[s]) return !1;
          s++;
        }
        return (this._currentlyLoadingScript = !0);
      }),
      (e._removeLoadItem = function (t) {
        for (var e = this._currentLoads.length, i = 0; i < e; i++)
          if (this._currentLoads[i] == t) {
            this._currentLoads.splice(i, 1);
            break;
          }
      }),
      (e._cleanLoadItem = function (t) {
        var e = t.getItem();
        e && delete e._loader;
      }),
      (e._handleProgress = function (t) {
        var e = t.target;
        this._sendFileProgress(e.getItem(), e.progress), this._updateProgress();
      }),
      (e._updateProgress = function () {
        var t = this._numItemsLoaded / this._numItems,
          e = this._numItems - this._numItemsLoaded;
        if (0 < e) {
          for (var i = 0, s = 0, r = this._currentLoads.length; s < r; s++)
            i += this._currentLoads[s].progress;
          t += (i / e) * (e / this._numItems);
        }
        this._lastProgress != t &&
          (this._sendProgress(t), (this._lastProgress = t));
      }),
      (e._disposeItem = function (t) {
        delete this._loadedResults[t.id],
          delete this._loadedRawResults[t.id],
          delete this._loadItemsById[t.id],
          delete this._loadItemsBySrc[t.src];
      }),
      (e._sendFileProgress = function (t, e) {
        var i;
        this._isCanceled() ||
          this._paused ||
          (this.hasEventListener("fileprogress") &&
            (((i = new createjs.Event("fileprogress")).progress = e),
            (i.loaded = e),
            (i.total = 1),
            (i.item = t),
            this.dispatchEvent(i)));
      }),
      (e._sendFileComplete = function (t, e) {
        var i;
        this._isCanceled() ||
          this._paused ||
          (((i = new createjs.Event("fileload")).loader = e),
          (i.item = t),
          (i.result = this._loadedResults[t.id]),
          (i.rawResult = this._loadedRawResults[t.id]),
          t.completeHandler && t.completeHandler(i),
          this.hasEventListener("fileload") && this.dispatchEvent(i));
      }),
      (e._sendFileStart = function (t) {
        var e = new createjs.Event("filestart");
        (e.item = t),
          this.hasEventListener("filestart") && this.dispatchEvent(e);
      }),
      (e.toString = function () {
        return "[PreloadJS LoadQueue]";
      }),
      (createjs.LoadQueue = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.Types.TEXT);
    }
    createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.TEXT;
    }),
      (createjs.TextLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.Types.BINARY),
        this.on("initialize", this._updateXHR, this);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.BINARY;
    }),
      (e._updateXHR = function (t) {
        t.loader.setResponseType("arraybuffer");
      }),
      (createjs.BinaryLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.Types.CSS),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "href"),
        (this._tag = e ? createjs.Elements.style() : createjs.Elements.link()),
        (this._tag.rel = "stylesheet"),
        (this._tag.type = "text/css");
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.CSS;
    }),
      (e._formatResult = function (t) {
        var e, i;
        return (
          this._preferXHR
            ? (e = t.getTag()).styleSheet
              ? (e.styleSheet.cssText = t.getResult(!0))
              : ((i = createjs.Elements.text(t.getResult(!0))),
                e.appendChild(i))
            : (e = this._tag),
          createjs.DomUtils.appendToHead(e),
          e
        );
      }),
      (createjs.CSSLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function u(t, e) {
      this.AbstractLoader_constructor(t, e, t.type),
        (this._faces = {}),
        (this._watched = []),
        (this._count = 0),
        (this._watchInterval = null),
        (this._loadTimeout = null),
        (this._injectCSS = void 0 === t.injectCSS || t.injectCSS),
        this.dispatchEvent("initialize");
    }
    var t = createjs.extend(u, createjs.AbstractLoader);
    (u.canLoadItem = function (t) {
      return t.type == createjs.Types.FONT || t.type == createjs.Types.FONTCSS;
    }),
      (u.sampleText = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
      (u._ctx = document
        .createElement("canvas")
        .getContext("2d", { willReadFrequently: true })),
      (u._referenceFonts = ["serif", "monospace"]),
      (u.WEIGHT_REGEX =
        /[- ._]*(thin|normal|book|regular|medium|black|heavy|[1-9]00|(?:extra|ultra|semi|demi)?[- ._]*(?:light|bold))[- ._]*/gi),
      (u.STYLE_REGEX = /[- ._]*(italic|oblique)[- ._]*/gi),
      (u.FONT_FORMAT = {
        woff2: "woff2",
        woff: "woff",
        ttf: "truetype",
        otf: "truetype",
      }),
      (u.FONT_WEIGHT = {
        thin: 100,
        extralight: 200,
        ultralight: 200,
        light: 300,
        semilight: 300,
        demilight: 300,
        book: "normal",
        regular: "normal",
        semibold: 600,
        demibold: 600,
        extrabold: 800,
        ultrabold: 800,
        black: 900,
        heavy: 900,
      }),
      (u.WATCH_DURATION = 10),
      (t.load = function () {
        var t;
        if (this.type == createjs.Types.FONTCSS) {
          if (!this._watchCSS()) return void this.AbstractLoader_load();
        } else
          this._item.src instanceof Array
            ? this._watchFontArray()
            : ((t = this._defFromSrc(this._item.src)),
              this._watchFont(t),
              this._injectStyleTag(this._cssFromDef(t)));
        (this._loadTimeout = setTimeout(
          createjs.proxy(this._handleTimeout, this),
          this._item.loadTimeout
        )),
          this.dispatchEvent("loadstart");
      }),
      (t._handleTimeout = function () {
        this._stopWatching(),
          this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT"));
      }),
      (t._createRequest = function () {
        return this._request;
      }),
      (t.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            (this._rawResult = t.target._response),
              (this._result = !0),
              this._parseCSS(this._rawResult);
            break;
          case "error":
            this._stopWatching(), this.AbstractLoader_handleEvent(t);
        }
      }),
      (t._watchCSS = function () {
        var t = this._item.src;
        return (
          t instanceof HTMLStyleElement &&
            (this._injectCSS &&
              !t.parentNode &&
              (
                document.head || document.getElementsByTagName("head")[0]
              ).appendChild(t),
            (this._injectCSS = !1),
            (t = "\n" + t.textContent)),
          -1 !== t.search(/\n|\r|@font-face/i)
            ? (this._parseCSS(t), !0)
            : ((this._request = new createjs.XHRRequest(this._item)), !1)
        );
      }),
      (t._parseCSS = function (t) {
        for (var e = /@font-face\s*\{([^}]+)}/g; ; ) {
          var i = e.exec(t);
          if (!i) break;
          this._watchFont(this._parseFontFace(i[1]));
        }
        this._injectStyleTag(t);
      }),
      (t._watchFontArray = function () {
        for (var t = this._item.src, e = "", i = t.length - 1; 0 <= i; i--) {
          var s = t[i],
            r =
              "string" == typeof s ? this._defFromSrc(s) : this._defFromObj(s);
          this._watchFont(r), (e += this._cssFromDef(r) + "\n");
        }
        this._injectStyleTag(e);
      }),
      (t._injectStyleTag = function (t) {
        var e, i;
        this._injectCSS &&
          ((e = document.head || document.getElementsByTagName("head")[0]),
          ((i = document.createElement("style")).type = "text/css"),
          i.styleSheet
            ? (i.styleSheet.cssText = t)
            : i.appendChild(document.createTextNode(t)),
          e.appendChild(i));
      }),
      (t._parseFontFace = function (t) {
        var e = this._getCSSValue(t, "font-family"),
          i = this._getCSSValue(t, "src");
        return e && i
          ? this._defFromObj({
              family: e,
              src: i,
              style: this._getCSSValue(t, "font-style"),
              weight: this._getCSSValue(t, "font-weight"),
            })
          : null;
      }),
      (t._watchFont = function (t) {
        t &&
          !this._faces[t.id] &&
          ((this._faces[t.id] = t),
          this._watched.push(t),
          this._count++,
          this._calculateReferenceSizes(t),
          this._startWatching());
      }),
      (t._startWatching = function () {
        null == this._watchInterval &&
          (this._watchInterval = setInterval(
            createjs.proxy(this._watch, this),
            u.WATCH_DURATION
          ));
      }),
      (t._stopWatching = function () {
        clearInterval(this._watchInterval),
          clearTimeout(this._loadTimeout),
          (this._watchInterval = null);
      }),
      (t._watch = function () {
        for (
          var t = this._watched, e = u._referenceFonts, i = t.length, s = i - 1;
          0 <= s;
          s--
        )
          for (var r = t[s], n = r.refs, a = n.length - 1; 0 <= a; a--) {
            if (
              this._getTextWidth(r.family + "," + e[a], r.weight, r.style) !=
              n[a]
            ) {
              var o = new createjs.Event("fileload");
              (r.type = "font-family"),
                (o.item = r),
                this.dispatchEvent(o),
                t.splice(s, 1);
              break;
            }
          }
        i !== t.length &&
          ((o = new createjs.ProgressEvent(
            this._count - t.length,
            this._count
          )),
          this.dispatchEvent(o)),
          0 === i && (this._stopWatching(), this._sendComplete());
      }),
      (t._calculateReferenceSizes = function (t) {
        for (
          var e = u._referenceFonts, i = (t.refs = []), s = 0;
          s < e.length;
          s++
        )
          i[s] = this._getTextWidth(e[s], t.weight, t.style);
      }),
      (t._defFromSrc = function (t) {
        var e = /[- ._]+/g,
          i = t,
          s = null,
          r = i.search(/[?#]/);
        -1 !== r && (i = i.substr(0, r)),
          -1 !== (r = i.lastIndexOf(".")) &&
            ((s = i.substr(r + 1)), (i = i.substr(0, r))),
          -1 !== (r = i.lastIndexOf("/")) && (i = i.substr(r + 1));
        var n = i,
          a = n.match(u.WEIGHT_REGEX);
        a &&
          ((a = a[0]),
          (n = n.replace(a, "")),
          (a = a.replace(e, "").toLowerCase()));
        var o = i.match(u.STYLE_REGEX);
        o && ((n = n.replace(o[0], "")), (o = "italic")),
          (n = n.replace(e, ""));
        var h = "local('" + i.replace(e, " ") + "'), url('" + t + "')",
          c = u.FONT_FORMAT[s];
        return (
          c && (h += " format('" + c + "')"),
          this._defFromObj({
            family: n,
            weight: u.FONT_WEIGHT[a] || a,
            style: o,
            src: h,
          })
        );
      }),
      (t._defFromObj = function (t) {
        var e = {
          family: t.family,
          src: t.src,
          style: t.style || "normal",
          weight: t.weight || "normal",
        };
        return (e.id = e.family + ";" + e.style + ";" + e.weight), e;
      }),
      (t._cssFromDef = function (t) {
        return (
          "@font-face {\n\tfont-family: '" +
          t.family +
          "';\n\tfont-style: " +
          t.style +
          ";\n\tfont-weight: " +
          t.weight +
          ";\n\tsrc: " +
          t.src +
          ";\n}"
        );
      }),
      (t._getTextWidth = function (t, e, i) {
        var s = u._ctx;
        return (
          (s.font = i + " " + e + " 72px " + t),
          s.measureText(u.sampleText).width
        );
      }),
      (t._getCSSValue = function (t, e) {
        var i = new RegExp(e + ":s*([^;}]+?)s*[;}]").exec(t);
        return i && i[1] ? i[1] : null;
      }),
      (createjs.FontLoader = createjs.promote(u, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.Types.IMAGE),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "src"),
        createjs.DomUtils.isImageTag(t)
          ? (this._tag = t)
          : createjs.DomUtils.isImageTag(t.src)
          ? (this._tag = t.src)
          : createjs.DomUtils.isImageTag(t.tag) && (this._tag = t.tag),
        null != this._tag
          ? (this._preferXHR = !1)
          : (this._tag = createjs.Elements.img()),
        this.on("initialize", this._updateXHR, this);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.IMAGE;
    }),
      (e.load = function () {
        var t;
        "" != this._tag.src && this._tag.complete
          ? this._sendComplete()
          : (1 == (t = this._item.crossOrigin) && (t = "Anonymous"),
            null == t ||
              createjs.URLUtils.isLocal(this._item) ||
              (this._tag.crossOrigin = t),
            this.AbstractLoader_load());
      }),
      (e._updateXHR = function (t) {
        (t.loader.mimeType = "text/plain; charset=x-user-defined-binary"),
          t.loader.setResponseType && t.loader.setResponseType("blob");
      }),
      (e._formatResult = function (t) {
        return this._formatImage;
      }),
      (e._formatImage = function (t, e) {
        var i,
          s = this._tag,
          r = window.URL || window.webkitURL;
        this._preferXHR &&
          (r
            ? (this.getResult(!0) &&
                ((i = r.createObjectURL(this.getResult(!0))), (s.src = i)),
              s.addEventListener("load", this._cleanUpURL, !1),
              s.addEventListener("error", this._cleanUpURL, !1))
            : (s.src = this._item.src)),
          s.complete
            ? t(s)
            : ((s.onload = createjs.proxy(function () {
                t(this._tag), (s.onload = s.onerror = null);
              }, this)),
              (s.onerror = createjs.proxy(function (t) {
                e(new createjs.ErrorEvent("IMAGE_FORMAT", null, t)),
                  (s.onload = s.onerror = null);
              }, this)));
      }),
      (e._cleanUpURL = function (t) {
        (window.URL || window.webkitURL).revokeObjectURL(t.target.src);
      }),
      (createjs.ImageLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.Types.JAVASCRIPT),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "src"),
        this.setTag(createjs.Elements.script());
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.JAVASCRIPT;
    }),
      (e._formatResult = function (t) {
        var e = t.getTag();
        return this._preferXHR && (e.text = t.getResult(!0)), e;
      }),
      (createjs.JavaScriptLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.Types.JSON),
        (this.resultFormatter = this._formatResult);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.JSON;
    }),
      (e._formatResult = function (t) {
        var e = null;
        try {
          e = createjs.DataUtils.parseJSON(t.getResult(!0));
        } catch (t) {
          var i = new createjs.ErrorEvent("JSON_FORMAT", null, t);
          return this._sendError(i), t;
        }
        return e;
      }),
      (createjs.JSONLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !1, createjs.Types.JSONP),
        this.setTag(createjs.Elements.script()),
        (this.getTag().type = "text/javascript");
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.JSONP;
    }),
      (e.cancel = function () {
        this.AbstractLoader_cancel(), this._dispose();
      }),
      (e.load = function () {
        if (null == this._item.callback)
          throw new Error("callback is required for loading JSONP requests.");
        if (null != window[this._item.callback])
          throw new Error(
            "JSONP callback '" +
              this._item.callback +
              "' already exists on window. You need to specify a different callback or re-name the current one."
          );
        (window[this._item.callback] = createjs.proxy(this._handleLoad, this)),
          createjs.DomUtils.appendToBody(this._tag),
          (this._loadTimeout = setTimeout(
            createjs.proxy(this._handleTimeout, this),
            this._item.loadTimeout
          )),
          (this._tag.src = this._item.src);
      }),
      (e._handleLoad = function (t) {
        (this._result = this._rawResult = t),
          this._sendComplete(),
          this._dispose();
      }),
      (e._handleTimeout = function () {
        this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout"));
      }),
      (e._dispose = function () {
        createjs.DomUtils.removeChild(this._tag),
          delete window[this._item.callback],
          clearTimeout(this._loadTimeout);
      }),
      (createjs.JSONPLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.Types.MANIFEST),
        (this.plugins = null),
        (this._manifestQueue = null);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.MANIFEST_PROGRESS = 0.25),
      (i.canLoadItem = function (t) {
        return t.type == createjs.Types.MANIFEST;
      }),
      (e.load = function () {
        this.AbstractLoader_load();
      }),
      (e._createRequest = function () {
        var t = this._item.callback;
        this._request =
          null != t
            ? new createjs.JSONPLoader(this._item)
            : new createjs.JSONLoader(this._item);
      }),
      (e.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            return (
              (this._rawResult = t.target.getResult(!0)),
              (this._result = t.target.getResult()),
              this._sendProgress(i.MANIFEST_PROGRESS),
              void this._loadManifest(this._result)
            );
          case "progress":
            return (
              (t.loaded *= i.MANIFEST_PROGRESS),
              (this.progress = t.loaded / t.total),
              (!isNaN(this.progress) && this.progress != 1 / 0) ||
                (this.progress = 0),
              void this._sendProgress(t)
            );
        }
        this.AbstractLoader_handleEvent(t);
      }),
      (e.destroy = function () {
        this.AbstractLoader_destroy(), this._manifestQueue.close();
      }),
      (e._loadManifest = function (t) {
        if (t && t.manifest) {
          var e = (this._manifestQueue = new createjs.LoadQueue(
            this._preferXHR
          ));
          e.on("fileload", this._handleManifestFileLoad, this),
            e.on("progress", this._handleManifestProgress, this),
            e.on("complete", this._handleManifestComplete, this, !0),
            e.on("error", this._handleManifestError, this, !0);
          for (var i = 0, s = this.plugins.length; i < s; i++)
            e.installPlugin(this.plugins[i]);
          e.loadManifest(t);
        } else this._sendComplete();
      }),
      (e._handleManifestFileLoad = function (t) {
        (t.target = null), this.dispatchEvent(t);
      }),
      (e._handleManifestComplete = function (t) {
        (this._loadedItems = this._manifestQueue.getItems(!0)),
          this._sendComplete();
      }),
      (e._handleManifestProgress = function (t) {
        (this.progress =
          t.progress * (1 - i.MANIFEST_PROGRESS) + i.MANIFEST_PROGRESS),
          this._sendProgress(this.progress);
      }),
      (e._handleManifestError = function (t) {
        var e = new createjs.Event("fileerror");
        (e.item = t.data), this.dispatchEvent(e);
      }),
      (createjs.ManifestLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractMediaLoader_constructor(t, e, createjs.Types.SOUND),
        createjs.DomUtils.isAudioTag(t) || createjs.DomUtils.isAudioTag(t.src)
          ? (this._tag = t)
          : createjs.DomUtils.isAudioTag(t.tag) &&
            (this._tag = createjs.DomUtils.isAudioTag(t) ? t : t.src),
        null != this._tag && (this._preferXHR = !1);
    }
    var e = createjs.extend(t, createjs.AbstractMediaLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.SOUND;
    }),
      (e._createTag = function (t) {
        var e = createjs.Elements.audio();
        return (e.autoplay = !1), (e.preload = "none"), (e.src = t), e;
      }),
      (createjs.SoundLoader = createjs.promote(t, "AbstractMediaLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractMediaLoader_constructor(t, e, createjs.Types.VIDEO),
        createjs.DomUtils.isVideoTag(t) || createjs.DomUtils.isVideoTag(t.src)
          ? (this.setTag(createjs.DomUtils.isVideoTag(t) ? t : t.src),
            (this._preferXHR = !1))
          : this.setTag(this._createTag());
    }
    var e = t;
    (createjs.extend(t, createjs.AbstractMediaLoader)._createTag = function () {
      return createjs.Elements.video();
    }),
      (e.canLoadItem = function (t) {
        return t.type == createjs.Types.VIDEO;
      }),
      (createjs.VideoLoader = createjs.promote(t, "AbstractMediaLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.Types.SPRITESHEET),
        (this._manifestQueue = null);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.SPRITESHEET_PROGRESS = 0.25),
      (i.canLoadItem = function (t) {
        return t.type == createjs.Types.SPRITESHEET;
      }),
      (e.destroy = function () {
        this.AbstractLoader_destroy(), this._manifestQueue.close();
      }),
      (e._createRequest = function () {
        var t = this._item.callback;
        this._request =
          null != t
            ? new createjs.JSONPLoader(this._item)
            : new createjs.JSONLoader(this._item);
      }),
      (e.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            return (
              (this._rawResult = t.target.getResult(!0)),
              (this._result = t.target.getResult()),
              this._sendProgress(i.SPRITESHEET_PROGRESS),
              void this._loadManifest(this._result)
            );
          case "progress":
            return (
              (t.loaded *= i.SPRITESHEET_PROGRESS),
              (this.progress = t.loaded / t.total),
              (!isNaN(this.progress) && this.progress != 1 / 0) ||
                (this.progress = 0),
              void this._sendProgress(t)
            );
        }
        this.AbstractLoader_handleEvent(t);
      }),
      (e._loadManifest = function (t) {
        var e;
        t &&
          t.images &&
          ((e = this._manifestQueue =
            new createjs.LoadQueue(
              this._preferXHR,
              this._item.path,
              this._item.crossOrigin
            )).on("complete", this._handleManifestComplete, this, !0),
          e.on("fileload", this._handleManifestFileLoad, this),
          e.on("progress", this._handleManifestProgress, this),
          e.on("error", this._handleManifestError, this, !0),
          e.loadManifest(t.images));
      }),
      (e._handleManifestFileLoad = function (t) {
        var e,
          i,
          s = t.result;
        null != s &&
          ((i = (e = this.getResult().images).indexOf(t.item.src)), (e[i] = s));
      }),
      (e._handleManifestComplete = function (t) {
        (this._result = new createjs.SpriteSheet(this._result)),
          (this._loadedItems = this._manifestQueue.getItems(!0)),
          this._sendComplete();
      }),
      (e._handleManifestProgress = function (t) {
        (this.progress =
          t.progress * (1 - i.SPRITESHEET_PROGRESS) + i.SPRITESHEET_PROGRESS),
          this._sendProgress(this.progress);
      }),
      (e._handleManifestError = function (t) {
        var e = new createjs.Event("fileerror");
        (e.item = t.data), this.dispatchEvent(e);
      }),
      (createjs.SpriteSheetLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.Types.SVG),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "data"),
        e
          ? this.setTag(createjs.Elements.svg())
          : (this.setTag(createjs.Elements.object()),
            (this.getTag().type = "image/svg+xml"));
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.SVG;
    }),
      (e._formatResult = function (t) {
        var e = createjs.DataUtils.parseXML(t.getResult(!0)),
          i = t.getTag();
        if (
          (!this._preferXHR &&
            document.body.contains(i) &&
            document.body.removeChild(i),
          null == e.documentElement)
        )
          return e;
        var s = e.documentElement;
        return (
          document.importNode && (s = document.importNode(s, !0)),
          i.appendChild(s),
          i
        );
      }),
      (createjs.SVGLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.Types.XML),
        (this.resultFormatter = this._formatResult);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.canLoadItem = function (t) {
      return t.type == createjs.Types.XML;
    }),
      (e._formatResult = function (t) {
        return createjs.DataUtils.parseXML(t.getResult(!0));
      }),
      (createjs.XMLLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (function () {
    var t = (createjs.SoundJS = createjs.SoundJS || {});
    (t.version = "NEXT"), (t.buildDate = "Thu, 14 Sep 2017 22:19:45 GMT");
  })(),
  (function () {
    "use strict";
    function t() {
      throw "BrowserDetect cannot be instantiated";
    }
    var e = (t.agent = window.navigator.userAgent);
    (t.isWindowPhone =
      -1 < e.indexOf("IEMobile") || -1 < e.indexOf("Windows Phone")),
      (t.isFirefox = -1 < e.indexOf("Firefox")),
      (t.isOpera = null != window.opera),
      (t.isChrome = -1 < e.indexOf("Chrome")),
      (t.isIOS =
        (-1 < e.indexOf("iPod") ||
          -1 < e.indexOf("iPhone") ||
          -1 < e.indexOf("iPad")) &&
        !t.isWindowPhone),
      (t.isAndroid = -1 < e.indexOf("Android") && !t.isWindowPhone),
      (t.isBlackberry = -1 < e.indexOf("Blackberry")),
      (createjs.BrowserDetect = t);
  })(),
  (function () {
    "use strict";
    function t() {
      (this.interrupt = null),
        (this.delay = null),
        (this.offset = null),
        (this.loop = null),
        (this.volume = null),
        (this.pan = null),
        (this.startTime = null),
        (this.duration = null);
    }
    var e = (t.prototype = {}),
      i = t;
    (i.create = function (t) {
      if ("string" == typeof t)
        return (
          console &&
            (console.warn || console.log)(
              "Deprecated behaviour. Sound.play takes a configuration object instead of individual arguments. See docs for info."
            ),
          new createjs.PlayPropsConfig().set({ interrupt: t })
        );
      if (null == t || t instanceof i || t instanceof Object)
        return new createjs.PlayPropsConfig().set(t);
      if (null == t) throw new Error("PlayProps configuration not recognized.");
    }),
      (e.set = function (t) {
        if (null != t) for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.toString = function () {
        return "[PlayPropsConfig]";
      }),
      (createjs.PlayPropsConfig = i);
  })(),
  (function () {
    "use strict";
    function a() {
      throw "Sound cannot be instantiated";
    }
    var o = a;
    function h(t, e) {
      this.init(t, e);
    }
    (o.INTERRUPT_ANY = "any"),
      (o.INTERRUPT_EARLY = "early"),
      (o.INTERRUPT_LATE = "late"),
      (o.INTERRUPT_NONE = "none"),
      (o.PLAY_INITED = "playInited"),
      (o.PLAY_SUCCEEDED = "playSucceeded"),
      (o.PLAY_INTERRUPTED = "playInterrupted"),
      (o.PLAY_FINISHED = "playFinished"),
      (o.PLAY_FAILED = "playFailed"),
      (o.SUPPORTED_EXTENSIONS = [
        "mp3",
        "ogg",
        "opus",
        "mpeg",
        "wav",
        "m4a",
        "mp4",
        "aiff",
        "wma",
        "mid",
      ]),
      (o.EXTENSION_MAP = { m4a: "mp4" }),
      (o.FILE_PATTERN =
        /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/),
      (o.defaultInterruptBehavior = o.INTERRUPT_NONE),
      (o.alternateExtensions = []),
      (o.activePlugin = null),
      (o._masterVolume = 1),
      (o._getMasterVolume = function () {
        return this._masterVolume;
      }),
      (o.getVolume = createjs.deprecate(o._getMasterVolume, "Sound.getVolume")),
      (o._setMasterVolume = function (t) {
        if (
          null != Number(t) &&
          ((t = Math.max(0, Math.min(1, t))),
          (o._masterVolume = t),
          !this.activePlugin ||
            !this.activePlugin.setVolume ||
            !this.activePlugin.setVolume(t))
        )
          for (var e = this._instances, i = 0, s = e.length; i < s; i++)
            e[i].setMasterVolume(t);
      }),
      (o.setVolume = createjs.deprecate(o._setMasterVolume, "Sound.setVolume")),
      (o._masterMute = !1),
      (o._getMute = function () {
        return this._masterMute;
      }),
      (o.getMute = createjs.deprecate(o._getMute, "Sound.getMute")),
      (o._setMute = function (t) {
        if (
          null != t &&
          ((this._masterMute = t),
          !this.activePlugin ||
            !this.activePlugin.setMute ||
            !this.activePlugin.setMute(t))
        )
          for (var e = this._instances, i = 0, s = e.length; i < s; i++)
            e[i].setMasterMute(t);
      }),
      (o.setMute = createjs.deprecate(o._setMute, "Sound.setMute")),
      (o._getCapabilities = function () {
        return null == o.activePlugin ? null : o.activePlugin._capabilities;
      }),
      (o.getCapabilities = createjs.deprecate(
        o._getCapabilities,
        "Sound.getCapabilities"
      )),
      Object.defineProperties(o, {
        volume: { get: o._getMasterVolume, set: o._setMasterVolume },
        muted: { get: o._getMute, set: o._setMute },
        capabilities: { get: o._getCapabilities },
      }),
      (o._pluginsRegistered = !1),
      (o._lastID = 0),
      (o._instances = []),
      (o._idHash = {}),
      (o._preloadHash = {}),
      (o._defaultPlayPropsHash = {}),
      (o.addEventListener = null),
      (o.removeEventListener = null),
      (o.removeAllEventListeners = null),
      (o.dispatchEvent = null),
      (o.hasEventListener = null),
      (o._listeners = null),
      createjs.EventDispatcher.initialize(o),
      (o.getPreloadHandlers = function () {
        return {
          callback: createjs.proxy(o.initLoad, o),
          types: ["sound"],
          extensions: o.SUPPORTED_EXTENSIONS,
        };
      }),
      (o._handleLoadComplete = function (t) {
        var e = t.target.getItem().src;
        if (o._preloadHash[e])
          for (var i = 0, s = o._preloadHash[e].length; i < s; i++) {
            var r = o._preloadHash[e][i];
            (o._preloadHash[e][i] = !0),
              o.hasEventListener("fileload") &&
                (((t = new createjs.Event("fileload")).src = r.src),
                (t.id = r.id),
                (t.data = r.data),
                (t.sprite = r.sprite),
                o.dispatchEvent(t));
          }
      }),
      (o._handleLoadError = function (t) {
        var e = t.target.getItem().src;
        if (o._preloadHash[e])
          for (var i = 0, s = o._preloadHash[e].length; i < s; i++) {
            var r = o._preloadHash[e][i];
            (o._preloadHash[e][i] = !1),
              o.hasEventListener("fileerror") &&
                (((t = new createjs.Event("fileerror")).src = r.src),
                (t.id = r.id),
                (t.data = r.data),
                (t.sprite = r.sprite),
                o.dispatchEvent(t));
          }
      }),
      (o._registerPlugin = function (t) {
        return !!t.isSupported() && ((o.activePlugin = new t()), !0);
      }),
      (o.registerPlugins = function (t) {
        o._pluginsRegistered = !0;
        for (var e = 0, i = t.length; e < i; e++)
          if (o._registerPlugin(t[e])) return !0;
        return !1;
      }),
      (o.initializeDefaultPlugins = function () {
        return (
          null != o.activePlugin ||
          (!o._pluginsRegistered &&
            !!o.registerPlugins([
              createjs.WebAudioPlugin,
              createjs.HTMLAudioPlugin,
            ]))
        );
      }),
      (o.isReady = function () {
        return null != o.activePlugin;
      }),
      (o.initLoad = function (t) {
        return "video" == t.type || o._registerSound(t);
      }),
      (o._registerSound = function (t) {
        if (!o.initializeDefaultPlugins()) return !1;
        var e;
        if (
          (t.src instanceof Object
            ? ((e = o._parseSrc(t.src)).src = t.path + e.src)
            : (e = o._parsePath(t.src)),
          null == e)
        )
          return !1;
        (t.src = e.src), (t.type = "sound");
        var i = t.data,
          s = null;
        if (
          null != i &&
          (isNaN(i.channels)
            ? isNaN(i) || (s = parseInt(i))
            : (s = parseInt(i.channels)),
          i.audioSprite)
        )
          for (var r, n = i.audioSprite.length; n--; )
            (r = i.audioSprite[n]),
              (o._idHash[r.id] = {
                src: t.src,
                startTime: parseInt(r.startTime),
                duration: parseInt(r.duration),
              }),
              r.defaultPlayProps &&
                (o._defaultPlayPropsHash[r.id] =
                  createjs.PlayPropsConfig.create(r.defaultPlayProps));
        null != t.id && (o._idHash[t.id] = { src: t.src });
        var a = o.activePlugin.register(t);
        return (
          h.create(t.src, s),
          null != i && isNaN(i)
            ? (t.data.channels = s || h.maxPerChannel())
            : (t.data = s || h.maxPerChannel()),
          a.type && (t.type = a.type),
          t.defaultPlayProps &&
            (o._defaultPlayPropsHash[t.src] = createjs.PlayPropsConfig.create(
              t.defaultPlayProps
            )),
          a
        );
      }),
      (o.registerSound = function (t, e, i, s, r) {
        var n = { src: t, id: e, data: i, defaultPlayProps: r };
        t instanceof Object && t.src && ((s = e), (n = t)),
          null == ((n = createjs.LoadItem.create(n)).path = s) ||
            n.src instanceof Object ||
            (n.src = s + n.src);
        var a = o._registerSound(n);
        if (!a) return !1;
        if (
          (o._preloadHash[n.src] || (o._preloadHash[n.src] = []),
          o._preloadHash[n.src].push(n),
          1 == o._preloadHash[n.src].length)
        )
          a.on("complete", this._handleLoadComplete, this),
            a.on("error", this._handleLoadError, this),
            o.activePlugin.preload(a);
        else if (1 == o._preloadHash[n.src][0]) return !0;
        return n;
      }),
      (o.registerSounds = function (t, e) {
        var i = [];
        t.path && (e ? (e += t.path) : (e = t.path), (t = t.manifest));
        for (var s = 0, r = t.length; s < r; s++)
          i[s] = createjs.Sound.registerSound(
            t[s].src,
            t[s].id,
            t[s].data,
            e,
            t[s].defaultPlayProps
          );
        return i;
      }),
      (o.removeSound = function (t, e) {
        if (null == o.activePlugin) return !1;
        var i;
        if (
          (t instanceof Object && t.src && (t = t.src),
          null ==
            (i =
              t instanceof Object
                ? o._parseSrc(t)
                : ((t = o._getSrcById(t).src), o._parsePath(t))))
        )
          return !1;
        for (var s in ((t = i.src), null != e && (t = e + t), o._idHash))
          o._idHash[s].src == t && delete o._idHash[s];
        return (
          h.removeSrc(t),
          delete o._preloadHash[t],
          o.activePlugin.removeSound(t),
          !0
        );
      }),
      (o.removeSounds = function (t, e) {
        var i = [];
        t.path && (e ? (e += t.path) : (e = t.path), (t = t.manifest));
        for (var s = 0, r = t.length; s < r; s++)
          i[s] = createjs.Sound.removeSound(t[s].src, e);
        return i;
      }),
      (o.removeAllSounds = function () {
        (o._idHash = {}),
          (o._preloadHash = {}),
          h.removeAll(),
          o.activePlugin && o.activePlugin.removeAllSounds();
      }),
      (o.loadComplete = function (t) {
        if (!o.isReady()) return !1;
        var e = o._parsePath(t);
        return (
          (t = e ? o._getSrcById(e.src).src : o._getSrcById(t).src),
          null != o._preloadHash[t] && 1 == o._preloadHash[t][0]
        );
      }),
      (o._parsePath = function (t) {
        "string" != typeof t && (t = t.toString());
        var e = t.match(o.FILE_PATTERN);
        if (null == e) return !1;
        for (var i = e[4], s = e[5], r = o.capabilities, n = 0; !r[s]; )
          if (
            ((s = o.alternateExtensions[n++]), n > o.alternateExtensions.length)
          )
            return null;
        return {
          name: i,
          src: (t = t.replace("." + e[5], "." + s)),
          extension: s,
        };
      }),
      (o._parseSrc = function (t) {
        var e = { name: void 0, src: void 0, extension: void 0 },
          i = o.capabilities;
        for (var s in t)
          if (t.hasOwnProperty(s) && i[s]) {
            (e.src = t[s]), (e.extension = s);
            break;
          }
        if (!e.src) return !1;
        var r = e.src.lastIndexOf("/");
        return (e.name = -1 != r ? e.src.slice(r + 1) : e.src), e;
      }),
      (o.play = function (t, e) {
        var i = createjs.PlayPropsConfig.create(e),
          s = o.createInstance(t, i.startTime, i.duration);
        return o._playInstance(s, i) || s._playFailed(), s;
      }),
      (o.createInstance = function (t, e, i) {
        if (!o.initializeDefaultPlugins())
          return new createjs.DefaultSoundInstance(t, e, i);
        var s = o._defaultPlayPropsHash[t];
        t = o._getSrcById(t);
        var r = o._parsePath(t.src),
          n = null;
        return (
          null != r && null != r.src
            ? (h.create(r.src),
              null == e && (e = t.startTime),
              (n = o.activePlugin.create(r.src, e, i || t.duration)),
              (s = s || o._defaultPlayPropsHash[r.src]) && n.applyPlayProps(s))
            : (n = new createjs.DefaultSoundInstance(t, e, i)),
          (n.uniqueId = o._lastID++),
          n
        );
      }),
      (o.stop = function () {
        for (var t = this._instances, e = t.length; e--; ) t[e].stop();
      }),
      (o.setDefaultPlayProps = function (t, e) {
        (t = o._getSrcById(t)),
          (o._defaultPlayPropsHash[o._parsePath(t.src).src] =
            createjs.PlayPropsConfig.create(e));
      }),
      (o.getDefaultPlayProps = function (t) {
        return (
          (t = o._getSrcById(t)),
          o._defaultPlayPropsHash[o._parsePath(t.src).src]
        );
      }),
      (o._playInstance = function (t, e) {
        var i = o._defaultPlayPropsHash[t.src] || {};
        if (
          (null == e.interrupt &&
            (e.interrupt = i.interrupt || o.defaultInterruptBehavior),
          null == e.delay && (e.delay = i.delay || 0),
          null == e.offset && (e.offset = t.position),
          null == e.loop && (e.loop = t.loop),
          null == e.volume && (e.volume = t.volume),
          null == e.pan && (e.pan = t.pan),
          0 == e.delay)
        ) {
          if (!o._beginPlaying(t, e)) return !1;
        } else {
          var s = setTimeout(function () {
            o._beginPlaying(t, e);
          }, e.delay);
          t.delayTimeoutId = s;
        }
        return this._instances.push(t), !0;
      }),
      (o._beginPlaying = function (t, e) {
        if (!h.add(t, e.interrupt)) return !1;
        if (t._beginPlaying(e)) return !0;
        var i = createjs.indexOf(this._instances, t);
        return -1 < i && this._instances.splice(i, 1), !1;
      }),
      (o._getSrcById = function (t) {
        return o._idHash[t] || { src: t };
      }),
      (o._playFinished = function (t) {
        h.remove(t);
        var e = createjs.indexOf(this._instances, t);
        -1 < e && this._instances.splice(e, 1);
      }),
      (createjs.Sound = a),
      (h.channels = {}),
      (h.create = function (t, e) {
        return null == h.get(t) && ((h.channels[t] = new h(t, e)), !0);
      }),
      (h.removeSrc = function (t) {
        var e = h.get(t);
        return null != e && (e._removeAll(), delete h.channels[t], !0);
      }),
      (h.removeAll = function () {
        for (var t in h.channels) h.channels[t]._removeAll();
        h.channels = {};
      }),
      (h.add = function (t, e) {
        var i = h.get(t.src);
        return null != i && i._add(t, e);
      }),
      (h.remove = function (t) {
        var e = h.get(t.src);
        return null != e && (e._remove(t), !0);
      }),
      (h.maxPerChannel = function () {
        return t.maxDefault;
      }),
      (h.get = function (t) {
        return h.channels[t];
      });
    var t = h.prototype;
    (t.constructor = h),
      (t.src = null),
      (t.max = null),
      (t.maxDefault = 100),
      (t.length = 0),
      (t.init = function (t, e) {
        (this.src = t),
          (this.max = e || this.maxDefault),
          -1 == this.max && (this.max = this.maxDefault),
          (this._instances = []);
      }),
      (t._get = function (t) {
        return this._instances[t];
      }),
      (t._add = function (t, e) {
        return (
          !!this._getSlot(e, t) && (this._instances.push(t), this.length++, !0)
        );
      }),
      (t._remove = function (t) {
        var e = createjs.indexOf(this._instances, t);
        return -1 != e && (this._instances.splice(e, 1), this.length--, !0);
      }),
      (t._removeAll = function () {
        for (var t = this.length - 1; 0 <= t; t--) this._instances[t].stop();
      }),
      (t._getSlot = function (t, e) {
        var i, s;
        if (t != a.INTERRUPT_NONE && null == (s = this._get(0))) return !0;
        for (var r = 0, n = this.max; r < n; r++) {
          if (null == (i = this._get(r))) return !0;
          if (
            i.playState == a.PLAY_FINISHED ||
            i.playState == a.PLAY_INTERRUPTED ||
            i.playState == a.PLAY_FAILED
          ) {
            s = i;
            break;
          }
          t != a.INTERRUPT_NONE &&
            ((t == a.INTERRUPT_EARLY && i.position < s.position) ||
              (t == a.INTERRUPT_LATE && i.position > s.position)) &&
            (s = i);
        }
        return null != s && (s._interrupt(), this._remove(s), !0);
      }),
      (t.toString = function () {
        return "[Sound SoundChannel]";
      });
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.EventDispatcher_constructor(),
        (this.src = t),
        (this.uniqueId = -1),
        (this.playState = null),
        (this.delayTimeoutId = null),
        (this._volume = 1),
        Object.defineProperty(this, "volume", {
          get: this._getVolume,
          set: this._setVolume,
        }),
        (this._pan = 0),
        Object.defineProperty(this, "pan", {
          get: this._getPan,
          set: this._setPan,
        }),
        (this._startTime = Math.max(0, e || 0)),
        Object.defineProperty(this, "startTime", {
          get: this._getStartTime,
          set: this._setStartTime,
        }),
        (this._duration = Math.max(0, i || 0)),
        Object.defineProperty(this, "duration", {
          get: this._getDuration,
          set: this._setDuration,
        }),
        (this._playbackResource = null),
        Object.defineProperty(this, "playbackResource", {
          get: this._getPlaybackResource,
          set: this._setPlaybackResource,
        }),
        !1 !== s && !0 !== s && this._setPlaybackResource(s),
        (this._position = 0),
        Object.defineProperty(this, "position", {
          get: this._getPosition,
          set: this._setPosition,
        }),
        (this._loop = 0),
        Object.defineProperty(this, "loop", {
          get: this._getLoop,
          set: this._setLoop,
        }),
        (this._muted = !1),
        Object.defineProperty(this, "muted", {
          get: this._getMuted,
          set: this._setMuted,
        }),
        (this._paused = !1),
        Object.defineProperty(this, "paused", {
          get: this._getPaused,
          set: this._setPaused,
        });
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (e.play = function (t) {
      var e = createjs.PlayPropsConfig.create(t);
      return this.playState == createjs.Sound.PLAY_SUCCEEDED
        ? (this.applyPlayProps(e), void (this._paused && this._setPaused(!1)))
        : (this._cleanUp(), createjs.Sound._playInstance(this, e), this);
    }),
      (e.stop = function () {
        return (
          (this._position = 0),
          (this._paused = !1),
          this._handleStop(),
          this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FINISHED),
          this
        );
      }),
      (e.destroy = function () {
        this._cleanUp(),
          (this.src = null),
          (this.playbackResource = null),
          this.removeAllEventListeners();
      }),
      (e.applyPlayProps = function (t) {
        return (
          null != t.offset && this._setPosition(t.offset),
          null != t.loop && this._setLoop(t.loop),
          null != t.volume && this._setVolume(t.volume),
          null != t.pan && this._setPan(t.pan),
          null != t.startTime &&
            (this._setStartTime(t.startTime), this._setDuration(t.duration)),
          this
        );
      }),
      (e.toString = function () {
        return "[AbstractSoundInstance]";
      }),
      (e._getPaused = function () {
        return this._paused;
      }),
      (e._setPaused = function (t) {
        if (
          !(
            (!0 !== t && !1 !== t) ||
            this._paused == t ||
            (1 == t && this.playState != createjs.Sound.PLAY_SUCCEEDED)
          )
        )
          return (
            (this._paused = t) ? this._pause() : this._resume(),
            clearTimeout(this.delayTimeoutId),
            this
          );
      }),
      (e._setVolume = function (t) {
        return (
          t == this._volume ||
            ((this._volume = Math.max(0, Math.min(1, t))),
            this._muted || this._updateVolume()),
          this
        );
      }),
      (e._getVolume = function () {
        return this._volume;
      }),
      (e._setMuted = function (t) {
        if (!0 === t || !1 === t)
          return (this._muted = t), this._updateVolume(), this;
      }),
      (e._getMuted = function () {
        return this._muted;
      }),
      (e._setPan = function (t) {
        return (
          t == this._pan ||
            ((this._pan = Math.max(-1, Math.min(1, t))), this._updatePan()),
          this
        );
      }),
      (e._getPan = function () {
        return this._pan;
      }),
      (e._getPosition = function () {
        return (
          this._paused ||
            this.playState != createjs.Sound.PLAY_SUCCEEDED ||
            (this._position = this._calculateCurrentPosition()),
          this._position
        );
      }),
      (e._setPosition = function (t) {
        return (
          (this._position = Math.max(0, t)),
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            this._updatePosition(),
          this
        );
      }),
      (e._getStartTime = function () {
        return this._startTime;
      }),
      (e._setStartTime = function (t) {
        return (
          t == this._startTime ||
            ((this._startTime = Math.max(0, t || 0)), this._updateStartTime()),
          this
        );
      }),
      (e._getDuration = function () {
        return this._duration;
      }),
      (e._setDuration = function (t) {
        return (
          t == this._duration ||
            ((this._duration = Math.max(0, t || 0)), this._updateDuration()),
          this
        );
      }),
      (e._setPlaybackResource = function (t) {
        return (
          (this._playbackResource = t),
          0 == this._duration &&
            this._playbackResource &&
            this._setDurationFromSource(),
          this
        );
      }),
      (e._getPlaybackResource = function () {
        return this._playbackResource;
      }),
      (e._getLoop = function () {
        return this._loop;
      }),
      (e._setLoop = function (t) {
        null != this._playbackResource &&
          (0 != this._loop && 0 == t
            ? this._removeLooping(t)
            : 0 == this._loop && 0 != t && this._addLooping(t)),
          (this._loop = t);
      }),
      (e._sendEvent = function (t) {
        var e = new createjs.Event(t);
        this.dispatchEvent(e);
      }),
      (e._cleanUp = function () {
        clearTimeout(this.delayTimeoutId),
          this._handleCleanUp(),
          (this._paused = !1),
          createjs.Sound._playFinished(this);
      }),
      (e._interrupt = function () {
        this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_INTERRUPTED),
          this._sendEvent("interrupted");
      }),
      (e._beginPlaying = function (t) {
        return (
          this._setPosition(t.offset),
          this._setLoop(t.loop),
          this._setVolume(t.volume),
          this._setPan(t.pan),
          null != t.startTime &&
            (this._setStartTime(t.startTime), this._setDuration(t.duration)),
          null != this._playbackResource && this._position < this._duration
            ? ((this._paused = !1),
              this._handleSoundReady(),
              (this.playState = createjs.Sound.PLAY_SUCCEEDED),
              this._sendEvent("succeeded"),
              !0)
            : (this._playFailed(), !1)
        );
      }),
      (e._playFailed = function () {
        this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FAILED),
          this._sendEvent("failed");
      }),
      (e._handleSoundComplete = function (t) {
        if ((this._position = 0) != this._loop)
          return this._loop--, this._handleLoop(), void this._sendEvent("loop");
        this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FINISHED),
          this._sendEvent("complete");
      }),
      (e._handleSoundReady = function () {}),
      (e._updateVolume = function () {}),
      (e._updatePan = function () {}),
      (e._updateStartTime = function () {}),
      (e._updateDuration = function () {}),
      (e._setDurationFromSource = function () {}),
      (e._calculateCurrentPosition = function () {}),
      (e._updatePosition = function () {}),
      (e._removeLooping = function (t) {}),
      (e._addLooping = function (t) {}),
      (e._pause = function () {}),
      (e._resume = function () {}),
      (e._handleStop = function () {}),
      (e._handleCleanUp = function () {}),
      (e._handleLoop = function () {}),
      (createjs.AbstractSoundInstance = createjs.promote(t, "EventDispatcher")),
      (createjs.DefaultSoundInstance = createjs.AbstractSoundInstance);
  })(),
  (function () {
    "use strict";
    function t() {
      (this._capabilities = null),
        (this._loaders = {}),
        (this._audioSources = {}),
        (this._soundInstances = {}),
        (this._volume = 1),
        this._loaderClass,
        this._soundInstanceClass;
    }
    var e = t.prototype;
    (t._capabilities = null),
      (t.isSupported = function () {
        return !0;
      }),
      (e.register = function (t) {
        var e = this._loaders[t.src];
        return e && !e.canceled
          ? this._loaders[t.src]
          : ((this._audioSources[t.src] = !0),
            (this._soundInstances[t.src] = []),
            (e = new this._loaderClass(t)).on(
              "complete",
              this._handlePreloadComplete,
              this
            ),
            (this._loaders[t.src] = e));
      }),
      (e.preload = function (t) {
        t.on("error", this._handlePreloadError, this), t.load();
      }),
      (e.isPreloadStarted = function (t) {
        return null != this._audioSources[t];
      }),
      (e.isPreloadComplete = function (t) {
        return !(null == this._audioSources[t] || 1 == this._audioSources[t]);
      }),
      (e.removeSound = function (t) {
        if (this._soundInstances[t]) {
          for (var e = this._soundInstances[t].length; e--; ) {
            this._soundInstances[t][e].destroy();
          }
          delete this._soundInstances[t],
            delete this._audioSources[t],
            this._loaders[t] && this._loaders[t].destroy(),
            delete this._loaders[t];
        }
      }),
      (e.removeAllSounds = function () {
        for (var t in this._audioSources) this.removeSound(t);
      }),
      (e.create = function (t, e, i) {
        this.isPreloadStarted(t) || this.preload(this.register(t));
        var s = new this._soundInstanceClass(t, e, i, this._audioSources[t]);
        return (
          this._soundInstances[t] && this._soundInstances[t].push(s),
          s.setMasterVolume && s.setMasterVolume(createjs.Sound.volume),
          s.setMasterMute && s.setMasterMute(createjs.Sound.muted),
          s
        );
      }),
      (e.setVolume = function (t) {
        return (this._volume = t), this._updateVolume(), !0;
      }),
      (e.getVolume = function () {
        return this._volume;
      }),
      (e.setMute = function (t) {
        return this._updateVolume(), !0;
      }),
      (e.toString = function () {
        return "[AbstractPlugin]";
      }),
      (e._handlePreloadComplete = function (t) {
        var e = t.target.getItem().src;
        this._audioSources[e] = t.result;
        for (var i = 0, s = this._soundInstances[e].length; i < s; i++) {
          this._soundInstances[e][i].setPlaybackResource(this._audioSources[e]),
            (this._soundInstances[e] = null);
        }
      }),
      (e._handlePreloadError = function (t) {}),
      (e._updateVolume = function () {}),
      (createjs.AbstractPlugin = t);
  })(),
  (function () {
    "use strict";
    function e(t) {
      this.AbstractLoader_constructor(t, !0, createjs.Types.SOUND);
    }
    var t = createjs.extend(e, createjs.AbstractLoader);
    (e.context = null),
      (t.toString = function () {
        return "[WebAudioLoader]";
      }),
      (t._createRequest = function () {
        (this._request = new createjs.XHRRequest(this._item, !1)),
          this._request.setResponseType("arraybuffer");
      }),
      (t._sendComplete = function (t) {
        e.context.decodeAudioData(
          this._rawResult,
          createjs.proxy(this._handleAudioDecoded, this),
          createjs.proxy(this._sendError, this)
        );
      }),
      (t._handleAudioDecoded = function (t) {
        (this._result = t), this.AbstractLoader__sendComplete();
      }),
      (createjs.WebAudioLoader = createjs.promote(e, "AbstractLoader"));
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.AbstractSoundInstance_constructor(t, e, i, s),
        (this.gainNode = r.context.createGain()),
        (this.panNode = r.context.createPanner()),
        (this.panNode.panningModel = r._panningModel),
        this.panNode.connect(this.gainNode),
        this._updatePan(),
        (this.sourceNode = null),
        (this._soundCompleteTimeout = null),
        (this._sourceNodeNext = null),
        (this._playbackStartTime = 0),
        (this._endedHandler = createjs.proxy(this._handleSoundComplete, this));
    }
    var e = createjs.extend(t, createjs.AbstractSoundInstance),
      r = t;
    (r.context = null),
      (r._scratchBuffer = null),
      (r.destinationNode = null),
      (r._panningModel = "equalpower"),
      (e.destroy = function () {
        this.AbstractSoundInstance_destroy(),
          this.panNode.disconnect(0),
          (this.panNode = null),
          this.gainNode.disconnect(0),
          (this.gainNode = null);
      }),
      (e.toString = function () {
        return "[WebAudioSoundInstance]";
      }),
      (e._updatePan = function () {
        this.panNode.setPosition(this._pan, 0, -0.5);
      }),
      (e._removeLooping = function (t) {
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
      }),
      (e._addLooping = function (t) {
        this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          (this._sourceNodeNext = this._createAndPlayAudioNode(
            this._playbackStartTime,
            0
          ));
      }),
      (e._setDurationFromSource = function () {
        this._duration = 1e3 * this.playbackResource.duration;
      }),
      (e._handleCleanUp = function () {
        this.sourceNode &&
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          ((this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(
            this._sourceNodeNext
          ))),
          0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
          clearTimeout(this._soundCompleteTimeout),
          (this._playbackStartTime = 0);
      }),
      (e._cleanUpAudioNode = function (t) {
        if (t) {
          if ((t.stop(0), t.disconnect(0), createjs.BrowserDetect.isIOS))
            try {
              t.buffer = r._scratchBuffer;
            } catch (t) {}
          t = null;
        }
        return t;
      }),
      (e._handleSoundReady = function (t) {
        this.gainNode.connect(r.destinationNode);
        var e = 0.001 * this._duration,
          i = Math.min(0.001 * Math.max(0, this._position), e);
        (this.sourceNode = this._createAndPlayAudioNode(
          r.context.currentTime - e,
          i
        )),
          (this._playbackStartTime = this.sourceNode.startTime - i),
          (this._soundCompleteTimeout = setTimeout(
            this._endedHandler,
            1e3 * (e - i)
          )),
          0 != this._loop &&
            (this._sourceNodeNext = this._createAndPlayAudioNode(
              this._playbackStartTime,
              0
            ));
      }),
      (e._createAndPlayAudioNode = function (t, e) {
        var i = r.context.createBufferSource();
        (i.buffer = this.playbackResource), i.connect(this.panNode);
        var s = 0.001 * this._duration;
        return (
          (i.startTime = t + s),
          i.start(i.startTime, e + 0.001 * this._startTime, s - e),
          i
        );
      }),
      (e._pause = function () {
        (this._position =
          1e3 * (r.context.currentTime - this._playbackStartTime)),
          (this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
          0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
          clearTimeout(this._soundCompleteTimeout);
      }),
      (e._resume = function () {
        this._handleSoundReady();
      }),
      (e._updateVolume = function () {
        var t = this._muted ? 0 : this._volume;
        t != this.gainNode.gain.value && (this.gainNode.gain.value = t);
      }),
      (e._calculateCurrentPosition = function () {
        return 1e3 * (r.context.currentTime - this._playbackStartTime);
      }),
      (e._updatePosition = function () {
        (this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
          clearTimeout(this._soundCompleteTimeout),
          this._paused || this._handleSoundReady();
      }),
      (e._handleLoop = function () {
        this._cleanUpAudioNode(this.sourceNode),
          (this.sourceNode = this._sourceNodeNext),
          (this._playbackStartTime = this.sourceNode.startTime),
          (this._sourceNodeNext = this._createAndPlayAudioNode(
            this._playbackStartTime,
            0
          )),
          (this._soundCompleteTimeout = setTimeout(
            this._endedHandler,
            this._duration
          ));
      }),
      (e._updateDuration = function () {
        this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          (this._pause(), this._resume());
      }),
      (createjs.WebAudioSoundInstance = createjs.promote(
        t,
        "AbstractSoundInstance"
      ));
  })(),
  (function () {
    "use strict";
    function t() {
      this.AbstractPlugin_constructor(),
        (this._panningModel = o._panningModel),
        (this.context = o.context),
        (this.dynamicsCompressorNode = this.context.createDynamicsCompressor()),
        this.dynamicsCompressorNode.connect(this.context.destination),
        (this.gainNode = this.context.createGain()),
        this.gainNode.connect(this.dynamicsCompressorNode),
        (createjs.WebAudioSoundInstance.destinationNode = this.gainNode),
        (this._capabilities = o._capabilities),
        (this._loaderClass = createjs.WebAudioLoader),
        (this._soundInstanceClass = createjs.WebAudioSoundInstance),
        this._addPropsToClasses();
    }
    var e = createjs.extend(t, createjs.AbstractPlugin),
      o = t;
    (o._capabilities = null),
      (o._panningModel = "equalpower"),
      (o.context = null),
      (o._scratchBuffer = null),
      (o._unlocked = !1),
      (o.DEFAULT_SAMPLE_RATE = 44100),
      (o.isSupported = function () {
        var t =
          createjs.BrowserDetect.isIOS ||
          createjs.BrowserDetect.isAndroid ||
          createjs.BrowserDetect.isBlackberry;
        return (
          !(
            "file:" == location.protocol &&
            !t &&
            !this._isFileXHRSupported()
          ) && (o._generateCapabilities(), null != o.context)
        );
      }),
      (o.playEmptySound = function () {
        var t;
        null != o.context &&
          (((t = o.context.createBufferSource()).buffer = o._scratchBuffer),
          t.connect(o.context.destination),
          t.start(0, 0, 0));
      }),
      (o._isFileXHRSupported = function () {
        var e = !0,
          t = new XMLHttpRequest();
        try {
          t.open("GET", "WebAudioPluginTest.fail", !1);
        } catch (t) {
          return (e = !1);
        }
        (t.onerror = function () {
          e = !1;
        }),
          (t.onload = function () {
            e =
              404 == this.status ||
              200 == this.status ||
              (0 == this.status && "" != this.response);
          });
        try {
          t.send();
        } catch (t) {
          e = !1;
        }
        return e;
      }),
      (o._generateCapabilities = function () {
        if (null == o._capabilities) {
          var t = document.createElement("audio");
          if (null == t.canPlayType) return null;
          if (
            null == o.context &&
            ((o.context = o._createAudioContext()), null == o.context)
          )
            return null;
          null == o._scratchBuffer &&
            (o._scratchBuffer = o.context.createBuffer(1, 1, 22050)),
            o._compatibilitySetUp(),
            "ontouchstart" in window &&
              "running" != o.context.state &&
              (o._unlock(),
              document.addEventListener("mousedown", o._unlock, !0),
              document.addEventListener("touchstart", o._unlock, !0),
              document.addEventListener("touchend", o._unlock, !0)),
            (o._capabilities = { panning: !0, volume: !0, tracks: -1 });
          for (
            var e = createjs.Sound.SUPPORTED_EXTENSIONS,
              i = createjs.Sound.EXTENSION_MAP,
              s = 0,
              r = e.length;
            s < r;
            s++
          ) {
            var n = e[s],
              a = i[n] || n;
            o._capabilities[n] =
              ("no" != t.canPlayType("audio/" + n) &&
                "" != t.canPlayType("audio/" + n)) ||
              ("no" != t.canPlayType("audio/" + a) &&
                "" != t.canPlayType("audio/" + a));
          }
          o.context.destination.numberOfChannels < 2 &&
            (o._capabilities.panning = !1);
        }
      }),
      (o._createAudioContext = function () {
        var t = window.AudioContext || window.webkitAudioContext;
        if (t == null) return null;
        let e,
          i,
          s = new t();
        return (
          /(iPhone|iPad)/i.test(navigator.userAgent) &&
            s.sampleRate !== o.DEFAULT_SAMPLE_RATE &&
            ((e = s.createBuffer(1, 1, o.DEFAULT_SAMPLE_RATE)),
            ((i = s.createBufferSource()).buffer = e),
            i.connect(s.destination),
            i.start(0),
            i.disconnect(),
            s.close(),
            (s = new t())),
          s
        );
      }),
      (o._compatibilitySetUp = function () {
        var t;
        (o._panningModel = "equalpower"),
          o.context.createGain ||
            ((o.context.createGain = o.context.createGainNode),
            ((t = o.context.createBufferSource()).__proto__.start =
              t.__proto__.noteGrainOn),
            (t.__proto__.stop = t.__proto__.noteOff),
            (o._panningModel = 0));
      }),
      (o._unlock = function () {
        o._unlocked ||
          (o.playEmptySound(),
          "running" == o.context.state &&
            (document.removeEventListener("mousedown", o._unlock, !0),
            document.removeEventListener("touchend", o._unlock, !0),
            document.removeEventListener("touchstart", o._unlock, !0),
            (o._unlocked = !0)));
      }),
      (e.toString = function () {
        return "[WebAudioPlugin]";
      }),
      (e._addPropsToClasses = function () {
        var t = this._soundInstanceClass;
        (t.context = this.context),
          (t._scratchBuffer = o._scratchBuffer),
          (t.destinationNode = this.gainNode),
          (t._panningModel = this._panningModel),
          (this._loaderClass.context = this.context);
      }),
      (e._updateVolume = function () {
        var t = createjs.Sound._masterMute ? 0 : this._volume;
        t != this.gainNode.gain.value && (this.gainNode.gain.value = t);
      }),
      (createjs.WebAudioPlugin = createjs.promote(t, "AbstractPlugin"));
  })(),
  (function () {
    "use strict";
    function t() {
      throw "HTMLAudioTagPool cannot be instantiated";
    }
    var i = t;
    function e(t) {
      this._tags = [];
    }
    (i._tags = {}),
      (i._tagPool = new e()),
      (i._tagUsed = {}),
      (i.get = function (t) {
        var e = i._tags[t];
        return (
          null == e
            ? ((e = i._tags[t] = i._tagPool.get()).src = t)
            : i._tagUsed[t]
            ? ((e = i._tagPool.get()).src = t)
            : (i._tagUsed[t] = !0),
          e
        );
      }),
      (i.set = function (t, e) {
        e == i._tags[t] ? (i._tagUsed[t] = !1) : i._tagPool.set(e);
      }),
      (i.remove = function (t) {
        var e = i._tags[t];
        return (
          null != e &&
          (i._tagPool.set(e), delete i._tags[t], delete i._tagUsed[t], !0)
        );
      }),
      (i.getDuration = function (t) {
        var e = i._tags[t];
        return null != e && e.duration ? 1e3 * e.duration : 0;
      }),
      (createjs.HTMLAudioTagPool = t);
    var s = e.prototype;
    (s.constructor = e),
      (s.get = function () {
        var t = 0 == this._tags.length ? this._createTag() : this._tags.pop();
        return null == t.parentNode && document.body.appendChild(t), t;
      }),
      (s.set = function (t) {
        -1 == createjs.indexOf(this._tags, t) &&
          ((this._tags.src = null), this._tags.push(t));
      }),
      (s.toString = function () {
        return "[TagPool]";
      }),
      (s._createTag = function () {
        var t = document.createElement("audio");
        return (t.autoplay = !1), (t.preload = "none"), t;
      });
  })(),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.AbstractSoundInstance_constructor(t, e, i, s),
        (this._audioSpriteStopTime = null),
        (this._delayTimeoutId = null),
        (this._endedHandler = createjs.proxy(this._handleSoundComplete, this)),
        (this._readyHandler = createjs.proxy(this._handleTagReady, this)),
        (this._stalledHandler = createjs.proxy(this._playFailed, this)),
        (this._audioSpriteEndHandler = createjs.proxy(
          this._handleAudioSpriteLoop,
          this
        )),
        (this._loopHandler = createjs.proxy(this._handleSoundComplete, this)),
        i
          ? (this._audioSpriteStopTime = 0.001 * (e + i))
          : (this._duration = createjs.HTMLAudioTagPool.getDuration(this.src));
    }
    var e = createjs.extend(t, createjs.AbstractSoundInstance);
    (e.setMasterVolume = function (t) {
      this._updateVolume();
    }),
      (e.setMasterMute = function (t) {
        this._updateVolume();
      }),
      (e.toString = function () {
        return "[HTMLAudioSoundInstance]";
      }),
      (e._removeLooping = function () {
        null != this._playbackResource &&
          ((this._playbackResource.loop = !1),
          this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ));
      }),
      (e._addLooping = function () {
        null == this._playbackResource ||
          this._audioSpriteStopTime ||
          (this._playbackResource.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ),
          (this._playbackResource.loop = !0));
      }),
      (e._handleCleanUp = function () {
        var t = this._playbackResource;
        if (null != t) {
          t.pause(),
            (t.loop = !1),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_READY,
              this._readyHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_STALLED,
              this._stalledHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_SEEKED,
              this._loopHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._TIME_UPDATE,
              this._audioSpriteEndHandler,
              !1
            );
          try {
            t.currentTime = this._startTime;
          } catch (t) {}
          createjs.HTMLAudioTagPool.set(this.src, t),
            (this._playbackResource = null);
        }
      }),
      (e._beginPlaying = function (t) {
        return (
          (this._playbackResource = createjs.HTMLAudioTagPool.get(this.src)),
          this.AbstractSoundInstance__beginPlaying(t)
        );
      }),
      (e._handleSoundReady = function (t) {
        if (4 !== this._playbackResource.readyState) {
          var e = this._playbackResource;
          return (
            e.addEventListener(
              createjs.HTMLAudioPlugin._AUDIO_READY,
              this._readyHandler,
              !1
            ),
            e.addEventListener(
              createjs.HTMLAudioPlugin._AUDIO_STALLED,
              this._stalledHandler,
              !1
            ),
            (e.preload = "auto"),
            void e.load()
          );
        }
        this._updateVolume(),
          (this._playbackResource.currentTime =
            0.001 * (this._startTime + this._position)),
          this._audioSpriteStopTime
            ? this._playbackResource.addEventListener(
                createjs.HTMLAudioPlugin._TIME_UPDATE,
                this._audioSpriteEndHandler,
                !1
              )
            : (this._playbackResource.addEventListener(
                createjs.HTMLAudioPlugin._AUDIO_ENDED,
                this._endedHandler,
                !1
              ),
              0 != this._loop &&
                (this._playbackResource.addEventListener(
                  createjs.HTMLAudioPlugin._AUDIO_SEEKED,
                  this._loopHandler,
                  !1
                ),
                (this._playbackResource.loop = !0))),
          this._playbackResource.play();
      }),
      (e._handleTagReady = function (t) {
        this._playbackResource.removeEventListener(
          createjs.HTMLAudioPlugin._AUDIO_READY,
          this._readyHandler,
          !1
        ),
          this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_STALLED,
            this._stalledHandler,
            !1
          ),
          this._handleSoundReady();
      }),
      (e._pause = function () {
        this._playbackResource.pause();
      }),
      (e._resume = function () {
        this._playbackResource.play();
      }),
      (e._updateVolume = function () {
        var t;
        null == this._playbackResource ||
          ((t =
            this._muted || createjs.Sound._masterMute
              ? 0
              : this._volume * createjs.Sound._masterVolume) !=
            this._playbackResource.volume &&
            (this._playbackResource.volume = t));
      }),
      (e._calculateCurrentPosition = function () {
        return 1e3 * this._playbackResource.currentTime - this._startTime;
      }),
      (e._updatePosition = function () {
        this._playbackResource.removeEventListener(
          createjs.HTMLAudioPlugin._AUDIO_SEEKED,
          this._loopHandler,
          !1
        ),
          this._playbackResource.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._handleSetPositionSeek,
            !1
          );
        try {
          this._playbackResource.currentTime =
            0.001 * (this._position + this._startTime);
        } catch (t) {
          this._handleSetPositionSeek(null);
        }
      }),
      (e._handleSetPositionSeek = function (t) {
        null != this._playbackResource &&
          (this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._handleSetPositionSeek,
            !1
          ),
          this._playbackResource.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ));
      }),
      (e._handleAudioSpriteLoop = function (t) {
        this._playbackResource.currentTime <= this._audioSpriteStopTime ||
          (this._playbackResource.pause(),
          0 == this._loop
            ? this._handleSoundComplete(null)
            : ((this._position = 0),
              this._loop--,
              (this._playbackResource.currentTime = 0.001 * this._startTime),
              this._paused || this._playbackResource.play(),
              this._sendEvent("loop")));
      }),
      (e._handleLoop = function (t) {
        0 == this._loop &&
          ((this._playbackResource.loop = !1),
          this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ));
      }),
      (e._updateStartTime = function () {
        (this._audioSpriteStopTime =
          0.001 * (this._startTime + this._duration)),
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            (this._playbackResource.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            this._playbackResource.addEventListener(
              createjs.HTMLAudioPlugin._TIME_UPDATE,
              this._audioSpriteEndHandler,
              !1
            ));
      }),
      (e._updateDuration = function () {
        (this._audioSpriteStopTime =
          0.001 * (this._startTime + this._duration)),
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            (this._playbackResource.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            this._playbackResource.addEventListener(
              createjs.HTMLAudioPlugin._TIME_UPDATE,
              this._audioSpriteEndHandler,
              !1
            ));
      }),
      (e._setDurationFromSource = function () {
        (this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)),
          (this._playbackResource = null);
      }),
      (createjs.HTMLAudioSoundInstance = createjs.promote(
        t,
        "AbstractSoundInstance"
      ));
  })(),
  (function () {
    "use strict";
    function t() {
      this.AbstractPlugin_constructor(),
        (this._capabilities = o._capabilities),
        (this._loaderClass = createjs.SoundLoader),
        (this._soundInstanceClass = createjs.HTMLAudioSoundInstance);
    }
    var e = createjs.extend(t, createjs.AbstractPlugin),
      o = t;
    (o.MAX_INSTANCES = 30),
      (o._AUDIO_READY = "canplaythrough"),
      (o._AUDIO_ENDED = "ended"),
      (o._AUDIO_SEEKED = "seeked"),
      (o._AUDIO_STALLED = "stalled"),
      (o._TIME_UPDATE = "timeupdate"),
      (o._capabilities = null),
      (o.isSupported = function () {
        return o._generateCapabilities(), null != o._capabilities;
      }),
      (o._generateCapabilities = function () {
        if (null == o._capabilities) {
          var t = document.createElement("audio");
          if (null == t.canPlayType) return null;
          o._capabilities = { panning: !1, volume: !0, tracks: -1 };
          for (
            var e = createjs.Sound.SUPPORTED_EXTENSIONS,
              i = createjs.Sound.EXTENSION_MAP,
              s = 0,
              r = e.length;
            s < r;
            s++
          ) {
            var n = e[s],
              a = i[n] || n;
            o._capabilities[n] =
              ("no" != t.canPlayType("audio/" + n) &&
                "" != t.canPlayType("audio/" + n)) ||
              ("no" != t.canPlayType("audio/" + a) &&
                "" != t.canPlayType("audio/" + a));
          }
        }
      }),
      (e.register = function (t) {
        var e = createjs.HTMLAudioTagPool.get(t.src),
          i = this.AbstractPlugin_register(t);
        return i.setTag(e), i;
      }),
      (e.removeSound = function (t) {
        this.AbstractPlugin_removeSound(t), createjs.HTMLAudioTagPool.remove(t);
      }),
      (e.create = function (t, e, i) {
        var s = this.AbstractPlugin_create(t, e, i);
        return (s.playbackResource = null), s;
      }),
      (e.toString = function () {
        return "[HTMLAudioPlugin]";
      }),
      (e.setVolume = e.getVolume = e.setMute = null),
      (createjs.HTMLAudioPlugin = createjs.promote(t, "AbstractPlugin"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.EventDispatcher_constructor(),
        (this.ignoreGlobalPause = !1),
        (this.loop = 0),
        (this.useTicks = !1),
        (this.reversed = !1),
        (this.bounce = !1),
        (this.timeScale = 1),
        (this.duration = 0),
        (this.position = 0),
        (this.rawPosition = -1),
        (this._paused = !0),
        (this._next = null),
        (this._prev = null),
        (this._parent = null),
        (this._labels = null),
        (this._labelList = null),
        (this._status = -1),
        (this._lastTick = 0),
        t &&
          ((this.useTicks = !!t.useTicks),
          (this.ignoreGlobalPause = !!t.ignoreGlobalPause),
          (this.loop = !0 === t.loop ? -1 : t.loop || 0),
          (this.reversed = !!t.reversed),
          (this.bounce = !!t.bounce),
          (this.timeScale = t.timeScale || 1),
          t.onChange && this.addEventListener("change", t.onChange),
          t.onComplete && this.addEventListener("complete", t.onComplete));
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (e._setPaused = function (t) {
      return createjs.Tween._register(this, t), this;
    }),
      (e.setPaused = createjs.deprecate(
        e._setPaused,
        "AbstractTween.setPaused"
      )),
      (e._getPaused = function () {
        return this._paused;
      }),
      (e.getPaused = createjs.deprecate(
        e._getPaused,
        "AbstactTween.getPaused"
      )),
      (e._getCurrentLabel = function (t) {
        var e = this.getLabels();
        null == t && (t = this.position);
        for (var i = 0, s = e.length; i < s && !(t < e[i].position); i++);
        return 0 === i ? null : e[i - 1].label;
      }),
      (e.getCurrentLabel = createjs.deprecate(
        e._getCurrentLabel,
        "AbstractTween.getCurrentLabel"
      ));
    try {
      Object.defineProperties(e, {
        paused: { set: e._setPaused, get: e._getPaused },
        currentLabel: { get: e._getCurrentLabel },
      });
    } catch (t) {}
    (e.advance = function (t, e) {
      this.setPosition(this.rawPosition + t * this.timeScale, e);
    }),
      (e.setPosition = function (t, e, i, s) {
        var r = this.duration,
          n = this.loop,
          a = this.rawPosition,
          o = 0,
          h = 0,
          c = !1;
        if ((t < 0 && (t = 0), 0 === r)) {
          if (((c = !0), -1 !== a)) return c;
        } else {
          if (
            ((h = t - (o = (t / r) | 0) * r),
            (c = -1 !== n && n * r + r <= t) && (t = (h = r) * (o = n) + r),
            t === a)
          )
            return c;
          !this.reversed != !(this.bounce && o % 2) && (h = r - h);
        }
        (this.position = h),
          (this.rawPosition = t),
          this._updatePosition(i, c),
          c && (this.paused = !0),
          s && s(this),
          e || this._runActions(a, t, i, !i && -1 === a),
          this.dispatchEvent("change"),
          c && this.dispatchEvent("complete");
      }),
      (e.calculatePosition = function (t) {
        var e = this.duration,
          i = this.loop,
          s = 0,
          r = 0;
        return 0 === e
          ? 0
          : (-1 !== i && i * e + e <= t
              ? ((r = e), (s = i))
              : (r = t < 0 ? 0 : t - (s = (t / e) | 0) * e),
            !this.reversed != !(this.bounce && s % 2) ? e - r : r);
      }),
      (e.getLabels = function () {
        var t = this._labelList;
        if (!t) {
          t = this._labelList = [];
          var e = this._labels;
          for (var i in e) t.push({ label: i, position: e[i] });
          t.sort(function (t, e) {
            return t.position - e.position;
          });
        }
        return t;
      }),
      (e.setLabels = function (t) {
        (this._labels = t), (this._labelList = null);
      }),
      (e.addLabel = function (t, e) {
        this._labels || (this._labels = {}), (this._labels[t] = e);
        var i = this._labelList;
        if (i) {
          for (var s = 0, r = i.length; s < r && !(e < i[s].position); s++);
          i.splice(s, 0, { label: t, position: e });
        }
      }),
      (e.gotoAndPlay = function (t) {
        (this.paused = !1), this._goto(t);
      }),
      (e.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (e.resolve = function (t) {
        var e = Number(t);
        return isNaN(e) && (e = this._labels && this._labels[t]), e;
      }),
      (e.toString = function () {
        return "[AbstractTween]";
      }),
      (e.clone = function () {
        throw "AbstractTween can not be cloned.";
      }),
      (e._init = function (t) {
        (t && t.paused) || (this.paused = !1),
          t && null != t.position && this.setPosition(t.position);
      }),
      (e._updatePosition = function (t, e) {}),
      (e._goto = function (t) {
        var e = this.resolve(t);
        null != e && this.setPosition(e, !1, !0);
      }),
      (e._runActions = function (t, e, i, s) {
        if (this._actionHead || this.tweens) {
          var r,
            n,
            a,
            o,
            h = this.duration,
            c = this.reversed,
            u = this.bounce,
            l = this.loop;
          if (
            (0 === h
              ? ((r = n = a = o = 0), (c = u = !1))
              : ((a = t - (r = (t / h) | 0) * h),
                (o = e - (n = (e / h) | 0) * h)),
            -1 !== l &&
              (l < n && ((o = h), (n = l)), l < r && ((a = h), (r = l))),
            i)
          )
            return this._runActionsRange(o, o, i, s);
          if (r !== n || a !== o || i || s) {
            -1 === r && (r = a = 0);
            var d = t <= e,
              _ = r;
            do {
              var p = _ === r ? a : d ? 0 : h,
                f = _ === n ? o : d ? h : 0;
              if (
                (!c != !(u && _ % 2) && ((p = h - p), (f = h - f)),
                (!u || _ === r || p !== f) &&
                  this._runActionsRange(p, f, i, s || (_ !== r && !u)))
              )
                return !0;
              s = !1;
            } while ((d && ++_ <= n) || (!d && --_ >= n));
          }
        }
      }),
      (e._runActionsRange = function (t, e, i, s) {}),
      (createjs.AbstractTween = createjs.promote(t, "EventDispatcher"));
  })(),
  (function () {
    "use strict";
    function m(t, e) {
      this.AbstractTween_constructor(e),
        (this.pluginData = null),
        (this.target = t),
        (this.passive = !1),
        (this._stepHead = new n(null, 0, 0, {}, null, !0)),
        (this._stepTail = this._stepHead),
        (this._stepPosition = 0),
        (this._actionHead = null),
        (this._actionTail = null),
        (this._plugins = null),
        (this._pluginIds = null),
        (this._injected = null),
        e &&
          ((this.pluginData = e.pluginData), e.override && m.removeTweens(t)),
        this.pluginData || (this.pluginData = {}),
        this._init(e);
    }
    var t = createjs.extend(m, createjs.AbstractTween);
    function n(t, e, i, s, r, n) {
      (this.next = null),
        (this.prev = t),
        (this.t = e),
        (this.d = i),
        (this.props = s),
        (this.ease = r),
        (this.passive = n),
        (this.index = t ? t.index + 1 : 0);
    }
    function r(t, e, i, s, r) {
      (this.next = null),
        (this.prev = t),
        (this.t = e),
        (this.d = 0),
        (this.scope = i),
        (this.funct = s),
        (this.params = r);
    }
    (m.IGNORE = {}),
      (m._tweens = []),
      (m._plugins = null),
      (m._tweenHead = null),
      (m._tweenTail = null),
      (m._inTick = 0),
      (m.get = function (t, e) {
        return new m(t, e);
      }),
      (m.tick = function (t, e) {
        for (var i = m._tweenHead, s = (m._inTick = Date.now()); i; ) {
          var r = i._next,
            n = i._status;
          (i._lastTick = s),
            1 === n
              ? (i._status = 0)
              : -1 === n
              ? m._delist(i)
              : (e && !i.ignoreGlobalPause) ||
                i._paused ||
                i.advance(i.useTicks ? 1 : t),
            (i = r);
        }
        m._inTick = 0;
      }),
      (m.handleEvent = function (t) {
        "tick" === t.type && this.tick(t.delta, t.paused);
      }),
      (m.removeTweens = function (t) {
        if (t.tweenjs_count) {
          for (var e = m._tweenHead; e; ) {
            var i = e._next;
            e.target === t && m._register(e, !0), (e = i);
          }
          t.tweenjs_count = 0;
        }
      }),
      (m.removeAllTweens = function () {
        for (var t = m._tweenHead; t; ) {
          var e = t._next;
          (t._paused = !0),
            t.target && (t.target.tweenjs_count = 0),
            (t._next = t._prev = null),
            (t = e);
        }
        m._tweenHead = m._tweenTail = null;
      }),
      (m.hasActiveTweens = function (t) {
        return t ? !!t.tweenjs_count : !!m._tweenHead;
      }),
      (m._installPlugin = function (t) {
        for (
          var e = (t.priority = t.priority || 0),
            i = (m._plugins = m._plugins || []),
            s = 0,
            r = i.length;
          s < r && !(e < i[s].priority);
          s++
        );
        i.splice(s, 0, t);
      }),
      (m._register = function (t, e) {
        var i,
          s = t.target;
        !e && t._paused
          ? (s && (s.tweenjs_count = s.tweenjs_count ? s.tweenjs_count + 1 : 1),
            (i = m._tweenTail)
              ? ((m._tweenTail = i._next = t), (t._prev = i))
              : (m._tweenHead = m._tweenTail = t),
            (t._status = m._inTick ? 1 : 0),
            !m._inited &&
              createjs.Ticker &&
              (createjs.Ticker.addEventListener("tick", m), (m._inited = !0)))
          : e &&
            !t._paused &&
            (s && s.tweenjs_count--,
            (m._inTick && t._lastTick !== m._inTick) || m._delist(t),
            (t._status = -1)),
          (t._paused = e);
      }),
      (m._delist = function (t) {
        var e = t._next,
          i = t._prev;
        e ? (e._prev = i) : (m._tweenTail = i),
          i ? (i._next = e) : (m._tweenHead = e),
          (t._next = t._prev = null);
      }),
      (t.wait = function (t, e) {
        return 0 < t && this._addStep(+t, this._stepTail.props, null, e), this;
      }),
      (t.to = function (t, e, i) {
        (null == e || e < 0) && (e = 0);
        var s = this._addStep(+e, null, i);
        return this._appendProps(t, s), this;
      }),
      (t.label = function (t) {
        return this.addLabel(t, this.duration), this;
      }),
      (t.call = function (t, e, i) {
        return this._addAction(i || this.target, t, e || [this]);
      }),
      (t.set = function (t, e) {
        return this._addAction(e || this.target, this._set, [t]);
      }),
      (t.play = function (t) {
        return this._addAction(t || this, this._set, [{ paused: !1 }]);
      }),
      (t.pause = function (t) {
        return this._addAction(t || this, this._set, [{ paused: !0 }]);
      }),
      (t.w = t.wait),
      (t.t = t.to),
      (t.c = t.call),
      (t.s = t.set),
      (t.toString = function () {
        return "[Tween]";
      }),
      (t.clone = function () {
        throw "Tween can not be cloned.";
      }),
      (t._addPlugin = function (t) {
        var e = this._pluginIds || (this._pluginIds = {}),
          i = t.ID;
        if (i && !e[i]) {
          e[i] = !0;
          for (
            var s = this._plugins || (this._plugins = []),
              r = t.priority || 0,
              n = 0,
              a = s.length;
            n < a;
            n++
          )
            if (r < s[n].priority) return void s.splice(n, 0, t);
          s.push(t);
        }
      }),
      (t._updatePosition = function (t, e) {
        var i = this._stepHead.next,
          s = this.position,
          r = this.duration;
        if (this.target && i) {
          for (var n = i.next; n && n.t <= s; ) n = (i = i.next).next;
          var a = e ? (0 === r ? 1 : s / r) : (s - i.t) / i.d;
          this._updateTargetProps(i, a, e);
        }
        this._stepPosition = i ? s - i.t : 0;
      }),
      (t._updateTargetProps = function (t, e, i) {
        if (!(this.passive = !!t.passive)) {
          var s,
            r,
            n,
            a,
            o = t.prev.props,
            h = t.props;
          (a = t.ease) && (e = a(e, 0, 1, 1));
          var c = this._plugins;
          t: for (var u in o) {
            if (
              ((s =
                (r = o[u]) !== (n = h[u]) && "number" == typeof r
                  ? r + (n - r) * e
                  : 1 <= e
                  ? n
                  : r),
              c)
            )
              for (var l = 0, d = c.length; l < d; l++) {
                var _ = c[l].change(this, t, u, s, e, i);
                if (_ === m.IGNORE) continue t;
                void 0 !== _ && (s = _);
              }
            this.target[u] = s;
          }
        }
      }),
      (t._runActionsRange = function (t, e, i, s) {
        var r = e < t,
          n = r ? this._actionTail : this._actionHead,
          a = e,
          o = t;
        r && ((a = t), (o = e));
        for (var h = this.position; n; ) {
          var c = n.t;
          if (
            (c === e || (o < c && c < a) || (s && c === t)) &&
            (n.funct.apply(n.scope, n.params), h !== this.position)
          )
            return !0;
          n = r ? n.prev : n.next;
        }
      }),
      (t._appendProps = function (t, e, i) {
        var s,
          r,
          n,
          a,
          o,
          h = this._stepHead.props,
          c = this.target,
          u = m._plugins,
          l = e.prev,
          d = l.props,
          _ = e.props || (e.props = this._cloneProps(d)),
          p = {};
        for (s in t)
          if (t.hasOwnProperty(s) && ((p[s] = _[s] = t[s]), void 0 === h[s])) {
            if (((a = void 0), u))
              for (r = u.length - 1; 0 <= r; r--)
                if (
                  (void 0 !== (n = u[r].init(this, s, a)) && (a = n),
                  a === m.IGNORE)
                ) {
                  delete _[s], delete p[s];
                  break;
                }
            a !== m.IGNORE &&
              (void 0 === a && (a = c[s]), (d[s] = void 0 === a ? null : a));
          }
        for (s in p) {
          n = t[s];
          for (var f, g = l; (f = g) && (g = f.prev); )
            if (g.props !== f.props) {
              if (void 0 !== g.props[s]) break;
              g.props[s] = d[s];
            }
        }
        if (!1 !== i && (u = this._plugins))
          for (r = u.length - 1; 0 <= r; r--) u[r].step(this, e, p);
        (o = this._injected) &&
          ((this._injected = null), this._appendProps(o, e, !1)),
          (this.step = e);
      }),
      (t._injectProp = function (t, e) {
        (this._injected || (this._injected = {}))[t] = e;
      }),
      (t._addStep = function (t, e, i, s) {
        var r = new n(this._stepTail, this.duration, t, e, i, s || !1);
        return (this.duration += t), (this._stepTail = this._stepTail.next = r);
      }),
      (t._addAction = function (t, e, i) {
        var s = new r(this._actionTail, this.duration, t, e, i);
        return (
          this._actionTail
            ? (this._actionTail.next = s)
            : (this._actionHead = s),
          (this._actionTail = s),
          this
        );
      }),
      (t._set = function (t) {
        for (var e in t) this[e] = t[e];
      }),
      (t._cloneProps = function (t) {
        var e = {};
        for (var i in t) e[i] = t[i];
        return e;
      }),
      (createjs.Tween = createjs.promote(m, "AbstractTween"));
  })(),
  (function () {
    "use strict";
    function t(t) {
      var e, i;
      t instanceof Array || (null == t && 1 < arguments.length)
        ? ((e = t), (i = arguments[1]), (t = arguments[2]))
        : t && ((e = t.tweens), (i = t.labels)),
        this.AbstractTween_constructor(t),
        (this.tweens = []),
        e && this.addTween.apply(this, e),
        this.setLabels(i),
        this._init(t);
    }
    var e = createjs.extend(t, createjs.AbstractTween);
    (e.addTween = function (t) {
      t._parent && t._parent.removeTween(t);
      var e = arguments.length;
      if (1 < e) {
        for (var i = 0; i < e; i++) this.addTween(arguments[i]);
        return arguments[e - 1];
      }
      if (0 === e) return null;
      this.tweens.push(t), (t._parent = this), (t.paused = !0);
      var s = t.duration;
      return (
        0 < t.loop && (s *= t.loop + 1),
        s > this.duration && (this.duration = s),
        0 <= this.rawPosition && t.setPosition(this.rawPosition),
        t
      );
    }),
      (e.removeTween = function (t) {
        var e = arguments.length;
        if (1 < e) {
          for (var i = !0, s = 0; s < e; s++)
            i = i && this.removeTween(arguments[s]);
          return i;
        }
        if (0 === e) return !0;
        for (var r = this.tweens, s = r.length; s--; )
          if (r[s] === t)
            return (
              r.splice(s, 1),
              (t._parent = null),
              t.duration >= this.duration && this.updateDuration(),
              !0
            );
        return !1;
      }),
      (e.updateDuration = function () {
        for (var t = (this.duration = 0), e = this.tweens.length; t < e; t++) {
          var i = this.tweens[t],
            s = i.duration;
          0 < i.loop && (s *= i.loop + 1),
            s > this.duration && (this.duration = s);
        }
      }),
      (e.toString = function () {
        return "[Timeline]";
      }),
      (e.clone = function () {
        throw "Timeline can not be cloned.";
      }),
      (e._updatePosition = function (t, e) {
        for (var i = this.position, s = 0, r = this.tweens.length; s < r; s++)
          this.tweens[s].setPosition(i, !0, t);
      }),
      (e._runActionsRange = function (t, e, i, s) {
        for (var r = this.position, n = 0, a = this.tweens.length; n < a; n++)
          if ((this.tweens[n]._runActions(t, e, i, s), r !== this.position))
            return !0;
      }),
      (createjs.Timeline = createjs.promote(t, "AbstractTween"));
  })(),
  (function () {
    "use strict";
    function e() {
      throw "Ease cannot be instantiated.";
    }
    (e.none = e.linear =
      function (t) {
        return t;
      }),
      (e.get = function (e) {
        return (
          e < -1 ? (e = -1) : 1 < e && (e = 1),
          function (t) {
            return 0 == e
              ? t
              : e < 0
              ? t * (t * -e + 1 + e)
              : t * ((2 - t) * e + (1 - e));
          }
        );
      }),
      (e.getPowIn = function (e) {
        return function (t) {
          return Math.pow(t, e);
        };
      }),
      (e.getPowOut = function (e) {
        return function (t) {
          return 1 - Math.pow(1 - t, e);
        };
      }),
      (e.getPowInOut = function (e) {
        return function (t) {
          return (t *= 2) < 1
            ? 0.5 * Math.pow(t, e)
            : 1 - 0.5 * Math.abs(Math.pow(2 - t, e));
        };
      }),
      (e.quadIn = e.getPowIn(2)),
      (e.quadOut = e.getPowOut(2)),
      (e.quadInOut = e.getPowInOut(2)),
      (e.cubicIn = e.getPowIn(3)),
      (e.cubicOut = e.getPowOut(3)),
      (e.cubicInOut = e.getPowInOut(3)),
      (e.quartIn = e.getPowIn(4)),
      (e.quartOut = e.getPowOut(4)),
      (e.quartInOut = e.getPowInOut(4)),
      (e.quintIn = e.getPowIn(5)),
      (e.quintOut = e.getPowOut(5)),
      (e.quintInOut = e.getPowInOut(5)),
      (e.sineIn = function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
      }),
      (e.sineOut = function (t) {
        return Math.sin((t * Math.PI) / 2);
      }),
      (e.sineInOut = function (t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
      }),
      (e.backIn = (e.getBackIn = function (e) {
        return function (t) {
          return t * t * ((e + 1) * t - e);
        };
      })(1.7)),
      (e.backOut = (e.getBackOut = function (e) {
        return function (t) {
          return --t * t * ((e + 1) * t + e) + 1;
        };
      })(1.7)),
      (e.backInOut = (e.getBackInOut = function (e) {
        return (
          (e *= 1.525),
          function (t) {
            return (t *= 2) < 1
              ? t * t * ((e + 1) * t - e) * 0.5
              : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
          }
        );
      })(1.7)),
      (e.circIn = function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
      }),
      (e.circOut = function (t) {
        return Math.sqrt(1 - --t * t);
      }),
      (e.circInOut = function (t) {
        return (t *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - t * t) - 1)
          : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      }),
      (e.bounceIn = function (t) {
        return 1 - e.bounceOut(1 - t);
      }),
      (e.bounceOut = function (t) {
        return t < 1 / 2.75
          ? 7.5625 * t * t
          : t < 2 / 2.75
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : t < 2.5 / 2.75
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }),
      (e.bounceInOut = function (t) {
        return t < 0.5
          ? 0.5 * e.bounceIn(2 * t)
          : 0.5 * e.bounceOut(2 * t - 1) + 0.5;
      }),
      (e.elasticIn = (e.getElasticIn = function (i, s) {
        var r = 2 * Math.PI;
        return function (t) {
          if (0 == t || 1 == t) return t;
          var e = (s / r) * Math.asin(1 / i);
          return -(i * Math.pow(2, 10 * --t) * Math.sin(((t - e) * r) / s));
        };
      })(1, 0.3)),
      (e.elasticOut = (e.getElasticOut = function (i, s) {
        var r = 2 * Math.PI;
        return function (t) {
          if (0 == t || 1 == t) return t;
          var e = (s / r) * Math.asin(1 / i);
          return i * Math.pow(2, -10 * t) * Math.sin(((t - e) * r) / s) + 1;
        };
      })(1, 0.3)),
      (e.elasticInOut = (e.getElasticInOut = function (i, s) {
        var r = 2 * Math.PI;
        return function (t) {
          var e = (s / r) * Math.asin(1 / i);
          return (t *= 2) < 1
            ? i * Math.pow(2, 10 * --t) * Math.sin(((t - e) * r) / s) * -0.5
            : i * Math.pow(2, -10 * --t) * Math.sin(((t - e) * r) / s) * 0.5 +
                1;
        };
      })(1, 0.3 * 1.5)),
      (createjs.Ease = e);
  })(),
  (function () {
    "use strict";
    function t() {
      throw "MotionGuidePlugin cannot be instantiated.";
    }
    var S = t;
    (S.priority = 0),
      (S.ID = "MotionGuide"),
      (S.install = function () {
        return createjs.Tween._installPlugin(t), createjs.Tween.IGNORE;
      }),
      (S.init = function (t, e, i) {
        "guide" == e && t._addPlugin(S);
      }),
      (S.step = function (t, e, i) {
        for (var s in i)
          if ("guide" === s) {
            var r = e.props.guide,
              n = S._solveGuideData(i.guide, r);
            r.valid = !n;
            var a = r.endData;
            if (
              (t._injectProp("x", a.x), t._injectProp("y", a.y), n || !r.orient)
            )
              break;
            var o =
              void 0 === e.prev.props.rotation
                ? t.target.rotation || 0
                : e.prev.props.rotation;
            if (
              ((r.startOffsetRot = o - r.startData.rotation),
              "fixed" == r.orient)
            )
              (r.endAbsRot = a.rotation + r.startOffsetRot),
                (r.deltaRotation = 0);
            else {
              var h =
                  void 0 === i.rotation ? t.target.rotation || 0 : i.rotation,
                c = h - r.endData.rotation - r.startOffsetRot,
                u = c % 360;
              switch (((r.endAbsRot = h), r.orient)) {
                case "auto":
                  r.deltaRotation = c;
                  break;
                case "cw":
                  r.deltaRotation =
                    ((360 + u) % 360) + 360 * Math.abs((c / 360) | 0);
                  break;
                case "ccw":
                  r.deltaRotation =
                    ((u - 360) % 360) + -360 * Math.abs((c / 360) | 0);
              }
            }
            t._injectProp("rotation", r.endAbsRot);
          }
      }),
      (S.change = function (t, e, i, s, r, n) {
        var a = e.props.guide;
        if (a && e.props !== e.prev.props && a !== e.prev.props.guide)
          return ("guide" === i && !a.valid) ||
            "x" == i ||
            "y" == i ||
            ("rotation" === i && a.orient)
            ? createjs.Tween.IGNORE
            : void S._ratioToPositionData(r, a, t.target);
      }),
      (S.debug = function (t, e, i) {
        t = t.guide || t;
        var s = S._findPathProblems(t);
        if ((s && console.error("MotionGuidePlugin Error found: \n" + s), !e))
          return s;
        var r = t.path,
          n = r.length;
        for (
          e.save(),
            e.lineCap = "round",
            e.lineJoin = "miter",
            e.beginPath(),
            e.moveTo(r[0], r[1]),
            c = 2;
          c < n;
          c += 4
        )
          e.quadraticCurveTo(r[c], r[c + 1], r[c + 2], r[c + 3]);
        (e.strokeStyle = "black"),
          (e.lineWidth = 4.5),
          e.stroke(),
          (e.strokeStyle = "white"),
          (e.lineWidth = 3),
          e.stroke(),
          e.closePath();
        var a = i.length;
        if (i && a) {
          var o = {},
            h = {};
          S._solveGuideData(t, o);
          for (var c = 0; c < a; c++)
            (o.orient = "fixed"),
              S._ratioToPositionData(i[c], o, h),
              e.beginPath(),
              e.moveTo(h.x, h.y),
              e.lineTo(
                h.x + 9 * Math.cos(0.0174533 * h.rotation),
                h.y + 9 * Math.sin(0.0174533 * h.rotation)
              ),
              (e.strokeStyle = "black"),
              (e.lineWidth = 4.5),
              e.stroke(),
              (e.strokeStyle = "red"),
              (e.lineWidth = 3),
              e.stroke(),
              e.closePath();
        }
        return e.restore(), s;
      }),
      (S._solveGuideData = function (t, e) {
        var i;
        if ((i = S.debug(t))) return i;
        var s = (e.path = t.path);
        e.orient = t.orient;
        (e.subLines = []),
          (e.totalLength = 0),
          (e.startOffsetRot = 0),
          (e.deltaRotation = 0),
          (e.startData = { ratio: 0 }),
          (e.endData = { ratio: 1 }),
          (e.animSpan = 1);
        for (
          var r, n, a, o, h = s.length, c = {}, u = s[0], l = s[1], d = 2;
          d < h;
          d += 4
        ) {
          (r = s[d]), (n = s[d + 1]), (a = s[d + 2]), (o = s[d + 3]);
          for (
            var _ = { weightings: [], estLength: 0, portion: 0 },
              p = u,
              f = l,
              g = 1;
            g <= 10;
            g++
          ) {
            S._getParamsForCurve(u, l, r, n, a, o, g / 10, !1, c);
            var m = c.x - p,
              v = c.y - f,
              T = Math.sqrt(m * m + v * v);
            _.weightings.push(T), (_.estLength += T), (p = c.x), (f = c.y);
          }
          for (e.totalLength += _.estLength, g = 0; g < 10; g++)
            (T = _.estLength), (_.weightings[g] = _.weightings[g] / T);
          e.subLines.push(_), (u = a), (l = o);
        }
        T = e.totalLength;
        var b = e.subLines.length;
        for (d = 0; d < b; d++)
          e.subLines[d].portion = e.subLines[d].estLength / T;
        var E = isNaN(t.start) ? 0 : t.start,
          y = isNaN(t.end) ? 1 : t.end;
        S._ratioToPositionData(E, e, e.startData),
          S._ratioToPositionData(y, e, e.endData),
          (e.startData.ratio = E),
          (e.endData.ratio = y),
          (e.animSpan = e.endData.ratio - e.startData.ratio);
      }),
      (S._ratioToPositionData = function (t, e, i) {
        for (
          var s,
            r,
            n,
            a = e.subLines,
            o = 0,
            h = t * e.animSpan + e.startData.ratio,
            c = a.length,
            u = 0;
          u < c;
          u++
        ) {
          if (h <= o + (r = a[u].portion)) {
            n = u;
            break;
          }
          o += r;
        }
        void 0 === n && ((n = c - 1), (o -= r));
        var l = a[n].weightings,
          d = r;
        for (c = l.length, u = 0; u < c && !(h <= o + (r = l[u] * d)); u++)
          o += r;
        (n = 4 * n + 2), (s = u / 10 + ((h - o) / r) * 0.1);
        var _ = e.path;
        return (
          S._getParamsForCurve(
            _[n - 2],
            _[n - 1],
            _[n],
            _[n + 1],
            _[n + 2],
            _[n + 3],
            s,
            e.orient,
            i
          ),
          e.orient &&
            (0.99999 <= t && t <= 1.00001 && void 0 !== e.endAbsRot
              ? (i.rotation = e.endAbsRot)
              : (i.rotation += e.startOffsetRot + t * e.deltaRotation)),
          i
        );
      }),
      (S._getParamsForCurve = function (t, e, i, s, r, n, a, o, h) {
        var c = 1 - a;
        (h.x = c * c * t + 2 * c * a * i + a * a * r),
          (h.y = c * c * e + 2 * c * a * s + a * a * n),
          o &&
            (h.rotation =
              57.2957795 *
              Math.atan2((s - e) * c + (n - s) * a, (i - t) * c + (r - i) * a));
      }),
      (S._findPathProblems = function (t) {
        var e = t.path,
          i = (e && e.length) || 0;
        if (i < 6 || (i - 2) % 4) {
          var s =
            "\tCannot parse 'path' array due to invalid number of entries in path. ";
          return (
            (s +=
              "There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). "),
            (s +=
              "See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n"),
            (s +=
              "Only [ " +
              i +
              " ] values found. Expected: " +
              Math.max(4 * Math.ceil((i - 2) / 4) + 2, 6))
          );
        }
        for (var r = 0; r < i; r++)
          if (isNaN(e[r])) return "All data in path array must be numeric";
        var n = t.start;
        if (isNaN(n) && void 0 !== n)
          return "'start' out of bounds. Expected 0 to 1, got: " + n;
        var a = t.end;
        if (isNaN(a) && void 0 !== a)
          return "'end' out of bounds. Expected 0 to 1, got: " + a;
        var o = t.orient;
        return o && "fixed" != o && "auto" != o && "cw" != o && "ccw" != o
          ? 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' +
              o
          : void 0;
      }),
      (createjs.MotionGuidePlugin = t);
  })(),
  (function () {
    "use strict";
    var t = (createjs.TweenJS = createjs.TweenJS || {});
    (t.version = "NEXT"), (t.buildDate = "Thu, 14 Sep 2017 22:19:45 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function u() {
      throw "CSSPlugin cannot be instantiated.";
    }
    var l = u;
    function d(t, e) {
      for (var i, s, r, n = [!1, t]; (i = l.TRANSFORM_RE.exec(t)); ) {
        "*" !== i[3]
          ? ((s = [i[1]]),
            (r = e && e[n.length]),
            !e ||
              (r && s[0] === r[0]) ||
              (console.log("transforms don't match: ", s[0], r && r[0]),
              (e = null)),
            a(i[2], r, s),
            n.push(s))
          : n.push(e[n.length]);
      }
      return (n[0] = !!e), n;
    }
    function a(t, e, i) {
      for (;;) {
        var s = l.TRANSFORM_VALUE_RE.exec(t);
        if (!s) return i;
        (i = i || []).push(+s[1], s[2]),
          e &&
            e[i.length - 1] !== s[2] &&
            (console.log(
              "transform units don't match: ",
              i[0],
              e[i.length - 1],
              s[2]
            ),
            (e = null));
      }
    }
    (l.priority = 100),
      (l.ID = "CSS"),
      (l.VALUE_RE = /^(-?[\d.]+)([a-z%]*)$/),
      (l.TRANSFORM_VALUE_RE = /(?:^| |,)(-?[\d.]+)([a-z%]*)/g),
      (l.TRANSFORM_RE = /(\w+?)\(([^)]+)\)|(?:^| )(\*)(?:$| )/g),
      (l.compute = !1),
      (l.install = function () {
        createjs.Tween._installPlugin(u);
      }),
      (l.init = function (t, e, i) {
        var s = t.pluginData;
        if (!s.CSS_disabled && t.target instanceof HTMLElement) {
          var r,
            n,
            a,
            o =
              i ||
              ((r = t.target),
              (n = e),
              (a = s.CSS_compute) || (null == a && l.compute)
                ? window.getComputedStyle(r)[n]
                : r.style[n]);
          if (void 0 !== o) {
            t._addPlugin(u);
            var h = s.CSS || (s.CSS = {});
            if ("transform" === e) return (h[e] = "_t"), d(o);
            var c = l.VALUE_RE.exec(o);
            return null === c
              ? ((h[e] = ""), o)
              : ((h[e] = c[2]), parseFloat(c[1]));
          }
        }
      }),
      (l.step = function (t, e, i) {
        i.transform &&
          (e.props.transform = d(e.props.transform, e.prev.props.transform));
      }),
      (l.change = function (t, e, i, s, r, n) {
        var a = t.pluginData.CSS[i];
        if (void 0 !== a)
          return (
            "transform" === i
              ? (s = (function (t, e, i) {
                  if (1 === i) return e[1];
                  if (0 === i || !e[0]) return t[1];
                  for (var s, r, n = "", a = t.length, o = 2; o < a; o++) {
                    var h = t[o],
                      c = e[o];
                    for (n += h[0] + "(", s = 1, r = h.length; s < r; s += 2)
                      (n += h[s] + (c[s] - h[s]) * i),
                        (n += c[s + 1] || h[s + 1]),
                        s < r - 2 && (n += ", ");
                    (n += ")"), o < a - 1 && (n += " ");
                  }
                  return n;
                })(e.prev.props[i], e.props[i], r))
              : (s += a),
            (t.target.style[i] = s),
            createjs.Tween.IGNORE
          );
      }),
      (createjs.CSSPlugin = l);
  })(),
  createjs.CSSPlugin.install(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function l() {
      throw "DotPlugin cannot be instantiated.";
    }
    var t = l;
    (t.priority = 100),
      (t.ID = "Dot"),
      (t.install = function () {
        createjs.Tween._installPlugin(l);
      }),
      (t.init = function (t, e, i) {
        var s = t.pluginData;
        if (!s.Dot_disabled && "." === e[0]) {
          t._addPlugin(l);
          for (
            var r = t.target, n = e.split("."), a = 1, o = n.length;
            a < o - 1;
            a++
          )
            if (!(r = r[n[a]])) return createjs.Tween.IGNORE;
          var h = n[a],
            c = r[h],
            u = void 0 === i ? c : i;
          return (s.Dot = s.Dot || {}), (s.Dot[e] = { t: r, n: h }), u;
        }
      }),
      (t.step = function (t, e, i) {}),
      (t.change = function (t, e, i, s, r, n) {
        var a,
          o = t.pluginData.Dot;
        if (o && (a = o[i])) return (a.t[a.n] = s), createjs.Tween.IGNORE;
      }),
      (createjs.DotPlugin = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "RelativePlugin plugin cannot be instantiated.";
    }
    var s = t;
    (s.ID = "Relative"),
      (s.install = function () {
        createjs.Tween._installPlugin(t);
      }),
      (s.init = function (t, e, i) {
        t.pluginData.Relative_disabled || t._addPlugin(s);
      }),
      (s.step = function (t, e, i) {
        for (var s in i) {
          var r,
            n,
            a = i[s];
          "string" == typeof a &&
            ((r = e.prev.props[s]),
            ("+" !== (n = a[0]) && "-" !== n) ||
              isNaN((a = +a + r)) ||
              (e.props[s] = a));
        }
      }),
      (s.change = function (t, e, i, s, r, n) {}),
      (createjs.RelativePlugin = s);
  })(),
  createjs.DotPlugin.install(),
  createjs.RelativePlugin.install(),
  window.addEventListener("DOMContentLoaded", function () {
    var t = document.createElement("style");
    (t.innerHTML = "canvas {-webkit-tap-highlight-color: transparent;}"),
      document.body.appendChild(t);
  });
