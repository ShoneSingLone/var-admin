(({ React, ReactDOM }) => {
  var DataSource = {
    countId: 0,
    deep: {},
    addChangeListener(handler) {
      handler.id = ++this.countId;
      this.deep[`id_${handler.id}`] = handler;
    },
    removeChangeListener(handler) {
      delete this.deep[`id_${handler.id}`]
    },
    getComments() {
      return [{ id: 1 }];
    }
  }

  const Comment = (props) => <h1>COMMENT{props.comment.id}</h1>;

  function wrapperHOC(InnerComponent, setComments) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          // 假设 "DataSource" 是个全局范围内的数据源变量
          comments: DataSource.getComments()
        };
      }

      componentDidMount() {
        // 订阅更改
        DataSource.addChangeListener(this.handleChange);
      }

      componentWillUnmount() {
        debugger;
        // 清除订阅
        DataSource.removeChangeListener(this.handleChange);
      }

      handleChange() {
        // 当数据源更新时，更新组件状态
        this.setState({
          comments: DataSource.getComments()
        });
      }
      render() {
        return <InnerComponent {...this.props} comments={setComments(this.state)} />
      }
    }
  }

  class CommentList extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        // 假设 "DataSource" 是个全局范围内的数据源变量
        comments: DataSource.getComments()
      };
    }

    componentDidMount() {
      // 订阅更改
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      // 清除订阅
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      // 当数据源更新时，更新组件状态
      this.setState({
        comments: DataSource.getComments()
      });
    }

    render() {
      return (
        <>
          { this.state.comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
        </>
      );
    }
  }

  const CommentListHOC = wrapperHOC((props) => {
    if (props && props.comments && props.comments.length > 0) {
      return props.comments.map((comment) => <Comment comment={comment} key={comment.id} />)
    } else {
      return <h1>nothing</h1>;
    }
  }, state => state.comments.map(comment => Object.assign({}, comment, { id: `${comment.id}_warpper` })));

  const CommentListHOC2 = wrapperHOC((props) => {
    if (props && props.comments && props.comments.length > 0) {
      return props.comments.map((comment) => <Comment comment={comment} key={comment.id} />)
    } else {
      return <h1>nothing</h1>;
    }
  }, state => state.comments.map(comment => Object.assign({}, comment, { id: `${comment.id}_warpper_2` })));

  const element = (() => {
    const ComponentArray = [CommentListHOC, CommentListHOC2, CommentList];

    const ComponentArray0 = ComponentArray[0];
    const ComponentArray1 = ComponentArray[1];
    const ComponentArray2 = ComponentArray[2];

    return (
      <fieldset>
        <legend>HOC</legend>
        <h6>CommentList 是Class ,挂载的是实例</h6>
        <h6>装饰器？AOP？逻辑复用？</h6>
        <p> 获取数据的逻辑复用 </p>
        <h6>在运行时选择类型(渲染函数单纯渲染，所以要在之前确定？)</h6>
        <ComponentArray0 otherData={{ msg: 'hello' }} />
        <ComponentArray1 otherData={{ msg: 'hello' }} />
        <ComponentArray2 />
      </fieldset>
    );
  })();
  const targetDom = document.getElementById('hoc');
  ReactDOM.render(element, targetDom);
})(window);