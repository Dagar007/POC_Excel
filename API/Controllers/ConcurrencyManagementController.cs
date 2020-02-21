using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataAccess;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcurrencyManagementController : ControllerBase
    {
        private readonly DataContext _context;
        public ConcurrencyManagementController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<BankAccount>> GetBalance()
        {
            BankAccount ba = null;
            ba = await _context.BankAccounts.FindAsync(1);
            return Ok(ba);
        }

        [HttpPost]
        public IActionResult UpdateBalance([FromBody] BankAccount ba)
        {
            _context.Entry(ba).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                /*foreach (var entry in ex.Entries)
                {
                    if (entry.Entity is BankAccount)
                    {
                        var proposedValues = entry.CurrentValues;
                        var databaseValues = entry.GetDatabaseValues();

                        foreach (var property in proposedValues.Properties)
                        {
                            var proposedValue = proposedValues[property];
                            var databaseValue = databaseValues[property];
                        }
                    }                   
                }*/
                return BadRequest("The value you are trying to update may have been modified or deleted since entities were loaded. " +
                    "Refresh the page to get latest data.");
            }

            return Ok(ba);
        }
    }
}