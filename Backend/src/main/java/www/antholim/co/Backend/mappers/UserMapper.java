package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userDtoToUser(UserDto userDto);
    UserDto useToUserDto(User user);
}
