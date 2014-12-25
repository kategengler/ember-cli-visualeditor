import Tool from './tool';

var SelectOption = Tool.extend({
  tagName: 'option',
  classNames: ["ve-option"],

  willInsertElement: function() {
    this._super();
    this.element.value = this.get('command');
  },

  onIsActive: function() {
    if (this.get('isActive')) {
      this.element.selected = true;
    } else {
      this.element.selected = false;
    }
  }.observes('isActive'),
});

export default SelectOption;
