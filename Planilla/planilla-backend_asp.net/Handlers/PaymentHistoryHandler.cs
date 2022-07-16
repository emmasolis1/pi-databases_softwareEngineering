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
        
    }

}
