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
    localStorage.setItem('prefTheme', currentTheme);
    applyTheme();
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

    if (starPoints) {
        starPoints.material.color.setHex(0xA5BA4F); 
    }
}



// ==========================================
// 2D & 3D 统一展示流转引擎 (3D完整串联 & 2D画廊)
// ==========================================
const items3D = [
    { key: 'p1',      mode: 'detail' },
    { key: 'p2',      mode: 'detail' },
    { key: 'robot',   mode: 'media', url: 'ref/model/movie/robot.mp4',   type: 'vid' },
    { key: 'giraffe', mode: 'media', url: 'ref/model/movie/gif.mp4',     type: 'vid' },
    { key: 'walking', mode: 'media', url: 'ref/animation_walking.mp4',   type: 'vid' },
    { key: 'jumping', mode: 'media', url: 'ref/animation_jumping.mp4',   type: 'vid' }
];
let current3DIndex = 0;

const galleryImages2D = [
    { key: 'p2d1', mode: 'media', url: 'ref/2d/ch1.png', type: 'img' },
    { key: 'p2d2', mode: 'media', url: 'ref/2d/bg1.png', type: 'img' },
    { key: 'p2d3', mode: 'media', url: 'ref/2d/sk1.png', type: 'img' },
    { key: 'p2d4', mode: 'media', url: 'ref/2d/7.gif',   type: 'img' },
    { key: 'p2d5', mode: 'media', url: 'ref/2d/bg2.png', type: 'img' },
    { key: 'p2d6', mode: 'media', url: 'ref/2d/sk2.png', type: 'img' },
    { key: 'p2d7', mode: 'media', url: 'ref/2d/story1.png', type: 'img' },
    { key: 'p2d8', mode: 'media', url: 'ref/2d/bg3.png', type: 'img' }
];
let current2DIndex = 0;

let activeViewerScope = '3D'; // '3D' or '2D'

function show3DItem(index) {
    activeViewerScope = '3D';
    current3DIndex = (index + items3D.length) % items3D.length;
    const item = items3D[current3DIndex];

    if (item.mode === 'detail') {
        closeImageViewerSilent();
        render3DDetailModal(item.key);
    } else {
        closeDetailSilent();
        renderMediaViewer(item);
    }
}

function open3DMedia(key) {
    const idx = items3D.findIndex(item => item.key === key);
    show3DItem(idx !== -1 ? idx : 2);
}

function open2DGallery(indexOrKey) {
    activeViewerScope = '2D';
    let index = 0;
    if (typeof indexOrKey === 'number') {
        index = indexOrKey;
    } else if (typeof indexOrKey === 'string') {
        const found = galleryImages2D.findIndex(item => item.key === indexOrKey);
        index = found !== -1 ? found : 0;
    }
    current2DIndex = (index + galleryImages2D.length) % galleryImages2D.length;
    closeDetailSilent();
    renderMediaViewer(galleryImages2D[current2DIndex]);
}

function renderMediaViewer(item) {
    const viewer = document.getElementById('imageViewer');
    const imgEl = document.getElementById('ivMainImg');
    const vidEl = document.getElementById('ivMainVid');
    if (!viewer) return;

    if (item.type === 'vid' || (item.url && item.url.endsWith('.mp4'))) {
        if (imgEl) imgEl.style.display = 'none';
        if (vidEl) {
            vidEl.style.display = 'block';
            vidEl.src = item.url;
            vidEl.currentTime = 0;
            vidEl.play().catch(() => {});
        }
    } else {
        if (vidEl) {
            vidEl.pause();
            vidEl.style.display = 'none';
            vidEl.src = '';
        }
        if (imgEl) {
            imgEl.style.display = 'block';
            imgEl.style.opacity = '0.3';
            imgEl.src = item.url;
            imgEl.onload = () => { imgEl.style.opacity = '1'; };
        }
    }

    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    const header = document.querySelector('header');
    if (header) header.style.zIndex = '10005';
}

function render3DDetailModal(key) {
    const p = projectDetails[key];
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('modalContent');
    if (!p || !modal || !content) return;

    currentModalKey = key;
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

    modal.style.display = 'block';
    modal.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    const header = document.querySelector('header');
    if (header) header.style.zIndex = '10005';

    $("[i18n]").i18n({
        defaultLang: localStorage.getItem("lang") || "en",
        filePath: "./i18n/",
        filePrefix: ""
    });
}

function prevMediaOrDetail(e) {
    if (e) e.stopPropagation();
    if (activeViewerScope === '3D') {
        show3DItem(current3DIndex - 1);
    } else {
        open2DGallery(current2DIndex - 1);
    }
}

function nextMediaOrDetail(e) {
    if (e) e.stopPropagation();
    if (activeViewerScope === '3D') {
        show3DItem(current3DIndex + 1);
    } else {
        open2DGallery(current2DIndex + 1);
    }
}

function prevImage(e) { prevMediaOrDetail(e); }
function nextImage(e) { nextMediaOrDetail(e); }
function prev3DDetail(e) { prevMediaOrDetail(e); }
function next3DDetail(e) { nextMediaOrDetail(e); }

function closeImageViewerSilent() {
    const viewer = document.getElementById('imageViewer');
    const vidEl = document.getElementById('ivMainVid');
    if (vidEl) {
        vidEl.pause();
        vidEl.src = '';
    }
    if (viewer) viewer.classList.remove('active');
}

function closeDetailSilent() {
    const modal = document.getElementById('detailModal');
    if (modal) modal.style.display = 'none';
}

function closeImageViewer(e) {
    if (e && e.target && (e.target.id === 'ivMainImg' || e.target.id === 'ivMainVid' || e.target.closest('.iv-nav-btn'))) {
        return;
    }
    closeImageViewerSilent();
    closeDetailSilent();
    const header = document.querySelector('header');
    if (header) header.style.zIndex = '95';
    document.body.style.overflow = 'auto';
}

function closeDetail() {
    closeImageViewerSilent();
    closeDetailSilent();
    const header = document.querySelector('header');
    if (header) header.style.zIndex = '95';
    document.body.style.overflow = 'auto';
}

window.addEventListener('keydown', (e) => {
    const viewer = document.getElementById('imageViewer');
    const detailModal = document.getElementById('detailModal');
    const isOpen = (viewer && viewer.classList.contains('active')) || (detailModal && detailModal.style.display === 'block');

    if (isOpen) {
        if (e.key === 'ArrowLeft') prevMediaOrDetail();
        else if (e.key === 'ArrowRight') nextMediaOrDetail();
        else if (e.key === 'Escape') {
            closeImageViewer();
            closeDetail();
        }
    }
});

function openDetail(key) {
    if (key === 'p1') {
        show3DItem(0);
        return;
    }
    if (key === 'p2') {
        show3DItem(1);
        return;
    }
    if (key === 'robot' || key === 'p3') {
        show3DItem(2);
        return;
    }
    if (key === 'giraffe') {
        show3DItem(3);
        return;
    }
    if (key === 'walking' || key === 'p4') {
        show3DItem(4);
        return;
    }
    if (key === 'jumping') {
        show3DItem(5);
        return;
    }
    if (key && key.startsWith('p2d')) {
        open2DGallery(key);
        return;
    }
    const idx = items3D.findIndex(item => item.key === key);
    if (idx !== -1) {
        show3DItem(idx);
    }
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
    applyTheme();
    
    const hasLoadedBefore = sessionStorage.getItem('siteLoaded');
    const preloader = document.getElementById('preloader');

    if (hasLoadedBefore) {
        if (preloader) preloader.style.display = 'none';
    } else {
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
        if (statusText) {
            let p = 0;
            const int = setInterval(() => {
                p += Math.random() * 8;
                if (p >= 100) {
                    p = 100;
                    clearInterval(int);
                    sessionStorage.setItem('siteLoaded', 'true');
                    statusText.classList.add('hide-text');
                    if (window.dots) window.dots.forEach(dot => dot.classList.add('scatter'));
                    setTimeout(() => {
                        if (preloader) preloader.classList.add('loaded');
                    }, 1500);
                }
                statusText.innerText = Math.floor(p) + '%';
            }, 80);
        }
    }

    initThree();
    
    const cursor = document.getElementById('cursor');
    const pDot = document.getElementById('p-dot');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('mousemove', e => {
        if(!cursor) return;
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        const viewer = document.getElementById('imageViewer');
        const detailModal = document.getElementById('detailModal');
        const isModalOpen = (viewer && viewer.classList.contains('active')) || (detailModal && detailModal.style.display === 'block');

        // 在图片查看器或详情弹窗打开时，不隐藏光标，让鼠标始终清晰可见
        if (isModalOpen) {
            cursor.classList.remove('hide');
            return;
        }

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

