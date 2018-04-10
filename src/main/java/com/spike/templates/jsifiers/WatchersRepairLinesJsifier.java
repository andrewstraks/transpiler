package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatchersRepairLinesJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for (String line : output.split("\n")) {

            line = line.trim();
            if (line.length() > 0) {

                if(line.startsWith("'") && line.endsWith("'")){
                    line = "t+='"+line+"';";
                }

                stringBuilder.append(line);

            }

        }

        return stringBuilder.toString();

    }

}
