import { useRef } from 'react'
import "./app.css"

function App() {
  const myRef = useRef(null) 

  const CIRCLESIZE = 40;

  function handleClick(e){
    const {pageX,pageY} = e
    const p = document.createElement("p")
    p.style.width = `${CIRCLESIZE}`
    p.style.height = `${CIRCLESIZE}`
    p.style.left = `${pageX - CIRCLESIZE}px`
    p.style.top = `${pageY - CIRCLESIZE}px`
    myRef.current.appendChild(p)
  }

  return (
    <div className='main' onClick={handleClick} ref={myRef}>
    </div>
  )
}

export default App
