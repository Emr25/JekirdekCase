using Application.Models;
using Application.Services;
using AutoMapper;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;


public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repo;
    private readonly IMapper _mapper;

    public CustomerService(ICustomerRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CustomerReadDto>> GetAllAsync()
    {
        var customers = await _repo.GetAllAsync();
        return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
    }

    public async Task<IEnumerable<CustomerReadDto>> GetByNameAsync(string name)
    {
        var customers = await _repo.GetByNameAsync(name);
        return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
    }

    public async Task<IEnumerable<CustomerReadDto>> GetByRegionAsync(string region)
    {
        var customers = await _repo.GetByRegionAsync(region);
        return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
    }

    public async Task<CustomerReadDto?> GetByIdAsync(Guid id)
    {
        var customer = await _repo.GetByIdAsync(id);
        return customer == null ? null : _mapper.Map<CustomerReadDto>(customer);
    }

    public async Task<CustomerReadDto> CreateAsync(CustomerCreateDto dto)
    {
        var customer = _mapper.Map<Customer>(dto);
        customer.RegistrationDate = DateTime.UtcNow;

        await _repo.AddAsync(customer);
        await _repo.SaveChangesAsync();

        return _mapper.Map<CustomerReadDto>(customer);
    }

    public async Task<bool> UpdateAsync(Guid id, CustomerUpdateDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return false;

        _mapper.Map(dto, existing);
        _repo.Update(existing);
        await _repo.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return false;

        _repo.Delete(existing);
        await _repo.SaveChangesAsync();
        return true;
    }
}
