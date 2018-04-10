package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import org.apache.commons.lang.StringEscapeUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ProcessorUtils {

    public static String replaceBrackets(String line) {

        String processedLine = line;

        Pattern p = Pattern.compile("\\{\\{(.*?)\\}\\}");
        Matcher m = p.matcher(line);
        while (m.find()) {

            String matched = m.group();
            String processedMatched = matched.replace("{{","'+(").replace("}}",")+'").replaceAll("\\\\'", "'");
            processedLine = processedLine.replace(matched, processedMatched);

        }

        return processedLine;

    }

    public static String replaceJS(String line){
        line = line.replace(CommonCompiler.JS_HINT_BEGIN, "\n"+ CommonCompiler.JS_HINT_LINE);
        line = line.replace(CommonCompiler.JS_HINT_END, "\n");

        return line;
    }

    public static String escapeSingleQuotes(String line) {

        if(!line.contains(CommonCompiler.JS_HINT_LINE)){
            line = StringEscapeUtils.escapeJavaScript(line);
        }

        return line;

    }
}
