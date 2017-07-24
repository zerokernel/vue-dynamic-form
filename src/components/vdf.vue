<template>
	<form @submit="submit">
		<div v-for="item in list">
			<label>{{item.title}}</label>
			<div
				:is="'vdf-' + item.type" :id="item.id"
				:config="item" :event="event" :value="value[item.id]" @change="value[item.id] = $event.target.value"
			></div>
		</div>
	</form>
</template>


<script>
import vdfCheck from './check';
import vdfImage from './image';
import vdfImagelist from './imagelist';
import vdfList from './list';
import vdfPassword from './password';
import vdfRadio from './radio';
import vdfSelect from './select';
import vdfText from './text';
import vdfTextarea from './textarea';
export default {
	props:{
		list: Array,
		value: Object,
		submitText: String,
		event: Vue,
	},
	data() {
		return {};
	},
	components: {vdfCheck, vdfImage, vdfImagelist, vdfList, vdfPassword, vdfRadio, vdfSelect, vdfText, vdfTextarea},
	watch:{
	},
	methods:{
		submit($event) {
			this.$emit("submit");
		}
	},
}
</script>