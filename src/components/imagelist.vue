<style>
	.vdf-imagelist > * {
		width: 150px;
		height:150px;
		float:left;
		margin: 10px;
		box-shadow: 5px 5px 5px #888888;
		border-radius: 5px;
	}
	.vdf-imagelist:after {
		content: '';
		display: block;
		clear: both;
	}
</style>
<template>
	<div class="vdf-imagelist">
		<div is="item"
			v-for="(item, id) in list"
			:image="item.image"
			:uploading="item.uploading"
			:fail="item.fail"
			:progress="item.progress"
			:noprogress="item.noprogress"
			:id="id"
			@remove="remove"
		></div>
		<button @click.prevent="add">上传</button>
	</div>
</template>
<script>
import item from './imagelist-item';
export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	props:{
		value: Array,
		config: Object,
		event: Vue,
		id: String,
	},
	components: {item},
	data() {
		if (this.event instanceof Vue) {this.event.$on("get", x=>this.event.$emit("set", this.id, this.value));}
		let value = this.value;
		if (!(value instanceof Array)) {value = [];}
		let list = value.map(image => ({image}));
		return {list};
	},
	watch:{
		value() {
			this.list.map(x=>x.stop?x.stop():null);
			let value = this.value;
			if (!(value instanceof Array)) {value = [];}
			this.list = value.map(image => ({image}));
		},
	},
	methods:{
		remove(id) {
			let item = this.list.splice(id, 1);
			if (item && item.stop) {
				item.stop();
			}
			this.change();
		},
		add(){
			this.config.upload().then(t=>{
				this.list.push(t);
				this.change();
				return t.next;
			}).then(x=>this.change())
		},
		change() {
			this.$emit("change", this.value = this.list.filter(x=>!x.uploading && !x.fail).map(x=>x.image));
		},
	},
}
</script>