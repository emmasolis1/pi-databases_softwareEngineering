using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using System.Data;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObligatoryDeductionsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetObligatoryDeductions()
        {
            var builder = WebApplication.CreateBuilder();
            rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
            conexion = new SqlConnection(rutaConexion);
            var data = GetObligatoryDeductionsData();
            return Ok(data);
        }

        private static SqlConnection conexion;
        private string rutaConexion;

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

        private List<ObligatoryDeductionsModel> GetObligatoryDeductionsData()
        {
            List<ObligatoryDeductionsModel> obligatoryDeductions = new List<ObligatoryDeductionsModel>();
            string consult = "SELECT * FROM DeduccionesObligatorias";
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