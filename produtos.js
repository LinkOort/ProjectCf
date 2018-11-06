var btnConfirmar = criarBotao("btn-success", "fa-check");
var linha;
var btnSalvar = document.querySelector("#btnSalvar");
var form = document.querySelector("#form-produto");

function criarLinha(nome, qtde, preco){
	var tr = document.createElement("tr");
	tr.classList.add("produto");
	var tdFoto 	= document.createElement("td");
	var tdNome 	= document.createElement("td");
	tdNome.classList.add("nome");
	var tdQtde 	= document.createElement("td");
	tdQtde.classList.add("qtde");
	var tdPreco = document.createElement("td");
	tdPreco.classList.add("preco");
	var tdBotoes= document.createElement("td");

	tdNome.textContent = nome;
	tdQtde.textContent = qtde;
	tdPreco.textContent = "R$" + preco;

	tr.appendChild(tdFoto);
	tr.appendChild(tdNome);
	tr.appendChild(tdQtde);
	tr.appendChild(tdPreco);
	tr.appendChild(tdBotoes);

	var table = document.querySelector("#table");
	table.appendChild(tr);
	var btnApagar = criarBotao("btn-danger", "fa-trash-alt");
	btnApagar.addEventListener("click", apagarProduto);
	var btnEditar = criarBotao("btn-primary", "fa-edit");
	var btnCopiar = criarBotao("btn-warning", "fa-copy");
	tdBotoes.appendChild(btnApagar);
	tdBotoes.appendChild(btnEditar);
	tdBotoes.appendChild(btnCopiar);
}

btnSalvar.addEventListener("click", function(event) {
	event.preventDefault();
	criarLinha(form.nome.value, form.qtde.value, form.preco.value);
	localStorage.setItem("nome", form.nome.value);
	//GgetItem busca o item
});

function criarBotao(cor, icone){
	var i = document.createElement("i");
	var btn = document.createElement("button");
	btn.appendChild(i);
	btn.classList.add("btn", cor);
	i.classList.add("fas", icone);
	return btn;
}

var btnApagar = document.querySelectorAll(".btn-apagar");
btnApagar.forEach(function(botao) {
	botao.addEventListener("click", apagarProduto);
});
function apagarProduto(event) {
		var linha 
		if(event.target.hasChildNodes()) {
			linha = event.target.parentNode.parentNode;
		} else {
			linha = event.target.parentNode.parentNode.parentNode;
		}
		linha.classList.add("fade-out");
		setTimeout(function(){
		linha.remove();	
		}, 305);
}
filtro.addEventListener("input", function(){
	console.log(filtro.value);
	var produtos= document.querySelectorAll(".produto");
	var busca = filtro.value;	
	var expressao = RegExp(busca, "i");

	produtos.forEach(function (produto){
			var nome = produto.querySelector(".nome").textContent;
			if (expressao.test(nome)){
				produto.classList.remove("invisivel");
				//Esconder linha
			} else {
			    produto.classList.add("invisivel");
			    //Mostrar linha
			}
	});
	// Caso a busca estiver vazia, mostre tds os produtos.
	if (busca.lenght == 0){
		produtos.forEach(function (produto){
			produto.classList.remove("invisivel");
		});			
	}
});
var btnEditar = document.querySelectorAll(".btn-editar");
btnEditar.forEach(function(botao){
	botao.addEventListener("click", editarProduto);
});
function editarProduto(event){
	if(event.target.hasChildNodes()) {
		linha = event.target.parentNode.parentNode;
	} else {
		linha = event.target.parentNode.parentNode.parentNode;
		}
		var nome = linha.querySelector(".nome").textContent;
		var qtde = linha.querySelector(".qtde").textContent;
		var preco = linha.querySelector(".preco").textContent;
		form.nome.value = nome;
		form.qtde.value = qtde;
		form.preco.value = preco;
		btnSalvar.classList.add("invisivel");
		form.appendChild(btnConfirmar);
}
btnConfirmar.addEventListener("click", function(event){
	event.preventDefault();
	linha.querySelector(".nome").textContent = form.nome.value;
	linha.querySelector(".qtde").textContent = form.qtde.value;
	//substring
	var p = form.preco.value
	if (p.substring(0,2) == "R$")
		linha.querySelector(".preco").textContent = p;
	else 
		linha.querySelector(".preco").textContent = "R$" + p;
	btnConfirmar.remove();
	btnSalvar.classList.remove("invisivel");
});

//Salvar o nome dos produtos;
