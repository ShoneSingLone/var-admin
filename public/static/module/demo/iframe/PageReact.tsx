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

  function Main() {
    const element = (
      <>
        <Clock date={Date.now()} />
        <LikeButton />
        <h1>title<span>{Date.now()}</span></h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }
  setInterval(Main, 1000);
})();
