import IPreact from '../src/index'
import { h, Component, render } from 'preact'

const store = IPreact({
    pause: false,
    time: new Date
})
const { connect, dispatch, getState  } = store

const TimeShow = (props) => {
    const { time, pause, tooglePause } = props
    return <div>
        <i>{time.getFullYear()}</i>年
        <i>{time.getMonth() + 1}</i>月
        <i>{time.getDate()}</i>日
        <i>{time.getHours()}</i>时
        <i>{time.getMinutes()}</i>分
        <i>{time.getSeconds()}</i>秒
        <button onClick={tooglePause}>{pause ? '开始' : '暂停'}</button>
    </div>
}

const Application = connect(() => {
    const state = getState()
    return {
        time: state.getIn(['time']),
        pause: state.getIn(['pause']),
        tooglePause: () => dispatch(state => state.updateIn(['pause'], p => !p))
    }
})(TimeShow)

setInterval(function () {
    const state = getState()
    if (!state.getIn(['pause'])) {
        dispatch(state => state.setIn(['time'], new Date))
    }
}, 1000)

export default ({ el }: {el: HTMLElement}) => {
    render(<Application />, el)
}