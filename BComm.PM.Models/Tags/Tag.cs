﻿using BComm.PM.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BComm.PM.Models.Tags
{
    [Table("tags", Schema = "bcomm_pm")]
    public class Tag: WithHashId
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string ShopId { get; set; }
    }
}
