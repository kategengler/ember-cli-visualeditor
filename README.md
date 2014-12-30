# ember-cli-visualeditor

Work in progress.

Creating an ember-cli addon that allows to integrate a VisualEditor driven editor component easily.

## Development

During the course developing this addon, we will contribute improvements for the VisualEditor that
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
