using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/")]
  [ApiController]
  public class DashboardController : ControllerBase
  {
    [HttpGet]
    [Route("dashboard")]
    public ActionResult GetDashboard(string employerID, string projectName)
    {
      // Get data from database
      DashboardHandler handler = new DashboardHandler();
      try {
        var data = handler.GetDashboard(employerID, projectName);
        return Ok(data);
      } catch (Exception e) {
        return BadRequest(e.Message);
      }
    }
  }
}