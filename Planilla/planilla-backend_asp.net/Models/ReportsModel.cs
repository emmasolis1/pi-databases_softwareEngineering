namespace planilla_backend_asp.net.Models
{
  public  class LatestEmployeeReports
  {
    public List<EmployeeSummaryReport>? employeeSummaryReports { get; set; } = new List<EmployeeSummaryReport>();
  }

  public class EmployeeSummaryReport
  {
    public string projectName { get; set; }
    public string employerID { get; set; }
    public string paymentDate { get; set; }
  }
}
