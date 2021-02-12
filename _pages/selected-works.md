---
title: ''
subtitle: ''
description: ''
featured_image: /images/kpw-studio.png
---

{% assign featuredImg = site.data.work.featured %}
{% assign selectedImg = site.data.work.selected %}
{% assign images = selectedImg.images | concat: featuredImg.images | concat: selectedImg.images2 %}

<div>
  {% for image in images %}
    <img src="/images/{{ image.src }}" alt="{{ image.title }}">
  {% endfor %}
</div>