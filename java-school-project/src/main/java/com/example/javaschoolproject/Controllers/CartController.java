package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Models.CartRequest;
import com.example.javaschoolproject.Services.CartService;
import com.example.javaschoolproject.Services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/cart")
@RequiredArgsConstructor
public class CartController {
    @Autowired
    CartService cartService;

    @SneakyThrows
    @GetMapping("/")
    public ResponseEntity<?> getCartByUser(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(cartService.getAllCartItems(requestTokenHeader));
    }

    @SneakyThrows
    @PostMapping("/")
    public ResponseEntity<?> addCartItem(HttpServletRequest request,  @RequestBody @Valid CartRequest cartRequest) {
        final String requestTokenHeader = request.getHeader("Authorization");
        cartService.addCartItem(requestTokenHeader, cartRequest);
        return ResponseEntity.ok("Add item to cart success");
    }

    @SneakyThrows
    @PostMapping("/addLocal/")
    public ResponseEntity<?> addLocalCartItem(HttpServletRequest request, @RequestBody @Valid List<CartRequest> cartRequestList) {
        final String requestTokenHeader = request.getHeader("Authorization");
        cartService.addLocalCartItem(requestTokenHeader, cartRequestList);
        return ResponseEntity.ok("Add items to cart success");
    }

    @SneakyThrows
    @DeleteMapping("/")
    public ResponseEntity<?> deleteCartItem(HttpServletRequest request, @RequestBody List<Long> products) {
        final String requestTokenHeader = request.getHeader("Authorization");
        cartService.deleteCartItemList(requestTokenHeader, products);
        return ResponseEntity.ok("Delete success");
    }

    @SneakyThrows
    @GetMapping("/find")
    public ResponseEntity<?> getCartItemByName(HttpServletRequest request, @RequestParam String p_name) {
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(cartService.getCartItemListByName(requestTokenHeader, p_name));
    }

}
