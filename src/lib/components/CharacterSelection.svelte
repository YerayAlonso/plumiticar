<script lang="ts">
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { characters, type Character } from '$lib/characters';

	const { characterSelected, goBack } = $props<{
		characterSelected: (character: Character) => void;
		goBack: () => void;
	}>();

	function selectCharacter(character: Character) {
		characterSelected(character);
	}
</script>

<div class="container mx-auto p-4">
	<div class="mx-auto max-w-6xl">
		<Button variant="outline" class="mb-6 cursor-pointer" onclick={goBack}>
			← Tornar al menú principal
		</Button>

		<div class="mb-8 text-center">
			<h1 class="mb-4 text-4xl font-bold">Escull el teu personatge</h1>
			<p class="text-lg">
				Cada personatge té habilitats úniques que t'ajudaran en la teva aventura matemàtica
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each characters as character}
				<Card class="transition-all duration-200 hover:scale-105 hover:shadow-xl">
					<button
						onclick={() => selectCharacter(character)}
						class="flex h-full w-full cursor-pointer flex-col justify-between text-center"
					>
						<CardContent>
							<!-- Character Avatar -->
							<div
								class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-4xl text-white shadow-lg {character.color}"
							>
								{character.emoji}
							</div>

							<!-- Character Name -->
							<h3 class="mb-2 text-xl font-bold">{character.name}</h3>

							<!-- Description -->
							<p class="mb-4 text-sm">{character.description}</p>
						</CardContent>
						<CardFooter class="flex flex-col items-center">
							<!-- Abilities -->
							<div class="mb-4">
								<h4 class="mb-2 text-sm font-semibold">Habilitats:</h4>
								<div class="space-y-1">
									{#each character.abilities as ability}
										<div class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
											{ability}
										</div>
									{/each}
								</div>
							</div>

							<!-- Select Button -->
							<div
								class="mt-4 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 {character.color}"
							>
								Escollir {character.name}
							</div>
						</CardFooter>
					</button>
				</Card>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<p class="text-sm">
				💡 Cada personatge té una història única i habilitats especials que descobriràs durant
				l'aventura!
			</p>
		</div>
	</div>
</div>
