# retree [![npm version](https://badge.fury.io/js/retree.svg)](https://www.npmjs.com/package/react-treeview)

A minimal, extensible and customizable tree view UI component for react.

![enter image description here](https://github.com/vramakin/retree/raw/master/sample-minimal.png)

[Demo](https://vramakin.github.io/retree)

## Installation

```sh
npm install --save retree
```


## Usage

```javascript
import React, { Component } from 'react';
import ReTree from 'retree';
import {prepareData, getChecked} from 'retree';
import '../node_modules/retree/tree-view.css';

class App extends Component {
  state = {
    data: prepareData(
    {
      label:'Pets', id:0, 
      children:[
                { label:'Cats', id:4,
                  children:[
                            {label:'Bubbles', id:5}, 
                            {label:'Riddles', id:6}
                            ]
                },
                { label:'Dogs', id:1, 
                  children:[
                            {label:'Scooby', id:2},
                            {label:'Snowy', id:3}
                            ]
                },
              ]
   }
  )
 }

  onChangeTree = (newData) => this.setState({data:newData});
  
  render() {
    return (      
      <div>
        <ReTree data={this.state.data} onChange={this.onChangeTree} ></ReTree>
        <h5>Checked Items are...</h5>
        <ol>{ Array.from(getChecked(this.state.data, new Set()))
              .map((i,k) => <li key={k}> {i.label} </li>)
            }
        </ol>
      </div>      
    );
  }
}

export default App;

```

## Development

Build: `npm install && npm run build`

Demo: `npm install && npm start`

## License

ISC.
