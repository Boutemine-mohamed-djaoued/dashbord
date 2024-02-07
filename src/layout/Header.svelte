<script>
	import appStore from '../stores/nav';
	let showNav;
	appStore.showNav.subscribe((value) => {
		showNav = value;
	});
	const handleClick = () => {
		appStore.showNav.set(!showNav);
	};
</script>

<header class="relative z-[20] my-4 md:my-7 flex items-center">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => {
			handleClick();
		}}
		class="burger-menu mr-5 max-w-7 cursor-pointer xl:hidden"
	>
		<img src="header/burger-menu.png" alt="" />
	</div>
	<div class="logo max-md:max-w-28">
		<img src="header/Logo.svg" alt="" />
	</div>
	<p class="mx-auto text-500 text-bold max-xl:hidden">Welcome Back,Djawad</p>
	<div class="search flex rounded-2xl overflow-clip max-lg:hidden max-xl:ml-auto">
		<div class="icon px-4 py-3 bg-off-black-200">
			<img src="header/search.svg" alt="" />
		</div>
		<input class="bg-off-black-200 text-300" type="text" placeholder="search" />
	</div>
	<div class="notification ml-auto lg:ml-5 mr-5 lg:mr-auto">
		<img src="header/Notifications.svg" alt="" />
	</div>
	<p class="user-name max-md:hidden">Sleep Well</p>
	<div class="profile-image md:ml-5">
		<img src="header/profile-img.svg" alt="" />
	</div>
</header>
