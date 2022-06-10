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
      string consult = "select FirstName, LastName, LastName2, Identification, Email, Country, State, City, Phone from Users where UserType=1 order by FirstName";
      DataTable employeesResult = CreateTableConsult(consult);

      // Convert data to list
      List<UserModelSummarized> employees = new List<UserModelSummarized>();
      foreach (DataRow columna in employeesResult.Rows)
      {
        employees.Add(
          new UserModelSummarized
          {
            FullName = Convert.ToString(columna["FirstName"]) + " " + Convert.ToString(columna["LastName"]) + " " + Convert.ToString(columna["LastName2"]),
            Identification = Convert.ToString(columna["Identification"]),
            Email = Convert.ToString(columna["Email"]),
            Phone = Convert.ToString(columna["Phone"]),
            Address = Convert.ToString(columna["City"]) + ", " + Convert.ToString(columna["State"] + ", " + Convert.ToString(columna["Country"])),
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

    public void CreateEmployee(UserModel employee)
    {
      // Make consult to database
      string consult = "insert into Users ([FirstName], [LastName], [LastName2], [Identification], [Email], [Password], [Country], [State], [City], [Address], [ZipCode], [UserType], [Phone]) values (@FirstName, @LastName, @LastName2, @Identification, @Email, @Password, @Country, @State, @City, @Address, @ZipCode, @UserType, @Phone)";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);

      // Add mandatory parameters
      queryCommand.Parameters.AddWithValue("@FirstName", employee.FirstName);
      queryCommand.Parameters.AddWithValue("@LastName", employee.LastName);
      queryCommand.Parameters.AddWithValue("@Identification", employee.Identification);
      queryCommand.Parameters.AddWithValue("@Email", employee.Email);
      queryCommand.Parameters.AddWithValue("@Password", employee.Password);
      queryCommand.Parameters.AddWithValue("@UserType", 1);
      queryCommand.Parameters.AddWithValue("@Phone", employee.Phone);

      // Add optional parameters
      if (employee.LastName2 != null && employee.LastName2 != "")
      {
        // queryCommand.Parameters.Add(new SqlParameter("LastName2", employee.LastName2));
        queryCommand.Parameters.AddWithValue("@LastName2", employee.LastName2);
      } else {
        queryCommand.Parameters.AddWithValue("@LastName2", DBNull.Value);
      }
      if (employee.Country != null && employee.Country != "")
      {
        queryCommand.Parameters.AddWithValue("@Country", employee.Country);
      } else {
        queryCommand.Parameters.AddWithValue("@Country", DBNull.Value);
      }
      if (employee.State != null && employee.State != "")
      {
        queryCommand.Parameters.AddWithValue("@State", employee.State);
      } else {
        queryCommand.Parameters.AddWithValue("@State", DBNull.Value);
      }
      if (employee.City != null && employee.City != "")
      {
        queryCommand.Parameters.AddWithValue("@City", employee.City);
      } else {
        queryCommand.Parameters.AddWithValue("@City", DBNull.Value);
      }
      if (employee.Address != null && employee.Address != "")
      {
        queryCommand.Parameters.AddWithValue("@Address", employee.Address);
      } else {
        queryCommand.Parameters.AddWithValue("@Address", DBNull.Value);
      }
      if (employee.ZipCode != null && employee.ZipCode != "")
      {
        queryCommand.Parameters.AddWithValue("@ZipCode", employee.ZipCode);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@ZipCode", DBNull.Value);
      }

      // Consult to database
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }
  }
}
