export interface Character {
	id: string;
	name: string;
	gender: 'masculine' | 'feminine';
	emoji: string;
	description: string;
	abilities: string[];
	backstory: string;
	color: string;
}

export const characters: Character[] = [
	{
		id: 'mage',
		name: 'Mag Àlex',
		gender: 'masculine',
		emoji: '🧙‍♂️',
		description: 'Un mag savi que utilitza la màgia dels números per resoldre problemes',
		abilities: ['Encanteri dels números', 'Transformació matemàtica', 'Visió màgica'],
		backstory:
			'Àlex va descobrir els seus poders màgics quan va resoldre la seva primera taula de multiplicar. Ara viatja pel món ajudant altres a descobrir la màgia dels números.',
		color: 'from-purple-400 to-blue-600'
	},
	{
		id: 'knight',
		name: 'Cavaller Marc',
		gender: 'masculine',
		emoji: '⚔️',
		description: 'Un cavaller valent que protegeix el regne amb la força dels càlculs',
		abilities: ['Espasa matemàtica', 'Escut de números', 'Estratègia de batalla'],
		backstory:
			'Marc va ser nomenat cavaller després de derrotar el drac de les divisions. La seva armadura està gravada amb taules de multiplicar.',
		color: 'from-red-400 to-orange-600'
	},
	{
		id: 'explorer',
		name: 'Exploradora Luna',
		gender: 'feminine',
		emoji: '🗺️',
		description: 'Una exploradora intrèpida que descobreix tresors amb les matemàtiques',
		abilities: ['Mapa dels números', 'Brúixola matemàtica', 'Descobriment de tresors'],
		backstory:
			'Luna va trobar el seu primer tresor resolent una equació amagada en una cova antiga. Ara busca els tresors matemàtics més grans del món.',
		color: 'from-green-400 to-teal-600'
	},
	{
		id: 'scientist',
		name: 'Científica Sofia',
		gender: 'feminine',
		emoji: '🔬',
		description: 'Una científica brillant que experimenta amb fórmules matemàtiques',
		abilities: ['Experiment numèric', 'Poció de saviesa', 'Invenció matemàtica'],
		backstory:
			'Sofia va inventar una màquina que pot resoldre qualsevol problema matemàtic, però prefereix ensenyar a altres com fer-ho amb el seu propi cervell.',
		color: 'from-pink-400 to-purple-600'
	}
];

export function getCharacterById(id: string): Character | undefined {
	return characters.find((character) => character.id === id);
}
