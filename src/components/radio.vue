<template>
	<div>
		<label v-for="o in options" :style="{display:inline?'contents':'block'}">
			<input type="radio"
				:value="o.value" :checked="o.value == value" :disabled="o.disabled" @click="click"
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
		value: String,
		config: Object,
		event: Vue,
		id: String,
	},
	data() {
		if (this.event instanceof Vue) {this.event.$on("get", x=>this.event.$emit("set", this.id, this.value));}
		let {id, options, inline, } = this.config;
		return {id, options, inline, };
	},
	watch:{
		config() {
			let {id, options, inline, } = this.config;
			this.id = id;
			this.options = options;
			this.inline = inline;
		}
	},
	methods:{
		click(e) {
			this.$emit("change", this.value = e.target.value);
		}
	}
}
</script>
