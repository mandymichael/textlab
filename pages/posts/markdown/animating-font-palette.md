---
title: Animating Font Palette
date: '2024-01-25'
summary: With the release of Chrome 121 we can now animate a smooth transition between font-palettes in Color Fonts using only CSS.
canonical: https://variablefonts.dev/posts/using-color-fonts
tags:
    - color
    - article
    - demo
    - featured
    - font-palette
featureFont: {
    font: Bungee Spice, 
    author: David Jonathon Ross,
    url: https://fonts.google.com/specimen/Bungee+Spice,
    publisher: Google Fonts,   
    image: /images/post-assets/font-palette/font-palette-animation-featured.jpg
}
card: {
    cardImage: /images/post-assets/font-palette/font-palette-animation.jpg,
    cardAlt: Jello text in Bungee Spice Color Font,
    featured: /images/post-assets/font-palette/font-palette-animation-featured.jpg,
    cardFeaturedSummary: Where variable fonts added new axis to combine multiple font styles into the one file color fonts do a similar thing but with color, and now these colour palettes can be animated opening up more doors for creating text effects on the web.
}
---

If you aren't familiar with color fonts I recommend you check out my previous post [Using Color Fonts](/posts/using-color-fonts) to get a bit of a background on how to use them. If you are familiar with color fonts lets dive into the latest update in Chrome 121 allowing for animating the font palettes.

As a brief introduction to save you reading the whole post about Color Fonts, they allow font designers to merge multiple color layers into one font file and assign a color to each layer. They come with one or more colour palettes predetermined but developers can access and change these values through CSS using the `font-palette` property. In the latest release of Chrome (121) we can now animate the change between font-palette values. Below is the Codepen if you want to skip all the explanation, otherwise feel free to read on!

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="Animating font-palette" src="//codepen.io/mandymichael/embed/poYWayY/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>

_Note: please make sure you have updated to the latest Chrome (Chrome 121) to see the transition. It is not currently supported in the other browsers._

First thing we are going to need is a color font that supports color palettes, I've chosen [Bungee Spice](https://fonts.google.com/specimen/Bungee+Spice) by David Jonathon Ross, it's available on [Google Fonts](https://fonts.google.com/specimen/Bungee+Spice). If you aren't sure if the font you want to use supports font palettes you can load it up into [Wakamai Fondue](https://wakamaifondue.com/) and it well let you know what palettes are available and how many colors in each one.

Assuming you've loaded in the google font we'll set up our html next with just a simple h1.

```html

<h1>Jello</h1>

```

Next up we need to set up the `font-palette-values` function in the CSS. As Bungee Spice only comes with one palette I'm going to create two new ones to use for the transition. The first one I'll name `--base` and the transition colors I'll call `--transition`. Because I want to use a custom palette I'll add in the `override-colors` property alongside the `font-family` property. This particular font only has two colours in the palette so starting from 0, I've added the two colours I want in. Next I create another palette the same way with the name `--transition` but change the colours to the secondary set. I've used the hex code from position 1 in the `--base` palette as the start position (0) in my `--transition` palette, but you can use whatever colours you want.

```css
@font-palette-values --base {
	font-family: "Bungee Spice";
	override-colors: 0 #1894b0, 1 #fc00fc;
}

@font-palette-values --transition {
	font-family: "Bungee Spice";
	override-colors: 0 #fc00fc, 1 #4200d9;
}
```

Once we have our `font-palette-values` functions set up we can continue with the rest of the CSS. You may think that because we've defined the font-family in the function we don't need to add it to the h1, but that is not the case, so we add the font-family onto the h1 as well, followed by the `font-palette` property with the value of our first palette i.e. `--base`.

Next up we can add a transition in with the `transition` property, this can be whatever you want as long as you are transitioning the `font-palette` property. Finally to trigger the transition I'll use the hover state for simplicity. At this point we need to change the value of the `font-palette` property to the `--transition` font-palette values function on the hover selector.

```css

h1 {
	font-family: "Bungee Spice", sans-serif;
	font-palette: --effect;
	transition: ease 250ms font-palette;
}

h1:hover {
	font-palette: --transition;
}

```

This will result in a smooth transition between the two colour sets when you hover over the text. You can then proceed to add any other features you want, in my case I included a text-shadow for oomph. The full demo is available on my [Animating Font-Palette Codepen](https://codepen.io/mandymichael/pen/poYWayY).

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="Animating font-palette" src="//codepen.io/mandymichael/embed/poYWayY/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>

