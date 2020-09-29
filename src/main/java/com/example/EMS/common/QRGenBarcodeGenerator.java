package com.example.EMS.common;

import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import net.glxn.qrgen.javase.QRCode;

import javax.imageio.ImageIO;
import javax.mail.util.ByteArrayDataSource;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class QRGenBarcodeGenerator {

    public static BufferedImage generateQRCodeImage(String barcodeText) throws Exception {
        ByteArrayOutputStream stream = QRCode
                .from(barcodeText)
                .withSize(250, 250)
                .stream();
        ByteArrayInputStream bis = new ByteArrayInputStream(stream.toByteArray());

        return ImageIO.read(bis);
    }


    public static ByteArrayDataSource createQrCodeWith(Participant participant, Event event) throws IOException, WriterException {
        String url = "http://localhost:3000/" + participant.getUsername() +
                "/and/" +  event.getName() + "/information";
        byte[] qrImageBytes = getQRCodeImage(url, 250, 250);
        ByteArrayDataSource qrImageDataSource = new ByteArrayDataSource(qrImageBytes, "image/png");
        return qrImageDataSource;

    }

    public static byte[] getQRCodeImage(String text, int width, int height) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        byte[] pngData = pngOutputStream.toByteArray();
        return pngData;
    }

}
