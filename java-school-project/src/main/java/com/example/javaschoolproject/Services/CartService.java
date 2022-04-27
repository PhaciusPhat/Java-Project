package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.*;
import com.example.javaschoolproject.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    CartRepository cartRepository;

    private User g_user;
    private Product g_product;
//    private String requestTokenHeaderl;

    private void setUserAndProduct(String requestTokenHeader, long p_id) throws NotFoundException {
//      get user
        g_user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
//      get product
        g_product = productService.getProductById(p_id);
    }

    public Cart findCartItem(long user_id, long p_id) {
        return cartRepository.getCartItem(user_id, p_id);
    }

    public List<Cart> getAllCartItems(String requestTokenHeader) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        return cartRepository.getCartByUser(user.getUser_id());
    }

    public void addCartItem(String requestTokenHeader, CartRequest cartRequest) throws NotFoundException {
        setUserAndProduct(requestTokenHeader, cartRequest.getP_id());
//      if exits increase 1 else create
        Cart cart = findCartItem(g_user.getUser_id(), cartRequest.getP_id());
        if (cart == null) {
            cart = new Cart();
            CartUser cartUser = new CartUser(g_user.getUser_id(), cartRequest.getP_id());
            cart.setCart_product(g_product);
            cart.setCartUser(cartUser);
            cart.setCart_number(cartRequest.getNumber());
            cart.setCart_user(g_user);
        } else {
            int number = cart.getCart_number() + cartRequest.getNumber();
            System.out.println(number);
            cart.setCart_number(number);
        }
        cartRepository.save(cart);
    }

    public void deleteCartItem(String requestTokenHeader, Long p_id) throws NotFoundException {
        setUserAndProduct(requestTokenHeader, p_id);
        Cart cart = findCartItem(g_user.getUser_id(), p_id);
        if (cart == null) {
            throw new NotFoundException("not found this product in cart");
        } else {
            cartRepository.delete(cart);
        }
    }


    public void deleteCartItemList(String requestTokenHeader, List<Long> p_id) throws NotFoundException {
        for (Long id : p_id) {
            deleteCartItem(requestTokenHeader, id);
        }
    }

    public List<Cart> getCartItemListByName(String requestTokenHeader, String p_name) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        return cartRepository.getCartItemListByName(user.getUser_id(), p_name);
    }


}
