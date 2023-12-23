import { useState } from "react";

const Timeline = () => {
  const [number, setNumber] = useState(0);
  const [list, setlist] = useState([]);
  const handleClick = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
    setlist((prev) => [
      ...prev,
      ...Array.from({ length: newNumber * 3000 }).map(
        (_, idx) => `${idx + number * 3000}`
      ),
    ]);
  };

  return (
    <>
      <button onClick={handleClick}>+</button>
      <ul>
        {list.map((item, idx) => (
          <li key={`${item}_${idx}`}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Timeline