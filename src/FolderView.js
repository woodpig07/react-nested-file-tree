import React, { Component } from 'react'
import FileView from './FileView'

class FolderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.expended || false
    }
  }

  toggleFolder () {
    const { open } = this.state
    this.setState({ open: !open }, () => {
      let fn = this.props.folderClickHandler
      fn && fn(this.props.name)
    })
  }

  render () {
    const { level,
      name,
      folderObj,
      maxFolderLevel,
      expended,
      folderTemplate,
      fileTemplate,
      fileClassName,
      folderClassName,
      fileClickHandler,
      selectedFilePath,
      folderClickHandler } = this.props
    const { open } = this.state
    let styl = open ? {'display': 'block'} : {'display': 'none'}
    let cns = (folderClassName || '') + ' subFolder'
    let passedFolderProps = {
      maxFolderLevel,
      expended,
      folderTemplate,
      fileTemplate,
      fileClickHandler,
      fileClassName,
      folderClassName,
      selectedFilePath,
      folderClickHandler
    }

    return (
      <li key={`folder-${name}`} className={open ? `open ${cns}` : cns}>
        { 
          folderTemplate && folderTemplate({ name, onclick: this.toggleFolder.bind(this) })
          || <a onClick={::this.toggleFolder}>/{name}</a>
        }
        
        <ul style={styl} data-level={level}>
          {
            folderObj && folderObj['_contents'].map(f => {
              return (
                <FileView
                  key={`file-${f.path}`}
                  file={f}
                  fileTemplate={fileTemplate}
                  fileClickHandler={fileClickHandler}
                  fileClassName={fileClassName}
                  selectedFilePath={selectedFilePath} />
              )
            })
          }
          {
            parseInt(maxFolderLevel) && (maxFolderLevel > level) || isNaN(parseInt(maxFolderLevel))
            ? (
              folderObj && Object.keys(folderObj)
              .filter(k => { return k !== '_contents' })
              .map(prop => {
                return (
                  <FolderView
                    key={`folder-${name}-${prop}`}
                    level={level + 1}
                    name={prop}
                    folderObj={folderObj[prop]}
                    {...passedFolderProps} />
                )
              })
            )
            : <span className='more'>...</span>
          }
        </ul>
      </li>
    )
  }
}

export default FolderView
