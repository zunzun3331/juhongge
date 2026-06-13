/* =============================================
   聚泓阁本帮菜 — 官方网站交互脚本
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initScrollSpy();
    initScrollAnimations();
    initReservationForm();
});

/* ---------- 滚动时导航栏样式切换 ---------- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 60) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ---------- 移动端菜单切换 ---------- */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const links = nav.querySelectorAll('.nav__link');

    function closeNav() {
        nav.classList.remove('nav--open');
        toggle.classList.remove('nav__toggle--active');
        document.body.style.overflow = '';
    }

    function openNav() {
        nav.classList.add('nav--open');
        toggle.classList.add('nav__toggle--active');
        document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
        if (nav.classList.contains('nav--open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    // 点击导航链接后关闭菜单
    links.forEach(link => {
        link.addEventListener('click', closeNav);
    });
}

/* ---------- 平滑滚动 ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ---------- 滚动监听高亮当前导航项 ---------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const headerHeight = document.getElementById('header').offsetHeight;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;

                    if (sectionTop <= headerHeight + 100) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('nav__link--active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ---------- 滚动渐入动画 ---------- */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in--visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateTargets = document.querySelectorAll(
        '.section__header, .about__image, .about__text, .menu__card, .gallery__item, .contact__info, .contact__form'
    );

    animateTargets.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index % 3 * 0.1}s`;
        observer.observe(el);
    });
}

/* ---------- 预约表单 ---------- */
function initReservationForm() {
    const form = document.getElementById('reservationForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 简单的前端验证
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#E07B6C';
                input.style.background = '#FFF5F5';
            } else {
                input.style.borderColor = '';
                input.style.background = '';
            }
        });

        if (!isValid) {
            showFormMessage('请填写所有必填字段', 'error');
            return;
        }

        // 模拟提交
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '正在提交...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            showFormMessage('预约提交成功！我们会尽快与您联系确认。', 'success');
            form.reset();
        }, 1200);
    });

    // 输入时清除错误状态
    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => {
            el.style.borderColor = '';
            el.style.background = '';
        });
    });
}

function showFormMessage(message, type) {
    // 移除已有消息
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `form-message form-message--${type}`;
    msg.textContent = message;

    const form = document.getElementById('reservationForm');
    form.appendChild(msg);

    // 3秒后自动移除
    setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(-10px)';
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

/* ---------- 添加表单消息样式 ---------- */
const formMsgStyles = document.createElement('style');
formMsgStyles.textContent = `
    .form-message {
        margin-top: 16px;
        padding: 12px 18px;
        border-radius: 8px;
        font-size: 0.85rem;
        text-align: center;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .form-message--success {
        background: #EDF7EE;
        color: #3C7A44;
        border: 1px solid #C8E6C9;
    }
    .form-message--error {
        background: #FFF5F5;
        color: #C25448;
        border: 1px solid #FFCDD2;
    }
`;
document.head.appendChild(formMsgStyles);
