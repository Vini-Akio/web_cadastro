const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sDescricao = document.querySelector('#m-descricao');
const sPreco = document.querySelector('#m-preco');
const btnSalvar = document.querySelector('#btnSalvar');

let produtos;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sNome.value = produtos[index].nome;
    sDescricao.value = produtos[index].descricao;
    sPreco.value = produtos[index].preco;
    id = index;
  } else {
    sNome.value = '';
    sDescricao.value = '';
    sPreco.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  produtos.splice(index, 1);
  setProdutosBD();
  loadProdutos();
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.preco.toFixed(2)}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);

  
  tr.querySelectorAll('.acao i').forEach(icon => {
    icon.style.color = '#ffffff';
  });
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sDescricao.value == '' || sPreco.value == '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    produtos[id].nome = sNome.value;
    produtos[id].descricao = sDescricao.value;
    produtos[id].preco = parseFloat(sPreco.value);
  } else {
    produtos.push({'nome': sNome.value, 'descricao': sDescricao.value, 'preco': parseFloat(sPreco.value)});
  }

  setProdutosBD();

  modal.classList.remove('active');
  loadProdutos();
  id = undefined;
};

function loadProdutos() {
  produtos = getProdutosBD();
  tbody.innerHTML = '';
  produtos.forEach((produto, index) => {
    insertItem(produto, index);
  });

}

const getProdutosBD = () => JSON.parse(localStorage.getItem('dbprod')) ?? [];
const setProdutosBD = () => localStorage.setItem('dbprod', JSON.stringify(produtos));

loadProdutos();
