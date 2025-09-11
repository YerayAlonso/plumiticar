<script lang="ts">
	import { Card } from '$lib/components/ui/card';

	let { modeSelected } = $props();

	function selectMode(mode: 'taules' | 'historia') {
		modeSelected(mode);
	}
</script>

<div class="container mx-auto p-4">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-center text-4xl font-bold text-gray-800">Plumiticar</h1>
		<h2 class="mb-12 text-center text-2xl font-medium text-gray-600">
			Escull el mode de joc que vols jugar:
		</h2>

		<div class="flex flex-col items-center justify-center gap-8 md:flex-row">
			<!-- Mode Taules -->
			<Card class="w-full max-w-sm cursor-pointer transition-transform hover:scale-105">
				<button
					onclick={() => selectMode('taules')}
					class="w-full p-8 text-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					<div class="mb-6 text-6xl">🔢</div>
					<h3 class="mb-4 text-2xl font-bold text-gray-800">Taules</h3>
					<p class="text-gray-600">
						Practica les taules de multiplicar del 1 al 10 en mode normal o aleatori
					</p>
					<div class="mt-6 rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-800">
						<span class="font-medium">Disponible ara</span>
					</div>
				</button>
			</Card>

			<!-- Mode Història -->
			<Card class="w-full max-w-sm opacity-60 transition-transform hover:scale-105">
				<button
					onclick={() => selectMode('historia')}
					class="w-full p-8 text-center focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
				>
					<div class="mb-6 text-6xl">📚</div>
					<h3 class="mb-4 text-2xl font-bold text-gray-800">Història</h3>
					<p class="text-gray-600">
						Aprèn les taules de multiplicar a través d'aventures i històries
					</p>
					<div class="mt-6 rounded-lg bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
						<span class="font-medium">Pròximament</span>
					</div>
				</button>
			</Card>
		</div>

		<div class="mt-12 text-center text-sm text-gray-500">
			Selecciona un mode per començar la teva aventura matemàtica! 🚀
		</div>
	</div>
</div>
