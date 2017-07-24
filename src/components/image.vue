<style>
	.vdf-image {
		width: 150px;
		height:150px;
		margin: 10px;
		box-shadow: 5px 5px 5px #888888;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
	}
	.vdf-image img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

	}
	.vdf-image .uploadprogress {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.vdf-image .upload {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.vdf-image:after {
		content: '修改';
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		line-height: 150px;
		visibility: hidden;
		background: rgba(0,0,0,0.5);
		text-align: center;
		color: #FFF;
		font-size: 24px;
	}
	.vdf-image:hover:after {
		visibility: visible;
	}
</style>
<template>
	<div>
		<div class="vdf-image"  @click="upload">
			<img :src="item.image" />
			<div v-if="!item.noprogress" v-show="item.uploading" class="uploadprogress" :style="{height: item.progress * 100 + '%'}"></div>
			<div v-if="item.noprogress" v-show="item.uploading" class="upload"></div>
		</div>
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
		return {item: {image: this.value}};
	},
	watch:{
		value() {
			try {
				this.item.stop();
			} catch(e){}
			this.item = {image: this.value};
		},
	},
	methods:{
		upload(){
			this.config.upload().then(t=>{
				try {
					this.item.stop();
				} catch(e){}
				this.item = t;
				return t.next;
			}).then(x=>this.change())
		},
		change() {
			this.$emit("change", this.value = this.item.image);
		},
	},
}
</script>