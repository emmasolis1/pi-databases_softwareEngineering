using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/")]
  [ApiController]
  public class BenefitsController : ControllerBase
  {
    [HttpGet]
    [Route("benefits")]
    public ActionResult GetBenefits(string project, string employerID)
    {
      var handler = new BenefitsHandler();
      var data = handler.GetBenefitsData(project, employerID);
      return Ok(data);
    }

    [HttpPost]
    [Route("benefits")]
    public ActionResult CreateBenefit([FromBody] BenefitsModel benefit)
    {
      // Create new employee
      BenefitsHandler handler = new BenefitsHandler();
      handler.CreateBenefit(benefit);
      return Ok();
    }
  }
}