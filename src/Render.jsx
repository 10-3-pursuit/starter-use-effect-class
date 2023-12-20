import { useEffect, useState } from "react";

const Render = () => {
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  // useEffect is a function that takes two arguments. an anonymous and a dependancy array
  // there is never a paramater inside the anonymous functions
  // useEffect(()=>{},[])

  // the dependancy array tells useEffect what to listen for in order to run
  // if the dependancy array is empty useEffect will only run one time
  useEffect(() => {
    // this is what you would use to fetch data
    console.log("UseEffect1 Ran");
  }, []);

  // this useEffect listens for a change in toggleTwo state
  useEffect(() => {
    console.log("UseEffect2 Ran");

    if (toggleTwo) console.log("UseEffect2 - I am changing my discount");
  }, [toggleTwo]);

  return (
    <div>
      {console.log("JSX Rendered or Re-rendered")}
      <h1>Render Component </h1>

      <button onClick={() => setToggleOne(!toggleOne)}>Toggle One</button>
      <button onClick={() => setToggleTwo(!toggleTwo)}>Toggle Two</button>
    </div>
  );
};

export default Render;
