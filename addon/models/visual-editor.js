/* globals ve:true, $:true */

import Ember from 'ember';
import SurfaceState from 'ember-cli-visualeditor/lib/surface-state';

var VisualEditorModel = Ember.Object.extend(Ember.Evented, {

  // ve.dm.Surface instance
  surface: null,

  surfaceState: SurfaceState.create(),

  init: function() {
    this._super();
    // initialize with an empty model
    var documentModel = new ve.dm.Document([]);
    var surface = new ve.dm.Surface(documentModel);
    this.set('surface', surface);
  },

  fromHtml: function(html) {
    html = html || "";
    // Note: at the moment we can not reuse VisualEditor's surface for different content, i.e., the whole thing needs
    // to be created from scratch. To avoid this unnecessarily to happen we compare the current html with the one provided.
    // VE-TODO: see if we can improve VE's API to allow switching the document-model
    var oldHtml = this.toHtml();
    if (oldHtml !== html) {
      var documentModel;
      var htmlDoc = window.document.implementation.createHTMLDocument();
      var body = htmlDoc.body || htmlDoc.getElementsByTagName('body')[0];
      try {
        body.innerHTML = html;
      } catch (error) {
        // TODO: discuss what to do if the html is corrupted
        body.innerHTML = "<pre>Invalid Document</pre>";
      }
      // Create a dm.Document instance from the input html in the #sample element
      // Note: from the interface we would expect that dm.Converter does not use singletons -- but unfortunately it still does
      var converter = new ve.dm.Converter(ve.dm.modelRegistry, ve.dm.nodeFactory, ve.dm.annotationFactory, ve.dm.metaItemFactory);
      documentModel = converter.getModelFromDom(htmlDoc, window.document);
      var surface = new ve.dm.Surface(documentModel);
      this.set('surface', surface);
    }
  },

  toHtml: function() {
    var surface = this.get('surface');
    if (surface) {
      var documentNode = ve.dm.converter.getDomFromModel(surface.getDocument());
      var html = $(documentNode).find('body').html();
      console.log("VisualEditor.toHtml()", html);
      return html;
    } else {
      return null;
    }
  },

  diconnectSurface: function() {
    var surface = this.get('surface');
    if (surface) {
      surface.disconnect(this, {
        'select': 'onSelectionChange',
        'contextChange': 'onContextChange'
      });
    }
  }.observesBefore('surface'),

  connectSurface: function() {
    var surface = this.get('surface');
    if (surface) {
      surface.connect(this, {
        'select': 'onSelectionChange',
        'contextChange': 'onContextChange'
      });
    }
  }.observes('surface'),

  onSelectionChange: function() {
    this.updateState();
  },

  onContextChange: function() {
    this.updateState();
  },

  updateState: function() {
    var surface = this.get('surface');
    var surfaceState = this.get('surfaceState');
    surfaceState.set('fragment', surface.getFragment());
    surfaceState.set('selection', surface.getSelection());
    this.trigger('state-changed', surfaceState);
  },

});

export default VisualEditorModel;
