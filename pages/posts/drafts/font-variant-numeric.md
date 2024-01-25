---
title: Using Font Variant Numeric
date: '2024-01-09'
summary: The font-variant-numeric CSS property allows us to control alternate glyphs for numbers, fractions, and ordinal markers.
tags:
    - font-variant
    - numeric
    - article
featureFont: {
    font: Variable Color Initials, 
    author: Arthur Reinders Folmer,
    url: https://www.typearture.com/variable-color-font-initials/,
    publisher: Typeature,   
    image: /images/post-assets/color-font/jello-feature.jpg
}
card: {
    cardImage: /images/post-assets/color-font/jello-card.jpg,
    cardAlt: Jello "J" color font initial by Typearture,
     featured: /images/post-assets/color-font/jello-feature.jpg,
    cardFeaturedSummary: Where variable fonts added new axis to combine multiple font styles into the one file color fonts do a similar thing but with color.
}
---

It’s important to note with all font properties, that if the font does not support the variant it will not do anything and will instead fall back to the default. So if you want to use these you have to make sure to choose a font that supports them. I like to use the tool [Wakamaifondue](https://wakamaifondue.com/) as it analyses the font and shows you all the available features. 

`font-variant-numeric` deals specifically with numeric characters like digits - it allows us to control the usage of alternate glyphs for numbers, fractions, and ordinal markers. The related property, `font-variant` is the shorthand name for five separate variant properties, but in this post I'll focus only on `font-variant-numeric`.

Fonts will sometimes come with a number of different glyphs that can be used to represent different number formats, fractions etc. But on the web it's not something you see utilised very often simply because it's either forgotten about or not widely known.   The `font-variant-numeric` property allows us to access these features and is particularly useful for product interfaces, admin systems and data where you deal with a lot of numbers.


There are a number of different values for `font-variant-numeric` you can check out the [font-variant-numeric MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) for a full list, in this article i'll demonstrate some of the options which I find most useful.

```css 
font-variant-numeric: slashed-zero;
font-variant-numeric: lining-nums;
font-variant-numeric: tabular-nums;
font-variant-numeric: old-style-nums;
font-variant-numeric: diagonal-fractions;
font-variant-numeric: stacked-fractions;
font-variant-numeric: ordinal;

```

Some of these values might seem obvious, something like slashed zero and diagonal or stacked fractions for example, but if you aren't familiar with the terminology something like `lining-nums` might be confusing. The image below demonstrates some examples.

![Example different font-variant-numeric features based on list above.](/images/post-assets/font-numeric/fontnumeric.png)

Some of these might look very different or very similar and when and when not to use them can be confusing so lets take a closer look.


![Example image demonstrating the differences between lining numerals tabular numerals and oldstyle numerals using Roslindale font it shows the horizontal spacing difference between lining and tabular numerals and now the old style numerals run below the baseline ](/images/post-assets/font-numeric/fontnumeric-table.png)


An option like `tabular-nums` is useful where you want each number to sit on the [baseline](https://fonts.google.com/knowledge/glossary/baseline) and take up the same amount space - think charts or tables of data where you want everything to align. Whereas `lining-nums` are better suited to place where the numbers align on the baseline but the individual numbers do not necessarily take up the same space, typically more common in body copy. Finally `oldstyle-nums` have varying heights and alignments, as opposed to the other two examples which are uniform in height and alignment. They are similar in height to lowercase characters, so you often see this used in body copy.

For example, if we take a look at the use of `tabular-nums` vs `oldstyle-nums` in a table you can see that the tabular nums is a lot easier to read. The reason for this is because with tabular numerals all the numers take up the same space 

![Example image demonstrating the differences in a table between old style numerals and tabular numerals using Playfair Display it demonstrates that old style numerals in a table make it difficult to read the data ](/images/post-assets/font-numeric/fontnumeric-table-comparison.png)


Most modern professional fonts will contain both lining numerals and old style numerals

Even if people are familiar with the CSS property I think they assume it will just work with whatever font they are using, and when it doesn't they just ignore the feature. However it's definitely worth checking if alternate versions of your chosen font support the feature or if you are in the design phase considering how you want numbers represented and choosing fonts which support those methods. 