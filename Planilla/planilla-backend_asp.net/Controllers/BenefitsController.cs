using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BenefitsController : ControllerBase
  {
    [HttpGet]
    public ActionResult GetBenefits(string email, string project)
    {
      var handler = new BenefitsHandler();
      var data = handler.GetBenefitsData(email, project);
      return Ok(data);
    }
  }
}