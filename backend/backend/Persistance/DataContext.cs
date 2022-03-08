using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Persistence
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Booking> Bookings { get; set; }
    }
}
