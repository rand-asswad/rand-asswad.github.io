#! /usr/bin/env Rscript

args = commandArgs(trailingOnly = TRUE)

library(knitr)
library(rmarkdown)
library(readr)

opts_chunk$set(fig.path = 'assets/knitr_figures/')
opts_chunk$set(fig.pos = 'H')
opts_chunk$set(out.width = '70%')
opts_chunk$set(comment = NA)

format = html_fragment(self_contained = TRUE)

for (rmd in args) {
    #knit(rmd)

    print('Extracting YAML for Jekyll...')
    yml = yaml::as.yaml(yaml_front_matter(rmd))
    yml = paste0('---\n', yml, '---\n')

    print('Rendering HTML document...')
    html = paste(tools::file_path_sans_ext(rmd), 'html', sep='.')
    render(rmd, format, output_file=html, quiet = TRUE)

    print('Prepending HTML with Jekyll YAML...')
    content = paste0(yml, read_file(html), sep='\n')
    write_file(content, html, append = FALSE)

    print('Done!')
}