package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class ConcatJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {


        StringBuilder stringBuilder = new StringBuilder(output.length());
        for (String line : output.split("\n")) {

            line = line.trim();
            if (line.length() > 0) {

                String modifiedLine = "";
                if (line.contains(CommonCompiler.JS_HINT_LINE)) {
                    modifiedLine = line.replace(CommonCompiler.JS_HINT_LINE, "");
                } else {

                    if (line.endsWith("+'")) {
                        line = line.substring(0, line.length() - 2);
                    } else {
                        line = line + "'";
                    }

                    modifiedLine = ("t+='" + line + ";").replace("+=''+", "+=");
                }

                stringBuilder.append(modifiedLine+"\n");

            }

        }

        return stringBuilder.toString();

    }

}
