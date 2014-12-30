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
    var documentModel = new ve.dm.Document( [
        // { type: 'paragraph' },
        // { type: '/paragraph' }
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
        documentModel = new ve.dm.DocumentModel([
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
    console.log('VisualEditor.onSelectionChange');
    this.updateState();
  },

  onContextChange: function() {
    console.log('VisualEditor.onContextChange');
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
