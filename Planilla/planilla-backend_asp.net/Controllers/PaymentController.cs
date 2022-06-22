using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpGet]
        [Route("payments")]
        public ActionResult PayProject()
        {
            var handler = new PaymentHandler();
            var data = handler.PayProjectToday("TaBueno Planilla CR", "0116800871");
            return Ok(data);
        }
    }
}
