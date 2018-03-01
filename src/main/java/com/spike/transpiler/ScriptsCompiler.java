package com.spike.transpiler;

import com.spike.Console;
import com.spike.transpiler.model.SpikeFile;
import com.spike.transpiler.serialization.Serializer;

/**
 * Created by Dawid on 2017-01-29.
 */
public class ScriptsCompiler {

    public static boolean SPIKE_COMPILATION = false;

    public String compileSyntax(String fileBody) throws Exception {

        long start = System.currentTimeMillis();

        Serializer.initSerializer();
        fileBody = removeComments(fileBody);

        if (hasClass(fileBody)) {

            if (!hasPackage(fileBody)) {
                throw new Exception("Class file has to have package declaration");
            }

            SpikeFile spikeFile = new SpikeFile(fileBody);
            spikeFile.compile();

            Serializer.serializeConstructors(spikeFile.constructorsMap);

            Console.log("Transpilation takes: " + (System.currentTimeMillis() - start) + "ms");

            return spikeFile.compiled;

        }


        return null;

    }

    private String removeComments(String fileBody) {

        StringBuilder builder = new StringBuilder();
        String[] splitted = fileBody.split("\n");

        boolean multiComment = false;
        for (int i = 0, l = splitted.length; i < l; i++) {

            if (splitted[i].trim().indexOf("*/") > -1) {
                multiComment = false;
            } else if (splitted[i].trim().indexOf("/*") > -1) {
                multiComment = true;
            } else if (multiComment == false && !splitted[i].trim().startsWith("//")) {
                builder.append(splitted[i] + "\n");
            }

        }

        return builder.toString().trim();

    }

    private boolean hasClass(String fileBody) {
        return fileBody.contains("class ");
    }

    private boolean hasPackage(String fileBody) {
        return fileBody.startsWith("package");
    }

}
