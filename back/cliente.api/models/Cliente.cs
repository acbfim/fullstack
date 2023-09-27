using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cliente.api.models
{
    public class Cliente
    {
        [Required(ErrorMessage ="O nome é obrigatorio")]
        public string Nome { get; set; }

        [Required]
        [MinLength(11)]
        public string Cpf { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}