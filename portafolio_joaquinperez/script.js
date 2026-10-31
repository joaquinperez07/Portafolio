const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const root=document.documentElement;
const save=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const load=k=>{try{return localStorage.getItem(k)}catch(e){return null}};

// Menú móvil
const burger=$('#burger'), menu=$('#menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

// Tema claro/oscuro
const t=load('tema')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
root.dataset.theme=t;
$('#tema').addEventListener('click',()=>{const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;save('tema',n)});

// Color de acento (botones del mando)
const setColor=c=>{root.style.setProperty('--accent',c);$$('.bar button').forEach(b=>b.classList.toggle('on',b.dataset.c===c));save('color',c)};
$$('.bar button').forEach(b=>b.addEventListener('click',()=>setColor(b.dataset.c)));
setColor(load('color')||'#2f5bea');

// Filtros de proyectos
$$('.filters .chip').forEach(b=>b.addEventListener('click',()=>{
  $$('.filters .chip').forEach(x=>x.classList.toggle('on',x===b));
  $$('.card').forEach(c=>c.classList.toggle('hide',b.dataset.f!=='all'&&c.dataset.t!==b.dataset.f));
}));

// Modal con detalles
const info=[
 ['Skillnest Fullstack Python','Repositorio con los ejercicios y proyectos del curso. Trabajo con Python y Flask, variables de entorno en un archivo .env y control de versiones con Git.'],
 ['Réplica de Burger King','Réplica del sitio web de Burger King hecha con HTML, CSS y JavaScript. Trabajé el diseño de la página, la estructura y el estilo para acercarme lo más posible al sitio original.'],
 ['Este portafolio','Sitio hecho desde cero con HTML, CSS y JavaScript. Incluye menú móvil, tema claro y oscuro, color elegible, filtros, modal, contadores y animaciones al hacer scroll.']
];
const modal=$('#modal');
$$('.more').forEach(b=>b.addEventListener('click',()=>{const [h,p]=info[b.dataset.i];$('#mt').textContent=h;$('#mp').textContent=p;modal.showModal()}));
$('#cerrar').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

// Barras y contadores al entrar en pantalla
$$('.skill').forEach(s=>s.style.setProperty('--w',s.dataset.lvl+'%'));
const count=el=>{const n=+el.dataset.n;let i=0;const id=setInterval(()=>{el.textContent=++i;if(i>=n)clearInterval(id)},300)};
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('go');
  $$('b[data-n]',e.target).forEach(count);
  io.unobserve(e.target);
}),{threshold:.4});
$$('.skill,.stats').forEach(el=>io.observe(el));

// Contacto: abre el correo con el mensaje
$('#enviar').addEventListener('click',()=>{
  const n=$('#nom').value.trim(), m=$('#msg').value.trim(), a=$('#aviso');
  if(!n||!m){a.textContent='Escribe tu nombre y un mensaje para continuar.';return}
  a.textContent='Abriendo tu correo…';
  location.href='mailto:joaquinperezp07@gmail.com?subject='+encodeURIComponent('Contacto desde tu portafolio: '+n)+'&body='+encodeURIComponent(m);
});

// Código que se escribe solo en el hero
const txt=`const joaquin = {
  rol: "Dev fullstack en formación",
  stack: ["HTML", "CSS", "JavaScript",
          "Python", "Flask"],
  aprendiendo: "construyendo cosas",
  disponible: true
};`;
const code=$('#code');
if(matchMedia('(prefers-reduced-motion: reduce)').matches){code.textContent=txt}
else{let k=0;const w=setInterval(()=>{code.textContent=txt.slice(0,++k);if(k>=txt.length)clearInterval(w)},35)}
