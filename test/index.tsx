import IPreact from '../src/ipreact'
import { h, Component, render } from 'preact'
const { connect, dispatch, getState } = IPreact()({
    name: 'world'
})

const App = connect(() => ({
    words: `hello ${getState().getIn(['name'])}!`
}))(({ words }) => <h2>{words}</h2>)

let i = 0
setInterval(function () {
    const list = ['prect', 'immutable', 'world', 'ipreact']
     i = (i + 1) % list.length
    dispatch(state => state.setIn(['name'], list[i]))
}, 1000)

export default ({ el }: { el: HTMLElement }) => {
    render(<App />, el)
}
