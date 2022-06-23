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
      // Create new benefit
      BenefitsHandler handler = new BenefitsHandler();
      handler.CreateBenefit(benefit);
      return Ok();
    }

    [HttpGet]
    [Route("specificBenefit")]
    public ActionResult EditBenefit(string benefitName, string projectName, string employerID)
    {
      try
      {
        BenefitsHandler handler = new BenefitsHandler();
        var data = handler.GetSpecificBenefitInfo(benefitName, projectName, employerID);
        return Ok(data);
      }
      catch (Exception error)
      {
        Console.WriteLine(error);
        return BadRequest(error.Message);
      }
    }

    [HttpPut]
    [Route("specificBenefit")]
    public ActionResult EditBenefit([FromBody] BenefitsModel benefit)
    {
      try
      {
        BenefitsHandler handler = new BenefitsHandler();
        handler.UpdateBenefitInfo(benefit);
        return Ok();
      }
      catch (Exception error)
      {
        Console.WriteLine(error);
        return BadRequest(error.Message);
      }
    }

    [HttpGet]
    [Route("benefitsEmployee")]
    public ActionResult GetEmployeeBenefit(string projectName, string employerID, string employeeID)
    {
      try
      {
        BenefitsHandler handler = new BenefitsHandler();
        var data = handler.GetEmployeeBenefit(projectName, employerID, employeeID);
        return Ok(data);
      }
      catch (Exception error)
      {
        Console.WriteLine(error);
        return BadRequest(error.Message);
      }
    }

  }
}