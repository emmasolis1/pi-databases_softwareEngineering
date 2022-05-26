using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.BussinessLogic;
using planilla_backend_asp.net.Models;
using System;
using System.Collections.Generic;
using System.Net;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroUsuarioController: ControllerBase
    {
        [HttpPost]
        public ActionResult RegistrarUsuario(UsuarioModel usuario)
        {
            try
            {
                var data = RegistroUsuarioLogic.RegistroUsuario(usuario);
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
