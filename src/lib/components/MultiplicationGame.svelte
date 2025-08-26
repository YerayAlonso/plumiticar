<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import confetti from 'canvas-confetti';

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
	const MAX_ATTEMPTS = 7;

	function getHangmanPart(part: number): string {
		switch (part) {
			case 0: // Base
				return 'M10 140 L140 140';
			case 1: // Poste vertical
				return 'M30 140 L30 10';
			case 2: // Poste horizontal
				return 'M30 10 L100 10';
			case 3: // Cuerda
				return 'M100 10 L100 30';
			case 4: // Cabeza
				return 'M85 45 A15 15 0 1 0 115 45 A15 15 0 1 0 85 45';
			case 5: // Cuerpo y brazos
				return 'M100 60 L100 100 M100 75 L70 85 M100 75 L130 85';
			case 6: // Piernas
				return 'M100 100 L70 130 M100 100 L130 130';
			default:
				return '';
		}
	}

	function ref(node: HTMLInputElement) {
		inputRef = node;
		return {
			destroy() {
				inputRef = null;
			}
		};
	}

	function selectNumber(num: number) {
		selectedNumber = num;
		currentMultiplier = 1;
		completedOperations = [];
		userInput = '';
		isCorrect = null;
		wrongAttempts = 0;
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
</script>

<div class="container mx-auto p-4">
	{#if !selectedNumber}
		<h1 class="mt-8 text-center text-2xl font-semibold">
			Practica les Taules de <s>Plumiticar</s> Multiplicar!
		</h1>
		<h2 class="my-10 text-center text-xl">Escull un nombre per practicar la seva taula:</h2>
		<div class="grid grid-cols-2 gap-6 md:grid-cols-5">
			{#each Array(10) as _, i}
				<button
					class="group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition-transform hover:scale-105 active:scale-95 {i ===
					0
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
														: 'from-indigo-400 to-indigo-600'}"
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

					{#if wrongAttempts > 0}
						<div class="absolute top-1 right-1 h-[150px] w-[150px]">
							<svg width="150" height="150" viewBox="0 0 150 150">
								{#each Array(wrongAttempts) as _, i}
									<path
										d={getHangmanPart(i)}
										class="stroke-foreground"
										fill="none"
										stroke-width="2"
									/>
								{/each}
							</svg>
						</div>
					{/if}
				</div>

				{#if completedOperations.length > 0}
					<div class="mx-auto mb-6 flex flex-col gap-2">
						{#each completedOperations as op}
							<div
								class="flex animate-[bounce_0.5s_ease-in-out] items-center justify-center rounded-xl bg-gradient-to-br p-3 text-center text-white shadow-lg transition-transform hover:scale-105 {op.multiplier ===
								1
									? 'from-pink-400 to-pink-600'
									: op.multiplier === 2
										? 'from-purple-400 to-purple-600'
										: op.multiplier === 3
											? 'from-blue-400 to-blue-600'
											: op.multiplier === 4
												? 'from-green-400 to-green-600'
												: op.multiplier === 5
													? 'from-yellow-400 to-yellow-600'
													: op.multiplier === 6
														? 'from-orange-400 to-orange-600'
														: op.multiplier === 7
															? 'from-red-400 to-red-600'
															: op.multiplier === 8
																? 'from-teal-400 to-teal-600'
																: op.multiplier === 9
																	? 'from-cyan-400 to-cyan-600'
																	: 'from-indigo-400 to-indigo-600'}"
							>
								<div class="text-lg font-medium">
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
						<div>Game Over!</div>
						<Button class="mt-4" onclick={() => selectedNumber && selectNumber(selectedNumber)}
							>Intentar un altre cop</Button
						>
					</div>
				{:else if completedOperations.length === 10}
					<div class="mt-6 text-center text-2xl font-bold text-green-600">
						<p>Felicitats!</p>

						<p>Has completat la taula del {selectedNumber}!</p>
					</div>
				{:else}
					<div class="mt-8 space-y-6">
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
									class="h-12 rounded-xl bg-white/20 px-6 text-lg font-medium text-white hover:bg-white/30"
								>
									Comprovar!
								</Button>
							</div>
						</div>
						{#if isCorrect === false}
							<div class="text-center">
								<p class="text-xl font-medium text-red-500">
									{#if MAX_ATTEMPTS - wrongAttempts > 1}
										¡Ups! Et queden {MAX_ATTEMPTS - wrongAttempts} intents 🤔
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
