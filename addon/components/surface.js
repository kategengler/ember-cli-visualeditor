/* globals ve:true, $:true */

import Ember from 'ember';
import DocumentFactory from '../lib/document-factory';

var SurfaceState = function() {
  this.documentModel = null;
  this.selection = null;
  this.fragment = null;
  this.fragmentAnnotations = null;
};

SurfaceState.prototype.isAnnotationSelected = function(name) {
  if (this.fragmentAnnotations) {
    return this.fragmentAnnotations.hasAnnotationWithName(name);
  } else {
    return false;
  }
};

SurfaceState.prototype.getFragment = function() {
  return this.fragment;
};

var Surface = Ember.Component.extend(Ember.Evented, {

  classNames: ["ve-surface-component"],

  _surface: null,
  _surfaceState: new SurfaceState(),

  loadDocumentFromHtml: function(html) {
    var documentFactory = new DocumentFactory();
    var documentModel = documentFactory.createDocumentFromHtml(html);
    this._updateDocumentModel(documentModel);
  },

  _updateDocumentModel: function(documentModel) {
    var surface = new ve.ui.DesktopSurface(documentModel);
    this.set('_surface', surface);
    var surfaceState = this.get('_surfaceState');
    surfaceState.documentModel =  documentModel;
    this._connectSurface(surface);
  },

  _connectSurface: function(surface) {
    var surfaceModel = surface.getModel();
    surfaceModel.connect(this, {
      'select': 'onSelectionChange',
      'contextChange': 'onContextChange'
    });
  },

  activate: function() {
    // Very important: first attach the surface to the DOM, then call initialize
    // does some global element injection plus activates tracking of changes
    var surface = this.get('_surface');
    $(this.element).empty().append(surface.$element);
    surface.initialize();
  },

  onSelectionChange: function() {
    this.updateState();
  },

  onContextChange: function() {
    this.updateState();
  },

  updateState: function() {
    var surface = this.get('_surface');
    var surfaceState = this.get('_surfaceState');
    var surfaceModel = surface.getModel();

    // extract some information about the current state
    // which can be evaluated by toolbars and tools
    var fragment = surfaceModel.getFragment();
    surfaceState.fragment = fragment;
    surfaceState.fragmentAnnotations = fragment.getAnnotations();
    surfaceState.selection = surfaceModel.getSelection();

    this.trigger('state-changed', surfaceState);
  },

  getState: function() {
    return this.get('_surfaceState');
  },

  getVeSurface: function() {
    return this.get('_surface');
  },

});

export default Surface;
