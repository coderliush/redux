/*
 * @Description: 
 * @Author: liushuhao
 * @Date: 2020-10-09 14:27:01
 * @LastEditors: liushuhao
 */
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { createStore } from './redux'

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
    default:
      return {
        ...state
      }
  }
}

const store = createStore(reducer)

function App() {
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

  return (
    <>
      <button onClick={onAdd}>add</button>
      <button onClick={onDel}>del</button>
      <div>{number}</div>
    </>
  )
}

var mountNode = document.getElementById("app")
ReactDOM.render(<App />, mountNode)