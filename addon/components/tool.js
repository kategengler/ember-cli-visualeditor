/* globals ve:true */

import Ember from 'ember';

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

// This proxy mimics a ve.ui.Tool instance (as much as needed)
// so that we can use it as 'this' instance for calling ve.ui.Tool.prototype functions on it.
var VeToolProxy = function(tool, veTool) {

  this._tool = tool;
  this._veTool = veTool;
  this._veCommand = ve.ui.commandRegistry.lookup(tool.get('command'));
  this.toolbar = {
    getSurface: function() {
      return tool.get('_surface').getVeSurface();
    }
  };
  this.constructor = veTool;
};

VeToolProxy.prototype.toggle = function(val) {
  var needToggle = this._tool.get('isVisible') !== val;
  if (needToggle) {
    this._tool.set('isVisible', val);
  }
};

VeToolProxy.prototype.setActive = function(val) {
  this._tool.set('isActive', val);
};

VeToolProxy.prototype.isDisabled = function() {
  return !this._tool.get('isEnabled');
};

VeToolProxy.prototype.setDisabled = function(val) {
  this._tool.set('isEnabled', !val);
};

VeToolProxy.prototype.getCommand = function() {
  return this._veCommand;
};

VeToolProxy.prototype._updateState = function(surfaceState) {
  if (this._veTool) {
    this._veTool.prototype.onUpdateState.call(this, surfaceState.getFragment());
  }
};

VeToolProxy.prototype._execute = function() {
  if (this._veTool) {
    this._veTool.prototype.onSelect.call(this);
  }
};

export default Tool;
