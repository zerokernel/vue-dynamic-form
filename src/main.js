//es6语法：
import vdf from './components/vdf';
window.vdf = function ({el, value, list, submit, submitText}) {
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (!el) {return null;}
	el.setAttribute('is','vdf');
	el.setAttribute(':list','list');
	el.setAttribute(':value','value');
	el.setAttribute(':event','event');
	el.setAttribute(':submit-text','submitText');
	el.setAttribute('v-on:submit','submit');
	let retData = {};
	let event = new Vue;
	event.$on("set", (k,v) => retData[k] = v);
	let v = new Vue({
		el,
		data:{submitText, value, list, submit(){submit.call(ret);},event},
		components: {vdf},
		methods:{
			getValue(){
				event.$emit("get");
				return retData;
			}
		}
	});
	let ret = {
		get value() {return v.getValue();},
		set value(s) {return v.value = s;},
		get submitText() {return v.submitText;},
		set submitText(s) {return v.submitText = s;},
		get list() {return v.list;},
		set list(s) {return v.list = s;},
		get submit() {return v.submit;},
		set submit(s) {return v.submit = s;},
		get vue() {return v;}
	};
	return ret;
}
