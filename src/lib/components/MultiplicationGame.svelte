<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import confetti from 'canvas-confetti';

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
					class="group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition-transform hover:scale-105 active:scale-95 {i === 0
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
					<span class="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
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
				<div class="flex justify-between">
					<h2 class="mb-4 text-2xl font-bold">Taula del {selectedNumber}</h2>

					{#if wrongAttempts > 0}
						<div class="h-[150px] w-[150px]">
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
					<div class="mx-auto mb-6 space-y-2">
						{#each completedOperations as op}
							<div class="text-xl">
								{selectedNumber} × {op.multiplier} = {op.result}
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
					<div class="mt-4 space-y-4">
						<div class="text-center text-2xl">
							{selectedNumber} × {currentMultiplier} = ?
						</div>
						<div class="flex justify-center gap-4">
							<input
								type="number"
								name="answer"
								bind:value={userInput}
								use:ref
								placeholder="Escriu la resposta"
								class="flex h-10 w-44 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 {isCorrect ===
								false
									? 'border-red-500'
									: ''}"
								onkeydown={(e) => e.key === 'Enter' && checkAnswer()}
							/>
							<Button onclick={checkAnswer} class="cursor-pointer">Comprovar</Button>
						</div>
						{#if isCorrect === false}
							<p class="text-center text-red-500">
								{#if MAX_ATTEMPTS - wrongAttempts > 1}
									Torna-ho a intentar! Et queden {MAX_ATTEMPTS - wrongAttempts} intents
								{:else}
									Torna-ho a intentar! Últim intent
								{/if}
							</p>
						{/if}
					</div>
				{/if}
			</Card>
		</div>
	{/if}
</div>
