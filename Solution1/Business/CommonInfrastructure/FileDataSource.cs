using System.IO;
using Business.CommonInfrastructure.Interfaces;

namespace Business.CommonInfrastructure
{
    public class FileDataSource : IFileDataSource
    {
        public FileStream Stream(string path)
        {
            return System.IO.File.Create(path);
        }
    }
}