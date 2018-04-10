package com.spike.templates;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by Dawid on 2017-11-02.
 */
public class U {

    public static String js(String string){
        return CommonCompiler.JS_HINT_BEGIN+string+ CommonCompiler.JS_HINT_END;
    }

    public static String s(String string){
        return CommonCompiler.PREFIX+string+ CommonCompiler.SUFFIX;
    }

    public static String e(String string){
        return "spike-event-"+string;
    }

    public static String ss(String string){
        return CommonCompiler.BRACKET_LEFT+string+ CommonCompiler.BRACKET_RIGHT;
    }

}
