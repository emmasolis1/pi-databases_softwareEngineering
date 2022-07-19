using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
  public class ReportsHandler
  {
    private static SqlConnection connection;
    private string connectionRoute;
    public ReportsHandler()
    {
      var builder = WebApplication.CreateBuilder();
      connectionRoute = builder.Configuration.GetConnectionString("EmpleadorContext");
      connection = new SqlConnection(connectionRoute);
    }

    private DataTable CreateTableConsult(SqlDataAdapter tableAdapter)
    {
      DataTable consultTable = new DataTable();
      connection.Open();
      tableAdapter.Fill(consultTable);
      connection.Close();

      return consultTable;
    }

    public List<EmployeeSummaryReport> GetEmployeeReports(string employeeID)
    {
      SqlDataAdapter tableAdapter = new SqlDataAdapter("select top 10 * from Payments where EmployeeID=@employeeID ORDER BY PaymentDate DESC", connection);
      tableAdapter.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
      DataTable consultTable = CreateTableConsult(tableAdapter);
      List<EmployeeSummaryReport> employeeReports = new List<EmployeeSummaryReport>();
      foreach (DataRow row in consultTable.Rows)
      {
        EmployeeSummaryReport employeeReport = new EmployeeSummaryReport();
        employeeReport.projectName = row["ProjectName"].ToString();
        employeeReport.employerID = row["EmployerID"].ToString();
        employeeReport.paymentDate = row["PaymentDate"].ToString();
        employeeReports.Add(employeeReport);
      }
      return employeeReports;
    }

    public EmployeeReport GetEmployeeReport(string employeeID, string employerID, string projectName, string paymentDate)
    {
      EmployeeReport report = new EmployeeReport();
      try 
      {
        connection.Open();

        // Employee Fullname
        SqlCommand command = new SqlCommand("select FirstName, LastName from Users where Identification=@employeeID", connection);
        command.Parameters.AddWithValue("@employeeID", employeeID);
        report.employeeName = command.ExecuteScalar().ToString();

        // Contract Type, Net Salary and Project Name
        command = new SqlCommand("select ContractType, NetSalary, ProjectName from Contracts where EmployerID=@employerID and ProjectName=@projectName and EmployeeID=@employeeID", connection);
        command.Parameters.AddWithValue("@employerID", employerID);
        command.Parameters.AddWithValue("@projectName", projectName);
        command.Parameters.AddWithValue("@employeeID", employeeID);
        SqlDataReader reader = command.ExecuteReader();
        var contractResult = "";
        while (reader.Read())
        {
          contractResult = reader["ContractType"].ToString();
          report.netSalary = reader["NetSalary"].ToString();
          report.projectName = reader["ProjectName"].ToString();
        }
        report.contractType = parseContractType(contractResult);

        // Payment Date
        report.paymentDate = paymentDate;

        if (command.Connection.State == ConnectionState.Open)
        {
          command.Connection.Close();
        }

        // Mandatory Deductions
        report.mandatoryDeductions = GetMandatoryDeductions(employerID, projectName, employeeID, paymentDate);

        // Voluntary Deductions
        report.optionalDeductions = GetVoluntaryDeductions(employerID, projectName, employeeID, paymentDate);

        // Gross Salary
        report.grossSalary = GetGrossSalary(report.netSalary, report.mandatoryDeductions, report.optionalDeductions).ToString();
      } 
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
      finally
      {
        connection.Close();
      }
      return report;
    }

    private string parseContractType(string contractType)
    {
      switch (contractType)
      {
        case "0":
          return "FullTime Employee";
        
        case "1":
          return "PartTime Employee";
        
        case "2":
          return "Hourly Paid Employee";
        
        case "3":
          return "Professional Services";
        
        default:
          return "Unknown";
      }
    }

    private List<MandatoryDeductionsEmployeeReport> GetMandatoryDeductions(string employerID, string projectName, string employeeID, string paymentDate)
    {
      List<MandatoryDeductionsEmployeeReport> mandatoryDeductions = new List<MandatoryDeductionsEmployeeReport>();
      try
      {
        connection.Open();
        SqlCommand command = new SqlCommand("select i.MandatoryDeductionName, m.[Percentage] from IncludesMandatoryDeductions i, MandatoryDeductions m where i.EmployeeID=@employeeID and i.ProjectName=@projectName and i.EmployerID=@employerID and i.PaymentDate=@paymentDate and i.MandatoryDeductionName=m.MandatoryDeductionName", connection);
        command.Parameters.AddWithValue("@employerID", employerID);
        command.Parameters.AddWithValue("@projectName", projectName);
        command.Parameters.AddWithValue("@employeeID", employeeID);
        command.Parameters.AddWithValue("@paymentDate", paymentDate);
        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
          MandatoryDeductionsEmployeeReport mandatoryDeduction = new MandatoryDeductionsEmployeeReport();
          mandatoryDeduction.name = reader["MandatoryDeductionName"].ToString();
          mandatoryDeduction.percentage = reader["Percentage"].ToString();
          mandatoryDeductions.Add(mandatoryDeduction);
        }
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
      finally
      {
        connection.Close();
      }
      return mandatoryDeductions;
    }

    private List<VoluntaryDeductionsEmployeeReport> GetVoluntaryDeductions(string employerID, string projectName, string employeeID, string paymentDate)
    {
      List<VoluntaryDeductionsEmployeeReport> voluntaryDeductions = new List<VoluntaryDeductionsEmployeeReport>();
      try
      {
        connection.Open();
        SqlCommand command = new SqlCommand("select i.VoluntaryDeductionName, s.Cost from IncludesVoluntaryDeductions i, VoluntaryDeductionsStatus s where i.EmployeeID=@employeeID and i.ProjectName=@projectName and i.EmployerID=@employerID and i.PaymentDate=@paymentDate and s.EmployeeID=i.EmployeeID and s.ProjectName=i.ProjectName and s.EmployerID=i.EmployerID and EndingDate is NULL", connection);
        command.Parameters.AddWithValue("@employerID", employerID);
        command.Parameters.AddWithValue("@projectName", projectName);
        command.Parameters.AddWithValue("@employeeID", employeeID);
        command.Parameters.AddWithValue("@paymentDate", paymentDate);
        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
          VoluntaryDeductionsEmployeeReport voluntaryDeduction = new VoluntaryDeductionsEmployeeReport();
          voluntaryDeduction.name = reader["VoluntaryDeductionName"].ToString();
          voluntaryDeduction.cost = reader["Cost"].ToString();
          voluntaryDeductions.Add(voluntaryDeduction);
        }
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
      finally
      {
        connection.Close();
      }
      return voluntaryDeductions;
    }

    private float GetGrossSalary(string NetSalary, List<MandatoryDeductionsEmployeeReport> mandatoryDeductions, List<VoluntaryDeductionsEmployeeReport> voluntaryDeductions)
    {
      float grossSalary = float.Parse(NetSalary);
      float originalNetSalary = float.Parse(NetSalary);
      foreach (MandatoryDeductionsEmployeeReport mandatoryDeduction in mandatoryDeductions)
      {
        grossSalary -= (originalNetSalary * float.Parse(mandatoryDeduction.percentage)) / 100;
      }
      foreach (VoluntaryDeductionsEmployeeReport voluntaryDeduction in voluntaryDeductions)
      {
        grossSalary -= float.Parse(voluntaryDeduction.cost);
      }
      // parse float to string with 2 decimal places
      return float.Parse(grossSalary.ToString("0.00"));
    }
  }
}