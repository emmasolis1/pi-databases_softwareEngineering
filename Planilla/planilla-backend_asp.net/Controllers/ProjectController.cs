using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        [Route("projects")]
        public ActionResult GetProjects(string employerID)
        {
          var handler = new ProjectHandler();
          var data = handler.GetProyectsData(employerID);
          return Ok(data);
        }
    }
}