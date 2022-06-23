using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using planilla_backend_asp.net.Controllers;

namespace planilla_backend_testing
{
  public class Tests
  {
    [SetUp]
    public void Setup()
    {
    }
    
    // Get User Data for Login
    [Test]
    public void SucessfullGetUSerData()
    {
      var userController = new UserController();
      ActionResult successResponse = userController.GetUserData("adrian.lara@gmail.com", "password");
      var objectResult = successResponse as OkObjectResult;
      var modelResult = objectResult.Value;
      Assert.IsNotNull(modelResult);
    }

    [Test]
    public void FailedGetUSerData()
    {
      var userController = new UserController();
      ActionResult successResponse = userController.GetUserData("adrian.lara@gmail.com", "pera");
      var objectResult = successResponse as OkObjectResult;
      var modelResult = objectResult.Value;
      Assert.IsNotNull(modelResult);
    }

    [Test]
    public void SucessfullViewEmployee()
    {
      var userController = new UserController();
      ActionResult sucessResponse = userController.ViewEmployee("1234567887");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void FailedViewEmployee()
    {
      var userController = new UserController();
      ActionResult sucessResponse = userController.ViewEmployee("5234567888");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void SucessfullViewSpecificProject()
    {
      var projectController = new ProjectController();
      ActionResult sucessResponse = projectController.EditProject("TaBueno Planilla CR", "0116800871");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void FailedViewSpecificProject()
    {
      var projectController = new ProjectController();
      ActionResult sucessResponse = projectController.EditProject("TaBuenoPlanillaCR", "0116800871");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void SucessfullViewSpecificProjectEmployee()
    {
      var userController = new UserController();
      ActionResult sucessResponse = userController.GetSpecificProjectEmployees("TaBueno Planilla CR", "0116800871");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void FailedViewSpecificProjectEmployee()
    {
      var userController = new UserController();
      ActionResult sucessResponse = userController.GetSpecificProjectEmployees("TaBuenoPlanillaCR", "0116800871");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void SucessfullViewSpecificContract()
    {
      var userController = new UserController();
      ActionResult sucessResponse = userController.GetSpecificContract("TaBueno Planilla CR", "0116800871", "1234567896");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }

    [Test]
    public void FailedViewSpecificContract()
    {
      var userController = new UserController();
      ActionResult sucessResponse = userController.GetSpecificContract("TaBuenoPlanillaCR", "0116800871", "1234567896");
      var objectResult = sucessResponse as OkObjectResult;
      Assert.IsInstanceOf<OkObjectResult>(sucessResponse);
    }
  }
}
