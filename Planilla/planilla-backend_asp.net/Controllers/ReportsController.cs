using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/")]
  [ApiController]
  public class ReportsController : ControllerBase
  {
    // This returns all the 10 latest reports for the given employeeID.
    [HttpGet]
    [Route("reports")]
    public ActionResult GetProjects(string employeeID)
    {
      var handler = new ReportsHandler();
      var data = handler.GetEmployeeReports(employeeID);
      return Ok(data);
    }
  }
}
