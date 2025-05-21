using Application.Models;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JekirdekCase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _service;
        public CustomerController(ICustomerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());




        [HttpGet("by-name")]
        public async Task<IActionResult> GetByName([FromQuery] string name) =>
        Ok(await _service.GetByNameAsync(name));


        [HttpGet("by-region")]
        public async Task<IActionResult> GetByRegion([FromQuery] string region) =>
        Ok(await _service.GetByRegionAsync(region));



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var customer = await _service.GetByIdAsync(id);
            return customer == null ? NotFound() : Ok(customer);
        }


        [HttpPost]
        public async Task<IActionResult> Create(CustomerCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, CustomerUpdateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
