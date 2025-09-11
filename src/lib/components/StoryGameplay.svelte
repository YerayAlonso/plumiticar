<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { type Character } from '$lib/characters';

	const { character, goBack, changeCharacter } = $props<{
		character: Character;
		goBack: () => void;
		changeCharacter: () => void;
	}>();
</script>

<div class="container mx-auto p-4">
	<div class="mx-auto max-w-4xl">
		<!-- Navigation -->
		<div class="mb-6 flex items-center justify-between">
			<Button variant="outline" class="cursor-pointer" onclick={goBack}>
				← Tornar al menú principal
			</Button>
			<Button variant="outline" class="cursor-pointer" onclick={changeCharacter}>
				Canviar personatge
			</Button>
		</div>

		<!-- Character Info -->
		<Card class="mb-6 p-6">
			<div class="flex items-center gap-4">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl text-white {character.color}"
				>
					{character.emoji}
				</div>
				<div>
					<h2 class="text-2xl font-bold text-gray-800">{character.name}</h2>
					<p class="text-gray-600">{character.description}</p>
				</div>
			</div>
		</Card>

		<!-- Story Content -->
		<Card class="p-8 text-center">
			<div class="mb-6 text-6xl">🎮</div>
			<h1 class="mb-4 text-3xl font-bold text-gray-800">L'aventura de {character.name}</h1>

			<div class="mx-auto mb-6 max-w-2xl rounded-lg bg-blue-50 p-6">
				<h3 class="mb-3 text-xl font-semibold text-blue-800">Història del personatge:</h3>
				<p class="text-blue-700">{character.backstory}</p>
			</div>

			<div class="mb-8">
				<h3 class="mb-4 text-xl font-semibold text-gray-800">Les teves habilitats especials:</h3>
				<div class="flex flex-wrap justify-center gap-3">
					{#each character.abilities as ability}
						<div
							class="rounded-full bg-gradient-to-r px-4 py-2 text-sm font-medium text-white {character.color}"
						>
							✨ {ability}
						</div>
					{/each}
				</div>
			</div>

			<div class="rounded-lg bg-yellow-50 p-6">
				<div class="mb-4 text-4xl">🚧</div>
				<h3 class="mb-2 text-xl font-semibold text-yellow-800">Próximament:</h3>
				<p class="mb-4 text-yellow-700">
					L'aventura de {character.name} començarà aviat! Aquí podràs:
				</p>
				<ul class="text-left text-sm text-yellow-700">
					<li class="mb-1">📖 Viure història interactives amb {character.name}</li>
					<li class="mb-1">🎯 Completar missions matemàtiques úniques</li>
					<li class="mb-1">🏆 Desbloquejar noves habilitats i poders</li>
					<li class="mb-1">🗺️ Explorar mons matemàtics fantàstics</li>
					<li class="mb-1">⚔️ Lluitar contra monstres amb el poder dels números</li>
				</ul>
			</div>
		</Card>
	</div>
</div>
