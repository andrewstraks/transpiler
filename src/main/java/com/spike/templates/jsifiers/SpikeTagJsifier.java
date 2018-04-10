package com.spike.templates.jsifiers;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class SpikeTagJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        return output.replaceAll("<spike>", "").replaceAll("</spike>", "");

    }

}
