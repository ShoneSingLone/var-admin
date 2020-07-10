<template>
  <div class="Demo">
    <h1 class="this-title left">
      <a
        href="https://mp.weixin.qq.com/s/VXPD2p7q2S3yR9I7lzAkfw"
        target="_blank"
        rel="noopener noreferrer"
      >记忆卡片游戏</a>
    </h1>
    <h2 class="this-title">
      clickTimes: {{ clickTimes }}
    </h2>

    <keep-alive>
      <div
        v-show="currentView==='main'"
        class="page-main-container"
      >
        <transition-group
          name="list-complete"
          tag="div"
        >
          <el-card
            v-for="card in cards"
            :key="card.id"
            class="card-wrapper"
            @click.native="flipCard(card)"
          >
            <span :class="['list-complete-item',{hide:card.isHide}]">{{ card.name }}</span>
          </el-card>
        </transition-group>
      </div>
    </keep-alive>
  </div>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import { generateData } from "../../lib/antdv/es/vc-tree/demo/util";
const {
  _: { $loadCSS, $resolvePath, shuffle }
} = window;

(async () => {
  await $loadCSS($resolvePath("static/style/PageCardGame.css"));
})();

export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  data() {
    const cardNames = [
      "Apple",
      "Banana",
      "Orange",
      "Pineapple",
      "Strawberry",
      "watermelon"
    ];
    function generateData(cardNames) {
      return cardNames.map((name, id) => ({ name, id }));
    }
    let cards = generateData([...cardNames, ...cardNames, "嘻嘻嘻..."]);
    return {
      clickTimes: 0,
      cards
    };
  },
  created() {
    setTimeout(() => {
      this.cards = shuffle(this.cards);
      setTimeout(() => {
        this.cards.forEach(card => {
          this.$set(card, "isHide", true);
        });
      }, 1000 * 3);
    }, 1000 * 3);
  },
  methods: {
    flipCard(card) {
      this.clickTimes++;
      card.isHide = false;
      setTimeout(() => (card.isHide = true), 1000 * 2);
    }
  }
};
</script>
<style lang="less">
</style>