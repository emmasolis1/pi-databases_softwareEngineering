using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.BDProcedures;

namespace planilla_backend_asp.net.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObligatoryDeductionsController : ControllerBase
    {
        [HttpGet(Name = "GetObligatoryDeductions")]
        public IEnumerable<ObligatoryDeductionsModel> GetObligatoryDeductions()
        {
            var data = ObligatoryDeductionsBDProcedures.GetObligatoryDeductionsData();
            return data;
        }
    }
}
