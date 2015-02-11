/* globals $:true */

// Used to mock-up VisualEditor API
// I.e., no selection and manipulation is possible.
// Only creating a Surface and setting and getting its HTML content.

var ve = {};

ve.dm = {};
ve.ce = {};
ve.ui = {};

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// Note: in this mock we do not map to a VE data model but use HTML as model
//   i.e. this is a mix of dm.DocumentNode and ce.DocumentNode
ve.dm.DocumentNode = function(data) {
  this.element = window.document.createElement('div');

  if (data instanceof window.Document) {
    this.element.innerHTML = data.body.innerHTML;
  } else if (data instanceof window.Element) {
    this.element = data;
  }

  this.$element = $(this.element);
  this.$element.addClass('ve-ce-documentNode');
  this.$element.attr('id', 've-mock-body');
};

ve.dm.Document = function(data) {
  this.documentNode = new ve.dm.DocumentNode(data);

  this.getDocumentNode = function() {
    return this.documentNode;
  };
  this.connect = function() {};
  this.disconnect = function() {};
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

  this.getModelFromDom = function(htmlDoc) {
    return new ve.dm.Document(htmlDoc);
  };

  this.getDomFromModel = function(documentModel) {
    var html = documentModel.getDocumentNode().element.innerHTML;
    var doc = window.document.implementation.createHTMLDocument();
    var body = doc.body || doc.getElementsByTagName('body')[0];
    body.innerHTML = html;
    return doc;
  };

};
ve.dm.converter = new ve.dm.Converter();

ve.ce.Surface = function(model) {

  this.element = window.document.createElement('div');
  this.$element = $(this.element);
  this.$element.addClass('ve-ce-surface');
  this.model = model;

  // quasi rendering the document by appending the DocumentNode's element
  this.element.appendChild(model.getDocument().getDocumentNode().element);

  this.focus = function() {};

};

ve.ui.DesktopSurface = function(surfaceModel) {

  this.element = window.document.createElement('div');
  this.$element = $(this.element);
  this.$element.addClass('ve-ui-surface');

  this.surfaceModel = surfaceModel;
  this.view = new ve.ce.Surface(surfaceModel);
  this.$element.append(this.view.$element);

  this.initialize = function() {};

  this.destroy = function() {};

  this.enable = function() {};

  this.disable = function() {};

  this.getModel = function() {
    return this.surfaceModel;
  };

  this.getView = function() {
    return this.view;
  };
};

// this registry does not provide any command
ve.ui.CommandRegistry = function() {
  this.lookup = function() {};
};
ve.ui.commandRegistry = new ve.ui.CommandRegistry();

// this factory does not provide any tool
ve.ui.ToolFactory = function() {
  this.lookup = function() {};
};
ve.ui.toolFactory = new ve.ui.ToolFactory();

export default ve;
