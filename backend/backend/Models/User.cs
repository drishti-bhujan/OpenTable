using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        [Required]
        public string Fname { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        [Required]
        public string LName { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        [Required]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(8)")]
        [Required]
        public string PNumber { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        [Required]
        [MinLength(6)]
        [MaxLength(40)]
        public string Password { get; set; }


    }
}
