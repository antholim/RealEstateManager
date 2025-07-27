package www.antholim.co.Backend.dto.summary;

import lombok.*;
import www.antholim.co.Backend.dto.model.UnitDto;
import www.antholim.co.Backend.enums.PropertyType;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertySummaryDto {

    private Long id;
    private String propertyName;
    private String address;
    private PropertyType propertyType;
    private int totalUnits;
    private int occupiedUnits;
    private BigDecimal monthlyRevenue;
    private BigDecimal purchasePrice;
    private List<TenantSummaryDto> tenantsSummaryDto;
    private List<UnitDto> unitsDto;
}