<script>
	import appStore from '../stores/nav';
	let options = [
		{ icon: 'sidenav/dasboard.svg', content: 'Dashboard' },
		{ icon: 'sidenav/trade.svg', content: 'Trade' },
		{ icon: 'sidenav/donate.svg', content: 'Deposits' },
		{ icon: 'sidenav/protocols.svg', content: 'Protocols' },
		{ icon: 'sidenav/setting.svg', content: 'settings' },
		{ icon: 'sidenav/user.png', content: 'Profile' },
		{ icon: 'sidenav/logout-1 1.svg', content: 'Log out' }
	];
	let active = 'Dashboard';
	const handleClick = (content) => {
		active = content;
	};
	let showNav;
	appStore.showNav.subscribe((value) => {
		showNav = value;
	});
</script>

<nav class:out={!showNav} class="relative z-30 max-xl:absolute max-xl:p-5 max-xl:rounded-2xl flex flex-col max-xl:bg-black">
	{#each options as option}
		<button
			class:mt-auto={option.content === 'Log out'}
			class:mb-8={option.content === 'Log out'}
			class:active={active == option.content}
			on:click={() => {
				handleClick(option.content);
			}}
			class="flex text-400 items-center mb-5 py-3 px-5 w-56 rounded-2xl"
		>
			<img class="mr-5" src={option.icon} alt="" />
			<p>{option.content}</p>
		</button>
	{/each}
</nav>

<style>
	.active {
		background-image: linear-gradient(135deg, #1f8ebe, #440495, #440495, #b102cd);
	}
	nav {
		transition: transform 1s ease;
	}
	@media ( min-width : 768px){
		nav {
		height: calc(100vh - 6rem);
	}
	}
	.out {
		transform: translateX(-120%);
	}
	@media (min-width: 1280px) {
		.out {
			transform: translateX(0%);
		}
	}
</style>
