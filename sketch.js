// ==================== 全局状态与配置 ====================
let state = 0; // 0: 信封, 1: 请柬信息内容, 2: 填写表单, 3: 提交成功烟花
let particles = [];
let bgParticles = [];
let sealAngle = 0;
let cardY, targetCardY;
let openProgress = 0;
let isOpening = false;

// 响应式尺寸
let cardW, cardH, cardX;
let formDiv, rsvpActionBtn; 

// 多巴胺莫兰迪艺术色系（调高了高级感与清透度）
let cPink = '#FFB5B8';
let cOrange = '#FFCAD4';
let cYellow = '#FFE5D9';
let cMint = '#D8F3DC';
let cLilac = '#E8DBFC';
let cDeepPurple = '#7209B7';
let cAccent = '#F72585'; // 亮眼的高潮多巴胺色

const weddingData = {
  title: "✨ WE ARE GETTING MARRIED ✨",
  names: "CHRIS & ALEX",
  intro: "我们要结婚啦！\n诚邀你来参加这场充满快乐与色彩的派对，一起多巴胺爆棚！",
  time: "📅 2026.10.18 11:58",
  location: "📍 杭州 · 梦幻艺术庄园大厅"
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 1. 动态注入现代艺术风的 Google 字体与高级 CSS
  injectModernStyles();
  
  // 2. 创建精细化的 HTML DOM 元素
  createModernDOM();
  
  // 3. 计算完美的视口比例
  initDimensions();
  
  // 4. 浮动艺术气泡
  for (let i = 0; i < 12; i++) {
    bgParticles.push(new BubbleParticle());
  }
}

function initDimensions() {
  // 严格限制移动端卡片纵横比，留出上下呼吸空间
  cardW = min(width * 0.86, 360);
  cardH = min(height * 0.78, 560);
  cardX = (width - cardW) / 2;
  cardY = height + 100;
  targetCardY = (height - cardH) / 2;
  
  // 动态定位 HTML 元素，确保无论什么手机都不错位
  if (rsvpActionBtn) {
    rsvpActionBtn.style('top', (targetCardY + cardH - 75) + 'px');
  }
  if (formDiv) {
    formDiv.style('top', (targetCardY + cardH * 0.42) + 'px');
    formDiv.style('width', (cardW - 60) + 'px');
  }
}

function draw() {
  // 艺术渐变背景
  drawArtBackground();
  
  // 背景柔焦粒子
  for (let p of bgParticles) {
    p.update();
    p.display();
  }

  // 状态机流转
  if (state === 0) {
    drawEnvelope();
  } else {
    if (isOpening) {
      cardY = lerp(cardY, targetCardY, 0.1);
      if (abs(cardY - targetCardY) < 1) {
        isOpening = false;
        // 展开动画结束后，第一阶段只显示艺术引导按钮
        if (state === 1) rsvpActionBtn.style('display', 'block');
      }
    }
    drawInvitationCard();
  }

  // 全局粒子特效层
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) particles.splice(i, 1);
  }
}

// ==================== 现代高级视觉样式注入 ====================

function injectModernStyles() {
  // 引入高级几何英文字体
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap';
  document.head.appendChild(link);

  let styleTag = document.createElement('style');
  styleTag.innerHTML = `
    body { margin: 0; padding: 0; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif; }
    
    /* 阶段1的艺术按钮：告别笨重粗边框，采用微光悬浮设计 */
    .rsvp-trigger-btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 36px;
      border: none;
      border-radius: 30px;
      font-size: 15px;
      font-weight: 700;
      color: white;
      background: linear-gradient(45deg, ${cAccent}, #7209B7);
      box-shadow: 0 10px 25px rgba(247, 37, 133, 0.35);
      cursor: pointer;
      display: none;
      z-index: 20;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }
    .rsvp-trigger-btn:active { transform: translateX(-50%) scale(0.96); opacity: 0.9; }

    /* 阶段2的表单容器：内部纵向排版，优雅透气 */
    .modern-form-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: none;
      flex-direction: column;
      gap: 16px;
      z-index: 20;
      box-sizing: border-box;
    }
    .modern-input, .modern-select {
      width: 100%;
      padding: 14px 16px;
      border: 1.5px solid rgba(0,0,0,0.1);
      border-radius: 14px;
      font-size: 15px;
      font-weight: 600;
      background-color: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(10px);
      box-sizing: border-box;
      transition: all 0.3s ease;
      color: #333;
    }
    .modern-input:focus, .modern-select:focus {
      border-color: ${cAccent};
      background-color: #FFF;
      box-shadow: 0 8px 20px rgba(247, 37, 133, 0.1);
      outline: none;
    }
    .modern-submit-btn {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 14px;
      font-size: 16px;
      font-weight: 700;
      color: #FFF;
      background: #000; /* 现代高对比度视觉黑 */
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: all 0.2s;
    }
    .modern-submit-btn:active { transform: scale(0.98); }
  `;
  document.head.appendChild(styleTag);
}

function createModernDOM() {
  // 阶段1：引导去填表的艺术按钮
  rsvpActionBtn = createButton('确认出席 ── RSVP 💌');
  rsvpActionBtn.addClass('rsvp-trigger-btn');
  rsvpActionBtn.mousePressed(() => {
    state = 2; // 切换到表单状态
    rsvpActionBtn.style('display', 'none');
    formDiv.style('display', 'flex');
  });

  // 阶段2：精致表单
  formDiv = createDiv('');
  formDiv.addClass('modern-form-container');
  
  let nameInput = createInput('');
  nameInput.attribute('placeholder', '输入您的姓名 Guest Name');
  nameInput.addClass('modern-input');
  nameInput.id('wName');
  nameInput.parent(formDiv);
  
  let countSelect = createSelect();
  countSelect.addClass('modern-select');
  countSelect.id('wCount');
  countSelect.option('✨ 1人奔赴派对狂欢', '1');
  countSelect.option('👩‍❤️‍👨 2人共享浪漫同行', '2');
  countSelect.option('👪 3人阖家温馨光临', '3');
  countSelect.option('🕊️ 远方送上挚爱祝福', '0');
  countSelect.parent(formDiv);
  
  let submitBtn = createButton('送出多巴胺祝福 ──');
  submitBtn.addClass('modern-submit-btn');
  submitBtn.mousePressed(handleFormSubmit);
  submitBtn.parent(formDiv);
}

// ==================== 艺术渲染逻辑 ====================

function drawArtBackground() {
  noStroke();
  let c1 = color('#F7F0FD');
  let c2 = color('#F0F7F4');
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawEnvelope() {
  push();
  translate(width / 2, height / 2);
  let envW = min(width * 0.84, 340);
  let envH = envW * 0.68;
  
  // 现代柔和流体阴影
  noStroke();
  fill(114, 9, 183, 20);
  rect(-envW/2, -envH/2 + 15, envW, envH, 24);
  
  // 信体
  stroke(255);
  strokeWeight(3);
  fill(cOrange);
  rect(-envW/2, -envH/2, envW, envH, 24);
  
  // 内衬艺术几何色块
  fill('#FFAAA6');
  noStroke();
  triangle(-envW/2, envH/2, envW/2, envH/2, 0, -10);
  
  // 提示语
  let breathe = sin(frameCount * 0.06) * 3;
  fill(cDeepPurple);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text("YOU ARE INVITED • CLICK SEAL", 0, -envH/2 - 25 + breathe);

  // 充满艺术感的心形火漆
  push();
  sealAngle += 0.008;
  rotate(sealAngle);
  fill(cAccent);
  for(let a = 0; a < TWO_PI; a += PI/3) {
    ellipse(cos(a)*12, sin(a)*12, 22, 22);
  }
  fill(255);
  textSize(14);
  text("❤️", 0, 1);
  pop();
  pop();
}

function drawInvitationCard() {
  push();
  // 移除硬黑边，换成纯白高雅卡片底色 + 极轻的渐变投影
  noStroke();
  fill(255, 30);
  rect(cardX + 5, cardY + 12, cardW, cardH, 28); // 柔和阴影层
  
  fill('#FFFDF6'); 
  rect(cardX, cardY, cardW, cardH, 28);
  
  // 顶部的多彩多巴胺波浪饰条，增加灵动感
  let barColors = [cPink, cYellow, cMint, cLilac];
  for(let i=0; i<4; i++) {
    fill(barColors[i]);
    rect(cardX + 30 + (i*20), cardY + 20, 14, 6, 3);
  }
  
  // --- 区域划分与文本绝对控制（彻底防止错位挤压） ---
  let contentCenterX = cardX + cardW / 2;
  
  if (state === 1) {
    // 【阶段 1：纯艺术内容展示页】
    
    // 1. 云朵波普风格的婚礼照片画框
    let photoY = cardY + 45;
    let photoW = cardW - 60;
    let photoH = photoW * 0.52;
    
    fill(cLilac);
    rect(cardX + 34, photoY + 4, photoW, photoH, 18); // 错位美感衬底
    
    fill(cMint);
    rect(cardX + 30, photoY, photoW, photoH, 18);
    
    // 照片内纯矢量插画
    push();
    translate(cardX + 30, photoY);
    drawingContext.clip();
    fill(cYellow); ellipse(photoW - 35, 30, 35, 35); // 太阳
    fill(cPink); ellipse(photoW*0.35, photoH*0.85, 70, 70); // 抽象人物
    fill('#72EFDD'); ellipse(photoW*0.65, photoH*0.9, 60, 60);
    fill(cAccent); textSize(26); textAlign(CENTER,CENTER);
    text("💖", photoW/2, photoH/2 + sin(frameCount*0.07)*3);
    pop();
    
    // 2. 高级排版文本层 (全包裹在 push 保证全局样式不污染)
    push();
    textAlign(CENTER, TOP);
    
    // 婚礼小副标
    fill(cDeepPurple); textStyle(BOLD); textSize(11);
    text(weddingData.title, contentCenterX, photoY + photoH + 28);
    
    // 主角名字（放大，极具现代张力）
    fill('#111111'); textStyle(BOLD); textSize(30);
    text(weddingData.names, contentCenterX, photoY + photoH + 46);
    
    // 浪漫短文案（使用带限定宽度的单点绘制，安全换行）
    fill('#555555'); textStyle(NORMAL); textSize(13);
    let introY = photoY + photoH + 105;
    text(weddingData.intro, contentCenterX, introY);
    
    // 极简艺术分割点
    fill(cAccent); ellipse(contentCenterX, introY + 52, 5, 5);
    
    // 时间与地点（轻量高颜值的色彩色块包裹）
    let blockY = introY + 72;
    
    fill(cYellow); rect(contentCenterX - 130, blockY, 260, 30, 8);
    fill('#222'); textStyle(BOLD); textSize(12);
    text(weddingData.time, contentCenterX, blockY + 8);
    
    fill(cMint); rect(contentCenterX - 130, blockY + 40, 260, 30, 8);
    fill('#222'); textStyle(BOLD); textSize(12);
    text(weddingData.location, contentCenterX, blockY + 48);
    pop();
    
  } else if (state === 2) {
    // 【阶段 2：交互表单激活页】
    // 表单由 HTML DOM 完美控制，Canvas 仅负责腾出上半部分绘制极具艺术感的过渡动画
    push();
    textAlign(CENTER, TOP);
    fill(cAccent); textStyle(BOLD); textSize(32);
    text("R. S. V. P", contentCenterX, cardY + 55);
    
    fill('#444'); textStyle(NORMAL); textSize(14);
    text("期待收到你的赴宴回执 ✨", contentCenterX, cardY + 105);
    
    // 表单上方画一个可爱跳动的信鸽/爱心动画
    textSize(40);
    text("💌", contentCenterX, cardY + 140 + sin(frameCount*0.09)*5);
    pop();
    
  } else if (state === 3) {
    // 【阶段 3：成功状态页】
    push();
    textAlign(CENTER, CENTER);
    fill(cAccent); textStyle(BOLD); textSize(24);
    text("🎉 登记成功啦！", contentCenterX, cardY + cardH*0.4);
    
    fill('#333'); textStyle(BOLD); textSize(16);
    text("小两口已收到您的祝福\n期待那天与你相遇 💖", contentCenterX, cardY + cardH*0.52);
    pop();
  }
  
  pop();
}

// ==================== 响应式手势与提交逻辑 ====================

function mousePressed() {
  if (state === 0) {
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    if (d < 50) {
      for (let i = 0; i < 25; i++) particles.push(new Particle(width / 2, height / 2, cAccent));
      state = 1;
      isOpening = true;
    }
  }
}

function touchStarted() {
  mousePressed();
  return false; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initDimensions();
}

function handleFormSubmit() {
  let name = document.getElementById('wName').value.trim();
  if (name === "") {
    alert("请留下您的名字哦 💖");
    return;
  }
  
  formDiv.style('display', 'none');
  state = 3; // 切换至大捷庆祝状态
  
  // 狂喷满屏高饱和多巴胺礼花
  let colors = [cPink, cAccent, cLilac, '#4CC9F0', '#F72585'];
  for (let k = 0; k < 5; k++) {
    let lX = random(width * 0.15, width * 0.85);
    let lY = random(height * 0.2, height * 0.5);
    for (let i = 0; i < 35; i++) {
      particles.push(new Particle(lX, lY, random(colors)));
    }
  }
}

// ==================== 粒子动效类 ====================

class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 6));
    this.acc = createVector(0, 0.12);
    this.lifespan = 255;
    this.color = col;
    this.size = random(6, 12);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 4;
  }
  display() {
    push();
    noStroke();
    let c = color(this.color);
    c.setAlpha(this.lifespan);
    fill(c);
    // 现代艺术碎屑感：圆点和圆角方块混合
    if(this.size > 9) {
      rect(this.pos.x, this.pos.y, this.size, this.size, 3);
    } else {
      ellipse(this.pos.x, this.pos.y, this.size);
    }
    pop();
  }
  isDead() { return this.lifespan < 0; }
}

class BubbleParticle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-0.2, 0.2), random(-0.4, -0.9));
    this.size = random(40, 90);
    let baseColors = [cPink, cYellow, cMint, cLilac];
    this.col = color(random(baseColors));
    this.col.setAlpha(30); 
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
      this.pos.x = random(width);
    }
  }
  display() {
    push();
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }
}