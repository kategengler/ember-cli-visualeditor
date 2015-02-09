/* globals $:true */

// Used to mock-up VisualEditor API
// WIP: atm we just need it to get the test-suite working

var ve = {};

ve.dm = {};
ve.ce = {};
ve.ui = {};

ve.dm.Document = function() {
  this.connect = function() {};
  this.disconnect = function() {};
};

ve.dm.DocumentModel = function() {
};

ve.dm.Selection = function() {
};

ve.dm.Surface = function(documentModel) {

  this.documentModel = documentModel;
  this.selection = new ve.dm.Selection();

  this.getDocument = function() {
    return this.documentModel;
  };

  this.getFragment = function() {
    return {
      getAnnotations: function() {
        return {
          hasAnnotationWithName: function() { return false; }
        };
      }
    };
  };

  this.getSelection = function() {
    return this.selection;
  };

  this.setNullSelection = function() {
  };

  this.connect = function() {};

  this.disconnect = function() {};

};

ve.dm.Converter = function() {
  this.getModelFromDom = function() {
    return new ve.dm.DocumentModel();
  };
  this.getDomFromModel = function() {
    return new DOMParser().parseFromString('<html><body></body></html>', 'text/html');
  };
};

ve.dm.converter = new ve.dm.Converter();

ve.ce.Surface = function() {
  this.focus = function() {};
};

ve.ui.DesktopSurface = function(surfaceModel) {
  this.element = window.document.createElement('div');
  this.$element = $(this.element);
  this.model = surfaceModel;
  this.view = new ve.ce.Surface();

  this.initialize = function() {};

  this.destroy = function() {};

  this.enable = function() {};

  this.disable = function() {};

  this.getModel = function() {
    return this.model;
  };

  this.getView = function() {
    return this.view;
  };
};

ve.ui.CommandRegistry = function() {
  this.lookup = function() {};
};

ve.ui.commandRegistry = new ve.ui.CommandRegistry();

ve.ui.ToolFactory = function() {
  this.lookup = function() {};
};

ve.ui.toolFactory = new ve.ui.ToolFactory();

export default ve;
