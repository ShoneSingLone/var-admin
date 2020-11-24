(({ React, ReactDOM }) => {
  var Clock = (props) => (
    <fieldset>
      <legend>Clock</legend>
      <h6>{`${props.date}`}</h6>
      <h6> {`toLocaleTimeString ${props.date.toLocaleTimeString()}`}</h6>
    </fieldset>
  );

  var LikeButton = (function () {
    const e = React.createElement;
    class LikeButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = { liked: false };
      }
      /* JSX的本质是React.createElement 最终是一个React元素  */
      render() {
        return e(
          'button',
          { onClick: () => this.setState({ liked: !this.state.liked }) },
          this.state.liked ? 'Like' : 'unLike'
        );
      }
    }
    return LikeButton;
  })();

  var NameForm = (() => {
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        /* data */
        this.state = { value: '', currentName: "", uncontrolled: "" };
        /* methods */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({ value: event.target.value, currentName: event.target.name });
      }
      handleSubmit(event) {
        alert('提交的名字: ' + this.state.value);
        event.preventDefault();
      }

      /* template */
      render() {
        var selectOptions = [
          { value: "grapefruit", label: "葡萄柚" },
          { value: "lime", label: "酸橙" },
          { value: "coconut", label: "椰子" },
          { value: "mango", label: "芒果" }
        ];
        function renderOptions(optionsArray) {
          return optionsArray.map(item => <option value={item.value} key={item.label}>{item.label}</option>)
        }
        return (
          <fieldset>
            <legend>受控表单</legend>
            <h6>改变值的控件名：{this.state.currentName}</h6>
            <form onSubmit={this.handleSubmit}>
              <h6>在受控组件上指定 value 的 prop 会阻止用户更改输入。需要通过state来单向改变</h6>
              <div>
                <label> <span>controlled:</span> <input type="text" value={this.state.value} onChange={this.handleChange} name="input" /> </label>
                <label> <span>uncontrolled:</span> <input type="text" value={this.state.uncontrolled} name="input" onChange={() => { }} /> </label>
              </div>
              <div>
                <label> 选择你喜欢的风味: <select value={this.state.value} onChange={this.handleChange} name="select"> {renderOptions(selectOptions)} </select> </label>
              </div>
              <br />
              <br />
              <div>
                <label> 文章: <textarea value={this.state.value} onChange={this.handleChange} name="textarea" /> </label>
              </div>
              <br />
              <input type="submit" value="提交" />
            </form>
          </fieldset>
        );
      }
    }
    return NameForm;
  })();


  var UnControlledNameForm = (() => {
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.input.current.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              UnControlledNameForm:
              不必每次触发事件就渲染，最后提交的时候才根据引用获取，很有jQuery时期的风格
              <input type="text" ref={this.input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    return NameForm;
  })();


  var Calculator = (() => {
    function tryConvert(temperature, convert) {
      const input = parseFloat(temperature);
      if (Number.isNaN(input)) {
        return '';
      }
      const output = convert(input);
      const rounded = Math.round(output * 1000) / 1000;
      return rounded.toString();
    }

    function toCelsius(fahrenheit) {
      return (fahrenheit - 32) * 5 / 9;
    }

    function toFahrenheit(celsius) {
      return (celsius * 9 / 5) + 32;
    }

    const scaleNames = {
      c: 'Celsius',
      f: 'Fahrenheit'
    };

    function BoilingVerdict(props) {
      if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
      }
      return <p>The water would not boil.</p>;
    }

    class TemperatureInput extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
      }

      render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
          <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature}
              onChange={this.handleChange} />
          </fieldset>
        );
      }
    }
    class Calculator extends React.Component {
      constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
      }

      handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
      }

      handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
      }

      render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
          <div>
            <TemperatureInput
              scale="c"
              temperature={celsius}
              onTemperatureChange={this.handleCelsiusChange} />
            <TemperatureInput
              scale="f"
              temperature={fahrenheit}
              onTemperatureChange={this.handleFahrenheitChange} />
            <BoilingVerdict
              celsius={parseFloat(celsius)} />
          </div>
        );
      }
    }
    return Calculator;
  })();


  /*  */
  var { App, AppWithContext } = (() => {
    // 为当前的 theme 创建一个 context（“light”为默认值）。
    const ThemeContext = React.createContext('light');

    // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
    // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
    // 因为必须将这个值层层传递所有组件。
    const Toolbar = (props) => (
      <fieldset>
        <legend>何时使用 Context？</legend>
        <h6>一般是一级一级传入props</h6>
        <ThemedButton theme={props.theme} />
      </fieldset>
    );

    class ThemedButton extends React.Component {
      render() {
        /* Button 是自定义React 组件 */
        return <button theme={this.props.theme} >{
          ['context' + this.props.theme,
          console.log(this.context)]
        }</button>;
      }
    }
    class ThemedButtonInject extends React.Component {
      /* https://zh-hans.reactjs.org/docs/context.html#classcontexttype */
      static contextType = ThemeContext;
      render() {
        /* Button 是自定义React 组件 */
        return (<>
          <h6>使用priovider 透传</h6>
          <pre>
            const ThemeContext = React.createContext('light');
            可以被访问到
          </pre>
          <h2>多context相当劝退，算了...</h2>
          <ul>
            <li>React.createContext</li>
            <li>Class.contextType</li>
            <li>Context.Provider</li>
            <li>Context.Consumer</li>
          </ul>
          <button theme={this.context} >{this.context}</button></>);
      }
    }

    class AppWithContext extends React.Component {
      render() {
        return (
          <>
            <fieldset>
              <legend> ThemeContext.Provider </legend>
              <ThemeContext.Provider value="ProviderDark">
                <ThemedButtonInject />
              </ThemeContext.Provider>
            </fieldset>
          </>
        )
      }
    }

    class App extends React.Component {
      render() {
        return (<Toolbar theme="dark" />);
      }
    }
    return { App, AppWithContext };
  })();


  var ErrorBoundaryApp = (() => {
    const Count = (props) => {
      if (props.count > 3) {
        throw new Error("count large than 3")
      } else {
        return <button onClick={props.onClick}> {[props.count, props.children]} </button>;
      }
    }
    class ErrorBoundaryApp extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, count: 0 };
        this.change = this.change.bind(this);
      }
      change(tag) {
        var state = tag ? { count: this.state.count + 1 } : { count: this.state.count - 1 }
        this.setState(state);
      }
      render() {
        return (
          <fieldset>
            <legend>ErrorBoundary 大于 3 就炸</legend>
            <h1 style={{ color: 'blue' }}>可使用useReducer 方案替换</h1>
            <ErrorBoundary >
              <Count count={this.state.count} onClick={() => { this.change(1) }}>add</Count>
              <br />
              <Count count={this.state.count} onClick={() => { this.change(0) }}>sub</Count>
            </ErrorBoundary>
          </fieldset>
        );
      }

    }
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
      }

      componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.error(error, errorInfo);
      }

      render() {
        if (this.state.hasError) {
          // 你可以自定义降级后的 UI 并渲染
          return (<><h1>Boom!!</h1><h2>getDerivedStateFromError->componentDidCatch</h2></>);
        } else {
          return this.props.children;
        }
      }
    }
    return ErrorBoundaryApp;
  })();

  ((targetDom) => {
    const Nothing = prop => <h1>nothing</h1>;
    var element = (
      <>
        <ul>
          <li>ref 不是 prop 属性; React.createRef(); React.forwardRef </li>
          <li>children</li>
          <li>render</li>
          <li>key</li>
        </ul>
        <ErrorBoundaryApp />
        <App />
        <AppWithContext />
        <Calculator />
        <UnControlledNameForm />
        <NameForm />
        <Clock date={new Date()} />
        <LikeButton />
      </>
    );
    ReactDOM.render(element, targetDom);
  })(document.getElementById('root'));
})(window);
