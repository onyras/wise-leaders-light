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

// Manifesto typing words
const typingWord = document.getElementById('typingWord');
if (typingWord) {
    const words = ['more advice', 'more hustle', 'more input'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeWord() {
        const currentWord = words[wordIndex];

        if (isPaused) return;

        if (!isDeleting) {
            // Typing
            typingWord.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                // Finished typing, pause then delete
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeWord();
                }, 1500);
                return;
            }
            setTimeout(typeWord, 80 + Math.random() * 40);
        } else {
            // Deleting
            typingWord.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // Finished deleting, move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeWord, 300);
                return;
            }
            setTimeout(typeWord, 40);
        }
    }

    // Start typing when section is in view
    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
        const manifestoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWord, 500);
                    manifestoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        manifestoObserver.observe(manifestoSection);
    }
}

// Pillars Option D: Rotating word animation
const pillarsRotating = document.getElementById('pillarsRotating');
if (pillarsRotating) {
    const pillarWords = [
        { text: 'Stillness', class: 'pillars__rotating--stillness' },
        { text: 'Science', class: 'pillars__rotating--science' },
        { text: 'Allies', class: 'pillars__rotating--allies' }
    ];
    let pillarIndex = 0;

    function rotatePillarWord() {
        pillarsRotating.style.opacity = '0';

        setTimeout(() => {
            // Remove all color classes
            pillarWords.forEach(w => pillarsRotating.classList.remove(w.class));

            // Move to next word
            pillarIndex = (pillarIndex + 1) % pillarWords.length;
            const current = pillarWords[pillarIndex];

            // Update text and add color class
            pillarsRotating.textContent = current.text;
            pillarsRotating.classList.add(current.class);
            pillarsRotating.style.opacity = '1';
        }, 400);
    }

    // Set initial color
    pillarsRotating.classList.add('pillars__rotating--stillness');

    // Start rotating
    setInterval(rotatePillarWord, 2500);
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

// Fit Quiz
const fitQuiz = document.querySelector('.fit-quiz');
if (fitQuiz) {
    const introScreen = fitQuiz.querySelector('.fit-quiz__intro');
    const startBtn = document.getElementById('quizStartBtn');
    const questions = fitQuiz.querySelectorAll('.fit-quiz__question');
    const progressBar = fitQuiz.querySelector('.fit-quiz__progress-bar');
    const progressContainer = fitQuiz.querySelector('.fit-quiz__progress');
    const currentDisplay = fitQuiz.querySelector('.fit-quiz__current');
    const progressText = fitQuiz.querySelector('.fit-quiz__progress-text');
    const questionsContainer = fitQuiz.querySelector('.fit-quiz__questions');
    const resultFit = fitQuiz.querySelector('.fit-quiz__result--fit');
    const resultMaybe = fitQuiz.querySelector('.fit-quiz__result--maybe');
    const resultNot = fitQuiz.querySelector('.fit-quiz__result--not');
    const restartBtns = fitQuiz.querySelectorAll('.fit-quiz__restart');

    let currentQuestion = 0;
    let answers = [];
    let scaleData = { employees: 0, revenue: 0 };
    const totalQuestions = questions.length;

    // Handle start button click
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            introScreen.classList.remove('fit-quiz__intro--active');
            progressContainer.style.display = 'block';
            progressText.style.display = 'block';
            questions[0].classList.add('fit-quiz__question--active');
        });
    }

    // Handle option clicks
    fitQuiz.querySelectorAll('.fit-quiz__option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            answers[currentQuestion] = value;

            // Visual feedback
            const parent = option.closest('.fit-quiz__options');
            parent.querySelectorAll('.fit-quiz__option').forEach(opt => {
                opt.classList.remove('fit-quiz__option--selected');
            });
            option.classList.add('fit-quiz__option--selected');

            // Move to next question after brief delay
            setTimeout(() => {
                if (currentQuestion < totalQuestions - 1) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                } else {
                    showResult();
                }
            }, 300);
        });
    });

    // Handle question 2 (scale inputs) continue button
    const scaleNextBtn = document.getElementById('quizScaleNext');
    if (scaleNextBtn) {
        scaleNextBtn.addEventListener('click', () => {
            const employeesInput = document.getElementById('quizEmployees');
            const revenueInput = document.getElementById('quizRevenue');

            const employees = parseInt(employeesInput.value) || 0;
            const revenue = parseInt(revenueInput.value) || 0;

            // Store the data
            scaleData.employees = employees;
            scaleData.revenue = revenue;

            // Determine if they meet the threshold (20+ employees AND €2M+ revenue)
            const meetsThreshold = employees >= 20 && revenue >= 2000000;
            answers[currentQuestion] = meetsThreshold ? 'yes' : 'no';

            // Move to next question
            if (currentQuestion < totalQuestions - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            } else {
                showResult();
            }
        });
    }

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.remove('fit-quiz__question--active');
            if (i === index) {
                q.classList.add('fit-quiz__question--active');
            }
        });

        // Update progress
        const progress = ((index) / totalQuestions) * 100;
        progressBar.style.width = progress + '%';
        currentDisplay.textContent = index + 1;
    }

    function showResult() {
        // Hide questions and progress
        questionsContainer.style.display = 'none';
        progressBar.parentElement.style.display = 'none';
        progressText.style.display = 'none';

        // Count "good fit" answers based on each question's data-good-answer attribute
        let fitScore = 0;
        questions.forEach((q, i) => {
            const goodAnswer = q.dataset.goodAnswer;
            // For input questions, we already stored 'yes' or 'no' based on threshold
            if (goodAnswer === 'input') {
                // Check if they meet threshold (stored as 'yes' or 'no')
                if (answers[i] === 'yes') fitScore++;
            } else if (answers[i] === goodAnswer) {
                fitScore++;
            }
        });

        // Show appropriate result (out of 6 questions)
        if (fitScore >= 5) {
            resultFit.style.display = 'block';
        } else if (fitScore >= 3) {
            resultMaybe.style.display = 'block';
        } else {
            resultNot.style.display = 'block';
        }
    }

    // Restart quiz
    restartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset state
            currentQuestion = 0;
            answers = [];
            scaleData = { employees: 0, revenue: 0 };

            // Hide results
            resultFit.style.display = 'none';
            resultMaybe.style.display = 'none';
            resultNot.style.display = 'none';

            // Hide progress and questions, show intro
            questionsContainer.style.display = 'block';
            progressContainer.style.display = 'none';
            progressText.style.display = 'none';
            introScreen.classList.add('fit-quiz__intro--active');

            // Reset progress
            progressBar.style.width = '0%';
            currentDisplay.textContent = '1';

            // Clear selections
            fitQuiz.querySelectorAll('.fit-quiz__option').forEach(opt => {
                opt.classList.remove('fit-quiz__option--selected');
            });

            // Clear input fields
            const employeesInput = document.getElementById('quizEmployees');
            const revenueInput = document.getElementById('quizRevenue');
            if (employeesInput) employeesInput.value = '';
            if (revenueInput) revenueInput.value = '';

            // Hide all questions
            questions.forEach(q => q.classList.remove('fit-quiz__question--active'));
        });
    });
}

// ==========================================
// OPTION C: Typewriter Effect
// ==========================================
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const textEl = typewriterEl.querySelector('.typewriter__text');
    const sequences = [
        { text: 'You need more advice', pause: 1500, deleteCount: 11 },
        { text: 'more hustle', pause: 1200, deleteCount: 11 },
        { text: 'more input', pause: 1200, deleteCount: 10 },
        { text: '', pause: 500, deleteCount: 9 }, // delete "You need "
        { text: 'You need ', pause: 0, deleteCount: 0 },
        { text: '<em>space to think</em>', pause: 0, deleteCount: 0, final: true }
    ];

    let seqIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typewriterStep() {
        const seq = sequences[seqIndex];

        if (seq.final) {
            textEl.innerHTML = currentText + seq.text;
            return;
        }

        if (!isDeleting) {
            // Typing
            currentText += seq.text[charIndex];
            textEl.innerHTML = currentText;
            charIndex++;

            if (charIndex >= seq.text.length) {
                // Done typing this sequence
                setTimeout(() => {
                    isDeleting = true;
                    typewriterStep();
                }, seq.pause);
                return;
            }
            setTimeout(typewriterStep, 50 + Math.random() * 50);
        } else {
            // Deleting
            if (seq.deleteCount > 0) {
                currentText = currentText.slice(0, -1);
                textEl.innerHTML = currentText;
                seq.deleteCount--;
                setTimeout(typewriterStep, 30);
            } else {
                // Move to next sequence
                isDeleting = false;
                charIndex = 0;
                seqIndex++;
                if (seqIndex < sequences.length) {
                    setTimeout(typewriterStep, 200);
                }
            }
        }
    }

    // Start when in view
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typewriterStep, 500);
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    typewriterObserver.observe(typewriterEl);
}

// ==========================================
// OPTION D & G: Scroll-triggered animations
// ==========================================
const manifestoSections = document.querySelectorAll('.manifesto--noise, .manifesto--fog');
if (manifestoSections.length > 0) {
    const manifestoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                manifestoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    manifestoSections.forEach(section => manifestoObserver.observe(section));
}

// ==========================================
// COOKIE CONSENT
// ==========================================
const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');

if (cookieConsent) {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');

    if (cookieChoice) {
        cookieConsent.classList.add('hidden');
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.add('hidden');
    });

    cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.add('hidden');
    });
}

// Mobile Navigation Hamburger Menu
const navHamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (navHamburger && mobileMenu) {
    navHamburger.addEventListener('click', () => {
        navHamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
