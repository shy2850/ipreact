import createStore, { IPreact, Connect } from '../src/ipreact'
import { h, Component, render } from 'preact'
const { connect, dispatch, getState }: IPreact<{ name?: string }> = createStore()({
    name: 'world'
})

interface AppProps { words?: string }
const AppComponent = ({ words }: AppProps) => <h2>{words}</h2>

const connectApp: Connect<AppProps> = connect

const App = connectApp(() => ({
    words: `hello ${getState().name}!`
}))(AppComponent)

let i = 0
setInterval(function () {
    const list = ['prect', 'immutable', 'world', 'ipreact']
     i = (i + 1) % list.length
    dispatch(state => ({name: list[i]}))
}, 1000)

export default ({ el }: { el: HTMLElement }) => {
    render(<App />, el)
}
