package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.Cart;
import com.example.javaschoolproject.Models.CartUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, CartUser> {

    @Query("from Cart c where c.cartUser.user_id = ?1")
    List<Cart> getCartByUser(@Param("user_id") long user_id);

    @Query("from Cart c where c.cartUser.user_id = ?1 and c.cartUser.p_id = ?2")
    Cart getCartItem(@Param("user_id") long user_id, @Param("p_id") long p_id);

    @Query("from Cart c where c.cartUser.user_id = :user_id and c.cart_product.p_name LIKE CONCAT('%',:p_name,'%')")
    List<Cart> getCartItemListByName(@Param("user_id") long user_id, @Param("p_name") String p_name);
}
