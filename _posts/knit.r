#! /usr/bin/env Rscript

args = commandArgs(trailingOnly = TRUE)

library(knitr)

opts_chunk$set(fig.pos = 'H')
opts_chunk$set(comment = NA)

for (rmd in args) {
    knit(rmd)
    #rmarkdown::render(rmd, 'html_fragment')
}