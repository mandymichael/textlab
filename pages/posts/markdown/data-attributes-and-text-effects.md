---
title: You shouldn't use data-attributes for text effects
date: '2024-03-13'
summary: Data-attributes are a simple and easy way to create layers for text effects on the web, but they are problematic for accessibility.
tags:
    - accessibility
    - article
    - texteffects
featureFont: {  
    image: /images/post-assets/data-attributes/dataattributes-feature.jpg
}
card: {
    cardImage: /images/post-assets/data-attributes/dataattributes-card.jpg,
    cardAlt: Examples of CSS Text Effects,
}
---

As a lover of CSS Text Effects I love seeing posts and demos showing fun and cool text effectss, but I wanted to do a quick post on the technique of using `data-attributes` and the CSS `content` property to create layers and why I wouldn't recommend it.

I'll be the first to admit, I used to do this, in fact, some of my [Text effect demos](https://codepen.io/collection/DamKJW) still use this technique (I'm in the process of updating them). I even [did a talk about it way back in 2018](https://www.youtube.com/watch?v=5qgUC_z8syw&list=PLo3w8EB99pqLQj3cOk2UCjA8szdseqs7b). But here is the thing, it's not great for accessibility and I regret using this approach. 

The technique is fairly simple, instead of having multiple HTML elements on the page, you can use one and then add a `data-attribute` with a copy of that text.

```html
<h1 data-text="Jello">Jello</h1>
```

From here we can then use CSS `pseudo-elements` and the `content` property to create an additional layer, this will add a copy of that text in our page and give us the ability to style it however we want. 

```css
h1::before {
    content: attr(data-text);
}
```

This technique is used primarily to create layers for creating effects as you can stack copies on top of each other without the need for multiple HTML elements. This seems great, because it keeps our HTML cleaner and simpler. But the problem with this is that some Screen Readers and other assistive technology will read out the text from the `data-attribute` used in CSS Content, which means users get the "joy" of listening to the text multiple times. Take the example video below, this demo has one `h1`, a `data-attribute` and two `pseudo-elements` with `content` property referencing the `data-attribute`. It's using Macs Voiceover Screen Reader. 

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/Btd5bOu_H6A?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=Btd5bOu_H6A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

The screen reader reads "Heading Level 1, 3 items, candy candy candy", which is super annoying. The whole point of using `data-attributes` and the `content` property is to create one element of text. That this does not apply for assistive tech means it is not working as intended.

So, instead, I create multiple HTML elements and use the `aria-hidden` attribute to ensure the copies are not read by a screen reader, and then style accordingly. I usually nest them because it makes layering a bit easier, but you don't necessarily have to do that.

```html
<h1>
    Jello
    <span class="layer1" aria-hidden="true">Jello</span>
    <span class="layer2" aria-hidden="true">Jello</span>    
</h1>
```

This results in a much better functional user experience whether you are using assistive technology, or not. So unless it is decoration and ignored by the accessibility tree I strongly encourage you to avoid the use of `data-attributes` and CSS `content` property for text that you intend for people to read, and instead make copies and use `aria-hidden` to hide them. 

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/EZArSux7zGY?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=EZArSux7zGY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

I am sorry for all my Codepen's that show the `data-attribute` approach, I promise to update them. 


