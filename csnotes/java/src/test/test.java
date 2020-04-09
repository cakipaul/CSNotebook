package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;

public class test {
    public static void main(final String[] args) {
        // System.out.println(max(borderOrNot(new int[] { 1, 2, 3, 4, 5, 6, 7 })));

        // String inputFilePath = "G:\\android\\android-dev\\doc-html\\docs\\移动框架\\api.md";
        // String outputFilePath = "G:\\android\\android-dev\\doc-html\\docs\\移动框架\\api-new.md";
        // System.out.println(mdAutoChapterSerialNumerBuilder(inputFilePath, outputFilePath).toString());

    }

    public static Integer max(int[] array) {
        if (array.length < 1)
            return null;
        Integer max = (Integer) array[0];
        for (int i = 0; i < array.length; i++) {
            if (array[i] > max)
                max = (Integer) array[i];
        }
        return max;
    }

    public static int[] borderOrNot(int[] insideAndOutside) {
        if (insideAndOutside.length == 1) {
            return new int[] { insideAndOutside[0], 0 };
        } else if (insideAndOutside.length == 2) {
            return new int[] { insideAndOutside[1], insideAndOutside[0] };
        } else if (insideAndOutside.length == 3) {
            return new int[] { insideAndOutside[0] + insideAndOutside[2], insideAndOutside[1] };
        } else {
            int[] insideVilleges = new int[insideAndOutside.length - 1];
            for (int i = 0; i < insideVilleges.length; i++) {
                insideVilleges[i] = insideAndOutside[i];
            }
            return borderOrNot(
                    new int[] { borderOrNot(insideVilleges)[1] + insideAndOutside[insideAndOutside.length - 1],
                            borderOrNot(insideVilleges)[0] });
        }
        // return null;
    }

    public static StringBuffer mdAutoChapterSerialNumerBuilder(String inputFilePath, String outputFilePath) {
        File inputFile = new File(inputFilePath);
        if (!inputFile.exists()) {
            return null;
        }
        FileInputStream fis = null;
        InputStreamReader isr = null;
        FileOutputStream fos = null;
        BufferedReader br = null;
        String lineStr;
        StringBuffer sb = new StringBuffer();
        Integer[] chapterIndex = { 0, 0, 0, 0, 0, 0 };
        try {
            fis = new FileInputStream(inputFile);
            isr = new InputStreamReader(fis);
            br = new BufferedReader(isr);// 从字符输入流中读取文件中的内容
            while ((lineStr = br.readLine()) != null) {
                if (lineStr.startsWith("#")) {
                    int endIndex = lineStr.indexOf(" ");
                    if (endIndex < 7 && "#######".substring(0, endIndex).endsWith(lineStr.substring(0, endIndex))) {
                        chapterIndex[endIndex - 1] += 1;
                        for (int j = endIndex; j < 6; j++) {
                            chapterIndex[j] = 0;
                        }

                        String index = "";
                        for (int j = 0; j < endIndex; j++) {
                            index += chapterIndex[j].toString() + ".";
                        }
                        lineStr = "#######".substring(0, endIndex) + " " + index + " "
                                + lineStr.substring(endIndex, lineStr.length());

                    }
                }
                sb.append(lineStr + "\n");
            }
            // System.out.println(sb.toString());

            File outputFile = new File(outputFilePath);
            fos = new FileOutputStream(outputFile);
            byte[] output=sb.toString().getBytes();
            fos.write(output);

            br.close();
            isr.close();
            fis.close();
            fos.close();

            return sb;

        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        } finally {
            try {
                if (br != null)
                    br.close();
                if (isr != null)
                    isr.close();
                if (fis != null)
                    fis.close();
                if (fos != null)
                    fos.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return null;
    }
}