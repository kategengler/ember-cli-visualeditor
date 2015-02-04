/* globals ve: true, $: true */

var scripts = [
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

var initializeVisualEditor = function(routePrefix) {
  if (routePrefix === undefined) {
    routePrefix = "";
  }
  var promise = $.Deferred();
  var chain = null;

  function _loadScript(script) {
    var scriptPath = routePrefix + script;
    console.log("Loading", scriptPath);
    return $.getScript(scriptPath);
  }

  scripts.forEach(function(script) {
    if (!chain) {
      chain = promise.then(function() {
        return _loadScript(script);
      });
    } else {
      chain = chain.then(function() {
        return _loadScript(script);
      });
    }
  });
  chain.then(function() {
    initializeVisualEditor.loaded = true;

    styleSheets.forEach(function(href) {
      $('<link/>', {
         rel: 'stylesheet',
         type: 'text/css',
         href: routePrefix + href
      }).appendTo('head');
    });

    // HACK: this produces a failing request with fallback to 'en'
    // so we use 'en' right away
    if ($.i18n().locale === "en-US") {
      $.i18n().locale = "en";
    }

    ve.init.platform.addMessagePath(routePrefix + '/visual-editor/lib/oojs-ui/i18n/');
    ve.init.platform.addMessagePath(routePrefix + '/visual-editor/modules/ve/i18n/');

    return ve.init.platform.initialize();
  });
  chain.fail(function() {
    console.error('Failed to load assets for ember-cli-visualeditor', arguments);
  });
  promise.resolve();
  return chain;
};

initializeVisualEditor.loaded = false;

export default initializeVisualEditor;
