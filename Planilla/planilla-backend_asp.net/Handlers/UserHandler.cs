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

    public List<UserSummarizedModel> GetAllEmployeesSummarized()
    {
      // Make consult to database
      string consult = "select Usuario.Nombre, Usuario.Apellido1, Usuario.Apellido2, Usuario.Cedula, Usuario.Telefono, Usuario.Canton, Usuario.Provincia from Usuario where Usuario.TipoUsuario=1";
      DataTable resultTable = CreateTableConsult(consult);

      // Convert data to list
      List<UserSummarizedModel> employees = new List<UserSummarizedModel>();
      foreach (DataRow columna in resultTable.Rows)
      {
        employees.Add(
          new UserSummarizedModel
          {
            FullName = Convert.ToString(columna["Nombre"]) + " " + Convert.ToString(columna["Apellido1"]) + " " + Convert.ToString(columna["Apellido2"]),
            IdentificationCard = Convert.ToString(columna["Cedula"]),
            PhoneNumber = Convert.ToString(columna["Telefono"]),
            Address = Convert.ToString(columna["Canton"]) + ", " + Convert.ToString(columna["Provincia"]),
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

    public void CreateEmployee(UserModel employee)
    {
        string consult = "insert into Users (Identification, FirstName, LastName, LastName2, Email, Password, Country, State, City, PostalCode, Address, Phone, UserType) " +
               "values ('" + employee.Identification + "', '" + employee.FirstName + "', '" + employee.LastName + "', '" + employee.LastName2 + "', '" + employee.Email + "', '" + employee.Password + "', '" +
               employee.Country + "', '" + employee.State + "', '" + employee.City + "', '" + employee.ZipCode + "', '" + employee.Address + "', '" + employee.Phone + "', 1, '" + "')";
        SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
        conexion.Open();
        comandoParaConsulta.ExecuteNonQuery();
        conexion.Close();
    }

    public void CreateEmployer(UserModel employer) 
    {
        string consult = "insert into Users (Identification, FirstName, LastName, LastName2, Email, Password, Country, State, City, PostalCode, Address, Phone, UserType) " +
                "values ('" + employer.Identification + "', '"  + employer.FirstName + "', '" + employer.LastName + "', '" + employer.LastName2 + "', '" + employer.Email + "', '" + employer.Password + "', '" + 
                employer.Country + "', '" + employer.State + "', '" + employer.City  + "', '" + employer.ZipCode + "', '" + employer.Address + "', '" + employer.Phone + "', 0, '" + "')"; 
        SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
        conexion.Open();
        comandoParaConsulta.ExecuteNonQuery();
        conexion.Close();
    }
  }
}
