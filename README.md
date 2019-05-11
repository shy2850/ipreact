# IPreact
connect data-actions of preact-components

see: [ipreact-for-react](https://github.com/shy2850/ipreact-for-react)

## Install
```
npm i ipreact
```

## Usage
```tsx
import IPreact from '../src/ipreact'
import { h, Component, render } from 'preact'
const { connect, dispatch, getState } = IPreact()({
    name: 'world'
})

const AppComponent = ({ words }) => <h2>{words}</h2>
const App = connect(() => ({
    words: `hello ${getState().name}!`
}))(AppComponent)

let i = 0
setInterval(function () {
    const list = ['prect', 'immutable', 'world', 'ipreact']
     i = (i + 1) % list.length
    dispatch(state => ({name: list[i]}))
}, 1000)
```
![hello world](./helloworld.gif)