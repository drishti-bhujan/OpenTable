using backend.Models;

namespace backend.Interface
{
    public interface ITokenService
    {
        string CreateToken(User user); 
    }
}
