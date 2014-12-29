/* globals $:true */

import ToolGroup from './tool-group';

export default ToolGroup.extend({

  tagName: ["select"],
  classNames: ['ve-select'],

  isDisabled: true,
  disabledBinding: 'isDisabled',

  _options: {},

  didInsertElement: function() {
    this._super();

    var _options = this.get('_options');
    var options = this.get('childViews');
    options.forEach(function(option) {
      var commandName = option.get('command');
      _options[commandName] = option;
    });

    this.element.value = " ";
    this.element.disabled = true;

    $(this.element).change(this.onChange.bind(this));
    // HACK: there is a subtle but important detail here
    // Registering the handler after calling _super has the effect
    // that the handlers of the options will be called before this one
    // so that we can rely on the options being up to date
    // TODO: this could be improved somehow, e.g., by observing option.isActive and aggregating into a computed property
    this.get('surface').on('state-changed', this, this.onSurfaceStateChange);
  },

  onSurfaceStateChange: function() {
    var options = this.get('childViews');
    var isEnabled = true;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (!option.get('isEnabled')) {
        isEnabled = false;
        break;
      }
    }
    this.set('isDisabled', !isEnabled);
  },

  onDisabled: function() {
    if (this.get('isDisabled')) {
      this.element.disabled = true;
      this.element.value = " ";
    } else {
      this.element.disabled = false;
    }
  }.observes('isDisabled'),

  onChange: function(ev) {
    var options = this.get('_options');
    var option = options[ev.target.value];
    if (option) {
      option.executeCommand();
    }
  },

});
