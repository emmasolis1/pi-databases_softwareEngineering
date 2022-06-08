namespace planilla_backend_asp.net.Models
{
    public  class UsuarioModel
    {
        public string Cedula { get; set; }

        public string Contrasena { get; set; }

        public string Nombre { get; set; }

        public string Apellido1 { get; set; }

        public string Apellido2 { get; set; }

        public string Telefono { get; set; }

        public int TipoUsuario { get; set; }

        public string Provincia { get; set; }

        public string Canton { get; set; }

        public string CodigoPostal { get; set; }
    }

    public class UserSummarizedModel
    {
        public string NombreCompleto { get; set; }

        public string Cedula { get; set; }

        public string Telefono { get; set; }

        public string Direccion { get; set; }
    }
}
