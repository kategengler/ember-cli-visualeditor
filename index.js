/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-visualeditor',

  included: function included(app) {
    this._super.included(app);

    app.import('vendor/oojs-ui/oojs-ui-apex.svg.css');
    app.import('vendor/visualeditor/visualEditor.css');
    app.import('vendor/visualeditor/i18n/en.json');
    app.import('vendor/visualeditor/i18n/de.json');

    app.import('vendor/jquery.i18n/src/jquery.i18n.js');
    app.import('vendor/jquery.i18n/src/jquery.i18n.messagestore.js');
    app.import('vendor/jquery.i18n/src/jquery.i18n.parser.js');
    app.import('vendor/jquery.i18n/src/jquery.i18n.emitter.js');
    app.import('vendor/jquery.i18n/src/jquery.i18n.language.js');
    app.import('vendor/jquery.i18n/src/jquery.i18n.fallbacks.js');
    app.import('vendor/jquery.i18n/src/languages/bs.js');
    app.import('vendor/jquery.i18n/src/languages/dsb.js');
    app.import('vendor/jquery.i18n/src/languages/fi.js');
    app.import('vendor/jquery.i18n/src/languages/fi.js');
    app.import('vendor/jquery.i18n/src/languages/ga.js');
    app.import('vendor/jquery.i18n/src/languages/he.js');
    app.import('vendor/jquery.i18n/src/languages/hsb.js');
    app.import('vendor/jquery.i18n/src/languages/hu.js');
    app.import('vendor/jquery.i18n/src/languages/hy.js');
    app.import('vendor/jquery.i18n/src/languages/la.js');
    app.import('vendor/jquery.i18n/src/languages/ml.js');
    app.import('vendor/jquery.i18n/src/languages/os.js');
    app.import('vendor/jquery.i18n/src/languages/ru.js');
    app.import('vendor/jquery.i18n/src/languages/sl.js');
    app.import('vendor/jquery.i18n/src/languages/uk.js');

    app.import('vendor/jquery.uls/src/jquery.uls.data.js');
    app.import('vendor/jquery.uls/src/jquery.uls.data.utils.js');

    app.import('vendor/oojs/oojs.jquery.js');
    app.import('vendor/oojs/oojs.jquery.js');
    app.import('vendor/oojs-ui/oojs-ui.js');
    app.import('vendor/oojs-ui/oojs-ui-apex.js');

    var options = {
        destDir: 'assets/themes/apex/images/icons'
    };
    app.import('vendor/oojs-ui/themes/apex/images/icons/add.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/advanced.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/alert.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/arched-arrow-ltr.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/arched-arrow-rtl.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/check.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/clear.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/close.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/code.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/collapse.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/comment.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/expand.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/help.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/info.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/link.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/menu.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/move-ltr.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/move-rtl.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/picture.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/remove.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/search.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/settings.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/tag.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/icons/window.svg', options);
    var options = {
        destDir: 'assets/themes/apex/images/indicators'
    };
    app.import('vendor/oojs-ui/themes/apex/images/indicators/alert.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/indicators/arrow-down.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/indicators/arrow-ltr.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/indicators/arrow-rtl.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/indicators/arrow-up.svg', options);
    app.import('vendor/oojs-ui/themes/apex/images/indicators/required.svg', options);
    var options = {
        destDir: 'assets/themes/apex/images/textures'
    };
    app.import('vendor/oojs-ui/themes/apex/images/textures/pending.gif', options);
    app.import('vendor/oojs-ui/themes/apex/images/textures/transparency.svg', options);
    var options = {
        destDir: 'assets/themes/apex/images'
    };
    app.import('vendor/oojs-ui/themes/apex/images/toolbar-shadow.png', options);

    app.import('vendor/unicodejs/unicodejs.js');
    app.import('vendor/rangefix/rangefix.js');

    app.import('vendor/visualeditor/visualEditor.js');
  }
};
