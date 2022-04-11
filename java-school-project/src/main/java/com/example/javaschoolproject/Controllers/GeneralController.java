package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class GeneralController {

    private final StorageService storageService;

    @GetMapping("/{file_name}")
    @ResponseBody
    public void getFile(@PathVariable String file_name, HttpServletResponse response) throws IOException {
        File file = new File(storageService.getUrlFile(file_name));
        FileInputStream in = new FileInputStream(file);
        IOUtils.copy(in, response.getOutputStream());
    }
}
