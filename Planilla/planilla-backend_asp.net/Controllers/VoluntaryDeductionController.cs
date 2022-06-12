using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/")]
    [ApiController]
    public class VoluntaryDeductionsController : Controller
    {
        [HttpGet]
        [Route("deductions")]
        // TODO: Necesita una forma de recibir el identificador del proyecto para
        // buscar los beneficios que coresponden a un proyecto
        public ActionResult GetDeductions()
        {
            // Get data from database
            VoluntaryDeductionsHandler handler = new VoluntaryDeductionsHandler();
            var data = handler.GetDeductions();
            return Ok(data);
        }
    }
}
