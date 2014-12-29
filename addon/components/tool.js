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

  _surface: null,
  _proxy: null,

  // Instantiates a ve.ui.Tool and monkey-patches it to bind it to this ember object.
  init: function() {
    this._super();
    var commandName = this.get('command');
    var veTool = ve.ui.toolFactory.lookup(commandName);
    this.set('_proxy', new VeToolProxy(this, veTool));
  },

  attachSurface: function(surface) {
    this.set('_surface', surface);
    surface.on('state-changed', this, this.onSurfaceStateChanged);
  },

  detachSurface: function(surface) {
    this.set('_surface', null);
    surface.off('state-changed', this, this.onSurfaceStateChanged);
  },

  onSurfaceStateChanged: function(surfaceState) {
    this.get('_proxy')._updateState(surfaceState);
  },

  executeCommand: function() {
    this.get('_proxy')._execute();
  },

});


export default Tool;
