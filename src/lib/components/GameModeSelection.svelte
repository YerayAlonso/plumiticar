<script lang="ts">
	import { Card } from '$lib/components/ui/card';

	let { modeSelected } = $props();

	function selectMode(mode: 'taules' | 'historia') {
		modeSelected(mode);
	}
</script>

<div class="container mx-auto p-4">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-12 text-center text-2xl font-medium">Escull el mode de joc que vols jugar:</h2>

		<div class="flex flex-col items-center justify-center gap-8 md:flex-row">
			<!-- Mode Taules -->
			<Card class="w-full max-w-sm cursor-pointer transition-transform hover:scale-105">
				<button onclick={() => selectMode('taules')} class="w-full cursor-pointer p-8 text-center">
					<div class="mb-6 text-6xl">🔢</div>
					<h3 class="mb-4 text-2xl font-bold">Taules</h3>
					<p>Practica les taules de multiplicar del 1 al 10 en mode normal o aleatori</p>
				</button>
			</Card>

			<!-- Mode Història -->
			<Card class="w-full max-w-sm cursor-pointer transition-transform hover:scale-105">
				<button
					onclick={() => selectMode('historia')}
					class="w-full cursor-pointer p-8 text-center"
				>
					<div class="mb-6 text-6xl">📚</div>
					<h3 class="mb-4 text-2xl font-bold">Història</h3>
					<p>Aprèn les taules de multiplicar a través d'aventures i històries</p>
				</button>
			</Card>
		</div>

		<div class="mt-12 text-center text-sm">
			Selecciona un mode per començar la teva aventura matemàtica! 🚀
		</div>
	</div>
</div>
