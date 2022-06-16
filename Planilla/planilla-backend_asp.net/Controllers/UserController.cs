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

    [HttpGet]
    [Route("getUserData")]
    public ActionResult GetUserData(string email, string password)
    {
      var handler = new UserHandler();
      var data = handler.GetUserData(email, password);
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

    [HttpPost]
    [Route("account")]
    public ActionResult EditEmployeeProfile([FromBody] ReciberModel id)
    {
        try
        {
            UserHandler handler = new UserHandler();
            var data = handler.GetEmployeeInfo(id);
            return Ok(data);
        }
        catch(Exception error)
        {
            Console.WriteLine(error);
            return BadRequest(error.Message);
        }
    }

    [HttpPut]
    [Route("account")]
    public ActionResult EditEmployeeProfile([FromBody] UserEmployeeInfoToModify employee)
    {
      try
      {
        UserHandler handler = new UserHandler();
        handler.UpdateEmployeeInfo(employee);
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
