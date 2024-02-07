<script>
	import '../app.css';
	import Header from '../layout/Header.svelte';
</script>

<div class="hello grid-system">
	<Header></Header>
	<slot />
</div>

<style>
	.hello::before {
		content: '';
		position: absolute;
		right: 0rem;
		top: 0;
		width: 20rem;
		height: 50rem;
		background-image: url('board/Group 173.png');
		background-size: cover;
		background-repeat: no-repeat;
		z-index: 10;
		opacity: 0.5;
	}
	@media (width < 1024px) {
		.hello::before {
			top: 40rem;
			left: 0;
			rotate: 180deg;
		}
	}
</style>
