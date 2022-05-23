using System.Linq;
using AutoMapper;
using Server.Models;

namespace Server.Mappings
{
    public class ChatProfile : Profile
    {
        public ChatProfile()
        {
            var mapper = new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<UserProfile>();
            }));

            CreateMap<Chat, ChatResponseModel>()
                .ForMember(dest => dest.Users,
                    opt => opt.MapFrom(src => src.Users.Select(mapper.Map<User, UserResponseModel>)));
        }
    }
}
