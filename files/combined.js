if (typeof jQuery === "undefined") {
  /*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
  !(function (a, b) {
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = a.document
          ? b(a, !0)
          : function (a) {
              if (!a.document)
                throw new Error("jQuery requires a window with a document");
              return b(a);
            })
      : b(a);
  })("undefined" != typeof window ? window : this, function (a, b) {
    var c = [],
      d = a.document,
      e = c.slice,
      f = c.concat,
      g = c.push,
      h = c.indexOf,
      i = {},
      j = i.toString,
      k = i.hasOwnProperty,
      l = {},
      m = "1.12.4",
      n = function (a, b) {
        return new n.fn.init(a, b);
      },
      o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      p = /^-ms-/,
      q = /-([\da-z])/gi,
      r = function (a, b) {
        return b.toUpperCase();
      };
    (n.fn = n.prototype =
      {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function () {
          return e.call(this);
        },
        get: function (a) {
          return null != a
            ? 0 > a
              ? this[a + this.length]
              : this[a]
            : e.call(this);
        },
        pushStack: function (a) {
          var b = n.merge(this.constructor(), a);
          return (b.prevObject = this), (b.context = this.context), b;
        },
        each: function (a) {
          return n.each(this, a);
        },
        map: function (a) {
          return this.pushStack(
            n.map(this, function (b, c) {
              return a.call(b, c, b);
            })
          );
        },
        slice: function () {
          return this.pushStack(e.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (a) {
          var b = this.length,
            c = +a + (0 > a ? b : 0);
          return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: g,
        sort: c.sort,
        splice: c.splice,
      }),
      (n.extend = n.fn.extend =
        function () {
          var a,
            b,
            c,
            d,
            e,
            f,
            g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
          for (
            "boolean" == typeof g && ((j = g), (g = arguments[h] || {}), h++),
              "object" == typeof g || n.isFunction(g) || (g = {}),
              h === i && ((g = this), h--);
            i > h;
            h++
          )
            if (null != (e = arguments[h]))
              for (d in e)
                (a = g[d]),
                  (c = e[d]),
                  g !== c &&
                    (j && c && (n.isPlainObject(c) || (b = n.isArray(c)))
                      ? (b
                          ? ((b = !1), (f = a && n.isArray(a) ? a : []))
                          : (f = a && n.isPlainObject(a) ? a : {}),
                        (g[d] = n.extend(j, f, c)))
                      : void 0 !== c && (g[d] = c));
          return g;
        }),
      n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (a) {
          throw new Error(a);
        },
        noop: function () {},
        isFunction: function (a) {
          return "function" === n.type(a);
        },
        isArray:
          Array.isArray ||
          function (a) {
            return "array" === n.type(a);
          },
        isWindow: function (a) {
          return null != a && a == a.window;
        },
        isNumeric: function (a) {
          var b = a && a.toString();
          return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
        },
        isEmptyObject: function (a) {
          var b;
          for (b in a) return !1;
          return !0;
        },
        isPlainObject: function (a) {
          var b;
          if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a))
            return !1;
          try {
            if (
              a.constructor &&
              !k.call(a, "constructor") &&
              !k.call(a.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (c) {
            return !1;
          }
          if (!l.ownFirst) for (b in a) return k.call(a, b);
          for (b in a);
          return void 0 === b || k.call(a, b);
        },
        type: function (a) {
          return null == a
            ? a + ""
            : "object" == typeof a || "function" == typeof a
            ? i[j.call(a)] || "object"
            : typeof a;
        },
        globalEval: function (b) {
          b &&
            n.trim(b) &&
            (
              a.execScript ||
              function (b) {
                a.eval.call(a, b);
              }
            )(b);
        },
        camelCase: function (a) {
          return a.replace(p, "ms-").replace(q, r);
        },
        nodeName: function (a, b) {
          return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function (a, b) {
          var c,
            d = 0;
          if (s(a)) {
            for (c = a.length; c > d; d++)
              if (b.call(a[d], d, a[d]) === !1) break;
          } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
          return a;
        },
        trim: function (a) {
          return null == a ? "" : (a + "").replace(o, "");
        },
        makeArray: function (a, b) {
          var c = b || [];
          return (
            null != a &&
              (s(Object(a))
                ? n.merge(c, "string" == typeof a ? [a] : a)
                : g.call(c, a)),
            c
          );
        },
        inArray: function (a, b, c) {
          var d;
          if (b) {
            if (h) return h.call(b, a, c);
            for (
              d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
              d > c;
              c++
            )
              if (c in b && b[c] === a) return c;
          }
          return -1;
        },
        merge: function (a, b) {
          var c = +b.length,
            d = 0,
            e = a.length;
          while (c > d) a[e++] = b[d++];
          if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
          return (a.length = e), a;
        },
        grep: function (a, b, c) {
          for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
            (d = !b(a[f], f)), d !== h && e.push(a[f]);
          return e;
        },
        map: function (a, b, c) {
          var d,
            e,
            g = 0,
            h = [];
          if (s(a))
            for (d = a.length; d > g; g++)
              (e = b(a[g], g, c)), null != e && h.push(e);
          else for (g in a) (e = b(a[g], g, c)), null != e && h.push(e);
          return f.apply([], h);
        },
        guid: 1,
        proxy: function (a, b) {
          var c, d, f;
          return (
            "string" == typeof b && ((f = a[b]), (b = a), (a = f)),
            n.isFunction(a)
              ? ((c = e.call(arguments, 2)),
                (d = function () {
                  return a.apply(b || this, c.concat(e.call(arguments)));
                }),
                (d.guid = a.guid = a.guid || n.guid++),
                d)
              : void 0
          );
        },
        now: function () {
          return +new Date();
        },
        support: l,
      }),
      "function" == typeof Symbol &&
        (n.fn[Symbol.iterator] = c[Symbol.iterator]),
      n.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (a, b) {
          i["[object " + b + "]"] = b.toLowerCase();
        }
      );
    function s(a) {
      var b = !!a && "length" in a && a.length,
        c = n.type(a);
      return "function" === c || n.isWindow(a)
        ? !1
        : "array" === c ||
            0 === b ||
            ("number" == typeof b && b > 0 && b - 1 in a);
    }
    var t = (function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date(),
        v = a.document,
        w = 0,
        x = 0,
        y = ga(),
        z = ga(),
        A = ga(),
        B = function (a, b) {
          return a === b && (l = !0), 0;
        },
        C = 1 << 31,
        D = {}.hasOwnProperty,
        E = [],
        F = E.pop,
        G = E.push,
        H = E.push,
        I = E.slice,
        J = function (a, b) {
          for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
          return -1;
        },
        K =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        L = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        N =
          "\\[" +
          L +
          "*(" +
          M +
          ")(?:" +
          L +
          "*([*^$|!~]?=)" +
          L +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          M +
          "))|)" +
          L +
          "*\\]",
        O =
          ":(" +
          M +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          N +
          ")*)|.*)\\)|)",
        P = new RegExp(L + "+", "g"),
        Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
        R = new RegExp("^" + L + "*," + L + "*"),
        S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
        T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
        U = new RegExp(O),
        V = new RegExp("^" + M + "$"),
        W = {
          ID: new RegExp("^#(" + M + ")"),
          CLASS: new RegExp("^\\.(" + M + ")"),
          TAG: new RegExp("^(" + M + "|[*])"),
          ATTR: new RegExp("^" + N),
          PSEUDO: new RegExp("^" + O),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              L +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              L +
              "*(?:([+-]|)" +
              L +
              "*(\\d+)|))" +
              L +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + K + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              L +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              L +
              "*((?:-\\d)?\\d*)" +
              L +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        X = /^(?:input|select|textarea|button)$/i,
        Y = /^h\d$/i,
        Z = /^[^{]+\{\s*\[native \w/,
        $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        _ = /[+~]/,
        aa = /'|\\/g,
        ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
        ca = function (a, b, c) {
          var d = "0x" + b - 65536;
          return d !== d || c
            ? b
            : 0 > d
            ? String.fromCharCode(d + 65536)
            : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
        },
        da = function () {
          m();
        };
      try {
        H.apply((E = I.call(v.childNodes)), v.childNodes),
          E[v.childNodes.length].nodeType;
      } catch (ea) {
        H = {
          apply: E.length
            ? function (a, b) {
                G.apply(a, I.call(b));
              }
            : function (a, b) {
                var c = a.length,
                  d = 0;
                while ((a[c++] = b[d++]));
                a.length = c - 1;
              },
        };
      }
      function fa(a, b, d, e) {
        var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s,
          w = b && b.ownerDocument,
          x = b ? b.nodeType : 9;
        if (
          ((d = d || []),
          "string" != typeof a || !a || (1 !== x && 9 !== x && 11 !== x))
        )
          return d;
        if (
          !e &&
          ((b ? b.ownerDocument || b : v) !== n && m(b), (b = b || n), p)
        ) {
          if (11 !== x && (o = $.exec(a)))
            if ((f = o[1])) {
              if (9 === x) {
                if (!(j = b.getElementById(f))) return d;
                if (j.id === f) return d.push(j), d;
              } else if (
                w &&
                (j = w.getElementById(f)) &&
                t(b, j) &&
                j.id === f
              )
                return d.push(j), d;
            } else {
              if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
              if (
                (f = o[3]) &&
                c.getElementsByClassName &&
                b.getElementsByClassName
              )
                return H.apply(d, b.getElementsByClassName(f)), d;
            }
          if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
            if (1 !== x) (w = b), (s = a);
            else if ("object" !== b.nodeName.toLowerCase()) {
              (k = b.getAttribute("id"))
                ? (k = k.replace(aa, "\\$&"))
                : b.setAttribute("id", (k = u)),
                (r = g(a)),
                (h = r.length),
                (l = V.test(k) ? "#" + k : "[id='" + k + "']");
              while (h--) r[h] = l + " " + qa(r[h]);
              (s = r.join(",")), (w = (_.test(a) && oa(b.parentNode)) || b);
            }
            if (s)
              try {
                return H.apply(d, w.querySelectorAll(s)), d;
              } catch (y) {
              } finally {
                k === u && b.removeAttribute("id");
              }
          }
        }
        return i(a.replace(Q, "$1"), b, d, e);
      }
      function ga() {
        var a = [];
        function b(c, e) {
          return (
            a.push(c + " ") > d.cacheLength && delete b[a.shift()],
            (b[c + " "] = e)
          );
        }
        return b;
      }
      function ha(a) {
        return (a[u] = !0), a;
      }
      function ia(a) {
        var b = n.createElement("div");
        try {
          return !!a(b);
        } catch (c) {
          return !1;
        } finally {
          b.parentNode && b.parentNode.removeChild(b), (b = null);
        }
      }
      function ja(a, b) {
        var c = a.split("|"),
          e = c.length;
        while (e--) d.attrHandle[c[e]] = b;
      }
      function ka(a, b) {
        var c = b && a,
          d =
            c &&
            1 === a.nodeType &&
            1 === b.nodeType &&
            (~b.sourceIndex || C) - (~a.sourceIndex || C);
        if (d) return d;
        if (c) while ((c = c.nextSibling)) if (c === b) return -1;
        return a ? 1 : -1;
      }
      function la(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return "input" === c && b.type === a;
        };
      }
      function ma(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return ("input" === c || "button" === c) && b.type === a;
        };
      }
      function na(a) {
        return ha(function (b) {
          return (
            (b = +b),
            ha(function (c, d) {
              var e,
                f = a([], c.length, b),
                g = f.length;
              while (g--) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
            })
          );
        });
      }
      function oa(a) {
        return a && "undefined" != typeof a.getElementsByTagName && a;
      }
      (c = fa.support = {}),
        (f = fa.isXML =
          function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
          }),
        (m = fa.setDocument =
          function (a) {
            var b,
              e,
              g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement
              ? ((n = g),
                (o = n.documentElement),
                (p = !f(n)),
                (e = n.defaultView) &&
                  e.top !== e &&
                  (e.addEventListener
                    ? e.addEventListener("unload", da, !1)
                    : e.attachEvent && e.attachEvent("onunload", da)),
                (c.attributes = ia(function (a) {
                  return (a.className = "i"), !a.getAttribute("className");
                })),
                (c.getElementsByTagName = ia(function (a) {
                  return (
                    a.appendChild(n.createComment("")),
                    !a.getElementsByTagName("*").length
                  );
                })),
                (c.getElementsByClassName = Z.test(n.getElementsByClassName)),
                (c.getById = ia(function (a) {
                  return (
                    (o.appendChild(a).id = u),
                    !n.getElementsByName || !n.getElementsByName(u).length
                  );
                })),
                c.getById
                  ? ((d.find.ID = function (a, b) {
                      if ("undefined" != typeof b.getElementById && p) {
                        var c = b.getElementById(a);
                        return c ? [c] : [];
                      }
                    }),
                    (d.filter.ID = function (a) {
                      var b = a.replace(ba, ca);
                      return function (a) {
                        return a.getAttribute("id") === b;
                      };
                    }))
                  : (delete d.find.ID,
                    (d.filter.ID = function (a) {
                      var b = a.replace(ba, ca);
                      return function (a) {
                        var c =
                          "undefined" != typeof a.getAttributeNode &&
                          a.getAttributeNode("id");
                        return c && c.value === b;
                      };
                    })),
                (d.find.TAG = c.getElementsByTagName
                  ? function (a, b) {
                      return "undefined" != typeof b.getElementsByTagName
                        ? b.getElementsByTagName(a)
                        : c.qsa
                        ? b.querySelectorAll(a)
                        : void 0;
                    }
                  : function (a, b) {
                      var c,
                        d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                      if ("*" === a) {
                        while ((c = f[e++])) 1 === c.nodeType && d.push(c);
                        return d;
                      }
                      return f;
                    }),
                (d.find.CLASS =
                  c.getElementsByClassName &&
                  function (a, b) {
                    return "undefined" != typeof b.getElementsByClassName && p
                      ? b.getElementsByClassName(a)
                      : void 0;
                  }),
                (r = []),
                (q = []),
                (c.qsa = Z.test(n.querySelectorAll)) &&
                  (ia(function (a) {
                    (o.appendChild(a).innerHTML =
                      "<a id='" +
                      u +
                      "'></a><select id='" +
                      u +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      a.querySelectorAll("[msallowcapture^='']").length &&
                        q.push("[*^$]=" + L + "*(?:''|\"\")"),
                      a.querySelectorAll("[selected]").length ||
                        q.push("\\[" + L + "*(?:value|" + K + ")"),
                      a.querySelectorAll("[id~=" + u + "-]").length ||
                        q.push("~="),
                      a.querySelectorAll(":checked").length ||
                        q.push(":checked"),
                      a.querySelectorAll("a#" + u + "+*").length ||
                        q.push(".#.+[+~]");
                  }),
                  ia(function (a) {
                    var b = n.createElement("input");
                    b.setAttribute("type", "hidden"),
                      a.appendChild(b).setAttribute("name", "D"),
                      a.querySelectorAll("[name=d]").length &&
                        q.push("name" + L + "*[*^$|!~]?="),
                      a.querySelectorAll(":enabled").length ||
                        q.push(":enabled", ":disabled"),
                      a.querySelectorAll("*,:x"),
                      q.push(",.*:");
                  })),
                (c.matchesSelector = Z.test(
                  (s =
                    o.matches ||
                    o.webkitMatchesSelector ||
                    o.mozMatchesSelector ||
                    o.oMatchesSelector ||
                    o.msMatchesSelector)
                )) &&
                  ia(function (a) {
                    (c.disconnectedMatch = s.call(a, "div")),
                      s.call(a, "[s!='']:x"),
                      r.push("!=", O);
                  }),
                (q = q.length && new RegExp(q.join("|"))),
                (r = r.length && new RegExp(r.join("|"))),
                (b = Z.test(o.compareDocumentPosition)),
                (t =
                  b || Z.test(o.contains)
                    ? function (a, b) {
                        var c = 9 === a.nodeType ? a.documentElement : a,
                          d = b && b.parentNode;
                        return (
                          a === d ||
                          !(
                            !d ||
                            1 !== d.nodeType ||
                            !(c.contains
                              ? c.contains(d)
                              : a.compareDocumentPosition &&
                                16 & a.compareDocumentPosition(d))
                          )
                        );
                      }
                    : function (a, b) {
                        if (b)
                          while ((b = b.parentNode)) if (b === a) return !0;
                        return !1;
                      }),
                (B = b
                  ? function (a, b) {
                      if (a === b) return (l = !0), 0;
                      var d =
                        !a.compareDocumentPosition - !b.compareDocumentPosition;
                      return d
                        ? d
                        : ((d =
                            (a.ownerDocument || a) === (b.ownerDocument || b)
                              ? a.compareDocumentPosition(b)
                              : 1),
                          1 & d ||
                          (!c.sortDetached &&
                            b.compareDocumentPosition(a) === d)
                            ? a === n || (a.ownerDocument === v && t(v, a))
                              ? -1
                              : b === n || (b.ownerDocument === v && t(v, b))
                              ? 1
                              : k
                              ? J(k, a) - J(k, b)
                              : 0
                            : 4 & d
                            ? -1
                            : 1);
                    }
                  : function (a, b) {
                      if (a === b) return (l = !0), 0;
                      var c,
                        d = 0,
                        e = a.parentNode,
                        f = b.parentNode,
                        g = [a],
                        h = [b];
                      if (!e || !f)
                        return a === n
                          ? -1
                          : b === n
                          ? 1
                          : e
                          ? -1
                          : f
                          ? 1
                          : k
                          ? J(k, a) - J(k, b)
                          : 0;
                      if (e === f) return ka(a, b);
                      c = a;
                      while ((c = c.parentNode)) g.unshift(c);
                      c = b;
                      while ((c = c.parentNode)) h.unshift(c);
                      while (g[d] === h[d]) d++;
                      return d
                        ? ka(g[d], h[d])
                        : g[d] === v
                        ? -1
                        : h[d] === v
                        ? 1
                        : 0;
                    }),
                n)
              : n;
          }),
        (fa.matches = function (a, b) {
          return fa(a, null, null, b);
        }),
        (fa.matchesSelector = function (a, b) {
          if (
            ((a.ownerDocument || a) !== n && m(a),
            (b = b.replace(T, "='$1']")),
            c.matchesSelector &&
              p &&
              !A[b + " "] &&
              (!r || !r.test(b)) &&
              (!q || !q.test(b)))
          )
            try {
              var d = s.call(a, b);
              if (
                d ||
                c.disconnectedMatch ||
                (a.document && 11 !== a.document.nodeType)
              )
                return d;
            } catch (e) {}
          return fa(b, n, null, [a]).length > 0;
        }),
        (fa.contains = function (a, b) {
          return (a.ownerDocument || a) !== n && m(a), t(a, b);
        }),
        (fa.attr = function (a, b) {
          (a.ownerDocument || a) !== n && m(a);
          var e = d.attrHandle[b.toLowerCase()],
            f =
              e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
          return void 0 !== f
            ? f
            : c.attributes || !p
            ? a.getAttribute(b)
            : (f = a.getAttributeNode(b)) && f.specified
            ? f.value
            : null;
        }),
        (fa.error = function (a) {
          throw new Error("Syntax error, unrecognized expression: " + a);
        }),
        (fa.uniqueSort = function (a) {
          var b,
            d = [],
            e = 0,
            f = 0;
          if (
            ((l = !c.detectDuplicates),
            (k = !c.sortStable && a.slice(0)),
            a.sort(B),
            l)
          ) {
            while ((b = a[f++])) b === a[f] && (e = d.push(f));
            while (e--) a.splice(d[e], 1);
          }
          return (k = null), a;
        }),
        (e = fa.getText =
          function (a) {
            var b,
              c = "",
              d = 0,
              f = a.nodeType;
            if (f) {
              if (1 === f || 9 === f || 11 === f) {
                if ("string" == typeof a.textContent) return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
              } else if (3 === f || 4 === f) return a.nodeValue;
            } else while ((b = a[d++])) c += e(b);
            return c;
          }),
        (d = fa.selectors =
          {
            cacheLength: 50,
            createPseudo: ha,
            match: W,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (a) {
                return (
                  (a[1] = a[1].replace(ba, ca)),
                  (a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca)),
                  "~=" === a[2] && (a[3] = " " + a[3] + " "),
                  a.slice(0, 4)
                );
              },
              CHILD: function (a) {
                return (
                  (a[1] = a[1].toLowerCase()),
                  "nth" === a[1].slice(0, 3)
                    ? (a[3] || fa.error(a[0]),
                      (a[4] = +(a[4]
                        ? a[5] + (a[6] || 1)
                        : 2 * ("even" === a[3] || "odd" === a[3]))),
                      (a[5] = +(a[7] + a[8] || "odd" === a[3])))
                    : a[3] && fa.error(a[0]),
                  a
                );
              },
              PSEUDO: function (a) {
                var b,
                  c = !a[6] && a[2];
                return W.CHILD.test(a[0])
                  ? null
                  : (a[3]
                      ? (a[2] = a[4] || a[5] || "")
                      : c &&
                        U.test(c) &&
                        (b = g(c, !0)) &&
                        (b = c.indexOf(")", c.length - b) - c.length) &&
                        ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))),
                    a.slice(0, 3));
              },
            },
            filter: {
              TAG: function (a) {
                var b = a.replace(ba, ca).toLowerCase();
                return "*" === a
                  ? function () {
                      return !0;
                    }
                  : function (a) {
                      return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
              },
              CLASS: function (a) {
                var b = y[a + " "];
                return (
                  b ||
                  ((b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) &&
                    y(a, function (a) {
                      return b.test(
                        ("string" == typeof a.className && a.className) ||
                          ("undefined" != typeof a.getAttribute &&
                            a.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (a, b, c) {
                return function (d) {
                  var e = fa.attr(d, a);
                  return null == e
                    ? "!=" === b
                    : b
                    ? ((e += ""),
                      "=" === b
                        ? e === c
                        : "!=" === b
                        ? e !== c
                        : "^=" === b
                        ? c && 0 === e.indexOf(c)
                        : "*=" === b
                        ? c && e.indexOf(c) > -1
                        : "$=" === b
                        ? c && e.slice(-c.length) === c
                        : "~=" === b
                        ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1
                        : "|=" === b
                        ? e === c || e.slice(0, c.length + 1) === c + "-"
                        : !1)
                    : !0;
                };
              },
              CHILD: function (a, b, c, d, e) {
                var f = "nth" !== a.slice(0, 3),
                  g = "last" !== a.slice(-4),
                  h = "of-type" === b;
                return 1 === d && 0 === e
                  ? function (a) {
                      return !!a.parentNode;
                    }
                  : function (b, c, i) {
                      var j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p = f !== g ? "nextSibling" : "previousSibling",
                        q = b.parentNode,
                        r = h && b.nodeName.toLowerCase(),
                        s = !i && !h,
                        t = !1;
                      if (q) {
                        if (f) {
                          while (p) {
                            m = b;
                            while ((m = m[p]))
                              if (
                                h
                                  ? m.nodeName.toLowerCase() === r
                                  : 1 === m.nodeType
                              )
                                return !1;
                            o = p = "only" === a && !o && "nextSibling";
                          }
                          return !0;
                        }
                        if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                          (m = q),
                            (l = m[u] || (m[u] = {})),
                            (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                            (j = k[a] || []),
                            (n = j[0] === w && j[1]),
                            (t = n && j[2]),
                            (m = n && q.childNodes[n]);
                          while (
                            (m = (++n && m && m[p]) || (t = n = 0) || o.pop())
                          )
                            if (1 === m.nodeType && ++t && m === b) {
                              k[a] = [w, n, t];
                              break;
                            }
                        } else if (
                          (s &&
                            ((m = b),
                            (l = m[u] || (m[u] = {})),
                            (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                            (j = k[a] || []),
                            (n = j[0] === w && j[1]),
                            (t = n)),
                          t === !1)
                        )
                          while (
                            (m = (++n && m && m[p]) || (t = n = 0) || o.pop())
                          )
                            if (
                              (h
                                ? m.nodeName.toLowerCase() === r
                                : 1 === m.nodeType) &&
                              ++t &&
                              (s &&
                                ((l = m[u] || (m[u] = {})),
                                (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                                (k[a] = [w, t])),
                              m === b)
                            )
                              break;
                        return (t -= e), t === d || (t % d === 0 && t / d >= 0);
                      }
                    };
              },
              PSEUDO: function (a, b) {
                var c,
                  e =
                    d.pseudos[a] ||
                    d.setFilters[a.toLowerCase()] ||
                    fa.error("unsupported pseudo: " + a);
                return e[u]
                  ? e(b)
                  : e.length > 1
                  ? ((c = [a, a, "", b]),
                    d.setFilters.hasOwnProperty(a.toLowerCase())
                      ? ha(function (a, c) {
                          var d,
                            f = e(a, b),
                            g = f.length;
                          while (g--) (d = J(a, f[g])), (a[d] = !(c[d] = f[g]));
                        })
                      : function (a) {
                          return e(a, 0, c);
                        })
                  : e;
              },
            },
            pseudos: {
              not: ha(function (a) {
                var b = [],
                  c = [],
                  d = h(a.replace(Q, "$1"));
                return d[u]
                  ? ha(function (a, b, c, e) {
                      var f,
                        g = d(a, null, e, []),
                        h = a.length;
                      while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
                    })
                  : function (a, e, f) {
                      return (
                        (b[0] = a), d(b, null, f, c), (b[0] = null), !c.pop()
                      );
                    };
              }),
              has: ha(function (a) {
                return function (b) {
                  return fa(a, b).length > 0;
                };
              }),
              contains: ha(function (a) {
                return (
                  (a = a.replace(ba, ca)),
                  function (b) {
                    return (
                      (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    );
                  }
                );
              }),
              lang: ha(function (a) {
                return (
                  V.test(a || "") || fa.error("unsupported lang: " + a),
                  (a = a.replace(ba, ca).toLowerCase()),
                  function (b) {
                    var c;
                    do
                      if (
                        (c = p
                          ? b.lang
                          : b.getAttribute("xml:lang") ||
                            b.getAttribute("lang"))
                      )
                        return (
                          (c = c.toLowerCase()),
                          c === a || 0 === c.indexOf(a + "-")
                        );
                    while ((b = b.parentNode) && 1 === b.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (b) {
                var c = a.location && a.location.hash;
                return c && c.slice(1) === b.id;
              },
              root: function (a) {
                return a === o;
              },
              focus: function (a) {
                return (
                  a === n.activeElement &&
                  (!n.hasFocus || n.hasFocus()) &&
                  !!(a.type || a.href || ~a.tabIndex)
                );
              },
              enabled: function (a) {
                return a.disabled === !1;
              },
              disabled: function (a) {
                return a.disabled === !0;
              },
              checked: function (a) {
                var b = a.nodeName.toLowerCase();
                return (
                  ("input" === b && !!a.checked) ||
                  ("option" === b && !!a.selected)
                );
              },
              selected: function (a) {
                return (
                  a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                );
              },
              empty: function (a) {
                for (a = a.firstChild; a; a = a.nextSibling)
                  if (a.nodeType < 6) return !1;
                return !0;
              },
              parent: function (a) {
                return !d.pseudos.empty(a);
              },
              header: function (a) {
                return Y.test(a.nodeName);
              },
              input: function (a) {
                return X.test(a.nodeName);
              },
              button: function (a) {
                var b = a.nodeName.toLowerCase();
                return ("input" === b && "button" === a.type) || "button" === b;
              },
              text: function (a) {
                var b;
                return (
                  "input" === a.nodeName.toLowerCase() &&
                  "text" === a.type &&
                  (null == (b = a.getAttribute("type")) ||
                    "text" === b.toLowerCase())
                );
              },
              first: na(function () {
                return [0];
              }),
              last: na(function (a, b) {
                return [b - 1];
              }),
              eq: na(function (a, b, c) {
                return [0 > c ? c + b : c];
              }),
              even: na(function (a, b) {
                for (var c = 0; b > c; c += 2) a.push(c);
                return a;
              }),
              odd: na(function (a, b) {
                for (var c = 1; b > c; c += 2) a.push(c);
                return a;
              }),
              lt: na(function (a, b, c) {
                for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                return a;
              }),
              gt: na(function (a, b, c) {
                for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                return a;
              }),
            },
          }),
        (d.pseudos.nth = d.pseudos.eq);
      for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        d.pseudos[b] = la(b);
      for (b in { submit: !0, reset: !0 }) d.pseudos[b] = ma(b);
      function pa() {}
      (pa.prototype = d.filters = d.pseudos),
        (d.setFilters = new pa()),
        (g = fa.tokenize =
          function (a, b) {
            var c,
              e,
              f,
              g,
              h,
              i,
              j,
              k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            (h = a), (i = []), (j = d.preFilter);
            while (h) {
              (c && !(e = R.exec(h))) ||
                (e && (h = h.slice(e[0].length) || h), i.push((f = []))),
                (c = !1),
                (e = S.exec(h)) &&
                  ((c = e.shift()),
                  f.push({ value: c, type: e[0].replace(Q, " ") }),
                  (h = h.slice(c.length)));
              for (g in d.filter)
                !(e = W[g].exec(h)) ||
                  (j[g] && !(e = j[g](e))) ||
                  ((c = e.shift()),
                  f.push({ value: c, type: g, matches: e }),
                  (h = h.slice(c.length)));
              if (!c) break;
            }
            return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
          });
      function qa(a) {
        for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
        return d;
      }
      function ra(a, b, c) {
        var d = b.dir,
          e = c && "parentNode" === d,
          f = x++;
        return b.first
          ? function (b, c, f) {
              while ((b = b[d])) if (1 === b.nodeType || e) return a(b, c, f);
            }
          : function (b, c, g) {
              var h,
                i,
                j,
                k = [w, f];
              if (g) {
                while ((b = b[d]))
                  if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
              } else
                while ((b = b[d]))
                  if (1 === b.nodeType || e) {
                    if (
                      ((j = b[u] || (b[u] = {})),
                      (i = j[b.uniqueID] || (j[b.uniqueID] = {})),
                      (h = i[d]) && h[0] === w && h[1] === f)
                    )
                      return (k[2] = h[2]);
                    if (((i[d] = k), (k[2] = a(b, c, g)))) return !0;
                  }
            };
      }
      function sa(a) {
        return a.length > 1
          ? function (b, c, d) {
              var e = a.length;
              while (e--) if (!a[e](b, c, d)) return !1;
              return !0;
            }
          : a[0];
      }
      function ta(a, b, c) {
        for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
        return c;
      }
      function ua(a, b, c, d, e) {
        for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
          (f = a[h]) && ((c && !c(f, d, e)) || (g.push(f), j && b.push(h)));
        return g;
      }
      function va(a, b, c, d, e, f) {
        return (
          d && !d[u] && (d = va(d)),
          e && !e[u] && (e = va(e, f)),
          ha(function (f, g, h, i) {
            var j,
              k,
              l,
              m = [],
              n = [],
              o = g.length,
              p = f || ta(b || "*", h.nodeType ? [h] : h, []),
              q = !a || (!f && b) ? p : ua(p, m, a, h, i),
              r = c ? (e || (f ? a : o || d) ? [] : g) : q;
            if ((c && c(q, r, h, i), d)) {
              (j = ua(r, n)), d(j, [], h, i), (k = j.length);
              while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
            }
            if (f) {
              if (e || a) {
                if (e) {
                  (j = []), (k = r.length);
                  while (k--) (l = r[k]) && j.push((q[k] = l));
                  e(null, (r = []), j, i);
                }
                k = r.length;
                while (k--)
                  (l = r[k]) &&
                    (j = e ? J(f, l) : m[k]) > -1 &&
                    (f[j] = !(g[j] = l));
              }
            } else (r = ua(r === g ? r.splice(o, r.length) : r)), e ? e(null, g, r, i) : H.apply(g, r);
          })
        );
      }
      function wa(a) {
        for (
          var b,
            c,
            e,
            f = a.length,
            g = d.relative[a[0].type],
            h = g || d.relative[" "],
            i = g ? 1 : 0,
            k = ra(
              function (a) {
                return a === b;
              },
              h,
              !0
            ),
            l = ra(
              function (a) {
                return J(b, a) > -1;
              },
              h,
              !0
            ),
            m = [
              function (a, c, d) {
                var e =
                  (!g && (d || c !== j)) ||
                  ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                return (b = null), e;
              },
            ];
          f > i;
          i++
        )
          if ((c = d.relative[a[i].type])) m = [ra(sa(m), c)];
          else {
            if (((c = d.filter[a[i].type].apply(null, a[i].matches)), c[u])) {
              for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
              return va(
                i > 1 && sa(m),
                i > 1 &&
                  qa(
                    a
                      .slice(0, i - 1)
                      .concat({ value: " " === a[i - 2].type ? "*" : "" })
                  ).replace(Q, "$1"),
                c,
                e > i && wa(a.slice(i, e)),
                f > e && wa((a = a.slice(e))),
                f > e && qa(a)
              );
            }
            m.push(c);
          }
        return sa(m);
      }
      function xa(a, b) {
        var c = b.length > 0,
          e = a.length > 0,
          f = function (f, g, h, i, k) {
            var l,
              o,
              q,
              r = 0,
              s = "0",
              t = f && [],
              u = [],
              v = j,
              x = f || (e && d.find.TAG("*", k)),
              y = (w += null == v ? 1 : Math.random() || 0.1),
              z = x.length;
            for (
              k && (j = g === n || g || k);
              s !== z && null != (l = x[s]);
              s++
            ) {
              if (e && l) {
                (o = 0), g || l.ownerDocument === n || (m(l), (h = !p));
                while ((q = a[o++]))
                  if (q(l, g || n, h)) {
                    i.push(l);
                    break;
                  }
                k && (w = y);
              }
              c && ((l = !q && l) && r--, f && t.push(l));
            }
            if (((r += s), c && s !== r)) {
              o = 0;
              while ((q = b[o++])) q(t, u, g, h);
              if (f) {
                if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(i));
                u = ua(u);
              }
              H.apply(i, u),
                k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
            }
            return k && ((w = y), (j = v)), t;
          };
        return c ? ha(f) : f;
      }
      return (
        (h = fa.compile =
          function (a, b) {
            var c,
              d = [],
              e = [],
              f = A[a + " "];
            if (!f) {
              b || (b = g(a)), (c = b.length);
              while (c--) (f = wa(b[c])), f[u] ? d.push(f) : e.push(f);
              (f = A(a, xa(e, d))), (f.selector = a);
            }
            return f;
          }),
        (i = fa.select =
          function (a, b, e, f) {
            var i,
              j,
              k,
              l,
              m,
              n = "function" == typeof a && a,
              o = !f && g((a = n.selector || a));
            if (((e = e || []), 1 === o.length)) {
              if (
                ((j = o[0] = o[0].slice(0)),
                j.length > 2 &&
                  "ID" === (k = j[0]).type &&
                  c.getById &&
                  9 === b.nodeType &&
                  p &&
                  d.relative[j[1].type])
              ) {
                if (
                  ((b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0]),
                  !b)
                )
                  return e;
                n && (b = b.parentNode), (a = a.slice(j.shift().value.length));
              }
              i = W.needsContext.test(a) ? 0 : j.length;
              while (i--) {
                if (((k = j[i]), d.relative[(l = k.type)])) break;
                if (
                  (m = d.find[l]) &&
                  (f = m(
                    k.matches[0].replace(ba, ca),
                    (_.test(j[0].type) && oa(b.parentNode)) || b
                  ))
                ) {
                  if ((j.splice(i, 1), (a = f.length && qa(j)), !a))
                    return H.apply(e, f), e;
                  break;
                }
              }
            }
            return (
              (n || h(a, o))(
                f,
                b,
                !p,
                e,
                !b || (_.test(a) && oa(b.parentNode)) || b
              ),
              e
            );
          }),
        (c.sortStable = u.split("").sort(B).join("") === u),
        (c.detectDuplicates = !!l),
        m(),
        (c.sortDetached = ia(function (a) {
          return 1 & a.compareDocumentPosition(n.createElement("div"));
        })),
        ia(function (a) {
          return (
            (a.innerHTML = "<a href='#'></a>"),
            "#" === a.firstChild.getAttribute("href")
          );
        }) ||
          ja("type|href|height|width", function (a, b, c) {
            return c
              ? void 0
              : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
          }),
        (c.attributes &&
          ia(function (a) {
            return (
              (a.innerHTML = "<input/>"),
              a.firstChild.setAttribute("value", ""),
              "" === a.firstChild.getAttribute("value")
            );
          })) ||
          ja("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase()
              ? void 0
              : a.defaultValue;
          }),
        ia(function (a) {
          return null == a.getAttribute("disabled");
        }) ||
          ja(K, function (a, b, c) {
            var d;
            return c
              ? void 0
              : a[b] === !0
              ? b.toLowerCase()
              : (d = a.getAttributeNode(b)) && d.specified
              ? d.value
              : null;
          }),
        fa
      );
    })(a);
    (n.find = t),
      (n.expr = t.selectors),
      (n.expr[":"] = n.expr.pseudos),
      (n.uniqueSort = n.unique = t.uniqueSort),
      (n.text = t.getText),
      (n.isXMLDoc = t.isXML),
      (n.contains = t.contains);
    var u = function (a, b, c) {
        var d = [],
          e = void 0 !== c;
        while ((a = a[b]) && 9 !== a.nodeType)
          if (1 === a.nodeType) {
            if (e && n(a).is(c)) break;
            d.push(a);
          }
        return d;
      },
      v = function (a, b) {
        for (var c = []; a; a = a.nextSibling)
          1 === a.nodeType && a !== b && c.push(a);
        return c;
      },
      w = n.expr.match.needsContext,
      x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      y = /^.[^:#\[\.,]*$/;
    function z(a, b, c) {
      if (n.isFunction(b))
        return n.grep(a, function (a, d) {
          return !!b.call(a, d, a) !== c;
        });
      if (b.nodeType)
        return n.grep(a, function (a) {
          return (a === b) !== c;
        });
      if ("string" == typeof b) {
        if (y.test(b)) return n.filter(b, a, c);
        b = n.filter(b, a);
      }
      return n.grep(a, function (a) {
        return n.inArray(a, b) > -1 !== c;
      });
    }
    (n.filter = function (a, b, c) {
      var d = b[0];
      return (
        c && (a = ":not(" + a + ")"),
        1 === b.length && 1 === d.nodeType
          ? n.find.matchesSelector(d, a)
            ? [d]
            : []
          : n.find.matches(
              a,
              n.grep(b, function (a) {
                return 1 === a.nodeType;
              })
            )
      );
    }),
      n.fn.extend({
        find: function (a) {
          var b,
            c = [],
            d = this,
            e = d.length;
          if ("string" != typeof a)
            return this.pushStack(
              n(a).filter(function () {
                for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0;
              })
            );
          for (b = 0; e > b; b++) n.find(a, d[b], c);
          return (
            (c = this.pushStack(e > 1 ? n.unique(c) : c)),
            (c.selector = this.selector ? this.selector + " " + a : a),
            c
          );
        },
        filter: function (a) {
          return this.pushStack(z(this, a || [], !1));
        },
        not: function (a) {
          return this.pushStack(z(this, a || [], !0));
        },
        is: function (a) {
          return !!z(
            this,
            "string" == typeof a && w.test(a) ? n(a) : a || [],
            !1
          ).length;
        },
      });
    var A,
      B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      C = (n.fn.init = function (a, b, c) {
        var e, f;
        if (!a) return this;
        if (((c = c || A), "string" == typeof a)) {
          if (
            ((e =
              "<" === a.charAt(0) &&
              ">" === a.charAt(a.length - 1) &&
              a.length >= 3
                ? [null, a, null]
                : B.exec(a)),
            !e || (!e[1] && b))
          )
            return !b || b.jquery
              ? (b || c).find(a)
              : this.constructor(b).find(a);
          if (e[1]) {
            if (
              ((b = b instanceof n ? b[0] : b),
              n.merge(
                this,
                n.parseHTML(
                  e[1],
                  b && b.nodeType ? b.ownerDocument || b : d,
                  !0
                )
              ),
              x.test(e[1]) && n.isPlainObject(b))
            )
              for (e in b)
                n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
            return this;
          }
          if (((f = d.getElementById(e[2])), f && f.parentNode)) {
            if (f.id !== e[2]) return A.find(a);
            (this.length = 1), (this[0] = f);
          }
          return (this.context = d), (this.selector = a), this;
        }
        return a.nodeType
          ? ((this.context = this[0] = a), (this.length = 1), this)
          : n.isFunction(a)
          ? "undefined" != typeof c.ready
            ? c.ready(a)
            : a(n)
          : (void 0 !== a.selector &&
              ((this.selector = a.selector), (this.context = a.context)),
            n.makeArray(a, this));
      });
    (C.prototype = n.fn), (A = n(d));
    var D = /^(?:parents|prev(?:Until|All))/,
      E = { children: !0, contents: !0, next: !0, prev: !0 };
    n.fn.extend({
      has: function (a) {
        var b,
          c = n(a, this),
          d = c.length;
        return this.filter(function () {
          for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
        });
      },
      closest: function (a, b) {
        for (
          var c,
            d = 0,
            e = this.length,
            f = [],
            g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0;
          e > d;
          d++
        )
          for (c = this[d]; c && c !== b; c = c.parentNode)
            if (
              c.nodeType < 11 &&
              (g
                ? g.index(c) > -1
                : 1 === c.nodeType && n.find.matchesSelector(c, a))
            ) {
              f.push(c);
              break;
            }
        return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
      },
      index: function (a) {
        return a
          ? "string" == typeof a
            ? n.inArray(this[0], n(a))
            : n.inArray(a.jquery ? a[0] : a, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (a, b) {
        return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
      },
      addBack: function (a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      },
    });
    function F(a, b) {
      do a = a[b];
      while (a && 1 !== a.nodeType);
      return a;
    }
    n.each(
      {
        parent: function (a) {
          var b = a.parentNode;
          return b && 11 !== b.nodeType ? b : null;
        },
        parents: function (a) {
          return u(a, "parentNode");
        },
        parentsUntil: function (a, b, c) {
          return u(a, "parentNode", c);
        },
        next: function (a) {
          return F(a, "nextSibling");
        },
        prev: function (a) {
          return F(a, "previousSibling");
        },
        nextAll: function (a) {
          return u(a, "nextSibling");
        },
        prevAll: function (a) {
          return u(a, "previousSibling");
        },
        nextUntil: function (a, b, c) {
          return u(a, "nextSibling", c);
        },
        prevUntil: function (a, b, c) {
          return u(a, "previousSibling", c);
        },
        siblings: function (a) {
          return v((a.parentNode || {}).firstChild, a);
        },
        children: function (a) {
          return v(a.firstChild);
        },
        contents: function (a) {
          return n.nodeName(a, "iframe")
            ? a.contentDocument || a.contentWindow.document
            : n.merge([], a.childNodes);
        },
      },
      function (a, b) {
        n.fn[a] = function (c, d) {
          var e = n.map(this, b, c);
          return (
            "Until" !== a.slice(-5) && (d = c),
            d && "string" == typeof d && (e = n.filter(d, e)),
            this.length > 1 &&
              (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())),
            this.pushStack(e)
          );
        };
      }
    );
    var G = /\S+/g;
    function H(a) {
      var b = {};
      return (
        n.each(a.match(G) || [], function (a, c) {
          b[c] = !0;
        }),
        b
      );
    }
    (n.Callbacks = function (a) {
      a = "string" == typeof a ? H(a) : n.extend({}, a);
      var b,
        c,
        d,
        e,
        f = [],
        g = [],
        h = -1,
        i = function () {
          for (e = a.once, d = b = !0; g.length; h = -1) {
            c = g.shift();
            while (++h < f.length)
              f[h].apply(c[0], c[1]) === !1 &&
                a.stopOnFalse &&
                ((h = f.length), (c = !1));
          }
          a.memory || (c = !1), (b = !1), e && (f = c ? [] : "");
        },
        j = {
          add: function () {
            return (
              f &&
                (c && !b && ((h = f.length - 1), g.push(c)),
                (function d(b) {
                  n.each(b, function (b, c) {
                    n.isFunction(c)
                      ? (a.unique && j.has(c)) || f.push(c)
                      : c && c.length && "string" !== n.type(c) && d(c);
                  });
                })(arguments),
                c && !b && i()),
              this
            );
          },
          remove: function () {
            return (
              n.each(arguments, function (a, b) {
                var c;
                while ((c = n.inArray(b, f, c)) > -1)
                  f.splice(c, 1), h >= c && h--;
              }),
              this
            );
          },
          has: function (a) {
            return a ? n.inArray(a, f) > -1 : f.length > 0;
          },
          empty: function () {
            return f && (f = []), this;
          },
          disable: function () {
            return (e = g = []), (f = c = ""), this;
          },
          disabled: function () {
            return !f;
          },
          lock: function () {
            return (e = !0), c || j.disable(), this;
          },
          locked: function () {
            return !!e;
          },
          fireWith: function (a, c) {
            return (
              e ||
                ((c = c || []),
                (c = [a, c.slice ? c.slice() : c]),
                g.push(c),
                b || i()),
              this
            );
          },
          fire: function () {
            return j.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!d;
          },
        };
      return j;
    }),
      n.extend({
        Deferred: function (a) {
          var b = [
              ["resolve", "done", n.Callbacks("once memory"), "resolved"],
              ["reject", "fail", n.Callbacks("once memory"), "rejected"],
              ["notify", "progress", n.Callbacks("memory")],
            ],
            c = "pending",
            d = {
              state: function () {
                return c;
              },
              always: function () {
                return e.done(arguments).fail(arguments), this;
              },
              then: function () {
                var a = arguments;
                return n
                  .Deferred(function (c) {
                    n.each(b, function (b, f) {
                      var g = n.isFunction(a[b]) && a[b];
                      e[f[1]](function () {
                        var a = g && g.apply(this, arguments);
                        a && n.isFunction(a.promise)
                          ? a
                              .promise()
                              .progress(c.notify)
                              .done(c.resolve)
                              .fail(c.reject)
                          : c[f[0] + "With"](
                              this === d ? c.promise() : this,
                              g ? [a] : arguments
                            );
                      });
                    }),
                      (a = null);
                  })
                  .promise();
              },
              promise: function (a) {
                return null != a ? n.extend(a, d) : d;
              },
            },
            e = {};
          return (
            (d.pipe = d.then),
            n.each(b, function (a, f) {
              var g = f[2],
                h = f[3];
              (d[f[1]] = g.add),
                h &&
                  g.add(
                    function () {
                      c = h;
                    },
                    b[1 ^ a][2].disable,
                    b[2][2].lock
                  ),
                (e[f[0]] = function () {
                  return (
                    e[f[0] + "With"](this === e ? d : this, arguments), this
                  );
                }),
                (e[f[0] + "With"] = g.fireWith);
            }),
            d.promise(e),
            a && a.call(e, e),
            e
          );
        },
        when: function (a) {
          var b = 0,
            c = e.call(arguments),
            d = c.length,
            f = 1 !== d || (a && n.isFunction(a.promise)) ? d : 0,
            g = 1 === f ? a : n.Deferred(),
            h = function (a, b, c) {
              return function (d) {
                (b[a] = this),
                  (c[a] = arguments.length > 1 ? e.call(arguments) : d),
                  c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
              };
            },
            i,
            j,
            k;
          if (d > 1)
            for (
              i = new Array(d), j = new Array(d), k = new Array(d);
              d > b;
              b++
            )
              c[b] && n.isFunction(c[b].promise)
                ? c[b]
                    .promise()
                    .progress(h(b, j, i))
                    .done(h(b, k, c))
                    .fail(g.reject)
                : --f;
          return f || g.resolveWith(k, c), g.promise();
        },
      });
    var I;
    (n.fn.ready = function (a) {
      return n.ready.promise().done(a), this;
    }),
      n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
          a ? n.readyWait++ : n.ready(!0);
        },
        ready: function (a) {
          (a === !0 ? --n.readyWait : n.isReady) ||
            ((n.isReady = !0),
            (a !== !0 && --n.readyWait > 0) ||
              (I.resolveWith(d, [n]),
              n.fn.triggerHandler &&
                (n(d).triggerHandler("ready"), n(d).off("ready"))));
        },
      });
    function J() {
      d.addEventListener
        ? (d.removeEventListener("DOMContentLoaded", K),
          a.removeEventListener("load", K))
        : (d.detachEvent("onreadystatechange", K), a.detachEvent("onload", K));
    }
    function K() {
      (d.addEventListener ||
        "load" === a.event.type ||
        "complete" === d.readyState) &&
        (J(), n.ready());
    }
    (n.ready.promise = function (b) {
      if (!I)
        if (
          ((I = n.Deferred()),
          "complete" === d.readyState ||
            ("loading" !== d.readyState && !d.documentElement.doScroll))
        )
          a.setTimeout(n.ready);
        else if (d.addEventListener)
          d.addEventListener("DOMContentLoaded", K),
            a.addEventListener("load", K);
        else {
          d.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
          var c = !1;
          try {
            c = null == a.frameElement && d.documentElement;
          } catch (e) {}
          c &&
            c.doScroll &&
            !(function f() {
              if (!n.isReady) {
                try {
                  c.doScroll("left");
                } catch (b) {
                  return a.setTimeout(f, 50);
                }
                J(), n.ready();
              }
            })();
        }
      return I.promise(b);
    }),
      n.ready.promise();
    var L;
    for (L in n(l)) break;
    (l.ownFirst = "0" === L),
      (l.inlineBlockNeedsLayout = !1),
      n(function () {
        var a, b, c, e;
        (c = d.getElementsByTagName("body")[0]),
          c &&
            c.style &&
            ((b = d.createElement("div")),
            (e = d.createElement("div")),
            (e.style.cssText =
              "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
            c.appendChild(e).appendChild(b),
            "undefined" != typeof b.style.zoom &&
              ((b.style.cssText =
                "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
              (l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth),
              a && (c.style.zoom = 1)),
            c.removeChild(e));
      }),
      (function () {
        var a = d.createElement("div");
        l.deleteExpando = !0;
        try {
          delete a.test;
        } catch (b) {
          l.deleteExpando = !1;
        }
        a = null;
      })();
    var M = function (a) {
        var b = n.noData[(a.nodeName + " ").toLowerCase()],
          c = +a.nodeType || 1;
        return 1 !== c && 9 !== c
          ? !1
          : !b || (b !== !0 && a.getAttribute("classid") === b);
      },
      N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      O = /([A-Z])/g;
    function P(a, b, c) {
      if (void 0 === c && 1 === a.nodeType) {
        var d = "data-" + b.replace(O, "-$1").toLowerCase();
        if (((c = a.getAttribute(d)), "string" == typeof c)) {
          try {
            c =
              "true" === c
                ? !0
                : "false" === c
                ? !1
                : "null" === c
                ? null
                : +c + "" === c
                ? +c
                : N.test(c)
                ? n.parseJSON(c)
                : c;
          } catch (e) {}
          n.data(a, b, c);
        } else c = void 0;
      }
      return c;
    }
    function Q(a) {
      var b;
      for (b in a)
        if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b)
          return !1;
      return !0;
    }
    function R(a, b, d, e) {
      if (M(a)) {
        var f,
          g,
          h = n.expando,
          i = a.nodeType,
          j = i ? n.cache : a,
          k = i ? a[h] : a[h] && h;
        if (
          (k && j[k] && (e || j[k].data)) ||
          void 0 !== d ||
          "string" != typeof b
        )
          return (
            k || (k = i ? (a[h] = c.pop() || n.guid++) : h),
            j[k] || (j[k] = i ? {} : { toJSON: n.noop }),
            ("object" != typeof b && "function" != typeof b) ||
              (e
                ? (j[k] = n.extend(j[k], b))
                : (j[k].data = n.extend(j[k].data, b))),
            (g = j[k]),
            e || (g.data || (g.data = {}), (g = g.data)),
            void 0 !== d && (g[n.camelCase(b)] = d),
            "string" == typeof b
              ? ((f = g[b]), null == f && (f = g[n.camelCase(b)]))
              : (f = g),
            f
          );
      }
    }
    function S(a, b, c) {
      if (M(a)) {
        var d,
          e,
          f = a.nodeType,
          g = f ? n.cache : a,
          h = f ? a[n.expando] : n.expando;
        if (g[h]) {
          if (b && (d = c ? g[h] : g[h].data)) {
            n.isArray(b)
              ? (b = b.concat(n.map(b, n.camelCase)))
              : b in d
              ? (b = [b])
              : ((b = n.camelCase(b)), (b = b in d ? [b] : b.split(" "))),
              (e = b.length);
            while (e--) delete d[b[e]];
            if (c ? !Q(d) : !n.isEmptyObject(d)) return;
          }
          (c || (delete g[h].data, Q(g[h]))) &&
            (f
              ? n.cleanData([a], !0)
              : l.deleteExpando || g != g.window
              ? delete g[h]
              : (g[h] = void 0));
        }
      }
    }
    n.extend({
      cache: {},
      noData: {
        "applet ": !0,
        "embed ": !0,
        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      },
      hasData: function (a) {
        return (
          (a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando]), !!a && !Q(a)
        );
      },
      data: function (a, b, c) {
        return R(a, b, c);
      },
      removeData: function (a, b) {
        return S(a, b);
      },
      _data: function (a, b, c) {
        return R(a, b, c, !0);
      },
      _removeData: function (a, b) {
        return S(a, b, !0);
      },
    }),
      n.fn.extend({
        data: function (a, b) {
          var c,
            d,
            e,
            f = this[0],
            g = f && f.attributes;
          if (void 0 === a) {
            if (
              this.length &&
              ((e = n.data(f)), 1 === f.nodeType && !n._data(f, "parsedAttrs"))
            ) {
              c = g.length;
              while (c--)
                g[c] &&
                  ((d = g[c].name),
                  0 === d.indexOf("data-") &&
                    ((d = n.camelCase(d.slice(5))), P(f, d, e[d])));
              n._data(f, "parsedAttrs", !0);
            }
            return e;
          }
          return "object" == typeof a
            ? this.each(function () {
                n.data(this, a);
              })
            : arguments.length > 1
            ? this.each(function () {
                n.data(this, a, b);
              })
            : f
            ? P(f, a, n.data(f, a))
            : void 0;
        },
        removeData: function (a) {
          return this.each(function () {
            n.removeData(this, a);
          });
        },
      }),
      n.extend({
        queue: function (a, b, c) {
          var d;
          return a
            ? ((b = (b || "fx") + "queue"),
              (d = n._data(a, b)),
              c &&
                (!d || n.isArray(c)
                  ? (d = n._data(a, b, n.makeArray(c)))
                  : d.push(c)),
              d || [])
            : void 0;
        },
        dequeue: function (a, b) {
          b = b || "fx";
          var c = n.queue(a, b),
            d = c.length,
            e = c.shift(),
            f = n._queueHooks(a, b),
            g = function () {
              n.dequeue(a, b);
            };
          "inprogress" === e && ((e = c.shift()), d--),
            e &&
              ("fx" === b && c.unshift("inprogress"),
              delete f.stop,
              e.call(a, g, f)),
            !d && f && f.empty.fire();
        },
        _queueHooks: function (a, b) {
          var c = b + "queueHooks";
          return (
            n._data(a, c) ||
            n._data(a, c, {
              empty: n.Callbacks("once memory").add(function () {
                n._removeData(a, b + "queue"), n._removeData(a, c);
              }),
            })
          );
        },
      }),
      n.fn.extend({
        queue: function (a, b) {
          var c = 2;
          return (
            "string" != typeof a && ((b = a), (a = "fx"), c--),
            arguments.length < c
              ? n.queue(this[0], a)
              : void 0 === b
              ? this
              : this.each(function () {
                  var c = n.queue(this, a, b);
                  n._queueHooks(this, a),
                    "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
                })
          );
        },
        dequeue: function (a) {
          return this.each(function () {
            n.dequeue(this, a);
          });
        },
        clearQueue: function (a) {
          return this.queue(a || "fx", []);
        },
        promise: function (a, b) {
          var c,
            d = 1,
            e = n.Deferred(),
            f = this,
            g = this.length,
            h = function () {
              --d || e.resolveWith(f, [f]);
            };
          "string" != typeof a && ((b = a), (a = void 0)), (a = a || "fx");
          while (g--)
            (c = n._data(f[g], a + "queueHooks")),
              c && c.empty && (d++, c.empty.add(h));
          return h(), e.promise(b);
        },
      }),
      (function () {
        var a;
        l.shrinkWrapBlocks = function () {
          if (null != a) return a;
          a = !1;
          var b, c, e;
          return (
            (c = d.getElementsByTagName("body")[0]),
            c && c.style
              ? ((b = d.createElement("div")),
                (e = d.createElement("div")),
                (e.style.cssText =
                  "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                c.appendChild(e).appendChild(b),
                "undefined" != typeof b.style.zoom &&
                  ((b.style.cssText =
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                  (b.appendChild(d.createElement("div")).style.width = "5px"),
                  (a = 3 !== b.offsetWidth)),
                c.removeChild(e),
                a)
              : void 0
          );
        };
      })();
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
      V = ["Top", "Right", "Bottom", "Left"],
      W = function (a, b) {
        return (
          (a = b || a),
          "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
        );
      };
    function X(a, b, c, d) {
      var e,
        f = 1,
        g = 20,
        h = d
          ? function () {
              return d.cur();
            }
          : function () {
              return n.css(a, b, "");
            },
        i = h(),
        j = (c && c[3]) || (n.cssNumber[b] ? "" : "px"),
        k = (n.cssNumber[b] || ("px" !== j && +i)) && U.exec(n.css(a, b));
      if (k && k[3] !== j) {
        (j = j || k[3]), (c = c || []), (k = +i || 1);
        do (f = f || ".5"), (k /= f), n.style(a, b, k + j);
        while (f !== (f = h() / i) && 1 !== f && --g);
      }
      return (
        c &&
          ((k = +k || +i || 0),
          (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]),
          d && ((d.unit = j), (d.start = k), (d.end = e))),
        e
      );
    }
    var Y = function (a, b, c, d, e, f, g) {
        var h = 0,
          i = a.length,
          j = null == c;
        if ("object" === n.type(c)) {
          e = !0;
          for (h in c) Y(a, b, h, c[h], !0, f, g);
        } else if (
          void 0 !== d &&
          ((e = !0),
          n.isFunction(d) || (g = !0),
          j &&
            (g
              ? (b.call(a, d), (b = null))
              : ((j = b),
                (b = function (a, b, c) {
                  return j.call(n(a), c);
                }))),
          b)
        )
          for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
      },
      Z = /^(?:checkbox|radio)$/i,
      $ = /<([\w:-]+)/,
      _ = /^$|\/(?:java|ecma)script/i,
      aa = /^\s+/,
      ba =
        "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    function ca(a) {
      var b = ba.split("|"),
        c = a.createDocumentFragment();
      if (c.createElement) while (b.length) c.createElement(b.pop());
      return c;
    }
    !(function () {
      var a = d.createElement("div"),
        b = d.createDocumentFragment(),
        c = d.createElement("input");
      (a.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (l.leadingWhitespace = 3 === a.firstChild.nodeType),
        (l.tbody = !a.getElementsByTagName("tbody").length),
        (l.htmlSerialize = !!a.getElementsByTagName("link").length),
        (l.html5Clone =
          "<:nav></:nav>" !== d.createElement("nav").cloneNode(!0).outerHTML),
        (c.type = "checkbox"),
        (c.checked = !0),
        b.appendChild(c),
        (l.appendChecked = c.checked),
        (a.innerHTML = "<textarea>x</textarea>"),
        (l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue),
        b.appendChild(a),
        (c = d.createElement("input")),
        c.setAttribute("type", "radio"),
        c.setAttribute("checked", "checked"),
        c.setAttribute("name", "t"),
        a.appendChild(c),
        (l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (l.noCloneEvent = !!a.addEventListener),
        (a[n.expando] = 1),
        (l.attributes = !a.getAttribute(n.expando));
    })();
    var da = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    };
    (da.optgroup = da.option),
      (da.tbody = da.tfoot = da.colgroup = da.caption = da.thead),
      (da.th = da.td);
    function ea(a, b) {
      var c,
        d,
        e = 0,
        f =
          "undefined" != typeof a.getElementsByTagName
            ? a.getElementsByTagName(b || "*")
            : "undefined" != typeof a.querySelectorAll
            ? a.querySelectorAll(b || "*")
            : void 0;
      if (!f)
        for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
          !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
      return void 0 === b || (b && n.nodeName(a, b)) ? n.merge([a], f) : f;
    }
    function fa(a, b) {
      for (var c, d = 0; null != (c = a[d]); d++)
        n._data(c, "globalEval", !b || n._data(b[d], "globalEval"));
    }
    var ga = /<|&#?\w+;/,
      ha = /<tbody/i;
    function ia(a) {
      Z.test(a.type) && (a.defaultChecked = a.checked);
    }
    function ja(a, b, c, d, e) {
      for (
        var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0;
        o > r;
        r++
      )
        if (((g = a[r]), g || 0 === g))
          if ("object" === n.type(g)) n.merge(q, g.nodeType ? [g] : g);
          else if (ga.test(g)) {
            (i = i || p.appendChild(b.createElement("div"))),
              (j = ($.exec(g) || ["", ""])[1].toLowerCase()),
              (m = da[j] || da._default),
              (i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2]),
              (f = m[0]);
            while (f--) i = i.lastChild;
            if (
              (!l.leadingWhitespace &&
                aa.test(g) &&
                q.push(b.createTextNode(aa.exec(g)[0])),
              !l.tbody)
            ) {
              (g =
                "table" !== j || ha.test(g)
                  ? "<table>" !== m[1] || ha.test(g)
                    ? 0
                    : i
                  : i.firstChild),
                (f = g && g.childNodes.length);
              while (f--)
                n.nodeName((k = g.childNodes[f]), "tbody") &&
                  !k.childNodes.length &&
                  g.removeChild(k);
            }
            n.merge(q, i.childNodes), (i.textContent = "");
            while (i.firstChild) i.removeChild(i.firstChild);
            i = p.lastChild;
          } else q.push(b.createTextNode(g));
      i && p.removeChild(i),
        l.appendChecked || n.grep(ea(q, "input"), ia),
        (r = 0);
      while ((g = q[r++]))
        if (d && n.inArray(g, d) > -1) e && e.push(g);
        else if (
          ((h = n.contains(g.ownerDocument, g)),
          (i = ea(p.appendChild(g), "script")),
          h && fa(i),
          c)
        ) {
          f = 0;
          while ((g = i[f++])) _.test(g.type || "") && c.push(g);
        }
      return (i = null), p;
    }
    !(function () {
      var b,
        c,
        e = d.createElement("div");
      for (b in { submit: !0, change: !0, focusin: !0 })
        (c = "on" + b),
          (l[b] = c in a) ||
            (e.setAttribute(c, "t"), (l[b] = e.attributes[c].expando === !1));
      e = null;
    })();
    var ka = /^(?:input|select|textarea)$/i,
      la = /^key/,
      ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      na = /^(?:focusinfocus|focusoutblur)$/,
      oa = /^([^.]*)(?:\.(.+)|)/;
    function pa() {
      return !0;
    }
    function qa() {
      return !1;
    }
    function ra() {
      try {
        return d.activeElement;
      } catch (a) {}
    }
    function sa(a, b, c, d, e, f) {
      var g, h;
      if ("object" == typeof b) {
        "string" != typeof c && ((d = d || c), (c = void 0));
        for (h in b) sa(a, h, c, d, b[h], f);
        return a;
      }
      if (
        (null == d && null == e
          ? ((e = c), (d = c = void 0))
          : null == e &&
            ("string" == typeof c
              ? ((e = d), (d = void 0))
              : ((e = d), (d = c), (c = void 0))),
        e === !1)
      )
        e = qa;
      else if (!e) return a;
      return (
        1 === f &&
          ((g = e),
          (e = function (a) {
            return n().off(a), g.apply(this, arguments);
          }),
          (e.guid = g.guid || (g.guid = n.guid++))),
        a.each(function () {
          n.event.add(this, b, e, d, c);
        })
      );
    }
    (n.event = {
      global: {},
      add: function (a, b, c, d, e) {
        var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = n._data(a);
        if (r) {
          c.handler && ((i = c), (c = i.handler), (e = i.selector)),
            c.guid || (c.guid = n.guid++),
            (g = r.events) || (g = r.events = {}),
            (k = r.handle) ||
              ((k = r.handle =
                function (a) {
                  return "undefined" == typeof n ||
                    (a && n.event.triggered === a.type)
                    ? void 0
                    : n.event.dispatch.apply(k.elem, arguments);
                }),
              (k.elem = a)),
            (b = (b || "").match(G) || [""]),
            (h = b.length);
          while (h--)
            (f = oa.exec(b[h]) || []),
              (o = q = f[1]),
              (p = (f[2] || "").split(".").sort()),
              o &&
                ((j = n.event.special[o] || {}),
                (o = (e ? j.delegateType : j.bindType) || o),
                (j = n.event.special[o] || {}),
                (l = n.extend(
                  {
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join("."),
                  },
                  i
                )),
                (m = g[o]) ||
                  ((m = g[o] = []),
                  (m.delegateCount = 0),
                  (j.setup && j.setup.call(a, d, p, k) !== !1) ||
                    (a.addEventListener
                      ? a.addEventListener(o, k, !1)
                      : a.attachEvent && a.attachEvent("on" + o, k))),
                j.add &&
                  (j.add.call(a, l),
                  l.handler.guid || (l.handler.guid = c.guid)),
                e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                (n.event.global[o] = !0));
          a = null;
        }
      },
      remove: function (a, b, c, d, e) {
        var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = n.hasData(a) && n._data(a);
        if (r && (k = r.events)) {
          (b = (b || "").match(G) || [""]), (j = b.length);
          while (j--)
            if (
              ((h = oa.exec(b[j]) || []),
              (o = q = h[1]),
              (p = (h[2] || "").split(".").sort()),
              o)
            ) {
              (l = n.event.special[o] || {}),
                (o = (d ? l.delegateType : l.bindType) || o),
                (m = k[o] || []),
                (h =
                  h[2] &&
                  new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")),
                (i = f = m.length);
              while (f--)
                (g = m[f]),
                  (!e && q !== g.origType) ||
                    (c && c.guid !== g.guid) ||
                    (h && !h.test(g.namespace)) ||
                    (d && d !== g.selector && ("**" !== d || !g.selector)) ||
                    (m.splice(f, 1),
                    g.selector && m.delegateCount--,
                    l.remove && l.remove.call(a, g));
              i &&
                !m.length &&
                ((l.teardown && l.teardown.call(a, p, r.handle) !== !1) ||
                  n.removeEvent(a, o, r.handle),
                delete k[o]);
            } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
          n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"));
        }
      },
      trigger: function (b, c, e, f) {
        var g,
          h,
          i,
          j,
          l,
          m,
          o,
          p = [e || d],
          q = k.call(b, "type") ? b.type : b,
          r = k.call(b, "namespace") ? b.namespace.split(".") : [];
        if (
          ((i = m = e = e || d),
          3 !== e.nodeType &&
            8 !== e.nodeType &&
            !na.test(q + n.event.triggered) &&
            (q.indexOf(".") > -1 &&
              ((r = q.split(".")), (q = r.shift()), r.sort()),
            (h = q.indexOf(":") < 0 && "on" + q),
            (b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b)),
            (b.isTrigger = f ? 2 : 3),
            (b.namespace = r.join(".")),
            (b.rnamespace = b.namespace
              ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (b.result = void 0),
            b.target || (b.target = e),
            (c = null == c ? [b] : n.makeArray(c, [b])),
            (l = n.event.special[q] || {}),
            f || !l.trigger || l.trigger.apply(e, c) !== !1))
        ) {
          if (!f && !l.noBubble && !n.isWindow(e)) {
            for (
              j = l.delegateType || q, na.test(j + q) || (i = i.parentNode);
              i;
              i = i.parentNode
            )
              p.push(i), (m = i);
            m === (e.ownerDocument || d) &&
              p.push(m.defaultView || m.parentWindow || a);
          }
          o = 0;
          while ((i = p[o++]) && !b.isPropagationStopped())
            (b.type = o > 1 ? j : l.bindType || q),
              (g =
                (n._data(i, "events") || {})[b.type] && n._data(i, "handle")),
              g && g.apply(i, c),
              (g = h && i[h]),
              g &&
                g.apply &&
                M(i) &&
                ((b.result = g.apply(i, c)),
                b.result === !1 && b.preventDefault());
          if (
            ((b.type = q),
            !f &&
              !b.isDefaultPrevented() &&
              (!l._default || l._default.apply(p.pop(), c) === !1) &&
              M(e) &&
              h &&
              e[q] &&
              !n.isWindow(e))
          ) {
            (m = e[h]), m && (e[h] = null), (n.event.triggered = q);
            try {
              e[q]();
            } catch (s) {}
            (n.event.triggered = void 0), m && (e[h] = m);
          }
          return b.result;
        }
      },
      dispatch: function (a) {
        a = n.event.fix(a);
        var b,
          c,
          d,
          f,
          g,
          h = [],
          i = e.call(arguments),
          j = (n._data(this, "events") || {})[a.type] || [],
          k = n.event.special[a.type] || {};
        if (
          ((i[0] = a),
          (a.delegateTarget = this),
          !k.preDispatch || k.preDispatch.call(this, a) !== !1)
        ) {
          (h = n.event.handlers.call(this, a, j)), (b = 0);
          while ((f = h[b++]) && !a.isPropagationStopped()) {
            (a.currentTarget = f.elem), (c = 0);
            while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
              (a.rnamespace && !a.rnamespace.test(g.namespace)) ||
                ((a.handleObj = g),
                (a.data = g.data),
                (d = (
                  (n.event.special[g.origType] || {}).handle || g.handler
                ).apply(f.elem, i)),
                void 0 !== d &&
                  (a.result = d) === !1 &&
                  (a.preventDefault(), a.stopPropagation()));
          }
          return k.postDispatch && k.postDispatch.call(this, a), a.result;
        }
      },
      handlers: function (a, b) {
        var c,
          d,
          e,
          f,
          g = [],
          h = b.delegateCount,
          i = a.target;
        if (
          h &&
          i.nodeType &&
          ("click" !== a.type || isNaN(a.button) || a.button < 1)
        )
          for (; i != this; i = i.parentNode || this)
            if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
              for (d = [], c = 0; h > c; c++)
                (f = b[c]),
                  (e = f.selector + " "),
                  void 0 === d[e] &&
                    (d[e] = f.needsContext
                      ? n(e, this).index(i) > -1
                      : n.find(e, this, null, [i]).length),
                  d[e] && d.push(f);
              d.length && g.push({ elem: i, handlers: d });
            }
        return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
      },
      fix: function (a) {
        if (a[n.expando]) return a;
        var b,
          c,
          e,
          f = a.type,
          g = a,
          h = this.fixHooks[f];
        h ||
          (this.fixHooks[f] = h =
            ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}),
          (e = h.props ? this.props.concat(h.props) : this.props),
          (a = new n.Event(g)),
          (b = e.length);
        while (b--) (c = e[b]), (a[c] = g[c]);
        return (
          a.target || (a.target = g.srcElement || d),
          3 === a.target.nodeType && (a.target = a.target.parentNode),
          (a.metaKey = !!a.metaKey),
          h.filter ? h.filter(a, g) : a
        );
      },
      props:
        "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
          " "
        ),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function (a, b) {
          return (
            null == a.which &&
              (a.which = null != b.charCode ? b.charCode : b.keyCode),
            a
          );
        },
      },
      mouseHooks: {
        props:
          "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
            " "
          ),
        filter: function (a, b) {
          var c,
            e,
            f,
            g = b.button,
            h = b.fromElement;
          return (
            null == a.pageX &&
              null != b.clientX &&
              ((e = a.target.ownerDocument || d),
              (f = e.documentElement),
              (c = e.body),
              (a.pageX =
                b.clientX +
                ((f && f.scrollLeft) || (c && c.scrollLeft) || 0) -
                ((f && f.clientLeft) || (c && c.clientLeft) || 0)),
              (a.pageY =
                b.clientY +
                ((f && f.scrollTop) || (c && c.scrollTop) || 0) -
                ((f && f.clientTop) || (c && c.clientTop) || 0))),
            !a.relatedTarget &&
              h &&
              (a.relatedTarget = h === a.target ? b.toElement : h),
            a.which ||
              void 0 === g ||
              (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
            a
          );
        },
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== ra() && this.focus)
              try {
                return this.focus(), !1;
              } catch (a) {}
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            return this === ra() && this.blur ? (this.blur(), !1) : void 0;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            return n.nodeName(this, "input") &&
              "checkbox" === this.type &&
              this.click
              ? (this.click(), !1)
              : void 0;
          },
          _default: function (a) {
            return n.nodeName(a.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (a) {
            void 0 !== a.result &&
              a.originalEvent &&
              (a.originalEvent.returnValue = a.result);
          },
        },
      },
      simulate: function (a, b, c) {
        var d = n.extend(new n.Event(), c, { type: a, isSimulated: !0 });
        n.event.trigger(d, null, b),
          d.isDefaultPrevented() && c.preventDefault();
      },
    }),
      (n.removeEvent = d.removeEventListener
        ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c);
          }
        : function (a, b, c) {
            var d = "on" + b;
            a.detachEvent &&
              ("undefined" == typeof a[d] && (a[d] = null),
              a.detachEvent(d, c));
          }),
      (n.Event = function (a, b) {
        return this instanceof n.Event
          ? (a && a.type
              ? ((this.originalEvent = a),
                (this.type = a.type),
                (this.isDefaultPrevented =
                  a.defaultPrevented ||
                  (void 0 === a.defaultPrevented && a.returnValue === !1)
                    ? pa
                    : qa))
              : (this.type = a),
            b && n.extend(this, b),
            (this.timeStamp = (a && a.timeStamp) || n.now()),
            void (this[n.expando] = !0))
          : new n.Event(a, b);
      }),
      (n.Event.prototype = {
        constructor: n.Event,
        isDefaultPrevented: qa,
        isPropagationStopped: qa,
        isImmediatePropagationStopped: qa,
        preventDefault: function () {
          var a = this.originalEvent;
          (this.isDefaultPrevented = pa),
            a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
        },
        stopPropagation: function () {
          var a = this.originalEvent;
          (this.isPropagationStopped = pa),
            a &&
              !this.isSimulated &&
              (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
        },
        stopImmediatePropagation: function () {
          var a = this.originalEvent;
          (this.isImmediatePropagationStopped = pa),
            a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      n.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (a, b) {
          n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
              var c,
                d = this,
                e = a.relatedTarget,
                f = a.handleObj;
              return (
                (e && (e === d || n.contains(d, e))) ||
                  ((a.type = f.origType),
                  (c = f.handler.apply(this, arguments)),
                  (a.type = b)),
                c
              );
            },
          };
        }
      ),
      l.submit ||
        (n.event.special.submit = {
          setup: function () {
            return n.nodeName(this, "form")
              ? !1
              : void n.event.add(
                  this,
                  "click._submit keypress._submit",
                  function (a) {
                    var b = a.target,
                      c =
                        n.nodeName(b, "input") || n.nodeName(b, "button")
                          ? n.prop(b, "form")
                          : void 0;
                    c &&
                      !n._data(c, "submit") &&
                      (n.event.add(c, "submit._submit", function (a) {
                        a._submitBubble = !0;
                      }),
                      n._data(c, "submit", !0));
                  }
                );
          },
          postDispatch: function (a) {
            a._submitBubble &&
              (delete a._submitBubble,
              this.parentNode &&
                !a.isTrigger &&
                n.event.simulate("submit", this.parentNode, a));
          },
          teardown: function () {
            return n.nodeName(this, "form")
              ? !1
              : void n.event.remove(this, "._submit");
          },
        }),
      l.change ||
        (n.event.special.change = {
          setup: function () {
            return ka.test(this.nodeName)
              ? (("checkbox" !== this.type && "radio" !== this.type) ||
                  (n.event.add(this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName &&
                      (this._justChanged = !0);
                  }),
                  n.event.add(this, "click._change", function (a) {
                    this._justChanged &&
                      !a.isTrigger &&
                      (this._justChanged = !1),
                      n.event.simulate("change", this, a);
                  })),
                !1)
              : void n.event.add(this, "beforeactivate._change", function (a) {
                  var b = a.target;
                  ka.test(b.nodeName) &&
                    !n._data(b, "change") &&
                    (n.event.add(b, "change._change", function (a) {
                      !this.parentNode ||
                        a.isSimulated ||
                        a.isTrigger ||
                        n.event.simulate("change", this.parentNode, a);
                    }),
                    n._data(b, "change", !0));
                });
          },
          handle: function (a) {
            var b = a.target;
            return this !== b ||
              a.isSimulated ||
              a.isTrigger ||
              ("radio" !== b.type && "checkbox" !== b.type)
              ? a.handleObj.handler.apply(this, arguments)
              : void 0;
          },
          teardown: function () {
            return n.event.remove(this, "._change"), !ka.test(this.nodeName);
          },
        }),
      l.focusin ||
        n.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
          var c = function (a) {
            n.event.simulate(b, a.target, n.event.fix(a));
          };
          n.event.special[b] = {
            setup: function () {
              var d = this.ownerDocument || this,
                e = n._data(d, b);
              e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
            },
            teardown: function () {
              var d = this.ownerDocument || this,
                e = n._data(d, b) - 1;
              e
                ? n._data(d, b, e)
                : (d.removeEventListener(a, c, !0), n._removeData(d, b));
            },
          };
        }),
      n.fn.extend({
        on: function (a, b, c, d) {
          return sa(this, a, b, c, d);
        },
        one: function (a, b, c, d) {
          return sa(this, a, b, c, d, 1);
        },
        off: function (a, b, c) {
          var d, e;
          if (a && a.preventDefault && a.handleObj)
            return (
              (d = a.handleObj),
              n(a.delegateTarget).off(
                d.namespace ? d.origType + "." + d.namespace : d.origType,
                d.selector,
                d.handler
              ),
              this
            );
          if ("object" == typeof a) {
            for (e in a) this.off(e, b, a[e]);
            return this;
          }
          return (
            (b !== !1 && "function" != typeof b) || ((c = b), (b = void 0)),
            c === !1 && (c = qa),
            this.each(function () {
              n.event.remove(this, a, c, b);
            })
          );
        },
        trigger: function (a, b) {
          return this.each(function () {
            n.event.trigger(a, b, this);
          });
        },
        triggerHandler: function (a, b) {
          var c = this[0];
          return c ? n.event.trigger(a, b, c, !0) : void 0;
        },
      });
    var ta = / jQuery\d+="(?:null|\d+)"/g,
      ua = new RegExp("<(?:" + ba + ")[\\s/>]", "i"),
      va =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      wa = /<script|<style|<link/i,
      xa = /checked\s*(?:[^=]|=\s*.checked.)/i,
      ya = /^true\/(.*)/,
      za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      Aa = ca(d),
      Ba = Aa.appendChild(d.createElement("div"));
    function Ca(a, b) {
      return n.nodeName(a, "table") &&
        n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr")
        ? a.getElementsByTagName("tbody")[0] ||
            a.appendChild(a.ownerDocument.createElement("tbody"))
        : a;
    }
    function Da(a) {
      return (a.type = (null !== n.find.attr(a, "type")) + "/" + a.type), a;
    }
    function Ea(a) {
      var b = ya.exec(a.type);
      return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function Fa(a, b) {
      if (1 === b.nodeType && n.hasData(a)) {
        var c,
          d,
          e,
          f = n._data(a),
          g = n._data(b, f),
          h = f.events;
        if (h) {
          delete g.handle, (g.events = {});
          for (c in h)
            for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d]);
        }
        g.data && (g.data = n.extend({}, g.data));
      }
    }
    function Ga(a, b) {
      var c, d, e;
      if (1 === b.nodeType) {
        if (((c = b.nodeName.toLowerCase()), !l.noCloneEvent && b[n.expando])) {
          e = n._data(b);
          for (d in e.events) n.removeEvent(b, d, e.handle);
          b.removeAttribute(n.expando);
        }
        "script" === c && b.text !== a.text
          ? ((Da(b).text = a.text), Ea(b))
          : "object" === c
          ? (b.parentNode && (b.outerHTML = a.outerHTML),
            l.html5Clone &&
              a.innerHTML &&
              !n.trim(b.innerHTML) &&
              (b.innerHTML = a.innerHTML))
          : "input" === c && Z.test(a.type)
          ? ((b.defaultChecked = b.checked = a.checked),
            b.value !== a.value && (b.value = a.value))
          : "option" === c
          ? (b.defaultSelected = b.selected = a.defaultSelected)
          : ("input" !== c && "textarea" !== c) ||
            (b.defaultValue = a.defaultValue);
      }
    }
    function Ha(a, b, c, d) {
      b = f.apply([], b);
      var e,
        g,
        h,
        i,
        j,
        k,
        m = 0,
        o = a.length,
        p = o - 1,
        q = b[0],
        r = n.isFunction(q);
      if (r || (o > 1 && "string" == typeof q && !l.checkClone && xa.test(q)))
        return a.each(function (e) {
          var f = a.eq(e);
          r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
        });
      if (
        o &&
        ((k = ja(b, a[0].ownerDocument, !1, a, d)),
        (e = k.firstChild),
        1 === k.childNodes.length && (k = e),
        e || d)
      ) {
        for (i = n.map(ea(k, "script"), Da), h = i.length; o > m; m++)
          (g = k),
            m !== p &&
              ((g = n.clone(g, !0, !0)), h && n.merge(i, ea(g, "script"))),
            c.call(a[m], g, m);
        if (h)
          for (
            j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0;
            h > m;
            m++
          )
            (g = i[m]),
              _.test(g.type || "") &&
                !n._data(g, "globalEval") &&
                n.contains(j, g) &&
                (g.src
                  ? n._evalUrl && n._evalUrl(g.src)
                  : n.globalEval(
                      (g.text || g.textContent || g.innerHTML || "").replace(
                        za,
                        ""
                      )
                    ));
        k = e = null;
      }
      return a;
    }
    function Ia(a, b, c) {
      for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
        c || 1 !== d.nodeType || n.cleanData(ea(d)),
          d.parentNode &&
            (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")),
            d.parentNode.removeChild(d));
      return a;
    }
    n.extend({
      htmlPrefilter: function (a) {
        return a.replace(va, "<$1></$2>");
      },
      clone: function (a, b, c) {
        var d,
          e,
          f,
          g,
          h,
          i = n.contains(a.ownerDocument, a);
        if (
          (l.html5Clone || n.isXMLDoc(a) || !ua.test("<" + a.nodeName + ">")
            ? (f = a.cloneNode(!0))
            : ((Ba.innerHTML = a.outerHTML),
              Ba.removeChild((f = Ba.firstChild))),
          !(
            (l.noCloneEvent && l.noCloneChecked) ||
            (1 !== a.nodeType && 11 !== a.nodeType) ||
            n.isXMLDoc(a)
          ))
        )
          for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g)
            d[g] && Ga(e, d[g]);
        if (b)
          if (c)
            for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++)
              Fa(e, d[g]);
          else Fa(a, f);
        return (
          (d = ea(f, "script")),
          d.length > 0 && fa(d, !i && ea(a, "script")),
          (d = h = e = null),
          f
        );
      },
      cleanData: function (a, b) {
        for (
          var d,
            e,
            f,
            g,
            h = 0,
            i = n.expando,
            j = n.cache,
            k = l.attributes,
            m = n.event.special;
          null != (d = a[h]);
          h++
        )
          if ((b || M(d)) && ((f = d[i]), (g = f && j[f]))) {
            if (g.events)
              for (e in g.events)
                m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
            j[f] &&
              (delete j[f],
              k || "undefined" == typeof d.removeAttribute
                ? (d[i] = void 0)
                : d.removeAttribute(i),
              c.push(f));
          }
      },
    }),
      n.fn.extend({
        domManip: Ha,
        detach: function (a) {
          return Ia(this, a, !0);
        },
        remove: function (a) {
          return Ia(this, a);
        },
        text: function (a) {
          return Y(
            this,
            function (a) {
              return void 0 === a
                ? n.text(this)
                : this.empty().append(
                    ((this[0] && this[0].ownerDocument) || d).createTextNode(a)
                  );
            },
            null,
            a,
            arguments.length
          );
        },
        append: function () {
          return Ha(this, arguments, function (a) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var b = Ca(this, a);
              b.appendChild(a);
            }
          });
        },
        prepend: function () {
          return Ha(this, arguments, function (a) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var b = Ca(this, a);
              b.insertBefore(a, b.firstChild);
            }
          });
        },
        before: function () {
          return Ha(this, arguments, function (a) {
            this.parentNode && this.parentNode.insertBefore(a, this);
          });
        },
        after: function () {
          return Ha(this, arguments, function (a) {
            this.parentNode &&
              this.parentNode.insertBefore(a, this.nextSibling);
          });
        },
        empty: function () {
          for (var a, b = 0; null != (a = this[b]); b++) {
            1 === a.nodeType && n.cleanData(ea(a, !1));
            while (a.firstChild) a.removeChild(a.firstChild);
            a.options && n.nodeName(a, "select") && (a.options.length = 0);
          }
          return this;
        },
        clone: function (a, b) {
          return (
            (a = null == a ? !1 : a),
            (b = null == b ? a : b),
            this.map(function () {
              return n.clone(this, a, b);
            })
          );
        },
        html: function (a) {
          return Y(
            this,
            function (a) {
              var b = this[0] || {},
                c = 0,
                d = this.length;
              if (void 0 === a)
                return 1 === b.nodeType ? b.innerHTML.replace(ta, "") : void 0;
              if (
                "string" == typeof a &&
                !wa.test(a) &&
                (l.htmlSerialize || !ua.test(a)) &&
                (l.leadingWhitespace || !aa.test(a)) &&
                !da[($.exec(a) || ["", ""])[1].toLowerCase()]
              ) {
                a = n.htmlPrefilter(a);
                try {
                  for (; d > c; c++)
                    (b = this[c] || {}),
                      1 === b.nodeType &&
                        (n.cleanData(ea(b, !1)), (b.innerHTML = a));
                  b = 0;
                } catch (e) {}
              }
              b && this.empty().append(a);
            },
            null,
            a,
            arguments.length
          );
        },
        replaceWith: function () {
          var a = [];
          return Ha(
            this,
            arguments,
            function (b) {
              var c = this.parentNode;
              n.inArray(this, a) < 0 &&
                (n.cleanData(ea(this)), c && c.replaceChild(b, this));
            },
            a
          );
        },
      }),
      n.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (a, b) {
          n.fn[a] = function (a) {
            for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++)
              (c = d === h ? this : this.clone(!0)),
                n(f[d])[b](c),
                g.apply(e, c.get());
            return this.pushStack(e);
          };
        }
      );
    var Ja,
      Ka = { HTML: "block", BODY: "block" };
    function La(a, b) {
      var c = n(b.createElement(a)).appendTo(b.body),
        d = n.css(c[0], "display");
      return c.detach(), d;
    }
    function Ma(a) {
      var b = d,
        c = Ka[a];
      return (
        c ||
          ((c = La(a, b)),
          ("none" !== c && c) ||
            ((Ja = (
              Ja || n("<iframe frameborder='0' width='0' height='0'/>")
            ).appendTo(b.documentElement)),
            (b = (Ja[0].contentWindow || Ja[0].contentDocument).document),
            b.write(),
            b.close(),
            (c = La(a, b)),
            Ja.detach()),
          (Ka[a] = c)),
        c
      );
    }
    var Na = /^margin/,
      Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"),
      Pa = function (a, b, c, d) {
        var e,
          f,
          g = {};
        for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
      },
      Qa = d.documentElement;
    !(function () {
      var b,
        c,
        e,
        f,
        g,
        h,
        i = d.createElement("div"),
        j = d.createElement("div");
      if (j.style) {
        (j.style.cssText = "float:left;opacity:.5"),
          (l.opacity = "0.5" === j.style.opacity),
          (l.cssFloat = !!j.style.cssFloat),
          (j.style.backgroundClip = "content-box"),
          (j.cloneNode(!0).style.backgroundClip = ""),
          (l.clearCloneStyle = "content-box" === j.style.backgroundClip),
          (i = d.createElement("div")),
          (i.style.cssText =
            "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
          (j.innerHTML = ""),
          i.appendChild(j),
          (l.boxSizing =
            "" === j.style.boxSizing ||
            "" === j.style.MozBoxSizing ||
            "" === j.style.WebkitBoxSizing),
          n.extend(l, {
            reliableHiddenOffsets: function () {
              return null == b && k(), f;
            },
            boxSizingReliable: function () {
              return null == b && k(), e;
            },
            pixelMarginRight: function () {
              return null == b && k(), c;
            },
            pixelPosition: function () {
              return null == b && k(), b;
            },
            reliableMarginRight: function () {
              return null == b && k(), g;
            },
            reliableMarginLeft: function () {
              return null == b && k(), h;
            },
          });
        function k() {
          var k,
            l,
            m = d.documentElement;
          m.appendChild(i),
            (j.style.cssText =
              "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
            (b = e = h = !1),
            (c = g = !0),
            a.getComputedStyle &&
              ((l = a.getComputedStyle(j)),
              (b = "1%" !== (l || {}).top),
              (h = "2px" === (l || {}).marginLeft),
              (e = "4px" === (l || { width: "4px" }).width),
              (j.style.marginRight = "50%"),
              (c = "4px" === (l || { marginRight: "4px" }).marginRight),
              (k = j.appendChild(d.createElement("div"))),
              (k.style.cssText = j.style.cssText =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
              (k.style.marginRight = k.style.width = "0"),
              (j.style.width = "1px"),
              (g = !parseFloat((a.getComputedStyle(k) || {}).marginRight)),
              j.removeChild(k)),
            (j.style.display = "none"),
            (f = 0 === j.getClientRects().length),
            f &&
              ((j.style.display = ""),
              (j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
              (j.childNodes[0].style.borderCollapse = "separate"),
              (k = j.getElementsByTagName("td")),
              (k[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
              (f = 0 === k[0].offsetHeight),
              f &&
                ((k[0].style.display = ""),
                (k[1].style.display = "none"),
                (f = 0 === k[0].offsetHeight))),
            m.removeChild(i);
        }
      }
    })();
    var Ra,
      Sa,
      Ta = /^(top|right|bottom|left)$/;
    a.getComputedStyle
      ? ((Ra = function (b) {
          var c = b.ownerDocument.defaultView;
          return (c && c.opener) || (c = a), c.getComputedStyle(b);
        }),
        (Sa = function (a, b, c) {
          var d,
            e,
            f,
            g,
            h = a.style;
          return (
            (c = c || Ra(a)),
            (g = c ? c.getPropertyValue(b) || c[b] : void 0),
            ("" !== g && void 0 !== g) ||
              n.contains(a.ownerDocument, a) ||
              (g = n.style(a, b)),
            c &&
              !l.pixelMarginRight() &&
              Oa.test(g) &&
              Na.test(b) &&
              ((d = h.width),
              (e = h.minWidth),
              (f = h.maxWidth),
              (h.minWidth = h.maxWidth = h.width = g),
              (g = c.width),
              (h.width = d),
              (h.minWidth = e),
              (h.maxWidth = f)),
            void 0 === g ? g : g + ""
          );
        }))
      : Qa.currentStyle &&
        ((Ra = function (a) {
          return a.currentStyle;
        }),
        (Sa = function (a, b, c) {
          var d,
            e,
            f,
            g,
            h = a.style;
          return (
            (c = c || Ra(a)),
            (g = c ? c[b] : void 0),
            null == g && h && h[b] && (g = h[b]),
            Oa.test(g) &&
              !Ta.test(b) &&
              ((d = h.left),
              (e = a.runtimeStyle),
              (f = e && e.left),
              f && (e.left = a.currentStyle.left),
              (h.left = "fontSize" === b ? "1em" : g),
              (g = h.pixelLeft + "px"),
              (h.left = d),
              f && (e.left = f)),
            void 0 === g ? g : g + "" || "auto"
          );
        }));
    function Ua(a, b) {
      return {
        get: function () {
          return a()
            ? void delete this.get
            : (this.get = b).apply(this, arguments);
        },
      };
    }
    var Va = /alpha\([^)]*\)/i,
      Wa = /opacity\s*=\s*([^)]*)/i,
      Xa = /^(none|table(?!-c[ea]).+)/,
      Ya = new RegExp("^(" + T + ")(.*)$", "i"),
      Za = { position: "absolute", visibility: "hidden", display: "block" },
      $a = { letterSpacing: "0", fontWeight: "400" },
      _a = ["Webkit", "O", "Moz", "ms"],
      ab = d.createElement("div").style;
    function bb(a) {
      if (a in ab) return a;
      var b = a.charAt(0).toUpperCase() + a.slice(1),
        c = _a.length;
      while (c--) if (((a = _a[c] + b), a in ab)) return a;
    }
    function cb(a, b) {
      for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
        (d = a[g]),
          d.style &&
            ((f[g] = n._data(d, "olddisplay")),
            (c = d.style.display),
            b
              ? (f[g] || "none" !== c || (d.style.display = ""),
                "" === d.style.display &&
                  W(d) &&
                  (f[g] = n._data(d, "olddisplay", Ma(d.nodeName))))
              : ((e = W(d)),
                ((c && "none" !== c) || !e) &&
                  n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
      for (g = 0; h > g; g++)
        (d = a[g]),
          d.style &&
            ((b && "none" !== d.style.display && "" !== d.style.display) ||
              (d.style.display = b ? f[g] || "" : "none"));
      return a;
    }
    function db(a, b, c) {
      var d = Ya.exec(b);
      return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function eb(a, b, c, d, e) {
      for (
        var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0,
          g = 0;
        4 > f;
        f += 2
      )
        "margin" === c && (g += n.css(a, c + V[f], !0, e)),
          d
            ? ("content" === c && (g -= n.css(a, "padding" + V[f], !0, e)),
              "margin" !== c &&
                (g -= n.css(a, "border" + V[f] + "Width", !0, e)))
            : ((g += n.css(a, "padding" + V[f], !0, e)),
              "padding" !== c &&
                (g += n.css(a, "border" + V[f] + "Width", !0, e)));
      return g;
    }
    function fb(a, b, c) {
      var d = !0,
        e = "width" === b ? a.offsetWidth : a.offsetHeight,
        f = Ra(a),
        g = l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, f);
      if (0 >= e || null == e) {
        if (
          ((e = Sa(a, b, f)),
          (0 > e || null == e) && (e = a.style[b]),
          Oa.test(e))
        )
          return e;
        (d = g && (l.boxSizingReliable() || e === a.style[b])),
          (e = parseFloat(e) || 0);
      }
      return e + eb(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    n.extend({
      cssHooks: {
        opacity: {
          get: function (a, b) {
            if (b) {
              var c = Sa(a, "opacity");
              return "" === c ? "1" : c;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: l.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (a, b, c, d) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
          var e,
            f,
            g,
            h = n.camelCase(b),
            i = a.style;
          if (
            ((b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
            (g = n.cssHooks[b] || n.cssHooks[h]),
            void 0 === c)
          )
            return g && "get" in g && void 0 !== (e = g.get(a, !1, d))
              ? e
              : i[b];
          if (
            ((f = typeof c),
            "string" === f &&
              (e = U.exec(c)) &&
              e[1] &&
              ((c = X(a, b, e)), (f = "number")),
            null != c &&
              c === c &&
              ("number" === f &&
                (c += (e && e[3]) || (n.cssNumber[h] ? "" : "px")),
              l.clearCloneStyle ||
                "" !== c ||
                0 !== b.indexOf("background") ||
                (i[b] = "inherit"),
              !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
          )
            try {
              i[b] = c;
            } catch (j) {}
        }
      },
      css: function (a, b, c, d) {
        var e,
          f,
          g,
          h = n.camelCase(b);
        return (
          (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
          (g = n.cssHooks[b] || n.cssHooks[h]),
          g && "get" in g && (f = g.get(a, !0, c)),
          void 0 === f && (f = Sa(a, b, d)),
          "normal" === f && b in $a && (f = $a[b]),
          "" === c || c
            ? ((e = parseFloat(f)), c === !0 || isFinite(e) ? e || 0 : f)
            : f
        );
      },
    }),
      n.each(["height", "width"], function (a, b) {
        n.cssHooks[b] = {
          get: function (a, c, d) {
            return c
              ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth
                ? Pa(a, Za, function () {
                    return fb(a, b, d);
                  })
                : fb(a, b, d)
              : void 0;
          },
          set: function (a, c, d) {
            var e = d && Ra(a);
            return db(
              a,
              c,
              d
                ? eb(
                    a,
                    b,
                    d,
                    l.boxSizing &&
                      "border-box" === n.css(a, "boxSizing", !1, e),
                    e
                  )
                : 0
            );
          },
        };
      }),
      l.opacity ||
        (n.cssHooks.opacity = {
          get: function (a, b) {
            return Wa.test(
              (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) ||
                ""
            )
              ? 0.01 * parseFloat(RegExp.$1) + ""
              : b
              ? "1"
              : "";
          },
          set: function (a, b) {
            var c = a.style,
              d = a.currentStyle,
              e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
              f = (d && d.filter) || c.filter || "";
            (c.zoom = 1),
              ((b >= 1 || "" === b) &&
                "" === n.trim(f.replace(Va, "")) &&
                c.removeAttribute &&
                (c.removeAttribute("filter"), "" === b || (d && !d.filter))) ||
                (c.filter = Va.test(f) ? f.replace(Va, e) : f + " " + e);
          },
        }),
      (n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
        return b
          ? Pa(a, { display: "inline-block" }, Sa, [a, "marginRight"])
          : void 0;
      })),
      (n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
        return b
          ? (parseFloat(Sa(a, "marginLeft")) ||
              (n.contains(a.ownerDocument, a)
                ? a.getBoundingClientRect().left -
                  Pa(
                    a,
                    {
                      marginLeft: 0,
                    },
                    function () {
                      return a.getBoundingClientRect().left;
                    }
                  )
                : 0)) + "px"
          : void 0;
      })),
      n.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
        (n.cssHooks[a + b] = {
          expand: function (c) {
            for (
              var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c];
              4 > d;
              d++
            )
              e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
            return e;
          },
        }),
          Na.test(a) || (n.cssHooks[a + b].set = db);
      }),
      n.fn.extend({
        css: function (a, b) {
          return Y(
            this,
            function (a, b, c) {
              var d,
                e,
                f = {},
                g = 0;
              if (n.isArray(b)) {
                for (d = Ra(a), e = b.length; e > g; g++)
                  f[b[g]] = n.css(a, b[g], !1, d);
                return f;
              }
              return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
            },
            a,
            b,
            arguments.length > 1
          );
        },
        show: function () {
          return cb(this, !0);
        },
        hide: function () {
          return cb(this);
        },
        toggle: function (a) {
          return "boolean" == typeof a
            ? a
              ? this.show()
              : this.hide()
            : this.each(function () {
                W(this) ? n(this).show() : n(this).hide();
              });
        },
      });
    function gb(a, b, c, d, e) {
      return new gb.prototype.init(a, b, c, d, e);
    }
    (n.Tween = gb),
      (gb.prototype = {
        constructor: gb,
        init: function (a, b, c, d, e, f) {
          (this.elem = a),
            (this.prop = c),
            (this.easing = e || n.easing._default),
            (this.options = b),
            (this.start = this.now = this.cur()),
            (this.end = d),
            (this.unit = f || (n.cssNumber[c] ? "" : "px"));
        },
        cur: function () {
          var a = gb.propHooks[this.prop];
          return a && a.get ? a.get(this) : gb.propHooks._default.get(this);
        },
        run: function (a) {
          var b,
            c = gb.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = b =
                  n.easing[this.easing](
                    a,
                    this.options.duration * a,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = b = a),
            (this.now = (this.end - this.start) * b + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : gb.propHooks._default.set(this),
            this
          );
        },
      }),
      (gb.prototype.init.prototype = gb.prototype),
      (gb.propHooks = {
        _default: {
          get: function (a) {
            var b;
            return 1 !== a.elem.nodeType ||
              (null != a.elem[a.prop] && null == a.elem.style[a.prop])
              ? a.elem[a.prop]
              : ((b = n.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0);
          },
          set: function (a) {
            n.fx.step[a.prop]
              ? n.fx.step[a.prop](a)
              : 1 !== a.elem.nodeType ||
                (null == a.elem.style[n.cssProps[a.prop]] &&
                  !n.cssHooks[a.prop])
              ? (a.elem[a.prop] = a.now)
              : n.style(a.elem, a.prop, a.now + a.unit);
          },
        },
      }),
      (gb.propHooks.scrollTop = gb.propHooks.scrollLeft =
        {
          set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
          },
        }),
      (n.easing = {
        linear: function (a) {
          return a;
        },
        swing: function (a) {
          return 0.5 - Math.cos(a * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (n.fx = gb.prototype.init),
      (n.fx.step = {});
    var hb,
      ib,
      jb = /^(?:toggle|show|hide)$/,
      kb = /queueHooks$/;
    function lb() {
      return (
        a.setTimeout(function () {
          hb = void 0;
        }),
        (hb = n.now())
      );
    }
    function mb(a, b) {
      var c,
        d = { height: a },
        e = 0;
      for (b = b ? 1 : 0; 4 > e; e += 2 - b)
        (c = V[e]), (d["margin" + c] = d["padding" + c] = a);
      return b && (d.opacity = d.width = a), d;
    }
    function nb(a, b, c) {
      for (
        var d,
          e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]),
          f = 0,
          g = e.length;
        g > f;
        f++
      )
        if ((d = e[f].call(c, b, a))) return d;
    }
    function ob(a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        m = this,
        o = {},
        p = a.style,
        q = a.nodeType && W(a),
        r = n._data(a, "fxshow");
      c.queue ||
        ((h = n._queueHooks(a, "fx")),
        null == h.unqueued &&
          ((h.unqueued = 0),
          (i = h.empty.fire),
          (h.empty.fire = function () {
            h.unqueued || i();
          })),
        h.unqueued++,
        m.always(function () {
          m.always(function () {
            h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
          });
        })),
        1 === a.nodeType &&
          ("height" in b || "width" in b) &&
          ((c.overflow = [p.overflow, p.overflowX, p.overflowY]),
          (j = n.css(a, "display")),
          (k = "none" === j ? n._data(a, "olddisplay") || Ma(a.nodeName) : j),
          "inline" === k &&
            "none" === n.css(a, "float") &&
            (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName)
              ? (p.zoom = 1)
              : (p.display = "inline-block"))),
        c.overflow &&
          ((p.overflow = "hidden"),
          l.shrinkWrapBlocks() ||
            m.always(function () {
              (p.overflow = c.overflow[0]),
                (p.overflowX = c.overflow[1]),
                (p.overflowY = c.overflow[2]);
            }));
      for (d in b)
        if (((e = b[d]), jb.exec(e))) {
          if (
            (delete b[d],
            (f = f || "toggle" === e),
            e === (q ? "hide" : "show"))
          ) {
            if ("show" !== e || !r || void 0 === r[d]) continue;
            q = !0;
          }
          o[d] = (r && r[d]) || n.style(a, d);
        } else j = void 0;
      if (n.isEmptyObject(o))
        "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j);
      else {
        r ? "hidden" in r && (q = r.hidden) : (r = n._data(a, "fxshow", {})),
          f && (r.hidden = !q),
          q
            ? n(a).show()
            : m.done(function () {
                n(a).hide();
              }),
          m.done(function () {
            var b;
            n._removeData(a, "fxshow");
            for (b in o) n.style(a, b, o[b]);
          });
        for (d in o)
          (g = nb(q ? r[d] : 0, d, m)),
            d in r ||
              ((r[d] = g.start),
              q &&
                ((g.end = g.start),
                (g.start = "width" === d || "height" === d ? 1 : 0)));
      }
    }
    function pb(a, b) {
      var c, d, e, f, g;
      for (c in a)
        if (
          ((d = n.camelCase(c)),
          (e = b[d]),
          (f = a[c]),
          n.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
          c !== d && ((a[d] = f), delete a[c]),
          (g = n.cssHooks[d]),
          g && "expand" in g)
        ) {
          (f = g.expand(f)), delete a[d];
          for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
        } else b[d] = e;
    }
    function qb(a, b, c) {
      var d,
        e,
        f = 0,
        g = qb.prefilters.length,
        h = n.Deferred().always(function () {
          delete i.elem;
        }),
        i = function () {
          if (e) return !1;
          for (
            var b = hb || lb(),
              c = Math.max(0, j.startTime + j.duration - b),
              d = c / j.duration || 0,
              f = 1 - d,
              g = 0,
              i = j.tweens.length;
            i > g;
            g++
          )
            j.tweens[g].run(f);
          return (
            h.notifyWith(a, [j, f, c]),
            1 > f && i ? c : (h.resolveWith(a, [j]), !1)
          );
        },
        j = h.promise({
          elem: a,
          props: n.extend({}, b),
          opts: n.extend(
            !0,
            { specialEasing: {}, easing: n.easing._default },
            c
          ),
          originalProperties: b,
          originalOptions: c,
          startTime: hb || lb(),
          duration: c.duration,
          tweens: [],
          createTween: function (b, c) {
            var d = n.Tween(
              a,
              j.opts,
              b,
              c,
              j.opts.specialEasing[b] || j.opts.easing
            );
            return j.tweens.push(d), d;
          },
          stop: function (b) {
            var c = 0,
              d = b ? j.tweens.length : 0;
            if (e) return this;
            for (e = !0; d > c; c++) j.tweens[c].run(1);
            return (
              b
                ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b]))
                : h.rejectWith(a, [j, b]),
              this
            );
          },
        }),
        k = j.props;
      for (pb(k, j.opts.specialEasing); g > f; f++)
        if ((d = qb.prefilters[f].call(j, a, k, j.opts)))
          return (
            n.isFunction(d.stop) &&
              (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)),
            d
          );
      return (
        n.map(k, nb, j),
        n.isFunction(j.opts.start) && j.opts.start.call(a, j),
        n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
        j
          .progress(j.opts.progress)
          .done(j.opts.done, j.opts.complete)
          .fail(j.opts.fail)
          .always(j.opts.always)
      );
    }
    (n.Animation = n.extend(qb, {
      tweeners: {
        "*": [
          function (a, b) {
            var c = this.createTween(a, b);
            return X(c.elem, a, U.exec(b), c), c;
          },
        ],
      },
      tweener: function (a, b) {
        n.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.match(G));
        for (var c, d = 0, e = a.length; e > d; d++)
          (c = a[d]),
            (qb.tweeners[c] = qb.tweeners[c] || []),
            qb.tweeners[c].unshift(b);
      },
      prefilters: [ob],
      prefilter: function (a, b) {
        b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
      },
    })),
      (n.speed = function (a, b, c) {
        var d =
          a && "object" == typeof a
            ? n.extend({}, a)
            : {
                complete: c || (!c && b) || (n.isFunction(a) && a),
                duration: a,
                easing: (c && b) || (b && !n.isFunction(b) && b),
              };
        return (
          (d.duration = n.fx.off
            ? 0
            : "number" == typeof d.duration
            ? d.duration
            : d.duration in n.fx.speeds
            ? n.fx.speeds[d.duration]
            : n.fx.speeds._default),
          (null != d.queue && d.queue !== !0) || (d.queue = "fx"),
          (d.old = d.complete),
          (d.complete = function () {
            n.isFunction(d.old) && d.old.call(this),
              d.queue && n.dequeue(this, d.queue);
          }),
          d
        );
      }),
      n.fn.extend({
        fadeTo: function (a, b, c, d) {
          return this.filter(W)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: b }, a, c, d);
        },
        animate: function (a, b, c, d) {
          var e = n.isEmptyObject(a),
            f = n.speed(b, c, d),
            g = function () {
              var b = qb(this, n.extend({}, a), f);
              (e || n._data(this, "finish")) && b.stop(!0);
            };
          return (
            (g.finish = g),
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
          );
        },
        stop: function (a, b, c) {
          var d = function (a) {
            var b = a.stop;
            delete a.stop, b(c);
          };
          return (
            "string" != typeof a && ((c = b), (b = a), (a = void 0)),
            b && a !== !1 && this.queue(a || "fx", []),
            this.each(function () {
              var b = !0,
                e = null != a && a + "queueHooks",
                f = n.timers,
                g = n._data(this);
              if (e) g[e] && g[e].stop && d(g[e]);
              else for (e in g) g[e] && g[e].stop && kb.test(e) && d(g[e]);
              for (e = f.length; e--; )
                f[e].elem !== this ||
                  (null != a && f[e].queue !== a) ||
                  (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
              (!b && c) || n.dequeue(this, a);
            })
          );
        },
        finish: function (a) {
          return (
            a !== !1 && (a = a || "fx"),
            this.each(function () {
              var b,
                c = n._data(this),
                d = c[a + "queue"],
                e = c[a + "queueHooks"],
                f = n.timers,
                g = d ? d.length : 0;
              for (
                c.finish = !0,
                  n.queue(this, a, []),
                  e && e.stop && e.stop.call(this, !0),
                  b = f.length;
                b--;

              )
                f[b].elem === this &&
                  f[b].queue === a &&
                  (f[b].anim.stop(!0), f.splice(b, 1));
              for (b = 0; g > b; b++)
                d[b] && d[b].finish && d[b].finish.call(this);
              delete c.finish;
            })
          );
        },
      }),
      n.each(["toggle", "show", "hide"], function (a, b) {
        var c = n.fn[b];
        n.fn[b] = function (a, d, e) {
          return null == a || "boolean" == typeof a
            ? c.apply(this, arguments)
            : this.animate(mb(b, !0), a, d, e);
        };
      }),
      n.each(
        {
          slideDown: mb("show"),
          slideUp: mb("hide"),
          slideToggle: mb("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (a, b) {
          n.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d);
          };
        }
      ),
      (n.timers = []),
      (n.fx.tick = function () {
        var a,
          b = n.timers,
          c = 0;
        for (hb = n.now(); c < b.length; c++)
          (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
        b.length || n.fx.stop(), (hb = void 0);
      }),
      (n.fx.timer = function (a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
      }),
      (n.fx.interval = 13),
      (n.fx.start = function () {
        ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
      }),
      (n.fx.stop = function () {
        a.clearInterval(ib), (ib = null);
      }),
      (n.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (n.fn.delay = function (b, c) {
        return (
          (b = n.fx ? n.fx.speeds[b] || b : b),
          (c = c || "fx"),
          this.queue(c, function (c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function () {
              a.clearTimeout(e);
            };
          })
        );
      }),
      (function () {
        var a,
          b = d.createElement("input"),
          c = d.createElement("div"),
          e = d.createElement("select"),
          f = e.appendChild(d.createElement("option"));
        (c = d.createElement("div")),
          c.setAttribute("className", "t"),
          (c.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (a = c.getElementsByTagName("a")[0]),
          b.setAttribute("type", "checkbox"),
          c.appendChild(b),
          (a = c.getElementsByTagName("a")[0]),
          (a.style.cssText = "top:1px"),
          (l.getSetAttribute = "t" !== c.className),
          (l.style = /top/.test(a.getAttribute("style"))),
          (l.hrefNormalized = "/a" === a.getAttribute("href")),
          (l.checkOn = !!b.value),
          (l.optSelected = f.selected),
          (l.enctype = !!d.createElement("form").enctype),
          (e.disabled = !0),
          (l.optDisabled = !f.disabled),
          (b = d.createElement("input")),
          b.setAttribute("value", ""),
          (l.input = "" === b.getAttribute("value")),
          (b.value = "t"),
          b.setAttribute("type", "radio"),
          (l.radioValue = "t" === b.value);
      })();
    var rb = /\r/g,
      sb = /[\x20\t\r\n\f]+/g;
    n.fn.extend({
      val: function (a) {
        var b,
          c,
          d,
          e = this[0];
        {
          if (arguments.length)
            return (
              (d = n.isFunction(a)),
              this.each(function (c) {
                var e;
                1 === this.nodeType &&
                  ((e = d ? a.call(this, c, n(this).val()) : a),
                  null == e
                    ? (e = "")
                    : "number" == typeof e
                    ? (e += "")
                    : n.isArray(e) &&
                      (e = n.map(e, function (a) {
                        return null == a ? "" : a + "";
                      })),
                  (b =
                    n.valHooks[this.type] ||
                    n.valHooks[this.nodeName.toLowerCase()]),
                  (b && "set" in b && void 0 !== b.set(this, e, "value")) ||
                    (this.value = e));
              })
            );
          if (e)
            return (
              (b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()]),
              b && "get" in b && void 0 !== (c = b.get(e, "value"))
                ? c
                : ((c = e.value),
                  "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c)
            );
        }
      },
    }),
      n.extend({
        valHooks: {
          option: {
            get: function (a) {
              var b = n.find.attr(a, "value");
              return null != b ? b : n.trim(n.text(a)).replace(sb, " ");
            },
          },
          select: {
            get: function (a) {
              for (
                var b,
                  c,
                  d = a.options,
                  e = a.selectedIndex,
                  f = "select-one" === a.type || 0 > e,
                  g = f ? null : [],
                  h = f ? e + 1 : d.length,
                  i = 0 > e ? h : f ? e : 0;
                h > i;
                i++
              )
                if (
                  ((c = d[i]),
                  (c.selected || i === e) &&
                    (l.optDisabled
                      ? !c.disabled
                      : null === c.getAttribute("disabled")) &&
                    (!c.parentNode.disabled ||
                      !n.nodeName(c.parentNode, "optgroup")))
                ) {
                  if (((b = n(c).val()), f)) return b;
                  g.push(b);
                }
              return g;
            },
            set: function (a, b) {
              var c,
                d,
                e = a.options,
                f = n.makeArray(b),
                g = e.length;
              while (g--)
                if (((d = e[g]), n.inArray(n.valHooks.option.get(d), f) > -1))
                  try {
                    d.selected = c = !0;
                  } catch (h) {
                    d.scrollHeight;
                  }
                else d.selected = !1;
              return c || (a.selectedIndex = -1), e;
            },
          },
        },
      }),
      n.each(["radio", "checkbox"], function () {
        (n.valHooks[this] = {
          set: function (a, b) {
            return n.isArray(b)
              ? (a.checked = n.inArray(n(a).val(), b) > -1)
              : void 0;
          },
        }),
          l.checkOn ||
            (n.valHooks[this].get = function (a) {
              return null === a.getAttribute("value") ? "on" : a.value;
            });
      });
    var tb,
      ub,
      vb = n.expr.attrHandle,
      wb = /^(?:checked|selected)$/i,
      xb = l.getSetAttribute,
      yb = l.input;
    n.fn.extend({
      attr: function (a, b) {
        return Y(this, n.attr, a, b, arguments.length > 1);
      },
      removeAttr: function (a) {
        return this.each(function () {
          n.removeAttr(this, a);
        });
      },
    }),
      n.extend({
        attr: function (a, b, c) {
          var d,
            e,
            f = a.nodeType;
          if (3 !== f && 8 !== f && 2 !== f)
            return "undefined" == typeof a.getAttribute
              ? n.prop(a, b, c)
              : ((1 === f && n.isXMLDoc(a)) ||
                  ((b = b.toLowerCase()),
                  (e =
                    n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb))),
                void 0 !== c
                  ? null === c
                    ? void n.removeAttr(a, b)
                    : e && "set" in e && void 0 !== (d = e.set(a, c, b))
                    ? d
                    : (a.setAttribute(b, c + ""), c)
                  : e && "get" in e && null !== (d = e.get(a, b))
                  ? d
                  : ((d = n.find.attr(a, b)), null == d ? void 0 : d));
        },
        attrHooks: {
          type: {
            set: function (a, b) {
              if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                var c = a.value;
                return a.setAttribute("type", b), c && (a.value = c), b;
              }
            },
          },
        },
        removeAttr: function (a, b) {
          var c,
            d,
            e = 0,
            f = b && b.match(G);
          if (f && 1 === a.nodeType)
            while ((c = f[e++]))
              (d = n.propFix[c] || c),
                n.expr.match.bool.test(c)
                  ? (yb && xb) || !wb.test(c)
                    ? (a[d] = !1)
                    : (a[n.camelCase("default-" + c)] = a[d] = !1)
                  : n.attr(a, c, ""),
                a.removeAttribute(xb ? c : d);
        },
      }),
      (ub = {
        set: function (a, b, c) {
          return (
            b === !1
              ? n.removeAttr(a, c)
              : (yb && xb) || !wb.test(c)
              ? a.setAttribute((!xb && n.propFix[c]) || c, c)
              : (a[n.camelCase("default-" + c)] = a[c] = !0),
            c
          );
        },
      }),
      n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = vb[b] || n.find.attr;
        (yb && xb) || !wb.test(b)
          ? (vb[b] = function (a, b, d) {
              var e, f;
              return (
                d ||
                  ((f = vb[b]),
                  (vb[b] = e),
                  (e = null != c(a, b, d) ? b.toLowerCase() : null),
                  (vb[b] = f)),
                e
              );
            })
          : (vb[b] = function (a, b, c) {
              return c
                ? void 0
                : a[n.camelCase("default-" + b)]
                ? b.toLowerCase()
                : null;
            });
      }),
      (yb && xb) ||
        (n.attrHooks.value = {
          set: function (a, b, c) {
            return n.nodeName(a, "input")
              ? void (a.defaultValue = b)
              : tb && tb.set(a, b, c);
          },
        }),
      xb ||
        ((tb = {
          set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return (
              d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))),
              (d.value = b += ""),
              "value" === c || b === a.getAttribute(c) ? b : void 0
            );
          },
        }),
        (vb.id =
          vb.name =
          vb.coords =
            function (a, b, c) {
              var d;
              return c
                ? void 0
                : (d = a.getAttributeNode(b)) && "" !== d.value
                ? d.value
                : null;
            }),
        (n.valHooks.button = {
          get: function (a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0;
          },
          set: tb.set,
        }),
        (n.attrHooks.contenteditable = {
          set: function (a, b, c) {
            tb.set(a, "" === b ? !1 : b, c);
          },
        }),
        n.each(["width", "height"], function (a, b) {
          n.attrHooks[b] = {
            set: function (a, c) {
              return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
            },
          };
        })),
      l.style ||
        (n.attrHooks.style = {
          get: function (a) {
            return a.style.cssText || void 0;
          },
          set: function (a, b) {
            return (a.style.cssText = b + "");
          },
        });
    var zb = /^(?:input|select|textarea|button|object)$/i,
      Ab = /^(?:a|area)$/i;
    n.fn.extend({
      prop: function (a, b) {
        return Y(this, n.prop, a, b, arguments.length > 1);
      },
      removeProp: function (a) {
        return (
          (a = n.propFix[a] || a),
          this.each(function () {
            try {
              (this[a] = void 0), delete this[a];
            } catch (b) {}
          })
        );
      },
    }),
      n.extend({
        prop: function (a, b, c) {
          var d,
            e,
            f = a.nodeType;
          if (3 !== f && 8 !== f && 2 !== f)
            return (
              (1 === f && n.isXMLDoc(a)) ||
                ((b = n.propFix[b] || b), (e = n.propHooks[b])),
              void 0 !== c
                ? e && "set" in e && void 0 !== (d = e.set(a, c, b))
                  ? d
                  : (a[b] = c)
                : e && "get" in e && null !== (d = e.get(a, b))
                ? d
                : a[b]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (a) {
              var b = n.find.attr(a, "tabindex");
              return b
                ? parseInt(b, 10)
                : zb.test(a.nodeName) || (Ab.test(a.nodeName) && a.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      l.hrefNormalized ||
        n.each(["href", "src"], function (a, b) {
          n.propHooks[b] = {
            get: function (a) {
              return a.getAttribute(b, 4);
            },
          };
        }),
      l.optSelected ||
        (n.propHooks.selected = {
          get: function (a) {
            var b = a.parentNode;
            return (
              b &&
                (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
              null
            );
          },
          set: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
          },
        }),
      n.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          n.propFix[this.toLowerCase()] = this;
        }
      ),
      l.enctype || (n.propFix.enctype = "encoding");
    var Bb = /[\t\r\n\f]/g;
    function Cb(a) {
      return n.attr(a, "class") || "";
    }
    n.fn.extend({
      addClass: function (a) {
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;
        if (n.isFunction(a))
          return this.each(function (b) {
            n(this).addClass(a.call(this, b, Cb(this)));
          });
        if ("string" == typeof a && a) {
          b = a.match(G) || [];
          while ((c = this[i++]))
            if (
              ((e = Cb(c)),
              (d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")))
            ) {
              g = 0;
              while ((f = b[g++]))
                d.indexOf(" " + f + " ") < 0 && (d += f + " ");
              (h = n.trim(d)), e !== h && n.attr(c, "class", h);
            }
        }
        return this;
      },
      removeClass: function (a) {
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;
        if (n.isFunction(a))
          return this.each(function (b) {
            n(this).removeClass(a.call(this, b, Cb(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ("string" == typeof a && a) {
          b = a.match(G) || [];
          while ((c = this[i++]))
            if (
              ((e = Cb(c)),
              (d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")))
            ) {
              g = 0;
              while ((f = b[g++]))
                while (d.indexOf(" " + f + " ") > -1)
                  d = d.replace(" " + f + " ", " ");
              (h = n.trim(d)), e !== h && n.attr(c, "class", h);
            }
        }
        return this;
      },
      toggleClass: function (a, b) {
        var c = typeof a;
        return "boolean" == typeof b && "string" === c
          ? b
            ? this.addClass(a)
            : this.removeClass(a)
          : n.isFunction(a)
          ? this.each(function (c) {
              n(this).toggleClass(a.call(this, c, Cb(this), b), b);
            })
          : this.each(function () {
              var b, d, e, f;
              if ("string" === c) {
                (d = 0), (e = n(this)), (f = a.match(G) || []);
                while ((b = f[d++]))
                  e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
              } else (void 0 !== a && "boolean" !== c) || ((b = Cb(this)), b && n._data(this, "__className__", b), n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""));
            });
      },
      hasClass: function (a) {
        var b,
          c,
          d = 0;
        b = " " + a + " ";
        while ((c = this[d++]))
          if (
            1 === c.nodeType &&
            (" " + Cb(c) + " ").replace(Bb, " ").indexOf(b) > -1
          )
            return !0;
        return !1;
      },
    }),
      n.each(
        "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
          " "
        ),
        function (a, b) {
          n.fn[b] = function (a, c) {
            return arguments.length > 0
              ? this.on(b, null, a, c)
              : this.trigger(b);
          };
        }
      ),
      n.fn.extend({
        hover: function (a, b) {
          return this.mouseenter(a).mouseleave(b || a);
        },
      });
    var Db = a.location,
      Eb = n.now(),
      Fb = /\?/,
      Gb =
        /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (n.parseJSON = function (b) {
      if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
      var c,
        d = null,
        e = n.trim(b + "");
      return e &&
        !n.trim(
          e.replace(Gb, function (a, b, e, f) {
            return (
              c && b && (d = 0),
              0 === d ? a : ((c = e || b), (d += !f - !e), "")
            );
          })
        )
        ? Function("return " + e)()
        : n.error("Invalid JSON: " + b);
    }),
      (n.parseXML = function (b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
          a.DOMParser
            ? ((d = new a.DOMParser()), (c = d.parseFromString(b, "text/xml")))
            : ((c = new a.ActiveXObject("Microsoft.XMLDOM")),
              (c.async = "false"),
              c.loadXML(b));
        } catch (e) {
          c = void 0;
        }
        return (
          (c &&
            c.documentElement &&
            !c.getElementsByTagName("parsererror").length) ||
            n.error("Invalid XML: " + b),
          c
        );
      });
    var Hb = /#.*$/,
      Ib = /([?&])_=[^&]*/,
      Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Lb = /^(?:GET|HEAD)$/,
      Mb = /^\/\//,
      Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      Ob = {},
      Pb = {},
      Qb = "*/".concat("*"),
      Rb = Db.href,
      Sb = Nb.exec(Rb.toLowerCase()) || [];
    function Tb(a) {
      return function (b, c) {
        "string" != typeof b && ((c = b), (b = "*"));
        var d,
          e = 0,
          f = b.toLowerCase().match(G) || [];
        if (n.isFunction(c))
          while ((d = f[e++]))
            "+" === d.charAt(0)
              ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c))
              : (a[d] = a[d] || []).push(c);
      };
    }
    function Ub(a, b, c, d) {
      var e = {},
        f = a === Pb;
      function g(h) {
        var i;
        return (
          (e[h] = !0),
          n.each(a[h] || [], function (a, h) {
            var j = h(b, c, d);
            return "string" != typeof j || f || e[j]
              ? f
                ? !(i = j)
                : void 0
              : (b.dataTypes.unshift(j), g(j), !1);
          }),
          i
        );
      }
      return g(b.dataTypes[0]) || (!e["*"] && g("*"));
    }
    function Vb(a, b) {
      var c,
        d,
        e = n.ajaxSettings.flatOptions || {};
      for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
      return c && n.extend(!0, a, c), a;
    }
    function Wb(a, b, c) {
      var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;
      while ("*" === i[0])
        i.shift(),
          void 0 === e &&
            (e = a.mimeType || b.getResponseHeader("Content-Type"));
      if (e)
        for (g in h)
          if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break;
          }
      if (i[0] in c) f = i[0];
      else {
        for (g in c) {
          if (!i[0] || a.converters[g + " " + i[0]]) {
            f = g;
            break;
          }
          d || (d = g);
        }
        f = f || d;
      }
      return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function Xb(a, b, c, d) {
      var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();
      if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
      f = k.shift();
      while (f)
        if (
          (a.responseFields[f] && (c[a.responseFields[f]] = b),
          !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
          (i = f),
          (f = k.shift()))
        )
          if ("*" === f) f = i;
          else if ("*" !== i && i !== f) {
            if (((g = j[i + " " + f] || j["* " + f]), !g))
              for (e in j)
                if (
                  ((h = e.split(" ")),
                  h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))
                ) {
                  g === !0
                    ? (g = j[e])
                    : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                  break;
                }
            if (g !== !0)
              if (g && a["throws"]) b = g(b);
              else
                try {
                  b = g(b);
                } catch (l) {
                  return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f,
                  };
                }
          }
      return { state: "success", data: b };
    }
    n.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Rb,
        type: "GET",
        isLocal: Kb.test(Sb[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Qb,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": n.parseJSON,
          "text xml": n.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (a, b) {
        return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a);
      },
      ajaxPrefilter: Tb(Ob),
      ajaxTransport: Tb(Pb),
      ajax: function (b, c) {
        "object" == typeof b && ((c = b), (b = void 0)), (c = c || {});
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = n.ajaxSetup({}, c),
          m = l.context || l,
          o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event,
          p = n.Deferred(),
          q = n.Callbacks("once memory"),
          r = l.statusCode || {},
          s = {},
          t = {},
          u = 0,
          v = "canceled",
          w = {
            readyState: 0,
            getResponseHeader: function (a) {
              var b;
              if (2 === u) {
                if (!k) {
                  k = {};
                  while ((b = Jb.exec(g))) k[b[1].toLowerCase()] = b[2];
                }
                b = k[a.toLowerCase()];
              }
              return null == b ? null : b;
            },
            getAllResponseHeaders: function () {
              return 2 === u ? g : null;
            },
            setRequestHeader: function (a, b) {
              var c = a.toLowerCase();
              return u || ((a = t[c] = t[c] || a), (s[a] = b)), this;
            },
            overrideMimeType: function (a) {
              return u || (l.mimeType = a), this;
            },
            statusCode: function (a) {
              var b;
              if (a)
                if (2 > u) for (b in a) r[b] = [r[b], a[b]];
                else w.always(a[w.status]);
              return this;
            },
            abort: function (a) {
              var b = a || v;
              return j && j.abort(b), y(0, b), this;
            },
          };
        if (
          ((p.promise(w).complete = q.add),
          (w.success = w.done),
          (w.error = w.fail),
          (l.url = ((b || l.url || Rb) + "")
            .replace(Hb, "")
            .replace(Mb, Sb[1] + "//")),
          (l.type = c.method || c.type || l.method || l.type),
          (l.dataTypes = n
            .trim(l.dataType || "*")
            .toLowerCase()
            .match(G) || [""]),
          null == l.crossDomain &&
            ((d = Nb.exec(l.url.toLowerCase())),
            (l.crossDomain = !(
              !d ||
              (d[1] === Sb[1] &&
                d[2] === Sb[2] &&
                (d[3] || ("http:" === d[1] ? "80" : "443")) ===
                  (Sb[3] || ("http:" === Sb[1] ? "80" : "443")))
            ))),
          l.data &&
            l.processData &&
            "string" != typeof l.data &&
            (l.data = n.param(l.data, l.traditional)),
          Ub(Ob, l, c, w),
          2 === u)
        )
          return w;
        (i = n.event && l.global),
          i && 0 === n.active++ && n.event.trigger("ajaxStart"),
          (l.type = l.type.toUpperCase()),
          (l.hasContent = !Lb.test(l.type)),
          (f = l.url),
          l.hasContent ||
            (l.data &&
              ((f = l.url += (Fb.test(f) ? "&" : "?") + l.data), delete l.data),
            l.cache === !1 &&
              (l.url = Ib.test(f)
                ? f.replace(Ib, "$1_=" + Eb++)
                : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)),
          l.ifModified &&
            (n.lastModified[f] &&
              w.setRequestHeader("If-Modified-Since", n.lastModified[f]),
            n.etag[f] && w.setRequestHeader("If-None-Match", n.etag[f])),
          ((l.data && l.hasContent && l.contentType !== !1) || c.contentType) &&
            w.setRequestHeader("Content-Type", l.contentType),
          w.setRequestHeader(
            "Accept",
            l.dataTypes[0] && l.accepts[l.dataTypes[0]]
              ? l.accepts[l.dataTypes[0]] +
                  ("*" !== l.dataTypes[0] ? ", " + Qb + "; q=0.01" : "")
              : l.accepts["*"]
          );
        for (e in l.headers) w.setRequestHeader(e, l.headers[e]);
        if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u))
          return w.abort();
        v = "abort";
        for (e in { success: 1, error: 1, complete: 1 }) w[e](l[e]);
        if ((j = Ub(Pb, l, c, w))) {
          if (((w.readyState = 1), i && o.trigger("ajaxSend", [w, l]), 2 === u))
            return w;
          l.async &&
            l.timeout > 0 &&
            (h = a.setTimeout(function () {
              w.abort("timeout");
            }, l.timeout));
          try {
            (u = 1), j.send(s, y);
          } catch (x) {
            if (!(2 > u)) throw x;
            y(-1, x);
          }
        } else y(-1, "No Transport");
        function y(b, c, d, e) {
          var k,
            s,
            t,
            v,
            x,
            y = c;
          2 !== u &&
            ((u = 2),
            h && a.clearTimeout(h),
            (j = void 0),
            (g = e || ""),
            (w.readyState = b > 0 ? 4 : 0),
            (k = (b >= 200 && 300 > b) || 304 === b),
            d && (v = Wb(l, w, d)),
            (v = Xb(l, v, w, k)),
            k
              ? (l.ifModified &&
                  ((x = w.getResponseHeader("Last-Modified")),
                  x && (n.lastModified[f] = x),
                  (x = w.getResponseHeader("etag")),
                  x && (n.etag[f] = x)),
                204 === b || "HEAD" === l.type
                  ? (y = "nocontent")
                  : 304 === b
                  ? (y = "notmodified")
                  : ((y = v.state), (s = v.data), (t = v.error), (k = !t)))
              : ((t = y), (!b && y) || ((y = "error"), 0 > b && (b = 0))),
            (w.status = b),
            (w.statusText = (c || y) + ""),
            k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]),
            w.statusCode(r),
            (r = void 0),
            i && o.trigger(k ? "ajaxSuccess" : "ajaxError", [w, l, k ? s : t]),
            q.fireWith(m, [w, y]),
            i &&
              (o.trigger("ajaxComplete", [w, l]),
              --n.active || n.event.trigger("ajaxStop")));
        }
        return w;
      },
      getJSON: function (a, b, c) {
        return n.get(a, b, c, "json");
      },
      getScript: function (a, b) {
        return n.get(a, void 0, b, "script");
      },
    }),
      n.each(["get", "post"], function (a, b) {
        n[b] = function (a, c, d, e) {
          return (
            n.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
            n.ajax(
              n.extend(
                { url: a, type: b, dataType: e, data: c, success: d },
                n.isPlainObject(a) && a
              )
            )
          );
        };
      }),
      (n._evalUrl = function (a) {
        return n.ajax({
          url: a,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      n.fn.extend({
        wrapAll: function (a) {
          if (n.isFunction(a))
            return this.each(function (b) {
              n(this).wrapAll(a.call(this, b));
            });
          if (this[0]) {
            var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]),
              b
                .map(function () {
                  var a = this;
                  while (a.firstChild && 1 === a.firstChild.nodeType)
                    a = a.firstChild;
                  return a;
                })
                .append(this);
          }
          return this;
        },
        wrapInner: function (a) {
          return n.isFunction(a)
            ? this.each(function (b) {
                n(this).wrapInner(a.call(this, b));
              })
            : this.each(function () {
                var b = n(this),
                  c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
              });
        },
        wrap: function (a) {
          var b = n.isFunction(a);
          return this.each(function (c) {
            n(this).wrapAll(b ? a.call(this, c) : a);
          });
        },
        unwrap: function () {
          return this.parent()
            .each(function () {
              n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
            })
            .end();
        },
      });
    function Yb(a) {
      return (a.style && a.style.display) || n.css(a, "display");
    }
    function Zb(a) {
      if (!n.contains(a.ownerDocument || d, a)) return !0;
      while (a && 1 === a.nodeType) {
        if ("none" === Yb(a) || "hidden" === a.type) return !0;
        a = a.parentNode;
      }
      return !1;
    }
    (n.expr.filters.hidden = function (a) {
      return l.reliableHiddenOffsets()
        ? a.offsetWidth <= 0 &&
            a.offsetHeight <= 0 &&
            !a.getClientRects().length
        : Zb(a);
    }),
      (n.expr.filters.visible = function (a) {
        return !n.expr.filters.hidden(a);
      });
    var $b = /%20/g,
      _b = /\[\]$/,
      ac = /\r?\n/g,
      bc = /^(?:submit|button|image|reset|file)$/i,
      cc = /^(?:input|select|textarea|keygen)/i;
    function dc(a, b, c, d) {
      var e;
      if (n.isArray(b))
        n.each(b, function (b, e) {
          c || _b.test(a)
            ? d(a, e)
            : dc(
                a + "[" + ("object" == typeof e && null != e ? b : "") + "]",
                e,
                c,
                d
              );
        });
      else if (c || "object" !== n.type(b)) d(a, b);
      else for (e in b) dc(a + "[" + e + "]", b[e], c, d);
    }
    (n.param = function (a, b) {
      var c,
        d = [],
        e = function (a, b) {
          (b = n.isFunction(b) ? b() : null == b ? "" : b),
            (d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b));
        };
      if (
        (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
        n.isArray(a) || (a.jquery && !n.isPlainObject(a)))
      )
        n.each(a, function () {
          e(this.name, this.value);
        });
      else for (c in a) dc(c, a[c], b, e);
      return d.join("&").replace($b, "+");
    }),
      n.fn.extend({
        serialize: function () {
          return n.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var a = n.prop(this, "elements");
            return a ? n.makeArray(a) : this;
          })
            .filter(function () {
              var a = this.type;
              return (
                this.name &&
                !n(this).is(":disabled") &&
                cc.test(this.nodeName) &&
                !bc.test(a) &&
                (this.checked || !Z.test(a))
              );
            })
            .map(function (a, b) {
              var c = n(this).val();
              return null == c
                ? null
                : n.isArray(c)
                ? n.map(c, function (a) {
                    return { name: b.name, value: a.replace(ac, "\r\n") };
                  })
                : { name: b.name, value: c.replace(ac, "\r\n") };
            })
            .get();
        },
      }),
      (n.ajaxSettings.xhr =
        void 0 !== a.ActiveXObject
          ? function () {
              return this.isLocal
                ? ic()
                : d.documentMode > 8
                ? hc()
                : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                    hc()) ||
                  ic();
            }
          : hc);
    var ec = 0,
      fc = {},
      gc = n.ajaxSettings.xhr();
    a.attachEvent &&
      a.attachEvent("onunload", function () {
        for (var a in fc) fc[a](void 0, !0);
      }),
      (l.cors = !!gc && "withCredentials" in gc),
      (gc = l.ajax = !!gc),
      gc &&
        n.ajaxTransport(function (b) {
          if (!b.crossDomain || l.cors) {
            var c;
            return {
              send: function (d, e) {
                var f,
                  g = b.xhr(),
                  h = ++ec;
                if (
                  (g.open(b.type, b.url, b.async, b.username, b.password),
                  b.xhrFields)
                )
                  for (f in b.xhrFields) g[f] = b.xhrFields[f];
                b.mimeType &&
                  g.overrideMimeType &&
                  g.overrideMimeType(b.mimeType),
                  b.crossDomain ||
                    d["X-Requested-With"] ||
                    (d["X-Requested-With"] = "XMLHttpRequest");
                for (f in d)
                  void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
                // g.send((b.hasContent && b.data) || null),
                  (c = function (a, d) {
                    var f, i, j;
                    if (c && (d || 4 === g.readyState))
                      if (
                        (delete fc[h],
                        (c = void 0),
                        (g.onreadystatechange = n.noop),
                        d)
                      )
                        4 !== g.readyState && g.abort();
                      else {
                        (j = {}),
                          (f = g.status),
                          "string" == typeof g.responseText &&
                            (j.text = g.responseText);
                        try {
                          i = g.statusText;
                        } catch (k) {
                          i = "";
                        }
                        f || !b.isLocal || b.crossDomain
                          ? 1223 === f && (f = 204)
                          : (f = j.text ? 200 : 404);
                      }
                    j && e(f, i, j, g.getAllResponseHeaders());
                  }),
                  b.async
                    ? 4 === g.readyState
                      ? a.setTimeout(c)
                      : (g.onreadystatechange = fc[h] = c)
                    : c();
              },
              abort: function () {
                c && c(void 0, !0);
              },
            };
          }
        });
    function hc() {
      try {
        return new a.XMLHttpRequest();
      } catch (b) {}
    }
    function ic() {
      try {
        return new a.ActiveXObject("Microsoft.XMLHTTP");
      } catch (b) {}
    }
    n.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (a) {
          return n.globalEval(a), a;
        },
      },
    }),
      n.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1),
          a.crossDomain && ((a.type = "GET"), (a.global = !1));
      }),
      n.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
          var b,
            c = d.head || n("head")[0] || d.documentElement;
          return {
            send: function (e, f) {
              (b = d.createElement("script")),
                (b.async = !0),
                a.scriptCharset && (b.charset = a.scriptCharset),
                (b.src = a.url),
                (b.onload = b.onreadystatechange =
                  function (a, c) {
                    (c ||
                      !b.readyState ||
                      /loaded|complete/.test(b.readyState)) &&
                      ((b.onload = b.onreadystatechange = null),
                      b.parentNode && b.parentNode.removeChild(b),
                      (b = null),
                      c || f(200, "success"));
                  }),
                c.insertBefore(b, c.firstChild);
            },
            abort: function () {
              b && b.onload(void 0, !0);
            },
          };
        }
      });
    var jc = [],
      kc = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var a = jc.pop() || n.expando + "_" + Eb++;
        return (this[a] = !0), a;
      },
    }),
      n.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e,
          f,
          g,
          h =
            b.jsonp !== !1 &&
            (kc.test(b.url)
              ? "url"
              : "string" == typeof b.data &&
                0 ===
                  (b.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                kc.test(b.data) &&
                "data");
        return h || "jsonp" === b.dataTypes[0]
          ? ((e = b.jsonpCallback =
              n.isFunction(b.jsonpCallback)
                ? b.jsonpCallback()
                : b.jsonpCallback),
            h
              ? (b[h] = b[h].replace(kc, "$1" + e))
              : b.jsonp !== !1 &&
                (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
            (b.converters["script json"] = function () {
              return g || n.error(e + " was not called"), g[0];
            }),
            (b.dataTypes[0] = "json"),
            (f = a[e]),
            (a[e] = function () {
              g = arguments;
            }),
            d.always(function () {
              void 0 === f ? n(a).removeProp(e) : (a[e] = f),
                b[e] && ((b.jsonpCallback = c.jsonpCallback), jc.push(e)),
                g && n.isFunction(f) && f(g[0]),
                (g = f = void 0);
            }),
            "script")
          : void 0;
      }),
      (n.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && ((c = b), (b = !1)), (b = b || d);
        var e = x.exec(a),
          f = !c && [];
        return e
          ? [b.createElement(e[1])]
          : ((e = ja([a], b, f)),
            f && f.length && n(f).remove(),
            n.merge([], e.childNodes));
      });
    var lc = n.fn.load;
    (n.fn.load = function (a, b, c) {
      if ("string" != typeof a && lc) return lc.apply(this, arguments);
      var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");
      return (
        h > -1 && ((d = n.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
        n.isFunction(b)
          ? ((c = b), (b = void 0))
          : b && "object" == typeof b && (e = "POST"),
        g.length > 0 &&
          n
            .ajax({ url: a, type: e || "GET", dataType: "html", data: b })
            .done(function (a) {
              (f = arguments),
                g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
            })
            .always(
              c &&
                function (a, b) {
                  g.each(function () {
                    c.apply(this, f || [a.responseText, b, a]);
                  });
                }
            ),
        this
      );
    }),
      n.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (a, b) {
          n.fn[b] = function (a) {
            return this.on(b, a);
          };
        }
      ),
      (n.expr.filters.animated = function (a) {
        return n.grep(n.timers, function (b) {
          return a === b.elem;
        }).length;
      });
    function mc(a) {
      return n.isWindow(a)
        ? a
        : 9 === a.nodeType
        ? a.defaultView || a.parentWindow
        : !1;
    }
    (n.offset = {
      setOffset: function (a, b, c) {
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = n.css(a, "position"),
          l = n(a),
          m = {};
        "static" === k && (a.style.position = "relative"),
          (h = l.offset()),
          (f = n.css(a, "top")),
          (i = n.css(a, "left")),
          (j =
            ("absolute" === k || "fixed" === k) &&
            n.inArray("auto", [f, i]) > -1),
          j
            ? ((d = l.position()), (g = d.top), (e = d.left))
            : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
          n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))),
          null != b.top && (m.top = b.top - h.top + g),
          null != b.left && (m.left = b.left - h.left + e),
          "using" in b ? b.using.call(a, m) : l.css(m);
      },
    }),
      n.fn.extend({
        offset: function (a) {
          if (arguments.length)
            return void 0 === a
              ? this
              : this.each(function (b) {
                  n.offset.setOffset(this, a, b);
                });
          var b,
            c,
            d = { top: 0, left: 0 },
            e = this[0],
            f = e && e.ownerDocument;
          if (f)
            return (
              (b = f.documentElement),
              n.contains(b, e)
                ? ("undefined" != typeof e.getBoundingClientRect &&
                    (d = e.getBoundingClientRect()),
                  (c = mc(f)),
                  {
                    top:
                      d.top +
                      (c.pageYOffset || b.scrollTop) -
                      (b.clientTop || 0),
                    left:
                      d.left +
                      (c.pageXOffset || b.scrollLeft) -
                      (b.clientLeft || 0),
                  })
                : d
            );
        },
        position: function () {
          if (this[0]) {
            var a,
              b,
              c = { top: 0, left: 0 },
              d = this[0];
            return (
              "fixed" === n.css(d, "position")
                ? (b = d.getBoundingClientRect())
                : ((a = this.offsetParent()),
                  (b = this.offset()),
                  n.nodeName(a[0], "html") || (c = a.offset()),
                  (c.top += n.css(a[0], "borderTopWidth", !0)),
                  (c.left += n.css(a[0], "borderLeftWidth", !0))),
              {
                top: b.top - c.top - n.css(d, "marginTop", !0),
                left: b.left - c.left - n.css(d, "marginLeft", !0),
              }
            );
          }
        },
        offsetParent: function () {
          return this.map(function () {
            var a = this.offsetParent;
            while (
              a &&
              !n.nodeName(a, "html") &&
              "static" === n.css(a, "position")
            )
              a = a.offsetParent;
            return a || Qa;
          });
        },
      }),
      n.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (a, b) {
          var c = /Y/.test(b);
          n.fn[a] = function (d) {
            return Y(
              this,
              function (a, d, e) {
                var f = mc(a);
                return void 0 === e
                  ? f
                    ? b in f
                      ? f[b]
                      : f.document.documentElement[d]
                    : a[d]
                  : void (f
                      ? f.scrollTo(
                          c ? n(f).scrollLeft() : e,
                          c ? e : n(f).scrollTop()
                        )
                      : (a[d] = e));
              },
              a,
              d,
              arguments.length,
              null
            );
          };
        }
      ),
      n.each(["top", "left"], function (a, b) {
        n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
          return c
            ? ((c = Sa(a, b)), Oa.test(c) ? n(a).position()[b] + "px" : c)
            : void 0;
        });
      }),
      n.each({ Height: "height", Width: "width" }, function (a, b) {
        n.each(
          {
            padding: "inner" + a,
            content: b,
            "": "outer" + a,
          },
          function (c, d) {
            n.fn[d] = function (d, e) {
              var f = arguments.length && (c || "boolean" != typeof d),
                g = c || (d === !0 || e === !0 ? "margin" : "border");
              return Y(
                this,
                function (b, c, d) {
                  var e;
                  return n.isWindow(b)
                    ? b.document.documentElement["client" + a]
                    : 9 === b.nodeType
                    ? ((e = b.documentElement),
                      Math.max(
                        b.body["scroll" + a],
                        e["scroll" + a],
                        b.body["offset" + a],
                        e["offset" + a],
                        e["client" + a]
                      ))
                    : void 0 === d
                    ? n.css(b, c, g)
                    : n.style(b, c, d, g);
                },
                b,
                f ? d : void 0,
                f,
                null
              );
            };
          }
        );
      }),
      n.fn.extend({
        bind: function (a, b, c) {
          return this.on(a, null, b, c);
        },
        unbind: function (a, b) {
          return this.off(a, null, b);
        },
        delegate: function (a, b, c, d) {
          return this.on(b, a, c, d);
        },
        undelegate: function (a, b, c) {
          return 1 === arguments.length
            ? this.off(a, "**")
            : this.off(b, a || "**", c);
        },
      }),
      (n.fn.size = function () {
        return this.length;
      }),
      (n.fn.andSelf = n.fn.addBack),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return n;
        });
    var nc = a.jQuery,
      oc = a.$;
    return (
      (n.noConflict = function (b) {
        return (
          a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n
        );
      }),
      b || (a.jQuery = a.$ = n),
      n
    );
  });
  // Allow passive touch
  (jQuery.event.special.touchstart = {
    setup: function (e, t, s) {
      this.addEventListener("touchstart", s, {
        passive: !t.includes("noPreventDefault"),
      });
    },
  }),
    (jQuery.event.special.touchmove = {
      setup: function (e, t, s) {
        this.addEventListener("touchmove", s, {
          passive: !t.includes("noPreventDefault"),
        });
      },
    }),
    (jQuery.event.special.wheel = {
      setup: function (e, t, s) {
        this.addEventListener("wheel", s, { passive: !0 });
      },
    }),
    (jQuery.event.special.mousewheel = {
      setup: function (e, t, s) {
        this.addEventListener("mousewheel", s, { passive: !0 });
      },
    });
}

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject = (function () {
  var D = "undefined",
    r = "object",
    S = "Shockwave Flash",
    W = "ShockwaveFlash.ShockwaveFlash",
    q = "application/x-shockwave-flash",
    R = "SWFObjectExprInst",
    x = "onreadystatechange",
    O = window,
    j = document,
    t = navigator,
    T = false,
    U = [h],
    o = [],
    N = [],
    I = [],
    l,
    Q,
    E,
    B,
    J = false,
    a = false,
    n,
    G,
    m = true,
    M = (function () {
      var aa =
          typeof j.getElementById != D &&
          typeof j.getElementsByTagName != D &&
          typeof j.createElement != D,
        ah = t.userAgent.toLowerCase(),
        Y = t.platform.toLowerCase(),
        ae = Y ? /win/.test(Y) : /win/.test(ah),
        ac = Y ? /mac/.test(Y) : /mac/.test(ah),
        af = /webkit/.test(ah)
          ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1"))
          : false,
        X = !+"\v1",
        ag = [0, 0, 0],
        ab = null;
      if (typeof t.plugins != D && typeof t.plugins[S] == r) {
        ab = t.plugins[S].description;
        if (
          ab &&
          !(
            typeof t.mimeTypes != D &&
            t.mimeTypes[q] &&
            !t.mimeTypes[q].enabledPlugin
          )
        ) {
          T = true;
          X = false;
          ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
          ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
          ag[2] = /[a-zA-Z]/.test(ab)
            ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10)
            : 0;
        }
      } else {
        if (typeof O.ActiveXObject != D) {
          try {
            var ad = new ActiveXObject(W);
            if (ad) {
              ab = ad.GetVariable("$version");
              if (ab) {
                X = true;
                ab = ab.split(" ")[1].split(",");
                ag = [
                  parseInt(ab[0], 10),
                  parseInt(ab[1], 10),
                  parseInt(ab[2], 10),
                ];
              }
            }
          } catch (Z) {}
        }
      }
      return { w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac };
    })(),
    k = (function () {
      if (!M.w3) {
        return;
      }
      if (
        (typeof j.readyState != D && j.readyState == "complete") ||
        (typeof j.readyState == D &&
          (j.getElementsByTagName("body")[0] || j.body))
      ) {
        f();
      }
      if (!J) {
        if (typeof j.addEventListener != D) {
          j.addEventListener("DOMContentLoaded", f, false);
        }
        if (M.ie && M.win) {
          j.attachEvent(x, function () {
            if (j.readyState == "complete") {
              j.detachEvent(x, arguments.callee);
              f();
            }
          });
          if (O == top) {
            (function () {
              if (J) {
                return;
              }
              try {
                j.documentElement.doScroll("left");
              } catch (X) {
                setTimeout(arguments.callee, 0);
                return;
              }
              f();
            })();
          }
        }
        if (M.wk) {
          (function () {
            if (J) {
              return;
            }
            if (!/loaded|complete/.test(j.readyState)) {
              setTimeout(arguments.callee, 0);
              return;
            }
            f();
          })();
        }
        s(f);
      }
    })();
  function f() {
    if (J) {
      return;
    }
    try {
      var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
      Z.parentNode.removeChild(Z);
    } catch (aa) {
      return;
    }
    J = true;
    var X = U.length;
    for (var Y = 0; Y < X; Y++) {
      U[Y]();
    }
  }
  function K(X) {
    if (J) {
      X();
    } else {
      U[U.length] = X;
    }
  }
  function s(Y) {
    if (typeof O.addEventListener != D) {
      O.addEventListener("load", Y, false);
    } else {
      if (typeof j.addEventListener != D) {
        j.addEventListener("load", Y, false);
      } else {
        if (typeof O.attachEvent != D) {
          i(O, "onload", Y);
        } else {
          if (typeof O.onload == "function") {
            var X = O.onload;
            O.onload = function () {
              X();
              Y();
            };
          } else {
            O.onload = Y;
          }
        }
      }
    }
  }
  function h() {
    if (T) {
      V();
    } else {
      H();
    }
  }
  function V() {
    var X = j.getElementsByTagName("body")[0];
    var aa = C(r);
    aa.setAttribute("type", q);
    var Z = X.appendChild(aa);
    if (Z) {
      var Y = 0;
      (function () {
        if (typeof Z.GetVariable != D) {
          var ab = Z.GetVariable("$version");
          if (ab) {
            ab = ab.split(" ")[1].split(",");
            M.pv = [
              parseInt(ab[0], 10),
              parseInt(ab[1], 10),
              parseInt(ab[2], 10),
            ];
          }
        } else {
          if (Y < 10) {
            Y++;
            setTimeout(arguments.callee, 10);
            return;
          }
        }
        X.removeChild(aa);
        Z = null;
        H();
      })();
    } else {
      H();
    }
  }
  function H() {
    var ag = o.length;
    if (ag > 0) {
      for (var af = 0; af < ag; af++) {
        var Y = o[af].id;
        var ab = o[af].callbackFn;
        var aa = { success: false, id: Y };
        if (M.pv[0] > 0) {
          var ae = c(Y);
          if (ae) {
            if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
              w(Y, true);
              if (ab) {
                aa.success = true;
                aa.ref = z(Y);
                ab(aa);
              }
            } else {
              if (o[af].expressInstall && A()) {
                var ai = {};
                ai.data = o[af].expressInstall;
                ai.width = ae.getAttribute("width") || "0";
                ai.height = ae.getAttribute("height") || "0";
                if (ae.getAttribute("class")) {
                  ai.styleclass = ae.getAttribute("class");
                }
                if (ae.getAttribute("align")) {
                  ai.align = ae.getAttribute("align");
                }
                var ah = {};
                var X = ae.getElementsByTagName("param");
                var ac = X.length;
                for (var ad = 0; ad < ac; ad++) {
                  if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                    ah[X[ad].getAttribute("name")] =
                      X[ad].getAttribute("value");
                  }
                }
                P(ai, ah, Y, ab);
              } else {
                p(ae);
                if (ab) {
                  ab(aa);
                }
              }
            }
          }
        } else {
          w(Y, true);
          if (ab) {
            var Z = z(Y);
            if (Z && typeof Z.SetVariable != D) {
              aa.success = true;
              aa.ref = Z;
            }
            ab(aa);
          }
        }
      }
    }
  }
  function z(aa) {
    var X = null;
    var Y = c(aa);
    if (Y && Y.nodeName == "OBJECT") {
      if (typeof Y.SetVariable != D) {
        X = Y;
      } else {
        var Z = Y.getElementsByTagName(r)[0];
        if (Z) {
          X = Z;
        }
      }
    }
    return X;
  }
  function A() {
    return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312);
  }
  function P(aa, ab, X, Z) {
    a = true;
    E = Z || null;
    B = { success: false, id: X };
    var ae = c(X);
    if (ae) {
      if (ae.nodeName == "OBJECT") {
        l = g(ae);
        Q = null;
      } else {
        l = ae;
        Q = X;
      }
      aa.id = R;
      if (
        typeof aa.width == D ||
        (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)
      ) {
        aa.width = "310";
      }
      if (
        typeof aa.height == D ||
        (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)
      ) {
        aa.height = "137";
      }
      j.title = j.title.slice(0, 47) + " - Flash Player Installation";
      var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
        ac =
          "MMredirectURL=" +
          O.location.toString().replace(/&/g, "%26") +
          "&MMplayerType=" +
          ad +
          "&MMdoctitle=" +
          j.title;
      if (typeof ab.flashvars != D) {
        ab.flashvars += "&" + ac;
      } else {
        ab.flashvars = ac;
      }
      if (M.ie && M.win && ae.readyState != 4) {
        var Y = C("div");
        X += "SWFObjectNew";
        Y.setAttribute("id", X);
        ae.parentNode.insertBefore(Y, ae);
        ae.style.display = "none";
        (function () {
          if (ae.readyState == 4) {
            ae.parentNode.removeChild(ae);
          } else {
            setTimeout(arguments.callee, 10);
          }
        })();
      }
      u(aa, ab, X);
    }
  }
  function p(Y) {
    if (M.ie && M.win && Y.readyState != 4) {
      var X = C("div");
      Y.parentNode.insertBefore(X, Y);
      X.parentNode.replaceChild(g(Y), X);
      Y.style.display = "none";
      (function () {
        if (Y.readyState == 4) {
          Y.parentNode.removeChild(Y);
        } else {
          setTimeout(arguments.callee, 10);
        }
      })();
    } else {
      Y.parentNode.replaceChild(g(Y), Y);
    }
  }
  function g(ab) {
    var aa = C("div");
    if (M.win && M.ie) {
      aa.innerHTML = ab.innerHTML;
    } else {
      var Y = ab.getElementsByTagName(r)[0];
      if (Y) {
        var ad = Y.childNodes;
        if (ad) {
          var X = ad.length;
          for (var Z = 0; Z < X; Z++) {
            if (
              !(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") &&
              !(ad[Z].nodeType == 8)
            ) {
              aa.appendChild(ad[Z].cloneNode(true));
            }
          }
        }
      }
    }
    return aa;
  }
  function u(ai, ag, Y) {
    var X,
      aa = c(Y);
    if (M.wk && M.wk < 312) {
      return X;
    }
    if (aa) {
      if (typeof ai.id == D) {
        ai.id = Y;
      }
      if (M.ie && M.win) {
        var ah = "";
        for (var ae in ai) {
          if (ai[ae] != Object.prototype[ae]) {
            if (ae.toLowerCase() == "data") {
              ag.movie = ai[ae];
            } else {
              if (ae.toLowerCase() == "styleclass") {
                ah += ' class="' + ai[ae] + '"';
              } else {
                if (ae.toLowerCase() != "classid") {
                  ah += " " + ae + '="' + ai[ae] + '"';
                }
              }
            }
          }
        }
        var af = "";
        for (var ad in ag) {
          if (ag[ad] != Object.prototype[ad]) {
            af += '<param name="' + ad + '" value="' + ag[ad] + '" />';
          }
        }
        aa.outerHTML =
          '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
          ah +
          ">" +
          af +
          "</object>";
        N[N.length] = ai.id;
        X = c(ai.id);
      } else {
        var Z = C(r);
        Z.setAttribute("type", q);
        for (var ac in ai) {
          if (ai[ac] != Object.prototype[ac]) {
            if (ac.toLowerCase() == "styleclass") {
              Z.setAttribute("class", ai[ac]);
            } else {
              if (ac.toLowerCase() != "classid") {
                Z.setAttribute(ac, ai[ac]);
              }
            }
          }
        }
        for (var ab in ag) {
          if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
            e(Z, ab, ag[ab]);
          }
        }
        aa.parentNode.replaceChild(Z, aa);
        X = Z;
      }
    }
    return X;
  }
  function e(Z, X, Y) {
    var aa = C("param");
    aa.setAttribute("name", X);
    aa.setAttribute("value", Y);
    Z.appendChild(aa);
  }
  function y(Y) {
    var X = c(Y);
    if (X && X.nodeName == "OBJECT") {
      if (M.ie && M.win) {
        X.style.display = "none";
        (function () {
          if (X.readyState == 4) {
            b(Y);
          } else {
            setTimeout(arguments.callee, 10);
          }
        })();
      } else {
        X.parentNode.removeChild(X);
      }
    }
  }
  function b(Z) {
    var Y = c(Z);
    if (Y) {
      for (var X in Y) {
        if (typeof Y[X] == "function") {
          Y[X] = null;
        }
      }
      Y.parentNode.removeChild(Y);
    }
  }
  function c(Z) {
    var X = null;
    try {
      X = j.getElementById(Z);
    } catch (Y) {}
    return X;
  }
  function C(X) {
    return j.createElement(X);
  }
  function i(Z, X, Y) {
    Z.attachEvent(X, Y);
    I[I.length] = [Z, X, Y];
  }
  function F(Z) {
    var Y = M.pv,
      X = Z.split(".");
    X[0] = parseInt(X[0], 10);
    X[1] = parseInt(X[1], 10) || 0;
    X[2] = parseInt(X[2], 10) || 0;
    return Y[0] > X[0] ||
      (Y[0] == X[0] && Y[1] > X[1]) ||
      (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])
      ? true
      : false;
  }
  function v(ac, Y, ad, ab) {
    if (M.ie && M.mac) {
      return;
    }
    var aa = j.getElementsByTagName("head")[0];
    if (!aa) {
      return;
    }
    var X = ad && typeof ad == "string" ? ad : "screen";
    if (ab) {
      n = null;
      G = null;
    }
    if (!n || G != X) {
      var Z = C("style");
      Z.setAttribute("type", "text/css");
      Z.setAttribute("media", X);
      n = aa.appendChild(Z);
      if (
        M.ie &&
        M.win &&
        typeof j.styleSheets != D &&
        j.styleSheets.length > 0
      ) {
        n = j.styleSheets[j.styleSheets.length - 1];
      }
      G = X;
    }
    if (M.ie && M.win) {
      if (n && typeof n.addRule == r) {
        n.addRule(ac, Y);
      }
    } else {
      if (n && typeof j.createTextNode != D) {
        n.appendChild(j.createTextNode(ac + " {" + Y + "}"));
      }
    }
  }
  function w(Z, X) {
    if (!m) {
      return;
    }
    var Y = X ? "visible" : "hidden";
    if (J && c(Z)) {
      c(Z).style.visibility = Y;
    } else {
      v("#" + Z, "visibility:" + Y);
    }
  }
  function L(Y) {
    var Z = /[\\\"<>\.;]/;
    var X = Z.exec(Y) != null;
    return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y;
  }
  var d = (function () {
    if (M.ie && M.win) {
      window.attachEvent("onunload", function () {
        var ac = I.length;
        for (var ab = 0; ab < ac; ab++) {
          I[ab][0].detachEvent(I[ab][1], I[ab][2]);
        }
        var Z = N.length;
        for (var aa = 0; aa < Z; aa++) {
          y(N[aa]);
        }
        for (var Y in M) {
          M[Y] = null;
        }
        M = null;
        for (var X in swfobject) {
          swfobject[X] = null;
        }
        swfobject = null;
      });
    }
  })();
  return {
    registerObject: function (ab, X, aa, Z) {
      if (M.w3 && ab && X) {
        var Y = {};
        Y.id = ab;
        Y.swfVersion = X;
        Y.expressInstall = aa;
        Y.callbackFn = Z;
        o[o.length] = Y;
        w(ab, false);
      } else {
        if (Z) {
          Z({ success: false, id: ab });
        }
      }
    },
    getObjectById: function (X) {
      if (M.w3) {
        return z(X);
      }
    },
    embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
      var X = { success: false, id: ah };
      if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
        w(ah, false);
        K(function () {
          ae += "";
          ag += "";
          var aj = {};
          if (af && typeof af === r) {
            for (var al in af) {
              aj[al] = af[al];
            }
          }
          aj.data = ab;
          aj.width = ae;
          aj.height = ag;
          var am = {};
          if (ad && typeof ad === r) {
            for (var ak in ad) {
              am[ak] = ad[ak];
            }
          }
          if (Z && typeof Z === r) {
            for (var ai in Z) {
              if (typeof am.flashvars != D) {
                am.flashvars += "&" + ai + "=" + Z[ai];
              } else {
                am.flashvars = ai + "=" + Z[ai];
              }
            }
          }
          if (F(Y)) {
            var an = u(aj, am, ah);
            if (aj.id == ah) {
              w(ah, true);
            }
            X.success = true;
            X.ref = an;
          } else {
            if (aa && A()) {
              aj.data = aa;
              P(aj, am, ah, ac);
              return;
            } else {
              w(ah, true);
            }
          }
          if (ac) {
            ac(X);
          }
        });
      } else {
        if (ac) {
          ac(X);
        }
      }
    },
    switchOffAutoHideShow: function () {
      m = false;
    },
    ua: M,
    getFlashPlayerVersion: function () {
      return { major: M.pv[0], minor: M.pv[1], release: M.pv[2] };
    },
    hasFlashPlayerVersion: F,
    createSWF: function (Z, Y, X) {
      if (M.w3) {
        return u(Z, Y, X);
      } else {
        return undefined;
      }
    },
    showExpressInstall: function (Z, aa, X, Y) {
      if (M.w3 && A()) {
        P(Z, aa, X, Y);
      }
    },
    removeSWF: function (X) {
      if (M.w3) {
        y(X);
      }
    },
    createCSS: function (aa, Z, Y, X) {
      if (M.w3) {
        v(aa, Z, Y, X);
      }
    },
    addDomLoadEvent: K,
    addLoadEvent: s,
    getQueryParamValue: function (aa) {
      var Z = j.location.search || j.location.hash;
      if (Z) {
        if (/\?/.test(Z)) {
          Z = Z.split("?")[1];
        }
        if (aa == null) {
          return L(Z);
        }
        var Y = Z.split("&");
        for (var X = 0; X < Y.length; X++) {
          if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
            return L(Y[X].substring(Y[X].indexOf("=") + 1));
          }
        }
      }
      return "";
    },
    expressInstallCallback: function () {
      if (a) {
        var X = c(R);
        if (X && l) {
          X.parentNode.replaceChild(l, X);
          if (Q) {
            w(Q, true);
            if (M.ie && M.win) {
              l.style.display = "block";
            }
          }
          if (E) {
            E(B);
          }
        }
        a = false;
      }
    },
  };
})();
/*
Light slider
*/
!(function (e, i) {
  "use strict";
  var t = {
    item: 3,
    autoWidth: !1,
    slideMove: 1,
    slideMargin: 10,
    addClass: "",
    mode: "slide",
    useCSS: !0,
    cssEasing: "ease",
    easing: "linear",
    speed: 400,
    auto: !1,
    pauseOnHover: !1,
    loop: !1,
    slideEndAnimation: !0,
    pause: 2e3,
    keyPress: !1,
    controls: !0,
    prevHtml: "",
    nextHtml: "",
    rtl: !1,
    adaptiveHeight: !1,
    vertical: !1,
    verticalHeight: 500,
    vThumbWidth: 100,
    thumbItem: 10,
    pager: !0,
    gallery: !1,
    galleryMargin: 5,
    thumbMargin: 5,
    currentPagerPosition: "middle",
    enableTouch: !0,
    enableDrag: !0,
    freeMove: !0,
    swipeThreshold: 40,
    responsive: [],
    onBeforeStart: function (e) {},
    onSliderLoad: function (e) {},
    onBeforeSlide: function (e, i) {},
    onAfterSlide: function (e, i) {},
    onBeforeNextSlide: function (e, i) {},
    onBeforePrevSlide: function (e, i) {},
  };
  e.fn.lightSlider = function (i) {
    if (0 === this.length) return this;
    if (this.length > 1)
      return (
        this.each(function () {
          e(this).lightSlider(i);
        }),
        this
      );
    var n = {},
      l = e.extend(!0, {}, t, i),
      a = {},
      s = this;
    (n.$el = this), "fade" === l.mode && (l.vertical = !1);
    var o = s.children(),
      r = e(window).width(),
      d = null,
      c = 0,
      u = 0,
      f = !1,
      h = 0,
      g = "",
      v = 0,
      p = !0 === l.vertical ? "height" : "width",
      m = !0 === l.vertical ? "margin-bottom" : "margin-right",
      S = 0,
      b = 0,
      C = 0,
      M = 0,
      T = null,
      x = "ontouchstart" in document.documentElement,
      w = {
        chbreakpoint: function () {
          if (((r = e(window).width()), l.responsive.length)) {
            var i;
            if (
              (!1 === l.autoWidth && (i = l.item),
              r < l.responsive[0].breakpoint)
            )
              for (var t = 0; t < l.responsive.length; t++)
                r < l.responsive[t].breakpoint &&
                  (l.responsive[t].breakpoint, (d = l.responsive[t]));
            if (null != d)
              for (var n in d.settings)
                d.settings.hasOwnProperty(n) &&
                  ((void 0 !== a[n] && null !== a[n]) || (a[n] = l[n]),
                  (l[n] = d.settings[n]));
            if (!e.isEmptyObject(a) && r > l.responsive[0].breakpoint)
              for (var s in a) a.hasOwnProperty(s) && (l[s] = a[s]);
            !1 === l.autoWidth &&
              S > 0 &&
              C > 0 &&
              i !== l.item &&
              (v = Math.round(S / ((C + l.slideMargin) * l.slideMove)));
          }
        },
        calSW: function () {
          !1 === l.autoWidth &&
            (C = (h - (l.item * l.slideMargin - l.slideMargin)) / l.item);
        },
        calWidth: function (e) {
          var i = !0 === e ? g.find(".lslide").length : o.length;
          if (!1 === l.autoWidth) u = i * (C + l.slideMargin);
          else {
            u = 0;
            for (var t = 0; t < i; t++)
              u += parseInt(o.eq(t).width()) + l.slideMargin;
          }
          return u;
        },
      };
    return (
      (n = {
        doCss: function () {
          return !(
            !l.useCSS ||
            !(function () {
              for (
                var e = [
                    "transition",
                    "MozTransition",
                    "WebkitTransition",
                    "OTransition",
                    "msTransition",
                    "KhtmlTransition",
                  ],
                  i = document.documentElement,
                  t = 0;
                t < e.length;
                t++
              )
                if (e[t] in i.style) return !0;
            })()
          );
        },
        keyPress: function () {
          l.keyPress &&
            e(document).on("keyup.lightslider", function (i) {
              e(":focus").is("input, textarea") ||
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1),
                37 === i.keyCode
                  ? s.goToPrevSlide()
                  : 39 === i.keyCode && s.goToNextSlide());
            });
        },
        controls: function () {
          l.controls &&
            (s.after(
              '<div class="lSAction"><a title="View Previous" href="#" rel="nofollow" class="lSPrev">' +
                l.prevHtml +
                '</a><a title="View Next" href="#" rel="nofollow" class="lSNext">' +
                l.nextHtml +
                "</a></div>"
            ),
            l.autoWidth
              ? w.calWidth(!1) < h && g.find(".lSAction").hide()
              : c <= l.item && g.find(".lSAction").hide(),
            g.find(".lSAction a").on("click", function (i) {
              return (
                i.preventDefault ? i.preventDefault() : (i.returnValue = !1),
                "lSPrev" === e(this).attr("class")
                  ? s.goToPrevSlide()
                  : s.goToNextSlide(),
                !1
              );
            }));
        },
        initialStyle: function () {
          var e = this;
          "fade" === l.mode && ((l.autoWidth = !1), (l.slideEndAnimation = !1)),
            l.auto && (l.slideEndAnimation = !1),
            l.autoWidth && ((l.slideMove = 1), (l.item = 1)),
            l.loop && ((l.slideMove = 1), (l.freeMove = !1)),
            l.onBeforeStart.call(this, s),
            w.chbreakpoint(),
            s
              .addClass("lightSlider")
              .wrap(
                '<div class="lSSlideOuter ' +
                  l.addClass +
                  '"><div class="lSSlideWrapper"></div></div>'
              ),
            (g = s.parent(".lSSlideWrapper")),
            !0 === l.rtl && g.parent().addClass("lSrtl"),
            l.vertical
              ? (g.parent().addClass("vertical"),
                (h = l.verticalHeight),
                g.css("height", h + "px"))
              : (h = s.outerWidth()),
            o.addClass("lslide"),
            !0 === l.loop &&
              "slide" === l.mode &&
              (w.calSW(),
              (w.clone = function () {
                if (w.calWidth(!0) > h) {
                  for (
                    var i = 0, t = 0, n = 0;
                    n < o.length &&
                    (t++,
                    !(
                      (i +=
                        parseInt(s.find(".lslide").eq(n).width()) +
                        l.slideMargin) >=
                      h + l.slideMargin
                    ));
                    n++
                  );
                  var a = !0 === l.autoWidth ? t : l.item;
                  if (a < s.find(".clone.left").length)
                    for (var r = 0; r < s.find(".clone.left").length - a; r++)
                      o.eq(r).remove();
                  if (a < s.find(".clone.right").length)
                    for (
                      var d = o.length - 1;
                      d > o.length - 1 - s.find(".clone.right").length;
                      d--
                    )
                      v--, o.eq(d).remove();
                  for (var c = s.find(".clone.right").length; c < a; c++)
                    s
                      .find(".lslide")
                      .eq(c)
                      .clone()
                      .removeClass("lslide")
                      .addClass("clone right")
                      .appendTo(s),
                      v++;
                  for (
                    var u =
                      s.find(".lslide").length - s.find(".clone.left").length;
                    u > s.find(".lslide").length - a;
                    u--
                  )
                    s.find(".lslide")
                      .eq(u - 1)
                      .clone()
                      .removeClass("lslide")
                      .addClass("clone left")
                      .prependTo(s);
                  o = s.children();
                } else
                  o.hasClass("clone") &&
                    (s.find(".clone").remove(), e.move(s, 0));
              }),
              w.clone()),
            (w.sSW = function () {
              (c = o.length),
                !0 === l.rtl && !1 === l.vertical && (m = "margin-left"),
                !1 === l.autoWidth && o.css(p, C + "px"),
                o.css(m, l.slideMargin + "px"),
                (u = w.calWidth(!1)),
                s.css(p, u + "px"),
                !0 === l.loop &&
                  "slide" === l.mode &&
                  !1 === f &&
                  (v = s.find(".clone.left").length);
            }),
            (w.calL = function () {
              (o = s.children()), (c = o.length);
            }),
            this.doCss() && g.addClass("usingCss"),
            w.calL(),
            "slide" === l.mode
              ? (w.calSW(),
                w.sSW(),
                !0 === l.loop && ((S = e.slideValue()), this.move(s, S)),
                !1 === l.vertical && this.setHeight(s, !1))
              : (this.setHeight(s, !0),
                s.addClass("lSFade"),
                this.doCss() || (o.fadeOut(0), o.eq(v).fadeIn(0))),
            !0 === l.loop && "slide" === l.mode
              ? o.eq(v).addClass("active")
              : o.first().addClass("active");
        },
        pager: function () {
          var e = this;
          if (
            ((w.createPager = function () {
              M =
                (h - (l.thumbItem * l.thumbMargin - l.thumbMargin)) /
                l.thumbItem;
              var i = g.find(".lslide"),
                t = g.find(".lslide").length,
                n = 0,
                a = "",
                o = 0;
              for (n = 0; n < t; n++) {
                "slide" === l.mode &&
                  (l.autoWidth
                    ? (o +=
                        (parseInt(i.eq(n).width()) + l.slideMargin) *
                        l.slideMove)
                    : (o = n * ((C + l.slideMargin) * l.slideMove)));
                var r = i.eq(n * l.slideMove).attr("data-thumb");
                if (
                  (!0 === l.gallery
                    ? (a +=
                        '<li style="width:100%;' +
                        p +
                        ":" +
                        M +
                        "px;" +
                        m +
                        ":" +
                        l.thumbMargin +
                        'px"><a href="#"><img src="' +
                        r +
                        '" /></a></li>')
                    : (a += '<li><a href="#">' + (n + 1) + "</a></li>"),
                  "slide" === l.mode && o >= u - h - l.slideMargin)
                ) {
                  n += 1;
                  var d = 2;
                  l.autoWidth &&
                    ((a += '<li><a href="#">' + (n + 1) + "</a></li>"),
                    (d = 1)),
                    n < d
                      ? ((a = null), g.parent().addClass("noPager"))
                      : g.parent().removeClass("noPager");
                  break;
                }
              }
              var c = g.parent();
              c.find(".lSPager").html(a),
                !0 === l.gallery &&
                  (!0 === l.vertical &&
                    c.find(".lSPager").css("width", l.vThumbWidth + "px"),
                  (b = n * (l.thumbMargin + M) + 0.5),
                  c
                    .find(".lSPager")
                    .css({
                      property: b + "px",
                      "transition-duration": l.speed + "ms",
                    }),
                  !0 === l.vertical &&
                    g
                      .parent()
                      .css(
                        "padding-right",
                        l.vThumbWidth + l.galleryMargin + "px"
                      ),
                  c.find(".lSPager").css(p, b + "px"));
              var f = c.find(".lSPager").find("li");
              f.first().addClass("active"),
                f.on("click", function () {
                  return (
                    !0 === l.loop && "slide" === l.mode
                      ? (v +=
                          f.index(this) -
                          c.find(".lSPager").find("li.active").index())
                      : (v = f.index(this)),
                    s.mode(!1),
                    !0 === l.gallery && e.slideThumb(),
                    !1
                  );
                });
            }),
            l.pager)
          ) {
            var i = "lSpg";
            l.gallery && (i = "lSGallery"),
              g.after('<ul class="lSPager ' + i + '"></ul>');
            var t = l.vertical ? "margin-left" : "margin-top";
            g
              .parent()
              .find(".lSPager")
              .css(t, l.galleryMargin + "px"),
              w.createPager();
          }
          setTimeout(function () {
            w.init();
          }, 0);
        },
        setHeight: function (e, i) {
          var t = null,
            n = this;
          t = l.loop ? e.children(".lslide ").first() : e.children().first();
          var a = function () {
            var n = t.outerHeight(),
              l = 0,
              a = n;
            i && ((n = 0), (l = (100 * a) / h)),
              e.css({ height: n + "px", "padding-bottom": l + "%" });
          };
          a(),
            t.find("img").length
              ? t.find("img")[0].complete
                ? (a(), T || n.auto())
                : t.find("img").on("load", function () {
                    setTimeout(function () {
                      a(), T || n.auto();
                    }, 100);
                  })
              : T || n.auto();
        },
        active: function (e, i) {
          this.doCss() && "fade" === l.mode && g.addClass("on");
          var t,
            n,
            a = 0;
          v * l.slideMove < c
            ? (e.removeClass("active"),
              this.doCss() ||
                "fade" !== l.mode ||
                !1 !== i ||
                e.fadeOut(l.speed),
              (a = !0 === i ? v : v * l.slideMove),
              !0 === i && ((n = (t = e.length) - 1), a + 1 >= t && (a = n)),
              !0 === l.loop &&
                "slide" === l.mode &&
                ((a =
                  !0 === i
                    ? v - s.find(".clone.left").length
                    : v * l.slideMove),
                !0 === i &&
                  ((n = (t = e.length) - 1),
                  a + 1 === t ? (a = n) : a + 1 > t && (a = 0))),
              this.doCss() ||
                "fade" !== l.mode ||
                !1 !== i ||
                e.eq(a).fadeIn(l.speed),
              e.eq(a).addClass("active"))
            : (e.removeClass("active"),
              e.eq(e.length - 1).addClass("active"),
              this.doCss() ||
                "fade" !== l.mode ||
                !1 !== i ||
                (e.fadeOut(l.speed), e.eq(a).fadeIn(l.speed)));
        },
        move: function (e, i) {
          !0 === l.rtl && (i = -i),
            this.doCss()
              ? !0 === l.vertical
                ? e.css({
                    transform: "translate3d(0px, " + -i + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -i + "px, 0px)",
                  })
                : e.css({
                    transform: "translate3d(" + -i + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -i + "px, 0px, 0px)",
                  })
              : !0 === l.vertical
              ? e
                  .css("position", "relative")
                  .animate({ top: -i + "px" }, l.speed, l.easing)
              : e
                  .css("position", "relative")
                  .animate({ left: -i + "px" }, l.speed, l.easing);
          var t = g.parent().find(".lSPager").find("li");
          this.active(t, !0);
        },
        fade: function () {
          this.active(o, !1);
          var e = g.parent().find(".lSPager").find("li");
          this.active(e, !0);
        },
        slide: function () {
          var e = this;
          (w.calSlide = function () {
            u > h &&
              ((S = e.slideValue()),
              e.active(o, !1),
              S > u - h - l.slideMargin
                ? (S = u - h - l.slideMargin)
                : S < 0 && (S = 0),
              e.move(s, S),
              !0 === l.loop &&
                "slide" === l.mode &&
                (v >= c - s.find(".clone.left").length / l.slideMove &&
                  e.resetSlide(s.find(".clone.left").length),
                0 === v && e.resetSlide(g.find(".lslide").length)));
          }),
            w.calSlide();
        },
        resetSlide: function (e) {
          var i = this;
          g.find(".lSAction a").addClass("disabled"),
            setTimeout(function () {
              (v = e),
                g.css("transition-duration", "0ms"),
                (S = i.slideValue()),
                i.active(o, !1),
                n.move(s, S),
                setTimeout(function () {
                  g.css("transition-duration", l.speed + "ms"),
                    g.find(".lSAction a").removeClass("disabled");
                }, 50);
            }, l.speed + 100);
        },
        slideValue: function () {
          var e = 0;
          if (!1 === l.autoWidth) e = v * ((C + l.slideMargin) * l.slideMove);
          else {
            e = 0;
            for (var i = 0; i < v; i++)
              e += parseInt(o.eq(i).width()) + l.slideMargin;
          }
          return e;
        },
        slideThumb: function () {
          var e;
          switch (l.currentPagerPosition) {
            case "left":
              e = 0;
              break;
            case "middle":
              e = h / 2 - M / 2;
              break;
            case "right":
              e = h - M;
          }
          var i = v - s.find(".clone.left").length,
            t = g.parent().find(".lSPager");
          "slide" === l.mode &&
            !0 === l.loop &&
            (i >= t.children().length
              ? (i = 0)
              : i < 0 && (i = t.children().length));
          var n = i * (M + l.thumbMargin) - e;
          n + h > b && (n = b - h - l.thumbMargin),
            n < 0 && (n = 0),
            this.move(t, n);
        },
        auto: function () {
          l.auto &&
            (clearInterval(T),
            (T = setInterval(function () {
              s.goToNextSlide();
            }, l.pause)));
        },
        pauseOnHover: function () {
          var i = this;
          l.auto &&
            l.pauseOnHover &&
            (g.on("mouseenter", function () {
              e(this).addClass("ls-hover"), s.pause(), (l.auto = !0);
            }),
            g.on("mouseleave", function () {
              e(this).removeClass("ls-hover"),
                g.find(".lightSlider").hasClass("lsGrabbing") || i.auto();
            }));
        },
        touchMove: function (e, i) {
          if ((g.css("transition-duration", "0ms"), "slide" === l.mode)) {
            var t = S - (e - i);
            if (t >= u - h - l.slideMargin)
              if (!1 === l.freeMove) t = u - h - l.slideMargin;
              else {
                var n = u - h - l.slideMargin;
                t = n + (t - n) / 5;
              }
            else t < 0 && (!1 === l.freeMove ? (t = 0) : (t /= 5));
            this.move(s, t);
          }
        },
        touchEnd: function (e) {
          if (
            (g.css("transition-duration", l.speed + "ms"), "slide" === l.mode)
          ) {
            var i = !1,
              t = !0;
            (S -= e) > u - h - l.slideMargin
              ? ((S = u - h - l.slideMargin), !1 === l.autoWidth && (i = !0))
              : S < 0 && (S = 0);
            var n = function (e) {
              var t = 0;
              if ((i || (e && (t = 1)), l.autoWidth))
                for (
                  var n = 0, a = 0;
                  a < o.length &&
                  ((n += parseInt(o.eq(a).width()) + l.slideMargin),
                  (v = a + t),
                  !(n >= S));
                  a++
                );
              else {
                var s = S / ((C + l.slideMargin) * l.slideMove);
                (v = parseInt(s) + t),
                  S >= u - h - l.slideMargin && s % 1 != 0 && v++;
              }
            };
            e >= l.swipeThreshold
              ? (n(!1), (t = !1))
              : e <= -l.swipeThreshold && (n(!0), (t = !1)),
              s.mode(t),
              this.slideThumb();
          } else
            e >= l.swipeThreshold
              ? s.goToPrevSlide()
              : e <= -l.swipeThreshold && s.goToNextSlide();
        },
        enableDrag: function () {
          var i = this;
          if (!x) {
            var t = 0,
              n = 0,
              a = !1;
            g.find(".lightSlider").addClass("lsGrab"),
              g.on("mousedown", function (i) {
                if (u < h && 0 !== u) return !1;
                "lSPrev" !== e(i.target).attr("class") &&
                  "lSNext" !== e(i.target).attr("class") &&
                  ((t = !0 === l.vertical ? i.pageY : i.pageX),
                  (a = !0),
                  i.preventDefault ? i.preventDefault() : (i.returnValue = !1),
                  (g.scrollLeft += 1),
                  (g.scrollLeft -= 1),
                  g
                    .find(".lightSlider")
                    .removeClass("lsGrab")
                    .addClass("lsGrabbing"),
                  clearInterval(T));
              }),
              e(window).on("mousemove", function (e) {
                a &&
                  ((n = !0 === l.vertical ? e.pageY : e.pageX),
                  i.touchMove(n, t));
              }),
              e(window).on("mouseup", function (s) {
                if (a) {
                  g
                    .find(".lightSlider")
                    .removeClass("lsGrabbing")
                    .addClass("lsGrab"),
                    (a = !1);
                  var o = (n = !0 === l.vertical ? s.pageY : s.pageX) - t;
                  Math.abs(o) >= l.swipeThreshold &&
                    e(window).on("click.ls", function (i) {
                      i.preventDefault
                        ? i.preventDefault()
                        : (i.returnValue = !1),
                        i.stopImmediatePropagation(),
                        i.stopPropagation(),
                        e(window).off("click.ls");
                    }),
                    i.touchEnd(o);
                }
              });
          }
        },
        enableTouch: function () {
          var e = this;
          if (x) {
            var i = {},
              t = {};
            g.on("touchstart", function (e) {
              (t = e.originalEvent.targetTouches[0]),
                (i.pageX = e.originalEvent.targetTouches[0].pageX),
                (i.pageY = e.originalEvent.targetTouches[0].pageY),
                clearInterval(T);
            }),
              g.on("touchmove", function (n) {
                if (u < h && 0 !== u) return !1;
                var a = n.originalEvent;
                t = a.targetTouches[0];
                var s = Math.abs(t.pageX - i.pageX),
                  o = Math.abs(t.pageY - i.pageY);
                !0 === l.vertical
                  ? (3 * o > s && n.preventDefault(),
                    e.touchMove(t.pageY, i.pageY))
                  : (3 * s > o && n.preventDefault(),
                    e.touchMove(t.pageX, i.pageX));
              }),
              g.on("touchend", function () {
                if (u < h && 0 !== u) return !1;
                var n;
                (n = !0 === l.vertical ? t.pageY - i.pageY : t.pageX - i.pageX),
                  e.touchEnd(n);
              });
          }
        },
        build: function () {
          var i = this;
          i.initialStyle(),
            this.doCss() &&
              (!0 === l.enableTouch && i.enableTouch(),
              !0 === l.enableDrag && i.enableDrag()),
            e(window).on("focus", function () {
              i.auto();
            }),
            e(window).on("blur", function () {
              clearInterval(T);
            }),
            i.pager(),
            i.pauseOnHover(),
            i.controls(),
            i.keyPress();
        },
      }).build(),
      (w.init = function () {
        w.chbreakpoint(),
          !0 === l.vertical
            ? ((h = l.item > 1 ? l.verticalHeight : o.outerHeight()),
              g.css("height", h + "px"))
            : (h = g.outerWidth()),
          !0 === l.loop && "slide" === l.mode && w.clone(),
          w.calL(),
          "slide" === l.mode && s.removeClass("lSSlide"),
          "slide" === l.mode && (w.calSW(), w.sSW()),
          setTimeout(function () {
            "slide" === l.mode && s.addClass("lSSlide");
          }, 1e3),
          l.pager && w.createPager(),
          !0 === l.adaptiveHeight &&
            !1 === l.vertical &&
            s.css("height", o.eq(v).outerHeight(!0)),
          !1 === l.adaptiveHeight &&
            ("slide" === l.mode
              ? !1 === l.vertical
                ? n.setHeight(s, !1)
                : n.auto()
              : n.setHeight(s, !0)),
          !0 === l.gallery && n.slideThumb(),
          "slide" === l.mode && n.slide(),
          !1 === l.autoWidth
            ? o.length <= l.item
              ? g.find(".lSAction").hide()
              : g.find(".lSAction").show()
            : w.calWidth(!1) < h && 0 !== u
            ? g.find(".lSAction").hide()
            : g.find(".lSAction").show();
      }),
      (s.goToPrevSlide = function () {
        if (v > 0)
          l.onBeforePrevSlide.call(this, s, v),
            v--,
            s.mode(!1),
            !0 === l.gallery && n.slideThumb();
        else if (!0 === l.loop) {
          if ((l.onBeforePrevSlide.call(this, s, v), "fade" === l.mode))
            v = parseInt((c - 1) / l.slideMove);
          s.mode(!1), !0 === l.gallery && n.slideThumb();
        } else
          !0 === l.slideEndAnimation &&
            (s.addClass("leftEnd"),
            setTimeout(function () {
              s.removeClass("leftEnd");
            }, 400));
      }),
      (s.goToNextSlide = function () {
        var e = !0;
        "slide" === l.mode && (e = n.slideValue() < u - h - l.slideMargin);
        v * l.slideMove < c - l.slideMove && e
          ? (l.onBeforeNextSlide.call(this, s, v),
            v++,
            s.mode(!1),
            !0 === l.gallery && n.slideThumb())
          : !0 === l.loop
          ? (l.onBeforeNextSlide.call(this, s, v),
            (v = 0),
            s.mode(!1),
            !0 === l.gallery && n.slideThumb())
          : !0 === l.slideEndAnimation &&
            (s.addClass("rightEnd"),
            setTimeout(function () {
              s.removeClass("rightEnd");
            }, 400));
      }),
      (s.mode = function (e) {
        !0 === l.adaptiveHeight &&
          !1 === l.vertical &&
          s.css("height", o.eq(v).outerHeight(!0)),
          !1 === f &&
            ("slide" === l.mode
              ? n.doCss() &&
                (s.addClass("lSSlide"),
                "" !== l.speed && g.css("transition-duration", l.speed + "ms"),
                "" !== l.cssEasing &&
                  g.css("transition-timing-function", l.cssEasing))
              : n.doCss() &&
                ("" !== l.speed && s.css("transition-duration", l.speed + "ms"),
                "" !== l.cssEasing &&
                  s.css("transition-timing-function", l.cssEasing))),
          e || l.onBeforeSlide.call(this, s, v),
          "slide" === l.mode ? n.slide() : n.fade(),
          g.hasClass("ls-hover") || n.auto(),
          setTimeout(function () {
            e || l.onAfterSlide.call(this, s, v);
          }, l.speed),
          (f = !0);
      }),
      (s.play = function () {
        s.goToNextSlide(), (l.auto = !0), n.auto();
      }),
      (s.pause = function () {
        (l.auto = !1), clearInterval(T);
      }),
      (s.refresh = function () {
        w.init();
      }),
      (s.getCurrentSlideCount = function () {
        var e = v;
        if (l.loop) {
          var i = g.find(".lslide").length,
            t = s.find(".clone.left").length;
          e = v <= t - 1 ? i + (v - t) : v >= i + t ? v - i - t : v - t;
        }
        return e + 1;
      }),
      (s.getTotalSlideCount = function () {
        return g.find(".lslide").length;
      }),
      (s.goToSlide = function (e) {
        (v = l.loop ? e + s.find(".clone.left").length - 1 : e),
          s.mode(!1),
          !0 === l.gallery && n.slideThumb();
      }),
      (s.destroy = function () {
        s.lightSlider &&
          ((s.goToPrevSlide = function () {}),
          (s.goToNextSlide = function () {}),
          (s.mode = function () {}),
          (s.play = function () {}),
          (s.pause = function () {}),
          (s.refresh = function () {}),
          (s.getCurrentSlideCount = function () {}),
          (s.getTotalSlideCount = function () {}),
          (s.goToSlide = function () {}),
          (s.lightSlider = null),
          (w = { init: function () {} }),
          s.parent().parent().find(".lSAction, .lSPager").remove(),
          s
            .removeClass(
              "lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right"
            )
            .removeAttr("style")
            .unwrap()
            .unwrap(),
          s.children().removeAttr("style"),
          o.removeClass("lslide active"),
          s.find(".clone").remove(),
          (o = null),
          (T = null),
          (f = !1),
          (v = 0));
      }),
      setTimeout(function () {
        l.onSliderLoad.call(this, s);
      }, 10),
      e(window).on("resize orientationchange", function (e) {
        setTimeout(function () {
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            w.init();
        }, 200);
      }),
      this
    );
  };
})(jQuery);
/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 1.7.13 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2018, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
 **/
!(function (a) {
  "use strict";
  function b(a, c) {
    if (!(this instanceof b)) {
      var d = new b(a, c);
      return d.open(), d;
    }
    (this.id = b.id++), this.setup(a, c), this.chainCallbacks(b._callbackChain);
  }
  function c(a, b) {
    var c = {};
    for (var d in a) d in b && ((c[d] = a[d]), delete a[d]);
    return c;
  }
  function d(a, b) {
    var c = {},
      d = new RegExp("^" + b + "([A-Z])(.*)");
    for (var e in a) {
      var f = e.match(d);
      if (f) {
        var g = (f[1] + f[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
        c[g] = a[e];
      }
    }
    return c;
  }
  if ("undefined" == typeof a)
    return void (
      "console" in window &&
      window.console.info("Too much lightness, Featherlight needs jQuery.")
    );
  if (a.fn.jquery.match(/-ajax/))
    return void (
      "console" in window &&
      window.console.info(
        "Featherlight needs regular jQuery, not the slim version."
      )
    );
  var e = [],
    f = function (b) {
      return (e = a.grep(e, function (a) {
        return a !== b && a.$instance.closest("body").length > 0;
      }));
    },
    g = {
      allow: 1,
      allowfullscreen: 1,
      frameborder: 1,
      height: 1,
      longdesc: 1,
      marginheight: 1,
      marginwidth: 1,
      mozallowfullscreen: 1,
      name: 1,
      referrerpolicy: 1,
      sandbox: 1,
      scrolling: 1,
      src: 1,
      srcdoc: 1,
      style: 1,
      webkitallowfullscreen: 1,
      width: 1,
    },
    h = { keyup: "onKeyUp", resize: "onResize" },
    i = function (c) {
      a.each(b.opened().reverse(), function () {
        return c.isDefaultPrevented() || !1 !== this[h[c.type]](c)
          ? void 0
          : (c.preventDefault(), c.stopPropagation(), !1);
      });
    },
    j = function (c) {
      if (c !== b._globalHandlerInstalled) {
        b._globalHandlerInstalled = c;
        var d = a
          .map(h, function (a, c) {
            return c + "." + b.prototype.namespace;
          })
          .join(" ");
        a(window)[c ? "on" : "off"](d, i);
      }
    };
  (b.prototype = {
    constructor: b,
    namespace: "featherlight",
    targetAttr: "data-featherlight",
    variant: null,
    resetCss: !1,
    background: null,
    openTrigger: "click",
    closeTrigger: "click",
    filter: null,
    root: "body",
    openSpeed: 250,
    closeSpeed: 250,
    closeOnClick: "background",
    closeOnEsc: !0,
    closeIcon: "&#10005;",
    loading: "",
    persist: !1,
    otherClose: null,
    beforeOpen: a.noop,
    beforeContent: a.noop,
    beforeClose: a.noop,
    afterOpen: a.noop,
    afterContent: a.noop,
    afterClose: a.noop,
    onKeyUp: a.noop,
    onResize: a.noop,
    type: null,
    contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
    setup: function (b, c) {
      "object" != typeof b ||
        b instanceof a != !1 ||
        c ||
        ((c = b), (b = void 0));
      var d = a.extend(this, c, { target: b }),
        e = d.resetCss ? d.namespace + "-reset" : d.namespace,
        f = a(
          d.background ||
            [
              '<div class="' + e + "-loading " + e + '">',
              '<div class="' + e + '-content">',
              '<button class="' +
                e +
                "-close-icon " +
                d.namespace +
                '-close" aria-label="Close">',
              d.closeIcon,
              "</button>",
              '<div class="' + d.namespace + '-inner">' + d.loading + "</div>",
              "</div>",
              "</div>",
            ].join("")
        ),
        g =
          "." +
          d.namespace +
          "-close" +
          (d.otherClose ? "," + d.otherClose : "");
      return (
        (d.$instance = f.clone().addClass(d.variant)),
        d.$instance.on(d.closeTrigger + "." + d.namespace, function (b) {
          if (!b.isDefaultPrevented()) {
            var c = a(b.target);
            (("background" === d.closeOnClick && c.is("." + d.namespace)) ||
              "anywhere" === d.closeOnClick ||
              c.closest(g).length) &&
              (d.close(b), b.preventDefault());
          }
        }),
        this
      );
    },
    getContent: function () {
      if (this.persist !== !1 && this.$content) return this.$content;
      var b = this,
        c = this.constructor.contentFilters,
        d = function (a) {
          return b.$currentTarget && b.$currentTarget.attr(a);
        },
        e = d(b.targetAttr),
        f = b.target || e || "",
        g = c[b.type];
      if (
        (!g && f in c && ((g = c[f]), (f = b.target && e)),
        (f = f || d("href") || ""),
        !g)
      )
        for (var h in c) b[h] && ((g = c[h]), (f = b[h]));
      if (!g) {
        var i = f;
        if (
          ((f = null),
          a.each(b.contentFilters, function () {
            return (
              (g = c[this]),
              g.test && (f = g.test(i)),
              !f && g.regex && i.match && i.match(g.regex) && (f = i),
              !f
            );
          }),
          !f)
        )
          return (
            "console" in window &&
              window.console.error(
                "Featherlight: no content filter found " +
                  (i ? ' for "' + i + '"' : " (no target specified)")
              ),
            !1
          );
      }
      return g.process.call(b, f);
    },
    setContent: function (b) {
      return (
        this.$instance.removeClass(this.namespace + "-loading"),
        this.$instance.toggleClass(this.namespace + "-iframe", b.is("iframe")),
        this.$instance
          .find("." + this.namespace + "-inner")
          .not(b)
          .slice(1)
          .remove()
          .end()
          .replaceWith(a.contains(this.$instance[0], b[0]) ? "" : b),
        (this.$content = b.addClass(this.namespace + "-inner")),
        this
      );
    },
    open: function (b) {
      var c = this;
      if (
        (c.$instance.hide().appendTo(c.root),
        !((b && b.isDefaultPrevented()) || c.beforeOpen(b) === !1))
      ) {
        b && b.preventDefault();
        var d = c.getContent();
        if (d)
          return (
            e.push(c),
            j(!0),
            c.$instance.fadeIn(c.openSpeed),
            c.beforeContent(b),
            a
              .when(d)
              .always(function (a) {
                c.setContent(a), c.afterContent(b);
              })
              .then(c.$instance.promise())
              .done(function () {
                c.afterOpen(b);
              })
          );
      }
      return c.$instance.detach(), a.Deferred().reject().promise();
    },
    close: function (b) {
      var c = this,
        d = a.Deferred();
      return (
        c.beforeClose(b) === !1
          ? d.reject()
          : (0 === f(c).length && j(!1),
            c.$instance.fadeOut(c.closeSpeed, function () {
              c.$instance.detach(), c.afterClose(b), d.resolve();
            })),
        d.promise()
      );
    },
    resize: function (a, b) {
      if (a && b) {
        this.$content.css("width", "").css("height", "");
        var c = Math.max(
          a / (this.$content.parent().width() - 1),
          b / (this.$content.parent().height() - 1)
        );
        c > 1 &&
          ((c = b / Math.floor(b / c)),
          this.$content
            .css("width", "" + a / c + "px")
            .css("height", "" + b / c + "px"));
      }
    },
    chainCallbacks: function (b) {
      for (var c in b) this[c] = a.proxy(b[c], this, a.proxy(this[c], this));
    },
  }),
    a.extend(b, {
      id: 0,
      autoBind: "[data-featherlight]",
      defaults: b.prototype,
      contentFilters: {
        jquery: {
          regex: /^[#.]\w/,
          test: function (b) {
            return b instanceof a && b;
          },
          process: function (b) {
            return this.persist !== !1 ? a(b) : a(b).clone(!0);
          },
        },
        image: {
          regex: /\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,
          process: function (b) {
            var c = this,
              d = a.Deferred(),
              e = new Image(),
              f = a(
                '<img src="' +
                  b +
                  '" alt="" class="' +
                  c.namespace +
                  '-image" />'
              );
            return (
              (e.onload = function () {
                (f.naturalWidth = e.width),
                  (f.naturalHeight = e.height),
                  d.resolve(f);
              }),
              (e.onerror = function () {
                d.reject(f);
              }),
              (e.src = b),
              d.promise()
            );
          },
        },
        html: {
          regex: /^\s*<[\w!][^<]*>/,
          process: function (b) {
            return a(b);
          },
        },
        ajax: {
          regex: /./,
          process: function (b) {
            var c = a.Deferred(),
              d = a("<div></div>").load(b, function (a, b) {
                "error" !== b && c.resolve(d.contents()), c.fail();
              });
            return c.promise();
          },
        },
        iframe: {
          process: function (b) {
            var e = new a.Deferred(),
              f = a("<iframe/>"),
              h = d(this, "iframe"),
              i = c(h, g);
            return (
              f
                .hide()
                .attr("src", b)
                .attr(i)
                .css(h)
                .on("load", function () {
                  e.resolve(f.show());
                })
                .appendTo(
                  this.$instance.find("." + this.namespace + "-content")
                ),
              e.promise()
            );
          },
        },
        text: {
          process: function (b) {
            return a("<div>", { text: b });
          },
        },
      },
      functionAttributes: [
        "beforeOpen",
        "afterOpen",
        "beforeContent",
        "afterContent",
        "beforeClose",
        "afterClose",
      ],
      readElementConfig: function (b, c) {
        var d = this,
          e = new RegExp("^data-" + c + "-(.*)"),
          f = {};
        return (
          b &&
            b.attributes &&
            a.each(b.attributes, function () {
              var b = this.name.match(e);
              if (b) {
                var c = this.value,
                  g = a.camelCase(b[1]);
                if (a.inArray(g, d.functionAttributes) >= 0)
                  c = new Function(c);
                else
                  try {
                    c = JSON.parse(c);
                  } catch (h) {}
                f[g] = c;
              }
            }),
          f
        );
      },
      extend: function (b, c) {
        var d = function () {
          this.constructor = b;
        };
        return (
          (d.prototype = this.prototype),
          (b.prototype = new d()),
          (b.__super__ = this.prototype),
          a.extend(b, this, c),
          (b.defaults = b.prototype),
          b
        );
      },
      attach: function (b, c, d) {
        var e = this;
        "object" != typeof c ||
          c instanceof a != !1 ||
          d ||
          ((d = c), (c = void 0)),
          (d = a.extend({}, d));
        var f,
          g = d.namespace || e.defaults.namespace,
          h = a.extend({}, e.defaults, e.readElementConfig(b[0], g), d),
          i = function (g) {
            var i = a(g.currentTarget),
              j = a.extend(
                { $source: b, $currentTarget: i },
                e.readElementConfig(b[0], h.namespace),
                e.readElementConfig(g.currentTarget, h.namespace),
                d
              ),
              k = f || i.data("featherlight-persisted") || new e(c, j);
            "shared" === k.persist
              ? (f = k)
              : k.persist !== !1 && i.data("featherlight-persisted", k),
              j.$currentTarget.blur && j.$currentTarget.blur(),
              k.open(g);
          };
        return (
          b.on(h.openTrigger + "." + h.namespace, h.filter, i),
          { filter: h.filter, handler: i }
        );
      },
      current: function () {
        var a = this.opened();
        return a[a.length - 1] || null;
      },
      opened: function () {
        var b = this;
        return (
          f(),
          a.grep(e, function (a) {
            return a instanceof b;
          })
        );
      },
      close: function (a) {
        var b = this.current();
        return b ? b.close(a) : void 0;
      },
      _onReady: function () {
        var b = this;
        if (b.autoBind) {
          var c = a(b.autoBind);
          c.each(function () {
            b.attach(a(this));
          }),
            a(document).on("click", b.autoBind, function (d) {
              if (!d.isDefaultPrevented()) {
                var e = a(d.currentTarget),
                  f = c.length;
                if (((c = c.add(e)), f !== c.length)) {
                  var g = b.attach(e);
                  (!g.filter ||
                    a(d.target).parentsUntil(e, g.filter).length > 0) &&
                    g.handler(d);
                }
              }
            });
        }
      },
      _callbackChain: {
        onKeyUp: function (b, c) {
          return 27 === c.keyCode
            ? (this.closeOnEsc && a.featherlight.close(c), !1)
            : b(c);
        },
        beforeOpen: function (b, c) {
          return (
            a(document.documentElement).addClass("with-featherlight"),
            (this._previouslyActive = document.activeElement),
            (this._$previouslyTabbable = a(
              "a, input, select, textarea, iframe, button, iframe, [contentEditable=true]"
            )
              .not("[tabindex]")
              .not(this.$instance.find("button"))),
            (this._$previouslyWithTabIndex =
              a("[tabindex]").not('[tabindex="-1"]')),
            (this._previousWithTabIndices = this._$previouslyWithTabIndex.map(
              function (b, c) {
                return a(c).attr("tabindex");
              }
            )),
            this._$previouslyWithTabIndex
              .add(this._$previouslyTabbable)
              .attr("tabindex", -1),
            document.activeElement.blur && document.activeElement.blur(),
            b(c)
          );
        },
        afterClose: function (c, d) {
          var e = c(d),
            f = this;
          return (
            this._$previouslyTabbable.removeAttr("tabindex"),
            this._$previouslyWithTabIndex.each(function (b, c) {
              a(c).attr("tabindex", f._previousWithTabIndices[b]);
            }),
            this._previouslyActive.focus(),
            0 === b.opened().length &&
              a(document.documentElement).removeClass("with-featherlight"),
            e
          );
        },
        onResize: function (a, b) {
          return (
            this.resize(
              this.$content.naturalWidth,
              this.$content.naturalHeight
            ),
            a(b)
          );
        },
        afterContent: function (a, b) {
          var c = a(b);
          return (
            this.$instance.find("[autofocus]:not([disabled])").focus(),
            this.onResize(b),
            c
          );
        },
      },
    }),
    (a.featherlight = b),
    (a.fn.featherlight = function (a, c) {
      return b.attach(this, a, c), this;
    }),
    a(document).ready(function () {
      b._onReady();
    });
})(jQuery);

/** Mobile Detect **/
(function () {
  var a = {};
  var g = /iPhone/i,
    p = /iPod/i,
    i = /iPad/i,
    f = /\bAndroid(?:.+)Mobile\b/i,
    h = /Android/i,
    d = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
    e = /Silk/i,
    c = /Windows Phone/i,
    j = /\bWindows(?:.+)ARM\b/i,
    k = /BlackBerry/i,
    l = /BB10/i,
    m = /Opera Mini/i,
    n = /\b(CriOS|Chrome)(?:.+)Mobile/i,
    o = /Mobile(?:.+)Firefox\b/i;
  function b($, a) {
    return $.test(a);
  }
  function q($) {
    var a = ($ =
      $ || ("undefined" != typeof navigator ? navigator.userAgent : "")).split(
      "[FBAN"
    );
    void 0 !== a[1] && ($ = a[0]),
      void 0 !== (a = $.split("Twitter"))[1] && ($ = a[0]);
    var r = {
      apple: {
        phone: b(g, $) && !b(c, $),
        ipod: b(p, $),
        tablet: !b(g, $) && b(i, $) && !b(c, $),
        device: (b(g, $) || b(p, $) || b(i, $)) && !b(c, $),
      },
      amazon: {
        phone: b(d, $),
        tablet: !b(d, $) && b(e, $),
        device: b(d, $) || b(e, $),
      },
      android: {
        phone: (!b(c, $) && b(d, $)) || (!b(c, $) && b(f, $)),
        tablet: !b(c, $) && !b(d, $) && !b(f, $) && (b(e, $) || b(h, $)),
        device:
          (!b(c, $) && (b(d, $) || b(e, $) || b(f, $) || b(h, $))) ||
          b(/\bokhttp\b/i, $),
      },
      windows: { phone: b(c, $), tablet: b(j, $), device: b(c, $) || b(j, $) },
      other: {
        blackberry: b(k, $),
        blackberry10: b(l, $),
        opera: b(m, $),
        firefox: b(o, $),
        chrome: b(n, $),
        device: b(k, $) || b(l, $) || b(m, $) || b(o, $) || b(n, $),
      },
      any: !1,
      phone: !1,
      tablet: !1,
    };
    return (
      (r.any =
        r.apple.device ||
        r.android.device ||
        r.windows.device ||
        r.other.device),
      (r.phone = r.apple.phone || r.android.phone || r.windows.phone),
      (r.tablet = r.apple.tablet || r.android.tablet || r.windows.tablet),
      r
    );
  }
  a = q();
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = a;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return a;
    });
  } else {
    this["isMobile"] = a;
  }
})();

//Glider JS - 1.7.4 -
!(function (e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
    ? (module.exports = e())
    : e();
})(function () {
  var a = "undefined" != typeof window ? window : this,
    e = (a.Glider = function (e, t) {
      var o = this;
      if (e._glider) return e._glider;
      if (
        ((o.ele = e),
        o.ele.classList.add("glider"),
        ((o.ele._glider = o).opt = Object.assign(
          {},
          {
            slidesToScroll: 1,
            slidesToShow: 1,
            resizeLock: !0,
            duration: 0.5,
            easing: function (e, t, o, i, r) {
              return i * (t /= r) * t + o;
            },
          },
          t
        )),
        (o.animate_id = o.page = o.slide = 0),
        (o.arrows = {}),
        (o._opt = o.opt),
        o.opt.skipTrack)
      )
        o.track = o.ele.children[0];
      else
        for (
          o.track = document.createElement("div"), o.ele.appendChild(o.track);
          1 !== o.ele.children.length;

        )
          o.track.appendChild(o.ele.children[0]);
      o.track.classList.add("glider-track"),
        o.init(),
        (o.resize = o.init.bind(o, !0)),
        o.event(o.ele, "add", { scroll: o.updateControls.bind(o) }),
        o.event(a, "add", { resize: o.resize });
    }),
    t = e.prototype;
  return (
    (t.init = function (e, t) {
      var o,
        i = this,
        r = 0,
        s = 0,
        l =
          ((i.slides = i.track.children),
          [].forEach.call(i.slides, function (e, t) {
            e.classList.add("glider-slide"), e.setAttribute("data-gslide", t);
          }),
          (i.containerWidth = i.ele.clientWidth),
          i.settingsBreakpoint());
      (t = t || l),
        ("auto" !== i.opt.slidesToShow && void 0 === i.opt._autoSlide) ||
          ((o = i.containerWidth / i.opt.itemWidth),
          (i.opt._autoSlide = i.opt.slidesToShow =
            i.opt.exactWidth ? o : Math.max(1, Math.floor(o)))),
        "auto" === i.opt.slidesToScroll &&
          (i.opt.slidesToScroll = Math.floor(i.opt.slidesToShow)),
        (i.itemWidth = i.opt.exactWidth
          ? i.opt.itemWidth
          : i.containerWidth / i.opt.slidesToShow),
        [].forEach.call(i.slides, function (e) {
          (e.style.height = "auto"),
            (e.style.width = i.itemWidth + "px"),
            (r += i.itemWidth),
            (s = Math.max(e.offsetHeight, s));
        }),
        (i.track.style.width = r + "px"),
        (i.trackWidth = r),
        (i.isDrag = !1),
        (i.preventClick = !1),
        (i.move = !1),
        i.opt.resizeLock && i.scrollTo(i.slide * i.itemWidth, 0),
        (l || t) && (i.bindArrows(), i.buildDots(), i.bindDrag()),
        i.updateControls(),
        i.emit(e ? "refresh" : "loaded");
    }),
    (t.bindDrag = function () {
      function e() {
        (t.mouseDown = void 0),
          t.ele.classList.remove("drag"),
          t.isDrag && (t.preventClick = !0),
          (t.isDrag = !1);
      }
      var t = this;
      t.mouse = t.mouse || t.handleMouse.bind(t);
      function o() {
        t.move = !0;
      }
      var i = {
        mouseup: e,
        mouseleave: e,
        mousedown: function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            (t.mouseDown = e.clientX),
            t.ele.classList.add("drag"),
            (t.move = !1),
            setTimeout(o, 300);
        },
        touchstart: function (e) {
          t.ele.classList.add("drag"), (t.move = !1), setTimeout(o, 300);
        },
        mousemove: t.mouse,
        click: function (e) {
          t.preventClick && t.move && (e.preventDefault(), e.stopPropagation()),
            (t.preventClick = !1),
            (t.move = !1);
        },
      };
      t.ele.classList.toggle("draggable", !0 === t.opt.draggable),
        t.event(t.ele, "remove", i),
        t.opt.draggable && t.event(t.ele, "add", i);
    }),
    (t.buildDots = function () {
      var e = this;
      if (e.opt.dots) {
        if (
          ("string" == typeof e.opt.dots
            ? (e.dots = document.querySelector(e.opt.dots))
            : (e.dots = e.opt.dots),
          e.dots)
        ) {
          (e.dots.innerHTML = ""),
            e.dots.setAttribute("role", "tablist"),
            e.dots.classList.add("glider-dots");
          for (
            var t = 0;
            t < Math.ceil(e.slides.length / e.opt.slidesToShow);
            ++t
          ) {
            var o = document.createElement("button");
            (o.dataset.index = t),
              o.setAttribute("aria-label", "Page " + (t + 1)),
              o.setAttribute("role", "tab"),
              (o.className = "glider-dot " + (t ? "" : "active")),
              e.event(o, "add", { click: e.scrollItem.bind(e, t, !0) }),
              e.dots.appendChild(o);
          }
        }
      } else e.dots && (e.dots.innerHTML = "");
    }),
    (t.bindArrows = function () {
      var o = this;
      o.opt.arrows
        ? ["prev", "next"].forEach(function (e) {
            var t = o.opt.arrows[e];
            (t = t && ("string" == typeof t ? document.querySelector(t) : t)) &&
              ((t._func = t._func || o.scrollItem.bind(o, e)),
              o.event(t, "remove", { click: t._func }),
              o.event(t, "add", { click: t._func }),
              (o.arrows[e] = t));
          })
        : Object.keys(o.arrows).forEach(function (e) {
            e = o.arrows[e];
            o.event(e, "remove", { click: e._func });
          });
    }),
    (t.updateControls = function (e) {
      var n = this,
        t =
          (e && !n.opt.scrollPropagate && e.stopPropagation(),
          n.containerWidth >= n.trackWidth),
        a =
          (n.opt.rewind ||
            (n.arrows.prev &&
              (n.arrows.prev.classList.toggle(
                "disabled",
                n.ele.scrollLeft <= 0 || t
              ),
              n.arrows.prev.setAttribute(
                "aria-disabled",
                n.arrows.prev.classList.contains("disabled")
              )),
            n.arrows.next &&
              (n.arrows.next.classList.toggle(
                "disabled",
                Math.ceil(n.ele.scrollLeft + n.containerWidth) >=
                  Math.floor(n.trackWidth) || t
              ),
              n.arrows.next.setAttribute(
                "aria-disabled",
                n.arrows.next.classList.contains("disabled")
              ))),
          (n.slide = Math.round(n.ele.scrollLeft / n.itemWidth)),
          (n.page = Math.round(n.ele.scrollLeft / n.containerWidth)),
          n.slide + Math.floor(Math.floor(n.opt.slidesToShow) / 2)),
        d = Math.floor(n.opt.slidesToShow) % 2 ? 0 : a + 1;
      1 === Math.floor(n.opt.slidesToShow) && (d = 0),
        n.ele.scrollLeft + n.containerWidth >= Math.floor(n.trackWidth) &&
          (n.page = n.dots ? n.dots.children.length - 1 : 0),
        [].forEach.call(n.slides, function (e, t) {
          var o = e.classList,
            e = o.contains("visible"),
            i = n.ele.scrollLeft,
            r = n.ele.scrollLeft + n.containerWidth,
            s = n.itemWidth * t,
            l = s + n.itemWidth,
            s =
              ([].forEach.call(o, function (e) {
                /^left|right/.test(e) && o.remove(e);
              }),
              o.toggle("active", n.slide === t),
              a === t || (d && d === t)
                ? o.add("center")
                : (o.remove("center"),
                  o.add(
                    [
                      t < a ? "left" : "right",
                      Math.abs(t - ((!(t < a) && d) || a)),
                    ].join("-")
                  )),
              Math.ceil(s) >= Math.floor(i) && Math.floor(l) <= Math.ceil(r));
          o.toggle("visible", s),
            s !== e &&
              n.emit("slide-" + (s ? "visible" : "hidden"), { slide: t });
        }),
        n.dots &&
          [].forEach.call(n.dots.children, function (e, t) {
            e.classList.toggle("active", n.page === t);
          }),
        e &&
          n.opt.scrollLock &&
          (clearTimeout(n.scrollLock),
          (n.scrollLock = setTimeout(function () {
            clearTimeout(n.scrollLock),
              0.02 < Math.abs(n.ele.scrollLeft / n.itemWidth - n.slide) &&
                (n.mouseDown ||
                  (n.trackWidth > n.containerWidth + n.ele.scrollLeft &&
                    n.scrollItem(n.getCurrentSlide())));
          }, n.opt.scrollLockDelay || 250)));
    }),
    (t.getCurrentSlide = function () {
      return this.round(this.ele.scrollLeft / this.itemWidth);
    }),
    (t.scrollItem = function (e, t, o) {
      o && o.preventDefault();
      var i,
        r = this,
        s = e,
        o = (++r.animate_id, r.slide),
        l =
          !0 === t
            ? (e = Math.round((e * r.containerWidth) / r.itemWidth)) *
              r.itemWidth
            : ("string" == typeof e &&
                ((l = "prev" === e),
                (e =
                  r.opt.slidesToScroll % 1 || r.opt.slidesToShow % 1
                    ? r.getCurrentSlide()
                    : r.slide),
                l ? (e -= r.opt.slidesToScroll) : (e += r.opt.slidesToScroll),
                r.opt.rewind &&
                  ((i = r.ele.scrollLeft),
                  (e =
                    l && !i
                      ? r.slides.length
                      : !l && i + r.containerWidth >= Math.floor(r.trackWidth)
                      ? 0
                      : e))),
              (e = Math.max(Math.min(e, r.slides.length), 0)),
              (r.slide = e),
              r.itemWidth * e);
      return (
        r.emit("scroll-item", { prevSlide: o, slide: e }),
        r.scrollTo(
          l,
          r.opt.duration * Math.abs(r.ele.scrollLeft - l),
          function () {
            r.updateControls(),
              r.emit("animated", {
                value: s,
                type: "string" == typeof s ? "arrow" : t ? "dot" : "slide",
              });
          }
        ),
        !1
      );
    }),
    (t.settingsBreakpoint = function () {
      var e = this,
        t = e._opt.responsive;
      if (t) {
        t.sort(function (e, t) {
          return t.breakpoint - e.breakpoint;
        });
        for (var o = 0; o < t.length; ++o) {
          var i = t[o];
          if (a.innerWidth >= i.breakpoint)
            return (
              e.breakpoint !== i.breakpoint &&
              ((e.opt = Object.assign({}, e._opt, i.settings)),
              (e.breakpoint = i.breakpoint),
              !0)
            );
        }
      }
      var r = 0 !== e.breakpoint;
      return (e.opt = Object.assign({}, e._opt)), (e.breakpoint = 0), r;
    }),
    (t.scrollTo = function (t, o, i) {
      var r = this,
        s = new Date().getTime(),
        l = r.animate_id,
        n = function () {
          var e = new Date().getTime() - s;
          (r.ele.scrollLeft =
            r.ele.scrollLeft +
            (t - r.ele.scrollLeft) * r.opt.easing(0, e, 0, 1, o)),
            e < o && l === r.animate_id
              ? a.requestAnimationFrame(n)
              : ((r.ele.scrollLeft = t), i && i.call(r));
        };
      a.requestAnimationFrame(n);
    }),
    (t.removeItem = function (e) {
      var t = this;
      t.slides.length &&
        (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit("remove"));
    }),
    (t.addItem = function (e) {
      this.track.appendChild(e), this.refresh(!0), this.emit("add");
    }),
    (t.handleMouse = function (e) {
      var t = this;
      t.mouseDown &&
        ((t.isDrag = !0),
        (t.ele.scrollLeft +=
          (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3)),
        (t.mouseDown = e.clientX));
    }),
    (t.round = function (e) {
      var t = 1 / (this.opt.slidesToScroll % 1 || 1);
      return Math.round(e * t) / t;
    }),
    (t.refresh = function (e) {
      this.init(!0, e);
    }),
    (t.setOption = function (t, e) {
      var o = this;
      o.breakpoint && !e
        ? o._opt.responsive.forEach(function (e) {
            e.breakpoint === o.breakpoint &&
              (e.settings = Object.assign({}, e.settings, t));
          })
        : (o._opt = Object.assign({}, o._opt, t)),
        (o.breakpoint = 0),
        o.settingsBreakpoint();
    }),
    (t.destroy = function () {
      function e(t) {
        t.removeAttribute("style"),
          [].forEach.call(t.classList, function (e) {
            /^glider/.test(e) && t.classList.remove(e);
          });
      }
      var t = this,
        o = t.ele.cloneNode(!0);
      t.opt.skipTrack || (o.children[0].outerHTML = o.children[0].innerHTML),
        e(o),
        [].forEach.call(o.getElementsByTagName("*"), e),
        t.ele.parentNode.replaceChild(o, t.ele),
        t.event(a, "remove", { resize: t.resize }),
        t.emit("destroy");
    }),
    (t.emit = function (e, t) {
      e = new a.CustomEvent("glider-" + e, {
        bubbles: !this.opt.eventPropagate,
        detail: t,
      });
      this.ele.dispatchEvent(e);
    }),
    (t.event = function (e, t, o) {
      var i = e[t + "EventListener"].bind(e);
      Object.keys(o).forEach(function (e) {
        i(e, o[e]);
      });
    }),
    e
  );
});

/*========================================================================================
									    APP LOADER
========================================================================================*/
var OSpro = typeof OSpro === "undefined" ? false : OSpro;
var edgeTitleUser = false; // Fixes a problem with Edge brower and iframes
var intHeight = 0;
var intWidth = 0;

function OSloadApp() {
  var loadThis;
  var loadType = "canvas";
  var quality = "";
  var loadWhat = "";

  OSapp.desktop = !isMobile.any;

  if (OScanvasSupport()) {
    loadThis = OSapp.vector;

    if (OSapp.desktop) {
      quality = "";
    } else {
      quality = "";
    }
    if (OSapp.desktop && window.devicePixelRatio > 1) {
      quality = "";
    }
    if (window.console) {
      //console.log("App Quality: " + quality);
    }
  } else {
    if (swfobject.hasFlashPlayerVersion("6.0.0") && OSapp.flash != "") {
      loadType = "flash";
      if (window.console) {
        //console.log("Flash File: " + OSapp.flash);
      }

      $("#Online-Stopwatch").html(
        '<iframe title="Online-Stopwatch" name="fullframe" id="fullframe"></div>'
      );
      newSize = osGetBestSize();
      swfobject.embedSWF(
        "/swf/" + OSapp.flash,
        "fullframe",
        newSize.width,
        newSize.height,
        "6.0.0",
        false
      );
    } else {
      if (window.console) {
        //console.log("No Flash Player");
      }
      loadType = "canvas";
      loadThis = "noflash.html";
    }
  }

  if (loadType == "canvas") {
    if (document.getElementById("Online-Stopwatch")) {
      newSize = osGetBestSize();

      if (OSapp.appType !== "holiday") {
        $("#Online-Stopwatch").html(
          '<iframe title="Online-Stopwatch" id="fullframe" name="fullframe" src="' +
            loadThis +
            quality +
            '" allow="autoplay" width="' +
            newSize.width +
            '" height="' +
            newSize.height +
            '" scrolling="no" frameborder="0"></iframe>'
        );
      } else {
        // Load a Holiday Timer into the page...

        $("#Online-Stopwatch").html(
          '<iframe title="Online-Stopwatch" id="fullframe" name="fullframe" src="/html5/timers/date-timer/" allow="autoplay" width="' +
            newSize.width +
            '" height="' +
            newSize.height +
            '" scrolling="no" frameborder="0"></iframe>'
        );

        $("#fullframe").on("load", function () {
          $.getScript(
            "https://cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"
          ).done(function (script, textStatus) {
            var justfile = loadThis.substring(0, loadThis.indexOf("?"));

            $.ajax({
              type: "POST",
              url: "/js/date-timer.php",
              data: { timerURL: justfile, timezone: jstz.determine().name() },
            }).done(function (data) {
              data = JSON.parse(data);
              document
                .getElementById("fullframe")
                .contentWindow.loadTimer(
                  data["title"],
                  data["text"],
                  data["frame"],
                  data["animation"],
                  data["date"],
                  data["todayIs"],
                  data["seconds"],
                  data["offset"]
                );
            });
          });
        });
      }
    } else {
      if (window.console) {
        //console.log("The Stopwatch ID is not on page!");
      }
    }
  }
}
/*========================================================================================
========================================================================================*/

/*========================================================================================
							    Shared App Functions
========================================================================================*/
// Check if browser supports Canvas
function OScanvasSupport() {
  var elem = document.createElement("canvas");
  return !!(elem.getContext && elem.getContext('2d', { willReadFrequently: true }));
}

// Pass Hash Variables to the timers
function giveHash(callBack) {
  if (callBack.type != "hashchange") giveHash.callBack = callBack;
  giveHash.callBack(location.hash);
}
// Pass Key Presses to the timers
function giveKey(callback) {
  document.addEventListener("keydown", keyboardEventHandler, false);
  function keyboardEventHandler(e) {
    callback(e);
  }
}

//=============================== Premium Drag the Title bar up and down
$(document).on("mousedown", "#dragbar", function (e) {
  e.preventDefault();

  $("#Online-Stopwatch").prepend('<div id="totalCover"></div>');

  dragging = true;

  var ghostbar = $("<div>", { id: "ghostbar", css: { top: e.pageY } }).appendTo(
    "#Online-Stopwatch"
  );

  $(document).mousemove(function (e) {
    ghostbar.css("top", e.pageY);
  });

  $("*").mouseup(function (e) {
    e.stopPropagation();

    if (dragging) {
      $("*").unbind("mouseup");
      $(document).unbind("mousemove");
      $("#totalCover").remove();
      $("#ghostbar").remove();

      if (OSisFullscreen) {
        // Fullscreen uses % percentages
        var topBarHeight = e.pageY * window.devicePixelRatio;
        var windowHeight = $(window).height() * window.devicePixelRatio;

        var barPecent = (topBarHeight / windowHeight) * 100;

        $("#topTitle").css("height", barPecent + "%");
        $("#fullframe").css("height", 100 + barPecent + "%");

        $("#fullframe")
          .promise()
          .done(function () {
            resizeCanvas();
          });

        setTimeout(function () {
          resizeCanvas();
        }, 50);
      } else {
        // Normal screen uses px
        var x = $(".topTitle").offset();
        x = e.pageY - x.top;
        $(".topTitle").css("height", x + "px");
        var percentage = (e.pageX / window.innerWidth) * 100;
        var mainPercentage = 100 - percentage;
        osScaleApp();
        $("#titletext").bigTxt({ responsive: false, percentage: 90 });
        dragging = false;
      }
      dragging = false;
    }
  });
});

function resizeCanvas() {
  var tmpHeight = parseFloat(OSapp.height, 10);
  var tmpWidth = parseFloat(OSapp.width, 10);

  var w = tmpWidth,
    h = tmpHeight;
  var iw = window.innerWidth,
    ih = window.innerHeight - document.getElementById("topTitle").offsetHeight;

  var pRatio = window.devicePixelRatio || 1,
    xRatio = iw / w,
    yRatio = ih / h,
    sRatio = 1;

  sRatio = Math.min(xRatio, yRatio);
  window.frames["fullframe"].canvas.width = w * pRatio * sRatio;
  window.frames["fullframe"].canvas.height = h * pRatio * sRatio;
  window.frames["fullframe"].canvas.style.width =
    window.frames["fullframe"].dom_overlay_container.style.width =
    window.frames["fullframe"].anim_container.style.width =
      w * sRatio + "px";
  window.frames["fullframe"].canvas.style.height =
    window.frames["fullframe"].anim_container.style.height =
    window.frames["fullframe"].dom_overlay_container.style.height =
      h * sRatio + "px";
  window.frames["fullframe"].stage.scaleX = pRatio * sRatio;
  window.frames["fullframe"].stage.scaleY = pRatio * sRatio;
  window.frames["fullframe"].stage.tickOnUpdate = false;
  window.frames["fullframe"].stage.update();
  window.frames["fullframe"].stage.tickOnUpdate = true;

  $("#titletext").bigTxt({ responsive: false, percentage: 90 });
}

//=======================================================================

//====================================================== Premium Add a title to the page
$(document).on(
  "propertychange change click keyup input paste",
  "#os-opt-title",
  function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!$(".littleExplain").is(":visible")) {
      $(".littleExplain").show();
    }

    if ($(this).val() != "") {
      if ($("#topTitle").length == 0) {
        $("#Online-Stopwatch").prepend(
          '<div id="topTitle" class="topTitle ad"><div id="titletext">Test</div></div><div id="dragbar"></div><div class="littleExplain">Drag Up and Down to resize the Title!</div>'
        );

        $(".fullscreenhead").addClass("titleAdded");
      }

      $("#titletext").html($(this).val());
      osScaleApp();
      $("#titletext").bigTxt({ responsive: false, percentage: 90 });
    } else {
      $("#topTitle").remove();
      $("#dragbar").remove();
      $(".littleExplain").remove();
      $(".fullscreenhead").removeClass("titleAdded");
      osScaleApp();
    }
  }
);

$(document).on("blur", "#os-opt-title", function (e) {
  $(".littleExplain").fadeOut();
});
//=======================================================================

//=============================== Super Full-screen mode
!(function () {
  "use strict";
  var u =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    e = "undefined" != typeof module && module.exports,
    t = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
    c = (function () {
      for (
        var e,
          n = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          r = 0,
          l = n.length,
          t = {};
        r < l;
        r++
      )
        if ((e = n[r]) && e[1] in u) {
          for (r = 0; r < e.length; r++) t[n[0][r]] = e[r];
          return t;
        }
      return !1;
    })(),
    l = { change: c.fullscreenchange, error: c.fullscreenerror },
    n = {
      request: function (l) {
        return new Promise(
          function (e) {
            var n = c.requestFullscreen,
              r = function () {
                this.off("change", r), e();
              }.bind(this);
            (l = l || u.documentElement),
              / Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)
                ? l[n]()
                : l[n](t ? Element.ALLOW_KEYBOARD_INPUT : {}),
              this.on("change", r);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (e) {
            var n = function () {
              this.off("change", n), e();
            }.bind(this);
            u[c.exitFullscreen](), this.on("change", n);
          }.bind(this)
        );
      },
      toggle: function (e) {
        return this.isFullscreen ? this.exit() : this.request(e);
      },
      onchange: function (e) {
        this.on("change", e);
      },
      onerror: function (e) {
        this.on("error", e);
      },
      on: function (e, n) {
        var r = l[e];
        r && u.addEventListener(r, n, !1);
      },
      off: function (e, n) {
        var r = l[e];
        r && u.removeEventListener(r, n, !1);
      },
      raw: c,
    };
  c
    ? (Object.defineProperties(n, {
        isFullscreen: {
          get: function () {
            return Boolean(u[c.fullscreenElement]);
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return u[c.fullscreenElement];
          },
        },
        enabled: {
          enumerable: !0,
          get: function () {
            return Boolean(u[c.fullscreenEnabled]);
          },
        },
      }),
      e ? (module.exports = n) : (window.screenfull = n))
    : e
    ? (module.exports = !1)
    : (window.screenfull = !1);
})();
//=======================================================

//=============================== IE11 Promise
!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n()
    : "function" == typeof define && define.amd
    ? define(n)
    : n();
})(0, function () {
  "use strict";
  function e(e) {
    var n = this.constructor;
    return this.then(
      function (t) {
        return n.resolve(e()).then(function () {
          return t;
        });
      },
      function (t) {
        return n.resolve(e()).then(function () {
          return n.reject(t);
        });
      }
    );
  }
  function n() {}
  function t(e) {
    if (!(this instanceof t))
      throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    (this._state = 0),
      (this._handled = !1),
      (this._value = undefined),
      (this._deferreds = []),
      u(e, this);
  }
  function o(e, n) {
    for (; 3 === e._state; ) e = e._value;
    0 !== e._state
      ? ((e._handled = !0),
        t._immediateFn(function () {
          var t = 1 === e._state ? n.onFulfilled : n.onRejected;
          if (null !== t) {
            var o;
            try {
              o = t(e._value);
            } catch (f) {
              return void i(n.promise, f);
            }
            r(n.promise, o);
          } else (1 === e._state ? r : i)(n.promise, e._value);
        }))
      : e._deferreds.push(n);
  }
  function r(e, n) {
    try {
      if (n === e)
        throw new TypeError("A promise cannot be resolved with itself.");
      if (n && ("object" == typeof n || "function" == typeof n)) {
        var o = n.then;
        if (n instanceof t) return (e._state = 3), (e._value = n), void f(e);
        if ("function" == typeof o)
          return void u(
            (function (e, n) {
              return function () {
                e.apply(n, arguments);
              };
            })(o, n),
            e
          );
      }
      (e._state = 1), (e._value = n), f(e);
    } catch (r) {
      i(e, r);
    }
  }
  function i(e, n) {
    (e._state = 2), (e._value = n), f(e);
  }
  function f(e) {
    2 === e._state &&
      0 === e._deferreds.length &&
      t._immediateFn(function () {
        e._handled || t._unhandledRejectionFn(e._value);
      });
    for (var n = 0, r = e._deferreds.length; r > n; n++) o(e, e._deferreds[n]);
    e._deferreds = null;
  }
  function u(e, n) {
    var t = !1;
    try {
      e(
        function (e) {
          t || ((t = !0), r(n, e));
        },
        function (e) {
          t || ((t = !0), i(n, e));
        }
      );
    } catch (o) {
      if (t) return;
      (t = !0), i(n, o);
    }
  }
  var c = setTimeout;
  (t.prototype["catch"] = function (e) {
    return this.then(null, e);
  }),
    (t.prototype.then = function (e, t) {
      var r = new this.constructor(n);
      return (
        o(
          this,
          new (function (e, n, t) {
            (this.onFulfilled = "function" == typeof e ? e : null),
              (this.onRejected = "function" == typeof n ? n : null),
              (this.promise = t);
          })(e, t, r)
        ),
        r
      );
    }),
    (t.prototype["finally"] = e),
    (t.all = function (e) {
      return new t(function (n, t) {
        function o(e, f) {
          try {
            if (f && ("object" == typeof f || "function" == typeof f)) {
              var u = f.then;
              if ("function" == typeof u)
                return void u.call(
                  f,
                  function (n) {
                    o(e, n);
                  },
                  t
                );
            }
            (r[e] = f), 0 == --i && n(r);
          } catch (c) {
            t(c);
          }
        }
        if (!e || "undefined" == typeof e.length)
          throw new TypeError("Promise.all accepts an array");
        var r = Array.prototype.slice.call(e);
        if (0 === r.length) return n([]);
        for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f]);
      });
    }),
    (t.resolve = function (e) {
      return e && "object" == typeof e && e.constructor === t
        ? e
        : new t(function (n) {
            n(e);
          });
    }),
    (t.reject = function (e) {
      return new t(function (n, t) {
        t(e);
      });
    }),
    (t.race = function (e) {
      return new t(function (n, t) {
        for (var o = 0, r = e.length; r > o; o++) e[o].then(n, t);
      });
    }),
    (t._immediateFn =
      ("function" == typeof setImmediate &&
        function (e) {
          setImmediate(e);
        }) ||
      function (e) {
        c(e, 0);
      }),
    (t._unhandledRejectionFn = function (e) {
      void 0 !== console &&
        console &&
        console.warn("Possible Unhandled Promise Rejection:", e);
    });
  var l = (function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw Error("unable to locate global object");
  })();
  "Promise" in l
    ? l.Promise.prototype["finally"] || (l.Promise.prototype["finally"] = e)
    : (l.Promise = t);
});
//===========================================

if (screenfull.enabled) {
  screenfull.on("change", fullscreenchange);
}

function fullscreenchange() {
  //if(edgeTitleUser != true){
  if (screenfull.isFullscreen) {
    // Full Screen ON
    $(window).scrollTop(0);
    $("#Online-Stopwatch").addClass("iframefullScreen");
    $("body").css("overflow", "hidden");
    OSisFullscreen = true;

    // Page has a premium title - add it
    if ($("#topTitle").length) {
      $("#Online-Stopwatch").addClass("iframefullScreen");
      $("#Online-Stopwatch").css("text-align", "left");

      $("#topTitle").css("text-align", "center");

      $("#fullframe").width("100%");
      $("#fullframe")[0].setAttribute("width", "100%");

      $("#topTitle").css("position", "absolute");

      $("#dragbar").remove();

      $("#fullframe").css("width", "100%");
      $("#fullframe").css("position", "absolute");

      var topBarHeight = $("#topTitle").height() * window.devicePixelRatio;
      var windowHeight = $(window).height() * window.devicePixelRatio;
      var barPecent = (topBarHeight / windowHeight) * 100;

      $("#topTitle").css("height", barPecent + "%");
      $("#fullframe").css("height", 100 + barPecent + "%");

      $("#topTitle").prepend('<div id="dragbar" class="dragbarSick"></div>');

      //$('#topTitle').css('height',barPecent + '%');
      //$('#fullframe').css('height',(100 + barPecent) + '%');

      $("#fullframe")
        .promise()
        .done(function () {
          setTimeout(function () {
            resizeCanvas();
          }, 100);
        });
    }
  } else {
    // Full Screen OFF
    //console.log("FULL SCREEN OFF");
    $("#Online-Stopwatch").removeClass("iframefullScreen");
    $("body").css("overflow", "auto");
    $("#fullframe").css("position", "static");

    // Page has a premium title - remove it
    if ($("#topTitle").length > 0) {
      $("#Online-Stopwatch").css("text-align", "center");
      $("#topTitle").css("position", "relative");
      $("#dragbar").remove();
      $("#fullframe").css("position", "relative");
      $("#fullframe").css("height", $("#fullframe").height() + "px");

      $("#topTitle").css("height", $("#topTitle").height() + "px");
      $("#topTitle").after('<div id="dragbar"></div>');
    }

    OSisFullscreen = false;
  }
  osScaleApp();
  //}
}

// Launch a timer into iFrame fullscreen!
var OSisFullscreen = false;
function OSfullscreen() {
  if (screenfull.enabled) {
    screenfull.toggle(document.getElementById("Online-Stopwatch"));
  } else {
    $("#Online-Stopwatch").css("position", "absolute");
    $("#Online-Stopwatch").css("left", "0px");
    $("#Online-Stopwatch").css("top", "0px");
    $("#Online-Stopwatch").css("width", "100%");
    $("#Online-Stopwatch").css("height", "100%");
    $("#Online-Stopwatch").css("z-index", "999999");
    $("#Online-Stopwatch").css("background-color", "#FFF");

    $("#fullframe")[0].setAttribute("width", "100%");
    $("#fullframe").css("width", "100%");

    $("#fullframe").css("height", "100%");
    $("#fullframe")[0].setAttribute("height", "100%");
    OSisFullscreen = true;
  }
}
// Resize Calculations
function osGetBestSize() {
  var tmpHeight = parseFloat(OSapp.height, 10);
  var tmpWidth = parseFloat(OSapp.width, 10);
  var frameWidth = $(window).innerWidth();
  var frameHeight = $(window).innerHeight();
  var adHeight = 0;
  if (OSapp.fullscreen != "true") {
    // Framed app
    if (parseFloat(tmpWidth, 10) > frameWidth) {
      tmpWidth = frameWidth;

      tmpHeight = (frameWidth / parseFloat(OSapp.width, 10)) * tmpHeight;
    }
  } else {
    if ($(".ad").length) {
      if (OSisFullscreen == false) {
        $(".ad").each(function (index) {
          adHeight += $(this).outerHeight(true);
        });
        adHeight += 20; // Fix a slight window height bug
      } else {
        if ($(".topTitle").length) {
          adHeight = $(".topTitle").outerHeight(true);
          adHeight += 20; // Fix a slight window height bug
        }
      }
    }

    frameHeight = frameHeight - adHeight;

    tmpWidth = (frameHeight / tmpHeight) * tmpWidth;
    tmpHeight = frameHeight;

    if (tmpWidth > frameWidth) {
      // Too Wide - scale by width
      tmpHeight = (frameWidth / tmpWidth) * tmpHeight;
      tmpWidth = frameWidth;
    }
  }

  return { width: tmpWidth + "px", height: tmpHeight + "px" };
}
// Resize App
function osScaleApp() {
  if ($("#fullframe").length) {
    var newSize = osGetBestSize();

    if (OSisFullscreen == true || OSpro === true) {
      $("#fullframe")[0].setAttribute("width", "100%");
      $("#fullframe").css("width", "100%");
    } else {
      //console.log("WIDTH "+ parseFloat(OSapp.width,10));

      if ($(window).innerWidth() < parseFloat(OSapp.width, 10)) {
        if ($(window).innerWidth() > $(window).innerHeight()) {
          newSize.width = parseInt(newSize.width, 10);
          newSize.width -= newSize.width * 0.1;
          newSize.width += "px";
          //console.log("SMALLER " + newSize.width);
        }
      } else {
        //console.log("Bigger " + newSize.width);
      }

      $("#fullframe").width(newSize.width);
      $("#fullframe")[0].setAttribute("width", newSize.width);
    }

    if ($("#topTitle").length && OSisFullscreen) {
    } else {
      $("#fullframe").height(newSize.height);
      $("#fullframe")[0].setAttribute("height", newSize.height);
    }

    fullScreenAdPosition();
  }
}

var fullAdInit;
function fullScreenAdPosition() {
  if ($("#os_afl").length) {
    if (fullAdInit == null) {
      fullAdInit = $("#os_afl").offset().top;
      console.log("INIT SET", fullAdInit);
    }

    // Hide ads if they overlap on fullscreen pages

    if ($("#os_afl").outerWidth() > $("#fullframe").offset().left - 60) {
      $("#os_afl, #os_afr").addClass("pub_hide");
    } else {
      $("#os_afl, #os_afr").removeClass("pub_hide");
    }

    var $div = $("#os_afl");
    var viewportHeight = $(window).height();
    var adjustedHeight = viewportHeight - 40;

    var topPosition = (adjustedHeight - $div.outerHeight()) / 2;

    if (topPosition <= 0) {
      $(".publift_fullscreen_float").css({
        position: "fixed",
        top: "40px",
        transform: "none",
        bottom: "auto",
      });
    } else {
      $(".publift_fullscreen_float").css({
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      });
    }
  }
}

// Stop Spacebar from Scrolling Page
window.onkeydown = function (e) {
  return !(e.keyCode == 32 && e.target == document.body);
};
// Get URL Parameters
if ((window.location + "").indexOf("?") !== -1) {
  for (
    var osURLvar = {},
      osi = 0,
      tmpArr = window.location.search.substring(1).split("&");
    osi < tmpArr.length;
    osv = tmpArr[osi++].split("="), osURLvar[osv[0]] = osv[1]
  ) {}
}
/*========================================================================================
========================================================================================*/

/*========================================================================================
									   Lets Go!
========================================================================================*/
/*
var osLoadApp = setInterval(function() {
 if ($('#Online-Stopwatch').length) {
    clearInterval(osLoadApp);
	if(typeof OSapp !== 'undefined'){
		if(OSapp != ''){
			OSloadApp();
			// Resize App iframe to make it fit page
			$( window ).resize(function() {
				osScaleApp()
			});
			osScaleApp();
		}		
	}
 }
}, 100);
*/

var swfa = "full" + Math.floor(Math.random() * 1000);

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var youtubeLink =
  "<iframe src='https://www.youtube-nocookie.com/embed/{code}?rel=0&amp;showinfo=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen class='video'></iframe>";

$(window).on("load", function () {
  fullScreenAdPosition();
});

$(document).ready(function () {
  // Hide menu rollover - and replace with our own
  //var a=document.getElementById("menu");if(null!=a)for(var a=a.getElementsByTagName("a"),b=a.length;0<b;)a[--b].title="";

  $(".toplinks, .menulinks")
    .find("a")
    .each(function () {
      $(this).attr("title", "");
    });

  OSpro = typeof OSpro === "undefined" ? false : OSpro;

  if (typeof OSapp !== "undefined") {
    if (OSapp != "") {
      OSloadApp();
      // Resize App iframe to make it fit page
      $(window).resize(function () {
        osScaleApp();
      });
      osScaleApp();
    }
  }

  // Allow an App to go Super Full Screen! Yes!

  $(document).on("click", "#osFullscreenLaunch", function (event) {
    event.preventDefault();
    OSfullscreen();
  });

  // Click Dropdown boxes for site settings:

  $(".dropbox").click(function () {
    var curDrop = this;

    $(".youtubePreview").html("");

    if ($(this).parent().find(".youtubePreview").length > 0) {
      var found = $(this).parent().find(".youtubePreview");
      found.html(youtubeLink.replace("{code}", found.data("yt-url")));
    }

    var dropGroup = $(this).data("dropgroup");

    if ($(this).parent().parent().hasClass("expand")) {
      if ($(this).next().is(":hidden")) {
        $(this).parent().parent().css("max-width", "4000px");
      } else {
        $(this).parent().parent().css("max-width", "1000px");
      }
    }

    $(this).next().toggle();

    // Check if the element is now hidden after toggle
    if ($(this).next().is(":hidden")) {
      $(curDrop).removeClass("flip-image");
      $(curDrop).children(".titleInner").removeClass("flip-image");
    } else {
      $(curDrop).addClass("flip-image");
      $(curDrop).children(".titleInner").addClass("flip-image");
    }

    if (dropGroup != null) {
      // Part of a group
      $(".dropbox[data-dropgroup|=" + dropGroup + "]").each(function () {
        $(this).not(curDrop).next().hide();
        $(this).not(curDrop).removeClass("flip-image");
        $(this).not(curDrop).children(".titleInner").removeClass("flip-image");
      });

      // change the hash to the new tab:
      if ($(this).parent().parent().attr("id")) {
        window.history.replaceState(
          null,
          null,
          "#" + $(this).parent().parent().attr("id")
        );
      }
    }

    // Call osScaleApp if OSpro is true
    if (window.OSpro === true) {
      osScaleApp();
    }
  });

  /*
	$( ".dropbox" ).click(function() {
		var curDrop = this;
		
		
		
		$(".youtubePreview").html("");
		
		if($(this).parent().find(".youtubePreview").length > 0){
			
			var found = $(this).parent().find(".youtubePreview");
		
			found.html(youtubeLink.replace("{code}", found.data("yt-url")));
		
		}		
		
		
		var dropGroup = $(this).data("dropgroup");

		if($(this).parent().parent().hasClass("expand")){

			if($(this).next().is(":hidden")){
				$(this).parent().parent().animate({
				"max-width": "4000px",
				}, {queue: false });		

			}else{

				$(this).parent().parent().animate({
				"max-width": "1000px",
				}, {queue: false });			

			}
		}

		$(this).next().slideToggle({
			progress: function () {
			  if(OSpro == true){
				  osScaleApp();
			  }
			},
			complete: function () {
				
			  if (dropGroup != null){
						// Part of a group
						$(".dropbox[data-dropgroup|=" + dropGroup + "]").each(function(){
							$(this).not(curDrop).next().find(".dropbox").next().hide();
							$(this).not(curDrop).next().find(".dropbox").removeClass("flip-image");
							$(this).not(curDrop).next().find(".dropbox").children(".titleInner").removeClass("flip-image");	
						});
			  }				
				
			  if($(this).is(":hidden")){
				  $(curDrop).removeClass("flip-image");
				  $(curDrop).children(".titleInner").removeClass("flip-image");
			  }else{
				   $(curDrop).addClass("flip-image");
				   $(curDrop).children(".titleInner").addClass("flip-image");
			  }
			  if(OSpro == true){
				  osScaleApp();
			  }			  
			}
		 });
		 
		if (dropGroup != null){
			// Part of a group
			$(".dropbox[data-dropgroup|=" + dropGroup + "]").each(function(){
				$(this).not(curDrop).next().slideUp();
				$(this).not(curDrop).removeClass("flip-image");
				$(this).not(curDrop).children(".titleInner").removeClass("flip-image");
			});
			
			// change the hash to the new tab:
			
			if($(this).parent().parent().attr("id")){
				window.history.replaceState(null, null, '#' + $(this).parent().parent().attr("id"));
			}
			
			 
			
		}
		
 
	});	
	*/
  // Settings box
  if (osURLvar) {
    if (osURLvar.countdown) {
      var osrcntdwn = osURLvar.countdown.split(":");
      $("#os-opt-hh").val(osrcntdwn[0]);
      $("#os-opt-mm").val(osrcntdwn[1]);
      $("#os-opt-ss").val(osrcntdwn[2]);
    }
    if (osURLvar.ns) {
      $("#os-opt-sound").val(osURLvar.ns);
    }
    if (osURLvar.nslen) {
      $("#os-opt-loop").val(osURLvar.nslen);
    }
    if (osURLvar.widescreen) {
      $("#os-opt-widescreen").prop("checked", false);
    }
    if (osURLvar.display) {
      $("#os-opt-display").val(osURLvar.display);
    }

    if (osURLvar.autoplay) {
      $("#os-opt-autostart").prop("checked", true);
    }
  }

  $("#os-opt-set").click(function (e) {
    e.preventDefault();

    var optset = buildTimerLink();

    if (optset.query != "") {
      window.location.href = optset.query;
    }
  });

  // Boxes with sliding lists
  if ($(".osSlider").length) {
    $(".osSlider").lightSlider({
      item: 5,
      loop: true,
      keyPress: false,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            item: 4,
          },
        },
        {
          breakpoint: 955,
          settings: {
            item: 3,
          },
        },
      ],
      onSliderLoad: function (el) {
        el.removeClass("osSlider-hidden");
      },
    });
  }

  if (document.querySelector(".glider")) {
    document.querySelectorAll(".glider").forEach((gliderElement) => {
      new Glider(gliderElement, {
        slidesToShow: 5,
        draggable: true,
        dots: ".dots",
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next",
        },
      });
    });
  }

  // -- If a page has a premium title...
  if ($("#titletext").length) {
    $("#titletext").bigTxt({ responsive: false, percentage: 90 });
    $(window).resize(function () {
      $("#titletext").bigTxt({ responsive: false, percentage: 90 });
    });
  }

  // -- Make the header menu appear on mobile devices...
  $(".head4").click(function () {
    //$('.header-menu').slideToggle('slow');
    $(".header-menu").toggle();
  });

  //=============== checker...
  if (OSpro !== true) {
    if (!isMobile.any) {
      try {
        fetch(
          new Request(
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
            {
              method: "HEAD",
              mode: "no-cors",
            }
          )
        )["catch"](function (error) {
          window[swfa]();
        });
      } catch (e) {
        window[swfa]();
      }
    }
  }

  $(document).on("click", ".cbarrowbox", function (event) {
    event.preventDefault();

    $(this).closest(".publift-float").hide();
    $(this).closest(".publift-float").addClass("closed");
  });

  function stickyCheck() {
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition >= initialTop) {
      $(".sticky-float").css({
        position: "fixed",
        top: "10px",
      });
    } else {
      $(".sticky-float").css({
        position: "absolute",
        top: "0px",
      });
    }
  }

  if ($(".sticky-float").length) {
    var initialTop = $(".sticky-float").offset().top;

    // Initial check
    stickyCheck();

    // On scroll
    $(window).on("scroll", stickyCheck);
  }

  jsConfetti = new JSConfetti();
});

window[swfa] = function () {
  var orig = window.location.href.split("/");
  url = orig[orig.length - 2];
  var url2 = "stopwatch" + Math.floor(Math.random() * 1000);

  if (url === "premium") {
    return;
  }

  if (url === "full-screen") {
    url = orig[orig.length - 3];
  }

  var n = Math.random();

  var a = between(720, 720 + 8);
  var b = between(100, 1000);
  var c = a + "." + b;

  $(".box.grunge:first").after(
    '<a href="https://www.online-stopwatch.com/premium/"><img id="' +
      n +
      '" src="/files/images/wantmore/' +
      url +
      '.jpg" alt="Join Premium" width="' +
      c +
      '"></a>'
  );

  $("#ad").append(
    '<a id="ourOSPremium" href="https://www.online-stopwatch.com/premium/"><img id="' +
      n +
      '" src="/files/images/wantmore/' +
      url +
      '.jpg" alt="Join Premium" width="' +
      c +
      '"></a>'
  );

  osScaleApp();
};

function buildTimerLink() {
  var optset = "";
  var obj = { query: "", time: "" };

  var hh = $("#os-opt-hh").val();
  var mm = $("#os-opt-mm").val();
  var ss = $("#os-opt-ss").val();

  var snd = $("#os-opt-sound").val();
  var loop = $("#os-opt-loop").val();
  var autostart = $("#os-opt-autostart").is(":checked");

  var display = $("#os-opt-display").val();
  var widescreen = $("#os-opt-widescreen").is(":checked");

  var timerTitle = $("#os-opt-title").val();

  var altTimerTitle = "";
  var needSpace = "";

  if (hh != "00" || mm != "00" || ss != "00") {
    optset = "?countdown=" + hh + ":" + mm + ":" + ss;
    obj.time = hh + ":" + mm + ":" + ss;
  }

  if (snd != "d") {
    if (optset == "") {
      optset = "?ns=" + snd;
    } else {
      optset += "&ns=" + snd;
    }
    altTimerTitle = $("#os-opt-sound :selected").text();
  }
  if (loop != "d") {
    if (optset == "") {
      optset = "?nslen=" + loop;
    } else {
      optset += "&nslen=" + loop;
    }

    if (altTimerTitle != "") {
      needSpace = " ";
    }

    altTimerTitle += needSpace + $("#os-opt-loop :selected").text();
    needSpace = "";
  }
  if (autostart) {
    if (optset == "") {
      optset = "?autoplay=true";
    } else {
      optset += "&autoplay=true";
    }

    if (altTimerTitle != "") {
      needSpace = " ";
    }

    altTimerTitle += needSpace + "Auto Start";
    needSpace = "";
  }

  if ($("#os-opt-widescreen").length) {
    if (!widescreen) {
      if (optset == "") {
        optset = "?widescreen=false";
      } else {
        optset += "&widescreen=false";
      }
    }
  }

  if ($("#os-opt-display").length) {
    if (display != "d") {
      if (optset == "") {
        optset = "?display=" + $("#os-opt-display").val();
      } else {
        optset += "&display=" + $("#os-opt-display").val();
      }
    }
  }

  if ($("#os-opt-title").length === 0) {
    timerTitle = "";
  }

  if (timerTitle == "") {
    timerTitle = altTimerTitle;
  } else {
    if (optset == "") {
      optset = "?title=" + encodeURIComponent(timerTitle);
    } else {
      optset += "&title=" + encodeURIComponent(timerTitle);
    }

    obj.justTitle = timerTitle;
  }

  if (obj.time != "") {
    if (timerTitle == "") {
      timerTitle = obj.time + " timer";
    } else {
      timerTitle = timerTitle + " (" + obj.time + ")";
    }
  }

  obj.title = timerTitle;
  obj.query = optset;

  return obj;
}
/*========================================================================================
========================================================================================*/

/*========================================================================================
									   Photo Page
========================================================================================*/
var resizingThis = "iframe";

function resizeFrame() {
  if (resizingThis == "iframe") {
    var pct = 95;
    var winWidth = $(window).width();

    var nwidth = (winWidth / 100) * pct;
    $(".featherlight-inner").css("width", nwidth + "px");
    setTimeout(function () {
      var nheight = $(".featherlight-inner")
        .contents()
        .find("#fullHeight")
        .outerHeight(true);
      $(".featherlight-inner")
        .css("width", nwidth + "px")
        .css("height", nheight + "px");
    }, 50);
  }

  if (resizingThis == "add") {
    var nwidth = $(".featherlight-inner")
      .contents()
      .find("#addp")
      .outerWidth(true);
    var nheight;
    $(".featherlight-inner").css("width", nwidth + "px");
    setTimeout(function () {
      nheight = $(".featherlight-inner")
        .contents()
        .find("#addp")
        .outerHeight(true);
      $(".featherlight-inner")
        .css("width", nwidth + "px")
        .css("height", nheight + "px");
    }, 50);
  }
}

function cogCall() {
  var nwidth = ($(window).width() / 100) * 80;

  if ($.featherlight.current() == null) {
    $.featherlight({
      iframe: "/pages/photo-save-message.php",
      iframeWidth: nwidth,
      closeOnEsc: false,
      closeOnClick: false,
      closeTrigger: "closeMe",
      loading: "Please Wait...",
      closeIcon: "",
      onResize: function (event) {
        resizeFrame();
      },
    });
  }
}
function resizeWhat(t) {
  resizingThis = t;
  resizeFrame();
}
/*========================================================================================
========================================================================================*/

/*========================================================================================
									 Export Screenshot
========================================================================================*/
function exportToImg(callBack) {
  var win = document
    .getElementById("fullframe")
    .contentWindow.document.getElementById("canvas");

  var owidth = win.style.width;
  var oheight = win.style.height;

  win.style.width = "863px";
  win.style.height = "628px";

  var imgData = win.toDataURL("image/png");

  win.style.width = owidth;
  win.style.height = oheight;

  var img = document.createElement("img");

  img.onload = function () {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    canvas.width = 1200;
    canvas.height = 628;

    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, 1200, 628);

    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 168, 0, 863, 628);

    img = canvas.toDataURL("image/png");

    $.post("/fbshare/add.php", { r: img }).done(function (data) {
      callBack(data);
    });
  };
  img.src = imgData;
}
/*========================================================================================
========================================================================================*/

/** BIG TEXT **/
(function ($) {
  $.fn.bigTxt = function (options) {
    var defaults = {
      percentage: 100,
      verticalAlign: 50,
      keepSizeSame: false,
      responsive: true,
    };

    var settings = $.extend({}, defaults, options);

    if (settings.keepSizeSame) {
      var found = 0;
      var smallest = 999999999;

      this.each(function (index) {
        var $this = $(this);
        var chk = resizeText($this);

        if (chk < smallest) {
          smallest = chk;
          found = index;
        }
      });

      var topThis = this;

      this.each(function (index) {
        var $this = $(this);

        $this.css("font-size", smallest + "px");

        $this.wrapInner("<div class='dme'></div>");
        var newDiv = $this.children("div");
        var topPad = $this[0].scrollHeight - newDiv.height();

        var verticalAlign = (topPad / 100) * settings.verticalAlign;

        newDiv.css("padding-top", verticalAlign + "px");

        if (settings.responsive) {
          window.addEventListener("resize", function () {
            fixedSizes(topThis, found);
          });
        }
      });
    } else {
      this.each(function () {
        var $this = $(this);

        if (settings.responsive) {
          window.addEventListener("resize", function () {
            resizeText($this);
          });
        }

        resizeText($this);
      });
    }

    function fixedSizes(topThis, found) {
      var smallest = resizeText($(topThis[found]));

      topThis.each(function (index) {
        var $this = $(this);

        if (index !== found) {
          $this.find(".dme").contents().unwrap();

          $this.css("font-size", smallest + "px");

          $this.wrapInner("<div class='dme'></div>");
          var newDiv = $this.children("div");
          var topPad = $this[0].scrollHeight - newDiv.height();

          var verticalAlign = (topPad / 100) * settings.verticalAlign;

          newDiv.css("padding-top", verticalAlign + "px");
        }
      });
    }

    function resizeText($this) {
      var jumpSizes = [100, 50, 10, 1];
      var curCheck = 0;
      var newSize = Math.floor($this.height() + 10);

      $this.find(".dme").contents().unwrap();

      $this.html($this.html());
      $this.css("font-size", newSize + "px");

      function loopResize(A, B) {
        for (i = 0; i < jumpSizes.length; i++) {
          if (newSize > jumpSizes[i]) {
            curCheck = i;
            break;
          }
        }

        for (i = curCheck; i < jumpSizes.length; i++) {
          while (Math.floor($this[0][A]) > Math.floor($this[B]())) {
            if (Math.floor(newSize - jumpSizes[i]) >= 0) {
              newSize = Math.floor(newSize - jumpSizes[i]);

              $this.css("font-size", newSize + "px");
            } else {
              break;
            }
          }
          if (i != jumpSizes.length - 1) {
            newSize = Math.floor(newSize + jumpSizes[i]);
            $this.css("font-size", newSize + "px");
          }
        }
      }

      loopResize("scrollHeight", "height");

      if ($this[0].scrollWidth > $this.width()) {
        loopResize("scrollWidth", "width");
      }

      if (settings.percentage != 100) {
        newSize = (settings.percentage / 100) * newSize;
        $this.css("font-size", newSize + "px");
      }

      $this.wrapInner("<div class='dme'></div>");
      var newDiv = $this.children("div");
      var topPad = $this[0].scrollHeight - newDiv.height();

      var verticalAlign = (topPad / 100) * settings.verticalAlign;

      newDiv.css("padding-top", verticalAlign + "px");

      return newSize;
    }
  };
})(jQuery);

/*====================================================================== Confetti On Wins!
========================================================================================*/
var JSConfetti = (function () {
  "use strict";
  function t(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function e(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function i(t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  }
  function n(t) {
    return +t.replace(/px/, "");
  }
  function s(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
      n = Math.random() * (e - t) + t;
    return Math.floor(n * Math.pow(10, i)) / Math.pow(10, i);
  }
  function o(t) {
    return t[s(0, t.length)];
  }
  var a = [
    "#fcf403",
    "#62fc03",
    "#f4fc03",
    "#03e7fc",
    "#03fca5",
    "#a503fc",
    "#fc03ad",
    "#fc03c2",
  ];
  function r(t) {
    return Math.log(t) / Math.log(1920);
  }
  var h = (function () {
    function e(i) {
      t(this, e);
      var n = i.initialPosition,
        a = i.direction,
        h = i.confettiRadius,
        c = i.confettiColors,
        u = i.emojis,
        l = i.emojiSize,
        d = i.canvasWidth,
        f = s(0.9, 1.7, 3) * r(d);
      (this.confettiSpeed = { x: f, y: f }),
        (this.finalConfettiSpeedX = s(0.2, 0.6, 3)),
        (this.rotationSpeed = u.length ? 0.01 : s(0.03, 0.07, 3) * r(d)),
        (this.dragForceCoefficient = s(5e-4, 9e-4, 6)),
        (this.radius = { x: h, y: h }),
        (this.initialRadius = h),
        (this.rotationAngle = "left" === a ? s(0, 0.2, 3) : s(-0.2, 0, 3)),
        (this.emojiSize = l),
        (this.emojiRotationAngle = s(0, 2 * Math.PI)),
        (this.radiusYUpdateDirection = "down");
      var m =
        "left" === a
          ? (s(82, 15) * Math.PI) / 180
          : (s(-15, -82) * Math.PI) / 180;
      (this.absCos = Math.abs(Math.cos(m))),
        (this.absSin = Math.abs(Math.sin(m)));
      var v = s(-150, 0),
        p = {
          x: n.x + ("left" === a ? -v : v) * this.absCos,
          y: n.y - v * this.absSin,
        };
      (this.currentPosition = Object.assign({}, p)),
        (this.initialPosition = Object.assign({}, p)),
        (this.color = u.length ? null : o(c)),
        (this.emoji = u.length ? o(u) : null),
        (this.createdAt = new Date().getTime()),
        (this.direction = a);
    }
    return (
      i(e, [
        {
          key: "draw",
          value: function (t) {
            var e = this.currentPosition,
              i = this.radius,
              n = this.color,
              s = this.emoji,
              o = this.rotationAngle,
              a = this.emojiRotationAngle,
              r = this.emojiSize,
              h = window.devicePixelRatio;
            n
              ? ((t.fillStyle = n),
                t.beginPath(),
                t.ellipse(
                  e.x * h,
                  e.y * h,
                  i.x * h,
                  i.y * h,
                  o,
                  0,
                  2 * Math.PI
                ),
                t.fill())
              : s &&
                ((t.font = "".concat(r, "px serif")),
                t.save(),
                t.translate(h * e.x, h * e.y),
                t.rotate(a),
                (t.textAlign = "center"),
                t.fillText(s, 0, 0),
                t.restore());
          },
        },
        {
          key: "updatePosition",
          value: function (t, e) {
            var i = this.confettiSpeed,
              n = this.dragForceCoefficient,
              s = this.finalConfettiSpeedX,
              o = this.radiusYUpdateDirection,
              a = this.rotationSpeed,
              r = this.createdAt,
              h = this.direction,
              c = e - r;
            i.x > s && (this.confettiSpeed.x -= n * t),
              (this.currentPosition.x +=
                i.x * ("left" === h ? -this.absCos : this.absCos) * t),
              (this.currentPosition.y =
                this.initialPosition.y -
                i.y * this.absSin * c +
                (0.00125 * Math.pow(c, 2)) / 2),
              (this.rotationSpeed -= this.emoji ? 1e-4 : 1e-5 * t),
              this.rotationSpeed < 0 && (this.rotationSpeed = 0),
              this.emoji
                ? (this.emojiRotationAngle +=
                    (this.rotationSpeed * t) % (2 * Math.PI))
                : "down" === o
                ? ((this.radius.y -= t * a),
                  this.radius.y <= 0 &&
                    ((this.radius.y = 0), (this.radiusYUpdateDirection = "up")))
                : ((this.radius.y += t * a),
                  this.radius.y >= this.initialRadius &&
                    ((this.radius.y = this.initialRadius),
                    (this.radiusYUpdateDirection = "down")));
          },
        },
        {
          key: "getIsVisibleOnCanvas",
          value: function (t) {
            return this.currentPosition.y < t + 100;
          },
        },
      ]),
      e
    );
  })();
  function c() {
    var t = document.createElement("canvas");
    return (
      (t.style.position = "fixed"),
      (t.style.width = "100%"),
      (t.style.height = "100%"),
      (t.style.top = "0"),
      (t.style.left = "0"),
      (t.style.zIndex = "1000"),
      (t.style.pointerEvents = "none"),
      document.body.appendChild(t),
      t
    );
  }
  function u(t) {
    var e = t.confettiRadius,
      i = void 0 === e ? 6 : e,
      n = t.confettiNumber,
      s = void 0 === n ? t.confettiesNumber || (t.emojis ? 40 : 250) : n,
      o = t.confettiColors,
      r = void 0 === o ? a : o,
      h = t.emojis,
      c = void 0 === h ? t.emojies || [] : h,
      u = t.emojiSize,
      l = void 0 === u ? 80 : u;
    return (
      t.emojies &&
        console.error(
          "emojies argument is deprecated, please use emojis instead"
        ),
      t.confettiesNumber &&
        console.error(
          "confettiesNumber argument is deprecated, please use confettiNumber instead"
        ),
      {
        confettiRadius: i,
        confettiNumber: s,
        confettiColors: r,
        emojis: c,
        emojiSize: l,
      }
    );
  }
  var l = (function () {
    function e(i) {
      var n = this;
      t(this, e),
        (this.canvasContext = i),
        (this.shapes = []),
        (this.promise = new Promise(function (t) {
          return (n.resolvePromise = t);
        }));
    }
    return (
      i(e, [
        {
          key: "getBatchCompletePromise",
          value: function () {
            return this.promise;
          },
        },
        {
          key: "addShapes",
          value: function () {
            var t;
            (t = this.shapes).push.apply(t, arguments);
          },
        },
        {
          key: "complete",
          value: function () {
            var t;
            return (
              !this.shapes.length &&
              (null === (t = this.resolvePromise) ||
                void 0 === t ||
                t.call(this),
              !0)
            );
          },
        },
        {
          key: "processShapes",
          value: function (t, e, i) {
            var n = this,
              s = t.timeDelta,
              o = t.currentTime;
            this.shapes = this.shapes.filter(function (t) {
              return (
                t.updatePosition(s, o),
                t.draw(n.canvasContext),
                !i || t.getIsVisibleOnCanvas(e)
              );
            });
          },
        },
      ]),
      e
    );
  })();
  return (function () {
    function e() {
      var i =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e),
        (this.activeConfettiBatches = []),
        (this.canvas = i.canvas || c()),
        (this.canvasContext = this.canvas.getContext('2d', { willReadFrequently: true })),
        (this.requestAnimationFrameRequested = !1),
        (this.lastUpdated = new Date().getTime()),
        (this.iterationIndex = 0),
        (this.loop = this.loop.bind(this)),
        requestAnimationFrame(this.loop);
    }
    return (
      i(e, [
        {
          key: "loop",
          value: function () {
            var t, e, i, s, o;
            (this.requestAnimationFrameRequested = !1),
              (t = this.canvas),
              (e = window.devicePixelRatio),
              (i = getComputedStyle(t)),
              (s = n(i.getPropertyValue("width"))),
              (o = n(i.getPropertyValue("height"))),
              t.setAttribute("width", (s * e).toString()),
              t.setAttribute("height", (o * e).toString());
            var a = new Date().getTime(),
              r = a - this.lastUpdated,
              h = this.canvas.offsetHeight,
              c = this.iterationIndex % 10 == 0;
            (this.activeConfettiBatches = this.activeConfettiBatches.filter(
              function (t) {
                return (
                  t.processShapes({ timeDelta: r, currentTime: a }, h, c),
                  !c || !t.complete()
                );
              }
            )),
              this.iterationIndex++,
              this.queueAnimationFrameIfNeeded(a);
          },
        },
        {
          key: "queueAnimationFrameIfNeeded",
          value: function (t) {
            this.requestAnimationFrameRequested ||
              this.activeConfettiBatches.length < 1 ||
              ((this.requestAnimationFrameRequested = !0),
              (this.lastUpdated = t || new Date().getTime()),
              requestAnimationFrame(this.loop));
          },
        },
        {
          key: "addConfetti",
          value: function () {
            for (
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                e = u(t),
                i = e.confettiRadius,
                n = e.confettiNumber,
                s = e.confettiColors,
                o = e.emojis,
                a = e.emojiSize,
                r = this.canvas.getBoundingClientRect(),
                c = r.width,
                d = r.height,
                f = (5 * d) / 7,
                m = { x: 0, y: f },
                v = { x: c, y: f },
                p = new l(this.canvasContext),
                y = 0;
              y < n / 2;
              y++
            ) {
              var g = new h({
                  initialPosition: m,
                  direction: "right",
                  confettiRadius: i,
                  confettiColors: s,
                  confettiNumber: n,
                  emojis: o,
                  emojiSize: a,
                  canvasWidth: c,
                }),
                C = new h({
                  initialPosition: v,
                  direction: "left",
                  confettiRadius: i,
                  confettiColors: s,
                  confettiNumber: n,
                  emojis: o,
                  emojiSize: a,
                  canvasWidth: c,
                });
              p.addShapes(g, C);
            }
            return (
              this.activeConfettiBatches.push(p),
              this.queueAnimationFrameIfNeeded(),
              p.getBatchCompletePromise()
            );
          },
        },
        {
          key: "clearCanvas",
          value: function () {
            this.activeConfettiBatches = [];
          },
        },
        {
          key: "destroyCanvas",
          value: function () {
            this.canvas.remove();
          },
        },
      ]),
      e
    );
  })();
})();

var confettiFalling = false;
function winShow(ch) {
  if (!isMobile.any) {
    if (!confettiFalling) {
      confettiFalling = true;

      if (typeof ch !== "undefined") {
        jsConfetti.addConfetti({
          emojis: [ch],
        });
      } else {
        if (window.location.href.indexOf("emoji-race-timer") > -1) {
          jsConfetti.addConfetti({
            emojis: ["🙏", "🥰", "😍", "🔥", "🤣", "✨", "😂"],
          });
        }
      }
      jsConfetti.addConfetti().then(function () {
        confettiFalling = false;
      });
    }
  }
}
/*========================================================================================
========================================================================================*/

/*====================================================================== Cookies Enabled?
========================================================================================*/
function areCookiesEnabled() {
  try {
    document.cookie = "cookietest=1";
    var cookiesEnabled = document.cookie.indexOf("cookietest=") !== -1;
    document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
}
/*========================================================================================
========================================================================================*/

/*===================================================================== Get URL Parameters
========================================================================================*/
if (typeof getParameterByName === "undefined") {
  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
/*========================================================================================
========================================================================================*/
