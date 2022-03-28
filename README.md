# About

My personal website built with [jekyll](https://jekyllrb.com)
hosted by [GitHub Pages](https://pages.github.com/).

# Dependencies

- ~~[Bootstrap 4](https://getbootstrap.com) mostly for the grid~~
  Implemented my own responsive design (which is continuous unlike Bootstrap's grid).
- ~~[Font Awesome 5](https://fontawesome.com/) for social icons~~
  Using GitHub's [Feather SVG Icons](https://feathericons.com/) which load faster.
- ~~jQuery & Popper for forked components (my own components are written in vanilla js)~~
  Reimplemented those components in pure Javascript.
- ~~[highlight.js](https://highlightjs.org/) and [MathJax](https://www.mathjax.org/)
  for the incoming blog~~ I'd rather import it for the blog subdomain when it comes.
- [Google Fonts](https://fonts.google.com/): practical and fast. 

No more bloated dependencies, performance is better, and I have more control.
*I am big boy now.*

# Theme

## Color Scheme:

![terminology](https://visme.co/blog/wp-content/uploads/2016/09/website23-1024x512.jpg)

## Fonts:

Using web fonts from Google, with [best practices for fonts](https://web.dev/font-best-practices/)
in mind to optimize performance.

- **Sans serif:** [Lato](https://fonts.google.com/specimen/Lato) by Łukasz Dziedzic
- ~~**Serif:** [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab) by Christian Robertson~~
- **Monospace:** [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) by Christian Robertson

# Jekyll Plugins

This website does not *depend* on any plugins to work.

Nevertheless, I have configured and tested
[jekyll-minifier](https://github.com/digitalsparky/jekyll-minifier) locally
for minifying JS and HTML, I think it's excellent.
Unfortunally, GitHub Pages does not build sites using
"[unsupported plugins](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins)"
so in order to use third-party plugins, one must build the site locally
then deploy the static files to GitHub (the process can be automated).

That being said, I will probably end up doing so, but I can do without it for now.

# Forking

This repo is under the MIT License, you can use any of its components
as long as you acknowledge its authors.

I have forked the following components from [CodePen](https://codepen.io/),
if you want to use them please also give them credit.
- ~~**Accordeon:** jQuery from [Accordeon](https://codepen.io/axelf/pen/jPNmYP) by Alex @axelf~~
  although the implementation was flawless, I reimplemented it in pure JS to ditch jQuery.
- **Tabs:** SCSS from [Tabs Vertical Dark](https://codepen.io/bchiang7/pen/mjzMbj)
  by Brittany Chiang @bchiang7

Also, I'm pretty proud of my SVG Fourier epicycles animation,
I did it with [Vanilla JS](http://vanilla-js.com/) to optimize its speed,
so please give me credit if you use it in your work.
I'm probably going to open up a repo for it.

# To-Do List
- [x] Ditch bloated libraries
- [x] Minify JS and HTML 
- [x] Responsive font sizes
- [ ] Fix epicycles sketch (position, slider, etc)
- [x] Tidy up sass code
- [ ] Prepare blog