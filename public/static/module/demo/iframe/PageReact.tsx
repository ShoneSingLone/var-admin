(function () {
  var Clock = (props) => (<h2>It is {props.date}.</h2>);
  var LikeButton = (function () {
    const e = React.createElement;
    class LikeButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = { liked: false };
      }
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
        this.state = { value: '', currentName: "" };
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

      render() {
        return (
          <>
            {this.state.currentName}
            <form onSubmit={this.handleSubmit}>
              <h6>在受控组件上指定 value 的 prop 会阻止用户更改输入。需要通过state来单向改变</h6>
              <label>
                文章:
                <textarea value={this.state.value} onChange={this.handleChange} name="textarea" />
              </label>
              <label>
                选择你喜欢的风味:
              <select value={this.state.value} onChange={this.handleChange} name="select">
                  <option value="grapefruit">葡萄柚</option>
                  <option value="lime">酸橙</option>
                  <option value="coconut">椰子</option>
                  <option value="mango">芒果</option>
                </select>
              </label>
              <label>
                <span>名字:{this.state.value}</span>
                <input type="text" value={this.state.value} onChange={this.handleChange} name="input" />
              </label>
              <input type="submit" value="提交" />
            </form>
          </>
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

  var App = (() => {
    function Toolbar(props) {
      // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
      // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
      // 因为必须将这个值层层传递所有组件。
      return (
        <div>
          <ThemedButton theme={props.theme} />
        </div>
      );
    }

    class ThemedButton extends React.Component {
      render() {
        return <Button theme={this.props.theme} />;
      }
    }

    class App extends React.Component {

      render() {
        return <Toolbar theme="dark" />;
      }
    }
    return App;
  })();

  function Main() {
    var element = (
      <>
        <App />
        <Calculator />
        <UnControlledNameForm />
        <NameForm />
        <Clock date={Date.now()} />
        <LikeButton />
        <h1>title<span>{Date.now()}</span></h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }
  setInterval(Main, 1000 * 3);
})();
