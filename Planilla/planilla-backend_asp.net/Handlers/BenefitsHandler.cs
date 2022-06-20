using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class BenefitsHandler
  {
    private static SqlConnection connection;
    private string connectionRoute;
    public BenefitsHandler()
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

    public List<BenefitsModel> GetBenefitsData(string project, string employerID)
    {
      List<BenefitsModel> benefits = new List<BenefitsModel>();
      var consult = @"SELECT BenefitName, ProjectName, EmployerID, Description, Cost
                      FROM Benefits
                      WHERE ProjectName = @project AND EmployerID = @employerID
                      ORDER BY BenefitName";
      var queryCommand = new SqlCommand(consult, connection);

      // Uses user's email and the name of the active project to get only related benefits
      queryCommand.Parameters.AddWithValue("@project", project);
      queryCommand.Parameters.AddWithValue("@employerID", employerID);

      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tablaResultado = CreateTableConsult(tableAdapter);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        benefits.Add(new BenefitsModel
        {
          benefitName = Convert.ToString(columna["BenefitName"]),
          projectName = Convert.ToString(columna["ProjectName"]),
          employerID = Convert.ToString(columna["EmployerID"]),
          description = Convert.ToString(columna["Description"]),
          cost = Convert.ToString(columna["Cost"]),
        });
      }

      return benefits;
    }

    public bool CreateBenefit(BenefitsModel benefit)
    {
      var consult = @"INSERT INTO Benefits ([BenefitName], [ProjectName], [EmployerID], [Description], [Cost]) 
                      VALUES (@benefitName, @projectName, @employerID, @description, @cost)";
      var queryCommand = new SqlCommand(consult, connection);

      // Insertion of key attributes
      queryCommand.Parameters.AddWithValue("@benefitName", benefit.benefitName);
      queryCommand.Parameters.AddWithValue("@projectName", benefit.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", benefit.employerID);

      // Insertion of optional attributes
      if (benefit.description != null && benefit.description != "")
      {
        queryCommand.Parameters.AddWithValue("@description", benefit.description);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@description", DBNull.Value);
      }

      if (benefit.cost != null && benefit.cost != "")
      {
        queryCommand.Parameters.AddWithValue("@cost", benefit.cost);
      }
      else
      {
        queryCommand.Parameters.AddWithValue("@cost", DBNull.Value);
      }

      connection.Open();
      bool status = queryCommand.ExecuteNonQuery() >= 1;
      connection.Close();

      return status;
    }

    public void UpdateBenefitInfo(BenefitsModel info)
    {
      // Prepare command
      string consult = "update Benefits set [Description] = @description, [Cost] = @cost where [BenefitName] = @benefitName AND [ProjectName] = @projectName and [EmployerID] = @employerID";
      SqlCommand queryCommand = new SqlCommand(consult, connection);
      queryCommand.Parameters.AddWithValue("@benefitName", info.benefitName);
      queryCommand.Parameters.AddWithValue("@projectName", info.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", info.employerID);
      queryCommand.Parameters.AddWithValue("@description", info.description);
      queryCommand.Parameters.AddWithValue("@cost", info.cost);

      // Execute command
      connection.Open();
      queryCommand.ExecuteNonQuery();
      connection.Close();
    }

    public BenefitsModel GetSpecificBenefitInfo(string benefitName, string projectName, string employerID)
    {
      string consult = @"SELECT BenefitName, ProjectName, EmployerID, Description, Cost
                      FROM Benefits
                      WHERE BenefitName = @benefitName and EmployerID = @employerID and ProjectName = @projectName";
      var benefit = new BenefitsModel();
      SqlCommand queryCommand = new SqlCommand(consult, connection);
      queryCommand.Parameters.AddWithValue("@benefitName", benefitName);
      queryCommand.Parameters.AddWithValue("@projectName", projectName);
      queryCommand.Parameters.AddWithValue("@employerID", employerID);
      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tableFormatConsult = CreateTableConsult(tableAdapter);
      foreach (DataRow column in tableFormatConsult.Rows)
      {
        benefit.benefitName = Convert.ToString(column["benefitName"]);
        benefit.projectName = Convert.ToString(column["ProjectName"]);
        benefit.employerID = Convert.ToString(column["EmployerID"]);
        benefit.description = Convert.ToString(column["Description"]);
        benefit.cost = Convert.ToString(column["cost"]);
      };
      return benefit;
    }
  }
}