using planilla_backend_asp.net.Models;
using System.Data;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.BDProcedures
{
    public  class EmpleadorBDProcedures
    {
        private static SqlConnection conexion;
        private string rutaConexion;
        public EmpleadorBDProcedures()
        {
            var builder = WebApplication.CreateBuilder();
            rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
            conexion = new SqlConnection(rutaConexion);
        }

        private DataTable CreateTableConsult(string consult)
        {
            SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
            SqlDataAdapter adaptadorParaTabla = new
            SqlDataAdapter(comandoParaConsulta);
            DataTable consultaFormatoTabla = new DataTable();
            conexion.Open();
            adaptadorParaTabla.Fill(consultaFormatoTabla);
            conexion.Close();
            return consultaFormatoTabla;
        }
        public List<EmpleadorModel> ObtenerEmpleadores()
        {
            List<EmpleadorModel> employers = new List<EmpleadorModel>();
            string consult = "SELECT * FROM dbo.Empleador";
            DataTable tablaResultado = CreateTableConsult(consult);
            foreach (DataRow columna in tablaResultado.Rows)
            {
                employers.Add(
                new EmpleadorModel
                {
                    Cedula = Convert.ToString(columna["Cedula"]),
                    Contrasena = Convert.ToString(columna["Contrasena"]),
                    Nombre = Convert.ToString(columna["Nombre"]),
                    Apellido1 = Convert.ToString(columna["Apellido1"]),
                    Apellido2 = Convert.ToString(columna["Apellido2"]),
                    Telefonos = Convert.ToString(columna["Telefonos"]),
                    IdProvincia = Convert.ToInt32(columna["IdProvincia"]),
                    IdCanton = Convert.ToInt32(columna["IdCanton"]),
                    IdCodigoPostal = Convert.ToInt32(columna["IdCodigoPostal"]),
                });
            }
            return employers;
        }
        public static int IngresarEmpleador(EmpleadorModel empleador)
        {
            int result=0;
            
            int direccion=0;

            string parametros = "'" + empleador.Cedula + "','" + empleador.Contrasena + "','" + empleador.Nombre + "','" + empleador.Apellido1 +
                "','" + empleador.Apellido2 + "','" + empleador.Telefonos + "','" + direccion + "'";
            string command = "Insert into Empleador Values(" + parametros + ")";
            SqlCommand comandoIngreso = new SqlCommand(command, conexion);
            try
            {
                conexion.Open();
                comandoIngreso.ExecuteNonQuery();
                conexion.Close();
                result = 1;

            }
            catch(SqlException ex)
            {
                Console.WriteLine(ex);
                result = 2;
            }

            return result;
        }
    }
}
