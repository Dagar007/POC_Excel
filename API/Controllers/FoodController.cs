using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataAccess;
using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly DataContext _context;
        public FoodController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<PagedList<Food>>> List([FromQuery] UserParams p)
        {
            var query = _context.Foods.AsQueryable();
            if(!string.IsNullOrEmpty(p.Name))
            {
                query = query.Where(x => x.Name.ToLower().StartsWith(p.Name.ToLower()));
            }
            if(p.Category > 0)
            {
                query = query.Where(x => x.Category == p.Category);
            }
            
            var food = await PagedList<Food>.CreateAsync(query, p.PageNumber, p.PageSize);
            Response.AddPagination(food.CurrentPage, food.PageSize, food.TotalCount, food.TotalPages);

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
    }
}