import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {collapsible, checkable} from './plugins'

import './Node.css'

/*
*

want to make something like,

@withSearch('left-align')
@selectable()
class TreeViewContainer extends Component {
  
}

*
*/

@collapsible()
@checkable()
//@withIcon(<span>icon</span>)
export class Node extends Component {
  
  handleIncrementClick = () => {
    const { increment, id } = this.props
    increment(id)
  }

  handleAddChildClick = e => {
    e.preventDefault()

    const { addChild, createNode, id } = this.props
    const childId = createNode().nodeId
    addChild(id, childId)
  }

  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <div key={childId} className="tree-view-children">
        <ConnectedNode id={childId} parentId={id} />
      </div>
    )
  }

  render() {
    const { counter, parentId, childIds, collapsed, checked } = this.props
    return (
      <span>      
        Counter: {counter}
        {' '}
        <button onClick={this.handleIncrementClick}>
          +
        </button>
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <div className="tree-view-node">
          {collapsed ? childIds.map(this.renderChild) : null}
          <div key="add" className="tree-view-add">
            <a href="#" // eslint-disable-line jsx-a11y/href-no-hash
              onClick={this.handleAddChildClick}              
            >
              Add child
            </a>
          </div>
        </div>
      </span>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode

export function generateTree() {
  let tree = {
    0: {
      id: 0,
      counter: 0,
      childIds: [],
      collapsed: false,
      checked: false
    }
  }

  for (let i = 1; i < 10; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
    tree[i] = {
      id: i,
      counter: 0,
      childIds: [],
      collapsed: false,
      checked: false
    }
    tree[parentId].childIds.push(i)
  }

  return tree
}
