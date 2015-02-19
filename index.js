/* jshint node: true */
'use strict';

var merge = require('merge');

module.exports = {
  name: 'ember-cli-visualeditor',

  treeForPublic: function() {
    var options = this.getOptions(this.app);

    // do not add assets if configured manually
    if (options.manual) {
      return;
    }

    var visualEditorScript;
    if (this.app.env === "production" && !options.forceUnminified) {
      visualEditorScript = "visualEditor.min.js";
    } else {
      visualEditorScript = "visualEditor.js";
    }
    return this.mergeTrees([
      this.pickFiles('node_modules/' + this.name + '/vendor/i18n/', {
        srcDir: '/',
        destDir: 'assets/' + this.name + '/i18n/'
      }),
      this.pickFiles('node_modules/' + this.name + '/vendor/styles/', {
        srcDir: '/',
        destDir: 'assets/' + this.name + '/styles/'
      }),
      this.pickFiles('node_modules/' + this.name + '/vendor/', {
        srcDir: '/',
        destDir: 'assets/' + this.name + '/',
        files: [visualEditorScript]
      })
    ]);
  },

  getOptions: function(app) {
    // Precedence:
    // 1. app/config/environment.js
    // 2. app/Brocfile.js (EmberApp options)
    // 3. addon/configuration/environment.js
    return merge(this.config(app.env)[this.name],
        this.options,
        this.project.config(app.env)[this.name]);
  },

  included: function included(app) {

    var fingerprint = app.options.fingerprint;
    if (fingerprint) {
      fingerprint.exclude = fingerprint.exclude || [];
      fingerprint.exclude.push(this.name);
    }

    var options = this.getOptions(app);
    // do not add assets if configured manually
    if (options.manual) {
      return;
    }

    // Note: including assets is necessary if you have VE extensions as source files (not as addons)
    // in your app
    if (options.includeAssets) {
      app.import("vendor/styles/visualEditor.css");
      if (app.env === "production" && !options.forceUnminified) {
        app.import("vendor/visualEditor.min.js");
      } else {
        app.import("vendor/visualEditor.js");
      }
    }
  },

};
