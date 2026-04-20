const ALL_ICONS=[
  {e:'🛒',t:'mercado compras supermercado'},{e:'🚗',t:'carro transporte uber dirigir'},
  {e:'🏥',t:'saude hospital medico clinica'},{e:'🎮',t:'jogo lazer games videogame'},
  {e:'🏠',t:'casa moradia aluguel imovel'},{e:'📚',t:'livro educacao estudo escola'},
  {e:'👕',t:'roupa vestuario moda'},{e:'📱',t:'celular assinatura streaming app'},
  {e:'🐾',t:'pet animal cachorro gato'},{e:'💄',t:'beleza maquiagem cosmetico'},
  {e:'📦',t:'outros diversos geral'},{e:'✈️',t:'viagem aviao passagem turismo'},
  {e:'🍔',t:'comida lanche hamburguer restaurante'},{e:'☕',t:'cafe padaria cafeteria'},
  {e:'🍕',t:'pizza comida delivery ifood'},{e:'🎬',t:'cinema filme entretenimento'},
  {e:'🏋️',t:'academia ginastica esporte musculacao'},{e:'💊',t:'farmacia remedio medicamento'},
  {e:'⚡',t:'energia luz eletricidade conta'},{e:'💧',t:'agua conta saneamento'},
  {e:'📡',t:'internet wifi tv banda larga'},{e:'🎵',t:'musica spotify show concert'},
  {e:'🚌',t:'onibus metro transporte publico'},{e:'⛽',t:'gasolina combustivel posto'},
  {e:'🅿️',t:'estacionamento parking'},{e:'🔧',t:'manutencao conserto reparo'},
  {e:'💈',t:'barbearia cabelo cabeleireiro'},{e:'🧴',t:'higiene produtos banheiro'},
  {e:'🏦',t:'banco financeiro investimento'},{e:'💳',t:'cartao credito debito'},
  {e:'🎁',t:'presente gift aniversario'},{e:'🧸',t:'crianca brinquedo infantil'},
  {e:'🖥️',t:'computador tecnologia notebook'},{e:'🎓',t:'faculdade curso universidade'},
  {e:'🌿',t:'garden planta horta natureza'},{e:'🐶',t:'veterinario pet cachorro'},
  {e:'🍺',t:'bar bebida cerveja balada'},{e:'🧺',t:'lavanderia roupa limpeza'},
  {e:'🏖️',t:'praia ferias viagem'},{e:'🎪',t:'evento festa show'},
  {e:'💰',t:'poupanca investimento dinheiro'},{e:'🛵',t:'moto delivery motoboy'},
  {e:'🚕',t:'taxi transporte corrida'},{e:'🏪',t:'loja comercio varejo'},
  {e:'🎯',t:'meta objetivo planejamento'},{e:'🌮',t:'comida mexicana refeicao'},
  {e:'🎨',t:'arte hobby pintura criativo'},{e:'🌡️',t:'saude clinica consulta'},
  {e:'👓',t:'oculos otica saude visao'},{e:'🦷',t:'dentista odontologia'},
  {e:'🧘',t:'yoga bem-estar meditacao'},{e:'🏡',t:'condominio casa imovel'},
  {e:'🔑',t:'chave imovel aluguel'},{e:'📰',t:'jornal revista assinatura'},
  {e:'⚽',t:'esporte futebol bola'},{e:'🏊',t:'natacao piscina esporte'},
  {e:'🎻',t:'instrumento musica aula'},{e:'🧹',t:'limpeza faxina diarista'},
  {e:'🍣',t:'sushi japones comida'},{e:'🚲',t:'bike bicicleta transporte'},
  {e:'📸',t:'foto camera fotografia'},{e:'🧃',t:'bebida suco mercado'},
  {e:'🌍',t:'internacional exterior cambio'},{e:'💻',t:'notebook computador trabalho'},
];

const PALETTE=['#f97316','#3b82f6','#ec4899','#8b5cf6','#14b8a6','#f59e0b','#6366f1','#06b6d4','#84cc16','#f43f5e','#94a3b8','#10b981','#e11d48','#7c3aed','#0ea5e9','#d97706','#16a34a','#dc2626','#9333ea','#0891b2'];

const DEFAULT_CATS=[
  {id:'alimentacao',label:'Alimentação',icon:'🛒',color:'#f97316',budget:0,fixedValue:0},
  {id:'transporte',label:'Transporte',icon:'🚗',color:'#3b82f6',budget:0,fixedValue:0},
  {id:'saude',label:'Saúde',icon:'🏥',color:'#ec4899',budget:0,fixedValue:0},
  {id:'lazer',label:'Lazer',icon:'🎮',color:'#8b5cf6',budget:0,fixedValue:0},
  {id:'moradia',label:'Moradia',icon:'🏠',color:'#14b8a6',budget:0,fixedValue:0},
  {id:'educacao',label:'Educação',icon:'📚',color:'#f59e0b',budget:0,fixedValue:0},
  {id:'assinaturas',label:'Assinaturas',icon:'📱',color:'#06b6d4',budget:0,fixedValue:0},
  {id:'outros',label:'Outros',icon:'📦',color:'#94a3b8',budget:0,fixedValue:0},
];

const MONTHS_FULL=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const USER_COLORS=[
  {bg:'#2d6a4f',text:'#fff'},{bg:'#f97316',text:'#fff'},{bg:'#3b82f6',text:'#fff'},
  {bg:'#ec4899',text:'#fff'},{bg:'#8b5cf6',text:'#fff'},{bg:'#14b8a6',text:'#fff'},
  {bg:'#f59e0b',text:'#1a1916'},{bg:'#e11d48',text:'#fff'}
];

let state={
  expenses:[],categories:[],scriptUrl:'',
  month:new Date().getMonth(),year:new Date().getFullYear(),
  editingExpId:null,filterCat:null,
  income:0  // renda mensal fixa
};
let pickerIcon='📦',pickerColor='#94a3b8',editingCatId=null,selectedCat=null,currentUser=null;

function getCat(id){return state.categories.find(c=>c.id===id)||{id:'?',label:'Outros',icon:'📦',color:'#94a3b8',budget:0,fixedValue:0}}

// ── USERS ──
function getUsers(){try{return JSON.parse(localStorage.getItem('despesas_users')||'[]')}catch(e){return[]}}
function saveUsers(u){localStorage.setItem('despesas_users',JSON.stringify(u))}
function userInitial(n){return n.trim().charAt(0).toUpperCase()}
function userSheetName(n){return n.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9 _-]/g,'').trim().substring(0,30)||'Usuario'}

function renderLoginScreen(){
  const users=getUsers(),list=document.getElementById('userCardsList');
  if(!users.length){
    list.innerHTML=`<div style="color:var(--muted);font-size:13px;text-align:center;padding:20px 0">Crie o primeiro usuário abaixo ↓</div>`;
    return;
  }
  list.innerHTML=users.map(u=>{
    const col=USER_COLORS[u.colorIdx%USER_COLORS.length];
    return`<div class="user-card" onclick="loginAs('${u.id}')">
      <div class="user-avatar" style="background:${col.bg};color:${col.text}">${userInitial(u.name)}</div>
      <div class="user-card-info">
        <div class="user-card-name">${u.name}</div>
        <div class="user-card-sub">Toque para entrar</div>
      </div>
      <span class="user-card-arrow">›</span>
    </div>`;
  }).join('');
}

function addUser(){
  const input=document.getElementById('newUserName'),name=input.value.trim();
  if(!name){showStatus('Informe um nome','err');return}
  const users=getUsers();
  if(users.find(u=>u.name.toLowerCase()===name.toLowerCase())){showStatus('Nome já existe','err');return}
  users.push({id:'u_'+Date.now(),name,colorIdx:users.length});
  saveUsers(users);input.value='';renderLoginScreen();showStatus(`"${name}" criado ✓`,'ok');
}

function loginAs(userId){
  const users=getUsers(),user=users.find(u=>u.id===userId);if(!user)return;
  currentUser=user;localStorage.setItem('despesas_currentUser',userId);
  const col=USER_COLORS[user.colorIdx%USER_COLORS.length];
  const badge=document.getElementById('userBadge');
  badge.textContent=userInitial(user.name);
  badge.style.background=col.bg;badge.style.color=col.text;
  document.getElementById('loginScreen').classList.add('hidden');
  load();
  document.getElementById('heroLabel').textContent=`Gastos em ${MONTHS_FULL[state.month]}`;
  document.getElementById('currentMonth').textContent=`${MONTHS_FULL[state.month].substring(0,3)} ${state.year}`;
  updateSheetsDot();checkScriptWarning();
  if(state.scriptUrl)fetchFromSheets().then(()=>render());else render();
}

function logout(){
  if(!confirm(`Sair da conta de ${currentUser?.name}?`))return;
  currentUser=null;localStorage.removeItem('despesas_currentUser');
  state.expenses=[];state.categories=JSON.parse(JSON.stringify(DEFAULT_CATS));
  state.scriptUrl='';state.filterCat=null;state.income=0;
  document.getElementById('loginScreen').classList.remove('hidden');
  renderLoginScreen();
}

// ── PERSISTENCE ──
function userKey(){return currentUser?`despesas_u_${currentUser.id}`:'despesas_v3'}

function save(){
  localStorage.setItem(userKey(),JSON.stringify({
    expenses:state.expenses,
    categories:state.categories,
    scriptUrl:state.scriptUrl,
    income:state.income
  }));
}

function load(){
  try{
    const raw=localStorage.getItem(userKey());
    if(!raw){resetCats();return}
    const d=JSON.parse(raw);
    state.expenses=d.expenses||[];
    state.categories=(d.categories&&d.categories.length)?d.categories:JSON.parse(JSON.stringify(DEFAULT_CATS));
    state.scriptUrl=d.scriptUrl||'';
    state.income=Number(d.income)||0;
    state.categories.forEach(c=>{
      if(c.fixedValue===undefined)c.fixedValue=0;
      if(c.budget===undefined)c.budget=0;
    });
  }catch(e){resetCats()}
}

function resetCats(){state.categories=JSON.parse(JSON.stringify(DEFAULT_CATS))}

// ── GOOGLE SHEETS ──
function getSheetUserName(){return currentUser?userSheetName(currentUser.name):'Default'}

async function syncToSheets(action,payload){
  if(!state.scriptUrl)return null;
  const body=JSON.stringify({action,userName:getSheetUserName(),...payload});
  try{
    const res=await fetch(state.scriptUrl,{method:'POST',headers:{'Content-Type':'text/plain'},body});
    const text=await res.text();
    let parsed;
    try{parsed=JSON.parse(text)}catch{showStatus('⚠ Resposta inválida do Apps Script','err');return null}
    if(parsed.ok===false)showStatus('⚠ Sheets: '+(parsed.error||'erro'),'err');
    return parsed;
  }catch(e){showStatus('⚠ Falha de rede: '+e.message,'err');return null}
}

async function fetchFromSheets(){
  if(!state.scriptUrl)return false;
  showLoading(true,'Buscando dados…');
  const url=`${state.scriptUrl}?action=getAll&month=${state.month+1}&year=${state.year}&userName=${encodeURIComponent(getSheetUserName())}`;
  try{
    const res=await fetch(url);const text=await res.text();
    let data;
    try{data=JSON.parse(text)}catch{showLoading(false);updateSheetsDot(false);showStatus('⚠ Resposta inválida','err');return false}
    if(data?.error){showLoading(false);updateSheetsDot(false);showStatus('⚠ '+data.error,'err');return false}
    if(Array.isArray(data?.expenses)){
      const other=state.expenses.filter(e=>{const d=new Date(e.date+'T12:00:00');return!(d.getMonth()===state.month&&d.getFullYear()===state.year)});
      state.expenses=[...other,...data.expenses];
    }
    if(Array.isArray(data?.categories)&&data.categories.length>0){
      const lm={};state.categories.forEach(c=>{lm[c.id]=c});
      state.categories=data.categories.map(rc=>({...lm[rc.id],...rc,fixedValue:rc.fixedValue??lm[rc.id]?.fixedValue??0}));
    }
    save();showLoading(false);updateSheetsDot(true);return true;
  }catch(e){showLoading(false);updateSheetsDot(false);showStatus('⚠ Falha de rede','err');return false}
}

function updateSheetsDot(connected){
  const dot=document.getElementById('sheetsDot');
  dot.classList.toggle('on',connected===true||(connected===undefined&&!!state.scriptUrl));
  dot.title=!state.scriptUrl?'Local (sem Sheets)':connected===true?'Sheets conectado':'Sheets desconectado';
}

// ── NAVEGAÇÃO DE MÊS ──
function changeMonth(dir){
  state.month+=dir;
  if(state.month>11){state.month=0;state.year++}
  if(state.month<0){state.month=11;state.year--}
  state.filterCat=null;
  document.getElementById('currentMonth').textContent=`${MONTHS_FULL[state.month].substring(0,3)} ${state.year}`;
  document.getElementById('heroLabel').textContent=`Gastos em ${MONTHS_FULL[state.month]}`;
  if(state.scriptUrl)fetchFromSheets().then(()=>render());else render();
}

// ── DADOS ──
function getMonthExpenses(){
  return state.expenses.filter(e=>{
    const d=new Date(e.date+'T12:00:00');
    return d.getMonth()===state.month&&d.getFullYear()===state.year;
  });
}
function getFilteredExpenses(){
  const all=getMonthExpenses();
  return state.filterCat?all.filter(e=>e.category===state.filterCat):all;
}
function fmt(v){return'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function fmtShort(v){
  const n=Number(v);
  if(n>=1000)return'R$ '+n.toLocaleString('pt-BR',{maximumFractionDigits:0});
  return'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:0});
}

// ── RENDER PRINCIPAL ──
function render(){
  const month=getMonthExpenses(),filtered=getFilteredExpenses();
  const total=month.reduce((s,e)=>s+Number(e.value),0);
  const totalBudget=state.categories.reduce((s,c)=>s+Number(c.budget||0),0);
  const pct=totalBudget>0?Math.min(total/totalBudget,1):0;

  // Hero
  const heroVal=document.getElementById('totalValue');
  heroVal.textContent=fmt(total);
  heroVal.className='hero-value'+(total===0?' ok':'');
  document.getElementById('totalSub').textContent=`${month.length} transaç${month.length!==1?'ões':'ão'}`;

  // Ring
  const ring=document.getElementById('ringFill');
  const circ=2*Math.PI*35;
  ring.style.strokeDasharray=circ;
  ring.style.strokeDashoffset=circ-pct*circ;
  ring.className='ring-fill'+(pct>=1?' danger':pct>=0.8?' warn':'');
  document.getElementById('ringPct').textContent=Math.round(pct*100)+'%';

  // Renda card
  const incomeCard=document.getElementById('incomeCard');
  if(state.income>0){
    incomeCard.style.display='flex';
    document.getElementById('incomeValue').textContent=fmt(state.income);
    const remaining=state.income-total;
    const remEl=document.getElementById('incomeSub');
    if(remaining>=0){
      remEl.textContent=`${fmt(remaining)} disponível`;
      remEl.style.color='var(--accent)';
    }else{
      remEl.textContent=`${fmt(Math.abs(remaining))} acima da renda`;
      remEl.style.color='var(--danger)';
    }
    renderIncomeCompare(total);
    document.getElementById('incomeCompareCard').style.display='block';
  }else{
    incomeCard.style.display='none';
    document.getElementById('incomeCompareCard').style.display='none';
  }

  // Estatísticas
  const byCat={};state.categories.forEach(c=>byCat[c.id]=0);
  month.forEach(e=>{if(byCat[e.category]!==undefined)byCat[e.category]+=Number(e.value)});

  const bigCat=Object.entries(byCat).sort((a,b)=>b[1]-a[1])[0];
  if(bigCat&&bigCat[1]>0){
    document.getElementById('biggestVal').textContent=fmtShort(bigCat[1]);
    document.getElementById('biggestCat').textContent=getCat(bigCat[0]).label;
  }else{
    document.getElementById('biggestVal').textContent='—';
    document.getElementById('biggestCat').textContent='—';
  }

  let over=0;
  state.categories.forEach(c=>{if(Number(c.budget)>0&&(byCat[c.id]||0)>=Number(c.budget))over++});
  document.getElementById('overBudgetCount').textContent=over;

  const now=new Date(),weekAgo=new Date(now-7*24*3600*1000);
  const wk=state.expenses.filter(e=>{const d=new Date(e.date+'T12:00:00');return d>=weekAgo&&d<=now}).reduce((s,e)=>s+Number(e.value),0);
  document.getElementById('weekVal').textContent=fmtShort(wk);

  // Orçamentos
  renderBudgetList(byCat);

  // Filtros
  renderFilterChips(month);

  // Transações
  renderTransactions(filtered);
}

function renderIncomeCompare(total){
  const income=state.income;
  const pct=income>0?Math.min(total/income,1):0;
  const pv=Math.round(pct*100);
  const remaining=income-total;

  const cls=pct>=1?'danger':pct>=0.8?'warn':'';
  const balCls=remaining>=0?'positive':'negative';

  document.getElementById('icmpBalance').textContent=(remaining>=0?'+ ':'-')+fmt(Math.abs(remaining));
  document.getElementById('icmpBalance').className='icmp-balance '+balCls;
  document.getElementById('icmpBarFill').style.width=pv+'%';
  document.getElementById('icmpBarFill').className='icmp-bar-fill '+cls;
  document.getElementById('icmpIncome').textContent=fmt(income);
  document.getElementById('icmpExpense').textContent=fmt(total);
  document.getElementById('icmpRemaining').textContent=remaining>=0?fmt(remaining):'-'+fmt(Math.abs(remaining));
  document.getElementById('icmpRemaining').className='icmp-leg-val '+(remaining>=0?'remaining':'expense');
}

function renderBudgetList(byCat){
  const bl=document.getElementById('budgetList');
  const bcats=state.categories.filter(c=>Number(c.budget||0)>0);
  if(!bcats.length){
    bl.innerHTML=`<div style="color:var(--muted);font-size:12px;padding:8px 0">Nenhum orçamento definido. <span style="color:var(--accent);cursor:pointer" onclick="openManageCats()">Definir →</span></div>`;
    return;
  }
  bl.innerHTML=bcats.map((c,i)=>{
    const spent=byCat[c.id]||0,lim=Number(c.budget),p=Math.min(spent/lim,1),pv=Math.round(p*100);
    const cls=p>=1?'danger':p>=0.8?'warning':'';
    return`<div class="budget-item" style="animation-delay:${i*0.04}s">
      <div class="bgt-row">
        <div class="bgt-name"><span class="cat-dot" style="background:${c.color}"></span>${c.icon} ${c.label}</div>
        <div class="bgt-vals"><strong class="${cls}">${fmt(spent)}</strong> / ${fmt(lim)} <span style="margin-left:4px">${pv}%</span></div>
      </div>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${pv}%"></div></div>
    </div>`;
  }).join('');
}

function renderFilterChips(month){
  const usedCats=[...new Set(month.map(e=>e.category))];
  const fb=document.getElementById('filterBar');
  fb.innerHTML=usedCats.length>1
    ?`<button class="chip ${!state.filterCat?'active':''}" onclick="setFilter(null)">Todos</button>`
      +usedCats.map(id=>{const c=getCat(id);return`<button class="chip ${state.filterCat===id?'active':''}" onclick="setFilter('${id}')">${c.icon} ${c.label}</button>`}).join('')
    :'';
}

function renderTransactions(filtered){
  document.getElementById('txCount').textContent=`${filtered.length} registro${filtered.length!==1?'s':''}`;
  const tl=document.getElementById('txList');
  if(!filtered.length){
    tl.innerHTML=`<div class="empty-state"><div class="empty-icon">💸</div><p>Nenhuma despesa ainda.<br>Toque em <strong>+</strong> para começar.</p></div>`;
    return;
  }
  const sorted=[...filtered].sort((a,b)=>new Date(b.date)-new Date(a.date));
  tl.innerHTML=sorted.map((e,i)=>{
    const c=getCat(e.category),d=new Date(e.date+'T12:00:00');
    const ds=d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
    return`<div class="tx-wrap" style="animation-delay:${i*0.025}s" id="txw_${e.id}">
      <div class="tx-actions-bg">
        <div class="tx-edit-bg" onclick="editExpense('${e.id}')">✎</div>
        <div class="tx-del-bg" onclick="deleteExpense('${e.id}')">✕</div>
      </div>
      <div class="tx-item" id="txi_${e.id}"
        ontouchstart="swipeStart(event,'${e.id}')"
        ontouchmove="swipeMove(event,'${e.id}')"
        ontouchend="swipeEnd(event,'${e.id}')">
        <div class="tx-icon" style="background:${c.color}18;color:${c.color}">${c.icon}</div>
        <div class="tx-info">
          <div class="tx-desc">${e.description||c.label}</div>
          <div class="tx-meta">${ds} · ${c.label}</div>
        </div>
        <div class="tx-amount">${fmt(e.value)}</div>
      </div>
    </div>`;
  }).join('');
  sorted.forEach(e=>{
    const el=document.getElementById('txi_'+e.id);
    if(el)el.addEventListener('click',()=>editExpense(e.id));
  });
}

function setFilter(cat){state.filterCat=cat;render()}

// ── SWIPE ──
const swipeState={};
function swipeStart(ev,id){
  const t=ev.touches[0];
  swipeState[id]={startX:t.clientX,startY:t.clientY,moved:false,open:false};
  const el=document.getElementById('txi_'+id);
  if(el)el.style.transition='none';
}
function swipeMove(ev,id){
  const s=swipeState[id];if(!s)return;
  const t=ev.touches[0];
  const dx=t.clientX-s.startX,dy=t.clientY-s.startY;
  if(!s.moved&&Math.abs(dy)>Math.abs(dx)){delete swipeState[id];return}
  s.moved=true;
  if(dx>0)return;
  const x=Math.max(dx,-160);
  const el=document.getElementById('txi_'+id);
  if(el)el.style.transform=`translateX(${x}px)`;
  ev.preventDefault();
}
function swipeEnd(ev,id){
  const s=swipeState[id];if(!s||!s.moved){delete swipeState[id];return}
  const t=ev.changedTouches[0],dx=t.clientX-s.startX;
  const el=document.getElementById('txi_'+id);
  if(el)el.style.transition='transform 0.2s ease';
  if(dx<-80){if(el)el.style.transform='translateX(-160px)';s.open=true}
  else{if(el)el.style.transform='translateX(0)';delete swipeState[id]}
}
document.addEventListener('touchstart',ev=>{
  Object.keys(swipeState).forEach(id=>{
    if(!ev.target.closest('#txw_'+id)){
      const el=document.getElementById('txi_'+id);
      if(el){el.style.transition='transform 0.2s ease';el.style.transform='translateX(0)'}
      delete swipeState[id];
    }
  });
},{passive:true});

// ── MODAL DESPESA ──
function openAdd(){
  state.editingExpId=null;selectedCat=state.categories[0]?.id||null;
  document.getElementById('modalTitle').textContent='Nova Despesa';
  document.getElementById('btnSubmit').textContent='Registrar';
  document.getElementById('fValor').value='';
  document.getElementById('fDesc').value='';
  document.getElementById('fData').value=new Date().toISOString().split('T')[0];
  renderCatGrid();
  document.getElementById('overlayAdd').classList.add('open');
  document.getElementById('fab').classList.add('open');
  setTimeout(()=>document.getElementById('fValor').focus(),400);
}

function editExpense(id){
  const e=state.expenses.find(x=>x.id===id);if(!e)return;
  state.editingExpId=id;selectedCat=e.category;
  document.getElementById('modalTitle').textContent='Editar Despesa';
  document.getElementById('btnSubmit').textContent='Salvar';
  document.getElementById('fValor').value=e.value;
  document.getElementById('fDesc').value=e.description;
  document.getElementById('fData').value=e.date;
  renderCatGrid();
  document.getElementById('overlayAdd').classList.add('open');
  document.getElementById('fab').classList.add('open');
}

function renderCatGrid(){
  document.getElementById('catGrid').innerHTML=state.categories.map(c=>{
    const hf=Number(c.fixedValue)>0;
    return`<div class="cat-chip ${selectedCat===c.id?'selected':''}" onclick="selectCat('${c.id}')">
      <span class="ci">${c.icon}</span>
      <span class="cn">${c.label}</span>
      ${hf?`<span class="cf">💛 ${fmtShort(c.fixedValue)}</span>`:''}
    </div>`;
  }).join('');
}

function selectCat(id){
  selectedCat=id;
  const c=getCat(id);
  if(Number(c.fixedValue)>0)document.getElementById('fValor').value=c.fixedValue;
  renderCatGrid();
}

function closeAdd(){
  document.getElementById('overlayAdd').classList.remove('open');
  document.getElementById('fab').classList.remove('open');
}

async function submitExpense(){
  const valor=parseFloat(document.getElementById('fValor').value);
  const desc=document.getElementById('fDesc').value.trim();
  const data=document.getElementById('fData').value;
  if(!valor||valor<=0){showStatus('Informe um valor válido','err');return}
  if(!data){showStatus('Informe a data','err');return}
  if(!selectedCat){showStatus('Selecione uma categoria','err');return}
  const isEditing=!!state.editingExpId,editId=state.editingExpId;
  const expense={id:editId||('id_'+Date.now()),value:valor,description:desc,date:data,category:selectedCat,createdAt:new Date().toISOString()};
  if(isEditing){
    const idx=state.expenses.findIndex(x=>x.id===editId);
    if(idx>=0)state.expenses[idx]=expense;else state.expenses.push(expense);
  }else state.expenses.push(expense);
  save();closeAdd();render();showStatus(isEditing?'Despesa atualizada ✓':'Despesa registrada ✓','ok');
  if(state.scriptUrl){
    const r=await syncToSheets(isEditing?'update':'add',{expense});
    if(r&&r.ok===false)showStatus('⚠ Local OK, erro Sheets: '+(r.error||'?'),'err');
  }
}

async function deleteExpense(id){
  if(!confirm('Excluir esta despesa?'))return;
  state.expenses=state.expenses.filter(e=>e.id!==id);
  save();render();showStatus('Despesa excluída','ok');
  if(state.scriptUrl)syncToSheets('delete',{id});
}

// ── RENDA ──
function openIncomeEdit(){
  document.getElementById('incomeInput').value=state.income||'';
  document.getElementById('overlayIncome').classList.add('open');
  setTimeout(()=>document.getElementById('incomeInput').focus(),300);
}
function closeIncomeEdit(){
  document.getElementById('overlayIncome').classList.remove('open');
}
function saveIncome(){
  const val=parseFloat(document.getElementById('incomeInput').value)||0;
  state.income=val;save();render();closeIncomeEdit();
  showStatus(val>0?'Renda salva ✓':'Renda removida','ok');
}

// ── GERENCIAR CATEGORIAS ──
function openManageCats(){renderManageCatList();document.getElementById('overlayManage').classList.add('open')}
function closeManageCats(){document.getElementById('overlayManage').classList.remove('open')}
function renderManageCatList(){
  const el=document.getElementById('manageCatList');
  if(!state.categories.length){
    el.innerHTML=`<div style="color:var(--muted);font-size:12px;text-align:center;padding:20px">Nenhuma categoria.</div>`;
    return;
  }
  el.innerHTML=state.categories.map(c=>{
    const parts=[];
    if(Number(c.budget)>0)parts.push(`Limite: ${fmt(c.budget)}`);
    if(Number(c.fixedValue)>0)parts.push(`Fixo: ${fmt(c.fixedValue)}`);
    return`<div class="mci">
      <div class="mci-ico" style="background:${c.color}18;color:${c.color}">${c.icon}</div>
      <div class="mci-info">
        <div class="mci-name">${c.label}</div>
        <div class="mci-meta">${parts.join(' · ')||'Sem orçamento'}</div>
      </div>
      <button class="mci-btn" onclick="openCatForm('${c.id}')">✎ Editar</button>
    </div>`;
  }).join('');
}

// ── CRIAR / EDITAR CATEGORIA ──
function openCatForm(catId){
  editingCatId=catId;
  if(catId){
    const c=getCat(catId);
    document.getElementById('catFormTitle').textContent='Editar Categoria';
    document.getElementById('cfName').value=c.label;
    document.getElementById('cfBudget').value=c.budget||'';
    document.getElementById('cfFixed').value=c.fixedValue||'';
    pickerIcon=c.icon;pickerColor=c.color;
    document.getElementById('cfDeleteBtn').style.display='block';
  }else{
    document.getElementById('catFormTitle').textContent='Nova Categoria';
    document.getElementById('cfName').value='';document.getElementById('cfBudget').value='';document.getElementById('cfFixed').value='';
    pickerIcon='📦';pickerColor=PALETTE[Math.floor(Math.random()*PALETTE.length)];
    document.getElementById('cfDeleteBtn').style.display='none';
  }
  document.getElementById('cfIconSearch').value='';
  renderIconGrid('');renderColorGrid();updateIconPreview();
  document.getElementById('overlayCatForm').classList.add('open');
  setTimeout(()=>document.getElementById('cfName').focus(),200);
}
function closeCatForm(){document.getElementById('overlayCatForm').classList.remove('open')}
function renderIconGrid(search){
  const term=search.toLowerCase().trim();
  const list=term?ALL_ICONS.filter(i=>i.t.includes(term)||i.e.includes(term)):ALL_ICONS;
  document.getElementById('iconGrid').innerHTML=list.map(i=>
    `<button class="icon-btn ${pickerIcon===i.e?'sel':''}" onclick="pickIcon('${i.e}')" title="${i.t}">${i.e}</button>`
  ).join('');
}
function filterIcons(v){renderIconGrid(v)}
function pickIcon(e){pickerIcon=e;renderIconGrid(document.getElementById('cfIconSearch').value);updateIconPreview()}
function renderColorGrid(){
  document.getElementById('colorGrid').innerHTML=PALETTE.map(col=>
    `<div class="color-swatch ${pickerColor===col?'sel':''}" style="background:${col}" onclick="pickColor('${col}')"></div>`
  ).join('');
}
function pickColor(col){pickerColor=col;renderColorGrid()}
function updateIconPreview(){document.getElementById('iconPreview').textContent=pickerIcon}

function saveCatForm(){
  const name=document.getElementById('cfName').value.trim();
  if(!name){showStatus('Informe o nome','err');return}
  const budget=parseFloat(document.getElementById('cfBudget').value)||0;
  const fixedValue=parseFloat(document.getElementById('cfFixed').value)||0;
  if(editingCatId){
    const idx=state.categories.findIndex(c=>c.id===editingCatId);
    if(idx>=0)state.categories[idx]={...state.categories[idx],label:name,icon:pickerIcon,color:pickerColor,budget,fixedValue};
    showStatus('Categoria atualizada ✓','ok');
  }else{
    state.categories.push({id:'cat_'+Date.now(),label:name,icon:pickerIcon,color:pickerColor,budget,fixedValue});
    showStatus('Categoria criada ✓','ok');
  }
  save();closeCatForm();renderManageCatList();render();
  if(state.scriptUrl)syncToSheets('saveCategories',{categories:state.categories});
}

function deleteCatForm(){
  if(!editingCatId)return;
  const c=getCat(editingCatId),used=state.expenses.some(e=>e.category===editingCatId);
  if(!confirm(used?`"${c.label}" tem despesas. Excluir mesmo assim?`:`Excluir "${c.label}"?`))return;
  state.categories=state.categories.filter(c=>c.id!==editingCatId);
  save();closeCatForm();renderManageCatList();render();showStatus('Categoria excluída','ok');
  if(state.scriptUrl)syncToSheets('saveCategories',{categories:state.categories});
}

// ── CONFIGURAÇÕES ──
function openConfig(){
  document.getElementById('scriptUrl').value=state.scriptUrl;
  renderBudgetConfig();
  document.getElementById('overlayConfig').classList.add('open');
}
function closeConfig(){document.getElementById('overlayConfig').classList.remove('open')}
function switchTab(btn){
  const tabId=btn.dataset.tab;
  document.querySelectorAll('.config-pane').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.config-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');btn.classList.add('active');
}
function renderBudgetConfig(){
  document.getElementById('budgetConfigList').innerHTML=state.categories.map(c=>`
    <div class="bcfg-item">
      <div class="bcfg-label"><span class="cat-dot" style="background:${c.color}"></span><span>${c.icon} ${c.label}</span></div>
      <input type="number" id="bcfg_${c.id}" placeholder="Sem limite" min="0" step="10" value="${c.budget||''}" inputmode="decimal">
    </div>`).join('');
}
function saveConfig(){
  state.scriptUrl=document.getElementById('scriptUrl').value.trim();
  state.categories.forEach(c=>{
    const v=parseFloat(document.getElementById('bcfg_'+c.id)?.value);
    c.budget=v>0?v:0;
  });
  save();closeConfig();render();showStatus('Configurações salvas ✓','ok');
  updateSheetsDot();checkScriptWarning();
  if(state.scriptUrl){
    syncToSheets('saveCategories',{categories:state.categories});
    fetchFromSheets().then(()=>render());
  }
}
function checkScriptWarning(){
  document.getElementById('warnBanner').classList.toggle('show',!state.scriptUrl);
}

// ── UI HELPERS ──
let statusTimeout;
function showStatus(msg,type){
  const bar=document.getElementById('statusBar');
  document.getElementById('statusMsg').textContent=msg;
  bar.className='status-bar show '+type;
  clearTimeout(statusTimeout);
  statusTimeout=setTimeout(()=>bar.classList.remove('show'),2600);
}
function showLoading(v,msg){
  document.getElementById('loadingOverlay').classList.toggle('show',v);
  if(msg)document.getElementById('loadingMsg').textContent=msg;
}

// ── TECLADO ──
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeAdd();closeConfig();closeManageCats();closeCatForm();closeIncomeEdit()}
  const anyOpen=document.querySelector('.overlay.open,.center-overlay.open');
  if(e.key==='n'&&!anyOpen)openAdd();
  if(e.key==='Enter'&&document.getElementById('overlayAdd').classList.contains('open'))submitExpense();
  if(e.key==='Enter'&&document.getElementById('overlayIncome').classList.contains('open'))saveIncome();
});

// ── DEBUG ──
window.debugSheets=async function(){
  console.log('=== DEBUG SHEETS ===');
  console.log('currentUser:',currentUser);
  console.log('scriptUrl:',state.scriptUrl);
  console.log('userName:',getSheetUserName());
  console.log('expenses:',state.expenses.length);
  if(!state.scriptUrl){console.log('❌ scriptUrl não configurado!');return}
  console.log('\n--- GET ---');
  try{
    const url=`${state.scriptUrl}?action=getAll&month=${state.month+1}&year=${state.year}&userName=${encodeURIComponent(getSheetUserName())}`;
    console.log('URL:',url);
    const r=await fetch(url);console.log('Status:',r.status);
    const t=await r.text();console.log('Resposta:',t.substring(0,1000));
  }catch(e){console.error('GET falhou:',e)}
  console.log('\n--- POST ping ---');
  try{
    const r=await fetch(state.scriptUrl,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({action:'ping',userName:getSheetUserName()})});
    console.log('Status:',r.status);
    const t=await r.text();console.log('Resposta:',t.substring(0,500));
  }catch(e){console.error('POST falhou:',e)}
};

// ── INIT ──
async function init(){
  renderLoginScreen();
  const lastId=localStorage.getItem('despesas_currentUser');
  if(lastId){
    const users=getUsers();
    if(users.find(u=>u.id===lastId)){loginAs(lastId);return}
  }
  document.getElementById('loginScreen').classList.remove('hidden');
}
init();
