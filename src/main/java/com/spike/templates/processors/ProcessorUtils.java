package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import org.apache.commons.lang.StringEscapeUtils;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ProcessorUtils {

    public static String replaceSingleBrackets(String line){

        line = line.replace(TemplateCompiler.BRACKET_LEFT, "'+");
        line = line.replace(TemplateCompiler.BRACKET_RIGHT, "+'");

        return line;

    }

    public static String replaceBrackets(String line){

        line = line.replace(TemplateCompiler.BRACKET_QUOTE_LEFT, "'+\"'\"+");
        line = line.replace(TemplateCompiler.BRACKET_QUOTE_RIGHT, "+\"'\"+'");
        line = line.replace(TemplateCompiler.BRACKET_LEFT, "'+");
        line = line.replace(TemplateCompiler.BRACKET_RIGHT, "+'");

        return line;

    }

    public static String replaceJS(String line){
        line = line.replace(TemplateCompiler.JS_HINT_BEGIN, "\n"+ TemplateCompiler.JS_HINT_LINE);
        line = line.replace(TemplateCompiler.JS_HINT_END, "\n");

        return line;
    }

    public static String escapeSingleQuotes(String line) {

        if(!line.contains(TemplateCompiler.JS_HINT_LINE)){
            line = StringEscapeUtils.escapeJavaScript(line);
        }

        return line;

    }
}
