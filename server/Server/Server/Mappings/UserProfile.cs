using System.IO;
using AutoMapper;
using Server.Models;

namespace Server.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResponseModel>()
                .ForMember(dest => dest.ProfileImageFilePath, opt => opt.MapFrom(src => src.ProfileImageFilePath == null ? null : $"https://localhost:44328/Images/{Path.GetFileName(src.ProfileImageFilePath)}"));
        }
    }
}
