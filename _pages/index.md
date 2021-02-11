---
title: ''
subtitle: ''
description: ''
type: 'home'
images:
  - src: /images/2017-Collecting-Thoughts-and-Pieces.jpg
    title: Collecting Thoughts and Pieces
    year: 2017
    materials: Paper & acrylic on wood board
    dimensions: 48" x 48"
  - src: /images/2017-Flight.jpg
    title: Flight
    year: 2017
    materials: Paper & acrylic on wood board
    dimensions: 48" x 48"
  - src: /images/2017-Forge.jpg
    title: Forge
    year: 2017
    materials: Paper & acrylic on canvas
    dimensions: 48" x 72"
featured_image: /images/kpw-studio.png
---

<div class="gallery" data-columns="1">
  {% for image in page.images %}
    <img src="{{ image.src }}" alt="{{ image.title }}">
  {% endfor %}
</div>