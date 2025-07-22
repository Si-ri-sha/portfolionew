let baseX, baseY;
let rotation = 0;

function setup() {
  let canvas = createCanvas(180, 180);
  canvas.parent('flower-canvas');
  baseX = width / 2;
  baseY = height / 2;
  angleMode(DEGREES);
  clear();
}

function draw() {
  clear();
  push();
  translate(baseX, baseY);
  rotate(rotation);
  drawFlower();
  pop();
  rotation += 0.2; 
}

function drawFlower() {
  noStroke();

  fill('#b74b4b');
  circle(0, 0, 40);

  fill('#b74b4b');
  let petalLength = 60;
  let petalWidth = 30;
  for (let angle = 0; angle < 360; angle += 45) {
    push();
    rotate(angle);
    ellipse(0, -50, petalWidth, petalLength);
    pop();
  }
}

function windowResized() {
  resizeCanvas(180, 180);
  baseX = width / 2;
  baseY = height / 2;
}

document.addEventListener('DOMContentLoaded', function() {
  function setStaggeredDelays(selector, baseDelay) {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.style.setProperty('--stagger-delay', (baseDelay + i * 120) + 'ms');
    });
  }
  setStaggeredDelays('.service-box', 0);
  setStaggeredDelays('.project-row', 0);

  const fadeEls = document.querySelectorAll('section, .project-row, .service-box, .edu-box, .exp-box, #skills li');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));

  const typingSpan = document.querySelector('.typing-text span');
  if (typingSpan) {
    const words = ["Software Developer", "Web Developer", "Junior Developer", "Engineer", "Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;
    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 400);
        } else {
          setTimeout(type, 40);
        }
      } else {
        typingSpan.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
          isDeleting = true;
          setTimeout(type, 900);
        } else {
          setTimeout(type, typingSpeed);
        }
      }
    }
    type();
  }

  function addRippleEffect(selector) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = (e.clientX - rect.left - rect.width/2) + rect.width/2 + 'px';
        ripple.style.top = (e.clientY - rect.top - rect.height/2) + rect.height/2 + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
  addRippleEffect('.btn');
  addRippleEffect('.contact-button');
});

(function() {
  const canvas = document.getElementById('code-bits-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.addEventListener('resize', resize);
  resize();

  const symbols = ['{}', '</>', ';', '()', '[]', 'if', '=>', 'let', 'const', '&&', '||', '===', '!==', 'for', 'while'];
  const colors = ['#2a3a60', '#3bbfa3'];
  const font = '1.1rem Fira Mono, Menlo, Monaco, monospace';
  const BIT_COUNT = Math.floor(w / 90) + 8;

  function randomBit() {
    return {
      text: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 0.24, 
      dy: 0.16 + Math.random() * 0.24,  
      size: 18 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.10 + Math.random() * 0.13,
      life: 0,
      maxLife: 400 + Math.random() * 400
    };
  }
  let bits = Array.from({length: BIT_COUNT}, randomBit);

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let bit of bits) {
      ctx.save();
      ctx.globalAlpha = bit.alpha * (1 - bit.life / bit.maxLife);
      ctx.font = `bold ${bit.size}px Fira Mono, Menlo, Monaco, monospace`;
      ctx.fillStyle = bit.color;
      ctx.shadowColor = bit.color;
      ctx.shadowBlur = 8;
      ctx.fillText(bit.text, bit.x, bit.y);
      ctx.restore();
      bit.x += bit.dx;
      bit.y += bit.dy;
      bit.life++;
      if (bit.y > h + 40 || bit.life > bit.maxLife) {
        Object.assign(bit, randomBit(), {y: -20, x: Math.random() * w});
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
