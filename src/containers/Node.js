import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

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


function navBar() { //WORKS
    return function(Child) {
      return class extends Component {         
         render() {
           return (
             <div>
               <h2>Hello this is the navigation bar</h2>
               <Child {...this.props} />
             </div>
           )
        }
     }
 }
}

function withSubheading(type, heading) { //WORKS
    return function(Child) {
      return class extends Component {         
         render() {
           return (
             <div>
             {type==='h3' ? <h3>{heading}</h3>: heading}
               <Child {...this.props} />
             </div>
           )
        }
     }
 }
}

function withIcon(icon) { //WORKS
    return function(Child) {
      return class extends Component {

         render() {
           return (
             <span>
             <span> {icon}</span>
               <Child {...this.props} />
             </span>
           )
        }
     }
 }
}

function checkable() {
    return function(Child) {
      return class extends Component {
        handleCheckedClick = () => {
          const { toggleChecked, id } = this.props
          toggleChecked(id)
        }

         render() {
           return (
             <span>
             <input type="checkbox"
              checked={this.props.checked}
              onClick={this.handleCheckedClick}
              />
               <Child {...this.props} />
             </span>
           )
        }
     }
 }
}

function collapsible() {
    return function(Child) {
      return class extends Component {
        handleCollapseClick = () => {
            const { toggleCollapse, id } = this.props
            toggleCollapse(id)
          }

         render() {
           return (
             <span>
             {this.props.childIds.length ? <span className="tree-view-arrow" onClick={this.handleCollapseClick}>{ this.props.collapsed ? "▼": "▶"}</span> : <span className="tree-view-children-leaf"> </span>}
               <Child {...this.props} />
             </span>
           )
        }
     }
 }
}


/*
var Enhance = ComposedComponent => class extends Component { //DOES NO WORK
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount() {
    this.setState({ data: 'Hello' });
  }
  render() {
    return <ComposedComponent {...this.props} data={this.state.data} />;
  }
};
*/