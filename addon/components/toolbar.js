import Ember from 'ember';

export default Ember.Component.extend({

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
