<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen font-champions-regular bg-blue-950 text-blue-50 overflow-y-hidden">

	<Header />

	<h1 class="px-3 text-center font-champions-display">UEFA Champions League Simulator</h1>

	<main class="flex-grow overflow-y-hidden">
		{@render children?.()}
	</main>

	<Footer />
</div>