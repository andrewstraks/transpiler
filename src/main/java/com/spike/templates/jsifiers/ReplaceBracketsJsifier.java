package com.spike.templates.jsifiers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class ReplaceBracketsJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        Pattern p = Pattern.compile("\\{\\{(.*?)\\}\\}");
        Matcher m = p.matcher(output);
        while (m.find()) {

            String matched = m.group();
            String processedMatched = matched.replace("{{","'+(").replace("}}",")+'").replaceAll("\\\\'", "'");
            output = output.replace(matched, processedMatched);

        }

        return output;

    }

}
