package com.spike.templates.jsifiers;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class TemplateFunctionJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {
        return null;
    }

    @Override
    public String jsify(String output, String templatePath) throws Exception {

        StringBuilder builder = new StringBuilder();

        builder.append("spike.core.Templates.templates['");
        builder.append(templatePath);
        builder.append("']=function(scope){var t='';");
        builder.append(output);
        builder.append(" return t;};");

        return builder.toString();

    }

}
