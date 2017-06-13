import { INCREMENT, ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE, COLLAPSE, TOGGLE_CHECKED } from '../actions'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        counter: 0,
        childIds: []
      }
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
    case COLLAPSE:
      return {
          ...state,
          collapsed: !state.collapsed
        }   
    case ADD_CHILD:    
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

const checkAll = (state, ids, newChecked) => {
  let newState = JSON.parse(JSON.stringify(state)); //TODO: replace this with object spread operator
  //console.log(state)
  ids.forEach(id => newState[id].checked = newChecked)
  //console.log(newState)
  return newState
}

export default (state = {}, action) => {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === TOGGLE_CHECKED) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    const newChecked = !state[nodeId].checked;
    //console.log(descendantIds)
    //console.log(newChecked)
    return checkAll(state, [ nodeId, ...descendantIds ], newChecked)
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
