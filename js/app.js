const abreFormCad = document.getElementById("abreFormularioNoticia");
const aside = document.getElementsByClassName("aside");
const txtBusca = document.getElementById("valorTexto");

//variaveis
let inputTitulo, textareaNoticia, itemConteudo;

//Array Local
let itens = [];
let objBusca = [];
let txtProcura;
localStorage.dbNoticia = "[]";

//Abre formulario
function abreFormularioCadastro(){

    aside[0].innerHTML = `
                        <form id="formulario" action="">
                            <h2>CADASTRO</h2>
                            <input type="text" id="titulo" name="titulo" placeholder="Digite o Titulo">
                            <textarea id="noticia" name="noticia" cols="30" rows="10" placeholder="Digite a noticia"></textarea>
                            <div class="divBotoes">
                                <input onclick="limpaFormulario()" type="button" value="CANCELAR">
                                <input onclick="cadastroNoticia()" id="cmdCadastrar" type="button" value="CADASTRAR">
                                <input onclick="fechaFormulario()" type="button" value="FECHAR">
                            </div>
                        </form>
                        `;

}

//Botao Cadastrar Formulario
function cadastroNoticia(){

    inputTitulo = document.getElementById("titulo");
    textareaNoticia = document.getElementById("noticia");

    if(inputTitulo && textareaNoticia){

        itens.push({
                    titulo: `${inputTitulo.value}`,
                    noticia: `${textareaNoticia.value}`
                    });

        localStorage.setItem("dbNoticia", JSON.stringify(itens));

        alert("Registro Ativo Incluido Com Sucesso ! ! !");

        limpaFormulario();

    }
}

//botao limpa formulario
function limpaFormulario(){

    inputTitulo.value = "";
    textareaNoticia.value = "";

    inputTitulo.focus();

}

//botao fecha formulario
function fechaFormulario(){

    aside[0].innerHTML = "";

}

//botao exibir noticias
function exibirNoticias(){

    itens = JSON.parse(localStorage.getItem("dbNoticia"));

    //console.log(itens);

    itemConteudo = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Noticia</th>
                            </tr>
                        </thead>
                     <tbody>
                    `;

    itens.map(function(item){
                            itemConteudo += `
                                            <tr>
                                                <td>${item.titulo}</td>
                                                <td>${item.noticia}</td>
                                             </tr>
                                            `;

                            });

    itemConteudo += `
                        </tbody>
                        </table>
                    `;

    aside[0].innerHTML = itemConteudo;

}

//botao busca noticia
function buscarNoticia(){

   if(txtBusca.value){

        txtProcura = txtBusca.value;

        objBusca = JSON.parse(localStorage.getItem("dbNoticia"));

        itens = objBusca.filter(function(item){

                                    //if(item.titulo.search(txtProcura)){
                                    if(item.titulo.match(txtProcura)){
                                        return item;
                                    }

                                });

        //console.log(itens);
        
        itemConteudo = `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Noticia</th>
                                </tr>
                            </thead>
                            <tbody>
                        `;

        if(itens.length != 0){

            itemConteudo = `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Noticia</th>
                                </tr>
                            </thead>
                            <tbody>
                        `;

            itemConteudo += itens.map(function(item){

                                    return `
                                            <tr>
                                                <td>${item.titulo}</td>
                                                <td>${item.noticia}</td>
                                            </tr>
                                            `;

                                        })

        }else{

            itemConteudo += `
                            <tr>
                                <td>ITEM NAO ENCONTRADO</td>
                                <td>...</td>
                            </tr>
                            `;
        }

        itemConteudo += `
                        </tbody>
                    </table>
                    `;

        aside[0].innerHTML = itemConteudo;

   }else{
        aside[0].innerHTML = "VALOR DE BUSCA INVALIDO ! ! !";
   }

}