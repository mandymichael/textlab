---
title: Text Transition with View Transitions
date: '2024-03-01'
summary: The View Transition API enables animated transitions between two page states. Available in Chrome 111+ I had a play with it to see if I could make some fun text based transitions.
tags:
    - article
    - viewtransition
    - animation
featureFont: { 
    image: /images/post-assets/viewtransition/viewtransition-feature.jpg,
    imageAlt: View Transition mid state half green half yellow with the text Oh The Drama
}
card: {
    cardImage: /images/post-assets/viewtransition/viewtransition-card.jpg,
    cardAlt: View Transition mid state half green half yellow with the text Oh
}
---

A View Transitions post? Is this Text Lab or what? Well, to be honest I wanted to have a play with it and I thought maybe I could repurpose one of my text effects to make a cool page transition using a text effect, so that is what I have done! Please keep in mind that the browser support for this is not great, it's currently only available in Chrome 111+ and Edge so this is very new and experimental.

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/FSq5lqm1Ch0?si=uc3xb5VVDaFkvrbv?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=FSq5lqm1Ch0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

First up, I want to say that for basic page transitions, it's super easy. You don't need JavaScript at all to get started. I think the bit that I struggled with the most was thinking about my effect as separate parts not as one thing on the page which is what I'm used to doing.

Before we get started, you can skip all this rambling and [View the Demo](https://000699422.codepen.website/) or Check out the [Project on Codepen](https://codepen.io/mandymichael/project/editor/AOvxRk#).

I started off using a Codepen Project for [the demo](https://000699422.codepen.website/) so that I could created two separate pages. Then on each of the HTML pages I added in the view transition meta tag. This is required for the transitions to work so don't forget it.

```html
  <meta name="view-transition" content="same-origin" />
```

After that I copied an old text effect into the page but split it in two, so rather than it being layers it was two separate parts. The first page I added the following for the page content.

```html
 <h1 class="page1">Oh The Drama</h1>
```

And then for the second page I added another `h1` with similar but slightly different text. These bits of HTML are important as they show where I add the specific CSS for the transition.

```html
 <h1 class="page2">Oh The Llama</h1>
```

I then added all the CSS in for styling the text, which isn't really that important for the purposes of the view transition but if you're interested you can take a look at the [CSS in the Project on Codepen](https://codepen.io/mandymichael/project/editor/AOvxRk#). What is important is the view transition pseudo element and the view transition name. For this to work for my effect I added the `view-transition-name` property to the `h1` on my first page (`.page1` in the CSS), with the value of `title` - it can be whatever you want though, just remember it for later.

```css

.page1 {
	view-transition-name: title; 
}


```

Then we need to add the pseudo element in so I can create the animation, I used `::view-transition-old(title)`. Many of the demos have this using both `::view-transition-old` and `::view-transition-new`, I found for my effect I didn't want that as I wasn't cross fading, or requiring both bits of content to transition, so I only applied it to the "old" state. The `::view-transition-old` pseudo-element refers to the "old" view state of a view transition, so basically the starting point before the "new" state comes in. This is where I added my animation so that I could, essentially, animate it "out".

```css 
::view-transition-old(title) {
	animation: spin 2s linear;
}
```


The animation aspect just works the same way that it does for regular animations, I used clip path to "reveal" the text on the new page. It works pretty similar to the original text effect except instead of having it just spin in place I had it spin in and out. 

```css
@keyframes spin {
    0% {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)
    }
    20% {
        clip-path: polygon( 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%);
    }
    20.01% {
        clip-path: polygon( 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%);
    }
    40% {
        clip-path: polygon( 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%);
    }
    40.01% {
        clip-path: polygon( 100% 100%, 0% 100%, 0% 100%, 0% 0%, 0% 0%);
    }
    60% {
        clip-path: polygon( 0% 100%, 0% 100%, 0% 0%, 0% 0%, 100% 0%);
    }
    60.01% {
        clip-path: polygon( 0% 100%, 0% 0%, 0% 0%, 100% 0%, 100% 0%);
    }
    80% {
        clip-path: polygon( 0% 0%, 0% 0%, 100% 0%, 100% 0%, 100% 100%);
    }
	100% {
		clip-path: polygon(100% 0%, 0% 0%, 100% 0%, 100% 0%, 100% 100%);
	}
}
```

This creates the animation effect of the text being "revealed" I really liked how it works.

As an aside, if you will allow me, it would  be great if Chrome had the shape/path editor in dev tools like Firefox has so that I could more easily edit my clip-path in the browser for this effect, but unfortunately it does not.

I also ended up adding in the `view-transition-name` on the `:root` element, as this prevented the default animation from happening on my root because I didn't want it!

```css
:root {
  view-transition-name: none;
}
```

The main issue that I encountered was that if you want any kind of control over when and how the animation occurs you have to use the JS API (which is understandable, it's just not as straightforward as using the CSS implementation). This isn't that dissimilar from regular CSS animations, they do have limitations, and controlling things like specific start and end moments, or whether it occurs on page load/refresh does require more input via JS.  I also found that __sometimes__ but not always the transition would run on page load of the first page, I couldn't get this to occur consistently though?

Additionally from what I can tell (please correct me if i'm wrong) if you are using a multi page site using the JS API seems like it might be more difficult than if you are using a SPA. It does look possible but it looks like you need to manually update the DOM somehow with JS  and this feels like a bit of a pain? I'll have to spend some more time experimenting with the JS API to really give it a full assessment, but as it stands the CSS implementation is pretty good. I enjoyed having a play and I'm keen to see how people utilise it in future, but it seems like it might be limited to SPAs for now if you want anything more complicated.

[View the Demo](https://000699422.codepen.website/) or Check out the [Project on Codepen](https://codepen.io/mandymichael/project/editor/AOvxRk#).

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/FSq5lqm1Ch0?si=uc3xb5VVDaFkvrbv?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=FSq5lqm1Ch0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>