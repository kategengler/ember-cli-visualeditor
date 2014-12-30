/* globals ve:true */

import Ember from 'ember';
import VeToolProxy from '../lib/ve-tool-proxy';

var Tool = Ember.Component.extend(Ember.Evented, {

  classNames: ["ve-tool"],
  command: null,

  isVisible: true,
  isEnabled: false,
  isActive: false,

  classNameBindings: ['isVisible::hidden', 'isEnabled:enabled:disabled', 'isActive:active:'],

  toolbar: null,
  proxy: null,
  visualEditor: Ember.computed.alias('parentView.visualEditor'),

  // Instantiates a ve.ui.Tool and monkey-patches it to bind it to this ember object.
  init: function() {
    this._super();
    var commandName = this.get('command');
    var veTool = ve.ui.toolFactory.lookup(commandName);
    this.set('proxy', new VeToolProxy(this, veTool));
  },

  attachEditor: function(visualEditor) {
    var visualEditor = this.get('visualEditor');
    if (visualEditor) {
      visualEditor.get('model').on('state-changed', this, this.onSurfaceStateChanged);
    }
  }.observes('visualEditor'),

  detachEditor: function() {
    var visualEditor = this.get('visualEditor');
    if (visualEditor) {
      visualEditor.get('model').off('state-changed', this, this.onSurfaceStateChanged);
    }
  }.observesBefore('visualEditor'),

  onSurfaceStateChanged: function(surfaceState) {
    this.get('proxy').updateState(surfaceState);
  },

  executeCommand: function() {
    // Note: this is a bit awkward, but... the proxy hides the nasty ve tool adapter
    // To work on the current surface instance, the proxy calls this.getSurface
    this.get('proxy').execute();
  },

  getSurface: function() {
    return this.get('visualEditor.surface');
  },

});


export default Tool;
