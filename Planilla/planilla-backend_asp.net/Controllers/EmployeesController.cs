using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using planilla_backend_asp.Models;
using System;
using System.Collections.Generic;
using System.Net;

namespace planilla_backend_asp.net.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeesController : ControllerBase
  {
    [HttpGet]
    public ActionResult GetEmployees() {
      // Get data from database
      var data = getEmployeesTest();

      return Ok(data);
    }

    private List<EmployeesModel> getEmployeesTest() {
      List<EmployeesModel> employees = new List<EmployeesModel>();
      employees.Add(new EmployeesModel
      {
        nombre = "Emmanuel",
        apellido1 = "Perez",
        apellido2 = "Mendoza",
        cedula = "3476322834",
        provincia = "San Jose",
        canton = "Escazu",
        codigoPostal = "23432",
        descripcionDireccion = "NA",
        telefonos = new List<string>(){ "12345678", "87654321"}
      });

      employees.Add(new EmployeesModel
      {
        nombre = "Maria",
        apellido1 = "Perez",
        apellido2 = "Mendoza",
        cedula = "3476322835",
        provincia = "San Jose",
        canton = "Escazu",
        codigoPostal = "23432",
        descripcionDireccion = "NA",
        telefonos = new List<string>() { "12345678", "87654321" }
      });

      employees.Add(new EmployeesModel
      {
        nombre = "Pablo",
        apellido1 = "Perez",
        apellido2 = "Mendoza",
        cedula = "3476322836",
        provincia = "San Jose",
        canton = "Escazu",
        codigoPostal = "23432",
        descripcionDireccion = "NA",
        telefonos = new List<string>() { "12345678", "87654321" }
      });

      return employees;
    }
  }
}
