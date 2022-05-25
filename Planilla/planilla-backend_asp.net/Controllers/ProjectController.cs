using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using System.Data;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<ProjectModel> GetProjects()
        {
            var builder = WebApplication.CreateBuilder();
            rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
            conexion = new SqlConnection(rutaConexion);
            var data = GetProyectsData();
            return data;
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

        private List<ProjectModel> GetProyectsData()
        {
            List<ProjectModel> projects = new List<ProjectModel>();
            string consult = "SELECT * FROM Proyectos";
            DataTable tablaResultado = CreateTableConsult(consult);
            foreach (DataRow columna in tablaResultado.Rows)
            {
                projects.Add(new ProjectModel
                {
                    nombre = Convert.ToString(columna["Nombre"]),
                    cedulaUsuario = Convert.ToString(columna["CedulaUsuario"]),
                    presupuesto = Convert.ToInt32(columna["Presupuesto"]),
                    modalidadPago = Convert.ToString(columna["ModalidadPago"])
                });
            }

            return projects;
        }
    }
}