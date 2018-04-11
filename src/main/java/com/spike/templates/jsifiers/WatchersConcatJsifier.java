package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatchersConcatJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for (String line : output.split("\n")) {

            line = line.trim();
            if (line.length() > 0) {

                if (line.contains(CommonCompiler.JS_HINT_LINE)) {

//                    if(line.contains(CommonCompiler.TRIGGER_TEMPLATE) || line.contains(CommonCompiler.TRIGGER_ELEMENT)){
//                        stringBuilder.append(line.replace(CommonCompiler.JS_HINT_LINE, ""));
//                    }else{
                        stringBuilder.append(line.replace(CommonCompiler.JS_HINT_LINE, "")).append("\n");
                   // }
                }

            }

        }

        return stringBuilder.toString();

    }

}
