﻿using BComm.PM.Models.Auth;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BComm.PM.Repositories.Queries
{
    public class ClientsQueryRepository : IClientsQueryRepository
    {
        private readonly string _portalURL;

        public ClientsQueryRepository(IConfiguration configuration)
        {
            _portalURL = configuration.GetSection("PortalURL").Value;
        }

        public Client GetClientById(string clientId)
        {
            return GetClients().FirstOrDefault(x => x.Id == clientId);
        }

        private List<Client> GetClients()
        {
            return new List<Client>()
            {
                new Client()
                {
                    Id = "bcomm_om",
                    Url = _portalURL + "order-management/",
                    AuthCallback = "#/auth-callback"
                },
                new Client()
                {
                    Id = "bcomm_pm",
                    Url = _portalURL + "product-management/",
                    AuthCallback = "#/auth-callback"
                },
                new Client()
                {
                    Id = "bcomm_cm",
                    Url = _portalURL + "content-management/",
                    AuthCallback = "#/auth-callback"
                },
                new Client()
                {
                    Id = "bcomm_portal",
                    Url = _portalURL + "",
                    AuthCallback = "#/auth-callback"
                }
            };
        }
    }
}
