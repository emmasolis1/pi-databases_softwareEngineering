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
  }
}