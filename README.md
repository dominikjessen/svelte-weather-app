# Sveltekit Weather App

A very simple app to get the weather using openmeteo's API built with Sveltekit and deployed using Vercel.

[Check out the live app here](https://svelte-weather-app-eight.vercel.app/)

## Other implementations

- [Vue (Nuxt)](https://github.com/dominikjessen/nuxt-weather-app)
- [React (Remix)](https://github.com/dominikjessen/remix-weather-app)
- [React (Next)](https://github.com/dominikjessen/next-weather-app)

## About this app

This small weather app is part of a series of apps I've built to explore Remix, Nuxt, and Svelte. I mainly build projects using NextJS normally, so out of curiosity I wanted to see how these other frameworks handle things. The remaining parts of the app like weather data API and designs are the same across all of them. This one specifically is built using Sveltekit.

## Things I like about Svelte at first glance

What I mainly enjoyed about Svelte is how non-verbose it is compared to React on the TypeScript side. Reactive variables are simply a case of defining them and using them in the markup. Not having to deal with state setting means you escape some of the problems that come with it (e.g. having to reach for state management tools or useEffect in React). Makes things very readable and even more like you're writing JS/TS and not framework code.

I also think binding variables is a very elegant way of dealing with changes from controlled elements on the client side no matter whether it's in child, sibling or parent components. Same with making components rerender reactively depending on changed data using a simple $ - it's very clean in my opinion (even though it does feel a bit like black magic and probably has caveats to look out for in more complex apps).

Just like Remix, Sveltekit takes a loader approach for server-side stuff, which I generally like and creates good encapsulation.

The fact that this was the first time I ever touched Svelte and I could immediately figure it out in one afternoon is pretty neat. I think they created a relatively intuitive framework here and once you figure out the main things - like how to make data reactive to trigger rerenders, handle user input and how adding `export` turns variables into props - you can get rolling really fast and everything just... works

## Things I dislike about Svelte at first glance

As a fan of JSX, simply having a code block in your markup and running .map() on an array is pretty neat to me, or simply having a ternary for rendering the correct thing. Because of that, Svelte's `{#each}{/each}`, `{#if}{/if}` etc. seems a little weird to me. I think I do like it more than having custom things like Vue or Angular do though as it visibly stands out from the markup.

One thing that was harder to deal with using Svelte than Remix was typing things. Making sure to remember to add `lang="ts"` is not a massive issue, but I did have to fiddle with the load function until I realized it actually implicitly types it on its own.

Also, the fact that there's a known issue with the ESLint extension on VSCode throwing an error for the app.html's doctype declaration is a bit maddening.
