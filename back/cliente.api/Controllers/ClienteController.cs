using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cliente.api.models;
using Microsoft.AspNetCore.Mvc;

namespace cliente.api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        public static List<Cliente> _clientes;

        public ClienteController()
        {
            if(_clientes is null)
                _clientes = new List<Cliente>();
        }


        [HttpPost("cadastrar")]
        public IActionResult Cadastrar(Cliente cliente)
        {
            var nomeSplit = cliente.Nome.Split(" ");

            if(nomeSplit.Length < 2)
                return BadRequest("Você precisa informar nome e sobrenome");

            cliente.Nome = cliente.Nome.ToUpperInvariant();
            cliente.Cpf = cliente.Cpf.Replace(".","").Replace("-","");

            _clientes.Add(cliente);

            return Ok($"Cliente {cliente.Nome} cadastrado com sucesso!");
        }

        [HttpGet("buscarTodos")]
        public List<Cliente> BuscarTodos()
        {
            Console.WriteLine("Clicou em buscarTodos");
            return _clientes;
        }

        [HttpDelete("deletar/por-email/{email}")]
        public IActionResult DeletarPorEmail(string email)
        {
            var clienteEncontrado = _clientes.FirstOrDefault(
                x => x.Email == email
            );

            if(clienteEncontrado is null)
                return BadRequest("Cliente não encontrado");

            _clientes.Remove(clienteEncontrado);

            return Ok("Cliente deletado com sucesso");
        }

        [HttpPut("atualizar")]
        public IActionResult Atualizar(Cliente cliente)
        {
            var clienteEncontrado = _clientes.FirstOrDefault(
                x => x.Email == cliente.Email
            );

            if(clienteEncontrado is null)
                return BadRequest("Cliente não encontrado");

            var clienteIndex = _clientes.FindIndex(x => x.Email == cliente.Email);

            _clientes[clienteIndex].Cpf = cliente.Cpf;
            _clientes[clienteIndex].Nome = cliente.Nome;

            return Ok(_clientes[clienteIndex]);
        }
    }
}