(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const L={couple:{groom:"陈开轩",bride:"朱怡颖"},date:{display:"2026.09.19",displayCn:"2026 年 9 月 19 日",iso:"2026-09-19"},venue:{name:"青岛胶州万豪酒店",address:"山东省青岛市胶州少海中路88号"},invitation:{heading:"婚礼邀请函",title:["今天，","我们想用一场温暖的宴会","将这份幸福分享给您"],body:["这是一次爱的答谢，","更是一次亲友的欢聚","","期待您到来","举杯共叙情谊，","愿我们的相聚充满欢笑","愿您、愿我、愿我们","永远自由肆意、喜乐平安"]},video:{src:"/videos/invitation-h264-wechat.mp4",poster:"/images/video-poster.jpg"},photo:{src:"/images/everyday.jpg",alt:"陈开轩与朱怡颖在热闹餐桌前的日常合影"}},N=(e,i)=>["【婚礼回执】",`婚礼日期：${i.date.display}`,`地点：${i.venue.name}`,`姓名：${e.name||"（未填写）"}`,e.attend==="yes"?`是否到场：是，共 ${e.count||"1"} 人`:e.attend==="no"?"是否到场：否":"是否到场：（未填写）",e.note?`备注或祝福：${e.note}`:""].filter(Boolean).join(`
`),D=e=>{try{const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.left="-9999px",i.setAttribute("readonly",""),document.body.appendChild(i),i.focus(),i.select();const s=document.execCommand("copy");return document.body.removeChild(i),s}catch{return!1}};function O(e,i){const s=e.querySelector("[data-rsvp-form]"),n=e.querySelector("[data-rsvp-feedback]"),a=e.querySelector("[data-rsvp-fallback]"),r=e.querySelector("[data-field-count]"),o=r?.querySelector('input[name="count"]'),E=e.querySelector('input[name="company"]'),B=e.querySelectorAll('input[name="attend"]'),p=s?.querySelector('button[type="submit"]');if(!s||!n||!a||!r||!o||!p)return;const W=y=>{y==="yes"?(r.classList.add("is-active"),o.disabled=!1,o.required=!0,o.value||(o.value="1")):(r.classList.remove("is-active"),o.disabled=!0,o.required=!1,o.value="")};s.addEventListener("change",y=>{const u=y.target;u.name==="attend"&&W(u.value)}),s.addEventListener("submit",async y=>{if(y.preventDefault(),E&&E.value)return;const u=new FormData(s),f={name:String(u.get("name")||"").trim(),attend:String(u.get("attend")||""),count:String(u.get("count")||"").trim(),note:String(u.get("note")||"").trim()};if(n.textContent="",a.hidden=!0,a.textContent="",!f.name){n.textContent="请先填写您的姓名。";const d=s.elements.namedItem("name");d instanceof HTMLElement&&d.focus();return}if(!f.attend){n.textContent="请选择是否到场。",B[0]?.focus();return}if(f.attend==="yes"){const d=Number(f.count);if(!Number.isInteger(d)||d<1||d>20){n.textContent="请填写 1 至 20 之间的到场人数。",o.focus();return}}const S=N(f,i),_=p.textContent;p.disabled=!0,p.textContent="正在整理…",s.setAttribute("aria-busy","true");try{let d=!1;if(navigator.clipboard&&window.isSecureContext)try{await navigator.clipboard.writeText(S),d=!0}catch{d=!1}d||(d=D(S)),d?n.textContent="回复已复制，去微信发给新人吧。":(a.hidden=!1,a.textContent=S,n.textContent="暂时没复制成功，请长按上方文字选择复制。")}finally{p.disabled=!1,p.textContent=_||"复制回信",s.removeAttribute("aria-busy")}})}function l(e){return`/Wedding-dream/${e.replace(/^\/+/,"")}`}function j(e){const i=e.invitation.body.map(a=>a?`<span class="invitation-line">${a}</span>`:'<span class="invitation-spacer" aria-hidden="true"></span>').join(""),s=e.invitation.title.map(a=>`<span class="invitation-headline-line">${a}</span>`).join(""),n=a=>`
    <svg class="paw-print ${a}" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="42" rx="15" ry="13" transform="rotate(-4 32 42)" />
      <ellipse cx="14" cy="25" rx="7" ry="9" transform="rotate(-24 14 25)" />
      <ellipse cx="28" cy="17" rx="7" ry="9" transform="rotate(-7 28 17)" />
      <ellipse cx="44" cy="19" rx="7" ry="9" transform="rotate(13 44 19)" />
      <ellipse cx="55" cy="31" rx="6" ry="8" transform="rotate(28 55 31)" />
    </svg>
  `;return`
    <section class="rsvp-stage" aria-label="婚礼邀请与宾客回复" tabindex="-1">
      <article class="rsvp-card">
        <img class="line-art-accent line-art-accent--star line-art-accent--star-middle" src="${l("/images/line-art/star.png")}" alt="" aria-hidden="true" />
        <img class="line-art-accent line-art-accent--star line-art-accent--star-bottom" src="${l("/images/line-art/star.png")}" alt="" aria-hidden="true" />
        <img class="line-art-accent line-art-accent--dots" src="${l("/images/line-art/dots.png")}" alt="" aria-hidden="true" />
        ${n("paw-print--upper")}
        ${n("paw-print--middle")}
        ${n("paw-print--lower")}

        <section class="invitation-layout" aria-label="婚礼邀请词">
          <img class="layout-art layout-art--fountain" src="${l("/images/line-art/cake.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--bulldog" src="${l("/images/line-art/bulldog.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--log" src="${l("/images/line-art/log.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--plate" src="${l("/images/line-art/plate.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--rock-large" src="${l("/images/line-art/rock-large.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--rock-small" src="${l("/images/line-art/rock-small.png")}" alt="" aria-hidden="true" />
          ${n("paw-print--trail-small")}
          ${n("paw-print--trail-large")}
          ${n("paw-print--trail-medium")}

          <!-- 标题 -->
          <header class="rsvp-header">
            <h1 class="rsvp-title">${e.invitation.heading}</h1>
            <span class="rsvp-title-en">Wedding Invitation</span>
          </header>

          <!-- 邀请词 -->
          <p class="invitation-headline">${s}</p>
          <div class="invitation-body">${i}</div>
        </section>

        <figure class="rsvp-photo">
          <img src="${l(e.photo.src)}" alt="${e.photo.alt}" />
        </figure>

        <!-- 真实婚礼信息；不使用参考图中的示例姓名与日期 -->
        <section class="event-details" aria-label="婚礼信息">
          <p class="event-couple">${e.couple.groom} <span aria-hidden="true">×</span> ${e.couple.bride}</p>
          <span class="event-label" aria-hidden="true">TIME</span>
          <time class="event-date" datetime="${e.date.iso}">${e.date.displayCn}</time>
          <p class="event-venue">${e.venue.name}</p>
          <address class="event-address">${e.venue.address}</address>
        </section>

        <!-- 宾客信息小标题 -->
        <header class="rsvp-form-header">
          <h2 class="rsvp-form-title">宾客回复</h2>
          <span class="rsvp-form-title-en">RSVP</span>
        </header>

        <!-- RSVP 表单 -->
        <p class="rsvp-reminder">期待与您相见，也请留下您的出席信息，以便我们提前做好准备，与您共度这份喜悦。</p>

        <form class="rsvp-form" data-rsvp-form aria-label="宾客回复" novalidate>
          <label class="rsvp-field">
            <span>您的姓名</span>
            <input type="text" name="name" required autocomplete="name" />
          </label>

          <fieldset class="rsvp-field rsvp-field--attend">
            <legend>是否到场</legend>
            <label class="rsvp-radio">
              <input type="radio" name="attend" value="yes" data-attend="yes" required />
              <span>是</span>
            </label>
            <label class="rsvp-radio">
              <input type="radio" name="attend" value="no" data-attend="no" />
              <span>否</span>
            </label>
          </fieldset>

          <label class="rsvp-field rsvp-field--count" data-field-count>
            <span>到场人数</span>
            <input type="number" name="count" min="1" max="20" inputmode="numeric" disabled />
          </label>

          <label class="rsvp-field">
            <span>备注或祝福</span>
            <textarea name="note" rows="2" maxlength="120" placeholder="（可选）"></textarea>
          </label>

          <input type="text" name="company" class="rsvp-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <button type="submit" class="rsvp-submit">复制回信</button>

          <p class="rsvp-feedback" data-rsvp-feedback role="status" aria-live="polite"></p>
          <pre class="rsvp-fallback" data-rsvp-fallback hidden></pre>
        </form>

        <footer class="rsvp-footer" aria-hidden="true">
          <span>·</span>
        </footer>
      </article>
    </section>
  `}function F(e){return`
    <section
      class="video-stage"
      aria-label="婚礼开场视频"
      role="button"
      tabindex="0"
    >
      <video
        class="video-stage__media"
        autoplay
        muted
        loop
        playsinline
        webkit-playsinline
        x5-playsinline
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
        preload="auto"
        disablepictureinpicture
        poster="${l(e.video.poster)}"
        aria-hidden="true"
      >
        <source src="${l(e.video.src)}" type="video/mp4" />
      </video>
      <div class="video-stage__status" data-video-status role="status" aria-live="polite"></div>
    </section>
    <audio class="wedding-music" autoplay loop preload="auto" aria-hidden="true">
      <source src="${l("/audio/wedding-piano.wav")}" type="audio/wav" />
    </audio>
  `}const M=document.querySelector("#app");if(!M)throw new Error("Invitation root element was not found.");M.innerHTML=F(L)+j(L);const m=document.querySelector(".video-stage"),k=document.querySelector(".rsvp-stage"),t=document.querySelector(".video-stage__media"),g=document.querySelector(".wedding-music"),C=document.querySelector("[data-video-status]"),$=document.querySelector(".fade-black"),q=window.matchMedia("(prefers-reduced-motion: reduce)"),P=window;if(!m||!k)throw new Error("Stage elements were not found.");O(k,L);let h=!1,x=!1,R=!1,w=0;const v=async()=>{if(!g)return!1;g.autoplay=!0,g.loop=!0,g.volume=.22;try{return await g.play(),!0}catch{return!1}},b=()=>{x||h||(x=!0,window.clearTimeout(w),m.classList.remove("is-playing"),m.classList.add("has-video-error"),C&&(C.textContent="视频暂时打不开 · 点这里继续"))},I=()=>{x||h||(window.clearTimeout(w),m.classList.add("is-playing"))},H=()=>{R=!0,I()},A=()=>{window.clearTimeout(w),w=window.setTimeout(()=>{(!t||t.readyState<HTMLMediaElement.HAVE_CURRENT_DATA)&&b()},8e3)},c=async()=>{if(!t||x||h)return!1;t.autoplay=!0,t.defaultMuted=!0,t.muted=!0,t.volume=0,t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.setAttribute("x5-playsinline",""),t.setAttribute("x5-video-player-type","h5-page"),t.setAttribute("x5-video-player-fullscreen","false");try{return await t.play(),!0}catch{return!1}};t?(t.autoplay=!0,t.defaultMuted=!0,t.muted=!0,t.volume=0,t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.setAttribute("x5-playsinline",""),t.setAttribute("x5-video-player-type","h5-page"),t.setAttribute("x5-video-player-fullscreen","false"),t.addEventListener("loadeddata",I,{once:!0}),t.addEventListener("playing",H,{once:!0}),t.addEventListener("loadedmetadata",()=>{c()}),t.addEventListener("canplay",()=>{c()}),t.addEventListener("error",b,{once:!0}),t.addEventListener("stalled",A),t.addEventListener("abort",b,{once:!0}),A(),c()):b();const T=()=>{const e=P.WeixinJSBridge;if(e){e.invoke("getNetworkType",{},()=>{c(),v()});return}c(),v()};P.WeixinJSBridge?T():document.addEventListener("WeixinJSBridgeReady",T,{once:!0});window.addEventListener("pageshow",()=>{c(),v()});document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(c(),v())});const J=()=>{if(h)return;h=!0,window.clearTimeout(w),t?.pause(),$?.classList.add("is-on");const e=q.matches?60:260,i=q.matches?240:920;window.setTimeout(()=>{document.body.classList.add("at-rsvp"),k.focus({preventScroll:!0}),$?.classList.remove("is-on"),$?.classList.add("is-fading-out")},e),window.setTimeout(()=>{$?.classList.remove("is-fading-out")},i)},V=()=>{if(v(),!t||x||R||!t.paused){J();return}c().then(e=>{!e&&t.error&&b()})};m.addEventListener("click",V);m.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),V())});v();
