(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const k={couple:{groom:"陈开轩",bride:"朱怡颖"},date:{display:"2026.09.19",displayCn:"2026 年 9 月 19 日",iso:"2026-09-19"},banquet:{display:"下午五点",iso:"17:00"},venue:{name:"青岛胶州万豪酒店",address:"山东省青岛市胶州少海中路88号"},invitation:{heading:"婚礼邀请函",title:["今天，","我们想用一场温暖的宴会","将这份幸福分享给您"],body:["这是一次爱的答谢，","更是一次亲友的欢聚","","期待您到来","举杯共叙情谊，","愿我们的相聚充满欢笑","愿您、愿我、愿我们","永远自由肆意、喜乐平安"]},video:{src:"/videos/invitation-fast.mp4",poster:"/images/video-poster.jpg"},photo:{src:"/images/invitation.jpg",alt:"陈开轩与朱怡颖的婚礼合影"}},F=(e,a)=>["【婚礼回执】",`婚礼日期：${a.date.display}`,`晚宴时间：${a.banquet.display}`,`地点：${a.venue.name}`,`姓名：${e.name||"（未填写）"}`,e.attend==="yes"?`是否到场：是，共 ${e.count||"1"} 人`:e.attend==="no"?"是否到场：否":"是否到场：（未填写）",e.note?`备注或祝福：${e.note}`:""].filter(Boolean).join(`
`),H=e=>{try{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.left="-9999px",a.setAttribute("readonly",""),document.body.appendChild(a),a.focus(),a.select();const i=document.execCommand("copy");return document.body.removeChild(a),i}catch{return!1}};function J(e,a){const i=e.querySelector("[data-rsvp-form]"),o=e.querySelector("[data-rsvp-feedback]"),r=e.querySelector("[data-rsvp-fallback]"),n=e.querySelector("[data-field-count]"),s=n?.querySelector('input[name="count"]'),P=e.querySelector('input[name="company"]'),N=e.querySelectorAll('input[name="attend"]'),m=i?.querySelector('button[type="submit"]');if(!i||!o||!r||!n||!s||!m)return;const O=f=>{f==="yes"?(n.classList.add("is-active"),s.disabled=!1,s.required=!0,s.value||(s.value="1")):(n.classList.remove("is-active"),s.disabled=!0,s.required=!1,s.value="")};i.addEventListener("change",f=>{const u=f.target;u.name==="attend"&&O(u.value)}),i.addEventListener("submit",async f=>{if(f.preventDefault(),P&&P.value)return;const u=new FormData(i),b={name:String(u.get("name")||"").trim(),attend:String(u.get("attend")||""),count:String(u.get("count")||"").trim(),note:String(u.get("note")||"").trim()};if(o.textContent="",r.hidden=!0,r.textContent="",!b.name){o.textContent="请先填写您的姓名。";const l=i.elements.namedItem("name");l instanceof HTMLElement&&l.focus();return}if(!b.attend){o.textContent="请选择是否到场。",N[0]?.focus();return}if(b.attend==="yes"){const l=Number(b.count);if(!Number.isInteger(l)||l<1||l>20){o.textContent="请填写 1 至 20 之间的到场人数。",s.focus();return}}const S=F(b,a),j=m.textContent;m.disabled=!0,m.textContent="正在整理…",i.setAttribute("aria-busy","true");try{let l=!1;if(navigator.clipboard&&window.isSecureContext)try{await navigator.clipboard.writeText(S),l=!0}catch{l=!1}l||(l=H(S)),l?o.textContent="回复已复制，去微信发给新人吧。":(r.hidden=!1,r.textContent=S,o.textContent="暂时没复制成功，请长按上方文字选择复制。")}finally{m.disabled=!1,m.textContent=j||"复制回信",i.removeAttribute("aria-busy")}})}function h(e){return`/Wedding-dream/${e.replace(/^\/+/,"")}`}function z(e){const a="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",i=s=>`src="${a}" data-src="${h(s)}" loading="lazy" decoding="async"`,o=e.invitation.body.map(s=>s?`<span class="invitation-line">${s}</span>`:'<span class="invitation-spacer" aria-hidden="true"></span>').join(""),r=e.invitation.title.map(s=>`<span class="invitation-headline-line">${s}</span>`).join(""),n=s=>`
    <svg class="paw-print ${s}" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="42" rx="15" ry="13" transform="rotate(-4 32 42)" />
      <ellipse cx="14" cy="25" rx="7" ry="9" transform="rotate(-24 14 25)" />
      <ellipse cx="28" cy="17" rx="7" ry="9" transform="rotate(-7 28 17)" />
      <ellipse cx="44" cy="19" rx="7" ry="9" transform="rotate(13 44 19)" />
      <ellipse cx="55" cy="31" rx="6" ry="8" transform="rotate(28 55 31)" />
    </svg>
  `;return`
    <section class="rsvp-stage" aria-label="婚礼邀请与宾客回复" tabindex="-1">
      <article class="rsvp-card">
        <img class="line-art-accent line-art-accent--star line-art-accent--star-middle" ${i("/images/line-art/star.png")} alt="" aria-hidden="true" />
        <img class="line-art-accent line-art-accent--star line-art-accent--star-bottom" ${i("/images/line-art/star.png")} alt="" aria-hidden="true" />
        <img class="line-art-accent line-art-accent--dots" ${i("/images/line-art/dots.png")} alt="" aria-hidden="true" />
        ${n("paw-print--upper")}
        ${n("paw-print--middle")}
        ${n("paw-print--lower")}

        <section class="invitation-layout" aria-label="婚礼邀请词">
          <img class="layout-art layout-art--fountain" ${i("/images/line-art/cake.png")} alt="" aria-hidden="true" />
          <img class="layout-art layout-art--bulldog" ${i("/images/line-art/bulldog.png")} alt="" aria-hidden="true" />
          <img class="layout-art layout-art--log" ${i("/images/line-art/log.png")} alt="" aria-hidden="true" />
          <img class="layout-art layout-art--plate" ${i("/images/line-art/plate.png")} alt="" aria-hidden="true" />
          <img class="layout-art layout-art--rock-large" ${i("/images/line-art/rock-large.png")} alt="" aria-hidden="true" />
          <img class="layout-art layout-art--rock-small" ${i("/images/line-art/rock-small.png")} alt="" aria-hidden="true" />
          ${n("paw-print--trail-small")}
          ${n("paw-print--trail-large")}
          ${n("paw-print--trail-medium")}

          <!-- 标题 -->
          <header class="rsvp-header">
            <h1 class="rsvp-title">${e.invitation.heading}</h1>
            <span class="rsvp-title-en">Wedding Invitation</span>
          </header>

          <!-- 邀请词 -->
          <p class="invitation-headline">${r}</p>
          <div class="invitation-body">${o}</div>
        </section>

        <figure class="rsvp-photo">
          <img ${i(e.photo.src)} alt="${e.photo.alt}" />
        </figure>

        <!-- 真实婚礼信息；不使用参考图中的示例姓名与日期 -->
        <section class="event-details" aria-label="婚礼信息">
          <p class="event-couple">${e.couple.groom} <span aria-hidden="true">×</span> ${e.couple.bride}</p>
          <span class="event-label" aria-hidden="true">TIME</span>
          <time class="event-date" datetime="${e.date.iso}">${e.date.displayCn}</time>
          <p class="event-banquet-time">晚宴时间：<time datetime="${e.banquet.iso}">${e.banquet.display}</time></p>
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
  `}function G(e){return`
    <section
      class="video-stage"
      aria-label="婚礼开场视频"
      role="button"
      tabindex="0"
    >
      <img
        class="video-stage__poster"
        src="${h(e.video.poster)}"
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
        poster="${h(e.video.poster)}"
        aria-hidden="true"
      >
        <source src="${h(e.video.src)}" type="video/mp4" />
      </video>
      <div class="video-stage__status" data-video-status role="status" aria-live="polite"></div>
    </section>
    <audio class="wedding-music" autoplay loop preload="auto" aria-hidden="true">
      <source src="${h("/audio/mr-blue-banjo-boy.m4a")}" type="audio/mp4" />
    </audio>
  `}const V=document.querySelector("#app");if(!V)throw new Error("Invitation root element was not found.");V.innerHTML=G(k)+z(k);const v=document.querySelector(".video-stage"),L=document.querySelector(".rsvp-stage"),t=document.querySelector(".video-stage__media"),d=document.querySelector(".wedding-music"),R=document.querySelector("[data-video-status]"),w=document.querySelector(".fade-black"),M=window.matchMedia("(prefers-reduced-motion: reduce)"),_=window;if(!v||!L)throw new Error("Stage elements were not found.");J(L,k);let x=!1,A=!1,y=0,E=0,q=!1,g=null;const T=()=>{q||(q=!0,window.clearTimeout(E),L.querySelectorAll("img[data-src]").forEach(e=>{const a=e.dataset.src;a&&(e.src=a,e.removeAttribute("data-src"))}))},Q=()=>{q||(window.clearTimeout(E),E=window.setTimeout(T,800))},D=()=>{d&&(d.autoplay=!0,d.loop=!0,d.preload="auto",d.volume=.22)},c=()=>d?(D(),d.paused?g||(g=d.play().then(()=>!0).catch(()=>!1).finally(()=>{g=null}),g):Promise.resolve(!0)):Promise.resolve(!1);D();d?.load();c();const C=()=>{c()};document.addEventListener("touchstart",C,{capture:!0,once:!0,passive:!0});document.addEventListener("pointerdown",C,{capture:!0,once:!0});document.addEventListener("keydown",C,{capture:!0,once:!0});const $=()=>{A||x||(A=!0,window.clearTimeout(y),v.classList.remove("is-playing"),v.classList.add("has-video-error"),T(),R&&(R.textContent=""))},K=()=>{A||x||window.clearTimeout(y)},U=()=>{window.clearTimeout(y),v.classList.add("is-playing"),c(),Q()},B=()=>{window.clearTimeout(y),y=window.setTimeout(()=>{(!t||t.readyState<HTMLMediaElement.HAVE_CURRENT_DATA)&&$()},8e3)},p=async()=>{if(!t||A||x)return!1;t.autoplay=!0,t.defaultMuted=!0,t.muted=!0,t.volume=0,t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.setAttribute("x5-playsinline",""),t.setAttribute("x5-video-player-type","h5-page"),t.setAttribute("x5-video-player-fullscreen","false");try{return await t.play(),!0}catch{return!1}};t?(t.autoplay=!0,t.defaultMuted=!0,t.muted=!0,t.volume=0,t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.setAttribute("x5-playsinline",""),t.setAttribute("x5-video-player-type","h5-page"),t.setAttribute("x5-video-player-fullscreen","false"),t.addEventListener("loadeddata",K,{once:!0}),t.addEventListener("playing",U,{once:!0}),t.addEventListener("loadedmetadata",()=>{p()}),t.addEventListener("canplay",()=>{p()}),t.addEventListener("error",$,{once:!0}),t.addEventListener("stalled",B),t.addEventListener("abort",$,{once:!0}),B(),p()):$();const I=()=>{const e=_.WeixinJSBridge;if(e){e.invoke("getNetworkType",{},()=>{p(),c()});return}p().then(a=>{a&&c()})};_.WeixinJSBridge?I():document.addEventListener("WeixinJSBridgeReady",I,{once:!0});window.addEventListener("pageshow",()=>{p(),c()});document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(p(),c())});const X=()=>{if(x)return;x=!0,window.clearTimeout(y),T(),t?.pause(),w?.classList.add("is-on");const e=M.matches?60:260,a=M.matches?240:920;window.setTimeout(()=>{document.body.classList.add("at-rsvp"),L.focus({preventScroll:!0}),w?.classList.remove("is-on"),w?.classList.add("is-fading-out")},e),window.setTimeout(()=>{w?.classList.remove("is-fading-out")},a)},W=()=>{c(),X()};v.addEventListener("click",W);v.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),W())});
