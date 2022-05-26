using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetProjects()
        {
          var handler = new ProjectHandler();
          var data = handler.GetProyectsData();
          return Ok(data);
        }
    }
}