/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-visualeditor',

  included: function included(app) {
    var options = app.options["ember-cli-visualeditor"] || {
      assetsRoot: "/",
      // include assets into vendor.js and vendor.css
      includeAssets: false,
      // use $.ajax + $.globalEval to load scripts (= $.getScript)
      useEval: false,
      // always use unminified versions
      forceUnminified: false
    };

    if (options.includeAssets) {
      app.import("vendor/visualEditor.css");

      if (app.environment === "production" && !options.forceUnminified) {
        app.import("vendor/visualEditor.min.js");
      } else {
        app.import("vendor/visualEditor.js");
      }
      TODO: import the other assets as well
    }

  }

};
