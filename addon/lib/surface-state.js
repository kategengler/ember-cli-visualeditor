import Ember from 'ember';

var SurfaceState = Ember.Object.extend({

  selection: null,
  fragment: null,

  fragmentAnnotations: function() {
    return this.get('fragment').getAnnotations();
  }.property('fragment'),

  isAnnotationSelected: function(name) {
    var fragmentAnnotations = this.get('fragmentAnnotations');
    if (fragmentAnnotations) {
      return fragmentAnnotations.hasAnnotationWithName(name);
    } else {
      return false;
    }
  },
});

export default SurfaceState;
