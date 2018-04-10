package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ElseProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) {

        String prefix = U.js(" else {");
        String suffix = U.js("}");

        element.removeAttr(spikeAttribute);

        this.insertBefore(element, U.js(prefix), true);
        this.insertAfter(element, U.js(suffix), true);



    }

}
