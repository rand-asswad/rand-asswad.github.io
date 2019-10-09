---
layout: home
title: "Rand Asswad"
---

{% assign sorted_sections = site.sections | sort: 'order' %}
<div id="fullpage">
    {% for section in sorted_sections %}
	    <div class="section" id="section{{ section.order }}">{{ section.content | markdownify }}</div>
    {% endfor %}
</div>