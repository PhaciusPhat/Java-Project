package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.DTO.InvoiceDTO;
import com.example.javaschoolproject.DTO.UserDTO;
import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.*;
import com.example.javaschoolproject.Repository.InvoiceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @Autowired
    private InvoiceDetailService invoiceDetailService;

    @Autowired
    private ModelMapper modelMapper;

    private UserDTO convertToDto(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

    private InvoiceDTO convertToDto(Invoice invoice) {
        UserDTO userDTO = convertToDto(invoice.getUser());
        InvoiceDTO invoiceDTO = modelMapper.map(invoice, InvoiceDTO.class);
        invoiceDTO.setUserDTO(userDTO);
        return invoiceDTO;
    }

    public List<InvoiceDTO> getAllInvoices() {
        return invoiceRepository.findAll().stream().map(this::convertToDto).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public List<InvoiceDetail> getInvoiceById(Long id) throws NotFoundException {
        invoiceRepository.findById(id).orElseThrow(() -> new NotFoundException("Invoice not found"));
        return invoiceDetailService.findByInvoiceId(id);
    }

    public List<InvoiceDTO> getInvoicesByDateByAdmin(long start_date, long end_date) {
        return invoiceRepository.getInvoicesByDateByAdmin(start_date, end_date).stream().map(this::convertToDto).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public List<InvoiceDTO> getInvoicesByDate(String requestTokenHeader, long start_date, long end_date) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
//        check xem user co invoice nao ko
//        Invoice invoice = invoiceRepository.findById(user.getUser_id()).orElseThrow(() -> new NotFoundException("Invoice not found"));
        return invoiceRepository.getInvoicesByDate(start_date, end_date, user.getUser_id()).stream().map(this::convertToDto).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public List<InvoiceDTO> getInvoicesByUser(String requestTokenHeader) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        List<Invoice> invoices = invoiceRepository.getInvoicesByUser(user.getUser_id());
        return invoices.stream().map(this::convertToDto).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public List<InvoiceDTO> getInvoicesByDateAndUserByAdmin(long start_date, long end_date, String user_name) {
        return invoiceRepository.getInvoicesByDateByUserByAdmin(start_date, end_date, user_name).stream().map(this::convertToDto).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public List<InvoiceDTO> getInvoicesByUserByAdmin(String user_name) {
        return invoiceRepository.getInvoicesByUserByAdmin(user_name).stream().map(this::convertToDto).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }


    public void createInvoice(String requestTokenHeader, InvoiceRequest invoiceRequest) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        List<InvoiceDetail> invoiceDetailList = new ArrayList<InvoiceDetail>();
//       check product availability
        for (CartRequest cq : invoiceRequest.getCartRequestList()) {
//            find product
            Product product = productService.getProductById(cq.getP_id());
//            if(!product.isP_isActive()){
//                throw new BadRequestException("Product is not available");
//            }
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
            if(invoiceRequest.getCartRequestList().size() > 0)
                cartService.deleteCartItem(requestTokenHeader, invoiceDetail.getProducts().getP_id());
        }
//        find and resave invoice
        Invoice resave_invoice = invoiceRepository.findById(invoice.getIv_id()).get();
        resave_invoice.setIv_total(total);
        resave_invoice.setIv_status(false);
        invoiceRepository.save(resave_invoice);
//        send email
        emailService.sendMail(user.getUser_email(),
                "X??c nh???n thanh to??n th??nh c??ng",
                "Xin ch??o " + user.getUser_name()
                        + "!\n" + "B???n ???? thanh to??n th??nh c??ng ????n h??ng c???a b???n. Xin c???m ??n b???n ???? s??? d???ng d???ch v??? c???a ch??ng t??i"
                        + "\n" + "????n h??ng c???a b???n c?? gi?? tr??? l??: " + total + " VND"
                        + "\n" + "????n h??ng c???a b???n s??? ???????c giao trong kho???ng 2-3 ng??y n???a. Xin c???m ??n!"
                        + "\n" + "N???u c?? th???c m???c g?? xin li??n h??? qua s??? ??i???n tho???i: 0774802203. Tr??n Tr???ng!");
    }

    public void updateStatusInvoice(String requestTokenHeader, long iv_id) throws NotFoundException {
        User user = userService.getUserByUsername(userService.getUsernameFromToken(requestTokenHeader));
        Invoice invoice = invoiceRepository.findById(iv_id).orElseThrow(() -> new NotFoundException("Invoice not found"));
        if (invoice.getUser().getUser_id() != user.getUser_id()) {
            throw new NotFoundException("Invoice not found");
        }
        invoice.setIv_status(true);
        invoiceRepository.save(invoice);
    }
}
