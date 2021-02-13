---
title: ''
subtitle: ''
description: ''
type: 'home'
featured_image: /images/kpw-studio.png
---

<div class="gallery" data-columns="1">
  {% for image in site.data.work.featured %}
    <img src="/images/{{ image.src }}" alt="{{ image.title }}">
  {% endfor %}
</div>