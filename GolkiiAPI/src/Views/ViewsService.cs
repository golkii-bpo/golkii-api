using System;
using System.Collections.Generic;
using System.Data;
using GolkiiAPI.src.Response;
using Microsoft.AspNetCore.Http;

namespace GolkiiAPI.src.Views
{
    public class ViewsService
    {
        readonly ViewFactory factory = new ViewFactory();
        private ResponseModel GenData(DataTable D) {
            ResponseModel R = new ResponseModel()
            {
                Message = "REPORTE REALIZADO",
                StatusCode = StatusCodes.Status200OK,
                Value = D
            };

            return R;
        }

        private DataTable Totalizer (DataTable dt) {

            if (dt is null)
                return new DataTable();

            object[] TotalRows = new object[dt.Columns.Count];
            int[] TotalCols = new int[dt.Rows.Count];

            DataColumn PRO = new DataColumn("PROCESADO");
            DataColumn T = new DataColumn("TOTAL");
            dt.Columns.Add(PRO);
            dt.Columns.Add(T);

            var processedStatuses = new List<string>() { "ACRE", "CATC", "CPE", "ILO", "NAPOL", "DNC", "NE", "NIEL" }; 

            TotalRows[0] = "";
            TotalRows[1] = "TOTAL";

            var grandTotal = 0;
            var processTotal = 0;
            for (int j = 2; j < dt.Columns.Count - 2; j++)
            {
                int totalRow = 0;
                foreach (DataRow row in dt.Rows)
                {
                    int.TryParse(row[j].ToString(), out int value);
                    totalRow += value;
                    int.TryParse(row["TOTAL"].ToString(), out int total);
                    row["TOTAL"] = total + value;

                    if (processedStatuses.Contains(dt.Columns[j].ColumnName.ToUpper()))
                    {
                        int.TryParse(row["PROCESADO"].ToString(), out int TPROC);
                        row["PROCESADO"] = TPROC + value;
                        processTotal += value;
                    }
                }
                TotalRows[j] = totalRow;
                grandTotal += totalRow;
            }
            dt.Rows.Add(TotalRows);

            dt.Rows[dt.Rows.Count - 1][dt.Columns.Count - 2] = processTotal;
            dt.Rows[dt.Rows.Count - 1][dt.Columns.Count - 1] = grandTotal;
            return dt;
        }

        private string toTime(int s) {
            TimeSpan t = TimeSpan.FromSeconds(s);
            var dayPart = t.ToString("dd") + "d";
            var hourPart = t.ToString("hh") + "h";
            var minPart = t.ToString("mm") + "m";
            var secondPart = t.ToString("ss") + "s";
            var result = dayPart != "00d" ? dayPart : "";
            result += hourPart != "00h" ? hourPart : "";
            result += minPart != "00h" ? minPart : "";
            result += secondPart != "00h" ? secondPart : "";
            return result;

        }

        private DataTable changeDTType(DataTable dt) {

            if (dt.Rows.Count == 0)
                return new DataTable();

            DataTable dtCloned = new DataTable();
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                dtCloned.Columns.Add(dt.Columns[i].Caption);
                if(i<2)
                {
                    dtCloned.Columns[i].DataType = typeof(object);
                }
                else
                    dtCloned.Columns[i].DataType = typeof(string);
            }

            foreach (DataRow row in dt.Rows)
            {
                var dataRow = new List<object>();
                for(int j = 0; j < dt.Columns.Count; j++) {
                    if (j < 2)
                    {
                        dataRow.Add(row.ItemArray[j]);
                    }
                    else
                    {
                        int.TryParse(row.ItemArray[j].ToString(), out int x);
                        if (x > 0)
                        {
                            var str = toTime(x);
                            dataRow.Add(str);
                        }
                        else {
                            dataRow.Add("");
                        }
                    }
                }
                dtCloned.Rows.Add(dataRow.ToArray());
            }
            return dtCloned;
        }

        public ResponseModel Get_EndToEndView_CC() => GenData(Totalizer(factory.Get_EndToEnd_CC()));

        public ResponseModel Get_EndToEndView_TIME(DateTime startDate, DateTime endDate) => GenData(changeDTType(Totalizer(factory.Get_EndToEnd_TIME(startDate,endDate))));

        public ResponseModel Get_DiableLeadsMenuView() => GenData(factory.Get_DiableLeadsMenu());
    }
}
