const apiUrl = "http://localhost:5216/api";

function salvarCliente() {
  var nome = document.getElementById("nome").value;
  var cpf = document.getElementById("cpf").value;
  var email = document.getElementById("email").value;

  const cliente = {
    nome: nome,
    cpf: cpf,
    email: email,
  };

  console.log(cliente);

  const requestOptions = {
    method: "POST", // Método da requisição
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo do corpo da requisição
    },
    body: JSON.stringify(cliente), // Converter os dados para JSON
  };

  // Fazer a requisição usando fetch
  fetch(apiUrl + "/cliente/cadastrar", requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Erro na requisição"); // Lidar com erros de rede ou da API
    }

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("email").value = "";

    buscarClientes();
  }).catch((error) => {
    console.error(error.message);
    alert("Erro ao tentar acessar o servidor");
  });
}

function buscarClientes() {
  const requestOptions = {
    method: "GET", // Método da requisição
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo do corpo da requisição
    },
  };

  // Fazer a requisição usando fetch
  fetch(apiUrl + "/cliente/buscarTodos", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição"); // Lidar com erros de rede ou da API
      }

      return response.json();
    })
    .then((data) => {
      const tabelaClientes = document.getElementById("tabelaClientes");
      const tbody = tabelaClientes.querySelector("tbody");

      // Limpar qualquer conteúdo anterior na tabela
      tbody.innerHTML = "";

      // Loop pelos clientes e adicioná-los à tabela
      data.forEach((cliente) => {
        const row = document.createElement("tr");
        const nomeCell = document.createElement("td");
        const cpfCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const dataCadastroCell = document.createElement("td");
        const button = document.createElement("button");
        const botaoCancela = document.createElement("button");

        button.textContent = ""; // Nome do botão
        button.className = "btn btn-primary"
        button.insertAdjacentHTML("beforeend", "<i class='fa-solid fa-magnifying-glass'></i>");
        button.onclick = function () {
          mostrarDetalhes(cliente); // Chama a função mostrarDetalhes passando o objeto cliente como argumento
        };

        botaoCancela.className = "btn btn-danger"
        botaoCancela.insertAdjacentHTML("beforeend", "<i class='fa-solid fa-trash'></i>");
        botaoCancela.onclick = function () {
          deletarCliente(cliente.email); // Chama a função mostrarDetalhes passando o objeto cliente como argumento
        };

        nomeCell.textContent = cliente.nome;
        cpfCell.textContent = cliente.cpf;
        emailCell.textContent = cliente.email;

        // Formatar a data no formato brasileiro (dd/mm/yyyy)
        const dataCadastro = new Date(cliente.dataCadastro);
        const dataFormatada = formatarDataHora(cliente.dataCadastro);
        dataCadastroCell.textContent = dataFormatada;

        row.appendChild(nomeCell);
        row.appendChild(cpfCell);
        row.appendChild(emailCell);
        row.appendChild(dataCadastroCell);
        row.appendChild(button);
        row.appendChild(botaoCancela);

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Erro:", error); // Lidar com erros na requisição
    });
}

function formatarDataHora(data) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Formato de 24 horas
  };
  return new Date(data).toLocaleDateString("pt-BR", options);
}

function mostrarDetalhes(modelo)
{
  document.getElementById("nome").value = modelo.nome;
    document.getElementById("cpf").value = modelo.cpf;
    document.getElementById("email").value = modelo.email;
}

function atualizarCliente()
{
  var nome = document.getElementById("nome").value;
  var cpf = document.getElementById("cpf").value;
  var email = document.getElementById("email").value;

  const cliente = {
    nome: nome,
    cpf: cpf,
    email: email,
  };

  console.log(cliente);

  const requestOptions = {
    method: "PUT", // Método da requisição
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo do corpo da requisição
    },
    body: JSON.stringify(cliente), // Converter os dados para JSON
  };

  // Fazer a requisição usando fetch
  fetch(apiUrl + "/cliente/atualizar", requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Erro na requisição"); // Lidar com erros de rede ou da API
    }

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("email").value = "";

    buscarClientes();
  });
}

function deletarCliente(email)
{
  const requestOptions = {
    method: "DELETE", // Método da requisição
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo do corpo da requisição
    },
  };

  // Fazer a requisição usando fetch
  fetch(apiUrl + "/cliente/deletar/por-email/" + email, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Erro na requisição"); // Lidar com erros de rede ou da API
    }

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("email").value = "";

    buscarClientes();
  });
}
