using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class ProjectHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;
    public ProjectHandler()
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

    public List<ProjectModel> GetProyectsData()
    {
      List<ProjectModel> projects = new List<ProjectModel>();
      string consult = "SELECT * FROM Proyecto";
      DataTable tablaResultado = CreateTableConsult(consult);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        projects.Add(new ProjectModel
        {
          nombre = Convert.ToString(columna["nombre"]),
          cedulaUsuario = Convert.ToString(columna["cedulaEmpleador"]),
          presupuesto = Convert.ToInt32(columna["presupuesto"]),
          modalidadPago = Convert.ToString(columna["modalidadPago"])
        });
      }

      return projects;
    }
  }
}
