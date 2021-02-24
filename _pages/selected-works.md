---
title: ''
subtitle: ''
description: ''
featured_image: /images/kpw-studio.png
type: works
---

<div class="selected">
  {% for image in site.data.work.selected %}
    <div class="imgs">
        <img src="/images/{{ image.src }}" alt="{{ image.title }}">
      <p>
        {{ image.title }}, {{ image.year }}<br>
        {{ image.materials }}, {{ image.dimensions }}
      </p>
    </div>
  {% endfor %}
</div>
