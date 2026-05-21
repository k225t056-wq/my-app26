/**
 * Game Profile Card Generator
 * Core Logic & Rendering Engine
 */

const state = {
    name: "Gamer_Alpha",
    game: "Apex Legends",
    history: "約3年",
    platform: "PC",
    time: "21:00 〜 24:00",
    style: "エンジョイ勢",
    vc: "可",
    vcMethod: "Discord",
    twitter: "@Gamer_Alpha",
    discord: "Gamer_Alpha#1234",
    friendCode: "SW-1234-5678-9012",
    bio: "よろしくお願いします！FPSやRPGを夜な夜なプレイしています。楽しくワイワイ遊びましょう！お気軽にフォローしてください！",
    themeColor: "#9333ea",
    avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop",
    bgUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80"
};

const images = {
    avatar: new Image(),
    bg: new Image()
};

// DOM Elements
const elements = {
    inputs: {
        name: document.getElementById('input-name'),
        game: document.getElementById('input-game'),
        history: document.getElementById('input-history'),
        platform: document.getElementById('input-platform'),
        time: document.getElementById('input-time'),
        style: document.getElementById('input-style'),
        vc: document.getElementById('input-vc'),
        vcMethod: document.getElementById('input-vc-method'),
        twitter: document.getElementById('input-twitter'),
        discord: document.getElementById('input-discord'),
        friendCode: document.getElementById('input-friend-code'),
        bio: document.getElementById('input-bio')
    },
    uploadAvatar: document.getElementById('upload-avatar'),
    uploadBg: document.getElementById('upload-bg'),
    colorBtns: document.querySelectorAll('.color-btn'),
    canvas: document.getElementById('render-canvas'),
    previewImage: document.getElementById('preview-image'),
    btnDownload: document.getElementById('btn-download'),
    btnCopy: document.getElementById('btn-copy'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

/**
 * Initialize the application
 */
function init() {
    // Set initial values from state to inputs
    Object.keys(elements.inputs).forEach(key => {
        if (elements.inputs[key]) {
            elements.inputs[key].value = state[key];
        }
    });

    // Bind input events
    Object.keys(elements.inputs).forEach(key => {
        if (elements.inputs[key]) {
            elements.inputs[key].addEventListener('input', (e) => {
                state[key] = e.target.value;
                render();
            });
            // Handle select changes specifically
            elements.inputs[key].addEventListener('change', (e) => {
                state[key] = e.target.value;
                render();
            });
        }
    });

    // Color buttons
    elements.colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.themeColor = btn.dataset.color;
            render();
        });
    });

    // Image uploads
    elements.uploadAvatar.addEventListener('change', (e) => handleImageUpload(e, 'avatarUrl'));
    elements.uploadBg.addEventListener('change', (e) => handleImageUpload(e, 'bgUrl'));

    // Actions
    elements.btnDownload.addEventListener('click', downloadImage);
    elements.btnCopy.addEventListener('click', copyImage);

    // Initial load
    Promise.all([
        loadImages(),
        document.fonts.ready
    ]).then(() => {
        render();
        // Extra render after a short delay to ensure fonts/images are fully applied
        setTimeout(render, 500);
    });
}

/**
 * Handle image file upload
 */
function handleImageUpload(event, stateKey) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            state[stateKey] = e.target.result;
            loadImages().then(() => render());
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Load images into the images object
 */
async function loadImages() {
    const load = (img, url) => {
        return new Promise((resolve) => {
            img.crossOrigin = "anonymous";
            img.onload = resolve;
            img.onerror = () => {
                console.error("Failed to load image:", url);
                resolve();
            };
            img.src = url;
        });
    };

    await Promise.all([
        load(images.avatar, state.avatarUrl),
        load(images.bg, state.bgUrl)
    ]);
}

/**
 * Core Rendering Engine (1920x1080)
 */
function render() {
    const ctx = elements.canvas.getContext('2d');
    const w = elements.canvas.width;
    const h = elements.canvas.height;

    // 1. Clear & Background
    ctx.clearRect(0, 0, w, h);
    
    // Draw BG (Cover)
    if (images.bg.complete) {
        const scale = Math.max(w / images.bg.width, h / images.bg.height);
        const x = (w - images.bg.width * scale) / 2;
        const y = (h - images.bg.height * scale) / 2;
        ctx.drawImage(images.bg, x, y, images.bg.width * scale, images.bg.height * scale);
    }

    // 2. Overlays
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, w, h);

    // Left gradient accent
    const grad = ctx.createLinearGradient(0, 0, w * 0.4, 0);
    grad.addColorStop(0, state.themeColor + '33'); // 20% opacity
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 3. Border & Framing
    ctx.strokeStyle = state.themeColor;
    ctx.lineWidth = 20;
    ctx.strokeRect(0, 0, w, h);

    // Decorative corner (Top-Left)
    ctx.fillStyle = state.themeColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0);
    ctx.lineTo(0, 150);
    ctx.fill();

    // 4. Avatar (Circle)
    const avatarX = 300;
    const avatarY = h / 2 - 50;
    const avatarR = 180;

    // Glow
    ctx.save();
    ctx.shadowBlur = 50;
    ctx.shadowColor = state.themeColor;
    ctx.strokeStyle = state.themeColor;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR + 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Avatar Clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.clip();
    if (images.avatar.complete) {
        const scale = Math.max((avatarR * 2) / images.avatar.width, (avatarR * 2) / images.avatar.height);
        const x = avatarX - (images.avatar.width * scale) / 2;
        const y = avatarY - (images.avatar.height * scale) / 2;
        ctx.drawImage(images.avatar, x, y, images.avatar.width * scale, images.avatar.height * scale);
    }
    ctx.restore();

    // 5. Text Content (GRID SYSTEM)
    const contentX = 580;
    
    // ZONE 1: Player Name & Social IDs (150px - 280px)
    const zone1Y = 150;
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 80px "Noto Sans JP"';
    ctx.fillText(state.name, contentX, zone1Y);

    ctx.font = '700 24px "Noto Sans JP"';
    ctx.fillStyle = '#cbd5e1';
    let socialX = contentX;
    if (state.twitter) {
        ctx.fillText(`Twitter: ${state.twitter}`, socialX, zone1Y + 95);
        socialX += ctx.measureText(`Twitter: ${state.twitter}`).width + 40;
    }
    if (state.discord) {
        ctx.fillText(`Discord: ${state.discord}`, socialX, zone1Y + 95);
    }

    // Divider
    ctx.fillStyle = state.themeColor;
    ctx.fillRect(contentX, zone1Y + 130, 1100, 2);

    // ZONE 2: Info Grid (320px - 620px)
    const zone2Y = 320;
    const items = [
        { label: "MAIN GAME", value: state.game },
        { label: "PLAY HISTORY", value: state.history },
        { label: "PLATFORM", value: state.platform },
        { label: "PLAY TIME", value: state.time },
        { label: "STYLE", value: state.style },
        { label: "VC可否 / 方法", value: `${state.vc} / ${state.vcMethod}` }
    ];

    items.forEach((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = contentX + col * 550;
        const y = zone2Y + row * 100;

        ctx.font = '700 20px "Orbitron"';
        ctx.fillStyle = state.themeColor;
        ctx.fillText(item.label, x, y);

        ctx.font = '700 32px "Noto Sans JP"';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(item.value, x, y + 35);
    });

    // ZONE 3: Friend Code (650px - 750px)
    const zone3Y = 650;
    if (state.friendCode) {
        ctx.font = '700 20px "Orbitron"';
        ctx.fillStyle = state.themeColor;
        ctx.fillText("FRIEND CODE / PLATFORM ID", contentX, zone3Y);
        
        ctx.font = '700 36px "Noto Sans JP"';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(state.friendCode, contentX, zone3Y + 35);
    }

    // ZONE 4: Bio Section (780px - 1000px)
    const zone4Y = 780;
    const bioW = 1100;
    const bioH = 200;

    // Bio Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.roundRect(contentX, zone4Y, bioW, bioH, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Bio Title
    ctx.font = '700 20px "Orbitron"';
    ctx.fillStyle = state.themeColor;
    ctx.fillText("ABOUT ME", contentX + 30, zone4Y + 20);

    // Bio Text
    ctx.font = '500 28px "Noto Sans JP"';
    ctx.fillStyle = '#e2e8f0';
    wrapText(ctx, state.bio, contentX + 30, zone4Y + 65, 42, bioW - 60);

    // 6. Update Preview
    elements.previewImage.src = elements.canvas.toDataURL('image/png');
}

/**
 * Text Wrapping Utility
 */
function wrapText(ctx, text, x, y, lineHeight, maxWidth) {
    const chars = text.split('');
    let line = '';
    let testY = y;

    for (let n = 0; n < chars.length; n++) {
        let testLine = line + chars[n];
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, testY);
            line = chars[n];
            testY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, testY);
}

/**
 * Download Image
 */
function downloadImage() {
    const link = document.createElement('a');
    link.download = `profile_card_${state.name}.png`;
    link.href = elements.canvas.toDataURL('image/png');
    link.click();
    showToast("画像をダウンロードしました！");
}

/**
 * Copy Image to Clipboard
 */
async function copyImage() {
    try {
        const blob = await new Promise(resolve => elements.canvas.toBlob(resolve, 'image/png'));
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
        showToast("画像をクリップボードにコピーしました！");
    } catch (err) {
        showToast("コピーに失敗しました。ダウンロードをご利用ください。");
    }
}

/**
 * Show Toast Notification
 */
function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('hidden');
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

// Polyfill for roundRect (older browsers)
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    }
}

// Start the app
init();
