---
title: Using the ch unit
date: "2024-05-03"
summary: What is the CSS 'ch' unit and how can you use it on the web with text, how does it differ from other length units?
tags:
  - css
  - article
  - ch
  - units
featureFont:
  image: /images/post-assets/chunit/feature.jpg
card:
  cardImage: /images/post-assets/chunit/card.jpg
  cardAlt: The ch unit
---

There are a lot of CSS length units to use you are probably most familiar with things like percentage, `px`, `rems` and `ems`and maybe you weren't even aware that the `ch` unit existed, or how you could use it. I recently updated a text effect demo, [Flickering Neon Glow Text Effect](https://texteffects.dev/posts/flickering-text-effect) over on [texteffects.dev](https://texteffects.dev), to switch from using percentages to the `ch` unit for offset, so I thought it would be a good time to write a little post about this wonderful unit and some ways you can use it. (Note: this started off as a little post and ended up as a not so little post, turns out I had a lot more to say than I thought).

What is the `ch` unit? Firstly it's a relative length unit, which just means it's relative to the size of something else. The official [MDN definition](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units) is as follows

<blockquote>
    The advance measure (width) of the "0" glyph of the element's font.
</blockquote>

Basically means it's equal to the width of the '0' glyph of the font that you are rendering. When it comes to a monospaced or fixed-width font where all the characters are the same width it means that the `ch` unit represents the width of every character. However, in proportional fonts the widths of the characters vary, so the `ch` unit may have no relation to the width of the other characters aside from the `0` glyph.

Before I get into what some might consider a more "practical" use case for the `ch` unit, I wanted to look at the reason I wrote this article in the first place. Using the `ch` unit with monospaced/fixed width fonts for text effects.

There are a lot of text effects where you might want to change just one letter, but handling this can be difficult especially if you want to add layers. This can be a challenge because of the proportional fonts and the difference in width between characters, aligning things can be hard and require a bit of finesse. With fixed width fonts that's not an issue so you can make use of the `ch` unit to perfectly align layers of text without much difficulty. A recent example was the [Flickering Glowing Text Effect](https://texteffects.dev/posts/flickering-text-effect) I wrote about on [TextEffects.dev](https://texteffects.dev) where I used a monospaced font and the `ch` unit to align a flickering "i" over what appeared to be fading out text.

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="Flickering text effect" src="//codepen.io/mandymichael/embed/aJLYVz/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>

When you're creating things like this with CSS it's really handy to be across the different length units to help you with placement and control. Without the `ch` unit this requires a lot more manual "magic" numbers, which isn't a big deal if the text is not going to change, but if you want to be able to control it programatically using a monospaced font with the `ch` unit makes it significantly easier.

Rather than having to manually figure it out you can do something like the following where you can use a custom variable to pass in the number of letters to offset by and it will calculate perfectly where it needs to sit. The same applies if you apply `letter-spacing` or other offsets with the `ch` unit, because the width of the characters is all the same it's much easier to position.

```css
span {
  --offset: 2;
  left: calc(var(--offset) * 1ch);
}
```

Another one of the primary ways in which you can make the most of the `ch` unit is by reducing line length to improve readability. Doing [a bit of research](https://en.wikipedia.org/wiki/Line_length) you'll find that the optimal line length is somewhere between 40-75 characters (this can vary across resources. The range exists because it will vary between fonts as some fonts are wider or narrower than others so you might need to experiment a little bit with what works for you).

![Line length example](/images/post-assets/chunit/linelength.jpg)

**Figure: By Jrinkerdesign, [Wikimedia](https://commons.wikimedia.org/w/index.php?curid=40189298)**

Having your line lengths be too long or too short can hurt the readability of your content. If it's too long it can look overwhelming and become hard to focus; the research suggests that your focus actually dwindles the longer a line is. On the other hand if it's too short people often start reading the next line before they have even finished the first. Original research was conducted by Emil Ruder, a mid-twentieth century Swiss graphic designer, and while some argue the differences in medium between web and print impact the results, typically it stands up pretty well in most scenarios.

The intention of setting the length based on character width is to ensure you're maintaining a specific line length, regardless of font size. If you set a `max-width: 250px` then the length of your line will vary depending on the size of your font, the larger the font, the less characters will fit. However, if you set the width with the `ch` unit you're saying you want the width to match the width of the 0 character in the font, meaning the container will adjust accordingly to meet this condition.

If you take a look at the demo below you'll see that using the `ch` unit will result in the line being 60 characters wide regardless of size; the text is exactly the same just smaller or larger. In comparison to the example with a `px` width where the text is different depending on the size.

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="CodePen Home
Honk Variable Font Demo" src="//codepen.io/mandymichael/embed/wvZPwma/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>

However this really only works with monospaced/fixed fonts where the characters are of equal width. In the case of a proportional font, because the characters are not equal width the length wont necessarily be 25 characters wide; it will be as wide as the width of 25 zeros for that font.

In the example below, you can see some examples across proportional and monospaced fonts. I've set it to `20ch` for demonstration purposes. In a proportional font some characters are typically wider than others, for example in the latin alphabet characters like a "w" or an "m" are wider than an "i" or a "t". As a result number of characters you can fit on a line reduces.

<div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="CodePen Home
Honk Variable Font Demo" src="//codepen.io/mandymichael/embed/xxePKaz/?height=300&theme-id=dark&default-tab=result" frameBorder="no"  allowfullscreen="true">
</iframe></div>

As you can see this is going to vary significantly between fonts, and will be impacted based on the actual text you have on the page. The `ch` unit is great, but make sure you're considered in your approach to using it and understand that it isn't as straightforward as "make it 60 characters long".

## Discrepancies between fonts

When using the `ch` unit you must be mindful of the discrepancies between fonts, specifically you need to pay attention to your font stack and how the fonts load. When you determine layout based on the characteristics of the font you're opening yourself up to some challenges, especially when your font loading strategy has you switching between fonts which have comparatively different characteristics. You're going to notice some shift, and as a result you might cause some significant performance issues due to the [cumulative layout shift](https://web.dev/articles/cls).

Let's take a look at an example with the following CSS, it includes a font stack using two proportional fonts with the fallback being a pretty generic, "Arial".

```css
@font-face {
  font-family: Oswald;
  src: url("Oswald.woff2");
  font-display: swap;
}

article {
  max-width: 60ch;
  font-family: Oswald, Arial, sans-serif;
}
```

What you might see happen in your layout is the following.

1. You load your page using one of the fallback fonts in your font stack, it loads Arial. The `ch` unit is based on the width of the "0" in the Arial font.
2. Your web font loads (in our case, Oswald) and it gets swapped in to replace the fallback. Now the `ch` unit is based on the 0 in 'Oswald'.
3. The switch in font, changes the width because the width of the `ch` unit in Arial font is greater than the `ch` unit of Oswald. Resulting in a layout shift.

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/uW3GCKdcsnY?si=uW3GCKdcsnY?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=uW3GCKdcsnY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

For support right now, you're best option is to not use the `ch` unit if you are experience serious layout shift. Using something like `size-adjust` in the `font-face` declaration wont accomplish what you want because while it can adjust the size of the font it wont change it's properties (like the `ch` width). Instead you need to use the `font-size-adjust` which [does not have great browser support](https://caniuse.com/?search=font-size-adjust), currently only working in Firefox and Safari. It does look to be on the roadmap for [Interop 2024](https://web.dev/blog/interop-2024) though so hopefully we'll be able to use it soon. In the mean time you can enable the flags in chrome, or test in Safari and Firefox.

If you want to know more about how to Fix the Layout using `font-size-adjust` you can read about that in my follow up article [Fixing Layout Shift with font-size-adjust](/fixing-layout-shift-with-font-size-adjust).

Regardless of these issues the `ch` unit its still a really useful tool that we can make the most of in CSS, but like anything it's important to understand it's impacts to the page. So use it! But use it wisely and be considered in your applications.
