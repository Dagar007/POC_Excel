using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class BankAccount
    {
        public int Id { get; set; }
        public decimal Balance { get; set; }
        public byte[] Timestamp { get; set; }
    }
}
