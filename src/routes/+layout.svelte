<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen font-champions-regular bg-blue-950 text-blue-50">

	<Header />

	<h1 class="px-3 font-champions-display">UEFA Champions League Simulator</h1>

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>