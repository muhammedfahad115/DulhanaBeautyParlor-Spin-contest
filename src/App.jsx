import { useEffect, useRef } from "react";
import { useState } from "react";
import img from './assets/beautyparlor-3.jpg';
import data from '../public/data.json'

function App() {
  const [array] = useState(data);
  const [current, setCurrent] = useState(0);
  const [pause, setPause] = useState(false);
  const [result, setResult] = useState([]);
  const [isStartClicked, setIsStartClicked] = useState(false)

  
  useEffect(()=>{
   if(result.length > 0){
    localStorage.setItem('result', JSON.stringify(result))
   }
  },[result])
  useEffect(()=>{
    const checkWinners = JSON.parse(localStorage.getItem('result'))
    if(checkWinners){
      setResult(checkWinners)
    }
},[])
  useEffect(() => {
    if (isStartClicked && result.length < 10) {
      if (!pause) {
        let intervalId;
        if (current !== array.length) {
          intervalId = setInterval(() => {
            setCurrent(current + 1);
          }, 100);
        } else {
          setCurrent(0);
        }
        return () => {
          clearInterval(intervalId);
        };
      } else {
        let found = false
        for (const value of result) {
          if(array[current].slNo === value.slNo){
            found = true
            break;
          }
        }
        if (!found) setResult([...result, array[current]]);
      }
    }
  }, [current, pause]);

  useEffect(() => {
    if (result.length < 10) {
      let intervalId = setInterval(() => {
        setPause(!pause);
      }, 4000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [pause]);
  function handleStart() {
    setIsStartClicked(true)
  }
  function handleStop() {
    setIsStartClicked(false)
  }
  function clearbutton(){
    setResult([])
    localStorage.clear()
  }

  return (
    <>
    <div>
      <div className="w-screen h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center" style={{ backgroundImage: `url(${img})` }}>
        <div className="flex flex-col sm:flex-row md:w-3/4  h-4/5 sm:h-5/6 items-center justify-between gap-4 p-4">
          <div className="w-[300px]  h-auto sm:h-96 bg-yellow-900 opacity-65 rounded-lg p-4 mr-56 flex flex-col justify-between">
            <h2 className="flex justify-center font-extrabold text-white text-2xl mb-4">Winners</h2>
            <div className="flex flex-wrap flex-grow overflow-y-auto">
              {result.map((item) => (
                <div key={item.slNo} className="flex flex-col bg-white p-4 m-2 rounded-lg shadow-md">
                  <p className="text-black text-xl font-semibold">SlNo: {item.slNo}</p>
                  <p className="text-black text-xl font-semibold">Name: {item.name}</p>
                  <p className="text-black text-xl font-semibold">Course: {item.course}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 sm:space-y-7 w-full sm:w-auto">
          <div className="flex w-full sm:w-1/2 items-center justify-center gap-4 border rounded-lg bg-white bg-opacity-75 p-4" style={{ width: '300px', height: '200px' }}>
  <div className="flex p-3">
    <p className="text-lg font-medium text-gray-900">
      { array.length > 0 && array[current]?.name}
    </p>
  </div>
</div>

            <button onClick={handleStart} className="bg-yellow-900 hover:text-opacity-100 text-white cursor-pointer text-center flex justify-center items-center rounded-2xl font-bold h-12 sm:h-12 w-full sm:w-[200px] opacity-70">Start</button>
            <button onClick={handleStop} className="bg-yellow-900 hover:text-opacity-100 text-white cursor-pointer text-center flex justify-center items-center rounded-2xl font-bold h-12 sm:h-12 w-full sm:w-[200px] opacity-70">Stop</button>
            <button onClick={clearbutton} className="bg-yellow-900 hover:text-opacity-100 text-white cursor-pointer text-center flex justify-center items-center rounded-2xl font-bold h-12 sm:h-12 w-full sm:w-[200px] opacity-70">Clear</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
