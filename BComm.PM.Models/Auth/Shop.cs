﻿using BComm.PM.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BComm.PM.Models.Auth
{
    [Table("shops", Schema = "bcomm_user")]
    public class Shop : WithHashId
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Logo { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string IPAddress { get; set; }

        [Required]
        public string OrderCode { get; set; }

        [Required]
        public double ReorderLevel { get; set; }

        [Required]
        public string UserHashId { get; set; }
    }
}
