using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Persistence;
using backend.DTO;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public UserController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService; 
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/User/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("Register")]
        public async Task<ActionResult<AuthDTO>> Register(User registerUser)
        {
            if (await UserExistsAuth(registerUser.Email)) return BadRequest ("Email is taken");

            var user = new User
            {
                Id = registerUser.Id,
                Fname = registerUser.Fname,
                LName = registerUser.LName,
                Email = registerUser.Email.ToLower(),
                PNumber = registerUser.PNumber,
                Password = registerUser.Password
            }; 

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return new AuthDTO
            {
                id= user.Id,
                email = user.Email,
                fname=user.Fname,
                lname = user.LName,
                Token = _tokenService.CreateToken(user)

            }; 
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthDTO>> Login (LoginDTO loginDto)
        {
            var user = await _context.User.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user ==null ) return Unauthorized("Invalid Username");

            if (user.Password != loginDto.Password) return Unauthorized("Invalid Password");

            return new AuthDTO
            {
                id = user.Id,
                email = user.Email,
                fname = user.Fname,
                lname = user.LName,
                Token = _tokenService.CreateToken(user)
            };

        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }

        private async Task<bool> UserExistsAuth(string email)
        {
            return await _context.User.AnyAsync(e => e.Email == email);
        }
    }
}
