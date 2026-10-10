(function(){
'use strict';
/* ---------- utilidades ---------- */
const $=(s,r=document)=>r.querySelector(s);
const MONTHS=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const pad=n=>String(n).padStart(2,'0');
const dISO=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parseD=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const todayS=()=>dISO(new Date());
const fdate=s=>{if(!s)return '—';const d=parseD(s);return d.getDate()+' '+MONTHS[d.getMonth()]};
const fdateY=s=>{if(!s)return '—';const d=parseD(s);return d.getDate()+' '+MONTHS[d.getMonth()]+' '+d.getFullYear()};
const money=v=>{const x=Math.round((+v||0)*100)/100;return '$'+x.toLocaleString('es-MX',{minimumFractionDigits:0,maximumFractionDigits:2})};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const n=v=>+v||0;
const sum=(a,f)=>a.reduce((s,x)=>s+f(x),0);
const pct=v=>Math.round(v*100)+'%';
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function setPath(o,p,v){const k=p.split('.');let c=o;for(let i=0;i<k.length-1;i++){c=c[k[i]];if(c==null)return}c[k[k.length-1]]=v}
const ico={
  panel:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  inv:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  taller:'<path d="M14.5 6.5a4.2 4.2 0 0 0-5.3 5.3L3.7 17.3a2 2 0 0 0 2.9 2.9l5.5-5.5a4.2 4.2 0 0 0 5.3-5.3l-2.6 2.6-2.3-.6-.6-2.3 2.6-2.6z"/>',
  ventas:'<circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M3 4h2.5l2.3 11h10.5l2-8H6.5"/>',
  clientes:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.4-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.8a3.4 3.4 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2"/>',
  reportes:'<path d="M4 20V11M10 20V4M16 20v-6M22 20H2"/>',
  ajustes:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  down:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>'
};
const I=(k,c)=>`<svg ${c?`class="${c}"`:''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[k]}</svg>`;
const sel=(a,b)=>a===b?' selected':'';

/* ---------- datos de ejemplo ---------- */
const CATS=['Bicicletas','Llantas y cámaras','Frenos','Transmisión','Accesorios','Lubricantes y herramienta'];
const PRODUCTS=[
['BIC-MT29','Bicicleta MTB rodada 29, aluminio, 21 vel.','Bicicletas',5200,8490,6,2,'Piso A1'],
['BIC-MT275','Bicicleta MTB rodada 27.5, 24 vel.','Bicicletas',6400,9990,4,2,'Piso A2'],
['BIC-RT700','Bicicleta de ruta 700c, 16 vel.','Bicicletas',8900,13900,3,1,'Piso A3'],
['BIC-URB26','Bicicleta urbana rodada 26, 7 vel.','Bicicletas',3100,4990,7,3,'Piso B1'],
['BIC-INF20','Bicicleta infantil rodada 20','Bicicletas',1500,2490,5,2,'Piso B2'],
['BIC-ELE20','Bicicleta eléctrica plegable','Bicicletas',14500,21900,1,1,'Vitrina'],
['LLA-29','Llanta MTB 29 x 2.1','Llantas y cámaras',260,420,18,8,'R1-A'],
['LLA-700','Llanta ruta 700 x 25c','Llantas y cámaras',240,390,12,6,'R1-B'],
['CAM-29','Cámara 29 válvula Schrader','Llantas y cámaras',70,140,30,12,'R1-C'],
['CAM-700','Cámara 700c válvula Presta','Llantas y cámaras',85,160,4,10,'R1-D'],
['CAM-26','Cámara rodada 26','Llantas y cámaras',60,120,22,10,'R1-E'],
['FRE-VB','Balatas V-brake (par)','Frenos',55,120,25,10,'R2-A'],
['FRE-PD','Pastillas de disco semimetálicas (par)','Frenos',110,230,14,8,'R2-B'],
['FRE-ROT160','Rotor de disco 160 mm','Frenos',190,390,8,4,'R2-C'],
['FRE-CAB','Cable y funda de freno','Frenos',60,130,16,8,'R2-D'],
['TRA-CAD9','Cadena 9 vel.','Transmisión',150,320,11,6,'R3-A'],
['TRA-CAS8','Cassette 8 vel. 11-32','Transmisión',360,690,5,3,'R3-B'],
['TRA-DES','Desviador trasero 7-8 vel.','Transmisión',280,540,0,3,'R3-C'],
['TRA-CAB','Cable y funda de cambios','Transmisión',55,120,20,8,'R3-D'],
['TRA-PED','Pedales de plataforma (par)','Transmisión',120,260,9,4,'R3-E'],
['ACC-CAS','Casco ajustable MTB','Accesorios',280,590,10,5,'Mostrador'],
['ACC-LUZ','Luz delantera recargable USB','Accesorios',160,340,12,6,'Mostrador'],
['ACC-CAN','Candado de cable con llave','Accesorios',110,240,3,5,'Mostrador'],
['ACC-BOM','Bomba de piso con manómetro','Accesorios',190,390,7,3,'Mostrador'],
['ACC-GUA','Guantes de ciclismo','Accesorios',90,220,15,6,'Mostrador'],
['ACC-BOT','Botella de agua 600 ml','Accesorios',30,90,30,12,'Mostrador'],
['LUB-CAD','Lubricante de cadena 120 ml','Lubricantes y herramienta',60,140,24,10,'R4-A'],
['LUB-DES','Desengrasante 500 ml','Lubricantes y herramienta',70,160,9,5,'R4-B'],
['HER-PAR','Kit de parches y palancas','Lubricantes y herramienta',45,110,20,8,'R4-C']
];
const SERVICES=[
['Revisión de seguridad',250,.5],['Cambio de cámara o llanta',250,.4],['Centrado de rueda',300,.7],['Ajuste de frenos',320,.6],
['Ajuste de cambios',350,.6],['Cambio de cadena y cassette',400,.8],['Afinación básica',450,1],['Cambio de cables y fundas',550,1.2],
['Montaje de bicicleta nueva',600,1.5],['Purga de frenos hidráulicos',650,1],['Reconstrucción de rueda',850,2],
['Afinación completa',950,2.5],['Servicio de suspensión',1200,3],['Overhaul completo',1500,5]
];
const CUSTOMERS=[['Mariana Ortega','55 5012 3401'],['Luis Fernández','55 5012 3402'],['Carolina Ruiz','55 5012 3403'],['Jorge Salgado','55 5012 3404'],['Daniela Pérez','55 5012 3405'],['Andrés Villalobos','55 5012 3406'],['Paola Mendoza','55 5012 3407'],['Ricardo Núñez','55 5012 3408'],['Sofía Herrera','55 5012 3409'],['Emilio Cárdenas','55 5012 3410']];
const BIKES=['MTB rodada 29 roja','MTB rodada 27.5 negra','Ruta 700c plateada','Urbana rodada 26 azul','Plegable rodada 20 blanca','MTB rodada 29 verde','Gravel 700c gris','Infantil rodada 20 naranja','Urbana rodada 28 vintage','BMX rodada 20 negra'];

function seedData(){
  const rnd=mulberry32(1010), R=k=>Math.floor(rnd()*k);
  const t0=new Date();t0.setHours(0,0,0,0);
  const ds=k=>dISO(addD(t0,-k));
  const D={v:1,demo:true,shop:{name:'Tu Bicicletería',mechanics:['Hugo','Memo','Adriana']},products:[],services:[],customers:[],orders:[],sales:[],moves:[],seq:{o:1,s:1}};
  PRODUCTS.forEach((p,i)=>D.products.push({id:'p'+(i+1),sku:p[0],name:p[1],cat:p[2],cost:p[3],price:p[4],stock:p[5],min:p[6],loc:p[7]}));
  SERVICES.forEach((s,i)=>D.services.push({id:'s'+(i+1),name:s[0],price:s[1],hrs:s[2]}));
  CUSTOMERS.forEach((c,i)=>D.customers.push({id:'c'+(i+1),name:c[0],phone:c[1],notes:''}));
  const bySku=k=>D.products.find(p=>p.sku===k);
  const bikes=D.products.filter(p=>p.cat==='Bicicletas'), other=D.products.filter(p=>p.cat!=='Bicicletas');
  const pays=['Efectivo','Efectivo','Tarjeta','Tarjeta','Transferencia'];
  const sales=[];
  for(let k=44;k>=0;k--){
    const d=addD(t0,-k),dow=d.getDay(),cnt=dow===6?4+R(3):dow===0?1+R(2):2+R(2);
    for(let q=0;q<cnt;q++){
      const items=[],m=1+R(3);
      for(let j=0;j<m;j++){
        const p=rnd()<0.04?bikes[R(bikes.length)]:other[R(other.length)];
        if(items.some(x=>x.refId===p.id))continue;
        items.push({type:'prod',refId:p.id,name:p.name,qty:p.cat==='Bicicletas'?1:(rnd()<0.2?2:1),price:p.price,cost:p.cost});
      }
      if(rnd()<0.12){const sv=D.services[R(4)];items.push({type:'serv',refId:sv.id,name:sv.name,qty:1,price:sv.price,cost:0})}
      sales.push({id:uid(),date:dISO(d),time:pad(10+R(9))+':'+pad(R(60)),customerId:rnd()<0.3?'c'+(1+R(CUSTOMERS.length)):'',items,disc:0,total:sum(items,i=>i.price*i.qty),pay:pays[R(pays.length)]});
    }
  }
  sales.forEach((s,i)=>s.folio='V-'+String(i+1).padStart(4,'0'));
  D.sales=sales;D.seq.s=sales.length+1;
  const mk=(created,status,ci,bike,mech,svcs,parts,pOff,notes,adv,delivered,pay)=>({
    id:uid(),folio:'',customerId:'c'+(ci+1),bike,mechanic:mech,status,created:ds(created),promised:dISO(addD(t0,pOff)),delivered:delivered==null?'':ds(delivered),
    services:svcs.map(i=>({sid:D.services[i].id,name:D.services[i].name,price:D.services[i].price})),
    parts:parts.map(([sku,qq])=>{const p=bySku(sku);return{pid:p.id,name:p.name,qty:qq,price:p.price,cost:p.cost}}),
    notes,advance:adv,pay:pay||'Efectivo'});
  const orders=[
    mk(0,'recibida',4,'Urbana rodada 26 azul','Adriana',[0],[],1,'',0),
    mk(1,'recibida',0,'MTB rodada 29 roja','Hugo',[6],[],2,'La cliente reporta ruido en la transmisión.',0),
    mk(2,'diagnostico',1,'Ruta 700c plateada','Memo',[11],[],3,'Revisar juego de dirección. Pendiente cotizar cassette.',200),
    mk(3,'diagnostico',6,'MTB rodada 27.5 negra','Hugo',[3,4],[],2,'',0),
    mk(4,'reparacion',2,'MTB rodada 29 verde','Memo',[5],[['TRA-CAD9',1],['TRA-CAS8',1]],1,'Cadena estirada, se cambia con cassette.',300),
    mk(5,'reparacion',3,'Ruta 700c azul','Adriana',[9,3],[['FRE-PD',1]],0,'Purga de ambos frenos.',0),
    mk(6,'reparacion',7,'MTB rodada 29 gris','Hugo',[12],[],3,'Servicio de horquilla, esperando sellos.',400),
    mk(4,'lista',5,'Urbana rodada 26 roja','Adriana',[7,4],[['TRA-CAB',1],['FRE-CAB',1]],-1,'Cables y fundas nuevos.',0),
    mk(5,'lista',8,'Infantil rodada 20 naranja','Memo',[1,0],[['CAM-26',1]],0,'',0),
    mk(10,'cancelada',9,'BMX rodada 20 negra','Hugo',[2],[],-6,'El cliente decidió no repararla.',0)
  ];
  for(let k=2;k<=42;k++){
    const dow=addD(t0,-k).getDay(), cnt=dow===0?0:(rnd()<0.55?2:1);
    for(let q=0;q<cnt;q++){
      const sv=[R(14)];if(rnd()<0.3)sv.push(R(14));
      const uniq=[...new Set(sv)];
      const parts=[];
      if(rnd()<0.5){const pool=D.products.filter(p=>['Frenos','Transmisión','Llantas y cámaras'].includes(p.cat));const p=pool[R(pool.length)];parts.push([p.sku,1])}
      const dl=Math.max(0,k-1-R(3));
      orders.push(mk(k,'entregada',R(10),BIKES[R(BIKES.length)],D.shop.mechanics[R(3)],uniq,parts,-dl,'',0,dl,pays[R(pays.length)]));
    }
  }
  orders.sort((a,b)=>a.created<b.created?-1:a.created>b.created?1:0);
  orders.forEach((o,i)=>o.folio='OT-'+String(i+1).padStart(4,'0'));
  D.orders=orders;D.seq.o=orders.length+1;
  [['TRA-DES',6,'Pedido a proveedor (en camino)'],['CAM-700',12,'Entrada por compra'],['LLA-29',10,'Entrada por compra'],['FRE-PD',10,'Entrada por compra'],['ACC-BOT',24,'Entrada por compra'],['LUB-CAD',12,'Entrada por compra']].forEach((m,i)=>{
    const p=bySku(m[0]);if(m[0]!=='TRA-DES')D.moves.push({id:uid(),date:ds(20-i*2),pid:p.id,type:'entrada',qty:m[1],note:m[2]});
  });
  return D;
}
const STORE='rodada.v1';
let S=(function(){try{const raw=localStorage.getItem(STORE);if(raw){const d=JSON.parse(raw);if(d&&Array.isArray(d.products)&&d.shop)return d}}catch(e){}return seedData()})();
function save(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}

/* ---------- reglas de negocio ---------- */
const prod=id=>S.products.find(p=>p.id===id);
const cust=id=>S.customers.find(c=>c.id===id);
const cname=id=>{const c=cust(id);return c?c.name:'Mostrador'};
const stockState=p=>p.stock<=0?'out':(p.stock<=p.min?'low':'ok');
const ST_LBL={out:['Agotado','bad'],low:['Por reponer','warn'],ok:['En stock','ok']};
const OST={recibida:['Recibida','info'],diagnostico:['En diagnóstico','warn'],reparacion:['En reparación','warn'],lista:['Lista para entrega','ok'],entregada:['Entregada','mute'],cancelada:['Cancelada','bad']};
const FLOW=['recibida','diagnostico','reparacion','lista','entregada'];
const oSvc=o=>sum(o.services,x=>n(x.price)), oPts=o=>sum(o.parts,x=>n(x.price)*n(x.qty)), oTot=o=>oSvc(o)+oPts(o);
const isOpen=o=>o.status!=='entregada'&&o.status!=='cancelada';
const effQty=(o,pid)=>(!o||o.status==='cancelada')?0:sum(o.parts.filter(x=>x.pid===pid),x=>n(x.qty));
function logMove(pid,type,qty,note){S.moves.push({id:uid(),date:todayS(),pid,type,qty,note});if(S.moves.length>500)S.moves.splice(0,S.moves.length-500)}
const marginOf=p=>p.price>0?(p.price-p.cost)/p.price:0;

function revLines(from,to){
  const out=[];
  S.sales.forEach(s=>{
    if(s.date<from||s.date>to)return;
    const k=1-n(s.disc)/100;
    s.items.forEach(it=>out.push({date:s.date,kind:'tienda',type:it.type,name:it.name,cat:it.type==='serv'?'Servicios de taller':((prod(it.refId)||{}).cat||'Otros'),qty:it.qty,rev:it.price*it.qty*k,cost:n(it.cost)*it.qty,pay:s.pay,ref:s.folio}));
  });
  S.orders.forEach(o=>{
    if(o.status!=='entregada'||!o.delivered||o.delivered<from||o.delivered>to)return;
    o.services.forEach(sv=>out.push({date:o.delivered,kind:'taller',type:'serv',name:sv.name,cat:'Servicios de taller',qty:1,rev:n(sv.price),cost:0,pay:o.pay,ref:o.folio}));
    o.parts.forEach(pt=>out.push({date:o.delivered,kind:'taller',type:'prod',name:pt.name,cat:(prod(pt.pid)||{}).cat||'Otros',qty:n(pt.qty),rev:n(pt.price)*n(pt.qty),cost:n(pt.cost)*n(pt.qty),pay:o.pay,ref:o.folio}));
  });
  return out;
}
function groupBy(lines,kf){const m=new Map();lines.forEach(l=>{const k=kf(l);const g=m.get(k)||{key:k,qty:0,rev:0,cost:0};g.qty+=l.qty;g.rev+=l.rev;g.cost+=l.cost;m.set(k,g)});return [...m.values()].sort((a,b)=>b.rev-a.rev)}
function rangeFor(r){
  const t=new Date();t.setHours(0,0,0,0);const to=dISO(t);
  if(r==='7')return{from:dISO(addD(t,-6)),to,mode:'day'};
  if(r==='mes')return{from:dISO(new Date(t.getFullYear(),t.getMonth(),1)),to,mode:'day'};
  if(r==='90')return{from:dISO(addD(t,-89)),to,mode:'week'};
  if(r==='365')return{from:dISO(new Date(t.getFullYear(),t.getMonth()-11,1)),to,mode:'month'};
  return{from:dISO(addD(t,-29)),to,mode:'day'};
}
function buckets(from,to,mode){
  const lines=revLines(from,to),map=new Map(),keys=[];
  const keyOf=ds=>{if(mode==='day')return ds;if(mode==='month')return ds.slice(0,7);const d=parseD(ds);return dISO(addD(d,-((d.getDay()+6)%7)))};
  let d=parseD(from);const end=parseD(to);
  while(d<=end){const k=keyOf(dISO(d));if(!map.has(k)){map.set(k,{key:k,tienda:0,taller:0});keys.push(k)}d=addD(d,1)}
  lines.forEach(l=>{const b=map.get(keyOf(l.date));if(b)b[l.kind]+=l.rev});
  return keys.map(k=>{const b=map.get(k);
    b.label=mode==='month'?MONTHS[+k.slice(5,7)-1]:(mode==='week'?fdate(k):(()=>{const x=parseD(k);return x.getDate()+'/'+(x.getMonth()+1)})());
    b.full=mode==='month'?MONTHS[+k.slice(5,7)-1]+' '+k.slice(0,4):(mode==='week'?'Semana del '+fdate(k):fdate(k));
    return b});
}
function niceStep(raw){const p=Math.pow(10,Math.floor(Math.log10(raw)));const f=raw/p;return(f<=1?1:f<=2?2:f<=5?5:10)*p}
const tick=v=>v>=1000?('$'+(v/1000).toLocaleString('es-MX')+'k'):('$'+v);
function revChart(bks){
  const W=window.innerWidth<800?Math.max(280,window.innerWidth-70):640,H=232,L=44,Rr=6,T=10,B=26,iw=W-L-Rr,ih=H-T-B;
  const mx=Math.max(0,...bks.map(b=>b.tienda+b.taller))||1000;
  const step=niceStep(mx/4),yMax=step*Math.ceil(mx/step),y=v=>T+ih-(v/yMax)*ih;
  const bw=iw/bks.length,bar=Math.max(3,Math.min(30,bw*0.7));
  let g='';
  for(let i=0;i<=Math.round(yMax/step);i++){const v=i*step;g+=`<line class="gl" x1="${L}" x2="${W-Rr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/><text class="tx" x="${L-6}" y="${(y(v)+4).toFixed(1)}" text-anchor="end">${tick(v)}</text>`}
  const every=Math.ceil(bks.length/(W<420?5:9));
  bks.forEach((b,i)=>{
    const x=L+i*bw+(bw-bar)/2,h1=(b.tienda/yMax)*ih,h2=(b.taller/yMax)*ih;
    g+=`<g><title>${esc(b.full)}: ${money(b.tienda+b.taller)} (Tienda ${money(b.tienda)} · Taller ${money(b.taller)})</title>`;
    if(h1>0)g+=`<rect class="b1" x="${x.toFixed(1)}" y="${y(b.tienda).toFixed(1)}" width="${bar.toFixed(1)}" height="${h1.toFixed(1)}" rx="1.5"/>`;
    if(h2>0)g+=`<rect class="b2" x="${x.toFixed(1)}" y="${y(b.tienda+b.taller).toFixed(1)}" width="${bar.toFixed(1)}" height="${h2.toFixed(1)}" rx="1.5"/>`;
    g+=`<rect x="${(L+i*bw).toFixed(1)}" y="${T}" width="${bw.toFixed(1)}" height="${ih}" fill="transparent"/></g>`;
    if(i%every===0)g+=`<text class="tx" x="${(x+bar/2).toFixed(1)}" y="${H-7}" text-anchor="middle">${esc(b.label)}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ingresos por periodo, tienda y taller">${g}</svg>`;
}
const legend=()=>`<div class="legend"><span><i style="background:var(--c1)"></i>Tienda</span><span><i style="background:var(--c2)"></i>Taller</span></div>`;
function hbars(rows,max,alt){return rows.map(r=>`<div class="hb"><span title="${esc(r[0])}">${esc(r[0])}</span><div class="tr"><i class="${alt?'a':''}" style="width:${max>0?Math.max(2,r[1]/max*100):0}%"></i></div><span class="num">${r[2]}</span></div>`).join('')}

/* ---------- estado de interfaz ---------- */
const ui={view:'panel',inv:{q:'',cat:'',st:'',sort:'name',dir:1},taller:{tab:'tablero'},pos:{tab:'nueva',q:'',cat:'',cart:[],cust:'',pay:'Efectivo',disc:0,recv:''},cli:{q:''},rep:{r:'30'},hist:{q:''}};
const VIEWS=[['panel','Panel'],['inventario','Inventario'],['taller','Taller'],['ventas','Ventas'],['clientes','Clientes'],['reportes','Reportes'],['ajustes','Ajustes']];
const ICON_OF={panel:'panel',inventario:'inv',taller:'taller',ventas:'ventas',clientes:'clientes',reportes:'reportes',ajustes:'ajustes'};
try{const h=location.hash.replace('#','');if(VIEWS.some(v=>v[0]===h))ui.view=h}catch(e){}

let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600)}
function keepFocus(fn){
  const a=document.activeElement,id=a&&a.id,s=a&&a.selectionStart,e=a&&a.selectionEnd;
  const dlg=$('.dlg'),st=dlg?dlg.scrollTop:0;
  fn();
  const d2=$('.dlg');if(d2&&dlg)d2.scrollTop=st;
  if(id){const el=document.getElementById(id);if(el){el.focus();try{if(s!=null)el.setSelectionRange(s,e)}catch(x){}}}
}

/* ---------- vistas ---------- */
const V={};
function head(title,sub,acts){return `<div class="ph"><div><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div><div class="acts">${acts||''}</div></div>`}

V.panel=()=>{
  const t=new Date(),today=dISO(t);
  const mFrom=dISO(new Date(t.getFullYear(),t.getMonth(),1));
  const pmDays=new Date(t.getFullYear(),t.getMonth(),0).getDate();
  const pFrom=dISO(new Date(t.getFullYear(),t.getMonth()-1,1)),pTo=dISO(new Date(t.getFullYear(),t.getMonth()-1,Math.min(t.getDate(),pmDays)));
  const cur=revLines(mFrom,today),prev=revLines(pFrom,pTo);
  const cr=sum(cur,l=>l.rev),pr=sum(prev,l=>l.rev),delta=pr>0?Math.round((cr/pr-1)*100):null;
  const tall=sum(cur.filter(l=>l.kind==='taller'),l=>l.rev),tallN=new Set(cur.filter(l=>l.kind==='taller').map(l=>l.ref)).size;
  const open=S.orders.filter(isOpen),ready=open.filter(o=>o.status==='lista').length;
  const invC=sum(S.products,p=>p.cost*p.stock),invR=sum(S.products,p=>p.price*p.stock);
  const low=S.products.filter(p=>stockState(p)!=='ok').sort((a,b)=>(a.stock-a.min)-(b.stock-b.min));
  const bks=buckets(dISO(addD(t,-13)),today,'day');
  const l30=revLines(dISO(addD(t,-29)),today);
  const topS=groupBy(l30.filter(l=>l.cat==='Servicios de taller'),l=>l.name).slice(0,5);
  const upcoming=open.slice().sort((a,b)=>a.promised<b.promised?-1:1).slice(0,5);
  const cnt=k=>open.filter(o=>o.status===k).length;
  return head('Panel','Resumen de hoy, '+fdateY(today),
    `<button class="btn" data-act="newSale">${I('ventas')}Nueva venta</button><button class="btn primary" data-act="newOrder">${I('plus')}Nueva orden de taller</button>`)+
  `<div class="grid g-kpi">
    <div class="kpi"><span class="l">Ingresos del mes</span><span class="v">${money(cr)}</span><span class="s">${delta==null?'Sin mes anterior para comparar':`<span class="${delta>=0?'up':'dn'}">${delta>=0?'▲':'▼'} ${Math.abs(delta)}%</span> contra el mismo tramo del mes pasado`}</span></div>
    <div class="kpi"><span class="l">Ingresos de taller</span><span class="v">${money(tall)}</span><span class="s">${tallN} orden${tallN===1?'':'es'} entregada${tallN===1?'':'s'} este mes</span></div>
    <div class="kpi"><span class="l">Bicis en el taller</span><span class="v">${open.length}</span><span class="s">${ready} lista${ready===1?'':'s'} para entregar</span></div>
    <div class="kpi"><span class="l">Valor del inventario</span><span class="v">${money(invC)}</span><span class="s">${money(invR)} a precio de venta</span></div>
    <div class="kpi"><span class="l">Por reponer</span><span class="v">${low.length}</span><span class="s">${S.products.filter(p=>p.stock<=0).length} agotado${S.products.filter(p=>p.stock<=0).length===1?'':'s'}</span></div>
  </div>
  <div class="grid g-2">
    <div class="card"><h2>Ingresos, últimos 14 días ${legend()}</h2>${revChart(bks)}</div>
    <div class="card"><h2>Taller en curso <small>${open.length} abiertas</small></h2>
      <div class="pipe">${[['recibida','Recibidas'],['diagnostico','Diagnóstico'],['reparacion','Reparación'],['lista','Listas']].map(c=>`<button data-act="goTaller"><b>${cnt(c[0])}</b><span>${c[1]}</span></button>`).join('')}</div>
      <div class="list">${upcoming.length?upcoming.map(o=>`<div class="li"><div><b class="nm">${esc(cname(o.customerId))}</b><small>${esc(o.bike)}</small></div><div style="text-align:right">${pill(OST[o.status])}<small class="${o.promised<today&&o.status!=='lista'?'late':''}">Promesa ${fdate(o.promised)}</small></div></div>`).join(''):'<div class="empty">No hay órdenes abiertas.</div>'}</div>
    </div>
  </div>
  <div class="grid g-2b" style="margin-top:16px">
    <div class="card"><h2>Por reponer <small>${low.length} productos</small></h2>
      ${low.length?`<div class="list">${low.slice(0,7).map(p=>`<div class="li"><div class="nm">${esc(p.name)}<small class="mono">${esc(p.sku)} · mínimo ${p.min}</small></div><div style="display:flex;gap:10px;align-items:center">${pill(ST_LBL[stockState(p)],p.stock+' pza')}<button class="btn sm" data-act="adjProd" data-id="${p.id}">Entrada</button></div></div>`).join('')}</div>`:'<div class="empty">Todo el inventario está arriba del mínimo.</div>'}
    </div>
    <div class="card"><h2>Servicios más pedidos <small>últimos 30 días</small></h2>
      ${topS.length?hbars(topS.map(s=>[s.key,s.rev,money(s.rev)+' · '+s.qty]),topS[0].rev,true):'<div class="empty">Aún no hay servicios entregados.</div>'}
    </div>
  </div>`;
};
function pill(a,txt){return `<span class="pill ${a[1]}">${esc(txt||a[0])}</span>`}

function invList(){
  const f=ui.inv,q=f.q.trim().toLowerCase();
  let a=S.products.filter(p=>(!q||(p.name+' '+p.sku+' '+(p.loc||'')).toLowerCase().includes(q))&&(!f.cat||p.cat===f.cat)&&(!f.st||(f.st==='low'?stockState(p)!=='ok':stockState(p)==='out')));
  const key={name:p=>p.name.toLowerCase(),sku:p=>p.sku,cat:p=>p.cat,stock:p=>p.stock,cost:p=>p.cost,price:p=>p.price,margin:p=>marginOf(p)}[f.sort]||(p=>p.name);
  a.sort((x,y)=>{const A=key(x),B=key(y);return(A<B?-1:A>B?1:0)*f.dir});
  return a;
}
V.inventario=()=>{
  const list=invList(),f=ui.inv;
  const th=(k,l,cls)=>`<th data-act="sort" data-k="${k}" class="${cls||''}">${l}${f.sort===k?(f.dir>0?' ↑':' ↓'):''}</th>`;
  const units=sum(S.products,p=>p.stock);
  return head('Inventario',`${S.products.length} productos · ${units} piezas · ${money(sum(S.products,p=>p.cost*p.stock))} a costo`,
    `<button class="btn" data-act="exportInv">${I('down')}Exportar CSV</button><button class="btn primary" data-act="newProd">${I('plus')}Nuevo producto</button>`)+
  `<div class="tools">
    <input class="inp" id="invQ" type="search" placeholder="Buscar por nombre, SKU o ubicación" value="${esc(f.q)}" data-bind="inv.q" aria-label="Buscar producto">
    <select class="inp sel" data-bind="inv.cat" aria-label="Categoría"><option value="">Todas las categorías</option>${CATS.concat(S.products.map(p=>p.cat)).filter((c,i,a)=>a.indexOf(c)===i).map(c=>`<option${sel(c,f.cat)}>${esc(c)}</option>`).join('')}</select>
    <div class="chips">${[['','Todos'],['low','Por reponer'],['out','Agotados']].map(c=>`<button class="chip ${f.st===c[0]?'on':''}" data-act="invSt" data-v="${c[0]}">${c[1]}</button>`).join('')}</div>
  </div>
  <div class="tw"><table class="tbl"><thead><tr>${th('sku','SKU')}${th('name','Producto')}${th('cat','Categoría')}${th('stock','Existencia','num')}${th('cost','Costo','num')}${th('price','Precio','num')}${th('margin','Margen','num')}<th></th></tr></thead><tbody>
  ${list.map(p=>{const st=stockState(p),ratio=Math.min(1,p.stock/Math.max(1,p.min*3));return `<tr data-act="editProd" data-id="${p.id}">
    <td class="mono">${esc(p.sku)}</td>
    <td class="nm">${esc(p.name)}<small>${esc(p.loc||'Sin ubicación')}</small></td>
    <td>${esc(p.cat)}</td>
    <td class="num"><div class="stk"><div><b>${p.stock}</b> <span class="hint">mín. ${p.min}</span></div><div class="bar ${st}"><i style="width:${Math.max(4,ratio*100)}%"></i></div></div></td>
    <td class="num">${money(p.cost)}</td><td class="num">${money(p.price)}</td><td class="num">${pct(marginOf(p))}</td>
    <td class="num"><button class="btn sm" data-act="adjProd" data-id="${p.id}">Ajustar</button></td></tr>`}).join('')}
  </tbody></table>${list.length?'':'<div class="empty">No hay productos con ese filtro.</div>'}</div>`;
};

V.taller=()=>{
  const tab=ui.taller.tab,today=todayS();
  const tabs=`<div class="tabs"><button class="tab ${tab==='tablero'?'on':''}" data-act="tTab" data-v="tablero">Tablero</button><button class="tab ${tab==='historial'?'on':''}" data-act="tTab" data-v="historial">Historial</button><button class="tab ${tab==='servicios'?'on':''}" data-act="tTab" data-v="servicios">Catálogo de servicios</button></div>`;
  let body='';
  if(tab==='tablero'){
    const cols=['recibida','diagnostico','reparacion','lista'];
    body=`<div class="board">${cols.map(k=>{
      const os=S.orders.filter(o=>o.status===k).sort((a,b)=>a.promised<b.promised?-1:1);
      return `<div class="col"><h3>${OST[k][0]}<span>${os.length}</span></h3>${os.map(o=>{
        const late=o.promised<today&&k!=='lista',tod=o.promised===today;
        return `<button class="oc" data-act="openOrder" data-id="${o.id}"><div class="t"><b>${esc(cname(o.customerId))}</b><span class="f">${esc(o.folio)}</span></div><span>${esc(o.bike)}</span><span class="sv">${esc(o.services.map(s=>s.name).join(' · ')||'Solo refacciones')}</span><div class="ft"><span class="${late?'late':''}">${late?'Vencida · ':tod?'Hoy · ':'Promesa '}${fdate(o.promised)}</span><b>${money(oTot(o))}</b></div><span class="hint">${esc(o.mechanic||'Sin asignar')}</span></button>`}).join('')||'<div class="hint" style="padding:10px 4px">Sin órdenes</div>'}</div>`}).join('')}</div>`;
  }else if(tab==='historial'){
    const q=ui.hist.q.trim().toLowerCase();
    const os=S.orders.filter(o=>!isOpen(o)&&(!q||(o.folio+' '+cname(o.customerId)+' '+o.bike).toLowerCase().includes(q))).sort((a,b)=>(b.delivered||b.created)<(a.delivered||a.created)?-1:1);
    body=`<div class="tools"><input class="inp" id="histQ" type="search" placeholder="Buscar folio, cliente o bicicleta" value="${esc(ui.hist.q)}" data-bind="hist.q"></div>
    <div class="tw"><table class="tbl"><thead><tr><th>Folio</th><th>Cliente</th><th>Bicicleta</th><th>Mecánico</th><th>Entrega</th><th>Estado</th><th class="num">Total</th></tr></thead><tbody>${os.slice(0,80).map(o=>`<tr data-act="openOrder" data-id="${o.id}"><td class="mono">${esc(o.folio)}</td><td class="nm">${esc(cname(o.customerId))}</td><td>${esc(o.bike)}</td><td>${esc(o.mechanic||'—')}</td><td>${fdate(o.delivered||o.created)}</td><td>${pill(OST[o.status])}</td><td class="num">${money(oTot(o))}</td></tr>`).join('')}</tbody></table>${os.length?'':'<div class="empty">Sin órdenes cerradas.</div>'}</div>`;
  }else{
    const sv=S.services.slice().sort((a,b)=>a.price-b.price);
    body=`<div class="tools"><span class="hint">Precios de mano de obra. Las refacciones se cobran aparte desde el inventario.</span></div>
    <div class="tw"><table class="tbl"><thead><tr><th>Servicio</th><th class="num">Tiempo</th><th class="num">Precio</th><th class="num">Pedidos 30 d</th><th></th></tr></thead><tbody>${sv.map(s=>{const c=sum(S.orders.filter(o=>o.status==='entregada'&&o.delivered>=dISO(addD(new Date(),-30))),o=>o.services.filter(x=>x.sid===s.id).length);return `<tr data-act="editSvc" data-id="${s.id}"><td class="nm">${esc(s.name)}</td><td class="num">${s.hrs?s.hrs+' h':'—'}</td><td class="num"><b>${money(s.price)}</b></td><td class="num">${c}</td><td class="num"><button class="btn sm" data-act="editSvc" data-id="${s.id}">Editar</button></td></tr>`}).join('')}</tbody></table></div>`;
  }
  return head('Taller',`${S.orders.filter(isOpen).length} órdenes abiertas · ${S.services.length} servicios de ${money(Math.min(...S.services.map(s=>s.price)))} a ${money(Math.max(...S.services.map(s=>s.price)))}`,
    (tab==='servicios'?`<button class="btn" data-act="newSvc">${I('plus')}Nuevo servicio</button>`:'')+`<button class="btn primary" data-act="newOrder">${I('plus')}Nueva orden</button>`)+tabs+body;
};

function posItems(){
  const c=ui.pos,q=c.q.trim().toLowerCase();
  const prods=S.products.filter(p=>(!c.cat||p.cat===c.cat)&&c.cat!=='__serv'&&(!q||(p.name+' '+p.sku).toLowerCase().includes(q)));
  const svs=(!c.cat||c.cat==='__serv')?S.services.filter(s=>!q||s.name.toLowerCase().includes(q)):[];
  return {prods,svs};
}
function cartTotals(){const c=ui.pos;const sub=sum(c.cart,i=>i.price*i.qty),disc=Math.round(sub*Math.min(100,Math.max(0,n(c.disc)))/100*100)/100,total=sub-disc;return{sub,disc,total,iva:total-total/1.16}}
V.ventas=()=>{
  const c=ui.pos,tab=c.tab;
  const tabs=`<div class="tabs"><button class="tab ${tab==='nueva'?'on':''}" data-act="pTab" data-v="nueva">Nueva venta</button><button class="tab ${tab==='hist'?'on':''}" data-act="pTab" data-v="hist">Historial de ventas</button></div>`;
  if(tab==='hist'){
    const q=ui.hist.q.trim().toLowerCase();
    const ss=S.sales.filter(s=>!q||(s.folio+' '+cname(s.customerId)+' '+s.pay).toLowerCase().includes(q)).slice().reverse();
    return head('Ventas',`${S.sales.length} ventas registradas`)+tabs+`<div class="tools"><input class="inp" id="histQ" type="search" placeholder="Buscar folio, cliente o forma de pago" value="${esc(ui.hist.q)}" data-bind="hist.q"></div>
    <div class="tw"><table class="tbl"><thead><tr><th>Folio</th><th>Fecha</th><th>Cliente</th><th>Artículos</th><th>Pago</th><th class="num">Total</th></tr></thead><tbody>${ss.slice(0,100).map(s=>`<tr data-act="openSale" data-id="${s.id}"><td class="mono">${esc(s.folio)}</td><td>${fdate(s.date)} <span class="hint">${esc(s.time||'')}</span></td><td>${esc(cname(s.customerId))}</td><td>${sum(s.items,i=>i.qty)}</td><td>${esc(s.pay)}</td><td class="num"><b>${money(s.total)}</b></td></tr>`).join('')}</tbody></table>${ss.length?'':'<div class="empty">Sin ventas.</div>'}</div>`;
  }
  const {prods,svs}=posItems(),T=cartTotals();
  const cats=CATS.concat(S.products.map(p=>p.cat)).filter((x,i,a)=>a.indexOf(x)===i);
  const recv=n(c.recv),change=recv-T.total;
  return head('Punto de venta','Productos y servicios de mostrador')+tabs+`<div class="pos">
    <div class="card"><div class="tools" style="margin:0"><input class="inp" id="posQ" type="search" placeholder="Buscar producto, SKU o servicio" value="${esc(c.q)}" data-bind="pos.q" style="max-width:none"><select class="inp sel" data-bind="pos.cat" aria-label="Categoría"><option value="">Todo</option>${cats.map(x=>`<option${sel(x,c.cat)}>${esc(x)}</option>`).join('')}<option value="__serv"${sel('__serv',c.cat)}>Servicios</option></select></div>
      <div class="items">${prods.map(p=>`<button class="it" data-act="addCart" data-t="prod" data-id="${p.id}" ${p.stock<=0?'disabled':''}><b>${esc(p.name)}</b><span class="mono">${esc(p.sku)}</span><div class="p"><strong>${money(p.price)}</strong><span>${p.stock>0?p.stock+' disp.':'Agotado'}</span></div></button>`).join('')}${svs.map(s=>`<button class="it" data-act="addCart" data-t="serv" data-id="${s.id}"><b>${esc(s.name)}</b><span class="hint">Servicio</span><div class="p"><strong>${money(s.price)}</strong><span>${s.hrs} h</span></div></button>`).join('')}${prods.length+svs.length?'':'<div class="empty" style="grid-column:1/-1">Sin resultados.</div>'}</div></div>
    <div class="card cart"><h2>Venta actual <small>${sum(c.cart,i=>i.qty)} artículos</small></h2>
      ${c.cart.length?c.cart.map((i,k)=>`<div class="cl"><div class="n">${esc(i.name)}<small>${money(i.price)} c/u</small></div><div class="qty"><button class="icon" data-act="cartQty" data-i="${k}" data-d="-1" aria-label="Quitar uno">−</button><b>${i.qty}</b><button class="icon" data-act="cartQty" data-i="${k}" data-d="1" aria-label="Agregar uno">+</button></div><b class="num">${money(i.price*i.qty)}</b></div>`).join(''):'<div class="empty">Toca un producto para agregarlo.</div>'}
      <div class="frm" style="margin-top:14px"><label class="field"><span>Cliente</span><select class="inp" data-bind="pos.cust"><option value="">Mostrador</option>${S.customers.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(x=>`<option value="${x.id}"${sel(x.id,c.cust)}>${esc(x.name)}</option>`).join('')}</select></label>
      <label class="field"><span>Descuento %</span><input class="inp" id="posDisc" type="number" min="0" max="100" step="1" value="${c.disc||''}" placeholder="0" data-bind="pos.disc" data-num></label>
      <label class="field"><span>Forma de pago</span><select class="inp" data-bind="pos.pay">${['Efectivo','Tarjeta','Transferencia'].map(x=>`<option${sel(x,c.pay)}>${x}</option>`).join('')}</select></label>
      ${c.pay==='Efectivo'?`<label class="field"><span>Recibido</span><input class="inp" id="posRecv" type="number" min="0" step="10" value="${c.recv}" placeholder="${Math.ceil(T.total)}" data-bind="pos.recv"></label>`:''}</div>
      <div style="margin-top:12px">${T.disc>0?`<div class="tot"><span>Subtotal</span><span>${money(T.sub)}</span></div><div class="tot"><span>Descuento</span><span>−${money(T.disc)}</span></div>`:''}<div class="tot hint"><span>IVA incluido (16%)</span><span>${money(T.iva)}</span></div><div class="tot big"><span>Total</span><span>${money(T.total)}</span></div>${c.pay==='Efectivo'&&recv>0?`<div class="tot"><span>Cambio</span><b class="${change<0?'dn':''}">${change<0?'Faltan '+money(-change):money(change)}</b></div>`:''}</div>
      <div class="df" style="margin-top:12px"><button class="btn danger sp" data-act="clearCart" ${c.cart.length?'':'disabled'}>Vaciar</button><button class="btn primary" data-act="cobrar" ${c.cart.length?'':'disabled'}>Cobrar ${money(T.total)}</button></div>
    </div></div>`;
};

function custStats(c){
  const os=S.orders.filter(o=>o.customerId===c.id),ss=S.sales.filter(s=>s.customerId===c.id);
  const spent=sum(os.filter(o=>o.status==='entregada'),oTot)+sum(ss,s=>s.total);
  const dates=os.map(o=>o.created).concat(ss.map(s=>s.date)).sort();
  return{os,ss,spent,visits:os.length+ss.length,last:dates[dates.length-1]||'',bikes:[...new Set(os.map(o=>o.bike))]};
}
V.clientes=()=>{
  const q=ui.cli.q.trim().toLowerCase();
  const rows=S.customers.filter(c=>!q||(c.name+' '+c.phone).toLowerCase().includes(q)).map(c=>({c,s:custStats(c)})).sort((a,b)=>b.s.spent-a.s.spent);
  return head('Clientes',`${S.customers.length} clientes registrados`,`<button class="btn primary" data-act="newCust">${I('plus')}Nuevo cliente</button>`)+
  `<div class="tools"><input class="inp" id="cliQ" type="search" placeholder="Buscar por nombre o teléfono" value="${esc(ui.cli.q)}" data-bind="cli.q"></div>
  <div class="tw"><table class="tbl"><thead><tr><th>Cliente</th><th>Teléfono</th><th>Bicicletas</th><th class="num">Visitas</th><th>Última</th><th class="num">Ha gastado</th></tr></thead><tbody>${rows.map(({c,s})=>`<tr data-act="openCust" data-id="${c.id}"><td class="nm">${esc(c.name)}</td><td class="mono">${esc(c.phone||'—')}</td><td>${esc(s.bikes.slice(0,2).join(', ')||'—')}${s.bikes.length>2?` <span class="hint">+${s.bikes.length-2}</span>`:''}</td><td class="num">${s.visits}</td><td>${fdate(s.last)}</td><td class="num"><b>${money(s.spent)}</b></td></tr>`).join('')}</tbody></table>${rows.length?'':'<div class="empty">Sin clientes. Agrega el primero.</div>'}</div>`;
};

V.reportes=()=>{
  const r=ui.rep.r,R=rangeFor(r),lines=revLines(R.from,R.to);
  const rev=sum(lines,l=>l.rev),cost=sum(lines,l=>l.cost);
  const tienda=sum(lines.filter(l=>l.kind==='tienda'),l=>l.rev),taller=rev-tienda;
  const tx=new Set(lines.map(l=>l.ref)).size;
  const cats=groupBy(lines,l=>l.cat),pays=groupBy(lines,l=>l.pay||'Efectivo');
  const tp=groupBy(lines.filter(l=>l.type==='prod'),l=>l.name).slice(0,8),ts=groupBy(lines.filter(l=>l.type==='serv'),l=>l.name).slice(0,6);
  const mech=groupBy(S.orders.filter(o=>o.status==='entregada'&&o.delivered>=R.from&&o.delivered<=R.to).map(o=>({m:o.mechanic||'Sin asignar',qty:1,rev:oSvc(o),cost:0})),l=>l.m);
  const mechRows=[...new Map(S.orders.filter(o=>o.status==='entregada'&&o.delivered>=R.from&&o.delivered<=R.to).map(o=>[o.id,o])).values()];
  const byMech=groupBy(mechRows.map(o=>({m:o.mechanic||'Sin asignar',qty:1,rev:oSvc(o),cost:0})),l=>l.m);
  const bks=buckets(R.from,R.to,R.mode);
  const ranges=[['7','7 días'],['30','30 días'],['mes','Este mes'],['90','90 días'],['365','12 meses']];
  return head('Reportes',fdate(R.from)+' al '+fdateY(R.to),`<button class="btn" data-act="exportSales">${I('down')}Ventas CSV</button><button class="btn" data-act="exportOrders">${I('down')}Órdenes CSV</button>`)+
  `<div class="tools"><div class="chips">${ranges.map(x=>`<button class="chip ${r===x[0]?'on':''}" data-act="repR" data-v="${x[0]}">${x[1]}</button>`).join('')}</div></div>
  <div class="grid g-kpi">
    <div class="kpi"><span class="l">Ingresos</span><span class="v">${money(rev)}</span><span class="s">${tx} operaciones</span></div>
    <div class="kpi"><span class="l">Tienda</span><span class="v">${money(tienda)}</span><span class="s">${rev?pct(tienda/rev):'0%'} del total</span></div>
    <div class="kpi"><span class="l">Taller</span><span class="v">${money(taller)}</span><span class="s">${rev?pct(taller/rev):'0%'} del total</span></div>
    <div class="kpi"><span class="l">Utilidad bruta</span><span class="v">${money(rev-cost)}</span><span class="s">${rev?pct((rev-cost)/rev):'0%'} de margen sobre costo de piezas</span></div>
    <div class="kpi"><span class="l">Ticket promedio</span><span class="v">${money(tx?rev/tx:0)}</span><span class="s">por venta u orden</span></div>
  </div>
  <div class="card"><h2>Ingresos por ${R.mode==='day'?'día':R.mode==='week'?'semana':'mes'} ${legend()}</h2>${revChart(bks)}</div>
  <div class="grid g-2b" style="margin-top:16px">
    <div class="card"><h2>Por categoría</h2>${cats.length?hbars(cats.map(c=>[c.key,c.rev,money(c.rev)]),cats[0].rev):'<div class="empty">Sin datos en este periodo.</div>'}</div>
    <div class="card"><h2>Por forma de pago</h2>${pays.length?hbars(pays.map(c=>[c.key,c.rev,money(c.rev)]),pays[0].rev,true):'<div class="empty">Sin datos.</div>'}<h2 style="margin-top:18px">Servicios por mecánico</h2>${byMech.length?hbars(byMech.map(c=>[c.key,c.rev,money(c.rev)+' · '+c.qty+' ord.']),byMech[0].rev,true):'<div class="empty">Sin órdenes entregadas.</div>'}</div>
    <div class="card"><h2>Productos más vendidos</h2>${tp.length?hbars(tp.map(c=>[c.key,c.rev,money(c.rev)+' · '+c.qty+' pza']),tp[0].rev):'<div class="empty">Sin datos.</div>'}</div>
    <div class="card"><h2>Servicios más vendidos</h2>${ts.length?hbars(ts.map(c=>[c.key,c.rev,money(c.rev)+' · '+c.qty]),ts[0].rev,true):'<div class="empty">Sin datos.</div>'}</div>
  </div>`;
};

V.ajustes=()=>{
  return head('Ajustes','Datos del negocio y respaldo')+`<div class="grid g-2b">
    <div class="card"><h2>Negocio</h2><div class="frm">
      <label class="field full"><span>Nombre de la tienda</span><input class="inp" id="shopName" value="${esc(S.shop.name)}" data-sbind="shop.name"></label>
      <label class="field full"><span>Mecánicos (separados por coma)</span><input class="inp" id="mechIn" value="${esc(S.shop.mechanics.join(', '))}"></label>
    </div><p class="hint" style="margin-top:12px">Los precios incluyen IVA del 16%. El desglose aparece en cada venta.</p></div>
    <div class="card"><h2>Respaldo de datos</h2>
      <p class="hint" style="margin-bottom:12px">La información se guarda en este navegador. Descarga un respaldo para conservarla o pasarla a otro equipo.</p>
      <div class="chips"><button class="btn" data-act="exportBackup">${I('down')}Descargar respaldo</button><button class="btn" data-act="importBackup">Restaurar respaldo</button></div>
      <h2 style="margin-top:22px">Empezar</h2>
      <div class="chips"><button class="btn" data-act="startClean">Empezar con mis datos</button><button class="btn danger" data-act="resetDemo">Volver a los datos de ejemplo</button></div>
      <p class="hint" style="margin-top:10px">“Empezar con mis datos” borra productos, clientes, órdenes y ventas, y conserva el catálogo de servicios.</p>
    </div></div>`;
};

/* ---------- render principal ---------- */
function renderChrome(){
  const low=S.products.filter(p=>stockState(p)!=='ok').length,open=S.orders.filter(isOpen).length;
  const bd={inventario:low,taller:open};
  $('#nav').innerHTML=VIEWS.map(v=>`<button class="nv ${ui.view===v[0]?'on':''}" data-act="nav" data-v="${v[0]}" ${ui.view===v[0]?'aria-current="page"':''}>${I(ICON_OF[v[0]])}<span>${v[1]}</span>${bd[v[0]]?`<span class="bd">${bd[v[0]]}</span>`:''}</button>`).join('');
  $('#sideFoot').innerHTML=`<b>${esc(S.shop.name)}</b><span>Taller y tienda</span>`;
  $('#banner').innerHTML=S.demo?`<div class="demo"><span>Estás viendo datos de ejemplo. Puedes probar todo y después empezar con tu inventario real.</span><button class="btn sm" data-act="startClean">Empezar con mis datos</button></div>`:'';
}
function render(){keepFocus(()=>{renderChrome();$('#view').innerHTML=V[ui.view]()})}
function go(v){ui.view=v;try{location.hash=v}catch(e){}render();window.scrollTo(0,0)}

/* ---------- modales ---------- */
let M=null;
const modals={};
function hideModal(){const m=$('#modal');m.hidden=true;m.innerHTML=''}
function openModal(kind,data,stack){const prev=stack?M:null;M=Object.assign({kind},data||{});if(prev)M.prev=prev;renderModal()}
function closeModal(){if(M&&M.prev){M=M.prev;renderModal()}else{M=null;hideModal()}}
function renderModal(){
  if(!M)return;
  keepFocus(()=>{const m=$('#modal');m.innerHTML=`<div class="scrim" data-act="close"></div><div class="dlg ${M.wide?'wide':''}" role="dialog" aria-modal="true">${modals[M.kind](M)}</div>`;m.hidden=false});
  const tx=$('#txt');if(tx&&!M.sel){M.sel=1;tx.focus();tx.select()}
}
const dh=(t,s)=>`<div class="dh"><div><h2>${t}</h2>${s?`<p>${s}</p>`:''}</div><button class="icon" data-act="close" aria-label="Cerrar">×</button></div>`;
const errBox=M=>M.err?`<div class="err" role="alert">${esc(M.err)}</div>`:'';
function ask(title,text,label,fn,danger){openModal('confirm',{title,text,label,fn,danger},true)}
modals.confirm=M=>`${dh(esc(M.title))}<p>${esc(M.text)}</p><div class="df"><button class="btn" data-act="close">Cancelar</button><button class="btn ${M.danger?'':'primary'}" ${M.danger?'style="background:var(--bad);border-color:var(--bad);color:#fff"':''} data-act="confirmYes">${esc(M.label)}</button></div>`;
modals.text=M=>`${dh(esc(M.title),M.sub?esc(M.sub):'')}<textarea id="txt" class="inp mono-box" readonly>${esc(M.text)}</textarea><div class="df"><button class="btn primary" data-act="close">Listo</button></div>`;

modals.prod=M=>{
  const d=M.draft,mg=n(d.price)>0?(n(d.price)-n(d.cost))/n(d.price):0;
  return `${dh(d.id?'Editar producto':'Nuevo producto',d.id?esc(d.sku):'')}${errBox(M)}<div class="frm">
  <label class="field full"><span>Nombre</span><input class="inp" id="f-name" value="${esc(d.name)}" data-mb="draft.name"></label>
  <label class="field"><span>SKU</span><input class="inp" id="f-sku" value="${esc(d.sku)}" data-mb="draft.sku" placeholder="Ej. FRE-PD"></label>
  <label class="field"><span>Categoría</span><input class="inp" id="f-cat" list="catList" value="${esc(d.cat)}" data-mb="draft.cat"><datalist id="catList">${CATS.map(c=>`<option value="${esc(c)}">`).join('')}</datalist></label>
  <label class="field"><span>Costo</span><input class="inp" id="f-cost" type="number" min="0" step="1" value="${d.cost}" data-mb="draft.cost" data-num data-re></label>
  <label class="field"><span>Precio de venta (con IVA)</span><input class="inp" id="f-price" type="number" min="0" step="1" value="${d.price}" data-mb="draft.price" data-num data-re></label>
  ${d.id?'':`<label class="field"><span>Existencia inicial</span><input class="inp" id="f-stock" type="number" min="0" step="1" value="${d.stock}" data-mb="draft.stock" data-num></label>`}
  <label class="field"><span>Mínimo antes de reponer</span><input class="inp" id="f-min" type="number" min="0" step="1" value="${d.min}" data-mb="draft.min" data-num></label>
  <label class="field"><span>Ubicación</span><input class="inp" id="f-loc" value="${esc(d.loc||'')}" data-mb="draft.loc" placeholder="Ej. R2-B"></label>
  </div><p class="hint" style="margin-top:10px">Margen: <b>${pct(mg)}</b> · Utilidad por pieza: <b>${money(n(d.price)-n(d.cost))}</b>${d.id?` · Existencia actual: <b>${d.stock}</b>`:''}</p>
  <div class="df">${d.id?'<button class="btn danger sp" data-act="delProd">Eliminar</button>':''}<button class="btn" data-act="close">Cancelar</button><button class="btn primary" data-act="saveProd">Guardar</button></div>`;
};
modals.stock=M=>{
  const p=prod(M.pid),mv=S.moves.filter(m=>m.pid===p.id).slice(-5).reverse();
  const t=M.type,q=n(M.qty);
  const after=t==='entrada'?p.stock+q:t==='salida'?p.stock-q:q;
  return `${dh('Ajustar existencia',esc(p.name))}${errBox(M)}<div class="chips" style="margin-bottom:14px">${[['entrada','Entrada'],['salida','Salida'],['conteo','Conteo físico']].map(x=>`<button class="chip ${t===x[0]?'on':''}" data-act="stType" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
  <div class="frm"><label class="field"><span>${t==='conteo'?'Existencia contada':'Cantidad'}</span><input class="inp" id="f-qty" type="number" min="0" step="1" value="${M.qty}" data-mb="qty" data-num data-re></label>
  <label class="field"><span>Nota</span><input class="inp" id="f-note" value="${esc(M.note)}" data-mb="note" placeholder="${t==='entrada'?'Compra a proveedor':t==='salida'?'Merma, daño, uso interno':'Inventario físico'}"></label></div>
  <p class="hint" style="margin-top:10px">Ahora ${p.stock} pza → quedará en <b>${after}</b>${after<0?' (no puede ser negativo)':''}</p>
  ${mv.length?`<div class="sec"><span class="lbl">Últimos movimientos</span><div class="list">${mv.map(m=>`<div class="li"><span>${esc(m.note||m.type)}<small>${fdate(m.date)}</small></span><b class="${m.qty<0?'dn':'up'}">${m.qty>0?'+':''}${m.qty}</b></div>`).join('')}</div></div>`:''}
  <div class="df"><button class="btn" data-act="close">Cancelar</button><button class="btn primary" data-act="saveStock">Registrar</button></div>`;
};
modals.svc=M=>{const d=M.draft;return `${dh(d.id?'Editar servicio':'Nuevo servicio')}${errBox(M)}<div class="frm">
  <label class="field full"><span>Nombre</span><input class="inp" id="f-sname" value="${esc(d.name)}" data-mb="draft.name"></label>
  <label class="field"><span>Precio de mano de obra</span><input class="inp" id="f-sprice" type="number" min="0" step="10" value="${d.price}" data-mb="draft.price" data-num></label>
  <label class="field"><span>Tiempo estimado (horas)</span><input class="inp" id="f-shrs" type="number" min="0" step="0.5" value="${d.hrs}" data-mb="draft.hrs" data-num></label></div>
  <div class="df">${d.id?'<button class="btn danger sp" data-act="delSvc">Eliminar</button>':''}<button class="btn" data-act="close">Cancelar</button><button class="btn primary" data-act="saveSvc">Guardar</button></div>`};
modals.cust=M=>{
  const d=M.draft,s=d.id?custStats(cust(d.id)):null;
  return `${dh(d.id?esc(d.name):'Nuevo cliente',d.id?`${s.visits} visitas · ha gastado ${money(s.spent)}`:'')}${errBox(M)}<div class="frm">
  <label class="field"><span>Nombre</span><input class="inp" id="f-cname" value="${esc(d.name)}" data-mb="draft.name"></label>
  <label class="field"><span>Teléfono</span><input class="inp" id="f-cph" type="tel" value="${esc(d.phone)}" data-mb="draft.phone"></label>
  <label class="field full"><span>Notas</span><textarea class="inp" id="f-cnotes" data-mb="draft.notes" placeholder="Preferencias, bicicletas, datos de contacto">${esc(d.notes||'')}</textarea></label></div>
  ${s&&s.visits?`<div class="sec"><span class="lbl">Historial</span><div class="list">${s.os.slice().reverse().slice(0,5).map(o=>`<div class="li"><span>${esc(o.folio)} · ${esc(o.bike)}<small>${fdate(o.created)} · ${esc(o.services.map(x=>x.name).join(', ')||'Refacciones')}</small></span><span>${pill(OST[o.status])} <b>${money(oTot(o))}</b></span></div>`).join('')}${s.ss.slice().reverse().slice(0,3).map(x=>`<div class="li"><span>${esc(x.folio)} · Venta de mostrador<small>${fdate(x.date)}</small></span><b>${money(x.total)}</b></div>`).join('')}</div></div>`:''}
  <div class="df">${d.id?'<button class="btn danger sp" data-act="delCust">Eliminar</button>':''}<button class="btn" data-act="close">Cancelar</button><button class="btn primary" data-act="saveCust">Guardar</button></div>`;
};
modals.receipt=M=>{
  const s=M.sale,sub=sum(s.items,i=>i.price*i.qty),disc=sub-s.total;
  return `${dh('Venta registrada',esc(s.folio)+' · '+fdateY(s.date))}<div class="tickets">${s.items.map(i=>`<div class="tot"><span>${i.qty} × ${esc(i.name)}</span><span>${money(i.price*i.qty)}</span></div>`).join('')}<hr style="border:0;border-top:1px dashed var(--line);margin:10px 0">${disc>0?`<div class="tot"><span>Descuento</span><span>−${money(disc)}</span></div>`:''}<div class="tot"><span>IVA incluido</span><span>${money(s.total-s.total/1.16)}</span></div><div class="tot"><b>TOTAL</b><b>${money(s.total)}</b></div><div class="tot"><span>Pago</span><span>${esc(s.pay)}</span></div></div>
  <div class="df"><button class="btn" data-act="copyTicket">Copiar ticket</button><button class="btn primary" data-act="close">Listo</button></div>`;
};
function avail(M,p){return p.stock+effQty(M.orig,p.id)-effQty(M.draft,p.id)}
modals.order=M=>{
  const d=M.draft,ro=d.status==='entregada'||d.status==='cancelada',dis=ro?' disabled':'';
  const sv=sum(d.services,x=>n(x.price)),pt=sum(d.parts,x=>n(x.price)*n(x.qty)),tot=sv+pt,bal=Math.max(0,tot-n(d.advance));
  const idx=FLOW.indexOf(d.status),labels={recibida:'Recibida',diagnostico:'Diagnóstico',reparacion:'Reparación',lista:'Lista',entregada:'Entregada'};
  const stepper=d.status==='cancelada'?`<span class="pill bad">Cancelada</span>`:`<div class="steps">${FLOW.map((s,i)=>`<button type="button" class="step ${i<idx?'done':''} ${s===d.status?'cur':''}" ${ro||s==='entregada'?'disabled':''} data-act="oStatus" data-s="${s}"><b>${i+1}</b>${labels[s]}</button>`).join('')}</div>`;
  const prodOpts=S.products.filter(p=>avail(M,p)>0).map(p=>`<option value="${p.id}">${esc(p.name)} · ${avail(M,p)} disp. · ${money(p.price)}</option>`).join('');
  const next=FLOW[idx+1];
  return `${dh(esc(d.folio)+(M.orig?'':' · Nueva orden'),'Orden de servicio de taller')}${errBox(M)}${stepper}
  <div class="frm sec">
    <label class="field"><span>Cliente</span><select class="inp" id="o-cust" data-mb="draft.customerId" data-re ${dis}><option value="">Elegir cliente…</option>${S.customers.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(c=>`<option value="${c.id}"${sel(c.id,d.customerId)}>${esc(c.name)}</option>`).join('')}<option value="__new"${sel('__new',d.customerId)}>+ Cliente nuevo</option></select></label>
    <label class="field"><span>Bicicleta</span><input class="inp" id="o-bike" value="${esc(d.bike)}" data-mb="draft.bike" placeholder="Marca, rodada, color" ${dis}></label>
    ${d.customerId==='__new'?`<label class="field"><span>Nombre del cliente nuevo</span><input class="inp" id="o-nn" value="${esc(d.newName)}" data-mb="draft.newName" ${dis}></label><label class="field"><span>Teléfono</span><input class="inp" id="o-np" type="tel" value="${esc(d.newPhone)}" data-mb="draft.newPhone" ${dis}></label>`:''}
    <label class="field"><span>Mecánico</span><select class="inp" id="o-mech" data-mb="draft.mechanic" ${dis}><option value="">Sin asignar</option>${S.shop.mechanics.map(m=>`<option${sel(m,d.mechanic)}>${esc(m)}</option>`).join('')}</select></label>
    <label class="field"><span>Fecha prometida</span><input class="inp" id="o-prom" type="date" value="${esc(d.promised)}" data-mb="draft.promised" ${dis}></label>
  </div>
  <div class="sec"><span class="lbl">Servicios (mano de obra)</span>
    ${d.services.map((x,i)=>`<div class="ln"><span class="n">${esc(x.name)}</span><input class="inp sm" id="o-sp${i}" type="number" min="0" step="10" value="${x.price}" data-mb="draft.services.${i}.price" data-re ${dis} aria-label="Precio"><button class="icon" data-act="oRemSvc" data-i="${i}" ${dis} aria-label="Quitar">×</button></div>`).join('')||'<div class="hint">Aún no hay servicios.</div>'}
    ${ro?'':`<div class="addr"><select class="inp" id="o-svc"><option value="">Agregar servicio…</option>${S.services.slice().sort((a,b)=>a.price-b.price).map(s=>`<option value="${s.id}">${esc(s.name)} · ${money(s.price)}</option>`).join('')}</select><button class="btn" data-act="oAddSvc">Agregar</button></div>`}
  </div>
  <div class="sec"><span class="lbl">Refacciones del inventario</span>
    ${d.parts.map((x,i)=>`<div class="ln p"><span class="n">${esc(x.name)}<small class="hint" style="display:block">${money(x.price)} c/u</small></span><span class="qty"><button class="icon" data-act="oQty" data-i="${i}" data-d="-1" ${dis} aria-label="Quitar uno">−</button><b>${x.qty}</b><button class="icon" data-act="oQty" data-i="${i}" data-d="1" ${dis} aria-label="Agregar uno">+</button></span><b class="num">${money(n(x.price)*n(x.qty))}</b><button class="icon" data-act="oRemPart" data-i="${i}" ${dis} aria-label="Quitar">×</button></div>`).join('')||'<div class="hint">Sin refacciones. Al agregarlas se descuentan del inventario.</div>'}
    ${ro?'':`<div class="addr"><select class="inp" id="o-part"><option value="">Agregar refacción…</option>${prodOpts}</select><button class="btn" data-act="oAddPart">Agregar</button></div>`}
  </div>
  <div class="sec"><label class="field"><span>Diagnóstico y notas</span><textarea class="inp" id="o-notes" data-mb="draft.notes" placeholder="Qué se encontró, qué se autorizó, observaciones" ${dis}>${esc(d.notes)}</textarea></label></div>
  <div class="sec"><div class="tot"><span>Servicios</span><span>${money(sv)}</span></div><div class="tot"><span>Refacciones</span><span>${money(pt)}</span></div>
  <div class="frm" style="margin:6px 0"><label class="field"><span>Anticipo</span><input class="inp" id="o-adv" type="number" min="0" step="50" value="${d.advance||''}" placeholder="0" data-mb="draft.advance" data-re ${dis}></label>${d.status==='lista'||d.status==='entregada'?`<label class="field"><span>Forma de pago</span><select class="inp" id="o-pay" data-mb="draft.pay" ${dis}>${['Efectivo','Tarjeta','Transferencia'].map(x=>`<option${sel(x,d.pay)}>${x}</option>`).join('')}</select></label>`:''}</div>
  <div class="tot big"><span>Total</span><span>${money(tot)}</span></div>${n(d.advance)>0?`<div class="tot"><span>Saldo por cobrar</span><b>${money(bal)}</b></div>`:''}</div>
  <div class="df">
    ${M.orig&&!ro?'<button class="btn danger sp" data-act="oCancel">Cancelar orden</button>':''}
    ${d.status==='lista'&&!ro?'<button class="btn" data-act="oCopy">Copiar aviso al cliente</button>':''}
    <button class="btn" data-act="close">${ro?'Cerrar':'Salir sin guardar'}</button>
    ${ro?'<button class="btn" data-act="oReopen">Reabrir orden</button>':`<button class="btn" data-act="oSave">Guardar</button>${d.status==='lista'?`<button class="btn good" data-act="oDeliver">Entregar y cobrar ${money(bal)}</button>`:next?`<button class="btn primary" data-act="oNext">Pasar a ${labels[next]}</button>`:''}`}
  </div>`;
};
function newOrderDraft(){
  const t=new Date();
  return{id:uid(),folio:'OT-'+String(S.seq.o).padStart(4,'0'),customerId:'',newName:'',newPhone:'',bike:'',mechanic:'',status:'recibida',created:todayS(),promised:dISO(addD(t,2)),delivered:'',services:[],parts:[],notes:'',advance:'',pay:'Efectivo'};
}
function openOrder(o){
  const draft=JSON.parse(JSON.stringify(o||newOrderDraft()));
  if(o){draft.newName='';draft.newPhone='';}
  openModal('order',{draft,orig:o?JSON.parse(JSON.stringify(o)):null,wide:true});
}
function saveOrder(){
  const d=M.draft,o=M.orig;
  const fail=m=>{M.err=m;renderModal();$('.dlg')&&($('.dlg').scrollTop=0)};
  if(d.customerId==='__new'){if(!d.newName.trim())return fail('Escribe el nombre del cliente nuevo.')}
  else if(!d.customerId)return fail('Elige un cliente o agrega uno nuevo.');
  if(!d.bike.trim())return fail('Describe la bicicleta: marca, rodada y color.');
  if(!d.services.length&&!d.parts.length)return fail('Agrega al menos un servicio o una refacción.');
  const rec={id:d.id,folio:d.folio,customerId:d.customerId,bike:d.bike.trim(),mechanic:d.mechanic,status:d.status,created:d.created,promised:d.promised,delivered:d.delivered||'',services:d.services.map(x=>({sid:x.sid,name:x.name,price:n(x.price)})),parts:d.parts.map(x=>({pid:x.pid,name:x.name,qty:n(x.qty),price:n(x.price),cost:n(x.cost)})),notes:d.notes||'',advance:n(d.advance),pay:d.pay||'Efectivo'};
  const pids=new Set(rec.parts.map(x=>x.pid).concat(o?o.parts.map(x=>x.pid):[]));
  for(const pid of pids){const diff=effQty(rec,pid)-effQty(o,pid),p=prod(pid);if(diff>0&&p&&p.stock<diff)return fail('No hay existencia suficiente de '+p.name+'.')}
  if(d.customerId==='__new'){rec.customerId='c'+uid();S.customers.push({id:rec.customerId,name:d.newName.trim(),phone:(d.newPhone||'').trim(),notes:''})}
  pids.forEach(pid=>{const diff=effQty(rec,pid)-effQty(o,pid),p=prod(pid);if(diff!==0&&p){p.stock-=diff;logMove(pid,'orden',-diff,(diff>0?'Usado en ':'Devuelto de ')+rec.folio)}});
  if(rec.status==='entregada'){if(!(o&&o.status==='entregada'))rec.delivered=todayS()}else rec.delivered='';
  if(o){const i=S.orders.findIndex(x=>x.id===rec.id);if(i>=0)S.orders[i]=rec}else{S.orders.push(rec);S.seq.o++}
  save();M=null;hideModal();render();
  toast(rec.status==='entregada'?'Orden '+rec.folio+' entregada y cobrada':'Orden '+rec.folio+' guardada');
}
function csv(rows){return '﻿'+rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\r\n')}
async function exportFile(name,text,title){
  try{
    const cl=window.claude;const dl=cl&&await cl.use('downloads');
    if(dl){await dl.save({filename:name,data:text});toast('Archivo guardado: '+name);return}
  }catch(e){if(e&&e.code==='declined')return}
  try{
    const b=new Blob([text],{type:'text/plain;charset=utf-8'}),u=URL.createObjectURL(b),a=document.createElement('a');
    a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(u),1500);toast('Archivo descargado: '+name);return;
  }catch(e){}
  openModal('text',{title:title||'Copia estos datos',sub:'Pega el contenido en un archivo llamado '+name,text});
}
async function copyText(t,msg){try{await navigator.clipboard.writeText(t);toast(msg||'Copiado')}catch(e){openModal('text',{title:'Copia el texto',text:t},true)}}

/* ---------- acciones ---------- */
const A={
  close:()=>closeModal(),
  confirmYes:()=>{const f=M.fn;M=M.prev||null;if(M)renderModal();else hideModal();f()},
  nav:d=>go(d.v),
  goTaller:()=>{ui.taller.tab='tablero';go('taller')},
  invSt:d=>{ui.inv.st=d.v;render()},
  sort:d=>{if(ui.inv.sort===d.k)ui.inv.dir*=-1;else{ui.inv.sort=d.k;ui.inv.dir=1}render()},
  newProd:()=>openModal('prod',{draft:{name:'',sku:'',cat:ui.inv.cat||CATS[1],cost:'',price:'',stock:0,min:3,loc:''}}),
  editProd:d=>{const p=prod(d.id);openModal('prod',{draft:Object.assign({},p)})},
  saveProd:()=>{
    const d=M.draft;
    if(!d.name.trim()){M.err='Escribe el nombre del producto.';return renderModal()}
    if(d.price===''||n(d.price)<=0){M.err='Escribe el precio de venta.';return renderModal()}
    const rec={name:d.name.trim(),sku:(d.sku||'').trim().toUpperCase()||('SKU-'+uid().toUpperCase().slice(0,4)),cat:(d.cat||'').trim()||'Accesorios',cost:n(d.cost),price:n(d.price),min:Math.max(0,Math.floor(n(d.min))),loc:(d.loc||'').trim()};
    if(d.id){Object.assign(prod(d.id),rec)}else{rec.id='p'+uid();rec.stock=Math.max(0,Math.floor(n(d.stock)));S.products.push(rec);if(rec.stock>0)logMove(rec.id,'entrada',rec.stock,'Inventario inicial')}
    save();M=null;hideModal();render();toast('Producto guardado');
  },
  delProd:()=>{const id=M.draft.id;ask('¿Eliminar producto?','Se quita del inventario. Las ventas y órdenes anteriores conservan su registro.','Eliminar',()=>{S.products=S.products.filter(p=>p.id!==id);save();M=null;hideModal();render();toast('Producto eliminado')},true)},
  adjProd:d=>openModal('stock',{pid:d.id,type:'entrada',qty:1,note:''}),
  stType:d=>{M.type=d.v;if(d.v==='conteo')M.qty=prod(M.pid).stock;renderModal()},
  saveStock:()=>{
    const p=prod(M.pid),q=n(M.qty),t=M.type;
    const after=t==='entrada'?p.stock+q:t==='salida'?p.stock-q:q;
    if(q<0||(t!=='conteo'&&q===0)){M.err='Escribe una cantidad mayor a cero.';return renderModal()}
    if(after<0){M.err='La existencia no puede quedar en negativo.';return renderModal()}
    const delta=after-p.stock;p.stock=after;
    logMove(p.id,t,delta,M.note.trim()||(t==='entrada'?'Entrada manual':t==='salida'?'Salida manual':'Conteo físico'));
    save();M=null;hideModal();render();toast('Existencia actualizada');
  },
  exportInv:()=>exportFile('inventario.csv',csv([['SKU','Producto','Categoría','Ubicación','Existencia','Mínimo','Costo','Precio','Valor a costo']].concat(S.products.map(p=>[p.sku,p.name,p.cat,p.loc,p.stock,p.min,p.cost,p.price,p.cost*p.stock]))),'Inventario en CSV'),
  tTab:d=>{ui.taller.tab=d.v;render()},
  newOrder:()=>{if(ui.view!=='taller'){ui.view='taller';renderChrome()}openOrder(null)},
  openOrder:d=>openOrder(S.orders.find(o=>o.id===d.id)),
  oStatus:d=>{M.draft.status=d.s;renderModal()},
  oAddSvc:()=>{const id=$('#o-svc').value;if(!id)return;const s=S.services.find(x=>x.id===id);M.draft.services.push({sid:s.id,name:s.name,price:s.price});renderModal()},
  oRemSvc:d=>{M.draft.services.splice(+d.i,1);renderModal()},
  oAddPart:()=>{const id=$('#o-part').value;if(!id)return;const p=prod(id),ex=M.draft.parts.find(x=>x.pid===id);if(avail(M,p)<1)return toast('No hay más existencia');if(ex)ex.qty=n(ex.qty)+1;else M.draft.parts.push({pid:id,name:p.name,qty:1,price:p.price,cost:p.cost});renderModal()},
  oRemPart:d=>{M.draft.parts.splice(+d.i,1);renderModal()},
  oQty:d=>{const x=M.draft.parts[+d.i],p=prod(x.pid),dl=+d.d;if(dl>0&&avail(M,p)<1)return toast('No hay más existencia');x.qty=Math.max(1,n(x.qty)+dl);renderModal()},
  oSave:()=>saveOrder(),
  oNext:()=>{const i=FLOW.indexOf(M.draft.status);M.draft.status=FLOW[i+1];saveOrder()},
  oDeliver:()=>{M.draft.status='entregada';saveOrder()},
  oCancel:()=>ask('¿Cancelar esta orden?','Las refacciones registradas regresan al inventario.','Cancelar orden',()=>{M.draft.status='cancelada';saveOrder()},true),
  oReopen:()=>{M.draft.status=M.draft.status==='cancelada'?'recibida':'lista';M.draft.delivered='';renderModal()},
  oCopy:()=>{const d=M.draft,c=d.customerId==='__new'?{name:d.newName}:cust(d.customerId),first=((c&&c.name)||'').split(' ')[0]||'';const tot=sum(d.services,x=>n(x.price))+sum(d.parts,x=>n(x.price)*n(x.qty)),bal=Math.max(0,tot-n(d.advance));
    copyText(`Hola ${first}, te escribimos de ${S.shop.name}. Tu bicicleta (${d.bike}) ya está lista para recoger. ${bal>0?'Saldo por pagar: '+money(bal)+'. ':''}Te esperamos.`,'Aviso copiado')},
  newSvc:()=>openModal('svc',{draft:{name:'',price:'',hrs:1}}),
  editSvc:d=>openModal('svc',{draft:Object.assign({},S.services.find(s=>s.id===d.id))}),
  saveSvc:()=>{const d=M.draft;if(!d.name.trim()){M.err='Escribe el nombre del servicio.';return renderModal()}if(n(d.price)<=0){M.err='Escribe el precio.';return renderModal()}
    const rec={name:d.name.trim(),price:n(d.price),hrs:n(d.hrs)};
    if(d.id)Object.assign(S.services.find(s=>s.id===d.id),rec);else S.services.push(Object.assign({id:'s'+uid()},rec));
    save();M=null;hideModal();render();toast('Servicio guardado')},
  delSvc:()=>{const id=M.draft.id;ask('¿Eliminar servicio?','Las órdenes anteriores conservan su registro.','Eliminar',()=>{S.services=S.services.filter(s=>s.id!==id);save();M=null;hideModal();render()},true)},
  newSale:()=>{ui.pos.tab='nueva';go('ventas')},
  pTab:d=>{ui.pos.tab=d.v;render()},
  addCart:d=>{
    const c=ui.pos.cart;
    if(d.t==='prod'){const p=prod(d.id),ex=c.find(i=>i.type==='prod'&&i.refId===p.id);if((ex?ex.qty:0)>=p.stock)return toast('No hay más existencia de este producto');if(ex)ex.qty++;else c.push({type:'prod',refId:p.id,name:p.name,qty:1,price:p.price,cost:p.cost})}
    else{const s=S.services.find(x=>x.id===d.id),ex=c.find(i=>i.type==='serv'&&i.refId===s.id);if(ex)ex.qty++;else c.push({type:'serv',refId:s.id,name:s.name,qty:1,price:s.price,cost:0})}
    render();
  },
  cartQty:d=>{const c=ui.pos.cart,i=c[+d.i],dl=+d.d;if(dl>0&&i.type==='prod'&&i.qty>=prod(i.refId).stock)return toast('No hay más existencia');i.qty+=dl;if(i.qty<=0)c.splice(+d.i,1);render()},
  clearCart:()=>{ui.pos.cart=[];ui.pos.recv='';ui.pos.disc=0;render()},
  cobrar:()=>{
    const c=ui.pos;if(!c.cart.length)return;
    for(const i of c.cart){if(i.type==='prod'){const p=prod(i.refId);if(!p||p.stock<i.qty)return toast('Existencia insuficiente: '+i.name)}}
    const T=cartTotals(),folio='V-'+String(S.seq.s).padStart(4,'0'),now=new Date();
    const sale={id:uid(),folio,date:todayS(),time:pad(now.getHours())+':'+pad(now.getMinutes()),customerId:c.cust,items:c.cart.map(i=>({type:i.type,refId:i.refId,name:i.name,qty:i.qty,price:i.price,cost:i.cost})),disc:Math.min(100,Math.max(0,n(c.disc))),total:T.total,pay:c.pay};
    c.cart.forEach(i=>{if(i.type==='prod'){const p=prod(i.refId);p.stock-=i.qty;logMove(p.id,'venta',-i.qty,'Venta '+folio)}});
    S.sales.push(sale);S.seq.s++;save();
    ui.pos.cart=[];ui.pos.recv='';ui.pos.disc=0;ui.pos.cust='';
    render();openModal('receipt',{sale});
  },
  openSale:d=>openModal('receipt',{sale:S.sales.find(s=>s.id===d.id)}),
  copyTicket:()=>{const s=M.sale;copyText(`${S.shop.name}\n${s.folio} · ${fdateY(s.date)}\n`+s.items.map(i=>`${i.qty} x ${i.name}  ${money(i.price*i.qty)}`).join('\n')+`\nTOTAL ${money(s.total)} (IVA incluido)\nPago: ${s.pay}\nGracias por su compra.`,'Ticket copiado')},
  newCust:()=>openModal('cust',{draft:{name:'',phone:'',notes:''}}),
  openCust:d=>openModal('cust',{draft:Object.assign({},cust(d.id))}),
  saveCust:()=>{const d=M.draft;if(!d.name.trim()){M.err='Escribe el nombre del cliente.';return renderModal()}
    const rec={name:d.name.trim(),phone:(d.phone||'').trim(),notes:d.notes||''};
    if(d.id)Object.assign(cust(d.id),rec);else S.customers.push(Object.assign({id:'c'+uid()},rec));
    save();M=null;hideModal();render();toast('Cliente guardado')},
  delCust:()=>{const id=M.draft.id;ask('¿Eliminar cliente?','Sus órdenes y ventas se conservan como mostrador.','Eliminar',()=>{S.customers=S.customers.filter(c=>c.id!==id);save();M=null;hideModal();render()},true)},
  repR:d=>{ui.rep.r=d.v;render()},
  exportSales:()=>{const R=rangeFor(ui.rep.r);exportFile('ventas-y-taller.csv',csv([['Fecha','Origen','Folio','Concepto','Categoría','Cantidad','Ingreso','Costo','Pago']].concat(revLines(R.from,R.to).sort((a,b)=>a.date<b.date?-1:1).map(l=>[l.date,l.kind==='tienda'?'Tienda':'Taller',l.ref,l.name,l.cat,l.qty,Math.round(l.rev*100)/100,l.cost,l.pay]))),'Ingresos en CSV')},
  exportOrders:()=>exportFile('ordenes-taller.csv',csv([['Folio','Creada','Entregada','Estado','Cliente','Bicicleta','Mecánico','Servicios','Refacciones','Total']].concat(S.orders.map(o=>[o.folio,o.created,o.delivered,OST[o.status][0],cname(o.customerId),o.bike,o.mechanic,o.services.map(s=>s.name).join(' | '),o.parts.map(p=>p.qty+'x '+p.name).join(' | '),oTot(o)]))),'Órdenes en CSV'),
  exportBackup:()=>exportFile('rodada-respaldo-'+todayS()+'.json',JSON.stringify(S),'Respaldo completo'),
  importBackup:()=>$('#importFile').click(),
  startClean:()=>ask('¿Empezar con tus datos?','Se borran los productos, clientes, órdenes y ventas de ejemplo. El catálogo de servicios se conserva y lo puedes editar.','Empezar',()=>{S={v:1,demo:false,shop:S.shop,products:[],services:S.services,customers:[],orders:[],sales:[],moves:[],seq:{o:1,s:1}};save();ui.pos.cart=[];render();toast('Listo. Agrega tu primer producto.');go('inventario')},true),
  resetDemo:()=>ask('¿Volver a los datos de ejemplo?','Se reemplaza todo lo que hay ahora por datos de muestra.','Restablecer',()=>{S=seedData();save();ui.pos.cart=[];render();toast('Datos de ejemplo cargados')},true)
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el||el.disabled)return;const f=A[el.dataset.act];if(f){e.preventDefault();f(el.dataset,el,e)}});
const textual=el=>el.tagName==='TEXTAREA'||(el.tagName==='INPUT'&&['text','search','number','tel','email'].includes(el.type));
function onBind(e){
  const el=e.target;if(!(el.dataset&&(el.dataset.bind||el.dataset.mb||el.dataset.sbind||el.id==='mechIn')))return;
  const tx=textual(el);if(tx&&e.type!=='input')return;if(!tx&&e.type!=='change')return;
  let v=el.value;if(el.dataset.num!==undefined)v=v===''?'':Number(v);
  if(el.id==='mechIn'){S.shop.mechanics=el.value.split(',').map(x=>x.trim()).filter(Boolean);save();return}
  if(el.dataset.sbind){setPath(S,el.dataset.sbind,v);save();renderChrome();return}
  if(el.dataset.bind){setPath(ui,el.dataset.bind,v);if(el.dataset.bind==='pos.disc'&&v!==''&&n(v)>100)ui.pos.disc=100;render();return}
  if(el.dataset.mb&&M){setPath(M,el.dataset.mb,v);if(el.dataset.re!==undefined)renderModal()}
}
document.addEventListener('input',onBind);document.addEventListener('change',onBind);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&M)closeModal()});
$('#importFile').addEventListener('change',e=>{
  const f=e.target.files&&e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{try{const d=JSON.parse(r.result);if(!d||!Array.isArray(d.products)||!Array.isArray(d.orders)||!d.shop)throw 0;S=d;S.demo=!!S.demo;save();ui.pos.cart=[];render();toast('Respaldo restaurado')}catch(x){toast('El archivo no es un respaldo válido')}e.target.value=''};
  r.readAsText(f);
});
let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{if(!M)render()},180)});
render();
})();
