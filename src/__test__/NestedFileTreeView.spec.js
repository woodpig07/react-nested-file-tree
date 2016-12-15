/* eslint-env mocha */
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon/pkg/sinon'

import NestedFileTreeView from '../NestedFileTreeView'
import FolderView from '../FolderView'
import FileView from '../FileView'
import data from './data'

chai.use(chaiEnzyme())
const expect = chai.expect

describe('<NestedFileTreeView />', () => {
  it('should render correct number of child component according to the directory data', () => {
    const wrapper = mount(<NestedFileTreeView directory={data} />)

    expect(wrapper.find(FileView)).to.have.lengthOf(9)
    expect(wrapper.find(FolderView)).to.have.lengthOf(4)
  })

  it('should render correct number of child component when given maxFolderLevel "2" ', () => {
    const wrapper = mount(<NestedFileTreeView directory={data} maxFolderLevel={2} />)

    expect(wrapper.find(FileView)).to.have.lengthOf(8)
    expect(wrapper.find(FolderView)).to.have.lengthOf(3)
  })

  it('should call callback function and pass in file Object when given fileClickHandler()', () => {
    var callback = sinon.spy()
    const wrapper = mount(<NestedFileTreeView directory={data} fileClickHandler={callback} />)

    wrapper.find('.item').at(0).simulate('click')
    expect(callback.called).to.be.true
    expect(callback.getCall(0).args[0]['name']).equal('.gitignore')
  })

  it('should call callback function and pass in three parameters when given folderClickHandler()', () => {
    var callback = sinon.spy()
    const wrapper = mount(<NestedFileTreeView directory={data} folderClickHandler={callback} />)

    wrapper.find('.subFolder > a').at(0).simulate('click')
    expect(callback.called).to.be.true
    expect(callback.getCall(0).args[0]).equal('folder_1')
    expect(callback.getCall(0).args[1]).equal('/folder_1')
    expect(callback.getCall(0).args[2]['_contents'][0]['name']).equal('2016-9-10-new-file.md')
  })

  it('should render custom file component if given fileTemplate function', () => {
    function customFile (props) {
      return <span>{props.name}</span>
    }
    const wrapper = mount(<NestedFileTreeView directory={data} fileTemplate={customFile} />)

    const firstFile = wrapper.find('.item > span').at(0)
    expect(firstFile).to.exist
    expect(firstFile.text()).equal('.gitignore')
  })

  it('should render custom folder component if given folderTemplate function', () => {
    function customFolder (props) {
      return <span>{props.name}</span>
    }

    const wrapper = mount(<NestedFileTreeView directory={data} folderTemplate={customFolder} />)

    const firstFolder = wrapper.find('.subFolder > span').at(0)
    expect(firstFolder).to.exist
    expect(firstFolder.text()).equal('folder_1')
  })
})
