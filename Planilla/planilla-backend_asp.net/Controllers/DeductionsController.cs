using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/")]
  [ApiController]
  public class DeductionsController : ControllerBase
  {

    [HttpGet]
    [Route("voluntaryDeductions")]
    public ActionResult GetVoluntaryDeductions(string project, string employerID)
    {
      var handler = new DeductionsHandler();
      var data = handler.GetVoluntaryDeductionsData(project, employerID);
      return Ok(data);
    }

    [HttpPost]
    [Route("voluntaryDeductions")]
    public ActionResult CreateVoluntaryDeduction([FromBody] VoluntaryDeductionsModel voluntaryDeductions)
    {
      DeductionsHandler handler = new DeductionsHandler();
      handler.CreateVoluntaryDeductions(voluntaryDeductions);
      return Ok();
    }

    [HttpGet]
    [Route("mandatoryDeductions")]
    public ActionResult GetObligatoryDeductions()
    {
      var handler = new DeductionsHandler();
      var data = handler.GetMandatoryDeductions();
      return Ok(data);
    }
  }
}