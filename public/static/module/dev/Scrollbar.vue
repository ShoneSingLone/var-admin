<template>
  <div
    id="flip-list-demo"
    class="demo"
  >
    trWrapperStyle.transform{{ trWrapperStyle.transform }}
    translateY{{ translateY }}
    <div class="info-wrapper">
      <div
        class="table"
        :style="trWrapperStyle"
      >
        <div
          v-for="(item) in contentArrayVisual"
          class="tr"
        >
          <div class="td">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import last from "lodash/last";
import Carousel from "./carousel";
export default {
  name: "Scroll",
  components: {
    Carousel
  },
  data: function() {
    return {
      contentArrayReal:[
        1,2,3
      ],
      translateY:-50,
      trWrapperStyle:{
        transform:"translateY(-50px)"
      },
    };
  },
  computed:{
    contentArrayVisual(){
      return [
        last(this.contentArrayReal),
        ...this.contentArrayReal,
        this.contentArrayReal[0],
        this.contentArrayReal[1],
        this.contentArrayReal[2]
      ];
    }
  },
  mounted() {
    this.shuffle();
  },
  methods: {
    stop(){
this.isStop=true;
    },
    start(){
this.shuffle();
    },
    shuffle: function() {
      setTimeout(this.shuffle, 20);
      if (this.isStop) return;
      this.translateY=this.translateY-(1);
      if(this.translateY<=-200)this.translateY=-50;
      this.trWrapperStyle.transform = `translateY(${this.translateY}px)`;
    }
  }
};
</script>

<style scoped  lang="scss" >
.flip-list-move {
  transition: all 3s;
}
.info-wrapper {
  background: blue;
  outline: 1px solid red;
  width: 355px;
  height: 150px;
  margin: auto;
  overflow: hidden;
  .info-item {
  }

  .tr {
    height:50px;
    color: red;
    .td {
      margin:auto;
      background:green;
      border: 1px #3490ba solid !important;
      color: #fff;
    }
  }
}
</style>