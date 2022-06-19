using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MandatoryDeductionsController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetObligatoryDeductions()
        {
          var handler = new MandatoryDeductionsHandler();
          var data = handler.GetMandatoryDeductions();
          return Ok(data);
        }
    }
}