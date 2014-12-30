import Ember from 'ember';

var ToolGroup = Ember.Component.extend({
  name: null,
  classNames: ['ve-tool-group'],
  toolbar: null,

  init: function() {
    this._super();
    var name = this.get('name');
    if (name) {
      this.get('classNames').push(name);
    }
  },

  // HACK: while in the parent components it was ok to access the childViews in afterRender
  // it didn't work here. Instead we need to do it in didInsertElement
  didInsertElement: function() {
    this._super();
    var toolbar = this.get('toolbar');
    var toolViews = this.get('childViews');
    toolViews.forEach(function(toolView) {
      toolView.set('toolbar', toolbar);
    });
  },

});

export default ToolGroup;
