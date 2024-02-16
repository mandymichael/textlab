---
title: Making the most of ligatures
date: '2024-02-15'
summary: Making use of the font-variant-ligatures CSS property gives access to alternate glyphs within fonts that combine one or more glyphs to improve readability.
tags:
    - font-variant
    - article
    - ligatures
featureFont: {  
    image: /images/post-assets/font-ligatures/fontligatures-feature.jpg
}
card: {
    cardImage: /images/post-assets/font-ligatures/fontligatures-card.jpg,
    cardAlt: Playfair Display font in text find showing the fi ligatures,
    featured: /images/post-assets/font-numeric/fontnumeric-feature.jpg,
    cardFeaturedSummary: font-variant-ligatures gives us access to the ligature open type features directly in our websites and web applications.
}
---

A ligature is when two or more letters within a font are combined into a single character/glyph. This is typically done to help with readability or to make the font look more attractive. Basically it tries to resolve collisions, like when you have two of the letter "f" next to each other. You might also notice that sometimes these features are enabled by default especially at smaller font sizes.

Before we jump into this, it is important to note with all font variant properties, that if the font does not support the variant it will not do anything and will instead fall back to the default. So if you want to use these you have to make sure to choose a font that supports them. I like to use the tool [Wakamaifondue](https://wakamaifondue.com/) as it analyses the font and shows you all the available features. For `font-variant-ligatures` specifically this is usually indicated by open type codes `liga`, `diga`, `clig` along with other codes you can check via the [font-variant-ligatures](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) page on MDN.

Using MDN as a references especially when inspecting the font to determine what features are available is very handy because are a lot of options for `font-variant-ligatures`, for example:

```css
    font-variant-ligatures: none;
    font-variant-ligatures: normal;
    font-variant-ligatures: common-ligatures;
    font-variant-ligatures: no-common-ligatures;
    font-variant-ligatures: discretionary-ligatures;
    font-variant-ligatures: no-discretionary-ligatures;
    font-variant-ligatures: historical-ligatures;
    font-variant-ligatures: no-historical-ligatures;
    font-variant-ligatures: contextual;
    font-variant-ligatures: no-contextual;
```

Rather than going through every option, for this post i'll focus on `common-ligatures`. Don't forget to check out all the other options available on the [font-variant-ligatures](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) page on MDN.


For the examples i'll use the font [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) which you can download for free off [Google Fonts](https://fonts.google.com/).

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="font-variant-ligatures demo" src="//codepen.io/mandymichael/embed/GRePoMg/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>

Taking a look at the codepen above you might notice some differences. Wth the first example where ligatures are set to none, you can see that each character is separate and distinct. If we focus specifically on the "fl" and the "ff" in the word you'll notice that they kind of bump into each other and it looks a little clunky as a result.

In comparison when we take a look at the example on the right where we have `common-ligatures` enabled we are able to see that the "fl" and the "ff" are now connected. The glyphs have been redesigned so that they no long bump into each other but seamlessly join together creating a smoother flow. The intention being that as the user reads their eyes follow along much easier rather than being met with the more clunky character collisions.

Using ligatures is very straight forward and easy within CSS. All that is required is a HTML element, like a h1, with a `font-family` applied. As I mentioned earlier if the font does not have support it wont do anything, but as long as it has support the ligatures will be utilised. In the case of Playfair the common ligatures may already be applied by default, but there are other options you can try as well.

```css
h1 {
	font-family: "Playfair", serif;
    font-variant-ligatures: common-ligatures;
}
```

One thing to keep in mind, especially if you are utilising fonts from Google Fonts, is that they don't always provide the features that the font supports. For example while Playfair Display has options for discretionary ligatures the version served by Google Fonts does not include them. This is because Google subsets the fonts (I presume for performance reasons). The defaults they use for these layout features don't include everything including discretionary ligatures. 

If you wanted to make the most of features that are not included in the Google Fonts version you can download the font and host yourself. The following codepen is an example of some of the discretionary ligatures available in Playfair Display.

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="font-variant-ligatures demo" src="//codepen.io/mandymichael/embed/yLwZVwZ/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>


It's important to note that while ligatures can help with readability, in some cases they can also be confusing. Coding fonts are a great example of this, personally I find the overuse of ligatures in these fonts really problematic and often make the cognitive load much worse than if they'd just left the characters separate. So it is important to think about the context you are using them in before just enabling features like this.

Another way you can enable ligatures is making use of the `font-feature-settings` property. This will make use of the open type features available in the font, but rather than using the friendly names like "common ligatures" you'll need to target the open type codes. These are available on the [font-variant-ligatures](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) page on MDN. 

To utilise it with `font-feature-settings` it might look like the below example.

```css 

h1 {
   font-feature-settings: "liga" 1,  "clig" 1, "dlig" 1;
}
```

In terms of open type features common ligatures maps to `clig` and `liga`, so you can set both of these in `font-feature-settings`. Setting a value of one is like "turning on" the setting, you can set it to 0 to unset the value. Adding the `dlig` option will enable `discretionary-ligatures`. 

Experimenting and checking out what ligatures are available within a font can elevate your designs in a subtle yet impactful way. It might not be a highly obvious change, but it is a change which can improve reading comprehension and therefore usability of your website.

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="font-variant-ligatures demo" src="//codepen.io/mandymichael/embed/abKVwoR/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>