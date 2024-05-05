import sortBy from 'lodash.sortby';
import groupBy from 'lodash.groupby';

export const [ SERIF, SANS_SERIF, HANDWRITING, MONOSPACE ] = ['Serif', 'Sans Serif', 'Handwriting', 'Monospace'];

export default groupBy(
  sortBy([
    ["Alegreya Sans", SANS_SERIF],
    ["Raleway", SANS_SERIF],
    ["PT Sans", SANS_SERIF],
    [ "EB Garamond", SERIF ],
    [ "Fira Mono", MONOSPACE ],
    [ "VT323", MONOSPACE ],
    [ "Nova Mono", MONOSPACE ],
    [ "Lato", SANS_SERIF ],
    [ "Dosis", SANS_SERIF ],
    [ "Open Sans", SANS_SERIF ],
    [ "Crimson Text", SERIF ],
    [ "Quicksand", SANS_SERIF ],
    [ "Ultra", SERIF ],
    [ "Kreon", SERIF ],
    [ "Rancho", SANS_SERIF ],
    [ "Sue Ellen Francisco", HANDWRITING ],
    [ "Walter Turncoat", HANDWRITING ],
    [ "Francois One", SANS_SERIF ],
    [ "Karma", SERIF ],
    [ "Merriweather", SERIF ],
    [ "Montserrat", SANS_SERIF ],
    [ "Bangers", SANS_SERIF ],
    [ "Didact Gothic", SANS_SERIF ],
    [ "Playfair Display", SERIF ],
    [ "Lora", SERIF ],
    [ "Itim", HANDWRITING ],
    [ "Amatic SC", HANDWRITING ],
    [ "Domine", SERIF ],
    [ "Oswald", SANS_SERIF ],
    [ "Libre Baskerville", SERIF ],
    [ "Roboto Slab", SERIF ]
  ], (font) => font[0]),
  (font) => font[1]
); 