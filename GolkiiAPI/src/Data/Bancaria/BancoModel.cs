using System;
namespace GolkiiAPI.src.Data.Bancaria
{
    public struct BancoModel
    {
        public int ID;
        public string Banco;
        public BancoModel(int id, string banco) { ID = id; Banco = banco; }
    }
}
