package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatchersJsJsify extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {
        return null;
    }

    @Override
    public String jsify(String output, String watcherName) throws Exception {

        StringBuilder stringBuilder = new StringBuilder(output.length());
        stringBuilder
                .append("var __a")
                .append(CommonCompiler.generalCounter)
                .append(" = ['','']; __a")
                .append(CommonCompiler.generalCounter)
                .append("[0] = '")
                .append(watcherName)
                .append("'; __a")
                .append(CommonCompiler.generalCounter)
                .append("[1] = '';");

        for (String line : output.split("\n")) {

            line = line.trim();
            if (line.length() > 0) {

                if(line.contains(CommonCompiler.JS_HINT_LINE) && (line.contains(CommonCompiler.TRIGGER_ELEMENT) || line.contains(CommonCompiler.TRIGGER_TEMPLATE))){
                    line = line.replace(CommonCompiler.JS_HINT_LINE, "");
                }

                if (line.contains(CommonCompiler.JS_HINT_LINE)) {
                    stringBuilder.append(line.replace(CommonCompiler.JS_HINT_LINE, "")).append("\n");
                } else  {

                    if (line.endsWith("+'")) {
                        line = line.substring(0, line.length() - 2);
                    } else {
                        line = line + "'";
                    }

                    if (line.trim().length() > 0) {
                        stringBuilder.append(("__a" + CommonCompiler.generalCounter + "[1]+='" + line + ";").replace("+=''+", "+=")).append("\n");
                    }

                }


            }

        }

        stringBuilder.append("__w.push(__a" + CommonCompiler.generalCounter + ");");

        CommonCompiler.generalCounter++;

        return stringBuilder.toString();

    }

}
