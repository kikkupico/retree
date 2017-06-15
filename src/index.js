import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import generateTree from './generateTree'
import Node from './containers/Node'
import { devToolsEnhancer } from 'redux-devtools-extension'

const tree = generateTree()
const store = createStore(reducer, tree, devToolsEnhancer())

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
