package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class IfProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        String prefix = U.js("if(" + element.attr(spikeAttribute) + "){");
        String suffix = U.js("}");

        this.insertBefore(element, prefix, true);
        this.insertAfter(element, suffix, true);

        element.removeAttr(spikeAttribute);

    }

}
