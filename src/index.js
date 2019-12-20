import "./styles/main.scss";
import "./styles/main.styl";
import Test from "./project/1905/modules/Test.vue";
import Vue from "vue";


document.body.appendChild((() => {
  const element = document.createElement("div");
  element.id = "app";
  element.innerHTML = `Hello World! ${element.id}`;
  const logo = new Image();
  logo.src = require("./media/webpack.svg");
  element.appendChild(logo);
  return element;
})());

setTimeout(() => {
  new Vue({
    render: h => h(Test)
  }).$mount("#app");
}, 3000);

