/**
 * Visual Interference | Portfolio Scripts
 * 极简数据架构版：项目配置大一统，从此告别繁琐的词典对应
 */

window.dots = [];
const THEME_COLOR_HEX = 0x708238; 


const projectDetails = {
    p1: {

        titleKey: "p1_title",   
        descKey: "p1_desc",     
        catKey: "group",        
        tools: "Csp, Maya, Zbrush, Substance, Nuke, AE",
        year: "2025-2026",
        gallery: [
            {type:'img', url:"ref/group.png"},
            {type:'text',content:'<div class="gallery-text" i18n="p1_content_1">T</div>'},
            {type:'img', url:"ref/moira_texture_2.png"},
            {type:'img', url:"ref/gp.png"},
            {type:'text',content:'<div class="gallery-text" i18n="p1_content_2">T</div>'},
            {type:'img', url:"ref/shots_3.png"},
        ]
    },
    p2: {
        titleKey: "p2_title",
        descKey: "p2_desc",
        catKey: "render",
        tools: "Maya",
        year: "2025",
        gallery: [
            {type:'img', url:"ref/lighting_assignment_01.jpg"},
            {type:'text',content:'<div class="gallery-text" i18n="p2_content_1">T</div>'},
        ]
    },
    p3: {
        titleKey: "p3_title",
        descKey: "p3_desc",
        catKey: "prop",
        tools: "Maya, Zbrush, Substance",
        year: "2024",
        gallery: [
            {type:'vid', url:"ref/model/movie/robot.mp4"},
            {type:'text',content:'<div class="gallery-text" i18n="p3_content_1">T</div>'},
            {type:'vid', url:"ref/model/movie/gif.mp4"},
            {type:'text',content:'<div class="gallery-text" i18n="p3_content_2">T</div>'}
        ]
    },
    p4: {
        titleKey: "p4_title",
        descKey: "p4_desc",
        catKey: "anim",
        tools: "Maya",
        year: "2024-2026",
        gallery: [
            {type:'vid', url:"ref/animation_walking.mp4"},
            {type:'text',content:'<div class="gallery-text" i18n="p4_content_1">T</div>'},
            {type:'vid', url:"ref/animation_jumping.mp4"},
            {type:'text',content:'<div class="gallery-text" i18n="p4_content_2">T</div>'}
        ]
    },
    p2d1: {
        is2D: true, 
        titleKey: 'p2d1_title',
        gallery: [
        { type: 'img', url: 'ref/2d/ch1.png' }   
        ]
    },
    p2d2: {
        is2D: true, 
        titleKey: 'p2d2_title',
        gallery: [
        { type: 'img', url: 'ref/2d/bg1.png' }   
        ]
    },
    p2d3: {
        is2D: true, 
        titleKey: 'p2d3_title',
        gallery: [
        { type: 'img', url: 'ref/2d/sk1.png' }   
        ]
    },
    p2d4: {
        is2D: true, 
        titleKey: 'p2d4_title',
        gallery: [
        { type: 'img', url: 'ref/2d/7.gif' }   
        ]
    },
    p2d5: {
        is2D: true, 
        titleKey: 'p2d5_title',
        gallery: [
        { type: 'img', url: 'ref/2d/bg2.png' }   
        ]
    },
    p2d6: {
        is2D: true, 
        titleKey: 'p2d6_title',
        gallery: [
        { type: 'img', url: 'ref/2d/sk2.png' }   
        ]
    },
    p2d7: {
        is2D: true, 
        titleKey: 'p2d7_title',
        gallery: [
        { type: 'img', url: 'ref/2d/story1.png' }   
        ]
    },
    p2d8: {
        is2D: true, 
        titleKey: 'p2d8_title',
        gallery: [
        { type: 'img', url: 'ref/2d/bg3.png' }   
        ]
    }
};







// ==========================================
// 3. 状态与自动化翻译逻辑
// ==========================================
let currentTheme = localStorage.getItem('prefTheme') || 'light';
let currentModalKey = null;

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    // 关键点 3：写入主题状态
    localStorage.setItem('prefTheme', currentTheme);
    
    applyTheme(); // 调用专门的应用主题函数
}

function applyTheme() {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('theme-icon');
        if(icon) icon.innerText = '◑'; 
    } else {
        document.body.classList.remove('dark-mode');
        const icon = document.getElementById('theme-icon');
        if(icon) icon.innerText = '◐';
    }

    // 适配你的 Three.js 粒子颜色
    if (starPoints) {
        // 保持你源码中的逻辑
        starPoints.material.color.setHex(0xA5BA4F); 
    }
}


function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-icon').innerText = currentTheme === 'light' ? '◐' : '◑';
    if (starPoints) {
        starPoints.material.color.setHex(currentTheme === 'light' ? 0xA5BA4F : 0xA5BA4F);
    }
}



function openDetail(key) {
    currentModalKey = key;
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('modalContent');
    const p = projectDetails[key] || { gallery: [] };
    if (!p) return;

    if (p.is2D) {
        content.innerHTML = `
            <div class="lightbox-style">
                <div class="lightbox-image">
                    ${(p.gallery || []).map(item => `<img src="${item.url}">`).join('')}
                </div>
                <div class="lightbox-caption">
                    <h1 i18n="${p.titleKey}"></h1>
                </div>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="detail-wrapper">
                <div class="detail-header">
                    <h1 class="detail-title" i18n="${p.titleKey}"></h1>
                    <div class="detail-meta">
                        <div class="meta-box"><span>CATEGORY</span><b>${p.catKey}</b></div>
                        <div class="meta-box"><span>TOOLS</span><b>${p.tools}</b></div>
                        <div class="meta-box"><span>YEAR</span><b>${p.year}</b></div>
                    </div>
                </div> 

                <div class="detail-desc">
                    <h3>Project Overview</h3>


                <div class="detail-gallery">
                    ${(p.gallery || []).map(item => {
                        if (item.type === 'img') return `<img src="${item.url}" style="width:100%; margin-bottom:20px; display:block;">`;
                        if (item.type === 'vid') return `<video src="${item.url}" autoplay loop muted playsinline style="width:100%; margin-bottom:20px; display:block;"></video>`;
                        if (item.type === 'text') return `<div class="gallery-text">${item.content}</div>`;
                        return ''; 
                    }).join('')}
                </div>

                
                </div>
            </div>
        `;
        }
    // 弹窗显示逻辑
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if(document.querySelector('header')) document.querySelector('header').style.zIndex = '10005';

    // 触发翻译（这里也可以简化，直接调用你之前设好的配置）
    $("[i18n]").i18n({
        defaultLang: localStorage.getItem("lang") || "en",
        filePath: "./i18n/",
        filePrefix: ""
    });
}
function closeDetail() {
    currentModalKey = null;
    document.getElementById('detailModal').style.display = 'none';
    const header = document.querySelector('header');
    if (header) header.style.zIndex = '95';
    document.body.style.overflow = 'auto';
}


// ==========================================
// 5. Three.js 单页粒子星球形态转换引擎
// ==========================================
let scene, camera, renderer, starPoints, originalPositions, ringPositions;
const particleCount = 30000;

function initThree() {
    const container = document.getElementById('canvas-bg');
    if(!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;
    
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    originalPositions = new Float32Array(particleCount * 3);
    ringPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 30 + Math.random() * 8; 
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        originalPositions[i*3] = x;
        originalPositions[i*3+1] = y;
        originalPositions[i*3+2] = z;

        if (i < 15000) {
            ringPositions[i*3] = x;
            ringPositions[i*3+1] = y;
            ringPositions[i*3+2] = z;
        } else {
            const ringTheta = Math.random() * Math.PI * 2;
            const ringR = 55 + Math.random() * 40; 
            ringPositions[i*3] = ringR * Math.cos(ringTheta);
            ringPositions[i*3+1] = (Math.random() - 0.5) * 1.5; 
            ringPositions[i*3+2] = ringR * Math.sin(ringTheta);
        }
        pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xbec936, size: 0.15, transparent: true, opacity: 0.8 });
    starPoints = new THREE.Points(geo, mat);
    scene.add(starPoints);

    window.currentMorph = 0; 

    function animate() {
        requestAnimationFrame(animate);
        const contactSec = document.getElementById('contact');
        let morphTarget = 0;
        
        if (contactSec) {
            const contactTop = contactSec.offsetTop;
            const dist = contactTop - window.scrollY;
            if (dist < window.innerHeight) {
                morphTarget = Math.max(0, Math.min(1, 1 - (dist / window.innerHeight)));
            }
        }
        
        window.currentMorph += (morphTarget - window.currentMorph) * 0.05;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const factor = 1 + progress * 15 * (1 - window.currentMorph); 

        const attr = starPoints.geometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
            const sx = originalPositions[i*3] * factor;
            const sy = originalPositions[i*3+1] * factor;
            const sz = originalPositions[i*3+2] * factor;
            const cx = ringPositions[i*3];
            const cy = ringPositions[i*3+1];
            const cz = ringPositions[i*3+2];
            attr.setXYZ( i, sx + (cx - sx) * window.currentMorph, sy + (cy - sy) * window.currentMorph, sz + (cz - sz) * window.currentMorph);
        }
        attr.needsUpdate = true;
        
        const targetRotX = 0.0002 + window.currentMorph * 0.5;
        const targetRotZ = window.currentMorph * -0.2;
        starPoints.rotation.x += (targetRotX - starPoints.rotation.x) * 0.05;
        starPoints.rotation.z += (targetRotZ - starPoints.rotation.z) * 0.05;
        starPoints.rotation.y += 0.001; 
        
        renderer.render(scene, camera);
    }
    animate();
}

// ==========================================
// 6. 生命周期与事件监听
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.getElementById('particle-diamond');
    if (grid) {
        const size = 15;
        const center = Math.floor(size / 2);
        grid.innerHTML = '';
        window.dots = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const distance = Math.abs(i - center) + Math.abs(j - center);
                if (distance <= center) {
                    const dot = document.createElement('div');
                    dot.className = 'p-dot';
                    dot.style.animationDelay = `${distance * 0.08}s`;
                    const angle = Math.atan2(j - center, i - center) + (Math.random() * 0.2 - 0.1);
                    const dist = 150 + Math.random() * 200;
                    dot.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
                    dot.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
                    grid.appendChild(dot);
                    window.dots.push(dot);
                } else {
                    const spacer = document.createElement('div');
                    spacer.className = 'p-spacer';
                    grid.appendChild(spacer);
                }
            }
        }
    }

    const statusText = document.getElementById('loader-status');
    if(statusText) {
        let p = 0;
        const int = setInterval(() => {
            p += Math.random() * 8;
            if(p >= 100) {
                p = 100;
                clearInterval(int);
                statusText.classList.add('hide-text');
                if (window.dots) window.dots.forEach(dot => dot.classList.add('scatter'));
                setTimeout(() => {
                    const preloader = document.getElementById('preloader');
                    if(preloader) preloader.classList.add('loaded');
                }, 1500);
            }
            statusText.innerText = Math.floor(p) + '%';
        }, 80);
    }

    initThree();
    
    const cursor = document.getElementById('cursor');
    const pDot = document.getElementById('p-dot');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('mousemove', e => {
        if(!cursor) return;
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        const isNearHUD = e.clientX < 140;
        const isNearLang = e.clientX > window.innerWidth - 100 && e.clientY < 100;
        const isNearTopBtn = e.clientX > window.innerWidth - 120 && e.clientY > window.innerHeight - 120;
        if (isNearHUD || isNearLang || isNearTopBtn) cursor.classList.add('hide'); 
        else cursor.classList.remove('hide');
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('section');
        const hudDots = document.querySelectorAll('.hud-dot');
        
        let cur = "";
        sections.forEach(sec => { if (scrollY >= (sec.offsetTop - 300)) cur = sec.getAttribute('id'); });
        hudDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.target === cur) dot.classList.add('active');
        });

        const bS = document.getElementById('blogs');
        if (bS && scrollY > bS.offsetTop - window.innerHeight && scrollY < bS.offsetTop + bS.offsetHeight) {
            const r = (scrollY - (bS.offsetTop - window.innerHeight)) / (bS.offsetHeight + window.innerHeight);
            if(pDot) pDot.style.top = (100 - (r * 100)) + "%";
        }

        if (backToTopBtn) {
            if (scrollY > 500) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        }
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = function() {
            const targetGridId = this.dataset.target;
            const siblings = this.parentElement.querySelectorAll('.filter-btn');
            siblings.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const cat = this.dataset.cat;
            document.querySelectorAll(`#${targetGridId} .art-item, #${targetGridId} .diamond-item`).forEach(d => {
                d.style.display = (cat === 'all' || d.dataset.cat === cat) ? 'block' : 'none';
            });
        };
    });

    document.querySelectorAll('.hud-dot').forEach(dot => {
        dot.onclick = () => {
            const targetEl = document.getElementById(dot.dataset.target);
            if(targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        };
    });
    
    
});

window.addEventListener('resize', () => {
    if(!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

