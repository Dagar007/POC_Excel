using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Value { get; set; }
    }
}