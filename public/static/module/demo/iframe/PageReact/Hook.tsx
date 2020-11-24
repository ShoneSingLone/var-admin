(({ React, ReactDOM }) => {
  const { useState } = React

  function HookState() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }

  function CandyDispenser() {
    const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
    const [candies, setCandies] = useState(initialCandies)
    const dispense = candy => setCandies(allCandies => allCandies.filter(c => c !== candy));
    const makeLi = candy => (<li key={candy}> <button onClick={() => dispense(candy)}>grab</button> {candy} </li>);
    const showList = candies => {
      if (candies.length === 0) {
        return <button onClick={() => setCandies(initialCandies)}>refill</button>
      } else {
        return (<ul> {candies.map(makeLi)} </ul>);
      }
    };

    return (
      <fieldset>
        <legend>Candy Dispenser</legend>
        <a href="https://kentcdodds.com/blog/usememo-and-usecallback" target="_blank">When to useMemo and useCallback——Kent C. Dodds</a>
        <div>Available Candy</div>
        {showList(candies)}
      </fieldset>
    )
  }

  const element = (() => {
    return (
      <>
        <CandyDispenser />
        <fieldset style={{ overflow: 'hidden' }}>
          <legend>State Hook </legend>
          <HookState />
        </fieldset>
      </>
    );
  })();
  const targetDom = document.getElementById('hook');
  ReactDOM.render(element, targetDom);
})(window);