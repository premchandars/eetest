/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*!
 * froala_editor v2.2.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function(a) {
    "use strict";
    a.extend(a.FE.POPUP_TEMPLATES, {
        "link.edit": "[_BUTTONS_]",
        "link.insert": "[_BUTTONS_][_INPUT_LAYER_]"
    }), a.extend(a.FE.DEFAULTS, {
        linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"],
        linkInsertButtons: ["linkBack", "|", "linkList"],
        linkAttributes: {},
        linkAutoPrefix: "http://",
        linkStyles: {
            "fr-green": "Green",
            "fr-strong": "Thick"
        },
        linkMultipleStyles: !0,
        linkConvertEmailAddress: !0,
        linkAlwaysBlank: !1,
        linkAlwaysNoFollow: !1,
        linkList: [{
            text: "Froala",
            href: "https://froala.com",
            target: "_blank"
        }, {
            text: "Google",
            href: "https://google.com",
            target: "_blank"
        }, {
            displayText: "Facebook",
            href: "https://facebook.com"
        }],
        linkText: !0
    }), a.FE.PLUGINS.link = function(b) {
        function c() {
            var c = b.image ? b.image.get() : null;
            if (!c && b.$wp) {
                var d = b.selection.element(),
                    e = b.selection.endElement();
                return "A" != d.tagName && (d = a(d).parents("a:first").get(0)), "A" != e.tagName && (e = a(e).parents("a:first").get(0)), e && e == d ? d : null
            }
            return "A" == b.$el.get(0).tagName && b.core.hasFocus() ? b.$el : c && c.get(0).parentNode && "A" == c.get(0).parentNode.tagName ? c.get(0).parentNode : void 0
        }

        function d() {
            var a = b.image ? b.image.get() : null,
                c = [];
            if (a) "A" == a.get(0).parentNode.tagName && c.push(a.get(0).parentNode);
            else {
                var d, e, f, g;
                if (b.win.getSelection) {
                    var h = b.win.getSelection();
                    if (h.getRangeAt && h.rangeCount) {
                        g = b.doc.createRange();
                        for (var i = 0; i < h.rangeCount; ++i)
                            if (d = h.getRangeAt(i), e = d.commonAncestorContainer, e && 1 != e.nodeType && (e = e.parentNode), e && "a" == e.nodeName.toLowerCase()) c.push(e);
                            else {
                                f = e.getElementsByTagName("a");
                                for (var j = 0; j < f.length; ++j) g.selectNodeContents(f[j]), g.compareBoundaryPoints(d.END_TO_START, d) < 1 && g.compareBoundaryPoints(d.START_TO_END, d) > -1 && c.push(f[j])
                            }
                    }
                } else if (b.doc.selection && "Control" != b.doc.selection.type)
                    if (d = b.doc.selection.createRange(), e = d.parentElement(), "a" == e.nodeName.toLowerCase()) c.push(e);
                    else {
                        f = e.getElementsByTagName("a"), g = b.doc.body.createTextRange();
                        for (var k = 0; k < f.length; ++k) g.moveToElementText(f[k]), g.compareEndPoints("StartToEnd", d) > -1 && g.compareEndPoints("EndToStart", d) < 1 && c.push(f[k])
                    }
            }
            return c
        }

        function e(d) {
            b.popups.hide("link.edit"), setTimeout(function() {
                if (!d || d && (1 == d.which || "mouseup" != d.type)) {
                    var e = c(),
                        g = b.image ? b.image.get() : null;
                    if (e && !g) {
                        if (b.image) {
                            var h = b.node.contents(e);
                            if (1 == h.length && "IMG" == h[0].tagName) return a(h[0]).trigger("click"), !1
                        }
                        d && d.stopPropagation(), f(e)
                    }
                }
            }, b.helpers.isIOS() ? 100 : 0)
        }

        function f(c) {
            var d = b.popups.get("link.edit");
            d || (d = h());
            var e = a(c);
            b.popups.isVisible("link.edit") || b.popups.refresh("link.edit"), b.popups.setContainer("link.edit", a(b.opts.scrollableContainer));
            var f = e.offset().left + a(c).outerWidth() / 2,
                g = e.offset().top + e.outerHeight();
            b.popups.show("link.edit", f, g, e.outerHeight())
        }

        function g() {
            b.popups.hide("link.edit")
        }

        function h() {
            var a = "";
            b.opts.linkEditButtons.length > 1 && ("A" == b.$el.get(0).tagName && b.opts.linkEditButtons.indexOf("linkRemove") >= 0 && b.opts.linkEditButtons.splice(b.opts.linkEditButtons.indexOf("linkRemove"), 1), a = '<div class="fr-buttons">' + b.button.buildList(b.opts.linkEditButtons) + "</div>");
            var d = {
                    buttons: a
                },
                e = b.popups.create("link.edit", d);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-edit", function() {
                c() && b.popups.isVisible("link.edit") && f(c())
            }), e
        }

        function i() {}

        function j() {
            var d = b.popups.get("link.insert"),
                e = c();
            if (e) {
                var f, g, h = a(e),
                    i = d.find('input.fr-link-attr[type="text"]'),
                    j = d.find('input.fr-link-attr[type="checkbox"]');
                for (f = 0; f < i.length; f++) g = a(i[f]), g.val(h.attr(g.attr("name") || ""));
                for (j.prop("checked", !1), f = 0; f < j.length; f++) g = a(j[f]), h.attr(g.attr("name")) == g.data("checked") && g.prop("checked", !0);
                d.find('input.fr-link-attr[type="text"][name="text"]').val(h.text())
            } else d.find('input.fr-link-attr[type="text"]').val(""), d.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1), d.find('input.fr-link-attr[type="text"][name="text"]').val(b.selection.text());
            d.find("input.fr-link-attr").trigger("change");
            var k = b.image ? b.image.get() : null;
            k ? d.find('.fr-link-attr[name="text"]').parent().hide() : d.find('.fr-link-attr[name="text"]').parent().show()
        }

        function k() {
            var c = b.$tb.find('.fr-command[data-cmd="insertLink"]'),
                d = b.popups.get("link.insert");
            if (d || (d = l()), !d.hasClass("fr-active"))
                if (b.popups.refresh("link.insert"), b.popups.setContainer("link.insert", b.$tb || a(b.opts.scrollableContainer)), c.is(":visible")) {
                    var e = c.offset().left + c.outerWidth() / 2,
                        f = c.offset().top + (b.opts.toolbarBottom ? 10 : c.outerHeight() - 10);
                    b.popups.show("link.insert", e, f, c.outerHeight())
                } else b.position.forSelection(d), b.popups.show("link.insert")
        }

        function l(a) {
            if (a) return b.popups.onRefresh("link.insert", j), b.popups.onHide("link.insert", i), !0;
            var d = "";
            b.opts.linkInsertButtons.length >= 1 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.linkInsertButtons) + "</div>");
            var e = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>',
                f = "",
                g = 0;
            f = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + b.id + '">', f += '<div class="fr-input-line"><input name="href" type="text" class="fr-link-attr" placeholder="URL" tabIndex="' + ++g + '"></div>', b.opts.linkText && (f += '<div class="fr-input-line"><input name="text" type="text" class="fr-link-attr" placeholder="' + b.language.translate("Text") + '" tabIndex="' + ++g + '"></div>');
            for (var h in b.opts.linkAttributes) {
                var k = b.opts.linkAttributes[h];
                f += '<div class="fr-input-line"><input name="' + h + '" type="text" class="fr-link-attr" placeholder="' + b.language.translate(k) + '" tabIndex="' + ++g + '"></div>'
            }
            b.opts.linkAlwaysBlank || (f += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + b.id + '" tabIndex="' + ++g + '"><span>' + e + '</span></span><label for="fr-link-target-' + b.id + '">' + b.language.translate("Open in new tab") + "</label></div>"), f += '<div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="linkInsert" href="#" tabIndex="' + ++g + '" type="button">' + b.language.translate("Insert") + "</button></div></div>";
            var l = {
                    buttons: d,
                    input_layer: f
                },
                m = b.popups.create("link.insert", l);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-insert", function() {
                var a = b.image ? b.image.get() : null;
                a && b.popups.isVisible("link.insert") && u(), c && b.popups.isVisible("link.insert") && s()
            }), m
        }

        function m() {
            var d = c(),
                e = b.image ? b.image.get() : null;
            return b.events.trigger("link.beforeRemove", [d]) === !1 ? !1 : void(e && d ? (e.unwrap(), e.trigger("click")) : d && (b.selection.save(), a(d).replaceWith(a(d).html()), b.selection.restore(), g()))
        }

        function n() {
            b.events.on("keyup", function(b) {
                b.which != a.FE.KEYCODE.ESC && e(b)
            }), b.events.on("window.mouseup", e), l(!0), "A" == b.$el.get(0).tagName && b.$el.addClass("fr-view")
        }

        function o(c) {
            var d, e, f = b.opts.linkList[c],
                g = b.popups.get("link.insert"),
                h = g.find('input.fr-link-attr[type="text"]'),
                i = g.find('input.fr-link-attr[type="checkbox"]');
            for (e = 0; e < h.length; e++) d = a(h[e]), f[d.attr("name")] ? d.val(f[d.attr("name")]) : d.val("");
            for (e = 0; e < i.length; e++) d = a(i[e]), d.prop("checked", d.data("checked") == f[d.attr("name")])
        }

        function p() {
            var c, d, e = b.popups.get("link.insert"),
                f = e.find('input.fr-link-attr[type="text"]'),
                g = e.find('input.fr-link-attr[type="checkbox"]'),
                h = f.filter('[name="href"]').val(),
                i = f.filter('[name="text"]').val(),
                j = {};
            for (d = 0; d < f.length; d++) c = a(f[d]), ["href", "text"].indexOf(c.attr("name")) < 0 && (j[c.attr("name")] = c.val());
            for (d = 0; d < g.length; d++) c = a(g[d]), c.is(":checked") ? j[c.attr("name")] = c.data("checked") : j[c.attr("name")] = c.data("unchecked");
            var k = a(b.o_win).scrollTop();
            r(h, i, j), a(b.o_win).scrollTop(k)
        }

        function q() {
            if (!b.selection.isCollapsed()) {
                b.selection.save();
                for (var c = b.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); c.length;) {
                    var d = a(c.pop());
                    d.removeClass("fr-unprocessed");
                    var e = b.node.deepestParent(d.get(0));
                    if (e) {
                        var f = d.get(0),
                            g = "",
                            h = "";
                        do f = f.parentNode, b.node.isBlock(f) || (g += b.node.closeTagString(f), h = b.node.openTagString(f) + h); while (f != e);
                        var i = b.node.openTagString(d.get(0)) + d.html() + b.node.closeTagString(d.get(0));
                        d.replaceWith('<span id="fr-break"></span>');
                        var j = a(e).html();
                        j = j.replace(/<span id="fr-break"><\/span>/g, g + i + h), a(e).html(j)
                    }
                    c = b.$el.find(".fr-marker.fr-unprocessed").toArray()
                }
                b.selection.restore()
            }
        }

        function r(f, g, h) {
            "undefined" == typeof h && (h = {});
            var i = b.image ? b.image.get() : null;
            i || "A" == b.$el.get(0).tagName ? "A" == b.$el.get(0).tagName && b.$el.focus() : (b.selection.restore(), b.popups.hide("link.insert"));
            var j = f;
            if (b.opts.linkConvertEmailAddress) {
                var k = /^[\w._]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;
                k.test(f) && 0 !== f.indexOf("mailto:") && (f = "mailto:" + f)
            }
            if (0 === f.indexOf("tel:") || 0 === f.indexOf("sms:") || 0 === f.indexOf("mailto:") || 0 === f.indexOf("notes:") || 0 === f.indexOf("data:image") || "" === b.opts.linkAutoPrefix || /^(https?:|ftps?:|)\/\//.test(f) || (f = b.opts.linkAutoPrefix + f), f = b.helpers.sanitizeURL(f), b.opts.linkAlwaysBlank && (h.target = "_blank"), b.opts.linkAlwaysNoFollow && (h.rel = "nofollow"), g = g || "", f === b.opts.linkAutoPrefix) {
                var l = b.popups.get("link.insert");
                return l.find('input[name="href"]').addClass("fr-error"), b.events.trigger("link.bad", [j]), !1
            }
            var m, n = c();
            if (n) {
                m = a(n);
                var o = b.node.rawAttributes(n);
                for (var p in o) "class" != p && "style" != p && m.removeAttr(p);
                m.attr("href", f), g.length > 0 && m.text() != g && !i && m.text(g), i || m.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER), m.attr(h), i || b.selection.restore()
            } else {
                i ? i.wrap('<a href="' + f + '"></a>') : (b.doc.execCommand("unlink", !1, !1), b.selection.isCollapsed() ? (g = 0 === g.length ? j : g, b.html.insert('<a href="' + f + '">' + a.FE.START_MARKER + g + a.FE.END_MARKER + "</a>"), b.selection.restore()) : g.length > 0 && g != b.selection.text() ? (b.selection.remove(), b.html.insert('<a href="' + f + '">' + a.FE.START_MARKER + g + a.FE.END_MARKER + "</a>"), b.selection.restore()) : (q(), b.doc.execCommand("createLink", !1, f)));
                for (var r = d(), s = 0; s < r.length; s++) m = a(r[s]), m.attr(h), m.removeAttr("_moz_dirty");
                1 == r.length && b.$wp && !i && (a(r[0]).prepend(a.FE.START_MARKER).append(a.FE.END_MARKER), b.selection.restore())
            }
            i ? (i.trigger("touchstart"), i.trigger(b.helpers.isMobile() ? "touchend" : "click")) : (b.popups.get("link.insert"), e())
        }

        function s() {
            g();
            var d = c();
            if (d) {
                var e = b.popups.get("link.insert");
                e || (e = l()), b.popups.isVisible("link.insert") || (b.popups.refresh("link.insert"), b.selection.save(), b.helpers.isMobile() && (b.events.disableBlur(), b.$el.blur(), b.events.enableBlur())), b.popups.setContainer("link.insert", a(b.opts.scrollableContainer));
                var f = (b.image ? b.image.get() : null) || a(d),
                    h = f.offset().left + f.outerWidth() / 2,
                    i = f.offset().top + f.outerHeight();
                b.popups.show("link.insert", h, i, f.outerHeight())
            }
        }

        function t() {
            var a = b.image ? b.image.get() : null;
            if (a) a.trigger("click").trigger("touchend");
            else {
                b.events.disableBlur(), b.selection.restore(), b.events.enableBlur();
                var d = c();
                d && b.$wp ? (b.selection.restore(), g(), e()) : "A" == b.$el.get(0).tagName ? (b.$el.focus(), e()) : (b.popups.hide("link.insert"), b.toolbar.showInline())
            }
        }

        function u() {
            var c = b.image ? b.image.get() : null;
            if (c) {
                var d = b.popups.get("link.insert");
                d || (d = l()), j(!0), b.popups.setContainer("link.insert", a(b.opts.scrollableContainer));
                var e = c.offset().left + c.outerWidth() / 2,
                    f = c.offset().top + c.outerHeight();
                b.popups.show("link.insert", e, f, c.outerHeight())
            }
        }

        function v(d) {
            var e = c();
            if (!e) return !1;
            if (!b.opts.linkMultipleStyles) {
                var f = Object.keys(b.opts.linkStyles);
                f.splice(f.indexOf(d), 1), a(e).removeClass(f.join(" "))
            }
            a(e).toggleClass(d)
        }
        return {
            _init: n,
            remove: m,
            showInsertPopup: k,
            usePredefined: o,
            insertCallback: p,
            insert: r,
            update: s,
            get: c,
            allSelected: d,
            back: t,
            imageLink: u,
            applyStyle: v
        }
    }, a.FE.DefineIcon("insertLink", {
        NAME: "link"
    }), a.FE.RegisterShortcut(75, "insertLink"), a.FE.RegisterCommand("insertLink", {
        title: "Insert Link",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker") && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup()
        },
        plugin: "link"
    }), a.FE.DefineIcon("linkOpen", {
        NAME: "external-link"
    }), a.FE.RegisterCommand("linkOpen", {
        title: "Open Link",
        undo: !1,
        refresh: function(a) {
            var b = this.link.get();
            b ? a.removeClass("fr-hidden") : a.addClass("fr-hidden")
        },
        callback: function() {
            var a = this.link.get();
            a && this.o_win.open(a.href)
        }
    }), a.FE.DefineIcon("linkEdit", {
        NAME: "edit"
    }), a.FE.RegisterCommand("linkEdit", {
        title: "Edit Link",
        undo: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.update()
        },
        refresh: function(a) {
            var b = this.link.get();
            b ? a.removeClass("fr-hidden") : a.addClass("fr-hidden")
        }
    }), a.FE.DefineIcon("linkRemove", {
        NAME: "unlink"
    }), a.FE.RegisterCommand("linkRemove", {
        title: "Unlink",
        callback: function() {
            this.link.remove()
        },
        refresh: function(a) {
            var b = this.link.get();
            b ? a.removeClass("fr-hidden") : a.addClass("fr-hidden")
        }
    }), a.FE.DefineIcon("linkBack", {
        NAME: "arrow-left"
    }), a.FE.RegisterCommand("linkBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.back()
        },
        refresh: function(a) {
            var b = this.link.get(),
                c = this.image ? this.image.get() : null;
            c || b || this.opts.toolbarInline ? (a.removeClass("fr-hidden"), a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"), a.next(".fr-separator").addClass("fr-hidden"))
        }
    }), a.FE.DefineIcon("linkList", {
        NAME: "search"
    }), a.FE.RegisterCommand("linkList", {
        title: "Choose Link",
        type: "dropdown",
        focus: !1,
        undo: !1,
        refreshAfterCallback: !1,
        html: function() {
            for (var a = '<ul class="fr-dropdown-list">', b = this.opts.linkList, c = 0; c < b.length; c++) a += '<li><a class="fr-command" data-cmd="linkList" data-param1="' + c + '">' + (b[c].displayText || b[c].text) + "</a></li>";
            return a += "</ul>"
        },
        callback: function(a, b) {
            this.link.usePredefined(b)
        }
    }), a.FE.RegisterCommand("linkInsert", {
        focus: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.insertCallback()
        },
        refresh: function(a) {
            var b = this.link.get();
            b ? a.text(this.language.translate("Update")) : a.text(this.language.translate("Insert"))
        }
    }), a.FE.DefineIcon("imageLink", {
        NAME: "link"
    }), a.FE.RegisterCommand("imageLink", {
        title: "Insert Link",
        undo: !1,
        focus: !1,
        callback: function() {
            this.link.imageLink()
        },
        refresh: function(a) {
            var b, c = this.link.get();
            c ? (b = a.prev(), b.hasClass("fr-separator") && b.removeClass("fr-hidden"), a.addClass("fr-hidden")) : (b = a.prev(), b.hasClass("fr-separator") && b.addClass("fr-hidden"), a.removeClass("fr-hidden"))
        }
    }), a.FE.DefineIcon("linkStyle", {
        NAME: "magic"
    }), a.FE.RegisterCommand("linkStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var a = '<ul class="fr-dropdown-list">',
                b = this.opts.linkStyles;
            for (var c in b) a += '<li><a class="fr-command" data-cmd="linkStyle" data-param1="' + c + '">' + this.language.translate(b[c]) + "</a></li>";
            return a += "</ul>"
        },
        callback: function(a, b) {
            this.link.applyStyle(b)
        },
        refreshOnShow: function(b, c) {
            var d = this.link.get();
            if (d) {
                var e = a(d);
                c.find(".fr-command").each(function() {
                    var b = a(this).data("param1");
                    a(this).toggleClass("fr-active", e.hasClass(b))
                })
            }
        }
    })
});