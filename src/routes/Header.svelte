<script>
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header class="flex justify-between h-12 bg-gray-600">
	<div class="w-12">
		<a class="flex justify-center items-center h-full" href="https://kit.svelte.dev">
			<img class="h-8 w-8" src={logo} alt="Logo" />
		</a>
	</div>

	<div class="w-12">
		<a class="flex justify-center items-center h-full" href="https://github.com/jjasferreira/ucl-simulator">
			<img class="h-8 w-8" src={github} alt="GitHub" />
		</a>
	</div>
</header>
