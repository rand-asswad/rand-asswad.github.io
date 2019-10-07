---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: "Rand Asswad"
---

# Contact
- {{ site.data.contact.email }}
- github.com/{{ site.data.contact.github }}
- linkedin.com/in/{{ site.data.contact.linkedin }}

# Education

{% for e in site.data.education %}
- **{{ e.school }} - {{ e.degree }}** (*{{ e.begin_date }} - {{ e.end_date }}*)

{{ e.description }}
{% endfor %}

# Experience

{% for w in site.data.experience %}
- **{{ w.company }} - {{ w.title }}** (*{{ w.begin_date }} - {{ w.end_date }}*)

{{ w.description }}
{% endfor %}
