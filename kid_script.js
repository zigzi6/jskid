/*! KID.js 
    v1.2.1 (c) soso
    MIT License
    
    (っ◔◡◔)っ ♥ JSkid ♥ https://github.com/Generalsimus/JSkid

*/
var KD_I = {},
    KD_VA = {},
    KD_ROUter = {},
    KD_ROUid = (new Date).getTime();

function KD_E(o, p, f) {
    Object.defineProperty(o, p, {
        get: f
    })
}

function KD_flat(a) {
    return a instanceof Array ? a.reduce((function (c, v) {
        return c.concat(KD_flat(v))
    }), []) : a
}

function KD_li(o, prop, g) {
    var v = o[prop],
        d = Object.getOwnPropertyDescriptor(o, prop);
    Object.defineProperty(o, prop, {
        configurable: !0,
        get: function () {
            return v
        },
        set: function (new_v) {
            v = new_v;
            var f_r = g.func(g.parent);
            if (g.attr) g.parent.setAttribute(g.attr, f_r);
            else {
                var next = g.last.nextSibling,
                    last = g.last,
                    f = KD_flat(f_r),
                    new_Arr = f instanceof Array ? f.length ? f : [""] : [f];
                if (g.node.forEach((function (v, i) {
                        var n = next.nextSibling;
                        i < new_Arr.length ? (last = KD_T(null, new_Arr[i]), next.Replace(last)) : next.Remove(), next = n
                    })), new_Arr.length > g.node.length)
                    for (var i = g.node.length; i < new_Arr.length; i++) {
                        var e = KD_T(null, new_Arr[i]);
                        last && last.insert(e, "after"), last = e
                    }
                g.node = new_Arr
            }
            d && d.hasOwnProperty("set") && d.set(v)
        }
    })
}

function KD_g(f, o, t) {
    function r(p, a, r) {
        if (a) r = f(p);
        else {
            var c = KD_flat(f(p));
            c = [].concat(c instanceof Array && !c.length ? [""] : c)
        }
        var g = {
            node: c,
            attr: a,
            func: f,
            parent: p,
            last: p.lastChild || KD_T(p, "")
        };
        for (var prop in o) KD_li(o[prop], prop, g);
        return a ? r : c
    }
    return f = f.bind(t), r.KD_origin = f, r
}

function KD_type(a) {
    return Object.prototype.toString.call(a).match(/(\w)\w+/g)[1]
}
window.location.params = {};
var KD_method = {
    getAttr: function (a) {
        return this.getAttribute(a)
    },
    setAttr: function () {
        switch (console.log(typeof arguments[0], arguments), typeof arguments[0]) {
            case "object":
                var a = arguments[0];
                for (var i in a) this.setAttribute(i, a[i]);
                break;
            case "string":
                for (var i = 0, a; a = arguments[i];) this.setAttribute(a, arguments[i + 1]), i = 2;
                break;
            case "function":
                console.log(arguments), this.setAttr(arguments[0](this))
        }
        return this
    },
    Select: function (s) {
        return s instanceof Array ? this.querySelectorAll(s[0]) : this.querySelector(s)
    },
    Child: function (l) {
        var c = this.children;
        return null == l ? c : c[l]
    },
    Inner: function (i) {
        return null == i ? this.innerHTML : "string" == typeof i ? (this.innerHTML = i, this.firstChild) : (this.innerHTML = "", KD_T(this, i))
    },
    STYLE: function (o) {
        return o ? KD_assign(this.style, o) : this.style
    },
    e: function (s) {
        for (var l in s) l.split("_").forEach(function (v) {
            this.addEventListener(v, s[l])
        }.bind(this));
        return this
    },
    Parent: function (s, z, i) {
        for (z = this, s = s || 0, i = 0;
            "number" == typeof s && i <= s;) z = z.parentNode, i++;
        return z
    },
    NextElement: function (s, z) {
        z = this;
        for (var i = 0; i <= ("number" == typeof s ? s : 0); i++) z = z.nextElementSibling;
        return z
    },
    PreviousElement: function (s, z) {
        z = this;
        for (var i = 0; i <= ("number" == typeof s ? s : 0); i++) z = z.previousElementSibling;
        return z
    },
    Append: function (s) {
        return this.appendChild(KD_T(null, s)), s
    },
    Remove: function () {
        this.Parent().removeChild(this)
    },
    Replace: function (t) {
        return this.parentNode.replaceChild(KD_T(null, t), this), t
    },
    Global: function (t, n) {
        return b
    },
    Mark: function (f) {
        return f && f(this), this
    },
    insert: function (o, m) {
        switch (m) {
            case "after":
                var n = this.nextSibling,
                    p = this.Parent();
                n ? p.insertBefore(KD_T(null, o), n) : p.Append(o);
                break;
            case "before":
                this.Parent().insertBefore(KD_T(null, o), this)
        }
        return this
    },
    Restart: function (v) {
        this.Replace(KD_T(null, this.KD_OBJECT))
    }
};

function KD_assign() {
    try {
        Object.assign.apply(null, arguments)
    } catch (e) {
        for (var i = 1; i < arguments.length; i++) {
            var v = arguments[i];
            for (var p in v) arguments[0][p] = v[p]
        }
    }
    return arguments[0]
}

function KD_routeGeN(TO, REGEX, z) {
    z = decodeURI(document.location.pathname).match(REGEX), window.location.params = {}, TO.replace(/\:/g, "").match(REGEX).forEach((function (v, i) {
        window.location.params[v] = z[i]
    }))
}

function KD_Rgen(url, id) {
    var p_c = [];
    for (var i in KD_ROUter) {
        var o = KD_ROUter[i],
            test = o[0].test(url);
        o[1].forEach((function (v) {
            if (v.parent.Inner(" "), test && !v.parent.hidden) {
                var to = v.general.to;
                KD_routeGeN(to = to.KD_origin ? to.KD_origin() : to, o[0]), p_c.push([v.parent, v.children[id] || (v.children[id] = KD_el(v.general))])
            }
        }))
    }
    p_c.forEach((function (v) {
        v[0].Append(v[1])
    }))
}

function KD_node(createEl, type) {
    function KD_el(r) {
        var domK = Object.keys(r);

        function KD_dom(name) {
            return domK.forEach((function (v, i) {
                if (i) {
                    var a = r[v] instanceof Function ? r[v](name, v) : r[v];
                    KD_method[v] ? name[v](a) : name.setAttribute(v, a)
                } else(name = createEl(name)).KD_OBJECT = r
            })), KD_T(name, r[domK[0]]), name
        }
        var tags = {
            svg: function () {
                return "EL" == type ? KD_NS(r) : KD_dom("svg")
            },
            switch: function () {
                return KD_dom("a").e({
                    click: function (e) {
                        e.preventDefault();
                        var h = this.getAttr("href");
                        h && (KD_ROUid = (new Date).getTime(), history.pushState({
                            ID: KD_ROUid
                        }, document.title, h), KD_Rgen(h, KD_ROUid), window.scrollTo(0, 0))
                    }
                })
            },
            router: function () {
                var list = r.router;
                r.router = [];
                var parent = KD_dom("div"),
                    path = decodeURI(document.location.pathname);

                function z(a) {
                    switch (KD_type(a)) {
                        case "Array":
                            a.forEach((function (v) {
                                z(v)
                            }));
                            break;
                        case "Function":
                            z(a(parent));
                            break;
                        case "Object":
                            if (a.to) {
                                var to = a.to.KD_origin ? a.to.KD_origin() : a.to,
                                    genREGEX = (a.unic && a.unic.KD_origin ? a.unic.KD_origin() : a.unic) ? (rgxURL = to, (regexlist = [
                                        [/[\-{}\[\]+?.,\\^$|#\s]/g, "\$&"],
                                        [/\((.*?)\)/g, "(?:)?"],
                                        [/(\(\?)?:\w+/g, function (match, optional) {
                                            return optional ? match : "([^/]+)"
                                        }],
                                        [/\*\w+/g, "(.*?)"]
                                    ]).forEach((function (v) {
                                        rgxURL = rgxURL.replace(v[0], v[1])
                                    })), new RegExp("^" + rgxURL + "$", "i")) : new RegExp(to.replace(/:[^\s/]+/g, "([\w-]+)")),
                                    el = {
                                        parent: parent,
                                        general: a,
                                        children: {}
                                    };
                                genREGEX.test(path) && (KD_routeGeN(to, genREGEX), el.children[KD_ROUid] = KD_T(parent, a));
                                var g_o = KD_ROUter[genREGEX];
                                g_o ? g_o[1].push(el) : KD_ROUter[genREGEX] = [genREGEX, [el]]
                            }
                    }
                    var regexlist, rgxURL
                }
                return r.router = list, z(list), parent
            }
        };
        return (tags[domK[0]] || KD_dom)(domK[0])
    }

    function KD_T(p, s, n) {
        switch (KD_type(s)) {
            case "Array":
                return s.map((function (tag) {
                    return KD_T(p, tag)
                }));
            case "Function":
                return KD_T(p, s(p));
            case "Object":
                n = KD_el(s);
                break;
            case "Number":
            case "Undefined":
            case "Null":
            case "String":
            case "Boolean":
            case "Date":
            case "RegExp":
            case "BigInt":
            case "Symbol":
                (n = document.createTextNode(String(s))).KD_OBJECT = s;
                break;
            default:
                n = s
        }
        return p && n && p.appendChild(n), n
    }
    return [KD_el, KD_T]
}
KD_assign(Node.prototype, KD_method), history.replaceState({
    ID: KD_ROUid
}, document.title, document.location.pathname), window.addEventListener("popstate", (function (e) {
    KD_ROUid = e.state.ID, KD_Rgen(decodeURI(document.location.pathname), KD_ROUid)
}));
var el = KD_node(document.createElement.bind(document), "EL"),
    NS = KD_node((function (name) {
        return document.createElementNS("http://www.w3.org/2000/svg", name)
    }), "NS"),
    KD_NS = NS[0],
    KD_T_NS = NS[1],
    KD_el = el[0],
    KD_T = el[1],
    KD_style = KD_T(document.head, {
        style: ""
    });