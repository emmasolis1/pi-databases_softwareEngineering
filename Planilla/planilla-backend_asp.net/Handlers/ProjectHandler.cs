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

    public bool CreateProject(ProjectModel project)
    {
      var consult = @"INSERT INTO Projects ([ProjectName], [EmployerID], [Budget], [PaymentMethod], [Description], [MaxNumberOfBenefits], [MaxBudgetForBenefits]) 
                      VALUES (@projectName, @employerID, @budget, @paymentMethod, @description, @maxNumberOfBenefits, @maxBudgetForBenefits)";
      var queryCommand = new SqlCommand(consult, connection);

      // Insertion of key attributes
      queryCommand.Parameters.AddWithValue("@projectName", project.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", project.employerID);

      // Insertion of optional attributes
      if (project.budget != null && project.budget != "")
      {
        queryCommand.Parameters.AddWithValue("@budget", project.budget);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@budget", DBNull.Value);
      }

      if (project.paymentMethod != null && project.paymentMethod != "")
      {
        queryCommand.Parameters.AddWithValue("@paymentMethod", project.paymentMethod);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@paymentMethod", DBNull.Value);
      }

      if (project.description != null && project.description != "")
      {
        queryCommand.Parameters.AddWithValue("@description", project.description);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@description", DBNull.Value);
      }

      if (project.maxNumberOfBenefits != null && project.maxNumberOfBenefits != "")
      {
        queryCommand.Parameters.AddWithValue("@maxNumberOfBenefits", project.maxNumberOfBenefits);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@maxNumberOfBenefits", DBNull.Value);
      }

      if (project.maxBudgetForBenefits != null && project.maxBudgetForBenefits != "")
      {
        queryCommand.Parameters.AddWithValue("@maxBudgetForBenefits", project.maxBudgetForBenefits);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@maxBudgetForBenefits", DBNull.Value);
      }

      connection.Open();
      bool status = queryCommand.ExecuteNonQuery() >= 1;
      connection.Close();

      return status;
    }

    public void UpdateProjectInfo(ProjectModel info)
    {
      // Prepare command
      string consult = "update Projects set [Budget] = @budget, [PaymentMethod] = @paymentMethod, [Description] = @description, [MaxNumberOfBenefits] = @maxNumberOfBenefits, [MaxBudgetForBenefits] = @maxBudgetForBenefits where [ProjectName] = @projectName and [EmployerID] = @employerID";
      SqlCommand queryCommand = new SqlCommand(consult, connection);
      queryCommand.Parameters.AddWithValue("@projectName", info.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", info.employerID);
      queryCommand.Parameters.AddWithValue("@budget", info.budget);
      queryCommand.Parameters.AddWithValue("@paymentMethod", info.paymentMethod);
      queryCommand.Parameters.AddWithValue("@description", info.description);
      queryCommand.Parameters.AddWithValue("@maxNumberOfBenefits", info.maxNumberOfBenefits);
      queryCommand.Parameters.AddWithValue("@maxBudgetForBenefits", info.maxBudgetForBenefits);

      // Execute command
      connection.Open();
      queryCommand.ExecuteNonQuery();
      connection.Close();
    }

    public ProjectModel GetSpecificProjectInfo(string projectName, string employerID)
    {
      string consult = @"SELECT ProjectName, EmployerID, Budget, PaymentMethod, Description, MaxNumberOfBenefits, MaxBudgetForBenefits
                      FROM Projects
                      WHERE EmployerID = @employerID and ProjectName = @projectName";
      var project = new ProjectModel();
      SqlCommand queryCommand = new SqlCommand(consult, connection);
      queryCommand.Parameters.AddWithValue("@projectName", projectName);
      queryCommand.Parameters.AddWithValue("@employerID", employerID);
      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tableFormatConsult = CreateTableConsult(tableAdapter);
      foreach (DataRow column in tableFormatConsult.Rows)
        {
        project.projectName = Convert.ToString(column["ProjectName"]);
        project.employerID = Convert.ToString(column["EmployerID"]);
        project.budget = Convert.ToString(column["Budget"]);
        project.paymentMethod = Convert.ToString(column["PaymentMethod"]);
        project.description = Convert.ToString(column["Description"]);
        project.maxNumberOfBenefits = Convert.ToString(column["MaxNumberOfBenefits"]);
        project.maxBudgetForBenefits = Convert.ToString(column["MaxBudgetForBenefits"]);
        };
      return project;
    }

  }
}