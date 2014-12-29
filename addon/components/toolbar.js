import Ember from 'ember';

var Toolbar = Ember.Component.extend({
  classNames: ["ve-toolbar"],
  surface: null,

  afterRender: function() {
    this._super();
    var surface = this.get('surface');
    var toolGroups = this.get('childViews');
    toolGroups.forEach(function(toolGroup) {
      toolGroup.set('surface', surface);
    });
  },
});

export default Toolbar;
