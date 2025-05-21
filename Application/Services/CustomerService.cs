using Application.Models;
using Application.Services;
using AutoMapper;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class CustomerService : ICustomerService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public CustomerService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CustomerReadDto>> GetAllAsync()
    {
        var customers = await _context.Customers.ToListAsync();
        return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
    }

    public async Task<IEnumerable<CustomerReadDto>> GetByNameAsync(string name)
    {
        var customers = await _context.Customers
            .Where(c => (c.FirstName + " " + c.LastName).ToLower().Contains(name.ToLower()))
            .ToListAsync();

        return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
    }

    public async Task<IEnumerable<CustomerReadDto>> GetByRegionAsync(string region)
    {
        var customers = await _context.Customers
            .Where(c => c.Region.ToLower() == region.ToLower())
            .ToListAsync();

        return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
    }

    public async Task<CustomerReadDto> GetByIdAsync(Guid id)
    {
        var customer = await _context.Customers.FindAsync(id);
        return customer == null ? null : _mapper.Map<CustomerReadDto>(customer);
    }

    public async Task<CustomerReadDto> CreateAsync(CustomerCreateDto dto)
    {
        var customer = _mapper.Map<Customer>(dto);
        customer.RegistrationDate = DateTime.UtcNow;

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return _mapper.Map<CustomerReadDto>(customer);
    }

    public async Task<bool> UpdateAsync(Guid id, CustomerUpdateDto dto)
    {
        var existing = await _context.Customers.FindAsync(id);
        if (existing == null) return false;

        _mapper.Map(dto, existing);
        _context.Customers.Update(existing);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null) return false;

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
        return true;
    }
}
