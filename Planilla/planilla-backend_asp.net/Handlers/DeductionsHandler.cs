using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class DeductionsHandler
  {
    private static SqlConnection connection;
    private string connectionRoute;
    public DeductionsHandler()
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

    public bool CreateVoluntaryDeductions(VoluntaryDeductionsModel voluntaryDeduction)
    {
      var consult = @"INSERT INTO VoluntaryDeductions ([VoluntaryDeductionName], [ProjectName], [EmployerID], [Description]) 
                      VALUES (@voluntaryDeductionName, @projectName, @employerID, @description)";
      var queryCommand = new SqlCommand(consult, connection);

      // Insertion of key attributes
      queryCommand.Parameters.AddWithValue("@voluntaryDeductionName", voluntaryDeduction.voluntaryDeductionName);
      queryCommand.Parameters.AddWithValue("@projectName", voluntaryDeduction.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", voluntaryDeduction.employerID);

      // Insertion of optional attributes
      if (voluntaryDeduction.description != null && voluntaryDeduction.description != "")
      {
        queryCommand.Parameters.AddWithValue("@description", voluntaryDeduction.description);
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

    public List<MandatoryDeductionsModel> GetMandatoryDeductions()
    {
      List<MandatoryDeductionsModel> mandatoryDeductions = new List<MandatoryDeductionsModel>();
      string consult = @"SELECT * FROM MandatoryDeductions";
      SqlDataAdapter tableAdapter = new SqlDataAdapter(consult, connection);
      DataTable tablaResultado = CreateTableConsult(tableAdapter);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        mandatoryDeductions.Add(new MandatoryDeductionsModel
        {
          Name = Convert.ToString(columna["MandatoryDeductionName"]),
          Percentage = Convert.ToDouble(columna["Percentage"]),
          Description = Convert.ToString(columna["Description"])
        });
      }
      
      return mandatoryDeductions;
    }

    public void UpdateVoluntaryDeductions(VoluntaryDeductionsModel voluntaryDeduction)
    {
      string consult = "update VoluntaryDeductions set [VoluntaryDeductionName] = @voluntaryDeductionName, [Description] = @description where [projectName] = @projectName AND [employerID] = @employerID";
      SqlCommand queryCommand = new SqlCommand(consult, connection);
      queryCommand.Parameters.AddWithValue("@VoluntaryDeductionName", voluntaryDeduction.voluntaryDeductionName);
      queryCommand.Parameters.AddWithValue("@projectName", voluntaryDeduction.projectName);
      queryCommand.Parameters.AddWithValue("@employerID", voluntaryDeduction.employerID);
      queryCommand.Parameters.AddWithValue("@description", voluntaryDeduction.description);
      // Execute command
      connection.Open();
      queryCommand.ExecuteNonQuery();
      connection.Close();
    }
    public VoluntaryDeductionsModel GetSpecificVoluntaryDeductionInfo(string voluntaryDeductionName, string projectName, string employerID)
    {
      string consult = @"SELECT VoluntaryDeductionName, ProjectName, EmployerID, Description
                      FROM VoluntaryDeductions
                      WHERE EmployerID = @employerID and ProjectName = @projectName";
      var voluntaryDeduction = new VoluntaryDeductionsModel();
      SqlCommand queryCommand = new SqlCommand(consult, connection);
      queryCommand.Parameters.AddWithValue("@voluntaryDeductionName", voluntaryDeductionName);
      queryCommand.Parameters.AddWithValue("@projectName", projectName);
      queryCommand.Parameters.AddWithValue("@employerID", employerID);
      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tableFormatConsult = CreateTableConsult(tableAdapter);
      foreach (DataRow column in tableFormatConsult.Rows)
      {
        voluntaryDeduction.voluntaryDeductionName = Convert.ToString(column["voluntaryDeductionName"]);
        voluntaryDeduction.projectName = Convert.ToString(column["ProjectName"]);
        voluntaryDeduction.employerID = Convert.ToString(column["EmployerID"]);
        voluntaryDeduction.description = Convert.ToString(column["Description"]);
        voluntaryDeduction.cost = "";
      };
      return voluntaryDeduction;
    }
  }
}