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
      var data = handler.GetAllEmployeesSummarized();
      return Ok(data);
    }

    [HttpPost]
    [Route("employees")]
    public ActionResult CreateEmployee([FromBody] UserModel employee)
    {
        // Create new employee
        UserHandler handler = new UserHandler();
        handler.CreateEmployee(employee);
        return Ok();
    }

    [HttpPost]
    [Route("register")]
    public ActionResult CreateEmployer([FromBody] UserModel employer)
    {
        try
        {
            UserHandler handler = new UserHandler();
            handler.CreateEmployer(employer);
            return Ok();
        }
        catch(Exception error)
        {
            Console.WriteLine(error);
            return BadRequest(error.Message);
        }
    }
  }
}
