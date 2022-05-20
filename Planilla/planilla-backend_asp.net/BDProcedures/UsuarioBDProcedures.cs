using planilla_backend_asp.net.Models;
using System.Data;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.BDProcedures
{
    public  class UsuarioBDProcedures
    {
        private static SqlConnection conexion;
        private string rutaConexion;
        public UsuarioBDProcedures()
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
        public List<UsuarioModel> ObtenerEmpleadores()
        {
            List<UsuarioModel> employers = new List<UsuarioModel>();
            string consult = "SELECT * FROM dbo.Usuario";
            DataTable tablaResultado = CreateTableConsult(consult);
            foreach (DataRow columna in tablaResultado.Rows)
            {
                employers.Add(
                new UsuarioModel
                {
                    Cedula = Convert.ToString(columna["Cedula"]),
                    Contrasena = Convert.ToString(columna["Contrasena"]),
                    Nombre = Convert.ToString(columna["Nombre"]),
                    Apellido1 = Convert.ToString(columna["Apellido1"]),
                    Apellido2 = Convert.ToString(columna["Apellido2"]),
                    Telefono = Convert.ToString(columna["Telefonos"]),
                    IdProvincia = Convert.ToInt32(columna["IdProvincia"]),
                    IdCanton = Convert.ToInt32(columna["IdCanton"]),
                    IdCodigoPostal = Convert.ToInt32(columna["IdCodigoPostal"]),
                    IdTipoUsuario = Convert.ToInt32(columna["IdTipoUsuario"]),
                });
            }
            return employers;
        }
        public static int ingresarUsuario(UsuarioModel usuario)
        {
            int result=0;
            try
            {
                int direccion = IngresarDireccion(usuario.IdCodigoPostal, usuario.IdProvincia, usuario.IdCanton);
                if (direccion > 0)
                {
                    result = realizarIngreso(usuario, direccion);
                }
                else
                {
                    throw new Exception("No se ha podido ingresar la direccion");
                }

            }
            catch(Exception ex)
            {
                Console.WriteLine("No se ha logrado registrar el usuario");
            }
            return result;
        }
        public static int realizarIngreso(UsuarioModel usuario, int direccion)
        {
            int result = 0;
            string parametros = "'" + usuario.Cedula + "','" + usuario.Contrasena + "','" + usuario.Nombre + "','" + usuario.Apellido1 +
             "','" + usuario.Apellido2 + "','" + direccion + "','" + usuario.Telefono + "','" + usuario.IdTipoUsuario + "'";
            string command = "Insert into Usuario Values(" + parametros + ")";
            SqlCommand comandoIngreso = new SqlCommand(command, conexion);
            try
            {
                conexion.Open();
                comandoIngreso.ExecuteNonQuery();
                conexion.Close();
                 result = 1;

            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex);

            }
            return result;

        }
        public static int IngresarDireccion(int codPostal, int idProvincia, int idCanton)
        {
            try
            {
                int idDireccion = getCountDirecciones();
                int resultado = idDireccion + 1;
                string parametros = "'" + idDireccion  + "','" + codPostal + "','" + idProvincia + "','" + idCanton + "'";
                string command = "Insert into Dirrecion Values(" + parametros + ")";
                SqlCommand comandoIngreso = new SqlCommand(command, conexion);
                conexion.Open();
                comandoIngreso.ExecuteNonQuery();
                conexion.Close();
                return resultado;

            }
            catch(SqlException ex)
            {
                Console.WriteLine(ex);
                return 0;
            }
           

        }

        public static int getCountDirecciones()
        {
            string command = "Select Count(*) from Direccion";
            SqlCommand comandoSelect = new SqlCommand(command, conexion);
            conexion.Open();
            int totalDirecciones= Convert.ToInt32(comandoSelect.ExecuteScalar());
            conexion.Close();
            return totalDirecciones;
        }
    }
}
