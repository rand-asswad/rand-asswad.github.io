# About

My personal website built with [jekyll](https://jekyllrb.com)
hosted by [GitHub Pages](https://pages.github.com/).

![demo](https://raw.githubusercontent.com/rand-asswad/rand-asswad.github.io/master/_src/assets/img/demo.png)

# Features

- A desktop-first responsive design
- Rich components:
  - SVG epicycles sketching a path (coordinates list)
  - Responsive tabs for small content (experience, projects)
  - Accordeon-styled section
  - Responsive nav menu
  - A simple loader
- SEO and [Open Graph](https://ogp.me/)
- GitHub's [Feather SVG Icons](https://feathericons.com/)
- No more bloated CSS/JS libraries! *I am big boy now.*
- Minified HTML, CSS, and JS

## Theme

### Color Scheme

![terminology](https://visme.co/blog/wp-content/uploads/2016/09/website23-1024x512.jpg)

### Fonts

Using [Google Fonts](https://fonts.google.com/),
with [best practices for fonts](https://web.dev/font-best-practices/)
in mind to optimize performance.

- **Sans serif:** [Lato](https://fonts.google.com/specimen/Lato) by Łukasz Dziedzic
- ~~**Serif:** [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab) by Christian Robertson~~
- **Monospace:** [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) by Christian Robertson

## Lighthouse report

A near perfect score on the [Lighthouse](https://github.com/GoogleChrome/lighthouse)
performance test!

![lighthouse](https://raw.githubusercontent.com/rand-asswad/rand-asswad.github.io/master/_src/assets/img/lighthouse_desktop_2022_03_29.png)

Full JSON report
[here](https://gist.githubusercontent.com/rand-asswad/37c5f8595a8e3e0000b5b73126198b2e/raw/cb47c8ee752a237a6f4f9641d86556ef9060d4f5/rand-asswad.xyz_2022-03-29_24-55-37.lighthouse.report.json)

I optimized performance as much as possible, ditched bloated libraries
I was using (Bootstrap, jQuery, FontAwesome, etc),
and tried my best to follow best practices.
I recommend reading guides from [web.dev](https://web.dev/).

This website has a desktop-first responsive design,
the Lighthouse performance test for the mobile version is in the 60s.

# GitHub Pages & Jekyll Plugins

I have finally opted for a CI to deploy to the `gh-pages` branch,
for the following reasons:

- To use third-party plugins (aka
  "[unsupported plugins](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins)")
- To update to Jekyll 4 (the `github-pages` gem have been stuck on 3.9 for years)
- To change my Jekyll source directory (yes, I'm one of those people)

## Continuous Integration (CI)

I use [GitHub Actions](https://docs.github.com/en/actions) as a CI tool
to build and deploy the Jekyll website on every push from my `master` branch.

I used [Jekyll Deploy Action](https://github.com/jeffreytse/jekyll-deploy-action)
for the Jekyll build/deploy action, check
[Jekyll's detailed guide on CI with GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/)
for more details or other choices.

## Plugins

This website does not *depend* on any plugins to work.
Removing the plugins from the `Gemfile` and `_config.yml`
would allow Jekyll to run smoothly.

Nevertheless, I am using [jekyll-minifier](https://github.com/digitalsparky/jekyll-minifier)
for minifying JS and HTML, I think it's excellent.

# Forking

## License

This repo is under the MIT License, you can use any of its components
as long as you acknowledge its authors.

I was inspired by many designs and elements on [CodePen](https://codepen.io/).
While I haven't forked/copied code, I have used designs from others,
notabely [Brittany Chiang](https://brittanychiang.com/)'s website.

Also, I'm pretty proud of my SVG Fourier epicycles animation,
I did it from scratch in [Vanilla JS](http://vanilla-js.com/) to optimize its speed,
so please give me credit if you use it in your work.
I'm probably going to open up a repo for it.

## Installation

After cloning the repository, make sure you have Ruby and RubyGems installed.
Check [official Jekyll guide](https://jekyllrb.com/docs/installation/).

I recommend installing [Bundler](https://bundler.io/).
Make sure you run these commands from the repository root directory.

```sh
gem install bundler
bundle install --path vendor
```
If the gems are successfully installed,
you should be able to run the website on a local web server
using the following command.

```sh
bundle exec jekyll serve --watch
```