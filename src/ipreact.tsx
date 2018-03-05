import { fromJS, is, Record } from "immutable"
import { h, Component } from "preact"

export namespace IPreact {
    export interface DispatchAction {
        (action: { (state: Record<any>): Record<any> }, props?): void
    }
    export type Middleware = {
        (state: Record<any>, nextState: Record<any>, props?): void
    }
    export interface Props {
        [x: string]: any
    }
    export interface Connect {
        (mapProps?: {
            (props: IPreact.Props): IPreact.Props
        }, mapDispatch?: {
            (props: IPreact.Props): IPreact.Props
        }): {
            (com): any
        }
    }
}
export interface IPreact {
    getState: {
        (): Record<any>
    }
    dispatch: IPreact.DispatchAction
    connect: IPreact.Connect
}

export const isSameObject = (obj1, obj2) => {
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
        return false
    } else if (keys1.length + keys2.length === 0) {
        return true
    }
    return keys1.every(k => obj1[k] === obj2[k])
}

export default (middlewares?: IPreact.Middleware[]) => (initState = {}): IPreact => {

    let store = fromJS(initState)
    let updateQueue: Function[] = []

    const connect: IPreact.Connect = (mapProps, mapDispatch) => (Com) => class extends Component<any, any> {
        props
        state
        tempProps
        tempUpdate
        execProps() {
            const { props } = this
            const res1 = mapProps(props)
            let res2 = {}
            if (mapDispatch) {
                res2 = mapDispatch({ ...props, ...res1 })
            }
            return { ...props, ...res1, ...res2 }
        }
        constructor(props) {
            super(props)
            let t = this
            t.execProps = t.execProps.bind(t)
            t.tempProps = t.execProps()
            t.tempUpdate = function () {
                let newProps = t.execProps()
                if (!isSameObject(t.tempProps, newProps)) {
                    t.tempProps = newProps
                    t.forceUpdate && t.forceUpdate()
                }
            }
            updateQueue.push(t.tempUpdate)
        }
        componentWillUnmount() {
            updateQueue.splice(updateQueue.indexOf(this.tempUpdate), 1)
        }
        render() {
            return <Com {...this.tempProps}/>
        }
    }
    return {
        connect,
        getState: () => store,
        dispatch: (action, props) => {
            let res = action(store)
            middlewares && middlewares.map(middleware => middleware(store, res, props))
            if (res !== store) {
                store = res
                updateQueue.map(f => f())
            }
        }
    }
}