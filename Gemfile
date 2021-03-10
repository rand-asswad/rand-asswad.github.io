source "https://rubygems.org"

# jekyll / github pages
# github-pages 212 is equivalent to jekyll 3.9.0
# gem "jekyll", "~> 3.9.0", group: :jekyll_plugins
gem "github-pages", "~> 212", group: :jekyll_plugins

# Windows and JRuby does not include zoneinfo files, fix:
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?