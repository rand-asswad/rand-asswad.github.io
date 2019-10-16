---
layout: home
title: "Rand Asswad"
---

{% assign sorted_sections = site.sections | sort: 'order' %}
<div id="fullpage">
    {% for section in sorted_sections %}
        {% if section.active %}
            <div class="section" id="section{{ section.order }}" style="text-align: center;">
                {{ section.content }}
            </div>
        {% endif %}
    {% endfor %}
</div>