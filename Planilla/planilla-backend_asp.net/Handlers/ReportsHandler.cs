using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class ReportsHandler
  {
    private static SqlConnection connection;
    private string connectionRoute;
    public ReportsHandler()
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

    public DataTable GetEmployeeReports(string employeeID)
    {
      SqlDataAdapter tableAdapter = new SqlDataAdapter("SELECT * FROM Reportes WHERE EmpleadoID = @employeeID ORDER BY Fecha DESC", connection);
      tableAdapter.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
      return CreateTableConsult(tableAdapter);
    }
  }
}