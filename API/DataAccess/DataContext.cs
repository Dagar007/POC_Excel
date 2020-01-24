using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }
        public DbSet<Food> Foods { get; set; }
    }
}