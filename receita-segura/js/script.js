// Receita Segura — protótipo front-end
// Nenhum dado é enviado a um servidor.

const estado = {
  papel: 'medico',
  medicoLogado: null,
  pacienteLogado: null,
  proximoIdMedicamento: 1,
  contadorReceitas: 2298,
  receitas: [
    {
      id: 'RS-2298',
      paciente: 'João Ferreira Lima',
      medico: 'Dra. Camila Duarte',
      crm: '12345-AM',
      medicamentos: [
        { nome: 'Amoxicilina 500mg', posologia: 'de 8 em 8h, por 7 dias' },
        { nome: 'Dipirona 1g', posologia: 'se dor, até de 6 em 6h' }
      ],
      orientacoes: 'Repouso relativo por 3 dias.',
      dataHora: '14/08/2026 09:41',
      hash: '7f3a9c1b4e8d0a6f2c5b9e7d3a1f8c4b6e0d2a9f5c7b3e1d8a0f4c6b2e9d7a3f1e21b'
    }
  ]
};

const CREDENCIAIS = {
  medico: { email: 'camila@clinica.com', senha: 'demo123', nome: 'Dra. Camila Duarte', crm: '12345-AM', iniciais: 'CD' },
  paciente: { email: 'joao@email.com', senha: 'demo123', nome: 'João Ferreira Lima', iniciais: 'JF' }
};

const $ = (seletor) => document.querySelector(seletor);
const $$ = (seletor) => document.querySelectorAll(seletor);

const botaoMenu = $('#botao-menu');
const menuMobile = $('#menu-mobile');
botaoMenu.addEventListener('click', () => {
  const aberto = menuMobile.classList.toggle('ativo');
  botaoMenu.setAttribute('aria-expanded', String(aberto));
});
$$('#menu-mobile a').forEach(a => a.addEventListener('click', () => {
  menuMobile.classList.remove('ativo');
  botaoMenu.setAttribute('aria-expanded', 'false');
}));

const telaAuth = $('#tela-auth');
const sitePublico = $('#site-publico');

function abrirAuth(papelPreferido) {
  sitePublico.classList.add('oculto');
  telaAuth.classList.remove('oculto');
  if (papelPreferido) selecionarPapel(papelPreferido);
  window.scrollTo(0, 0);
}

function fecharAuth() {
  telaAuth.classList.add('oculto');
  sitePublico.classList.remove('oculto');
  $('#erro-login').classList.add('oculto');
  $('#form-login').reset();
}

$$('[data-abrir-auth]').forEach(el => {
  el.addEventListener('click', () => {
    menuMobile.classList.remove('ativo');
    abrirAuth(el.getAttribute('data-abrir-auth') || null);
  });
});
$('[data-fechar-auth]').addEventListener('click', fecharAuth);

function selecionarPapel(papel) {
  estado.papel = papel;
  $$('.alternador button').forEach(b => b.classList.toggle('ativo', b.dataset.papel === papel));
  const cred = CREDENCIAIS[papel];
  $('#credenciais-demo').innerHTML = papel === 'medico'
    ? `Demonstração — médico(a): <code>${cred.email}</code> / <code>${cred.senha}</code>`
    : `Demonstração — paciente: <code>${cred.email}</code> / <code>${cred.senha}</code>`;
  $('#erro-login').classList.add('oculto');
}

$$('.alternador button').forEach(botao => {
  botao.addEventListener('click', () => selecionarPapel(botao.dataset.papel));
});

$('#form-login').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const email = $('#email-login').value.trim().toLowerCase();
  const senha = $('#senha-login').value;
  const cred = CREDENCIAIS[estado.papel];

  if (email === cred.email && senha === cred.senha) {
    $('#erro-login').classList.add('oculto');
    telaAuth.classList.add('oculto');
    $('#form-login').reset();
    if (estado.papel === 'medico') {
      estado.medicoLogado = cred;
      abrirPainelMedico();
    } else {
      estado.pacienteLogado = cred;
      abrirPainelPaciente();
    }
  } else {
    $('#erro-login').classList.remove('oculto');
  }
});

const painelMedico = $('#painel-medico');
const painelPaciente = $('#painel-paciente');

function fecharTodosPaineis() {
  painelMedico.classList.remove('ativo');
  painelPaciente.classList.remove('ativo');
}

function abrirPainelMedico() {
  fecharTodosPaineis();
  painelMedico.classList.add('ativo');
  renderizarReceitasEmitidas();
  window.scrollTo(0, 0);
}

function abrirPainelPaciente() {
  fecharTodosPaineis();
  painelPaciente.classList.add('ativo');
  renderizarReceitasPaciente();
  window.scrollTo(0, 0);
}

$$('[data-sair]').forEach(botao => botao.addEventListener('click', () => {
  fecharTodosPaineis();
  estado.medicoLogado = null;
  estado.pacienteLogado = null;
  sitePublico.classList.remove('oculto');
  window.scrollTo(0, 0);
}));

$('#lista-pacientes').addEventListener('click', (evento) => {
  const botao = evento.target.closest('[data-paciente]');
  if (!botao) return;
  $$('#lista-pacientes button').forEach(b => b.classList.remove('selecionado'));
  botao.classList.add('selecionado');
  $('#paciente-receita').value = botao.dataset.paciente;
});

const botaoNovoPaciente = $('#botao-novo-paciente');
const formNovoPaciente = $('#novo-paciente-form');
const inputNovoPaciente = $('#novo-paciente-nome');

botaoNovoPaciente.addEventListener('click', () => {
  formNovoPaciente.classList.remove('oculto');
  botaoNovoPaciente.classList.add('oculto');
  inputNovoPaciente.focus();
});

$('#cancelar-novo-paciente').addEventListener('click', () => {
  formNovoPaciente.classList.add('oculto');
  botaoNovoPaciente.classList.remove('oculto');
  inputNovoPaciente.value = '';
});

$('#confirmar-novo-paciente').addEventListener('click', adicionarNovoPaciente);
inputNovoPaciente.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    adicionarNovoPaciente();
  }
});

function adicionarNovoPaciente() {
  const nome = inputNovoPaciente.value.trim();
  if (!nome) return;

  $$('#lista-pacientes button').forEach(b => b.classList.remove('selecionado'));

  const li = document.createElement('li');
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'selecionado';
  botao.dataset.paciente = nome;
  botao.innerHTML = `<strong>${nome}</strong><span>Novo paciente</span>`;
  li.appendChild(botao);
  $('#lista-pacientes').prepend(li);

  $('#paciente-receita').value = nome;

  formNovoPaciente.classList.add('oculto');
  botaoNovoPaciente.classList.remove('oculto');
  inputNovoPaciente.value = '';
}

function novaLinhaMedicamento(nome = '', posologia = '') {
  const id = estado.proximoIdMedicamento++;
  const div = document.createElement('div');
  div.className = 'linha-medicamento';
  div.dataset.id = id;
  div.innerHTML = `
    <div class="campo" style="margin-bottom:0;">
      <label>Medicamento</label>
      <input type="text" class="campo-nome-medicamento" value="${nome}" placeholder="Ex.: Amoxicilina 500mg" required>
    </div>
    <div class="campo" style="margin-bottom:0;">
      <label>Posologia</label>
      <input type="text" class="campo-posologia-medicamento" value="${posologia}" placeholder="Ex.: de 8 em 8h, por 7 dias" required>
    </div>
    <button type="button" class="botao-remover" aria-label="Remover medicamento">✕</button>
  `;
  div.querySelector('.botao-remover').addEventListener('click', () => div.remove());
  $('#lista-medicamentos').appendChild(div);
}

$('#botao-adicionar-medicamento').addEventListener('click', () => novaLinhaMedicamento());
novaLinhaMedicamento('Amoxicilina 500mg', 'de 8 em 8h, por 7 dias');

const modalAssinar = $('#modal-assinar');
let receitaPendente = null;

$('#form-receita').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const paciente = $('#paciente-receita').value.trim();
  const medicamentos = [...$$('.linha-medicamento')].map(linha => ({
    nome: linha.querySelector('.campo-nome-medicamento').value.trim(),
    posologia: linha.querySelector('.campo-posologia-medicamento').value.trim()
  })).filter(m => m.nome);

  if (!paciente || medicamentos.length === 0) return;

  receitaPendente = {
    paciente,
    medico: estado.medicoLogado.nome,
    crm: estado.medicoLogado.crm,
    medicamentos,
    orientacoes: $('#orientacoes').value.trim()
  };

  const resumo = $('#resumo-receita');
  resumo.innerHTML = `
    <p><strong>Paciente:</strong> ${receitaPendente.paciente}</p>
    <ul style="padding-left:18px;margin:10px 0;">
      ${medicamentos.map(m => `<li>${m.nome} — ${m.posologia}</li>`).join('')}
    </ul>
    ${receitaPendente.orientacoes ? `<p>${receitaPendente.orientacoes}</p>` : ''}
  `;
  $('#selo-confirmado').classList.add('oculto');
  $('#botao-confirmar-assinatura').classList.remove('oculto');
  modalAssinar.classList.add('ativo');
});

async function gerarHashSha256(texto) {
  const codificado = new TextEncoder().encode(texto);
  const buffer = await crypto.subtle.digest('SHA-256', codificado);
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

$('#botao-confirmar-assinatura').addEventListener('click', async () => {
  if (!receitaPendente) return;
  const agora = new Date();
  const dataHora = agora.toLocaleDateString('pt-BR') + ' ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const conteudoParaHash = JSON.stringify({ ...receitaPendente, dataHora });
  const hash = await gerarHashSha256(conteudoParaHash);

  estado.contadorReceitas++;
  const novaReceita = {
    id: `RS-${estado.contadorReceitas}`,
    ...receitaPendente,
    dataHora,
    hash
  };
  estado.receitas.unshift(novaReceita);

  $('#selo-confirmado').classList.remove('oculto');
  $('#botao-confirmar-assinatura').classList.add('oculto');

  renderizarReceitasEmitidas();

  setTimeout(() => {
    modalAssinar.classList.remove('ativo');
    $('#form-receita').reset();
    $('#lista-medicamentos').innerHTML = '';
    novaLinhaMedicamento();
    receitaPendente = null;
  }, 1400);
});

function formatarHashCurto(hash) {
  return hash.length > 12 ? `${hash.slice(0, 6)}…${hash.slice(-4)}` : hash;
}

function renderizarReceitasEmitidas() {
  const lista = $('#lista-emitidas');
  lista.innerHTML = '';
  if (estado.receitas.length === 0) {
    lista.innerHTML = '<p style="color:var(--cinza-700);font-size:0.9rem;">Nenhuma receita emitida ainda.</p>';
    return;
  }
  estado.receitas.forEach(receita => {
    const li = document.createElement('li');
    const botao = document.createElement('button');
    botao.className = 'item-receita';
    botao.innerHTML = `
      <span>
        <strong>${receita.paciente}</strong>
        <span>#${receita.id} · ${receita.dataHora}</span>
      </span>
      <span class="assinado" style="white-space:nowrap;">✓ assinada</span>
    `;
    botao.addEventListener('click', () => abrirDetalheReceita(receita));
    li.appendChild(botao);
    lista.appendChild(li);
  });
}

function renderizarReceitasPaciente() {
  const lista = $('#lista-paciente-receitas');
  lista.innerHTML = '';
  const receitasDoPaciente = estado.receitas.filter(r => r.paciente === 'João Ferreira Lima');
  if (receitasDoPaciente.length === 0) {
    lista.innerHTML = '<p style="color:var(--cinza-700);font-size:0.9rem;">Nenhuma receita disponível ainda.</p>';
    return;
  }
  receitasDoPaciente.forEach(receita => {
    const li = document.createElement('li');
    const botao = document.createElement('button');
    botao.className = 'item-receita';
    botao.innerHTML = `
      <span>
        <strong>${receita.medico}</strong>
        <span>#${receita.id} · ${receita.dataHora}</span>
      </span>
      <span class="assinado" style="white-space:nowrap;">✓ assinada</span>
    `;
    botao.addEventListener('click', () => abrirDetalheReceita(receita));
    li.appendChild(botao);
    lista.appendChild(li);
  });
}

const modalDetalhe = $('#modal-detalhe');

function abrirDetalheReceita(receita) {
  $('#conteudo-detalhe').innerHTML = `
    <div class="folha-receita" id="folha-atual">
      <div class="folha-topo">
        <div class="folha-marca">
          <img src="assets/logo.jpeg" alt="Receita Segura">
          <div>
            <strong>Receita Segura</strong>
            <span>receita médica digital</span>
          </div>
        </div>
        <span class="folha-rx">℞</span>
      </div>

      <div class="folha-corpo">
        <div class="folha-linha">
          <span><strong style="color:var(--tinta);">${receita.medico}</strong><br>CRM ${receita.crm}</span>
          <span style="text-align:right;">Receita #${receita.id}<br>${receita.dataHora}</span>
        </div>
        <div class="folha-linha" style="margin-bottom:0;">
          <span><strong style="color:var(--tinta);">Paciente:</strong> ${receita.paciente}</span>
        </div>
      </div>

      <div class="folha-medicamentos">
        <h4>Medicamentos</h4>
        <ul>
          ${receita.medicamentos.map(m => `<li><strong>${m.nome}</strong><span>${m.posologia}</span></li>`).join('')}
        </ul>
      </div>

      ${receita.orientacoes ? `
      <div class="folha-orientacoes">
        <h4>Recomendações</h4>
        <p>${receita.orientacoes}</p>
      </div>` : ''}

      <div class="folha-assinatura">
        <span class="folha-selo">✓ ASSINADO DIGITALMENTE</span>
        <span class="folha-hash">SHA-256: ${formatarHashCurto(receita.hash)}</span>
      </div>

      <p class="folha-rodape-legal">Documento gerado pela plataforma Receita Segura — verificável pelo hash acima. Protótipo de demonstração, não possui validade legal.</p>
    </div>

    <button type="button" class="botao botao-secundario" style="width:100%;margin-top:16px;" onclick="window.print()">🖨️ Baixar / imprimir receita</button>
  `;
  modalDetalhe.classList.add('ativo');
}

$$('[data-fechar-modal]').forEach(botao => {
  botao.addEventListener('click', () => {
    modalAssinar.classList.remove('ativo');
    modalDetalhe.classList.remove('ativo');
  });
});
$$('.sobreposicao').forEach(sobreposicao => {
  sobreposicao.addEventListener('click', (evento) => {
    if (evento.target === sobreposicao) sobreposicao.classList.remove('ativo');
  });
});
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    modalAssinar.classList.remove('ativo');
    modalDetalhe.classList.remove('ativo');
  }
});

renderizarReceitasEmitidas();
