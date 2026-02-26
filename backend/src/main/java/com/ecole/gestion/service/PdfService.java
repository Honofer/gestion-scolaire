package com.ecole.gestion.service;

import com.ecole.gestion.model.Bulletin;
import com.ecole.gestion.model.Note;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PdfService {

    public byte[] generateBulletinPdf(Bulletin bulletin) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Header
            document.add(new Paragraph("RÉPUBLIQUE TOGOLAISE")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBold());
            document.add(new Paragraph("Travail - Liberté - Patrie")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setItalic()
                    .setFontSize(10));
            document.add(new Paragraph("\n"));

            document.add(new Paragraph("BULLETIN DE NOTES")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(18)
                    .setBold()
                    .setFontColor(ColorConstants.BLUE));
            
            document.add(new Paragraph("\n"));

            // Student Info
            Table infoTable = new Table(UnitValue.createPercentArray(new float[]{50, 50})).useAllAvailableWidth();
            infoTable.addCell(new Cell().add(new Paragraph("Élève : " + bulletin.getEleve().getUsername())).setBorder(null));
            infoTable.addCell(new Cell().add(new Paragraph("Matricule : " + bulletin.getEleve().getMatricule())).setBorder(null));
            infoTable.addCell(new Cell().add(new Paragraph("Classe : " + bulletin.getEleve().getClasse().getNom())).setBorder(null));
            infoTable.addCell(new Cell().add(new Paragraph("Année Scolaire : 2025-2026")).setBorder(null));
            document.add(infoTable);

            document.add(new Paragraph("\n"));

            // Grades Table
            Table gradesTable = new Table(UnitValue.createPercentArray(new float[]{40, 20, 20, 20})).useAllAvailableWidth();
            gradesTable.addHeaderCell(new Cell().add(new Paragraph("Matière")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            gradesTable.addHeaderCell(new Cell().add(new Paragraph("Coefficient")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            gradesTable.addHeaderCell(new Cell().add(new Paragraph("Moyenne")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            gradesTable.addHeaderCell(new Cell().add(new Paragraph("Total")).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            Map<com.ecole.gestion.model.Matiere, java.util.List<Note>> notesByMatiere = bulletin.getNotes().stream()
                    .collect(Collectors.groupingBy(Note::getMatiere));

            for (Map.Entry<com.ecole.gestion.model.Matiere, java.util.List<Note>> entry : notesByMatiere.entrySet()) {
                double moyenneMatiere = entry.getValue().stream().mapToDouble(Note::getValeur).average().orElse(0.0);
                double totalMatiere = moyenneMatiere * entry.getKey().getCoefficient();

                gradesTable.addCell(new Cell().add(new Paragraph(entry.getKey().getNom())));
                gradesTable.addCell(new Cell().add(new Paragraph(String.valueOf(entry.getKey().getCoefficient()))));
                gradesTable.addCell(new Cell().add(new Paragraph(String.format("%.2f", moyenneMatiere))));
                gradesTable.addCell(new Cell().add(new Paragraph(String.format("%.2f", totalMatiere))));
            }
            document.add(gradesTable);

            document.add(new Paragraph("\n"));

            // Summary
            document.add(new Paragraph("Moyenne Générale : " + String.format("%.2f", bulletin.getMoyenneGenerale()))
                    .setBold()
                    .setFontSize(14));
            document.add(new Paragraph("Rang : " + bulletin.getRang() + " / " + bulletin.getEleve().getClasse().getEleves().size()));
            document.add(new Paragraph("Décision du conseil : " + bulletin.getDecision()));

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return baos.toByteArray();
    }
}
