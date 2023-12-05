import { useRef, useState } from 'react'

function App() {
  const myRef = useRef(null) 
  const [activeCircles,setActiveCircles] = useState([])
  const [deactivateCircles,setDeactiveCircles] = useState([])
  let CIRCLESIZE = 40;


  function addCircle(e){
    const {pageX,pageY} = e
    const newCircle = {id: Date.now(), pageX, pageY};
    setActiveCircles([...activeCircles,newCircle])
    myRef.current.appendChild(createElement(pageX,pageY,newCircle.id))
  }

  function removeCircle(e){
    e.stopPropagation()
    const circle = activeCircles.pop()
    if(!circle) return
    setActiveCircles([...activeCircles])
    setDeactiveCircles([...deactivateCircles,circle])
    const child = document.getElementById(`${circle.id}`)
    myRef.current.removeChild(child)
  }

  function insertCircle(e){
    e.stopPropagation()
    const circle = deactivateCircles.pop()
    if(!circle) return
    setActiveCircles([...activeCircles,circle])
    setDeactiveCircles([...deactivateCircles])
    myRef.current.appendChild(createElement(circle.pageX,circle.pageY,circle.id))
  }

  function resetCircles(e){
    e.stopPropagation()
    setActiveCircles([])
    setDeactiveCircles([])
    activeCircles.forEach((circle) => {
      const child = document.getElementById(`${circle.id}`)
      myRef.current.removeChild(child)
    })
  }

  function createElement(pageX,pageY,id){
    const p = document.createElement("p")
    p.style.width = `${CIRCLESIZE}px`
    p.style.height = `${CIRCLESIZE}px`
    p.style.left = `${pageX - CIRCLESIZE/2}px`
    p.style.top = `${pageY - CIRCLESIZE/2}px`
    p.style.backgroundColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
    p.setAttribute("id",`${id}`)
    return p
  }

  function randomNumber(){
    return Math.round(Math.random()*256);
  }

  return (
    <div className='main' onClick={addCircle} ref={myRef}>
      <button onClick={removeCircle}>Remover</button>
      <button onClick={insertCircle}>Voltar</button>
      <button onClick={resetCircles}>Reset</button>
    </div>
  )
}

export default App
