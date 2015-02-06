/* globals ve: true, $: true */

var _loadedScripts = {};

// This version injects a script instead of using global.eval
// which eases debugging (e.g., stacktraces make sense)
var loadScriptDebug = function(src) {
  var headEl = document.head || document.getElementsByTagName("head")[0];
  var promise = window.jQuery.Deferred();
  var scriptEl = window.document.createElement('script');
  scriptEl.type = "text\/javascript";
  scriptEl.src = src;
  scriptEl.onload = function() {
    promise.resolve();
    _loadedScripts[src] = true;
  };
  scriptEl.onerror = function (error) {
    console.error('Could not load', src);
    promise.reject(new URIError("The script " + error.target.src + " is not accessible."));
  };
  headEl.appendChild(scriptEl);
  return promise;
};

var loadScript = function(src) {
  if (_loadedScripts[src]) {
    return window.jQuery.Deferred().resolve();
  } else {
    return $.getScript(src).done(function() {
      _loadedScripts[src] = true;
    });
  }
};

var initializeVisualEditor = function(options) {
  options = options || {};
  var routePrefix = options.routePrefix || "";

  var promise;
  var scriptSrc;

  if (options.environment === "production") {
    scriptSrc = routePrefix + "/visual-editor/visual-editor.min.js";
  } else {
    scriptSrc = routePrefix + "/visual-editor/visual-editor.js";
  }

  if (options.debug) {
    promise = loadScriptDebug(scriptSrc);
  } else {
    promise = loadScript(scriptSrc);
  }

  promise.done(function() {
    var stylesheet = routePrefix + "/visual-editor/visual-editor.css";
    if (!_loadedScripts[stylesheet]) {
      $('<link/>', {
         rel: 'stylesheet',
         type: 'text/css',
         href: stylesheet
      }).appendTo('head');
      _loadedScripts[stylesheet] = true;
    }
    // HACK: this produces a failing request with fallback to 'en'
    // so we use 'en' right away
    if ($.i18n().locale === "en-US") {
      $.i18n().locale = "en";
    }

    ve.init.platform.addMessagePath(routePrefix + '/visual-editor/i18n/oojs-ui/');
    ve.init.platform.addMessagePath(routePrefix + '/visual-editor/i18n/ve/');

    return ve.init.platform.initialize();
  }).fail(function() {
    console.error('Failed to load assets for ember-cli-visualeditor', arguments);
  });

  return promise;
};

export default initializeVisualEditor;
