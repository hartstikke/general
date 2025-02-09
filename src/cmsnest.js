'use strict'
;(() => {
  var dt = Object.defineProperty
  var Et = (e, t, o) =>
    t in e
      ? dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (e[t] = o)
  var q = (e, t, o) => (Et(e, typeof t != 'symbol' ? t + '' : t, o), o)
  var A = 'fs-attributes'
  var G = 'cmsattribute'
  var H = 'cmscore'
  var x = 'cmsnest'
  var M = 'support'
  var Y = async (...e) => {
    var o
    let t = []
    for (let n of e) {
      let r = await ((o = window.fsAttributes[n]) == null ? void 0 : o.loading)
      t.push(r)
    }
    return t
  }
  var y = class {
    static activateAlerts() {
      this.alertsActivated = !0
    }
    static alert(t, o) {
      if ((this.alertsActivated && window.alert(t), o === 'error'))
        throw new Error(t)
    }
  }
  q(y, 'alertsActivated', !1)
  var U = () => {}
  var X = (e, t) => !!e && t.includes(e)
  var _ = (e) => typeof e == 'string'
  var z = {
    wrapper: 'w-dyn-list',
    list: 'w-dyn-items',
    item: 'w-dyn-item',
    paginationWrapper: 'w-pagination-wrapper',
    paginationNext: 'w-pagination-next',
    paginationPrevious: 'w-pagination-previous',
    pageCount: 'w-page-count',
    emptyState: 'w-dyn-empty',
  }
  var R = (e, t = !0) => e.cloneNode(t)
  function v(e, t, o, n = !0) {
    let r = o ? [o] : []
    if (!e) return r
    let s = e.split(',').reduce((i, c) => {
      let l = c.trim()
      return (!n || l) && i.push(l), i
    }, [])
    if (t) {
      let i = s.filter((c) => X(c, t))
      return i.length ? i : r
    }
    return s
  }
  var O = (e = document) => {
    var o
    let t = 'Last Published:'
    for (let n of e.childNodes)
      if (
        n.nodeType === Node.COMMENT_NODE &&
        (o = n.textContent) != null &&
        o.includes(t)
      ) {
        let r = n.textContent.trim().split(t)[1]
        if (r) return new Date(r)
      }
  }
  var h = (e = document) => e.documentElement.getAttribute('data-wf-site')
  function J(e, t, o) {
    var r
    let n = window.fsAttributes[e]
    return (n.destroy = o || U), (r = n.resolve) == null || r.call(n, t), t
  }
  var N = (e, t = '1', o = 'iife') => {
    let r = `${e}${o === 'esm' ? '.esm' : ''}.js`
    return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${e}@${t}/${r}`
  }
  var St = N(H, '1'),
    Q = async () => {
      let { fsAttributes: e } = window
      e.cmscore || (e.cmscore = {})
      let { cmscore: t } = e
      if (t.import) return t.import
      try {
        return (
          (t.import = import(St)),
          t.import.then((o) => {
            o && (t.version || (t.version = o.version))
          }),
          t.import
        )
      } catch (o) {
        y.alert(`${o}`, 'error')
        return
      }
    }
  var gt = `${A}-${M}`,
    Z = async () => {
      var r
      let { fsAttributes: e, location: t } = window,
        { host: o, searchParams: n } = new URL(t.href)
      return !o.includes('webflow.io') || !n.has(gt)
        ? !1
        : (r = e.import) == null
        ? void 0
        : r.call(e, M, '1')
    }
  var L = (e) => {
    let t = (r, s, i) => {
      let c = e[r],
        { key: l, values: a } = c,
        u
      if (!s) return `[${l}]`
      let p = a == null ? void 0 : a[s]
      _(p)
        ? (u = p)
        : (u = p(i && 'instanceIndex' in i ? i.instanceIndex : void 0))
      let m = i && 'caseInsensitive' in i && i.caseInsensitive ? 'i' : ''
      if (!(i != null && i.operator)) return `[${l}="${u}"${m}]`
      switch (i.operator) {
        case 'prefixed':
          return `[${l}^="${u}"${m}]`
        case 'suffixed':
          return `[${l}$="${u}"${m}]`
        case 'contains':
          return `[${l}*="${u}"${m}]`
      }
    }
    function o(r, s) {
      let i = t('element', r, s),
        c = (s == null ? void 0 : s.scope) || document
      return s != null && s.all
        ? [...c.querySelectorAll(i)]
        : c.querySelector(i)
    }
    return [
      t,
      o,
      (r, s) => {
        let i = e[s]
        return i ? r.getAttribute(i.key) : null
      },
    ]
  }
  var C = {
      preventLoad: { key: `${A}-preventload` },
      debugMode: { key: `${A}-debug` },
      src: { key: 'src', values: { finsweet: '@finsweet/attributes' } },
      dev: { key: `${A}-dev` },
    },
    [D, Ie] = L(C)
  var tt = (e) => {
    let { currentScript: t } = document,
      o = {}
    if (!t) return { attributes: o, preventsLoad: !1 }
    let r = {
      preventsLoad: _(t.getAttribute(C.preventLoad.key)),
      attributes: o,
    }
    for (let s in e) {
      let i = t.getAttribute(e[s])
      r.attributes[s] = i
    }
    return r
  }
  var et = ({ scriptAttributes: e, attributeKey: t, version: o, init: n }) => {
      var c
      bt(), (c = window.fsAttributes)[t] || (c[t] = {})
      let { preventsLoad: r, attributes: s } = tt(e),
        i = window.fsAttributes[t]
      ;(i.version = o),
        (i.init = n),
        r ||
          (window.Webflow || (window.Webflow = []),
          window.Webflow.push(() => n(s)))
    },
    bt = () => {
      let e = xt()
      if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
        $(window.fsAttributes, e)
        return
      }
      let t = At(e)
      $(t, e),
        yt(t),
        (window.fsAttributes = t),
        (window.FsAttributes = window.fsAttributes),
        Z()
    },
    At = (e) => {
      let t = {
        cms: {},
        push(...o) {
          var n, r
          for (let [s, i] of o)
            (r = (n = this[s]) == null ? void 0 : n.loading) == null ||
              r.then(i)
        },
        async import(o, n) {
          let r = t[o]
          return (
            r ||
            new Promise((s) => {
              let i = document.createElement('script')
              ;(i.src = N(o, n)),
                (i.async = !0),
                (i.onload = () => {
                  let [c] = $(t, [o])
                  s(c)
                }),
                document.head.append(i)
            })
          )
        },
        destroy() {
          var o, n
          for (let r of e)
            (n = (o = window.fsAttributes[r]) == null ? void 0 : o.destroy) ==
              null || n.call(o)
        },
      }
      return t
    },
    xt = () => {
      let e = D('src', 'finsweet', { operator: 'contains' }),
        t = D('dev')
      return [...document.querySelectorAll(`script${e}, script${t}`)].reduce(
        (r, s) => {
          var c
          let i =
            s.getAttribute(C.dev.key) ||
            ((c = s.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : c[0])
          return i && !r.includes(i) && r.push(i), r
        },
        []
      )
    },
    $ = (e, t) =>
      t.map((n) => {
        let r = e[n]
        return (
          r ||
          ((e[n] = {}),
          (r = e[n]),
          (r.loading = new Promise((s) => {
            r.resolve = (i) => {
              s(i), delete r.resolve
            }
          })),
          r)
        )
      }),
    yt = (e) => {
      let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : []
      e.push(...t)
    }
  var ot = '1.12.0'
  var wt = 'fs-cms-element',
    It = {
      wrapper: 'wrapper',
      list: 'list',
      item: 'item',
      paginationWrapper: 'pagination-wrapper',
      paginationNext: 'pagination-next',
      paginationPrevious: 'pagination-previous',
      pageCount: 'page-count',
      emptyState: 'empty',
    },
    d = (e) => {
      let t = `.${z[e]}`,
        o = `[${wt}="${It[e]}"]`
      return `:is(${t}, ${o})`
    },
    rt = (e, t = document) => {
      e = e.filter((s) => s)
      let o = e.join(', ') || d('wrapper')
      return [...t.querySelectorAll(o)].reduce((s, i) => {
        if (!i) return s
        let c = P(i, 'wrapper')
        return !c || s.includes(c) || s.push(c), s
      }, [])
    }
  function P(e, t, o = document) {
    let n = typeof e == 'string' ? o.querySelector(e) : e
    if (!n) return
    let r = n.closest(d('wrapper'))
    if (!r) return
    let s = r.querySelector(d('list'))
    return t === 'wrapper'
      ? r
      : t === 'list'
      ? s
      : t === 'items'
      ? [
          ...((s == null
            ? void 0
            : s.querySelectorAll(`:scope > ${d('item')}`)) || []),
        ]
      : t === 'pageCount'
      ? r.querySelector(d('pageCount'))
      : t === 'empty'
      ? r.querySelector(`:scope > ${d('emptyState')}`)
      : t === 'pagination'
      ? r.querySelector(d('paginationWrapper'))
      : r.querySelector(
          d(t === 'next' ? 'paginationNext' : 'paginationPrevious')
        )
  }
  var b = 'pages',
    k = new Map(),
    st = async (
      e,
      { cache: t = !0, cacheExternal: o, cacheKey: n, cacheVersion: r } = {}
    ) => {
      var s, i
      try {
        let c = new URL(e, window.location.origin),
          l = await _t(c)
        if (l) return l
        let a = h(),
          u = O(),
          p = a || n,
          m =
            (i = (s = u == null ? void 0 : u.getTime()) != null ? s : r) != null
              ? i
              : 1,
          f = p ? await Rt(p, m) : null
        if (!t || !f) {
          let { page: T } = await it(c)
          return T
        }
        let g = await ht(f, c.href)
        if (g) {
          let T = K(g)
          return o && !ct(T, a) && nt(f, c, a, o), T
        }
        return await nt(f, c, a, o)
      } catch {
        return null
      }
    },
    _t = async (e) => {
      let t = await k.get(e.href)
      if (t) return K(t)
    },
    it = async (e) => {
      let t = fetch(e.href).then((r) => r.text())
      k.set(e.href, t)
      let o = await t
      return { page: K(o), rawPage: o }
    },
    nt = async (e, t, o, n) => {
      let { page: r, rawPage: s } = await it(t),
        i = ct(r, o)
      return (!i && !n) || (await Nt(e, t.href, s), i && k.delete(t.href)), r
    },
    ct = (e, t) => {
      if (!t) return !1
      let o = h(e)
      return o && o === t
    },
    K = (e) => new DOMParser().parseFromString(e, 'text/html'),
    Rt = (e, t) =>
      new Promise((o) => {
        try {
          let n = window.indexedDB.open(e, t)
          ;(n.onblocked = () => {
            o(null)
          }),
            (n.onupgradeneeded = () => {
              let r = n.result
              r.objectStoreNames.contains(b) && r.deleteObjectStore(b),
                r.createObjectStore(b)
            }),
            (n.onerror = () => o(null)),
            (n.onsuccess = () => {
              let r = n.result
              ;(r.onversionchange = () => r.close()), o(r)
            })
        } catch {
          o(null)
        }
      }),
    ht = async (e, t) =>
      new Promise((o) => {
        let s = e.transaction(b).objectStore(b).get(t)
        ;(s.onerror = () => o(null)), (s.onsuccess = () => o(s.result))
      }),
    Nt = async (e, t, o) =>
      new Promise((n) => {
        let i = e.transaction(b, 'readwrite').objectStore(b).put(o, t)
        ;(i.onerror = () => n()), (i.onsuccess = () => n())
      })
  function w(e) {
    return e == null ? void 0 : e.trim().toLowerCase()
  }
  var B = `fs-${x}`,
    Lt = 'list',
    Pt = 'nest-target',
    Bt = 'slugs',
    Mt = 'collection',
    Ut = 'empty',
    vt = 'cache',
    Ot = { false: 'false' },
    E = {
      element: {
        key: `${B}-element`,
        values: { list: Lt, nestTarget: Pt, slugs: Bt },
      },
      collection: { key: `${B}-${Mt}` },
      empty: { key: `${B}-${Ut}` },
      cacheItems: { key: `${B}-${vt}`, values: Ot },
    },
    [S, Fe, at] = L(E)
  var lt = ({ createCMSListInstances: e }) => {
      let t = new Map(),
        o = e([S('collection')])
      for (let n of o) {
        let r = w(n.getAttribute(E.collection.key))
        if (!r) continue
        let s = document.querySelector(`[${E.empty.key}^="${r}"]`)
        s && (s.style.display = 'none'),
          (n.wrapper.style.display = 'none'),
          t.set(r, { listInstance: n, emptyElement: s })
      }
      return t
    },
    pt = (e) => {
      let o = [...e.querySelectorAll(`${S('collection')}:not(a)`)].reduce(
          (s, i) => {
            let c = w(at(i, 'collection'))
            if (!c) return s
            let l = s.get(c) || []
            return l.push(i), s.set(c, l), s
          },
          new Map()
        ),
        n = new Map(),
        r = new Map()
      for (let [s, i] of o) {
        let c = i.find((a) => a.matches(S('element', 'nestTarget'))),
          l = i.find((a) => a.matches(S('element', 'slugs')))
        if (c && l) {
          let a = v(l.textContent)
          n.set(s, { slugs: a, nestTarget: c })
          continue
        }
        r.set(s, i[0])
      }
      return { manualNestTargets: n, externalNestTargets: r }
    }
  var I = async (e, t, o, n) => {
      let { manualNestTargets: r, externalNestTargets: s } = pt(e.element)
      await Promise.all([Dt(r, t, o, n), $t(s, e, t, o, n)])
    },
    Dt = (e, t, o, n) =>
      Promise.all(
        [...e].map(([r, { nestTarget: s, slugs: i }]) => {
          let c = t.get(r)
          if (!c) return
          let l = c.listInstance.items.filter(({ href: a }) => {
            if (!a) return !1
            try {
              let u = new URL(a),
                [p] = u.pathname.match(/[^/]+(?=\/$|$)/g) || []
              return p && i.includes(p)
            } catch {
              return !1
            }
          })
          return ut(s, l, c, t, o, n)
        })
      ),
    $t = async (e, t, o, n, r) => {
      let { CMSList: s } = r
      if (!e.size || !t.href) return
      let i = await st(t.href, { cache: n })
      if (!i) return
      let c = rt([S('collection')], i),
        l = new Set()
      await Promise.all(
        c.map(async (a, u) => {
          let p = new s(a, u),
            m = w(p.getAttribute(E.collection.key))
          if (!m || l.has(m)) return
          l.add(m)
          let f = o.get(m),
            g = e.get(m)
          if (!f || !g) return
          let V = p.items.reduce((T, { href: F }) => {
            if (!F) return T
            let W = f.listInstance.items.find((j) => j.href && F === j.href)
            return W && T.push(W), T
          }, [])
          await ut(g, V, f, o, n, r)
        })
      )
    },
    ut = async (e, t, { listInstance: o, emptyElement: n }, r, s, i) => {
      let { CMSItem: c } = i
      if (!t.length && !n) return
      let l = e.parentElement
      if (!l) return
      let a = R(o.wrapper),
        u = P(a, 'items')
      if (((a.style.display = ''), t.length))
        await Promise.all(
          [...u].map((p) => {
            if (!!!t.find(({ element: g }) => g.isEqualNode(p))) {
              p.remove()
              return
            }
            let f = new c(p, a)
            return I(f, r, s, i)
          })
        )
      else if (n) {
        let p = P(a, 'list')
        p == null || p.remove()
        let m = R(n)
        ;(m.style.display = ''), a.appendChild(m)
      }
      l.insertBefore(a, e), e.remove()
    }
  var mt = (e, t, o) => {
    e.on('shouldnest', async (n) => {
      await Promise.all(n.map((r) => I(r, t, e.cacheItems, o)))
    })
  }
  var ft = async (e, t) => {
    let o = lt(t)
    if (!o.size) return
    mt(e, o, t),
      e.getAttribute(E.cacheItems.key) === E.cacheItems.values.false &&
        (e.cacheItems = !1)
    let r = [...e.items]
    await Promise.all(r.map((s) => I(s, o, e.cacheItems, t))),
      await e.emitSerial('nestinitialitems', r)
  }
  var Tt = async () => {
    let e = await Q()
    if (!e) return []
    await Y(G)
    let t = e.createCMSListInstances([
      S('element', 'list', { operator: 'prefixed' }),
    ])
    return (
      await Promise.all(t.map((o) => ft(o, e))),
      J(x, t, () => {
        for (let o of t) o.destroy()
      })
    )
  }
  et({ init: Tt, version: ot, attributeKey: x })
})()
