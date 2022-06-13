using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
    public class VoluntaryDeductionsHandler
    {
        private static SqlConnection conexion;
        private string rutaConexion;
        public VoluntaryDeductionsHandler()
        {
            var builder = WebApplication.CreateBuilder();
            rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
            conexion = new SqlConnection(rutaConexion);
        }

        public List<VoluntaryDeductionsModel> GetDeductions()
        {
            List<VoluntaryDeductionsModel> deductions = new List<VoluntaryDeductionsModel>();
            string consulta = "SELECT * FROM VoluntaryDeductions";
            DataTable tablaResultado = CreateTableConsult(consulta);
            foreach (DataRow columna in tablaResultado.Rows)
            {
                deductions.Add(
                  new VoluntaryDeductionsModel
                  {
                      VoluntaryDeductionName = Convert.ToString(columna["VoluntaryDeductionName"]),
                      ProjectName = Convert.ToString(columna["ProjectName"]),
                      EmployerID = Convert.ToString(columna["EmployerID"]),
                      Description = Convert.ToString(columna["Description"])
                  });
            }
            return deductions;
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
    }
}

