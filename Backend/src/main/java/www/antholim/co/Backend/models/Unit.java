package www.antholim.co.Backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import www.antholim.co.Backend.enums.UnitType;

import java.time.LocalDateTime;

@Entity
@Accessors(chain = true)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(onlyExplicitlyIncluded = true)  // Only include fields marked with @ToString.Include
@Table(name = "units")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(name = "unit_number", nullable = false)
    @ToString.Include
    private String unitNumber;

    @Column(name = "rent_amount", nullable = false)
    @ToString.Include
    private double rentAmount;

    @Column(name = "deposit_amount", nullable = false)
    @ToString.Include
    private double depositAmount;

    @Column(name = "unit_type", nullable = false)
    @ToString.Include
    private UnitType unitType;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
