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

    public List<UserModelSummarized> GetAllEmployeesSummarized()
    {
       // Make consult to database
      string consult = "select FirstName, LastName, LastName2, Identification, Email, State, City from Users where UserType=1";
      DataTable employeesResult = CreateTableConsult(consult);
      DataTable phonesResult = CreateTableConsult("select Phone from Phones where Identification in (select Identification from Users where UserType=1)");

      // Convert data to list
      List<UserModelSummarized> employees = new List<UserModelSummarized>();
      foreach (DataRow columna in employeesResult.Rows)
      {
        employees.Add(
          new UserModelSummarized
          {
            FullName = Convert.ToString(columna["FirstName"]) + " " + Convert.ToString(columna["LastName"]) + " " + Convert.ToString(columna["LastName2"]),
            Identification = Convert.ToString(columna["Identification"]),
            Address = Convert.ToString(columna["State"]) + ", " + Convert.ToString(columna["City"]),
          });
      }

      return employees;
    }


    private DataTable CreateTableConsult(string consult)
    {
      SqlCommand queryCommand = new SqlCommand(consult, conexion);
      SqlDataAdapter adaptadorParaTabla = new
      SqlDataAdapter(queryCommand);
      DataTable consultaFormatoTabla = new DataTable();
      conexion.Open();
      adaptadorParaTabla.Fill(consultaFormatoTabla);
      conexion.Close();
      return consultaFormatoTabla;
    }

    public void createEmployee(UserModel employee)
    {
      // Make consult to database
      string consult = "insert into Users ([FirstName], [LastName], [LastName2], [Identification], [Email], [Password], [Country], [State], [City], [Address], [UserType]) values (@FirstName, @LastName, @LastName2, @Identification, @Email, @Password, @Country, @State, @City, @Address, @UserType)";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);

      // Add mandatory parameters
      queryCommand.Parameters.AddWithValue("@FirstName", employee.FirstName);
      queryCommand.Parameters.AddWithValue("@LastName", employee.LastName);
      queryCommand.Parameters.AddWithValue("@Identification", employee.Identification);
      queryCommand.Parameters.AddWithValue("@Email", employee.Email);
      queryCommand.Parameters.AddWithValue("@Password", employee.Password);
      queryCommand.Parameters.AddWithValue("@UserType", 1);

      // Add optional parameters
      if (employee.LastName2 != null)
      {
        // queryCommand.Parameters.Add(new SqlParameter("LastName2", employee.LastName2));
        queryCommand.Parameters.AddWithValue("@LastName2", employee.LastName2);
      } else {
        queryCommand.Parameters.AddWithValue("@LastName2", DBNull.Value);
      }
      if (employee.Country != null)
      {
        queryCommand.Parameters.AddWithValue("@Country", employee.Country);
      } else {
        queryCommand.Parameters.AddWithValue("@Country", DBNull.Value);
      }
      if (employee.State != null)
      {
        queryCommand.Parameters.AddWithValue("@State", employee.State);
      } else {
        queryCommand.Parameters.AddWithValue("@State", DBNull.Value);
      }
      if (employee.City != null)
      {
        queryCommand.Parameters.AddWithValue("@City", employee.City);
      } else {
        queryCommand.Parameters.AddWithValue("@City", DBNull.Value);
      }
      if (employee.Address != null)
      {
        queryCommand.Parameters.AddWithValue("@Address", employee.Address);
      } else {
        queryCommand.Parameters.AddWithValue("@Address", DBNull.Value);
      }

      // Consult to database
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }
  }
}
