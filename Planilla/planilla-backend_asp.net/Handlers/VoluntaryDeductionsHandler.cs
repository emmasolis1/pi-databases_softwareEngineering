using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class VoluntaryDeductionsHandler
  {
    private static SqlConnection connection;
    private string connectionRoute;
    public VoluntaryDeductionsHandler()
    {
      var builder = WebApplication.CreateBuilder();
      connectionRoute = builder.Configuration.GetConnectionString("EmpleadorContext");
      connection = new SqlConnection(connectionRoute);
    }

    private DataTable CreateTableConsult(SqlDataAdapter tableAdapter)
    {
      DataTable consultTable = new DataTable();
      connection.Open();
      tableAdapter.Fill(consultTable);
      connection.Close();

      return consultTable;
    }

    public bool CreateVoluntaryDeductions(VoluntaryDeductionsModel voluntaryDeductions)
    {
      var consult = @"INSERT INTO VoluntaryDeductions ([VoluntaryDeductionName], [ProjectName], [EmployerID], [Description]) 
                      VALUES (@voluntaryDeductionName, @projectName, @employerID, @description)";
      var queryCommand = new SqlCommand(consult, connection);

      // Insertion of key attributes
      queryCommand.Parameters.AddWithValue("@voluntaryDeductionName", voluntaryDeductions.voluntaryDeductionName);
      queryCommand.Parameters.AddWithValue("@projectName", voluntaryDeductions.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", voluntaryDeductions.employerID);

      // Insertion of optional attributes
      if (voluntaryDeductions.description != null && voluntaryDeductions.description != "")
      {
        queryCommand.Parameters.AddWithValue("@description", voluntaryDeductions.description);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@description", DBNull.Value);
      }

      connection.Open();
      bool status = queryCommand.ExecuteNonQuery() >= 1;
      connection.Close();

      return status;
    }

    public List<VoluntaryDeductionsModel> GetVoluntaryDeductionsData(string project, string employerID)
    {
      List<VoluntaryDeductionsModel> voluntaryDeductions = new List<VoluntaryDeductionsModel>();
      var consult = @"SELECT VoluntaryDeductionName, ProjectName, EmployerID, Description
                      FROM VoluntaryDeductions
                      WHERE ProjectName = @project AND EmployerID = @employerID
                      ORDER BY VoluntaryDeductionName";
      var queryCommand = new SqlCommand(consult, connection);

      // Uses user's email and the name of the active project to get only related benefits
      queryCommand.Parameters.AddWithValue("@project", project);
      queryCommand.Parameters.AddWithValue("@employerID", employerID);

      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tablaResultado = CreateTableConsult(tableAdapter);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        voluntaryDeductions.Add(new VoluntaryDeductionsModel
        {
          voluntaryDeductionName = Convert.ToString(columna["VoluntaryDeductionName"]),
          projectName = Convert.ToString(columna["ProjectName"]),
          employerID = Convert.ToString(columna["EmployerID"]),
          description = Convert.ToString(columna["Description"]),
        });
      }

      return voluntaryDeductions;
    }
  }
}