---
title: Fixing layout shift with font-size-adjust
date: "2024-05-03"
summary: Layout shift due to fonts can have a big impact of the performance of your page, making use of font-size-adjust can help us to reduce the impacts of these discrepancies.
tags:
  - css
  - article
  - fonts
  - performance
  - layout
  - cls
featureFont: { image: /images/post-assets/fixing-fontsizeadjust/feature.jpg }
card:
  {
    cardImage: /images/post-assets/fixing-fontsizeadjust/card.jpg,
    cardAlt: Font Size Adjust,
  }
---

I recently wrote a post about the `ch` unit which was intended to be a small post about a fun css unit but I ended up writing way too much and talking about performance. It was getting a bit long and some of the techniques I was addressing are relevant separate to the issues of the `ch` unit so I split the post in two and here we are!

When it comes to working with fonts on the web the discrepancies between custom fonts and web safe fonts can cause us a bit of grief when it comes to loading. If you have a custom font whose characteristics vary greatly in comparison to your fallback font you can often find yourself in a situation where you are faced with a lot of layout shift impacting your web performance.

This is particularly important when you are using units like the`ch` unit (which you can read about at [Using the ch unit](/posts/ch-unit)) or other more flexible layout implementations. It's important to be mindful of the discrepancies between fonts, specifically you need to pay attention to your font stack and how the fonts load otherwise you might notice that as the page loads in and switches between fonts you're faced with noticeable layout shift which can cause significant performance issues due to the [cumulative layout shift](https://web.dev/articles/cls).

Let's take a look at an example using the `ch` unit, but keep in mind that this can also occur with other flexible layout implementations. The following CSS includes a font stack using two fonts with the fallback being a pretty generic, "Arial".

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
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/uW3GCKdcsnY?si=uW3GCKdcsnY?rel=0&amp;controls=0&amp;showinfo=0&amp;playlist=uW3GCKdcsnY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

In order to fix this you could consider using something like `size-adjust` in the `font-face` declaration - this might work well for flexible layout implementations but it wont accomplish what you want in our example with the `ch` unit because while it can adjust the size of the font it wont change it's properties (i.e. the `ch` width). Instead you can use the `font-size-adjust` property which [does not have great browser support](https://caniuse.com/?search=font-size-adjust), currently only working in Firefox and Safari. It does look to be on the roadmap for [Interop 2024](https://web.dev/blog/interop-2024) though so hopefully we'll be able to use it soon. In the mean time you can enable the flags in chrome, or test in Safari and Firefox.

## Fixing layout shift with font-size-adjust

What `font-size-adjust` provides is the opportunity to adjust the size of the font. This is very handy for adjusting the font size of fallback fonts to keep the sizing consistent across fonts. The result is that the text renders in a similar way regardless of what font is rendered.

> The font-size-adjust CSS property provides a way to modify the size of lowercase letters relative to the size of uppercase letters, which defines the overall font-size.

It has a number of values you can use, but for this example I am going to use the `ch-unit` combined with a number value. By using the value `ch-unit` we are saying we what to use the value of the `ch` unit in the first choice font to adjust the font size of the fallback font. If we combine it with a number we can say make it x size in comparison to the value of `ch`. The fallback we are using is 'Arial' which is a lot wider than Oswald so want to make it smaller, specifically `0.513`.

```css
font-size-adjust: ch-width 0.513;
```

This will match the fonts pretty closely in width and resolve the horizontal layout shift making things a lot less janky and improving the performance.

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/TO7xAZs1hWQ?si=TO7xAZs1hWQ?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=TO7xAZs1hWQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

Depending on your font combinations this could resolve your issues without need for further intervention. However you'll notice in our example, while we have resolved the horizontal shift we still have a vertical shift. At this point you could experiment with other values of `font-size-adjust` to play around with sizing to see if you can get a better match than using `ch-width` or you can combine it with another strategy.

In my example I will resolve this by adjusting the `line-height`and `letter-spacing` for the fallback and then removing the styles once the font has loaded.

## Adjusting fallback font CSS

By adjusting the `line-height` and `letter-spacing` of the fallback font I can get a much closer match with my fonts essentially removing the layout shift all together.

![Image shows overlay comparison of fallback font adjusted and not adjusted](/images/post-assets/chunit/overlay-comparison.jpg)

The above image demonstrates how I worked out what I needed, basically I just overlaid a copy and manually adjusted until it fit. Our CSS might look something like the following code where we apply the `letter-spacing` and `line-height` to the selector of our choice and then we reset them when our custom font is loaded.

```css
article {
  max-width: 60ch;
  font-family: "Oswald", "Arial", sans-serif;
  font-size-adjust: ch-width 0.513;
  letter-spacing: -0.096ch;
  line-height: 1.14;
}

article.font-loaded {
  letter-spacing: 0;
  line-height: unset;
}
```

Once you have done the tedious work of working out the values you need you can make use of the [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) to check when the custom font has loaded.

```js
const font = new FontFace("Oswald", "url(Oswald-VariableFont.woff2)");

document.fonts.add(font);
font.load();

const article = document.getElementById("article");

document.fonts.ready.then(() => {
  article.classList.add("font-loaded");
});
```

This will then apply our "loaded" state to the content and unset our styling for the fallback font. The result is that even though we are switching the font, the page layout does not shift improving the cumulative layout shift and as a result the performance of our page.

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/u_UD2ijtPsQ?si=u_UD2ijtPsQ?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=u_UD2ijtPsQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

I haven't come across a tool yet for making the task of working out the values for `font-size-adjust` easier (perhaps I should add that to the TODOs), but for `line-height` and `letter-spacing` you can check out [Font style Matcher](https://meowni.ca/font-style-matcher/) by [Monica Dinculescu](https://twitter.com/notwaldorf).

You might be thinking this is a lot of work to do, but making these kinda of adjustments can make significant improvements to your performance. If you're finding you have a lot of layout shift caused by fonts implementing a strategy like this will make big improvements to the page.
