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

    public DashboardEmployerModel GetDashboard(string employerID, string projectName)
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

        // Total employees hired by this employer by project.
        cmd = new SqlCommand("select distinct count(EmployeeID) as TotalEmployeesByProject from Contracts where ProjectName=@projectName", conexion);
        cmd.Parameters.AddWithValue("@projectName", projectName);
        dashboard.totalEmployeesByProject = cmd.ExecuteScalar().ToString();

        // Total cost for benefits.
        cmd = new SqlCommand("select SUM(Cost) as TotalBenefitsCostByProject from Benefits where ProjectName=@projectName and EmployerID=@employerID", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        cmd.Parameters.AddWithValue("@projectName", projectName);
        dashboard.costForBenefits = cmd.ExecuteScalar().ToString();

        // Total full time employees.
        cmd = new SqlCommand("select distinct count(EmployeeID) as FullTimeEmployees from Contracts where ProjectName=@projectName and EmployerID=@employerID and ContractType=0", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        cmd.Parameters.AddWithValue("@projectName", projectName);
        dashboard.totalFulltimeEmployees = cmd.ExecuteScalar().ToString();

        // Total part time employees.
        cmd = new SqlCommand("select distinct count(EmployeeID) as PartTimeEmployees from Contracts where ProjectName=@projectName and EmployerID=@employerID and ContractType=1", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        cmd.Parameters.AddWithValue("@projectName", projectName);
        dashboard.totalPartTimeEmployees = cmd.ExecuteScalar().ToString();

        // Total hourly employees.
        cmd = new SqlCommand("select distinct count(EmployeeID) as HourlyEmployees from Contracts where ProjectName=@projectName and EmployerID=@employerID and ContractType=2", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        cmd.Parameters.AddWithValue("@projectName", projectName);
        dashboard.totalHourlyEmployees = cmd.ExecuteScalar().ToString();

        // Total professional services employees.
        cmd = new SqlCommand("select distinct count(EmployeeID) as ProfessionalServicesEmployees from Contracts where ProjectName=@projectName and EmployerID=@employerID and ContractType=3", conexion);
        cmd.Parameters.AddWithValue("@employerID", employerID);
        cmd.Parameters.AddWithValue("@projectName", projectName);
        dashboard.totalProfessionalServicesEmployees = cmd.ExecuteScalar().ToString();
      }
      catch (Exception e)
      {
        return null;
      }
      finally
      {
        conexion.Close();
      }
      return dashboard;
    }
  }
}