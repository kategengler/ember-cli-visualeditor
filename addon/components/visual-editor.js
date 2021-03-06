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

  classNameBindings: ['isEnabled:enabled:disabled'],

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
    // ve.ui.Surface needs to be initialized after been injected into the DOM
    // so, if this component is already in the DOM we need to call surface.initialize right away
    // (... as oposed to do it on 'didInsertElement')
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
      // whenever this component is disabled we also remove the selection
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
    var surface = this.get('surface');
    this.set('isFocused', true);
    surface.getView().focus();
  }

});

export default VisualEditorComponent;
