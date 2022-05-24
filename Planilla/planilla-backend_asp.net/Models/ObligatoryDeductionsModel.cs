namespace planilla_backend_asp.net.Models
{
    public  class ObligatoryDeductionsModel
    {
        public ObligatoryDeductionsModel()
        {
            nombre = "";
            porcentaje = 0;
        }
   
        public string nombre { get; set; }

        public double porcentaje { get; set; }
    }
}
