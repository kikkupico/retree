import React from 'react'
import { Component } from 'react'

export function withIcon(icon) { //WORKS
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

export function checkable() {
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

export function collapsible() {
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
