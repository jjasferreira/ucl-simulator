<script>
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import { base } from '$app/paths';
</script>

<header class="flex justify-between h-12 bg-gray-600">
	<div class="w-12">
		<a class="flex justify-center items-center h-full" href="https://kit.svelte.dev">
			<img class="h-8 w-8" src={logo} alt="Logo" />
		</a>
	</div>

	<nav class="flex justify-center items-center bg-gray-600 text-white">
		<a class="p-3 hover:bg-gray-300 hover:text-red-600" href="{base}/">TODO</a>
		<a class="p-3 hover:bg-gray-300 hover:text-red-600" href="{base}/about">About</a>
		<a class="p-3 hover:bg-gray-300 hover:text-red-600" href="{base}/simulator">Simulator</a>
	</nav>

	<div class="w-12">
		<a class="flex justify-center items-center h-full" href="https://github.com/sveltejs/kit">
			<img class="h-8 w-8" src={github} alt="GitHub" />
		</a>
	</div>
</header>
