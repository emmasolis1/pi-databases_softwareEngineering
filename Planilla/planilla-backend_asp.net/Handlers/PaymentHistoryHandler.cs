using planilla_backend_asp.net.Models;
using System.Data.SqlClient;
using System.Data;

namespace planilla_backend_asp.net.Handlers
{ 
    public class PaymentHistoryHandler
    {
        private static SqlConnection connection;
        private string connectionRoute;
        public PaymentHistoryHandler()
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
        private DataTable GetAllPayments(string employeeId)
        {
            var consult = "EXECUTE GetAllEmployeePayments @employee_id";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@employee_id", employeeId);
            return CreateTableConsult(queryCommand);
        }
        private DataTable GetVoluntaryDeductions(PaymentHistoryModel payment)
        {
            var consult = "EXECUTE GetVoluntaryDeductionsFromPayment @project_name, @employer_id, @employee_id, @contract_date, @payment_date";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@project_name", payment.projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", payment.employerId);
            queryCommand.Parameters.AddWithValue("@employee_id", payment.employeeId);
            queryCommand.Parameters.AddWithValue("@contract_date", payment.contractDate);
            queryCommand.Parameters.AddWithValue("@payment_date", payment.paymentDate);
            return CreateTableConsult(queryCommand);
        }
        private DataTable GetMandatoryDeductions(PaymentHistoryModel payment)
        {
            var consult = "EXECUTE GetMandatoryDeductionsFromPayment @project_name, @employer_id, @employee_id, @contract_date, @payment_date";
            var queryCommand = new SqlCommand(consult, connection);
            queryCommand.Parameters.AddWithValue("@project_name", payment.projectName);
            queryCommand.Parameters.AddWithValue("@employer_id", payment.employerId);
            queryCommand.Parameters.AddWithValue("@employee_id", payment.employeeId);
            queryCommand.Parameters.AddWithValue("@contract_date", payment.contractDate);
            queryCommand.Parameters.AddWithValue("@payment_date", payment.paymentDate);
            return CreateTableConsult(queryCommand);
        }
    }

}
