using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.BussinessLogic;
using planilla_backend_asp.net.Models;
using System;
using System.Collections.Generic;
using System.Net;
using planilla_backend_asp.net.BDProcedures;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/")]
  [ApiController]
  public class UserController : ControllerBase
  {
    [HttpGet]
    [Route("employee")]
    public ActionResult GetEmployees()
    {
      // Get data from database
      UserHandler handler = new UserHandler();
      var data = handler.GetEmployees();
      return Ok(data);
    }

    [HttpPost]
    [Route("registerUser")]
    public ActionResult RegistrarUsuario(UsuarioModel usuario)
    {
      try
      {
        var data = RegistroUsuarioLogic.RegistroUsuario(usuario);
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
