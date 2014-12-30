import Ember from 'ember';

var Toolbar = Ember.Component.extend({

  classNames: ["ve-toolbar"],
  visualEditor: null,
  tools: null,

  afterRender: function() {
    this._super();
    // propagating the toolbar so that tools can access the visualEditor instance
    var toolGroups = this.get('childViews');
    toolGroups.forEach(function(toolGroup) {
      toolGroup.set('toolbar', this);
    });
  },

  onVisualEditor: function() {
    this.observeVisualEditor();
  }.observes('visualEditor'),

  observeVisualEditor: function() {
    var visualEditor = this.get('visualEditor');
    if(visualEditor) {
      var visualEditorModel = visualEditor.get('model');
      visualEditorModel.on('state-changed', this, this.onSurfaceStateChanged);
    } else {
      console.error('Could not connect to VisualEditor.');
    }
  },

  // recursive function to collect all Tool instances from this view tree
  extractTools: function() {
    var tools = [];
    var toolbar = this;
    var _extractTools = function(view) {
      if (view.get('needsToolbar')) {
        view.set('toolbar', toolbar);
      }
      if (view.get('needsSurfaceUpdate')) {
        tools.push(view);
      }
      var childViews = view.get('childViews');
      if (childViews) {
        childViews.forEach(function(childView) {
          _extractTools(childView);
        });
      }
    };
    _extractTools(this);
    return tools;
  },

  // Lazy getter for the array of tools contained in this toolbar.
  // The first time all tools are extracted, and cached afterwards (no invalidation)
  getTools: function() {
    var tools = this.get('tools');
    if (!tools) {
      tools = this.extractTools(this);
      this.set('tools', tools);
    }
    return tools;
  },

  onSurfaceStateChanged: function(surfaceState) {
    var tools = this.getTools();
    tools.forEach(function(tool) {
      tool.updateState(surfaceState);
    });
  },

});

export default Toolbar;
