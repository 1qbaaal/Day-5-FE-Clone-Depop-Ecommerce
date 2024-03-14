import { useReducer } from "react"
import CounterReducer from "../../reducers/counterslice";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function UseReducerComponent(){

  const [state, dispatch] = useReducer(CounterReducer, { counter: 0})
  // const [counter, setCounter] = useState(0)

  const handleIncrement = () => {
        // setCounter(counter + 1)
        dispatch({ type: 'increment'})
  }

  const handleDecrement = () => {
        // setCounter(counter - 1)
        dispatch({ type: 'decrement'})
  }

  return(
    <div className="flex gap-2 pb-4">
        <button onClick={handleDecrement} className="border border-black px-2 bg-black text-white"> <FaMinus /> </button>
        <p>{state.counter}</p>
        <button onClick={handleIncrement} className="border border-black px-2 bg-black text-white"> <FaPlus /> </button>
    </div>
  )
}