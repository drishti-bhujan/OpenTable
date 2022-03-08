using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Persistence;
using Microsoft.Data.SqlClient;
using System.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

namespace backend.Controllers
{

    public class BookingsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public BookingsController(DataContext context, IConfiguration configuration, IWebHostEnvironment env)
        {
            _context = context;
            _configuration = configuration;
            _env = env;
        }


        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings.ToListAsync();
        }

        // GET: api/Bookings/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Booking>> GetBooking(int id)
        //{
        //    var booking = await _context.Bookings.FindAsync(id);

        //    if (booking == null)
        //    {
        //        return NotFound();
        //    }

        //    return booking;
        //}

        [HttpGet("ViewBookings")]
        public ActionResult<List<Booking>> GetBooking(int id)
        {

            ///var booking = await _context.Bookings.FindAsync(id);
            List<Booking> lst = new List<Booking>();

            Debug.WriteLine("id:" + id);

            string queryString = "select * FROM restaurantbooking.dbo.Bookings WHERE UserId=@id";

            string sqlDataSource = _configuration.GetConnectionString("Default");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                SqlCommand command = new SqlCommand(queryString, connection);

                command.Parameters.AddWithValue("@id", id);

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {

                        lst.Add(new Booking()
                        {
                            Id = (int)reader[0],
                            Location = Convert.ToString(reader[1]),
                            Date = Convert.ToString(reader[2]),
                            Time = Convert.ToString(reader[3]),
                            UserId = (int)reader[4]

                        });

                    }
                }

                Debug.WriteLine("My list:" + lst);

                reader.Close();
                connection.Close();
            }

            return lst;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Booking>> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return booking;
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}
