import Ember from 'ember';
import VisualEditor from 'ember-cli-visualeditor/components/visual-editor';

var Toolbar = Ember.Component.extend({

  classNames: ["ve-toolbar"],

  parentView: null,
  visualEditor: Ember.computed.alias('parentView.visualEditor'),

  afterRender: function() {
    this._super();
    // propagating the toolbar so that tools can access the visualEditor instance
    var toolGroups = this.get('childViews');
    toolGroups.forEach(function(toolGroup) {
      toolGroup.set('toolbar', this);
    });
  },

});

export default Toolbar;
