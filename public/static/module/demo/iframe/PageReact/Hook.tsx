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

  const element = (() => {
    return (
      <fieldset style={{ overflow: 'hidden' }}>
        <legend>State Hook </legend>
        <HookState />
      </fieldset>
    );
  })();
  const targetDom = document.getElementById('hook');
  ReactDOM.render(element, targetDom);
})(window);