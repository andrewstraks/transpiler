package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class PrintProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) {

        String value = U.ss(element.attr(spikeAttribute));

        if(element.tagName().equals("spike")){
            this.replaceWith(element, value);
        }else{
            element.removeAttr(spikeAttribute);
            element.html(value);
        }

    }

}
