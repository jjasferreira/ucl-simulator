<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen font-champions-regular bg-blue-950 text-blue-50">
	<Header />

	<main class="flex-grow p-12">
		<slot />
	</main>

	<Footer />
</div>