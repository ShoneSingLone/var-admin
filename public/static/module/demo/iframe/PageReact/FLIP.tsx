(({ React, ReactDOM }) => {
  const { useState, useEffect, useRef } = React



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
  const generateImg = (pictures) => pictures.map((item, index) => {
    return (<li key={index} data-image-width={item.width} data-image-src={item.color} className="pic-item" title="点击预览" style={item.style}> </li>);
  });

  const handlePreviewPicture = event => console.log(event);

  const element = (() => {
    return (
      <>
        <fieldset style={{ overflow: 'hidden' }}>
          <legend>FLIP</legend>
          <ul className="pic-list" onClick={handlePreviewPicture}>{generateImg(pictures)}</ul>
        </fieldset>
      </>
    );
  })();
  const targetDom = document.getElementById('FLIP');
  ReactDOM.render(element, targetDom);
})(window);