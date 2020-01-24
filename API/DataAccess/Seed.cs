using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DataAccess
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(!context.Foods.Any())
            {
                var foods = new List<Food>
                {
                    new Food {
                        Name = "Roti",
                        Ingrident1 = "Atta",
                        Ingrident2 = "Namak",
                        Ingrident3 = "",
                        Ingrident4 = "",
                        Ingrident5 = "",
                        Ingrident6 = "",

                    },
                     new Food {
                        Name = "Palak Panner",
                        Ingrident1 = "Pakal",
                        Ingrident2 = "Panner",
                        Ingrident3 = "Panni",
                        Ingrident4 = "",
                        Ingrident5 = "",
                        Ingrident6 = "",

                    },
                };

                context.Foods.AddRange(foods);
                context.SaveChanges();
            }
        }
    }
}