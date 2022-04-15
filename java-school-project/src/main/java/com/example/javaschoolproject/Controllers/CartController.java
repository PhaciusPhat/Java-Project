package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Services.CartService;
import com.example.javaschoolproject.Services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(path = "api/cart")
@RequiredArgsConstructor
public class CartController {
    @Autowired
    CartService cartService;

    @SneakyThrows
    @GetMapping("/")
    public ResponseEntity<?> getCartByUser(HttpServletRequest request){
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(cartService.getAllCartItems(requestTokenHeader));
    }

    @SneakyThrows
    @PostMapping("/{p_id}")
    public ResponseEntity<?> addCartItem(HttpServletRequest request, @PathVariable Long p_id){
        final String requestTokenHeader = request.getHeader("Authorization");
        cartService.addCartItem(requestTokenHeader, p_id);
        return ResponseEntity.ok("Add item to cart success");
    }

    @SneakyThrows
    @DeleteMapping("/")
    public ResponseEntity<?> deleteCartItem(HttpServletRequest request, @RequestBody List<Long> products){
        final String requestTokenHeader = request.getHeader("Authorization");
        cartService.deleteCartItemList(requestTokenHeader, products);
        return ResponseEntity.ok("Delete success");
    }

    @SneakyThrows
    @GetMapping("/find")
    public ResponseEntity<?> getCartItemByName(HttpServletRequest request,@RequestParam String p_name){
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(cartService.getCartItemListByName(requestTokenHeader, p_name));
    }

}
