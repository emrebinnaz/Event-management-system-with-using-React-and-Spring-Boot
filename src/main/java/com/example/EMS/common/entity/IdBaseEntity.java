package com.example.EMS.common.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "id")
@MappedSuperclass
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public abstract class IdBaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "idgen")
    @Column(name = "ID")
    private Integer id;

    @Version
    @Column(name = "VERSION")
    private Long version;

    @CreatedDate
    @Column(name = "CREATED", updatable = false)
    private LocalDateTime created;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED", insertable = false)
    private LocalDateTime lastModified;

    public IdBaseEntity(Integer id) {
        this.id = id;
    }
}
