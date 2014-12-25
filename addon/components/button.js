import Tool from './tool';

var Button = Tool.extend({
  classNames: ["ve-button"],

  mouseDown: function() {
    if (this.get('isEnabled')) {
      this.executeCommand();
    }
    return false;
  },
});

export default Button;
