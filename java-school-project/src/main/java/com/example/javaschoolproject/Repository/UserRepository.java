package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select * from user s where s.user_username = ?1", nativeQuery = true)
    User findByUsername(@Param("username") String username);
}
