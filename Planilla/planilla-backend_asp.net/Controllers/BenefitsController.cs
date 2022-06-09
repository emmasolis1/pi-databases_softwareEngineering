using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.net.Models;
using planilla_backend_asp.net.Handlers;

namespace planilla_backend_asp.net.Controllers
{
    [Route("api/")]
    [ApiController]
    public class BenefitsController : ControllerBase
    {
        [HttpGet]
        [Route("benefits")]
        public ActionResult GetBenefits()
        {
            var handler = new BenefitsHandler();
            var data = handler.GetBenefitsData();
            return Ok(data);
        }

        [HttpPost]
        [Route("benefits")]
        public ActionResult CreateBenefit([FromBody] BenefitsModel benefit)
        {
            // Create new employee
            BenefitsHandler handler = new BenefitsHandler();
            handler.CreateBenefit(benefit);
            return Ok();
        }
    }
}