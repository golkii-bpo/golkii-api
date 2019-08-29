using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using GolkiiAPI.src.Data.Bancaria;
using GolkiiAPI.src.Data.Telefonia;
using GolkiiAPI.src.Shared;
namespace GolkiiAPI.src.Views
{
    public class ViewFactory
    {
        private DataTable Get_VIEW(string procNAME)
        {
            try
            {
                var SqlManager = new ConexionManager();
                using (var con = SqlManager.Connection)
                {
                    con.Open();
                    using (var cmd = SqlManager.Get(procNAME, con))
                    {
                        using (var da = new SqlDataAdapter(cmd))
                        {
                            DataTable dt = new DataTable();
                            da.Fill(dt);
                            if(dt.Rows.Count > 0)
                                return dt;
                            else {
                                Console.WriteLine("No se encontraron registros end to end");
                                return null;
                            }
                        }
                    }
                }
            }
            catch (System.Data.SqlClient.SqlException  e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        internal DataTable Get_EndToEnd_TIME(DateTime startDate, DateTime endDate) {

            try
            {
                var SqlManager = new ConexionManager();
                using (var con = SqlManager.Connection)
                {
                    con.Open();
                    using (var cmd = SqlManager.Get("REPORTS.GET_EndToEnd_TIME", con))
                    {
                        cmd.Parameters.AddWithValue("@FROM ",startDate.ToString("yyyy/MM/dd"));
                        cmd.Parameters.AddWithValue("@TO ", endDate.ToString("yyyy/MM/dd"));


                        Console.WriteLine("PARAM @FROM \t" + startDate.ToString("yyyy/MM/dd"));
                        Console.WriteLine("PARAM @TO   \t" + endDate.ToString("yyyy/MM/dd"));

                        using (var da = new SqlDataAdapter(cmd))
                        {
                            DataTable dt = new DataTable();
                            da.Fill(dt);
                            if (dt.Rows.Count > 0)
                                return dt;
                            else
                            {
                                Console.WriteLine("No se encontraron registros end to end");
                                return null;
                            }
                        }
                    }
                }
            }
            catch (System.Data.SqlClient.SqlException e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        internal DataTable Get_EndToEnd_CC() => Get_VIEW("REPORTS.GET_EndToEnd_CC");
        internal DataTable Get_DiableLeadsMenu() => Get_VIEW("REPORTS.GET_DiableLeadsMenu");

    }
}
