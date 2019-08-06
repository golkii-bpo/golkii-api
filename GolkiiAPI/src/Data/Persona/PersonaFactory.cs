using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using GolkiiAPI.src.BaseControl.Tarjeta;
using GolkiiAPI.src.BaseControl.Telefono;
using GolkiiAPI.src.BaseControl.Tipificacion;
using GolkiiAPI.src.Shared;

namespace GolkiiAPI.src.BaseControl.Persona
{
    internal class PersonaFactory
    {
        public PersonaFactory()
        {
        }

        internal PersonaModel GetPersonaByCedula(string ced)
        {
            var SqlManager = new ConexionManager();
            using (var con = SqlManager.Connection)
            {
                con.Open();
                using (var cmd = SqlManager.Get("GOLKII_APP.SP_GetPersonaByCedula", con))
                {
                    cmd.Parameters.AddWithValue("@cedula", ced);
                    using (var da = new SqlDataAdapter(cmd)) {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt.AsEnumerable().Select(m =>
                        new PersonaModel
                        {
                            idPersona = m.Field<int>("IdPersona"),
                            nombre = m.Field<string>("Nombre"),
                            cedula = m.Field<string>("Cedula"),
                            edad = m.Field<int?>("Edad"),
                            sexo = m.Field<string>("Sexo"),
                            salario = (float)m.Field<Decimal>("Salario"),
                            statusCredex = m.Field<string>("StatusCredex"),
                            departamento = m.Field<string>("Departamento"),
                            municipio = m.Field<string>("Municipio"),
                            domicilio = m.Field<string>("Domicilio")
                        }).FirstOrDefault();
                    }
                }
            }
        }

        internal PersonaModel GetPersonaByTelefono(string telefono)
        {
            var SqlManager = new ConexionManager();
            using (var con = SqlManager.Connection)
            {
                con.Open();
                using (var cmd = SqlManager.Get("GOLKII_APP.SP_GetPersonaByTelefono", con))
                {
                    cmd.Parameters.AddWithValue("@telefono", telefono);
                    using (var da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt.AsEnumerable().Select(m =>
                        new PersonaModel
                        {
                            idPersona = m.Field<int>("IdPersona"),
                            nombre = m.Field<string>("Nombre"),
                            cedula = m.Field<string>("Cedula"),
                            edad = m.Field<int>("Edad"),
                            sexo = m.Field<string>("Sexo"),
                            salario = (float)m.Field<Decimal>("Salario"),
                            statusCredex = m.Field<string>("StatusCredex"),
                            departamento = m.Field<string>("Departamento"),
                            municipio = m.Field<string>("Municipio"),
                            domicilio = m.Field<string>("Domicilio")
                        }).FirstOrDefault();
                    }
                }
            }
        }


        internal List<TarjetaModel> GetTarjetasPersona(int id)
        {
            var SqlManager = new ConexionManager();
            using (var con = SqlManager.Connection)
            {
                con.Open();
                using (SqlCommand cmd = SqlManager.Get("GOLKII_APP.SP_GetTarjetasDePersonaID", con))
                {
                    cmd.Parameters.AddWithValue("@PersonaID", id);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        return dt.AsEnumerable().Select(m =>
                            new TarjetaModel
                            {
                                banco = m.Field<string>("Banco")
                            }).ToList();
                    }
                }
            }
        }
        internal List<TelefonoModel> GetTelefonosPersona(int id)
        {
            var SqlManager = new ConexionManager();
            using (var con = SqlManager.Connection)
            {
                con.Open();
                using (SqlCommand cmd = SqlManager.Get("GOLKII_APP.SP_GetTelefonosDePersonaID", con))
                {
                    cmd.Parameters.AddWithValue("@PersonaID", id);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        return dt.AsEnumerable().Select(m =>
                            new TelefonoModel
                            {
                                telefono = m.Field<int>("Telefono"),
                                operadora = m.Field<string>("Operadora")

                            }).ToList();
                    }
                }
            }
        }

    }
}