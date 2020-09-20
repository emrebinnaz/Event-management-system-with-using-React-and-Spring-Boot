package com.example.EMS.security.entity;

import com.example.EMS.common.entity.IdBaseEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen6", sequenceName = "AUTHORITY_SEQ")
@ToString
public class Authority extends IdBaseEntity implements GrantedAuthority {
    @ManyToMany(mappedBy = "authorities")
    private Set<Users> users;

    @Column(name = "AUTHORITY" )
    private String authority;

    public Authority(Integer id, Set<Users> users, String authority) {
        super(id);
        this.users = users;
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
