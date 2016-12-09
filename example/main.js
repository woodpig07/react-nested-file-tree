// Shims and polyfills.
require('es5-shim')
require('es5-shim/es5-sham')
require('es6-shim')
require('babel-polyfill')

import React, {Component} from 'react'
import {render} from 'react-dom'
import NestedFileTreeView from '../src/NestedFileTreeView'
import directory from './directory'

require('./main.styl')

class Demo1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: '.gitignore'
    }
  }

  handleFileClick (file) {
    console.log(file)
    this.setState({ selectedFile: file.path })
  }

  render () {
    return (
      <NestedFileTreeView
        selectedFilePath={this.state.selectedFile}
        fileClickHandler={::this.handleFileClick}
        directory={directory} />
    )
  }
}

function Demo2 () {
  return (
    <NestedFileTreeView
      expended
      maxFolderLevel={3}
      directory={directory} />
  )
}

function Demo3 () {
  return (
    <NestedFileTreeView
      expended
      maxFolderLevel={3}
      fileTemplate={CustomFile}
      folderTemplate={CustomFolder}
      directory={directory} />
  )
}

function CustomFolder (props) {
  return (
    <a onClick={props.onclick}><span className='svg'
      dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve">' +
      '<path d="M0 0h24v24H0z" fill="none"></path>' +
      '<path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path>' +
      '</svg>'}} />
      { props.name }
    </a>
  )
}

function CustomFile (props) {
  return (
    <a><span className='svg'
      dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve">' +
      '<path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"></path>' +
      '</svg>'}} />
      { props.name }
    </a>
  )
}

render(<Demo1 />, document.getElementById('demo1'))
render(<Demo2 />, document.getElementById('demo2'))
render(<Demo3 />, document.getElementById('demo3'))

