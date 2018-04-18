package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

                if(line.contains("spike-expression")){
                    line = processLineExpression(line);
                }

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

    public static String processLineExpression(String line) {

        String regexString = Pattern.quote("spike-expression=\"") + "(.*?)" + Pattern.quote("\"");

        Pattern pattern = Pattern.compile(regexString);
        Matcher matcher = pattern.matcher(line);

        while (matcher.find()) {
            String textInBetween = matcher.group(1); // Since (.*?) is capturing group 1

            String textToReplace = "spike-expression=\""+textInBetween+"\"";
            line = line.replace(textToReplace, textInBetween);

        }

        return line;
    }

}
