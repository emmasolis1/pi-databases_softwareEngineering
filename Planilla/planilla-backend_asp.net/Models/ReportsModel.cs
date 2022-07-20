namespace planilla_backend_asp.net.Models
{
  public class EmployeeSummaryReport
  {
    public string projectName { get; set; }
    public string employerID { get; set; }
    public string paymentDate { get; set; }
  }

  public class EmployeeReport
  {
    public string projectName { get; set; }
    public string paymentDate { get; set; }
    public string employeeName { get; set; }
    public string contractType { get; set; }
    public string netSalary { get; set; }
    public string? grossSalary { get; set; } = null;
    public List<MandatoryDeductionsEmployeeReport>? mandatoryDeductions { get; set; } = new List<MandatoryDeductionsEmployeeReport>();
    public List<VoluntaryDeductionsEmployeeReport>? optionalDeductions { get; set; } = new List<VoluntaryDeductionsEmployeeReport>();
  }

  public class MandatoryDeductionsEmployeeReport
  {
    public string name { get; set; }
    public string percentage { get; set; }
  }

  public class VoluntaryDeductionsEmployeeReport
  {
    public string name { get; set; }
    public string cost { get; set; }
  }
}
