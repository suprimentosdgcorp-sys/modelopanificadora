<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard · Modelo Panificadora</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#F4EFE6;--sur:#FFFDF9;--sur2:#F9F4EC;--sur3:#EDE6D9;
  --brd:#DDD4C0;--brd2:#C4B49A;
  --gold:#8B6200;--g2:#B8860B;--amb:#D4940A;--g3:#7A5500;
  --red:#9B2020;--grn:#1E6B3A;--blu:#1E4D8B;
  --tx:#1A1208;--tx2:#3D2A0A;--tx3:#7A5C28;--tx4:#A8874A;
  --lc1:#B8860B;--lc2:#1E6B3A;--lc3:#6B1A1A;
  --sh:0 2px 8px rgba(26,18,8,.08);
  --sh2:0 4px 20px rgba(26,18,8,.12);
}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--tx);font-family:'DM Sans',sans-serif;font-size:13px;min-height:100vh;-webkit-font-smoothing:antialiased;}

/* ── LOGIN ── */
#login-screen{position:fixed;inset:0;z-index:9999;background:linear-gradient(145deg,#0D0800 0%,#1A0E02 40%,#0D0800 100%);display:flex;align-items:center;justify-content:center;overflow:hidden;}
#login-screen::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(184,134,11,.12) 0%,transparent 70%);}
#login-screen::after{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(184,134,11,.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(184,134,11,.04) 40px);}
.login-box{width:400px;position:relative;z-index:1;animation:fadeUp .5s ease;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:none;}}
.login-header{text-align:center;padding:0 0 28px;}
.login-logo{height:56px;width:auto;filter:brightness(0) invert(1);margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;}
.login-brand{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#F5E8C8;letter-spacing:.5px;line-height:1.2;}
.login-tagline{font-size:10px;color:#8B6914;letter-spacing:2.5px;text-transform:uppercase;margin-top:6px;}
.login-card{background:rgba(255,252,245,.04);border:1px solid rgba(184,134,11,.2);border-radius:16px;padding:32px;backdrop-filter:blur(12px);}
.login-card label{display:block;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#A8874A;margin-bottom:6px;}
.login-card input{width:100%;background:rgba(255,252,245,.06);border:1px solid rgba(184,134,11,.25);border-radius:9px;padding:11px 14px;font-size:13px;font-family:'DM Sans',sans-serif;color:#F5E8C8;outline:none;margin-bottom:16px;transition:.2s;}
.login-card input::placeholder{color:rgba(168,135,74,.5);}
.login-card input:focus{border-color:var(--g2);background:rgba(255,252,245,.09);}
.login-btn{width:100%;background:linear-gradient(135deg,#9B6E00,#B8860B,#9B6E00);color:#fff;border:none;border-radius:9px;padding:13px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;letter-spacing:.3px;transition:.2s;position:relative;overflow:hidden;}
.login-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(255,255,255,.1),transparent);transform:translateX(-100%);transition:.3s;}
.login-btn:hover::after{transform:translateX(100%);}
.login-btn:hover{background:linear-gradient(135deg,#B8860B,#D4A20D,#B8860B);}
.login-err{display:none;color:#E05555;font-size:11px;margin-top:10px;text-align:center;background:rgba(184,50,50,.1);border:1px solid rgba(184,50,50,.2);border-radius:7px;padding:7px;}
.login-since{text-align:center;margin-top:20px;font-size:10px;color:rgba(168,135,74,.5);letter-spacing:1px;}

/* ── APP ── */
#app{display:none;}

/* ── HEADER ── */
.hdr{background:#0D0800;border-bottom:2px solid #2A1E06;padding:0 20px;height:52px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:200;}
.hdr-left{display:flex;align-items:center;gap:12px;}
.hdr-logo{height:36px;filter:brightness(0) invert(1);opacity:.9;}
.hdr-div{width:1px;height:22px;background:rgba(255,255,255,.1);}
.hdr-info .hdr-name{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#F5E8C8;line-height:1.1;}
.hdr-info .hdr-role{font-size:9px;color:#8B6914;letter-spacing:1.5px;text-transform:uppercase;}
.hdr-right{display:flex;align-items:center;gap:8px;}
.hdr-upd{font-size:10px;color:#8B6914;display:flex;align-items:center;gap:4px;}
.hdr-upd svg{opacity:.6;}
.badge{font-size:10px;font-weight:600;padding:3px 10px;border-radius:20px;border:1px solid;}
.b-gold{background:rgba(184,134,11,.15);color:#D4A20D;border-color:rgba(184,134,11,.3);}
.b-ok{background:rgba(30,107,58,.2);color:#3AAA6A;border-color:rgba(30,107,58,.3);}
.b-ko{background:rgba(155,32,32,.2);color:#E05555;border-color:rgba(155,32,32,.3);}
.b-muted{background:rgba(255,255,255,.05);color:#8B6914;border-color:rgba(255,255,255,.1);}
.btn-logout{background:transparent;border:1px solid rgba(255,255,255,.1);color:#8B6914;padding:4px 11px;border-radius:7px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:.2s;}
.btn-logout:hover{border-color:rgba(155,32,32,.4);color:#E05555;}

/* ── TABS ── */
.tab-bar{background:var(--sur);border-bottom:1px solid var(--brd);padding:0 20px;display:flex;gap:1px;overflow-x:auto;scrollbar-width:none;}
.tab-bar::-webkit-scrollbar{display:none;}
.tab{padding:11px 16px;font-size:12px;font-weight:600;color:var(--tx3);border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;font-family:'DM Sans',sans-serif;transition:.15s;letter-spacing:.1px;}
.tab:hover{color:var(--tx2);}
.tab.act{color:var(--gold);border-bottom-color:var(--g2);}

/* ── FILTERS ── */
.fbar{background:var(--sur2);border-bottom:1px solid var(--brd);padding:6px 20px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;min-height:34px;}
.flbl{font-size:10px;font-weight:600;color:var(--tx3);text-transform:uppercase;letter-spacing:.8px;white-space:nowrap;}
select{background:var(--sur);border:1px solid var(--brd2);color:var(--tx);border-radius:6px;padding:4px 8px;font-size:11px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;}
select:focus{border-color:var(--g2);}
.refresh-btn{background:var(--sur);border:1px solid var(--brd2);color:var(--tx3);padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:.2s;display:flex;align-items:center;gap:4px;}
.refresh-btn:hover{border-color:var(--g2);color:var(--gold);}

/* ── CONTENT ── */
.pane{display:none;}.pane.act{display:block;}
.main{padding:16px 20px;display:flex;flex-direction:column;gap:14px;}
.sec-hdr{font-size:9px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:1.5px;display:flex;align-items:center;gap:8px;}
.sec-hdr::after{content:'';flex:1;height:1px;background:var(--brd);}

/* ── KPIs ── */
.kpi-grid{display:grid;gap:10px;}
.kpi{background:var(--sur);border:1px solid var(--brd);border-radius:11px;padding:14px 16px;border-top:3px solid var(--kt,var(--g2));box-shadow:var(--sh);transition:.15s;}
.kpi:hover{box-shadow:var(--sh2);transform:translateY(-1px);}
.kpi-label{font-size:9px;font-weight:600;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
.kpi-val{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--tx);line-height:1.1;}
.kpi-sub{font-size:10px;color:var(--tx3);margin-top:4px;}

/* ── INSIGHT CARD ── */
.insight{background:linear-gradient(135deg,#FFFBF0,#FFF8E8);border:1px solid #DCC878;border-left:4px solid var(--g2);border-radius:0 10px 10px 0;padding:11px 14px;}
.insight-label{font-size:9px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
.insight-body{font-size:11px;color:var(--tx2);line-height:1.8;}
.insight-body strong{color:var(--tx);}

/* ── CARDS ── */
.card{background:var(--sur);border:1px solid var(--brd);border-radius:11px;padding:14px 16px;box-shadow:var(--sh);}
.card-title{font-size:10px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;}
.card-title span{font-weight:400;color:var(--tx3);font-size:10px;text-transform:none;letter-spacing:0;}

/* ── GRIDS ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
.g32{display:grid;grid-template-columns:1.8fr 1fr;gap:12px;}

/* ── TABLE ── */
.tw{overflow:hidden;border-radius:9px;border:1px solid var(--brd);}
.twx{overflow-x:auto;border-radius:9px;border:1px solid var(--brd);}
table{width:100%;border-collapse:collapse;font-size:11px;}
thead tr{background:#F2EAD8;}
th{text-align:left;padding:7px 10px;font-size:9px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.6px;border-bottom:1px solid var(--brd);white-space:nowrap;}
td{padding:7px 10px;border-bottom:1px solid #EDE6D8;color:var(--tx2);}
tbody tr:last-child td{border-bottom:none;}
tbody tr:hover td{background:#FBF6EE;}
.tdn{color:var(--tx);font-weight:500;}
.tdv{text-align:right;color:var(--tx);font-weight:600;font-variant-numeric:tabular-nums;}
.tdr{text-align:right;}

/* ── PILLS ── */
.pill{display:inline-block;padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;}
.pill-ok{background:#E6F5EC;color:var(--grn);}
.pill-ko{background:#FAEAEA;color:var(--red);}
.pill-warn{background:#FEF3DC;color:#A86A00;}

/* ── PROGRESS ── */
.rb{height:5px;background:#EDE0C8;border-radius:3px;overflow:hidden;}
.rbf{height:100%;border-radius:3px;background:var(--g2);transition:width .5s;}

/* ── CANAL ── */
.canal-row{display:flex;align-items:center;gap:8px;margin-bottom:9px;}
.canal-name{width:76px;font-size:11px;color:var(--tx2);text-align:right;flex-shrink:0;}
.canal-track{flex:1;height:20px;background:#EDE0C8;border-radius:4px;overflow:hidden;}
.canal-fill{height:100%;border-radius:4px;display:flex;align-items:center;padding-left:7px;transition:width .5s;}
.canal-fill span{font-size:9px;font-weight:700;color:#fff;white-space:nowrap;}
.canal-val{width:74px;font-size:11px;font-weight:600;color:var(--tx);text-align:right;flex-shrink:0;}

/* ── ORC ── */
.orc-grid{display:grid;align-items:center;}
.orc-cell{padding:7px 10px;font-size:11px;}
.orc-hdr{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--tx2);}
.orc-cat{cursor:pointer;background:var(--sur2);}
.orc-cat:hover{background:#EDE4D0;}
.orc-item{background:#FDFAF5;padding-left:24px!important;}
.orc-exp{display:inline-flex;width:15px;height:15px;border-radius:4px;background:var(--brd);align-items:center;justify-content:center;font-size:9px;margin-right:5px;}
.orc-over{color:var(--red);font-weight:600;}
.orc-under{color:var(--grn);font-weight:600;}
.orc-total{background:#FDF6E8;border-top:2px solid var(--g2);font-weight:700;}

/* ── STABS ── */
.stabs{display:flex;gap:2px;background:var(--sur3);border:1px solid var(--brd);border-radius:9px;padding:3px;margin-bottom:12px;width:fit-content;}
.stab{padding:5px 15px;font-size:11px;font-weight:600;color:var(--tx3);border:none;background:none;cursor:pointer;border-radius:7px;font-family:'DM Sans',sans-serif;transition:.15s;}
.stab.act{background:var(--sur);color:var(--gold);box-shadow:var(--sh);}

/* ── LOJA CARD ── */
.loja-card{background:var(--sur);border:1px solid var(--brd);border-radius:11px;padding:13px 15px;border-top:3px solid var(--kt,var(--g2));}
.loja-name{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--tx3);margin-bottom:5px;}
.loja-val{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--tx);}
.meta-bar{height:4px;background:#EDE0C8;border-radius:2px;margin:7px 0 4px;overflow:hidden;}
.meta-fill{height:100%;border-radius:2px;}

/* ── CAT BARS ── */
.cat-row{display:flex;align-items:center;gap:8px;margin-bottom:9px;}
.cat-name{width:120px;font-size:10px;color:var(--tx2);flex-shrink:0;text-align:right;}
.cat-track{flex:1;height:17px;background:#EDE0C8;border-radius:4px;overflow:hidden;}
.cat-fill{height:100%;border-radius:4px;display:flex;align-items:center;padding-left:6px;transition:width .5s;}
.cat-fill span{font-size:9px;font-weight:700;color:#fff;white-space:nowrap;}
.cat-val{width:78px;font-size:11px;font-weight:600;color:var(--tx);text-align:right;flex-shrink:0;}

/* ── DRE ── */
.dre-row{display:grid;padding:7px 12px;border-bottom:1px solid #EDE6D8;font-size:11px;align-items:center;}
.dre-row:last-child{border-bottom:none;}
.dre-sec{background:#EDE4D0;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--tx3);padding:5px 12px;}
.dre-sub{background:#FDF6E8;font-weight:700;}
.dre-dim{opacity:.55;}

/* ── INVEST ── */
.itag{display:inline-block;padding:2px 7px;border-radius:20px;font-size:9px;font-weight:700;background:rgba(107,78,26,.08);color:#6B4E1A;border:1px solid rgba(107,78,26,.18);}

/* ── LEGEND ── */
.legend{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:9px;}
.li{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--tx2);}
.ld{width:9px;height:9px;border-radius:2px;flex-shrink:0;}

/* ── LOADING ── */
.loading{text-align:center;padding:40px;color:var(--tx3);font-size:12px;}
.spin{width:20px;height:20px;border:2px solid var(--brd);border-top-color:var(--g2);border-radius:50%;animation:spin .7s linear infinite;display:inline-block;margin-bottom:8px;}
@keyframes spin{to{transform:rotate(360deg);}}

/* ── FOOTER ── */
.footer{text-align:center;padding:12px;font-size:10px;color:var(--tx3);border-top:1px solid var(--brd);background:var(--sur2);}
.footer strong{color:var(--gold);}

/* ── STATUS INDICATOR ── */
.status-dot{width:6px;height:6px;border-radius:50%;display:inline-block;margin-right:4px;}
.status-live{background:#3AAA6A;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}

@media(max-width:900px){.g2,.g3,.g32{grid-template-columns:1fr;}.kpi-grid{grid-template-columns:repeat(2,1fr)!important;}}
</style>
</head>
<body>

<!-- ═══ LOGIN ═══════════════════════════════════════════════════════════ -->
<div id="login-screen">
  <div class="login-box">
    <div class="login-header">
      <img class="login-logo" src="https://modelopanificadora.com.br/wp-content/webp-express/webp-images/uploads/2024/06/LOGO-PNG-5-1536x1186.png.webp" alt="Modelo" onerror="this.style.display='none'">
      <div class="login-brand">Modelo Panificadora</div>
      <div class="login-tagline">Gestão · Desde 1979</div>
    </div>
    <div class="login-card">
      <label>Usuário</label>
      <input id="l-user" type="text" placeholder="login" autocomplete="off" spellcheck="false">
      <label>Senha</label>
      <input id="l-pw" type="password" placeholder="••••••••">
      <button class="login-btn" onclick="doLogin()">Acessar Dashboard</button>
      <div class="login-err" id="login-err">❌ Usuário ou senha incorretos</div>
    </div>
    <div class="login-since">Sistema de Gestão Gerencial</div>
  </div>
</div>

<!-- ═══ APP ═══════════════════════════════════════════════════════════ -->
<div id="app">
  <div class="hdr">
    <div class="hdr-left">
      <img class="hdr-logo" src="https://modelopanificadora.com.br/wp-content/webp-express/webp-images/uploads/2024/06/LOGO-PNG-5-1536x1186.png.webp" alt="M" onerror="this.style.display='none'">
      <div class="hdr-div"></div>
      <div class="hdr-info">
        <div class="hdr-name" id="h-name">—</div>
        <div class="hdr-role" id="h-role">—</div>
      </div>
    </div>
    <div class="hdr-right">
      <div class="hdr-upd">
        <span class="status-dot status-live"></span>
        <span id="h-upd">—</span>
      </div>
      <span id="h-badge" class="badge b-gold">—</span>
      <span id="h-period" class="badge b-muted">—</span>
      <button class="btn-logout" onclick="doLogout()">Sair</button>
    </div>
  </div>
  <div class="tab-bar" id="tab-bar"></div>
  <div class="fbar" id="filter-bar"></div>
  <div id="pane-container"></div>
  <div class="footer"><strong>Modelo Panificadora</strong> &nbsp;·&nbsp; Dashboard Gerencial &nbsp;·&nbsp; Atualização automática 2× ao dia · clique ↻ para atualizar agora</div>
</div>

<script>
'use strict';

// ═══════════════════════════════════════════════════════════════════════
// AUTH — logins e senhas conforme solicitado
// ═══════════════════════════════════════════════════════════════════════
var USERS = {
  'gerentefrei':       {pw:'frei99',    role:'manager', loja:'frei',     label:'Frei Serafim'},
  'gerenteeliseu':     {pw:'eliseu88',  role:'manager', loja:'eliseu',   label:'Eliseu Martins'},
  'gerentepetronio':   {pw:'petronio77',role:'manager', loja:'petronio', label:'Petrônio Portela'},
  'modelopanificadora':{pw:'petro00',   role:'owner',   loja:'todas',    label:'Modelo Panificadora'},
};
var CUR = null, AUTO_T = null;

document.getElementById('l-pw').addEventListener('keydown', function(e){
  if(e.key === 'Enter') doLogin();
});
document.getElementById('l-user').addEventListener('keydown', function(e){
  if(e.key === 'Enter') document.getElementById('l-pw').focus();
});

function doLogin(){
  var u = el('l-user').value.trim().toLowerCase();
  var p = el('l-pw').value;
  if(USERS[u] && USERS[u].pw === p){
    CUR = Object.assign({}, USERS[u], {username: u});
    el('login-err').style.display = 'none';
    el('login-screen').style.display = 'none';
    el('app').style.display = 'block';
    initApp();
  } else {
    el('login-err').style.display = 'block';
    el('l-pw').value = '';
    el('l-pw').focus();
  }
}

function doLogout(){
  CUR = null;
  destroyCharts();
  el('app').style.display = 'none';
  el('login-screen').style.display = 'flex';
  el('l-user').value = '';
  el('l-pw').value = '';
  if(AUTO_T){clearInterval(AUTO_T); AUTO_T = null;}
}

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURAÇÃO — SheetDB + metas calculadas
// ═══════════════════════════════════════════════════════════════════════
var SHEETDB = 'https://sheetdb.io/api/v1/lk49ktwqz8hfv';

// Metas calculadas: base histórica Jul-Dez/25 × (1+5%)^mês
// JAN/26 = base × 1.05¹
var ABAS = {
  frei:    {v:'VD - FREI SERAFIM',   d:'DESP. FREI SERAFIM',    label:'Frei Serafim',    meta:357103, metaDia:17005, cor:'#B8860B'},
  eliseu:  {v:'VD - ELISEU MARTINS', d:'DESP. ELISEU MARTINS',   label:'Eliseu Martins',  meta:216871, metaDia:10327, cor:'#1E6B3A'},
  petronio:{v:'VD - PETRÔNIO PORTELA',d:'DESP. PETRÔNIO PORTELA',label:'Petrônio Portela',meta:295668, metaDia:14079, cor:'#6B1A1A'},
};

// Histórico últimos 6 meses (Jul-Dez/25) para gráfico
var HIST_LABELS = ['Jul/25','Ago/25','Set/25','Out/25','Nov/25','Dez/25','Jan/26','Fev/26'];
var HIST = {
  frei:    [388079, 336000, 330459, 340272, 293794, 351988, 327245, 315521],
  eliseu:  [234124, 201448, 208128, 226429, 171376, 197760, 224810, 180720],
  petronio:[275848, 284343, 258384, 291460, 292236, 287258, 202204, 254379],
};

var CC_COR = {
  'Insumos':'#B8860B','Pessoal':'#C47A00','Adm':'#2E6B8A','Fiscal':'#6B1A1A',
  'Imóvel':'#1E6B3A','Tecnologia':'#4A6B8B','Logística':'#2E6B3A','Marketing':'#8B4A1A','Embalagens':'#7A6B2A'
};

// Estado global
var STATE = {
  frei:    {dias:[], desp:[]},
  eliseu:  {dias:[], desp:[]},
  petronio:{dias:[], desp:[]},
};
var CHARTS = {}, FILIAL = 'frei', ORC_LOJA = 'frei';

// Orçamento estimado por loja (base real → usado quando API indisponível)
var ORC = (function(){
  var base = [
    {cc:'Pessoal',    contas:[{c:'Folha de Pagamento',orc:32700},{c:'Comissão Gerente',orc:null,formula:'5% lucro'},{c:'Saúde e Exames',orc:500},{c:'Uniformes',orc:350}]},
    {cc:'Insumos',    contas:[{c:'Matéria-Prima',orc:null,formula:'var. receita'},{c:'Gás de Cozinha',orc:840},{c:'Compras Gerais',orc:3200}]},
    {cc:'Adm',        contas:[{c:'Manutenção',orc:1200},{c:'Higiene e Limpeza',orc:600},{c:'Geral',orc:400}]},
    {cc:'Fiscal',     contas:[{c:'Simples Nacional',orc:null,formula:'8% receita'},{c:'Impostos e Taxas',orc:800}]},
    {cc:'Logística',  contas:[{c:'Combustível',orc:400},{c:'Entregas',orc:600}]},
    {cc:'Tecnologia', contas:[{c:'Telecomunicações',orc:151}]},
    {cc:'Marketing',  contas:[{c:'Digital',orc:2500},{c:'iFood (comissão)',orc:null,formula:'1% receita iFood'}]},
    {cc:'Embalagens', contas:[{c:'Descartáveis',orc:800}]},
  ];
  var mults = {frei:1, eliseu:0.61, petronio:0.83};
  var result = {};
  ['frei','eliseu','petronio'].forEach(function(l){
    var m = mults[l];
    result[l] = base.map(function(cc){
      return {cc:cc.cc, contas:cc.contas.map(function(c){
        return Object.assign({}, c, {orc:c.orc?Math.round(c.orc*m):null});
      })};
    });
  });
  return result;
})();

// Investimentos (fixos no dash — baseados na planilha)
var INVEST = [
  {loja:'Frei Serafim',   mes:'Fev/2026',cc:'Equipamentos',conta:'Aquisição',item:'Freezer Expositor Horizontal',valor:4800, cond:'3x',obs:'Substituição'},
  {loja:'Eliseu Martins', mes:'Fev/2026',cc:'Equipamentos',conta:'Aquisição',item:'Vitrine Refrigerada 120cm',    valor:6200, cond:'1x',obs:'Ampliação frios'},
  {loja:'Petrônio',       mes:'Fev/2026',cc:'Equipamentos',conta:'Aquisição',item:'Forno Combinado',              valor:12500,cond:'6x',obs:'Aumento produção'},
  {loja:'Frei Serafim',   mes:'Fev/2026',cc:'Melhorias',   conta:'Reforma',  item:'Sistema de Som Ambiente',      valor:1800, cond:'1x',obs:'Experiência cliente'},
  {loja:'Eliseu Martins', mes:'Fev/2026',cc:'Segurança',   conta:'Aquisição',item:'Câmeras de Segurança (4un)',   valor:2400, cond:'2x',obs:'4 câmeras + DVR'},
  {loja:'Petrônio',       mes:'Fev/2026',cc:'Equipamentos',conta:'Aquisição',item:'Balcão Refrigerado 1,5m',      valor:5500, cond:'4x',obs:'Exposição produtos'},
  {loja:'Todas',          mes:'Fev/2026',cc:'Tecnologia',  conta:'Licença',  item:'Sistema de PDV (3 lojas)',      valor:9800, cond:'12x',obs:'Licença anual'},
];

// ═══════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════
function el(id){return document.getElementById(id);}
function fmt(v){return 'R$\u202F'+Math.round(Number(v)||0).toLocaleString('pt-BR');}
function fmtK(v){var n=Math.round(Number(v)||0); return n>=1000?'R$\u202F'+(n/1000).toFixed(1).replace('.',',')+'k':'R$\u202F'+n;}
function fmtP(v){return ((Number(v)||0)*100).toFixed(1).replace('.',',')+'\u00a0%';}
function num(v){if(!v||v===''||v==='-')return 0;return parseFloat(String(v).replace(/[R$\s]/g,'').replace(/\./g,'').replace(',','.'))||0;}
function rb(pct,cor,max){max=max||100;return '<div class="rb"><div class="rbf" style="width:'+Math.min(pct,max).toFixed(1)+'%;background:'+cor+'"></div></div>';}
function pill(ok,txt){return '<span class="pill '+(ok?'pill-ok':'pill-ko')+'">'+txt+'</span>';}
function destroyCharts(){Object.keys(CHARTS).forEach(function(k){try{CHARTS[k].destroy();}catch(e){}});CHARTS={};}
function dc(id){if(CHARTS[id]){try{CHARTS[id].destroy();}catch(e){} delete CHARTS[id];}}
function gF(id){var e=el(id);return e?e.value:'';}

function getDias(loja){
  var d = STATE[loja]?STATE[loja].dias:[];
  var fd = gF('f-dia');
  if(fd) d = d.filter(function(x){return x.dia_num===parseInt(fd);});
  return d;
}
function getDesp(loja){
  var d = STATE[loja]?STATE[loja].desp:[];
  var fm = gF('f-mes'), fd = gF('f-dia');
  if(fm) d = d.filter(function(x){return x.mes===fm;});
  if(fd) d = d.filter(function(x){return x.dia_num===parseInt(fd);});
  return d;
}

// ═══════════════════════════════════════════════════════════════════════
// DADOS DE AMOSTRA — usados quando API indisponível
// ═══════════════════════════════════════════════════════════════════════
// ── Meta por dia da semana: replica exatamente AVERAGEIF($D:$D, dia, $K:$K)
// Só chama DEPOIS que STATE[loja].dias já tem dados com receita real
function calcMetasDia(diasArr){
  // Agrupa receitas por dia da semana (só dias com receita > 0)
  var grupos = {};
  diasArr.forEach(function(d){
    if(d.receita > 0){
      if(!grupos[d.dia]) grupos[d.dia] = [];
      grupos[d.dia].push(d.receita);
    }
  });
  // Média por dia (igual ao AVERAGEIF da planilha)
  var medias = {};
  Object.keys(grupos).forEach(function(dw){
    var arr = grupos[dw];
    medias[dw] = arr.reduce(function(s,v){return s+v;},0) / arr.length;
  });
  return medias; // {SEG: 14200, TER: 16800, ... }
}

function getSampleDias(loja){
  var mults = {frei:1, eliseu:0.585, petronio:0.814};
  var m = mults[loja]||1;
  // Receitas reais de Fev/2026 (base Frei; escaladas para outras lojas)
  var recs = [15843,18954,16554,17341,16473,9057, 17764,17658,20414,17369,14046,5215,
              4431,0,11801,15983,17828,7951, 15676,17607,17976,20255,19577,8625];
  var dates=['02/02/2026','03/02/2026','04/02/2026','05/02/2026','06/02/2026','07/02/2026',
             '09/02/2026','10/02/2026','11/02/2026','12/02/2026','13/02/2026','14/02/2026',
             '16/02/2026','17/02/2026','18/02/2026','19/02/2026','20/02/2026','21/02/2026',
             '23/02/2026','24/02/2026','25/02/2026','26/02/2026','27/02/2026','28/02/2026'];
  var dias= ['SEG','TER','QUA','QUI','SEX','SÁB',
             'SEG','TER','QUA','QUI','SEX','SÁB',
             'SEG','TER','QUA','QUI','SEX','SÁB',
             'SEG','TER','QUA','QUI','SEX','SÁB'];

  // Primeira passagem: monta receitas sem metaDia
  var raw = dates.map(function(dt,i){
    var r = Math.round(recs[i]*m);
    return{data:dt, dia:dias[i], dia_num:parseInt(dt.substring(0,2)),
      especie:Math.round(r*.08), cartao:Math.round(r*.50), pix:Math.round(r*.28),
      ifood:Math.round(r*.09), whats:Math.round(r*.05),
      despCx:Math.round(r*.04), receita:r, metaDia:0, bateu:false, fechado:r===0};
  });

  // Segunda passagem: calcula metaDia por AVERAGEIF (igual planilha)
  var medias = calcMetasDia(raw);
  return raw.map(function(d){
    var md = Math.round(medias[d.dia] || ABAS[d.dia] || ABAS[Object.keys(ABAS)[0]].metaDia);
    d.metaDia = md;
    d.bateu = d.receita > 0 && d.receita >= md;
    return d;
  });
}
function getSampleDesp(loja){
  var m={frei:1,eliseu:0.585,petronio:0.814}[loja]||1;
  var base=[
    ['FEV/2026','01/02/2026','Insumos','Matéria-Prima','T R MACEDO',319],
    ['FEV/2026','02/02/2026','Adm','Higiene e Limpeza','COMPRAS',437],
    ['FEV/2026','02/02/2026','Insumos','Matéria-Prima','FRANGOFORTE',799],
    ['FEV/2026','03/02/2026','Marketing','Digital','GESTÃO IFOOD',500],
    ['FEV/2026','03/02/2026','Marketing','Digital','GESTÃO META',1500],
    ['FEV/2026','03/02/2026','Insumos','Matéria-Prima','MOINHO PIAUÍ',1576],
    ['FEV/2026','05/02/2026','Insumos','Matéria-Prima','ART PAN',10827],
    ['FEV/2026','05/02/2026','Fiscal','Simples Nacional','SIMPLES NACIONAL',14455],
    ['FEV/2026','05/02/2026','Insumos','Gás de Cozinha','COM.GAS',840],
    ['FEV/2026','07/02/2026','Logística','Combustível','GASOLINA',194],
    ['FEV/2026','07/02/2026','Pessoal','Folha de Pagamento','FOLHA',32700],
    ['FEV/2026','07/02/2026','Imóvel','Aluguel','PROPRIETÁRIO',10000],
    ['FEV/2026','09/02/2026','Pessoal','Folha de Pagamento','LUIS GONZAGA',1500],
    ['FEV/2026','09/02/2026','Insumos','Gás de Cozinha','GÁS',1400],
    ['FEV/2026','11/02/2026','Imóvel','Água','AGUAS DE TERESINA',2621],
    ['FEV/2026','11/02/2026','Tecnologia','Telecomunicações','CLARO NET',151],
    ['FEV/2026','13/02/2026','Pessoal','Folha de Pagamento','INES SILVA',5000],
    ['FEV/2026','14/02/2026','Pessoal','Saúde e Exames','EXAME PERIÓDICO',320],
    ['FEV/2026','21/02/2026','Insumos','Matéria-Prima','G M CEARENCE',4305],
    ['FEV/2026','25/02/2026','Insumos','Matéria-Prima','KASANA',3200],
    ['FEV/2026','27/02/2026','Logística','Combustível','GASOLINA',194],
    ['FEV/2026','28/02/2026','Pessoal','Folha de Pagamento','ELINALDA',2400],
    ['FEV/2026','28/02/2026','Adm','Manutenção','ENGECOP',318],
  ];
  return base.map(function(d){
    return{mes:d[0],venc:d[1],dia_num:parseInt(d[1].substring(0,2)),
      cc:d[2],conta:d[3],forn:d[4],val:Math.round(d[5]*m)};
  });
}

// ═══════════════════════════════════════════════════════════════════════
// PARSE — Google Sheets (SheetDB)
// ═══════════════════════════════════════════════════════════════════════
function parseVendas(rows){
  var re=/^\d{2}[\/\-]\d{2}/;
  // 1ª passagem: lê campos brutos
  var parsed = rows.filter(function(r){return re.test(String(r['DATA']||'').trim());}).map(function(r){
    var rec=num(r['RECEITA BRUTA (R$)']||r['TOTAL\nDIA (R$)']||r['TOTAL DIA (R$)']||0);
    // Tenta pegar META DIA diretamente da planilha (coluna calculada pelo Excel/Sheets)
    var metaSheet=num(r['META DIA (R$)']||r['META\nDIA (R$)']||r['META DIA']||r['META\nDIA']||0);
    var ds=String(r['DATA']).trim();
    return{data:ds, dia:String(r['DIA']||'').trim().toUpperCase(),
      dia_num:parseInt(ds.substring(0,2)),
      especie:num(r['ESPÉCIE\n(R$)']||r['ESPÉCIE (R$)']||r['ESPECIE (R$)']||0),
      cartao:num(r['CARTÃO\n(R$)']||r['CARTÃO (R$)']||r['CARTAO (R$)']||0),
      pix:num(r['PIX\n(R$)']||r['PIX (R$)']||0),
      ifood:num(r['IFOOD\n(R$)']||r['IFOOD (R$)']||0),
      whats:num(r['WHATSAPP\n(R$)']||r['WHATSAPP (R$)']||0),
      despCx:num(r['DESP. CAIXA (R$)']||r['DESP. CAIXA']||0),
      receita:rec, metaDiaSheet:metaSheet, metaDia:0, bateu:false, fechado:rec===0};
  });
  // 2ª passagem: define metaDia por dia da semana (replicando AVERAGEIF da planilha)
  // Se a planilha já enviou meta calculada, usa ela. Senão, recalcula aqui.
  var temMetaSheet = parsed.some(function(d){return d.metaDiaSheet > 0;});
  var medias = calcMetasDia(parsed); // sempre calcula como fallback
  return parsed.map(function(d){
    if(temMetaSheet && d.metaDiaSheet > 0){
      d.metaDia = d.metaDiaSheet;
    } else {
      // AVERAGEIF: média de todos os dias com mesmo dia_semana e receita > 0
      d.metaDia = Math.round(medias[d.dia] || 0);
    }
    d.bateu = d.receita > 0 && d.metaDia > 0 && d.receita >= d.metaDia;
    return d;
  });
}
function parseDespesas(rows){
  return rows.filter(function(r){
    return String(r['FORNECEDOR / DESCRIÇÃO']||r['FORNECEDOR']||'').trim()
      && num(r['VALOR (R$)']||0)>0;
  }).map(function(r){
    return{mes:String(r['MÊS/ANO']||'').trim(),
      venc:String(r['DATA']||r['VENCIMENTO']||'').trim(),
      dia_num:parseInt(String(r['DATA']||r['VENCIMENTO']||'01').substring(0,2))||0,
      cc:String(r['CENTRO DE CUSTO']||'').trim(),
      conta:String(r['CONTA']||'').trim(),
      forn:String(r['FORNECEDOR / DESCRIÇÃO']||r['FORNECEDOR']||'').trim(),
      val:num(r['VALOR (R$)']||0)};
  });
}

// ═══════════════════════════════════════════════════════════════════════
// API FETCH
// ═══════════════════════════════════════════════════════════════════════
function fetchSheet(sheet){
  return fetch(SHEETDB+'?sheet='+encodeURIComponent(sheet)+'&limit=1000',{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error(r.status); return r.json();});
}

function carregarTudo(){
  var lojas=['frei','eliseu','petronio'];
  el('h-upd').textContent='Carregando...';
  Promise.all(lojas.reduce(function(arr,l){
    return arr.concat([
      fetchSheet(ABAS[l].v).then(parseVendas).catch(function(){return null;}),
      fetchSheet(ABAS[l].d).then(parseDespesas).catch(function(){return null;}),
    ]);
  },[])).then(function(res){
    lojas.forEach(function(l,i){
      STATE[l].dias=res[i*2]&&res[i*2].length?res[i*2]:getSampleDias(l);
      STATE[l].desp=res[i*2+1]&&res[i*2+1].length?res[i*2+1]:getSampleDesp(l);
    });
  }).catch(function(){
    lojas.forEach(function(l){STATE[l].dias=getSampleDias(l);STATE[l].desp=getSampleDesp(l);});
  }).finally(function(){
    var now=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    el('h-upd').textContent='Atualizado às '+now;
    renderAll();
  });
}

// ═══════════════════════════════════════════════════════════════════════
// INIT APP
// ═══════════════════════════════════════════════════════════════════════
function initApp(){
  el('h-name').textContent = CUR.label;
  el('h-role').textContent = CUR.role==='owner'
    ? 'Proprietário · Acesso Total'
    : 'Gerente · '+CUR.label;

  if(CUR.role==='manager') FILIAL = CUR.loja;
  else FILIAL = 'frei';

  buildTabs();
  buildFilters();
  buildPanes();
  carregarTudo();

  if(AUTO_T) clearInterval(AUTO_T);
  AUTO_T = setInterval(carregarTudo, 43200000); // 2x por dia = a cada 12h (~240 req/mês no SheetDB)
}

function buildTabs(){
  var isOwner = CUR.role === 'owner';
  var html = '';
  if(isOwner){
    html = '<button class="tab act" onclick="showTab(\'consolidado\',this)">📊 Consolidado</button>'
      +'<button class="tab" onclick="showTab(\'vendas\',this)">📈 Vendas</button>'
      +'<button class="tab" onclick="showTab(\'despesas\',this)">💸 Despesas</button>'
      +'<button class="tab" onclick="showTab(\'orcamento\',this)">🎯 Orçamento</button>'
      +'<button class="tab" onclick="showTab(\'investimentos\',this)">🔧 Investimentos</button>'
      +'<button class="tab" onclick="showTab(\'dre\',this)">📋 DRE</button>';
  } else {
    html = '<button class="tab act" onclick="showTab(\'vendas\',this)">📈 Vendas & Meta</button>';
  }
  el('tab-bar').innerHTML = html;
}

function buildFilters(){
  var isOwner = CUR.role === 'owner';
  var diasOpts = '<option value="">Todos os dias</option>';
  for(var i=1;i<=31;i++) diasOpts += '<option value="'+i+'">'+i+'</option>';
  var mesOpts = '<option value="">Todos os meses</option>'
    +'<option value="FEV/2026">Fev/2026</option>'
    +'<option value="JAN/2026">Jan/2026</option>';

  var html = '';
  if(isOwner){
    html += '<span class="flbl">Filial:</span><select id="f-filial" onchange="trocarFilial(this.value)">'
      +'<option value="frei">Frei Serafim</option>'
      +'<option value="eliseu">Eliseu Martins</option>'
      +'<option value="petronio">Petrônio Portela</option>'
      +'</select>';
  }
  html += '<span class="flbl">Mês:</span><select id="f-mes" onchange="renderAll()">'+mesOpts+'</select>';
  html += '<span class="flbl">Dia:</span><select id="f-dia" onchange="renderAll()">'+diasOpts+'</select>';
  html += '<button class="refresh-btn" onclick="carregarTudo()">↻ Atualizar</button>';
  el('filter-bar').innerHTML = html;
}

function buildPanes(){
  var isOwner = CUR.role === 'owner';
  var h = '';
  if(isOwner){
    h += '<div id="pane-consolidado" class="pane act"><div class="main" id="m-consolidado"></div></div>';
  }
  h += '<div id="pane-vendas" class="pane'+(isOwner?'':' act')+'"><div class="main" id="m-vendas"></div></div>';
  if(isOwner){
    h += '<div id="pane-despesas" class="pane"><div class="main" id="m-despesas"></div></div>';
    h += '<div id="pane-orcamento" class="pane"><div class="main" id="m-orcamento"></div></div>';
    h += '<div id="pane-investimentos" class="pane"><div class="main" id="m-investimentos"></div></div>';
    h += '<div id="pane-dre" class="pane"><div class="main" id="m-dre"></div></div>';
  }
  el('pane-container').innerHTML = h;
}

function showTab(id, btn){
  document.querySelectorAll('.pane').forEach(function(p){p.classList.remove('act');});
  document.querySelectorAll('.tab').forEach(function(b){b.classList.remove('act');});
  var p = el('pane-'+id); if(p) p.classList.add('act');
  if(btn) btn.classList.add('act');
  renderAll();
}

function trocarFilial(f){FILIAL=f; renderAll();}

function renderAll(){
  renderVendas();
  if(CUR && CUR.role==='owner'){
    renderConsolidado();
    renderDespesas();
    renderOrcamento();
    renderInvestimentos();
    renderDRE();
  }
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER VENDAS — gerente vê só sua loja; proprietário vê via filtro
// ═══════════════════════════════════════════════════════════════════════
function renderVendas(){
  var loja = FILIAL;
  var allDias = STATE[loja]?STATE[loja].dias:[];
  var ev = el('m-vendas'); if(!ev) return;
  if(!allDias.length){ev.innerHTML='<div class="loading"><div class="spin"></div><div>Carregando dados...</div></div>';return;}

  var fd = gF('f-dia');
  var dias = fd ? allDias.filter(function(d){return d.dia_num===parseInt(fd);}) : allDias;
  var diasOp = dias.filter(function(d){return !d.fechado;});

  var totR=0,totE=0,totC=0,totP=0,totI=0,totW=0,totDC=0;
  diasOp.forEach(function(d){totR+=d.receita;totE+=d.especie;totC+=d.cartao;totP+=d.pix;totI+=d.ifood;totW+=d.whats;totDC+=d.despCx;});

  var nOk = diasOp.filter(function(d){return d.bateu;}).length;
  var metaM = ABAS[loja].meta;
  var pct = metaM>0 ? totR/metaM : 0;
  var ticket = diasOp.length ? totR/diasOp.length : 0;
  var cor = ABAS[loja].cor;

  el('h-badge').textContent = ABAS[loja].label+' · '+fmtP(pct)+' meta';
  el('h-badge').className = 'badge '+(pct>=1?'b-ok':'b-gold');
  el('h-period').textContent = 'Fev/2026';

  var canais = [
    {l:'Espécie',v:totE,c:'#8B6200'},
    {l:'Cartão',v:totC,c:cor},
    {l:'PIX',v:totP,c:'#1E6B3A'},
    {l:'iFood',v:totI,c:'#C62828'},
    {l:'WhatsApp',v:totW,c:'#0A7040'},
  ].filter(function(x){return x.v>0;});

  var canaisHtml = canais.map(function(c){
    var w = totR>0?((c.v/totR)*100).toFixed(1):0;
    return '<div class="canal-row"><div class="canal-name">'+c.l+'</div>'
      +'<div class="canal-track"><div class="canal-fill" style="width:'+w+'%;background:'+c.c+'">'
      +'<span>'+fmtP(c.v/(totR||1))+'</span></div></div>'
      +'<div class="canal-val">'+fmt(c.v)+'</div></div>';
  }).join('');

  var topDias = [].concat(diasOp).sort(function(a,b){return b.receita-a.receita;}).slice(0,8)
    .map(function(d,i){
      return '<tr><td style="color:var(--tx3);font-size:9px">'+(i+1)+'</td>'
        +'<td class="tdn">'+d.data.substring(0,5)+'</td>'
        +'<td style="color:var(--tx3)">'+d.dia+'</td>'
        +'<td class="tdv">'+fmt(d.receita)+'</td>'
        +'<td class="tdr">'+pill(d.bateu,(d.bateu?'✓ Meta':'✗'))+'</td></tr>';
    }).join('');

  var lucroColH = CUR.role==='owner'?'<th class="tdr">Lucro</th>':'';
  var diarioRows = allDias.map(function(d){
    var l = d.receita - d.despCx;
    var lucroTd = CUR.role==='owner'?'<td class="tdv" style="color:'+(l>=0?'var(--grn)':'var(--red)')+'">'+( d.fechado?'—':fmt(l))+'</td>':'';
    return '<tr style="'+(d.fechado?'opacity:.4':'')+'"><td class="tdn">'+d.data.substring(0,5)+'</td>'
      +'<td style="color:var(--tx3)">'+d.dia+'</td>'
      +'<td>'+( d.fechado?'<span style="font-size:9px;color:var(--tx3)">FECHADO</span>':pill(d.bateu,d.bateu?'✓':'✗'))+'</td>'
      +'<td class="tdv">'+(d.fechado?'—':fmt(d.receita))+'</td>'
      +'<td class="tdv">'+(d.fechado?'—':fmt(d.especie))+'</td>'
      +'<td class="tdv">'+(d.fechado?'—':fmt(d.cartao))+'</td>'
      +'<td class="tdv">'+(d.fechado?'—':fmt(d.pix))+'</td>'
      +'<td class="tdv">'+(d.fechado?'—':fmt(d.ifood))+'</td>'
      +'<td class="tdv">'+(d.fechado?'—':fmt(d.whats))+'</td>'
      +lucroTd
      +'<td class="tdr" style="color:'+(d.bateu?'var(--grn)':d.fechado?'var(--tx3)':'var(--red)')+'">'+( d.fechado?'—':fmtP(d.receita/(d.metaDia||1)))+'</td></tr>';
  }).join('');

  var lucroKpi = CUR.role==='owner'
    ? '<div class="kpi" style="--kt:var(--grn)"><div class="kpi-label">Lucro Op.</div><div class="kpi-val" style="color:var(--grn)">'+fmt(totR-totDC)+'</div><div class="kpi-sub">Margem '+fmtP((totR-totDC)/(totR||1))+'</div></div>'
    : '';

  ev.innerHTML = ''
    +'<div class="insight"><div class="insight-label">💡 Análise do Período</div>'
    +'<div class="insight-body">Faturamento <strong>'+fmt(totR)+'</strong> · <strong>'+nOk+'/'+diasOp.length+'</strong> dias com meta atingida · '
    +'% meta mensal: <strong style="color:'+(pct>=1?'var(--grn)':'var(--red)')+'">'+fmtP(pct)+'</strong> · '
    +'Ticket médio/dia: <strong>'+fmt(ticket)+'</strong></div></div>'

    +'<div class="sec-hdr">Indicadores do Mês</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat('+(CUR.role==='owner'?5:4)+',1fr)">'
    +'<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Faturamento</div><div class="kpi-val">'+fmtK(totR)+'</div><div class="kpi-sub">Meta: '+fmtK(metaM)+'</div></div>'
    +'<div class="kpi" style="--kt:'+(pct>=1?'var(--grn)':'var(--red)')+'"><div class="kpi-label">% Meta Mensal</div><div class="kpi-val" style="color:'+(pct>=1?'var(--grn)':'var(--red)')+'">'+fmtP(pct)+'</div><div class="kpi-sub">'+nOk+'/'+diasOp.length+' dias ✓</div></div>'
    +'<div class="kpi" style="--kt:var(--amb)"><div class="kpi-label">Ticket Médio/Dia</div><div class="kpi-val">'+fmtK(ticket)+'</div><div class="kpi-sub">'+diasOp.length+' dias operacionais</div></div>'
    +lucroKpi
    +'<div class="kpi" style="--kt:var(--brd2)"><div class="kpi-label">Dias c/ Meta</div><div class="kpi-val">'+nOk+'<span style="font-size:14px;color:var(--tx3)">/'+diasOp.length+'</span></div><div class="kpi-sub">'+fmtP(diasOp.length?nOk/diasOp.length:0)+' de aproveitamento</div></div>'
    +'</div>'

    +'<div class="sec-hdr">Análise de Vendas</div>'
    +'<div class="g32">'
    +'<div class="card"><div class="card-title">Receita Diária vs Meta <span>'+allDias[0].data.substring(0,5)+'–'+allDias[allDias.length-1].data.substring(0,5)+'</span></div>'
    +'<div class="legend"><span class="li"><span class="ld" style="background:var(--grn)"></span>Bateu meta</span>'
    +'<span class="li"><span class="ld" style="background:'+cor+'"></span>Abaixo</span>'
    +'<span class="li"><span class="ld" style="background:var(--red);border-radius:0;height:3px;width:16px"></span>Linha meta</span></div>'
    +'<div style="position:relative;height:200px"><canvas id="cv-d"></canvas></div></div>'
    +'<div class="card"><div class="card-title">Mix de Canais</div>'+canaisHtml
    +'<div style="padding-top:8px;border-top:1px solid var(--brd);font-size:10px;color:var(--tx3)">Total: '+fmt(totR)+'</div></div>'
    +'</div>'

    +'<div class="g2">'
    +'<div class="card"><div class="card-title">Top 8 Dias por Receita</div><div class="tw"><table><thead><tr><th>#</th><th>Data</th><th>Dia</th><th class="tdr">Receita</th><th class="tdr">Status</th></tr></thead><tbody>'+topDias+'</tbody></table></div></div>'
    +'<div class="card"><div class="card-title">Histórico 8 Meses</div><div style="position:relative;height:185px"><canvas id="cv-hist"></canvas></div></div>'
    +'</div>'

    +'<div class="sec-hdr">Diário de Vendas</div>'
    +'<div class="twx"><table><thead><tr><th>Data</th><th>Dia</th><th>Meta</th><th class="tdr">Receita</th><th class="tdr">Espécie</th><th class="tdr">Cartão</th><th class="tdr">PIX</th><th class="tdr">iFood</th><th class="tdr">WhatsApp</th>'
    +(CUR.role==='owner'?'<th class="tdr">Lucro</th>':'')
    +'<th class="tdr">% Meta</th></tr></thead>'
    +'<tbody>'+diarioRows
    +'<tr style="background:#FDF6E8;font-weight:700"><td colspan="3">TOTAL</td>'
    +'<td class="tdv">'+fmt(totR)+'</td><td class="tdv">'+fmt(totE)+'</td><td class="tdv">'+fmt(totC)+'</td>'
    +'<td class="tdv">'+fmt(totP)+'</td><td class="tdv">'+fmt(totI)+'</td><td class="tdv">'+fmt(totW)+'</td>'
    +(CUR.role==='owner'?'<td class="tdv" style="color:var(--grn)">'+fmt(totR-totDC)+'</td>':'')
    +'<td class="tdr">'+fmtP(pct)+'</td></tr>'
    +'</tbody></table></div>';

  // Gráfico diário
  dc('cv-d');
  CHARTS['cv-d'] = new Chart(el('cv-d'),{
    type:'bar',
    data:{
      labels:allDias.map(function(d){return d.data.substring(0,5);}),
      datasets:[
        {label:'Receita',data:allDias.map(function(d){return d.receita||0;}),
         backgroundColor:allDias.map(function(d){return d.fechado?'rgba(180,180,180,.2)':d.bateu?'rgba(30,107,58,.7)':'rgba(184,134,11,.65)';}),
         borderColor:allDias.map(function(d){return d.fechado?'#bbb':d.bateu?'#1E6B3A':'#B8860B';}),
         borderWidth:1,borderRadius:3},
        {label:'Meta',data:allDias.map(function(d){return d.metaDia;}),type:'line',
         borderColor:'#9B2020',borderWidth:1.5,borderDash:[5,4],pointRadius:0,fill:false,tension:0}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return ' '+c.dataset.label+': '+fmt(c.parsed.y);}}}},
      scales:{
        x:{ticks:{color:'#9B7A3A',font:{size:9},maxRotation:45,autoSkip:false},grid:{display:false}},
        y:{ticks:{color:'#9B7A3A',font:{size:9},callback:function(v){return 'R$'+(v/1000).toFixed(0)+'k';}},grid:{color:'rgba(184,134,11,.07)'}}
      }
    }
  });

  // Gráfico histórico
  dc('cv-hist');
  CHARTS['cv-hist'] = new Chart(el('cv-hist'),{
    type:'bar',
    data:{
      labels:HIST_LABELS,
      datasets:[{
        label:ABAS[loja].label,
        data:HIST[loja],
        backgroundColor:cor+'88',
        borderColor:cor,
        borderWidth:1,borderRadius:3
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return ' '+fmt(c.parsed.y);}}}},
      scales:{
        x:{ticks:{color:'#9B7A3A',font:{size:9}},grid:{display:false}},
        y:{ticks:{color:'#9B7A3A',font:{size:9},callback:function(v){return 'R$'+(v/1000).toFixed(0)+'k';}},grid:{color:'rgba(184,134,11,.07)'}}
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER CONSOLIDADO — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderConsolidado(){
  var ev = el('m-consolidado'); if(!ev) return;
  var lojas = ['frei','eliseu','petronio'];
  var T = {};
  lojas.forEach(function(l){
    var d = getDias(l).filter(function(d){return !d.fechado;});
    T[l] = {rec:0, desp:0, nOk:0, nDias:d.length, meta:ABAS[l].meta};
    d.forEach(function(x){T[l].rec+=x.receita; T[l].desp+=x.despCx; if(x.bateu)T[l].nOk++;});
    T[l].lucro = T[l].rec - T[l].desp;
    T[l].pct = T[l].meta>0?T[l].rec/T[l].meta:0;
    T[l].marg = T[l].rec>0?T[l].lucro/T[l].rec:0;
  });
  var sR=0,sL=0,sD=0,sM=0,sOk=0,sDias=0;
  lojas.forEach(function(l){sR+=T[l].rec;sL+=T[l].lucro;sD+=T[l].desp;sM+=T[l].meta;sOk+=T[l].nOk;sDias+=T[l].nDias;});

  var lojaCards = lojas.map(function(l){
    return '<div class="loja-card" style="--kt:'+ABAS[l].cor+'">'
      +'<div class="loja-name" style="color:'+ABAS[l].cor+'">'+ABAS[l].label+'</div>'
      +'<div class="loja-val">'+fmt(T[l].rec)+'</div>'
      +'<div class="meta-bar"><div class="meta-fill" style="width:'+Math.min(T[l].pct*100,100).toFixed(1)+'%;background:'+ABAS[l].cor+'"></div></div>'
      +'<div style="font-size:9px;color:var(--tx3)">'+fmtP(T[l].pct)+' da meta · '+T[l].nOk+'/'+T[l].nDias+' dias ✓</div>'
      +'<div style="font-size:10px;margin-top:5px;display:flex;gap:10px">'
      +'<span>Lucro: <strong style="color:var(--grn)">'+fmt(T[l].lucro)+'</strong></span>'
      +'<span>Margem: <strong>'+fmtP(T[l].marg)+'</strong></span></div>'
      +'</div>';
  }).join('');

  var sortFat = [].concat(lojas).sort(function(a,b){return T[b].rec-T[a].rec;});
  var maxRec = Math.max.apply(null,lojas.map(function(l){return T[l].rec;}));

  var rankFat = sortFat.map(function(l,i){
    return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:9px">'
      +'<div style="width:20px;height:20px;border-radius:5px;background:'+ABAS[l].cor+'22;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:'+ABAS[l].cor+'">'+(i+1)+'</div>'
      +'<div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--tx2)">'+ABAS[l].label+'</div>'+rb(T[l].rec/(maxRec||1)*100,ABAS[l].cor)+'</div>'
      +'<div style="font-size:11px;font-weight:700;color:'+ABAS[l].cor+'">'+fmt(T[l].rec)+'</div></div>';
  }).join('');

  var rankMeta = [].concat(lojas).sort(function(a,b){return T[b].pct-T[a].pct;}).map(function(l,i){
    var cor = T[l].pct>=1?'var(--grn)':'var(--red)';
    return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
      +'<div style="width:20px;height:20px;border-radius:5px;background:'+(T[l].pct>=1?'rgba(30,107,58,.12)':'rgba(155,32,32,.1)')+';display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:'+cor+'">'+(i+1)+'</div>'
      +'<div style="flex:1"><div style="font-size:10px;color:var(--tx2)">'+ABAS[l].label+'</div>'
      +rb(Math.min(T[l].pct*100,100),(T[l].pct>=1?'var(--grn)':'var(--amb)'))+'</div>'
      +'<div style="font-size:11px;font-weight:700;color:'+cor+'">'+fmtP(T[l].pct)+'</div></div>';
  }).join('');

  ev.innerHTML = ''
    +'<div class="insight"><div class="insight-label">📊 Visão Corporativa — Fev/2026</div>'
    +'<div class="insight-body">Faturamento consolidado <strong>'+fmt(sR)+'</strong> · Meta total: <strong>'+fmt(sM)+'</strong> · '
    +'Performance: <strong style="color:'+(sR/sM>=1?'var(--grn)':'var(--red)')+'">'+fmtP(sR/sM)+'</strong> · '
    +'Resultado líquido: <strong style="color:var(--grn)">'+fmt(sL)+'</strong> (margem '+fmtP(sL/(sR||1))+')</div></div>'

    +'<div class="sec-hdr">Consolidado da Rede</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">'
    +'<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Faturamento Total</div><div class="kpi-val">'+fmt(sR)+'</div><div class="kpi-sub">'+fmtP(sR/sM)+' da meta</div></div>'
    +'<div class="kpi" style="--kt:var(--grn)"><div class="kpi-label">Resultado Líquido</div><div class="kpi-val" style="color:var(--grn)">'+fmt(sL)+'</div><div class="kpi-sub">Margem '+fmtP(sR>0?sL/sR:0)+'</div></div>'
    +'<div class="kpi" style="--kt:var(--red)"><div class="kpi-label">Despesas Caixa</div><div class="kpi-val">'+fmt(sD)+'</div><div class="kpi-sub">'+fmtP(sR>0?sD/sR:0)+' do faturamento</div></div>'
    +'<div class="kpi" style="--kt:var(--brd2)"><div class="kpi-label">Dias c/ Meta</div><div class="kpi-val">'+sOk+'<span style="font-size:14px;color:var(--tx3)">/'+sDias+'</span></div><div class="kpi-sub">3 lojas consolidado</div></div>'
    +'</div>'

    +'<div class="sec-hdr">Desempenho por Loja</div>'
    +'<div class="g3">'+lojaCards+'</div>'

    +'<div class="sec-hdr">Rankings e Histórico</div>'
    +'<div class="g32">'
    +'<div class="card"><div class="card-title">Histórico 8 Meses — Todas as Lojas</div>'
    +'<div class="legend">'
    +lojas.map(function(l){return '<span class="li"><span class="ld" style="background:'+ABAS[l].cor+'"></span>'+ABAS[l].label+'</span>';}).join('')
    +'</div>'
    +'<div style="position:relative;height:200px"><canvas id="cv-consol-h"></canvas></div></div>'
    +'<div class="card"><div class="card-title">Rankings Fev/2026</div>'
    +'<div style="font-size:9px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;margin-bottom:9px">Faturamento</div>'+rankFat
    +'<div style="margin-top:12px;padding-top:9px;border-top:1px solid var(--brd);font-size:9px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;margin-bottom:9px">% Meta Atingida</div>'+rankMeta
    +'</div></div>';

  dc('cv-consol-h');
  CHARTS['cv-consol-h'] = new Chart(el('cv-consol-h'),{
    type:'bar',
    data:{labels:HIST_LABELS, datasets:lojas.map(function(l){
      return{label:ABAS[l].label,data:HIST[l],backgroundColor:ABAS[l].cor+'88',borderColor:ABAS[l].cor,borderWidth:1,borderRadius:2};
    })},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#7A5C28',font:{size:10}}}},
      scales:{
        x:{ticks:{color:'#9B7A3A',font:{size:9}},grid:{display:false}},
        y:{ticks:{color:'#9B7A3A',font:{size:9},callback:function(v){return 'R$'+(v/1000).toFixed(0)+'k';}},grid:{color:'rgba(184,134,11,.07)'}}
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER DESPESAS — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderDespesas(){
  var loja = FILIAL;
  var desp = getDesp(loja);
  var ev = el('m-despesas'); if(!ev) return;

  var total = desp.reduce(function(s,d){return s+d.val;},0);
  var ccMap = {};
  desp.forEach(function(d){ccMap[d.cc]=(ccMap[d.cc]||0)+d.val;});
  var ccMax = Math.max.apply(null,Object.values(ccMap).concat([1]));

  var fornMap = {};
  desp.forEach(function(d){
    if(!fornMap[d.forn]) fornMap[d.forn]={nome:d.forn,val:0,cc:d.cc,conta:d.conta};
    fornMap[d.forn].val+=d.val;
  });
  var fornList = Object.values(fornMap).sort(function(a,b){return b.val-a.val;});

  // Vencimentos por dia
  var porData = {};
  desp.forEach(function(d){
    var k = d.venc?d.venc.substring(0,5):'?';
    if(!porData[k]) porData[k]=0;
    porData[k]+=d.val;
  });
  var diasV = Object.keys(porData).filter(function(k){return k!=='?';}).sort().map(function(k){return[k,porData[k]];});
  var picoE = diasV.slice().sort(function(a,b){return b[1]-a[1];})[0]||['—',0];

  var kpiLojas = ['frei','eliseu','petronio'].map(function(l){
    var t = getDesp(l).reduce(function(s,d){return s+d.val;},0);
    var fatL = getDias(l).reduce(function(s,d){return s+d.receita;},0);
    return '<div class="kpi" style="--kt:'+ABAS[l].cor+'"><div class="kpi-label">'+ABAS[l].label+'</div>'
      +'<div class="kpi-val">'+fmtK(t)+'</div>'
      +'<div class="kpi-sub">'+fmtP(fatL>0?t/fatL:0)+' do faturamento</div></div>';
  }).join('');

  var ccBars = Object.keys(ccMap).sort(function(a,b){return ccMap[b]-ccMap[a];}).map(function(cc){
    var v = ccMap[cc];
    return '<div class="cat-row"><div class="cat-name">'+cc+'</div>'
      +'<div class="cat-track"><div class="cat-fill" style="width:'+(v/ccMax*100).toFixed(1)+'%;background:'+(CC_COR[cc]||'#B8860B')+'">'
      +'<span>'+fmtP(v/total)+'</span></div></div>'
      +'<div class="cat-val">'+fmt(v)+'</div></div>';
  }).join('');

  var fornRows = fornList.slice(0,15).map(function(f,i){
    return '<tr><td style="color:var(--tx3);font-size:9px">'+(i+1)+'</td>'
      +'<td class="tdn">'+f.nome+'</td>'
      +'<td><span style="background:'+(CC_COR[f.cc]||'#eee')+'22;color:'+(CC_COR[f.cc]||'#555')+';font-size:9px;padding:2px 7px;border-radius:20px;font-weight:700">'+f.cc+'</span></td>'
      +'<td style="color:var(--tx3)">'+f.conta+'</td>'
      +'<td class="tdv">'+fmt(f.val)+'</td>'
      +'<td class="tdr" style="color:var(--tx3)">'+fmtP(f.val/total)+'</td>'
      +'<td style="padding:7px 10px">'+rb(f.val/(fornList[0]?fornList[0].val:1)*100,'var(--g2)')+'</td></tr>';
  }).join('');

  ev.innerHTML = ''
    +'<div class="insight"><div class="insight-label">💸 Despesas — '+ABAS[loja].label+'</div>'
    +'<div class="insight-body">Total: <strong>'+fmt(total)+'</strong> · Maior vencimento: <strong>'+picoE[0]+'</strong> ('+fmt(picoE[1])+') · '
    +'Top fornecedor: <strong>'+(fornList[0]?fornList[0].nome:'—')+'</strong> ('+fmt(fornList[0]?fornList[0].val:0)+')</div></div>'

    +'<div class="sec-hdr">Por Loja</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">'+kpiLojas+'</div>'

    +'<div class="sec-hdr">Composição e Vencimentos</div>'
    +'<div class="g32">'
    +'<div class="card"><div class="card-title">Despesas por Vencimento</div><div style="position:relative;height:185px"><canvas id="cv-desp-d"></canvas></div></div>'
    +'<div class="card"><div class="card-title">Por Centro de Custo</div>'+ccBars+'</div>'
    +'</div>'

    +'<div class="sec-hdr">Ranking de Fornecedores</div>'
    +'<div class="twx"><table><thead><tr><th>#</th><th>Fornecedor</th><th>CC</th><th>Conta</th><th class="tdr">Valor</th><th class="tdr">%</th><th style="width:90px">Part.</th></tr></thead>'
    +'<tbody>'+fornRows+'</tbody></table></div>';

  dc('cv-desp-d');
  CHARTS['cv-desp-d'] = new Chart(el('cv-desp-d'),{
    type:'bar',
    data:{labels:diasV.map(function(d){return d[0];}),
      datasets:[{data:diasV.map(function(d){return d[1];}),
        backgroundColor:diasV.map(function(d){return d[1]>20000?'rgba(155,32,32,.7)':d[1]>10000?'rgba(196,122,0,.7)':'rgba(184,134,11,.55)';}),
        borderColor:diasV.map(function(d){return d[1]>20000?'#9B2020':d[1]>10000?'#C47A00':'#B8860B';}),
        borderWidth:1,borderRadius:3}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
      scales:{x:{ticks:{color:'#9B7A3A',font:{size:9},maxRotation:45},grid:{display:false}},
        y:{ticks:{color:'#9B7A3A',font:{size:9},callback:function(v){return 'R$'+(v/1000).toFixed(0)+'k';}},grid:{color:'rgba(184,134,11,.07)'}}}}
  });
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER ORÇAMENTO — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderOrcamento(){
  var ev = el('m-orcamento'); if(!ev) return;
  var tabsHtml = ['frei','eliseu','petronio'].map(function(l){
    return '<button class="stab '+(l===ORC_LOJA?'act':'')+'" onclick="switchOrcLoja(\''+l+'\',this)">'+ABAS[l].label+'</button>';
  }).join('');
  ev.innerHTML = '<div class="stabs">'+tabsHtml+'</div><div id="orc-content"></div>';
  renderOrcContent();
}
function switchOrcLoja(l,btn){
  ORC_LOJA=l;
  document.querySelectorAll('.stab').forEach(function(b){b.classList.remove('act');});
  btn.classList.add('act');
  renderOrcContent();
}
function renderOrcContent(){
  var ev = el('orc-content'); if(!ev) return;
  var loja=ORC_LOJA, desp=getDesp(loja), orcL=ORC[loja]||[];
  var GC='grid-template-columns:2fr 1fr 1fr 1fr 1fr';

  var rows = orcL.map(function(cc){
    var realCC = desp.filter(function(d){return d.cc===cc.cc;}).reduce(function(s,d){return s+d.val;},0);
    var orcCC = cc.contas.reduce(function(s,c){return s+(c.orc||0);},0);
    var items = cc.contas.map(function(c){
      var r = desp.filter(function(d){return d.cc===cc.cc&&d.conta===c.c;}).reduce(function(s,d){return s+d.val;},0);
      return Object.assign({},c,{realCalc:r,over:c.orc&&r>c.orc,pct:c.orc?r/c.orc:null});
    });
    return{cc:cc.cc,orc:orcCC,real:realCC,over:orcCC&&realCC>orcCC,pct:orcCC?realCC/orcCC:null,items:items};
  });

  var tO = rows.reduce(function(s,r){return s+r.orc;},0);
  var tR = rows.reduce(function(s,r){return s+r.real;},0);

  var html = rows.map(function(r){
    var pw = r.orc?Math.min(r.real/r.orc*100,100).toFixed(0):0;
    var pc = r.over?'var(--red)':'var(--grn)';
    var items = r.items.map(function(it){
      var fml = it.formula?' <span style="font-size:9px;color:var(--amb)">('+it.formula+')</span>':'';
      return '<div class="orc-grid orc-item" style="'+GC+'">'
        +'<div class="orc-cell">'+it.c+fml+'</div>'
        +'<div class="orc-cell" style="color:var(--tx3)">'+(it.orc?fmt(it.orc):'Auto')+'</div>'
        +'<div class="orc-cell '+(it.over?'orc-over':it.realCalc>0?'orc-under':'')+'">'+fmt(it.realCalc)+'</div>'
        +'<div class="orc-cell '+(it.over?'orc-over':it.realCalc>0?'orc-under':'')+'">'+(it.orc?(it.over?'+ ':'- ')+fmt(Math.abs(it.realCalc-it.orc)):'—')+'</div>'
        +'<div class="orc-cell">'+(it.pct?fmtP(it.pct):'—')+'</div></div>';
    }).join('');
    return '<div class="orc-grid orc-cat" style="'+GC+'" onclick="toggleOrc(this)">'
      +'<div class="orc-cell"><span class="orc-exp">▶</span><strong>'+r.cc+'</strong>'
      +rb(pw,pc)+'</div>'
      +'<div class="orc-cell">'+(r.orc?fmt(r.orc):'—')+'</div>'
      +'<div class="orc-cell '+(r.over?'orc-over':'orc-under')+'">'+fmt(r.real)+'</div>'
      +'<div class="orc-cell '+(r.over?'orc-over':'orc-under')+'">'+(r.orc?(r.over?'+ ':'- ')+fmt(Math.abs(r.real-r.orc)):'—')+'</div>'
      +'<div class="orc-cell">'+(r.pct?fmtP(r.pct):'—')+'</div></div>'
      +'<div style="display:none">'+items+'</div>';
  }).join('');

  ev.innerHTML = '<div class="tw">'
    +'<div class="orc-grid" style="'+GC+';background:#F2EAD8;border-bottom:1px solid var(--brd)">'
    +'<div class="orc-cell orc-hdr">CC / Conta</div><div class="orc-cell orc-hdr">Orçado</div>'
    +'<div class="orc-cell orc-hdr">Realizado</div><div class="orc-cell orc-hdr">Variação</div>'
    +'<div class="orc-cell orc-hdr">% Exec.</div></div>'
    +html
    +'<div class="orc-grid orc-total" style="'+GC+'">'
    +'<div class="orc-cell"><strong>TOTAL</strong></div><div class="orc-cell">'+fmt(tO)+'</div>'
    +'<div class="orc-cell '+(tR>tO?'orc-over':'orc-under')+'">'+fmt(tR)+'</div>'
    +'<div class="orc-cell '+(tR>tO?'orc-over':'orc-under')+'">'+(tR>tO?'+ ':'- ')+fmt(Math.abs(tR-tO))+'</div>'
    +'<div class="orc-cell '+(tR>tO?'orc-over':'orc-under')+'">'+fmtP(tO?tR/tO:0)+'</div></div></div>';
}
function toggleOrc(row){
  var next=row.nextElementSibling;if(!next)return;
  var open=next.style.display!=='none';
  next.style.display=open?'none':'block';
  var exp=row.querySelector('.orc-exp');if(exp)exp.textContent=open?'▶':'▼';
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER INVESTIMENTOS — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderInvestimentos(){
  var ev = el('m-investimentos'); if(!ev) return;
  var total = INVEST.reduce(function(s,x){return s+x.valor;},0);

  var kpiLojas = '<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Total Investido</div><div class="kpi-val">'+fmt(total)+'</div><div class="kpi-sub">Fev/2026</div></div>';
  ['frei','eliseu','petronio'].forEach(function(l){
    var label = ABAS[l].label;
    var v = INVEST.filter(function(x){return x.loja===label||x.loja==='Todas';}).reduce(function(s,x){return s+x.valor;},0);
    kpiLojas += '<div class="kpi" style="--kt:'+ABAS[l].cor+'"><div class="kpi-label">'+label+'</div><div class="kpi-val">'+fmt(v)+'</div><div class="kpi-sub">no período</div></div>';
  });

  var rows = INVEST.map(function(x){
    var lk = x.loja==='Frei Serafim'?'frei':x.loja==='Eliseu Martins'?'eliseu':x.loja==='Petrônio'?'petronio':null;
    var cor = lk?ABAS[lk].cor:'#8B6200';
    var parc = parseInt(x.cond)||1;
    return '<tr>'
      +'<td><span style="background:'+cor+'22;color:'+cor+';font-size:9px;padding:2px 8px;border-radius:20px;font-weight:700">'+x.loja+'</span></td>'
      +'<td style="color:var(--tx3)">'+x.mes+'</td>'
      +'<td><span style="background:var(--sur3);font-size:9px;padding:2px 7px;border-radius:20px">'+x.cc+'</span></td>'
      +'<td><span class="itag">'+x.conta+'</span></td>'
      +'<td class="tdn">'+x.item+'</td>'
      +'<td class="tdv">'+fmt(x.valor)+'</td>'
      +'<td style="text-align:center;font-weight:600">'+x.cond+'</td>'
      +'<td class="tdv" style="color:var(--amb)">'+fmt(Math.round(x.valor/parc))+'</td>'
      +'<td style="color:var(--tx3);font-size:10px">'+x.obs+'</td>'
      +'</tr>';
  }).join('');

  ev.innerHTML = ''
    +'<div class="insight"><div class="insight-label">🔧 Controle de Investimentos</div>'
    +'<div class="insight-body">Investimentos são controlados separadamente do resultado operacional (CapEx vs OpEx). '
    +'Total investido: <strong>'+fmt(total)+'</strong> · Controlados na planilha ADM GERAL · Lançamentos sempre com item, valor total, condição e loja.</div></div>'

    +'<div class="sec-hdr">Resumo por Loja</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">'+kpiLojas+'</div>'

    +'<div class="sec-hdr">Lançamentos</div>'
    +'<div class="twx"><table><thead><tr>'
    +'<th>Loja</th><th>Mês</th><th>CC</th><th>Conta</th><th>Item / Descrição</th>'
    +'<th class="tdr">Valor Total</th><th>Cond.</th><th class="tdr">Parcela</th><th>Obs.</th>'
    +'</tr></thead><tbody>'+rows
    +'<tr style="background:#FDF6E8;font-weight:700"><td colspan="5">TOTAL</td>'
    +'<td class="tdv">'+fmt(total)+'</td><td colspan="3"></td></tr>'
    +'</tbody></table></div>';
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER DRE — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderDRE(){
  var ev = el('m-dre'); if(!ev) return;
  var lojas = ['frei','eliseu','petronio'];
  var T = {};
  lojas.forEach(function(l){
    var d = getDias(l).filter(function(x){return !x.fechado;});
    T[l] = {rec:0,desp:0,nOk:0,nDias:d.length,meta:ABAS[l].meta};
    d.forEach(function(x){T[l].rec+=x.receita;T[l].desp+=x.despCx;if(x.bateu)T[l].nOk++;});
    T[l].lucro=T[l].rec-T[l].desp;
    T[l].marg=T[l].rec?T[l].lucro/T[l].rec:0;
    T[l].pctMeta=T[l].meta?T[l].rec/T[l].meta:0;
  });
  var totR=0,totD=0,totM=0,totOk=0,totDias=0;
  lojas.forEach(function(l){totR+=T[l].rec;totD+=T[l].desp;totM+=T[l].meta;totOk+=T[l].nOk;totDias+=T[l].nDias;});
  var totL=totR-totD;
  var invTotal=INVEST.reduce(function(s,x){return s+x.valor;},0);
  var GC='grid-template-columns:2.2fr 1fr 1fr 1fr 1fr';

  function dreRow(label,vals,cls){
    var row='<div class="dre-row '+(cls||'')+'" style="'+GC+'"><div>'+label+'</div>';
    lojas.forEach(function(l){row+='<div>'+(typeof vals[l]==='string'?vals[l]:fmt(vals[l]))+'</div>';});
    row+='<div>'+(typeof vals.tot==='string'?vals.tot:fmt(vals.tot))+'</div></div>';
    return row;
  }

  ev.innerHTML = '<div class="tw">'
    +'<div class="dre-row" style="'+GC+';background:#F2EAD8;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--tx2)">'
    +'<div>Indicador</div>'
    +lojas.map(function(l){return '<div style="color:'+ABAS[l].cor+'">'+ABAS[l].label.split(' ')[0]+'</div>';}).join('')
    +'<div>Consolidado</div></div>'

    +'<div class="dre-sec">RECEITAS</div>'
    +dreRow('(+) Receita Bruta',{frei:T.frei.rec,eliseu:T.eliseu.rec,petronio:T.petronio.rec,tot:totR})

    +'<div class="dre-sec">CUSTOS OPERACIONAIS</div>'
    +dreRow('(-) Despesas de Caixa',{frei:T.frei.desp,eliseu:T.eliseu.desp,petronio:T.petronio.desp,tot:totD})

    +'<div class="dre-sec">RESULTADO OPERACIONAL</div>'
    +dreRow('(=) Lucro Operacional',{frei:T.frei.lucro,eliseu:T.eliseu.lucro,petronio:T.petronio.lucro,tot:totL},'dre-sub')
    +dreRow('Margem (%)',{frei:fmtP(T.frei.marg),eliseu:fmtP(T.eliseu.marg),petronio:fmtP(T.petronio.marg),tot:fmtP(totR?totL/totR:0)})

    +'<div class="dre-sec">METAS</div>'
    +dreRow('Meta Mensal',{frei:T.frei.meta,eliseu:T.eliseu.meta,petronio:T.petronio.meta,tot:totM})
    +dreRow('% Meta Atingida',{frei:fmtP(T.frei.pctMeta),eliseu:fmtP(T.eliseu.pctMeta),petronio:fmtP(T.petronio.pctMeta),tot:fmtP(totM?totR/totM:0)})
    +dreRow('Dias c/ Meta',{frei:T.frei.nOk+'/'+T.frei.nDias,eliseu:T.eliseu.nOk+'/'+T.eliseu.nDias,petronio:T.petronio.nOk+'/'+T.petronio.nDias,tot:totOk+'/'+totDias})

    +'<div class="dre-sec dre-dim">INVESTIMENTOS (controle separado)</div>'
    +'<div class="dre-row dre-dim" style="'+GC+'">'
    +'<div>Investimentos CapEx</div>'
    +lojas.map(function(l){
      var label = ABAS[l].label;
      var v=INVEST.filter(function(x){return x.loja===label||x.loja==='Todas';}).reduce(function(s,x){return s+x.valor;},0);
      return '<div style="color:var(--tx3)">'+fmt(v)+'</div>';
    }).join('')
    +'<div style="color:var(--tx3)">'+fmt(invTotal)+'</div></div>'
    +'</div>';
}

// ═══════════════════════════════════════════════════════════════════════
// Como funciona o fluxo de dados — informação no painel de gerente
// ═══════════════════════════════════════════════════════════════════════
// O gerente preenche a planilha no Google Sheets → SheetDB API puxa os dados
// → Dashboard atualiza automaticamente a cada hora

</script>
</body>
</html>
