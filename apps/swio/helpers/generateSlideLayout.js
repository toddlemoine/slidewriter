const title = () => (`
# Title Goes Here
With additional text
`);

const text = () => (`
## Heading Text 
The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His pale grey eyes shone and twinkled, and his usually pale face was flushed and animated.
`);

const code = () => ([
'```js',
'function hello() {',
'    return "Hello, World";',
'}',
'```'].join("\n"));

const bulletedList = () => (`
## Bulleted List 
* Item 1
* Item 2
* Item 3
`);

const numberedList = () => (`
## Numbered List 
1. Item 1
2. Item 2
3. Item 3
`);

const chart = () => (`
## Chart Heading
[barchart with min 0, max 100, step 25, data "Q1" 75, "Q2" 25, "Q3" 57]
`)

const layouts = {
    title,
    text,
    code,
    bulletedList,
    numberedList,
    chart
}
export default function generateSlideLayout(layout) {
    const layoutFunc = layouts[layout];
    return layoutFunc ? layoutFunc().trim() : '';
}