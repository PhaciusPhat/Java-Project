package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("from User s where s.user_username = ?1")
    User findByUsername(@Param("username") String username);

    @Query("from User s where s.user_email = ?1")
    User findByEmail(@Param("email") String email);
}
