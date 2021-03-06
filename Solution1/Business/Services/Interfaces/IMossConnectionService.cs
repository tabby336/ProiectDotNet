﻿using System.Net;
using System.Net.Sockets;

namespace Business.Services.Interfaces
{
    public interface IMossConnectionService
    {
        IPEndPoint GetEndPoint(string server, int port);

        string GetResponse(NetworkStream stream);

        string GetUrl(string response);
    }
}