import Carousel from './src/main';
import ElCarouselItem from "./src/item";

/* istanbul ignore next */
Carousel.install = function(Vue) {
  Vue.component(ElCarouselItem.name, ElCarouselItem);
  Vue.component(Carousel.name, Carousel);
};

export default Carousel;
