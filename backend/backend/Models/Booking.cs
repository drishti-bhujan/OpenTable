using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Bookings")]
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Location { get; set; }

        [Required]
        [StringLength(255)]
        public string Date  { get; set; }

        [Required]
        [StringLength(255)]
        public string Time { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]  

        public virtual User User { get; set; }

    }
}
