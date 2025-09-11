<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { type Character } from '$lib/characters';
	import { getStoryByCharacterId } from '$lib/stories';
	import StoryMultiplicationGame from './StoryMultiplicationGame.svelte';

	const { character, goBack, changeCharacter } = $props<{
		character: Character;
		goBack: () => void;
		changeCharacter: () => void;
	}>();

	let currentChapter = $state(1);
	let gameMode: 'story' | 'game' = $state('story');
	let completedChapters: number[] = $state([]);

	const story = getStoryByCharacterId(character.id);

	if (!story) {
		throw new Error(`No story found for character ${character.id}`);
	}

	const currentChapterData = $derived(story.chapters.find((ch) => ch.id === currentChapter));

	function startChapter() {
		gameMode = 'game';
	}

	function handleTableCompleted() {
		completedChapters = [...completedChapters, currentChapter];

		// Wait a bit before returning to story mode
		setTimeout(() => {
			gameMode = 'story';

			// Check if this was the final chapter
			if (currentChapter === 10) {
				// Story completed!
				return;
			}

			// Advance to next chapter
			currentChapter++;
		}, 3000);
	}

	function resetStory() {
		currentChapter = 1;
		completedChapters = [];
		gameMode = 'story';
	}

	function selectChapter(chapterId: number) {
		if (chapterId <= Math.max(...completedChapters) + 1) {
			currentChapter = chapterId;
			gameMode = 'story';
		}
	}
</script>

<div class="container mx-auto p-4">
	<div class="mx-auto max-w-4xl">
		<!-- Navigation -->
		<div class="mb-6 flex items-center justify-between">
			<Button variant="outline" class="cursor-pointer" onclick={goBack}>
				← Tornar al menú principal
			</Button>
			<div class="flex gap-2">
				<Button variant="outline" class="cursor-pointer" onclick={changeCharacter}>
					Canviar personatge
				</Button>
				{#if completedChapters.length > 0}
					<Button variant="outline" class="cursor-pointer" onclick={resetStory}>
						Reiniciar història
					</Button>
				{/if}
			</div>
		</div>

		<!-- Character Info Header -->
		<Card class="mb-6 p-6">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl text-white {character.color}"
					>
						{character.emoji}
					</div>
					<div>
						<h2 class="text-2xl font-bold">{character.name}</h2>
						<p class="">{story.title}</p>
					</div>
				</div>
				<div class="text-right">
					<p class="text-sm">Capítol</p>
					<p class="text-2xl font-bold">{currentChapter}/10</p>
				</div>
			</div>

			<!-- Progress bar -->
			<div class="mt-4">
				<div class="mb-2 flex justify-between text-sm">
					<span>Progrés de la història</span>
					<span>{completedChapters.length}/10 capítols completats</span>
				</div>
				<div class="h-3 w-full rounded-full bg-gray-200">
					<div
						class="h-3 rounded-full bg-gradient-to-r transition-all duration-500 {character.color}"
						style="width: {(completedChapters.length / 10) * 100}%"
					></div>
				</div>
			</div>
		</Card>

		{#if gameMode === 'game' && currentChapterData}
			<!-- Multiplication Game Mode -->
			<StoryMultiplicationGame
				{character}
				chapter={currentChapterData}
				tableCompleted={handleTableCompleted}
			/>
		{:else if currentChapterData}
			<!-- Story Mode -->
			{#if currentChapter === 11 || (currentChapter === 10 && completedChapters.includes(10))}
				<!-- Story Completed -->
				<Card class="p-8 text-center">
					<div class="mb-6 text-8xl">🎉</div>
					<h1 class="mb-4 text-3xl font-bold">Història Completada!</h1>
					<p class="mb-6 text-lg">
						Felicitats! Has completat tota l'aventura de {character.name}!
					</p>

					<div
						class="mx-auto mb-6 max-w-md rounded-lg bg-gradient-to-r p-6 text-white {character.color}"
					>
						<p class="text-lg font-medium">
							Has dominat totes les taules de multiplicar del 1 al 10!
						</p>
					</div>

					<div class="flex flex-wrap justify-center gap-3">
						<Button onclick={resetStory} class="cursor-pointer">Jugar de nou</Button>
						<Button variant="outline" onclick={changeCharacter} class="cursor-pointer">
							Provar altre personatge
						</Button>
						<Button variant="outline" onclick={goBack} class="cursor-pointer">
							Menú principal
						</Button>
					</div>
				</Card>
			{:else}
				<!-- Current Chapter Display -->
				<Card class="mb-6 p-6">
					<div class="mb-4 text-center">
						<h1 class="mb-2 text-2xl font-bold">{currentChapterData.title}</h1>
						<div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
							{currentChapterData.background}
						</div>
					</div>

					<div class="mx-auto mb-6 rounded-lg bg-blue-50 p-6">
						<p class="text-blue-800">{currentChapterData.description}</p>
					</div>

					<div class="text-center">
						{#if completedChapters.includes(currentChapter)}
							<!-- Chapter already completed -->
							<div class="mb-4 rounded-lg bg-green-50 p-4">
								<div class="mb-2 text-2xl">✅</div>
								<p class="font-medium text-green-800">Capítol completat!</p>
								<p class="text-sm text-green-600">{currentChapterData.reward}</p>
							</div>

							{#if currentChapter < 10}
								<Button onclick={() => selectChapter(currentChapter + 1)} class="cursor-pointer">
									Següent capítol →
								</Button>
							{/if}
						{:else if currentChapter <= Math.max(...completedChapters, 0) + 1}
							<!-- Available to play -->
							<div class="mb-6 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
								<div class="mb-2 text-2xl">⚔️</div>
								<p class="mb-2 font-medium text-yellow-800">Repte matemàtic:</p>
								<p class="text-yellow-700">{currentChapterData.challenge}</p>
							</div>

							<Button
								onclick={startChapter}
								size="lg"
								class="cursor-pointer bg-gradient-to-r text-white {character.color}"
							>
								Començar repte!
							</Button>
						{:else}
							<!-- Locked chapter -->
							<div class="mb-4 rounded-lg bg-gray-50 p-4">
								<div class="mb-2 text-2xl">🔒</div>
								<p class="font-medium text-gray-600">Capítol blocat</p>
								<p class="text-sm text-gray-500">Completa els capítols anteriors primer</p>
							</div>
						{/if}
					</div>
				</Card>

				<!-- Chapter Selection -->
				<Card class="p-6">
					<h3 class="mb-4 text-lg font-semibold">Selecciona capítol</h3>
					<div class="grid grid-cols-5 gap-3 md:grid-cols-10">
						{#each Array(10) as _, i}
							{@const chapterId = i + 1}
							{@const isCompleted = completedChapters.includes(chapterId)}
							{@const isAvailable = chapterId <= Math.max(...completedChapters, 0) + 1}
							{@const isCurrent = chapterId === currentChapter}

							<button
								onclick={() => selectChapter(chapterId)}
								disabled={!isAvailable}
								class="relative h-12 w-12 rounded-lg font-bold transition-all hover:scale-105 {isCurrent
									? `bg-gradient-to-r text-white ${character.color} ring-2 ring-blue-500 ring-offset-2`
									: isCompleted
										? 'bg-green-100 text-green-800 hover:bg-green-200'
										: isAvailable
											? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
											: 'cursor-not-allowed bg-gray-100 text-gray-400'}"
							>
								{chapterId}
								{#if isCompleted}
									<div class="absolute -top-1 -right-1 text-xs">✅</div>
								{:else if !isAvailable}
									<div class="absolute -top-1 -right-1 text-xs">🔒</div>
								{/if}
							</button>
						{/each}
					</div>
				</Card>
			{/if}
		{/if}
	</div>
</div>
