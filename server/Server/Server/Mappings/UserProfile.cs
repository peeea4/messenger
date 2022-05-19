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
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.Chats, opt => opt.MapFrom(src => src.Chats))
                .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages))
                .ForMember(dest => dest.ProfileImageFilePath, opt => opt.MapFrom(src => $"https://localhost:44328/Images/{Path.GetFileName(src.ProfileImageFilePath)}"));
        }
    }
}
