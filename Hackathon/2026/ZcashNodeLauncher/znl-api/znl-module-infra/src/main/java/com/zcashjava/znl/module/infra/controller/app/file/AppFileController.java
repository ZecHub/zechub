package com.zcashjava.znl.module.infra.controller.app.file;

import cn.hutool.core.io.IoUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FileCreateReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FilePresignedUrlRespVO;
import com.zcashjava.znl.module.infra.controller.app.file.vo.AppFileUploadReqVO;
import com.zcashjava.znl.module.infra.service.file.FileService;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.validation.Valid;

@Tag(name = "User App - File Storage")
@RestController
@RequestMapping("/infra/file")
@Validated
@Slf4j
public class AppFileController {

    @Resource
    private FileService fileService;

    @PostMapping("/upload")
    @Operation(summary = "Upload File")
    @PermitAll
    public CommonResult<String> uploadFile(AppFileUploadReqVO uploadReqVO) throws Exception {
        MultipartFile file = uploadReqVO.getFile();
        byte[] content = IoUtil.readBytes(file.getInputStream());
        return success(fileService.createFile(content, file.getOriginalFilename(),
                uploadReqVO.getDirectory(), file.getContentType()));
    }

    @GetMapping("/presigned-url")
    @Operation(summary = "Get file pre-signature address (upload)", description = "Mode two: frontend upload file: for direct uploading of files like Seven Bulls, Ali Clouds, OSS, etc. at front end")
    @Parameters({
            @Parameter(name = "name", description = "File Name", required = true),
            @Parameter(name = "directory", description = "File Directory")
    })
    public CommonResult<FilePresignedUrlRespVO> getFilePresignedUrl(
            @RequestParam("name") String name,
            @RequestParam(value = "directory", required = false) String directory) {
        return success(fileService.presignPutUrl(name, directory));
    }

    @PostMapping("/create")
    @Operation(summary = "Create File", description = "Mode two: front-end upload file: the record uploads the uploaded file in conjunction with the presigned-url interface")
    @PermitAll
    public CommonResult<Long> createFile(@Valid @RequestBody FileCreateReqVO createReqVO) {
        return success(fileService.createFile(createReqVO));
    }

}
