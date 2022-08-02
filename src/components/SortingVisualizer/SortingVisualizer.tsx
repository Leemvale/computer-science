import { useEffect, useRef, useState } from "react";
import { bubbleSortGenerator } from "../../algorithms/sort/bubbleSort/bubbleSort";
import useDidMountEffect from "../../hooks/useDidMountEffect/useDidMounteffect";
import { randomIntFromInterval } from "../../utils/randomIntFromInterval/randomIntFromInterval";
import './SortingVisualizer.css';

function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [sortIterator, setSortIterator] = useState<Generator | null>(null)

  const setNewArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(randomIntFromInterval(10, 500));
    }
    setArray(newArray);

    setSortIterator(bubbleSortGenerator(newArray));
  }

  const onNextClick = () => {
    // TODO: fix types
    const value = sortIterator?.next().value;
    if (value) {
      const [operation, fistIndex, secondIndex] = value as any;
      console.log(operation, fistIndex, secondIndex)

      const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
      const barOneStyle = arrayBars[fistIndex].style;
      const barTwoStyle = arrayBars[secondIndex]?.style;


      if (operation === 'compare') {
        barOneStyle.backgroundColor = 'red';
        barTwoStyle.backgroundColor = 'red';
      }

      if (operation === 'swap') {
        const firstHeight = barOneStyle.height;
        const secondHeighy = barTwoStyle.height;
        barOneStyle.height = secondHeighy;
        barTwoStyle.height = firstHeight;
      }

      if (operation === 'reset colors') {
        barOneStyle.backgroundColor = '#DBA1E6';
        barTwoStyle.backgroundColor = '#DBA1E6';
      }


      if (operation === 'sorted') {
        barOneStyle.backgroundColor = 'green';
      }
    }
  }

  useDidMountEffect(() => {
    setNewArray();
  }, []);

  useDidMountEffect(() => {
    setInterval(() => onNextClick(), 500);
  }, [sortIterator]);

  return (
    <>
      <div>
        {array.map((value, index) => (
          <div
            key={index}
            className="array-bar"
            style={{
              backgroundColor: '#DBA1E6',
              height: `${value}px`,
            }}
          />
        ))}
      </div>

      {/* <button onClick={onNextClick}>Next</button> */}
    </>
  );
}

export default SortingVisualizer;