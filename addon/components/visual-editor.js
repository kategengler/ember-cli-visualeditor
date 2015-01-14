/* globals ve:true, $:true */

import Ember from 'ember';
import VisualEditorModel from 'ember-cli-visualeditor/models/visual-editor';

var VisualEditorComponent = Ember.Component.extend({

  // VisualEditorModel instance
  model: null,

  // ve.ui.Surface instance
  surface: null,

  isEnabled: false,
  isFocused: false,

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
    this.updateEnabledState();
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

  updateEnabledState: function() {
    var surface = this.get('surface');
    if (this.get('isEnabled')) {
      surface.enable();
    } else {
      surface.getModel().setNullSelection();
      surface.disable();
    }
  }.observes('isEnabled'),

  enable: function() {
    this.set('isEnabled', true);
  },

  disable: function() {
    this.set('isEnabled', false);
  },

  focus: function() {
    this.set('isFocused', true);
    surface.getView().focus();
  },

  // delegates for convenience

  fromHtml: function(html) {
    this.get('model').fromHtml(html);
  },

  toHtml: function() {
    return this.get('model').toHtml();
  },

});

export default VisualEditorComponent;
