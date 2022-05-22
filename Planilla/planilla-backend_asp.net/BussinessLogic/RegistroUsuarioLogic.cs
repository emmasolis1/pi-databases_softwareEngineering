using planilla_backend_asp.net.BDProcedures;
using planilla_backend_asp.net.Models;

namespace planilla_backend_asp.net.BussinessLogic
{
    public class RegistroUsuarioLogic
    {
        public static void registroUsuario(UsuarioModel empleador)
        {
            
            int ingreso = UsuarioBDProcedures.ingresarUsuario(empleador);
            if (ingreso != 1)
            {
                throw new Exception("No se lograron ingresar los datos");
            }
            else
            {
                Console.WriteLine("Datos ingresados.");
            }
        
        }

    }
}
