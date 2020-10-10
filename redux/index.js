/*
 * @Description: 
 * @Author: liushuhao
 * @Date: 2020-10-10 10:07:59
 * @LastEditors: liushuhao
 */

/**
 * @param {function} reducer 传入一个 reducer 
 * @returns {object} 返回一个包含各种方法的对象 { dispatch, getState, subscribe ... }
 */
export function createStore(reducer) {
    let state
    let listeners = []
    const getState = () => state
    const subscribe = (fn) => {
        listeners.push(fn)

        const unsubscribe = () => {
            listeners = listeners.filter(listener => fn !== listener)
        }
        return unsubscribe
    }
    // 1.通过 dispath a action 去修改 state 
    // 2. subcribe 注册的所有回调
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    // 初始调用 dispatch，返回默认的 state
    dispatch({ type: `@@redux/__INIT__${Math.random()}` });

    return {
        getState,
        dispatch,
        subscribe
    }
}

export function compose(...funcs) {
    //如果没有中间件
    if (funcs.length === 0) {
        return arg => arg
    }
    //中间件长度为1
    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((prev, current) => (...args) => prev(current(...args)));
}

export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        let store = createStore(...args)
        let dispatch
        const middlewaresAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }

        let middles = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...middles)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}
