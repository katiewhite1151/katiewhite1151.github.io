---
title: ''
subtitle: ''
description: ''
featured_image: /images/kpw-studio.png
type: works
---

{% assign featured = site.data.work.featured %}
{% assign selected = site.data.work.selected %}
{% assign images = selected.images | concat: featured.images | concat: selected.images2 %}

<div class="selected">
  {% for image in images %}
    <img src="/images/{{ image.src }}" alt="{{ image.title }}">
  {% endfor %}
</div>