package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

import java.util.regex.Pattern;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class OptimizeJsJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        for (int i = 0; i < CommonCompiler.generalCounter; i++) {
            output = output.replaceAll(Pattern.quote("__a"+i+"[1]+='';"), "");
        }

        return output;

    }

}
