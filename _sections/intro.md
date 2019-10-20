---
name: Introduction
order: 1
bgcolor: "#00004d"
active: true
---


<div class="row align-items-center">
    <div class="col-md-6 order-md-2 text-center" id="sketch-holder"></div>
    <div class="col-md-6 order-md-1 text-center d-flex flex-column">
        <div class="p-2">
            <h1 class="cabin-sketch" style="font-size: 70px; color: #FFF;">Hi, I'm Rand!</h1>
        </div>
        <div class="p-2">
            <p style="color: #FFF;">A few things about me.</p>
        </div>
        <div class="p-2">
            <a href="mailto:{{ site.data.contact.email }}" class="fa-btn">
                <i class="far fa-envelope"></i>
            </a>
            <a href="https://github.com/{{ site.data.contact.github }}" target="_blank" class="fa-btn">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/{{ site.data.contact.linkedin }}" target="_blank" class="fa-btn">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="/assets/cv-fr.pdf" target="_blank" class="fa-btn">
                <i class="far fa-file-pdf"></i>
            </a>
        </div>
    </div>
</div>

<script>
    var p = sketchFourier("/assets/fourier/me.csv", "sketch-holder", 3);
    p.bgColor = "{{ page.bgcolor }}";
    p.pathColor = "#FFF";
    p.cyclesColor = "#555";
    p.vectorsColor = "#999";
</script>