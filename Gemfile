source "https://rubygems.org"

# jekyll / github pages
# github-pages 204 is equivalent to jekyll 3.8.5
# gem "jekyll", "~> 3.8.5", group: :jekyll_plugins
gem "github-pages", "~> 204", group: :jekyll_plugins

# jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.13.0"
end

# Windows and JRuby does not include zoneinfo files, fix:
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?