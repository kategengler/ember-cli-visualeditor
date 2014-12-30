/* globals ve:true, $:true */

import Ember from 'ember';

var VisualEditorModel = Ember.Object.extend({

  // ve.dm.Surface instance
  surface: null,

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
    // Note: at the moment we can not reuse VisualEditor's surface for different content, i.e., the whole thing needs
    // to be created from scratch. To avoid this unnecessarily to happen we compare the current html with the one provided.
    // VE-TODO: see if we can improve VE's API to allow switching the document-model
    var oldHtml = this.toHtml();
    if (oldHtml !== html) {
      var documentModel;
      try {
        var targetDoc = window.document;
        var parser = new DOMParser();
        // TODO: discuss what to do if the html is corrupted
        var doc = parser.parseFromString(html, 'text/html');
        // Create a dm.Document instance from the input html in the #sample element
        // Note: from the interface we would expect that dm.Converter does not use singletons -- but unfortunately it still does
        var converter = new ve.dm.Converter(ve.dm.modelRegistry, ve.dm.nodeFactory, ve.dm.annotationFactory, ve.dm.metaItemFactory);
        documentModel = converter.getModelFromDom(doc, targetDoc);
      } catch (err) {
        console.error('Could not parse HTML content. Wrapping it into preformatted element.');
        documentModel = new vm.dm.DocumentModel([
          'preformatted',
          html,
          '/preformatted'
        ]);
      }
      var surface = new ve.dm.Surface(documentModel);
      this.set('surface', surface);
    }
  },

  toHtml: function() {
    var surface = this.get('surface');
    if (surface) {
      var documentNode = ve.dm.converter.getDomFromModel(surface.getDocument());
      return $(documentNode).find('body').html();
    } else {
      return null;
    }
  },

});

export default VisualEditorModel;
