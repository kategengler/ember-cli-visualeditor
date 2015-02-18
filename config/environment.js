
module.exports = function(environment, appEnv) {
  var ENV = {
    "ember-cli-visualeditor": {
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
    }
  };

  return ENV;
};
