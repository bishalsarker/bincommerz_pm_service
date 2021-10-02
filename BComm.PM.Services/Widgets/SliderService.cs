﻿using AutoMapper;
using BComm.PM.Dto.Common;
using BComm.PM.Dto.Widgets;
using BComm.PM.Models.Images;
using BComm.PM.Models.Widgets;
using BComm.PM.Repositories.Common;
using BComm.PM.Repositories.Queries;
using BComm.PM.Services.Common;
using BComm.PM.Services.Helpers;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BComm.PM.Services.Widgets
{
    public class SliderService
    {
        private readonly ICommandsRepository<Image> _imagesCommandsRepository;
        private readonly IImageUploadService _imageUploadService;
        private readonly IImagesQueryRepository _imagesQueryRepository;
        private readonly ICommandsRepository<Slider> _sliderCommandsRepository;
        private readonly ICommandsRepository<SliderImage> _sliderImageCommandsRepository;
        private readonly ISliderQueryRepository _sliderQueryRepository;
        private readonly IHostingEnvironment _env;
        private readonly IMapper _mapper;

        public SliderService(
            ICommandsRepository<Image> imagesCommandsRepository,
            IImageUploadService imageUploadService,
            IImagesQueryRepository imagesQueryRepository,
            ICommandsRepository<Slider> sliderCommandsRepository,
            ICommandsRepository<SliderImage> sliderImageCommandsRepository,
            ISliderQueryRepository sliderQueryRepository,
            IMapper mapper,
            IHostingEnvironment env)
        {
            _imagesCommandsRepository = imagesCommandsRepository;
            _imageUploadService = imageUploadService;
            _imagesQueryRepository = imagesQueryRepository;
            _sliderCommandsRepository = sliderCommandsRepository;
            _sliderImageCommandsRepository = sliderImageCommandsRepository;
            _sliderQueryRepository = sliderQueryRepository;
            _mapper = mapper;
            _env = env;
        }

        public async Task<Response> AddSlider(SliderPayload newSliderRequest, string shopId)
        {
            try
            {
                var sliderModel = _mapper.Map<Slider>(newSliderRequest);
                sliderModel.HashId = Guid.NewGuid().ToString("N");
                sliderModel.ShopId = shopId;
                await _sliderCommandsRepository.Add(sliderModel);

                return new Response()
                {
                    Data = new { Id = sliderModel.HashId },
                    Message = "Slider Created Successfully",
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new Response()
                {
                    Message = "Error: " + ex.Message,
                    IsSuccess = false
                };
            }
        }

        public async Task<Response> AddSliderImage(SliderImagePayload newSliderImageRequest)
        {
            try
            {
                var sliderImageModel = _mapper.Map<SliderImage>(newSliderImageRequest);
                sliderImageModel.HashId = Guid.NewGuid().ToString("N");

                var sliderImage = new ImageInfo(newSliderImageRequest.Image, sliderImageModel.HashId, _env);
                var imageModel = await AddImages(sliderImage);

                sliderImageModel.ImageId = imageModel.HashId;
                await _sliderImageCommandsRepository.Add(sliderImageModel);

                return new Response()
                {
                    Data = new { Id = sliderImageModel.HashId },
                    Message = "Slider Image Added Successfully",
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new Response()
                {
                    Message = "Error: " + ex.Message,
                    IsSuccess = false
                };
            }
        }

        public async Task<Response> UpdateSliderImage(SliderImageUpdatePayload newSliderImageRequest)
        {
            try
            {
                var existingSliderImageModel = await _sliderQueryRepository.GetSliderImage(newSliderImageRequest.Id);

                if (existingSliderImageModel != null)
                {
                    var sliderImageModel = _mapper.Map<SliderImage>(newSliderImageRequest.SliderImage);
                    existingSliderImageModel.Title = sliderImageModel.Title;
                    existingSliderImageModel.Description = sliderImageModel.Description;
                    existingSliderImageModel.ButtonText = sliderImageModel.ButtonText;
                    existingSliderImageModel.ButtonUrl = sliderImageModel.ButtonUrl;

                    var existingImageModel = await _imagesQueryRepository.GetImage(existingSliderImageModel.ImageId);
                    await DeleteImage(existingImageModel);

                    var sliderImage = new ImageInfo(newSliderImageRequest.SliderImage.Image, Guid.NewGuid().ToString("N"), _env);
                    var imageModel = await AddImages(sliderImage);
                    existingSliderImageModel.ImageId = imageModel.HashId;

                    await _sliderImageCommandsRepository.Update(existingSliderImageModel);

                    return new Response()
                    {
                        Data = new { Id = sliderImageModel.HashId },
                        Message = "Slider Image Updated Successfully",
                        IsSuccess = true
                    };
                }
                else
                {
                    return new Response()
                    {
                        Message = "Error: No slider image exists!",
                        IsSuccess = false
                    };
                }

            }
            catch (Exception ex)
            {
                return new Response()
                {
                    Message = "Error: " + ex.Message,
                    IsSuccess = false
                };
            }
        }

        private async Task<Image> AddImages(ImageInfo sliderImage)
        {
            var uploadedImageInfo = await _imageUploadService.UploadImage(sliderImage);
            await _imagesCommandsRepository.Add(uploadedImageInfo);

            return uploadedImageInfo;
        }

        private async Task<bool> DeleteImage(Image image)
        {
            try
            {
                await _imageUploadService.DeleteImages(image);
                await _imagesQueryRepository.DeleteImage(image.HashId);

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
