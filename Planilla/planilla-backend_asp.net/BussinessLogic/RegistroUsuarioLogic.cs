using planilla_backend_asp.net.BDProcedures;
using planilla_backend_asp.net.Models;

namespace planilla_backend_asp.net.BussinessLogic
{
    public class RegistroUsuarioLogic
    {
        public static int RegistroUsuario(UsuarioModel empleador)
        {
            int ingreso = UsuarioBDProcedures.IngresarUsuario(empleador);
            if (ingreso != 1)
            {
                throw new Exception("Datos insuficientes");
            }
            else
            {
                Console.WriteLine("Datos ingresados.");
            }
            return ingreso;
        }

        public static List<UsuarioModel> ObtenerEmpleados()
        {
          UsuarioBDProcedures consulta = new UsuarioBDProcedures();
          var data = consulta.GetEmployees();
          
          return data;
        }
  }
}
