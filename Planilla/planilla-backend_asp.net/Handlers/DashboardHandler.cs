using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;

namespace planilla_backend_asp.net.Handlers
{
  public class DashboardHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;
    public DashboardHandler()
    {
      var builder = WebApplication.CreateBuilder();
      rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
      conexion = new SqlConnection(rutaConexion);
    }

    private DataTable CreateTableConsult(SqlDataAdapter tableAdapter)
    {
      DataTable consultTable = new DataTable();
      conexion.Open();
      tableAdapter.Fill(consultTable);
      conexion.Close();

      return consultTable;
    }

    public DashboardEmployerModel GetDashboard(string employerID)
    {
      DashboardEmployerModel dashboard = new DashboardEmployerModel();
      try
      {
        conexion.Open();
        // Total employees hired by this employer.
        SqlCommand cmd = new SqlCommand("select distinct count(EmployeeID) as TotalEmployees from Contracts where EmployerID=@employerID", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        dashboard.totalEmployees = cmd.ExecuteScalar().ToString();

        // Total projects that this employer has.
        cmd = new SqlCommand("select count(ProjectName) as TotalProjects from Projects where EmployerID=@employerID", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        dashboard.totalProjects = cmd.ExecuteScalar().ToString();

        if (cmd.Connection.State == ConnectionState.Open)
        {
          cmd.Connection.Close();
        }

        // Employee types by project
        dashboard.totalEmployeesByProject = GetEmployeeTypesByProject(employerID);
        
        // Next Payments
        dashboard.nextPayments = GetNextPayments(employerID);
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return null;
      }
      finally
      {
        conexion.Close();
      }
      return dashboard;
    }

    private List<TotalEmployeesByProject> GetEmployeeTypesByProject(string employerID)
    {
      List<TotalEmployeesByProject> employeeTypes = new List<TotalEmployeesByProject>();
      var consult = @"select p.ProjectName, 
              (select count(c.EmployeeID) from Contracts c where c.EmployerID=@employerID and ContractType=0 and ProjectName = p.ProjectName) as FullTime,
              (select count(c.EmployeeID) from Contracts c where c.EmployerID=@employerID and ContractType=1 and ProjectName = p.ProjectName) as PartTime,
              (select count(c.EmployeeID) from Contracts c where c.EmployerID=@employerID and ContractType=2 and ProjectName = p.ProjectName) as Hourly,
              (select count(c.EmployeeID) from Contracts c where c.EmployerID=@employerID and ContractType=3 and ProjectName = p.ProjectName) as ProfServices
        from Projects p
        where EmployerID=@employerID";
      var queryCommand = new SqlCommand(consult, conexion);

      // Uses user's email and the name of the active project to get only related benefits
      queryCommand.Parameters.AddWithValue("@employerID", employerID);

      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tablaResultado = CreateTableConsult(tableAdapter);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        employeeTypes.Add(new TotalEmployeesByProject
        {
          projectName = Convert.ToString(columna["ProjectName"]),
          totalFullTime = Convert.ToString(columna["FullTime"]),
          totalPartTime = Convert.ToString(columna["PartTime"]),
          totalHourly = Convert.ToString(columna["Hourly"]),
          totalProfessionalServices = Convert.ToString(columna["ProfServices"])
        });
      }

      return employeeTypes;
    }

    private List<NextPayments> GetNextPayments(string employerID)
    {
      List<NextPayments> nextPayments = new List<NextPayments>();
      var consult = @"select distinct p.ProjectName,
            p.PaymentMethod,
            (select distinct paid.PaymentDate from Payments paid where EmployerID=@employerID and paid.ProjectName=p.ProjectName) as LastPayment
        from Projects p
        where EmployerID=@employerID";
      var queryCommand = new SqlCommand(consult, conexion);

      // Uses user's email and the name of the active project to get only related benefits
      queryCommand.Parameters.AddWithValue("@employerID", employerID);

      SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
      DataTable tablaResultado = CreateTableConsult(tableAdapter);
      foreach (DataRow columna in tablaResultado.Rows)
      {
        string nextPaymentDate = Convert.ToString(columna["LastPayment"]);
          switch (Convert.ToString(columna["PaymentMethod"]))
          {
            case "NULL":
              {
                nextPaymentDate = "-1";
                break;
              }
            case "Weekly":
              {
                nextPaymentDate = AddDaysToDate(nextPaymentDate, 7);
                break;
              }
            case "Biweekly":
              {
                nextPaymentDate = AddDaysToDate(nextPaymentDate, 14);
                break;
              }
            case "Monthly":
              {
                nextPaymentDate = AddDaysToDate(nextPaymentDate, 30);
                break;
              }
            default:
              {
                nextPaymentDate = "-1";
                break;
              }
          }
        nextPayments.Add(
          new NextPayments {
            projectName = Convert.ToString(columna["ProjectName"]),
            paymentFrequency = Convert.ToString(columna["PaymentMethod"]),
            nextPayment = nextPaymentDate,
          }
        );
        
      }

      return nextPayments;
    }

    private string AddDaysToDate(string date01, int numberDays)
    {
      try
      {
        DateTime date = Convert.ToDateTime(date01);
        DateTime newDate = date.AddDays(numberDays);
        return newDate.ToString("dd-MM-yyyy"); 
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return "-1";
      }
    }
  }
}