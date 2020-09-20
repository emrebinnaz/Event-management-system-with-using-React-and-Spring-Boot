package com.example.EMS.security.Repository;

import com.example.EMS.security.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Integer> {
    Users findByUsername(String username);

    /*
    @Query(
            value = "SELECT * FROM USERS u WHERE u.tc_kimlik_no = :tcKimlikNo",
            nativeQuery = true)

     */
    @Query("select u from Users  u where u.tcKimlikNo = :tc_kimlik_no")
    Users findByTcKimlikNo(@Param("tc_kimlik_no")String tcKimlikNo);

    Users findByPassword(String password);

    Optional<Users> findByPhone(String phone);

    Optional<Users> findByEmail(String email);
}
