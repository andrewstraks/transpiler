package com.spike.templates;

/**
 * Created by Dawid on 2017-11-02.
 */
public class U {

    public static String js(String string){
        return NewTemplateCompiler.JS_HINT_BEGIN+string+NewTemplateCompiler.JS_HINT_END;
    }

    public static String s(String string){
        return NewTemplateCompiler.PREFIX+string+NewTemplateCompiler.SUFFIX;
    }

    public static String ss(String string){
        return NewTemplateCompiler.BRACKET_LEFT+string+NewTemplateCompiler.BRACKET_RIGHT;
    }

}
