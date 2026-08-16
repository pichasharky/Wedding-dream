(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const L={couple:{groom:"陈开轩",bride:"朱怡颖"},date:{display:"2026.09.19",displayCn:"2026 年 9 月 19 日",iso:"2026-09-19"},venue:{name:"青岛胶州万豪酒店",address:"山东省青岛市胶州少海中路88号"},invitation:{heading:"婚礼邀请函",title:["今天，","我们想用一场温暖的宴会","将这份幸福分享给您"],body:["这是一次爱的答谢，","更是一次亲友的欢聚","","期待您到来","举杯共叙情谊，","愿我们的相聚充满欢笑","愿您、愿我、愿我们","永远自由肆意、喜乐平安"]},video:{src:"/videos/invitation-h264-wechat.mp4",poster:"/images/video-poster.jpg"},photo:{src:"/images/everyday.jpg",alt:"陈开轩与朱怡颖在热闹餐桌前的日常合影"}},B=(e,i)=>["【婚礼回执】",`婚礼日期：${i.date.display}`,`地点：${i.venue.name}`,`姓名：${e.name||"（未填写）"}`,e.attend==="yes"?`是否到场：是，共 ${e.count||"1"} 人`:e.attend==="no"?"是否到场：否":"是否到场：（未填写）",e.note?`备注或祝福：${e.note}`:""].filter(Boolean).join(`
`),W=e=>{try{const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.left="-9999px",i.setAttribute("readonly",""),document.body.appendChild(i),i.focus(),i.select();const s=document.execCommand("copy");return document.body.removeChild(i),s}catch{return!1}};function N(e,i){const s=e.querySelector("[data-rsvp-form]"),n=e.querySelector("[data-rsvp-feedback]"),a=e.querySelector("[data-rsvp-fallback]"),r=e.querySelector("[data-field-count]"),l=r?.querySelector('input[name="count"]'),E=e.querySelector('input[name="company"]'),I=e.querySelectorAll('input[name="attend"]'),p=s?.querySelector('button[type="submit"]');if(!s||!n||!a||!r||!l||!p)return;const V=f=>{f==="yes"?(r.classList.add("is-active"),l.disabled=!1,l.required=!0,l.value||(l.value="1")):(r.classList.remove("is-active"),l.disabled=!0,l.required=!1,l.value="")};s.addEventListener("change",f=>{const c=f.target;c.name==="attend"&&V(c.value)}),s.addEventListener("submit",async f=>{if(f.preventDefault(),E&&E.value)return;const c=new FormData(s),g={name:String(c.get("name")||"").trim(),attend:String(c.get("attend")||""),count:String(c.get("count")||"").trim(),note:String(c.get("note")||"").trim()};if(n.textContent="",a.hidden=!0,a.textContent="",!g.name){n.textContent="请先填写您的姓名。";const d=s.elements.namedItem("name");d instanceof HTMLElement&&d.focus();return}if(!g.attend){n.textContent="请选择是否到场。",I[0]?.focus();return}if(g.attend==="yes"){const d=Number(g.count);if(!Number.isInteger(d)||d<1||d>20){n.textContent="请填写 1 至 20 之间的到场人数。",l.focus();return}}const S=B(g,i),_=p.textContent;p.disabled=!0,p.textContent="正在整理…",s.setAttribute("aria-busy","true");try{let d=!1;if(navigator.clipboard&&window.isSecureContext)try{await navigator.clipboard.writeText(S),d=!0}catch{d=!1}d||(d=W(S)),d?n.textContent="回复已复制，去微信发给新人吧。":(a.hidden=!1,a.textContent=S,n.textContent="暂时没复制成功，请长按上方文字选择复制。")}finally{p.disabled=!1,p.textContent=_||"复制回信",s.removeAttribute("aria-busy")}})}function o(e){return`/Wedding-dream/${e.replace(/^\/+/,"")}`}function D(e){const i=e.invitation.body.map(a=>a?`<span class="invitation-line">${a}</span>`:'<span class="invitation-spacer" aria-hidden="true"></span>').join(""),s=e.invitation.title.map(a=>`<span class="invitation-headline-line">${a}</span>`).join(""),n=a=>`
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
        <img class="line-art-accent line-art-accent--star line-art-accent--star-middle" src="${o("/images/line-art/star.png")}" alt="" aria-hidden="true" />
        <img class="line-art-accent line-art-accent--star line-art-accent--star-bottom" src="${o("/images/line-art/star.png")}" alt="" aria-hidden="true" />
        <img class="line-art-accent line-art-accent--dots" src="${o("/images/line-art/dots.png")}" alt="" aria-hidden="true" />
        ${n("paw-print--upper")}
        ${n("paw-print--middle")}
        ${n("paw-print--lower")}

        <section class="invitation-layout" aria-label="婚礼邀请词">
          <img class="layout-art layout-art--fountain" src="${o("/images/line-art/cake.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--bulldog" src="${o("/images/line-art/bulldog.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--log" src="${o("/images/line-art/log.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--plate" src="${o("/images/line-art/plate.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--rock-large" src="${o("/images/line-art/rock-large.png")}" alt="" aria-hidden="true" />
          <img class="layout-art layout-art--rock-small" src="${o("/images/line-art/rock-small.png")}" alt="" aria-hidden="true" />
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
          <img src="${o(e.photo.src)}" alt="${e.photo.alt}" />
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
  `}function O(e){return`
    <section
      class="video-stage"
      aria-label="婚礼开场视频"
      role="button"
      tabindex="0"
    >
      <img
        class="video-stage__poster"
        src="${o(e.video.poster)}"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
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
        poster="${o(e.video.poster)}"
        aria-hidden="true"
      >
        <source src="${o(e.video.src)}" type="video/mp4" />
      </video>
      <div class="video-stage__status" data-video-status role="status" aria-live="polite"></div>
    </section>
    <audio class="wedding-music" loop preload="none" aria-hidden="true">
      <source src="${o("/audio/wedding-piano.m4a")}" type="audio/mp4" />
    </audio>
  `}const M=document.querySelector("#app");if(!M)throw new Error("Invitation root element was not found.");M.innerHTML=O(L)+D(L);const m=document.querySelector(".video-stage"),k=document.querySelector(".rsvp-stage"),t=document.querySelector(".video-stage__media"),b=document.querySelector(".wedding-music"),C=document.querySelector("[data-video-status]"),x=document.querySelector(".fade-black"),q=window.matchMedia("(prefers-reduced-motion: reduce)"),R=window;if(!m||!k)throw new Error("Stage elements were not found.");N(k,L);let h=!1,$=!1,v=0;const y=async()=>{if(!b)return!1;b.autoplay=!0,b.loop=!0,b.volume=.22;try{return await b.play(),!0}catch{return!1}},w=()=>{$||h||($=!0,window.clearTimeout(v),m.classList.remove("is-playing"),m.classList.add("has-video-error"),C&&(C.textContent=""))},j=()=>{$||h||window.clearTimeout(v)},F=()=>{window.clearTimeout(v),m.classList.add("is-playing"),y()},A=()=>{window.clearTimeout(v),v=window.setTimeout(()=>{(!t||t.readyState<HTMLMediaElement.HAVE_CURRENT_DATA)&&w()},8e3)},u=async()=>{if(!t||$||h)return!1;t.autoplay=!0,t.defaultMuted=!0,t.muted=!0,t.volume=0,t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.setAttribute("x5-playsinline",""),t.setAttribute("x5-video-player-type","h5-page"),t.setAttribute("x5-video-player-fullscreen","false");try{return await t.play(),!0}catch{return!1}};t?(t.autoplay=!0,t.defaultMuted=!0,t.muted=!0,t.volume=0,t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.setAttribute("x5-playsinline",""),t.setAttribute("x5-video-player-type","h5-page"),t.setAttribute("x5-video-player-fullscreen","false"),t.addEventListener("loadeddata",j,{once:!0}),t.addEventListener("playing",F,{once:!0}),t.addEventListener("loadedmetadata",()=>{u()}),t.addEventListener("canplay",()=>{u()}),t.addEventListener("error",w,{once:!0}),t.addEventListener("stalled",A),t.addEventListener("abort",w,{once:!0}),A(),u()):w();const T=()=>{const e=R.WeixinJSBridge;if(e){e.invoke("getNetworkType",{},()=>{u().then(i=>{i&&y()})});return}u().then(i=>{i&&y()})};R.WeixinJSBridge?T():document.addEventListener("WeixinJSBridgeReady",T,{once:!0});window.addEventListener("pageshow",()=>{u().then(e=>{e&&y()})});document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&u().then(e=>{e&&y()})});const H=()=>{if(h)return;h=!0,window.clearTimeout(v),t?.pause(),x?.classList.add("is-on");const e=q.matches?60:260,i=q.matches?240:920;window.setTimeout(()=>{document.body.classList.add("at-rsvp"),k.focus({preventScroll:!0}),x?.classList.remove("is-on"),x?.classList.add("is-fading-out")},e),window.setTimeout(()=>{x?.classList.remove("is-fading-out")},i)},P=()=>{y(),H()};m.addEventListener("click",P);m.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),P())});
