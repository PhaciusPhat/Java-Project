package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.*;
import com.example.javaschoolproject.Repository.CartRepository;
import com.example.javaschoolproject.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @Autowired
    private InvoiceDetailService invoiceDetailService;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public List<InvoiceDetail> getInvoiceById(Long id) throws NotFoundException {
        invoiceRepository.findById(id).orElseThrow(() -> new NotFoundException("Invoice not found"));
        return invoiceDetailService.findByInvoiceId(id);
    }

    public List<Invoice> getInvoicesByDateByAdmin(long start_date, long end_date) {
        return invoiceRepository.getInvoicesByDateByAdmin(start_date, end_date);
    }

    public List<Invoice> getInvoicesByDate(String requestTokenHeader, long start_date, long end_date) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        Invoice invoice = invoiceRepository.findById(user.getUser_id()).orElseThrow(() -> new NotFoundException("Invoice not found"));
        System.out.println(invoice.getCreatedDate());
        System.out.println(start_date);
        System.out.println(end_date);
        System.out.println(invoice.getCreatedDate() >= start_date);
        return invoiceRepository.getInvoicesByDate(start_date, end_date, user.getUser_id());
    }

    public List<Invoice> getInvoicesByUser(String requestTokenHeader) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        List<Invoice> invoices = invoiceRepository.getInvoicesByUser(user.getUser_id());
        return invoices;
    }

    public List<Invoice> getInvoicesByUserByAdmin(String user_name) {
        return invoiceRepository.getInvoicesByUserByAdmin(user_name);
    }


    public void createInvoice(String requestTokenHeader, InvoiceRequest invoiceRequest) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        List<InvoiceDetail> invoiceDetailList = new ArrayList<InvoiceDetail>();
//       check product availability
        for (CartRequest cq : invoiceRequest.getCartRequestList()) {
//            find product
            Product product = productService.getProductById(cq.getP_id());
//            check product ammount
            if (product.getP_number() < cq.getNumber()) {
//                throw exception if product ammount is less than cart ammount
                throw new BadRequestException("Not enough products " + product.getP_name());
            } else {
//                 set number and price into invoice detail temp list
                InvoiceDetail invoiceDetail = new InvoiceDetail();
                invoiceDetail.setProducts(product);
                invoiceDetail.setNumber(cq.getNumber());
                invoiceDetail.setPrice(product.getP_price());
                invoiceDetailList.add(invoiceDetail);
            }
        }
//        create invoice
        Invoice invoice = new Invoice();
        invoice.setUser(user);
        invoice.setIv_total(0);
        invoice.setIv_describe(invoiceRequest.getIv_describe());
        invoice.setIv_address(invoiceRequest.getIv_address());
        invoiceRepository.save(invoice);
        int total = 0;
//        create invoice detail list for invoice
        for (InvoiceDetail invoiceDetail : invoiceDetailList) {
            total += invoiceDetail.getPrice() * invoiceDetail.getNumber();
            System.out.println(total);
//          set invoice for invoice detail
            invoiceDetail.setInvoices(invoice);
//            update product ammount
            productService.updateProductNumberAfterBuy(invoiceDetail.getProducts().getP_id(), invoiceDetail.getNumber());
//            create product invoice
            ProductInvoice productInvoice = new ProductInvoice(invoice.getIv_id(), invoiceDetail.getProducts().getP_id());
            invoiceDetail.setProductInvoice(productInvoice);
//            save invoice detail
            invoiceDetailService.save(invoiceDetail);
//            delete cart
            cartService.deleteCartItem(requestTokenHeader, invoiceDetail.getProducts().getP_id());
        }
//        find and resave invoice
        Invoice resave_invoice = invoiceRepository.findById(invoice.getIv_id()).get();
        resave_invoice.setIv_total(total);
        invoiceRepository.save(resave_invoice);

    }


}
