<script>
	import { onMount } from 'svelte';

	let coins = [
		{
			icon: 'chain/Frame 6.svg',
			name: 'Bitcoin',
			amount: '$ 23.69B',
			percentage: '40.2%',
			color: '#FB03F5'
		},
		{
			icon: 'chain/Frame 6 (1).svg',
			name: 'Ethereum',
			amount: '$ 43.09B',
			percentage: '70.2%',
			color: '#5CFF9C'
		},
		{
			icon: 'chain/Frame 6 (2).svg',
			name: 'Shiba',
			amount: '$ 3.52B',
			percentage: '85.2%',
			color: '#FB035C'
		},
		{
			icon: 'chain/Frame 6 (3).svg',
			name: 'Solona',
			amount: '$ 47.9B',
			percentage: '23.2%',
			color: '#BE76FD'
		},
		{
			icon: 'chain/Frame 6 (4).svg',
			name: 'Tether',
			amount: '$ 30.4B',
			percentage: '99.2%',
			color: '#50AF95'
		}
	];
	onMount(() => {
		for (let i = 0; i < 5; i++) {
			let percentage = coins[i].percentage;
			coins[i].percentage = 0;
			let color = coins[i].color;
			coins[i].color = 'transparent';
			setTimeout(() => {
				coins[i].percentage = percentage;
				coins[i].color = color;
			}, 300);
		}
	});
</script>

<div class="relative z-20 bg-opacity-60 text-400 bg-off-black-200 p-5 rounded-2xl">
	<h1 class="font-bold mb-5">Chain Allocation</h1>
	{#each coins as coin}
		<div class="text-[0.9em] font-semibold">
			<div class="amount flex mb-2">
				<img class="mr-3" src={coin.icon} alt="" />
				<p>{coin.name}</p>
				<p class="ml-auto">{coin.amount}</p>
			</div>
			<div class="percentage flex items-center mb-3">
				<div class="bar relative mr-2 bg-off-black-100 w-full h-3 rounded-full">
					<div
						style="width: {coin.percentage}; background-color: {coin.color}; transition: width 1s ease;"
						class="absolute top-0 left-0 h-full rounded-full"
					></div>
				</div>
				<p class="text-[0.8em]">{coin.percentage}</p>
			</div>
		</div>
	{/each}
	<button class="mt-2 py-1 bg-off-black-100 w-full rounded-xl">View All</button>
</div>

<style>
</style>
