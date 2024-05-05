const adjectives = [
    "Adamant",
    "Adroit",
    "Amatory",
    "Animistic",
    "Antic",
    "Arcadian",
    "Baleful",
    "Bellicose",
    "Bilious",
    "Boorish",
    "Calamitous",
    "Caustic",
    "Cerulean",
    "Comely",
    "Concomitant",
    "Contumacious",
    "Corpulent",
    "Crapulous",
    "Defamatory",
    "Didactic",
    "Dilatory",
    "Dowdy",
    "Efficacious",
    "Effulgent",
    "Egregious",
    "Endemic",
    "Equanimous",
    "Execrable",
    "Fastidious",
    "Feckless",
    "Fecund",
    "Friable",
    "Fulsome",
    "Garrulous",
    "Guileless",
    "Gustatory",
    "Heuristic",
    "Histrionic",
    "Hubristic",
    "Incendiary",
    "Insidious",
    "Insolent",
    "Intransigent",
    "Inveterate",
    "Invidious",
    "Irksome",
    "Jejune",
    "Jocular",
    "Judicious",
    "Lachrymose",
    "Limpid",
    "Loquacious",
    "Luminous",
    "Mannered",
    "Mendacious",
    "Meretricious",
    "Minatory",
    "Mordant",
    "Munificent",
    "Nefarious",
    "Noxious",
    "Obtuse",
    "Parsimonious",
    "Pendulous",
    "Pernicious",
    "Pervasive",
    "Petulant",
    "Platitudinous",
    "Precipitate",
    "Propitious",
    "Puckish",
    "Querulous",
    "Quiescent",
    "Rebarbative",
    "Recalcitrant",
    "Redolent",
    "Rhadamanthine",
    "Risible",
    "Ruminative",
    "Sagacious",
    "Salubrious",
    "Sartorial",
    "Sclerotic",
    "Serpentine",
    "Spasmodic",
    "Strident",
    "Taciturn",
    "Tenacious",
    "Tremulous",
    "Trenchant",
    "Turbulent",
    "Turgid",
    "Ubiquitous",
    "Uxorious",
    "Verdant",
    "Voluble",
    "Voracious",
    "Wheedling",
    "Withering",
    "Zealous",
    ];
    
const verbs = [ 'Guiding', 'Satisfying', 'Hurrying', 'Framing', 'Identifying', 'Curing', 'Annoying', 'Sharing', 'Clapping', 'Pining for', 'Excusing', 'Admiring', 'Managing', 'Squealing at', 'Changing', 'Permitting', 'Balancing', 'Impressing', 'Staring down', 'Releasing', 'Warming up to', 'Reporting', 'Introducing', 'Saving', 'Forming' ];
const nouns = [ 'Expectations', 'Last Quarter\'s Results', 'Designs', 'Hopes', 'Dreams', 'Fears', 'Joy', 'Computers', 'Buckets', 'Bands', 'Episodes', 'Reviews', 'Endeavors', 'Moonshots', 'Lemonade', 'Hopscotch', 'Homework', 'Regret', 'Admiration', 'Eloquence', 'Manners', 'Performance', 'Glass' ];

const subheadings = [
    'It takes a team',
    'All in a day\'s work',
    'We can hide forever',
    'Lalalalalalala',
    'Not my fault',
    'Best intentions, etc, etc.',
    'Following, not leading',
    'Leading, not following',
    'Reading the tea leaves',
    'Burning the right bridge',
    'Being good as quick as we can',
    'Being bad as quick as we can',
    'Embracing our inner something'
];
    
function randomValueFrom(coll) {
    const min = 0;
    const max = coll.length;
    const rand = Math.floor(Math.random() * (max - min) + min);
    return coll[rand];
}

function generateTitle() {
    const verb = randomValueFrom(verbs);
    const adj = randomValueFrom(adjectives);
    const noun = randomValueFrom(nouns);
    const phrase = [verb, adj, noun].join(' '); 
    console.log('phrase', phrase);
    return phrase;
}    

function generateSubheading() {
    return randomValueFrom(subheadings);
}
export default function generatePresentationSource() {
    const source = `
# ${generateTitle()}
${generateSubheading()}   
`;
    return source.trim();
}