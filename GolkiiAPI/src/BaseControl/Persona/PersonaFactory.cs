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
                            salarioINSS = (float)m.Field<Decimal>("SalarioInss"),
                            statusCredex = m.Field<string>("StatusCredex"),
                            departamento = m.Field<string>("Departamento"),
                            municipio = m.Field<string>("Municipios"),
                            domicilio = m.Field<string>("Domicilio"),
                            origen = m.Field<string>("Origen"),
                            isWorking = m.Field<Boolean>("isWorking")
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
                            salarioINSS = (float)m.Field<Decimal>("SalarioInss"),
                            statusCredex = m.Field<string>("StatusCredex"),
                            departamento = m.Field<string>("Departamento"),
                            municipio = m.Field<string>("Municipios"),
                            domicilio = m.Field<string>("Domicilio"),
                            origen = m.Field<string>("Origen"),
                            isWorking = m.Field<Boolean>("isWorking")
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
                using (SqlCommand cmd = SqlManager.Get("GOLKII_APP.SP_GetTarjetas", con))
                {
                    cmd.Parameters.AddWithValue("@IDPersona", id);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        return dt.AsEnumerable().Select(m =>
                            new TarjetaModel
                            {
                                idTarjetaCliente = m.Field<int>("IdTarjetaCliente"),
                                banco = m.Field<string>("Banco")
                            }).ToList();
                    }
                }
            }
        }
        internal List<TelefonoModel> GetTelefonosPersona(int id, string campaign)
        {
            var SqlManager = new ConexionManager();
            using (var con = SqlManager.Connection)
            {
                con.Open();
                using (SqlCommand cmd = SqlManager.Get("GOLKII_APP.SP_GetTelefonos", con))
                {
                    cmd.Parameters.AddWithValue("@IDPersona", id);
                    cmd.Parameters.AddWithValue("@CampaignID", campaign);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        return dt.AsEnumerable().Select(m =>
                            new TelefonoModel
                            {
                                idTelefono = m.Field<int>("IdTelefono"),
                                telefono = m.Field<int>("Telefono"),
                                operadora = m.Field<string>("Operadora"),
                                calledCount = m.Field<int>("CalledCount"),
                                dateReprocessed = (m.Field<DateTime?>("DateReprocessed") == null)
                                                    ? (DateTime?)null
                                                    : Convert.ToDateTime(m.Field<DateTime?>("DateReprocessed")),
                                user = m.Field<string>("User"),
                                tipificacion = new TipificacionModel(
                                                        m.Field<string>("IdTipificacion"),
                                                        m.Field<string>("Tipificacion")),

                            }).ToList();
                    }
                }
            }
        }

    }
}