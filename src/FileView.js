import React from 'react'

const FileView = (props) => {
  let { file,
    fileClickHandler,
    selectedFilePath,
    fileTemplate } = props

  let fileClassName = (props.fileClassName || '') + ' item'
  let selectedClassName = props.selectedClassName || 'active'
  let cns = selectedFilePath === file.path
    ? selectedClassName + ' ' + fileClassName
    : fileClassName
  let onclickFn = () => {
    fileClickHandler && fileClickHandler(file)
  }

  return (
    <li
      key={`file-${file.path}`}
      className={cns}
      onClick={onclickFn}>
      {
        fileTemplate && fileTemplate({ name: file.name }) ||
        <a>|__{file.name}</a>
      }
    </li>
  )
}

export default FileView
