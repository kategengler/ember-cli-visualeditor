var SurfaceState = function() {
  this.documentModel = null;
  this.selection = null;
  this.fragment = null;
  this.fragmentAnnotations = null;
};

SurfaceState.prototype.isAnnotationSelected = function(name) {
  if (this.fragmentAnnotations) {
    return this.fragmentAnnotations.hasAnnotationWithName(name);
  } else {
    return false;
  }
};

SurfaceState.prototype.getFragment = function() {
  return this.fragment;
};

export default SurfaceState;
