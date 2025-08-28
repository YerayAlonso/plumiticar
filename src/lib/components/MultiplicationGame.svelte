<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import confetti from 'canvas-confetti';
	import { onMount, onDestroy } from 'svelte';

	// Añadimos la animación de bounce a Tailwind
	const bounce = `
		@keyframes bounce {
			0%, 100% { transform: translateY(0); }
			50% { transform: translateY(-10px); }
		}
	`;

	// Añadimos el estilo al documento
	if (typeof document !== 'undefined') {
		const style = document.createElement('style');
		style.textContent = bounce;
		document.head.appendChild(style);
	}

	let selectedNumber: number | null = null;
	let currentMultiplier = 1;
	let userInput = '';
	let completedOperations: Array<{ multiplier: number; result: number }> = [];
	let isCorrect: boolean | null = null;
	let inputRef: HTMLInputElement | null = null;
	let wrongAttempts = 0;
	const MAX_ATTEMPTS = 5;

	// Variables para el temporizador
	let startTime: number | null = null;
	let elapsedTime = 0;
	let timerInterval: number | null = null;

	function Heart({ filled = true }: { filled: boolean }) {
		const color = filled ? 'text-red-500' : 'text-gray-300';
		return `
			<svg class="h-8 w-8 ${color}" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
			</svg>
		`;
	}

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

	onDestroy(() => {
		stopTimer();
	});

	function formatTime(seconds: number): string {
		if (seconds < 60) {
			return `${seconds} segons`;
		}

		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;

		if (mins < 60) {
			return `${mins} minuts i ${secs < 10 ? '0' : ''}${secs} segons`;
		}

		const hours = Math.floor(mins / 60);
		const remainingMins = mins % 60;
		return `${hours} hores, ${remainingMins} minuts i ${secs < 10 ? '0' : ''}${secs} segons`;
	}

	function selectNumber(num: number) {
		selectedNumber = num;
		currentMultiplier = 1;
		completedOperations = [];
		userInput = '';
		isCorrect = null;
		wrongAttempts = 0;
		startTimer();
		setTimeout(() => {
			inputRef?.focus();
		}, 0);
	}

	function checkAnswer() {
		if (!selectedNumber) return;

		const correctAnswer = selectedNumber * currentMultiplier;
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
			} else {
				currentMultiplier++;
			}
			userInput = '';
		} else {
			wrongAttempts++;
			if (wrongAttempts >= MAX_ATTEMPTS) {
				// Game over - reiniciar la tabla actual
				currentMultiplier = 1;
				completedOperations = [];
			}
		}

		inputRef?.focus();
	}

	function getColorIndex(i: number) {
		return i === 0
			? 'from-pink-400 to-pink-600'
			: i === 1
				? 'from-purple-400 to-purple-600'
				: i === 2
					? 'from-blue-400 to-blue-600'
					: i === 3
						? 'from-green-400 to-green-600'
						: i === 4
							? 'from-yellow-400 to-yellow-600'
							: i === 5
								? 'from-orange-400 to-orange-600'
								: i === 6
									? 'from-red-400 to-red-600'
									: i === 7
										? 'from-teal-400 to-teal-600'
										: i === 8
											? 'from-cyan-400 to-cyan-600'
											: 'from-indigo-400 to-indigo-600';
	}
</script>

<div class="container mx-auto p-4">
	{#if !selectedNumber}
		<h1 class="mt-8 text-center text-4xl font-semibold">
			Practica les Taules de <s>Plumiticar</s> Multiplicar!
		</h1>
		<h2 class="my-10 text-center text-xl">Escull un nombre per practicar la seva taula:</h2>
		<div class="grid grid-cols-2 gap-6 md:grid-cols-5">
			{#each Array(10) as _, i}
				<button
					class=" group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition-transform hover:scale-105 active:scale-95 {getColorIndex(
						i
					)}"
					onclick={() => selectNumber(i + 1)}
				>
					<span
						class="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"
					></span>
					<span class="text-5xl font-bold text-white">{i + 1}</span>
				</button>
			{/each}
		</div>
	{:else}
		<div class="mx-auto max-w-2xl">
			<Button variant="outline" class="mb-4 cursor-pointer" onclick={() => (selectedNumber = null)}>
				← Escollir una altra taula
			</Button>

			<Card class="p-6">
				<div class="relative flex justify-between">
					<h2 class="mb-4 text-2xl font-bold">Taula del {selectedNumber}</h2>

					<div class="flex items-center gap-1">
						{#each Array(MAX_ATTEMPTS) as _, i}
							{@html Heart({ filled: i >= wrongAttempts })}
						{/each}
					</div>
				</div>

				{#if completedOperations.length > 0}
					<div class="mx-auto flex flex-col gap-2">
						{#each completedOperations as op}
							<div
								class="flex animate-[bounce_0.5s_ease-in-out] items-center justify-center rounded-xl bg-gradient-to-br px-3 py-2 text-center text-white shadow-lg transition-transform hover:scale-105 {getColorIndex(
									op.multiplier
								)}"
							>
								<div class="text-lg font-medium cursor-default">
									{selectedNumber} × {op.multiplier} =
									<span class="font-bold">
										{op.result}
									</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				{#if wrongAttempts >= MAX_ATTEMPTS}
					<div class="mt-6 text-center text-2xl font-bold text-red-600">
						<div>💀 Game Over 💀</div>
						<Button class="mt-4 cursor-pointer" onclick={() => selectedNumber && selectNumber(selectedNumber)}
							>Intentar un altre cop</Button
						>
					</div>
				{:else if completedOperations.length === 10}
					<div class="text-center flex flex-col gap-1">
						<p class="text-2xl font-bold text-green-600">Felicitats! 🎉</p>
						<p>Ho has aconseguit en {formatTime(elapsedTime)} 💪🏻</p>
					</div>
				{:else}
					<div class="space-y-6">
						<div
							class="relative mx-auto max-w-md rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 p-6 text-center text-white shadow-lg"
						>
							<div class="text-3xl font-bold">
								{selectedNumber} × {currentMultiplier} = ?
							</div>
							<div class="mt-4 flex justify-center gap-4">
								<input
									type="number"
									name="answer"
									bind:value={userInput}
									use:ref
									placeholder="Resultat?"
									class="h-12 w-44 rounded-xl border-2 border-white/20 bg-white/10 px-4 text-xl font-medium text-white placeholder:text-white/70 focus:border-white focus:ring-0 focus:outline-none"
									onkeydown={(e) => e.key === 'Enter' && checkAnswer()}
								/>
								<Button
									onclick={checkAnswer}
									class="cursor-pointer h-12 rounded-xl bg-white/20 px-6 text-lg font-medium text-white hover:bg-white/30"
								>
									Comprovar!
								</Button>
							</div>
						</div>
						{#if isCorrect === false}
							<div class="text-center">
								<p class="text-xl font-medium text-red-500">
									{#if MAX_ATTEMPTS - wrongAttempts > 1}
										Ups! Et queden {MAX_ATTEMPTS - wrongAttempts} intents 🤔
									{:else}
										Compte! Últim intento! 😰
									{/if}
								</p>
							</div>
						{/if}
					</div>
				{/if}
			</Card>
		</div>
	{/if}
</div>
