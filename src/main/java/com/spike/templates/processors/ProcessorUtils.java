package com.spike.templates.processors;

import com.spike.templates.NewTemplateCompiler;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ProcessorUtils {

    public static String replaceSingleBrackets(String line){

        line = line.replace("[[", "'+");
        line = line.replace("]]", "+'");

        return line;

    }

    public static String replaceBrackets(String line){

        line = line.replace("[[[", "'+\"'\"+");
        line = line.replace("]]]", "+\"'\"+'");
        line = line.replace("[[", "'+");
        line = line.replace("]]", "+'");

        return line;

    }

    public static String replaceJS(String line){
        line = line.replace(NewTemplateCompiler.JS_HINT_BEGIN, "\n"+NewTemplateCompiler.JS_HINT_LINE);
        line = line.replace(NewTemplateCompiler.JS_HINT_END, "\n");

        return line;
    }

}
