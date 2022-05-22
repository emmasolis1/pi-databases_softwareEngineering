namespace planilla_backend_asp.net.Models
{
    public  class UsuarioModel
    {
        public  UsuarioModel()
        {
            Cedula = "";
            Contrasena = "";
            Nombre = "";
            Apellido1 = "";
            Apellido2 = "";
            Telefono = "";
        }
   
        public string Cedula { get; set; }

        public string Contrasena { get; set; }

        public string Nombre { get; set; }

        public string Apellido1 { get; set; }

        public string Apellido2 { get; set; }

        public string Telefono { get; set; }

        public int IdTipoUsuario { get; set; }

        public int IdProvincia { get; set; }

        public int IdCanton { get; set; }

        public int IdCodigoPostal { get; set; }


    }
}
