using Business.CommonInfrastructure.Interfaces;

using Microsoft.Net.Http.Headers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace Business.CommonInfrastructure
{
    public class Upload : IUpload
    {
        private IFileDataSource _fileDataSource;

        public Upload(IFileDataSource fd)
        {
            _fileDataSource = fd;
        }

        public IList<string> UploadFiles(IList<IFormFile> files, string root)
        {
            if (files == null || root == null)
            {
                throw new ArgumentNullException();
            }

            Directory.CreateDirectory(root);
            IList<string> uploaded = new List<string>();
            foreach (var file in files)
            {
                string filename = ContentDispositionHeaderValue
                             .Parse(file.ContentDisposition)
                             .FileName.Trim('"');
                string path = Path.Combine(root, filename);

                using (FileStream fs = _fileDataSource.Stream(path))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                uploaded.Add(path);
            }
            return uploaded;
        }
    }
}