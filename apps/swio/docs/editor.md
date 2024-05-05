## Markdown 

Slidewriter uses Markdown to format your slides. Here are the most
common types of formatting used.

### Headings
```
# Largest heading (usually a title)
## Second largest heading (good for a slide heading)
### Third largest

This also is a large heading
============================

And this is a second largest heading
------------------------------------

```

### Lists
```
* Use asterisks
* to create a bulleted list
  * Indent a list item to create a nested list.
    * Keep indenting, if necessary.

1. Use numbers followed by a period
2. To create numbered lists
   1. Indent to create a nested list.
```

### Text formatting
```
Surround text you want to **bold** with asterisks.

To _italicize_ text, surround it with underscores.
```

### Code 
<pre>
```
// Use 3 backticks to include a code block
function hello(name) {
  return "Hello, " + name;
}
```
</pre>

```
You can also reference `code` inline by surrounding
it with backticks.
```

### Images

Copy and paste the URL of the image you want to use into the editor.
The image will be included on the slide automatically.

```
http://www.example.com/images/cat.jpg
```

### Videos

Copy and paste the URL of a YouTube video and it will be 
automatically embedded in your slide for you.

```
https://www.youtube.com/watch?v=1NC3s3Xhphs
```

## Auto-embedded image and videos

Slidewriter.io will try to do the right thing with certain urls that you include in your 
presentations. If you have a YouTube video url on a slide, your slide will 
show an embedded video, not the link text you included, for example. Here are 
the types of auto-embedded content Slidewriter.io supports:

* **Image url**: Image
* **Instagram url**: Image 
* **Dropbox image url**: Image    
  _The url is from right-clicking an image file stored on Dropbox and selecting "Copy Dropbox Link"._
* **YouTube url**: Embedded video
* **Vimeo url**: Embedded video

## Emoji

Include emoji in your presentations by surrounding the emoji name in colons, like this: `:apple:`. 
To show a heart emoji, type `:heart:`. A list of possible emoji names you can use is at
https://www.webpagefx.com/tools/emoji-cheat-sheet/. Slidewriter.io doesn't support all the emoji
listed there, but most of the commonly used ones.

## Charts

Include a basic pie, doughnut, area, line, or bar chart by including this text in your presentation (replace `pie` with `doughnut`, `bar`, `line`, `area` for the other types):

```
[piechart "Apples" 10, "Bananas" 20, "Kiwi" 15]
```

Default settings for all charts in a presentation can be changed from the Design pane. To override the defaults for a chart, change the text a little:

```
[piechart with legend left, datalabels on, rotation 30, data "Apples" 10, "Bananas" 20, "Kiwi" 15]
```

Here's another example for a line chart with the Y axis adjusted to start at zero, and use increments of 100:

```
[barchart with min 0, step 100, data "Apples" 10, "Bananas" 20, "Kiwi" 15]
```

### Chart settings

* `min [number]` - Y axis minimum
* `max [number]` - Y axis maximum 
* `step [number]` - Y axis increment 
* `animation [number | off]` - Number of milliseconds for an animation
* `legend [left | right | top | bottom | off ]` - Legend position
* `rotation [number]` - Degrees of rotation (pie chart only)
* `datalabels [on | off]` - Show or hide data labels

### Custom colors

Override the default chart colors by including the color name or hex value after the data point. In this example, the first two data points get a custom color, while the third takes the default first color.

```
[barchart with min 0, data "Apples" 10 purple, "Bananas" 20 #ff0000, "Kiwi" 15]
```



