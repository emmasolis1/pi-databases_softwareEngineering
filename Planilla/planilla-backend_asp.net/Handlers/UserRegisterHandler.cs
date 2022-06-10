using planilla_backend_asp.net.Models;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.Handlers
{
  public class UserRegisterHandler
  {
    private static SqlConnection conexion;
    private string rutaConexion;

    public UserRegisterHandler()
    {
      var builder = WebApplication.CreateBuilder();
      rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
      conexion = new SqlConnection(rutaConexion);
    }

    public int registerUser(UserModel user) {
      int ingreso = registerUserIntoDatabase(user);
      if (ingreso != 1)
      {
        throw new Exception("Not enought data was provided to create the user");
      }
      else
      {
        Console.WriteLine("User successfully registered.");
      }
      return ingreso;
    }

    private int registerUserIntoDatabase(UserModel user) {
      int ingreso = 0;
      try
      {
        conexion.Open();
        //SqlCommand cmd = new SqlCommand("INSERT INTO Usuario VALUES (@cedula, @contrasena, @nombre, @apellido1, @apellido2, @telefono, @tipo_usuario, @provincia, @canton, @codigoPostal)", conexion);
        //cmd.Parameters.AddWithValue("@cedula", user.Cedula);
        //cmd.Parameters.AddWithValue("@contrasena", user.Contrasena);
        //cmd.Parameters.AddWithValue("@nombre", user.Nombre);
        //cmd.Parameters.AddWithValue("@apellido1", user.Apellido1);
        //cmd.Parameters.AddWithValue("@apellido2", user.Apellido2);
        //cmd.Parameters.AddWithValue("@telefono", user.Telefono);
        //cmd.Parameters.AddWithValue("@tipo_usuario", user.TipoUsuario);
        //cmd.Parameters.AddWithValue("@provincia", user.Provincia);
        //cmd.Parameters.AddWithValue("@canton", user.Canton);
        //cmd.Parameters.AddWithValue("@codigoPostal", user.CodigoPostal);
        //ingreso = cmd.ExecuteNonQuery();
        conexion.Close();
      }
      catch (SqlException e)
      {
        Console.WriteLine("Error: " + e.Message);
      }
      return ingreso;
    }
  }
}
