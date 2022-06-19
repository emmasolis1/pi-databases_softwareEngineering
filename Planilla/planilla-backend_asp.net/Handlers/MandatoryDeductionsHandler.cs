using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class MandatoryDeductionsHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;
    public MandatoryDeductionsHandler()
    {
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

    public List<ObligatoryDeductionsModel> GetMandatoryDeductions()
    {
      List<ObligatoryDeductionsModel> obligatoryDeductions = new List<ObligatoryDeductionsModel>();
      string consult = "SELECT * FROM MandatoryDeductions";
      DataTable tablaResultado = CreateTableConsult(consult);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        obligatoryDeductions.Add(new ObligatoryDeductionsModel
        {
          Name = Convert.ToString(columna["MandatoryDeductionName"]),
          Percentage = Convert.ToDouble(columna["Percentage"]),
          Description = Convert.ToString(columna["Description"])
        });
      }
      
      return obligatoryDeductions;
    }
  }
}
