package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatchersRepairLinesJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {
        return null;
    }


    @Override
    public String jsify(String output, Boolean isOnlyWatch) throws Exception {

        StringBuilder stringBuilder = new StringBuilder(output.length());
       // String lastLine = "";
        for (String line : output.split("\n")) {

            line = line.trim();
            if (line.length() > 0) {

                if(isOnlyWatch){

//                    if(line.startsWith("'") && line.endsWith("'")){
//                        line = "t+='"+line+"';";
//                    }

                }else{

                    if(line.startsWith("'") && line.endsWith("'")){
                        line = "t+='"+line+"';";
                    }

                }

                stringBuilder.append(line).append("\n");

            }

               // lastLine = line;

        }

        return stringBuilder.toString();

    }

}
