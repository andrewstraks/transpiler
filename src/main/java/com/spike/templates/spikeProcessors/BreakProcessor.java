package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class BreakProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        Boolean isBreakAttr = element.hasAttr(U.s("break"));
        String suffix = "";

        if(isBreakAttr){
            suffix = U.js("break;");
        }

        if (element.tagName().equals("spike") && !suffix.isEmpty()) {

            this.insertAfter(element, U.js(suffix));
            element.removeAttr(spikeAttribute);

        } else {
            throw new Exception("Spike Compiler: 'break' statement allowed only on @spike tags");
        }

    }

}
