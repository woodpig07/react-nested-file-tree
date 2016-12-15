# react-nested-file-tree

React component for presenting file-directory-tree-like structured data.

## Install

Requires React 15.0.0+.

**For npm-based project**

```
npm install react-nested-file-tree --save
```

**Or use it as individual script**

Download distributiont package files in `/dist/` and include them in your page.

```html
<link href="/default.css" rel="stylesheet">
...
<script src="./react-nested-file-tree.js"></script>
```

Also need to alias the default export property:

```javascript
const FileTree = NestedFileTree.default;

```

## How to use

Suppose you have an Object contains data to describe nested directory tree:

```javascript
const directory = {
  "_contents": [
    {
      "name": "filename_1",
      "path": "filename_1"
    },
    {
      "name": "filename_2",
      "path": "filename_2"
    }
  ],
  "folder_1": {
    "_contents": [
      {
        "name": "filename_1",
        "path": "folder_1/filename_1"
      }
    ]
  },
  "folder_2": {
    "_contents": [],
    "folder_2_1": {
      "_contents": [
        {
          "name": "filename1.md",
          "path": "folder_2/folder_2_1/filename1.md"
        }
      ],
      "folder_2_1_1": {
        "_contents": [
          {
            "name": "filename1.md",
            "path": "folder_2/folder_2_1/folder_2_1_1/filename1.md"
          }
        ]
      }
    }
  }
}
```
With this kind of data tructure, you can do:
```jsx
import NestedFileTreeView from 'react-nested-file-tree'
// basic styles
import 'react-nested-file-tree/dist/default.css'

class MyDirectory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: 'some_folder/some_file'
    }
  }  

  handleFileClick (file) {
    console.log(file)
    this.setState({ selectedFile: file.path })
  }

  handleFolderClick (folderName) {
    console.log(folderName)
  }

  render () {
    return (
      <NestedFileTreeView
        selectedFilePath={this.state.selectedFile}
        fileClickHandler={::this.handleFileClick}
        folderClickHandler={::this.folderClickHandler}
        directory={directory} />
    )
  }
}

```

See [`example` folder](/example) for more examples, and online [demo](https://woodpig07.github.io/react-nested-file-tree/).

## API

### NestedFileTreeView

#### directory

Directory data object, it has to be in below nested fomat:
```javascript
{
  _contents: [
    {
      name: 'file_name1',
      path: 'file_name1'
    }
  ],
  folder_name1: {
    _contents: [
      {
        name: 'file_name2',
        path: 'folder_name1/file_name2'
      }
    ],
    folder_name2: {
      _contents: [
        {
          name: 'file_name3',
          path: 'folder_name1/folder_name2/file_name3'
        }
      ]
    }
  }
}
```
Which represents a file directory:
```
|-- file_name1
|-- folder_name1
    |-- file_name2
    |-- folder_name2
        |-- file_name3

```

#### maxFolderLevel

A number to limit maximum folder depth to display.

For example, given `maxFolderLevel={2}`, then only 2 level of folders are rendered, if there are folders deeper than that, it would show `<span class="more">...<span>`


#### expended

All folders are collapsed by default. If given `expended={true}`(`true` can be omitted), then all folders would be expended until user click on it to collapse.

#### fileClickHandler

A callback function for file name click event handler, the file object will be passed in:
```
function ({name, path}) {}
``` 

#### folderClickHandler

A callback function for folder name click event handler, the folder name string, current folder path, and folder Object will be passed in as parameters:
```
function (name, currentPath, folderObj) {}
``` 

#### fileClassName

For passing in extra class names to the file element `<li class="item">...</li>`.

#### folderClassName

For passing in extra class names to the folder element `<li class="subFolder">...</li>`.

#### selectedFilePath

To sepecify a selected file by file path. With default styles, the selected file will be highlighted in blue.

#### selectedClassName

By default the selected file element will has class name `active`, you can pass in extra class names for that.

#### folderTemplate

You can create your own stateless folder component `folderTemplate={CustomFolder}` like this:
```javascript
function CustomFolder ({ name, currentPath, folderObj, onclick }) {
  return (
    <a onClick={onclick}>
      <span className='icon'>other stuff</span>
      {name}
    </a>
  )
}
```

#### fileTemplate

Create your own stateless component file `fileTemplate={CustomFile}` like this:
```javascript
function CustomFile (props) {
  return (
    <a>
      <span className='icon'>other stuff</span>
      {props.name}
    </a>
  )
}
```

## Development
- `npm install` to install dependency
- `npm test` to run tests
- `npm run example` to run development server on `localhost:8080`
- `npm run build:dist` to build distribution package
