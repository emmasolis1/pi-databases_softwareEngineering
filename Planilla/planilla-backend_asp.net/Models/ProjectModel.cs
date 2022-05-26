namespace planilla_backend_asp.net.Models
{
    public  class ProjectModel
    {
        public ProjectModel()
        {
            nombre = "";
            cedulaUsuario = "";
            presupuesto = 0;
            modalidadPago = "";
        }
   
        public string nombre { get; set; }
        public string cedulaUsuario { get; set; }
        public int presupuesto { get; set; }
        public string modalidadPago { get; set; }
    }
}
