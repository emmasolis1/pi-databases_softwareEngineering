using planilla_backend_asp.net.BDProcedures;
using planilla_backend_asp.net.Models;

namespace planilla_backend_asp.net.BussinessLogic
{
    public class RegistroEmpleadorLogic
    {
        public static void registroEmpleador(EmpleadorModel empleador)
        {
            
            int ingreso = EmpleadorBDProcedures.IngresarEmpleador(empleador);
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
