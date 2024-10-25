'use strict'
;(() => {
  var gt = Object.defineProperty
  var Ct = (t, e, o) =>
    e in t
      ? gt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (t[e] = o)
  var F = (t, e, o) => (Ct(t, typeof e != 'symbol' ? e + '' : e, o), o)
  var x = 'fs-attributes'
  var G = 'animation'
  var j = 'cmsattribute'
  var q = 'cmscore'
  var _ = 'cmssort'
  var O = 'support'
  var W = async (...t) => {
    var o
    let e = []
    for (let s of t) {
      let r = await ((o = window.fsAttributes[s]) == null ? void 0 : o.loading)
      e.push(r)
    }
    return e
  }
  var d = class {
    static activateAlerts() {
      this.alertsActivated = !0
    }
    static alert(e, o) {
      if ((this.alertsActivated && window.alert(e), o === 'error'))
        throw new Error(e)
    }
  }
  F(d, 'alertsActivated', !1)
  var w = () => {}
  function S(t, e, o, s) {
    return t
      ? (t.addEventListener(e, o, s), () => t.removeEventListener(e, o, s))
      : w
  }
  var X = (t) => t instanceof Element
  var z = (t) => t instanceof HTMLSelectElement
  var U = (t) => t != null
  var K = (t) => typeof t == 'string',
    h = (t) => typeof t == 'number'
  var k = 'w--current'
  var v = {
    dropdown: 'w-dropdown',
    dropdownToggle: 'w-dropdown-toggle',
    dropdownList: 'w-dropdown-list',
  }
  var P = (t, e) => (
    Array.isArray(e) || (e = [e]),
    e.map((s) => t.dispatchEvent(new Event(s, { bubbles: !0 }))).every((s) => s)
  )
  function Q(t, e, o) {
    var r
    let s = window.fsAttributes[t]
    return (s.destroy = o || w), (r = s.resolve) == null || r.call(s, e), e
  }
  var y = (t, e = '1', o = 'iife') => {
    let r = `${t}${o === 'esm' ? '.esm' : ''}.js`
    return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${t}@${e}/${r}`
  }
  var It = y(G, '1', 'esm'),
    Z = async () => {
      let { fsAttributes: t } = window
      t.animation || (t.animation = {})
      let { animation: e } = t
      if (e.import) return e.import
      try {
        return (e.import = import(It)), e.import
      } catch (o) {
        d.alert(`${o}`, 'error')
        return
      }
    }
  var wt = y(q, '1'),
    J = async () => {
      let { fsAttributes: t } = window
      t.cmscore || (t.cmscore = {})
      let { cmscore: e } = t
      if (e.import) return e.import
      try {
        return (
          (e.import = import(wt)),
          e.import.then((o) => {
            o && (e.version || (e.version = o.version))
          }),
          e.import
        )
      } catch (o) {
        d.alert(`${o}`, 'error')
        return
      }
    }
  var Rt = `${x}-${O}`,
    tt = async () => {
      var r
      let { fsAttributes: t, location: e } = window,
        { host: o, searchParams: s } = new URL(e.href)
      return !o.includes('webflow.io') || !s.has(Rt)
        ? !1
        : (r = t.import) == null
        ? void 0
        : r.call(t, O, '1')
    }
  var R = (t) => (e) => `${t}${e ? `-${e}` : ''}`,
    B = (t) => {
      let e = (r, i, n) => {
        let a = t[r],
          { key: l, values: p } = a,
          c
        if (!i) return `[${l}]`
        let u = p == null ? void 0 : p[i]
        K(u)
          ? (c = u)
          : (c = u(n && 'instanceIndex' in n ? n.instanceIndex : void 0))
        let m = n && 'caseInsensitive' in n && n.caseInsensitive ? 'i' : ''
        if (!(n != null && n.operator)) return `[${l}="${c}"${m}]`
        switch (n.operator) {
          case 'prefixed':
            return `[${l}^="${c}"${m}]`
          case 'suffixed':
            return `[${l}$="${c}"${m}]`
          case 'contains':
            return `[${l}*="${c}"${m}]`
        }
      }
      function o(r, i) {
        let n = e('element', r, i),
          a = (i == null ? void 0 : i.scope) || document
        return i != null && i.all
          ? [...a.querySelectorAll(n)]
          : a.querySelector(n)
      }
      return [
        e,
        o,
        (r, i) => {
          let n = t[i]
          return n ? r.getAttribute(n.key) : null
        },
      ]
    }
  var L = {
      preventLoad: { key: `${x}-preventload` },
      debugMode: { key: `${x}-debug` },
      src: { key: 'src', values: { finsweet: '@finsweet/attributes' } },
      dev: { key: `${x}-dev` },
    },
    [$, Je] = B(L)
  var et = (t) => {
    let { currentScript: e } = document,
      o = {}
    if (!e) return { attributes: o, preventsLoad: !1 }
    let r = {
      preventsLoad: K(e.getAttribute(L.preventLoad.key)),
      attributes: o,
    }
    for (let i in t) {
      let n = e.getAttribute(t[i])
      r.attributes[i] = n
    }
    return r
  }
  var ot = ({ scriptAttributes: t, attributeKey: e, version: o, init: s }) => {
      var a
      Lt(), (a = window.fsAttributes)[e] || (a[e] = {})
      let { preventsLoad: r, attributes: i } = et(t),
        n = window.fsAttributes[e]
      ;(n.version = o),
        (n.init = s),
        r ||
          (window.Webflow || (window.Webflow = []),
          window.Webflow.push(() => s(i)))
    },
    Lt = () => {
      let t = Mt()
      if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
        Y(window.fsAttributes, t)
        return
      }
      let e = Dt(t)
      Y(e, t),
        Nt(e),
        (window.fsAttributes = e),
        (window.FsAttributes = window.fsAttributes),
        tt()
    },
    Dt = (t) => {
      let e = {
        cms: {},
        push(...o) {
          var s, r
          for (let [i, n] of o)
            (r = (s = this[i]) == null ? void 0 : s.loading) == null ||
              r.then(n)
        },
        async import(o, s) {
          let r = e[o]
          return (
            r ||
            new Promise((i) => {
              let n = document.createElement('script')
              ;(n.src = y(o, s)),
                (n.async = !0),
                (n.onload = () => {
                  let [a] = Y(e, [o])
                  i(a)
                }),
                document.head.append(n)
            })
          )
        },
        destroy() {
          var o, s
          for (let r of t)
            (s = (o = window.fsAttributes[r]) == null ? void 0 : o.destroy) ==
              null || s.call(o)
        },
      }
      return e
    },
    Mt = () => {
      let t = $('src', 'finsweet', { operator: 'contains' }),
        e = $('dev')
      return [...document.querySelectorAll(`script${t}, script${e}`)].reduce(
        (r, i) => {
          var a
          let n =
            i.getAttribute(L.dev.key) ||
            ((a = i.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : a[0])
          return n && !r.includes(n) && r.push(n), r
        },
        []
      )
    },
    Y = (t, e) =>
      e.map((s) => {
        let r = t[s]
        return (
          r ||
          ((t[s] = {}),
          (r = t[s]),
          (r.loading = new Promise((i) => {
            r.resolve = (n) => {
              i(n), delete r.resolve
            }
          })),
          r)
        )
      }),
    Nt = (t) => {
      let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : []
      t.push(...e)
    }
  var rt = '1.13.3'
  var T = `fs-${_}`,
    vt = 'list',
    Bt = 'trigger',
    Ot = 'dropdown-label',
    Ut = 'scroll-anchor',
    ht = 'field',
    kt = 'type',
    Pt = 'easing',
    $t = 'duration',
    Yt = 'asc',
    Ht = 'desc',
    Vt = 'reverse',
    E = {
      element: {
        key: `${T}-element`,
        values: {
          list: R(vt),
          trigger: R(Bt),
          dropdownLabel: R(Ot),
          scrollAnchor: R(Ut),
        },
      },
      field: { key: `${T}-${ht}` },
      type: { key: `${T}-${kt}`, values: { date: 'date' } },
      easing: { key: `${T}-${Pt}` },
      duration: { key: `${T}-${$t}` },
      ascClass: { key: `${T}-${Yt}` },
      descClass: { key: `${T}-${Ht}` },
      reverse: { key: `${T}-${Vt}`, values: { true: 'true' } },
    },
    [st, D] = B(E),
    nt = `${T}_asc`,
    it = `${T}_desc`
  var {
      field: { key: Ft },
      type: { key: Gt },
    } = E,
    ct = (t, e) => {
      t.on('shouldcollectprops', async (o) => {
        for (let s of o) s.collectProps({ fieldKey: Ft, typeKey: Gt })
      }),
        t.on('shouldsort', async () => {
          await e(!0)
        })
    }
  var M = 'role'
  var at = 'tabindex'
  var H = 'aria-selected',
    lt = 'aria-haspopup',
    pt = 'aria-multiselectable'
  var ut = 'aria-sort'
  var mt = (t, e = !0) => {
    e && t.focus(), P(t, ['click', 'mouseup'])
  }
  var dt = (t) => {
    if (t) return parseFloat(t.replace(/[^0-9.-]+/g, ''))
  }
  function g(t) {
    return t == null ? void 0 : t.trim().toLowerCase()
  }
  var C = async (t, { direction: e, sortKey: o, addingItems: s }) => {
    let { items: r } = t
    !!e && !!o && r.some(({ props: n }) => o in n)
      ? r.sort((n, a) => {
          let l = n.props[o],
            p = a.props[o],
            [c] = (l == null ? void 0 : l.values) || [],
            [u] = (p == null ? void 0 : p.values) || []
          if (!c) return 1
          if (!u) return -1
          let { type: m } = l,
            f = m === 'date'
          if (f || m === 'number') {
            let [A, N] = [c, u].map((V) => (f ? new Date(V).getTime() : dt(V)))
            return !h(A) || isNaN(A)
              ? 1
              : !h(N) || isNaN(N)
              ? -1
              : e === 'asc'
              ? A - N
              : N - A
          }
          let I = { numeric: !0, sensitivity: 'base' }
          return e === 'asc'
            ? c.localeCompare(u, void 0, I)
            : u.localeCompare(c, void 0, I)
        })
      : t.restoreItemsOrder(),
      s ||
        (await t.switchPage(1, !1), t.scrollToAnchor(), await t.renderItems())
  }
  var {
      ascClass: { key: qt },
      descClass: { key: Wt },
      reverse: { key: Xt, values: zt },
    } = E,
    Tt = (t, e, o) => {
      let s = new Map(),
        r = !1,
        i,
        n,
        a,
        l = async (c) => {
          await C(e, { sortKey: a, direction: n, addingItems: c })
        },
        p = t.map(
          (c) => (
            Qt(c, s, o),
            S(c, 'click', async (m) => {
              if ((m.preventDefault(), r)) return
              r = !0
              let f = s.get(c)
              if (!f) {
                r = !1
                return
              }
              ;(a = f.sortKey),
                (n = Zt(f.direction, f.reverse)),
                i && c !== i && ft(i, void 0, s),
                (i = c),
                ft(c, n, s),
                await l(),
                (r = !1)
            })
          )
        )
      return {
        sortItems: l,
        cleanup: () => {
          for (let c of p) c()
        },
      }
    },
    Qt = (t, e, o) => {
      let s = t.getAttribute(E.field.key)
      if (!s) return
      let r = g(s),
        i = t.getAttribute(Xt) === zt.true,
        n = t.getAttribute(qt),
        a = t.getAttribute(Wt),
        l = {
          sortKey: r,
          reverse: i,
          cssClasses: { asc: n || o.asc, desc: a || o.desc },
        }
      t.setAttribute(M, 'columnheader'),
        t.setAttribute(at, '0'),
        At(t),
        e.set(t, l),
        Et(t, l)
    },
    Et = (...[t, { cssClasses: e }]) => {
      for (let o of Object.values(e)) t.classList.remove(o)
    },
    At = (t, e) => {
      t.setAttribute(
        ut,
        e ? (e === 'asc' ? 'ascending' : 'descending') : 'none'
      )
    },
    ft = (t, e, o) => {
      let s = o.get(t)
      if (!s) return
      let { cssClasses: r } = s
      Et(t, s), e && t.classList.add(r[e]), At(t, e), (s.direction = e)
    },
    Zt = (t, e) => (t ? (t === 'desc' ? 'asc' : 'desc') : e ? 'desc' : 'asc')
  var { dropdownToggle: Jt, dropdownList: te } = v,
    St = (t, e) => {
      let o = t.querySelector(`.${Jt}`),
        s = t.querySelector(`.${te}`)
      if (!o || !s) {
        d.alert('The cmssort Dropdown is missing a toggle or a list.', 'error')
        return
      }
      re(o, s)
      let r = oe(o),
        i = ee(s)
      if (!i) {
        d.alert("The cmssort Dropdown doesn't have any option.", 'error')
        return
      }
      let n = !1,
        a,
        l,
        p = async (u) => {
          await C(e, { direction: l, sortKey: a, addingItems: u })
        },
        c = S(s, 'click', async (u) => {
          if ((u.preventDefault(), n)) return
          n = !0
          let { target: m } = u
          if (!X(m)) {
            n = !1
            return
          }
          let f = m.closest('a')
          if (!f) {
            n = !1
            return
          }
          let b = i.find(({ element: A }) => A === f)
          if (!b || b.selected) {
            n = !1
            return
          }
          let I = i.find(({ selected: A }) => A)
          I && (I.selected = !1),
            (b.selected = !0),
            ({ sortKey: a, direction: l } = b),
            se(i),
            r == null || r.updateContent(b),
            mt(o),
            await p(),
            (n = !1)
        })
      return {
        sortItems: p,
        cleanup: () => {
          c()
        },
      }
    },
    ee = (t) => {
      let e = [],
        o = t.querySelectorAll('a')
      if (o.length) {
        for (let s of o) {
          s.setAttribute(M, 'option')
          let r = s.getAttribute(E.field.key),
            i,
            n
          r &&
            (r.endsWith('-asc')
              ? ((n = 'asc'), (i = r.slice(0, -4)))
              : r.endsWith('-desc')
              ? ((n = 'desc'), (i = r.slice(0, -5)))
              : ((n = 'asc'), (i = r))),
            i && (i = g(i)),
            e.push({ element: s, sortKey: i, direction: n, selected: !1 })
        }
        return e
      }
    },
    oe = (t) => {
      let e = D('dropdownLabel', { operator: 'prefixed', scope: t })
      if (!e) return
      let o = e.innerHTML
      return {
        element: e,
        originalHTML: o,
        updateContent: ({ element: r, sortKey: i }) => {
          e.innerHTML = i ? r.innerHTML : o
        },
      }
    },
    re = (t, e) => {
      t.setAttribute(lt, 'listbox'),
        e.setAttribute(M, 'listbox'),
        e.setAttribute(pt, 'false')
    },
    se = (t) => {
      for (let { element: e, selected: o } of t) {
        if (o) {
          e.setAttribute(H, 'true'), e.classList.add(k)
          continue
        }
        e.removeAttribute(H), e.classList.remove(k)
      }
    }
  var xt = (t, e) => {
      let [o, s] = bt(t.value),
        r = !1,
        i = async (p) => {
          await C(e, { direction: s, sortKey: o, addingItems: p })
        },
        n = S(t, 'change', async () => {
          r || ((r = !0), ([o, s] = bt(t.value)), await i(), (r = !1))
        })
      o && i()
      let a = t.closest('form'),
        l = S(a, 'submit', ne)
      return {
        sortItems: i,
        cleanup: () => {
          n(), l()
        },
      }
    },
    ne = (t) => (t.preventDefault(), t.stopImmediatePropagation(), !1),
    bt = (t) => {
      let e, o
      return (
        t.endsWith('-asc')
          ? ((o = 'asc'), (e = t.slice(0, -4)))
          : t.endsWith('-desc')
          ? ((o = 'desc'), (e = t.slice(0, -5)))
          : ((o = 'asc'), (e = t)),
        (e = g(e)),
        [e, o]
      )
    }
  var {
      element: { key: ie },
      field: { key: ce },
      type: { key: ae },
      duration: { key: le },
      easing: { key: pe },
      ascClass: { key: ue },
      descClass: { key: me },
    } = E,
    _t = (t, e) => {
      let o = t.getInstanceIndex(ie),
        s = D('trigger', { instanceIndex: o, all: !0 })
      if (!s.length) return
      let { items: r } = t
      for (let c of r) c.collectProps({ fieldKey: ce, typeKey: ae })
      if (
        (e.addListAnimation(t, { durationKey: le, easingKey: pe }),
        !t.scrollAnchor)
      ) {
        let c = D('scrollAnchor', { instanceIndex: o })
        c && (t.scrollAnchor = c)
      }
      let i = { asc: t.getAttribute(ue) || nt, desc: t.getAttribute(me) || it },
        [n] = s,
        a = z(n),
        l = n.closest(`.${v.dropdown}`),
        p = a ? xt(n, t) : l ? St(l, t) : Tt(s, t, i)
      if (p) return ct(t, p.sortItems), p.cleanup
    }
  var yt = async () => {
    let t = await J()
    if (!t) return []
    await W(j)
    let e = t.createCMSListInstances([
        st('element', 'list', { operator: 'prefixed' }),
      ]),
      o = e.map((s) => _t(s, t)).filter(U)
    return Q(_, e, () => {
      var s
      for (let r of e) (s = r.destroy) == null || s.call(r)
      for (let r of o) r()
    })
  }
  ot({ init: yt, version: rt, attributeKey: _ })
  Z()
})()