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

    public List<UserSummarizedModel> getAllEmployeesSummarized()
    {
      // Make consult to database
      string consult = "select Usuario.Nombre, Usuario.Apellido1, Usuario.Apellido2, Usuario.Cedula, Usuario.Telefono, Usuario.Canton, Usuario.Provincia from Usuario where Usuario.TipoUsuario=1";
      DataTable tablaResultado = CreateTableConsult(consult);

      // Convert data to list
      List<UserSummarizedModel> employees = new List<UserSummarizedModel>();
      foreach (DataRow columna in tablaResultado.Rows)
      {
        employees.Add(
          new UserSummarizedModel
          {
            NombreCompleto = Convert.ToString(columna["Nombre"]) + " " + Convert.ToString(columna["Apellido1"]) + " " + Convert.ToString(columna["Apellido2"]),
            Cedula = Convert.ToString(columna["Cedula"]),
            Telefono = Convert.ToString(columna["Telefono"]),
            Direccion = Convert.ToString(columna["Canton"]) + ", " + Convert.ToString(columna["Provincia"]),
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

    public void createEmployee(UsuarioModel employee)
    {
      // Make consult to database
      string consult = "insert into Usuario (Nombre, Apellido1, Apellido2, Cedula, Telefono, Canton, Provincia, TipoUsuario, CodigoPostal, Contrasena) values ('" + employee.Nombre + "', '" + employee.Apellido1 + "', '" + employee.Apellido2 + "', " + employee.Cedula + ", " + employee.Telefono + ", '" + employee.Canton + "', '" + employee.Provincia + "', 1, '" + employee.Apellido1 + "', '" + employee.Contrasena + "')";
      SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
      conexion.Open();
      comandoParaConsulta.ExecuteNonQuery();
      conexion.Close();
    }
  }
}
