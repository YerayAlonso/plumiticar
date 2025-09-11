<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { type Character } from '$lib/characters';
	import { type StoryChapter } from '$lib/stories';
	import { onDestroy } from 'svelte';
	import confetti from 'canvas-confetti';

	const { character, chapter, tableCompleted } = $props<{
		character: Character;
		chapter: StoryChapter;
		tableCompleted: () => void;
	}>();

	let currentMultiplier = $state(1);
	let userInput = $state('');
	let completedOperations: Array<{ multiplier: number; result: number }> = $state([]);
	let isCorrect: boolean | null = $state(null);
	let inputRef: HTMLInputElement | null = $state(null);
	let wrongAttempts = $state(0);
	let startTime: number | null = $state(null);
	let elapsedTime = $state(0);
	let timerInterval: number | null = $state(null);

	const MAX_ATTEMPTS = 5;
	const requiredTable = chapter.requiredTable;

	function ref(node: HTMLInputElement) {
		inputRef = node;
		return {
			destroy() {
				inputRef = null;
			}
		};
	}

	function startTimer() {
		startTime = Date.now();
		elapsedTime = 0;
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = window.setInterval(() => {
			elapsedTime = Math.floor((Date.now() - (startTime || 0)) / 1000);
		}, 1000);
	}

	function stopTimer() {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}

	function formatTime(seconds: number): string {
		if (seconds < 60) {
			return `${seconds} segons`;
		}
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins} min ${secs < 10 ? '0' : ''}${secs} seg`;
	}

	function Heart({ filled = true }: { filled: boolean }) {
		const color = filled ? 'text-red-500' : 'text-gray-300';
		return `
			<svg class="h-6 w-6 ${color}" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
			</svg>
		`;
	}

	function startGame() {
		currentMultiplier = 1;
		completedOperations = [];
		wrongAttempts = 0;
		isCorrect = null;
		startTimer();

		setTimeout(() => {
			if (inputRef) {
				inputRef.focus();
			}
		}, 100);
	}

	function checkAnswer() {
		const correctAnswer = requiredTable * currentMultiplier;
		const userAnswer = parseInt(userInput);

		isCorrect = userAnswer === correctAnswer;

		if (isCorrect) {
			completedOperations = [
				...completedOperations,
				{ multiplier: currentMultiplier, result: correctAnswer }
			];

			if (currentMultiplier === 10) {
				stopTimer();
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 }
				});
				// Table completed!
				setTimeout(() => {
					tableCompleted();
				}, 2000);
			} else {
				currentMultiplier++;
			}
			userInput = '';
		} else {
			wrongAttempts++;
			if (wrongAttempts >= MAX_ATTEMPTS) {
				// Game over - restart
				startGame();
			}
		}

		inputRef?.focus();
	}

	// Start the game when component mounts
	startGame();

	onDestroy(() => {
		stopTimer();
	});
</script>

<div class="mx-auto">
	<Card class="p-6">
		<!-- Header with character and chapter info -->
		<div class="mb-6 text-center">
			<div class="mb-3 flex items-center justify-center gap-3">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-xl text-white {character.color}"
				>
					{character.emoji}
				</div>
				<div>
					<h3 class="font-bold">{chapter.title}</h3>
					<p class="text-sm">Taula del {requiredTable}</p>
				</div>
			</div>

			<!-- Challenge description -->
			<div class="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
				{chapter.challenge}
			</div>
		</div>

		<!-- Hearts (lives) -->
		<div class="mb-4 flex justify-center gap-1">
			{#each Array(MAX_ATTEMPTS) as _, i}
				{@html Heart({ filled: i >= wrongAttempts })}
			{/each}
		</div>

		<!-- Completed operations -->
		{#if completedOperations.length > 0}
			<div class="mx-auto mb-6 grid max-w-2xl grid-cols-5 gap-2">
				{#each completedOperations as op}
					<div
						class="animate-[bounce_0.5s_ease-in-out] rounded-lg bg-gradient-to-br px-3 py-2 text-center text-sm font-medium text-white shadow-lg {character.color}"
					>
						{requiredTable} × {op.multiplier} = {op.result}
					</div>
				{/each}
			</div>
		{/if}

		{#if wrongAttempts >= MAX_ATTEMPTS}
			<div class="text-center">
				<div class="mb-4 text-4xl">💀</div>
				<p class="mb-4 text-lg font-bold text-red-600">Has perdut! Torna-ho a intentar!</p>
				<Button onclick={startGame} class="cursor-pointer">Reintentar</Button>
			</div>
		{:else if completedOperations.length === 10}
			<div class="text-center">
				<div class="mb-4 text-6xl">🎉</div>
				<p class="mb-2 text-2xl font-bold text-green-600">Felicitats!</p>
				<p class="mb-4">
					Has completat la taula del {requiredTable} en {formatTime(elapsedTime)}
				</p>
				<div class="rounded-lg bg-green-50 p-4 text-green-800">
					<p class="font-medium">{chapter.reward}</p>
				</div>
			</div>
		{:else}
			<!-- Current question -->
			<div
				class="mb-6 rounded-2xl bg-gradient-to-br p-6 text-center text-white shadow-lg {character.color}"
			>
				<div class="mb-4 text-3xl font-bold">
					{requiredTable} × {currentMultiplier} = ?
				</div>
				<div class="flex justify-center gap-3">
					<input
						type="number"
						bind:value={userInput}
						use:ref
						placeholder="Resultat?"
						class="h-12 w-32 rounded-xl border-2 border-white/20 bg-white/10 px-4 text-xl font-medium text-white placeholder:text-white/70 focus:border-white focus:ring-0 focus:outline-none"
						onkeydown={(e) => e.key === 'Enter' && checkAnswer()}
					/>
					<Button
						onclick={checkAnswer}
						class="h-12 cursor-pointer rounded-xl bg-white/20 px-6 text-white hover:bg-white/30"
					>
						Comprovar
					</Button>
				</div>
			</div>

			{#if isCorrect === false}
				<div class="text-center">
					<p class="text-lg font-medium text-red-500">
						{#if MAX_ATTEMPTS - wrongAttempts > 1}
							Ups! Et queden {MAX_ATTEMPTS - wrongAttempts} intents 🤔
						{:else}
							Compte! Últim intent! 😰
						{/if}
					</p>
				</div>
			{/if}
		{/if}

		<!-- Progress indicator -->
		<div class="mt-6">
			<div class="mb-2 flex justify-between text-sm text-gray-600">
				<span>Progrés</span>
				<span>{completedOperations.length}/10</span>
			</div>
			<div class="h-2 w-full rounded-full bg-gray-200">
				<div
					class="h-2 rounded-full bg-gradient-to-r transition-all duration-300 {character.color}"
					style="width: {(completedOperations.length / 10) * 100}%"
				></div>
			</div>
		</div>
	</Card>
</div>
