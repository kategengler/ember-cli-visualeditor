/* globals ve: true, $: true */

var _loadedScripts = {};

var _scripts = [
  '/visual-editor/jquery-i18n.min.js',
  '/visual-editor/jquery-uls.min.js',
  '/visual-editor/oojs.min.js',
  '/visual-editor/oojs-ui.min.js',
  '/visual-editor/visualEditor.min.js'
];

var styleSheets = [
  '/visual-editor/oojs-ui-apex.svg.css',
  '/visual-editor/visualEditor.css'
];

var injectScript = function(el, src) {
  return function() {
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
    el.appendChild(scriptEl);
    return promise;
  };
};

var loadScripts = function(scripts) {
  var promise = window.jQuery.Deferred();
  promise.resolve();
  var headEl = document.head || document.getElementsByTagName("head")[0];
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i];
    if (_loadedScripts[src]) {
      continue;
    }
    promise = promise.then(injectScript(headEl, src));
  }
  return promise;
};

var initializeVisualEditor = function(routePrefix) {
  if (routePrefix === undefined) {
    routePrefix = "";
  }

  var scripts = [];
  for (var i = 0; i < _scripts.length; i++) {
    scripts.push(routePrefix + _scripts[i]);
  }

  var promise = loadScripts(scripts)
    .done(function() {
      styleSheets.forEach(function(href) {
        if (!_loadedScripts[href]) {
          $('<link/>', {
             rel: 'stylesheet',
             type: 'text/css',
             href: routePrefix + href
          }).appendTo('head');
          _loadedScripts[href] = true;
        }
      });
      // HACK: this produces a failing request with fallback to 'en'
      // so we use 'en' right away
      if ($.i18n().locale === "en-US") {
        $.i18n().locale = "en";
      }

      ve.init.platform.addMessagePath(routePrefix + '/visual-editor/i18n/oojs-ui/');
      ve.init.platform.addMessagePath(routePrefix + '/visual-editor/i18n/ve/');

      return ve.init.platform.initialize();
    })
    .fail(function() {
      console.error('Failed to load assets for ember-cli-visualeditor', arguments);
    });
  return promise;
};

export default initializeVisualEditor;
