---
title: ''
subtitle: ''
description: ''
featured_image: /images/kpw-studio.png
type: works
---

{% assign selectedTop = site.data.work.selectedTop %}
{% assign featured    = site.data.work.featured    %}
{% assign selectedBtm = site.data.work.selectedBtm %}

{% assign images = selectedTop | concat: featured | concat: selectedBtm %}

<div class="selected">
  {% for image in images %}
    <img src="/images/{{ image.src }}" alt="{{ image.title }}">
  {% endfor %}
</div>