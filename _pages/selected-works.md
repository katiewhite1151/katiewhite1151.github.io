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
    <div class="imgs">
        <img src="/images/{{ image.src }}" alt="{{ image.title }}">
      <p>
        {{ image.title }}, {{ image.year }}<br>
        {{ image.materials }}, {{ image.dimensions }}
      </p>
    </div>
  {% endfor %}
</div>
