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
                    benefitName = Convert.ToString(columna["nombreBeneficio"]),
                    employerID = Convert.ToString(columna["cedulaEmpleador"]),
                    projectName = Convert.ToString(columna["nombreProyecto"]),
                });
            }

            return benefits;
        }

        public bool CreateBenefit(BenefitsModel benefit)
        {
            var consulta = @"INSERT INTO Beneficios
                            VALUES(@benefitName, @employerID, @projectName)";
            var comandoParaConsulta = new SqlCommand(consulta, conexion);
            comandoParaConsulta.Parameters.AddWithValue("@benefitName", benefit.benefitName);
            comandoParaConsulta.Parameters.AddWithValue("@employerID", benefit.employerID);
            comandoParaConsulta.Parameters.AddWithValue("@projectName", benefit.projectName);

            conexion.Open();
            bool exito = comandoParaConsulta.ExecuteNonQuery() >= 1;
            conexion.Close();

            return exito;
        }

        /*
        public bool ModifyBenefit(BenefitsModel benefit)
        {
            var consulta = @"UPDATE Beneficios SET nombreBeneficio = @benefitName,
                                cedulaEmpleador = @employerID,
                                nombreProyecto = @projectName
                                WHERE ...";
            var comandoParaConsulta = new SqlCommand(consulta, conexion);
            comandoParaConsulta.Parameters.AddWithValue("@benefitName", benefit.benefitName);
            comandoParaConsulta.Parameters.AddWithValue("@employerID", benefit.employerID);
            comandoParaConsulta.Parameters.AddWithValue("@projectName", benefit.projectName);

            conexion.Open();
            bool exito = comandoParaConsulta.ExecuteNonQuery() >= 1;
            conexion.Close();

            return exito;
        }
        */

        public bool DeleteBenefit(BenefitsModel benefit)
        {
            var consulta = @"DELETE FROM Beneficios 
                            WHERE nombreBeneficio = @benefitName
                            AND cedulaEmpleador = @employerID
                            AND nombreProyecto = @projectName";
            var comandoParaConsulta = new SqlCommand(consulta, conexion);
            comandoParaConsulta.Parameters.AddWithValue("@benefitName", benefit.benefitName);
            comandoParaConsulta.Parameters.AddWithValue("@employerID", benefit.employerID);
            comandoParaConsulta.Parameters.AddWithValue("@projectName", benefit.projectName);

            conexion.Open();
            bool exito = comandoParaConsulta.ExecuteNonQuery() >= 1;
            conexion.Close();

            return exito;
        }
    }
}