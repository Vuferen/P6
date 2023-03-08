<script>
	import {dndzone} from "svelte-dnd-action";

	export let items = [];
	export let finalizeCallback;

	function handleDndConsider(e) {
    	items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
		finalizeCallback(items);
    }
</script>

<div style="display: flex; background: rgba(0,0,0,0.1); min-height: 39px; padding: 10px;" use:dndzone="{{items: items}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
	{#each items as item(item.id)}
	<!-- <div style="padding: 5px; margin: 5px; background: rgba(0,0,0,0.1); border: 1px solid black; border-radius: 10px;">{item.name}</div> -->
		<img src={item.src}>
	{/each}
</div>

<style>
img {
  display: block;
  max-width:230px;
  max-height:95px;
  width: auto;
  height: auto;
  margin: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.20);
}
</style>