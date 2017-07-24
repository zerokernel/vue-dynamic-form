<template>
	<div>
		<input type="text" class="form-control"
			:name="id" :value="value" @input="input"
			:maxlength="max" :minlength="min"
			:readonly="readonly" :disabled="disabled" :placeholder="prompt"
		/>
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
		let {id, max, min, readonly, disabled, prompt} = this.config;
		return {id, max, min, readonly, disabled, prompt};
	},
	watch:{
		config() {
			let {id, max, min, readonly, disabled, prompt} = this.config;
			this.id = id;
			this.readonly = readonly;
			this.disabled = disabled;
			this.prompt = prompt;
			this.max = max;
			this.min = min;
		}
	},
	methods:{
		input($event) {
			this.$emit("change",this.value = $event.target.value);
		}
	},
}
</script>