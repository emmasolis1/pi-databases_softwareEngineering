using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.BussinessLogic;

namespace planilla_backend_asp.net.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistroEmpleadorController: ControllerBase
    {

        [HttpPost(Name = "GetRegistroEmpleador")]
        public void RegistrarEmpleador(EmpleadorModel empleador)
        {
            try
            {
                
                RegistroEmpleadorLogic.registroEmpleador(empleador);
            }
            catch(Exception error)
            {
                Console.WriteLine(error);
            }

        }
    }
}
