/* globals ve:true, OO:true, $:true */

function initialize( container, application ) {
  // application.deferReadiness();

  // // At the moment we only package the english version
  // // TODO: add all languages to /index.js (app.import)
  // $.i18n().locale = "en";

  // ve.init.platform = new ve.init.sa.Platform();
  // OO.ui.getUserLanguages = ve.init.platform.getUserLanguages.bind( ve.init.platform );
  // OO.ui.msg = ve.init.platform.getMessage.bind( ve.init.platform );
  // ve.init.platform.addMessagePath('./visualeditor/i18n/');
  // ve.init.platform.initialize().done(function () {
  //   application.advanceReadiness();
  // });

}

export default {
  name: 'initialize-visualeditor',
  initialize: initialize
};
