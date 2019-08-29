using System;
using System.Collections.Generic;

namespace GolkiiAPI.src.Views
{
    public class TableViewModel
    {

        public TableViewModel(System.Data.DataTable data) { data = Data; }

        public System.Data.DataTable Data;
        public List<string> GetRowsHeaders()
        {
            List<string> Rs = new List<string>();
            for (int i = 1; i< Data.Columns.Count; i++)
                Rs.Add(Data.Rows[0][i].ToString());
            return Rs;
        }
        public List<string> GetColsHeaders()
        {
            List<string> Rs = new List<string>();
            for (int i = 1; i < Data.Rows.Count; i++)
                Rs.Add(Data.Rows[i][0].ToString());
            return Rs;
        }
        public Object[][] GetValues()
        {
            object[][] res = new object[Data.Rows.Count - 1][];
            for(int i = 1; i< Data.Rows.Count; i++) { 
                for(int j = 1; j<Data.Columns.Count; j++) {
                    res[i - 1][j - 1] = Data.Rows[i][j];
                }
            }
            return res;
        }
        public Object GetX(string rowHeader,string colHeader) {

            var x = GetRowsHeaders().IndexOf(rowHeader);
            var y = GetColsHeaders().IndexOf(colHeader);

            if(x >= 0 && y>= 0)
            {
                return Data.Rows[x][y];
            }
            return null;
        }
    }
}
