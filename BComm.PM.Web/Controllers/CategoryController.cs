﻿using BComm.PM.Dto;
using BComm.PM.Dto.Categories;
using BComm.PM.Services.Categories;
using BComm.PM.Services.Common;
using BComm.PM.Services.MethodAttributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BComm.PM.Web.Controllers
{
    [Route("categories")]
    [ApiController]
    [ServiceFilter(typeof(SubscriptionCheckAttribute))]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly AuthService _authService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CategoryController(ICategoryService categoryService, IHttpContextAccessor httpContextAccessor)
        {
            _categoryService = categoryService;
            _authService = new AuthService(httpContextAccessor.HttpContext);
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("addnew")]
        [Authorize]
        public async Task<IActionResult> AddNewCategory(CategoryPayload newCategoryRequest)
        {
            var claims = _httpContextAccessor.HttpContext.User.Claims;
            var shopId = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value.ToString();
            return Ok(await _categoryService.AddNewCategory(newCategoryRequest, shopId));
        }

        [HttpGet("get/{categoryId}")]
        [Authorize]
        public async Task<IActionResult> GetCategory(string categoryId)
        {
            return Ok(await _categoryService.GetCategory(categoryId));
        }

        [HttpGet("get/subcategories/{categoryId}")]
        [Authorize]
        public async Task<IActionResult> GetSubCategory(string categoryId)
        {
            return Ok(await _categoryService.GetSubCategories(categoryId));
        }

        [HttpGet("get/all")]
        [Authorize]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await _categoryService.GetCategories(_authService.GetShopId()));
        }

        [HttpPut("update")]
        [Authorize]
        public async Task<IActionResult> UpdateCategory(CategoryPayload newCategoryRequest)
        {
            return Ok(await _categoryService.UpdateCategory(newCategoryRequest));
        }

        [HttpPut("updateorder")]
        [Authorize]
        public async Task<IActionResult> UpdateCategoryOrder(List<CategoryOrderPayload> categoryOrderUpdateRequest)
        {
            return Ok(await _categoryService.UpdateCategoryOrder(categoryOrderUpdateRequest));
        }

        [HttpDelete("delete/{categoryId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCategory(string categoryId)
        {
            return Ok(await _categoryService.DeleteCategory(categoryId));
        }
    }
}
