'use strict';

// ═══════════════════════════════════════════════════════════════════════
// AUTH — logins e senhas conforme solicitado
// ═══════════════════════════════════════════════════════════════════════
var USERS = {
  'gerentefrei':       {pw:'frei99',    role:'manager', loja:'frei',     label:'Frei Serafim'},
  'gerenteeliseu':     {pw:'eliseu88',  role:'manager', loja:'eliseu',   label:'Eliseu Martins'},
  'gerenteuniversitaria':{pw:'universitaria77',role:'manager', loja:'petronio', label:'Universitária'},
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
var GSHEET_ID = '1GJ8TzX2atMOOS1MFa3RNWCcXDecn0iqHGaxpj5XOlUs';

// Metas configuráveis via aba METAS na planilha (proprietário edita sem mexer no código)
// Formato da aba METAS: colunas CHAVE | VALOR | DESCRICAO
// Chaves aceitas: META_SEG, META_TER, META_QUA, META_QUI, META_SEX, META_SAB,
//                 META_MES_FREI, META_MES_ELISEU, META_MES_PETRONIO
var METAS_CONFIG = {
  dia: {SEG:16000, TER:16000, QUA:16000, QUI:16000, SEX:16000, 'SÁB':10000, DOM:0},
  mes: {frei:357103, eliseu:216871, petronio:295668}
};

// Metas calculadas: base histórica Jul-Dez/25 × (1+5%)^mês
// JAN/26 = base × 1.05¹
var ABAS = {
  frei:    {v:'VD FREI',          d:'DESPESAS FREI',        cx:'DESPESA DE CAIXA',  w:'WHATS FREI',      i:'IFOOD FREI',      ve:'VENDAS EXTRAS FREI',   de:'DESP. EXTRAS FREI',   hist:'historico frei',
            label:'Frei Serafim',  metaSemFex:17000, metaSab:10000, metaDom:0,
            metaWhats:0, metaLucro:0.22, meta:357103, metaDia:17000, cor:'#B8860B'},
  eliseu:  {v:'VD ELISEU',        d:'DESPESAS ELISEU',      cx:'DESPESA DE CAIXA',  w:'WHATS ELISEU',    i:'IFOOD ELISEU',    ve:'VENDAS EXTRAS ELISEU',  de:'DESP. EXTRAS ELISEU', hist:'historico eliseu',
            label:'Eliseu Martins',metaSemFex:12000, metaSab:9000,  metaDom:0,
            metaWhats:0, metaLucro:0.21, meta:216871, metaDia:12000, cor:'#1E6B3A'},
  petronio:{v:'VD UNIVERSIT',     d:'DESPESAS UNIVERSIT',   cx:'DESPESA DE CAIXA',  w:'WHATS UNIVERSIT', i:'IFOOD UNIVERSIT', ve:'VENDAS EXTRAS UNIVERSIT',de:'DESP. EXTRAS UNIVERSIT', hist:'historico universitaria',
            label:'Universitária', metaSemFex:12000, metaSab:9000,  metaDom:9000,
            metaWhats:0, metaLucro:0.22, meta:295668, metaDia:12000, cor:'#6B1A1A'},
};

// Histórico últimos 6 meses (Jul-Dez/25) para gráfico
var HIST_PREV = {
  frei:    [369000,319000,314000,323000,279000,334000,311000,300000],
  eliseu:  [222000,191000,198000,215000,163000,188000,214000,172000],
  petronio:[262000,270000,246000,277000,278000,273000,192000,242000],
};

// Desempenho Anual 2025 (fechado) — Receita Bruta x Despesa Escritório x Despesa Caixa, por mês
// Valores fixos (ano encerrado, não muda mais). Fonte: planilha de controle do cliente.
var DESEMP_2025 = {
  frei: [
    {mes:'JAN',rec:378216.52,escrit:230690.89,caixa:44947.58},
    {mes:'FEV',rec:364671.57,escrit:228500.97,caixa:42585.95},
    {mes:'MAR',rec:373576.70,escrit:232098.24,caixa:42611.00},
    {mes:'ABR',rec:381766.77,escrit:234654.09,caixa:46672.65},
    {mes:'MAI',rec:426529.17,escrit:250659.27,caixa:52124.39},
    {mes:'JUN',rec:391552.75,escrit:268520.05,caixa:49331.83},
    {mes:'JUL',rec:404891.43,escrit:280335.26,caixa:48731.22},
    {mes:'AGO',rec:388634.29,escrit:265351.15,caixa:44766.68},
    {mes:'SET',rec:376376.80,escrit:264907.30,caixa:44263.63},
    {mes:'OUT',rec:365253.15,escrit:251003.09,caixa:44828.97},
    {mes:'NOV',rec:316259.66,escrit:232947.80,caixa:36745.67},
    {mes:'DEZ',rec:339885.36,escrit:275649.65,caixa:36943.64}
  ],
  eliseu: [
    {mes:'JAN',rec:262968.09,escrit:135296.71,caixa:47750.86},
    {mes:'FEV',rec:238467.93,escrit:136422.76,caixa:42018.98},
    {mes:'MAR',rec:223630.82,escrit:129398.01,caixa:35656.43},
    {mes:'ABR',rec:241517.94,escrit:133210.77,caixa:39509.60},
    {mes:'MAI',rec:258557.11,escrit:146458.03,caixa:39286.69},
    {mes:'JUN',rec:229420.87,escrit:141532.85,caixa:37772.96},
    {mes:'JUL',rec:276140.61,escrit:162057.68,caixa:45144.46},
    {mes:'AGO',rec:249881.33,escrit:153825.53,caixa:38743.66},
    {mes:'SET',rec:258626.80,escrit:155292.10,caixa:39368.28},
    {mes:'OUT',rec:265909.22,escrit:158888.00,caixa:39480.64},
    {mes:'NOV',rec:216742.30,escrit:158806.46,caixa:32945.78},
    {mes:'DEZ',rec:218242.54,escrit:165462.86,caixa:30525.09}
  ],
  petronio: [
    {mes:'JAN',rec:261992.79,escrit:189243.35,caixa:28386.71},
    {mes:'FEV',rec:260547.82,escrit:200868.18,caixa:24577.20},
    {mes:'MAR',rec:288675.44,escrit:206293.00,caixa:28297.13},
    {mes:'ABR',rec:299815.59,escrit:213456.37,caixa:27702.13},
    {mes:'MAI',rec:331887.43,escrit:228989.62,caixa:28286.24},
    {mes:'JUN',rec:325401.94,escrit:226500.11,caixa:29040.31},
    {mes:'JUL',rec:296116.85,escrit:239972.90,caixa:26120.48},
    {mes:'AGO',rec:283399.86,escrit:227148.07,caixa:19565.51},
    {mes:'SET',rec:281234.27,escrit:225780.77,caixa:21228.95},
    {mes:'OUT',rec:294272.30,escrit:229131.20,caixa:19875.64},
    {mes:'NOV',rec:285564.62,escrit:217702.36,caixa:17878.77},
    {mes:'DEZ',rec:273593.84,escrit:233198.03,caixa:18352.21}
  ]
};

var CC_COR = {
  'Insumos':'#B8860B','Pessoal':'#C47A00','Adm':'#2E6B8A','Fiscal':'#6B1A1A',
  'Imóvel':'#1E6B3A','Tecnologia':'#4A6B8B','Logística':'#2E6B3A','Marketing':'#8B4A1A','Embalagens':'#7A6B2A',
  'Caixa':'#5A7A8B'
};

// Estado global
var STATE = {
  frei:    {dias:[], desp:[], despCx:[], whats:[], ifood:[], extras:[], despExtra:[], historico:[]},
  eliseu:  {dias:[], desp:[], despCx:[], whats:[], ifood:[], extras:[], despExtra:[], historico:[]},
  petronio:{dias:[], desp:[], despCx:[], whats:[], ifood:[], extras:[], despExtra:[], historico:[]},
  metaLucro:{}, metaWhats:{}, metaIfood:{}, repasseIfood:{}
};
var CHARTS = {}, FILIAL = 'frei', ORC_LOJA = 'frei', CANAL_TAB = 'whats';

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
  {loja:'Universitária',       mes:'Fev/2026',cc:'Equipamentos',conta:'Aquisição',item:'Forno Combinado',              valor:12500,cond:'6x',obs:'Aumento produção'},
  {loja:'Frei Serafim',   mes:'Fev/2026',cc:'Melhorias',   conta:'Reforma',  item:'Sistema de Som Ambiente',      valor:1800, cond:'1x',obs:'Experiência cliente'},
  {loja:'Eliseu Martins', mes:'Fev/2026',cc:'Segurança',   conta:'Aquisição',item:'Câmeras de Segurança (4un)',   valor:2400, cond:'2x',obs:'4 câmeras + DVR'},
  {loja:'Universitária',       mes:'Fev/2026',cc:'Equipamentos',conta:'Aquisição',item:'Balcão Refrigerado 1,5m',      valor:5500, cond:'4x',obs:'Exposição produtos'},
  {loja:'Todas',          mes:'Fev/2026',cc:'Tecnologia',  conta:'Licença',  item:'Sistema de PDV (3 lojas)',      valor:9800, cond:'12x',obs:'Licença anual'},
];

// ═══════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════
function el(id){return document.getElementById(id);}
function fmt(v){return 'R$\u202F'+Math.round(Number(v)||0).toLocaleString('pt-BR');}
function fmtK(v){var n=Math.round(Number(v)||0); return n>=1000?'R$\u202F'+(n/1000).toFixed(1).replace('.',',')+'k':'R$\u202F'+n;}
var _MESES_ABR=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
function dataMes(ds){
  var s=String(ds).trim(); var p=s.split(/[\/\-]/);
  if(p.length<3) return '';
  if(p[0].length===4){var yr=p[0];return(_MESES_ABR[parseInt(p[1])]||'?')+'/'+yr;} // ISO: YYYY-MM-DD
  var yr=p[2].length===2?'20'+p[2]:p[2]; // DD/MM/YY ou DD/MM/YYYY
  return(_MESES_ABR[parseInt(p[1])]||'?')+'/'+yr;
}
function normData(ds){
  var s=String(ds).trim().replace(/T[\d:.Z]+$/,''); // strip ISO time (ex: 2026-06-15T00:00:00.000Z)
  if(/^\d{4}/.test(s)){var p=s.split(/[\/\-]/);return p[2]+'/'+p[1]+'/'+p[0];}
  return s;
}
function diaNumDe(ds){ // extrai número do dia independente do formato
  var s=String(ds).trim();
  return /^\d{4}/.test(s)?parseInt(s.substring(8,10)):parseInt(s.substring(0,2));
}
function mesLabel(m){if(!m)return 'Todos os meses';var p=m.split('/');return p[0].charAt(0)+p[0].slice(1).toLowerCase()+'/'+p[1];}
function fmtP(v){return ((Number(v)||0)*100).toFixed(1).replace('.',',')+'\u00a0%';}
function num(v){if(!v||v===''||v==='-')return 0;return parseFloat(String(v).replace(/[R$\s]/g,'').replace(/\./g,'').replace(',','.'))||0;}
function rb(pct,cor,max){max=max||100;return '<div class="rb"><div class="rbf" style="width:'+Math.min(pct,max).toFixed(1)+'%;background:'+cor+'"></div></div>';}
function pill(ok,txt){return '<span class="pill '+(ok?'pill-ok':'pill-ko')+'">'+txt+'</span>';}
function destroyCharts(){Object.keys(CHARTS).forEach(function(k){try{CHARTS[k].destroy();}catch(e){}});CHARTS={};}
function dc(id){if(CHARTS[id]){try{CHARTS[id].destroy();}catch(e){} delete CHARTS[id];}}
function gF(id){var e=el(id);return e?e.value:'';}

function getDias(loja){
  var d=STATE[loja]?STATE[loja].dias:[];
  var fm=gF('f-mes'),fd=gF('f-dia');
  if(fm) d=d.filter(function(x){return x.mes===fm;});
  if(fd) d=d.filter(function(x){return x.dia_num===parseInt(fd);});
  return d;
}
function getDesp(loja){
  var d = (STATE[loja]?STATE[loja].desp:[]).slice();
  var cx = (STATE[loja]?STATE[loja].despCx:[]).map(function(x){
    return {data:x.data, mes:x.mes, forn:x.forn, val:x.val,
            cc:'Caixa', conta:'Despesa de Caixa', venc:x.data, cat:'Caixa', extra:false};
  });
  d = d.concat(cx);
  var fm = gF('f-mes'), fd = gF('f-dia');
  if(fm) d = d.filter(function(x){return x.mes===fm;});
  if(fd) d = d.filter(function(x){return diaNumDe(x.venc)===parseInt(fd);});
  return d;
}
function getExtrasTotal(loja){
  var d = (STATE[loja]?STATE[loja].extras:[]).slice();
  var fm = gF('f-mes'), fd = gF('f-dia');
  if(fm) d = d.filter(function(x){return x.mes===fm;});
  if(fd) d = d.filter(function(x){return diaNumDe(x.data)===parseInt(fd);});
  return d.reduce(function(s,x){return s+(x.total||0);},0);
}

// ═══════════════════════════════════════════════════════════════════════
// DADOS DE AMOSTRA — usados quando API indisponível
// ═══════════════════════════════════════════════════════════════════════
// ── Meta por dia da semana: replica exatamente AVERAGEIF($D:$D, dia, $K:$K)
// Só chama DEPOIS que STATE[loja].dias já tem dados com receita real
function getMetaDia(loja,wd){
  var a=ABAS[loja]; if(!a) return 0;
  if(wd==='SÁB') return a.metaSab;
  if(wd==='DOM') return a.metaDom||0;
  return a.metaSemFex;
}

function getMetaMensal(loja,mesAno){
  try{var s=localStorage.getItem('mp_metas_mensais');
    var mm=s?JSON.parse(s):{};
    if(mm[loja]&&mm[loja][mesAno]) return mm[loja][mesAno];
  }catch(e){}
  return ABAS[loja]?ABAS[loja].meta:0;
}

function calcMetasDia(diasArr,loja){
  if(loja&&ABAS[loja]){
    var wds=['SEG','TER','QUA','QUI','SEX','SÁB','DOM'],m={};
    wds.forEach(function(wd){m[wd]=getMetaDia(loja,wd);});
    return m;
  }
  var grupos={};
  diasArr.forEach(function(d){
    if(d.receita>0){if(!grupos[d.dia])grupos[d.dia]=[];grupos[d.dia].push(d.receita);}
  });
  var medias={};
  Object.keys(grupos).forEach(function(dw){
    var arr=grupos[dw];medias[dw]=arr.reduce(function(s,v){return s+v;},0)/arr.length;
  });
  return medias;
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
    return{data:dt, mes:dataMes(dt), dia:dias[i], dia_num:parseInt(dt.substring(0,2)),
      especie:Math.round(r*.08), cartao:Math.round(r*.50), pix:Math.round(r*.28),
      ifood:Math.round(r*.09), whats:Math.round(r*.05),
      despCx:Math.round(r*.04), receita:r, metaDia:0, bateu:false, fechado:r===0};
  });

  // Segunda passagem: calcula metaDia por AVERAGEIF (igual planilha)
  var medias = calcMetasDia(raw);
  return raw.map(function(d){
    var md = d.fechado ? 0 : Math.round(medias[d.dia] || 0);
    d.metaDia = md;
    d.bateu = d.receita > 0 && md > 0 && d.receita >= md;
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
function parseVendas(rows, loja){
  function gf(r,keys){
    for(var i=0;i<keys.length;i++){var v=r[keys[i]];if(v!==undefined&&v!==null&&v!=='')return v;}
    return '';
  }
  function toNum(v){
    if(typeof v==='number') return v;
    if(!v) return 0;
    return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.')) || 0;
  }
  function toMes(ds){
    var p=String(ds).trim().split(/[\/\-]/);
    if(p.length<3) return '';
    var mn,yr;
    if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}
    else{mn=parseInt(p[1]);yr=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return (ns[mn]||'')+'/'+yr;
  }
  var reData=/^\d{4}[\/\-]\d{2}|^\d{2}[\/\-]\d{2}/;
  var parsed=rows.filter(function(r){
    return reData.test(String(gf(r,['DATA'])||'').trim());
  }).map(function(r){
    var ds    = normData(String(gf(r,['DATA'])).trim());
    var dia   = String(gf(r,['DIA'])).trim().toUpperCase();
    var despCx= toNum(gf(r,['DESP CAIXA\n(R$)','DESP CAIXA (R$)','DESP/CAIXA (R$)','DESP/CAIXA']));
    var sang  = toNum(gf(r,['SANGRIA\n(R$)','SANGRIA (R$)','SANGRIA']));
    var cart  = toNum(gf(r,['CARTÃO\n(R$)','CARTÃO (R$)','CARTAO (R$)','CARTÃO']));
    var pix   = toNum(gf(r,['PIX\n(R$)','PIX (R$)','PIX']));
    var ifood = toNum(gf(r,['VEND ONLINE\n(R$)','IFOOD/VENDA ONLINE (R$)','IFOOD (R$)','VEND ONLINE (R$)','VENDA ONLINE (R$)','VENDA\nONLINE (R$)','ONLINE (R$)','VD ONLINE (R$)','VENDAS ONLINE (R$)']));
    var extras= toNum(gf(r,['VENDAS\nEXTRAS (R$)','VENDAS EXTRAS (R$)','VEND.EXTRAS (R$)']));
    var esp   = toNum(gf(r,['ESPÉCIE\n(R$)','ESPÉCIE (R$)','ESPECIE (R$)']));
    if(!esp && (despCx||sang)) esp = despCx + sang;
    var rec   = cart + pix + ifood + extras + esp;
    var totSheet = toNum(gf(r,['TOTAL\nDIA (R$)','TOTAL DIA (R$)','TOTAL DIA']));
    if(totSheet > 0) rec = totSheet;
    var metaSheet = toNum(gf(r,['META\nDIA (R$)','META DIA (R$)','META DIA']));
    var dn = parseInt(ds.split('/')[0]||'0');
    return {
      data:ds, dia:dia, dia_num:dn,
      despCx:despCx, sangria:sang,
      cartao:cart, pix:pix, ifood:ifood, extras:extras, especie:esp,
      receita:rec, metaDiaSheet:metaSheet, metaDia:0, bateu:false, fechado:rec===0,
      mes:toMes(ds)
    };
  });
  var medias=calcMetasDia(parsed,loja);
  return parsed.map(function(d){
    var md=d.metaDiaSheet>0?d.metaDiaSheet:(getMetaDia(loja,d.dia)||Math.round(medias[d.dia]||0));
    d.metaDia=md;
    d.bateu=d.receita>0&&md>0&&d.receita>=md;
    return d;
  });
}


function parseWhats(rows){
  function gf(r,keys){for(var i=0;i<keys.length;i++){var v=r[keys[i]];if(v!==undefined&&v!==null&&v!=='')return v;}return '';}
  function toNum(v){if(typeof v==='number')return v;if(!v)return 0;return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.'))||0;}
  function toMes(ds){
    var p=String(ds).trim().split(/[\/\-]/);
    if(p.length<3) return '';
    var mn,yr;
    if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}
    else{mn=parseInt(p[1]);yr=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return (ns[mn]||'')+'/'+yr;
  }
  var reData=/^\d{4}[\/\-]\d{2}|^\d{2}[\/\-]\d{2}/;
  return rows.filter(function(r){return reData.test(String(gf(r,['DATA'])||'').trim());})
    .map(function(r){
      var ds=normData(String(gf(r,['DATA'])).trim());
      var pix    =toNum(gf(r,['PIX (R$)','PIX\n(R$)','PIX']));
      var cartao =toNum(gf(r,['CARTÃO (R$)','CARTÃO\n(R$)','CARTAO (R$)','CARTÃO']));
      var especie=toNum(gf(r,['ESPÉCIE (R$)','ESPÉCIE\n(R$)','ESPECIE (R$)']));
      var total  =toNum(gf(r,['TOTAL (R$)','TOTAL\n(R$)','TOTAL']))||pix+cartao+especie;
      return {data:ds, mes:toMes(ds), pix:pix, cartao:cartao, especie:especie, total:total};
    });
}

function parseIfood(rows){
  function gf(r,keys){for(var i=0;i<keys.length;i++){var v=r[keys[i]];if(v!==undefined&&v!==null&&v!=='')return v;}return '';}
  function toNum(v){if(typeof v==='number')return v;if(!v)return 0;return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.'))||0;}
  function toMes(ds){
    var p=String(ds).trim().split(/[\/\-]/);
    if(p.length<3) return '';
    var mn,yr;
    if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}
    else{mn=parseInt(p[1]);yr=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return (ns[mn]||'')+'/'+yr;
  }
  var reData=/^\d{4}[\/\-]\d{2}|^\d{2}[\/\-]\d{2}/;
  return rows.filter(function(r){return reData.test(String(gf(r,['DATA'])||'').trim());})
    .map(function(r){
      var ds=normData(String(gf(r,['DATA'])).trim());
      return {
        data:ds, mes:toMes(ds),
        vendas:    toNum(gf(r,['VENDAS IFOOD (R$)','VENDAS IFOOD\n(R$)','VENDAS IFOOD'])),
        taxa:      toNum(gf(r,['TAXA IFOOD (R$)','TAXA IFOOD\n(R$)','TAXA IFOOD'])),
        cancelados:toNum(gf(r,['PEDIDOS\nCANCELADOS (R$)','PEDIDOS CANCELADOS (R$)'])),
        repasse:   toNum(gf(r,['REPASSE\nINCENTIVO (R$)','REPASSE INCENTIVO (R$)'])),
        resultado: toNum(gf(r,['RESULTADO\n(R$)','RESULTADO (R$)','RESULTADO'])),
      };
    });
}

function parseVendasExtras(rows){
  function gf(r,keys){for(var i=0;i<keys.length;i++){var v=r[keys[i]];if(v!==undefined&&v!==null&&v!=='')return v;}return '';}
  function toNum(v){if(typeof v==='number')return v;if(!v)return 0;return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.'))||0;}
  var PT_MES={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  var ABREV_MES=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
  var DATE_COLS=['DATA','MÊS/ANO','MES/ANO','MÊS','MES'];
  function toMes(ds){
    var up=String(ds).trim().toUpperCase();
    var parts=up.split(/[\s\/\-]+/);
    // "JANEIRO" ou "JANEIRO/2026"
    if(PT_MES[parts[0]]){
      var yr=parts[1]&&parts[1].length>=4?parts[1]:new Date().getFullYear().toString();
      return PT_MES[parts[0]]+'/'+yr;
    }
    // "JAN/2026" — já no formato correto
    if(ABREV_MES.indexOf(parts[0])>=0&&parts[1]&&parts[1].length>=4){
      return parts[0]+'/'+parts[1];
    }
    // data numérica DD/MM/YYYY ou YYYY-MM-DD
    var p=String(ds).trim().split(/[\/\-]/);
    if(p.length<3) return '';
    var mn,yr2;
    if(p[0].length===4){mn=parseInt(p[1]);yr2=p[0];}
    else{mn=parseInt(p[1]);yr2=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return (ns[mn]||'')+'/'+yr2;
  }
  function hasData(r){
    var v=String(gf(r,DATE_COLS)||'').trim().toUpperCase();
    if(!v) return false;
    var p0=v.split(/[\s\/\-]+/)[0];
    if(PT_MES[p0]||ABREV_MES.indexOf(p0)>=0) return true;
    return /^\d{4}[\/\-]\d{2}|^\d{2}[\/\-]\d{2}/.test(v);
  }
  return rows.filter(hasData).map(function(r){
    var raw=String(gf(r,DATE_COLS)||'').trim();
    var mes=toMes(raw);
    var total=toNum(gf(r,['TOTAL (R$)','TOTAL\n(R$)','VALOR (R$)','VALOR','TOTAL']));
    return {data:raw, mes:mes, total:total};
  }).filter(function(x){return x.total>0&&x.mes;});
}

function parseDespesas(rows){
  function gf(r,keys){
    for(var i=0;i<keys.length;i++){var v=r[keys[i]];if(v!==undefined&&v!==null&&v!=='')return v;}
    return '';
  }
  function toNum(v){
    if(typeof v==='number') return v;
    if(!v) return 0;
    return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.')) || 0;
  }
  function toMes(ds){
    var p=String(ds).trim().split(/[\/\-]/);
    if(p.length<3) return '';
    var mn,yr;
    if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}
    else{mn=parseInt(p[1]);yr=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return (ns[mn]||'')+'/'+yr;
  }
  var DATA_KEYS=['DATA','VENCIMENTO','EMISSÃO','EMISSAO','DATA DO LANÇAMENTO','DATA LANCAMENTO','DT PGTO'];
  var FORN_KEYS=['FORNECEDOR / DESCRIÇÃO','FORNECEDOR / DESCRICAO','FORNECEDOR \/ DESCRIÇÃO','FORNECEDOR','DESCRIÇÃO','DESCRICAO','ITEM','ITEM / DESCRIÇÃO','ITEM / DESCRICAO'];
  var VAL_KEYS =['VALOR (R$)','VALOR','CUSTO (R$)','CUSTO','TOTAL (R$)','TOTAL'];
  var reData=/^\d{4}[\/\-]\d{2}|^\d{2}[\/\-]\d{2}/;
  return rows.filter(function(r){
    return reData.test(String(gf(r,DATA_KEYS)||'').trim());
  }).map(function(r){
    var ds  =normData(String(gf(r,DATA_KEYS)).trim());
    var forn=gf(r,FORN_KEYS);
    var val =toNum(gf(r,VAL_KEYS));
    var tipo=String(gf(r,['TIPO'])||'').toUpperCase();
    var meta=String(gf(r,['ENTRA\nNA META?','ENTRA NA META?'])||'').toUpperCase();
    var extra=tipo==='EXTRA'||meta==='NÃO'||meta==='NAO'||meta==='NÃO';
    var cat  =gf(r,['CC','CATEGORIA','CENTRO DE CUSTO','CENTRO']);
    var conta=gf(r,['CONTA','SUBCATEGORIA','SUB','DESCRIÇÃO']);
    var forma=gf(r,['FORMA DE\nPAGAMENTO','FORMA DE PAGAMENTO','FORMA PGTO','PAGAMENTO']);
    return {data:ds, mes:toMes(ds), forn:forn, val:val, cc:cat, conta:conta, venc:ds, cat:cat, tipo:tipo, extra:extra, forma:forma};
  }).filter(function(d){return d.val>0;});
}

function parseDespExtras(rows){
  if(!rows.length) return [];
  function toNum(v){if(typeof v==='number')return v;if(!v)return 0;return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.'))||0;}
  var PT={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  function parseMes(raw){
    var s=String(raw||'').trim().toUpperCase();
    if(!s)return '';
    // "JANEIRO/2026", "JANEIRO 2026", "JAN/2026", "JAN 2026"
    var m=s.match(/^([A-ZÇÃÁÉÍÓÚ]+)[\/\s\-](\d{2,4})$/);
    if(m){var abr=PT[m[1]]||(m[1].length===3?m[1]:m[1].substring(0,3));var yr=m[2].length===2?'20'+m[2]:m[2];return abr+'/'+yr;}
    // Só nome por extenso: "JANEIRO", "FEVEREIRO" — usa ano corrente
    if(PT[s]) return PT[s]+'/'+new Date().getFullYear();
    // Só abreviado: "JAN", "FEV" — usa ano corrente
    var ABRS=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    if(s.length===3&&ABRS.indexOf(s)>=0) return s+'/'+new Date().getFullYear();
    // "01/2026" ou "2026/01"
    var p=s.split(/[\/\-]/);if(p.length>=2){
      var mn,yr;
      if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}else{mn=parseInt(p[0]);yr=p[1].length===2?'20'+p[1]:p[1];}
      var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
      if(ns[mn])return ns[mn]+'/'+yr;
    }
    return '';
  }
  function parseDataMes(raw){
    var s=String(raw||'').trim();
    var p=s.split(/[\/\-]/);
    if(p.length<3)return {ds:s,mes:parseMes(s)};
    var mn,yr;
    if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}else{mn=parseInt(p[1]);yr=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return {ds:normData(s),mes:(ns[mn]||'')+'/'+yr};
  }
  // auto-detecta colunas comparando com trim
  var allKeys=Object.keys(rows[0]);
  function findCol(cands){
    for(var i=0;i<cands.length;i++){
      var c=cands[i];
      if(allKeys.indexOf(c)>=0)return c;
      var f=allKeys.find(function(k){return k.trim()===c.trim();});
      if(f)return f;
    }
    return null;
  }
  var kDate =findCol(['DATA','VENCIMENTO','EMISSÃO','EMISSAO','DT PGTO']);
  var kMes  =findCol(['MÊS','MES','MÊS/ANO','MES/ANO']);
  var kForn =findCol(['FORNECEDOR / DESCRIÇÃO','FORNECEDOR / DESCRICAO','FORNECEDOR','DESCRIÇÃO','DESCRICAO','ITEM','ITEM / DESCRIÇÃO']);
  var kVal  =findCol(['VALOR (R$)','VALOR','VALORES','CUSTO (R$)','CUSTO','TOTAL (R$)','TOTAL']);
  var kCat  =findCol(['CC','CATEGORIA','CENTRO DE CUSTO','CENTRO']);
  var kConta=findCol(['CONTA','SUBCATEGORIA','SUB']);
  var kForma=findCol(['FORMA DE\nPAGAMENTO','FORMA DE PAGAMENTO','FORMA PGTO','PAGAMENTO']);
  var kObs  =findCol(['OBS','OBSERVAÇÃO','OBSERVACAO','OBSERVAÇÕES']);
  var dateKey=kDate||kMes;
  if(!dateKey||!kVal){console.warn('[parseDespExtras] colunas não encontradas: date='+dateKey+' val='+kVal);return [];}
  return rows.filter(function(r){
    var raw=String(r[dateKey]||'').trim();
    return raw&&!/^(data|mês|mes|venc)/i.test(raw);
  }).map(function(r){
    var raw=String(r[dateKey]||'').trim();
    var parsed=parseDataMes(raw);
    var forn=kForn?String(r[kForn]||'').trim():'';
    if(!forn&&kObs)forn=String(r[kObs]||'').trim();
    var val=toNum(r[kVal]);
    var cat=kCat?String(r[kCat]||'').trim():'';
    var conta=kConta?String(r[kConta]||'').trim():'';
    var forma=kForma?String(r[kForma]||'').trim():'';
    return {data:parsed.ds,mes:parsed.mes,forn:forn,val:val,cc:cat,conta:conta,venc:parsed.ds,cat:cat,tipo:'',extra:false,forma:forma};
  }).filter(function(d){return d.val>0&&d.mes;});
}

function parseDespCaixa(rows){
  function gf(r,keys){
    for(var i=0;i<keys.length;i++){var v=r[keys[i]];if(v!==undefined&&v!==null&&v!=='')return v;}
    return '';
  }
  function toNum(v){
    if(typeof v==='number') return v;
    if(!v) return 0;
    return parseFloat(String(v).replace(/[R$\s.]/g,'').replace(',','.')) || 0;
  }
  function toMes(ds){
    var p=String(ds).trim().split(/[\/\-]/);
    if(p.length<3) return '';
    var mn,yr;
    if(p[0].length===4){mn=parseInt(p[1]);yr=p[0];}
    else{mn=parseInt(p[1]);yr=p[2].length===2?'20'+p[2]:p[2];}
    var ns=['','JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    return (ns[mn]||'')+'/'+yr;
  }
  var reData=/^\d{4}[\/\-]\d{2}|^\d{2}[\/\-]\d{2}/;
  return rows.filter(function(r){
    return reData.test(String(gf(r,['DATA','data'])||'').trim());
  }).map(function(r){
    var ds=normData(String(gf(r,['DATA','data'])).trim());
    return {
      data:ds, mes:toMes(ds),
      forn:gf(r,['FORNECEDOR / DESCRIÇÃO','FORNECEDOR / DESCRICAO','FORNECEDOR','fornecedor']),
      val:toNum(gf(r,[' VALOR (R$)','VALOR (R$)','VALOR','valor'])),
      forma:gf(r,['FORMA DE PGTO.','FORMA DE PAGAMENTO','FORMA DE\nPAGAMENTO','forma de pagamento']),
      obs:gf(r,['OBSERVAÇÃO','OBSERVACAO','OBS','obs']),
      extra:false
    };
  }).filter(function(d){return d.val>0;});
}



// Aba "historico <loja>": MÊS | RECEITA 2025 | DESPESA 2025 | % LUCRO 2025 | RECEITA 2026 | DESPESA 2026 | % LUCRO 2026
function parseHistorico(rows){
  function toNum(v){
    if(typeof v==='number') return v;
    if(!v) return 0;
    return parseFloat(String(v).replace(/[R$\s]/g,'').replace(/\./g,'').replace(',','.'))||0;
  }
  return rows.map(function(r){
    var mes=String(r['A']||'').trim().toUpperCase().substring(0,3);
    return{
      mes:mes,
      rec25:toNum(r['RECEITA 2025']), desp25:toNum(r['DESPESA 2025']),
      rec26:toNum(r['RECEITA 2026']), desp26:toNum(r['DESPESA 2026'])
    };
  }).filter(function(x){return x.mes && (x.rec25>0||x.rec26>0);});
}

function parseMetaLucro(rows){
  // [{"MÊS":"JAN","FREI SERAFIM":"20%","ELISEU MARTINS":"15%","UNIVERSITÁRIA":"22%"}, ...]
  function pct(v){ if(typeof v==='number') return v; return parseFloat(String(v||'0').replace('%','').replace(',','.'))/100||0; }
  var map={};
  rows.forEach(function(r){
    var mes=String(r['MÊS']||'').trim().toUpperCase();
    if(!mes) return;
    map[mes]={
      frei:    pct(r['FREI SERAFIM']),
      eliseu:  pct(r['ELISEU MARTINS']),
      petronio:pct(r['UNIVERSITÁRIA']||r['UNIVERSITARIA'])
    };
  });
  return map; // {JAN:{frei:0.20,...}, FEV:{...}}
}

function parseMetaWhats(rows){
  function toNum(v){ if(typeof v==='number')return v; return parseFloat(String(v||'0').replace(/[R$\s.]/g,'').replace(',','.'))||0; }
  var PT={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  var map={};
  rows.forEach(function(r){
    var raw=String(r['MÊS']||r['MES']||'').trim().toUpperCase();
    if(!raw) return;
    var part=raw.split('/')[0];
    var mes=PT[part]||part;
    if(!mes) return;
    map[mes]={
      frei:    toNum(r['FREI SERAFIM']),
      eliseu:  toNum(r['ELISEU MARTINS']),
      petronio:toNum(r['UNIVERSITÁRIA']||r['UNIVERSITARIA'])
    };
  });
  return map;
}

function parseMetaIfood(rows){
  function toNum(v){ if(typeof v==='number')return v; return parseFloat(String(v||'0').replace(/[R$\s.]/g,'').replace(',','.'))||0; }
  var PT={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  var map={};
  rows.forEach(function(r){
    var raw=String(r['MÊS']||r['MES']||'').trim().toUpperCase();
    if(!raw) return;
    var part=raw.split('/')[0];
    var mes=PT[part]||part;
    if(!mes) return;
    map[mes]={
      frei:    toNum(r['FREI SERAFIM']),
      eliseu:  toNum(r['ELISEU MARTINS']),
      petronio:toNum(r['UNIVERSITÁRIA']||r['UNIVERSITARIA'])
    };
  });
  return map;
}

// Get meta for loja/mes from STATE maps
function getMetaLucro(loja, mesAbrev){
  if(STATE.metaLucro && STATE.metaLucro[mesAbrev] && STATE.metaLucro[mesAbrev][loja] !== undefined)
    return STATE.metaLucro[mesAbrev][loja];
  return ABAS[loja] ? ABAS[loja].metaLucro : 0;
}

function getMetaWhats(loja, mesAbrev){
  if(STATE.metaWhats && STATE.metaWhats[mesAbrev] && STATE.metaWhats[mesAbrev][loja])
    return STATE.metaWhats[mesAbrev][loja];
  return ABAS[loja] ? ABAS[loja].metaWhats : 0;
}

function getMetaIfood(loja, mesAbrev){
  if(STATE.metaIfood && STATE.metaIfood[mesAbrev] && STATE.metaIfood[mesAbrev][loja])
    return STATE.metaIfood[mesAbrev][loja];
  return 0;
}

// Convert "JAN/2026" → "JAN"
function mesAbrev(mesAno){
  if(!mesAno) return '';
  return String(mesAno).split('/')[0].toUpperCase();
}


function fetchSheet(sheet, skipCache){
  var key='mp_'+sheet;
  var now=Date.now();
  if(!skipCache){
    try{
      var c=JSON.parse(sessionStorage.getItem(key)||'null');
      if(c&&(now-c.ts)<30*60*1000){console.log('[CACHE] '+sheet);return Promise.resolve(c.data);}
    }catch(e){}
  }
  // JSONP via injeção de <script> — contorna CORS quando aberto como file://
  return new Promise(function(resolve,reject){
    var cb='_gv'+Date.now()+'_'+Math.floor(Math.random()*1e6);
    var sc=document.createElement('script');
    var tid=setTimeout(function(){cleanup();reject(new Error('timeout: '+sheet));},20000);
    function cleanup(){clearTimeout(tid);delete window[cb];if(sc.parentNode)sc.parentNode.removeChild(sc);}
    window[cb]=function(resp){
      cleanup();
      try{
        if(resp.status==='error')throw new Error('gviz: '+(resp.errors&&resp.errors[0]&&resp.errors[0].message||'erro'));
        if(!resp.table)throw new Error('gviz: sem tabela');
        var cols=resp.table.cols.map(function(c){return c.label||c.id||'';});
        var data=(resp.table.rows||[]).map(function(row){
          var obj={};
          (row.c||[]).forEach(function(cell,i){
            if(!cols[i])return;
            var v=cell?cell.v:null;
            if(v===null||v===undefined){obj[cols[i]]='';return;}
            // Datas chegam como objeto Date (JSONP) ou string "Date(y,m,d)" (JSON)
            if(v instanceof Date){
              var yr=v.getFullYear(),mo=v.getMonth()+1,dy=v.getDate();
              v=yr+'-'+(mo<10?'0':'')+mo+'-'+(dy<10?'0':'')+dy;
            }else if(typeof v==='string'&&v.indexOf('Date(')===0){
              var mt=v.match(/Date\((\d+),(\d+),(\d+)\)/);
              if(mt){var mo2=parseInt(mt[2])+1;v=mt[1]+'-'+(mo2<10?'0':'')+mo2+'-'+(parseInt(mt[3])<10?'0':'')+parseInt(mt[3]);}
            }
            obj[cols[i]]=v;
          });
          return obj;
        });
        try{sessionStorage.setItem(key,JSON.stringify({ts:now,data:data}));}catch(e){}
        resolve(data);
      }catch(e){reject(e);}
    };
    sc.onerror=function(){cleanup();reject(new Error('load error: '+sheet));};
    sc.src='https://docs.google.com/spreadsheets/d/'+GSHEET_ID+'/gviz/tq?tqx=responseHandler:'+cb+'&sheet='+encodeURIComponent(sheet);
    document.head.appendChild(sc);
  });
}


function parseCategorias(rows){
  var map={};
  if(!rows.length) return map;
  var keys=Object.keys(rows[0]);
  // sem cabeçalho: gviz devolve A, B, C... — usa posição (A=fornecedor, B=categoria)
  // com cabeçalho: detecta pelo nome
  var kForn=keys.find(function(k){return /fornecedor/i.test(k);})||keys[0]||'A';
  var kCat =keys.find(function(k){return /categor/i.test(k);})||keys[1]||'B';
  rows.forEach(function(r){
    var forn=String(r[kForn]||'').trim().toUpperCase();
    var cat =String(r[kCat] ||'').trim();
    if(forn && cat) map[forn]=cat;
  });
  return map;
}


function parseMetaWhats(rows){
  function toNum(v){ if(typeof v==='number')return v; return parseFloat(String(v||'0').replace(/[R$\s.]/g,'').replace(',','.'))||0; }
  var PT={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  var result={};
  rows.forEach(function(r){
    var raw=String(r['MÊS']||r['MES']||'').trim().toUpperCase();
    if(!raw) return;
    var part=raw.split('/')[0];
    var mes=PT[part]||part;
    if(!mes) return;
    result[mes]={frei:toNum(r['FREI SERAFIM']),eliseu:toNum(r['ELISEU MARTINS']),petronio:toNum(r['UNIVERSITÁRIA']||r['UNIVERSITARIA'])};
  });
  return result;
}

function parseMetaIfood(rows){
  function toNum(v){ if(typeof v==='number')return v; return parseFloat(String(v||'0').replace(/[R$\s.]/g,'').replace(',','.'))||0; }
  var PT={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  var result={};
  rows.forEach(function(r){
    var raw=String(r['MÊS']||r['MES']||'').trim().toUpperCase();
    if(!raw) return;
    var part=raw.split('/')[0]; // "JAN/2026" → "JAN" ou "JANEIRO/2026" → "JANEIRO"
    var mes=PT[part]||part;    // "JANEIRO" → "JAN", "JAN" → "JAN"
    if(!mes) return;
    result[mes]={frei:toNum(r['FREI SERAFIM']),eliseu:toNum(r['ELISEU MARTINS']),petronio:toNum(r['UNIVERSITÁRIA']||r['UNIVERSITARIA'])};
  });
  return result;
}

function parseRepasseIfood(rows){
  function toNum(v){ if(typeof v==='number')return v; return parseFloat(String(v||'0').replace(/[R$\s.]/g,'').replace(',','.'))||0; }
  var PT={'JANEIRO':'JAN','FEVEREIRO':'FEV','MARÇO':'MAR','MARCO':'MAR','ABRIL':'ABR',
    'MAIO':'MAI','JUNHO':'JUN','JULHO':'JUL','AGOSTO':'AGO','SETEMBRO':'SET',
    'OUTUBRO':'OUT','NOVEMBRO':'NOV','DEZEMBRO':'DEZ'};
  var result={};
  rows.forEach(function(r){
    var raw=String(r['MÊS']||r['MES']||r['MES/ANO']||r['MÊS/ANO']||'').trim().toUpperCase();
    if(!raw) return;
    var parts=raw.split(/[\s\/\-]+/);
    var mes=PT[parts[0]]||parts[0];
    if(!mes) return;
    var frei    =toNum(r['FREI SERAFIM']||r['FREI']);
    var eliseu  =toNum(r['ELISEU MARTINS']||r['ELISEU']);
    var petronio=toNum(r['UNIVERSITÁRIA']||r['UNIVERSITARIA']||r['PETRONIO']);
    result[mes]={frei:frei,eliseu:eliseu,petronio:petronio};
  });
  return result;
}

function carregarTudo(fresh){
  if(fresh){
    try{Object.keys(sessionStorage).filter(function(k){return k.startsWith('mp_');}).forEach(function(k){sessionStorage.removeItem(k);});}catch(e){}
    console.log('[CACHE] limpo – buscando dados frescos');
  }
  var lojas=['frei','eliseu','petronio'];
  el('h-upd').textContent='Carregando...';

  // Carrega parâmetros da ADM Geral
  // Carrega lojas sequencialmente (evita rate limit)
  function delay(ms){return new Promise(function(r){setTimeout(r,ms);});}

  function carregarLoja(l){
    return Promise.all([
      fetchSheet(ABAS[l].v).then(function(rows){
        console.log('[RAW] vendas '+l+': '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
        if(rows[0]) console.log('[RAW] vendas '+l+' row0:', JSON.stringify(rows[0]));
        var p=parseVendas(rows,l);
        var meses=[...new Set(p.map(function(d){return d.mes;}))].join(',');
        console.log('[PARSED] vendas '+l+': '+p.length+' dias | meses: '+meses+(p[0]?' | dia0 receita='+p[0].receita+' cart='+p[0].cartao+' pix='+p[0].pix:''));
        return p;
      }).catch(function(e){console.warn('[API] vendas '+l+' falhou:',e);return null;}),
      fetchSheet(ABAS[l].d).then(function(rows){
        console.log('[RAW] desp '+l+': '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
        var p=parseDespesas(rows);
        console.log('[PARSED] desp '+l+': '+p.length+' lançamentos');
        return p;
      }).catch(function(e){console.warn('[API] desp '+l+' falhou:',e);return[];}),
      fetchSheet(ABAS[l].i).then(parseIfood).catch(function(e){console.warn('[API] ifood '+l+' falhou:',e);return[];}),
      fetchSheet(ABAS[l].w).then(function(rows){
        console.log('[RAW] whats '+l+': '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
        var p=parseWhats(rows);
        console.log('[PARSED] whats '+l+': '+p.length+' registros');
        return p;
      }).catch(function(e){console.warn('[API] whats '+l+' falhou:',e);return[];}),
      fetchSheet(ABAS[l].ve).then(function(rows){
        console.log('[RAW] extras '+l+': '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
        var p=parseVendasExtras(rows);
        console.log('[PARSED] extras '+l+': '+p.length+' registros');
        return p;
      }).catch(function(e){console.warn('[API] extras '+l+' falhou:',e);return[];}),
      fetchSheet(ABAS[l].de).then(function(rows){
        console.log('[RAW] despExtra '+l+': '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
        var p=parseDespExtras(rows);
        console.log('[PARSED] despExtra '+l+': '+p.length+' lançamentos');
        return p;
      }).catch(function(e){console.warn('[API] despExtra '+l+' falhou:',e);return[];}),
      fetchSheet(ABAS[l].hist).then(function(rows){
        var p=parseHistorico(rows);
        console.log('[PARSED] historico '+l+': '+p.length+' meses');
        return p;
      }).catch(function(e){console.warn('[API] historico '+l+' falhou:',e);return[];})
    ]);
  }

  function processarLoja(l,res){
    var dias           = res[0]&&res[0].length ? res[0] : null;
    var despExtrasRows = res[5]||[];
    var desp           = (res[1]||[]);
    var ifoodRows      = res[2]||[];
    var whatsRows      = res[3]||[];
    var extrasRows     = res[4]||[];
    var historicoRows  = res[6]||[];
    if(!dias){ console.warn('[Dashboard] '+l+': sem dados – usando amostra'); }
    else console.log('[Dashboard] '+l+': '+dias.length+' dias carregados');
    STATE[l].dias      = dias || getSampleDias(l);
    STATE[l].desp      = desp.length ? desp : getSampleDesp(l);
    STATE[l].despCx    = [];
    STATE[l].ifood     = ifoodRows;
    STATE[l].whats     = whatsRows;
    STATE[l].extras    = extrasRows;
    STATE[l].despExtra = despExtrasRows;
    STATE[l].historico = historicoRows;
  }

  // Carrega ADM Geral primeiro, depois inicia lojas
  Promise.all([
    fetchSheet('META % LUCRO').then(parseMetaLucro).catch(function(){return{};}),
    fetchSheet('META WHATS').then(parseMetaWhats).catch(function(){return{};}),
    fetchSheet('META IFOOD').then(function(rows){
      console.log('[RAW] metaIfood: '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
      var p=parseMetaIfood(rows);
      console.log('[PARSED] metaIfood keys: '+Object.keys(p).join(',')+(Object.keys(p)[0]?' | ex: '+JSON.stringify(p[Object.keys(p)[0]]):''));
      return p;
    }).catch(function(e){console.error('[ERROR] META IFOOD: '+e);return{};}),
    fetchSheet('CATEGORIAS').then(parseCategorias).catch(function(){return{};}),
    fetchSheet('REPASSE INC. IFOOD').then(function(rows){
      console.log('[RAW] repasse: '+rows.length+' rows'+(rows[0]?' | cols: '+Object.keys(rows[0]).join(' | '):''));
      var p=parseRepasseIfood(rows);
      console.log('[PARSED] repasse meses: '+Object.keys(p).join(','));
      return p;
    }).catch(function(){return{};})
  ]).then(function(res){
    STATE.metaLucro    = res[0];
    STATE.metaWhats    = res[1];
    STATE.metaIfood    = res[2];
    STATE.categorias   = res[3]||{};
    STATE.repasseIfood = res[4];
  }).catch(function(){}).then(function(){
    var idx=0;
    function next(){
      if(idx>=lojas.length){
        var now=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
        el('h-upd').textContent='Atualizado às '+now;
        var fMes=el('f-mes');
        if(fMes&&typeof buildMesOpts==='function'){
          var cur=fMes.value;
          var optsHtml=buildMesOpts();
          console.log('[FILTRO] frei.dias='+STATE.frei.dias.length+' | opts html='+optsHtml.substring(0,200));
          fMes.innerHTML='<option value="">Todos os meses</option>'+optsHtml;
          var found=Array.from(fMes.options).some(function(o){return o.value===cur;});
          if(!found||!cur){
            // sem seleção prévia válida: seleciona o mês atual; se não disponível, o mais recente com dados
            var hoje=new Date();
            var mesPad=_MESES_ABR[hoje.getMonth()+1]+'/'+hoje.getFullYear();
            var idxAtual=Array.from(fMes.options).findIndex(function(o){return o.value===mesPad;});
            if(idxAtual>=0) fMes.selectedIndex=idxAtual;
            else if(fMes.options.length>1) fMes.selectedIndex=fMes.options.length-1;
          } else { fMes.value=cur; }
        }
        renderAll();
        return;
      }
      var l=lojas[idx++];
      carregarLoja(l).then(function(res){
        processarLoja(l,res);
        return delay(1000);
      }).then(next);
    }
    next();
  });

  if(AUTO_T) clearInterval(AUTO_T);
  AUTO_T=setInterval(carregarTudo,43200000);
}

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
      +'<button class="tab" onclick="showTab(\'canais\',this)">📱 Canais Digitais</button>'
      +'<button class="tab" onclick="showTab(\'investimentos\',this)">🔧 Despesas Extras</button>'
      +'<button class="tab" onclick="showTab(\'dre\',this)">📋 Resultado</button>';
  } else {
    html = '<button class="tab act" onclick="showTab(\'vendas\',this)">📈 Vendas & Meta</button>';
  }
  el('tab-bar').innerHTML = html;
}

function atualizarFiltroMes(){
  var sel = el('f-mes'); if(!sel) return;
  var cur = sel.value;
  var set = {};
  ['frei','eliseu','petronio'].forEach(function(l){
    (STATE[l].dias||[]).forEach(function(d){if(d.mes) set[d.mes]=true;});
    (STATE[l].desp||[]).forEach(function(d){if(d.mes) set[d.mes]=true;});
  });
  var sorted = Object.keys(set).sort(function(a,b){
    var pa=a.split('/'),pb=b.split('/');
    var dy=parseInt(pa[1])-parseInt(pb[1]);
    return dy!==0?dy:_MESES_ABR.indexOf(pa[0])-_MESES_ABR.indexOf(pb[0]);
  });
  sel.innerHTML = '<option value="">Todos os meses</option>'
    +sorted.map(function(m){return '<option value="'+m+'"'+(m===cur?' selected':'')+'>'+mesLabel(m)+'</option>';}).join('');
}

function buildMesOpts(){
  var ORDEM={JAN:1,FEV:2,MAR:3,ABR:4,MAI:5,JUN:6,JUL:7,AGO:8,SET:9,OUT:10,NOV:11,DEZ:12};
  var meses={};
  ['frei','eliseu','petronio'].forEach(function(l){
    (STATE[l]?STATE[l].dias:[]).forEach(function(d){if(d.mes)meses[d.mes]=true;});
  });
  return Object.keys(meses).sort(function(a,b){
    var pa=a.split('/'),pb=b.split('/');
    var ya=parseInt(pa[1]||0),yb=parseInt(pb[1]||0);
    if(ya!==yb)return ya-yb;
    return(ORDEM[pa[0]]||0)-(ORDEM[pb[0]]||0);
  }).map(function(m){
    var p=m.split('/');
    return '<option value="'+m+'">'+p[0].charAt(0)+p[0].slice(1,3).toLowerCase()+'/'+p[1]+'</option>';
  }).join('');
}

function buildFilters(){
  var isOwner = CUR.role === 'owner';
  var diasOpts = '<option value="">Todos os dias</option>';
  for(var i=1;i<=31;i++) diasOpts += '<option value="'+i+'">'+i+'</option>';
  var mesOpts = '<option value="">Carregando...</option>';

  var html = '';
  if(isOwner){
    html += '<span class="flbl">Filial:</span><select id="f-filial" onchange="trocarFilial(this.value)">'
      +'<option value="frei">Frei Serafim</option>'
      +'<option value="eliseu">Eliseu Martins</option>'
      +'<option value="petronio">Universitária</option>'
      +'</select>';
  }
  html += '<span class="flbl">Mês:</span><select id="f-mes" onchange="renderAll()">'+mesOpts+'</select>';
  html += '<span class="flbl">Dia:</span><select id="f-dia" onchange="renderAll()">'+diasOpts+'</select>';
  html += '<button class="refresh-btn" onclick="carregarTudo(true)">↻ Atualizar</button>';
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
    h += '<div id="pane-canais" class="pane"><div class="main" id="m-canais"></div></div>';
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
    renderCanais();
    renderInvestimentos();
    renderDRE();
  }
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER VENDAS — gerente vê só sua loja; proprietário vê via filtro
// ═══════════════════════════════════════════════════════════════════════
function calcLucro(loja, diasArr){
  var a=ABAS[loja];
  var fm=gF('f-mes'), fd=gF('f-dia');
  // fórmula idêntica à DRE para garantir consistência
  var desp=(STATE[loja]?STATE[loja].desp:[]).slice();
  var ifoodRows=(STATE[loja]?STATE[loja].ifood:[]).slice();
  if(fm){
    desp=desp.filter(function(d){return d.mes===fm;});
    ifoodRows=ifoodRows.filter(function(x){return x.mes===fm;});
  }
  if(fd){
    desp=desp.filter(function(d){return diaNumDe(d.venc)===parseInt(fd);});
    ifoodRows=ifoodRows.filter(function(x){return diaNumDe(x.data)===parseInt(fd);});
  }
  var lojaFis=0, vendaOnline=0, totDespCx=0;
  diasArr.forEach(function(d){
    lojaFis    +=(d.especie||0)+(d.cartao||0)+(d.pix||0);
    vendaOnline+=(d.ifood||0);
    totDespCx  +=(d.despCx||0);
  });
  var extrasRows=(STATE[loja]?STATE[loja].extras||[]:[]).slice();
  if(fm) extrasRows=extrasRows.filter(function(x){return x.mes===fm;});
  if(fd) extrasRows=extrasRows.filter(function(x){return diaNumDe(x.data)===parseInt(fd);});
  var totExtras=extrasRows.reduce(function(s,x){return s+(x.total||0);},0);
  var repasse=(function(){
    if(fd) return 0; // repasse só existe em granularidade mensal, não por dia
    if(fm){var ma2=fm.split('/')[0].toUpperCase();return (STATE.repasseIfood&&STATE.repasseIfood[ma2]&&STATE.repasseIfood[ma2][loja])||0;}
    return Object.keys(STATE.repasseIfood||{}).reduce(function(s,k){return s+((STATE.repasseIfood[k]&&STATE.repasseIfood[k][loja])||0);},0);
  })();
  var sumIfoodTab=ifoodRows.reduce(function(s,x){return s+(x.vendas||0);},0);
  var totIfood=sumIfoodTab>0?sumIfoodTab:vendaOnline;
  var totEscrit=desp.reduce(function(s,d){return s+(d.val||0);},0);
  var totRec=lojaFis+totIfood+totExtras+repasse;
  var lucro=totRec-totEscrit-totDespCx;
  var pctLucro=totRec>0?lucro/totRec:0;
  var ma=fm?fm.split('/')[0].toUpperCase():'';
  var metaLucro=(function(){
    if(ma&&STATE.metaLucro){
      var lk=loja==='frei'?'frei':loja==='eliseu'?'eliseu':'petronio';
      if(STATE.metaLucro[ma]&&STATE.metaLucro[ma][lk]) return STATE.metaLucro[ma][lk];
    }
    return ABAS[loja].metaLucro||0;
  })();
  return{
    receita:totRec,lucro:lucro,pctLucro:pctLucro,
    metaLucro:metaLucro,
    totDesp:totEscrit,totDespCx:totDespCx,
    projecao:0,pctProj:0,lucroProj:0,
    bateuLucro:pctLucro>=(getMetaLucro(loja,ma)||a.metaLucro||0)
  };
}

function fmtPct2(v){return((v||0)*100).toFixed(1).replace('.',',')+' %';}

// Plugin Chart.js: desenha o valor acima de cada coluna
var VAL_LABELS_PLUGIN = {
  id:'valLabels',
  afterDatasetsDraw:function(chart){
    var ctx=chart.ctx;
    ctx.save();
    ctx.font='700 8px sans-serif';
    ctx.fillStyle='#7A5C28';
    ctx.textAlign='center';
    ctx.textBaseline='bottom';
    chart.data.datasets.forEach(function(ds,i){
      var meta=chart.getDatasetMeta(i);
      if(meta.hidden) return;
      meta.data.forEach(function(bar,idx){
        var v=ds.data[idx];
        if(!v) return;
        ctx.fillText('R$'+(v/1000).toFixed(0)+'k', bar.x, bar.y-3);
      });
    });
    ctx.restore();
  }
};

var _ORDEM_MES={JAN:1,FEV:2,MAR:3,ABR:4,MAI:5,JUN:6,JUL:7,AGO:8,SET:9,OUT:10,NOV:11,DEZ:12};

// Receita mensal real (STATE[loja].dias) restrita ao ano de 2026
function getHistMensal2026(loja){
  var dias=(STATE[loja]&&STATE[loja].dias)||[];
  var porMes={};
  dias.filter(function(d){return !d.fechado&&d.mes;}).forEach(function(d){
    var p=d.mes.split('/');
    if(p[1]!=='2026') return;
    porMes[p[0]]=(porMes[p[0]]||0)+(d.receita||0);
  });
  var mn=Object.keys(porMes).sort(function(a,b){return(_ORDEM_MES[a]||0)-(_ORDEM_MES[b]||0);});
  return{
    labels:mn.map(function(m){return m.charAt(0)+m.slice(1).toLowerCase()+'/26';}),
    data:mn.map(function(m){return porMes[m];})
  };
}

// Mesmo cálculo, para as 3 lojas juntas (união dos meses de 2026 com dados)
function getHistMensal2026Todas(){
  var porLoja={frei:{},eliseu:{},petronio:{}};
  ['frei','eliseu','petronio'].forEach(function(l){
    ((STATE[l]&&STATE[l].dias)||[]).filter(function(d){return !d.fechado&&d.mes;}).forEach(function(d){
      var p=d.mes.split('/');
      if(p[1]!=='2026') return;
      porLoja[l][p[0]]=(porLoja[l][p[0]]||0)+(d.receita||0);
    });
  });
  var allMn={};
  ['frei','eliseu','petronio'].forEach(function(l){Object.keys(porLoja[l]).forEach(function(m){allMn[m]=true;});});
  var mn=Object.keys(allMn).sort(function(a,b){return(_ORDEM_MES[a]||0)-(_ORDEM_MES[b]||0);});
  var data={};
  ['frei','eliseu','petronio'].forEach(function(l){data[l]=mn.map(function(m){return porLoja[l][m]||0;});});
  return{
    labels:mn.map(function(m){return m.charAt(0)+m.slice(1).toLowerCase()+'/26';}),
    data:data
  };
}

function renderVendas(){
  var loja = FILIAL;
  var rawDias = STATE[loja]?STATE[loja].dias:[];
  var ev = el('m-vendas'); if(!ev) return;
  if(!rawDias.length){ev.innerHTML='<div class="loading"><div class="spin"></div><div>Carregando dados...</div></div>';return;}

  var allDias = getDias(loja); // já respeita os filtros de Ano/Mês/Dia selecionados
  if(!allDias.length){ev.innerHTML='<div class="loading"><div>Nenhum dado para o período selecionado.</div></div>';return;}

  var diasOp = allDias.filter(function(d){return !d.fechado;});

  var totR=0,totE=0,totC=0,totP=0,totI=0,totW=0,totDC=0;
  diasOp.forEach(function(d){totR+=d.receita;totE+=d.especie;totC+=d.cartao;totP+=d.pix;totI+=d.ifood;totW+=d.whats;totDC+=d.despCx;});

  var totExtras = getExtrasTotal(loja);
  var totFat = totR + totExtras;

  var nOk = diasOp.filter(function(d){return d.bateu;}).length;
  var metaM = ABAS[loja].meta;
  var pct = metaM>0 ? totR/metaM : 0; // meta não considera vendas extras
  var ticket = diasOp.length ? totR/diasOp.length : 0;
  var cor = ABAS[loja].cor;

  el('h-badge').textContent = ABAS[loja].label+' · '+fmtP(pct)+' meta';
  el('h-badge').className = 'badge '+(pct>=1?'b-ok':'b-gold');
  el('h-period').textContent = gF('f-mes') ? mesLabel(gF('f-mes')) : (allDias.length ? dataMes(allDias[0].data)+' – '+dataMes(allDias[allDias.length-1].data) : '—');

  var canais = [
    {l:'Espécie',v:totE,c:'#8B6200'},
    {l:'Cartão',v:totC,c:cor},
    {l:'PIX',v:totP,c:'#1E6B3A'},
    {l:'iFood',v:totI,c:'#C62828'},
    {l:'WhatsApp',v:totW,c:'#0A7040'},
    {l:'Vendas Extras',v:totExtras,c:'#6B4A9B'},
  ].filter(function(x){return x.v>0;});

  var canaisHtml = canais.map(function(c){
    var w = totFat>0?((c.v/totFat)*100).toFixed(1):0;
    return '<div class="canal-row"><div class="canal-name">'+c.l+'</div>'
      +'<div class="canal-track"><div class="canal-fill" style="width:'+w+'%;background:'+c.c+'">'
      +'<span>'+fmtP(c.v/(totFat||1))+'</span></div></div>'
      +'<div class="canal-val">'+fmt(c.v)+'</div></div>';
  }).join('');

  var topDias = [].concat(diasOp).sort(function(a,b){return b.receita-a.receita;}).slice(0,7)
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

  var diasOpArr=diasOp.filter?diasOp:diasFiltrados.filter(function(d){return !d.fechado;});
  var L=calcLucro(loja,diasOpArr);
  var lucroKpi=CUR.role==='owner'?(
    '<div class="kpi" style="--kt:'+(L.bateuLucro?'var(--grn)':'var(--red)')+'">'
    +'<div class="kpi-label">Lucro do Mês</div>'
    +'<div class="kpi-val" style="color:'+(L.bateuLucro?'var(--grn)':'var(--red)')+'">'+fmt(L.lucro)+'</div>'
    +'</div>'
  ):'';

  // ── Meta cards: dia / semana / mês ──────────────────────────────────
  var dwNames = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];
  var dwFull  = {DOM:'Domingo',SEG:'Segunda-feira',TER:'Terça-feira',QUA:'Quarta-feira',QUI:'Quinta-feira',SEX:'Sexta-feira','SÁB':'Sábado'};
  var todayDW  = dwNames[new Date().getDay()];
  var metaHoje = getMetaDia(loja, todayDW);
  var metaSemana = ['SEG','TER','QUA','QUI','SEX'].reduce(function(s,d){return s+getMetaDia(loja,d);},0)
                 + getMetaDia(loja,'SÁB');
  var metaCards = ''
    +'<div class="meta-card" style="--mc:var(--amb)">'
      +'<div class="meta-card-label">Meta do Dia</div>'
      +'<div class="meta-card-val">'+fmt(metaHoje)+'</div>'
      +'<div class="meta-card-sub">Hoje: <strong>'+dwFull[todayDW]+'</strong></div>'
    +'</div>'
    +'<div class="meta-card" style="--mc:var(--blu)">'
      +'<div class="meta-card-label">Dias c/ Meta</div>'
      +'<div class="meta-card-val">'+nOk+'<span style="font-size:14px;color:var(--tx3)">/'+diasOp.length+'</span></div>'
      +'<div class="meta-card-sub">'+fmtP(diasOp.length?nOk/diasOp.length:0)+' de aproveitamento</div>'
    +'</div>'
    +'<div class="meta-card" style="--mc:'+(L.bateuLucro?'var(--grn)':'var(--red)')+'">'
      +'<div class="meta-card-label">Meta do Mês</div>'
      +'<div class="meta-card-val" style="color:'+(L.bateuLucro?'var(--grn)':'var(--red)')+'">'+fmtP(L.metaLucro)+'</div>'
      +'<div class="meta-card-sub">'+fmtP(L.pctLucro)+' atingido até hoje'+(L.bateuLucro?' ✓':' · falta '+fmtP(L.metaLucro-L.pctLucro))+'</div>'
      +'<div style="margin-top:7px">'+rb(Math.min(L.pctLucro/L.metaLucro*100,100),(L.bateuLucro?'var(--grn)':'var(--amb)'))+'</div>'
    +'</div>';

  // ── Bloco de indicadores: ranking entre lojas (só proprietário) ──────
  var rankHtml = '';
  if(CUR.role==='owner'){
    var lojas3=['frei','eliseu','petronio'];
    var rankData = lojas3.map(function(l){
      var d=getDias(l).filter(function(x){return !x.fechado;});
      var rec=d.reduce(function(s,x){return s+x.receita;},0);
      var ok=d.filter(function(x){return x.bateu;}).length;
      return{l:l, rec:rec, ok:ok, n:d.length, pct:ABAS[l].meta?rec/ABAS[l].meta:0};
    }).sort(function(a,b){return b.pct-a.pct;});

    var medals=['🥇','🥈','🥉'];
    var rankRows = rankData.map(function(r,i){
      var destaque = r.l===loja ? ';border:1px solid '+ABAS[r.l].cor+';background:'+ABAS[r.l].cor+'0A' : '';
      return '<div class="rank-item" style="'+destaque+'">'
        +'<span style="font-size:16px;width:22px;text-align:center;flex-shrink:0">'+medals[i]+'</span>'
        +'<div class="rank-name">'+ABAS[r.l].label+'</div>'
        +'<div style="flex:2;margin:0 8px">'+rb(Math.min(r.pct*100,100),(r.pct>=1?'var(--grn)':'var(--amb)'))+'</div>'
        +'<div class="rank-pct" style="color:'+(r.pct>=1?'var(--grn)':'var(--red)')+'">'+fmtP(r.pct)+'</div>'
        +'<div class="rank-dias">'+r.ok+'/'+r.n+' dias</div>'
        +'</div>';
    }).join('');

    var posMes = rankData.findIndex(function(r){return r.l===loja;})+1;
    var diasConjunto = rankData.reduce(function(s,r){return s+r.ok;},0)+'/'+rankData.reduce(function(s,r){return s+r.n;},0);
    rankHtml = ''
      +'<div class="sec-hdr">Indicadores · Ranking entre Filiais</div>'
      +'<div class="g32">'
        +'<div class="card"><div class="card-title">Ranking por % Meta Mensal <span>todas as filiais</span></div>'
          +'<div class="rank-block">'+rankRows+'</div>'
        +'</div>'
        +'<div class="card"><div class="card-title">Resumo de Atingimento</div>'
          +'<div class="kpi-grid" style="grid-template-columns:1fr 1fr;gap:8px">'
            +'<div class="kpi" style="--kt:var(--amb)"><div class="kpi-label">Posição da Filial</div>'
              +'<div class="kpi-val">'+posMes+'º<span style="font-size:13px;color:var(--tx3)">/3</span></div>'
              +'<div class="kpi-sub">'+ABAS[loja].label+'</div></div>'
            +'<div class="kpi" style="--kt:var(--brd2)"><div class="kpi-label">Dias c/ Meta (rede)</div>'
              +'<div class="kpi-val" style="font-size:18px">'+diasConjunto+'</div>'
              +'<div class="kpi-sub">3 filiais consolidado</div></div>'
            +'<div class="kpi" style="--kt:'+(nOk/diasOp.length>=.5?'var(--grn)':'var(--red)')+'"><div class="kpi-label">% Dias c/ Meta</div>'
              +'<div class="kpi-val" style="color:'+(nOk/diasOp.length>=.5?'var(--grn)':'var(--red)')+'">'+fmtP(diasOp.length?nOk/diasOp.length:0)+'</div>'
              +'<div class="kpi-sub">'+nOk+' de '+diasOp.length+' dias</div></div>'
            +'<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Dias c/ Meta (filial)</div>'
              +'<div class="kpi-val">'+nOk+'<span style="font-size:14px;color:var(--tx3)">/'+diasOp.length+'</span></div>'
              +'<div class="kpi-sub">'+ABAS[loja].label+'</div></div>'
          +'</div>'
        +'</div>'
      +'</div>';
  }

  ev.innerHTML = ''

    +'<div class="sec-hdr">Metas de Referência</div>'
    +'<div class="meta-card-grid">'+metaCards+'</div>'

    +'<div class="sec-hdr">Indicadores do Mês</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat('+(CUR.role==='owner'?4:3)+',1fr)">'
    +'<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Faturamento Total</div><div class="kpi-val">'+fmt(L.receita)+'</div><div class="kpi-sub">Meta: '+fmt(metaM)+'</div></div>'
    +'<div class="kpi" style="--kt:var(--blu)"><div class="kpi-label">Despesa Total</div><div class="kpi-val" style="color:var(--blu)">'+fmt(L.totDesp+L.totDespCx)+'</div><div class="kpi-sub">'+fmtP((L.totDesp+L.totDespCx)/(L.receita||1))+' da receita</div></div>'
    +lucroKpi
    +'<div class="kpi" style="--kt:var(--brd2)"><div class="kpi-label">Dias c/ Meta</div><div class="kpi-val">'+nOk+'<span style="font-size:14px;color:var(--tx3)">/'+diasOp.length+'</span></div><div class="kpi-sub">'+fmtP(diasOp.length?nOk/diasOp.length:0)+' de aproveitamento</div></div>'
    +'</div>'

    +''
  
    +'<div class="sec-hdr">Análise de Vendas</div>'
    +'<div class="g32">'
    +'<div class="card"><div class="card-title">Receita Diária vs Meta <span>'+allDias[0].data.substring(0,5)+'–'+allDias[allDias.length-1].data.substring(0,5)+'</span></div>'
    +'<div class="legend"><span class="li"><span class="ld" style="background:var(--grn)"></span>Bateu meta</span>'
    +'<span class="li"><span class="ld" style="background:'+cor+'"></span>Abaixo</span>'
    +'<span class="li"><span class="ld" style="background:var(--red);border-radius:0;height:3px;width:16px"></span>Linha meta</span></div>'
    +'<div style="position:relative;height:200px"><canvas id="cv-d"></canvas></div></div>'
    +'<div class="card"><div class="card-title">Mix de Canais</div>'+canaisHtml
    +'<div style="padding-top:8px;border-top:1px solid var(--brd);font-size:10px;color:var(--tx3)">Total: '+fmt(totFat)+'</div></div>'
    +'</div>'

    +'<div class="g2">'
    +'<div class="card"><div class="card-title">Top 7 Dias por Receita</div><div class="tw"><table><thead><tr><th>#</th><th>Data</th><th>Dia</th><th class="tdr">Receita</th><th class="tdr">Status</th></tr></thead><tbody>'+topDias+'</tbody></table></div></div>'
    +'<div class="card"><div class="card-title">Histórico Mensal 2026</div><div style="position:relative;height:185px"><canvas id="cv-hist"></canvas></div></div>'
    +'</div>'

    +rankHtml

    +'<div class="sec-hdr">Diário de Vendas</div>'
    +'<div class="twx"><table><thead><tr><th>Data</th><th>Dia</th><th>Meta</th><th class="tdr">Receita</th><th class="tdr">Espécie</th><th class="tdr">Cartão</th><th class="tdr">PIX</th><th class="tdr">iFood</th><th class="tdr">WhatsApp</th>'
    +(CUR.role==='owner'?'<th class="tdr">Lucro</th>':'')
    +'<th class="tdr">% Meta</th></tr></thead>'
    +'<tbody>'+diarioRows
    +'<tr style="background:#FDF6E8;font-weight:700"><td colspan="3">TOTAL</td>'
    +'<td class="tdv">'+fmt(totFat)+'</td><td class="tdv">'+fmt(totE)+'</td><td class="tdv">'+fmt(totC)+'</td>'
    +'<td class="tdv">'+fmt(totP)+'</td><td class="tdv">'+fmt(totI)+'</td><td class="tdv">'+fmt(totW)+'</td>'
    +(CUR.role==='owner'?'<td class="tdv" style="color:var(--grn)">'+fmt(totFat-totDC)+'</td>':'')
    +'<td class="tdr">'+fmtP(pct)+'</td></tr>'
    +'</tbody></table></div>';

  // Gráfico diário (sem domingos)
  var diasSemDom = loja==='petronio' ? allDias : allDias.filter(function(d){return d.dia!=='DOM';});
  dc('cv-d');
  CHARTS['cv-d'] = new Chart(el('cv-d'),{
    type:'bar',
    data:{
      labels:diasSemDom.map(function(d){return d.data.substring(0,5);}),
      datasets:[
        {label:'Receita',data:diasSemDom.map(function(d){return d.receita||0;}),
         backgroundColor:diasSemDom.map(function(d){return d.fechado?'rgba(180,180,180,.2)':d.bateu?'rgba(30,107,58,.7)':'rgba(184,134,11,.65)';}),
         borderColor:diasSemDom.map(function(d){return d.fechado?'#bbb':d.bateu?'#1E6B3A':'#B8860B';}),
         borderWidth:1,borderRadius:3},
        {label:'Meta',data:diasSemDom.map(function(d){return d.metaDia>0?d.metaDia:null;}),type:'line',
         borderColor:'#9B2020',borderWidth:1.5,borderDash:[5,4],pointRadius:0,fill:false,tension:0,spanGaps:true}
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

  // Gráfico histórico — receita real por mês, apenas 2026
  var hist2026 = getHistMensal2026(loja);
  dc('cv-hist');
  CHARTS['cv-hist'] = new Chart(el('cv-hist'),{
    type:'bar',
    data:{
      labels:hist2026.labels,
      datasets:[{
        label:ABAS[loja].label,
        data:hist2026.data,
        backgroundColor:cor+'88',
        borderColor:cor,
        borderWidth:1,borderRadius:3
      }]
    },
    plugins:[VAL_LABELS_PLUGIN],
    options:{responsive:true,maintainAspectRatio:false,
      layout:{padding:{top:14}},
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return ' '+fmt(c.parsed.y);}}}},
      scales:{
        x:{ticks:{color:'#9B7A3A',font:{size:9}},grid:{display:false}},
        y:{display:false,grid:{display:false}}
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
    var totRRaw = d.reduce(function(s,x){return s+x.receita;},0);
    // mesma fórmula usada na aba Resultado (DRE), pra bater com ela
    var Ld = calcLucro(l, d);
    T[l] = {
      rec: Ld.receita,
      totDesp: Ld.totDesp + Ld.totDespCx,
      lucro: Ld.lucro,
      marg: Ld.receita>0 ? Ld.lucro/Ld.receita : 0,
      nOk: d.filter(function(x){return x.bateu;}).length,
      nDias: d.length,
      meta: ABAS[l].meta,
      pct: ABAS[l].meta>0 ? totRRaw/ABAS[l].meta : 0 // meta não considera vendas extras
    };
  });
  var sR=0,sL=0,sD=0,sM=0,sOk=0,sDias=0;
  lojas.forEach(function(l){sR+=T[l].rec;sL+=T[l].lucro;sD+=T[l].totDesp;sM+=T[l].meta;sOk+=T[l].nOk;sDias+=T[l].nDias;});

  var lojaCards=lojas.map(function(l){
    var mL=ABAS[l].metaLucro||0;
    return '<div class="loja-card" style="--kt:'+ABAS[l].cor+'">'
      +'<div class="loja-name" style="color:'+ABAS[l].cor+'">'+ABAS[l].label+'</div>'
      +'<div class="loja-val">'+fmt(T[l].rec)+'</div>'
      +'<div class="meta-bar"><div class="meta-fill" style="width:'+Math.min(T[l].pct*100,100).toFixed(1)+'%;background:'+ABAS[l].cor+'"></div></div>'
      +'<div style="font-size:9px;color:var(--tx3)">'+fmtP(T[l].pct)+' da meta · '+T[l].nOk+'/'+T[l].nDias+' dias ✓</div>'
      +'<div style="font-size:10px;margin-top:6px;display:flex;gap:10px">'
      +'<span>% Lucro: <strong style="color:'+(T[l].marg>=mL?'var(--grn)':'var(--red)')+'">'+fmtP(T[l].marg)+'</strong></span>'
      +'<span>Meta: <strong>'+fmtP(mL)+'</strong></span>'
      +'</div>'
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

    +'<div class="sec-hdr">Consolidado da Rede</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">'
    +'<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Faturamento Total</div><div class="kpi-val">'+fmt(sR)+'</div><div class="kpi-sub">'+fmtP(sR/sM)+' da meta</div></div>'
    +'<div class="kpi" style="--kt:var(--grn)"><div class="kpi-label">Resultado Líquido</div><div class="kpi-val" style="color:var(--grn)">'+fmt(sL)+'</div><div class="kpi-sub">Margem '+fmtP(sR>0?sL/sR:0)+'</div></div>'
    +'<div class="kpi" style="--kt:var(--red)"><div class="kpi-label">Despesas Totais</div><div class="kpi-val">'+fmt(sD)+'</div><div class="kpi-sub">'+fmtP(sR>0?sD/sR:0)+' do faturamento</div></div>'
    +'<div class="kpi" style="--kt:var(--brd2)"><div class="kpi-label">Dias c/ Meta</div><div class="kpi-val">'+sOk+'<span style="font-size:14px;color:var(--tx3)">/'+sDias+'</span></div><div class="kpi-sub">3 lojas consolidado</div></div>'
    +'</div>'

    +'<div class="sec-hdr">Desempenho por Loja</div>'
    +'<div class="g3">'+lojaCards+'</div>'

    +'<div class="sec-hdr">Rankings e Histórico</div>'
    +'<div class="g32">'
    +'<div class="card"><div class="card-title">Histórico Mensal 2026 — Todas as Lojas</div>'
    +'<div class="legend">'
    +lojas.map(function(l){return '<span class="li"><span class="ld" style="background:'+ABAS[l].cor+'"></span>'+ABAS[l].label+'</span>';}).join('')
    +'</div>'
    +'<div style="position:relative;height:200px"><canvas id="cv-consol-h"></canvas></div></div>'
    +'<div class="card"><div class="card-title">Rankings</div>'
    +'<div style="font-size:9px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;margin-bottom:9px">Faturamento</div>'+rankFat
    +'<div style="margin-top:12px;padding-top:9px;border-top:1px solid var(--brd);font-size:9px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;margin-bottom:9px">% Meta Atingida</div>'+rankMeta
    +'</div></div>';

  var hist2026Todas = getHistMensal2026Todas();
  dc('cv-consol-h');
  CHARTS['cv-consol-h'] = new Chart(el('cv-consol-h'),{
    type:'bar',
    data:{labels:hist2026Todas.labels, datasets:lojas.map(function(l){
      return{label:ABAS[l].label,data:hist2026Todas.data[l],backgroundColor:ABAS[l].cor+'88',borderColor:ABAS[l].cor,borderWidth:1,borderRadius:2};
    })},
    plugins:[VAL_LABELS_PLUGIN],
    options:{responsive:true,maintainAspectRatio:false,
      layout:{padding:{top:14}},
      plugins:{legend:{labels:{color:'#7A5C28',font:{size:10}}}},
      scales:{
        x:{ticks:{color:'#9B7A3A',font:{size:9}},grid:{display:false}},
        y:{display:false,grid:{display:false}}
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER DESPESAS — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderDespesas(){
  var loja = FILIAL;
  ORC_LOJA = loja;
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
    var cxDia = getDias(l).reduce(function(s,d){return s+(d.despCx||0);},0);
    var tot = t + cxDia;
    var fatL = getDias(l).reduce(function(s,d){return s+d.receita;},0);
    return '<div class="kpi" style="--kt:'+ABAS[l].cor+'"><div class="kpi-label">'+ABAS[l].label+'</div>'
      +'<div class="kpi-val">'+fmt(tot)+'</div>'
      +'<div class="kpi-sub">'+fmtP(fatL>0?tot/fatL:0)+' do faturamento</div></div>';
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

  var avisoDesp = STATE[loja].despDemo
    ? '<div style="background:#FAEAEA;border:1px solid rgba(155,32,32,.25);border-left:4px solid var(--red);border-radius:0 10px 10px 0;padding:11px 14px;margin-bottom:2px">'
      +'<div style="font-size:9px;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">⚠ Despesas não carregadas da planilha</div>'
      +'<div style="font-size:11px;color:#7A2020">Não foi possível conectar à aba <strong>DESPESAS - '+ABAS[loja].label.toUpperCase()+'</strong> no SheetDB. '
      +'Verifique se a aba existe e se o nome está correto. Clique em <strong>↻ Atualizar</strong> para tentar novamente.</div>'
      +'</div>'
    : '';

  ev.innerHTML = avisoDesp
    +''

    +'<div class="sec-hdr">Por Loja</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">'+kpiLojas+'</div>'

    +'<div class="sec-hdr">Composição e Vencimentos</div>'
    +'<div class="card"><div class="card-title">Despesas por Vencimento</div><div style="position:relative;height:185px"><canvas id="cv-desp-d"></canvas></div></div>'

    +'<div class="sec-hdr">Despesas por Categorias</div>'
    +'<div class="stabs">'+['frei','eliseu','petronio'].map(function(l){
        return '<button class="stab '+(l===ORC_LOJA?'act':'')+'" onclick="switchOrcLoja(\''+l+'\',this)">'+ABAS[l].label+'</button>';
      }).join('')+'</div>'
    +'<div id="orc-content"></div>'

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
  var desp = getDesp(ORC_LOJA);
  var cats = STATE.categorias || {};
  var GC = 'grid-template-columns:1fr 130px';

  // agrupa por categoria
  var grouped = {};
  desp.forEach(function(d){
    var cat = cats[String(d.forn||'').trim().toUpperCase()] || (d.cc&&d.cc!==d.forn?d.cc:'') || 'Não Categorizado';
    if(!grouped[cat]) grouped[cat]=[];
    grouped[cat].push(d);
  });

  var entries = Object.keys(grouped).map(function(cat){
    var total = grouped[cat].reduce(function(s,d){return s+d.val;},0);
    return {cat:cat, items:grouped[cat], total:total};
  }).sort(function(a,b){return b.total-a.total;});

  var grand = entries.reduce(function(s,e){return s+e.total;},0);

  var html = entries.map(function(e){
    var pct = grand>0?e.total/grand:0;
    var items = e.items.map(function(d){
      return '<div class="orc-grid orc-item" style="'+GC+'">'
        +'<div class="orc-cell">'+d.forn+'</div>'
        +'<div class="orc-cell">'+fmt(d.val)+'</div>'
        +'</div>';
    }).join('');
    return '<div class="orc-grid orc-cat" style="'+GC+'" onclick="toggleOrc(this)">'
      +'<div class="orc-cell"><span class="orc-exp">▶</span><strong>'+e.cat+'</strong>'
        +' <span style="font-size:10px;color:var(--tx3)">'+fmtP(pct)+'</span>'
        +rb(Math.min(pct*100,100),'var(--amb)')+'</div>'
      +'<div class="orc-cell">'+fmt(e.total)+'</div>'
      +'</div>'
      +'<div style="display:none">'+items+'</div>';
  }).join('');

  ev.innerHTML = '<div class="tw">'
    +'<div class="orc-grid" style="'+GC+';background:#F2EAD8;border-bottom:1px solid var(--brd)">'
    +'<div class="orc-cell orc-hdr">Categoria</div>'
    +'<div class="orc-cell orc-hdr">Total</div></div>'
    +html
    +'<div class="orc-grid orc-total" style="'+GC+'">'
    +'<div class="orc-cell"><strong>TOTAL</strong></div>'
    +'<div class="orc-cell">'+fmt(grand)+'</div>'
    +'</div></div>';
}
function toggleOrc(row){
  var next=row.nextElementSibling;if(!next)return;
  var open=next.style.display!=='none';
  next.style.display=open?'none':'block';
  var exp=row.querySelector('.orc-exp');if(exp)exp.textContent=open?'▶':'▼';
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER CANAIS DIGITAIS (WhatsApp + iFood) — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderCanais(){
  var ev = el('m-canais'); if(!ev) return;
  var tabsHtml = [
    {k:'whats', l:'📱 WhatsApp'},
    {k:'ifood',  l:'🛵 iFood'}
  ].map(function(t){
    return '<button class="stab '+(t.k===CANAL_TAB?'act':'')+'" onclick="switchCanalTab(\''+t.k+'\',this)">'+t.l+'</button>';
  }).join('');
  ev.innerHTML = '<div class="stabs">'+tabsHtml+'</div><div id="canal-content"></div>';
  renderCanaisContent();
}
function switchCanalTab(tab,btn){
  CANAL_TAB=tab;
  document.querySelectorAll('#m-canais .stab').forEach(function(b){b.classList.remove('act');});
  btn.classList.add('act');
  renderCanaisContent();
}
function renderCanaisContent(){
  var ev=el('canal-content'); if(!ev) return;
  var fm=gF('f-mes');
  var ma=fm?fm.split('/')[0].toUpperCase():'';
  var lojas=['frei','eliseu','petronio'];

  if(CANAL_TAB==='whats'){
    // ── dados por loja ────────────────────────────────────────────────
    var wData=lojas.map(function(l){
      var rows=(STATE[l]?STATE[l].whats:[]).slice();
      if(fm) rows=rows.filter(function(x){return x.mes===fm;});
      var tot=rows.reduce(function(s,x){return s+(x.total||0);},0);
      var meta=getMetaWhats(l,ma)||0;
      var pct=meta>0?tot/meta:0;
      return {loja:l, rows:rows, tot:tot, meta:meta, pct:pct};
    });
    var totRede=wData.reduce(function(s,d){return s+d.tot;},0);
    var metaRede=wData.reduce(function(s,d){return s+d.meta;},0);
    var pctRede=metaRede>0?totRede/metaRede:0;
    var corRede=pctRede>=1?'var(--grn)':pctRede>=0.8?'var(--amb)':'var(--red)';


    // ── atingimento da meta por loja ──────────────────────────────────
    var metaAting='<div class="card" style="margin-bottom:14px">'
      +'<div class="card-title">Atingimento da Meta — '+mesLabel(fm)+'</div>'
      +lojas.map(function(l,i){
        var d=wData[i];
        var cor=d.pct>=1?'var(--grn)':d.pct>=0.8?'var(--amb)':'var(--red)';
        return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:7px">'
          +'<div style="min-width:90px;font-size:11px;color:var(--tx2)">'+ABAS[l].label+'</div>'
          +(d.meta>0
            ?'<div style="flex:1">'+rb(Math.min(d.pct*100,100),cor)+'</div>'
              +'<div style="min-width:52px;text-align:right;font-size:12px;font-weight:700;color:'+cor+'">'+fmtP(d.pct)+'</div>'
              +'<div style="min-width:120px;text-align:right;font-size:11px;color:var(--tx3)">'+fmt(d.tot)+' / '+fmt(d.meta)+'</div>'
            :'<div style="flex:1;font-size:11px;color:var(--tx3)">'+fmt(d.tot)+' vendido &nbsp;·&nbsp; sem meta cadastrada</div>'
              +'<div style="min-width:52px"></div><div style="min-width:120px"></div>')
          +'</div>';
      }).join('')
      +'</div>';

    // ── detalhe do FILIAL ─────────────────────────────────────────────
    var filW=wData.find(function(d){return d.loja===FILIAL;})||wData[0];
    var corW=filW.pct>=1?'var(--grn)':filW.pct>=0.8?'var(--amb)':'var(--red)';
    var detKpiW='<div class="kpi-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:14px">'
      +'<div class="kpi" style="--kt:'+ABAS[FILIAL].cor+'"><div class="kpi-label">Vendas WhatsApp</div>'
        +'<div class="kpi-val">'+fmt(filW.tot)+'</div>'
        +'<div class="kpi-sub">'+ABAS[FILIAL].label+'</div></div>'
      +'<div class="kpi" style="--kt:'+(filW.meta>0?corW:'var(--g2)')+'"><div class="kpi-label">Atingimento da Meta</div>'
        +'<div class="kpi-val" style="color:'+(filW.meta>0?corW:'var(--tx3)')+'">'+
          (filW.meta>0?fmtP(filW.pct):'—')+'</div>'
        +'<div class="kpi-sub">'+(filW.meta>0?'Meta: '+fmt(filW.meta):'Sem meta cadastrada')+'</div></div>'
      +'</div>';

    // ── tabela do FILIAL ──────────────────────────────────────────────
    var wTable=filW.rows.length?filW.rows.map(function(r){
      return '<tr><td>'+r.data.substring(0,5)+'</td>'
        +'<td class="tdv">'+fmt(r.pix)+'</td>'
        +'<td class="tdv">'+fmt(r.cartao)+'</td>'
        +'<td class="tdv">'+fmt(r.especie)+'</td>'
        +'<td class="tdv"><strong>'+fmt(r.total)+'</strong></td></tr>';
    }).join(''):'<tr><td colspan="5" style="text-align:center;color:var(--tx3);padding:16px">Sem registros no período</td></tr>';

    ev.innerHTML=detKpiW
      +'<div class="sec-hdr">Registros — '+ABAS[FILIAL].label+'</div>'
      +'<div class="twx"><table><thead><tr>'
        +'<th>Data</th><th class="tdr">PIX</th><th class="tdr">Cartão</th><th class="tdr">Espécie</th><th class="tdr">Total</th>'
        +'</tr></thead><tbody>'+wTable+'</tbody>'
        +(filW.rows.length?'<tfoot><tr style="font-weight:700;background:#F2EAD8">'
          +'<td>Total</td>'
          +'<td class="tdv">'+fmt(filW.rows.reduce(function(s,r){return s+(r.pix||0);},0))+'</td>'
          +'<td class="tdv">'+fmt(filW.rows.reduce(function(s,r){return s+(r.cartao||0);},0))+'</td>'
          +'<td class="tdv">'+fmt(filW.rows.reduce(function(s,r){return s+(r.especie||0);},0))+'</td>'
          +'<td class="tdv">'+fmt(filW.tot)+'</td>'
          +'</tr></tfoot>':'')
      +'</table></div>';

  } else {
    // ── iFood ─────────────────────────────────────────────────────────
    var iData=lojas.map(function(l){
      var rows=(STATE[l]?STATE[l].ifood:[]).slice();
      if(fm) rows=rows.filter(function(x){return x.mes===fm;});
      var sumTab=rows.reduce(function(s,x){return s+(x.vendas||0);},0);
      // fallback para VEND ONLINE do VD quando aba IFOOD não tem dados (mesmo padrão do DRE)
      var diasL=(STATE[l]?STATE[l].dias:[]).slice();
      if(fm) diasL=diasL.filter(function(x){return x.mes===fm;});
      var vendOnline=diasL.reduce(function(s,x){return s+(x.ifood||0);},0);
      var totV=sumTab>0?sumTab:vendOnline;
      var totT=rows.reduce(function(s,x){return s+(x.taxa||0);},0);
      var totC=rows.reduce(function(s,x){return s+(x.cancelados||0);},0);
      // repasse da aba global REPASSE INC. IFOOD (mesmo padrão do DRE)
      var totRp=(function(){
        if(fm){var ma2=fm.split('/')[0].toUpperCase();return (STATE.repasseIfood&&STATE.repasseIfood[ma2]&&STATE.repasseIfood[ma2][l])||0;}
        return Object.keys(STATE.repasseIfood||{}).reduce(function(s,k){return s+((STATE.repasseIfood[k]&&STATE.repasseIfood[k][l])||0);},0);
      })();
      var totRes=rows.reduce(function(s,x){return s+(x.resultado||0);},0);
      var meta=getMetaIfood(l,ma)||0;
      var pct=meta>0?totV/meta:0;
      console.log('[CANAIS ifood] '+l+' | ma='+ma+' | meta='+meta+' | totV='+totV+' | totRp='+totRp);
      return {loja:l, rows:rows, totV:totV, totT:totT, totC:totC, totRp:totRp, totRes:totRes, meta:meta, pct:pct};
    });
    var totRedeV=iData.reduce(function(s,d){return s+d.totV;},0);
    var metaRedeI=iData.reduce(function(s,d){return s+d.meta;},0);
    var pctRedeI=metaRedeI>0?totRedeV/metaRedeI:0;
    var corRedeI=pctRedeI>=1?'var(--grn)':pctRedeI>=0.8?'var(--amb)':'var(--red)';


    // ── detalhe do FILIAL ─────────────────────────────────────────────
    var filI=iData.find(function(d){return d.loja===FILIAL;})||iData[0];
    var corF=filI.pct>=1?'var(--grn)':filI.pct>=0.8?'var(--amb)':'var(--red)';
    var detKpi='<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">'
      +'<div class="kpi" style="--kt:#EF3E3E"><div class="kpi-label">Vendas iFood</div>'
        +'<div class="kpi-val">'+fmt(filI.totV)+'</div>'
        +'<div class="kpi-sub">'+ABAS[FILIAL].label+'</div></div>'
      +'<div class="kpi" style="--kt:'+(filI.meta>0?corF:'var(--g2)')+'"><div class="kpi-label">Atingimento da Meta</div>'
        +'<div class="kpi-val" style="color:'+(filI.meta>0?corF:'var(--tx3)')+'">'+
          (filI.meta>0?fmtP(filI.pct):'—')+'</div>'
        +'<div class="kpi-sub">'+(filI.meta>0?'Meta: '+fmt(filI.meta):'Sem meta cadastrada')+'</div></div>'
      +'<div class="kpi" style="--kt:var(--grn)"><div class="kpi-label">Repasse iFood</div>'
        +'<div class="kpi-val" style="color:var(--grn)">'+fmt(filI.totRp)+'</div>'
        +'<div class="kpi-sub">'+ABAS[FILIAL].label+'</div></div>'
      +'</div>';

    // ── tabela do FILIAL ──────────────────────────────────────────────
    var iTable=filI.rows.length?filI.rows.map(function(r){
      return '<tr><td>'+r.data.substring(0,5)+'</td>'
        +'<td class="tdv">'+fmt(r.vendas)+'</td>'
        +'<td class="tdv" style="color:var(--grn)">'+fmt(r.repasse)+'</td></tr>';
    }).join(''):'<tr><td colspan="3" style="text-align:center;color:var(--tx3);padding:16px">Sem registros no período</td></tr>';

    ev.innerHTML=detKpi
      +'<div class="sec-hdr">Registros — '+ABAS[FILIAL].label+'</div>'
      +'<div class="twx"><table><thead><tr>'
        +'<th>Data</th><th class="tdr">Vendas</th><th class="tdr">Repasse</th>'
        +'</tr></thead><tbody>'+iTable+'</tbody>'
        +(filI.rows.length?'<tfoot><tr style="font-weight:700;background:#F2EAD8">'
          +'<td>Total</td>'
          +'<td class="tdv">'+fmt(filI.totV)+'</td>'
          +'<td class="tdv" style="color:var(--grn)">'+fmt(filI.totRp)+'</td>'
          +'</tr></tfoot>':'')
      +'</table></div>';
  }
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER INVESTIMENTOS — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderInvestimentos(){
  var ev = el('m-investimentos'); if(!ev) return;
  var fm = gF('f-mes');

  // coleta itens de todas as lojas com loja marcada
  var allItens = [];
  ['frei','eliseu','petronio'].forEach(function(l){
    var itens = (STATE[l]?STATE[l].despExtra||[]:[]).slice();
    if(fm) itens = itens.filter(function(x){return x.mes===fm;});
    itens.forEach(function(x){ allItens.push({loja:l, d:x}); });
  });

  allItens.sort(function(a,b){
    return (a.d.data||'').localeCompare(b.d.data||'');
  });

  var grand = allItens.reduce(function(s,x){return s+x.d.val;},0);

  var kpiLojas = '<div class="kpi" style="--kt:var(--g2)"><div class="kpi-label">Total Despesas Extras</div><div class="kpi-val">'+fmt(grand)+'</div><div class="kpi-sub">'+(fm?mesLabel(fm):'período')+'</div></div>';
  ['frei','eliseu','petronio'].forEach(function(l){
    var v = allItens.filter(function(x){return x.loja===l;}).reduce(function(s,x){return s+x.d.val;},0);
    kpiLojas += '<div class="kpi" style="--kt:'+ABAS[l].cor+'"><div class="kpi-label">'+ABAS[l].label+'</div><div class="kpi-val">'+fmt(v)+'</div><div class="kpi-sub">no período</div></div>';
  });

  var rows = allItens.map(function(x){
    var cor = ABAS[x.loja].cor;
    var label = ABAS[x.loja].label;
    return '<tr>'
      +'<td><span style="background:'+cor+'22;color:'+cor+';font-size:9px;padding:2px 8px;border-radius:20px;font-weight:700">'+label+'</span></td>'
      +'<td style="color:var(--tx3)">'+x.d.mes+'</td>'
      +'<td><span style="background:var(--sur3);font-size:9px;padding:2px 7px;border-radius:20px">'+(x.d.cc||'—')+'</span></td>'
      +'<td class="tdn">'+(x.d.forn||'—')+'</td>'
      +'<td class="tdv">'+fmt(x.d.val)+'</td>'
      +'<td style="color:var(--tx3);font-size:10px">'+(x.d.forma||'—')+'</td>'
      +'</tr>';
  }).join('');

  if(!allItens.length){
    ev.innerHTML='<div class="loading"><div>Nenhuma despesa extra no período selecionado.</div></div>';
    return;
  }

  ev.innerHTML = ''
    +'<div class="sec-hdr">Resumo por Loja</div>'
    +'<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">'+kpiLojas+'</div>'
    +'<div class="sec-hdr">Lançamentos</div>'
    +'<div class="twx"><table><thead><tr>'
    +'<th>Loja</th><th>Mês</th><th>Categoria</th><th>Fornecedor / Descrição</th>'
    +'<th class="tdr">Valor</th><th>Forma Pgto.</th>'
    +'</tr></thead><tbody>'+rows
    +'<tr style="background:#FDF6E8;font-weight:700"><td colspan="4">TOTAL</td>'
    +'<td class="tdv">'+fmt(grand)+'</td><td></td></tr>'
    +'</tbody></table></div>';
}

// ═══════════════════════════════════════════════════════════════════════
// RENDER DRE — só proprietário
// ═══════════════════════════════════════════════════════════════════════
function renderDRE(){
  var ev = el('m-dre'); if(!ev) return;
  var lojas = ['frei','eliseu','petronio'];
  var fm = gF('f-mes'), fd = gF('f-dia');
  var T = {};

  lojas.forEach(function(l){
    var d = getDias(l).filter(function(x){return !x.fechado;});
    var desp = (STATE[l]?STATE[l].desp:[]).slice();
    var ifoodRows = (STATE[l]?STATE[l].ifood:[]);
    if(fm){
      desp = desp.filter(function(x){return x.mes===fm;});
      ifoodRows = ifoodRows.filter(function(x){return x.mes===fm;});
    }
    if(fd){
      desp = desp.filter(function(x){return diaNumDe(x.venc)===parseInt(fd);});
      ifoodRows = ifoodRows.filter(function(x){return diaNumDe(x.data)===parseInt(fd);});
    }

    var lojaFis=0, vendaOnline=0, totDespCx=0, nOk=0;
    d.forEach(function(x){
      lojaFis     += (x.especie||0)+(x.cartao||0)+(x.pix||0);
      vendaOnline += (x.ifood||0);   // campo "ifood" da aba VD = venda online (ifood+whats juntos)
      totDespCx   += (x.despCx||0);
      if(x.bateu) nOk++;
    });

    // WhatsApp: soma da aba WHATS filtrada pelo período
    var whatsRows = (STATE[l]?STATE[l].whats:[]).slice();
    if(fm) whatsRows = whatsRows.filter(function(x){return x.mes===fm;});
    if(fd) whatsRows = whatsRows.filter(function(x){return diaNumDe(x.data)===parseInt(fd);});
    var totWhats = whatsRows.reduce(function(s,x){return s+(x.total||0);},0);

    // Vendas extras: aba VENDAS EXTRAS por loja
    var extrasRows = (STATE[l]?STATE[l].extras:[]).slice();
    if(fm) extrasRows = extrasRows.filter(function(x){return x.mes===fm;});
    if(fd) extrasRows = extrasRows.filter(function(x){return diaNumDe(x.data)===parseInt(fd);});
    var totExtras = extrasRows.reduce(function(s,x){return s+(x.total||0);},0);

    // Repasse iFood: aba global REPASSE INC. IFOOD (por mês/loja) — só existe granularidade mensal
    var repasse = (function(){
      if(fd) return 0;
      if(fm){
        var ma2=fm.split('/')[0].toUpperCase();
        return (STATE.repasseIfood&&STATE.repasseIfood[ma2]&&STATE.repasseIfood[ma2][l])||0;
      }
      // sem filtro de mês: soma todos os meses disponíveis
      return Object.keys(STATE.repasseIfood||{}).reduce(function(s,k){
        return s+((STATE.repasseIfood[k]&&STATE.repasseIfood[k][l])||0);
      },0);
    })();

    // iFood: da aba IFOOD se tiver vendas > 0; senão = coluna VEND ONLINE do VD (que já é iFood)
    var sumIfoodTab = ifoodRows.reduce(function(s,x){return s+(x.vendas||0);},0);
    var totIfood = sumIfoodTab > 0 ? sumIfoodTab : vendaOnline;

    var totEscrit= desp.reduce(function(s,x){return s+(x.val||0);},0);
    var totRec   = lojaFis + totIfood + totExtras + repasse;
    var totDesp  = totDespCx + totEscrit;
    var resultado= totRec - totDesp;
    var pctLucro = totRec>0 ? resultado/totRec : 0;
    var ma       = fm ? fm.split('/')[0].toUpperCase() : '';
    var metaLucro= getMetaLucro(l, ma) || ABAS[l].metaLucro || 0;

    T[l] = {
      lojaFis:lojaFis, totIfood:totIfood, totWhats:totWhats,
      totExtras:totExtras, repasse:repasse, totRec:totRec,
      totDespCx:totDespCx, totEscrit:totEscrit, totDesp:totDesp,
      resultado:resultado, pctLucro:pctLucro, metaLucro:metaLucro,
      nOk:nOk, nDias:d.length
    };
  });

  var C = {lojaFis:0,totIfood:0,totWhats:0,totExtras:0,repasse:0,totRec:0,
           totDespCx:0,totEscrit:0,totDesp:0,resultado:0,nOk:0,nDias:0};
  lojas.forEach(function(l){
    C.lojaFis +=T[l].lojaFis;  C.totIfood +=T[l].totIfood; C.totWhats +=T[l].totWhats;
    C.totExtras+=T[l].totExtras; C.repasse  +=T[l].repasse;  C.totRec   +=T[l].totRec;
    C.totDespCx+=T[l].totDespCx; C.totEscrit+=T[l].totEscrit;C.totDesp  +=T[l].totDesp;
    C.resultado+=T[l].resultado; C.nOk      +=T[l].nOk;      C.nDias    +=T[l].nDias;
  });
  C.pctLucro = C.totRec>0 ? C.resultado/C.totRec : 0;

  var GC = 'grid-template-columns:2.2fr 1fr 1fr 1fr 1fr';

  function dreRow(label, vals, cls, colorFn){
    var row = '<div class="dre-row '+(cls||'')+'" style="'+GC+'"><div>'+label+'</div>';
    lojas.forEach(function(l){
      var v = vals[l];
      var color = colorFn ? colorFn(T[l]) : '';
      var txt = typeof v==='string' ? v : fmt(v);
      row += '<div'+(color?' style="color:'+color+'"':'')+'>'+txt+'</div>';
    });
    var vt = vals.tot;
    var ct = colorFn ? colorFn(C) : '';
    row += '<div'+(ct?' style="color:'+ct+'"':'')+'>'+(typeof vt==='string'?vt:fmt(vt))+'</div></div>';
    return row;
  }

  function resColor(x){ return x.resultado>=0?'var(--grn)':'var(--red)'; }
  function lucroColor(x){ return x.pctLucro>=(x.metaLucro||0)?'var(--grn)':'var(--red)'; }

  ev.innerHTML = '<div class="tw">'
    +'<div class="dre-row" style="'+GC+';background:#F2EAD8;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--tx2)">'
    +'<div>Indicador</div>'
    +lojas.map(function(l){return '<div style="color:'+ABAS[l].cor+'">'+ABAS[l].label.split(' ')[0]+'</div>';}).join('')
    +'<div>Consolidado</div></div>'

    +'<div class="dre-sec">RECEITAS</div>'
    +dreRow('(+) Loja Física',      {frei:T.frei.lojaFis,  eliseu:T.eliseu.lojaFis,  petronio:T.petronio.lojaFis,  tot:C.lojaFis})
    +dreRow('(+) iFood',            {frei:T.frei.totIfood, eliseu:T.eliseu.totIfood, petronio:T.petronio.totIfood, tot:C.totIfood})
    +dreRow('(+) Vendas Extras',    {frei:T.frei.totExtras,eliseu:T.eliseu.totExtras,petronio:T.petronio.totExtras,tot:C.totExtras})
    +dreRow('(+) Repasse iFood',    {frei:T.frei.repasse,  eliseu:T.eliseu.repasse,  petronio:T.petronio.repasse,  tot:C.repasse})
    +dreRow('(=) Total Receitas',   {frei:T.frei.totRec,   eliseu:T.eliseu.totRec,   petronio:T.petronio.totRec,   tot:C.totRec},'dre-sub')

    +'<div class="dre-sec">DESPESAS</div>'
    +dreRow('(-) Despesas de Caixa',     {frei:T.frei.totDespCx, eliseu:T.eliseu.totDespCx, petronio:T.petronio.totDespCx, tot:C.totDespCx})
    +dreRow('(-) Despesas de Escritório',{frei:T.frei.totEscrit, eliseu:T.eliseu.totEscrit, petronio:T.petronio.totEscrit, tot:C.totEscrit})
    +dreRow('(=) Total Despesas',        {frei:T.frei.totDesp,   eliseu:T.eliseu.totDesp,   petronio:T.petronio.totDesp,   tot:C.totDesp},'dre-sub')

    +'<div class="dre-sec">RESULTADO</div>'
    +dreRow('(=) Resultado Líquido',
      {frei:T.frei.resultado, eliseu:T.eliseu.resultado, petronio:T.petronio.resultado, tot:C.resultado},
      'dre-sub', resColor)
    +dreRow('% Lucro',
      {frei:fmtP(T.frei.pctLucro), eliseu:fmtP(T.eliseu.pctLucro), petronio:fmtP(T.petronio.pctLucro), tot:fmtP(C.pctLucro)},
      '', lucroColor)
    +dreRow('Meta % Lucro',
      {frei:fmtP(T.frei.metaLucro), eliseu:fmtP(T.eliseu.metaLucro), petronio:fmtP(T.petronio.metaLucro), tot:'—'})
    +dreRow('Dias c/ Meta',
      {frei:T.frei.nOk+'/'+T.frei.nDias, eliseu:T.eliseu.nOk+'/'+T.eliseu.nDias, petronio:T.petronio.nOk+'/'+T.petronio.nDias,
       tot:C.nOk+'/'+C.nDias})

    +'</div>'
    +'<div class="sec-hdr">Detalhamento de Despesas — '+ABAS[FILIAL].label+' &middot; Caixa x Escritório</div>'
    +'<div class="g2">'
    +buildDesempCard('Desempenho Anual 2025', DESEMP_2025[FILIAL]||[], '25')
    +buildDesempCard('Desempenho Mensal 2026', getDesemp2026(FILIAL), '26')
    +'</div>'
    +'<div class="sec-hdr">Comparativo — 2025 vs 2026</div>'
    +'<div class="card"><div class="card-title">Comparativo por Mês'
    +'<select id="f-comp-metric" onchange="renderCompChart()">'
    +'<option value="rec">Faturamento</option>'
    +'<option value="desp">Despesa</option>'
    +'<option value="lucro">R$ Lucro</option>'
    +'<option value="margem">% Margem de Lucro</option>'
    +'</select></div>'
    +'<div style="position:relative;height:210px"><canvas id="cv-comp"></canvas></div></div>';

  // Gráfico comparativo 2025 vs 2026 — Faturamento/Despesa/R$ Lucro/% Margem (aba "historico <loja>")
  var selComp = el('f-comp-metric');
  if(selComp) selComp.value = COMP_METRIC;
  renderCompChart();
}

// Desempenho Mensal 2026 (em andamento) — soma os lançamentos diários já existentes
// (VD <loja> e DESPESAS <loja>) agrupados por mês. Despesa de caixa vem do campo
// "despCx" de cada dia da aba VD (mesma fonte usada pelo DRE), já que STATE[loja].despCx
// nunca é preenchido — a aba "DESPESA DE CAIXA" não é lançada por dia separadamente.
function getDesemp2026(loja){
  var ORDEM=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
  var meses={};
  function ensure(m){ if(!meses[m]) meses[m]={mes:m,lojaFis:0,vendaOnline:0,extras:0,escrit:0,caixa:0}; return meses[m]; }
  (STATE[loja]?STATE[loja].dias:[]).forEach(function(d){
    if(d.fechado || !/\/2026$/.test(d.mes||'')) return;
    var g=ensure(d.mes.split('/')[0]);
    g.lojaFis     += (d.especie||0)+(d.cartao||0)+(d.pix||0);
    g.vendaOnline += (d.ifood||0); // "ifood" da aba VD = venda online (ifood+whats juntos)
    g.caixa       += d.despCx||0;
  });
  (STATE[loja]?STATE[loja].desp:[]).forEach(function(d){
    if(!/\/2026$/.test(d.mes||'')) return;
    ensure(d.mes.split('/')[0]).escrit += d.val||0;
  });
  ((STATE[loja]&&STATE[loja].extras)||[]).forEach(function(x){
    if(!/\/2026$/.test(x.mes||'')) return;
    ensure(x.mes.split('/')[0]).extras += x.total||0;
  });
  var ifoodTabByMes={};
  ((STATE[loja]&&STATE[loja].ifood)||[]).forEach(function(x){
    if(!/\/2026$/.test(x.mes||'')) return;
    var m=x.mes.split('/')[0];
    ifoodTabByMes[m]=(ifoodTabByMes[m]||0)+(x.vendas||0);
  });
  // Receita Bruta = mesma fórmula da aba Resultado (DRE): loja física + iFood + vendas
  // extras + repasse iFood — pra bater com o total da DRE mês a mês.
  return ORDEM.filter(function(m){return meses[m];}).map(function(m){
    var g=meses[m];
    var sumIfoodTab = ifoodTabByMes[m]||0;
    var totIfood = sumIfoodTab>0 ? sumIfoodTab : g.vendaOnline;
    var repasse = (STATE.repasseIfood&&STATE.repasseIfood[m]&&STATE.repasseIfood[m][loja])||0;
    return {
      mes:m,
      rec: g.lojaFis + totIfood + g.extras + repasse,
      escrit: g.escrit,
      caixa: g.caixa
    };
  });
}

function buildDesempCard(title, rows, yy){
  var totRec=0, totEsc=0, totCx=0;
  var body = rows.map(function(r){
    totRec+=r.rec; totEsc+=r.escrit; totCx+=r.caixa;
    return '<tr><td class="tdn">'+r.mes.toLowerCase()+'/'+yy+'</td>'
      +'<td class="tdv">'+fmt(r.rec)+'</td>'
      +'<td class="tdv">'+fmt(r.escrit)+'</td>'
      +'<td class="tdv">'+fmt(r.caixa)+'</td></tr>';
  }).join('');
  if(!rows.length) body = '<tr><td class="tdn" colspan="4" style="text-align:center;color:var(--tx3)">Sem dados lançados</td></tr>';
  var totRow = rows.length ? '<tr style="background:#FDF6E8;font-weight:700"><td class="tdn">Total</td>'
    +'<td class="tdv">'+fmt(totRec)+'</td><td class="tdv">'+fmt(totEsc)+'</td><td class="tdv">'+fmt(totCx)+'</td></tr>' : '';
  return '<div class="card"><div class="card-title">'+title+'</div>'
    +'<div class="tw"><table><thead><tr><th>Meses</th><th class="tdr">Receita Bruta</th><th class="tdr">Desp.Escrit.</th><th class="tdr">Desp.Caixa</th></tr></thead>'
    +'<tbody>'+body+totRow+'</tbody></table></div></div>';
}

// Métrica exibida no gráfico "Comparativo por Mês" da aba Resultado
var COMP_METRIC = 'rec'; // 'rec' | 'desp' | 'lucro' | 'margem'

function renderCompChart(){
  var sel = el('f-comp-metric');
  if(sel) COMP_METRIC = sel.value;
  var loja = FILIAL;
  var cor = ABAS[loja].cor;
  var hist = (STATE[loja]&&STATE[loja].historico)||[];
  dc('cv-comp');
  if(!hist.length) return;
  var isPct = COMP_METRIC==='margem';
  var labels = hist.map(function(h){return h.mes.charAt(0)+h.mes.slice(1).toLowerCase();});

  // 2026: calcula pela mesma fórmula da aba Resultado (loja física + iFood + extras +
  // repasse iFood, e despesa de caixa + escritório) em vez do valor lançado manualmente
  // na aba "historico <loja>" — assim o gráfico bate com os outros cards do DRE.
  var desemp26 = {};
  getDesemp2026(loja).forEach(function(r){ desemp26[r.mes] = {rec:r.rec, desp:r.escrit+r.caixa}; });

  function calcMetric(rec, desp){
    if(COMP_METRIC==='desp') return desp;
    if(COMP_METRIC==='lucro') return rec-desp;
    if(COMP_METRIC==='margem') return rec>0?+((rec-desp)/rec*100).toFixed(1):null;
    return rec;
  }
  function get(h,yr){
    if(yr===26){
      var d26 = desemp26[h.mes];
      return calcMetric(d26?d26.rec:0, d26?d26.desp:0);
    }
    return calcMetric(h.rec25, h.desp25);
  }
  var compValLabels = {
    id:'compValLabels',
    afterDatasetsDraw:function(chart){
      var ctx=chart.ctx;
      ctx.save();
      ctx.font='700 8px sans-serif';
      ctx.fillStyle='#7A5C28';
      ctx.textAlign='center';
      ctx.textBaseline='bottom';
      chart.data.datasets.forEach(function(ds,i){
        var meta=chart.getDatasetMeta(i);
        if(meta.hidden) return;
        meta.data.forEach(function(bar,idx){
          var v=ds.data[idx];
          if(v==null) return;
          var txt=isPct?v.toFixed(1).replace('.',',')+' %':'R$'+(v/1000).toFixed(0)+'k';
          ctx.fillText(txt, bar.x, bar.y-3);
        });
      });
      ctx.restore();
    }
  };
  CHARTS['cv-comp'] = new Chart(el('cv-comp'),{
    type:'bar',
    data:{
      labels:labels,
      datasets:[
        {label:'2025', data:hist.map(function(h){return isPct?get(h,25):(get(h,25)||null);}),
         backgroundColor:'#4472C4CC',borderColor:'#4472C4',borderWidth:1,borderRadius:3},
        {label:'2026', data:hist.map(function(h){return isPct?get(h,26):(get(h,26)||null);}),
         backgroundColor:cor+'CC',borderColor:cor,borderWidth:1,borderRadius:3}
      ]
    },
    plugins:[compValLabels],
    options:{responsive:true,maintainAspectRatio:false,
      layout:{padding:{top:14}},
      plugins:{
        legend:{display:true,labels:{font:{size:9},color:'#9B7A3A',boxWidth:12,padding:10}},
        tooltip:{callbacks:{label:function(c){return ' '+c.dataset.label+': '+(isPct?c.parsed.y.toFixed(1).replace('.',',')+' %':fmt(c.parsed.y));}}}
      },
      scales:{
        x:{ticks:{color:'#9B7A3A',font:{size:9}},grid:{display:false}},
        y:{display:false,grid:{display:false}}
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════
// Como funciona o fluxo de dados — informação no painel de gerente
// ═══════════════════════════════════════════════════════════════════════
// O gerente preenche a planilha no Google Sheets → SheetDB API puxa os dados
// → Dashboard atualiza automaticamente a cada hora

