using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class UserHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;
    public UserHandler()
    {
      var builder = WebApplication.CreateBuilder();
      rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
      conexion = new SqlConnection(rutaConexion);
    }

    public List<UsuarioModel> GetEmployees()
    {
      List<UsuarioModel> employees = new List<UsuarioModel>();
      string consulta = "SELECT * FROM dbo.Usuario WHERE dbo.Usuario.TipoUsuario = 1";
      DataTable tablaResultado = CreateTableConsult(consulta);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        employees.Add(
          new UsuarioModel
          {
            Cedula = Convert.ToString(columna["Cedula"]),
            Contrasena = Convert.ToString(""),
            Nombre = Convert.ToString(columna["Nombre"]),
            Apellido1 = Convert.ToString(columna["Apellido1"]),
            Apellido2 = Convert.ToString(columna["Apellido2"]),
            Telefono = Convert.ToString(columna["Telefono"]),
            TipoUsuario = Convert.ToInt32(columna["TipoUsuario"]),
            Provincia = Convert.ToString(columna["Provincia"]),
            Canton = Convert.ToString(columna["Canton"]),
            CodigoPostal = Convert.ToString(columna["CodigoPostal"]),
          });
      }
      return employees;
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
  }
}
