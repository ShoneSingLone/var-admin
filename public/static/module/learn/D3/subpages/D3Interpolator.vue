<template>
  <div class="d3-container d3-scale">
    <mkit>
      <pre>
### Interpolator插值器
- [string-interpolation](@@/static/module/learn/D3/subpages/cookbook/src/chapter4/string-interpolation.html)
```js
    var sizeScale = d3.scaleLinear()
    .domain([1, 10])
    .range([  
        "italic bold 12px/30px Georgia, serif", 
        "italic bold 120px/180px Georgia, serif"
    ]);
    function render(data, scale, selector) {
        var cells = d3.select(selector).selectAll("div.cell")
                .data(data);

        cells.enter()
            .append("div")
                .classed("cell", true)
                .style("display", "inline-block")
            .append("span")
                .style("font", d=>scale(d))
                .text((d,i)=>i); 
```

>d3会对`font`的数值做**可使用校验**，目前没有找到单独抽出来使用的方法，有空再研究研究......
- [color-interpolation](@@/static/module/learn/D3/subpages/cookbook/src/chapter4/color-interpolation.html)
- [css3-color](http://www.w3.org/TR/css3-color/#html4)
- 与补间有何关联？

      </pre>
    </mkit>
    <article class="article">
      <h6>interpolate(0.1);{{ interpolate(0.1) }}</h6>
      <h6>interpolate(0.99);{{ interpolate(0.99) }}</h6>
    </article>
    asdf
    <mkit>
      <pre>
### compound-interpolation

- [compound-interpolation](@@/static/module/learn/D3/subpages/cookbook/src/chapter4/compound-interpolation.html)

```js
    var compoundScale = d3.scalePow()
            .exponent(2)
            .domain([0, 21])
            .range([
                {color:"#add8e6", height:"15px"}, // <-A
                {color:"#4169e1", height:"150px"} // <-B
            ]);
    var res = compoundScale(20);
/*
color: "rgb(75, 115, 225)"
height: "137.44897959183675px"
*/
```

>`d3.interpolateObject`函数对对象进行递归插值处理
      </pre>
    </mkit>
  </div>
</template>
<script>
import { randomNumber } from "@@/static/js/app/github/utils.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  props: ["data"],
  data() {
    return {
      d3: "",
      dataArray: [...new Array(10)].map((i, ii) => ii + 1),
      dataFont: [],
    };
  },
  methods: {
    interpolate() {},
  },
  async mounted() {
    const d3 = await window.loadLibById("d3");
    this.d3 = d3;
    this.interpolate = d3.interpolateNumber(0, 100);

    const sizeScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([
        "italic bold 12px/30px Georgia, serif",
        "italic bold 120px/180px Georgia, serif",
      ]);

    this.dataFont = this.dataArray.map((i) => ({
      d: i,
      style: sizeScale(i),
    }));
  },
};
</script>
