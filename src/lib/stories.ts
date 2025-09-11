export interface StoryChapter {
	id: number;
	title: string;
	description: string;
	background: string;
	challenge: string;
	requiredTable: number; // Which multiplication table (1-10) must be completed
	reward: string;
	nextHint?: string; // Hint about what comes next
}

export interface CharacterStory {
	characterId: string;
	title: string;
	description: string;
	chapters: StoryChapter[];
}

export const stories: CharacterStory[] = [
	{
		characterId: 'mage',
		title: 'La Cerca dels Cristalls Màgics',
		description: 'Ajuda al Mag Àlex a trobar els 10 cristalls màgics perduts per salvar el regne',
		chapters: [
			{
				id: 1,
				title: 'El Primer Cristall',
				description:
					'El Mag Àlex arriba a una cova misteriosa on brilla una llum blava. Per activar el primer cristall màgic, ha de demostrar el seu domini dels números més bàsics.',
				background: '🏞️ Cova dels Beginnings',
				challenge: "Demonstra el teu control sobre els números bàsics resolent la taula de l'1",
				requiredTable: 1,
				reward:
					'✨ Has obtingut el Cristall de la Unitat! Els teus poders màgics comencen a despertar.',
				nextHint: 'El següent cristall es troba al Llac dels Reflexos...'
			},
			{
				id: 2,
				title: 'El Cristall del Llac',
				description:
					"Al Llac dels Reflexos, el Mag Àlex veu el segon cristall al fons de l'aigua. Per fer-lo emergir, ha de crear ones perfectes amb la màgia dels números dobles.",
				background: '🏞️ Llac dels Reflexos',
				challenge: 'Crea ones perfectes resolent la taula del 2',
				requiredTable: 2,
				reward:
					'🌊 Has obtingut el Cristall dels Reflexos! Ara pots veure a través de les il·lusions.',
				nextHint: "Tres camins s'obren davant teu..."
			},
			{
				id: 3,
				title: "L'Encreuament dels Tres Camins",
				description:
					'Àlex arriba a un encreuament màgic amb tres camins. Una esfinge antiga li bloqueja el pas i només deixarà passar qui domini el poder del número tres.',
				background: '🗿 Encreuament Místic',
				challenge: "Convenç l'esfinge resolent la taula del 3",
				requiredTable: 3,
				reward: "🦉 Has obtingut el Cristall de la Saviesa! L'esfinge és ara la teva aliada.",
				nextHint: "Les quatre torres de l'elemental et criden..."
			},
			{
				id: 4,
				title: 'Les Quatre Torres',
				description:
					"Quatre torres s'alcen davant d'Àlex. Cada torre té un guardià que només respecta aquells que dominen l'equilibri perfecte del quatre.",
				background: '🏗️ Torres dels Elements',
				challenge: 'Equilibra els elements resolent la taula del 4',
				requiredTable: 4,
				reward: '⚡ Has obtingut el Cristall dels Elements! Controles foc, aigua, aire i terra.',
				nextHint: "El pentagrama màgic t'espera al centre del bosc..."
			},
			{
				id: 5,
				title: 'El Pentagrama del Bosc',
				description:
					"Al cor del bosc encanta, un pentagrama màgic brilla amb llum verda. Els esperits del bosc proven la valentia d'Àlex amb el número sagrat cinc.",
				background: '🌲 Bosc Encantat',
				challenge: 'Guanya el respecte dels esperits resolent la taula del 5',
				requiredTable: 5,
				reward:
					'🍃 Has obtingut el Cristall de la Natura! Els animals del bosc són els teus amics.',
				nextHint: "Sis portals dimensionals s'han obert..."
			},
			{
				id: 6,
				title: 'Els Portals Dimensionals',
				description:
					"Sis portals colorits giren a l'aire. L'Àlex ha de sincronitzar-los perfectament per viatjar a la dimensió següent on l'espera el sisè cristall.",
				background: '🌌 Dimensió Intermèdia',
				challenge: 'Sincronitza els portals resolent la taula del 6',
				requiredTable: 6,
				reward: '🌀 Has obtingut el Cristall Dimensional! Pots viatjar entre mons.',
				nextHint: "La constel·lació de set estrelles t'il·lumina el camí..."
			},
			{
				id: 7,
				title: 'La Constel·lació Perduda',
				description:
					"A l'espai còsmic, l'Àlex troba una constel·lació de set estrelles que han perdut la seva llum. Ha de reactivar-les amb l'energia del número set.",
				background: '⭐ Espai Còsmic',
				challenge: 'Reactivar les estrelles resolent la taula del 7',
				requiredTable: 7,
				reward: "🌟 Has obtingut el Cristall Estel·lar! Les estrelles t'obeeixen.",
				nextHint: "Vuit ancians t'esperen al temple..."
			},
			{
				id: 8,
				title: 'El Temple dels Vuit Ancians',
				description:
					"Un temple octogonal guardat per vuit ancians savis. Cada ancià posa a prova una part de la saviesa d'Àlex amb el poder místic del vuit.",
				background: '🏛️ Temple Octogonal',
				challenge: 'Supera la prova dels ancians resolent la taula del 8',
				requiredTable: 8,
				reward: "📿 Has obtingut el Cristall de la Saviesa Ancestral! Els ancians t'han acceptat.",
				nextHint: "Nou guardians protegeixen l'última prova..."
			},
			{
				id: 9,
				title: 'Els Nou Guardians',
				description:
					"Nou guardians poderosos envolten l'últim cristall. L'Àlex ha de demostrar que ha après tot el que els números li han ensenyat.",
				background: '⚔️ Arena dels Guardians',
				challenge: 'Derrota els nou guardians resolent la taula del 9',
				requiredTable: 9,
				reward: '🛡️ Has obtingut el Cristall del Poder! Els guardians reconeixen la teva força.',
				nextHint: "El cristall final t'espera al castell del mag negre..."
			},
			{
				id: 10,
				title: 'El Castell del Mag Negre',
				description:
					"Al castell més alt, el Mag Negre desafia l'Àlex a un duel màgic final. Només qui domini perfectament la taula del deu podrà salvar el regne.",
				background: '🏰 Castell Fosc',
				challenge: 'Derrota el Mag Negre resolent la taula del 10',
				requiredTable: 10,
				reward:
					'👑 Has obtingut el Cristall Suprem! Has salvat el regne i et converteixes en el Mag Suprem!'
			}
		]
	},
	{
		characterId: 'knight',
		title: 'La Croada dels Números Sagrats',
		description:
			'Acompanya el Cavaller Marc en la seva missió per recuperar les 10 relíquies sagrades',
		chapters: [
			{
				id: 1,
				title: "L'Espasa Novell",
				description:
					'En Marc rep la seva primera missió: provar-se digne de portar una espasa sagrada. Ha de demostrar el seu valor amb els números més simples.',
				background: '🏰 Castell del Rei',
				challenge: "Demostra el teu valor de novell amb la taula de l'1",
				requiredTable: 1,
				reward: "⚔️ Has guanyat l'Espasa de la Unitat! El rei t'ha nomenat Cavaller Aprenent.",
				nextHint: 'Dos bandits amenacen el poble veí...'
			},
			{
				id: 2,
				title: 'Els Dos Bandits',
				description:
					"Dos bandits ataquen els mercaders del poble. En Marc ha d'usar l'estratègia dels números parells per derrotar-los a tots dos alhora.",
				background: '🛤️ Camí dels Mercaders',
				challenge: 'Derrota els dos bandits amb la taula del 2',
				requiredTable: 2,
				reward: "🛡️ Has guanyat l'Escut Doble! Els mercaders t'estan agraïts.",
				nextHint: 'Tres dragones menors terroritzen les muntanyes...'
			},
			{
				id: 3,
				title: 'Les Tres Muntanyes',
				description:
					'Tres drags menors han pres control de tres muntanyes sagrades. En Marc ha de pujar a cada muntanya i enfrontar-se als drags amb coratge.',
				background: '⛰️ Muntanyes Sagrades',
				challenge: 'Venç els tres drags amb la taula del 3',
				requiredTable: 3,
				reward: '🐉 Has guanyat el Casc de Dragonslayer! Els drags respecten la teva força.',
				nextHint: 'Quatre torres han caigut sota un malefici...'
			},
			{
				id: 4,
				title: 'Les Torres Maleïdes',
				description:
					'Quatre torres de guàrdia han caigut sota un malefici fosc. En Marc ha de purificar cada torre i restaurar les defenses del regne.',
				background: '🗼 Torres de Guàrdia',
				challenge: 'Purifica les quatre torres amb la taula del 4',
				requiredTable: 4,
				reward: "✨ Has guanyat l'Armadura de la Llum! Les torres tornen a brillar.",
				nextHint: 'Cinc pobles demanen la teva ajuda...'
			},
			{
				id: 5,
				title: 'Els Cinc Pobles',
				description:
					"Cinc pobles diferents pateixen atacs d'orcs. En Marc ha de defensar cada poble i unir-los sota la seva bandera de pau.",
				background: '🏘️ Pobles Units',
				challenge: 'Defensa els cinc pobles amb la taula del 5',
				requiredTable: 5,
				reward: '🚩 Has guanyat la Bandera de la Unitat! Els pobles et proclamen seu protector.',
				nextHint: 'Sis cavallers foscos han aparegut...'
			},
			{
				id: 6,
				title: 'Els Cavallers Foscos',
				description:
					'Sis cavallers foscos desafien en Marc a un torneig mortal. Cada cavaller lluita amb tàctiques diferents, però la matemàtica és la clau de la victòria.',
				background: '🏟️ Arena del Torneig',
				challenge: 'Derrota els sis cavallers foscos amb la taula del 6',
				requiredTable: 6,
				reward: '🏆 Has guanyat el Trofeu del Campió! Ets el millor cavaller del torneig.',
				nextHint: 'Set fortaleses enemigues bloquegen el pas...'
			},
			{
				id: 7,
				title: 'Les Set Fortaleses',
				description:
					"Set fortaleses enemigues bloquegen l'únic camí cap al castell final. En Marc ha de conquistar cada fortalesa amb estratègia i valentia.",
				background: '🏯 Línea de Fortaleses',
				challenge: 'Conquesta les set fortaleses amb la taula del 7',
				requiredTable: 7,
				reward: "⚡ Has guanyat la Llança del Llamp! Les fortaleses s'han rendit.",
				nextHint: "Vuit generals enemics planegen l'atac final..."
			},
			{
				id: 8,
				title: 'Els Vuit Generals',
				description:
					'Vuit generals enemics han unit les seves forces. En Marc ha de superar la seva estratègia combinada i derrotar-los en batalla campal.',
				background: '⚔️ Camp de Batalla',
				challenge: 'Derrota els vuit generals amb la taula del 8',
				requiredTable: 8,
				reward: '👑 Has guanyat la Corona de Guerra! Els exèrcits enemics fugen.',
				nextHint: "Nou dimonis guarden l'entrada a l'infern..."
			},
			{
				id: 9,
				title: "Les Portes de l'Infern",
				description:
					"Nou dimonis poderosos guarden les portes de l'infern. En Marc ha d'usar tota la seva experiència per obrir el camí al combat final.",
				background: '🔥 Portes Infernals',
				challenge: 'Obre les portes derrotant els nou dimonis amb la taula del 9',
				requiredTable: 9,
				reward: "😈 Has guanyat l'Anell del Poder Infernal! Els dimonis t'obeeixen.",
				nextHint: "El Senyor Fosc t'espera al seu tron..."
			},
			{
				id: 10,
				title: 'El Tron del Senyor Fosc',
				description:
					'Al tron més fosc, el Senyor Fosc desafia Marc al combat definitiu. Només el cavaller que domini perfectament tots els números pot salvar el món.',
				background: "💀 Tron de l'Obscuritat",
				challenge: 'Derrota el Senyor Fosc amb la taula del 10',
				requiredTable: 10,
				reward:
					"🌟 Has guanyat l'Espasa de la Llum Eterna! Has salvat el món i et converteixes en Cavaller Llegendari!"
			}
		]
	},
	{
		characterId: 'explorer',
		title: 'El Tresor dels Deu Temples',
		description: 'Segueix la Luna en la recerca dels tresors amagats en 10 temples antics',
		chapters: [
			{
				id: 1,
				title: 'El Primer Mapa',
				description:
					'La Luna troba un mapa antic que mostra la ubicació del primer temple. Per desxifrar-lo, ha de demostrar que entén els números bàsics.',
				background: '📜 Biblioteca Antiga',
				challenge: "Desxifra el primer mapa amb la taula de l'1",
				requiredTable: 1,
				reward: "🗺️ Has trobat el Mapa del Principiant! El primer temple s'ha revelat.",
				nextHint: 'Dues esfínxes guarden el segon temple...'
			},
			{
				id: 2,
				title: 'Les Esfínxes Bessones',
				description:
					'Al segon temple, dues esfínxes idèntiques plantegen enigmes. La Luna ha de resoldre els seus trencaclosques matemàtics per continuar.',
				background: '🏛️ Temple de les Esfínxes',
				challenge: 'Resol els enigmes de les dues esfínxes amb la taula del 2',
				requiredTable: 2,
				reward: "🧩 Has trobat l'Amulet de l'Enigma! Les esfínxes t'han deixat passar.",
				nextHint: 'Tres guardians de pedra protegeixen el següent tresor...'
			},
			{
				id: 3,
				title: 'Els Guardians de Pedra',
				description:
					"Tres guardians de pedra gegants bloquegen l'entrada al tercer temple. La Luna ha d'activar els mecanismes correctes per despertar-los.",
				background: '🗿 Temple dels Guardians',
				challenge: 'Desperta els tres guardians amb la taula del 3',
				requiredTable: 3,
				reward: "⚡ Has trobat el Cristall de l'Energia! Els guardians s'han despertat i t'ajuden.",
				nextHint: 'Quatre cambres secretes amaguen el següent temple...'
			},
			{
				id: 4,
				title: 'Les Cambres Secretes',
				description:
					'El quart temple té quatre cambres secretes, cada una amb un trencaclosques diferent. La Luna ha de resoldre tots per accedir al tresor central.',
				background: '🏺 Temple Laberíntic',
				challenge: 'Resol els trencaclosques de les quatre cambres amb la taula del 4',
				requiredTable: 4,
				reward: "🔑 Has trobat les Claus Mestres! Totes les portes s'obren per tu.",
				nextHint: 'Cinc piràmides formen una constel·lació...'
			},
			{
				id: 5,
				title: 'La Constel·lació de Piràmides',
				description:
					"Cinc piràmides estan alineades com les estrelles d'una constel·lació. La Luna ha de resoldre l'enigma astronòmic per revelar el temple amagat.",
				background: '⭐ Desert de les Piràmides',
				challenge: 'Alinea les cinc piràmides amb la taula del 5',
				requiredTable: 5,
				reward: "🌌 Has trobat l'Orb Celestial! Les estrelles t'guien.",
				nextHint: "Sis illes flottants apareixen a l'horitzó..."
			},
			{
				id: 6,
				title: 'Les Illes Flotants',
				description:
					"Sis illes màgiques floten en l'aire, connectades per ponts invisibles. La Luna ha de trobar el patró correcte per saltar d'illa en illa.",
				background: '☁️ Illes del Cel',
				challenge: 'Navega per les sis illes amb la taula del 6',
				requiredTable: 6,
				reward: "🪶 Has trobat les Botes del Vent! Pots caminar per l'aire.",
				nextHint: 'Set sirenes canten al temple submarí...'
			},
			{
				id: 7,
				title: 'El Temple Submarí',
				description:
					"Set sirenes guarden un temple sota l'oceà. La Luna ha de superar el seu cant hipnòtic resolvent els seus enigmes matemàtics.",
				background: '🌊 Palau Submarí',
				challenge: 'Supera el cant de les set sirenes amb la taula del 7',
				requiredTable: 7,
				reward: "🔱 Has trobat el Trident de Poseidó! Els oceans t'obeeixen.",
				nextHint: 'Vuit dracs ancians guarden el temple volcànic...'
			},
			{
				id: 8,
				title: 'El Temple Volcànic',
				description:
					"Vuit dracs ancians dormen al voltant d'un temple volcànic. La Luna ha de resoldre els enigmes sense despertar-los, o enfrontar-se a la seva ira.",
				background: '🌋 Crater Volcànic',
				challenge: 'Evita despertar els vuit dracs amb la taula del 8',
				requiredTable: 8,
				reward: "🔥 Has trobat l'Anell del Foc Etern! Els dracs respecten el teu poder.",
				nextHint: "Nou esperits guardians protegeixen l'últim temple..."
			},
			{
				id: 9,
				title: 'Els Esperits Guardians',
				description:
					'Nou esperits guardians ancestrals protegeixen el penúltim temple. La Luna ha de demostrar que és digna dels seus tresors.',
				background: '👻 Temple Espiritual',
				challenge: 'Guanya el respecte dels nou esperits amb la taula del 9',
				requiredTable: 9,
				reward: '✨ Has trobat la Corona Espiritual! Els esperits són els teus aliats.',
				nextHint: "El tresor final t'espera al temple perdut..."
			},
			{
				id: 10,
				title: 'El Temple Perdut del Tresor Suprem',
				description:
					"Al temple més amagat del món, la Luna troba el tresor suprem. Però per prendre'l, ha de demostrar que ha après tot el que els números li han ensenyat.",
				background: '💎 Temple del Tresor Suprem',
				challenge: 'Reclama el tresor suprem amb la taula del 10',
				requiredTable: 10,
				reward:
					"👑 Has trobat el Tresor Suprem de la Saviesa! Et converteixes en l'Exploradora Llegendària!"
			}
		]
	},
	{
		characterId: 'scientist',
		title: "L'Experiment dels Deu Elements",
		description:
			'Ajuda Sofia a completar el seu experiment per crear els 10 elements matemàtics perfectes',
		chapters: [
			{
				id: 1,
				title: "L'Element Bàsic",
				description:
					"La Sofia comença el seu gran experiment. Ha de crear l'element més bàsic de tots: la unitat pura que servirà de base per tots els altres.",
				background: '🧪 Laboratori Principal',
				challenge: "Crea l'element unitat amb la taula de l'1",
				requiredTable: 1,
				reward: "⚪ Has creat l'Element Unitat! La base de tots els experiments està llesta.",
				nextHint: "Ara necessites crear l'element dual..."
			},
			{
				id: 2,
				title: "L'Element Dual",
				description:
					'La Sofia necessita crear un element que representi la dualitat: llum i foscor, positiu i negatiu. Aquest element és clau per equilibrar les reaccions.',
				background: "⚖️ Cambra d'Equilibri",
				challenge: "Equilibra les forces creant l'element dual amb la taula del 2",
				requiredTable: 2,
				reward: "⚫⚪ Has creat l'Element Dual! L'equilibri està restaurat.",
				nextHint: "El triangle perfecte requereix l'element ternari..."
			},
			{
				id: 3,
				title: "L'Element Ternari",
				description:
					"Per crear la forma perfecta del triangle, la Sofia necessita l'element ternari. Aquest element representa l'estabilitat i la perfecció geomètrica.",
				background: '📐 Laboratori Geomètric',
				challenge: "Construeix l'estabilitat perfecta amb la taula del 3",
				requiredTable: 3,
				reward: "🔺 Has creat l'Element Ternari! La geometria perfecta és teva.",
				nextHint: 'Els quatre elements clàssics esperen ser unificats...'
			},
			{
				id: 4,
				title: 'Els Elements Clàssics',
				description:
					"La Sofia vol unificar els quatre elements clàssics: foc, aigua, aire i terra. Creant l'element quaternari, podrà controlar la natura mateixa.",
				background: '🌪️ Cambra Elemental',
				challenge: 'Unifica els quatre elements amb la taula del 4',
				requiredTable: 4,
				reward: "🔥💧🌪️🌍 Has creat l'Element Quaternari! Controles la natura.",
				nextHint: 'Els cinc sentits necessiten el seu propi element...'
			},
			{
				id: 5,
				title: "L'Element Sensorial",
				description:
					"Per connectar amb els cinc sentits humans, la Sofia crea l'element sensorial. Aquest element li permetrà sentir i percebre tot l'univers.",
				background: '👁️ Laboratori Sensorial',
				challenge: 'Desperta tots els sentits amb la taula del 5',
				requiredTable: 5,
				reward: "👁️👂👃👅🤚 Has creat l'Element Sensorial! Percebs tot l'univers.",
				nextHint: "Sis dimensions espacials requereixen l'element dimensional..."
			},
			{
				id: 6,
				title: "L'Element Dimensional",
				description:
					"La Sofia vol obrir portals a altres dimensions. L'element dimensional li permetrà viatjar a través de l'espai i del temps.",
				background: '🌌 Laboratori Dimensional',
				challenge: 'Obre les dimensions amb la taula del 6',
				requiredTable: 6,
				reward: "🌀 Has creat l'Element Dimensional! Pots viatjar entre mons.",
				nextHint: "Set colors de l'arc de sant martí necessiten l'element cromàtic..."
			},
			{
				id: 7,
				title: "L'Element Cromàtic",
				description:
					"Creant l'element cromàtic, la Sofia podrà controlar tots els colors i la llum mateixa. Aquest element representa la bellesa i l'harmonia visual.",
				background: '🌈 Laboratori Òptic',
				challenge: 'Controla tots els colors amb la taula del 7',
				requiredTable: 7,
				reward: "🌈 Has creat l'Element Cromàtic! Ets mestra de la llum i el color.",
				nextHint: "Vuit notes musicals esperen l'element harmònic..."
			},
			{
				id: 8,
				title: "L'Element Harmònic",
				description:
					"La Sofia crea l'element harmònic per controlar el so i la música. Aquest element li permetrà crear melodies que poden curar o destruir.",
				background: '🎵 Laboratori Acústic',
				challenge: "Composa l'harmonia perfecta amb la taula del 8",
				requiredTable: 8,
				reward: "🎼 Has creat l'Element Harmònic! La música és el teu poder.",
				nextHint: "Nou muses inspiren l'element creatiu..."
			},
			{
				id: 9,
				title: "L'Element Creatiu",
				description:
					"Inspirada per les nou muses, la Sofia crea l'element creatiu. Aquest element representa la inspiració, l'art i la capacitat de crear bellesa.",
				background: '🎨 Laboratori Artístic',
				challenge: 'Inspira la creació perfecta amb la taula del 9',
				requiredTable: 9,
				reward: "🎭 Has creat l'Element Creatiu! Ets mestra de totes les arts.",
				nextHint: "L'element final esperarà la teva perfecció absoluta..."
			},
			{
				id: 10,
				title: "L'Element Perfecte",
				description:
					"La Sofia està llesta per crear l'element perfecte: la culminació de tots els seus experiments. Aquest element li donarà el poder de crear o destruir universos sencers.",
				background: '⭐ Laboratori Còsmic',
				challenge: 'Crea la perfecció absoluta amb la taula del 10',
				requiredTable: 10,
				reward:
					"🌟 Has creat l'Element Perfecte! Et converteixes en la Científica Suprema de l'Univers!"
			}
		]
	}
];

export function getStoryByCharacterId(characterId: string): CharacterStory | undefined {
	return stories.find((story) => story.characterId === characterId);
}

export function getChapterByIds(characterId: string, chapterId: number): StoryChapter | undefined {
	const story = getStoryByCharacterId(characterId);
	return story?.chapters.find((chapter) => chapter.id === chapterId);
}
