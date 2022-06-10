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

    private DataTable CreateTableConsult(string consult)
    {
      SqlCommand consultCommand = new SqlCommand(consult, connection);
      SqlDataAdapter adaptadorParaTabla = new SqlDataAdapter(consultCommand);
      DataTable consultTable = new DataTable();
      connection.Open();
      adaptadorParaTabla.Fill(consultTable);
      connection.Close();

      return consultTable;
    }

    public List<BenefitsModel> GetBenefitsData()
    {
      List<BenefitsModel> benefits = new List<BenefitsModel>();
      string consult = "SELECT BenefitName, ProjectName, EmployerID, Description, Cost FROM Benefits ORDER BY BenefitName";
      DataTable tablaResultado = CreateTableConsult(consult);
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
      bool exito = queryCommand.ExecuteNonQuery() >= 1;
      connection.Close();

      return exito;
    }
  }
}