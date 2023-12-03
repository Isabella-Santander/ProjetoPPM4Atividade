import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 4000;
const host =  '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta){
    //extrair os dados do corpo da requisição, além de validar os dados
    const dados = requisicao.body;
    let conteudoResposta = '';
    //é necessario validar os dados enviados
    //A validação dos dados é de responsabilidade da aplicação servidora
    if(!(dados.nome && dados.sobrenome && dados.cidade && dados.uf && dados.curso && dados.obs)){
        //estão faltando dados do usuário!
        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro Aluno</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

        </head>
        <body>
            <div class="container col-4">
                <form  action='/cadastrarUsuario' method="POST"  class="row g-3 needs-validation" novalidate>
                <fieldset class="border p-2 mt-2">

                    <div class="title text-center">
                        <legend class="mb-3" style="color: green;"><b>Cadastro de Alunos</b></legend>
                    </div>

                    <div class="col-md-6">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
                    </div>
        `;
        if(!dados.nome){
        conteudoResposta+=`
                        <div>
                            <p class="text-danger">Por favor, informe seu nome!</p>
                        </div>`;
        }
        conteudoResposta+=`
                        <div class="col-md-6">
                            <label for="sobrenome" class="form-label">Sobrenome</label>
                            <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required>
                        </div>`;
        if(!dados.sobrenome){
        conteudoResposta+=`
                        <div>
                            <p class="text-danger">Por favor, informe seu sobrenome!</p>
                        </div>`;
        }
        conteudoResposta+=`
                        <div class="col-md-6">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" value="${dados.cidade}" required>
                        </div>`;
        if(!dados.cidade){
        conteudoResposta+=`
                        <div>
                            <p class="text-danger">Por favor, informe a sua cidade!</p>
                        </div>`;
        }
        conteudoResposta+=`
                        <div class="col-md-6">
                            <label for="uf" class="form-label">UF</label>
                            <select class="form-select" id="uf" name="uf" value="${dados.uf}" required>
                                <option selected disabled value="">Escolha um estado...</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                                <option value="EX">Estrangeiro</option>
                            </select>
                        </div>`;
        if(!dados.uf){
        conteudoResposta+=`
                        <div>
                            <p class="text-danger">Por favor, selecione um estado!</p>
                        </div>`;
        }
        conteudoResposta+=`
                        <div class="mb-3">
                            <label for="curso" class="form-label">Curso</label>
                            <select class="form-select" id="curso" name="curso" value="${dados.curso}" required aria-label="select example">
                                <option selected disabled value="">Escolha um curso...</option>
                                <option value="ADS">Análise e Desenvolvimento de Sistemas</option>
                                <option value="BSI">Sistemas de Informação</option>
                                <option value="BCC">Cinência da Computação</option>
                            </select>
                        </div>`;
        if(!dados.curso){
        conteudoResposta+=`
                        <div>
                            <p class="text-danger">Por favor, selecione um curso!</p>
                        </div>`;
        }
        conteudoResposta+=`
                        <div class="mb-3">
                            <label for="obs" class="form-label">Observações</label>
                            <textarea class="form-control" id="obs" name="obs" value="${dados.obs}" placeholder="ex: cursos, experiências, etc..." rows="4" required></textarea>
                        </div>`;
        if(!dados.obs){
        conteudoResposta+=`
                        <div>
                            <p class="text-danger">Por gentileza, fale um pouco sobre você.</p>
                        </div>`;
        }
        conteudoResposta+=`
                        <div class="col-12">
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                <label class="form-check-label" for="invalidCheck">
                                    Concorde com os termos e condições
                                </label>
                        </div>

                        <br>
                        <div class="col-12 mt-2">
                            <button class="btn btn-success" type="submit">Cadastrar</button>
                        </div>
                    </fieldset>
                </form>
             </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
        </html>`;
        resposta.end(conteudoResposta);
    }
    else{
        const usuario = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            cidade: dados.cidade,
            uf: dados.uf,
            curso: dados.curso,
            obs: dados.obs,
        }
        //adiciona um novo usuário na lista de usuários já cadastrados
        listaUsuarios.push(usuario);
        //retornar

        conteudoResposta =`
        <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Alunos Cadastrados</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            </head>
            <body>
                <h1 style="color: green; text-align: center;">Lista de Alunos cadastrados</h1>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Cidade/UF</th>
                            <th>Curso</th>
                            <th>Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody> `;

                    for (const usuario of listaUsuarios){
                        conteudoResposta += `
                            <tr>
                                <td>${usuario.nome}</td>
                                <td>${usuario.sobrenome}</td>
                                <td>${usuario.cidade}/${usuario.uf}</td>
                                <td>${usuario.curso}</td>
                                <td>${usuario.obs}</td>
                            <tr>
                        `;
                    }

                    conteudoResposta += `
                                </tbody>
                            </table>
                            <a class="btn btn-danger" href="/" role"button"> Voltar ao menu </a>
                            <a class="btn btn-success" href="/cadastroUsuario.html" role"button"> Continuar cadastrando </a>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                        </html>
                    `;
                    resposta.end(conteudoResposta);
        }//fim do if/else
}

function autenticar(requisicao, resposta, next){
    if(requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}

const app = express();

app.use(cookieParser());

app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: false, 
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}));

//indicando para a aplicação como servir arquivos estáticos localizados na pasta paginas.
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', autenticar, (requisicao, resposta) =>{
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });

    resposta.end (`
    <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu do Sistema</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
        <div class="col-4">
            <h1>Menu</h1>
            <nav class="nav flex-column">
                <a style="font-size: 30px;" class="nav-link" href="/cadastroUsuario.html">Cadastrar Aluno</a>
            </nav>
        </div>    
        </body>
        <footer>
            <p>Seu ultimo acesso foi em ${dataUltimoAcesso}</p>
        </footer>
        </html>
        `);
})

app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha && (usuario === 'isabella') && (senha === '123')){
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }
    else{
        resposta.end(`
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <title>Falha na autenticação</title>
                </head>
                <body>
                    <h3>Usuário ou senha inválidos!</h3>
                    <a href="/login.html">Voltar ao Login</a>
                </body>
            </html>
            `);
    }
});

app.post('/cadastrarUsuario' , autenticar, processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});