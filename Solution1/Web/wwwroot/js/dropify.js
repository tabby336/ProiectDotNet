/*!
 * =============================================================
 * dropify v0.2.0 - Override your input files with style.
 * https://github.com/JeremyFagis/dropify
 *
 * (c) 2015 - Jeremy FAGIS <jeremy@fagis.fr> (http://fagis.fr)
 * =============================================================
 */

! function(e, i) {
    "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof exports ? module.exports = i(require("jquery")) : e.Dropify = i(e.$)
}(this, function(e) {
    function i(i, t) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var s = {
                defaultFile: "",
                maxFileSize: 0,
                messages: {
                    "default": "Drag and drop a file here or click",
                    replace: "Drag and drop or click to replace",
                    remove: "Remove",
                    error: "Sorry, this file is too large"
                },
                tpl: {
                    wrap: '<div class="dropify-wrapper"></div>',
                    message: '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
                    preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
                    filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
                    clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>',
                    error: '<p class="dropify-error">{{ error }}</p>'
                }
            };
            this.element = i, this.input = e(this.element), this.wrapper = null, this.preview = null, this.filenameWrapper = null, this.settings = e.extend(!0, s, t, this.input.data()), this.imgFileFormats = ["png", "jpg", "jpeg", "gif", "bmp"], this.file = null, this.filename = null, this.isDisabled = !1, this.onChange = this.onChange.bind(this), this.clearElement = this.clearElement.bind(this), this.translate(), this.createElements(), this.setSize(), this.input.on("change", this.onChange)
        }
    }
    var t = "dropify";
    return i.prototype.onChange = function() {
        this.resetPreview(), this.setFilename(this.input.val()), this.readUrl(this.element)
    }, i.prototype.createElements = function() {
        this.input.wrap(e(this.settings.tpl.wrap)), this.wrapper = this.input.parent();
        var i = e(this.settings.tpl.message).insertBefore(this.input);
        e(this.settings.tpl.error).appendTo(i), this.isTouchDevice() === !0 && this.wrapper.addClass("touch-fallback"), this.input.attr("disabled") && (this.isDisabled = !0, this.wrapper.addClass("disabled")), this.preview = e(this.settings.tpl.preview), this.preview.insertAfter(this.input), this.isDisabled === !1 && this.settings.disableRemove !== !0 && (this.clearButton = e(this.settings.tpl.clearButton), this.clearButton.insertAfter(this.input), this.clearButton.on("click", this.clearElement)), this.filenameWrapper = e(this.settings.tpl.filename), this.filenameWrapper.prependTo(this.preview.find(".dropify-infos-inner"));
        var t = this.settings.defaultFile || "";
        "" != t.trim() && (this.setFilename(t), this.setPreview(t))
    }, i.prototype.readUrl = function(e) {
        if (e.files && e.files[0]) {
            var i = new FileReader;
            this.file = e.files[0], this.checkFileSize() ? (i.onload = function(e) {
                this.setPreview(e.target.result, this.file.name)
            }.bind(this), i.readAsDataURL(this.file)) : (this.wrapper.addClass("has-error"), this.resetPreview(), this.clearElement())
        }
    }, i.prototype.setPreview = function(i) {
        this.wrapper.removeClass("has-error").addClass("has-preview");
        var t = this.preview.children(".dropify-render");
        this.isImage() === !0 ? e("<img />").attr("src", i).appendTo(t) : (e("<i />").attr("class", "dropify-font-file").appendTo(t), e('<span class="dropify-extension" />').html(this.getFileType()).appendTo(t)), this.preview.fadeIn()
    }, i.prototype.resetPreview = function() {
        this.wrapper.removeClass("has-preview");
        var e = this.preview.children(".dropify-render");
        e.find(".dropify-extension").remove(), e.find("i").remove(), e.find("img").remove(), this.preview.hide()
    }, i.prototype.getFilename = function(e) {
        var i = e.split("\\").pop();
        return i == e && (i = e.split("/").pop()), "" != e ? i : ""
    }, i.prototype.setFilename = function(e) {
        var e = this.getFilename(e);
        this.filename = e, this.filenameWrapper.children(".dropify-filename-inner").html(e)
    }, i.prototype.clearElement = function() {
        var i = e.Event("dropify.beforeClear");
        if (this.input.trigger(i, [this]), i.result !== !1) {
            this.file = null, this.input.val(""), this.resetPreview();
            var t = e.Event("dropify.afterClear");
            this.input.trigger(t, [this])
        }
    }, i.prototype.setSize = function() {
        this.settings.height && this.wrapper.height(this.settings.height)
    }, i.prototype.isTouchDevice = function() {
        return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    }, i.prototype.getFileType = function() {
        return this.filename.split(".").pop().toLowerCase()
    }, i.prototype.isImage = function() {
        return "-1" != this.imgFileFormats.indexOf(this.getFileType()) ? !0 : !1
    }, i.prototype.translate = function() {
        for (var e in this.settings.tpl)
            for (var i in this.settings.messages) this.settings.tpl[e] = this.settings.tpl[e].replace("{{ " + i + " }}", this.settings.messages[i])
    }, i.prototype.checkFileSize = function() {
        return 0 === this.maxFileSizeToByte() || this.file.size <= this.maxFileSizeToByte() ? !0 : !1
    }, i.prototype.maxFileSizeToByte = function() {
        var e = 0;
        if (0 !== this.settings.maxFileSize) {
            var i = this.settings.maxFileSize.slice(-1).toUpperCase(),
                t = 1024,
                s = 1024 * t,
                r = 1024 * s;
            "K" === i ? e = parseFloat(this.settings.maxFileSize) * t : "M" === i ? e = parseFloat(this.settings.maxFileSize) * s : "G" === i && (e = parseFloat(this.settings.maxFileSize) * r)
        }
        return e
    }, e.fn[t] = function(s) {
        return this.each(function() {
            e.data(this, "plugin_" + t) || e.data(this, "plugin_" + t, new i(this, s))
        }), this
    }, i
});
