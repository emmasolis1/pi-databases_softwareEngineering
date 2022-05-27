using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/")]
  [ApiController]
  public class UserController : ControllerBase
  {
    [HttpGet]
    [Route("employees")]
    public ActionResult GetEmployees()
    {
      // Get data from database
      UserHandler handler = new UserHandler();
      var data = handler.GetEmployees();
      return Ok(data);
    }
  }
}
