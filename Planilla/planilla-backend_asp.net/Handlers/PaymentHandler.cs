using planilla_backend_asp.net.Models;
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

        public List<PaymentModel> PayProjectToday(string projectName, string employerId)
        {
            List<PaymentModel> employees = GetEmployeesWorkingOnProject(projectName, employerId);
            foreach (PaymentModel employee in employees)
            {
                double voluntaryDeductions = GetDeductionFromVoluntaryDeductions(projectName, employerId, employee.employeeId);
                double mandatoryDeductions = GetDeductionFromMandatoryDeductions(employee.netSalary);
                employee.payment = employee.netSalary - voluntaryDeductions - mandatoryDeductions;
            }
            return employees;
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

        private bool ExecuteCommand(SqlCommand command)
        {
            connection.Open();
            bool result = command.ExecuteNonQuery() >= 1;
            connection.Close();
            return result;
        }

        //This method is assuming that Cost is the amount of money that has to be deducted
        //This method needs to change if Cost in the database reprsent a percentage, thats the meaning of the commented code
        private double GetDeductionFromVoluntaryDeductions(/*double salary, */string projectName, string employerId, string employeeId)
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

        private List<PaymentModel> GetEmployeesWorkingOnProject(string projectName, string employerId)
        {
            var consult = "EXECUTE GetEmployeesWorkingOnProjectToday @project_name, @employer_id";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@project_name", projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", employerId);
            DataTable resultTable = CreateTableConsult(queryCommand);
            List<PaymentModel> employees = new List<PaymentModel>();
            foreach (DataRow column in resultTable.Rows)
            {
                employees.Add(new PaymentModel
                { 
                    employeeId = Convert.ToString(column["EmployeeID"]),
                    netSalary = Convert.ToDouble(column["NetSalary"]),
                    contractType = Convert.ToString(column["ContractType"]),
                    contractStartDate = Convert.ToString(column["StartDate"])
                });
            }
            return employees;
        }

        //Assumes that Percentage is a value between 0 and 1 in the database
        private double GetDeductionFromMandatoryDeductions(double salary)
        {
            var consult = @"SELECT MandatoryDeductionName, Percentage
                            FROM MandatoryDeductions";
            var queryCommand = new SqlCommand(consult, connection);
            DataTable resultTable = CreateTableConsult(queryCommand);
            double totalDeduction = 0;
            foreach(DataRow column in resultTable.Rows)
            {
                double percentage = Convert.ToDouble(column["Percentage"]);
                totalDeduction = totalDeduction + (salary * percentage);
            }
            return totalDeduction;
        }

        private bool CreatePayment(string projectName, string employerId, string employeeId, string startContractDay, string paymentDate = "cast (getdate() as date)")
        {
            var command = @"INSERT INTO Payments ([ProjectName], [EmployerID], [EmployeeID], [StartDate], [PaymentDate])
                            VALUES (@project_name, @employer_id, @employee_id, @start_date, @payment_date)";
            SqlCommand queryCommand = new SqlCommand(command, connection);
            queryCommand.Parameters.AddWithValue("@project_name", projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", employerId);
            queryCommand.Parameters.AddWithValue("@employee_id", employeeId);
            queryCommand.Parameters.AddWithValue("@start_date", startContractDay);
            queryCommand.Parameters.AddWithValue("@payment_date", paymentDate);
            return ExecuteCommand(queryCommand);
        }
    }
}
