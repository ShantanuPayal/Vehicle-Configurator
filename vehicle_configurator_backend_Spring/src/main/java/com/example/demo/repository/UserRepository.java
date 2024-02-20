package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {
 
	 @Query("SELECT count(u)>0 FROM User u WHERE u.username = :username AND u.password = :password")
	 boolean validateUser(@Param("username") String username, @Param("password") String password);
	 
	 @Query(value="SELECT  userid FROM User Where username=:username",nativeQuery=true)
	 int getUserId(@Param("username")String username);
	 
	
}