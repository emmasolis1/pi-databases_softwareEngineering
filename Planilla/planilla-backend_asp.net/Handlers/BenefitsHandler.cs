using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class BenefitsHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;
    public BenefitsHandler() {
      var builder = WebApplication.CreateBuilder();
      rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
      conexion = new SqlConnection(rutaConexion);
    }

    private DataTable CreateTableConsult(string consult)
    {
      SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
      SqlDataAdapter adaptadorParaTabla = new SqlDataAdapter(comandoParaConsulta);
      DataTable consultaFormatoTabla = new DataTable();
      conexion.Open();
      adaptadorParaTabla.Fill(consultaFormatoTabla);
      conexion.Close();
      
      return consultaFormatoTabla;
    }

    public List<BenefitsModel> GetBenefitsData()
    {
      List<BenefitsModel> benefits = new List<BenefitsModel>();
      string consult = "SELECT * FROM Beneficios";
      DataTable tablaResultado = CreateTableConsult(consult);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        benefits.Add(new BenefitsModel
        {
          nombreBeneficio = Convert.ToString(columna["nombreBeneficio"]),
          cedulaEmpleador = Convert.ToString(columna["cedulaEmpleador"]),
          nombreProyecto = Convert.ToString(columna["nombreProyecto"]),
        });
      }

      return benefits;
    }
  }
}
