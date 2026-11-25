/* Memorial do quedi minhas coisas: gráficos, diretrizes e pequenas animações */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Endereço do site do produto: troque aqui quando tiver o link do Vercel */
  const PRODUTO_URL = 'https://github.com/JPDLS27/quedi-minhas-coisas';
  $$('#link-produto, #link-produto-2').forEach(a => { a.href = PRODUTO_URL; });

  /* ---------- aparece quando entra na tela ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); if (e.target._onIn) e.target._onIn(); }
      }), { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })
    : null;
  const whenIn = (el, fn) => { if (fn) el._onIn = fn; if (io && !reduce) io.observe(el); else { el.classList.add('is-in'); if (fn) fn(); } };

  /* ---------- contadores ---------- */
  const countUp = el => {
    const to = +el.dataset.count, suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = to + suf; return; }
    const t0 = performance.now(), dur = 1100;
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  $$('[data-count]').forEach(el => whenIn(el, () => countUp(el)));

  /* ---------- questionário: abas com gráficos ---------- */
  const tabs = $('#quest-tabs'), panels = $('#quest-panels');
  const barsHTML = p => `<ul class="bars">${p.r.map(([label, n, pct]) => `
      <li><span class="b-label">${label}</span>
        <span class="b-track"><span class="b-fill" style="--w:${pct}%"></span></span>
        <span class="b-val">${pct}% <small>(${n})</small></span></li>`).join('')}</ul>`;
  const scaleHTML = p => {
    const max = Math.max(...p.r), total = p.r.reduce((a, b) => a + b, 0);
    const high = p.r.slice(7).reduce((a, b) => a + b, 0);
    return `<div class="scale" role="img" aria-label="Notas de 1 a 10: ${p.r.map((v, i) => `${i + 1}: ${v}`).join(', ')}">
      ${p.r.map((v, i) => `<div class="col ${i >= 7 ? 'is-high' : ''}"><span class="c-val">${v}</span><span class="c-bar" style="--h:${max ? Math.round(v / max * 120) : 0}px"></span><span class="c-n">${i + 1}</span></div>`).join('')}
    </div><p class="scale-note"><strong>${Math.round(high / total * 100)}%</strong> deram nota de 8 a 10.</p>`;
  };
  QUESTIONARIO.forEach((g, gi) => {
    const id = 'qg-' + gi;
    tabs.insertAdjacentHTML('beforeend', `<button type="button" role="tab" id="tab-${id}" aria-controls="${id}" aria-selected="${gi === 0}" tabindex="${gi === 0 ? 0 : -1}">${g.grupo}</button>`);
    panels.insertAdjacentHTML('beforeend', `<div class="q-panel" role="tabpanel" id="${id}" aria-labelledby="tab-${id}" ${gi === 0 ? '' : 'hidden'}>
      ${g.perguntas.map(p => `<article class="q-card ${p.tipo === 'escala' ? 'is-scale' : ''}"><h3>${p.q}</h3>${p.multi ? '<p class="q-multi">Podia marcar mais de uma opção.</p>' : ''}${p.tipo === 'escala' ? scaleHTML(p) : barsHTML(p)}</article>`).join('')}
    </div>`);
  });
  const tabBtns = $$('[role="tab"]', tabs);
  const show = btn => {
    tabBtns.forEach(b => { const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; $('#' + b.getAttribute('aria-controls')).hidden = !on; });
    $$('.q-card', $('#' + btn.getAttribute('aria-controls'))).forEach(c => { c.classList.remove('is-in'); whenIn(c); });
  };
  tabBtns.forEach((b, i) => {
    b.addEventListener('click', () => show(b));
    b.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      const nb = tabBtns[(i + d + tabBtns.length) % tabBtns.length]; nb.focus(); show(nb);
    });
  });
  $$('.q-card').forEach(c => whenIn(c));

  /* ---------- diretrizes ---------- */
  const GUIDES = [
    { num: '92%', obs: 'das pessoas têm dificuldade para encontrar o dono de um objeto perdido.', sig: 'Muitas vezes a pessoa quer devolver, mas não sabe como encontrar quem perdeu.', dev: 'Facilitar o contato entre quem perdeu e quem encontrou um objeto.', src: 'Q16' },
    { num: '84%', obs: 'das pessoas voltam pelo caminho que passaram para tentar encontrar algo que perderam.', sig: 'Procurar um objeto perdido pode dar bastante trabalho e levar muito tempo.', dev: 'Tornar essa busca mais fácil e rápida.', src: 'Q7' },
    { num: '36%', obs: 'têm dificuldade para saber se alguém realmente é o dono do objeto, e 8% se preocupam com a própria segurança.', sig: 'Existe o medo de entregar o objeto para a pessoa errada ou passar por alguma situação de risco.', dev: 'Trazer mais segurança e confiança para quem perdeu e para quem encontrou.', src: 'Q16' },
    { num: '64%', obs: 'deram notas de 8 a 10 para o estresse que sentem ao perder algo importante.', sig: 'Perder alguma coisa pode causar muita preocupação, principalmente quando tem valor financeiro ou sentimental.', dev: 'Deixar a procura menos estressante e trazer mais tranquilidade.', src: 'Q6' },
    { num: '80%', obs: 'disseram que a empatia é um dos principais motivos para devolver algo encontrado, e 60% citaram a honestidade.', sig: 'Muitas pessoas têm vontade de ajudar, mas encontram dificuldades na hora de devolver.', dev: 'Incentivar a colaboração e facilitar a devolução dos objetos.', src: 'Q17' },
    { num: '87,5%', obs: 'nunca usaram sites ou redes sociais para procurar ou devolver objetos perdidos.', sig: 'A maioria não tem costume de usar esse tipo de ferramenta, então algo complicado pode afastar os usuários.', dev: 'Ser simples, fácil de entender e acessível para diferentes pessoas.', src: 'Q18' },
    { num: '76%', obs: 'perdem objetos em escolas ou faculdades, e 56% no trabalho.', sig: 'Lugares onde circulam muitas pessoas acabam sendo locais comuns para esquecer alguma coisa.', dev: 'Facilitar a recuperação nesses ambientes, mas também atender a outros locais.', src: 'Q5' },
    { num: '52%', obs: 'acham que oferecer dinheiro é a melhor forma de incentivar a devolução de objetos valiosos, enquanto 44% preferem uma forma de devolver anonimamente.', sig: 'Nem todo mundo tem a mesma motivação para devolver alguma coisa.', dev: 'Considerar diferentes formas de incentivar a devolução, sem depender só de recompensas financeiras.', src: 'Q20' }
  ];
  $('#guides').innerHTML = GUIDES.map((g, i) => `
    <article class="guide g-${i % 4}">
      <button type="button" class="guide-btn" aria-expanded="false" aria-controls="gd-${i}">
        <span class="g-num">${g.num}</span>
        <span class="g-obs">${g.obs}</span>
        <span class="g-dev"><span class="g-label">Portanto, o projeto deve</span>${g.dev}</span>
      </button>
      <div class="guide-more" id="gd-${i}" hidden>
        <p><span class="g-label">Isso significa que</span>${g.sig}</p>
        <p class="g-src">Dados de origem: ${g.src}</p>
      </div>
    </article>`).join('');
  $$('.guide-btn').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', open);
    $('#' + b.getAttribute('aria-controls')).hidden = !open;
    b.closest('.guide').classList.toggle('is-open', open);
  }));
  $$('.guide, .card, .aff, .concept, .hl, .quotes blockquote, .phones figure, .sk').forEach(el => whenIn(el));

  /* ---------- etapa atual no índice + barra de progresso ---------- */
  const links = $$('.toc a'), bar = $('.progress-bar');
  const steps = links.map(a => $(a.getAttribute('href')));
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const h = document.documentElement;
    bar.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    let cur = 0;
    steps.forEach((s, i) => { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.35) cur = i; });
    links.forEach((a, i) => { if (i === cur) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
