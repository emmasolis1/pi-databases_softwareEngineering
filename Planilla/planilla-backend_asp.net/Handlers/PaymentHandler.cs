using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{
    public class PaymentHandler
    {
        private static SqlConnection connection;
        private string connectionRoute;
        public PaymentHandler()
        {
            var builder = WebApplication.CreateBuilder();
            connectionRoute = builder.Configuration.GetConnectionString("EmpleadorContext");
            connection = new SqlConnection(connectionRoute);
        }

        private DataTable CreateTableConsult(SqlCommand queryCommand)
        {
            SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
            DataTable tableFormatQuery = new DataTable();
            connection.Open();
            tableAdapter.Fill(tableFormatQuery);
            connection.Close();
            return tableFormatQuery;
        }

        //This method is assuming that Cost is the amount of money that has to be deducted
        //This method needs to change if Cost in the database reprsent a percentage, thats the meaning of the commented code
        private double GetSalaryDeductionFromVoluntaryDeductions(/*double salary, */string projectName, string employerId, string employeeId)
        {
            var consult = "EXECUTE GetEmployeeVoluntaryDeductionsToday @project_name, @employer_id, @employee_id";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@project_name", projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", employerId);
            queryCommand.Parameters.AddWithValue("@employee_id", employeeId);
            DataTable resultTable = CreateTableConsult(queryCommand);
            double totalDeduction = 0;
            foreach (DataRow column in resultTable.Rows)
            {
                double deduction = Convert.ToDouble(column["Cost"]);
                //deduction = salary * deduction;
                totalDeduction = totalDeduction + deduction;
            }
            return totalDeduction;
        }

        private double GetEmployeeRegisteredHours(string projectName, string employerId, string employeeId, string startDate, string endDate)
        {
            var consult = "EXECUTE GetEmployeeHourRegistryInRange @project_name, @employer_id, @employee_id, @start_date, @end_date";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@project_name", projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", employerId);
            queryCommand.Parameters.AddWithValue("@employee_id", employeeId);
            queryCommand.Parameters.AddWithValue("@start_date", startDate);
            queryCommand.Parameters.AddWithValue("@end_date", endDate);
            DataTable resultTable = CreateTableConsult(queryCommand);
            double totalHours = 0;
            foreach (DataRow column in resultTable.Rows)
            {
                double hours = Convert.ToDouble(column["NumberOfHours"]);
                totalHours = totalHours + hours;
            }
            return totalHours;
        }

        private List<string> GetEmployeesWorkingOnProject(string projectName, string employerId)
        {
            var consult = "EXECUTE GetEmployeesWorkingOnProjectToday @project_name, @employer_id";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@project_name", projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", employerId);
            DataTable resultTable = CreateTableConsult(queryCommand);
            List<string> employees = new List<string>();
            foreach (DataRow column in resultTable.Rows)
            {
                employees.Add(Convert.ToString(column["EmployeeID"]));
            }
            return employees;
        }
    }
}
