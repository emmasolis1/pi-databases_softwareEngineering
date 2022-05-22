using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.BussinessLogic;

namespace planilla_backend_asp.net.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistroUsuarioController: ControllerBase
    {
        [HttpPost(Name = "GetRegistroEmpleador")]
        public void RegistrarEmpleador(UsuarioModel usuario)
        {
            try
            {
                RegistroUsuarioLogic.registroUsuario(usuario);
            }
            catch(Exception error)
            {
                Console.WriteLine(error);
            }

        }
    }
}
