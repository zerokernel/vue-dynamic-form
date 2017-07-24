<template>
	<div>
		<select @change='change' :value="value" :readonly='readonly' :disabled="disabled">
			<option v-for="item in options" :value="item.value" :disabled="item.disabled">{{item.title}}</option>
			<optgroup v-for="group in optgroups" :label="group.title">
				<option v-for="item in group.options" :value="item.value" :disabled="item.disabled">{{item.title}}</option>
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
		value: String,
		config: Object,
		event: Vue,
		id: String,
	},
	data() {
		if (this.event instanceof Vue) {this.event.$on("get", x=>this.event.$emit("set", this.id, this.value));}
		let {options, optgroups, readonly, disabled} = this.config;
		return {options, optgroups, readonly, disabled};
	},
	watch:{
		config() {
			let {options, optgroups, readonly, disabled} = this.config;
			this.readonly = readonly;
			this.disabled = disabled;
			this.options = options;
			this.optgroups = optgroups;
		}
	},
	methods:{
		input($event) {
			this.$emit("change",this.value = $event.target.value);
		}
	},
}
</script>