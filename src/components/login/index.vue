<template>
	<Renderer ref="rendererRef" pointer resize="window">
		<Camera :position="{ z: 10 }" :fov="120" />
		<Scene>
			<Points ref="pointsRef" :position="{ z: -100 }">
				<BufferGeometry :attributes="attributes" />
				<ShaderMaterial :blending="2" :depth-test="false" :uniforms="uniforms" :vertex-shader="vertexShader" :fragment-shader="fragmentShader">
					<Texture src="https://assets.codepen.io/33787/sprite.png" uniform="uTexture" />
				</ShaderMaterial>
			</Points>
		</Scene>
		<EffectComposer>
			<RenderPass />
			<UnrealBloomPass :strength="2" :radius="0" :threshold="0" />
			<ZoomBlurPass :strength="zoomStrength" />
		</EffectComposer>
	</Renderer>
	<!-- <a href="#" @click="login" @mouseenter="targetTimeCoef = 100" @mouseleave="targetTimeCoef = 1">login</a> -->
	<a href="#" @click="login">login</a>
	<div
		v-show="loginSuccess"
		class="h-full w-full z-50 absolute left-0 top-0 bg-white/0 pointer-events-none"
		:class="{ 'mask-animation': loginSuccess }"
	/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { IAccount } from './type'
import { useUserStore } from '@/store/module/user'

import {
	Camera,
	Renderer,
	Scene,
	lerp,
	BufferGeometry,
	EffectComposer,
	Points,
	RenderPass,
	ShaderMaterial,
	Texture,
	UnrealBloomPass,
	ZoomBlurPass,
} from 'troisjs'
import { Clock, Color, MathUtils, Vector3 } from 'three'
import { niceColors } from '@/assets/niceColors'
import router from '@/router'

const { randFloat: rnd, randInt, randFloatSpread: rndFS } = MathUtils

const vertexShader = `
  uniform float uTime;
  attribute vec3 color;
  attribute float size;
  attribute float velocity;
  varying vec4 vColor;
  void main(){
    vColor = vec4(color, 1.0);
    vec3 p = vec3(position);
    p.z = -150. + mod(position.z + uTime, 300.);
    vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
    gl_PointSize = size * (-50.0 / mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`
const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec4 vColor;
  void main() {
    gl_FragColor = vColor * texture2D(uTexture, gl_PointCoord);
  }
`

const POINTS_COUNT = 3000
const palette = niceColors[83]
const zoomStrength = ref(0)

const positions = new Float32Array(POINTS_COUNT * 3)
const colors = new Float32Array(POINTS_COUNT * 3)
const sizes = new Float32Array(POINTS_COUNT)
const v3 = new Vector3(),
	color = new Color()
for (let i = 0; i < POINTS_COUNT; i++) {
	v3.set(rndFS(200), rndFS(200), rndFS(300))
	v3.toArray(positions, i * 3)
	color.set(palette[Math.floor(rnd(0, palette.length))])
	color.toArray(colors, i * 3)
	sizes[i] = rnd(5, 20)
}

const attributes = [
	{ name: 'position', array: positions, itemSize: 3 },
	{ name: 'color', array: colors, itemSize: 3 },
	{ name: 'size', array: sizes, itemSize: 1 },
]

const uniforms = { uTime: { value: 0 } }

const clock = new Clock()

const timeCoef = ref(1)
const targetTimeCoef = ref(1)

const rendererRef = ref()
const pointsRef = ref()

const loginSuccess = ref(false)
async function login() {
	// const colorAttribute = pointsRef.value.geometry.attributes.color
	// const ip = randInt(0, 99)
	// const palette = niceColors[ip]
	// const color = new Color()

	// for (let i = 0; i < POINTS_COUNT; i++) {
	// 	color.set(palette[randInt(0, palette.length)])
	// 	color.toArray(colorAttribute.array, i * 3)
	// }
	// colorAttribute.needsUpdate = true

	targetTimeCoef.value = 100
	// 登录
	const userStore = useUserStore()
	const res = await userStore.loginAction(account)
	console.log(res)
	if (res) {
		loginSuccess.value = true
		setTimeout(() => {
			router.push('/charts/lineChart')
		}, 1200)
	}
}

onMounted(() => {
	const positionN = rendererRef.value.three.pointer.positionN
	const point = pointsRef?.value.points

	rendererRef.value.onBeforeRender(() => {
		timeCoef.value = lerp(timeCoef.value, targetTimeCoef.value, 0.02)
		uniforms.uTime.value += clock.getDelta() * timeCoef.value * 4
		zoomStrength.value = timeCoef.value * 0.004

		const da = 0.05
		const tiltX = lerp(point.rotation.x, positionN.y * da, 0.02)
		const tiltY = lerp(point.rotation.y, -positionN.x * da, 0.02)
		point.rotation.set(tiltX, tiltY, 0)
	})
})

const account: IAccount = {
	account: 'admin',
	password: '123456',
}
</script>

<style scoped lang="less">
canvas {
	display: block;
}
a {
	font-family: 'Montserrat', sans-serif;
	font-size: 30px;
	position: absolute;
	top: calc(50% - 25px);
	left: calc(50% - 150px);
	width: 300px;
	height: 50px;
	line-height: 50px;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	border: 1px solid #fff;
	border-radius: 50px;
}

@keyframes toShow {
	from {
		background-color: rgba(255, 255, 255, 0);
	}
	to {
		background-color: rgba(255, 255, 255, 1);
	}
}
.mask-animation {
	animation: toShow 3s forwards ease-in-out;
}
</style>
