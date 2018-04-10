package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatcherFunctionJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {
        return null;
    }

    @Override
    public String jsify(String output, String templatePath) throws Exception {

        StringBuilder builder = new StringBuilder();

        builder.append("spike.core.Watchers.watchers['");
        builder.append(templatePath);
        builder.append("']=function(scope, $this){var __w = []; ");
        builder.append(output);
        builder.append(" return __w;};");

        return builder.toString();

    }

}
