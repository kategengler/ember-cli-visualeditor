
/* global ve:true, OO:true */

// Note: at the moment, VisualEditor uses singleton factories
// TODO: This factory (and VisualEditor) should support configurable factories in future
var DocumentFactory = function( config ) {
  config = config || {};
  this.nodeFactory = ve.dm.nodeFactory;
  this.annotationFactory = ve.dm.annotationFactory;
  this.metaItemFactory = ve.dm.metaItemFactory;
  this.modelRegistry = ve.dm.modelRegistry;
  this.nodeViewFactory = ve.ce.nodeFactory;
};

OO.initClass(ve.DocumentFactory);

DocumentFactory.prototype.createDocumentFromHtml = function(input, targetDoc) {
  targetDoc = targetDoc || window.document;
  var parser = new DOMParser();
  var doc = parser.parseFromString(input, 'text/html');
  // Create a dm.Document instance from the input html in the #sample element
  // Note: from the interface we would expect that dm.Converter does not use singletons -- but unfortunately it still does
  var converter = new ve.dm.Converter(this.modelRegistry, this.nodeFactory, this.annotationFactory, this.metaItemFactory);
  return converter.getModelFromDom(doc, targetDoc);
};

export default DocumentFactory;
