package www.antholim.co.Backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import www.antholim.co.Backend.enums.PropertyType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Accessors(chain = true)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(onlyExplicitlyIncluded = true)  // Only include fields marked with @ToString.Include
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "purchase_price", nullable = false)
    @ToString.Include
    private double purchasePrice;

    @Column(name = "property_type", nullable = false)
    @ToString.Include
    private PropertyType propertyType;

    @Column(name = "address", nullable = false)
    @ToString.Include
    private String address;

    @Column(name = "property_name", nullable = false)
    @ToString.Include
    private String propertyName;

    @OneToMany(mappedBy = "property", fetch = FetchType.LAZY)
    private List<Unit> units = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
