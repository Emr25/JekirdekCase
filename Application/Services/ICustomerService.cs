using Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerReadDto>> GetAllAsync();
        Task<IEnumerable<CustomerReadDto>> GetByNameAsync(string name);
        Task<IEnumerable<CustomerReadDto>> GetByRegionAsync(string region);
        Task<CustomerReadDto?> GetByIdAsync(Guid id);
        Task<CustomerReadDto> CreateAsync(CustomerCreateDto dto);
        Task<bool> UpdateAsync(Guid id, CustomerUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
