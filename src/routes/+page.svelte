<script>
	import Chain from './Chain.svelte';
	import Sidenav from '../layout/Sidenav.svelte';
	import Community from './community.svelte';
	import Board from './board.svelte';
	import Tokens from './tokens.svelte';
</script>

<div class="main lg:flex">
	<Sidenav></Sidenav>
	<div class="flex-1">
		<Board></Board>
		<Tokens></Tokens>
	</div>
	<div class="w-full lg:w-[17.5rem]">
		<Chain></Chain>
		<Community></Community>
	</div>
</div>

<style>
	.main::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-image: url('/board/Group 47.png');
		/* background-color: red; */

		background-repeat: no-repeat;
		z-index: 10;
	}
</style>
