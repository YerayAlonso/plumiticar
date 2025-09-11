<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';

	const { goBack } = $props();
</script>

<div class="container mx-auto p-4">
	<div class="mx-auto max-w-4xl">
		<Button variant="outline" class="mb-4 cursor-pointer" onclick={goBack}>
			← Tornar al menú principal
		</Button>

		<Card class="p-12 text-center">
			<div class="mb-8 text-8xl">🚧</div>
			<h1 class="mb-6 text-3xl font-bold text-gray-800">Mode Història</h1>
			<p class="mb-8 text-lg text-gray-600">
				Aquest mode encara està en desenvolupament. Aquí podràs aprendre les taules de multiplicar a
				través d'aventures i històries emocionants!
			</p>
			<div class="mx-auto max-w-md rounded-lg bg-yellow-50 p-6">
				<div class="mb-4 text-4xl">⭐</div>
				<h3 class="mb-2 text-xl font-semibold text-yellow-800">Próximament:</h3>
				<ul class="text-left text-sm text-yellow-700">
					<li class="mb-1">📖 Històries interactives</li>
					<li class="mb-1">🎮 Aventures matemàtiques</li>
					<li class="mb-1">🏆 Sistema de recompenses</li>
					<li class="mb-1">🎯 Missions especials</li>
				</ul>
			</div>
		</Card>
	</div>
</div>
