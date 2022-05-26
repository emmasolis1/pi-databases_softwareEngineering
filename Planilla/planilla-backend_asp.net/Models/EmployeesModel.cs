using System;
using System.Collections.Generic;

namespace planilla_backend_asp.Models
{
  public class EmployeesModel
  {
    public string nombre { get; set; }
    public string apellido1 { get; set; }
    public string apellido2 { get; set; }
    public string cedula { get; set; }
    public List<string> telefonos { get; set; }
    public string provincia { get; set; }
    public string canton { get; set; }
    public string codigoPostal { get; set; }
    public string descripcionDireccion { get; set; }
  }
}
