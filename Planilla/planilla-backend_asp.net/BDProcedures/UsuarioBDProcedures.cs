﻿using planilla_backend_asp.net.Models;
using System.Data;
using System.Data.SqlClient;

namespace planilla_backend_asp.net.BDProcedures
{
    public class UsuarioBDProcedures
    {
        private static SqlConnection conexion;
        private string rutaConexion;
        public UsuarioBDProcedures()
        {
            var builder = WebApplication.CreateBuilder();
            rutaConexion = builder.Configuration.GetConnectionString("EmpleadorContext");
            conexion = new SqlConnection(rutaConexion);
        }

        private DataTable CreateTableConsult(string consult)
        {
            SqlCommand comandoParaConsulta = new SqlCommand(consult, conexion);
            SqlDataAdapter adaptadorParaTabla = new
            SqlDataAdapter(comandoParaConsulta);
            DataTable consultaFormatoTabla = new DataTable();
            conexion.Open();
            adaptadorParaTabla.Fill(consultaFormatoTabla);
            conexion.Close();
            return consultaFormatoTabla;
        }
        public static int IngresarUsuario(UsuarioModel usuario)
        {
            int result = 0;
            try
            {
                result = RealizarIngreso(usuario);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.WriteLine("No se ha logrado registrar el usuario");
            }
            return result;
        }

        public static int RealizarIngreso(UsuarioModel usuario)
        {
            int result = 0;
            string parametros = "'" + usuario.Cedula + "','" + usuario.Contrasena + "','" + usuario.Nombre + "','" + usuario.Apellido1 +
             "','" + usuario.Apellido2 + "','" + usuario.Telefono + "','" + usuario.TipoUsuario + "','" + usuario.Provincia + "','" +
             usuario.Canton + "','" + usuario.CodigoPostal + "'";
            string command = "Insert into Usuario Values(" + parametros + ")";
            SqlCommand comandoIngreso = new SqlCommand(command, conexion);
            try
            {
                conexion.Open();
                comandoIngreso.ExecuteNonQuery();
                conexion.Close();
                result = 1;

            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex);

            }
            return result;
        }
    }
}
  