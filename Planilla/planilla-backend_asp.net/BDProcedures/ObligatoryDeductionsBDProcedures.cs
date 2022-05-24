using planilla_backend_asp.net.Models;
using System.Data;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.BDProcedures
{
    public class ObligatoryDeductionsBDProcedures
    {
        private static SqlConnection conexion;
        private string rutaConexion;
        public ObligatoryDeductionsBDProcedures()
        {
            var builder = WebApplication.CreateBuilder();
            rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
            conexion = new SqlConnection(rutaConexion);
        }

        private static DataTable CreateTableConsult(string consult)
        {
            SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
            SqlDataAdapter adaptadorParaTabla = new SqlDataAdapter(comandoParaConsulta);
            DataTable consultaFormatoTabla = new DataTable();
            conexion.Open();
            adaptadorParaTabla.Fill(consultaFormatoTabla);
            conexion.Close();
            return consultaFormatoTabla;
        }

        public static List<ObligatoryDeductionsModel> GetObligatoryDeductionsData()
        {
            List<ObligatoryDeductionsModel> obligatoryDeductions = new List<ObligatoryDeductionsModel>();
            string consult = "SELECT * FROM dbo.ObligatoryDeductions";
            DataTable tablaResultado = CreateTableConsult(consult);
            foreach (DataRow columna in tablaResultado.Rows)
            {
                obligatoryDeductions.Add(new ObligatoryDeductionsModel
                {
                    nombre = Convert.ToString(columna["Nombre"]),
                    porcentaje = Convert.ToDouble(columna["Porcentaje"])
                });
            }

            return obligatoryDeductions;
        }
    }
}