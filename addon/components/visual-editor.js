/* globals ve:true, $:true */

import Ember from 'ember';
import VisualEditorModel from 'ember-cli-visualeditor/models/visual-editor';

var VisualEditorComponent = Ember.Component.extend({

  // VisualEditorModel instance
  model: null,

  // ve.ui.Surface instance
  surface: null,

  init: function() {
    this._super();
    Ember.assert("'model' should be of type ve.dm.Surface", this.get('model') instanceof VisualEditorModel);
  },

  onSurfaceModelChange: function() {
    var surface = this.get('surface');
    if (surface) {
      surface.destroy();
    }
    surface = this.createSurfaceUI();
    this.set('surface', surface);
    $(this.element).empty().append(surface.$element);
    if (this._state === "inDOM") {
      surface.initialize();
    }
  }.observes('model.surface'),

  createSurfaceUI: function() {
    return new ve.ui.DesktopSurface(this.get('model').get('surface'));
  },

  beforeInsertElement: function() {
    var surface = this.get('surface');
    if (!surface) {
      surface = this.createSurfaceUI();
      this.set('surface', surface);
    }
    $(this.element).empty().append(surface.$element);
  }.on('willInsertElement'),

  afterInsertElement: function() {
    var surface = this.get('surface');
    surface.initialize();
  }.on('didInsertElement'),

  beforeDestroyElement: function() {
    var surface = this.get('surface');
    if (surface) {
      surface.destroy();
    }
    this.set('surface', null);
  }.on('willDestroyElement'),

  onEnabledChange: function() {
    var surface = this.get('surface');
    if (this.get('model.isEnabled')) {
      surface.enable();
    } else {
      surface.disable();
    }
  }.observes('model.isEnabled'),

  onFocusChange: function() {
    var surface = this.get('surface');
    if (this.get('model.isFocused')) {
      surface.getView().focus();
    }
  }.observes('mode.isFocused'),

});

export default VisualEditorComponent;
