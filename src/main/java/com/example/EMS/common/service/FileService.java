package com.example.EMS.common.service;

import com.example.EMS.person.entity.ParticipantsInEvents;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import java.nio.file.Files;
import java.io.*;
import java.nio.file.Paths;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class FileService {

    @SneakyThrows
    public byte [] createPdfAboutEventInfo(ParticipantsInEvents participantInEvent) {

        Document document = new Document();

        final File file = new File("/home/emre/Desktop/deneme.pdf");
        final FileOutputStream fileOutputStream = new FileOutputStream(file);
        PdfWriter.getInstance(document, fileOutputStream);

        document.open();
        document.add(new Paragraph("Hello World, Creating PDF document in Java is easy"));
        document.add(new Paragraph("You are customer # 2345433"));
        document.add(new Paragraph(new Date(new java.util.Date().getTime()).toString()));

        // Add meta data information to PDF file
        document.addCreationDate();
        document.addAuthor("Javarevisited");
        document.addTitle("How to create PDF document in Java");
        document.addCreator("Thanks to iText, writing into PDF is easy");
        document.close();

        final ByteArrayResource fileResource  = new ByteArrayResource(Files.readAllBytes(Paths.get("/home/emre/Desktop/deneme.pdf")));

        return fileResource.getByteArray();

    }

}
