<style>
	.vdf-imagelist-item {
		position: relative;
		overflow: hidden;
	}
	.vdf-imagelist-item img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

	}
	.vdf-imagelist-item .uploadprogress {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.vdf-imagelist-item .upload {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.vdf-imagelist-item .remove {
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
		height: 30px;
		visibility: hidden;
		background: rgba(0,0,0,0.5);
		line-height: 30px;
		text-align: center;
		color: #FFF;
		font-size: 24px;
	}
	.vdf-imagelist-item .remove:after {
		content: '×';
	}
	.vdf-imagelist-item:hover .remove {
		visibility: visible;
	}
</style>
<template>
	<div class="vdf-imagelist-item">
		<img :src="image" />
		<div v-if="!noprogress" v-show="uploading" class="uploadprogress" :style="{height: progress * 100 + '%'}"></div>
		<div v-if="noprogress" v-show="uploading" class="upload" :style="{height: progress * 100 + '%'}"></div>
		<div class="remove" @click="remove"></div>
	</div>
</template>
<script>
export default {
	props:{
		id: Number,
		image: String,
		progress: Number,
		uploading: Boolean,
		noprogress: Boolean,
		event: Vue,
		id: String,
	},
	data() {
		if (this.event instanceof Vue) {this.event.$on("get", x=>this.event.$emit("set", this.id, this.value));}
		return {};
	},
	methods:{
		remove() {
			this.$emit("remove", this.id);
		}
	},
}
</script>