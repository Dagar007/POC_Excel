using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
}