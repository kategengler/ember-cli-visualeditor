/* globals ve: true, $: true */

var _loadedScripts = {};

var _scripts = [
  '/visual-editor/lib/jquery.i18n/src/jquery.i18n.js',
  '/visual-editor/lib/jquery.i18n/src/jquery.i18n.messagestore.js',
  '/visual-editor/lib/jquery.i18n/src/jquery.i18n.parser.js',
  '/visual-editor/lib/jquery.i18n/src/jquery.i18n.emitter.js',
  '/visual-editor/lib/jquery.i18n/src/jquery.i18n.language.js',
  '/visual-editor/lib/jquery.i18n/src/jquery.i18n.fallbacks.js',
  '/visual-editor/lib/jquery.i18n/src/languages/bs.js',
  '/visual-editor/lib/jquery.i18n/src/languages/dsb.js',
  '/visual-editor/lib/jquery.i18n/src/languages/fi.js',
  '/visual-editor/lib/jquery.i18n/src/languages/fi.js',
  '/visual-editor/lib/jquery.i18n/src/languages/ga.js',
  '/visual-editor/lib/jquery.i18n/src/languages/he.js',
  '/visual-editor/lib/jquery.i18n/src/languages/hsb.js',
  '/visual-editor/lib/jquery.i18n/src/languages/hu.js',
  '/visual-editor/lib/jquery.i18n/src/languages/hy.js',
  '/visual-editor/lib/jquery.i18n/src/languages/la.js',
  '/visual-editor/lib/jquery.i18n/src/languages/ml.js',
  '/visual-editor/lib/jquery.i18n/src/languages/os.js',
  '/visual-editor/lib/jquery.i18n/src/languages/ru.js',
  '/visual-editor/lib/jquery.i18n/src/languages/sl.js',
  '/visual-editor/lib/jquery.i18n/src/languages/uk.js',
  '/visual-editor/lib/jquery.uls/src/jquery.uls.data.js',
  '/visual-editor/lib/jquery.uls/src/jquery.uls.data.utils.js',
  '/visual-editor/lib/oojs/oojs.jquery.js',
  '/visual-editor/lib/oojs-ui/oojs-ui.js',
  '/visual-editor/lib/oojs-ui/oojs-ui-apex.js',
  '/visual-editor/visualEditor.js'
];

var styleSheets = [
  '/visual-editor/lib/oojs-ui/oojs-ui-apex.svg.css',
  '/visual-editor/visualEditor.css'
];

var injectScript = function(el, src) {
  return function() {
    var promise = window.jQuery.Deferred();
    var scriptEl = window.document.createElement('script');
    scriptEl.type = "text\/javascript";
    scriptEl.src = src;
    scriptEl.onload = function() {
      console.log("loaded ", src);
      promise.resolve();
      _loadedScripts[src] = true;
    };
    scriptEl.onerror = function (error) {
      console.error('could not load', src);
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

      ve.init.platform.addMessagePath(routePrefix + '/visual-editor/lib/oojs-ui/i18n/');
      ve.init.platform.addMessagePath(routePrefix + '/visual-editor/modules/ve/i18n/');

      return ve.init.platform.initialize();
    })
    .fail(function() {
      console.error('Failed to load assets for ember-cli-visualeditor', arguments);
    });
  return promise;
};

export default initializeVisualEditor;
