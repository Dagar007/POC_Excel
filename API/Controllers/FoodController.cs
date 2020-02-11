using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataAccess;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly DataContext _context;
         private readonly ILogger<FoodController> _logger;
        public FoodController(DataContext context, ILogger<FoodController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet]
        public async Task<ActionResult<PagedList<Food>>> List([FromQuery] UserParams p)
        {
            _logger.LogInformation("FoodController - Info - GET List Method was Hit!");
            var query = _context.Foods.OrderBy(q => q.Name.ToLower()).AsQueryable();
            if (!string.IsNullOrEmpty(p.Name))
            {
                query = query.Where(x => x.Name.ToLower().StartsWith(p.Name.ToLower()));
            }
            if (p.Category > 0)
            {
                query = query.Where(x => x.Category == p.Category);
            }
            if (!string.IsNullOrEmpty(p.OrderBy))
            {
                switch (p.OrderBy.ToLower())
                {
                    case "ingrident1":
                        query = query.OrderBy(q => q.Ingrident1.ToLower());
                        break;
                    default:
                        query = query.OrderBy(q => q.Name.ToLower());
                        break;

                }
            }

            var food = await PagedList<Food>.CreateAsync(query, p.PageNumber, p.PageSize);
            Response.AddPagination(food.CurrentPage, food.PageSize, food.TotalCount, food.TotalPages);
            //throw new Exception("Computer says no!");

            return Ok(food);
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Food>> Get(Guid id)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
                return BadRequest("No Food item found");
            return Ok(food);
        }
        [HttpPost]
        public async Task<ActionResult> Create(Food food)
        {
            _context.Foods.Add(food);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = food.Id }, food);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Guid id, Food updatedFood)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
                return BadRequest("Food not found");
            food.Name = updatedFood.Name ?? food.Name;
            food.Ingrident1 = updatedFood.Ingrident1 ?? food.Ingrident1;
            food.Ingrident2 = updatedFood.Ingrident2 ?? food.Ingrident2;
            food.Ingrident3 = updatedFood.Ingrident3 ?? food.Ingrident3;
            food.Ingrident4 = updatedFood.Ingrident4 ?? food.Ingrident4;
            food.Ingrident5 = updatedFood.Ingrident5 ?? food.Ingrident5;
            food.Ingrident6 = updatedFood.Ingrident6 ?? food.Ingrident6;


            var success = await _context.SaveChangesAsync() >= 0;
            if (success) return NoContent();
            throw new Exception("Error editing record");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
                return BadRequest("Food not found");
            _context.Foods.Remove(food);
            if (await _context.SaveChangesAsync() > 0)
            {
                return NoContent();
            }
            throw new Exception("Error deleting food");
        }


        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> Categories()
        {
            var catgories = await _context.Catgories.ToListAsync();
            return Ok(catgories);
        }
        [HttpGet("filter/{field}")]
        public async Task<ActionResult<IEnumerable<string>>> FilterDropdown(string field)
        {
            if(field == "name")
            {
              var fieldToReturn = await _context.Foods.Select( f =>
                  new FilterReturnDto {
                      Id = f.Id,
                      Item = f.Name
                  }
              ).ToListAsync();
              return Ok(fieldToReturn);
            }
            else 
            {
                return NotFound();
            }
           
        }
    }
}