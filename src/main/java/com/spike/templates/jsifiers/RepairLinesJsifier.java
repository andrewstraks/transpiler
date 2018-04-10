package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

import java.util.regex.Pattern;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class RepairLinesJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

       // output = output.replaceAll(Pattern.quote("@@@@"), "");

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for (String line : output.split("\n")) {

            line = line.trim();
            if (line.length() > 0) {

                if(line.startsWith("'") && line.endsWith("'")){
                    line = "t+='"+line+"';";
                }

                if(line.contains(CommonCompiler.WATCHER_PREFIX)){
                    line = "t+='';";
                }

                stringBuilder.append(line);

            }

        }

        return stringBuilder.toString();

    }

}
