using System;
using System.Data;
using System.Data.SqlClient;

namespace GolkiiAPI.src.Shared
{
    public class ConexionManager
    {
        private readonly string _Server = Environment.GetEnvironmentVariable("SQL_SERVERIP") is null ? "localhost" : Environment.GetEnvironmentVariable("SQL_SERVERIP");
        private readonly string _Port = Environment.GetEnvironmentVariable("SQL_SERVERPORT") is null ? "1433" : Environment.GetEnvironmentVariable("SQL_SERVERPORT");
        private readonly string _Database = Environment.GetEnvironmentVariable("SQL_DATABASE");
        private readonly string _User = Environment.GetEnvironmentVariable("SQL_USER");
        private readonly string _Password = Environment.GetEnvironmentVariable("SQL_PASSWORD");
        private const int _Timeout = 15;

        private string GetConnexionString()
        {
            string ConString = $"Server={_Server},{_Port}; Initial Catalog={_Database}; User Id={_User}; Password={_Password};";
            Console.WriteLine("NEW CONECTION");
            return ConString;
        }

        public SqlConnection Connection => new SqlConnection(GetConnexionString());

        public SqlCommand Get(String ProcedureName, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand
            {
                CommandText = ProcedureName,
                CommandType = CommandType.StoredProcedure,
                Connection = con,
                CommandTimeout = _Timeout
            };

            return cmd;
        }
    }
}