/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-visualeditor',

  included: function included(app) {

    app.options["ember-cli-visualeditor"] = app.options["ember-cli-visualeditor"] || {
      assetsRoot: "/",
      // include assets into vendor.js and vendor.css
      includeAssets: false,
      // use $.ajax + $.globalEval to load scripts (= $.getScript)
      useEval: false,
      // always use unminified versions
      forceUnminified: false,
      // use this to control assets manuallay (e.g., include you own script tags)
      manual: false,
      // set this if you want to mock-out visual editor code
      // e.g., ATM this is necessary in PhantomJS
      useMock: false
    };

    var options = app.options["ember-cli-visualeditor"];

    // skip if controlling manually
    if (options.manual) {
      return;
    }

    if (options.includeAssets) {
      app.import("vendor/visualEditor.css");

      if (app.env === "production" && !options.forceUnminified) {
        app.import("vendor/visualEditor.min.js");
      } else {
        app.import("vendor/visualEditor.js");
      }

      // TODO: import the other assets as well
    }
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

};
