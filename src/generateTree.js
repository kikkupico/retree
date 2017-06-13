export default function generateTree() {
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
