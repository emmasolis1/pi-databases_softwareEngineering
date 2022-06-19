﻿namespace planilla_backend_asp.net.Models
{
    public class PaymentModel
    {
        public string employeeId { get; set; }
        public double netSalary { get; set; }
        public string contractType { get; set; }
        public string contractStartDate { get; set; }
        public double payment { get; set; } = 0;
    }
}
