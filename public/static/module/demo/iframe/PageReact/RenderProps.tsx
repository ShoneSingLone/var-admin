(({ React, ReactDOM }) => {
  class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <div style={{ position: 'absolute', left: mouse.x + 10, top: mouse.y + 10, height: '50px', width: '50px', background: 'url(./PageReact/cat.png)center bottom/cover no-repeat' }}><div style={{ position: 'absolute', top: '-42px', right: '-82px' }}>{`X:${mouse.x} Y:${mouse.y}`}</div></div>
      );
    }
  }

  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h6 style={{ position: "absolute", zIndex: -1 }} >移动鼠标，带好你的猫</h6>
          <Mouse render={mouse => (<Cat mouse={mouse} />)} />
        </div >
      );
    }
  }

  /* 抽象功能的组件，最终返回的是组件提供的数据状态 */
  class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }

    render() {
      return (
        <div style={{ height: '30vh' }} onMouseMove={this.handleMouseMove}>
          {/*
            使用 `render`prop 动态决定要渲染的内容，
            而不是给出一个 <Mouse> 渲染结果的静态表示
          */}
          {this.props.render(this.state)}
        </div>
      );
    }
  }


  const element = (() => {
    return (
      <fieldset style={{ overflow: 'hidden' }}>
        <legend>Render Props </legend>
        <MouseTracker />
      </fieldset>
    );
  })();
  const targetDom = document.getElementById('renderProps');
  ReactDOM.render(element, targetDom);
})(window);