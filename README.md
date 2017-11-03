# What's render-blocking?

...and how to avoid it


> ## Do you have this problem?


## assumptions:

## server-side rendering
## let's focus on CSS


![](img/back-in-time.gif)


## PageSpeed Insights

![](img/pagespeed.png)


![](img/minify.png)

cache headers + no redirects, etc


## Then we saw this...

![](img/pagespeed-problem.png)


## These days: Lighthouse

![](img/lighthouse-problem.png)


# What's blocking what?

TODO


# Why fix this?


<img style="width: 80vw;" src="img/mobile-throw.gif">


# How?

* inline critical CSS - critical: above the fold
* async load non-critical CSS


# DEMO


## let's find an example

[Before](https://csabapalfi.github.io/whats-render-blocking/example/original/)


[After](https://csabapalfi.github.io/whats-render-blocking/example/original/)


## Gotchas

* it's not just about rendering - are things interactive?
* preload has to be polyfilled - only Chrome/Edge/(FF58)
* what about below the fold? users scrolling?
* where is the fold? 
* don't use @import statements in critical CSS as that'll also trigger additional HTTP requests.
* inlining too much CSS


> ## Should've been a blog post?

## [It is!](https://csabapalfi.github.io/eliminate-render-blocking/)


# Thanks! Questions?

