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
            Address = Convert.ToString(columna["State"] + ", " + Convert.ToString(columna["Country"])),
          });
      }

      return employees;
    }

    private DataTable CreateTableConsult(string consult)
    {
      SqlCommand queryCommand = new SqlCommand(consult, conexion);
      SqlDataAdapter adaptadorParaTabla = new
      SqlDataAdapter(queryCommand);
      DataTable tableFormatConsult = new DataTable();
      conexion.Open();
      adaptadorParaTabla.Fill(tableFormatConsult);
      conexion.Close();
      return tableFormatConsult;
    }

    public List<string> GetUserData(string email, string password)
    {
      var userID = "";
      var userType = "";
      var consult = @"SELECT Identification, UserType
                      FROM Users
                      WHERE Email = @email AND Password = @password";
      var queryCommand = new SqlCommand(consult, conexion);

      // Uses user's email to get their ID
      queryCommand.Parameters.AddWithValue("@email", email);
      queryCommand.Parameters.AddWithValue("@password", password);

      conexion.Open();
      SqlDataReader reader = queryCommand.ExecuteReader();
      while (reader.Read())
      {
        userID = reader["Identification"].ToString();
        userType = reader["UserType"].ToString();
      }
      conexion.Close();

      List<string> data = new List<string>();
      data.Add(userID);
      data.Add(userType);

      return data;
    }

    public List<UserModelSummarized> GetSpecificProjectEmployees(string projectName, string employerID)
    {
      // Make consult to database
      string consult = "EXEC GetEmployeesWorkingOnProject @projectName = @thisProjectName, @employerID = @thisEmployerID";
      var queryCommand = new SqlCommand(consult, conexion);

      // Uses user's email to get their ID
      queryCommand.Parameters.AddWithValue("@thisProjectName", projectName);
      queryCommand.Parameters.AddWithValue("@thisEmployerID", employerID);

      List<UserModelSummarized> employees = new List<UserModelSummarized>();

      conexion.Open();
      SqlDataReader reader = queryCommand.ExecuteReader();
      while (reader.Read())
      {
        employees.Add(
          new UserModelSummarized
          {
            FullName = reader["FirstName"].ToString() + " " + reader["LastName"].ToString() + " " + reader["LastName2"].ToString(),
            Identification = reader["Identification"].ToString(),
            Email = reader["Email"].ToString(),
            Phone = reader["Phone"].ToString(),
            Address = reader["State"].ToString() + ", " + reader["Country"].ToString()
          });
      }
      conexion.Close();

      return employees;
    }

    public List<UserModelSummarized> GetEmployeesNotInProject(string projectName, string employerID)
    {
      // Make consult to database
      string consult = "EXEC GetEmployeesNotWorkingOnProject @projectName = @thisProjectName, @employerID = @thisEmployerID";
      var queryCommand = new SqlCommand(consult, conexion);

      // Uses user's email to get their ID
      queryCommand.Parameters.AddWithValue("@thisProjectName", projectName);
      queryCommand.Parameters.AddWithValue("@thisEmployerID", employerID);

      List<UserModelSummarized> employees = new List<UserModelSummarized>();

      conexion.Open();
      SqlDataReader reader = queryCommand.ExecuteReader();
      while (reader.Read())
      {
        employees.Add(
          new UserModelSummarized
          {
            FullName = reader["FirstName"].ToString() + " " + reader["LastName"].ToString() + " " + reader["LastName2"].ToString(),
            Identification = reader["Identification"].ToString(),
            Email = reader["Email"].ToString(),
            Phone = reader["Phone"].ToString(),
            Address = reader["State"].ToString() + ", " + reader["Country"].ToString()
          });
      }
      conexion.Close();

      return employees;
    }

    public void CreateEmployee(UserModel employee)
    {
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
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@LastName2", DBNull.Value);
      }
      if (employee.Country != null && employee.Country != "")
      {
        queryCommand.Parameters.AddWithValue("@Country", employee.Country);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@Country", DBNull.Value);
      }
      if (employee.State != null && employee.State != "")
      {
        queryCommand.Parameters.AddWithValue("@State", employee.State);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@State", DBNull.Value);
      }
      if (employee.City != null && employee.City != "")
      {
        queryCommand.Parameters.AddWithValue("@City", employee.City);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@City", DBNull.Value);
      }
      if (employee.Address != null && employee.Address != "")
      {
        queryCommand.Parameters.AddWithValue("@Address", employee.Address);
      }
      else
      {
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
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }

    public void CreateEmployer(UserModel employer)
    {
      string consult = "insert into Users ([FirstName], [LastName], [LastName2], [Identification], [Email], [Password], [Country], [State], [City], [Address], [ZipCode], [UserType], [Phone]) values (@FirstName, @LastName, @LastName2, @Identification, @Email, @Password, @Country, @State, @City, @Address, @ZipCode, @UserType, @Phone)";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);

      // Add mandatory parameters
      queryCommand.Parameters.AddWithValue("@FirstName", employer.FirstName);
      queryCommand.Parameters.AddWithValue("@LastName", employer.LastName);
      queryCommand.Parameters.AddWithValue("@Identification", employer.Identification);
      queryCommand.Parameters.AddWithValue("@Email", employer.Email);
      queryCommand.Parameters.AddWithValue("@Password", employer.Password);
      queryCommand.Parameters.AddWithValue("@UserType", 0);
      queryCommand.Parameters.AddWithValue("@Phone", employer.Phone);

      // Add optional parameters
      if (employer.LastName2 != null && employer.LastName2 != "")
      {
        queryCommand.Parameters.AddWithValue("@LastName2", employer.LastName2);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@LastName2", DBNull.Value);
      }
      if (employer.Country != null && employer.Country != "")
      {
        queryCommand.Parameters.AddWithValue("@Country", employer.Country);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@Country", DBNull.Value);
      }
      if (employer.State != null && employer.State != "")
      {
        queryCommand.Parameters.AddWithValue("@State", employer.State);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@State", DBNull.Value);
      }
      if (employer.City != null && employer.City != "")
      {
        queryCommand.Parameters.AddWithValue("@City", employer.City);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@City", DBNull.Value);
      }
      if (employer.Address != null && employer.Address != "")
      {
        queryCommand.Parameters.AddWithValue("@Address", employer.Address);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@Address", DBNull.Value);
      }
      if (employer.ZipCode != null && employer.ZipCode != "")
      {
        queryCommand.Parameters.AddWithValue("@ZipCode", employer.ZipCode);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@ZipCode", DBNull.Value);
      }
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }

    public void AddEmployeeToProject(ContractModel contract)
    {
      var consult = @"INSERT INTO Contracts ([ProjectName], [EmployerID], [EmployeeID], [StartDate], [ExpectedEndingDate], [RealEndedDate], [Position], [Schedule], [NetSalary], [ContractType]) 
                      VALUES (@projectName, @employerID, @employeeID, @startDate, @expectedEndingDate, @realEndedDate, @position, @schedule, @netSalary, @contractType)";
      var queryCommand = new SqlCommand(consult, conexion);

      // Insertion of attribute
      queryCommand.Parameters.AddWithValue("@projectName", contract.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", contract.employerID);
      queryCommand.Parameters.AddWithValue("@employeeID", contract.employeeID);
      queryCommand.Parameters.AddWithValue("@startDate", contract.startDate);
      queryCommand.Parameters.AddWithValue("@expectedEndingDate", contract.expectedEndingDate);
      queryCommand.Parameters.AddWithValue("@realEndedDate", DBNull.Value);
      queryCommand.Parameters.AddWithValue("@position", contract.position);
      queryCommand.Parameters.AddWithValue("@schedule", contract.schedule);
      queryCommand.Parameters.AddWithValue("@netSalary", contract.netSalary);
      queryCommand.Parameters.AddWithValue("@contractType", contract.contractType);

      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }

    public DataTable GetEmployeeInfo(ReciberModel id)
    {
      string consult = "select Identification, FirstName, LastName, LastName2, Email, Country, State, City, ZipCode, Address, Phone from Users where Identification =" + "'" + id.id + "'";
      DataTable tableResult = CreateTableConsult(consult);
      return tableResult;
    }

    public void UpdateEmployeeInfo(UserEmployeeInfoToModify info)
    {
      // Prepare command
      string consult = "update Users set [Email] = @Email, [Country] = @Country, [State] = @State, [City] = @City, [Address] = @Address, [ZipCode] = @ZipCode, [Phone] = @Phone where [Identification] = @Identification";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);
      queryCommand.Parameters.AddWithValue("@Email", info.Email);
      queryCommand.Parameters.AddWithValue("@Country", info.Country);
      queryCommand.Parameters.AddWithValue("@State", info.State);
      queryCommand.Parameters.AddWithValue("@City", info.City);
      queryCommand.Parameters.AddWithValue("@Address", info.Address);
      queryCommand.Parameters.AddWithValue("@ZipCode", info.ZipCode);
      queryCommand.Parameters.AddWithValue("@Phone", info.Phone);
      queryCommand.Parameters.AddWithValue("@Identification", info.Identification);

      // Add optional parameters
      if (info.Password != null && info.Password != "")
      {
        UpdatePassword(info.Identification, info.Password);
      }
      // Execute command
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }

    private void UpdatePassword(string identification, string newPassowrd)
    {
      // Prepare command
      string consult = "update Users set [Password] = @Password where [Identification] = @Identification";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);
      queryCommand.Parameters.AddWithValue("@Password", newPassowrd);
      queryCommand.Parameters.AddWithValue("@Identification", identification);

      // Execute command
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }

    public void DeleteEmployee(string identification)
    {
      // Prepare command
      string consult = "execute delete_employee @Identification";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);
      queryCommand.Parameters.AddWithValue("@Identification", identification);

      // Execute command
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }

    public void DeleteEmployeeFromProject(string projectName, string id)
    {
      // Prepare command
      string consult = @"UPDATE Contracts
                        SET RealEndedDate = @date 
                        WHERE ProjectName = @projectName AND EmployeeID = @employeeID";
      SqlCommand queryCommand = new SqlCommand(consult, conexion);
      queryCommand.Parameters.AddWithValue("@date", DateTime.Now.ToString("yyyy/MM/dd"));
      queryCommand.Parameters.AddWithValue("@projectName", projectName);
      queryCommand.Parameters.AddWithValue("@employeeID", id);

      // Execute command
      conexion.Open();
      queryCommand.ExecuteNonQuery();
      conexion.Close();
    }
  }
}
