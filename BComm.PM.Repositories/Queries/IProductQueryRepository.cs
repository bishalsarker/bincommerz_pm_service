﻿using BComm.PM.Models.Products;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BComm.PM.Repositories.Queries
{
    public interface IProductQueryRepository
    {
        Task<IEnumerable<Product>> GetAllProducts(string shopId);
        Task<IEnumerable<Product>> GetOutOfStockProducts(string shopId, double reodrerLevel);
        Task<Product> GetProductById(string productId, bool resolveImage);
        Task<Product> GetProductByTag(string tagId);
        Task<int> GetProductCount(string shopId);
        Task<IEnumerable<Product>> GetProducts(
            string shopId, IEnumerable<string> tagList, IEnumerable<string> ignoredProducts, 
            string sortCol, string sortOrder, int offset, int rows, string searchQuery);
        Task<IEnumerable<Product>> GetProductsById(List<string> productIds, string shopId);
        Task<IEnumerable<Product>> GetProductsByKeywords(string keyword, string shopId);
        Task<IEnumerable<Product>> GetProductsBySlug(string slug, bool resolveImage);
        Task UpdateProductStock(string productId, string shopId, double newStock);
    }
}