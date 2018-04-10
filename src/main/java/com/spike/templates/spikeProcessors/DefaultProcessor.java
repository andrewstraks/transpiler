package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class DefaultProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        String prefix = U.js("default :");

        if (element.tagName().equals("spike")) {

            this.insertBefore(element, U.js(prefix));
            element.removeAttr(spikeAttribute);

        } else {
            throw new Exception("Spike Compiler: 'default' statement allowed only on @spike tags");
        }

    }

}
