var btnSalvar = document.querySelector("#btnSalvar");
btnSalvar.addEventListener("click", function(event) {
	console.log("Saved");
	event.preventDefault();

	var tr = document.createElement("tr");
	tr.classList.add("produto");
	var tdFoto 	= document.createElement("td");
	var tdNome 	= document.createElement("td");
	tdNome.classList.add("nome");
	var tdQtde 	= document.createElement("td");
	var tdPreco = document.createElement("td");
	var tdBotoes= document.createElement("td");

	var form = document.querySelector("#form-produto");

	tdNome.textContent = form.nome.value;
	tdQtde.textContent = form.qtde.value;
	tdPreco.textContent = "R$ " + form.preco.value;

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
} );

function criarBotao(cor, icone){
	var i 	= document.createElement("i");
	var btn 	= document.createElement("button");
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
	botao.addEventListener("click", function(event){
		console.log("editar");
var linha 
	if(event.target.hasChildNodes()) {
		linha = event.target.parentNode.parentNode;
	} else {
		linha = event.target.parentNode.parentNode.parentNode;
		}
		console.log(linha);
	});
});
