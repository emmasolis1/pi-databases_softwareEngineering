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
        private readonly IConfiguration _configuration;
        public ObligatoryDeductionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            SELECT * FROM DeduccionesObligatorias
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadorContext");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}