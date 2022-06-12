using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class ProjectHandler
  {
    private static SqlConnection connection;
    private string connectionRoute;
    public ProjectHandler()
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

    public List<ProjectModel> GetProyectsData(string employerID)
    {
      List<ProjectModel> projects = new List<ProjectModel>();
      var consult = @"SELECT ProjectName, EmployerID, Budget, PaymentMethod, Description, MaxNumberOfBenefits, MaxBudgetForBenefits
                      From Projects
                      WHERE EmployerID = @employerID
                      ORDER BY ProjectName";
         var queryCommand = new SqlCommand(consult, connection);

      // Uses user's email and the name of the active project to get only related benefits
      queryCommand.Parameters.AddWithValue("@employerID", employerID);

      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tablaResultado = CreateTableConsult(tableAdapter);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        projects.Add(new ProjectModel
        {
          projectName = Convert.ToString(columna["ProjectName"]),
          employerID = Convert.ToString(columna["EmployerID"]),
          budget = Convert.ToString(columna["Budget"]),
          paymentMethod = Convert.ToString(columna["PaymentMethod"]),
          description = Convert.ToString(columna["Description"]),
          maxNumberOfBenefits = Convert.ToString(columna["MaxNumberOfBenefits"]),
          maxBudgetForBenefits = Convert.ToString(columna["MaxBudgetForBenefits"])
        });
      }

      return projects;
    }
  }
}
