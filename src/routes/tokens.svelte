<script>
	let tokens = [
		{
			icon: 'chain/Frame 6.svg',
			name: 'Bitcoin',
			balence: '0.0432',
			value: '$2,343'
		},
		{
			icon: 'chain/Frame 6 (1).svg',
			name: 'Ethereum',
			balence: '32.874',
			value: '$5,878'
		}
	];
</script>

<div class="bg-off-black-200 relative bg-opacity-60 z-20 p-5 lg:mx-5 my-5 rounded-2xl">
	<h2 class="text-400 font-semibold mb-5">Tokens</h2>
	<div class="flex justify-between text-[#717171]">
    <div class="md:flex-1 text-start">Name</div>
    <div class="md:flex-1 text-start max-md:hidden">Balence</div>
    <div class="md:flex-1 text-start">Total Value</div>
    <div class="md:flex-1 text-start">Trade</div>
	</div>
	{#each tokens as token}
		<div class="flex mt-5 items-center justify-between font-semibold">
      <div class="flex md:flex-1 text-start items-center">
        <img class="mr-3" src={token.icon} alt="" />
        <span>{token.name}</span>
      </div>
			<span class="md:flex-1 text-start max-md:hidden">{token.balence}</span>
			<span class="md:flex-1 text-start">{token.value}</span>
      <div class="md:flex-1">
        <button class="bg-off-black-100 py-1 px-5 rounded-md font-bold">Trade</button>
      </div>
		</div>
	{/each}
</div>
