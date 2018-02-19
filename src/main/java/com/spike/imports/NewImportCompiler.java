package com.spike.imports;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Dawid on 2017-11-16.
 */
public class NewImportCompiler {

    public String compileImports(File file, Boolean isTemplate) throws IOException {

        String importWord = "import";

        if(isTemplate){
            importWord = "'import";
        }

        BufferedReader in = new BufferedReader(new FileReader(file));
        String str;

        Map<String, String> importsReplacements = new HashMap<>();

        StringBuilder builder = new StringBuilder();

        while ((str = in.readLine()) != null) {

            if (str.startsWith(importWord)) {

                String key = str.replace("'", "").substring(0, str.indexOf("from") - 1).replace("import", "").trim();
                String value = str.substring(str.indexOf("from") + 4, str.length()).replace("'", "").replace(";", "").trim();
                importsReplacements.put(key, value);

            }else {
                builder.append(str+"\n");
            }

        }

        String template = builder.toString();

        for (Map.Entry<String, String> entry : importsReplacements.entrySet()) {

            String key = entry.getKey();
            String val = entry.getValue();

            template = template.replace(key.trim(), val.trim());

        }

        return template;
    }

}
