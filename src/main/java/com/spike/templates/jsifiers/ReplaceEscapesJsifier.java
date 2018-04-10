package com.spike.templates.jsifiers;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class ReplaceEscapesJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        output = output.replaceAll("&amp;", "&");
        output = output.replaceAll("amp;", "");
        output = output.replaceAll("&lt;", "<");
        output = output.replaceAll("&gt;", ">");
        output = output.replaceAll("&le;", "<=");
        output = output.replaceAll("&ge;", ">=");

        return output;

    }

}
