<template>
	<div>
		<select class="form-control" :multiple="multiple" :name="id" :size="size" :readonly="readonly" :disabled="disabled" @change="change">
			<option v-for="o in options" :disabled="o.disabled" :selected="select[o.value]" :value="o.value">{{o.title}}</option>
			<optgroup v-for="group in optgroups" :label="group.title">
				<option v-for="o in group.options" :value="o.value" :selected="select[o.value]" :disabled="o.disabled">{{o.title}}</option>
			</optgroup>
		</select>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	props:{
		value: [Array, String],
		config: Object,
		event: Vue,
		id: String,
	},
	data() {
		if (this.event instanceof Vue) {this.event.$on("get", x=>this.event.$emit("set", this.id, this.value));}
		let {id, readonly, disabled, prompt, options, optgroups, multiple, size} = this.config;
		let select = {};
		let v = this.value;
		if (typeof v === "string") {
			v = [v];
		} else if (!((v instanceof Array))) {
			v = [];
		}
		v.map(x=>select[x] = true);
		if (!(size instanceof Number)) {
			size = 5;
		} else if (size > 100) {
			size = 100;
		} else if (size < 2) {
			size = 2;
		}
		this.value = this.multiple ? v : v[0];
		return {id, readonly, disabled, prompt, options, optgroups, select, multiple, size};
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
			this.value = this.multiple ? v : v[0];
		},
		config() {
			let {id, readonly, disabled, prompt, options, multiple, size} = this.config;
			if (!(size instanceof Number)) {
				size = 5;
			} else if (size > 100) {
				size = 100;
			} else if (size < 2) {
				size = 2;
			}
			this.id = id;
			this.readonly = readonly;
			this.disabled = disabled;
			this.prompt = prompt;
			this.options = options;
			this.multiple = multiple;
			this.size = size;
		}
	},
	methods:{
		change(e) {
			let list = e.target.children;
			let select = this.select;
			for (let i = 0; i < list.length; i++) {
				let dom = list[i];
				if(dom.tagName === "OPTGROUP") {
					let list = dom.children;
					for (let j = 0; j < list.length; j++) {
						let dom = list[j];
						select[dom.value] = dom.selected;
					}
				} else {
					select[dom.value] = dom.selected;
				}
			}
			let v = [];
			for(let k in select) {
				if (select[k]) {
					v.push(k);
				}
			}
			this.$emit("change", this.value = this.multiple ? v : v[0]);
		}
	}
}
</script>
