# ember-cli-visualeditor

Work in progress.

Creating an ember-cli addon that allows to integrate a VisualEditor driven editor component easily.

# Integration into ember-cli app

Add the addon to your `package.json`

```
  ...
  "ember-cli-visualeditor": "substance/ember-cli-visualeditor#master"
  ...
```

Add this to your `Brocfile.js`:

```
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
...
var app = new EmberApp();
var appTree = app.toTree();
...
var visualEditor = pickFiles('node_modules/ember-cli-visualeditor/dist', {
  srcDir: '/',
  destDir: '/visual-editor'
})
...
module.exports = mergeTrees([appTree, visualEditor]);
```

And finally, before using the visual-editor component, add this to the `beforeModel` function of a route:

```
import initializeVisualEditor from 'ember-cli-visualeditor/initializers/initialize_visual_editor';

export default Ember.Route.extend({

  beforeModel: function() {
    return initializeVisualEditor("");
  },

  ...

});

```

> Note: specify a prefix if you exported the bundle to a different path, e.g.

```
  ...
    return initializeVisualEditor("/assets/myapp");
  ...
```

# Example

An application would now define a route:

```
import Ember from 'ember';
import initializeVisualEditor from 'ember-cli-visualeditor/initializers/initialize_visual_editor';

export default Ember.Route.extend({

  beforeModel: function() {
    return initializeVisualEditor("");
  },

  setupController: function(controller) {
    controller.set('model', {
      html: "<p>Hello World.</p>"
    });
  },

});
```

Before the model is set the visual editor addon must be initialized, where all assets are loaded lazily.
The model needs to be provided in this form:

```
{
  html: 'content-as-html-string'
}
```

A simple controller creates a VisualEditor model instance and loads the provided HTML content:

```
import Ember from 'ember';

import VisualEditor from 'ember-cli-visualeditor/models/visual-editor';

var EditorController = Ember.Controller.extend({

  visualEditor: null,

  setupVisualEditor: function() {
    var visualEditor = VisualEditor.create();
    this.set('visualEditor', visualEditor);
  }.on("init"),

  setupModel: function() {
    this.get('visualEditor').fromHtml(this.model.html, this.model.data);
  }.observes('model'),

});

export default EditorController;
```

The view just provides a property for an `ember-cli-visualeditor/components/visual-editor` instance
and for an `ember-cli-visualeditor/components/toolbar` instance.

```
import Ember from 'ember';

var EditorView = Ember.View.extend({

  templateName: "editor",
  classNames: ["editor"],

  // injected by component helper {{visual-editor}}
  visualEditor: null,

  // injected by component helper {{visual-editor-toolbar}}
  toolbar: null

});

export default EditorView;
```

In the view template these are then assigned:

```
{{#visual-editor-toolbar viewName="toolbar" visualEditor=view.visualEditor classNames='editor-toolbar'}}
  {{#ve-button-group name="history"}}
    {{#ve-button command="undo"}}{{fa-icon "undo"}}{{/ve-button}}
    {{#ve-button command="redo" }}{{fa-icon "repeat"}}{{/ve-button}}
  {{/ve-button-group}}
  <span class="separator"></span>
  {{#ve-select name="switch-type"}}
    {{#ve-option command="paragraph"}}Paragraph{{/ve-option}}
    {{#ve-option command="heading1"}}Heading 1{{/ve-option}}
    {{#ve-option command="heading2"}}Heading 2{{/ve-option}}
    {{#ve-option command="heading3"}}Heading 3{{/ve-option}}
    {{#ve-option command="preformatted"}}Preformatted{{/ve-option}}
    {{#ve-option command="blockquote"}}Blockquote{{/ve-option}}
  {{/ve-select}}
  <span class="separator"></span>
  {{#ve-button-group name="annotations"}}
    {{#ve-button command="bold"}}{{fa-icon "bold"}}{{/ve-button}}
    {{#ve-button command="italic"}}{{fa-icon "italic"}}{{/ve-button}}
    {{#ve-button command="link"}}{{fa-icon "link"}}{{/ve-button}}
  {{/ve-button-group}}
  <span class="separator"></span>
  {{#ve-button-group name="insert"}}
    {{#ve-button command="figure"}}{{fa-icon "image"}}{{/ve-button}}
    {{#ve-button command="insertTable"}}{{fa-icon "table"}}{{/ve-button}}
  {{/ve-button-group}}
{{/visual-editor-toolbar}}

{{visual-editor model=controller.visualEditor viewName='visualEditor'}}
```

> Note: for the toolbar buttons we used fontawesome icons from `ember-cli-fontawesome`.
  All controls have a `command` attribute which maps to the according Command as specified in the
  [ve.ui.CommandRegistry](https://github.com/wikimedia/VisualEditor/blob/9f1350f5044c40b175fc6adf389e999558f4aad3/src/ui/ve.ui.CommandRegistry.js#L59-L312).


# Development

During the course developing of this addon, we will contribute improvements for the VisualEditor that
make embedding easier.

````bash
$ git clone -b ember-cli-visualeditor https://github.com/substance/VisualEditor.git
````

Add the `wikimedia` repository as additional remote:

````bash
$ cd VisualEditor
$ git remote add wikimedia https://github.com/wikimedia/VisualEditor.git
````

Register this directory with npm

````bash
$ npm link
````

Clone `ember-cli-visualeditor` (e.g. as sibling directory)

````bash
$ cd ..
$ git clone https://github.com/substance/ember-cli-visualeditor.git
````

Link in the VisualEditor folder

````bash
$ npm link visualeditor
````

### Upgrading VE

First upgrade the VisualEditor#ember-cli-visualeditor branch

````bash
$ cd VisualEditor
$ git checkout master
$ git pull wikimedia master
$ git checkout ember-cli-visualeditor
$ git rebase master
````
Hopefully this works without conflicts - if so push it upstream.

````bash
$ git push -f origin ember-cli-visualeditor
````

Then rebundle `ember-cli-visualeditor`

````bash
$ cd ../ember-cli-visualeditor
$ grunt
````

And commit the changes, and push upstream.
````
$ git add --all
$ git commit -m "Updated bundle."
$ git push origin master
````
