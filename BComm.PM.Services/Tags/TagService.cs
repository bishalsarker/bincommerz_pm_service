﻿using AutoMapper;
using BComm.PM.Dto.Common;
using BComm.PM.Dto.Payloads;
using BComm.PM.Dto.Tags;
using BComm.PM.Models.Tags;
using BComm.PM.Repositories.Common;
using BComm.PM.Repositories.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BComm.PM.Services.Tags
{
    public class TagService : ITagService
    {
        private readonly ICommandsRepository<Tag> _commandsRepository;
        private readonly ITagsQueryRepository _tagsQueryRepository;
        private readonly IMapper _mapper;

        public TagService(
            ICommandsRepository<Tag> commandsRepository,
            ITagsQueryRepository tagsQueryRepository,
            IMapper mapper)
        {
            _commandsRepository = commandsRepository;
            _tagsQueryRepository = tagsQueryRepository;
            _mapper = mapper;
        }

        public async Task<Response> AddNewTag(TagPayload newTagRequest, string shopId)
        {
            var tagModel = _mapper.Map<Tag>(newTagRequest);
            tagModel.HashId = Guid.NewGuid().ToString("N");
            tagModel.ShopId = shopId;
            await _commandsRepository.Add(tagModel);

            return new Response()
            {
                Data = _mapper.Map<TagsResponse>(tagModel),
                Message = "Tag Created Successfully",
                IsSuccess = true
            };
        }

        public async Task<Response> UpdateTag(TagPayload newTagRequest)
        {
            var existingTagModel = await _tagsQueryRepository.GetTag(newTagRequest.Id);

            if (existingTagModel != null)
            {
                existingTagModel.HashId = newTagRequest.Id;
                existingTagModel.Name = newTagRequest.Name;
                existingTagModel.Description = newTagRequest.Description;
                
                await _commandsRepository.Update(existingTagModel);

                return new Response()
                {
                    Data = _mapper.Map<TagsResponse>(existingTagModel),
                    Message = "Tag Updated Successfully",
                    IsSuccess = true
                };
            }
            else
            {
                return new Response()
                {
                    Message = "Tag Doesn't Exist",
                    IsSuccess = false
                };
            }
        }

        public async Task<Response> DeleteTag(string tagId)
        {
            var existingTagModel = await _tagsQueryRepository.GetTag(tagId);

            if (existingTagModel != null)
            {
                var tagReferences = await _tagsQueryRepository.GetTagReference(tagId);

                if (tagReferences.Any())
                {
                    return new Response()
                    {
                        Message = "Can't delete tag as it has product references",
                        IsSuccess = false
                    };
                }
                else
                {
                    await _commandsRepository.Delete(existingTagModel);

                    return new Response()
                    {
                        Message = "Tag Deleted Successfully",
                        IsSuccess = true
                    };
                }
            }
            else
            {
                return new Response()
                {
                    Message = "Tag Doesn't Exist",
                    IsSuccess = false
                };
            }
        }

        public async Task<Response> GetTags(string shopId)
        {
            var tagModels = await _tagsQueryRepository.GetTags(shopId);
            return new Response()
            {
                Data = _mapper.Map<IEnumerable<TagsResponse>>(tagModels),
                IsSuccess = true
            };
        }

        public async Task<Response> GetTag(string tagId)
        {
            var existingTagModel = await _tagsQueryRepository.GetTag(tagId);

            if (existingTagModel != null)
            {
                return new Response()
                {
                    Data = _mapper.Map<TagsResponse>(existingTagModel),
                    IsSuccess = true
                };
            }
            else
            {
                return new Response()
                {
                    Message = "Tag Doesn't Exist",
                    IsSuccess = false
                };
            }
        }
    }
}
