import Ember from 'ember';

var ToolGroup = Ember.Component.extend({
  name: null,
  classNames: ['ve-tool-group'],

  init: function() {
    this._super();
    var name = this.get('name');
    if (name) {
      this.get('classNames').push(name);
    }
  },

});

export default ToolGroup;
