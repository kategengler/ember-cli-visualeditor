/* globals ve:true, $:true */

import Ember from 'ember';

/*
  Requirements:
    - has an empty ve.dm.DocumentModel at first
    - provides fromHtml, toHtml
    - any change to the documentModel triggers
*/

var VisualEditorModel = Ember.Object.extend({

  // ve.dm.Surface instance
  surface: null,

  isEnabled: false,
  isFocused: false,

  init: function() {
    this._super();

    var documentModel = new ve.dm.Document( [
        { type: 'paragraph' },
        { type: '/paragraph' }
      ] );
    var surface = new ve.dm.Surface(documentModel);
    this.set('surface', surface);
  },

  fromHtml: function(html) {
    var targetDoc = window.document;
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    // Create a dm.Document instance from the input html in the #sample element
    // Note: from the interface we would expect that dm.Converter does not use singletons -- but unfortunately it still does
    var converter = new ve.dm.Converter(ve.dm.modelRegistry, ve.dm.nodeFactory, ve.dm.annotationFactory, ve.dm.metaItemFactory);
    var documentModel = converter.getModelFromDom(doc, targetDoc);
    var surface = new ve.dm.Surface(documentModel);
    this.set('surface', surface);
  },

  toHtml: function() {
    var surface = this.get('surface');
    var documentNode = ve.dm.converter.getDomFromModel(surface.getDocument());
    return $(documentNode).find('body').html();
  },

  disable: function() {
    this.set('isEnabled', false);
  },

  enable: function() {
    this.set('isEnabled', true);
  },

  focus: function() {
    this.set('isFocused', true);
  },
});

export default VisualEditorModel;
