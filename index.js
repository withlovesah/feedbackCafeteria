import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const app = express();
let listaFeedbacks = [];

app.use(express.urlencoded({ extended: true }));

// Rota para processar o formulário
app.get("/", (req, res) => {
    res.send('<h1>Bem-vindo ao sistema de Feedback da Cafeteria ☕</h1><hr><a href="/feedback">Deixar feedback</a>');
});

app.get('/feedback', (req, res) => {
    res.write(`
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Feedback da Cafeteria</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

        <style>
          body {
            background-color: #f3efe9;
          }
          .card {
            border-radius: 15px;
          }
          .titulo {
            color: #6f4e37;
            font-weight: bold;
          }
          .btn-cafe {
            background-color: #6f4e37;
            color: white;
          }
          .btn-cafe:hover {
            background-color: #5a3d2b;
          }
        </style>
      </head>
      <body>
        <div class="container mt-5">
          <form method="POST" action="/feedback" class="border p-4">
            <legend><h3>Feedback da Cafeteria ☕</h3></legend>

            <div class="mb-3">
              <label class="form-label">Nome</label>
              <input type="text" name="nome" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Produto consumido</label>
              <input type="text" name="produto" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Nota (1 a 5)</label>
              <select name="nota" class="form-select" required>
                <option value="">Selecione</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Comentário</label>
              <textarea name="comentario" class="form-control"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Enviar Feedback</button>
          </form>
        </div>
      </body>
    </html>
  `);
  res.end();
});

app.post('/feedback', (req, res) => {
    const { nome, produto, nota, comentario } = req.body;

    listaFeedbacks.push({
        nome,
        produto,
        nota,
        comentario
    });

    res.redirect('/listaFeedbacks');
});

app.get('/listarFeedbacks', (req, res) => {
    res.write(`
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Lista de Feedbacks</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="container mt-5">
          <h3>Feedbacks Recebidos</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Produto</th>
                <th>Nota</th>
                <th>Comentário</th>
              </tr>
            </thead>
            <tbody>
  `);

  for(let i=0; i< listaFeedbacks.length; i++){
    const f = listaFeedbacks[i];
    res.write(`
      <tr>
        <td>${i + 1}</td>
        <td>${f.nome}</td>
        <td>${f.produto}</td>
        <td>${f.nota}</td>
        <td>${f.comentario}</td>
      </tr>
    `);
  }

  res.write(`
            </tbody>
          </table>
          <a href="/feedback" class="btn btn-primary">Novo Feedback</a>
        </div>
      </body>
    </html>
  `);

  res.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});