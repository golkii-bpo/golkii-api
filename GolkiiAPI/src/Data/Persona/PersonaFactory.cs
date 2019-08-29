using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using GolkiiAPI.src.Data.Bancaria;
using GolkiiAPI.src.Data.Telefonia;
using GolkiiAPI.src.Shared;

namespace GolkiiAPI.src.Data.Persona
{
    internal class PersonaFactory
    {
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

        internal List<BancoModel> GetBancosDePersona(int id)
        {
            var SqlManager = new ConexionManager();
            using (var con = SqlManager.Connection)
            {
                con.Open();
                using (SqlCommand cmd = SqlManager.Get("GOLKII_APP.SP_GetBancosDePersonaID", con))
                {
                    cmd.Parameters.AddWithValue("@PersonaID", id);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        return dt.AsEnumerable().Select(m =>
                            new BancoModel
                            {
                                ID = m.Field<int>("idBanco"),
                                Banco = m.Field<string>("Banco")
                            }
                        ).ToList();
                    }
                }
            }
        }
        internal List<TelefonoModel> GetTelefonosDePersona(int id)
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

                        return dt.AsEnumerable()
                            .Select(m =>
                                new TelefonoModel
                                {
                                    Numero = m.Field<int>("Telefono"),
                                    Operadora =  new OperadoraModel( m.Field<string>("Operadora"))
                                }
                            ).ToList();
                    }
                }
            }
        }

    }
}