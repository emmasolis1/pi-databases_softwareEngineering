namespace planilla_backend_asp.net.Models
{
  public class DashboardEmployerModel
  {
    public string totalEmployees { get; set; }
    public string totalProjects { get; set; }
    public string totalEmployeesByProject { get; set; }
    public string costForBenefits { get; set; }
    public string totalFulltimeEmployees { get; set; }
    public string totalPartTimeEmployees { get; set; }
    public string totalHourlyEmployees { get; set; }
    public string totalProfessionalServicesEmployees { get; set; }
    public List<UserModelSummarized>? latestHirings { get; set; } = new List<UserModelSummarized>();
    public List<PaymentModelSummarized>? latestPayments { get; set; } = new List<PaymentModelSummarized>();
  }
}