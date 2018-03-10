package com.spike.templates;

/**
 * Created by Dawid on 2017-11-02.
 */
public class U {

    public static String js(String string){
        return TemplateCompiler.JS_HINT_BEGIN+string+ TemplateCompiler.JS_HINT_END;
    }

    public static String s(String string){
        return TemplateCompiler.PREFIX+string+ TemplateCompiler.SUFFIX;
    }

    public static String e(String string){
        return "spike-event-"+string;
    }

    public static String ss(String string){
        return TemplateCompiler.BRACKET_LEFT+string+ TemplateCompiler.BRACKET_RIGHT;
    }

}
