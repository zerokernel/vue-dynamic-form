<template>
	<div>
		<label v-for="o in options" :style="{display:inline?'contents':'block'}">
			<input type="checkbox"
				:value="o.value" :checked="select[o.value]" :disabled="o.disabled" @click="click"
			/>
			{{o.title}}
		</label>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	props:{
		value: [Array,String],
		config: Object,
		event: Vue,
		id: String,
	},
	data() {
		if (this.event instanceof Vue) {this.event.$on("get", x=>this.event.$emit("set", this.id, this.value));}
		let select = {};
		let v = this.value;
		if (typeof v === "string") {
			v = [v];
		} else if (!((v instanceof Array))) {
			v = [];
		}
		v.map(x=>select[x] = true);
		let {id, options, inline, } = this.config;
		return {id, options, inline, select, };
	},
	watch:{
		value() {
			let select = {};
			let v = this.value;
			if (typeof v === "string") {
				v = [v];
			} else if (!(v instanceof Array)) {
				v = [];
			}
			v.map(x=>select[x] = true);
			this.select = select;
		},
		config() {
			let {id, options, inline, } = this.config;
			this.id = id;
			this.options = options;
			this.inline = inline;
		}
	},
	methods:{
		click(e) {
			let select = this.select;
			select[e.target.value] = e.target.checked;
			let v = [];
			for(let k in select) {
				if (select[k]) {
					v.push(k);
				}
			}
			this.$emit("change", this.value = v);
		},
	}
}
</script>
