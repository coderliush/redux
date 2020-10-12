/*
 * @Description: 
 * @Author: liushuhao
 * @Date: 2020-10-09 14:27:01
 * @LastEditors: liushuhao
 */
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from './redux'
import { Provider, connect } from './redux/react-redux'
import thunk from './redux/redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        number: state.number + action.number
      }
    case 'DEL':
      return {
        ...state,
        number: state.number - action.number
      }
    case 'ASYNCAdd': 
      return {
        ...state,
        number: state.number + action.number
      }
    default:
      return {
        ...state
      }
  }
}

function _App() {
  const [number, setNumber] = useState(() => store.getState().number)

  const onAdd = () => {
    store.dispatch({ type: 'ADD', number: 1 })
    store.subscribe(() => {
      let number = store.getState().number
      setNumber(number)
    })
  }

  const onDel = () => {
    store.dispatch({ type: 'DEL', number: 1 })
    store.subscribe(() => {
      let number = store.getState().number
      setNumber(number)
    })
  } 

  const onAsyncAdd = () => {
    store.dispatch(() => {
      setTimeout(() => {
        return dispatch({ type: 'ASYNCAdd', number: 1 })
      }, 1000);
    })
  }

  return (
    <>
      <button onClick={onAdd}>add</button>
      <button onClick={onDel}>del</button>
      <button onClick={onAsyncAdd}>asyncAdd</button>
      <div>{number}</div>
    </>
  )
}

let App = connect(() => {
  return {}
}, {
  // add,
  // del,
})(_App)

var mountNode = document.getElementById("app")
ReactDOM.render(<_App />, mountNode)
// React.render(<Provider store={store}><App /></Provider>, mountNode)