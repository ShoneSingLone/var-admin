/**
 * vue component: PageDevDoc 
 * lazyLoadComponents([], Vue.resolvePath("statics/components"));
 * Vue.loadJS([ [ "vue-easy-lightbox", Vue.resolvePath("statics/plugins/vue-2.6.10/vue-meditor.js") ] ]),
 */
(function (Vue) {
	var COMPONENT_NAME = "PageDevDoc";
	Vue.componentList[COMPONENT_NAME] =
		Promise.all([
			Vue.loadJS([
				["vue-meditor", Vue.resolvePath("statics/plugins/vue-2.6.10/marked.js")],
				["highlight-min", Vue.resolvePath("statics/plugins/markdown/highlight.min.js")]
			]),
			Vue.loadCSS([
				// ["monokai-sublime", Vue.resolvePath("statics/plugins/markdown/railscasts.css")]
				["monokai-sublime", Vue.resolvePath("statics/plugins/markdown/monokai_sublime.min.css")]
			])
		])
		.then(() => {
			const {
				marked,
				hljs
			} = window;
			return Promise.resolve({
				name: COMPONENT_NAME,
				mounted() {
					Vue
						.loadString(Vue.resolvePath("statics/modules/devdoc/docs/first.md"))
						.then(str => {
							this.content = str;
						});
				},
				data() {
					return {
						content: "",
						toc: []
					};
				},
				props: {},
				computed: {
					htmlString() {
						var renderer = new marked.Renderer();
						renderer.heading = (text, level) => {
							var slug = text.toLowerCase().replace(/[^\w]+/g, "-");
							this.toc.push({
								level: level,
								slug: slug,
								title: text
							});
							return "<h" + level + " id=\"" + slug + "\"><a href=\"#" + slug + "\" class=\"anchor\"></a>" + text + "</h" + level + ">";
						};
						return marked(this.content, {
							renderer: renderer,
							highlight: function (code) {
								return hljs.highlightAuto(code).value;
							}
						});
					}
				},
				methods: {}
			});
		});

})(window.Vue);