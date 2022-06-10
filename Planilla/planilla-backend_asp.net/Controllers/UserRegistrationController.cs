using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;
using planilla_backend_asp.net.Models;
using System;
using System.Collections.Generic;
using System.Net;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController: ControllerBase
    {
        [HttpPost]
        public ActionResult RegistrarUsuario(UserModel user)
        {
            try
            {
                UserRegisterHandler handler = new UserRegisterHandler();
                var data = handler.registerUser(user);
                return Ok(data);
            }
            catch(Exception error)
            {
                Console.WriteLine(error);
                return BadRequest(error.Message);
            }
        }
    }
}
