package com.spike.templates.jsifiers;

import com.spike.templates.spikeProcessors.ProcessorUtils;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class EscapeJsJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for (String line : output.split("\n")) {
            line = ProcessorUtils.replaceJS(line);
            line = ProcessorUtils.escapeSingleQuotes(line);
            stringBuilder.append(line).append("\n");
        }

        return stringBuilder.toString();

    }

}
