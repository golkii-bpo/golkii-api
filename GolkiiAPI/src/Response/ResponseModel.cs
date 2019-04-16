using System;
namespace GolkiiAPI.src.Response
{
    public class ResponseModel
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public object Value { get; set; }
    }
}
