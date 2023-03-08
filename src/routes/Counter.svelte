<script lang="js">
	// import { io } from "$lib/realtime";
	import { spring } from 'svelte/motion';
	import { onMount } from "svelte";
	import DragList from '$lib/DragList.svelte';
	// import { io } from '$lib/webSocketConnection.js';
	import { io } from 'socket.io-client'
	const socket = io();


	import fuel from "$lib/images/fuel.png"
	import water from "$lib/images/water.png"
	import elnet from "$lib/images/elnet.png"
	import turbine from "$lib/images/turbine.png"
	import generator from "$lib/images/generator.png"
	import home from "$lib/images/home.png"

	// import {dndzone} from "svelte-dnd-action";
    let myItems = [
        {id: 1, name: "item 1", src: home},
    ];

	let myItems2 = [
		{id: 2, name: "item 2", src: elnet},
        {id: 3, name: "item 3", src: generator},
        {id: 4, name: "item 4", src: turbine},
        {id: 5, name: "item 5", src: water},
        {id: 6, name: "item 6", src: fuel},
    ];


	let count = 0;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	onMount(() => {
        socket.on("message", message => { // Listen to the message event
            count = message.count;
        })
		socket.on("items1", items => {
			myItems = items;
			console.log("Item1-client")
		})
		socket.on("items2", items => {
			myItems2 = items;
		})
    })

	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	function send_count(){
		const message = count;
        socket.emit("message", message) // Send the message
	}

	/**
   * @param {any} items
   */
	function send_items1(items) {
		socket.emit("items1", items)
	}
	function send_items2(items) {
		socket.emit("items2", items)
	}

</script>
<div>

	<DragList items={myItems} finalizeCallback={send_items1}></DragList>
	<br>
	<br>
	<DragList items={myItems2} finalizeCallback={send_items2}></DragList>
	
</div>

<div class="counter">
	<button on:click={() => {(count -= 1); send_count()}} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5" />
		</svg>
	</button>

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>

	<button on:click={() => {(count += 1); send_count()}} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
