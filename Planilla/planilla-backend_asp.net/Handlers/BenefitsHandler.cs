using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class BenefitsHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;
    public BenefitsHandler()
    {
      var builder = WebApplication.CreateBuilder();
      rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
      conexion = new SqlConnection(rutaConexion);
    }

    private DataTable CreateTableConsult(SqlDataAdapter tableAdapter)
    {
      DataTable consultTable = new DataTable();
      conexion.Open();
      tableAdapter.Fill(consultTable);
      conexion.Close();

      return consultTable;
    }

    public List<BenefitsModel> GetBenefitsData(string email, string project)
    {
      List<BenefitsModel> benefits = new List<BenefitsModel>();
      var consult = @"SELECT BenefitName, ProjectName, EmployerID, Description, Cost
                      FROM Benefits JOIN Users on Benefits.EmployerID = Users.Identification
                      WHERE Email = @email AND ProjectName = @project
                      ORDER BY BenefitName";
      var queryCommand = new SqlCommand(consult, conexion);

      // Uses user's email to get only benefits related to that user
      queryCommand.Parameters.AddWithValue("@email", email);
      queryCommand.Parameters.AddWithValue("@project", project);

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
  }
}
