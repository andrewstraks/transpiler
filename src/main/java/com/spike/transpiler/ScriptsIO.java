package com.spike.transpiler;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Dawid on 2017-01-29.
 */
public class ScriptsIO {

    public String getFileContent(String srcPath) throws IOException {
        return IOUtils.toString(new FileInputStream(new File(srcPath)), "utf-8");
    }

    public void saveFile(String fileBody, String distPath) throws IOException {
        FileUtils.writeStringToFile(new File(distPath), fileBody, "UTF-8");
    }

    public String getFileContentBuffered(File file) throws IOException {

        BufferedReader in = new BufferedReader(new FileReader(file));
        String str;

        StringBuilder builder = new StringBuilder();

        while ((str = in.readLine()) != null) {
                builder.append(str+"\n");
        }

        return builder.toString();
    }


}
