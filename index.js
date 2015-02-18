/* jshint node: true */
'use strict';

var _ = require('lodash-node');

module.exports = {
  name: 'ember-cli-visualeditor',

  treeForPublic: function() {
    return this.pickFiles('node_modules/ember-cli-visualeditor/vendor', {
      srcDir: '/',
      destDir: 'assets/ember-cli-visualeditor'
    });
  },

  getOptions: function(app) {
    // Precedence:
    // 1. app/config/environment.js
    // 2. app/Brocfile.js (EmberApp options)
    // 3. addon/configuration/environment.js
    return _.merge(this.config(app.env)[this.name],
        this.options,
        this.project.config(app.env)[this.name]);
  },

  included: function included(app) {
    var options = this.getOptions(app);
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

};
