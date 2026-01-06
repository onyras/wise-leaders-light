const cx = 300, cy = 300;
const maxRadius = 210;

const dimensions = [
    { label: 'Clarity', before: 0.4, after: 0.88 },
    { label: 'Resilience', before: 0.35, after: 0.82 },
    { label: 'Presence', before: 0.45, after: 0.9 },
    { label: 'Recovery', before: 0.3, after: 0.78 },
    { label: 'Focus', before: 0.5, after: 0.85 },
    { label: 'Connection', before: 0.38, after: 0.84 },
    { label: 'Energy', before: 0.42, after: 0.86 },
    { label: 'Balance', before: 0.33, after: 0.8 },
    { label: 'Purpose', before: 0.48, after: 0.92 },
    { label: 'Growth', before: 0.36, after: 0.87 }
];

const n = dimensions.length;

function getPoint(index, value) {
    const angle = (index / n) * Math.PI * 2 - Math.PI / 2;
    const r = value * maxRadius;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

function generatePath(values) {
    const points = values.map((v, i) => getPoint(i, v));
    return points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ') + ' Z';
}

function init() {
    const axesGroup = document.getElementById('axes');
    const areasGroup = document.getElementById('areas');
    const pointsGroup = document.getElementById('points');
    const labelsGroup = document.getElementById('labels');
    
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x2 = cx + Math.cos(angle) * maxRadius;
        const y2 = cy + Math.sin(angle) * maxRadius;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'radar-axis');
        axesGroup.appendChild(line);
    }
    
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const labelRadius = maxRadius + 28;
        const x = cx + Math.cos(angle) * labelRadius;
        const y = cy + Math.sin(angle) * labelRadius;
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 4);
        text.setAttribute('class', 'radar-label');
        text.textContent = dimensions[i].label;
        labelsGroup.appendChild(text);
    }
    
    const beforePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    beforePath.setAttribute('d', generatePath(dimensions.map(d => d.before)));
    beforePath.setAttribute('class', 'radar-area-before');
    areasGroup.appendChild(beforePath);
    
    const afterPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    afterPath.setAttribute('d', generatePath(dimensions.map(d => d.after)));
    afterPath.setAttribute('class', 'radar-area-after');
    areasGroup.appendChild(afterPath);
    
    dimensions.forEach((dim, i) => {
        const p = getPoint(i, dim.after);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', p.x);
        circle.setAttribute('cy', p.y);
        circle.setAttribute('r', 6);
        circle.setAttribute('class', 'radar-point');
        pointsGroup.appendChild(circle);
    });
    
    animateScore();
    
    setTimeout(() => {
        document.querySelectorAll('.radar-point').forEach((point, i) => {
            point.style.animation = `point-pulse 3s ease-in-out infinite ${i * 0.1}s`;
        });
    }, 1800);
}

function animateScore() {
    const scoreEl = document.getElementById('radarScore');
    const target = 54;
    let current = 0;
    
    setTimeout(() => {
        const interval = setInterval(() => {
            current += 2;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            scoreEl.textContent = current;
        }, 25);
    }, 1200);
}

window.addEventListener('load', init);

// Video player
const player = document.getElementById('videoPlayer');
if (player) {
    player.addEventListener('click', function() {
        this.innerHTML = '<iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    });
}

// Pathway animation - trigger on scroll
const pathways = document.getElementById('pathways');
if (pathways) {
    const pathwayObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                pathwayObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    pathwayObserver.observe(pathways);
}

// Manifesto rotating words
const rotatingWord = document.getElementById('rotatingWord');
if (rotatingWord) {
    const items = rotatingWord.querySelectorAll('.rotating-word__item');
    let currentIndex = 0;
    const totalItems = items.length;

    function rotateWord() {
        const currentItem = items[currentIndex];
        const nextIndex = (currentIndex + 1) % totalItems;
        const nextItem = items[nextIndex];

        currentItem.classList.add('exiting');
        currentItem.classList.remove('active');
        nextItem.classList.add('entering');

        setTimeout(() => {
            currentItem.classList.remove('exiting');
            nextItem.classList.remove('entering');
            nextItem.classList.add('active');
            currentIndex = nextIndex;
        }, 400);
    }

    setTimeout(() => {
        setInterval(rotateWord, 2500);
    }, 2000);
}

// Refer a CEO popups (supports multiple instances)
document.querySelectorAll('.refer-wrapper').forEach(wrapper => {
    const popup = wrapper.querySelector('.refer-popup');
    const btn = wrapper.querySelector('.refer-btn, .hero__cta--secondary');
    const closeBtn = wrapper.querySelector('.refer-popup__close');
    const form = wrapper.querySelector('.refer-popup__form');

    if (!popup || !btn) return;

    let isLocked = false;

    // Prevent default link behavior
    btn.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // Lock popup when user starts typing
    popup.addEventListener('input', () => {
        if (!isLocked) {
            isLocked = true;
            popup.classList.add('is-active');
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            isLocked = false;
            popup.classList.remove('is-active');
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const profileInput = form.querySelector('input[id^="referProfile"]');
            const reasonInput = form.querySelector('textarea[id^="referWhy"]');
            const nameInput = form.querySelector('input[id^="referName"]');

            const profile = profileInput?.value.trim();
            const reason = reasonInput?.value.trim();
            const referrerName = nameInput?.value.trim();

            // Validate all fields
            if (!profile || !reason || !referrerName) {
                alert('Please fill in all fields.');
                return;
            }

            const submitBtn = form.querySelector('.refer-popup__submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/refer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profile, reason, referrerName })
                });

                if (response.ok) {
                    alert('Thank you for your referral!');
                    form.reset();
                    isLocked = false;
                    popup.classList.remove('is-active');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Stats count-up animation
const statCounts = document.querySelectorAll('.stat__count');
if (statCounts.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 2000;
                const start = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    el.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target;
                    }
                }

                requestAnimationFrame(update);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statCounts.forEach(stat => statsObserver.observe(stat));
}
