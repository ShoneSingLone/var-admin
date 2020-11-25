(({ React, ReactDOM, $ }) => {
  const { useState, useEffect, useRef } = React;
  const { createPortal } = ReactDOM;


  /*  */
  const bodyContainer = document.body;

  function generateData(size) {
    function getSize() {
      return Math.round(Math.random() * 70 + 40);
    }
    // 生成随机 16进制颜色
    function color16() {
      return ((Math.random() * 0x1000000) << 0).toString(16)
    }

    return Array(size).fill(1).map(() => {
      const width = getSize();
      const height = getSize();
      const color = color16();
      return {
        width,
        height,
        color,
        style: {
          backgroundColor: `#${color}`,
          width: `${width}px`,
          height: `${height}px`,
        },
      }
    })
  }

  // 生成随机尺寸的图片
  const pictures = generateData(10);
  let currentItem = {};
  let firstState = null;
  let lastState = null;
  /* 缓存还原时再用 */
  let cacheTransform = "";

  function FLIP() {
    const [showModal, setShowModal] = useState(false);
    const [modalItemStyle, setModalItemStyle] = useState({});
    const previewRef = useRef();
    function play() {

      cacheTransform = previewRef.current.style.transform;
      previewRef.current.style.transform = "unset";
    }
    function turn({ setShowModal }) {
      const hiddenModal = () => {
        setShowModal(false);
        cacheTransform = "";
      };
      previewRef.current.style.transform = cacheTransform;
      setTimeout(hiddenModal, 1200);
    }
    cacheTransform = "";

    useEffect(() => {
      if (showModal) {
        /*###2 Last：执行一段代码，让元素发生相应的变化，并记录元素在动画最后状态的位置和尺寸，即动画结束之后那一刻元素的位置和尺寸信息 */
        lastState = previewRef.current.getBoundingClientRect();
        /* Invert：计算元素第一个位置（First）和最后一个位置（Last）之间的位置变化（如果需要，还可以计算两个状态之间的尺寸大小的变化），然后使用这些数字做一定的计算，让元素进行移动（通过 transform来改变元素的位置和尺寸），从而创建它位于第一个位置（初始位置）的一个错觉
        即，一上来直接让元素处于动画的结束状态，然后使用 transform属性将元素反转回动画的开始状态（这个状态的信息在 First步骤就拿到了） */
        /* 缩放比例 */
        const scaleValue = firstState.width / lastState.width;
        /* 偏移距离 */
        const translateX = firstState.left - lastState.left;
        const translateY = firstState.top - lastState.top;

        const style = Object.assign({
          transform: `
                    translate(${translateX}px,${translateY}px) 
                    scale(${scaleValue})
                    `
        }, makestyle(currentItem));

        setModalItemStyle(style);
        /* Play：将元素反转（假装在first位置），我们可以把 transform设置为 none，因为失去了 transform的约束，所以元素肯定会往本该在的位置（即动画结束时的那个状态）进行移动，也就是last的位置，如果给元素加上 transition的属性，那么这个过程自然也就是以一种动画的形式发生了 */

        setTimeout(play, 90);
      }
    }, [showModal]);

    function handlePreviewPicture(event) {
      /*###1 First，指的是在任何事情发生之前（过渡之前），记录当前元素的位置和尺寸，即动画开始之前那一刻元素的位置和尺寸信息，可以使用 getBoundingClientRect()这个 API来处理（大部分情况下其实 offsetLeft和 offsetTop也是可以的） */
      firstState = event.target.getBoundingClientRect();
      setShowModal(true);
      currentItem = event.target.dataset;
      setModalItemStyle(makestyle(currentItem));
    };

    function makestyle(currentItem) {
      return {
        backgroundColor: `#${currentItem.color}`,
        width: `${currentItem.width * 3}px`,
        height: `${currentItem.height * 3}px`,
      }
    }

    const generateImg = (pictures, handlePreviewPicture) => pictures.map((item, index) => {
      return (<li
        key={index}
        className="pic-item"
        data-width={item.width}
        data-height={item.height}
        data-color={item.color}
        style={item.style}
        onClick={handlePreviewPicture}> </li>);
    });

    function Modal(props) {
      return createPortal(<div className="modal-container" onClick={props.onClick} onWheel={event => event.stopPropagation()}>{props.children}</div>, bodyContainer);
    }

    function generateModal({ showModal, setShowModal }) {
      if (showModal) {
        return (
          <Modal onClick={() => turn({ setShowModal })} >
            <div className="pic-item modal-item" style={modalItemStyle} ref={previewRef} />
          </Modal >
        );
      } else {
        return "";
      }
    }
    return <>
      <ul className="pic-list">{generateImg(pictures, handlePreviewPicture)}</ul>
      {generateModal({ showModal, setShowModal })}
    </>
  }

  const element = (() => {
    return (
      <>
        <fieldset style={{ overflow: 'hidden' }}>
          <legend>FLIP</legend>
          <FLIP />
        </fieldset>
      </>
    );
  })();
  const targetDom = document.getElementById('FLIP');
  ReactDOM.render(element, targetDom);
})(window);