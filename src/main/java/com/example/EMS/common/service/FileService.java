package com.example.EMS.common.service;

import com.example.EMS.constants.Constants;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.io.*;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class FileService {

    @SneakyThrows
    public byte [] createPdfAboutEventInfo(ParticipantsInEvents participantInEvent) {

        Document document = new Document();

        final String path = Constants.FILE_PATH + participantInEvent.getParticipant().getName() + "-" +
                                                  participantInEvent.getEvent().getName() + ".pdf";
        final File file = new File(path);
        final FileOutputStream fileOutputStream = new FileOutputStream(file);
        PdfWriter.getInstance(document, fileOutputStream);

        document.open();

        Font italicAndBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.ITALIC | Font.BOLD);

        Font redAndBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.RED);

        document.add(new Paragraph("Etkinligimize katildiginiz icin tesekkur ederiz." +
                                        " Sizinle bulusmayi iple cekiyoruz!", italicAndBold));
        document.add(new Paragraph("            "));


        PdfPTable table = new PdfPTable(2);
        table.addCell(new Paragraph("Etkinlik Bilgileri", italicAndBold));
        table.addCell("                  ");

        String eventName = "Etkinlik Adi : ";
        table.addCell(eventName);
        table.addCell(participantInEvent.getEvent().getName());

        String eventQuota = "Kontenjan : ";
        table.addCell(eventQuota);
        table.addCell(Integer.toString(participantInEvent.getEvent().getQuota()));

        String startDate = "Baslangıc Tarihi : ";
        table.addCell(startDate);
        table.addCell(participantInEvent.getEvent().getStartDate().toString());

        String finishDate = "Bitis Tarihi : ";
        table.addCell(finishDate);
        table.addCell(participantInEvent.getEvent().getEndDate().toString());

        String lecturerName = "Egitmen Adi : ";
        table.addCell(lecturerName);
        table.addCell(participantInEvent.getEvent().getLecturer().getName()
                            + " " + participantInEvent.getEvent().getLecturer().getSurname());

        PdfPTable table2 = new PdfPTable(2);
        table2.addCell(new Paragraph("Katilimci Ayrintilari", italicAndBold));
        table2.addCell("                  ");

        String participantNameInfo = "Adi Soyadi : ";
        table2.addCell(participantNameInfo);
        table2.addCell(participantInEvent.getParticipant().getName() +
                            " " + participantInEvent.getParticipant().getSurname());

        String participantEmail = "Email : ";
        table2.addCell(participantEmail);
        table2.addCell(participantInEvent.getParticipant().getEmail());

        String participantPhone = "Iletisim Numarasi : ";
        table2.addCell(participantPhone);
        table2.addCell(participantInEvent.getParticipant().getPhone());

        Random random = new Random();
        String code = "";
        for (int i = 0; i<7; i++){

            int randomNumber = random.nextInt(123);
            if((randomNumber>64 && randomNumber<91) || (randomNumber>96 && randomNumber<123)){
                char randomLetter = (char) randomNumber;
                code = code + randomLetter;
            }
            else
                code = code + Integer.toString(randomNumber);
        }

        PdfPTable table3 = new PdfPTable(2);
        table3.addCell(new Paragraph("Etkinlige giris kodunuz => ", italicAndBold));
        table3.addCell(new Paragraph(code, redAndBold));

        document.add(table);
        document.add(new Paragraph("            "));
        document.add(table2);
        document.add(new Paragraph("            "));
        document.add(table3);
        document.add(new Paragraph("            "));

        document.add(new Paragraph("Kodu lütfen kimseyle paylasmayiniz.", italicAndBold));
        document.add(new Paragraph("Etkinlikte görüsmek üzere :))", italicAndBold));

        // Add meta data information to PDF file
        document.addCreationDate();
        document.addAuthor("Admin");
        document.addTitle("Bilet Bilgileri");
        document.close();

        final ByteArrayResource fileResource  = new ByteArrayResource(Files.readAllBytes(Paths.get(path)));

        return fileResource.getByteArray();

    }

}
