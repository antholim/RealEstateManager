package www.antholim.co.Backend.services.implementations;

import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.PropertyService;

import java.util.List;

@Service
public class PropertyServiceImpl implements PropertyService {
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(UserRepository userRepository, PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }
    @Override
    public Property getProperty(Long id) {
        return null;
    }

    @Override
    public List<PropertyDto> getProperties(Long userId) {
        System.out.println(propertyRepository.findByUserId(userId));
        return PropertyDto.toDto(propertyRepository.findByUserId(userId));
    }

    @Override
    public PropertyDto createProperty(PropertyDto propertyDto, Long userId) {
        User userReference = userRepository.getReferenceById(userId);
        Property newProperty = new Property();
        newProperty.setPropertyName(propertyDto.getPropertyName())
                .setPropertyType(propertyDto.getPropertyType())
                .setPurchasePrice(propertyDto.getPurchasePrice())
                .setAddress(propertyDto.getAddress())
                .setUser(userReference);

        Property savedProperty = propertyRepository.save(newProperty);  // Save the entity, not the DTO
        return PropertyDto.toDto(savedProperty);
    }
}
